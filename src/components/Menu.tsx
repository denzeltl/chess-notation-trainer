import React, { useState } from "react";
import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import { AccessTime, BarChart, FiberManualRecordOutlined } from "@material-ui/icons";
import whiteCircle from "../images/white-circle.svg";
import blackCircle from "../images/black-circle.svg";
import randomCircle from "../images/random-circle.svg";

const useStyles = makeStyles((theme) => ({
    root: {
        height: "100%",
        [theme.breakpoints.down("xl")]: {},
    },
    rootContainer: {
        height: "100%",
    },
    text: {
        color: "#fff",
        display: "flex",
        alignItems: "center",
        marginBottom: "1.5rem",
        "&:last-child": {
            marginBottom: "0",
        },
    },
    textTitle: {
        fontSize: "1.4rem",
        margin: "0 1rem 0 0.5rem",
    },
    orientationButton: {},
    buttonTextContainer: {
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
    },
    colorIcon: {
        margin: "5px 0 10px",
        width: "16px",
    },
    colorIconLabel: {
        marginRight: "8px",
        width: "22px",
    },
}));

interface MenuProps {
    state: {
        timer: number;
        gameScore: number;
        highScore: number;
        position: "start" | "";
        orientation: "white" | "black";
        active: boolean;
    };
    changeOrientation: (color: "white" | "black" | "random") => void;
    startGame: (color: "white" | "black" | "random") => void;
    gameTimer: number;
}

const Menu: React.FC<MenuProps> = ({ state, changeOrientation, startGame, gameTimer }) => {
    const classes = useStyles();
    const [buttonOrientation, setButtonOrientation] = useState<"white" | "black" | "random">("white");

    return (
        <section className={classes.root}>
            <Grid className={classes.rootContainer} container direction="column" justify="space-between">
                <div>
                    {state.active && (
                        <>
                            <Typography variant="h4" component="p" className={classes.text}>
                                <AccessTime />
                                <span className={classes.textTitle}>Time Left:</span> 0:{gameTimer < 10 ? `0${gameTimer}` : gameTimer}
                            </Typography>
                            <Typography variant="h4" component="p" className={classes.text}>
                                <BarChart />
                                <span className={classes.textTitle}>Score:</span> {state.gameScore}
                            </Typography>
                            <Typography variant="h4" component="p" className={classes.text}>
                                <FiberManualRecordOutlined />
                                <span className={classes.textTitle}>Side:</span>
                                {state.orientation === "white" ? (
                                    <img src={whiteCircle} alt="White Circle" className={classes.colorIconLabel} />
                                ) : (
                                    <img src={blackCircle} alt="Black Circle" className={classes.colorIconLabel} />
                                )}
                                {state.orientation.charAt(0).toUpperCase() + state.orientation.slice(1)}
                            </Typography>
                        </>
                    )}
                </div>
                {!state.active && (
                    <Grid container item spacing={1}>
                        <Grid item xs={4}>
                            <Button
                                color={buttonOrientation === "white" ? "primary" : "secondary"}
                                className={classes.orientationButton}
                                variant="contained"
                                onClick={() => {
                                    setButtonOrientation("white");
                                    changeOrientation("white");
                                }}
                            >
                                <div className={classes.buttonTextContainer}>
                                    <Typography variant="body2" component="p">
                                        White
                                    </Typography>
                                    <img src={whiteCircle} alt="White Circle" className={classes.colorIcon} />
                                </div>
                            </Button>
                        </Grid>
                        <Grid item xs={4}>
                            <Button
                                color={buttonOrientation === "random" ? "primary" : "secondary"}
                                className={classes.orientationButton}
                                variant="contained"
                                onClick={() => {
                                    setButtonOrientation("random");
                                    changeOrientation("random");
                                }}
                            >
                                <div className={classes.buttonTextContainer}>
                                    <Typography variant="body2" component="p">
                                        Random
                                    </Typography>
                                    <img src={randomCircle} alt="Random Circle" className={classes.colorIcon} />
                                </div>
                            </Button>
                        </Grid>
                        <Grid item xs={4}>
                            <Button
                                color={buttonOrientation === "black" ? "primary" : "secondary"}
                                className={classes.orientationButton}
                                variant="contained"
                                onClick={() => {
                                    setButtonOrientation("black");
                                    changeOrientation("black");
                                }}
                            >
                                <div className={classes.buttonTextContainer}>
                                    <Typography variant="body2" component="p">
                                        Black
                                    </Typography>
                                    <img src={blackCircle} alt="Black Circle" className={classes.colorIcon} />
                                </div>
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Button color="secondary" variant="contained">
                                Practice
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Button color="secondary" variant="contained" onClick={() => startGame(buttonOrientation)}>
                                Start
                            </Button>
                        </Grid>
                    </Grid>
                )}
            </Grid>
        </section>
    );
};

export default Menu;
