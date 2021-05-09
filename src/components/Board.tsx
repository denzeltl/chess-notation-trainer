import React from "react";
import { makeStyles } from "@material-ui/core";
import Chessboard from "chessboardjsx";
import Center from "./Center";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        justifyContent: "center",
        position: "relative",
    },
    countdown: {
        color: "#fff",
    },
}));

interface BoardProps {
    state: {
        position: "start" | "";
        orientation: "white" | "black";
        notation: boolean;
        active: boolean;
        activePractice: boolean;
        onMenu: boolean;
        practicePosition: boolean;
        practiceCoords: boolean;
        boxShadow: string;
    };
    changeOrientation: (e: any) => void;
    generatedNotation: string | null;
    onSquareClick: (e: any) => void;
}

interface windowDimension {
    screenWidth: number;
    screenHeight: number;
}

const Board: React.FC<BoardProps> = ({ state, generatedNotation, onSquareClick }) => {
    const classes = useStyles();

    const calcWidth = ({ screenWidth, screenHeight }: windowDimension): number => {
        if ((screenWidth || screenHeight) > 1750) {
            return 600;
        } else if ((screenWidth || screenHeight) > 1600) {
            return 550;
        } else if ((screenWidth || screenHeight) > 1000) {
            return 500;
        } else if ((screenWidth || screenHeight) > 800) {
            return 450;
        } else if ((screenWidth || screenHeight) > 450) {
            return 400;
        } else {
            return screenWidth - 50;
        }
        // return (screenWidth || screenHeight) < 1600 ? ((screenWidth || screenHeight) < 1400 ? screenWidth : (screenWidth || screenHeight) < 550 ? screenWidth : 500) : 550;
    };

    return (
        <section className={classes.root}>
            <Chessboard
                position={state.activePractice ? (state.practicePosition ? "start" : "") : state.position}
                draggable={false}
                showNotation={state.activePractice ? state.practiceCoords : state.notation}
                onSquareClick={(e) => onSquareClick(e)}
                orientation={state.orientation}
                calcWidth={calcWidth}
                boardStyle={{ cursor: state.active || state.activePractice ? "pointer" : "default", boxShadow: state.boxShadow }}
            />
            <Center generatedNotation={generatedNotation} onMenu={state.onMenu} />
        </section>
    );
};

export default Board;
