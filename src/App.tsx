import React, { useReducer, useState, useEffect } from "react";
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
    latestScore: number;
    highScore: number;
    gameScore: number;
    position: "start" | "";
    orientation: OrientationType;
    notation: boolean;
    active: boolean;
}

interface Action {
    type: "CHANGE_ORIENTATION" | "START_GAME" | "END_GAME" | "START_PRACTICE" | "END_PRACTICE" | "START_COUNTDOWN" | "INC_SCORE";
    payload: State;
}

type OrientationType = "white" | "black";

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
                orientation: payload.orientation,
                gameScore: 0,
            };
        case "END_GAME":
            return {
                ...state,
                position: "start",
                notation: true,
                timer: 8,
                active: false,
                latestScore: payload.gameScore,
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
        case "INC_SCORE":
            return {
                ...state,
                gameScore: payload.gameScore,
            };
        default:
            return state;
    }
}

const initialState: State = {
    timer: 8,
    // TODO: timer: 60
    latestScore: 0,
    highScore: 0,
    gameScore: 0,
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
    const [gameTimer, setGmeTimer] = useState<number>(0);

    function changeOrientation(color: "white" | "black" | "random"): void {
        if (color === "random") {
            let randColor: OrientationType = ["white", "black"][Math.floor(Math.random() * 2)] as OrientationType;
            dispatch({
                type: "CHANGE_ORIENTATION",
                payload: { ...state, orientation: randColor },
            });
        } else {
            dispatch({
                type: "CHANGE_ORIENTATION",
                payload: { ...state, orientation: color },
            });
        }
    }

    function startGame(color: "white" | "black" | "random"): void {
        startCountdown();
        generateNotation();
        if (color === "random") {
            let randColor: OrientationType = ["white", "black"][Math.floor(Math.random() * 2)] as OrientationType;
            dispatch({
                type: "START_GAME",
                payload: { ...state, orientation: randColor },
            });
        } else {
            dispatch({
                type: "START_GAME",
                payload: state,
            });
        }
    }

    function endGame(score: number): void {
        dispatch({
            type: "END_GAME",
            payload: { ...state, latestScore: score },
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
                endGame(state.gameScore);
            }
        }, 1000);
    }

    function generateNotation(): void {
        const randomNotation = notations[Math.floor(Math.random() * notations.length)];
        setGeneratedNotation(randomNotation);
    }

    function onSquareClick(e: any): void {
        if (state.active) {
            if (e === generatedNotation) {
                generateNotation();
                dispatch({
                    type: "INC_SCORE",
                    payload: { ...state, gameScore: (state.gameScore += 1) },
                });
            } else {
                console.log(e);
            }
        }
    }

    useEffect(() => {
        console.log(state.timer);
        setGmeTimer(state.timer);
    }, [state]);

    return (
        <div className={classes.root}>
            <main className={classes.main}>
                <Typography variant="h3" component="h1" className={classes.headerTitle}>
                    Chess Notation Trainer
                </Typography>
                <Wrapper>
                    <Grid container spacing={4}>
                        <Grid item xs={3}>
                            <Scores state={state} />
                        </Grid>
                        <Grid item xs={6}>
                            <Board state={state} changeOrientation={changeOrientation} generatedNotation={generatedNotation} onSquareClick={onSquareClick} />
                        </Grid>
                        <Grid item xs={3}>
                            <Menu state={state} changeOrientation={changeOrientation} startGame={startGame} gameTimer={gameTimer} />
                        </Grid>
                    </Grid>
                </Wrapper>
            </main>
        </div>
    );
}

export default App;
