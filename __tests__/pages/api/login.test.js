import { getUserByEmail, createUser } from '../../../lib/db'
import { apply, options as sessionOptions } from '../../../lib/session'
import { handler } from '../../../pages/api/auth/login'
import { createRequest, createResponse } from 'node-mocks-http'
import client from 'nawr/client'
import cookie from 'cookie'

it('Returns 402 if auth fails', async () => {
  const newUser = {
    email: 'x@x.com',
    password: '123'
  }

  await createUser(newUser)

  const req = createRequest({
    body: {
      email: newUser.email,
      password: 'xzy'
    }
  })

  const res = createResponse()

  // applys iron session
  await apply(req, res)

  // call api
  await handler(req, res)

  expect(res.statusCode).toBe(403)
})

it('Creates a user if does not exist', async () => {
  const newUser = {
    email: 'x@x.com',
    password: '123'
  }

  const req = createRequest({
    body: newUser
  })
  const res = createResponse()

  // applys iron session
  await apply(req, res)

  // call api
  await handler(req, res)

  expect(res.statusCode).toBe(200)

  // check that cookie was set
  const cookies = cookie.parse(res.getHeader('set-cookie')[0])
  expect(cookies).toHaveProperty(sessionOptions.cookieName)

  // check that user was created
  const user = await getUserByEmail(newUser.email)
  expect(user.email).toEqual(newUser.email)
})

it('Does not create a new user if already exists', async () => {
  const newUser = {
    email: 'x@x.com',
    password: '123'
  }

  await createUser(newUser)

  await client.query('select count(*) from users;').then(({ records }) => {
    expect(records[0].count).toBe(1)
  })

  const req = createRequest({
    body: newUser
  })

  const res = createResponse()

  // applys iron session
  await apply(req, res)

  // call api
  await handler(req, res)

  expect(res.statusCode).toBe(200)
  await client.query('select count(*) from users;').then(({ records }) => {
    expect(records[0].count).toBe(1)
  })
})
