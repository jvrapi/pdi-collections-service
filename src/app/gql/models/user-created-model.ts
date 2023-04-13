import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class UserCreated {
  @Field(() => String)
  id: string
}
