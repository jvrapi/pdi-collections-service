import { User, UserProps } from '@/app/entities/user'

export type Override = Partial<UserProps>
export function makeUser(override: Override = {}) {
  const user = new User({
    email: 'toprak@jarhu.ge',
    name: 'Micheal Stokes',
    username: 'OJsrC',
    ...override,
  })

  user.password = 'w4WWV'
  return user
}
