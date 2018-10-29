import { CliContext } from '../context'
import DatabaseCommand from '../databaseCommand'

export default class DatabaseCreateCommand extends DatabaseCommand {
  constructor (context: CliContext) {
    super('schema:create', context)
  }

  async run () {
    try {
      const message = await this.database.createSchema()
      console.log(message)
      return 0
    } catch (err) {
      throw err
    }
  }
}