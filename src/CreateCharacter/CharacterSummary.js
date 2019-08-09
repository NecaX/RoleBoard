import React from 'react';
import './CharacterSummary.css';
import human from '../img/human.png'
import fighter from '../img/fighter.png'
import spear from '../img/spear.png'
import dagger from '../img/dagger.png'
import Avatar from '@material-ui/core/Avatar';
import {serverAddress} from '../Util'

const alignments = {
    '': {name: ''},
    'lg': {name: 'Lawful Good', desc: 'A lawful good character acts as a good person is expected or required to act. He combines a commitment to oppose evil with the discipline to fight relentlessly. He tells the truth, keeps his word, helps those in need, and speaks out against injustice. A lawful good character hates to see the guilty go unpunished.'},
    'ng': {name: 'Neutral Good', desc: 'A neutral good character does the best that a good person can do. He is devoted to helping others. He works with kings and magistrates but does not feel beholden to them.'},
    'cg': {name: 'Chaotic Good', desc: 'A chaotic good character acts as his conscience directs him with little regard for what others expect of him. He makes his own way, but he\'s kind and benevolent. He believes in goodness and right but has little use for laws and regulations. He hates it when people try to intimidate others and tell them what to do. He follows his own moral compass, which, although good, may not agree with that of society.'},
    'ln': {name: 'Lawful Neutral', desc: 'A lawful neutral character acts as law, tradition, or a personal code directs her. Order and organization are paramount to her. She may believe in personal order and live by a code or standard, or she may believe in order for all and favor a strong, organized government.'},
    'tn': {name: 'True Neutral', desc: 'A neutral character does what seems to be a good idea. She doesn\'t feel strongly one way or the other when it comes to good vs. evil or law vs. chaos. Most neutral characters exhibit a lack of conviction or bias rather than a commitment to neutrality. Such a character thinks of good as better than evil-after all, she would rather have good neighbors and rulers than evil ones. Still, she\'s not personally committed to upholding good in any abstract or universal way.'},
    'cn': {name: 'Chaotic Neutral', desc: 'A chaotic neutral character follows his whims. He is an individualist first and last. He values his own liberty but doesn\'t strive to protect others\' freedom. He avoids authority, resents restrictions, and challenges traditions. A chaotic neutral character does not intentionally disrupt organizations as part of a campaign of anarchy. To do so, he would have to be motivated either by good (and a desire to liberate others) or evil (and a desire to make those different from himself suffer). A chaotic neutral character may be unpredictable, but his behavior is not totally random. He is not as likely to jump off a bridge as to cross it.'},
    'le': {name: 'Lawful Evil', desc: 'A lawful evil villain methodically takes what he wants within the limits of his code of conduct without regard for whom it hurts. He cares about tradition, loyalty, and order but not about freedom, dignity, or life. He plays by the rules but without mercy or compassion. He is comfortable in a hierarchy and would like to rule, but is willing to serve. He condemns others not according to their actions but according to race, religion, homeland, or social rank. He is loath to break laws or promises.'},
    'ne': {name: 'Neutral Evil', desc: 'A neutral evil villain does whatever she can get away with. She is out for herself, pure and simple. She sheds no tears for those she kills, whether for profit, sport, or convenience. She has no love of order and holds no illusion that following laws, traditions, or codes would make her any better or more noble. On the other hand, she doesn\'t have the restless nature or love of conflict that a chaotic evil villain has.'},
    'ce': {name: 'Chaotic Evil', desc: ' A chaotic evil character does whatever his greed, hatred, and lust for destruction drive him to do. He is hot-tempered, vicious, arbitrarily violent, and unpredictable. If he is simply out for whatever he can get, he is ruthless and brutal. If he is committed to the spread of evil and chaos, he is even worse. Thankfully, his plans are haphazard, and any groups he joins or forms are poorly organized. Typically, chaotic evil people can be made to work together only by force, and their leader lasts only as long as he can thwart attempts to topple or assassinate him.'}
}

class CharacterSummary extends React.Component {

    constructor(props) {
        super(props); //Constructor padre
        this.state = {
        }
    }


