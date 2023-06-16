import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
    root: {
        backgroundColor: theme.palette.primary.contrastText,
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        height: "100vh" 
    },
    image:{
        //imagen completa el height 
        height: "100vh",
        //imagen completa el width
        width: "100%",
        objectFit: "cover",
        //imagen centrada
        objectPosition: "center",

    }
}));

export default useStyles;