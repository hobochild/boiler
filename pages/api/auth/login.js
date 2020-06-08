import withSession from '../../../lib/session'
import { createUser, getUserByEmail } from '../../../lib/db'
import bcrypt from 'bcrypt'
const SALT_ROUNDS = 8

async function handler(req, res) {
  const { email, password } = req.body
  let user = await getUserByEmail(email)

  if (user) {
    const result = await bcrypt.compare(password, user.password)
    console.log({ result })
    if (!result) {
      res.status(403).send('Incorrect password')
      return
    }
  } else {
    const hash = await bcrypt.hash(password, SALT_ROUNDS)
    user = await createUser({ email, password: hash })
  }

  req.session.set('user', {
    id: user.id,
    email: user.email
  })
  await req.session.save()
  res.send('Logged in')
}

export default withSession(handler)
