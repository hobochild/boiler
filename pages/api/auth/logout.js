import withSession from '../../../lib/session'

export function handler(req, res) {
  req.session.destroy()
  res.send('Logged out')
}

export default withSession(handler)
