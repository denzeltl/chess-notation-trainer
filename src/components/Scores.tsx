import React from "react";
import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        [theme.breakpoints.down("xl")]: {},
    },
    text: {
        color: "#fff",
        display: "flex",
        alignItems: "center",
        marginBottom: "1.5rem",
        "&:last-child": {
            marginBottom: "0",
        },
    },
    textTitle: {
        fontSize: "1.4rem",
        margin: "0 1rem 0 0.5rem",
    },
}));

interface ScoresProps {
    state: {
        latestScore: number;
        gameScore: number;
        highScore: number;
        orientation: "white" | "black";
        active: boolean;
    };
}

const Scores: React.FC<ScoresProps> = ({ state }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {!state.active && state.gameScore !== 0 && (
                <>
                    <Typography variant="h4" component="p" className={classes.text}>
                        {/* <AccessTime /> */}
                        <span className={classes.textTitle}>Latest Score:</span> {state.gameScore}
                    </Typography>
                </>
            )}
        </div>
    );
};

export default Scores;
