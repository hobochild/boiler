import client from 'nawr/client'

const Home = ({ users }) => (
  <div className="container">
    <main>
      <h1>Nawr Demo</h1>
      <ul>
        {users.map(({ name }) => {
          return <li key={name}>{name}</li>
        })}
      </ul>
    </main>
  </div>
)

export const getServerSideProps = async () => {
  const { records } = await client.query('select * from users;')

  return {
    props: {
      users: records
    }
  }
}

export default Home
