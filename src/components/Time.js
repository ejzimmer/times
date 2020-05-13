import React, { useRef, useState, useEffect } from 'react';
import spacetime from 'spacetime';
import informal from 'spacetime-informal';
import firebase from 'firebase';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function Time({ label, location }) {
  const input = useRef();
  const interval = useRef();

  const [ timezone, setTimezone ] = useState(informal.find(location))
  const [ time, setTime ] = useState(spacetime.now())
  const [ suggestion, setSuggestion ] = useState()
  const [ showSuggestion, setShowSuggestion ] = useState()
  const [ sleeping, setSleeping ] = useState(false)

  const checkTimezone = () => {
    const location = input.current.value;
    const validTimezone = informal.find(location);

    if (validTimezone) {
      setShowSuggestion(true)
      setSuggestion(validTimezone);
    }
  }

  const updateTimezone = () => {
    input.current.value = suggestion;
    setTimezone(suggestion);
    setShowSuggestion(false);

    const timezones = firebase.database().ref(`timezones/${label}`);
    timezones.set(suggestion)
  }

  useEffect(() => {
    interval.current = setInterval(() => {
      const now = spacetime.now(timezone)
      setTime(now)
      setSleeping(now.isAsleep())
    }, 1000)

    return () => clearInterval(interval.current);
  })

  return (
    <fieldset className={sleeping ? 'sleeping' : ''}>
      <legend>{label}</legend>
      <div className="layout">
        { timezone 
          ? 
            <div className="clock">
              <div className="days">
                {DAYS.map(day => <span key={day} className={day === time.format('day-short') ? 'today' : ''}>{day}</span>)}
              </div>
              <div className="led">{time.format('{hour-24-pad}:{minute-pad}')}</div>
            </div>
          : <div>No valid timezone found. Please set one.</div>
        }
        <input ref={input} defaultValue={timezone} onChange={checkTimezone}></input>
        { showSuggestion && (
          <div className="suggestion">
            <label htmlFor="suggestion">Are you looking for {suggestion}?</label>
            <input type="checkbox" name={suggestion} id="suggestion" onClick={updateTimezone}/>
          </div>)
        }
      </div>
    </fieldset>
  )
}