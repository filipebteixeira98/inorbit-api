import { expect, test } from 'vitest'

import {
  calculateExperienceToLevel,
  calculateLevelFromExperience,
} from './gamification'

test('experience to level', () => {
  const firstExperience = calculateExperienceToLevel(1)

  const secondExperience = calculateExperienceToLevel(2)

  const fourthExperience = calculateExperienceToLevel(4)

  expect(firstExperience).toEqual(0)

  expect(secondExperience).toEqual(26)

  expect(fourthExperience).toEqual(43)
})

test('level from experience', () => {
  const firstLevel = calculateLevelFromExperience(10)

  const secondLevel = calculateLevelFromExperience(27)

  const fourthLevel = calculateLevelFromExperience(26 + 33 + 43)

  expect(firstLevel).toEqual(1)

  expect(secondLevel).toEqual(2)

  expect(fourthLevel).toEqual(4)
})
