import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from '..'
import spacetime from 'spacetime';
import firebase from 'firebase';

export default function Location({ timezones }) {
  const user = useContext(UserContext)
  const [initial, setInitial] = useState()
  const [timezone, setTimezone] = useState()
  const [previousTimezone, setPreviousTimezone] = useState()

  useEffect(() => {
    if (!user) {
      return
    }

    let initial = user.displayName.charAt(0)
    if (initial === 'M' || initial === 'G') {
      initial = 'M&G'
    }
    setInitial(initial)

    const t = timezones.find(([i]) => i === initial)
    const previousTimezone = t && t[1]
    setPreviousTimezone(previousTimezone)

    setTimezone(spacetime().timezone().name)
  }, [user, timezones])

  const updateTimezone = () => {
    const db = firebase.database().ref(`timezones/${initial}`);
    db.set(timezone)
  }

  if (!user || !timezone) {
    return null
  }

  if (timezone === previousTimezone) {
    return null
  }

  return (
    <div style={{fontSize: '20px', color: 'white', margin: 'auto'}}>
      It looks like your timezone is {timezone}. <button className="link" onClick={updateTimezone}>Update?</button>
    </div>
  )
}