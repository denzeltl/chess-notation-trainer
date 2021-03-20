import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import Chessboard from "chessboardjsx";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        justifyContent: "center",
        [theme.breakpoints.down("xl")]: {},
    },
}));

interface BoardProps {
    state: {
        timer: number;
        score: number;
        highScore: number;
        position: "start" | "";
        orientation: "white" | "black" | "random";
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

const Board: React.FC<BoardProps> = ({ state, changeOrientation }) => {
    const classes = useStyles();
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
    const { width } = windowDimensions;

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
                position={"start"}
                // squareStyles={this.state.squareStyles}
                draggable={false}
                showNotation={true}
                onSquareClick={(e) => console.log(e)}
                // orientation={this.props.orientation === "random" ? this.state.orientation : this.props.orientation}
                calcWidth={() => width / 2.6}
            />
        </section>
    );
};

export default Board;
