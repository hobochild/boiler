import React from 'react'
import withSession from '../lib/session'
import { redirect } from '../lib'
import { withRouter } from 'next/router'
import client from 'nawr/client'

const Home = ({ user, router, users }) => (
  <div>
    <main>
      <h1>
        {user.id}: {user.email}
      </h1>
      <ul>
        {users.map(({ email, id, password }) => {
          return (
            <li key={id}>
              {email}: {password}
            </li>
          )
        })}
      </ul>
      <div>
        <button
          onClick={async () => {
            await fetch('/api/auth/logout', {
              method: 'POST'
            })

            router.push('/login')
          }}
        >
          Logout
        </button>
      </div>
    </main>
  </div>
)

export const getServerSideProps = withSession(async ({ req, res }) => {
  const user = req.session.get('user')
  if (!user) {
    redirect('/login')({ req, res })
  }

  const { records } = await client.query('select * from users;')

  return {
    props: {
      user,
      users: records
    }
  }
})

export default withRouter(Home)
