import mysql, { Connection } from 'mysql'
import config from './config'

export class Database {
  db: Connection

  constructor () {
    const { host, user, password, port } = config.database

    const params = {
      user,
      password,
      host,
      port,
      database: null
    }

    this.db = mysql.createConnection(params)
    this.db.connect()
  }

  async exists () {
    const results = await this.query(`SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = '${config.database.dbname}'`)

    return !(!results || (results && results.length === 0));
  }

  async use () {
    const exists = await this.exists()

    if (!exists) {
      return `Database ${config.database.dbname} does not exists.`
    }

    await this.query(`USE ${config.database.dbname}`)
  }

  query<T = any, P = any[]>(sql: string, params?: P): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.db.query(sql, params, (err, results, fields) => {
        if (err) {
          reject(err)
        }

        resolve(results)
      })
    })
  }
}
