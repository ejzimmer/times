import React, { useContext } from 'react'
import { signInWithGoogle, UserContext } from '..'

export default function Auth() {

  const user = useContext(UserContext)

  console.log(user)

  return (
    <div className="auth">
      You need to 
      <button onClick={signInWithGoogle}>log in</button>
      to update times
    </div>
  )
}