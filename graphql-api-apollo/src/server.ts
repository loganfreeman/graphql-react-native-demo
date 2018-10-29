import express from 'express'
import routes from './routes'
import middlewares from './middlewares'
import context from './context'

async function start () {
  const app = express()

  await context()
  await middlewares(app)
  routes(app)

  app.listen(4000, () => console.log('GraphQL endpoint to: localhost:4000/graphql'))
}

start()
  .catch(err => {
    console.error(err)
    process.exit(1)
  })
