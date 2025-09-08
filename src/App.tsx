import React, { useState, useEffect } from 'react'
import './App.css'
import { TaskList, Task } from './model/task';
import { produce } from "immer";
import { buildTaskTree } from './model/viewModel/taskTree';
import { AddChildrenContext, OrderUpContext, OrderDownContext, RemoveTaskContext, ChangeTaskContext } from './contexts/TaskCardContext';
import { TaskTree } from './components/TaskTree';

function App() {
  const loadedTaskList: TaskList = JSON.parse(localStorage.getItem("taskData") || "{}")
  const first_task_id = crypto.randomUUID()
  const defaultTaskList: TaskList = {
    id: crypto.randomUUID(),
    title: "TestList",
    tasks: [
      { id: first_task_id, title: "task1", order: 0, label: "A", priority: 1, parentId: null },
      { id: crypto.randomUUID(), title: "task2", order: 1, label: "B", priority: 2, parentId: null },
      { id: crypto.randomUUID(), title: "task3", order: 0, label: "C", priority: 3, parentId: first_task_id }
    ]
  }
  const tasks = loadedTaskList.tasks.length > 0 ? loadedTaskList : defaultTaskList
  const [tasklist, setTaskList] = useState(tasks)
  useEffect(() => {
    localStorage.setItem("taskData", JSON.stringify(tasklist))
  }, [tasklist])

  function handleAddTask(_: React.MouseEvent) {
    setTaskList(
      produce((draft) => {
        draft.tasks = draft.tasks.map(t => {
          if(t.parentId != null){
            return t
          }
          return {...t, order: t.order + 1}
        }).concat(
          {
            id: crypto.randomUUID(),
            title: "newTask",
            order: 0,
            label: "C",
            priority: 3,
            parentId: null,
          }
        )
      })
    )
  }

  function handleAddChildren(parent: Task) {
    setTaskList(
      produce((draft) => {
        draft.tasks = draft.tasks.map(t => {
          if(t.parentId != parent.id){
            return t
          }
          return {...t, order: t.order + 1}
        }).concat(
          {
            id: crypto.randomUUID(),
            title: "child",
            order: 0,
            label: "C",
            priority: 3,
            parentId: parent.id,
          }
        )
      })
    )
  }

  function handleRemoveTask(task: Task) {
    setTaskList(
      produce((draft) => {
        draft.tasks = draft.tasks.filter(t => t.id != task.id).map(t => {
          if(t.parentId != task.parentId){
            return t
          }
          if(t.order < task.order){
            return t
          }
          return {...t, order: t.order - 1}
        })
      })
    )
  }

  function handleEditTask(task: Task) {
    const newElements = tasklist.tasks.map(t => {
      if (t.id == task.id) {
        return task
      }
      return t
    })
    setTaskList(
      produce(draft => {
        draft.tasks = newElements
      })
    )
  }

  function handleOrderUp(task: Task) {
    setTaskList(
      produce(draft => {
        draft.tasks = draft.tasks.map(t => {
          if(t.parentId != task.parentId){
            return t
          }
          if(t.id == task.id && t.order > 0){
            return {...t, order: t.order - 1}
          }
          if(t.order == task.order - 1){
            return {...t, order: t.order + 1}
          }
          return t
        })
      })
    )
  }

  function handleOrderDown(task: Task) {
    setTaskList(
      produce(draft => {
        draft.tasks = draft.tasks.map(t => {
          if(t.parentId != task.parentId){
            return t
          }
          if(t.id == task.id && t.order < draft.tasks.filter(t => t.parentId == task.parentId).length - 1){
            return {...t, order: t.order + 1}
          }
          if(t.order == task.order + 1){
            return {...t, order: t.order - 1}
          }
          return t
        })
      })
    )
  }

  return (
    <>
      <h1>
        {"タスク管理"}<button onClick={handleAddTask}>+</button>
      </h1>
      <ChangeTaskContext.Provider value={handleEditTask}>
      <RemoveTaskContext.Provider value={handleRemoveTask}>
      <AddChildrenContext.Provider value={handleAddChildren}>
      <OrderUpContext.Provider value={handleOrderUp}>
      <OrderDownContext.Provider value={handleOrderDown}>
        {buildTaskTree(tasklist).map(taskTree => (
          <TaskTree taskTree={taskTree} key={taskTree.task.id} />
        ))}
      </OrderDownContext.Provider>
      </OrderUpContext.Provider>
      </AddChildrenContext.Provider>
      </RemoveTaskContext.Provider>
      </ChangeTaskContext.Provider>
    </>
  )
}

export default App
