import { Repository } from './repository'
import { User } from '../model/user'

export class UserRepository extends Repository<User> {
  table = 'user'

  constructor (database) {
    super(database)
  }
}