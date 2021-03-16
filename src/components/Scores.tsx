import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        background: "brown",
        [theme.breakpoints.down("xl")]: {},
    },
}));

interface ScoresProps {}

const Scores: React.FC<ScoresProps> = () => {
    const classes = useStyles();

    return <div className={classes.root}>Scores</div>;
};

export default Scores;
