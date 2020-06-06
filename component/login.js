import React, { useRef } from 'react'
import useSWR, { mutate } from 'swr'

const Login = () => {
  const emailRef = useRef()
  const passwordRef = useRef()

  return (
    <div>
      Login
      <form
        onSubmit={async () => {
          const data = await fetch('api/auth/login', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              password: passwordRef.value,
              email: emailRef.value
            })
          }).then(res => res.json())
          console.log(data)
        }}
      >
        <input type="text" ref={emailRef} />
        <input type="password" ref={passwordRef} />
        <input type="submit" value="Submit" />
      </form>
    </div>
  )
}
