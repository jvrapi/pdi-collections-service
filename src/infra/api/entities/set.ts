export interface SetProps {
  id: string
  name: string
  code: string
  releasedAt: string
  iconUri: string
}

export class Set {
  private props: SetProps
  constructor(props: SetProps) {
    this.props = props
  }

  get id() {
    return this.props.id
  }

  get name() {
    return this.props.name
  }

  get code() {
    return this.props.code
  }

  get releasedAt() {
    return this.props.releasedAt
  }

  get iconUri() {
    return this.props.iconUri
  }
}
