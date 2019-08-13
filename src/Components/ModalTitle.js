import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/styles';

const ModalTitle = withStyles({
    root: {
        '& h6': {
            fontFamily: 'Luminari'
        }
    },
})(DialogTitle);

export default ModalTitle