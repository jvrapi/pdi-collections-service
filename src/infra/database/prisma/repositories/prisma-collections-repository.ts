import { Collection } from '@/app/entities/collection'
import {
  CollectionsRepository,
  FindCollectionByUserIdProps,
} from '@/app/repositories/collections-repository'

import { prisma } from '../connection'
import { PrismaCollectionsMapper } from '../mappers/prisma-collections-mapper'

export class PrismaCollectionsRepository implements CollectionsRepository {
  async findByUserId({
    userId,
    take,
    skip,
  }: FindCollectionByUserIdProps): Promise<Collection | null> {
    const collection = await prisma.collection.findUnique({
      where: {
        userId,
      },
      include: {
        cards: {
          take,
          skip,
        },
      },
    })

    if (!collection) {
      return null
    }

    return PrismaCollectionsMapper.toDomain(collection)
  }

  async create(userId: string): Promise<Collection> {
    const collection = await prisma.collection.create({
      data: {
        userId,
      },
    })

    return PrismaCollectionsMapper.toDomain(collection)
  }
}
