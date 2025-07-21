export type Task = {
    id: string
    title: string
    order: number
    priority: number
    label: string
    parentId: string | null
}

export type TaskList = {
    id: string
    title: string
    order: number
    tasks: Task[]
}
