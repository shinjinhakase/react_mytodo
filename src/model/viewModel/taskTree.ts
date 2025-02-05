import React, { Children, useState } from 'react'
import { TaskList, Task } from '../task'


export type TaskTree = {
    task: Task
    children: TaskTree[]
}

export function buildTaskTree(taskList: TaskList) {
    function makeTaskTree(parent: Task): TaskTree {
        const isChild = (task: Task) => task.parentId == parent.id
        return {
            task: parent,
            children: taskList.tasks.filter(isChild).map(makeTaskTree)
        }
    }

    const isAncestor = (taskTree: TaskTree) => taskTree.task.parentId == null

    return taskList.tasks.map(makeTaskTree).filter(isAncestor)

}
