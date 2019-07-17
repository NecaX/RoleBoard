import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: 10,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 500,
    
  },

  cssLabel: {
    color : '#D3D3D3'
  },

 cssOutlinedInput: {
    "&:not(hover):not($disabled):not($cssFocused):not($error) $notchedOutline": {
      borderColor: "#D3D3D3", //default  
    },
    "&:hover:not($disabled):not($cssFocused):not($error) $notchedOutline": {
      borderColor: "white", //hovered
    },
    "&$cssFocused $notchedOutline": {
    }
  },
  notchedOutline: { },
  cssFocused: {  },
  error: {},
  disabled: {}

});

class ValidField extends React.Component {


  handleChange = name => event => {
    this.props.onModify(event.target.value)
  };

  render() {
    const { classes } = this.props;

    return (
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          id="standard-name"
          label={this.props.label}
          className={classes.textField}
          onChange={this.handleChange('name')}
          margin="normal"
          placeholder={this.props.placeholder}
          variant="outlined"
          InputLabelProps={{
            classes: {
              root: classes.cssLabel,
              focused: classes.cssFocused,
            },
          }}
          InputProps={{
            classes: {
              root: classes.cssOutlinedInput,
              focused: classes.cssFocused,
              notchedOutline: classes.notchedOutline,
            },
            inputMode: "numeric"
          }}
        />
      </form>
    );
  }
}

ValidField.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ValidField);
