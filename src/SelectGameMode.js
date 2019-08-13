import React from 'react';
import './SelectGameMode.css';
import GreenFab from './Components/GreenFab';
import PurpleFab from './Components/PurpleFab';
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
        <option key={index} value={game}>{game}</option>
      )
    })
  }

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

  navigate(route){
    this.props.history.push(route)
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
              <PurpleFab variant="extended" >
                Continue
              </PurpleFab>
          </div>
          <div className="separator">
            <h2><span>or</span></h2>
          </div>

          <div className='continue-button'>
              <GreenFab variant="extended"  onClick={() => this.navigate('/create-campaign/'+this.props.match.params.username)}>
                <Create style={{paddingRight: 10}}/>
                Create a new Adventure
              </GreenFab>
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
              <PurpleFab variant="extended">
                Continue
              </PurpleFab>
          </div>
          <div className="separator">
            <h2><span>or</span></h2>
          </div>

          <div className='continue-button'>
              <GreenFab variant="extended" onClick={() => this.navigate('/cch/'+ this.props.match.params.username)}>
              <img alt="" src={sword} style={{width: '30px', paddingRight: 10}} />
                Join a new Adventure
              </GreenFab>
          </div>
        </div>
      </div>
    )
  }
}

export default SelectGameMode;

