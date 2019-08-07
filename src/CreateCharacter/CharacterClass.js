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
        this.changeSelected = this.changeSelected.bind(this);
        this.renderOptions = this.renderOptions.bind(this);
        this.state = {
            classChosen: 0,
            classList: [
                {
                    icon: barb,
                    name: 'Barbarian',
                    dice: 'd12',
                    role: 'Physical fighter, not talkative',
                    ability: 'Strength'
                },
                {
                    icon: wiz,
                    name: 'Wizard',
                    dice: 'd6',
                    role: 'Range fighter, talkative',
                    ability: 'Intelligence'
                },
                {
                    icon: bard,
                    name: 'Bard',
                    dice: 'd8',
                    role: 'Support, very talkative',
                    ability: 'Charisma'
                },
                {
                    icon: barb,
                    name: 'Barbarian',
                    dice: 'd12',
                    role: 'Physical fighter, not talkative',
                    ability: 'Strength'
                },
                {
                    icon: barb,
                    name: 'Barbarian',
                    dice: 'd12',
                    role: 'Physical fighter, not talkative',
                    ability: 'Strength'
                },
                {
                    icon: barb,
                    name: 'Barbarian',
                    dice: 'd12',
                    role: 'Physical fighter, not talkative',
                    ability: 'Strength'
                },
                {
                    icon: barb,
                    name: 'Barbarian',
                    dice: 'd12',
                    role: 'Physical fighter, not talkative',
                    ability: 'Strength'
                },
                {
                    icon: barb,
                    name: 'Barbarian',
                    dice: 'd12',
                    role: 'Physical fighter, not talkative',
                    ability: 'Strength'
                },
                {
                    icon: barb,
                    name: 'Barbarian',
                    dice: 'd12',
                    role: 'Physical fighter, not talkative',
                    ability: 'Strength'
                },
                {
                    icon: barb,
                    name: 'Barbarian',
                    dice: 'd12',
                    role: 'Physical fighter, not talkative',
                    ability: 'Strength'
                },
                {
                    icon: barb,
                    name: 'Barbarian',
                    dice: 'd12',
                    role: 'Physical fighter, not talkative',
                    ability: 'Strength'
                },
                {
                    icon: barb,
                    name: 'Barbarian',
                    dice: 'd12',
                    role: 'Physical fighter, not talkative',
                    ability: 'Strength'
                },
                {
                    icon: barb,
                    name: 'Barbarian',
                    dice: 'd12',
                    role: 'Physical fighter, not talkative',
                    ability: 'Strength'
                },
                {
                    icon: barb,
                    name: 'Barbarian',
                    dice: 'd12',
                    role: 'Physical fighter, not talkative',
                    ability: 'Strength'
                },
            ]
        }
    }

    renderOptions(array) {

        return array.map((charclass, index) => {
            return (
                <tr onClick={() => this.changeSelected(index)}>
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

    changeSelected(index) {
        this.setState({
            classChosen: index,
        })
    }

    renderChosen(charclass) {
        return (
            <tr className="character-class-selection">
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
            <div className="character-class-container">
                <table className="character-class-table">
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
                        {this.renderChosen(this.state.classList[this.state.classChosen])}
                    </tbody>
                </table>
            </div>


        )
    }
}

export default CharacterClass;