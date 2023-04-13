import { hash } from 'bcrypt'
import { inject, injectable } from 'tsyringe'

import { User } from '../entities/user'
import { ApiError } from '../errors/error'
import { CollectionsRepository } from '../repositories/collections-repository'
import { UsersRepository } from '../repositories/users-repository'

interface Request {
  name: string
  email: string
  password: string
  username: string
}

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepository,

    @inject('CollectionsRepository')
    private collectionsRepository: CollectionsRepository,
  ) {}

  async execute({ name, email, password, username }: Request) {
    const emailAlreadyInUse = await this.usersRepository.findByEmail(email)

    const usernameAlreadyInUse = await this.usersRepository.findByUsername(
      username,
    )

    if (emailAlreadyInUse) {
      throw new ApiError('E-mail already in use')
    }

    if (usernameAlreadyInUse) {
      throw new ApiError('Username already in use')
    }

    const user = new User({
      email,
      name,
      username,
    })

    user.password = await hash(password, 8)

    const userCreated = await this.usersRepository.create(user)

    await this.collectionsRepository.create(userCreated.id)

    return {
      id: userCreated.id,
    }
  }
}
