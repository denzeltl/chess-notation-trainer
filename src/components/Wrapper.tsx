import React from "react";
import { makeStyles, Container } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: "1600px",
        padding: "0 2rem",

        [theme.breakpoints.down("lg")]: {
            maxWidth: "1050px",
        },
        [theme.breakpoints.down("md")]: {
            maxWidth: "820px",
        },
        [theme.breakpoints.down("sm")]: {
            maxWidth: "600px",
        },
        [theme.breakpoints.down("xs")]: {
            maxWidth: "450px",
            padding: "2rem",
        },
    },
}));

interface WrapperProps {
    children: JSX.Element | JSX.Element[];
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
    const classes = useStyles();

    return <Container className={classes.root}>{children}</Container>;
};

export default Wrapper;
