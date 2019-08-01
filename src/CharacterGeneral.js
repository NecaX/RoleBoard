import React from 'react';
import './CharacterGeneral.css';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import { Box } from '@material-ui/core';
import AddPhotoAlternate from '@material-ui/icons/AddPhotoAlternate'


class CharacterGeneral extends React.Component {

    constructor(props) {
        super(props); //Constructor padre
        this.handleAlignmentClick = this.handleAlignmentClick.bind(this);
        this.state = {
            align: 'lg',
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

    CssTextField = withStyles({
        root: {
            '& label': {
                color: 'rgba(var(--pure-material-onsurface-rgb, 255,255,255), 0.6)'
            },
            '& label.Mui-focused': {
                color: 'rgba(var(--pure-material-onsurface-rgb, 255,255,255), 0.93)',
            },
            '& .MuiInput-underline:after': {
                borderBottomColor: 'rgba(var(--pure-material-onsurface-rgb, 255,255,255), 0.93)',
            },
            '& .MuiOutlinedInput-root': {
                '& fieldset': {
                    borderColor: 'rgba(var(--pure-material-onsurface-rgb, 255,255,255), 0.6)',
                },
                '&:hover fieldset': {
                    borderColor: 'rgba(var(--pure-material-onsurface-rgb, 255,255,255), 0.93)',
                },
                '&.Mui-focused fieldset': {
                    borderColor: 'rgba(var(--pure-material-onsurface-rgb, 255,255,255), 0.93)',
                },
                '& input': {
                    color: 'rgba(var(--pure-material-onsurface-rgb, 255,255,255), 0.93)'
                }
            },
        },
    })(TextField);

    handleAlignmentClick(alignment) {
        this.setState({
            align: alignment
        })
    }

    renderOptions(array) {
        return array.map((game, index) => {
            return (
                <option value={game}>{game}</option>
            )
        })
    }

    render() {
        return (
            <div className="character-general-container">
                <div className="character-general-name">
                    <this.CssTextField
                        margin="dense"
                        id="name"
                        label="Character name"
                        variant="outlined"
                        fullWidth
                    />
                </div>
                <div className="character-general-details">
                    <div className="character-general-side">

                        <div className="character-general-avatar">
                            <AddPhotoAlternate style={{fontSize: '50px'}}/>
                        </div>
                    </div>
                    <div className="character-general-center">
 
                        <table className="character-general-alignment">
                            <tr>
                                <td onClick={() => this.handleAlignmentClick('lg')} className="character-general-square">
                                    <div className={this.state.align === 'lg' ? "card-border" : "card-borderless"}>
                                        Lawful Good
                                    </div>
                                </td>
                                <td onClick={() => this.handleAlignmentClick('ng')} className="character-general-square">
                                    <div className={this.state.align === 'ng' ? "card-border" : "card-borderless"}>
                                        Neutral Good
                                    </div>
                                </td>
                                <td onClick={() => this.handleAlignmentClick('cg')} className="character-general-square">
                                    <div className={this.state.align === 'cg' ? "card-border" : "card-borderless"}>
                                        Chaotic Good
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td onClick={() => this.handleAlignmentClick('ln')} className="character-general-square">
                                    <div className={this.state.align === 'ln' ? "card-border" : "card-borderless"}>
                                        Lawful Neutral
                                    </div>
                                </td>
                                <td onClick={() => this.handleAlignmentClick('tn')} className="character-general-square">
                                    <div className={this.state.align === 'tn' ? "card-border" : "card-borderless"}>
                                        True Neutral
                                    </div>
                                </td>
                                <td onClick={() => this.handleAlignmentClick('cn')} className="character-general-square">
                                    <div className={this.state.align === 'cn' ? "card-border" : "card-borderless"}>
                                        Chaotic Neutral
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td onClick={() => this.handleAlignmentClick('le')} className="character-general-square">
                                    <div className={this.state.align === 'le' ? "card-border" : "card-borderless"}>
                                        Lawful Evil
                                    </div>
                                </td>
                                <td onClick={() => this.handleAlignmentClick('ne')} className="character-general-square">
                                    <div className={this.state.align === 'ne' ? "card-border" : "card-borderless"}>
                                        Neutral Evil
                                    </div>
                                </td>
                                <td onClick={() => this.handleAlignmentClick('ce')} className="character-general-square">
                                    <div className={this.state.align === 'ce' ? "card-border" : "card-borderless"}>
                                        Chaotic Evil
                                    </div>
                                </td>
                            </tr>
                        </table>

                    </div>
                    <div className="character-general-side">

                        <div className="character-general-row">
                            <select className="character-general-select" onChange={this.onChangeDirecting}>
                                <option value="" hidden>Hair</option>
                                {this.renderOptions(this.state.hair)}
                            </select>
                            <select className="character-general-select" onChange={this.onChangeDirecting}>
                                <option value="" hidden>Eyes</option>
                                {this.renderOptions(this.state.eyes)}
                            </select>
                        </div>
                        <div className="character-general-row">
                            <select className="character-general-select" onChange={this.onChangeDirecting}>
                                <option value="" hidden>Size</option>
                                {this.renderOptions(this.state.size)}
                            </select>
                            <select className="character-general-select" onChange={this.onChangeDirecting}>
                                <option value="" hidden>Skin</option>
                                {this.renderOptions(this.state.skin)}
                            </select>
                        </div>
                        <div className="character-general-row">
                            <select className="character-general-select" onChange={this.onChangeDirecting}>
                                <option value="" hidden>Gender</option>
                                {this.renderOptions(this.state.gender)}
                            </select>
                            <select className="character-general-select" onChange={this.onChangeDirecting}>
                                <option value="" hidden>Age</option>
                                {this.renderOptions(this.state.age)}
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CharacterGeneral;