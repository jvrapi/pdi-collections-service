import { Collection } from '@/app/entities/collection'
import {
  CollectionsRepository,
  FindCollectionByUserIdProps,
} from '@/app/repositories/collections-repository'

import { InMemoryCardsRepository } from './in-memory-cards-repository'

export class InMemoryCollectionsRepository implements CollectionsRepository {
  private collections: Collection[] = []

  constructor(private cardsRepository: InMemoryCardsRepository) {}

  async findCollectionByUserId({
    userId,
  }: FindCollectionByUserIdProps): Promise<Collection | null> {
    const userCollection =
      this.collections.find((collection) => collection.userId === userId) ||
      null

    if (userCollection) {
      userCollection.cards = await this.cardsRepository.findByCollectionId(
        userCollection.id,
      )
    }
    return userCollection
  }

  async create(userId: string): Promise<Collection> {
    const collection = new Collection({
      isShared: false,
      userId,
    })

    this.collections.push(collection)

    return collection
  }

  async countCardsInUserCollection(userId: string): Promise<number> {
    const collection = this.collections.find((item) => item.userId === userId)
    if (collection) {
      const count = collection.cards.length
      return count
    }
    return 0
  }
}
