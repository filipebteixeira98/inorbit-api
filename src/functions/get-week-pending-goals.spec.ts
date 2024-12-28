import { describe, it, expect } from 'vitest'

import { makeUser } from '../../tests/factories/make-user'
import { makeGoal } from '../../tests/factories/make-goal'
import { makeGoalCompletion } from '../../tests/factories/make-goal-completion'

import { getWeekPendingGoals } from './get-week-pending-goals'

describe('get week pending goals', () => {
  it('should be able to get week pending goals', async () => {
    const user = await makeUser()

    const firstGoal = await makeGoal({
      userId: user.id,
      title: 'Pray',
      desiredWeeklyFrequency: 7,
    })

    const secondGoal = await makeGoal({
      userId: user.id,
      title: 'Study',
      desiredWeeklyFrequency: 7,
    })

    await makeGoalCompletion({ goalId: firstGoal.id })

    await makeGoalCompletion({ goalId: secondGoal.id })

    const result = await getWeekPendingGoals({
      userId: user.id,
    })

    expect(result).toEqual({
      pendingGoals: expect.arrayContaining([
        expect.objectContaining({
          title: 'Pray',
          desiredWeeklyFrequency: 7,
          completionCount: 1,
        }),
        expect.objectContaining({
          title: 'Study',
          desiredWeeklyFrequency: 7,
          completionCount: 1,
        }),
      ]),
    })
  })
})
