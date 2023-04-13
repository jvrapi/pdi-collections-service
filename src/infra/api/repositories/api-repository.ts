import { Card } from '../entities/card'

export interface PaginationProps {
  take: number
  skip?: number
}

export interface ApiRepository {
  findCardById(id: string, props: PaginationProps): Promise<Card | null>
  findCardsByName(name: string, props: PaginationProps): Promise<Card[]>
  getRandomCards(): Promise<Card[]>
}
