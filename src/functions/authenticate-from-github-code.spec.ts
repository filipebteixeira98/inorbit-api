import { describe, it, beforeEach, vi, expect } from 'vitest'
import { and, eq, ne } from 'drizzle-orm'

import { database } from '../db'

import { users } from '../db/schema'

import { makeUser } from '../../tests/factories/make-user'

import { AuthenticateFromGithubCode } from './authenticate-from-github-code'

import * as github from '../modules/github-oauth'

describe('authenticate from github code', () => {
  beforeEach(() => {
    vi.mock('../modules/github-oauth')

    // vi.mock('../modules/github-oauth', () => {
    //   return {
    //     getUserFromAccessToken: vi.fn().mockResolvedValue({
    //       id: Math.floor(Math.random() * 10),
    //       name: 'John Doe',
    //       email: null,
    //       avatar_url: 'https://github.com/filipebteixeira98.png',
    //     }),
    //   }
    // })

    vi.clearAllMocks()
  })

  it('should be able to authenticate from github code', async () => {
    vi.spyOn(github, 'getUserFromAccessToken').mockResolvedValueOnce({
      id: 1,
      name: 'John Doe',
      email: null,
      avatar_url: 'https://github.com/filipebteixeira98.png',
    })

    const sut = await AuthenticateFromGithubCode({
      code: 'sample-github-code',
    })

    expect(sut.token).toEqual(expect.any(String))

    const [user] = await database
      .select()
      .from(users)
      .where(eq(users.externalAccountId, 1))

    expect(user.name).toEqual('John Doe')
  })

  it('should be able to authenticate with existing github user', async () => {
    const existingUser = await makeUser({
      name: 'Jane Doe',
    })

    await database
      .delete(users)
      .where(
        and(
          eq(users.externalAccountId, existingUser.externalAccountId),
          ne(users.id, existingUser.id)
        )
      )

    vi.spyOn(github, 'getUserFromAccessToken').mockResolvedValueOnce({
      id: existingUser.externalAccountId,
      name: 'John Doe',
      email: null,
      avatar_url: 'https://github.com/filipebteixeira98.png',
    })

    const sut = await AuthenticateFromGithubCode({
      code: 'sample-github-code',
    })

    expect(sut.token).toEqual(expect.any(String))

    const [user] = await database
      .select()
      .from(users)
      .where(eq(users.externalAccountId, existingUser.externalAccountId))

    expect(user.name).toEqual('Jane Doe')
  })
})
