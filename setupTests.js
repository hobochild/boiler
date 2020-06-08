import { up, down } from 'nawr/migrate'

beforeEach(async () => {
  return up()
})

afterEach(() => {
  return down({ to: 0 })
})
