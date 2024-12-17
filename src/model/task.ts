export type Task = {
    uuid: string
    title: string
    priority: number
    label: string
    children: Task[]
}

export type TaskList = {
    uuid: string
    title: string
    elements: Task[]
}

export type Board = {
    uuid: string
    title: string
    taskLists: TaskList[]
}