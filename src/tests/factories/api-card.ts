import { randomUUID as uuid } from 'node:crypto'

import { Card, CardProps } from '@/infra/api/entities/card'

import { makeSet } from './api-set'

export type Override = Partial<CardProps>
export function makeCard(override: Override = {}) {
  const card = new Card({
    name: 'name example',
    colors: ['B'],
    formats: ['standard'],
    versions: ['nonFoil'],
    rarity: 'rare',
    id: uuid(),
    imageUri: 'image uri example',
    type: 'type example',
    set: makeSet(),
    ...override,
  })

  return card
}
