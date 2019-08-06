import React from 'react';
import './CreateCharacter.css';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import CharacterGeneral from './CharacterGeneral';
import CharacterClass from './CharacterClass';
import CharacterRace from './CharacterRace';
import Fab from '@material-ui/core/Fab';
import Send from '@material-ui/icons/Send';
import { withStyles } from '@material-ui/core/styles';
import CharacterWeapon from './CharacterWeapon';
import CharacterSkill from './CharacterSkill';
import CharacterFeat from './CharacterFeat';


class CreateCharacter extends React.Component {

    constructor(props) {
        super(props); //Constructor padre
        this.handleClick = this.handleClick.bind(this)
        this.setPage = this.setPage.bind(this)
        this.state = {
            page: 5
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

    setPage(targetPage) {
        this.setState({
            page: targetPage
        })
    }

    getPage() {
        switch (this.state.page) {
            case 0:
                return <CharacterGeneral/>
                break;
            case 1:
                return <CharacterClass/>
                break;
            case 2: 
                return <CharacterRace/>
                break;
            case 3:
                return <CharacterWeapon/>
                break;
            case 4:
                return <CharacterSkill/>
                break;
            case 5:
                return <CharacterFeat/>
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
                        <div className="breadcrumb-option" onClick={() => this.setPage(0)} style={this.getStyle(0)}>General</div>
                        <div className="breadcrumb-option" onClick={() => this.setPage(1)} style={this.getStyle(1)}>Class</div>
                        <div className="breadcrumb-option" onClick={() => this.setPage(2)} style={this.getStyle(2)}>Race</div>
                        <div className="breadcrumb-option" onClick={() => this.setPage(3)} style={this.getStyle(3)}>Weapons</div>
                        <div className="breadcrumb-option" onClick={() => this.setPage(4)} style={this.getStyle(4)}>Skills</div>
                        <div className="breadcrumb-option" onClick={() => this.setPage(5)} style={this.getStyle(5)}>Feats</div>
                        <div className="breadcrumb-option" onClick={() => this.setPage(6)} style={this.getStyle(6)}>Summary</div>
                    </Breadcrumbs>
                    <this.GreenFab variant="extended" onClick={this.handleClick}>
                    <div className="breadcrumb-option">Next</div>
                        <Send style={{ paddingLeft: 10 }} />
                    </this.GreenFab>
                </div>
            </div>

        )
    }
}

export default CreateCharacter;