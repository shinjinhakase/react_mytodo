import { createContext } from 'react'
import { Task } from '../model/task'

export const ChangeTaskContext = createContext<(task: Task) => void>(() => { })
export const OrderUpContext = createContext<(task: Task) => void>(() => { })
export const OrderDownContext = createContext<(task: Task) => void>(() => { })
export const RemoveTaskContext = createContext<(task: Task) => void>(() => { })
export const AddChildrenContext = createContext<(task: Task) => void>(() => { })

