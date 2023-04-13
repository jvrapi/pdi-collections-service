import { User } from '@/app/entities/user'
import { UsersRepository } from '@/app/repositories/users-repository'

import { prisma } from '../connection'
import { PrismaUsersMapper } from '../mappers/prisma-users-mapper'

export class PrismaUsersRepository implements UsersRepository {
  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        Collection: true,
      },
    })
    if (!user) {
      return null
    }
    return PrismaUsersMapper.toDomain(user)
  }

  async findByUsername(username: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
      include: {
        Collection: true,
      },
    })
    if (!user) {
      return null
    }
    return PrismaUsersMapper.toDomain(user)
  }

  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })
    if (!user) {
      return null
    }
    return PrismaUsersMapper.toDomain(user)
  }

  async create(user: User): Promise<User> {
    const userCreated = await prisma.user.create({
      data: PrismaUsersMapper.toPrisma(user),
    })

    return PrismaUsersMapper.toDomain(userCreated)
  }

  async save({ id, email, name, username }: User): Promise<User> {
    const userUpdated = await prisma.user.update({
      where: {
        id,
      },
      data: {
        email,
        name,
        username,
        updatedAt: new Date(),
      },
    })

    return PrismaUsersMapper.toDomain(userUpdated)
  }
}
