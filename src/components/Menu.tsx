import React, { useState } from "react";
import { Button, Grid, makeStyles, Typography, FormGroup, FormControlLabel, Checkbox, Hidden } from "@material-ui/core";
import { AccessTime, BarChart, FiberManualRecordOutlined } from "@material-ui/icons";
import whiteIcon from "../images/white-icon.svg";
import blackIcon from "../images/black-icon.svg";
import randomIcon from "../images/random-icon.svg";

const useStyles = makeStyles((theme) => ({
    root: {
        height: "100%",
        [theme.breakpoints.down("lg")]: {
            padding: "0 2rem",
        },
        [theme.breakpoints.down("md")]: {
            padding: "0",
        },
    },
    rootContainer: {
        height: "100%",
        [theme.breakpoints.down("sm")]: {
            alignItems: "center",
        },
    },
    formGroup: {
        marginBottom: "1rem",
        [theme.breakpoints.down("sm")]: {
            marginLeft: "0.2rem",
            marginBottom: "1.5rem",
        },
    },
    text: {
        color: "#fff",
        display: "flex",
        alignItems: "center",
        marginBottom: "1rem",
        fontSize: "1.825rem",
        [theme.breakpoints.down("xs")]: {
            fontSize: "1.425rem",
        },
        "&:last-child": {
            marginBottom: "0",
        },
    },
    textTitle: {
        fontSize: "1.225rem",
        margin: "0 1rem 0 0.5rem",
        [theme.breakpoints.down("xs")]: {
            fontSize: "1rem",
        },
    },
    orientationButton: {
        "&.MuiButton-containedPrimary:hover": {
            backgroundColor: "#B68963",
        },
        "& .MuiTypography-body2": {
            [theme.breakpoints.down("xs")]: {
                fontSize: "0.775rem",
            },
        },
    },
    buttonTextContainer: {
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
    },
    colorIcon: {
        margin: "8px 0 10px",
        width: "30px",
        [theme.breakpoints.down("xs")]: {
            width: "25px",
        },
    },
    colorIconLabel: {
        marginRight: "8px",
        width: "35px",
        [theme.breakpoints.down("xs")]: {
            width: "30px",
        },
    },
    practiceButton: {
        "&.MuiButton-containedPrimary": {
            background: "#391F09",
            color: "#DEC0A8",
        },
    },
    checkboxLabel: {
        color: "#fff",
        "& .MuiTypography-body1": {
            fontSize: "0.875rem",
        },
    },
    checkbox: {
        color: "#DEC0A8",
    },
}));

interface MenuProps {
    state: {
        timer: number;
        gameScore: number;
        practiceScore: number;
        position: "start" | "";
        orientation: "white" | "black";
        active: boolean;
        activePractice: boolean;
        onMenu: boolean;
        practicePosition: boolean;
        practiceCoords: boolean;
    };
    changeOrientation: (color: "white" | "black" | "random") => void;
    startGame: (color: "white" | "black" | "random") => void;
    gameTimer: number;
    startPractice: (color: "white" | "black" | "random") => void;
    endPractice: () => void;
    handlePracticePosition: () => void;
    handlePracticeCoords: () => void;
}

