import React, { useEffect, useState } from 'react';
import Time from './components/Time';
import firebase from 'firebase';
import './App.css';
import './styles/fonts.css';

function App() {
  const [timezones, setTimezones] = useState([]);

  useEffect(() => {
    const database = firebase.database().ref('timezones');
    database.on('value', (snapshot) => {
      setTimezones(Object.entries(snapshot.val()))
    });    
  }, [])

  return (
    <div className="App">
      { timezones.map(([label, timezone]) => <Time key={label} label={label} location={timezone} />)}
    </div>
  );
}

export default App;
