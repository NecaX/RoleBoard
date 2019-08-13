import React from 'react';
import './CharacterRace.css';
import Info from '@material-ui/icons/Info'
import Avatar from '@material-ui/core/Avatar';
import elf from '../img/elf.png'
import dwarf from '../img/dwarf.png'
import gnome from '../img/gnome.png'
import onedice from '../img/one-dice.png';
import Fab from '@material-ui/core/Fab';

const abilities = [
    'Strength',
    'Dexterity',
    'Constitution',
    'Intelligence',
    'Wisdom',
    'Charisma'
]

class CharacterRace extends React.Component {

    constructor(props) {
        super(props); //Constructor padre
        this.changeSelected = this.changeSelected.bind(this);
        this.renderOptions = this.renderOptions.bind(this);
        this.rollDice = this.rollDice.bind(this);
        this.selectedScores = this.selectedScores.bind(this);
        this.state = {
            classList: [
                {
                    icon: elf,
                    name: 'Elf',
                    mod: { 
                        'Dexterity': 2,
                        'Intelligence': 2,
                        'Constitution': -2,
                    },
                    traits: [
                        'Low-Light Vision',
                        'Elven immunities',
                        'Elven magic',
                    ]
                },
                {
                    icon: dwarf,
                    name: 'Dwarf',
                    mod: {
                        'Charisma': -2,
                        'Wisdom': 2,
                        'Constitution': 2,
                    },
                    traits: [
                        'Darkvision',
                        'Defensive training',
                        'Greed',
                        'Hatred',
                        'Hardy'
                    ]
                },
                {
                    icon: gnome,
                    name: 'Gnome',
                    mod: {
                        'Strength': -2,
                        'Charisma': 2,
                        'Constitution': 2,
                    },
                    traits: [
                        'Defensive training',
                        'Gnome magic',
                        'Hatred',
                        'Illusion Resistance',
                    ]
                },
                {
                    icon: elf,
                    name: 'Elf',
                    mod: {
                        'Dexterity': 2,
                        'Intelligence': 2,
                        'Constitution': -2,
                    },
                    traits: [
                        'Low-Light Vision',
                        'Elven Immunities',
                        'Elven Magic',
                    ]
                },
                {
                    icon: elf,
                    name: 'Elf',
                    mod: {
                        'Dexterity': 2,
                        'Intelligence': 2,
                        'Constitution': -2,
                    },
                    traits: [
                        'Low-Light Vision',
                        'Elven Immunities',
                        'Elven Magic',
                    ]
                },
                {
                    icon: elf,
                    name: 'Elf',
                    mod: {
                        'Dexterity': 2,
                        'Intelligence': 2,
                        'Constitution': -2,
                    },
                    traits: [
                        'Low-Light Vision',
                        'Elven Immunities',
                        'Elven Magic',
                    ]
                },
                {
                    icon: elf,
                    name: 'Elf',
                    mod: {
                        'Dexterity': 2,
                        'Intelligence': 2,
                        'Constitution': -2,
                    },
                    traits: [
                        'Low-Light Vision',
                        'Elven Immunities',
                        'Elven Magic',
                    ]
                },
                {
                    icon: elf,
                    name: 'Elf',
                    mod: {
                        'Dexterity': 2,
                        'Intelligence': 2,
                        'Constitution': -2,
                    },
                    traits: [
                        'Low-Light Vision',
                        'Elven Immunities',
                        'Elven Magic',
                    ]
                },
                {
                    icon: elf,
                    name: 'Elf',
                    mod: {
                        'Dexterity': 2,
                        'Intelligence': 2,
                        'Constitution': -2,
                    },
                    traits: [
                        'Low-Light Vision',
                        'Elven Immunities',
                        'Elven Magic',
                    ]
                },
                
            ]
        }
    }

    /**
     * Funcion que renderiza las distintas razas cuando le pasas el array con las mismas
     * @param {Array} array Array de razas
     * Cada raza es un diccionario con los siguientes campos: 
     * icon: icono de la raza
     * name: Nombre de la raza
     * mod: Un diccionario con los modificadores raciales, la clave es la caracteristica y el valor el modificador (entero)
     * traits: Un array con los distintos rasgos raciales
     */
    renderOptions(array) {
        return array.map((charclass, index) => {
            return (
                <tr key={index} onClick={() => this.changeSelected(index)}>
                    <td style={{flexGrow: 1}}><Avatar style={{borderRadius:'0'}} src={charclass['icon']} /></td>
                    <td style={{flexGrow: 2}}>{charclass['name']}</td>
                    <td style={{flexGrow: 3}}>{this.renderMod(charclass['mod'])}</td>
                    <td style={{flexGrow: 3}}>{this.renderTraits(charclass['traits'])}</td>
                    <td style={{flexGrow: 1}}><Info style={{ color: 'rgba(0,0,0,0.4)' }} /></td>
                </tr>
            )
        })
    }

