import React from 'react';
import './CharacterSkill.css';
import Info from '@material-ui/icons/Info'


class CharacterSkill extends React.Component {

    constructor(props) {
        super(props); //Constructor padre
        this.renderOptions = this.renderOptions.bind(this);
        this.updateRank = this.updateRank.bind(this);
        this.state = {
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
            bonusMod: {}
        }
    }

    renderOptions(array) {

        return array.map((charskill, index) => {
            var bonus = this.state.bonusMod[charskill['name']] ? this.state.bonusMod[charskill['name']] : 0
            var abilityMod = this.state.charMod[charskill['char']]
            var score = this.props.data.skillsSelected[charskill['name']] ? this.props.data.skillsSelected[charskill['name']] : 0
            var finalScore = abilityMod + bonus + score
            return (
                <tr key={index}>
                    <td >{charskill['name']}</td>
                    <td >{charskill['char']}</td>
                    <td ><input className="character-skill-input" type='number' onChange={(event) => this.updateRank(event.target.value, charskill['name'], score)} value={score} min={0} max={this.props.data.maxRank} onKeyDown={(e) => {e.preventDefault()}}></input></td>
                    <td >{abilityMod}</td>
                    <td >{bonus}</td>
                    <td >{finalScore}</td>
                    <td style={{flexGrow: 0.8}}><Info style={{ color: 'rgba(0,0,0,0.4)' }} /></td>
                </tr>
            )
        })
    }

    /**
     * Cuando carga el componente, se actualiza el diccionario de puntos bonus por clase, raza
     * dotes, etc
     */
    componentDidMount(){
        var newBonus = {}

        this.props.feats.forEach((feat, index) => {
            Object.keys(feat.bonus).forEach((skill, j) => {
                if(newBonus[skill]){
                    newBonus[skill] += feat.bonus[skill]
                }else {
                    newBonus[skill] = feat.bonus[skill]
                }
                
            })
        })

        this.setState({
            bonusMod: newBonus
        })
    }


    /**
     * Funcion que actualiza y mantiene un diccionario con las puntuaciones de cada rango.
     * Verifica antes de actualizar que queden puntos a asignar
     * @param {Nuevo rango} value 
     * @param {Nombre de la habilidad} name 
     * @param {Rango original} originalValue 
     */
    updateRank(value, name, originalValue){
        var newSkills = this.props.data.skillsSelected
        value = parseInt(value)
        var diff = value - originalValue
        if(this.props.data.pointsLeft - diff >= 0){
            newSkills[name] = value
            this.props.modifyFunction('skillsSelected', newSkills)
            this.props.modifyFunction('pointsLeft', this.props.data.pointsLeft - diff)
        }

    }


    render() {
        return (
            <div className="character-skill-container">
                    <div className="character-skill-header">
                        <div className="character-skill-points">Points remaining: {this.props.data.pointsLeft}</div>
                    </div>
                    <table className="character-skill-table">
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
                        <tbody className="scroll">
                            {this.renderOptions(this.state.skillsList)}
                        </tbody>
                    </table>
                </div>
        )
    }
}

export default CharacterSkill;