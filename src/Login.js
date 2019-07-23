import React from 'react';
import { Link } from "react-router-dom";
import dice from './img/dice_no_bg.png';
import onedice from './img/one-dice.png';
import Fab from '@material-ui/core/Fab';
import 'typeface-roboto';
import Avatar from '@material-ui/core/Avatar';

class Login extends React.Component {

  constructor(props){
    super(props); 
    this.modifyUsername = this.modifyUsername.bind(this);
    this.modifyServer = this.modifyServer.bind(this);

    this.state = {
      server: 'localhost',
      username: 'default',
    }
  }
  modifyUsername (event) {
    this.setState({
      username: event.target.value
    })
  }

  modifyServer (event) {
    this.setState({
      server: event.target.value
    })
  }
  

  render(){
    return (
      <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
        <div style={{display: 'flex'}}>
          <img src={dice}  className="dice-logo" style={{marginTop: 50}}/>
        </div>
        <div className="text-field">
          <label class="pure-material-textfield-outlined">
            <input placeholder=" " onChange={this.modifyUsername}/>
            <span>Username</span>
          </label>

          <label class="pure-material-textfield-outlined">
            <input placeholder=" " onChange={this.modifyServer}/>
            <span>Server</span>
          </label>
        </div>
        <div style={{display: 'flex', paddingBottom: 30}}>
          <Link to={'/app/'+this.state.username+'/'+this.state.server} style={{ textDecoration: 'none' }}>   
            <Fab variant="extended" aria-label="Delete" >
              <Avatar src={onedice} style={{paddingRight: 10}}/>
              Roll the Dice
            </Fab>
          </Link>
        </div>
        
      </div>
    )
  }
}

export default Login;
