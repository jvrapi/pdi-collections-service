import { Field, InputType, Int } from 'type-graphql'

@InputType()
export class AddCardInput {
  @Field(() => Int)
  quantity: number

  @Field(() => String)
  cardId: string
}
