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
    gameScore: number;
    practiceScore: number;
    position: "start" | "";
    orientation: OrientationType;
    latestScorePos: OrientationType | undefined;
    notation: boolean;
    active: boolean;
    activePractice: boolean;
    onMenu: boolean;
    practicePosition: boolean;
    practiceCoords: boolean;
    highScoreWhite: number;
    recentScoresWhite: number[];
    recentMistakesWhite: number[];
    highScoreBlack: number;
    recentScoresBlack: number[];
    recentMistakesBlack: number[];
    updateScores: boolean;
    gameMistakes: number;
    boxShadow: string;
}

interface Action {
    type:
        | "CHANGE_ORIENTATION"
        | "START_GAME"
        | "END_GAME"
        | "START_PRACTICE"
        | "END_PRACTICE"
        | "START_COUNTDOWN"
        | "INC_SCORE"
        | "INC_SCORE_PRACTICE"
        | "PRACTICE_POSITION"
        | "PRACTICE_COORDS"
        | "UPDATE_SCORES"
        | "INC_MISTAKE"
        | "LIGHTUP_BOARD";
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
                latestScorePos: payload.latestScorePos,
                gameScore: 0,
                gameMistakes: 0,
                onMenu: false,
            };
        case "END_GAME":
            return {
                ...state,
                position: "start",
                notation: true,
                timer: 8,
                active: false,
                onMenu: true,
                updateScores: true,
            };
        case "START_PRACTICE":
            return {
                ...state,
                activePractice: true,
                practiceScore: 0,
                onMenu: false,
                practiceCoords: payload.practiceCoords,
                practicePosition: payload.practicePosition,
            };
        case "END_PRACTICE":
            return {
                ...state,
                activePractice: false,
                onMenu: true,
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
        case "INC_SCORE_PRACTICE":
            return {
                ...state,
                practiceScore: payload.practiceScore,
            };
        case "PRACTICE_POSITION":
            return {
                ...state,
                practicePosition: payload.practicePosition,
            };
        case "PRACTICE_COORDS":
            return {
                ...state,
                practiceCoords: payload.practiceCoords,
            };
        case "UPDATE_SCORES":
            return {
                ...state,
                recentScoresWhite: payload.recentScoresWhite,
                highScoreWhite: payload.highScoreWhite,
                recentMistakesWhite: payload.recentMistakesWhite,
                recentScoresBlack: payload.recentScoresBlack,
                highScoreBlack: payload.highScoreBlack,
                recentMistakesBlack: payload.recentMistakesBlack,
                updateScores: false,
            };
        case "INC_MISTAKE":
            return {
                ...state,
                gameMistakes: payload.gameMistakes,
            };
        case "LIGHTUP_BOARD":
            return {
                ...state,
                boxShadow: payload.boxShadow,
            };
        default:
            return state;
    }
}

