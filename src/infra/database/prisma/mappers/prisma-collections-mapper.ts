import { Card as RawCard, Collection as RawCollection } from '@prisma/client'

import { Collection } from '@/app/entities/collection'

import { PrismaCardsMapper } from './prisma-cards-mapper'

type Raw = RawCollection & {
  cards?: RawCard[]
}
export class PrismaCollectionsMapper {
  static toDomain(raw: Raw) {
    const collection = new Collection(
      {
        isShared: raw.isShared,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
        userId: raw.userId,
      },
      raw.id,
    )

    if (raw.cards) {
      collection.cards = raw.cards.map(PrismaCardsMapper.toDomain)
    }
    return collection
  }
}
