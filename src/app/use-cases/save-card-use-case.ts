import { inject, injectable } from 'tsyringe'

import { ApiRepository } from '@/infra/api/repositories/api-repository'

import { Card } from '../entities/card'
import { ApiError } from '../errors/error'
import { CardsRepository } from '../repositories/cards-repository'
import { CollectionsRepository } from '../repositories/collections-repository'

interface SaveCardProps {
  quantity: number
  id: string
  userId: string
}

@injectable()
export class SaveCardInCollectionUseCase {
  constructor(
    @inject('CollectionsRepository')
    private collectionsRepository: CollectionsRepository,

    @inject('CardsRepository')
    private cardsRepository: CardsRepository,

    @inject('ApiRepository')
    private apiRepository: ApiRepository,
  ) {}

  async execute({ quantity, id, userId }: SaveCardProps) {
    try {
      if (!quantity || quantity === 0) {
        throw new ApiError('You need to provide an quantity')
      }

      if (!id) {
        throw new ApiError('You need to provide an card')
      }

      const userCollection = await this.collectionsRepository.findByUserId({
        userId,
      })

      if (!userCollection) {
        throw new ApiError('Collection not found')
      }

      const apiCard = await this.apiRepository.findCardById(id, { take: 1 })

      if (!apiCard) {
        throw new ApiError('Invalid card')
      }

      const cardAlreadyInCollection =
        await this.cardsRepository.findByCardIdAndCollectionId({
          id,
          collectionId: userCollection.id,
        })

      if (cardAlreadyInCollection) {
        cardAlreadyInCollection.quantity = quantity
        const card = await this.cardsRepository.saveCard(
          cardAlreadyInCollection,
        )
        card.imageUri = apiCard.imageUri
        return card
      }

      const card = await this.cardsRepository.addCard(
        new Card(
          {
            collectionId: userCollection!.id,
            quantity,
          },
          id,
        ),
      )

      card.imageUri = apiCard.imageUri

      return card
    } catch (error) {
      console.log(error)
      throw new ApiError((error as Error).message)
    }
  }
}
