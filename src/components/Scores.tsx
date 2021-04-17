import React, { useEffect } from "react";
import { makeStyles, Typography } from "@material-ui/core";
import Chart from "react-apexcharts";

const useStyles = makeStyles((theme) => ({
    root: {
        [theme.breakpoints.down("xl")]: {},
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
            background: "#fff",
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
        },
        colors: ["#B68963", "#ef4a4a"],
        legend: {
            show: true,
            showForNullSeries: true,
            showForZeroSeries: true,
            position: "bottom",
            horizontalAlign: "center",
            floating: false,
            fontSize: "14px",
            offsetX: 0,
            offsetY: 0,
            markers: {
                width: 12,
                height: 12,
                radius: 12,
            },
            itemMargin: {
                horizontal: 15,
            },
            onItemClick: {
                toggleDataSeries: false,
            },
            onItemHover: {
                highlightDataSeries: true,
            },
        },
        markers: {
            size: 4,
            strokeWidth: 2,
            onClick: undefined,
            showNullDataPoints: true,
            hover: {
                size: undefined,
                sizeOffset: 2,
            },
        },
        stroke: {
            show: true,
            width: 3,
            dashArray: [0, 6],
        },
        tooltip: {
            shared: true,
            x: {
                show: false,
            },
        },
        xaxis: {
            labels: {
                show: false,
            },
            axisBorder: {
                show: true,
                color: "#78909C",
                height: 1,
                width: "100%",
                offsetX: 0,
                offsetY: 0,
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
            tickAmount: 5,
            min: 0,
            forceNiceScale: true,
            decimalsInFloat: 0,
        },
        title: {
            text: "White Scores",
            align: "center",
        },
        subtitle: {
            text: `Highest Score: ${state.highScoreWhite}`,
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
            background: "#fff",
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
        },
        colors: ["#B68963", "#ef4a4a"],
        legend: {
            show: true,
            showForNullSeries: true,
            showForZeroSeries: true,
            position: "bottom",
            horizontalAlign: "center",
            floating: false,
            fontSize: "14px",
            offsetX: 0,
            offsetY: 0,
            markers: {
                width: 12,
                height: 12,
                radius: 12,
            },
            itemMargin: {
                horizontal: 15,
            },
            onItemClick: {
                toggleDataSeries: false,
            },
            onItemHover: {
                highlightDataSeries: true,
            },
        },
        markers: {
            size: 4,
            strokeWidth: 2,
            onClick: undefined,
            showNullDataPoints: true,
            hover: {
                size: undefined,
                sizeOffset: 2,
            },
        },
        stroke: {
            show: true,
            width: 3,
            dashArray: [0, 6],
        },
        tooltip: {
            shared: true,
            x: {
                show: false,
            },
        },
        xaxis: {
            labels: {
                show: false,
            },
            axisBorder: {
                show: true,
                color: "#78909C",
                height: 1,
                width: "100%",
                offsetX: 0,
                offsetY: 0,
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
            tickAmount: 5,
            min: 0,
            forceNiceScale: true,
            decimalsInFloat: 0,
        },
        title: {
            text: "Black Scores",
            align: "center",
        },
        subtitle: {
            text: `Highest Score: ${state.highScoreBlack}`,
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

    console.log(state);

    return (
        <div className={classes.root}>
            {state.onMenu && state.latestScorePos && (
                <>
                    <Typography variant="h4" component="p" className={classes.text}>
                        <span className={classes.textTitle}>Latest Score:</span> {state.gameScore} ({state.latestScorePos.charAt(0).toUpperCase() + state.latestScorePos.slice(1)})
                    </Typography>
                    {state.recentScoresWhite.length && <Chart options={whiteChartOptions} series={whiteChartData} type="line" width="100%" height="auto" />}
                    {state.recentScoresBlack.length && <Chart options={blackChartOptions} series={blackChartData} type="line" width="100%" height="auto" />}
                </>
            )}
        </div>
    );
};

export default Scores;
