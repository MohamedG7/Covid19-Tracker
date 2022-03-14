import { makeStyles } from "@material-ui/core";

const drawerWidth = 0;
export default makeStyles((theme) => ({
    root: {
        maxWidth: '100%',
    },
    app: {
        display: 'flex',
        justifyContent: 'space-evenly',
        padding: '20px',
        [theme.breakpoints.down('sm')]:{
            flexDirection: 'column'
        }
    },
}));