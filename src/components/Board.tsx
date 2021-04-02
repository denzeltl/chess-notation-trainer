import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import Chessboard from "chessboardjsx";
import Center from "./Center";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        justifyContent: "center",
        position: "relative",
        [theme.breakpoints.down("xl")]: {},
    },
    countdown: {
        color: "#fff",
    },
}));

interface BoardProps {
    state: {
        timer: number;
        score: number;
        highScore: number;
        position: "start" | "";
        orientation: "white" | "black" | "random";
        notation: boolean;
        active: boolean;
    };
    changeOrientation: (e: any) => void;
    generatedNotation: string | null;
    onSquareClick: (e: any) => void;
}

interface windowDimension {
    width: number;
}

function getWindowDimensions(): windowDimension {
    const { innerWidth: width } = window;
    return {
        width,
    };
}

const Board: React.FC<BoardProps> = ({ state, generatedNotation, onSquareClick }) => {
    const classes = useStyles();
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
    const { width } = windowDimensions;
    const [randomColor, setRandomColor] = useState<"white" | "black" | undefined>(undefined);

    useEffect(() => {
        let randColor: any = ["white", "black"][Math.floor(Math.random() * 2)];
        setRandomColor(randColor);
    }, [state.orientation]);

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <section className={classes.root}>
            <Chessboard
                position={state.position}
                draggable={false}
                showNotation={state.notation}
                onSquareClick={(e) => onSquareClick(e)}
                orientation={state.orientation === "random" ? randomColor : state.orientation}
                calcWidth={() => width / 2.6}
                boardStyle={{ cursor: state.active ? "pointer" : "default" }}
            />
            <Center active={state.active} generatedNotation={generatedNotation} />
        </section>
    );
};

export default Board;
