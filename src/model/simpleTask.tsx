export type Task = {
    id: string
    title: string
    priority: number
    label: string
    parentId: string | null
}

export type TaskList = {
    id: string
    title: string
    tasks: Task[]
}
