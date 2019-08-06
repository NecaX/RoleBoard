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
            featsLeft: 2,
            maxRank: 5,
            featsList: [
                {
                    name: 'Acrobatic',
                    desc: '+2 bonus on Acrobatics and Fly checks',
                    type: 'General'
                },
                {
                    name: 'Agile Maneuvers',
                    desc: 'Use your Dex bonus when calculating your CMB',
                    type: 'Combat'
                },
                {
                    name: 'Empower Spell',
                    desc: 'Increase spell variables by 50%, +2 Spell level',
                    type: 'Metamagic'
                },
                {
                    name: 'Alertness',
                    desc: '+2 bonus on Perception and Sense Motive checks',
                    type: 'General'
                },
                {
                    name: 'Acrobatic',
                    desc: '+2 bonus on Acrobatics and Fly checks',
                    type: 'General'
                },
                {
                    name: 'Acrobatic',
                    desc: '+2 bonus on Acrobatics and Fly checks',
                    type: 'General'
                },
                {
                    name: 'Acrobatic',
                    desc: '+2 bonus on Acrobatics and Fly checks',
                    type: 'General'
                },
                {
                    name: 'Acrobatic',
                    desc: '+2 bonus on Acrobatics and Fly checks',
                    type: 'General'
                },
            ],
            featsSelected: new Set([])
        }
    }

    renderOptions(array) {

        return array.map((charfeat, index) => {

            return (
                <tr onClick={() => this.addFeat(index)}>
                    <td style={{flexGrow: 3}}>{charfeat['name']}</td>
                    <td style={{flexGrow: 6}}>{charfeat['desc']}</td>
                    <td style={{flexGrow: 3}}>{charfeat['type']}</td>
                    <td style={{flexGrow: 1}}><Info style={{ color: 'rgba(0,0,0,0.4)' }} /></td>
                </tr>
            )
        })
    }

    addFeat(index) {
        var newFeat = this.state.featsList[index]['name']
        if(this.state.featsLeft > 0 && !this.state.featsSelected.has(newFeat)){
            var newSet = this.state.featsSelected
            newSet.add(newFeat)
            this.setState({
                featsSelected: newSet,
                featsLeft: this.state.featsLeft - 1
            })
        }
    }

    removeFeat(feat) {
        var newSet = this.state.featsSelected
        newSet.delete(feat)
        this.setState({
            featsSelected: newSet,
            featsLeft: this.state.featsLeft + 1
        })
    }

    renderSelected() {
        return [...this.state.featsSelected].map((feat, index) => {

            return (
                <tr>
                    <td style={{flexGrow: 4}}>{feat}</td>
                    <td style={{flexGrow: 1}}><Close onClick={() => this.removeFeat(feat)} style={{ color: '#d33f49' }} /></td>
                </tr>
            )
        })
    }




    render() {
        return (
            <div class="character-feat-container">
                    <div className="character-feat-header">
                        <div className="character-feat-points">Feats remaining: {this.state.featsLeft}</div>
                    </div>
                    <div className="character-feat-body">
                        <table class="character-feat-table">
                            <thead>
                                <tr>
                                    <th style={{flexGrow: 2}}>Name</th>
                                    <th style={{flexGrow: 3}}>Description</th>
                                    <th style={{flexGrow: 2}}>Type</th>
                                    <th style={{flexGrow: 0.85}}></th>
                                </tr>
                            </thead>
                            <tbody class="scroll">
                                {this.renderOptions(this.state.featsList)}
                            </tbody>
                        </table>
                        <table class="character-feat-table character-feat-selection">
                            <thead>
                                <tr>
                                    <th style={{flexGrow: 3}} >Feat selected</th>
                                    <th style={{flexGrow: 1}}></th>
                                </tr>
                            </thead>
                            <tbody class="scroll">
                                {this.renderSelected()}
                            </tbody>
                            </table>
                    </div>

                </div>
        )
    }
}

export default CharacterFeat;