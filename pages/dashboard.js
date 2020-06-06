import React from 'react'
import withSession from '../lib/session'
import { redirect } from '../lib'
import { withRouter } from 'next/router'

const Home = ({ user, router }) => (
  <div>
    <main>
      <h1>
        {user.id}: {user.email}
      </h1>
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

export const getServerSideProps = withSession(({ req, res }) => {
  const user = req.session.get('user')
  if (!user) {
    redirect('/login')({ req, res })
  }

  return {
    props: {
      user
    }
  }
})

export default withRouter(Home)
