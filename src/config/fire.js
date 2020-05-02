import firebase from 'firebase';

var firebaseConfig = {
  apiKey: 'AIzaSyBfZd_75GEMqNGbKDzXcCXqssyJINT4n6k',
  authDomain: 'react-todo-firebase-a6f10.firebaseapp.com',
  databaseURL: 'https://react-todo-firebase-a6f10.firebaseio.com',
  projectId: 'react-todo-firebase-a6f10',
  storageBucket: 'react-todo-firebase-a6f10.appspot.com',
  messagingSenderId: '65013630882',
  appId: '1:65013630882:web:2541d61242675da2ac94fb',
  measurementId: 'G-BS6XPL4GZH',
};

const Fire = firebase.initializeApp(firebaseConfig);

export default Fire;
