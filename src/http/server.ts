import fastify from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
  jsonSchemaTransform,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { fastifyCors } from '@fastify/cors'
import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import fastifyJwt from '@fastify/jwt'

import { createGoalRoute } from './routes/create-goal'
import { createCompletionRoute } from './routes/create-completion'
import { getPendingGoalsRoute } from './routes/get-pending-goals'
import { getWeekSummaryRoute } from './routes/get-week-summary'
import { authenticateFromGithubRoute } from './routes/authenticate-from-github'
import { getProfileRoute } from './routes/get-profile'
import { getUserLevelAndExperienceRoute } from './routes/get-user-level-and-experience'

import { env } from '../env'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, {
  origin: '*',
})

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

app.setValidatorCompiler(validatorCompiler)

app.setSerializerCompiler(serializerCompiler)

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'in.orbit',
      version: '1.0.0',
    },
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

app.register(getPendingGoalsRoute)

app.register(createGoalRoute)

app.register(createCompletionRoute)

app.register(getWeekSummaryRoute)

app.register(authenticateFromGithubRoute)

app.register(getProfileRoute)

app.register(getUserLevelAndExperienceRoute)

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('🚀 Server is running at http://localhost:3333/')
  })
