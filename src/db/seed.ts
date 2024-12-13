import dayjs from 'dayjs'

import { client, database } from '.'

import { goalCompletions, goals } from './schema'

async function seed() {
  await database.delete(goalCompletions)

  await database.delete(goals)

  const currentWeekGoals = await database
    .insert(goals)
    .values([
      { title: 'Wake up early', desiredWeeklyFrequency: 5 },
      { title: 'Workout', desiredWeeklyFrequency: 5 },
      { title: 'Pray', desiredWeeklyFrequency: 7 },
    ])
    .returning()

  const startOfWeek = dayjs().startOf('week')

  await database.insert(goalCompletions).values([
    { goalId: currentWeekGoals[0].id, createdAt: startOfWeek.toDate() },
    {
      goalId: currentWeekGoals[1].id,
      createdAt: startOfWeek.add(1, 'day').toDate(),
    },
  ])
}

seed().finally(() => {
  client.end()
})
