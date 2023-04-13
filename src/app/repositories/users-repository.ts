import { User } from '../entities/user'

export interface UsersRepository {
  findByEmail(email: string): Promise<User | null>
  findByUsername(username: string): Promise<User | null>
  findById(id: string): Promise<User | null>
  create(user: User): Promise<User>
  save(user: User): Promise<User>
}
