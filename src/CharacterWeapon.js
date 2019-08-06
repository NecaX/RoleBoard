import React from 'react';
import './CharacterWeapon.css';
import Info from '@material-ui/icons/Info'
import Avatar from '@material-ui/core/Avatar';
import dagger from './img/dagger.png'
import crossbow from './img/crossbow.png'
import spear from './img/spear.png'
import club from './img/club.png'


class CharacterWeapon extends React.Component {

    constructor(props) {
        super(props); //Constructor padre
        this.changePrimary = this.changePrimary.bind(this);
        this.changeSecondary = this.changeSecondary.bind(this);
        this.renderOptions = this.renderOptions.bind(this);
        this.state = {
            primaryChosen: 0,
            secondaryChosen: 0,
            primaryList: [
                {
                    icon: club,
                    name: 'Club',
                    cat: 'One-Handed',
                    type: 'Simple',
                    dmg: '1d6',
                    crit: 'x2'
                },
                {
                    icon: spear,
                    name: 'Longspear',
                    cat: 'Two-Handed',
                    type: 'Simple',
                    dmg: '1d8',
                    crit: 'x3'
                }, {
                    icon: dagger,
                    name: 'Longsword',
                    cat: 'One-Handed',
                    type: 'Martial',
                    dmg: '1d8',
                    crit: '19-20 x2'
                }, {
                    icon: dagger,
                    name: 'Dagger',
                    cat: 'Light',
                    type: 'Simple',
                    dmg: '1d3',
                    crit: '19-20 x2'
                }, {
                    icon: dagger,
                    name: 'Dagger',
                    cat: 'Light',
                    type: 'Simple',
                    dmg: '1d3',
                    crit: '19-20 x2'
                }, {
                    icon: dagger,
                    name: 'Dagger',
                    cat: 'Light',
                    type: 'Simple',
                    dmg: '1d3',
                    crit: '19-20 x2'
                }, {
                    icon: dagger,
                    name: 'Dagger',
                    cat: 'Light',
                    type: 'Simple',
                    dmg: '1d3',
                    crit: '19-20 x2'
                }, {
                    icon: dagger,
                    name: 'Dagger',
                    cat: 'Light',
                    type: 'Simple',
                    dmg: '1d3',
                    crit: '19-20 x2'
                }, {
                    icon: dagger,
                    name: 'Dagger',
                    cat: 'Light',
                    type: 'Simple',
                    dmg: '1d3',
                    crit: '19-20 x2'
                },
            ],
            secondaryList: [
                {
                    icon: dagger,
                    name: 'Dagger',
                    cat: 'Light',
                    type: 'Simple',
                    dmg: '1d4',
                    crit: '19-20 x2'
                },
                {
                    icon: crossbow,
                    name: 'Light Crossbow',
                    cat: 'Ranged',
                    type: 'Simple',
                    dmg: '1d8',
                    crit: '19-20 x2'
                }, {
                    icon: dagger,
                    name: 'Spring blade',
                    cat: 'Light',
                    type: 'Simple',
                    dmg: '1d4',
                    crit: 'x2'
                }, {
                    icon: dagger,
                    name: 'Dagger',
                    cat: 'Light',
                    type: 'Simple',
                    dmg: '1d3',
                    crit: '19-20 x2'
                }, {
                    icon: dagger,
                    name: 'Dagger',
                    cat: 'Light',
                    type: 'Simple',
                    dmg: '1d3',
                    crit: '19-20 x2'
                }, {
                    icon: dagger,
                    name: 'Dagger',
                    cat: 'Light',
                    type: 'Simple',
                    dmg: '1d3',
                    crit: '19-20 x2'
                }, {
                    icon: dagger,
                    name: 'Dagger',
                    cat: 'Light',
                    type: 'Simple',
                    dmg: '1d3',
                    crit: '19-20 x2'
                }, {
                    icon: dagger,
                    name: 'Dagger',
                    cat: 'Light',
                    type: 'Simple',
                    dmg: '1d3',
                    crit: '19-20 x2'
                }, {
                    icon: dagger,
                    name: 'Dagger',
                    cat: 'Light',
                    type: 'Simple',
                    dmg: '1d3',
                    crit: '19-20 x2'
                },
            ]
        }
    }

    renderOptions(array, changeSelected) {

        return array.map((charweapon, index) => {
            return (
                <tr onClick={() => changeSelected(index)}>
                    <td style={{ flexGrow: 1 }}><Avatar style={{ borderRadius: 0 }} src={charweapon['icon']} /></td>
                    <td style={{ flexGrow: 4 }}>{charweapon['name']}</td>
                    <td style={{ flexGrow: 3 }}>{charweapon['cat']}</td>
                    <td style={{ flexGrow: 3 }}>{charweapon['type']}</td>
                    <td style={{ flexGrow: 2 }}>{charweapon['dmg']}</td>
                    <td style={{ flexGrow: 3 }}>{charweapon['crit']}</td>
                    <td style={{ flexGrow: 1 }}><Info style={{ color: 'rgba(0,0,0,0.4)' }} /></td>
                </tr>
            )
        })
    }

    changePrimary(index) {
        this.setState({
            primaryChosen: index,
        })
    }

    changeSecondary(index) {
        this.setState({
            secondaryChosen: index,
        })
    }

    renderChosen(charweapon) {
        return (
            <tr className="character-class-selection">
                <td ><Avatar style={{ borderRadius: 0 }} src={charweapon['icon']} /></td>
                <td >{charweapon['name']}</td>
                <td >{charweapon['cat']}</td>
                <td >{charweapon['type']}</td>
                <td >{charweapon['dmg']}</td>
                <td >{charweapon['crit']}</td>
            </tr>
        )
    }

    render() {
        return (
            <div className="character-weapon-container">
                <div className="character-weapon-side">
                    <div className="character-weapon-title">Primary Weapon</div>
                    <table className="character-weapon-table">
                        <thead>
                            <tr>
                                <th style={{ flexGrow: 1 }}>Type</th>
                                <th style={{ flexGrow: 1.3 }}>Weapon Name</th>
                                <th style={{ flexGrow: 1.3 }}>Category</th>
                                <th style={{ flexGrow: 1 }}>Type</th>
                                <th style={{ flexGrow: 1 }}>Damage</th>
                                <th style={{ flexGrow: 1 }}>Critical</th>
                                <th ></th>
                            </tr>
                        </thead>
                        <tbody className="scroll">
                            {this.renderOptions(this.state.primaryList, this.changePrimary)}
                        </tbody>
                        <tbody >
                            {this.renderChosen(this.state.primaryList[this.state.primaryChosen])}
                        </tbody>
                    </table>
                </div>

                <div className="character-weapon-side">
                    <div className="character-weapon-title">Secondary Weapon</div>
                    <table className="character-weapon-table">
                        <thead>
                            <tr>
                                <th style={{ flexGrow: 1 }}>Type</th>
                                <th style={{ flexGrow: 1.3 }}>Weapon Name</th>
                                <th style={{ flexGrow: 1.3 }}>Category</th>
                                <th style={{ flexGrow: 1 }}>Type</th>
                                <th style={{ flexGrow: 1 }}>Damage</th>
                                <th style={{ flexGrow: 1 }}>Critical</th>
                                <th ></th>
                            </tr>
                        </thead>
                        <tbody className="scroll">
                            {this.renderOptions(this.state.secondaryList, this.changeSecondary)}
                        </tbody>
                        <tbody >
                            {this.renderChosen(this.state.secondaryList[this.state.secondaryChosen])}
                        </tbody>
                    </table>
                </div>

            </div>


        )
    }
}

export default CharacterWeapon;