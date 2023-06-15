import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
    root: {
        backgroundColor: theme.palette.primary.contrastText,
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        height: "100vh" 
    },
}));

export default useStyles;