import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'

import { ApiError } from '../errors/error'
import { UsersRepository } from '../repositories/users-repository'
import { isEmail } from '../utils/is-email'

interface AuthenticateUserUseCaseRequest {
  username: string
  password: string
}

@injectable()
export class AuthenticateUserUseCase {
  private tokenSecret: string

  private tokenExpiration: string

  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepository,
  ) {
    this.tokenSecret = process.env.TOKEN_SECRET as string
    this.tokenExpiration = process.env.TOKEN_EXPIRATION as string
  }

  async execute({ username, password }: AuthenticateUserUseCaseRequest) {
    if (!username || !password) {
      throw new ApiError('Missing some information')
    }

    let user = await this.usersRepository.findByUsername(username)

    if (isEmail(username)) {
      user = await this.usersRepository.findByEmail(username)
    }

    if (!user) {
      throw new ApiError('Credentials invalid')
    }

    const passwordIsCorrect = await compare(password, user.password)

    if (!passwordIsCorrect) {
      throw new ApiError('Credentials invalid')
    }

    const token = sign({}, this.tokenSecret, {
      subject: user.id,
      expiresIn: this.tokenExpiration,
    })
    return token
  }
}
