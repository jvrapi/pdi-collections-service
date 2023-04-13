import { Collection } from '../entities/collection'

export interface FindCollectionByUserIdProps {
  userId: string
  take?: number
  skip?: number
}

export interface CollectionsRepository {
  findByUserId({
    userId,
    take,
    skip,
  }: FindCollectionByUserIdProps): Promise<Collection | null>
  create(userId: string): Promise<Collection>
}
