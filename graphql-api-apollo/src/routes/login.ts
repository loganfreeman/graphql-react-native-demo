import { Application } from 'express'
import getContext from '../context'
import { login } from '../actions/users'

export async function loginRoute (app: Application) {
  const context = await getContext()

  app.post('/login', async (req, res) => {
    try {
      const payload = await login({username: req.body.username, password: req.body.password}, context)
      res.status(200)
      res.json(payload)
    } catch (err) {
      res.status(err.code || 500)
      res.send(err.message)
    }
  })
}
