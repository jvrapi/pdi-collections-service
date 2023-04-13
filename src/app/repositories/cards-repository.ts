import { Card } from '../entities/card'

export interface FindByCardIdAndCollectionIdProps {
  collectionId: string
  id: string
}

export interface AddCard {
  collectionId: string
  id: string
  quantity: number
}

export type SaveCard = AddCard

export interface CardsRepository {
  findByCardIdAndCollectionId({
    id,
    collectionId,
  }: FindByCardIdAndCollectionIdProps): Promise<Card | null>
  addCard({ collectionId, id, quantity }: Card): Promise<Card>
  saveCard({ collectionId, id, quantity }: Card): Promise<Card>
}
