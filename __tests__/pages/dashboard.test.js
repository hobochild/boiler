import React from 'react'
import renderer from 'react-test-renderer'
import Dash, { handler as getServerSideProps } from '../../pages/dashboard'
import { ServerResponse, IncomingMessage, request, Headers } from 'http'
import { apply, login } from '../../lib/session'

it('Redirects to login page with unauthed user', async () => {
  const req = new IncomingMessage({
    method: 'GET'
  })
  const res = new ServerResponse(req)
  await apply(req, res)

  const props = await getServerSideProps({
    req,
    res
  })

  expect(res.statusCode).toBe(302)
})

it('Renders correctly with logged in user', async () => {
  // TODO create user in db first

  const user = {
    email: 'x@x.com',
    password: '123'
  }

  const req = new IncomingMessage({
    method: 'GET'
  })
  const res = new ServerResponse(req)

  await apply(req, res)
  await login(req, user)

  const { props } = await getServerSideProps({
    req,
    res
  })

  expect(props.user).toEqual(user)
  const tree = renderer.create(<Dash {...props} />).toJSON()
  expect(tree).toMatchSnapshot()
})
