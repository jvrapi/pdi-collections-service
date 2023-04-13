import { User } from '@/app/entities/user'
import { UsersRepository } from '@/app/repositories/users-repository'

export class InMemoryUsersRepository implements UsersRepository {
  private users: User[] = []

  async findById(id: string): Promise<User | null> {
    return this.users.find((user) => user.id === id) || null
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find((user) => user.email === email) || null
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.users.find((user) => user.username === username) || null
  }

  async create(user: User): Promise<User> {
    this.users.push(user)

    return user
  }

  async save({ id, email, username, name }: User): Promise<User> {
    const userIndex = this.users.findIndex((user) => user.id === id)

    this.users[userIndex] = new User(
      {
        name,
        username,
        email,
        createdAt: this.users[userIndex].createdAt,
      },
      id,
    )

    return this.users[userIndex]
  }
}
