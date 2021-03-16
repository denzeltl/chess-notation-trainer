import React from "react";
import { makeStyles } from "@material-ui/core";
import Chessboard from "chessboardjsx";

const useStyles = makeStyles((theme) => ({
    root: {
        [theme.breakpoints.down("xl")]: {},
    },
}));

interface BoardProps {}

const Board: React.FC<BoardProps> = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Chessboard
                position={"start"}
                // squareStyles={this.state.squareStyles}
                // onDrop={this.onDrop}
                draggable={false}
                // showNotation={this.props.showNotation}
                // orientation={this.props.orientation === "random" ? this.state.orientation : this.props.orientation}
                // calcWidth={this.props.calcWidth}
            />
        </div>
    );
};

export default Board;
