import React, { useEffect } from "react";
import { makeStyles, Typography, Grid } from "@material-ui/core";
import Chart from "react-apexcharts";
import whiteCircle from "../images/white-circle.svg";
import blackCircle from "../images/black-circle.svg";

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
        "& .apexcharts-tooltip": {
            background: "#18253e",
        },
    },
    text: {
        color: "#fff",
        display: "flex",
        alignItems: "center",
        fontSize: "1.825rem",
        marginBottom: "1.5rem",
        [theme.breakpoints.down("md")]: {
            justifyContent: "center",
        },
        [theme.breakpoints.down("xs")]: {
            fontSize: "1.425rem",
        },
    },
    textTitle: {
        fontSize: "1.225rem",
        margin: "0 1rem 0 0",
        [theme.breakpoints.down("xs")]: {
            fontSize: "1rem",
        },
    },
    chartDataContainer: {
        [theme.breakpoints.down("md")]: {
            padding: "0 1rem",
        },
        [theme.breakpoints.down("sm")]: {
            padding: "0 0.5rem",
        },
        [theme.breakpoints.down("xs")]: {
            padding: "0",
        },
    },
    colorIconLabel: {
        marginRight: "8px",
        width: "18px",
    },
}));

interface ScoresProps {
    state: {
        gameScore: number;
        orientation: "white" | "black";
        latestScorePos: "white" | "black" | undefined;
        active: boolean;
        activePractice: boolean;
        onMenu: boolean;
        timer: number;
        highScoreWhite: number;
        recentScoresWhite: number[];
        recentMistakesWhite: number[];
        highScoreBlack: number;
        recentScoresBlack: number[];
        recentMistakesBlack: number[];
        updateScores: boolean;
        gameMistakes: number;
    };
    updateScores: (orientation: "white" | "black", score: number, mistakes: number) => void;
}

