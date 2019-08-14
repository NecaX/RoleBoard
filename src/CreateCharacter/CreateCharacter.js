import React from 'react';
import './CreateCharacter.css';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import CharacterGeneral from './CharacterGeneral';
import CharacterClass from './CharacterClass';
import CharacterRace from './CharacterRace';
import Send from '@material-ui/icons/Send';
import CharacterWeapon from './CharacterWeapon';
import CharacterSkill from './CharacterSkill';
import CharacterFeat from './CharacterFeat';
import CharacterSummary from './CharacterSummary';
import { serverAddress } from '../Util'
import GreenFab from '../components/GreenFab'


class CreateCharacter extends React.Component {

    constructor(props) {
        super(props); //Constructor padre
        this.handleClick = this.handleClick.bind(this)
        this.state = {
            page: 0,
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
                chosen: -1,
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
                chosen: -1,
            },
            secweapon: {
                name: '',
                icon: null,
                chosen: -1,
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

    modifyState(element, key, value){
        var newState = this.state
        newState[element][key] = value
        this.setState(newState)
    }

    modifyExtendedState(element, newIcon, newName, index) {
        var newState = this.state
        var newDict = {
            name: newName,
            icon: newIcon,
            chosen: index,
        }
        newState[element] = newDict
        this.setState(newState)
    }


    handleClick() {
        if (this.state.page < 6){
            this.setState({
                page: (this.state.page + 1)
            })
        }else {
            this.saveCharacter()
            this.props.history.push('/sgm/'+this.props.match.params.id)
        }
    }

    saveCharacter() {
        var character = {}
        character.general = this.state.general
        delete character.general.pictureLoaded
        character.class = this.state.class.name
        character.race = this.state.race.name
        character.abilities = this.state.race.abilities
        character.primweapon = this.state.primweapon.name
        character.secweapon = this.state.secweapon.name
        character.featsSelected = [...this.state.feats.featsSelected]
        character.skillsSelected = this.state.skills.skillsSelected
        character.campaign = this.props.match.params.code
        character.user = this.props.match.params.id

        fetch(`${serverAddress}/create-character`, {
            method: 'POST', 
            body: JSON.stringify(character),
            headers: {
                'Content-type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(res => console.log(res)) //TODO: Comportamiento en caso de fallo
    }

    getPage() {
        switch (this.state.page) {
            case 0:
                return <CharacterGeneral modifyFunction={(key, value) => {this.modifyState('general', key, value)}} data={this.state.general} />
            case 1:
                return <CharacterClass modifyFunction={(newIcon, newName, index) => this.modifyExtendedState('class', newIcon, newName, index)} data={this.state.class} />
            case 2:
                return <CharacterRace modifyFunction={(key, value) => {this.modifyState('race', key, value)}} data={this.state.race} />
            case 3:
                return <CharacterWeapon modifyPrimary={(newIcon, newName, index) => this.modifyExtendedState('primweapon', newIcon, newName, index)} modifySecondary={(newIcon, newName, index) => this.modifyExtendedState('secweapon', newIcon, newName, index)} primweapon={this.state.primweapon} secweapon={this.state.secweapon} />
            case 4:
                return <CharacterFeat modifyFunction={(key, value) => {this.modifyState('feats', key, value)}} data={this.state.feats} />
            case 5:
                return <CharacterSkill abilities={this.state.race.abilities} feats={this.state.feats.featsSelected} data={this.state.skills} modifyFunction={(key, value) => {this.modifyState('skills', key, value)}} />
            case 6:
                return <CharacterSummary general={this.state.general} class={this.state.class} race={this.state.race} primweapon={this.state.primweapon} secweapon={this.state.secweapon} featsList={this.state.feats.featsSelected} skillList={this.state.skills.skillsSelected} />
            default:
                return <div/>
        }
    }

    renderBreadcrumbs() {
        var breadcrumbs = ['General','Class', 'Race', 'Weapons', 'Feats', 'Skills', 'Summary']
        return breadcrumbs.map((bc, index) => {
            return <div className="luminari-text" onClick={() => this.setState({page: index})} style={this.getStyle(index)}>{bc}</div>
        })
    }



    render() {
        return (
            <div className="character-container">
                <div className="character-content">
                    {this.getPage()}
                </div>
                <div className="character-breadcrumb flex-center-space-evenly">
                    <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNextIcon style={{ color: '#5fbb97' }} />}>
                        {this.renderBreadcrumbs()}
                    </Breadcrumbs>
                    <GreenFab variant="extended" onClick={this.handleClick}>
                        <div>Next</div>
                        <Send style={{ paddingLeft: 10 }} />
                    </GreenFab>
                </div>
            </div>

        )
    }
}

export default CreateCharacter;