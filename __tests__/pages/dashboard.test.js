import renderer from 'react-test-renderer'
import Dash, { handler as getServerSideProps } from '../../pages/dashboard'
import { apply, login } from '../../lib/session'
import { createRequest, createResponse } from 'node-mocks-http'
import { createUser } from '../../lib/db'

it('Redirects to login page with unauthed user', async () => {
  const req = createRequest({
    method: 'GET'
  })
  const res = createResponse()
  await apply(req, res)

  const props = await getServerSideProps({
    req,
    res
  })

  expect(res.statusCode).toBe(302)
})

it('Renders correctly with logged in user', async () => {
  const user = await createUser({
    email: 'x@x.com',
    password: '123'
  })

  const req = createRequest({
    method: 'GET'
  })
  const res = createResponse()

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
