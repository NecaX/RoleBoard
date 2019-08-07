import React from 'react';
import './CharacterSummary.css';
import human from '../img/human.png'
import fighter from '../img/fighter.png'
import spear from '../img/spear.png'
import dagger from '../img/dagger.png'
import Avatar from '@material-ui/core/Avatar';
import av from '../img/newimg.webp'

import AddPhotoAlternate from '@material-ui/icons/AddPhotoAlternate'



class CharacterSummary extends React.Component {

    constructor(props) {
        super(props); //Constructor padre
        this.state = {
            general: {
                name: 'Kaladin',
                align: 'Lawful Good',
                hair: 'brown',
                eyes: 'dark',
                size: 'medium',
                skin: 'pale',
                gender: 'male',
                age: 'young',

            },
            class: {
                name: 'Fighter',
                icon: fighter,
            },
            race: {
                name: 'Human',
                icon: human,
            },
            abilities: {
                'Strength': 17,
                'Dexterity': 20,
                'Constitution': 15,
                'Intelligence': 17,
                'Wisdom': 10,
                'Charisma': 14
            },
            primweapon: {
                name: 'Longspear',
                icon: spear,
            },
            secweapon: {
                name: 'Dagger',
                icon: dagger,
            },
            skillList: {
                'Acrobatics': 12,
                'Climb': 5,
                'Diplomacy': 3,
                'Intimidate': 5,

            },
            featsList: [
                'Acrobatic',
                'Agile Maneuvers',
                'Alertness'
            ]
        }
    }



    renderGeneral(general) {
        return Object.keys(general).map((char, index) => {
            if (index == 0 || index == 6) {
                var charOne = Object.keys(general)[index]
                var charTwo = Object.keys(general)[index + 1]
                return (
                    <div style={{  display: 'flex', justifyContent: 'space-evenly', fontSize: '110%' }}>
                        <div style={{ width: '40%' }}>
                            {general[charOne].capitalize()}
                        </div>
                        <div style={{ width: '40%' }}>
                            {general[charTwo].capitalize()}
                        </div>

                    </div>
                )
            }
            else if (index % 2 === 0) {
                var charOne = Object.keys(general)[index]
                var charTwo = Object.keys(general)[index + 1]
                return (
                    <div style={{ display: 'flex', justifyContent: 'space-evenly', fontSize: '110%' }}>
                        <div style={{ width: '40%' }}>
                            {general[charOne].capitalize() + ' ' + charOne.capitalize()}
                        </div>
                        <div style={{ width: '40%' }}>
                            {general[charTwo].capitalize() + ' ' + charTwo.capitalize()}
                        </div>

                    </div>
                )
            }
        })
    }

    renderDict(skillList) {
        return Object.keys(skillList).map((skill, index) => {
            return (

                <tr>
                    <td>{skill}</td>
                    <td>{skillList[skill]}</td>
                </tr>

            )

        })
    }

    renderFeats(featsList) {
        return(featsList).map((feat, index) => {
            return (
                <div className="character-summary-bottom-row">{feat}</div>
            )

        })
    }





    render() {
        return (
            <div className="character-summary-container">
                <div className="character-summary-top">
                    <div className="character-summary-general">
                        {this.renderGeneral(this.state.general)}
                    </div>
                    <div className="character-summary-avatar">
                        <Avatar style={{ borderRadius: '0', height: '100%', width: '100%' }} src={av} />
                    </div>
                    <div className="character-summary-skills">
                        <table className="character-summary-table character-summary-skill-table">
                            <thead>
                                <tr>
                                    <th >Skill name</th>
                                    <th >Points</th>
                                </tr>
                            </thead>
                            <tbody className="scroll">
                                {this.renderDict(this.state.skillList)}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="character-summary-bottom">
                <div className="character-summary-scores">
                        <table className="character-summary-ability-table">
                            <tbody className="scroll">
                                {this.renderDict(this.state.abilities)}
                            </tbody>
                        </table>
                    </div>
                    <div className="character-summary-bottom-container">
                        <div className="character-summary-bottom-row">
                            <div className="character-summary-bottom-icon">
                                <Avatar style={{ borderRadius: '0', height: '100%' }} src={this.state.class['icon']} />
                            </div>
                            <div className="character-summary-bottom-name">
                                {this.state.class['name']}
                            </div>
                        </div>
                        <div className="character-summary-bottom-row">
                            <div className="character-summary-bottom-icon">
                                <Avatar style={{ borderRadius: '0', height: '100%' }} src={this.state.race['icon']} />
                            </div>
                            <div className="character-summary-bottom-name">
                                {this.state.race['name']}
                            </div>
                        </div>
                    </div>
                    <div className="character-summary-bottom-container">
                        <div className="character-summary-bottom-row">
                            <div className="character-summary-bottom-icon">
                                <Avatar style={{ borderRadius: '0', height: '100%' }} src={this.state.primweapon['icon']} />
                            </div>
                            <div className="character-summary-bottom-name">
                                {this.state.primweapon['name']}
                            </div>
                        </div>
                        <div className="character-summary-bottom-row">
                            <div className="character-summary-bottom-icon">
                                <Avatar style={{ borderRadius: '0', height: '100%' }} src={this.state.secweapon['icon']} />
                            </div>
                            <div className="character-summary-bottom-name">
                                {this.state.secweapon['name']}
                            </div>
                        </div>
                    </div>

                    <div className="character-summary-bottom-container">
                        {this.renderFeats(this.state.featsList)}
                        
                    </div>
                </div>

            </div>
        )
    }
}

export default CharacterSummary;