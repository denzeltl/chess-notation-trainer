import React, { useState, useEffect } from "react";
import { Button, Grid, makeStyles, Typography, Paper } from "@material-ui/core";
import { AccessTime, BarChart } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
    root: {
        height: "100%",
        [theme.breakpoints.down("xl")]: {},
    },
    rootContainer: {
        height: "100%",
    },
    text: {
        color: "#fff",
        display: "flex",
        alignItems: "center",
        "&:first-child": {
            marginBottom: "1.5rem",
        },
    },
    textTitle: {
        fontSize: "1.4rem",
        margin: "0 1rem 0 0.5rem",
    },
    orientationButton: {},
}));

interface MenuProps {
    state: {
        timer: number;
        score: number;
        highScore: number;
        position: "start" | "";
        orientation: "white" | "black" | "random";
        active: boolean;
    };
    changeOrientation: (color: "white" | "black" | "random") => void;
    startGame: () => void;
    gameScore: number;
}

const Menu: React.FC<MenuProps> = ({ state, changeOrientation, startGame, gameScore }) => {
    const classes = useStyles();
    const [gameTimer, setGmeTimer] = useState(0);

    useEffect(() => {
        console.log(state.timer);
        setGmeTimer(state.timer);
    }, [state]);

    return (
        <section className={classes.root}>
            <Grid className={classes.rootContainer} container direction="column" justify="space-between">
                <div>
                    {state.active && (
                        <>
                            <Typography variant="h4" component="p" className={classes.text}>
                                <AccessTime />
                                <span className={classes.textTitle}>Time Left:</span> 0:{gameTimer < 10 ? `0${gameTimer}` : gameTimer}
                            </Typography>
                            <Typography variant="h4" component="p" className={classes.text}>
                                <BarChart />
                                <span className={classes.textTitle}>Score:</span> {gameScore}
                            </Typography>
                        </>
                    )}
                </div>
                {!state.active && (
                    <Grid container item spacing={1}>
                        <Grid item xs={4}>
                            <Button
                                color={state.orientation === "white" ? "primary" : "secondary"}
                                className={classes.orientationButton}
                                variant="contained"
                                onClick={() => changeOrientation("white")}
                            >
                                White
                            </Button>
                        </Grid>
                        <Grid item xs={4}>
                            <Button
                                color={state.orientation === "random" ? "primary" : "secondary"}
                                className={classes.orientationButton}
                                variant="contained"
                                onClick={() => changeOrientation("random")}
                            >
                                Random
                            </Button>
                        </Grid>
                        <Grid item xs={4}>
                            <Button
                                color={state.orientation === "black" ? "primary" : "secondary"}
                                className={classes.orientationButton}
                                variant="contained"
                                onClick={() => changeOrientation("black")}
                            >
                                Black
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Button color="secondary" variant="contained">
                                Practice
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Button color="secondary" variant="contained" onClick={startGame}>
                                Start
                            </Button>
                        </Grid>
                    </Grid>
                )}
            </Grid>
        </section>
    );
};

export default Menu;
