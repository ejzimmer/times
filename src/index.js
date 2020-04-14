import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import firebase from 'firebase';

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyCSfoHmhZUrD-7jnm35CzMoE6nDI4xkf4Q",
  authDomain: "times-c6b9e.firebaseapp.com",
  databaseURL: "https://times-c6b9e.firebaseio.com",
  projectId: "times-c6b9e",
  storageBucket: "times-c6b9e.appspot.com",
  messagingSenderId: "153917160153",
  appId: "1:153917160153:web:b705de2bd470a1658edcc8"
};
// Initialize Firebase
firebase.initializeApp(FIREBASE_CONFIG);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
