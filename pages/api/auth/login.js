import withSession, { login } from '../../../lib/session'
import { createUser, getUserByEmail } from '../../../lib/db'
import bcrypt from 'bcrypt'

export async function handler(req, res) {
  const { email, password } = req.body
  let user = await getUserByEmail(email)

  if (user) {
    const result = await bcrypt.compare(password, user.password)
    if (!result) {
      res.status(403).send('Incorrect password')
      return
    }
  } else {
    user = await createUser({ email, password })
  }

  await login(req, {
    id: user.id,
    email: user.email
  })

  res.send('Logged in')
}

export default withSession(handler)
