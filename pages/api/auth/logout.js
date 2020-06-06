import withSession from '../../../lib/session'

function handler(req, res, session) {
  req.session.destroy()
  res.send('Logged out')
}

export default withSession(handler)
