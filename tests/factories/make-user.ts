import type { InferSelectModel } from 'drizzle-orm'
import { faker } from '@faker-js/faker'

import { database } from '../../src/db'

import { users } from '../../src/db/schema'

export async function makeUser(
  override: Partial<InferSelectModel<typeof users>> = {}
) {
  const [row] = await database
    .insert(users)
    .values({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      avatarUrl: faker.image.avatarGitHub(),
      externalAccountId: faker.number.int({ min: 1, max: 1_000_000 }),
      ...override,
    })
    .returning()

  return row
}
