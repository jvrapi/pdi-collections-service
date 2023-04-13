import { inject, injectable } from 'tsyringe'

import { Card } from '@/infra/api/entities/card'
import { ApiRepository } from '@/infra/api/repositories/api-repository'

interface GetCardsFilters {
  name?: string
  skip?: number
  take: number
}

@injectable()
export class GetCardsUseCase {
  constructor(
    @inject('ApiRepository')
    private apiRepository: ApiRepository,
  ) {}

  async execute({ name, take, skip }: GetCardsFilters) {
    let cards: Card[] = await this.apiRepository.getRandomCards()

    if (name) {
      cards = await this.apiRepository.findCardsByName(name, {
        take,
        skip,
      })
    }

    return cards
  }
}
