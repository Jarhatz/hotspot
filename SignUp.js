import React, { Component } from 'react';
import fire from './Fire';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

class SignUp extends Component {
 
    constructor() {
      super();
      this.handleChange = this.handleChange.bind(this);
      this.signup = this.signup.bind(this);
      this.state = {
        infected: false,
        name: '',
        email: '',
        password: '',
      };
    }
   
    handleChange(e) {
      this.setState({[e.target.name]: e.target.value});
    }
   
    signup(e) {
      e.preventDefault();
      fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
      }).then((u)=>{console.log(u)})
      .catch((error) => {
          console.log(error);
        })
      const users = fire.firestore().collection('users');
      users.doc(this.state.email).set({
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        infected: this.state.infected,
        visitedStores: [],
        visitedTimes: [],
      });
    }
   
    render() {
      return (
        <Card>
          <CardContent style={{
            marginLeft: 20,
            marginRight: 70,}}>
            <Typography color="textSecondary" gutterBottom>
              COVID-19 Help Stop the Spread
            </Typography>
            <Typography variant="h5" component="h2">
              Create an account
            </Typography>
            <Typography color="textSecondary">
              Your account information is always private
            </Typography>
            <br/><Typography variant="body2" component="p">
              do you have corona virus? (flu-like symptoms, coughing, etc)<br/><br/>
            </Typography>
            <FormControl variant="outlined">
                <InputLabel id="simple-select-outlined-label">covid</InputLabel>
                <Select
                    labelId="simple-select-outlined-label"
                    id="simple-select-outlined"
                    name="infected"
                    value={this.state.infected}
                    onChange={this.handleChange}
                    label="covid">
                    <MenuItem value={false}>No</MenuItem>
                    <MenuItem value={true}>Yes</MenuItem>
                </Select>
            </FormControl><br/><br/>
            <Typography variant="body2" component="p">
              enter your full name
              <br/>
            </Typography>
            <TextField value={this.state.name} onChange={this.handleChange} id="outlined-basic" label="name" variant="outlined" name="name" style={{width: 400}}/>
            <br/><br/>
            <Typography variant="body2" component="p">
              enter a valid email<br/>
            </Typography>
            <TextField value={this.state.email} onChange={this.handleChange} id="outlined-basic" label="email" variant="outlined" name="email" type="email" style={{width: 400}}/>
            <br/><br/>
            <Typography variant="body2" component="p">
              password must be 6 or more characters<br/>
            </Typography>
            <TextField value={this.state.password} onChange={this.handleChange} id="outlined-basic" label="password" variant="outlined" name="password" type="password" style={{width: 400}}/>
            <br/>
          </CardContent>
          <CardActions style={{marginLeft: 30}}>
            <Button variant="contained" color="secondary" disableElevation onClick={this.signup}>Create Account</Button>
          </CardActions>
          <br/>
        </Card>
      );
    }
  }

  export default SignUp;