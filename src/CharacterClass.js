import React from 'react';
import './CharacterClass.css';
import Info from '@material-ui/icons/Info'
import Avatar from '@material-ui/core/Avatar';
import barb from './img/barbarian.png'
import wiz from './img/wizard.png'
import bard from './img/bard.png'

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
                    icon: 'icon',
                    name: 'Barbarian',
                    dice: 'd12',
                    role: 'Physical fighter, not talkative',
                    ability: 'Strength'
                },
                {
                    icon: 'icon',
                    name: 'Barbarian',
                    dice: 'd12',
                    role: 'Physical fighter, not talkative',
                    ability: 'Strength'
                },
                {
                    icon: 'icon',
                    name: 'Barbarian',
                    dice: 'd12',
                    role: 'Physical fighter, not talkative',
                    ability: 'Strength'
                },
                {
                    icon: 'icon',
                    name: 'Barbarian',
                    dice: 'd12',
                    role: 'Physical fighter, not talkative',
                    ability: 'Strength'
                },
                {
                    icon: 'icon',
                    name: 'Barbarian',
                    dice: 'd12',
                    role: 'Physical fighter, not talkative',
                    ability: 'Strength'
                },
                {
                    icon: 'icon',
                    name: 'Barbarian',
                    dice: 'd12',
                    role: 'Physical fighter, not talkative',
                    ability: 'Strength'
                },
                {
                    icon: 'icon',
                    name: 'Barbarian',
                    dice: 'd12',
                    role: 'Physical fighter, not talkative',
                    ability: 'Strength'
                },
                {
                    icon: 'icon',
                    name: 'Barbarian',
                    dice: 'd12',
                    role: 'Physical fighter, not talkative',
                    ability: 'Strength'
                },
                {
                    icon: 'icon',
                    name: 'Barbarian',
                    dice: 'd12',
                    role: 'Physical fighter, not talkative',
                    ability: 'Strength'
                },
                {
                    icon: 'icon',
                    name: 'Barbarian',
                    dice: 'd12',
                    role: 'Physical fighter, not talkative',
                    ability: 'Strength'
                },
                {
                    icon: 'icon',
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
                    <td><Avatar src={charclass['icon']} /></td>
                    <td>{charclass['name']}</td>
                    <td>{charclass['dice']}</td>
                    <td>{charclass['role']}</td>
                    <td>{charclass['ability']}</td>
                    <td><Info style={{ color: 'rgba(0,0,0,0.4)' }} /></td>
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
                <td><Avatar src={charclass['icon']} /></td>
                <td>{charclass['name']}</td>
                <td>{charclass['dice']}</td>
                <td>{charclass['role']}</td>
                <td>{charclass['ability']}</td>
            </tr>
        )
    }

    render() {
        return (
            <div class="character-class-container">
                <table class="character-class-table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Class Name</th>
                            <th>Hit die</th>
                            <th>Role Style</th>
                            <th>Favoured ability</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody class="scroll">
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