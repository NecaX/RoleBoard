import React from 'react';
import './SelectGameMode.css';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Create from '@material-ui/icons/Create';
import sword from './img/sword.png';

class SelectGameMode extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeDirecting = this.onChangeDirecting.bind(this);
    this.onChangePlaying = this.onChangePlaying.bind(this);
    this.state = {
      directing: [ // Lista de partidas que el jugador esta dirigiendo
        'Tariel',
        'Middle Earth'
      ],
      playing: [ // Lista de partidas que el jugador esta jugando
        'Scadrial',
        'Westeros'
      ],
      toDirect: '', // Partida seleccionada para dirigir
      toPlay: '', // Partida seleccionada para jugar
    }

  }

  renderOptions(array){
    return array.map((game, index) => {
      return(
        <option value={game}>{game}</option>
      )
    })
  }

  ColorButton = withStyles(theme => ({
    root: {
      color: 'white',
      borderColor: '#541388',
      '&:hover': {
        backgroundColor: '#541388',
        color: 'white'
      },
    },
  }))(Button);

  GreenFab = withStyles(theme => ({
    root: {
      color: 'white',
      backgroundColor: '#5fbb97',
      '&:hover': {
        backgroundColor: '#7cc7a9',
        color: 'white'
      },
    },
  }))(Fab);

  PurpleFab = withStyles(theme => ({
    root: {
      color: 'white',
      backgroundColor: '#541388',
      '&:hover': {
        backgroundColor: '#733d9d',
        color: 'white'
      },
    },
    label: {
      paddingRight: 10,
      paddingLeft: 10,
    }
  }))(Fab);

  onChangeDirecting(event){
    this.setState({
      toDirect: event.target.value
    })
  }

  onChangePlaying(event){
    this.setState({
      toPlay: event.target.value
    })
  }

  render() {
    return (
      <div className="container">
        <div className="option">
          <div className="title">
            Dungeon Master
          </div>
          <div className="menu-select">
            <select className="select" onChange={this.onChangeDirecting}>
              {this.renderOptions(this.state.directing)}
            </select> 
              <this.PurpleFab variant="extended" >
                Continue
              </this.PurpleFab>
          </div>
          <div className="separator">
            <h2><span>or</span></h2>
          </div>

          <div className='continue-button'>
              <this.GreenFab variant="extended" aria-label="Delete" >
                <Create style={{paddingRight: 10}}/>
                Create a new Adventure
              </this.GreenFab>
          </div>
          
        </div>
        <div className="divider"></div>
        <div className="option">
          <div className="title">
            Playable Character
          </div>
          <div className="menu-select">
            <select className="select" onChange={this.onChangePlaying}>
              {this.renderOptions(this.state.playing)}
            </select> 
              <this.PurpleFab variant="extended">
                Continue
              </this.PurpleFab>
          </div>
          <div className="separator">
            <h2><span>or</span></h2>
          </div>

          <div className='continue-button'>
              <this.GreenFab variant="extended" aria-label="Delete" >
              <img src={sword} style={{width: '30px', paddingRight: 10}} />
                Join a new Adventure
              </this.GreenFab>
          </div>
        </div>
      </div>
    )
  }
}

export default SelectGameMode;

