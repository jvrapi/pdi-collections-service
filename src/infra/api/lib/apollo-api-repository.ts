import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client/core'
import fetch from 'cross-fetch'

import { Card } from '../entities/card'
import { CardsResponse, getCardsQuery } from '../gql/queries/card'
import { ApolloCardsMapper } from '../mappers/apollo-cards-mapper'
import { ApiRepository, PaginationProps } from '../repositories/api-repository'

const { CARDS_SERVICE_URL } = process.env

export class ApolloApiRepository implements ApiRepository {
  private client: ApolloClient<NormalizedCacheObject>

  constructor() {
    this.client = new ApolloClient({
      link: new HttpLink({
        uri: `${CARDS_SERVICE_URL}/graphql`,
        fetch,
      }),
      cache: new InMemoryCache(),
      ssrMode: true,
    })
  }

  async findCardById(
    id: string,
    props?: PaginationProps,
  ): Promise<Card | null> {
    const { data } = await this.client.query<CardsResponse>({
      query: getCardsQuery,
      variables: {
        cardsFilters: {
          id,
          take: props?.take,
          skip: props?.skip,
        },
      },
    })

    if (data.cards?.length === 0) {
      return null
    }

    return ApolloCardsMapper.toDomain(data.cards[0])
  }

  async findCardsByName(
    name: string,
    props?: PaginationProps | undefined,
  ): Promise<Card[]> {
    const { data } = await this.client.query<CardsResponse>({
      query: getCardsQuery,
      variables: {
        cardsFilters: {
          name,
          take: props?.take,
          skip: props?.skip,
        },
      },
    })
    return data.cards?.map(ApolloCardsMapper.toDomain)
  }

  async getRandomCards(): Promise<Card[]> {
    const { data } = await this.client.query<CardsResponse>({
      query: getCardsQuery,
      variables: {
        cardsFilters: {
          take: 10,
        },
      },
    })

    return data.cards?.map(ApolloCardsMapper.toDomain)
  }
}
