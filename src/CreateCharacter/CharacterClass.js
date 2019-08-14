import React from 'react';
import './CharacterClass.css';
import Info from '@material-ui/icons/Info'
import Avatar from '@material-ui/core/Avatar';
import barb from '../img/barbarian.png'
import wiz from '../img/wizard.png'
import bard from '../img/bard.png'

class CharacterClass extends React.Component {

    constructor(props) {
        super(props); //Constructor padre
        this.state = {
            classList: [
                {
                    icon: barb,
                    name: 'Barbarian',
                    dice: 'd12',
                    role: 'Physical fighter, not talkative',
                    ability: 'Strength',
                    skillRanks: 4,
                },
                {
                    icon: wiz,
                    name: 'Wizard',
                    dice: 'd6',
                    role: 'Range fighter, talkative',
                    ability: 'Intelligence',
                    skillRanks: 2,
                },
                {
                    icon: bard,
                    name: 'Bard',
                    dice: 'd8',
                    role: 'Support, very talkative',
                    ability: 'Charisma',
                    skillRanks: 6,
                },
                {
                    icon: barb,
                    name: 'Barbarian',
                    dice: 'd12',
                    role: 'Physical fighter, not talkative',
                    ability: 'Strength',
                    skillRanks: 4,
                },
                {
                    icon: barb,
                    name: 'Barbarian',
                    dice: 'd12',
                    role: 'Physical fighter, not talkative',
                    ability: 'Strength',
                    skillRanks: 4,
                },
                {
                    icon: barb,
                    name: 'Barbarian',
                    dice: 'd12',
                    role: 'Physical fighter, not talkative',
                    ability: 'Strength',
                    skillRanks: 4,
                },
                {
                    icon: barb,
                    name: 'Barbarian',
                    dice: 'd12',
                    role: 'Physical fighter, not talkative',
                    ability: 'Strength',
                    skillRanks: 4,
                },

                {
                    icon: barb,
                    name: 'Barbarian',
                    dice: 'd12',
                    role: 'Physical fighter, not talkative',
                    ability: 'Strength',
                    skillRanks: 4,
                },
                {
                    icon: barb,
                    name: 'Barbarian',
                    dice: 'd12',
                    role: 'Physical fighter, not talkative',
                    ability: 'Strength',
                    skillRanks: 4,
                },
            ]
        }
    }

    chooseClass(icon, name, index, skillRanks) {
        this.props.modifyFunction('name', icon)
        this.props.modifyFunction('icon', name)
        this.props.modifyFunction('chosen', index)
        this.props.modifyFunction('skillRanks', skillRanks)
    }

    renderOptions(array) {

        return array.map((charclass, index) => {
            return (
                <tr key={index} onClick={() => this.chooseClass(charclass['icon'], charclass['name'], index, charclass['skillRanks'])}>
                    <td style={{flexGrow: 1}}><Avatar src={charclass['icon']} /></td>
                    <td style={{flexGrow: 2}}>{charclass['name']}</td>
                    <td style={{flexGrow: 1}}>{charclass['dice']}</td>
                    <td style={{flexGrow: 4}}>{charclass['role']}</td>
                    <td style={{flexGrow: 2}}>{charclass['ability']}</td>
                    <td style={{flexGrow: 1}}><Info style={{ color: 'rgba(0,0,0,0.4)' }} /></td>
                </tr>
            )
        })
    }

    renderChosen(charclass) {
        return (
            <tr className="material-selection">
                <td style={{flexGrow: 1}}><Avatar src={charclass['icon']} /></td>
                <td style={{flexGrow: 2}}>{charclass['name']}</td>
                <td style={{flexGrow: 1}}>{charclass['dice']}</td>
                <td style={{flexGrow: 4}}>{charclass['role']}</td>
                <td style={{flexGrow: 2}}>{charclass['ability']}</td>
            </tr>
        )
    }

    render() {
        return (
            <div className="container-full flex-centered">
                <table className="character-class-table material-table material-shadow">
                    <thead>
                        <tr>
                            <th style={{flexGrow: 0.9}}></th>
                            <th style={{flexGrow: 2}}>Class Name</th>
                            <th style={{flexGrow: 0.7}}>Hit die</th>
                            <th style={{flexGrow: 3}}>Role Style</th>
                            <th style={{flexGrow: 2}}>Favoured ability</th>
                            <th style={{flexGrow: 1}}></th>
                        </tr>
                    </thead>
                    <tbody className="scroll">
                        {this.renderOptions(this.state.classList)}
                    </tbody>
                    <tbody >
                        {/* Show selected class only if some is selected */}
                        {this.props.data['chosen'] >= 0 ? this.renderChosen(this.state.classList[this.props.data['chosen']]) : <div/>}
                    </tbody>
                </table>
            </div>


        )
    }
}

export default CharacterClass;