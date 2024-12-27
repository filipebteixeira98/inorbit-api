import type { InferSelectModel } from 'drizzle-orm'
import { faker } from '@faker-js/faker'

import { database } from '../../src/db'

import { goals } from '../../src/db/schema'

export async function makeGoal(
  override: Partial<InferSelectModel<typeof goals>> &
    Pick<InferSelectModel<typeof goals>, 'userId'>
) {
  const [row] = await database
    .insert(goals)
    .values({
      title: faker.lorem.word(),
      desiredWeeklyFrequency: faker.number.int({ min: 1, max: 7 }),
      ...override,
    })
    .returning()

  return row
}
