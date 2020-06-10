import { withIronSession, applySession } from 'next-iron-session'

export const options = {
  password:
    process.env.SECRET_COOKIE_PASSWORD || 'your-thirty-two-character-secret',
  cookieName: 'auth-cookie',
  cookieOptions: {
    // the next line allows to use the session in non-https environements like
    // Next.js dev mode (http://localhost:3000)
    secure: process.env.NODE_ENV === 'production'
  }
}

export default function withSession(handler) {
  return withIronSession(handler, options)
}

export function apply(req, res) {
  return applySession(req, res, options)
}

export function login(req, user) {
  req.session.set('user', user)
  return req.session.save()
}
