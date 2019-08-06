import React from 'react';
import './CharacterRace.css';
import Info from '@material-ui/icons/Info'
import Avatar from '@material-ui/core/Avatar';
import elf from './img/elf.png'
import dwarf from './img/dwarf.png'
import gnome from './img/gnome.png'
import onedice from './img/one-dice.png';
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
            raceChosen: 0, // Indice de la raza seleccionada
            scores: [0,0,0,0,0,0], // Array de indices de las puntuaciones seleccionadas
            genScores: [0,0,0,0,0,0], // Array (estatico cuando se lanza el dado) de las puntuaciones
            rolledDice: false,
            selSc: new Set([]), // Set de los indices de las puntuaciones ya seleccionadas (para seleccionarlas una sola vez)
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
                <tr onClick={() => this.changeSelected(index)}>
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
            return <div>{char}: {mod[char]}</div>
        })
    }

    /**
     * Funcion que lista los rasgos raciales. Si hay mas de 2 se muestran solo 2 y puntos suspensivos.
     * @param {Array} traits Array de rasgos raciales
     */
    renderTraits(traits) {
        return traits.map((trait, index) => {
            if(index < 2){
                return <div>{trait}</div>
            } else if (index === 2){
                return <div>...</div>
            }
        })
    }

    /**
     * Funcion que genera la tabla de las habilidades. Se generan desde una lista estatica global.
     */
    renderAbilities() {
        return abilities.map((ability, index) => {
            // Si la raza elegida tiene modificador para esta habilidad se pone, si no se toma 0
            var racemod = this.state.classList[this.state.raceChosen]['mod'][ability] ? this.state.classList[this.state.raceChosen]['mod'][ability] : 0
            // Si se ha escogido un valor de la tirada de dados se pone, si no se toma 0
            var score = (parseInt(this.state.scores[index])-1) >= 0 ? this.state.genScores[parseInt(this.state.scores[index])-1] : 0
            var colorClass = ''
            // Dependiendo de la tirada elegida, cambia el color de la casilla
            if(racemod + score < 7) {
                colorClass = 'red'
            } else if(racemod + score < 11) {
                colorClass = 'yellow'
            } else if(racemod + score < 15) {
                colorClass = 'green'
            } else{
                colorClass = 'blue'
            }

            return (
                <tr>
                    <td>{ability}</td>
                    <td>
                        {/* El select se activa cuando se ha tirado el dado */}
                        <select disabled={!this.state.rolledDice} className="class-race-ability-select" onChange={(event) => this.modifyScore(event.target.value, index)}>
                            {/* Los valores del select son los indices, para llevar control de que tirada se ha usado. El indice 0 se usa para el placeholder */}
                            <option value={0}>---</option>
                            {this.renderScores(this.state.genScores)}
                        </select>
                    </td>
                    <td className="character-race-ability-number">
                        {racemod}
                    </td>
                    <td className={`character-race-ability-number`}>
                        <div className = {colorClass}>{score + racemod}</div>
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
        this.setState({
            genScores: this.generateScores(),
            rolledDice: true,
        })
    }

    /**
     * Funcion que controla la raza seleccionada
     */
    changeSelected(index) {
        this.setState({
            raceChosen: index,
        })
    }

    /**
     * Funcion que muestra las puntuaciones obtenidas ordenadas de menor a mayor
     * Cada option se deshabilita si esa tirada ya se ha seleccionado
     */
    renderScores(array) {
        return array.sort((a,b) => {return a - b}).map((score, index) => {
            return (
                <option value={index+1} disabled={this.state.selSc.has(index+1)} >{score}</option>
            )
        })
    }

    /**
     * Funcion que se llama cuando se modifica una nueva tirada
     * Se actualiza el set de tiradas escogidas y el array de caracteristicas
     */
    modifyScore(value, index) {
        var newScores = this.state.scores
        this.selectedScores(newScores[index], value)
        newScores[index] = value
        this.setState({
            scores: newScores
        })
    }

    /**
     * Funcion que actualiza el set para que contenga las tiradas seleccionadas
     * Debido a que los option contienen String es necesario parsearlos a enteros
     * En caso de ser 0 no se almacena, ya que es el valor reservado al placeholder
     * @param {String} prev Anterior indice
     * @param {String} next Nuevo indice
     */
    selectedScores(prev, next){
        var newSet = this.state.selSc
        if (newSet.has(parseInt(prev))){
            newSet.delete(parseInt(prev))
        }
        if(next > 0) {
            newSet.add(parseInt(next))
        }

        this.setState({
            selSc: newSet,
        })
        console.log(this.state.selSc)
    }

    /**
     * Funcion que muestra la raza seleccionada
     */
    renderChosen(charclass) {
        return (
            <tr className="character-race-selection">
                    <td style={{flexGrow: 1}}><Avatar style={{borderRadius:'0'}} src={charclass['icon']} /></td>
                    <td style={{flexGrow: 2}}>{charclass['name']}</td>
                    <td style={{flexGrow: 3}}>{this.renderMod(charclass['mod'])}</td>
                    <td style={{flexGrow: 3}}>{this.renderTraits(charclass['traits'])}</td>
            </tr>
        )
    }

    render() {
        return (
            <div class="character-race-container">
                <table class="character-race-table">
                    <thead>
                        <tr>
                            <th style={{flexGrow: 1}}></th>
                            <th style={{flexGrow: 2}}>Race Name</th>
                            <th style={{flexGrow: 2}}>Ability modifiers</th>
                            <th style={{flexGrow: 3}}>Racial traits</th>
                            <th style={{flexGrow: 1}}></th>
                        </tr>
                    </thead>
                    <tbody class="scroll">
                        {this.renderOptions(this.state.classList)}
                    </tbody>
                    <tbody >
                        {this.renderChosen(this.state.classList[this.state.raceChosen])}
                    </tbody>
                </table>
                <div class="character-race-ability">
                    <table className="character-race-ability-table">
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
                    <Fab disabled={this.state.rolledDice} variant="extended" style={{fontFamily: 'Luminari'}} onClick={this.rollDice}>
                        <Avatar src={onedice} style={{paddingRight: 20}}/>
                        Get the scores
                    </Fab>
                </div>
            </div>


        )
    }
}

export default CharacterRace;