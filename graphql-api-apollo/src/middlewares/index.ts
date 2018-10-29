import { Application } from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

export default async function middlewares (app: Application) {
  app.use(cors())
  app.use(bodyParser.json())
}
