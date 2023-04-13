import { Card, CardProps } from '../entities/card'

export class ApolloCardsMapper {
  static toDomain(card: CardProps): Card {
    return new Card(card)
  }
}
