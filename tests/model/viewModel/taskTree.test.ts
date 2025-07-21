import { expect, test } from 'vitest'
import { TaskTree, buildTaskTree } from '../../../src/model/viewModel/taskTree'
import { TaskList } from '../../../src/model/task'

test('buildTaskTree working', () => {
    const taskList: TaskList = {
        id: crypto.randomUUID(),
        title: "TestList",
        tasks: [
            { id: "1", title: "task1", order: 0, label: "A", priority: 1, parentId: null },
            { id: "2", title: "task2", order: 1, label: "B", priority: 2, parentId: null },
            { id: "3", title: "task3", order: 0, label: "C", priority: 3, parentId: "1" }
        ],
        order: 0
    }
    const taskTree = buildTaskTree(taskList)
    expect(taskTree).toEqual(
        [
            {
                task: { id: "1", title: "task1", order: 0, label: "A", priority: 1, parentId: null },
                children: [
                    {
                        task: { id: "3", title: "task3", order: 0, label: "C", priority: 3, parentId: "1" },
                        children: []
                    }
                ]
            },
            {
                task: { id: "2", title: "task2", order: 1, label: "B", priority: 2, parentId: null },
                children: []
            }
        ]
    )
})

// 新規タスクの採番テスト
