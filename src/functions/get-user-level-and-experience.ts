import { eq } from 'drizzle-orm'

import { database } from '../db'

import { users } from '../db/schema'

import {
  calculateLevelFromExperience,
  calculateTotalExperienceForLevel,
} from '../modules/gamification'

interface GetUserLevelAndExperienceRequest {
  userId: string
}

export async function getUserLevelAndExperience({
  userId,
}: GetUserLevelAndExperienceRequest) {
  const [{ experience }] = await database
    .select({ experience: users.experience })
    .from(users)
    .where(eq(users.id, userId))

  const level = calculateLevelFromExperience(experience)

  const experienceToNextLevel = calculateTotalExperienceForLevel(level)

  return {
    experience,
    level,
    experienceToNextLevel,
  }
}