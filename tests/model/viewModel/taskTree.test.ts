import { expect, test } from 'vitest'
import { TaskTree, buildTaskTree } from '../../../src/model/viewModel/taskTree'
import { TaskList } from '../../../src/model/simpleTask'

test('buildTaskTree working', () => {
    const taskList: TaskList = {
        id: crypto.randomUUID(),
        title: "TestList",
        tasks: [
            { id: "1", title: "task1", label: "A", priority: 1, parentId: null },
            { id: "2", title: "task2", label: "B", priority: 2, parentId: null },
            { id: "3", title: "task3", label: "C", priority: 3, parentId: "1" }
        ]
    }
    const taskTree = buildTaskTree(taskList)
    expect(taskTree).toEqual(
        [
            {
                task: { id: "1", title: "task1", label: "A", priority: 1, parentId: null },
                children: [
                    {
                        task: { id: "3", title: "task3", label: "C", priority: 3, parentId: "1" },
                        children: []
                    }
                ]
            },
            {
                task: { id: "2", title: "task2", label: "B", priority: 2, parentId: null },
                children: []
            }
        ]
    )
})