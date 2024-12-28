import { describe, it, expect } from 'vitest'
import dayjs from 'dayjs'

import { makeUser } from '../../tests/factories/make-user'
import { makeGoal } from '../../tests/factories/make-goal'
import { makeGoalCompletion } from '../../tests/factories/make-goal-completion'

import { getWeekSummary } from './get-week-summary'

describe('get week summary', () => {
  it('should be able to get week summary', async () => {
    const user = await makeUser()

    const weekStartsAt = dayjs(new Date(2024, 11, 22))
      .startOf('week')
      .toDate()

    const firstGoal = await makeGoal({
      userId: user.id,
      title: 'Wake up early',
      desiredWeeklyFrequency: 7,
    })

    const secondGoal = await makeGoal({
      userId: user.id,
      title: 'Go to gym',
      desiredWeeklyFrequency: 7,
    })

    await makeGoalCompletion({
      goalId: firstGoal.id,
      createdAt: dayjs(weekStartsAt).add(2, 'day').toDate(),
    })

    await makeGoalCompletion({
      goalId: secondGoal.id,
      createdAt: dayjs(weekStartsAt).add(4, 'day').toDate(),
    })

    const result = await getWeekSummary({
      userId: user.id,
      weekStartsAt,
    })

    console.log(result)

    expect(result).toEqual({
      summary: {
        total: 14,
        completed: 2,
        goalsPerDay: {
          '2024-12-26': expect.arrayContaining([
            expect.objectContaining({
              title: 'Go to gym',
            }),
          ]),
          '2024-12-24': expect.arrayContaining([
            expect.objectContaining({
              title: 'Wake up early',
            }),
          ]),
        },
      },
    })
  })
})
