import { Field, InputType, Int } from 'type-graphql'

@InputType()
export class GetCardsInput {
  @Field(() => String, { nullable: true })
  name?: string

  @Field(() => Int, { nullable: true })
  skip?: number

  @Field(() => Int)
  take: number
}
