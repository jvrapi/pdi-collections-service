import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class User {
  @Field(() => String)
  id: string

  @Field(() => String)
  name: string

  @Field(() => String)
  username: string

  @Field(() => String)
  email: string

  @Field(() => Date)
  createdAt: Date

  @Field(() => Date)
  updatedAt: Date
}
