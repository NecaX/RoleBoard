import React from 'react';
import './Login.css';
import { Link } from "react-router-dom";
import dice from './img/dice_no_bg.png';
import onedice from './img/one-dice.png';
import Fab from '@material-ui/core/Fab';
import 'typeface-roboto';
import Avatar from '@material-ui/core/Avatar';
import Create from '@material-ui/icons/Create';

class Login extends React.Component {

  constructor(props){
    super(props); 
    this.modifyUsername = this.modifyUsername.bind(this);
    this.modifyPassword = this.modifyPassword.bind(this);

    this.state = {
      password: 'default',
      username: 'default',
    }
  }
  modifyUsername (event) {
    this.setState({
      username: event.target.value
    })
  }

  modifyPassword (event) {
    this.setState({
      password: event.target.value
    })
  }
  

  render(){
    return (
      <div className="login-container">
        <div>
          <img src={dice}  className="dice-logo"/>
        </div>
        <div className="text-field">
          <label class="pure-material-textfield-outlined">
            <input placeholder=" " onChange={this.modifyUsername}/>
            <span>Username</span>
          </label>

          <label class="pure-material-textfield-outlined">
            <input type="password" placeholder=" " onChange={this.modifyPassword}/>
            <span>Password</span>
          </label>
        </div>
        <div style={{padding: 15}}>
          <Link to={'/sgm/'+this.state.username} style={{ textDecoration: 'none' }}>   
            <Fab variant="extended" aria-label="Delete" >
              <Avatar src={onedice} style={{paddingRight: 10}}/>
              Roll the Dice
            </Fab>
          </Link>
        </div>

        <h2><span>or</span></h2>

        <div style={{padding: 15}}>
          <Link to={'/app/'+this.state.username+'/'+this.state.password} style={{ textDecoration: 'none' }}>   
            <Fab variant="extended" aria-label="Delete" >
              <Create style={{paddingRight: 10}}/>
              Sign up
            </Fab>
          </Link>
        </div>
        
      </div>
    )
  }
}

export default Login;
