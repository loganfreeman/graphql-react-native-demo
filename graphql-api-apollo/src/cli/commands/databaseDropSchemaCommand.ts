import { CliContext } from '../context'
import DatabaseCommand from '../databaseCommand'

export default class DatabaseCreateCommand extends DatabaseCommand {
  constructor (context: CliContext) {
    super('schema:drop', context)
  }

  async run () {
    try {
      const message = await this.database.dropSchema()
      console.log(message)
      return 0
    } catch (err) {
      console.log(err.message)
    }
  }
}