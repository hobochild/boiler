import renderer from 'react-test-renderer'
import Home, { handler as getServerSideProps } from '../../pages/index'
import { createRequest, createResponse } from 'node-mocks-http'
import { apply, login } from '../../lib/session'

it('Renders correctly', async () => {
  const req = createRequest({
    method: 'GET'
  })
  const res = createResponse()
  await apply(req, res)

  const { props } = await getServerSideProps({ req, res })
  const tree = renderer.create(<Home {...props} />).toJSON()
  expect(tree).toMatchSnapshot()
})
