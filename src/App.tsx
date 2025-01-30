import React, { useState, useEffect } from 'react'
import './App.css'
import { TaskList, Task } from './model/task';
import { produce } from "immer";
import { buildTaskTree } from './model/viewModel/taskTree';
import { AddChildrenContext, RemoveTaskContext, ChangeTaskContext } from './contexts/TaskCardContext';
import { TaskTree } from './components/TaskTree';

function App() {
  const first_task_id = crypto.randomUUID()
  // const defaultList: TaskList = {
  //   id: crypto.randomUUID(),
  //   title: "TestList",
  //   tasks: [
  //     { id: first_task_id, title: "task1", label: "A", priority: 1, parentId: null },
  //     { id: crypto.randomUUID(), title: "task2", label: "B", priority: 2, parentId: null },
  //     { id: crypto.randomUUID(), title: "task3", label: "C", priority: 3, parentId: first_task_id }
  //   ]
  // }
  const defaultList: TaskList = JSON.parse(localStorage.getItem("taskData") || "{}")
  const [tasklist, setTaskList] = useState(defaultList)
  useEffect(() => {
    localStorage.setItem("taskData", JSON.stringify(tasklist))
  }, [tasklist])

  function handleAddTask(_: React.MouseEvent) {
    setTaskList(
      produce((draft) => {
        draft.tasks.push(
          { id: crypto.randomUUID(), title: "newTask", label: "C", priority: 3, parentId: null }
        )
      })
    )
  }

  function handleAddChildren(parent: Task) {
    setTaskList(
      produce((draft) => {
        draft.tasks.push(
          { id: crypto.randomUUID(), title: "child", label: "C", priority: 3, parentId: parent.id }
        )
      })
    )
  }

  function handleRemoveTask(task: Task) {
    setTaskList(
      produce((draft) => {
        draft.tasks = draft.tasks.filter(t => t.id != task.id)
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

  return (
    <>
      <h1>
        {"テストテステス"}<button onClick={handleAddTask}>+</button>
      </h1>
      <ChangeTaskContext.Provider value={handleEditTask}>
        <RemoveTaskContext.Provider value={handleRemoveTask}>
          <AddChildrenContext.Provider value={handleAddChildren}>
            {buildTaskTree(tasklist).map(taskTree => (
              <TaskTree taskTree={taskTree} key={taskTree.task.id} />
            ))}
          </AddChildrenContext.Provider>
        </RemoveTaskContext.Provider>
      </ChangeTaskContext.Provider>
    </>
  )
}

export default App
