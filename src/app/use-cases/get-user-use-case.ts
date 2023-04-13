import { inject, injectable } from 'tsyringe'

import { UsersRepository } from '../repositories/users-repository'

@injectable()
export class GetUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepository,
  ) {}

  async execute(userId: string) {
    return this.usersRepository.findById(userId)
  }
}
