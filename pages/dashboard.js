import withSession from '../lib/session'
import { withRouter } from 'next/router'
import client from 'nawr/client'

const Dash = ({ user, router, users }) => (
  <div>
    <h3>hi 👋 {user.email}</h3>
    <p>Here is a list of all users stored in the db</p>
    <ul>
      {users.map(({ email, id, password }) => {
        return <li key={id}>{email}</li>
      })}
    </ul>
  </div>
)

export const handler = async ({ req, res }) => {
  const user = req.session.get('user') || null

  if (!user) {
    res.setHeader('location', '/login')
    res.statusCode = 302
    res.end()
    return { props: {} }
  }

  const { records } = await client.query('select * from users;')

  return {
    props: {
      user: user,
      users: records
    }
  }
}

export const getServerSideProps = withSession(handler)

export default withRouter(Dash)
