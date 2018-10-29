import { Database } from '../database'

export abstract class Repository<T> {
  protected table: string

  protected constructor (protected database: Database) {
    this.table = ''
    this.database.use()
  }

  find (id: number): Promise<T> {
    return this.database.query(`SELECT * FROM ${this.table} WHERE id = ?`, [id])
      .then(results => results[0])
  }

  findBy (fields: any): Promise<T[]> {
    const fieldsInArray: string[] = []
    const params: string[] = []

    for (let key in fields) {
      if (fields.hasOwnProperty(key)) {
        fieldsInArray.push(`${key} = ?`)
        params.push(fields[key])
      }
    }

    const query = `SELECT * FROM ${this.table} WHERE ${fieldsInArray.join(' AND ')}`

    return this.database.query(query, [...params])
  }

  findOneBy (fields: any): Promise<T | null> {
    return this.findBy(fields)
      .then(results => results[0])
  }

  findAll (): Promise<T[]> {
    return this.database.query(`SELECT * FROM ${this.table}`)
  }

  remove (id: number): Promise<T> {
    const obj = this.find(id)

    if (!obj) {
      return Promise.reject(`"${this.table}" id = ${id} does not exists.`)
    }

    return this.database.query(`DELETE FROM ${this.table} WHERE id = ?`, [id])
      .then(() => {
        return obj
      })
  }

  update (id: number, fields: any): Promise<T> {
    const fieldsInArray: string[] = []
    const params: string[] = []

    for (let key in fields) {
      if (fields.hasOwnProperty(key)) {
        if (!!fields[key]) {
          fieldsInArray.push(`${key} = ?`)
          params.push(fields[key])
        }
      }
    }

    const query = `UPDATE ${this.table} SET ${fieldsInArray.join(', ')} WHERE id = ?`

    return this.database.query(query, [...params, id])
      .then(() => {
        return this.find(id)
      })
  }

  insert (fields: any): Promise<T> {
    const fieldNames: string[] = []
    const fieldValues: string[] = []

    for (let key in fields) {
      if (fields.hasOwnProperty(key)) {
        fieldNames.push(key)
        fieldValues.push(fields[key])
      }
    }

    const query = `INSERT INTO ${this.table} (${fieldNames.join(', ')}) VALUES (${fieldNames.map(name => '?').join(', ')})`

    return this.database.query(query, [...fieldValues])
      .then(({ insertId }) => {
        return this.find(insertId)
      })
  }
}