import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class BaseCardModel {
  @Field(() => String)
  id: string

  @Field(() => String)
  name: string

  @Field(() => String)
  imageUri: string
}
