import { Context } from '../context'
import { Task } from '../model/task'

interface AddTaskArgs {
  name: string
}

interface MarkTaskDoneArgs {
  id: number
}

interface UpdateTaskArgs {
  input: {
    id: number
    name: number
    done?: boolean
  }
}

export function tasks (obj, args, { repositories: { taskRepository } }: Context): Promise<Task[]> {
  return taskRepository.findAll()
}

export function task (obj, { id }, { repositories }: Context): Promise<Task> {
  return repositories.taskRepository.find(id)
}

export function addTask (obj, { name }: AddTaskArgs, { database, repositories, user }: Context): Promise<Task> {
  return repositories.taskRepository.insert({ name, done: false })
}

export function markTaskDone (obj, { id }: MarkTaskDoneArgs, { database, repositories }: Context): Promise<Task> {
  return repositories.taskRepository.update(id, { done: true })
}

export function markTaskNotDone (obj, { id }: MarkTaskDoneArgs, { database, repositories }: Context): Promise<Task> {
  return repositories.taskRepository.update(id, { done: false })
}

export function updateTask (obj, { input: { id, name, done } }: UpdateTaskArgs, { database, repositories }: Context): Promise<Task> {
  return repositories.taskRepository.update(id, { name, done })
}

export function removeTask (obj, { id }, { repositories }: Context): Promise<Task> {
  return repositories.taskRepository.remove(id)
}
