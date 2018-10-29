import { Application } from 'express'
import { graphqlRoute } from './graphql'
import { loginRoute } from './login'
import { graphiqlRoute } from './graphiql'

const routes = (app: Application) => {
  graphqlRoute(app)
  graphiqlRoute(app)
  loginRoute(app)
}

export default routes
