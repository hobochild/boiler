import withSession from '../../../lib/session'

async function handler(req, res) {
  // get user from database then:
  // verify password.

  req.session.set('user', {
    id: 230,
    name: 'hobo',
    email: req.body.email,
    admin: true
  })
  await req.session.save()
  res.send('Logged in')
}

export default withSession(handler)
