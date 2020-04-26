import React, { useContext } from 'react'
import { signInWithGoogle, UserContext } from '..'

export default function Auth() {

  const user = useContext(UserContext)

  if (user) {
    const firstName = user.displayName.split(' ')[0]
    return (
      <div className="auth">
        Hello {firstName}
      </div>
    )
  }

  return (
    <div className="auth">
      You need to 
      <button onClick={signInWithGoogle}>log in</button>
      to update times
    </div>
  )
}