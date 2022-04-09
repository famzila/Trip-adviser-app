import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    '@global': {
        '*::-webkit-scrollbar': {
            width: '0.4em'
        },
        '*::-webkit-scrollbar-track': {
            '-webkit-box-shadow': 'inset 0 0 6px #70767d87'
        },
        '*::-webkit-scrollbar-thumb': {
            backgroundColor: '#2E3B55',
            outline: '1px solid slategrey'
        }
    },
    formControl: {
        margin: theme.spacing(1), minWidth: 120, marginBottom: '30px',
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    loading: {
        height: '600px', display: 'flex', justifyContent: 'center', alignItems: 'center',
    },
    header: {
        marginTop: '15px',
        fontWeight: '800'
    },
    marginBottom: {
        marginBottom: '30px',
    },
    list: {
        height: '75vh', overflow: 'auto',
    },
}));