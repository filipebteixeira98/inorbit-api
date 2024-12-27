import { database } from '../db'

import { goals } from '../db/schema'

interface CreateGoalRequest {
  userId: string
  title: string
  desiredWeeklyFrequency: number
}

export async function createGoal({
  userId,
  title,
  desiredWeeklyFrequency,
}: CreateGoalRequest) {
  const result = await database
    .insert(goals)
    .values({
      userId,
      title,
      desiredWeeklyFrequency,
    })
    .returning()

  const goal = result[0]

  return {
    goal,
  }
}
