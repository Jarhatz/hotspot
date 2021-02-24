import React, { Component } from 'react';
import fire from './Fire';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

class SignIn extends Component {
 
    constructor() {
      super();
      this.login = this.login.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.state = {
        email: '',
        password: ''
      };
    }
   
    handleChange(e) {
      this.setState({[e.target.name]: e.target.value});
    }
   
    login(e) {
      e.preventDefault();
      fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
      }).catch((error) => {
          console.log(error);
        });
    }

    render() {
      return (
        <Card>
          <CardContent style={{
            marginLeft: 20,
            marginRight: 70,}}>
          <br/>
            <Typography color="textSecondary" gutterBottom>
              COVID-19 Help Stop the Spread
            </Typography>
            <Typography variant="h5" component="h2">
              Sign in to your account
            </Typography>
            <Typography color="textSecondary">
              Your account information is always private
            </Typography>
            <br/><br/>
            <Typography variant="body2" component="p">
              enter your email
              <br/>
            </Typography>
            <TextField value={this.state.email} onChange={this.handleChange} id="outlined-basic" label="email" variant="outlined" name="email" type="email" style={{width: 400}}/>
            <br/><br/>
            <Typography variant="body2" component="p">
              enter your password
              <br/>
            </Typography>
            <TextField value={this.state.password} onChange={this.handleChange} id="outlined-basic" label="password" variant="outlined" name="password" type="password" style={{width: 400}}/>
            <br/><br/>
          </CardContent>
          <CardActions style={{marginLeft: 30}}>
            <Button variant="contained" color="secondary" disableElevation onClick={this.login}>Sign In</Button>
          </CardActions>
          <br/><br/>
        </Card>
      );
    }
  }

  export default SignIn;