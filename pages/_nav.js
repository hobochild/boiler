import Link from 'next/link'
import { withRouter } from 'next/router'

export default withRouter(({ user, router }) => {
  if (user) {
    return (
      <div style={{ marginBottom: '20px' }}>
        <Link href="/dashboard">
          <a>Dashboard</a>
        </Link>
        &nbsp;
        <a
          onClick={async e => {
            e.preventDefault()
            await fetch('/api/auth/logout', {
              method: 'POST'
            })

            router.push('/login')
          }}
        >
          Logout
        </a>
      </div>
    )
  }

  return (
    <div style={{ marginBottom: '20px' }}>
      <Link href="/login">
        <a>Login</a>
      </Link>
      &nbsp;
      <Link href="/">
        <a>Home</a>
      </Link>
    </div>
  )
})
