import { createUser } from '../../../lib/db'
import { apply, options as sessionOptions, login } from '../../../lib/session'
import { handler } from '../../../pages/api/auth/logout'
import { createRequest, createResponse } from 'node-mocks-http'
import cookie from 'cookie'

it('Returns 402 if auth fails', async () => {
  const newUser = {
    email: 'x@x.com',
    password: '123'
  }

  await createUser(newUser)

  const req = createRequest({
    method: 'POST'
  })

  const res = createResponse()

  // applys iron session
  await apply(req, res)

  // log user in
  await login(req, newUser)

  // call api
  await handler(req, res)

  const cookies = cookie.parse(res.getHeader('set-cookie')[0])
  expect(cookies[sessionOptions.cookieName]).toBeFalsy()

  expect(res.statusCode).toBe(200)
})
