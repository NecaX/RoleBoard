import React from 'react';
import './CharacterGeneral.css';
import CssTextField from '../components/CssTextField'
import AddPhotoAlternate from '@material-ui/icons/AddPhotoAlternate'
import { serverAddress } from '../Util.js'
import { Tooltip } from '@material-ui/core';

// Organized in three arrays to maintain div structure
const lawfulAlignments = {
    'lg': { name: 'Lawful Good', desc: 'A lawful good character acts as a good person is expected or required to act. He combines a commitment to oppose evil with the discipline to fight relentlessly. He tells the truth, keeps his word, helps those in need, and speaks out against injustice. A lawful good character hates to see the guilty go unpunished.' },
    'ng': { name: 'Neutral Good', desc: 'A neutral good character does the best that a good person can do. He is devoted to helping others. He works with kings and magistrates but does not feel beholden to them.' },
    'cg': { name: 'Chaotic Good', desc: 'A chaotic good character acts as his conscience directs him with little regard for what others expect of him. He makes his own way, but he\'s kind and benevolent. He believes in goodness and right but has little use for laws and regulations. He hates it when people try to intimidate others and tell them what to do. He follows his own moral compass, which, although good, may not agree with that of society.' },
}

const neutralAlignments = {
    'ln': { name: 'Lawful Neutral', desc: 'A lawful neutral character acts as law, tradition, or a personal code directs her. Order and organization are paramount to her. She may believe in personal order and live by a code or standard, or she may believe in order for all and favor a strong, organized government.' },
    'tn': { name: 'True Neutral', desc: 'A neutral character does what seems to be a good idea. She doesn\'t feel strongly one way or the other when it comes to good vs. evil or law vs. chaos. Most neutral characters exhibit a lack of conviction or bias rather than a commitment to neutrality. Such a character thinks of good as better than evil-after all, she would rather have good neighbors and rulers than evil ones. Still, she\'s not personally committed to upholding good in any abstract or universal way.' },
    'cn': { name: 'Chaotic Neutral', desc: 'A chaotic neutral character follows his whims. He is an individualist first and last. He values his own liberty but doesn\'t strive to protect others\' freedom. He avoids authority, resents restrictions, and challenges traditions. A chaotic neutral character does not intentionally disrupt organizations as part of a campaign of anarchy. To do so, he would have to be motivated either by good (and a desire to liberate others) or evil (and a desire to make those different from himself suffer). A chaotic neutral character may be unpredictable, but his behavior is not totally random. He is not as likely to jump off a bridge as to cross it.' },
}

const evilAlignments = {
    'le': { name: 'Lawful Evil', desc: 'A lawful evil villain methodically takes what he wants within the limits of his code of conduct without regard for whom it hurts. He cares about tradition, loyalty, and order but not about freedom, dignity, or life. He plays by the rules but without mercy or compassion. He is comfortable in a hierarchy and would like to rule, but is willing to serve. He condemns others not according to their actions but according to race, religion, homeland, or social rank. He is loath to break laws or promises.' },
    'ne': { name: 'Neutral Evil', desc: 'A neutral evil villain does whatever she can get away with. She is out for herself, pure and simple. She sheds no tears for those she kills, whether for profit, sport, or convenience. She has no love of order and holds no illusion that following laws, traditions, or codes would make her any better or more noble. On the other hand, she doesn\'t have the restless nature or love of conflict that a chaotic evil villain has.' },
    'ce': { name: 'Chaotic Evil', desc: ' A chaotic evil character does whatever his greed, hatred, and lust for destruction drive him to do. He is hot-tempered, vicious, arbitrarily violent, and unpredictable. If he is simply out for whatever he can get, he is ruthless and brutal. If he is committed to the spread of evil and chaos, he is even worse. Thankfully, his plans are haphazard, and any groups he joins or forms are poorly organized. Typically, chaotic evil people can be made to work together only by force, and their leader lasts only as long as he can thwart attempts to topple or assassinate him.' }
}

const alignments = {
    'lawful': lawfulAlignments,
    'neutral': neutralAlignments,
    'evil': evilAlignments,
}

