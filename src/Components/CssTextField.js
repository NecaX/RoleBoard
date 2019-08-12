import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/styles';

const CssTextField = withStyles({
    root: {
        '& label': {
            color: 'rgba(var(--pure-material-onsurface-rgb, 255,255,255), 0.6)',
            fontFamily: 'Luminari'
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
                color: 'rgba(var(--pure-material-onsurface-rgb, 255,255,255), 0.93)',
                fontFamily: 'Luminari'
            },
            '& textarea': {
                color: 'rgba(var(--pure-material-onsurface-rgb, 255,255,255), 0.93)',
                fontFamily: 'Luminari'
            }
        },
    },
})(TextField);

export default CssTextField