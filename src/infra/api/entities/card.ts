import { Face, FaceProps } from './face'
import { Set, SetProps } from './set'

export interface CardProps {
  id: string
  name: string
  rarity: string
  type: string
  colors: string[]
  formats: string[]
  versions: string[]
  faces?: FaceProps[]
  set: SetProps
  imageUri: string
}

export class Card {
  private props: CardProps
  private _set: Set
  private _faces?: Face[]

  constructor(props: CardProps) {
    this.props = props
    this._set = new Set(props.set)
    this._faces = props.faces?.map((face) => new Face(face))
  }

  get id() {
    return this.props.id
  }

  get name() {
    return this.props.name
  }

  get rarity() {
    return this.props.rarity
  }

  get type() {
    return this.props.type
  }

  get colors() {
    return this.props.colors
  }

  get formats() {
    return this.props.formats
  }

  get versions() {
    return this.props.versions
  }

  get faces() {
    return this._faces
  }

  get set() {
    return this._set
  }

  get imageUri() {
    return this.props.imageUri
  }
}
