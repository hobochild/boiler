import renderer from 'react-test-renderer'
import Nav from '../../pages/_nav'
import { v4 as uuid } from 'uuid'

it('Returns correct Nav when user logged out', async () => {
  const tree = renderer.create(<Nav user={null} />).toJSON()
  expect(tree).toMatchSnapshot()
})

it('Returns correct Nav when user logged in', async () => {
  const user = {
    email: '123',
    id: uuid()
  }

  const tree = renderer.create(<Nav user={user} />).toJSON()
  expect(tree).toMatchSnapshot()
})
