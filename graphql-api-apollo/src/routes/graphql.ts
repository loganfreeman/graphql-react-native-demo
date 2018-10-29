import { graphqlExpress } from 'apollo-server-express'
import { Application } from 'express'
import expressJwt from 'express-jwt'
import schema from '../schema'
import config from '../config'
import getContext from '../context'

export async function graphqlRoute (app: Application) {
  const context = await getContext()

  const middlewares: any[] = [
  ]

  if (config.jwt.enabled) {
    middlewares.push(expressJwt({secret: config.jwt.secret}))
  }

  app.use(
    '/graphql',
    middlewares,
    graphqlExpress(req => ({
      schema,
      context: {
        ...context,
        user: req.user
      }
    }))
  )
}