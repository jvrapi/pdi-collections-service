import { Field, InputType } from 'type-graphql'

@InputType()
export class AuthenticateUserInput {
  @Field(() => String)
  username: string

  @Field(() => String)
  password: string
}
