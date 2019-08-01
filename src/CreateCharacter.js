import React from 'react';
import './CreateCharacter.css';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import CharacterGeneral from './CharacterGeneral';
import Fab from '@material-ui/core/Fab';
import Send from '@material-ui/icons/Send';
import { withStyles } from '@material-ui/core/styles';


class CreateCharacter extends React.Component {

    constructor(props) {
        super(props); //Constructor padre
        this.handleClick = this.handleClick.bind(this)
        this.state = {
            page: 0
        }
    }

    getStyle(targetPage) {
        return this.state.page === targetPage ? { color: 'white' } : { color: 'rgba(var(--pure-material-onsurface-rgb, 255,255,255), 0.7)' }
    }

    handleClick() {
        this.setState({
            page: (this.state.page + 1) % 7
        })
    }

    getPage() {
        switch (this.state.page) {
            case 0:
                return <CharacterGeneral />
                break;
            default:
                return <div>Hola caracola</div>
        }
    }

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

    render() {
        return (
            <div className="character-container">
                <div className="character-content">
                    {this.getPage()}
                </div>
                <div className="character-breadcrumb">
                    <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNextIcon fontSize="medium" style={{ color: '#5fbb97' }} />}>
                        <div style={this.getStyle(0)}>General</div>
                        <div style={this.getStyle(1)}>Class</div>
                        <div style={this.getStyle(2)}>Race</div>
                        <div style={this.getStyle(3)}>Weapons</div>
                        <div style={this.getStyle(4)}>Skills</div>
                        <div style={this.getStyle(5)}>Feats</div>
                        <div style={this.getStyle(6)}>Summary</div>
                    </Breadcrumbs>
                    <this.GreenFab variant="extended" onClick={this.handleClick}>
                        Next
                        <Send style={{ paddingLeft: 10 }} />
                    </this.GreenFab>
                </div>
            </div>

        )
    }
}

export default CreateCharacter;