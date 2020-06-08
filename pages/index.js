import withSession from '../lib/session'
import Link from 'next/link'

const Home = ({ user }) => (
  <div>
    <h1>Hobochilds boilerplate</h1>
    <blockquote>
      This is a starting point for building webapps simply and quickly.
    </blockquote>
    <p>
      It's feature set is built with the idea of getting an ugly mvp out
      quickly. For this reason you wont see every available authentication
      option or a built in component system. It's just a next.js app with some
      decisions made for you on how to authenticate a user and store that user
      in a db.
    </p>
    <h5>Features</h5>
    <ul>
      <li>Email Auth with stateless cookies.</li>
      <li>
        A sql database - automatically configured with a migration system and
        branch deploys.
      </li>
      <li>Basic test-suite to start you off right.</li>
      <li>Minimal styling so you can show it to your friends.</li>
    </ul>
  </div>
)

export const handler = async ({ req, res }) => {
  const user = req.session.get('user') || null

  return {
    props: {
      user
    }
  }
}
export const getServerSideProps = withSession(handler)

export default Home
