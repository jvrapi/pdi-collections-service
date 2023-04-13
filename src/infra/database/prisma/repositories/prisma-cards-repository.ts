import { Card } from '@/app/entities/card'
import {
  CardsRepository,
  FindByCardIdAndCollectionIdProps,
} from '@/app/repositories/cards-repository'

import { prisma } from '../connection'
import { PrismaCardsMapper } from '../mappers/prisma-cards-mapper'

export class PrismaCardsRepository implements CardsRepository {
  async findByCardIdAndCollectionId({
    id,
    collectionId,
  }: FindByCardIdAndCollectionIdProps): Promise<Card | null> {
    const card = await prisma.card.findUnique({
      where: {
        id_collectionId: {
          collectionId,
          id,
        },
      },
    })

    if (!card) {
      return null
    }

    return PrismaCardsMapper.toDomain(card)
  }

  async addCard(card: Card): Promise<Card> {
    const cardCreated = await prisma.card.create({
      data: PrismaCardsMapper.toPrisma(card),
    })

    return PrismaCardsMapper.toDomain(cardCreated)
  }

  async saveCard(card: Card): Promise<Card> {
    const cardSaved = await prisma.card.update({
      where: {
        id_collectionId: {
          id: card.id,
          collectionId: card.collectionId,
        },
      },
      data: {
        quantity: card.quantity,
        updatedAt: new Date(),
      },
    })

    return PrismaCardsMapper.toDomain(cardSaved)
  }
}
