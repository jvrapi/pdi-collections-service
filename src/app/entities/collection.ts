import { randomUUID as uuid } from 'node:crypto'

import { Card } from './card'
import { User } from './user'

interface CollectionProps {
  isShared: boolean
  userId: string
  createdAt?: Date
  updatedAt?: Date
}

export class Collection {
  private _id: string
  private props: CollectionProps
  private _user: User
  private _cards: Card[]

  constructor(props: CollectionProps, id?: string) {
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    }
    this._id = id ?? uuid()
  }

  get id() {
    return this._id
  }

  get isShared() {
    return this.props.isShared
  }

  get userId() {
    return this.props.userId
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  get user() {
    return this._user
  }

  set user(user: User) {
    this._user = user
  }

  get cards() {
    return this._cards
  }

  set cards(cards: Card[]) {
    this._cards = cards
  }
}
