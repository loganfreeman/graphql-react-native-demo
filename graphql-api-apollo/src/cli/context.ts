import { UserRepository } from '../repositories/user.repository'
import { Database } from '../database'
import { CliDatabase } from './cliDatabase'

export interface CliContext {
  database: Database
  cliDatabase: CliDatabase
  repositories: {
    userRepository: UserRepository
  }
}

let context: CliContext

export default async function getContext () {
  if (context) {
    return context
  }

  const database = new Database()
  const cliDatabase = new CliDatabase(database)
  const userRepository = new UserRepository(database)

  context = {
    database,
    cliDatabase,
    repositories: {
      userRepository
    }
  }

  return context
}