    /**
     * Funcion que lista los modificadores raciales ordenados por tamaño del string para mejor visualizacion
     * @param {Dict} mod Diccionario de modificadores raciales
     */
    renderMod(mod) {
        return Object.keys(mod).sort((a, b) => {return a.length - b.length - mod[a] + mod[b]}).map((char, index) => {
            return <div key={index}>{char}: {mod[char]}</div>
        })
    }

    /**
     * Funcion que lista los rasgos raciales. Si hay mas de 2 se muestran solo 2 y puntos suspensivos.
     * @param {Array} traits Array de rasgos raciales
     */
    renderTraits(traits) {
        //eslint-disable-next-line
        return traits.map((trait, index) => {
            if(index < 2){
                return <div key={index}>{trait}</div>
            } else if (index === 2){
                return <div key={index}>...</div>
            }
        })
    }

    /**
     * Funcion que genera la tabla de las habilidades. Se generan desde una lista estatica global.
     */
    renderAbilities() {
        return abilities.map((ability, index) => {
            // Si hay raza elegida, y la raza elegida tiene modificador para esta habilidad se pone, si no se toma 0
            if(this.props.data.raceChosen >= 0 && this.state.classList[this.props.data.raceChosen]['mod'][ability]){
                var racemod = this.state.classList[this.props.data.raceChosen]['mod'][ability]
            } else{
                racemod = 0
            }

            // Si se ha escogido un valor de la tirada de dados se pone, si no se toma 0
            var scoreIndex = parseInt(this.props.data.scores[index])-1
            var score = (scoreIndex) >= 0 ? this.props.data.genScores[scoreIndex] : 0
            var finalScore = racemod + score
            // Dependiendo de la tirada elegida, cambia el color de la casilla
            var colorClass = 'score '
            if(finalScore < 7) {
                colorClass += 'red'
            } else if(finalScore < 11) {
                colorClass += 'yellow'
            } else if(finalScore < 15) {
                colorClass += 'green'
            } else{
                colorClass += 'blue'
            }

            return (
                <tr key={index}>
                    <td>{ability}</td>
                    <td>
                        {/* El select se activa cuando se ha tirado el dado */}
                        <select value={this.props.data.scores[index]} disabled={!this.props.data.rolledDice} className="character-race-ability-select" onChange={(event) => this.modifyScore(event.target.value, index, ability, racemod)}>
                            {/* Los valores del select son los indices, para llevar control de que tirada se ha usado. El indice 0 se usa para el placeholder */}
                            <option value={0}>---</option>
                            {this.renderScores(this.props.data.genScores)}
                        </select>
                    </td>
                    <td className="character-race-ability-number">
                        {racemod}
                    </td>
                    <td className={`character-race-ability-number`}>
                        <div className = {colorClass}>{finalScore}</div>
                    </td>
                </tr>
            )
        })
    }

    /**
     * Funcion que genera las tiradas de manera estandar
     * Tira 4d6 por cada caracteristica y descarta la menor tirada
     */
    generateScores(){
        var scores = []
        for (var i = 0; i < 6; i++){
            var score = []
            for (var j = 0; j < 4; j++) {
                score.push(Math.floor(Math.random() * 6)+1)
            }
            console.log(score)
            score.sort((a,b) => {return a - b}).shift()
            var total = score.reduce((total, num) => {return total + num})
            scores.push(total)
        }
        return scores
    }

    /**
     * Funcion que se activa al tirar el dado
     */
    rollDice() {
        this.props.modifyFunction('genScores', this.generateScores())
        this.props.modifyFunction('rolledDice', true)
    }

