import dayjs from 'dayjs'

import { client, database } from '.'

import { goalCompletions, goals, users } from './schema'

async function seed() {
  await database.delete(goalCompletions)

  await database.delete(goals)

  const [user] = await database
    .insert(users)
    .values({
      name: 'John Doe',
      email: 'johndoe@email.com',
      externalAccountId: Math.floor(Math.random() * 10),
      avatarUrl: 'https://github.com/filipebteixeira98.png',
    })
    .returning()

  const currentWeekGoals = await database
    .insert(goals)
    .values([
      { userId: user.id, title: 'Wake up early', desiredWeeklyFrequency: 5 },
      { userId: user.id, title: 'Workout', desiredWeeklyFrequency: 5 },
      { userId: user.id, title: 'Pray', desiredWeeklyFrequency: 7 },
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
