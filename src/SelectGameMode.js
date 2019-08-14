import React from 'react';
import './SelectGameMode.css';
import GreenFab from './components/GreenFab';
import PurpleFab from './components/PurpleFab';
import Create from '@material-ui/icons/Create';
import sword from './img/sword.png';
import Dialog from '@material-ui/core/Dialog';
import ModalTitle from './components/ModalTitle';
import ModalTextField from './components/ModalTextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import {serverAddress} from './Util.js'


class SelectGameMode extends React.Component {
    constructor(props) {
        super(props);
        this.onChangeDirecting = this.onChangeDirecting.bind(this);
        this.onChangePlaying = this.onChangePlaying.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleCode = this.handleCode.bind(this);
        this.handleNewCharacter = this.handleNewCharacter.bind(this);
        this.state = {
            directing: [],// Lista de partidas que el jugador esta dirigiendo
            playing: [],// Lista de partidas que el jugador esta jugando
            toDirect: '', // Partida seleccionada para dirigir
            toPlay: '', // Partida seleccionada para jugar
            open: false,
            code: '',
            codeExists: true,
        }

    }

    componentDidMount() {
        var data = {'dm': this.props.match.params.id}
        console.log(data)
        fetch(serverAddress + '/get-directing-campaign', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json'
            }
        })
        .then((res) => res.json())
        .catch(error => console.error('Error: ', error))
        .then((json) => {
            this.setState({directing: json})
        })

        data = {'user': this.props.match.params.id}

        fetch(serverAddress + '/get-playing-character', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json'
            }
        })
        .then((res) => res.json())
        .catch(error => console.error('Error: ', error))
        .then((json) => {
            this.setState({playing: json})
        })
    }

    renderOptions(array) {
        return array.map((game, index) => {
            return (
                <option key={index} value={game.world}>{game.world} - {game.title}</option>
            )
        })
    }

    renderCharacters(array) {
        return array.map((char, index) => {
            return (
                <option key={index} value={char.world}>{char.data.name} - {char.campaign}</option>
            )
        })
    }

    onChangeDirecting(event) {
        this.setState({
            toDirect: event.target.value
        })
    }

    onChangePlaying(event) {
        this.setState({
            toPlay: event.target.value
        })
    }

    navigate(route) {
        this.props.history.push(route)

    }

    handleOpen() {
        this.setState({ open: true })
    }

    handleClose() {
        this.setState({ open: false })
    }

    handleCode(event) {
        this.setState({
            code: event.target.value
        })
    }

    handleNewCharacter() {
        console.log(this.state.code)
        var data = {'code': this.state.code }
        fetch(serverAddress + '/check-campaign', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json'
            }
        })
        .then((res) => res.json())
        .catch(error => console.error('Error: ', error))
        .then((json) => {
            if (json['success']) {
                this.navigate('/cch/' + this.props.match.params.id + '/' + json['id'])
                this.handleClose()
            } else {
                // En caso contrario, mostramos el error correspondiente por pantalla
                console.log('Fail')
                this.setState({
                    codeExists: false,
                })
            }
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
                        <PurpleFab variant="extended" >
                            Continue
                        </PurpleFab>
                    </div>
                    <div className="separator">
                        <h2><span>or</span></h2>
                    </div>

                    <div className='continue-button'>
                        <GreenFab variant="extended" onClick={() => this.navigate('/create-campaign/' + this.props.match.params.id)}>
                            <Create style={{ paddingRight: 10 }} />
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
                            {this.renderCharacters(this.state.playing)}
                        </select>
                        <PurpleFab variant="extended">
                            Continue
                        </PurpleFab>
                    </div>
                    <div className="separator">
                        <h2><span>or</span></h2>
                    </div>

                    <div className='continue-button'>
                        <GreenFab variant="extended" onClick={this.handleOpen}>
                            <img alt="" src={sword} style={{ width: '30px', paddingRight: 10 }} />
                            Join a new Adventure
                        </GreenFab>
                    </div>
                </div>

                <div>
                    <Dialog style={{ fontFamily: 'Luminari' }} open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                        <ModalTitle>Enter the code of the campaign</ModalTitle>
                        <DialogContent>
                            <ModalTextField
                                error={!this.state.codeExists}
                                margin="dense"
                                label="Code"
                                variant="outlined"
                                fullWidth
                                onChange={this.handleCode}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button style={{ fontFamily: 'Luminari' }} onClick={this.handleClose} color="primary">
                                Cancel
                            </Button>
                            <Button style={{ fontFamily: 'Luminari' }} onClick={this.handleNewCharacter} color="primary">
                                Create new user
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
        )
    }
}

export default SelectGameMode;

