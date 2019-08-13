import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/styles';

const ModalTextField = withStyles({
    root: {
        '& label': {
            
            fontFamily: 'Luminari'
        },
        '& .MuiOutlinedInput-root': {
            '& input': {
                fontFamily: 'Luminari'
            },
            '& textarea': {
                fontFamily: 'Luminari'
            }
        },
    },
})(TextField);

export default ModalTextField