    /**
     * Funcion que muestra los datos generales del personaje
     * @param {Dict} general 
     */
    renderGeneral(general) {
        //eslint-disable-next-line
        return Object.keys(general).map((char, index) => {
            if (index === 0 ) {
                var charOne = Object.keys(general)[index]
                var charTwo = Object.keys(general)[index + 1]
                return (
                    <div key={index} style={{  display: 'flex', justifyContent: 'space-evenly', fontSize: '110%' }}>
                        <div style={{ width: '40%' }}>
                            {general[charOne].capitalize()}
                        </div>
                        <div style={{ width: '40%' }}>
                            {alignments[general[charTwo]]['name'].capitalize()}
                        </div>

                    </div>
                )
            }
            else if(index === 6){
                charOne = Object.keys(general)[index]
                charTwo = Object.keys(general)[index + 1]
                return (
                    <div style={{  display: 'flex', justifyContent: 'space-evenly', fontSize: '110%' }}>
                        <div style={{ width: '40%' }}>
                            {general[charOne].capitalize()}
                        </div>
                        <div style={{ width: '40%' }}>
                            {general[charTwo].capitalize()}
                        </div>

                    </div>
                )
            }
            else if (index % 2 === 0 && index < 8) {
                charOne = Object.keys(general)[index]
                charTwo = Object.keys(general)[index + 1]
                var contentOne = general[charOne] === '' ? '' : general[charOne].capitalize() + ' ' + charOne.capitalize()
                var contentTwo = general[charTwo] === '' ? '' : general[charTwo].capitalize() + ' ' + charTwo.capitalize()
                return (
                    <div style={{ display: 'flex', justifyContent: 'space-evenly', fontSize: '110%' }}>
                        <div style={{ width: '40%' }}>
                            {contentOne}
                        </div>
                        <div style={{ width: '40%' }}>
                            {contentTwo}
                        </div>

                    </div>
                )
            }
        })
    }

    /**
     * Funcion que muestra las habilidades del personaje y sus rangos asignados
     * @param {Dict} skillList 
     */
    renderDict(skillList) {
        return Object.keys(skillList).map((skill, index) => {
            return (

                <tr key={index}>
                    <td>{skill}</td>
                    <td>{skillList[skill]}</td>
                </tr>

            )

        })
    }

    /**
     * Funcion que muestra las dotes del personaje
     * @param {Set} featsList 
     */
    renderFeats(featsList) {
        return([...featsList]).map((feat, index) => {
            return (
                <div key={index} className="character-summary-bottom-row">{feat}</div>
            )

        })
    }


    render() {
        return (
            <div className="character-summary-container">
                <div className="character-summary-top">
                    <div className="character-summary-general">
                        {this.renderGeneral(this.props.general)}
                    </div>
                    <div className="character-summary-avatar">
                        <Avatar style={{ borderRadius: '0', height: '100%', width: '100%' }} src={serverAddress + '/' +  this.props.general['imgPath']} />
                    </div>
                    <div className="character-summary-skills">
                        <table className="character-summary-table character-summary-skill-table">
                            <thead>
                                <tr>
                                    <th >Skill name</th>
                                    <th >Points</th>
                                </tr>
                            </thead>
                            <tbody className="scroll">
                                {this.renderDict(this.props.skillList)}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="character-summary-bottom">
                <div className="character-summary-scores">
                        <table className="character-summary-ability-table">
                            <tbody className="scroll">
                                {this.renderDict(this.props.race.abilities)}
                            </tbody>
                        </table>
                    </div>
                    <div className="character-summary-bottom-container">
                        <div className="character-summary-bottom-row">
                            <div className="character-summary-bottom-icon">
                                <Avatar style={{ borderRadius: '0', height: '100%' }} src={this.props.class['icon']} />
                            </div>
                            <div className="character-summary-bottom-name">
                                {this.props.class['name']}
                            </div>
                        </div>
                        <div className="character-summary-bottom-row">
                            <div className="character-summary-bottom-icon">
                                <Avatar style={{ borderRadius: '0', height: '100%' }} src={this.props.race['icon']} />
                            </div>
                            <div className="character-summary-bottom-name">
                                {this.props.race['name']}
                            </div>
                        </div>
                    </div>
                    <div className="character-summary-bottom-container">
                        <div className="character-summary-bottom-row">
                            <div className="character-summary-bottom-icon">
                                <Avatar style={{ borderRadius: '0', height: '100%' }} src={this.props.primweapon['icon']} />
                            </div>
                            <div className="character-summary-bottom-name">
                                {this.props.primweapon['name']}
                            </div>
                        </div>
                        <div className="character-summary-bottom-row">
                            <div className="character-summary-bottom-icon">
                                <Avatar style={{ borderRadius: '0', height: '100%' }} src={this.props.secweapon['icon']} />
                            </div>
                            <div className="character-summary-bottom-name">
                                {this.props.secweapon['name']}
                            </div>
                        </div>
                    </div>

                    <div className="character-summary-bottom-container">
                        {this.renderFeats(this.props.featsList)}
                    </div>
                </div>

            </div>
        )
    }
}

export default CharacterSummary;