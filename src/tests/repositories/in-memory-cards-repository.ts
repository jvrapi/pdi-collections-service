import { Card } from '@/app/entities/card'
import {
  CardsRepository,
  FindByCardIdAndCollectionIdProps,
} from '@/app/repositories/cards-repository'

export class InMemoryCardsRepository implements CardsRepository {
  private cards: Card[] = []

  async findByCardIdAndCollectionId({
    id,
    collectionId,
  }: FindByCardIdAndCollectionIdProps): Promise<Card | null> {
    return (
      this.cards.find(
        (card) => card.id === id && card.collectionId === collectionId,
      ) || null
    )
  }

  async addCard(card: Card): Promise<Card> {
    this.cards.push(card)

    return card
  }

  async saveCard({ collectionId, id, quantity }: Card): Promise<Card> {
    const cardIndex = this.cards.findIndex(
      (card) => card.collectionId === collectionId && card.id === id,
    )

    this.cards[cardIndex].quantity = quantity

    return this.cards[cardIndex]
  }

  async findByCollectionId(collectionId: string): Promise<Card[]> {
    return this.cards.filter((card) => card.collectionId === collectionId)
  }
}
