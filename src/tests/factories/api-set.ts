import { randomUUID as uuid } from 'crypto'

import { Set, SetProps } from '@/infra/api/entities/set'

export type Override = Partial<SetProps>

export function makeSet(override: Override = {}) {
  return new Set({
    code: 'code-example',
    name: 'name-example',
    releasedAt: new Date().toISOString().split('T')[0],
    iconUri: 'icon uri',
    id: uuid(),
    ...override,
  })
}
