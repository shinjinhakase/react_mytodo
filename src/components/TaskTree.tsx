import { useContext } from 'react';
import { AddChildrenContext, RemoveTaskContext, ChangeTaskContext } from '../contexts/TaskCardContext';
import { TaskTree as TT } from '../model/viewModel/taskTree';
import TaskCard from './TaskCard';

type TaskTreeProps = {
    taskTree: TT
}

export function TaskTree({ taskTree }: TaskTreeProps) {
    const changeTask = useContext(ChangeTaskContext)
    const removeTask = useContext(RemoveTaskContext)
    const addChildren = useContext(AddChildrenContext)
    return (
        <>
            <TaskCard
                onTaskChange={changeTask}
                onRemoveTask={removeTask}
                onAddChildren={addChildren}
                isLastTask={false /*taskTree.task.id == tasklist.tasks[-1].id*/}
                task={taskTree.task}
            />
            <ul>
                {taskTree.children.map(child => <TaskTree taskTree={child} key={child.task.id} />)}
            </ul>
        </>
    )
}