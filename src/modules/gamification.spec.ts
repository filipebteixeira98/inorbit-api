import { expect, test } from 'vitest'

import {
  calculateLevelFromExperience,
  calculateExperienceForNextLevel,
} from './gamification'

test('total experience to level', () => {
  const firstExperience = calculateExperienceForNextLevel(1)

  const secondExperience = calculateExperienceForNextLevel(2)

  const thirdExperience = calculateExperienceForNextLevel(3)

  expect(firstExperience).toEqual(20)

  expect(secondExperience).toEqual(20 + 26)

  expect(thirdExperience).toEqual(20 + 26 + 33)
})

test('level from experience', () => {
  const firstLevel = calculateLevelFromExperience(1)

  const secondLevel = calculateLevelFromExperience(20)

  const fourthLevel = calculateLevelFromExperience(79)

  expect(firstLevel).toEqual(1)

  expect(secondLevel).toEqual(2)

  expect(fourthLevel).toEqual(4)
})
