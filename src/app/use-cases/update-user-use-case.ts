import { inject, injectable } from 'tsyringe'

import { ApiError } from '../errors/error'
import { UsersRepository } from '../repositories/users-repository'

interface Request {
  id: string
  email: string
  name: string
  username: string
}

@injectable()
export class UpdateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepository,
  ) {}

  async execute({ id, email, name, username }: Request) {
    const user = await this.usersRepository.findById(id)

    if (!user) {
      throw new ApiError('User not found')
    }

    if (email !== user.email) {
      const newEmailAlreadyInUse = await this.usersRepository.findByEmail(email)
      if (newEmailAlreadyInUse) {
        throw new ApiError('New e-mail already in use')
      }
    }

    if (username !== user.username) {
      const newUsernameAlreadyInUse = await this.usersRepository.findByUsername(
        username,
      )
      if (newUsernameAlreadyInUse) {
        throw new ApiError('New username already in use')
      }
    }

    user.email = email
    user.name = name
    user.username = username

    const userUpdated = await this.usersRepository.save(user)

    return userUpdated
  }
}
