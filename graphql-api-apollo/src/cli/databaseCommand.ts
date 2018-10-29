import Command from './command'
import { CliContext } from './context'
import { CliDatabase } from './cliDatabase'

export default abstract class DatabaseCommand extends Command {
  database: CliDatabase = this.context.cliDatabase

  protected constructor (name: string, protected context: CliContext) {
    super(`database:${name}`)
  }

  abstract run (): Promise<number> | number
}