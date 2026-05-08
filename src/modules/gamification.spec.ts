import { expect, test } from 'vitest'

import {
  calculateExperienceForNextLevel,
  calculateLevelFromExperience,
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
  const firstLevel = calculateLevelFromExperience(5)

  const secondLevel = calculateLevelFromExperience(20)

  const fourthLevel = calculateLevelFromExperience(20 + 26 + 33 + 43)

  expect(firstLevel).toEqual(1)

  expect(secondLevel).toEqual(2)

  expect(fourthLevel).toEqual(4)
})
