import { verify } from 'jsonwebtoken'
import { MiddlewareFn } from 'type-graphql'

import { ApiError } from '../errors/error'
import { Context } from '../types/context'

interface TokenPayload {
  sub: string
}

export const EnsureAuthenticated: MiddlewareFn<Context> = (
  { context },
  next,
) => {
  const token = context.token?.replace('Bearer', '').trim()
  if (!token) {
    throw new ApiError('unauthorized', 401)
  }

  try {
    const tokenSecret = process.env.TOKEN_SECRET as string
    const { sub: userId } = verify(token, tokenSecret) as TokenPayload

    context.user.id = userId
  } catch (error) {
    throw new ApiError('unauthorized', 401)
  }

  return next()
}
