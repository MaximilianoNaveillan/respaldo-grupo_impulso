import React from 'react';
import ReactDOM from 'react-dom';
//import firebase from 'firebase';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

//firebase.initializeApp({
//apiKey: "AIzaSyAJW6XNzjkr021Pem5tgWDWu__mBTmuoHk",
//authDomain: "grupoimpulso-e5b14.firebaseapp.com",
//databaseURL: "https://grupoimpulso-e5b14.firebaseio.com",
//projectId: "grupoimpulso-e5b14",
//storageBucket: "grupoimpulso-e5b14.appspot.com",
//messagingSenderId: "656106254942"
//});

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
