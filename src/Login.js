import React from 'react';
import './Login.css';
import dice from './img/dice_no_bg.png';
import onedice from './img/one-dice.png';
import Fab from '@material-ui/core/Fab';
import 'typeface-roboto';
import Avatar from '@material-ui/core/Avatar';
import Create from '@material-ui/icons/Create';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withRouter } from 'react-router-dom';
import {serverAddress} from './Util.js'

class Login extends React.Component {

  constructor(props){
    super(props); 
    this.modifyUsername = this.modifyUsername.bind(this);
    this.modifyPassword = this.modifyPassword.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleNewPassword = this.handleNewPassword.bind(this);
    this.handleNewUsername = this.handleNewUsername.bind(this);
    this.handleRepeatPassword = this.handleRepeatPassword.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.login = this.login.bind(this);

    this.state = {
      password: 'default',
      username: 'default',
      open: false,
      newUsername: '',
      newPassword: '',
      repeatPassword: '',
      passWrong: false,
      userExisting: true,
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

  /**
   * Funcion que controla la apertura del modal de creacion de usuario
   */
  handleClickOpen(){
    this.setState({
      open: true,
      userExisting: false,
    })
  }

  /**
   * Funcion que controla el cierre del modal de creacion de usuario
   */
  handleClose(){
    this.setState({
      open: false,
      request: false,
      passWrong: false,
    })
  }

  /**
   * Funcion que controla el comportamiento del registro de usuario
   */
  handleSignUp(){
    if(!this.passwordNotMatch() && this.state.newUsername !== '' && this.state.newPassword !== '' && this.state.repeatPassword !== ''){
      // Login successful
      // Hacemos una peticion al server para preguntar si hay algun usuario ya creado con este nombre
      var data = {'username': this.state.newUsername, 'pass': this.state.newPassword}
      fetch(serverAddress + '/signup', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-type': 'application/json'
        }
      })
        .then((res) => res.json())
        .catch(error => console.error('Error: ', error))
        .then((json) => {
          // Si se ha creado el usuario, navegamos a la siguiente pantalla
          if(json['success']){
            this.props.history.push('/sgm/'+json['id'])
            this.handleClose()
          }else{
            // En caso contrario, mostramos el error correspondiente por pantalla
            console.log('Fail')
            this.setState({
              userExisting: true,
            })
          }
        })
    }else{
      // Si falta algun campo por rellenar o las pass no coinciden lo indicamos
      this.setState({
        passWrong: true,
        request: true,
      })
    }
  }

  /**
   * Funcion que controla el login de usuario
   */
  login(){
    var data = {'username': this.state.username, 'pass': this.state.password}
      // Creamos una peticion al servidor para ver si el usuario y pass son adecuadas
      fetch(serverAddress + '/login', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-type': 'application/json'
        }
      })
        .then((res) => res.json())
        .catch(error => console.error('Error: ', error))
        .then((json) => {
          // Si es valido, nos movemos a la siguiente pantalla
          if(json['success']){
            this.props.history.push('/sgm/'+json['id'])
            console.log('Successful login')
          }else{
            console.log('Failed login')
          }
        })
  }

  handleNewUsername(event){
    this.setState({
      newUsername: event.target.value
    })
  }

  handleNewPassword(event){
    this.setState({
      newPassword: event.target.value
    })
  }

  handleRepeatPassword(event){
    this.setState({
      repeatPassword: event.target.value
    })
  }

  handleKeyPress(event){
    if(event.key === 'Enter'){
      this.login()
    }

  }


  /**
   * Funcion que indica si hay alguna pass y no coincide con la repetida
   */
  passwordNotMatch(){
    return (this.state.newPassword !== this.state.repeatPassword && this.state.repeatPassword !== '')
  }

  render(){
    return (
      <div className="login-container">
        <div>
          <img alt="" src={dice}  className="dice-logo"/>
        </div>
        <div className="text-field">
          <label className="pure-material-textfield-outlined">
            <input placeholder=" " onChange={this.modifyUsername} onKeyPress={this.handleKeyPress}/>
            <span>Username</span>
          </label>

          <label className="pure-material-textfield-outlined">
            <input type="password" placeholder=" " onChange={this.modifyPassword} onKeyPress={this.handleKeyPress}/>
            <span>Password</span>
          </label>
        </div>
        <div style={{padding: 15}}>
            <Fab variant="extended" aria-label="Delete" onClick={this.login}>
              <Avatar src={onedice} style={{paddingRight: 10}}/>
              Roll the Dice
            </Fab>
        </div>

        <h2><span>or</span></h2>

        <div style={{padding: 15}}>
            <Fab variant="extended" aria-label="Delete" onClick={this.handleClickOpen}>
              <Create style={{paddingRight: 10}}/>
              Sign up
            </Fab>
        </div>

        <div>
          <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Sign Up</DialogTitle>
            <DialogContent>
              <TextField
                error={this.state.request && this.state.newUsername===''}
                margin="dense"
                id="name"
                label="Username"
                variant="outlined"
                type="email"
                fullWidth
                onChange={this.handleNewUsername}
              />

              {this.state.userExisting ? <div style={{color: 'red', fontFamily: 'Roboto', marginTop: 5, marginBottom: 5}}> The username is already taken </div> : <div></div>}

              <TextField
                error={this.state.request && this.state.newPassword===''}
                margin="dense"
                id="name"
                label="Password"
                variant="outlined"
                type="password"
                fullWidth
                onChange={this.handleNewPassword}

              />
              <TextField
                error={this.state.passWrong}
                margin="dense"
                id="name"
                label="Repeat password"
                variant="outlined"
                type="password"
                fullWidth
                onChange={this.handleRepeatPassword}
              />
              {this.passwordNotMatch() ? <div style={{color: 'red', fontFamily: 'Roboto', marginTop: 10}}> The passwords do not match </div> : <div></div>}
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={this.handleSignUp} color="primary">
                Create new user
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        
      </div>
    )
  }
}

export default withRouter(Login);
