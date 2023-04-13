import { Card as Raw } from '@prisma/client'

import { Card } from '@/app/entities/card'

export class PrismaCardsMapper {
  static toDomain(raw: Raw): Card {
    return new Card(
      {
        addedAt: raw.addedAt,
        updatedAt: raw.updatedAt,
        quantity: raw.quantity,
        collectionId: raw.collectionId,
      },
      raw.id,
    )
  }

  static toPrisma(card: Card) {
    return {
      collectionId: card.collectionId,
      id: card.id,
      quantity: card.quantity,
    }
  }
}
