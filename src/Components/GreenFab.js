import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';


const GreenFab = withStyles(theme => ({
    root: {
        color: 'white',
        backgroundColor: '#5fbb97',
        fontFamily: 'Luminari',
        '&:hover': {
            backgroundColor: '#7cc7a9',
            color: 'white'
        },
    },
}))(Fab);

export default GreenFab;