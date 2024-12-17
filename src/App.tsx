import React, { useState } from 'react'
import './App.css'
import TaskCard from './component/task'
import { Board, Task } from './model/task';
import { produce } from "immer";

function App() {
  const defaultBoard: Board = {
    uuid: crypto.randomUUID(),
    title: "TestBoard",
    taskLists: [
      {
        title: "TaskList",
        uuid: crypto.randomUUID(),
        elements: [
          { uuid: crypto.randomUUID(), title: "task1", label: "A", priority: 1, children: [] },
          { uuid: crypto.randomUUID(), title: "task2", label: "B", priority: 2, children: [] }
        ]
      }
    ]
  }
  const [board, setBoard] = useState(defaultBoard)
  function handleAddTask(_: React.MouseEvent) {
    setBoard(
      produce((draft) => {
        draft.taskLists[0].elements.push(
          { uuid: crypto.randomUUID(), title: "newTask", label: "C", priority: 3, children: [] }
        )
      })
    )
  }

  function handleAddChildren(parent: Task) {
    setBoard(
      produce((draft) => {
        draft.taskLists[0].elements.map(task => {
          if (task.uuid == parent.uuid) {
            task.children.push(
              { uuid: crypto.randomUUID(), title: "child", label: "C", priority: 3, children: [] }
            )
          }
        })
      })
    )
  }

  function handleRemoveTask(task: Task) {
    setBoard(
      produce((draft) => {
        draft.taskLists[0].elements = draft.taskLists[0].elements.filter(t => t.uuid != task.uuid)
      })
    )
  }

  function handleEditTask(task: Task) {
    const newElements = board.taskLists[0].elements.map(t => {
      if (t.uuid == task.uuid) {
        return task
      }
      if (t.children.length > 0) {

      }
      return t
    })
    setBoard(
      produce(draft => {
        draft.taskLists[0].elements = newElements
      })
    )
  }

  return (
    <>
      <h1>
        {board.title}
      </h1>
      {board.taskLists.map(taskList => (
        <section key={taskList.uuid}>
          <h2>
            {taskList.title}<button onClick={handleAddTask}>+</button>
          </h2>
          <ul>
            {taskList.elements.map((task, index) => (
              <TaskCard
                onTaskChange={handleEditTask}
                onRemoveTask={handleRemoveTask}
                onAddChildren={handleAddChildren}
                isLastTask={index == taskList.elements.length - 1}
                task={task}
              />
            ))}
          </ul>
        </section >
      ))
      }
    </>
  )
}

export default App
