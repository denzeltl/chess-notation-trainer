import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import Chessboard from "chessboardjsx";
import Center from "./Center";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        justifyContent: "center",
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
    };
    changeOrientation: (e: any) => void;
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

const Board: React.FC<BoardProps> = ({ state }) => {
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
                onSquareClick={(e) => console.log(e)}
                orientation={state.orientation === "random" ? randomColor : state.orientation}
                calcWidth={() => width / 2.6}
            />
            <Center />
        </section>
    );
};

export default Board;
