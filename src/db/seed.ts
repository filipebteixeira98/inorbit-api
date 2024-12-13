import { client, database } from '.'

import { goalCompletions, goals } from './schema'

async function seed() {
  await database.delete(goalCompletions)

  await database.delete(goals)

  await database.insert(goals).values([
    { title: 'Wake up early', desiredWeeklyFrequency: 5 },
    { title: 'Workout', desiredWeeklyFrequency: 5 },
    { title: 'Pray', desiredWeeklyFrequency: 7 },
  ])
}

seed().finally(() => {
  client.end()
})
