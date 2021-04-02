import React, { useReducer, useState } from "react";
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
    notation: boolean;
    active: boolean;
}

interface Action {
    type: "CHANGE_ORIENTATION" | "START_GAME" | "END_GAME" | "START_PRACTICE" | "END_PRACTICE" | "START_COUNTDOWN";
    payload: State;
}

function reducer(state: State, action: Action): State {
    const { type, payload } = action;

    switch (type) {
        case "CHANGE_ORIENTATION":
            return {
                ...state,
                orientation: payload.orientation,
            };
        case "START_GAME":
            return {
                ...state,
                position: "",
                notation: false,
                active: true,
            };
        case "END_GAME":
            return {
                ...state,
                position: "start",
                notation: true,
                timer: 8,
                active: false,
            };
        case "START_PRACTICE":
            return {
                ...state,
                position: "",
            };
        case "END_PRACTICE":
            return {
                ...state,
                position: "start",
            };
        case "START_COUNTDOWN":
            return {
                ...state,
                timer: payload.timer,
            };
        default:
            return state;
    }
}

const initialState: State = {
    timer: 8,
    // TODO: timer: 60
    score: 0,
    highScore: 0,
    position: "start",
    orientation: "white",
    notation: true,
    active: false,
};

function App() {
    const classes = useStyles();
    const [state, dispatch] = useReducer(reducer, initialState);
    const notations: string[] = [
        "a1",
        "a2",
        "a3",
        "a4",
        "a5",
        "a6",
        "a7",
        "a8",
        "b1",
        "b2",
        "b3",
        "b4",
        "b5",
        "b6",
        "b7",
        "b8",
        "c1",
        "c2",
        "c3",
        "c4",
        "c5",
        "c6",
        "c7",
        "c8",
        "d1",
        "d2",
        "d3",
        "d4",
        "d5",
        "d6",
        "d7",
        "d8",
        "e1",
        "e2",
        "e3",
        "e4",
        "e5",
        "e6",
        "e7",
        "e8",
        "f1",
        "f2",
        "f3",
        "f4",
        "f5",
        "f6",
        "f7",
        "f8",
        "g1",
        "g2",
        "g3",
        "g4",
        "g5",
        "g6",
        "g7",
        "g8",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "h7",
        "h8",
    ];
    const [generatedNotation, setGeneratedNotation] = useState<string | null>(null);
    const [gameScore, setGameScore] = useState(0);

    function changeOrientation(color: "white" | "black" | "random"): void {
        dispatch({
            type: "CHANGE_ORIENTATION",
            payload: { ...state, orientation: color },
        });
    }

    function startGame(): void {
        startCountdown();
        generateNotation();
        setGameScore(0);
        dispatch({
            type: "START_GAME",
            payload: state,
        });
    }

    function endGame(): void {
        console.log("END");
        dispatch({
            type: "END_GAME",
            payload: state,
        });
    }

    function startPractice(): void {
        dispatch({
            type: "START_PRACTICE",
            payload: state,
        });
    }

    function endPractice(): void {
        dispatch({
            type: "END_PRACTICE",
            payload: state,
        });
    }

    function startCountdown(): void {
        const start = setInterval(() => {
            if (state.timer > 0) {
                dispatch({
                    type: "START_COUNTDOWN",
                    payload: { ...state, timer: (state.timer -= 1) },
                });
            } else {
                clearInterval(start);
                endGame();
            }
        }, 1000);
    }

    function generateNotation(): void {
        const randomNotation = notations[Math.floor(Math.random() * notations.length)];
        setGeneratedNotation(randomNotation);
    }

    function onSquareClick(e: any): void {
        if (e === generatedNotation) {
            generateNotation();
            setGameScore((prevState) => prevState + 1);
        } else {
            console.log(e);
        }
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
                            <Board state={state} changeOrientation={changeOrientation} generatedNotation={generatedNotation} onSquareClick={onSquareClick} />
                        </Grid>
                        <Grid item xs={3}>
                            <Menu state={state} changeOrientation={changeOrientation} startGame={startGame} gameScore={gameScore} />
                        </Grid>
                    </Grid>
                </Wrapper>
            </main>
        </div>
    );
}

export default App;