class CharacterGeneral extends React.Component {

    constructor(props) {
        super(props); //Constructor padre
        this.addPicture = this.addPicture.bind(this)
        this.state = {
            hair: [
                'blond',
                'brown',
            ],
            eyes: [
                'blue',
                'green',
                'brown'
            ],
            size: [
                'small',
                'medium',
                'big'
            ],
            skin: [
                'dark',
                'pale'
            ],
            gender: [
                'male',
                'female',
                'combat helicopter'
            ],
            age: [
                'young',
                'old',
                'ancient'
            ]
        }
    }



    renderOptions(array) {
        return array.map((property, index) => {
            return (
                <option key={index} value={property}>{property.capitalize()}</option>
            )
        })
    }

    addPicture(event) {
        const files = Array.from(event.target.files)
        const formData = new FormData()

        files.forEach((file, i) => {
            formData.append('myFile', file)
        })

        fetch(`${serverAddress}/avatar-upload`, {
            method: 'POST',
            body: formData,
        })
            .then(res => res.json())
            .then(image => {
                this.props.modifyFunction('pictureLoaded', true)
                this.props.modifyFunction('imgPath', image['path'])
            })
    }

    renderPartialAlignments(alDict) {
        return Object.keys(alDict).map((align, index) => {
            var cardClass = 'card material-shadow'
            if (this.props.data.align === align) cardClass += ' card-selected'
            return (
                <td key={index} onClick={() => this.props.modifyFunction('align', align)} className="character-general-square">
                    <Tooltip enterDelay={500} title={alDict[align]['desc']}>
                        <div className={cardClass}>
                            {alDict[align]['name']}
                        </div>
                    </Tooltip>
                </td>
            )
        })
    }

    renderAlignments() {
        return Object.keys(alignments).map((align, index) => {
            return (
                <tr key={index}>
                    {this.renderPartialAlignments(alignments[align])}
                </tr>
            )
        })
    }

    renderSelect(element) {
        return (
            <select className="character-general-select material-shadow" value={this.props.data[element]} onChange={(e) => { this.props.modifyFunction(element, e.target.value) }}>
                <option value="" hidden>{element.capitalize()}</option>
                {this.renderOptions(this.state[element])}
            </select>
        )
    }

    render() {
        return (
            <div className="container-full flex-centered flex-column">
                <div className="character-general-name flex-centered">
                    <CssTextField
                        margin="dense"
                        id="name"
                        label="Name"
                        variant="outlined"
                        fullWidth
                        onChange={(e) => { this.props.modifyFunction('name', e.target.value) }}
                        value={this.props.data.name}
                    />
                </div>
                <div className="character-general-details flex-center-space-evenly">
                    <div className="character-general-side flex-center-space-evenly">
                        <label htmlFor='single'>
                            <div className="avatar character-general-avatar material-shadow flex-centered">
                                {
                                    this.props.data.pictureLoaded ?
                                        <img alt="" src={`${serverAddress}/${this.props.data.imgPath}`} style={{ width: '100%', height: '100%', borderRadius: '100%' }} /> :
                                        <AddPhotoAlternate style={{ fontSize: '50px' }} />
                                }
                                <input type='file' id='single' name='myFile' onChange={this.addPicture} />
                            </div>
                        </label>
                    </div>
                    <div className="character-general-center flex-center-space-evenly">
                        <table className="character-general-alignment">
                            <tbody>
                                {this.renderAlignments()}
                            </tbody>
                        </table>
                    </div>
                    <div className="character-general-side flex-center-space-evenly">
                        <div className="character-general-row flex-center-space-evenly">
                            {this.renderSelect('hair')}
                            {this.renderSelect('eyes')}
                        </div>
                        <div className="character-general-row flex-center-space-evenly">
                            {this.renderSelect('size')}
                            {this.renderSelect('skin')}
                        </div>
                        <div className="character-general-row flex-center-space-evenly">
                            {this.renderSelect('gender')}
                            {this.renderSelect('age')}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CharacterGeneral;