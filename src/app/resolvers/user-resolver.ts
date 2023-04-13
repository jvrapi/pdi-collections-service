import { container } from 'tsyringe'
import {
  Arg,
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from 'type-graphql'

import { CreateUserInput } from '../gql/inputs/create-user-input'
import { UpdateUserInput } from '../gql/inputs/update-user-input'
import { UserCollectionInput } from '../gql/inputs/user-collection-input'
import { UserCardModel as Card } from '../gql/models/user-card-model'
import { UserCreated } from '../gql/models/user-created-model'
import { User } from '../gql/models/user-model'
import { EnsureAuthenticated } from '../middlewares/ensure-authenticated'
import { Context } from '../types/context'
import { CreateUserUseCase } from '../use-cases/create-user-use-case'
import { GetCollectionUseCase } from '../use-cases/get-collection-use-case'
import { GetUserUseCase } from '../use-cases/get-user-use-case'
import { UpdateUserUseCase } from '../use-cases/update-user-use-case'

@Resolver(() => User)
export class UserResolver {
  @Query(() => User)
  @UseMiddleware(EnsureAuthenticated)
  async user(@Ctx() ctx: Context) {
    const getUserUseCase = container.resolve(GetUserUseCase)
    return getUserUseCase.execute(ctx.user.id)
  }

  @Mutation(() => UserCreated)
  async createUser(@Arg('data', () => CreateUserInput) data: CreateUserInput) {
    const createUserUseCase = container.resolve(CreateUserUseCase)
    return createUserUseCase.execute(data)
  }

  @Mutation(() => User)
  @UseMiddleware(EnsureAuthenticated)
  async updateUser(
    @Arg('data', () => UpdateUserInput) data: UpdateUserInput,
    @Ctx() ctx: Context,
  ) {
    const updateUserUseCase = container.resolve(UpdateUserUseCase)
    return updateUserUseCase.execute({
      ...data,
      id: ctx.user.id,
    })
  }

  @FieldResolver(() => [Card])
  async cards(
    @Root() user: User,
    @Arg('data', () => UserCollectionInput) data: UserCollectionInput,
  ) {
    const { take, skip } = data
    const getCollectionUseCase = container.resolve(GetCollectionUseCase)
    const collection = await getCollectionUseCase.execute({
      userId: user.id,
      take,
      skip,
    })

    return collection
  }
}