const initialState: State = {
    timer: 8,
    // TODO: timer: 60
    gameScore: 0,
    practiceScore: 0,
    position: "start",
    orientation: "white",
    latestScorePos: undefined,
    notation: true,
    active: false,
    activePractice: false,
    onMenu: true,
    practicePosition: true,
    practiceCoords: true,
    highScoreWhite: 0,
    recentScoresWhite: [],
    recentMistakesWhite: [],
    highScoreBlack: 0,
    recentScoresBlack: [],
    recentMistakesBlack: [],
    updateScores: false,
    gameMistakes: 0,
    boxShadow: "none",
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
    const [gameTimer, setGameTimer] = useState<number>(0);

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
        generateNotation();
        startCountdown();
        if (color === "random") {
            let randColor: OrientationType = ["white", "black"][Math.floor(Math.random() * 2)] as OrientationType;
            dispatch({
                type: "START_GAME",
                payload: { ...state, orientation: randColor, latestScorePos: randColor },
            });
        } else {
            dispatch({
                type: "START_GAME",
                payload: { ...state, orientation: color, latestScorePos: color },
            });
        }
    }

    function endGame(): void {
        dispatch({
            type: "END_GAME",
            payload: { ...state },
        });
    }

    function startPractice(color: "white" | "black" | "random"): void {
        generateNotation();
        if (color === "random") {
            let randColor: OrientationType = ["white", "black"][Math.floor(Math.random() * 2)] as OrientationType;
            dispatch({
                type: "START_PRACTICE",
                payload: { ...state, orientation: randColor, latestScorePos: randColor, practiceCoords: state.practiceCoords, practicePosition: state.practicePosition },
            });
        } else {
            dispatch({
                type: "START_PRACTICE",
                payload: { ...state, orientation: color, latestScorePos: color },
            });
        }
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
        if (randomNotation !== generatedNotation) {
            setGeneratedNotation(randomNotation);
        } else {
            generateNotation();
        }
    }

    function onSquareClick(e: any): void {
        if (state.active) {
            if (e === generatedNotation) {
                generateNotation();
                lightUpBoard("green");
                dispatch({
                    type: "INC_SCORE",
                    payload: { ...state, gameScore: (state.gameScore += 1) },
                });
            } else {
                lightUpBoard("red");
                dispatch({
                    type: "INC_MISTAKE",
                    payload: { ...state, gameMistakes: (state.gameMistakes += 1) },
                });
            }
        }
        if (state.activePractice) {
            if (e === generatedNotation) {
                generateNotation();
                lightUpBoard("green");
                dispatch({
                    type: "INC_SCORE_PRACTICE",
                    payload: { ...state, practiceScore: (state.practiceScore += 1) },
                });
            } else {
                lightUpBoard("red");
            }
        }
    }

    function lightUpBoard(color: string): void {
        dispatch({
            type: "LIGHTUP_BOARD",
            payload: { ...state, boxShadow: color === "green" ? "0 0 30px #42b347" : "0 0 30px #ef4a4a" },
        });

        setTimeout(() => {
            dispatch({
                type: "LIGHTUP_BOARD",
                payload: { ...state, boxShadow: "none" },
            });
        }, 250);
    }

    function updateScores(orientation: OrientationType, score: number, mistakes: number): void {
        if (orientation === "white") {
            const whiteScores: number[] = [...state.recentScoresWhite];
            if (whiteScores.length === 20) {
                whiteScores.shift();
                whiteScores.push(score);
            } else {
                whiteScores.push(score);
            }
            const whiteMistakes: number[] = [...state.recentMistakesWhite];
            if (whiteMistakes.length === 20) {
                whiteMistakes.shift();
                whiteMistakes.push(mistakes);
            } else {
                whiteMistakes.push(mistakes);
            }
            dispatch({
                type: "UPDATE_SCORES",
                payload: { ...state, recentScoresWhite: whiteScores, highScoreWhite: score > state.highScoreWhite ? score : state.highScoreWhite, recentMistakesWhite: whiteMistakes },
            });
        } else if (orientation === "black") {
            const blackScores: number[] = [...state.recentScoresBlack];
            if (blackScores.length === 20) {
                blackScores.shift();
                blackScores.push(score);
            } else {
                blackScores.push(score);
            }
            const blackistakes: number[] = [...state.recentMistakesBlack];
            if (blackistakes.length === 20) {
                blackistakes.shift();
                blackistakes.push(mistakes);
            } else {
                blackistakes.push(mistakes);
            }
            dispatch({
                type: "UPDATE_SCORES",
                payload: { ...state, recentScoresBlack: blackScores, highScoreBlack: score > state.highScoreBlack ? score : state.highScoreBlack, recentMistakesBlack: blackistakes },
            });
        }
    }

    function handlePracticePosition(): void {
        dispatch({
            type: "PRACTICE_POSITION",
            payload: { ...state, practicePosition: !state.practicePosition },
        });
    }

    function handlePracticeCoords(): void {
        dispatch({
            type: "PRACTICE_COORDS",
            payload: { ...state, practiceCoords: !state.practiceCoords },
        });
    }

    useEffect(() => {
        setGameTimer(state.timer);
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
                            <Scores state={state} updateScores={updateScores} />
                        </Grid>
                        <Grid item xs={6}>
                            <Board state={state} changeOrientation={changeOrientation} generatedNotation={generatedNotation} onSquareClick={onSquareClick} />
                        </Grid>
                        <Grid item xs={3}>
                            <Menu
                                state={state}
                                changeOrientation={changeOrientation}
                                startGame={startGame}
                                gameTimer={gameTimer}
                                startPractice={startPractice}
                                endPractice={endPractice}
                                handlePracticeCoords={handlePracticeCoords}
                                handlePracticePosition={handlePracticePosition}
                            />
                        </Grid>
                    </Grid>
                </Wrapper>
            </main>
        </div>
    );
}

export default App;
