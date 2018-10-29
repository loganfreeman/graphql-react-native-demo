import { Repository } from './repository'
import { Task } from '../model/task'

export class TaskRepository extends Repository<Task> {
  table = 'task'

  constructor (database) {
    super(database)
  }
}