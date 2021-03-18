import React, { useReducer } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import "./App.css";
import Board from "./components/Board";
import Scores from "./components/Scores";
import Menu from "./components/Menu";
import Wrapper from "./components/Wrapper";

const useStyles = makeStyles((theme) => ({
    root: {},
    main: {},
    headerTitle: {
        color: "#fff",
        textAlign: "center",
        padding: "3rem 0",
    },
}));

interface State {
    timer: number;
    score: number;
    highScore: number;
    position: "start" | "";
    orientation: "white" | "black" | "random";
}

interface Action {
    type: "CHANGE_ORIENTATION";
    payload?: State;
}

function reducer(state: State, action: Action): State {
    const { type, payload } = action;

    switch (type) {
        case "CHANGE_ORIENTATION":
            return {
                ...state,
            };

        default:
            return state;
    }
}

const initialState: State = {
    timer: 60,
    score: 0,
    highScore: 0,
    position: "start",
    orientation: "white",
};

function App() {
    const classes = useStyles();
    const [state, dispatch] = useReducer(reducer, initialState);

    function changeOrientation(): void {
        dispatch({
            type: "CHANGE_ORIENTATION",
        });
    }

    return (
        <div className={classes.root}>
            <main className={classes.main}>
                <Typography variant="h3" component="h1" className={classes.headerTitle}>
                    Chess Notation Trainer
                </Typography>
                <Wrapper>
                    <Grid container spacing={4}>
                        <Grid item xs={3}>
                            <Scores />
                        </Grid>
                        <Grid item xs={6}>
                            <Board state={state} changeOrientation={changeOrientation} />
                        </Grid>
                        <Grid item xs={3}>
                            <Menu />
                        </Grid>
                    </Grid>
                </Wrapper>
            </main>
        </div>
    );
}

export default App;
