import { Field, InputType, Int } from 'type-graphql'

@InputType()
export class UserCollectionInput {
  @Field(() => Int)
  take: number

  @Field(() => Int, { nullable: true })
  skip?: number
}
