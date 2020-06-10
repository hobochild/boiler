import { useRef, useState } from 'react'
import { withRouter } from 'next/router'

const login = payload => {
  return fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  }).then(async res => {
    if (!res.ok) {
      throw Error(res.statusText)
    }

    return res.text()
  })
}

export default withRouter(({ router }) => {
  const emailRef = useRef()
  const passwordRef = useRef()
  const [error, setError] = useState()

  return (
    <div>
      {error && <p style={{ color: '#ef2d5e' }}>⚠️ {error}</p>}
      <form
        onSubmit={async e => {
          e.preventDefault()
          try {
            setError(null)
            await login({
              email: emailRef.current.value,
              password: passwordRef.current.value
            })
            router.push('/dashboard')
          } catch (e) {
            console.error(e)
            setError(e.message)
          }
        }}
      >
        <input type="email" ref={emailRef} />
        <input type="password" ref={passwordRef} />
        <button className="filled" type="submit">
          Login
        </button>
      </form>
    </div>
  )
})
