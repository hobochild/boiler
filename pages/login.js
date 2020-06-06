import React, { useRef } from 'react'
import { withRouter } from 'next/router'

const login = payload => {
  return fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
}

export default withRouter(({ router }) => {
  const emailRef = useRef()
  const passwordRef = useRef()

  return (
    <div>
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
        <input value="x@gmail.com" type="email" ref={emailRef} />
        <input password="yy" type="password" ref={passwordRef} />
        <button type="submit">Login</button>
      </form>
    </div>
  )
})
