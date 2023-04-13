import { container } from 'tsyringe'
import { Arg, Mutation, Resolver } from 'type-graphql'

import { AuthenticateUserInput } from '../gql/inputs/authenticate-user-input'
import { Auth } from '../gql/models/auth-model'
import { AuthenticateUserUseCase } from '../use-cases/authenticate-user-use-case'

@Resolver()
export class AuthResolver {
  @Mutation(() => Auth)
  async authenticateUser(
    @Arg('data', () => AuthenticateUserInput) data: AuthenticateUserInput,
  ) {
    const { username, password } = data
    const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase)
    const token = await authenticateUserUseCase.execute({
      username,
      password,
    })
    return { token }
  }
}
