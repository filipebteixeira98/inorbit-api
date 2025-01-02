import { z } from 'zod'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'

import { createGoalCompletion } from '../../functions/create-goal-completion'

export const createCompletionRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/completions',
    {
      schema: {
        tags: ['goals'],
        description: 'Complete a goal',
        operationId: 'createCompletion',
        body: z.object({
          goalId: z.string(),
        }),
        response: {
          201: z.null(),
        },
      },
    },
    async (request, reply) => {
      const userId = request.user.sub

      const { goalId } = request.body

      await createGoalCompletion({
        userId,
        goalId,
      })

      return reply.status(201).send()
    }
  )
}
