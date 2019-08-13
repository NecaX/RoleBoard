import React from 'react';
import './CharacterFeat.css';
import Info from '@material-ui/icons/Info'
import Close from '@material-ui/icons/Close'


class CharacterFeat extends React.Component {

    constructor(props) {
        super(props); //Constructor padre
        this.addFeat = this.addFeat.bind(this);
        this.removeFeat = this.removeFeat.bind(this);
        this.state = {
            featsList: [
                {
                    name: 'Acrobatic',
                    desc: '+2 bonus on Acrobatics and Fly checks',
                    type: 'General',
                    bonus: {
                        'Acrobatics': 2,
                        'Fly': 2
                    }
                },
                {
                    name: 'Agile Maneuvers',
                    desc: 'Use your Dex bonus when calculating your CMB',
                    type: 'Combat',
                    bonus: {}
                },
                {
                    name: 'Empower Spell',
                    desc: 'Increase spell variables by 50%, +2 Spell level',
                    type: 'Metamagic',
                    bonus: {}
                },
                {
                    name: 'Alertness',
                    desc: '+2 bonus on Perception and Sense Motive checks',
                    type: 'General',
                    bonus: {
                        'Perception': 2,
                        'Sense Motive': 2
                    }
                },
                {
                    name: 'Acrobatic',
                    desc: '+2 bonus on Acrobatics and Fly checks',
                    type: 'General',
                    bonus: {
                        'Acrobatics': 2,
                        'Fly': 2
                    }
                },
                {
                    name: 'Acrobatic',
                    desc: '+2 bonus on Acrobatics and Fly checks',
                    type: 'General',
                    bonus: {
                        'Acrobatics': 2,
                        'Fly': 2
                    }
                },
                {
                    name: 'Acrobatic',
                    desc: '+2 bonus on Acrobatics and Fly checks',
                    type: 'General',
                    bonus: {
                        'Acrobatics': 2,
                        'Fly': 2
                    }
                },
                {
                    name: 'Acrobatic',
                    desc: '+2 bonus on Acrobatics and Fly checks',
                    type: 'General',
                    bonus: {
                        'Acrobatics': 2,
                        'Fly': 2
                    }
                },
                {
                    name: 'Acrobatic',
                    desc: '+2 bonus on Acrobatics and Fly checks',
                    type: 'General',
                    bonus: {
                        'Acrobatics': 2,
                        'Fly': 2
                    }
                },
                {
                    name: 'Acrobatic',
                    desc: '+2 bonus on Acrobatics and Fly checks',
                    type: 'General',
                    bonus: {
                        'Acrobatics': 2,
                        'Fly': 2
                    }
                },
            ],
        }
    }

    renderOptions(array) {
        return array.map((charfeat, index) => {
            return (
                <tr key={index} onClick={() => this.addFeat(index)}>
                    <td style={{flexGrow: 3}}>{charfeat['name']}</td>
                    <td style={{flexGrow: 6}}>{charfeat['desc']}</td>
                    <td style={{flexGrow: 3}}>{charfeat['type']}</td>
                    <td style={{flexGrow: 1}}><Info style={{ color: 'rgba(0,0,0,0.4)' }} /></td>
                </tr>
            )
        })
    }

    addFeat(index) {
        var newFeat = this.state.featsList[index]
        if(this.props.data.featsLeft > 0 && !this.props.data.featsSelected.has(newFeat)){
            var newSet = this.props.data.featsSelected
            newSet.add(newFeat)
            this.props.modifyFunction('featsSelected', newSet)
            this.props.modifyFunction('featsLeft', this.props.data.featsLeft - 1)
        }
    }

    removeFeat(feat) {
        var newSet = this.props.data.featsSelected
        newSet.delete(feat)
        this.props.modifyFunction('featsSelected', newSet)
        this.props.modifyFunction('featsLeft', this.props.data.featsLeft + 1)
    }

    renderSelected() {
        return [...this.props.data.featsSelected].map((feat, index) => {

            return (
                <tr key={index}>
                    <td style={{flexGrow: 4}}>{feat['name']}</td>
                    <td style={{flexGrow: 1}}><Close onClick={() => this.removeFeat(feat)} style={{ color: '#d33f49' }} /></td>
                </tr>
            )
        })
    }

    render() {
        return (
            <div className="container-full flex-center-space-evenly flex-column">
                    <div className="points-header">
                        <div className="points-text">Feats remaining: {this.props.data.featsLeft}</div>
                    </div>
                    <div className="character-feat-body">
                        <table className="character-feat-table material-table material-shadow">
                            <thead>
                                <tr>
                                    <th style={{flexGrow: 2}}>Name</th>
                                    <th style={{flexGrow: 3}}>Description</th>
                                    <th style={{flexGrow: 2}}>Type</th>
                                    <th style={{flexGrow: 0.85}}></th>
                                </tr>
                            </thead>
                            <tbody className="scroll">
                                {this.renderOptions(this.state.featsList)}
                            </tbody>
                        </table>
                        <table className="character-feat-selection material-table">
                            <thead>
                                <tr>
                                    <th style={{flexGrow: 3}} >Feat selected</th>
                                    <th style={{flexGrow: 1}}></th>
                                </tr>
                            </thead>
                            <tbody className="scroll">
                                {this.renderSelected()}
                            </tbody>
                            </table>
                    </div>

                </div>
        )
    }
}

export default CharacterFeat;