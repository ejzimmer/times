import React, { useEffect, useState } from 'react';
import Time from './components/Time';
import Auth from './components/Auth';
import Timezone from './components/Timezone'
import firebase from 'firebase';
import './App.css';
import './styles/fonts.css';
import { UserProvider } from '.';

function App() {
  const [timezones, setTimezones] = useState([]);

  useEffect(() => {
    const database = firebase.database().ref('timezones');
    database.on('value', (snapshot) => {
      console.log(snapshot)
      setTimezones(Object.entries(snapshot.val()))
    });    
  }, [])

  return (
    <UserProvider>
      <div className="App">
        <Auth />
        <Timezone timezones={timezones} />
        { timezones.map(([label, timezone]) => <Time key={`${label}-${timezone}`} label={label} location={timezone} />)}
      </div>
    </UserProvider>
  );
}

export default App;
