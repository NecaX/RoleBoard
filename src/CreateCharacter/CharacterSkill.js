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
                },
                {
                    name: 'Appraise',
                    char: 'Intelligence',
                },
                {
                    name: 'Bluff',
                    char: 'Charisma',
                },
                {
                    name: 'Climb',
                    char: 'Strength',
                },
                {
                    name: 'Diplomacy',
                    char: 'Charisma',
                },
                {
                    name: 'Disable device',
                    char: 'Dexterity',
                },
            ],
            charMod: {},
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

        var newCharMod = {}

        Object.keys(this.props.abilities).forEach((ability, index) => {
            newCharMod[ability] = Math.floor(this.props.abilities[ability]/2) - 5
        })

        this.setState({
            bonusMod: newBonus,
            charMod: newCharMod
        })

        if(this.props.data.pointsLeft == -1) {
            this.props.modifyFunction('pointsLeft', this.props.skillRanks + newCharMod['Intelligence'])
        }
        
    }


    /**
     * Funcion que actualiza y mantiene un diccionario con las puntuaciones de cada rango.
     * Verifica antes de actualizar que queden puntos a asignar
     * @param {String} value Nuevo rango (proviene de input, es un String que pasa a int)
     * @param {String} name Nombre de la habilidad
     * @param {int} originalValue Rango original
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
            <div className="container-full flex-center-space-evenly flex-column">
                    <div className="points-header">
                        <div className="points-text">Points remaining: {this.props.data.pointsLeft}</div>
                    </div>
                    <table className="character-skill-table material-table material-shadow">
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