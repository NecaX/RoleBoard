import React from 'react';
import './CharacterSkill.css';
import Info from '@material-ui/icons/Info'


class CharacterSkill extends React.Component {

    constructor(props) {
        super(props); //Constructor padre
        this.renderOptions = this.renderOptions.bind(this);
        this.updateRank = this.updateRank.bind(this);
        this.state = {
            pointsLeft: 10,
            maxRank: 5,
            skillsList: [
                {
                    name: 'Acrobatics',
                    char: 'Dexterity',
                    rank: 0
                },
                {
                    name: 'Appraise',
                    char: 'Intelligence',
                    rank: 0
                },
                {
                    name: 'Bluff',
                    char: 'Charisma',
                    rank: 0
                },
                {
                    name: 'Climb',
                    char: 'Strength',
                    rank: 0
                },
                {
                    name: 'Diplomacy',
                    char: 'Charisma',
                    rank: 0
                },
                {
                    name: 'Disable device',
                    char: 'Dexterity',
                    rank: 0
                },
            ],
            charMod: {
                'Strength': 0,
                'Dexterity': 1,
                'Constitution': 3,
                'Intelligence': 2,
                'Wisdom': 1,
                'Charisma': 2,
            },
            bonusMod: {
                'Acrobatics': 2,
                'Diplomacy': 1,
            }
        }
    }

    renderOptions(array) {

        return array.map((charskill, index) => {
            var bonus = this.state.bonusMod[charskill['name']] ? this.state.bonusMod[charskill['name']] : 0

            return (
                <tr>
                    <td >{charskill['name']}</td>
                    <td >{charskill['char']}</td>
                    <td ><input className="character-skill-input" type='number' onChange={(event) => this.updateRank(event.target.value, index)} value={charskill['rank']} min={0} max={this.state.maxRank} onKeyDown={(e) => {e.preventDefault()}}></input></td>
                    <td >{this.state.charMod[charskill['char']]}</td>
                    <td >{bonus}</td>
                    <td >{this.state.charMod[charskill['char']] + bonus + charskill['rank']}</td>
                    <td style={{flexGrow: 0.8}}><Info style={{ color: 'rgba(0,0,0,0.4)' }} /></td>
                </tr>
            )
        })
    }

    updateRank(value, index){
        var newSkills = this.state.skillsList
        value = parseInt(value)
        var diff = value - newSkills[index]['rank'] 
        if(this.state.pointsLeft - diff >= 0){
            newSkills[index]['rank'] = value
            this.setState({
                skillsList: newSkills,
                pointsLeft: this.state.pointsLeft - diff
            })
        }

    }


    render() {
        return (
            <div class="character-skill-container">
                    <div className="character-skill-header">
                        <div className="character-skill-points">Points remaining: {this.state.pointsLeft}</div>

                    </div>
                    <table class="character-skill-table">
                        <thead>
                            <tr>
                                <th >Name</th>
                                <th >Characteristic</th>
                                <th >Rank</th>
                                <th >Modifier</th>
                                <th >Bonus</th>
                                <th >Total</th>
                                <th ></th>
                            </tr>
                        </thead>
                        <tbody class="scroll">
                            {this.renderOptions(this.state.skillsList)}
                        </tbody>
                    </table>
                </div>
        )
    }
}

export default CharacterSkill;