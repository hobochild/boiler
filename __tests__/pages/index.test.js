import React from 'react'
import renderer from 'react-test-renderer'
import Home, { handler as getServerSideProps } from '../../pages/index'
import { ServerResponse, IncomingMessage, request, Headers } from 'http'
import { apply, login } from '../../lib/session'

it('Renders correctly', async () => {
  const req = new IncomingMessage({
    method: 'GET'
  })
  const res = new ServerResponse(req)
  await apply(req, res)

  const { props } = await getServerSideProps({ req, res })
  const tree = renderer.create(<Home {...props} />).toJSON()
  expect(tree).toMatchSnapshot()
})
