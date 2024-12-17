import React from 'react'
import { Task } from '../model/task';

type TaskCardProps = {
    onTaskChange: (task: Task) => void,
    onRemoveTask: (task: Task) => void,
    onAddChildren: (parent: Task) => void,
    isLastTask: boolean,
    task: Task
}

export default function TaskCard({ onTaskChange, onRemoveTask, onAddChildren, isLastTask, task }: TaskCardProps) {

    function onEditTaskTitle(event: React.FormEvent<HTMLInputElement>) {
        console.log(task.title)
        onTaskChange({ ...task, title: event.currentTarget.value })
    }

    function onRemoveTaskCard(_: React.MouseEvent) {
        onRemoveTask(task)
    }

    function onAddChild(parent: Task) {
        onAddChildren(parent)
    }

    function onRender(node: HTMLInputElement | null) {
        if (node == null) return;
        if (!isLastTask) return;
        if (node.dataset.focused == "true") return;
        node.focus()
        node.dataset.focused = "true";
    }

    return (
        <li key={task.uuid} id={task.uuid}>
            <input type="text" value={task.title} onChange={onEditTaskTitle} ref={onRender} />
            <button onClick={onRemoveTaskCard}>done</button>
            <button onClick={() => onAddChild(task)}>+</button>
            {task.children.length > 0 &&
                task.children.map((c, index) => (
                    // ここが子のカード
                    <TaskCard
                        onTaskChange={onTaskChange}
                        onRemoveTask={onRemoveTask}
                        onAddChildren={onAddChildren}
                        isLastTask={index == task.children.length - 1}
                        task={c}
                    />
                ))
            }
        </li>
    )
}
