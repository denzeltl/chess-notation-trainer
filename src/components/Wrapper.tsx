import React from "react";
import { makeStyles, Container } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: "1800px",
        [theme.breakpoints.down("md")]: {
            maxWidth: "900px",
        },
        [theme.breakpoints.down("xs")]: {
            maxWidth: "400px",
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
