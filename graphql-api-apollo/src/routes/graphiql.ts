import { Application } from 'express'
import { graphiqlExpress } from 'apollo-server-express'

export async function graphiqlRoute (app: Application) {
  app.use('/graphiql', graphiqlExpress({endpointURL: '/graphql'}))
}
