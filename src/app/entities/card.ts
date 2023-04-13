import { randomUUID as uuid } from 'node:crypto'

import { Collection } from '@prisma/client'

interface CardProps {
  quantity: number
  addedAt?: Date
  updatedAt?: Date
  collectionId: string
}

export class Card {
  private props: CardProps
  private _id: string
  private _collection: Collection
  private _imageUri: string
  constructor(props: CardProps, id?: string) {
    this.props = {
      ...props,
      addedAt: props.addedAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    }
    this._id = id ?? uuid()
  }

  get quantity() {
    return this.props.quantity
  }

  set quantity(quantity: number) {
    this.props.quantity = quantity
  }

  get addedAt() {
    return this.props.addedAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  get collectionId() {
    return this.props.collectionId
  }

  get id() {
    return this._id
  }

  get collection() {
    return this._collection
  }

  set collection(collection: Collection) {
    this._collection = collection
  }

  get imageUri() {
    return this._imageUri
  }

  set imageUri(imageUri: string) {
    this._imageUri = imageUri
  }
}
