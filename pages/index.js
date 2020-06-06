import withSession from '../lib/session'
import { redirect } from '../lib'
import Link from 'next/link'

const Home = ({ user }) => (
  <div className="container">
    <main>
      <h1>Hobochilds boilerplate</h1>
      <Link href="/login">
        <a>Login</a>
      </Link>
    </main>
  </div>
)

export const getServerSideProps = withSession(async ({ req, res }) => {
  const user = req.session.get('user')

  if (user) {
    return redirect('/dashboard')({ req, res })
  }

  return {
    props: {
      user: user ? user : {}
    }
  }
})

export default Home
