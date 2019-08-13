import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';

const PurpleFab = withStyles(theme => ({
    root: {
        color: 'white',
        fontFamily: 'Luminari',
        backgroundColor: '#541388',
        '&:hover': {
            backgroundColor: '#733d9d',
            color: 'white'
        },
    },
    label: {
        paddingRight: 10,
        paddingLeft: 10,
    }
}))(Fab);

export default PurpleFab;