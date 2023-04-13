import { container } from 'tsyringe'
import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql'

import { AddCardInput } from '../gql/inputs/add-card-input'
import { UserCardModel } from '../gql/models/user-card-model'
import { EnsureAuthenticated } from '../middlewares/ensure-authenticated'
import { Context } from '../types/context'
import { SaveCardInCollectionUseCase } from '../use-cases/save-card-use-case'

@Resolver()
export class CollectionResolver {
  @Mutation(() => UserCardModel)
  @UseMiddleware(EnsureAuthenticated)
  async addCard(
    @Arg('data', () => AddCardInput) data: AddCardInput,
    @Ctx() ctx: Context,
  ) {
    const { cardId, quantity } = data
    const { user } = ctx
    const addCardToCollectionUseCase = container.resolve(
      SaveCardInCollectionUseCase,
    )
    return addCardToCollectionUseCase.execute({
      quantity,
      id: cardId,
      userId: user.id,
    })
  }
}
