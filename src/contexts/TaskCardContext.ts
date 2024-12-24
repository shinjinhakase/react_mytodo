import { createContext } from 'react'
import { Task } from '../model/simpleTask'

export const ChangeTaskContext = createContext<(task: Task) => void>(() => { })
export const RemoveTaskContext = createContext<(task: Task) => void>(() => { })
export const AddChildrenContext = createContext<(task: Task) => void>(() => { })