const Scores: React.FC<ScoresProps> = ({ state, updateScores }) => {
    const classes = useStyles();

    const whiteChartOptions = {
        chart: {
            id: "white-scores",
            animations: {
                enabled: false,
            },
            selection: {
                enabled: false,
            },
            toolbar: {
                show: false,
            },
            zoom: {
                enabled: false,
            },
            background: "#3c4b67",
            fontFamily: "Montserrat, Roboto, Helvetica, Arial, sans-serif",
        },
        colors: ["#B68963", "#ef4a4a"],
        legend: {
            show: true,
            showForNullSeries: true,
            showForZeroSeries: true,
            position: "bottom",
            horizontalAlign: "center",
            floating: false,
            fontSize: "12px",
            markers: {
                width: 12,
                height: 12,
                radius: 12,
            },
            itemMargin: {
                horizontal: 15,
                vertical: 10,
            },
            onItemClick: {
                toggleDataSeries: false,
            },
            onItemHover: {
                highlightDataSeries: true,
            },
        },
        markers: {
            size: 3,
            strokeColors: "#fff",
            strokeWidth: 1,
            strokeOpacity: 0.5,
            onClick: undefined,
            showNullDataPoints: true,
            hover: {
                size: undefined,
                sizeOffset: 2,
            },
        },
        grid: {
            show: true,
            borderColor: "#7791c2",
            strokeDashArray: 0,
            position: "back",
            xaxis: {
                lines: {
                    show: false,
                },
            },
            yaxis: {
                lines: {
                    show: true,
                },
            },
            padding: {
                right: 20,
                left: 15,
            },
        },
        stroke: {
            show: true,
            width: 3,
            dashArray: [0, 5],
        },
        theme: {
            mode: "dark",
        },
        tooltip: {
            shared: true,
            y: {
                formatter: function (val: number) {
                    return val;
                },
            },
            x: {
                show: false,
            },
            style: {
                fontSize: "12px",
            },
        },
        xaxis: {
            labels: {
                show: false,
            },
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
            crosshairs: {
                show: false,
            },
            tooltip: {
                enabled: false,
            },
        },
        yaxis: {
            tickAmount: 3,
            min: 0,
            forceNiceScale: true,
            decimalsInFloat: 0,
            labels: {
                style: {
                    fontSize: "12px",
                },
            },
        },
        title: {
            text: "White Scores",
            align: "center",
            margin: 5,
            offsetY: 10,
        },
        subtitle: {
            text: `Highscore: ${state.highScoreWhite}`,
            offsetX: 10,
            style: {
                fontSize: "12px",
                fontWeight: "bold",
            },
        },
    };
    const whiteChartData = [
        {
            name: "Score",
            data: state.recentScoresWhite,
        },
        {
            name: "Mistakes",
            data: state.recentMistakesWhite,
        },
    ];

    const blackChartOptions = {
        chart: {
            id: "black-scores",
            animations: {
                enabled: false,
            },
            selection: {
                enabled: false,
            },
            toolbar: {
                show: false,
            },
            zoom: {
                enabled: false,
            },
            background: "#3c4b67",
            fontFamily: "Montserrat, Roboto, Helvetica, Arial, sans-serif",
        },
        colors: ["#B68963", "#ef4a4a"],
        legend: {
            show: true,
            showForNullSeries: true,
            showForZeroSeries: true,
            position: "bottom",
            horizontalAlign: "center",
            floating: false,
            fontSize: "12px",
            markers: {
                width: 12,
                height: 12,
                radius: 12,
            },
            itemMargin: {
                horizontal: 15,
                vertical: 10,
            },
            onItemClick: {
                toggleDataSeries: false,
            },
            onItemHover: {
                highlightDataSeries: true,
            },
        },
        markers: {
            size: 3,
            strokeColors: "#fff",
            strokeWidth: 1,
            strokeOpacity: 0.5,
            onClick: undefined,
            showNullDataPoints: true,
            hover: {
                size: undefined,
                sizeOffset: 2,
            },
        },
        grid: {
            show: true,
            borderColor: "#7791c2",
            strokeDashArray: 0,
            position: "back",
            xaxis: {
                lines: {
                    show: false,
                },
            },
            yaxis: {
                lines: {
                    show: true,
                },
            },
            padding: {
                right: 20,
                left: 15,
            },
        },
        stroke: {
            show: true,
            width: 3,
            dashArray: [0, 5],
        },
        theme: {
            mode: "dark",
        },
        tooltip: {
            shared: true,
            y: {
                formatter: function (val: number) {
                    return val;
                },
            },
            x: {
                show: false,
            },
            style: {
                fontSize: "12px",
            },
        },
        xaxis: {
            labels: {
                show: false,
            },
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
            crosshairs: {
                show: false,
            },
            tooltip: {
                enabled: false,
            },
        },
        yaxis: {
            tickAmount: 3,
            min: 0,
            forceNiceScale: true,
            decimalsInFloat: 0,
            labels: {
                style: {
                    fontSize: "12px",
                },
            },
        },
        title: {
            text: "Black Scores",
            align: "center",
            margin: 5,
            offsetY: 10,
        },
        subtitle: {
            text: `Highscore: ${state.highScoreBlack}`,
            offsetX: 10,
            style: {
                fontSize: "12px",
                fontWeight: "bold",
            },
        },
    };
    const blackChartData = [
        {
            name: "Score",
            data: state.recentScoresBlack,
        },
        {
            name: "Mistakes",
            data: state.recentMistakesBlack,
        },
    ];

    useEffect(() => {
        if (state.updateScores) {
            updateScores(state.orientation, state.gameScore, state.gameMistakes);
        }
    }, [state.updateScores]);

    return (
        <div className={classes.root}>
            {state.onMenu && state.latestScorePos && (
                <Grid className={classes.rootContainer} container direction="column">
                    <>
                        <Typography variant="h4" component="p" className={classes.text}>
                            <span className={classes.textTitle}>Latest Score:</span>
                            {state.latestScorePos === "white" ? (
                                <img src={whiteCircle} alt="White Circle" className={classes.colorIconLabel} />
                            ) : (
                                <img src={blackCircle} alt="Black Circle" className={classes.colorIconLabel} />
                            )}
                            {state.gameScore}
                        </Typography>
                    </>
                    <Grid container justify="center">
                        {state.recentScoresWhite.length !== 0 && (
                            <Grid item lg={12} sm={6} xs={12} className={classes.chartDataContainer}>
                                <Chart options={whiteChartOptions} series={whiteChartData} type="line" width="100%" height="auto" />
                            </Grid>
                        )}
                        {state.recentScoresBlack.length !== 0 && (
                            <Grid item lg={12} sm={6} xs={12} className={classes.chartDataContainer}>
                                <Chart options={blackChartOptions} series={blackChartData} type="line" width="100%" height="auto" />
                            </Grid>
                        )}
                    </Grid>
                </Grid>
            )}
        </div>
    );
};

export default Scores;
