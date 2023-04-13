import gql from 'graphql-tag'

import { CardProps } from '../../entities/card'

type GraphQlResponse<K extends string, T> = Record<K, T>

export type CardsResponse = GraphQlResponse<'cards', CardProps[]>

export const getCardsQuery = gql`
  query getCards($cardsFilters: CardFilters!) {
    cards(cardsFilters: $cardsFilters) {
      id
      name
      rarity
      type
      colors
      formats
      versions
      imageUri
      faces {
        id
        name
        type
        colors
      }
      set {
        id
        name
        code
        releasedAt
      }
    }
  }
`
