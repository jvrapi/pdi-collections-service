import { inject, injectable } from 'tsyringe'

import { ApiRepository } from '@/infra/api/repositories/api-repository'

import { CollectionsRepository } from '../repositories/collections-repository'

interface GetUserCollectionRequest {
  userId: string
  take: number
  skip?: number
}

interface Card {
  id: string
  quantity: number
  imageUri: string
  addedAt: Date
  updatedAt: Date
  name: string
}

@injectable()
export class GetCollectionUseCase {
  constructor(
    @inject('CollectionsRepository')
    private collectionsRepository: CollectionsRepository,

    @inject('ApiRepository')
    private apiRepository: ApiRepository,
  ) {}

  async execute({ userId, take, skip }: GetUserCollectionRequest) {
    const userCollection = await this.collectionsRepository.findByUserId({
      userId,
      take,
      skip,
    })

    let cards: Card[] = []
    if (userCollection?.cards?.length === 0) {
      cards = []
    }

    await Promise.all(
      userCollection!.cards!.map(async (card) => {
        const apiCard = await this.apiRepository.findCardById(card.id, {
          take: 1,
        })

        if (apiCard) {
          cards.push({
            id: card.id,
            name: apiCard.name,
            quantity: card.quantity,
            imageUri: apiCard.imageUri,
            addedAt: card.addedAt!,
            updatedAt: card.updatedAt!,
          })
        }
      }),
    )

    return cards
  }
}
