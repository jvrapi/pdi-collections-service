import { User as Raw } from '@prisma/client'

import { User } from '@/app/entities/user'

export class PrismaUsersMapper {
  static toDomain(raw: Raw): User {
    const user = new User(
      {
        email: raw.email,
        name: raw.name,
        username: raw.username,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      raw.id,
    )

    user.password = raw.password
    return user
  }

  static toPrisma(user: User) {
    return {
      email: user.email,
      name: user.name,
      username: user.username,
      password: user.password!,
    }
  }
}
