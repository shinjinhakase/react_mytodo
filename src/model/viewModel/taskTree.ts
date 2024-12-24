import React, { Children, useState } from 'react'
import { TaskList, Task } from '../simpleTask'


export type TaskTree = {
    task: Task
    children: TaskTree[]
}

export function buildTaskTree(taskList: TaskList) {
    // 大本の木を作成
    // const tree: Tree = {
    //     ...taskList,
    //     priority: 0,
    //     label: "root",
    //     children: []
    // }

    // 親を持たないタスクを登録
    // const mainTasks: Task[] = taskList.tasks.filter(task => task.parent == null)
    // mainTasks.forEach(mainTask => { tree.children.push({ ...mainTask, children: [] }) })
    // if (tree.children.length == 0) return tree

    // tree.children.forEach(child => { buildBranch(child, taskList) })
    // console.log(tree)
    // return tree

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

//childrenが空のTreeを受け取り, childrenが入ったTreeを返す
// function buildBranch(root: TaskTree, taskList: TaskList) {

//     const subTasks: Task[] = taskList.tasks.filter(task => task.parentId == root.uuid)
//     if (subTasks.length == 0) return root

//     subTasks.forEach(subTask => { root.children.push({ ...subTask, children: [] }) })
//     root.children.forEach(child => { buildBranch(child, taskList) })
//     return root
// }


