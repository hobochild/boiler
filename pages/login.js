import React, { useRef } from 'react'
import { withRouter } from 'next/router'
import Link from 'next/link'

const login = payload => {
  return fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  }).then(res => {
    res.statusCode >= 400
    throw new Error('Something went wrong.')
  })
}

export default withRouter(({ router }) => {
  const emailRef = useRef()
  const passwordRef = useRef()

  return (
    <div>
      <Link href="/">Home</Link>
      <form
        onSubmit={async e => {
          e.preventDefault()
          try {
            await login({
              email: emailRef.current.value,
              password: passwordRef.current.value
            })

            router.push('/dashboard')
          } catch (e) {
            alert(e.message)
          }
        }}
      >
        <input type="email" ref={emailRef} />
        <input type="password" ref={passwordRef} />
        <button type="submit">Login</button>
      </form>
    </div>
  )
})
