import { Context } from '../context'
import jwt from 'jsonwebtoken'
import config from '../config'
import { HttpError } from '../http.error'

interface LoginArgs {
  username: string
  password: string
}

export function login ({ username, password }: LoginArgs, { repositories }: Context) {
  if (!username || !password) {
    throw new HttpError('Missing username or password parameters', 400)
  }

  return repositories.userRepository.findOneBy({ username, password })
    .then(user => {
      if (!user) {
        throw new HttpError(`User not found`, 401)
      }

      const token = jwt.sign({ id: user.id, username }, config.jwt.secret, { expiresIn: config.jwt.expiresIn })

      return {
        ...user,
        token
      }
    })
}

export function me(_, params, { repositories, user }: Context) {
  if (!user) {
    return null
  }

  return repositories.userRepository.find(user.id)
    .then(user => {
      return {
        ...user,
        password: null
      }
    })
}