const Menu: React.FC<MenuProps> = ({ state, changeOrientation, startGame, gameTimer, startPractice, endPractice, handlePracticePosition, handlePracticeCoords }) => {
    const classes = useStyles();
    const [buttonOrientation, setButtonOrientation] = useState<"white" | "black" | "random">("white");

    return (
        <section className={classes.root}>
            <Grid className={classes.rootContainer} container direction="column" justify="space-between">
                <div>
                    {state.active && (
                        <>
                            <Typography variant="h4" component="p" className={classes.text}>
                                <AccessTime style={{ color: "#DEC0A8" }} />
                                <span className={classes.textTitle}>Time Left:</span> 0:{gameTimer < 10 ? `0${gameTimer}` : gameTimer}
                            </Typography>
                            <Typography variant="h4" component="p" className={classes.text}>
                                <BarChart style={{ color: "#DEC0A8" }} />
                                <span className={classes.textTitle}>Score:</span> {state.gameScore}
                            </Typography>
                            <Typography variant="h4" component="p" className={classes.text}>
                                <FiberManualRecordOutlined style={{ color: "#DEC0A8" }} />
                                <span className={classes.textTitle}>Side:</span>
                                {state.orientation === "white" ? (
                                    <img src={whiteIcon} alt="White Circle" className={classes.colorIconLabel} />
                                ) : (
                                    <img src={blackIcon} alt="Black Circle" className={classes.colorIconLabel} />
                                )}
                                {state.orientation.charAt(0).toUpperCase() + state.orientation.slice(1)}
                            </Typography>
                        </>
                    )}
                    {state.activePractice && (
                        <>
                            <Typography variant="h4" component="p" className={classes.text}>
                                <BarChart style={{ color: "#DEC0A8" }} />
                                <span className={classes.textTitle}>Score:</span> {state.practiceScore}
                            </Typography>
                            <Typography variant="h4" component="p" className={classes.text}>
                                <FiberManualRecordOutlined style={{ color: "#DEC0A8" }} />
                                <span className={classes.textTitle}>Side:</span>
                                {state.orientation === "white" ? (
                                    <img src={whiteIcon} alt="White Circle" className={classes.colorIconLabel} />
                                ) : (
                                    <img src={blackIcon} alt="Black Circle" className={classes.colorIconLabel} />
                                )}
                                {state.orientation.charAt(0).toUpperCase() + state.orientation.slice(1)}
                            </Typography>
                            <Hidden mdUp>
                                {state.activePractice && (
                                    <Grid item xs={12}>
                                        <FormGroup className={classes.formGroup}>
                                            <FormControlLabel
                                                className={classes.checkboxLabel}
                                                control={<Checkbox name="pieces" checked={state.practicePosition} onChange={handlePracticePosition} color="primary" className={classes.checkbox} />}
                                                label="Show Pieces"
                                            />
                                            <FormControlLabel
                                                className={classes.checkboxLabel}
                                                control={<Checkbox name="coordinates" checked={state.practiceCoords} onChange={handlePracticeCoords} color="primary" className={classes.checkbox} />}
                                                label="Show Coordinates"
                                            />
                                        </FormGroup>
                                    </Grid>
                                )}
                            </Hidden>
                        </>
                    )}
                </div>
                {!state.active && (
                    <>
                        <Grid container item spacing={1}>
                            <Hidden smDown>
                                {state.activePractice && (
                                    <Grid item xs={12}>
                                        <FormGroup className={classes.formGroup}>
                                            <FormControlLabel
                                                className={classes.checkboxLabel}
                                                control={<Checkbox name="pieces" checked={state.practicePosition} onChange={handlePracticePosition} color="primary" className={classes.checkbox} />}
                                                label="Show Pieces"
                                            />
                                            <FormControlLabel
                                                className={classes.checkboxLabel}
                                                control={<Checkbox name="coordinates" checked={state.practiceCoords} onChange={handlePracticeCoords} color="primary" className={classes.checkbox} />}
                                                label="Show Coordinates"
                                            />
                                        </FormGroup>
                                    </Grid>
                                )}
                            </Hidden>
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
                                        <img src={whiteIcon} alt="White Circle" className={classes.colorIcon} />
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
                                        <img src={randomIcon} alt="Random Circle" className={classes.colorIcon} />
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
                                        <img src={blackIcon} alt="Black Circle" className={classes.colorIcon} />
                                    </div>
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    color={state.activePractice ? "primary" : "secondary"}
                                    className={classes.practiceButton}
                                    variant="contained"
                                    onClick={() => startPractice(buttonOrientation)}
                                    disabled={state.activePractice}
                                >
                                    Practice
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                <Button color="secondary" variant="contained" onClick={!state.activePractice ? () => startGame(buttonOrientation) : endPractice}>
                                    {!state.activePractice ? "Start" : "End Practice"}
                                </Button>
                            </Grid>
                        </Grid>
                    </>
                )}
            </Grid>
        </section>
    );
};

export default Menu;
