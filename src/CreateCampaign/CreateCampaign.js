import React from 'react';
import './CreateCampaign.css';
import {serverAddress} from '../Util.js'
import Send from '@material-ui/icons/Send';

import CssTextField from '../components/CssTextField.js'
import GreenFab from '../components/GreenFab.js'

class CreateCampaign extends React.Component {

  constructor(props){
    super(props); 
    this.modifyFunction = this.modifyFunction.bind(this)
    this.createNewCampaign = this.createNewCampaign.bind(this)
    this.state = {
      title: '',
      world: '',
      summary: '',
      maxPlayers: 4,
      pass: '',
      dm: this.props.match.params.id,
    }
  }

  componentDidMount() {
    console.log(this.props.match.params.id)
    fetch(serverAddress + '/generate-code', {
      method: 'GET',
    })
      .then((res) => res.json())
      .catch(error => console.error('Error: ', error))
      .then((json) => {
        // Si es valido, nos movemos a la siguiente pantalla
        if(json['success']){
          this.setState({
            pass: json['code']
          })
          console.log('Code obtained')
        }else{
          console.log('Failed to obtain code')
        }
      })
  }

  modifyFunction(myKey, value){
    var newObj = {}
    newObj[myKey] = value
    this.setState(newObj)
  }
  

  createNewCampaign() {
    var newCampaign = {}
    newCampaign.title = this.state.title;
    newCampaign.world = this.state.world;
    newCampaign.summary = this.state.summary;
    newCampaign.maxPlayers = this.state.maxPlayers;
    newCampaign.code = this.state.pass;
    newCampaign.dm = this.state.dm;

    fetch(serverAddress + '/create-campaign', {
      method: 'POST',
      body: JSON.stringify(newCampaign),
      headers: {
        'Content-type': 'application/json'
      }
    })
      .then((res) => res.json())
      .catch(error => console.error('Error: ', error))
      .then((json) => {
        // Si es valido, nos movemos a la siguiente pantalla
        if(json['success']){
          this.props.history.push('/sgm/'+this.props.match.params.username)
          console.log('Successful login')
        }else{
          console.log('Failed login')
        }
      })
  }



  render(){
    return (
      <div className="create-campaign-container">
        <div className="create-campaign-title">
          Create New Campaign
        </div>
        <div className="create-campaign-row">
          <CssTextField
              margin="dense"
              id="title"
              label="Title"
              variant="outlined"
              value={this.state.title}
              onChange={(e) => {this.modifyFunction('title', e.target.value)}}
              style={{width: '50%'}}
          />
          <CssTextField
              margin="dense"
              id="title"
              label="World Name"
              variant="outlined"
              value={this.state.world}
              onChange={(e) => {this.modifyFunction('world', e.target.value)}}
              style={{width: '30%'}}
          />
        </div>
        <div className="create-campaign-summary">
          <CssTextField
              margin="dense"
              id="title"
              label="World Summary"
              variant="outlined"
              value={this.state.summary}
              onChange={(e) => {this.modifyFunction('summary', e.target.value)}}
              style={{width:'90%'}}
              rows="8"
              multiline
          />
        </div>
        <div className="create-campaign-row">
          <div className="create-campaign-text">
            Max players: 
          </div>
          <input className="create-campaign-input" type='number' min={0} value={this.state.maxPlayers} onChange={(e) => {this.modifyFunction('maxPlayers', e.target.value)}} onKeyDown={(e) => {e.preventDefault()}}/> 
          <div className="create-campaign-text">
            Join the campaign: {this.state.pass}
          </div>
          <GreenFab variant="extended" onClick={this.createNewCampaign}>
            Next
            <Send style={{ paddingLeft: 10 }} />
          </GreenFab>  
        </div>
      </div>
    )
  }
}

export default CreateCampaign;
