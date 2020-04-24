import React, { useEffect, useState } from 'react';
import Time from './components/Time';
import Auth from './components/Auth';
import firebase from 'firebase';
import './App.css';
import './styles/fonts.css';
import { UserProvider } from '.';

function App() {
  const [timezones, setTimezones] = useState([]);

  useEffect(() => {
    const database = firebase.database().ref('timezones');
    database.on('value', (snapshot) => {
      setTimezones(Object.entries(snapshot.val()))
    });    
  }, [])

  return (
    <UserProvider>
      <div className="App">
        <Auth />
        { timezones.map(([label, timezone]) => <Time key={label} label={label} location={timezone} />)}
      </div>
    </UserProvider>
  );
}

export default App;
