import React, { createContext, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import firebase from 'firebase';

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyCSfoHmhZUrD-7jnm35CzMoE6nDI4xkf4Q",
  authDomain: "times-c6b9e.web.app",
  databaseURL: "https://times-c6b9e.firebaseio.com",
  projectId: "times-c6b9e",
  storageBucket: "times-c6b9e.appspot.com",
  messagingSenderId: "153917160153",
  appId: "1:153917160153:web:b705de2bd470a1658edcc8"
};
// Initialize Firebase
firebase.initializeApp(FIREBASE_CONFIG);
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export const UserContext = createContext({ user: null })

export function UserProvider({ children }) {
  const [user, setUser] = useState()

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user && user.displayName.toLowerCase().includes('zimmer')) {
        setUser(user)
      }
    })
  })

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