    /**
     * Funcion que controla la raza seleccionada
     * Ademas, mantiene un diccionario con las puntuaciones de habilidades actualizado cuando cambia la clase
     * y en consecuencia cambian muchas puntuaciones
     */
    changeSelected(index) {
        this.props.modifyFunction('raceChosen', index)
        this.props.modifyFunction('name', this.state.classList[index]['name'])
        this.props.modifyFunction('icon', this.state.classList[index]['icon'])
        var newDict = this.props.data.abilities
        abilities.forEach((ability, index) => {
            var score = (parseInt(this.props.data.scores[index])-1) >= 0 ? this.props.data.genScores[parseInt(this.props.data.scores[index])-1] : 0
            var racemod = this.state.classList[this.props.data.raceChosen]['mod'][ability] ? this.state.classList[this.props.data.raceChosen]['mod'][ability] : 0
            newDict[ability] = score + racemod
        })
        this.props.modifyFunction('abilities', newDict)
    }

    /**
     * Funcion que muestra las puntuaciones obtenidas ordenadas de menor a mayor
     * Cada option se deshabilita si esa tirada ya se ha seleccionado
     */
    renderScores(array) {
        return array.sort((a,b) => {return a - b}).map((score, index) => {
            return (
                <option key={index} value={index+1} disabled={this.props.data.selSc.has(index+1)} >{score}</option>
            )
        })
    }

    /**
     * Funcion que se llama cuando se modifica una nueva tirada
     * Se actualiza el set de tiradas escogidas y el diccionario de caracteristicas
     */
    modifyScore(value, index, ability, racemod) {
        var newScores = this.props.data.scores
        this.selectedScores(newScores[index], value)
        newScores[index] = value
        var score = (parseInt(this.props.data.scores[index])-1) >= 0 ? this.props.data.genScores[parseInt(this.props.data.scores[index])-1] : 0
        var newDict = this.props.data.abilities
        newDict[ability] = racemod + score
        this.props.modifyFunction('scores', newScores)
        this.props.modifyFunction('abilities', newDict)
    }

    /**
     * Funcion que actualiza el set para que contenga las tiradas seleccionadas
     * Debido a que los option contienen String es necesario parsearlos a enteros
     * En caso de ser 0 no se almacena, ya que es el valor reservado al placeholder
     * @param {String} prev Anterior indice
     * @param {String} next Nuevo indice
     */
    selectedScores(prev, next){
        var newSet = this.props.data.selSc
        if (newSet.has(parseInt(prev))){
            newSet.delete(parseInt(prev))
        }
        if(next > 0) {
            newSet.add(parseInt(next))
        }
        this.props.modifyFunction('selSc', newSet)
    }

    /**
     * Funcion que muestra la raza seleccionada
     */
    renderChosen(charclass) {
        return (
            <tr className="material-selection">
                    <td style={{flexGrow: 1}}><Avatar style={{borderRadius:'0'}} src={charclass['icon']} /></td>
                    <td style={{flexGrow: 2}}>{charclass['name']}</td>
                    <td style={{flexGrow: 3}}>{this.renderMod(charclass['mod'])}</td>
                    <td style={{flexGrow: 3}}>{this.renderTraits(charclass['traits'])}</td>
            </tr>
        )
    }

    render() {
        return (
            <div className="container-full flex-center-space-evenly">
                <table className="character-race-table material-table material-shadow">
                    <thead>
                        <tr>
                            <th style={{flexGrow: 1}}></th>
                            <th style={{flexGrow: 2}}>Race Name</th>
                            <th style={{flexGrow: 2}}>Ability modifiers</th>
                            <th style={{flexGrow: 3}}>Racial traits</th>
                            <th style={{flexGrow: 1}}></th>
                        </tr>
                    </thead>
                    <tbody className="scroll">
                        {this.renderOptions(this.state.classList)}
                    </tbody>
                    <tbody >
                        {this.props.data.raceChosen >= 0 ? this.renderChosen(this.state.classList[this.props.data.raceChosen]) : <div/>}
                    </tbody>
                </table>
                <div className="character-race-ability flex-center-space-evenly ">
                    <table className="character-race-ability-table material-shadow">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Score</th>
                                <th>Race modifier</th>
                                <th>Final Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderAbilities()}
                        </tbody>
                    </table>
                    <Fab disabled={this.props.data.rolledDice} variant="extended" style={{fontFamily: 'Luminari'}} onClick={this.rollDice}>
                        <Avatar src={onedice} style={{paddingRight: 20}}/>
                        Get the scores
                    </Fab>
                </div>
            </div>
        )
    }
}

export default CharacterRace;