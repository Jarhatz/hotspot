import React , { Component } from 'react';
import fire from './Fire';
import './App.css';
import Homepage from './Homepage';
import Login from './Login';
import backgroundImage from './images/backgroundImage.jpg';

class App extends Component {

  constructor() {
    super();
    this.state = ({
      user: {},
    });
    this.authListener = this.authListener.bind(this);
  }

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    fire.auth().onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        this.setState({ user });
        localStorage.setItem('user', user);
      } else {
        this.setState({ user: null });
        localStorage.removeItem('user');
      }
    });
  }

  render() {
    return (
      <div style={{
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundSize: 'cover',
      backgroundImage:`url(${backgroundImage})`
      }}>
        <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: '9%'}}>
          {this.state.user ? ( <Homepage user={this.user}/>) : (<Login />)}
        </div>
      </div>
    );
  }

}

export default App;