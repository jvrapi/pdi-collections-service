import { Card } from '@/infra/api/entities/card'
import { ApiRepository } from '@/infra/api/repositories/api-repository'

export class InMemoryApiRepository implements ApiRepository {
  private cards: Card[] = []

  constructor(card: Card) {
    this.cards.push(card)
  }

  async findCardById(id: string): Promise<Card | null> {
    return this.cards.find((card) => card.id === id) || null
  }

  async findCardsByName(name: string): Promise<Card[]> {
    return (
      this.cards.filter((card) =>
        card.name.toLowerCase().includes(name.toLowerCase()),
      ) || null
    )
  }

  async getRandomCards(): Promise<Card[]> {
    return this.cards
  }
}
