import React from "react";
import { Button, Grid, makeStyles, Typography, Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        height: "100%",
        [theme.breakpoints.down("xl")]: {},
    },
    rootContainer: {
        height: "100%",
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
    };
    changeOrientation: (color: "white" | "black" | "random") => void;
    startGame: () => void;
}

const Menu: React.FC<MenuProps> = ({ state, changeOrientation, startGame }) => {
    const classes = useStyles();

    return (
        <section className={classes.root}>
            <Grid className={classes.rootContainer} container direction="column" justify="space-between">
                <Paper>
                    <Typography>Instructions / Notes</Typography>
                </Paper>
                <Grid container item spacing={1}>
                    <Grid item xs={4}>
                        <Button color={state.orientation === "white" ? "primary" : "secondary"} className={classes.orientationButton} variant="contained" onClick={() => changeOrientation("white")}>
                            White
                        </Button>
                    </Grid>
                    <Grid item xs={4}>
                        <Button color={state.orientation === "random" ? "primary" : "secondary"} className={classes.orientationButton} variant="contained" onClick={() => changeOrientation("random")}>
                            Random
                        </Button>
                    </Grid>
                    <Grid item xs={4}>
                        <Button color={state.orientation === "black" ? "primary" : "secondary"} className={classes.orientationButton} variant="contained" onClick={() => changeOrientation("black")}>
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
            </Grid>
        </section>
    );
};

export default Menu;
