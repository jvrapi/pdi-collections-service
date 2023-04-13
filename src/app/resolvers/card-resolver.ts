import { container } from 'tsyringe'
import { Arg, Query, Resolver } from 'type-graphql'

import { GetCardsInput } from '@/app/gql/inputs/get-cards-input'
import { Card } from '@/app/gql/models/card-model'
import { GetCardsUseCase } from '@/infra/api/use-cases/get-cards-use-case'

@Resolver()
export class CardResolver {
  @Query(() => [Card])
  async cards(
    @Arg('data', () => GetCardsInput) { name, take, skip }: GetCardsInput,
  ) {
    const getCardsUseCase = container.resolve(GetCardsUseCase)
    const data = await getCardsUseCase.execute({
      name,
      take,
      skip,
    })

    return data
  }
}
