import React from 'react';
import './CharacterSummary.css';
import Avatar from '@material-ui/core/Avatar';
import {serverAddress} from '../Util'

const alignments = {
    '': '',
    'lg': 'Lawful Good',
    'ng': 'Neutral Good',
    'cg': 'Chaotic Good',
    'ln': 'Lawful Neutral',
    'tn': 'True Neutral',
    'cn': 'Chaotic Neutral',
    'le': 'Lawful Evil',
    'ne': 'Neutral Evil',
    'ce': 'Chaotic Evil',
}

class CharacterSummary extends React.Component {

    constructor(props) {
        super(props); //Constructor padre
        this.state = {
        }
    }

    /**
     * Funcion que muestra los elementos generales en parejas
     * @param {String} contentOne 
     * @param {String} contentTwo 
     */
    renderGeneralElement(contentOne, contentTwo) {
        return (
            <div style={{ display: 'flex', justifyContent: 'space-evenly', fontSize: '110%' }}>
                <div style={{ width: '40%' }}>
                    {contentOne.capitalize()}
                </div>
                <div style={{ width: '40%' }}>
                    {contentTwo.capitalize()}
                </div>
            </div>
        )
    }

    /**
     * Funcion que muestra los datos generales del personaje
     * @param {Dict} general 
     */
    renderGeneral(general) {
        //eslint-disable-next-line
        return Object.keys(general).map((char, index) => {
            var charOne = Object.keys(general)[index]
            var charTwo = Object.keys(general)[index + 1]
            if (index === 0 ) {
                return this.renderGeneralElement(general[charOne], alignments[general[charTwo]])
            }
            else if(index === 6){
                return this.renderGeneralElement(general[charOne], general[charTwo])
            }
            else if (index % 2 === 0 && index < 8) {
                var contentOne = general[charOne] === '' ? '' : general[charOne].capitalize() + ' ' + charOne.capitalize()
                var contentTwo = general[charTwo] === '' ? '' : general[charTwo].capitalize() + ' ' + charTwo.capitalize()
                return this.renderGeneralElement(contentOne, contentTwo)
            }
        })
    }

    /**
     * Funcion que muestra las habilidades del personaje y sus rangos asignados
     * @param {Dict} skillList 
     */
    renderDict(skillList) {
        return Object.keys(skillList).map((skill, index) => {
            return (
                <tr key={index}>
                    <td>{skill}</td>
                    <td>{skillList[skill]}</td>
                </tr>
            )
        })
    }

    /**
     * Funcion que muestra las dotes del personaje
     * @param {Set} featsList 
     */
    renderFeats(featsList) {
        return([...featsList]).map((feat, index) => {
            return (
                <div key={index} className="flex-center-space-evenly">{feat.name}</div>
            )
        })
    }


    render() {
        return (
            <div className="container-full flex-center-space-evenly flex-column">
                <div className="character-summary-top flex-center-space-evenly">
                    <div className="character-summary-general character-summary-card material-shadow">
                        {this.renderGeneral(this.props.general)}
                    </div>
                    <div className="avatar flex-centered material-shadow">
                        <Avatar style={{ borderRadius: '100%', height: '100%', width: '100%' }} src={serverAddress + '/' +  this.props.general.imgPath} />
                    </div>
                    <div className="character-summary-skills flex-centered">
                        <table className="character-summary-table material-table material-shadow">
                            <thead>
                                <tr>
                                    <th >Skill name</th>
                                    <th >Points</th>
                                </tr>
                            </thead>
                            <tbody className="scroll">
                                {this.renderDict(this.props.skillList)}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="character-summary-bottom flex-center-space-evenly">
                    <div className="character-summary-bottom-container character-summary-card material-shadow">
                        <table className="character-summary-ability-table">
                            <tbody>
                                {this.renderDict(this.props.race.abilities)}
                            </tbody>
                        </table>
                    </div>
                    <div className="character-summary-bottom-container character-summary-card material-shadow">
                        <div className="flex-center-space-evenly">
                            <div className="character-summary-bottom-icon flex-centered">
                                <Avatar style={{ borderRadius: '0', height: '100%' }} src={this.props.class.icon} />
                            </div>
                            <div className="character-summary-bottom-name flex-centered">
                                {this.props.class.name}
                            </div>
                        </div>
                        <div className="flex-center-space-evenly">
                            <div className="character-summary-bottom-icon flex-centered">
                                <Avatar style={{ borderRadius: '0', height: '100%' }} src={this.props.race.icon} />
                            </div>
                            <div className="character-summary-bottom-name flex-centered">
                                {this.props.race.name}
                            </div>
                        </div>
                    </div>
                    <div className="character-summary-bottom-container character-summary-card material-shadow">
                        <div className="flex-center-space-evenly">
                            <div className="character-summary-bottom-icon flex-centered">
                                <Avatar style={{ borderRadius: '0', height: '100%' }} src={this.props.primweapon.icon} />
                            </div>
                            <div className="character-summary-bottom-name flex-centered">
                                {this.props.primweapon.name}
                            </div>
                        </div>
                        <div className="flex-center-space-evenly">
                            <div className="character-summary-bottom-icon flex-centered">
                                <Avatar style={{ borderRadius: '0', height: '100%' }} src={this.props.secweapon.icon} />
                            </div>
                            <div className="character-summary-bottom-name flex-centered">
                                {this.props.secweapon.name}
                            </div>
                        </div>
                    </div>

                    <div className="character-summary-bottom-container character-summary-card material-shadow">
                        {this.renderFeats(this.props.featsList)}
                    </div>
                </div>

            </div>
        )
    }
}

export default CharacterSummary;