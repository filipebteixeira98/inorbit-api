import { describe, it, expect } from 'vitest'

import { database } from '../db'

import { users } from '../db/schema'

import { getUser } from './get-user'

describe('get user', () => {
  it('should be able to get a user', async () => {
    const [user] = await database
      .insert(users)
      .values({
        id: crypto.randomUUID(),
        avatarUrl: 'https://github.com/filipebteixeira98.png',
        externalAccountId: Math.floor(Math.random() * 10),
      })
      .returning()

    const result = await getUser({ userId: user.id })

    expect(result).toEqual({
      user: {
        id: user.id,
        name: null,
        email: null,
        avatarUrl: 'https://github.com/filipebteixeira98.png',
      },
    })
  })
})
