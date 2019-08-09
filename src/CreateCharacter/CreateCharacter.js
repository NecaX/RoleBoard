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
import CharacterSummary from './CharacterSummary';


class CreateCharacter extends React.Component {

    constructor(props) {
        super(props); //Constructor padre
        this.handleClick = this.handleClick.bind(this)
        this.setPage = this.setPage.bind(this)
        this.modifyGeneral = this.modifyGeneral.bind(this)
        this.modifyClass = this.modifyClass.bind(this)
        this.modifyRace = this.modifyRace.bind(this)
        this.modifyFeat = this.modifyFeat.bind(this)
        this.modifyPrimWeapon = this.modifyPrimWeapon.bind(this)
        this.modifySecWeapon = this.modifySecWeapon.bind(this)
        this.modifySkill = this.modifySkill.bind(this)
        this.state = {
            page: 5,
            general: {
                name: '',
                align: '',
                hair: '',
                eyes: '',
                size: '',
                skin: '',
                gender: '',
                age: '',
                imgPath: '',
                pictureLoaded: false,
            },
            class: {
                name: '',
                icon: null,
                classChosen: -1,
            },
            race: {
                name: '',
                icon: null,
                abilities: {
                    'Strength': 0,
                    'Dexterity': 0,
                    'Constitution': 0,
                    'Intelligence': 0,
                    'Wisdom': 0,
                    'Charisma': 0
                },
                raceChosen: -1, // Indice de la raza seleccionada
                scores: [0, 0, 0, 0, 0, 0], // Array de indices de las puntuaciones seleccionadas
                genScores: [0, 0, 0, 0, 0, 0], // Array (estatico cuando se lanza el dado) de las puntuaciones
                rolledDice: false,
                selSc: new Set([]), // Set de los indices de las puntuaciones ya seleccionadas (para seleccionarlas una sola vez)
            },

            primweapon: {
                name: '',
                icon: null,
                primaryChosen: -1,
            },
            secweapon: {
                name: '',
                icon: null,
                secondaryChosen: -1,
            },
            feats: {
                featsLeft: 2,
                featsSelected: new Set([]),
                maxRank: 5,
            },
            skills: {
                skillsSelected: {},
                pointsLeft: 10,
                maxRank: 5,
            },
        }
    }

    getStyle(targetPage) {
        return this.state.page === targetPage ? { color: 'white' } : { color: 'rgba(var(--pure-material-onsurface-rgb, 255,255,255), 0.7)' }
    }

    modifyGeneral(key, value) {
        var newDict = this.state.general
        newDict[key] = value
        this.setState({
            general: newDict
        })
    }

    modifyClass(newIcon, newName, index) {
        var newDict = {
            name: newName,
            icon: newIcon,
            classChosen: index,
        }
        this.setState({
            class: newDict
        })
    }

    modifyPrimWeapon(newIcon, newName, index) {
        var newDict = {
            name: newName,
            icon: newIcon,
            primaryChosen: index,
        }
        this.setState({
            primweapon: newDict
        })
    }

    modifySecWeapon(newIcon, newName, index) {
        var newDict = {
            name: newName,
            icon: newIcon,
            secondaryChosen: index,
        }
        this.setState({
            secweapon: newDict
        })
    }

    modifyRace(key, value) {
        var newDict = this.state.race
        newDict[key] = value
        this.setState({
            race: newDict
        })
    }

    modifyFeat(key, value) {
        var newDict = this.state.feats
        newDict[key] = value
        this.setState({
            feats: newDict
        })
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

    modifySkill(key, value) {
        var newDict = this.state.skills
        newDict[key] = value
        this.setState({
            skills: newDict
        })
    }

    getPage() {
        switch (this.state.page) {
            case 0:
                return <CharacterGeneral modifyFunction={this.modifyGeneral} data={this.state.general} />
            case 1:
                return <CharacterClass modifyFunction={this.modifyClass} data={this.state.class} />
            case 2:
                return <CharacterRace modifyFunction={this.modifyRace} data={this.state.race} />
            case 3:
                return <CharacterWeapon modifyPrimary={this.modifyPrimWeapon} modifySecondary={this.modifySecWeapon} primweapon={this.state.primweapon} secweapon={this.state.secweapon} />
            case 4:
                return <CharacterFeat modifyFunction={this.modifyFeat} data={this.state.feats} />
            case 5:
                return <CharacterSkill feats={this.state.feats.featsSelected} data={this.state.skills} modifyFunction={this.modifySkill} />
            case 6:
                return <CharacterSummary general={this.state.general} class={this.state.class} race={this.state.race} primweapon={this.state.primweapon} secweapon={this.state.secweapon} featsList={this.state.feats.featsSelected} skillList={this.state.skills.skillsSelected} />
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
                    <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNextIcon style={{ color: '#5fbb97' }} />}>
                        <div className="breadcrumb-option" onClick={() => this.setPage(0)} style={this.getStyle(0)}>General</div>
                        <div className="breadcrumb-option" onClick={() => this.setPage(1)} style={this.getStyle(1)}>Class</div>
                        <div className="breadcrumb-option" onClick={() => this.setPage(2)} style={this.getStyle(2)}>Race</div>
                        <div className="breadcrumb-option" onClick={() => this.setPage(3)} style={this.getStyle(3)}>Weapons</div>
                        <div className="breadcrumb-option" onClick={() => this.setPage(4)} style={this.getStyle(4)}>Feats</div>
                        <div className="breadcrumb-option" onClick={() => this.setPage(5)} style={this.getStyle(5)}>Skills</div>
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