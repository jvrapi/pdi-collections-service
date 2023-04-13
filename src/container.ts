import 'reflect-metadata'

import { container } from 'tsyringe'

import { CardsRepository } from './app/repositories/cards-repository'
import { CollectionsRepository } from './app/repositories/collections-repository'
import { UsersRepository } from './app/repositories/users-repository'
import { ApolloApiRepository } from './infra/api/lib/apollo-api-repository'
import { ApiRepository } from './infra/api/repositories/api-repository'
import { PrismaCardsRepository } from './infra/database/prisma/repositories/prisma-cards-repository'
import { PrismaCollectionsRepository } from './infra/database/prisma/repositories/prisma-collections-repository'
import { PrismaUsersRepository } from './infra/database/prisma/repositories/prisma-users-repository'

container.register<UsersRepository>('UsersRepository', PrismaUsersRepository)

container.register<CollectionsRepository>(
  'CollectionsRepository',
  PrismaCollectionsRepository,
)

container.register<CardsRepository>('CardsRepository', PrismaCardsRepository)

container.register<ApiRepository>('ApiRepository', ApolloApiRepository)
