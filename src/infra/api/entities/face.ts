export interface FaceProps {
  id: string
  name: string
  type: string
  colors: string[]
  imageUri: string
}

export class Face {
  private props: FaceProps
  constructor(props: FaceProps) {
    this.props = props
  }

  get id() {
    return this.props.id
  }

  get name() {
    return this.props.name
  }

  get type() {
    return this.props.type
  }

  get colors() {
    return this.props.colors
  }

  get imageUri() {
    return this.props.imageUri
  }
}
