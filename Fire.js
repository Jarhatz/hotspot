import firebase from 'firebase'

var firebaseConfig = {
  apiKey: "AIzaSyBxtzUHuRkLPV9farc6OydgP_HNpz7MI1Y",
  authDomain: "covid-database-7b11c.firebaseapp.com",
  databaseURL: "https://covid-database-7b11c.firebaseio.com",
  projectId: "covid-database-7b11c",
  storageBucket: "covid-database-7b11c.appspot.com",
  messagingSenderId: "938414146906",
  appId: "1:938414146906:web:7ad54041b08993a0341f63",
  measurementId: "G-CDYR04FXG8"
};

var fire = firebase.initializeApp(firebaseConfig);
export default fire;