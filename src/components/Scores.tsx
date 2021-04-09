import React from "react";
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
        latestScore: number;
        gameScore: number;
        highScore: number;
        orientation: "white" | "black";
        latestScorePos: "white" | "black" | undefined;
        active: boolean;
        activePractice: boolean;
        onMenu: boolean;
    };
}

const Scores: React.FC<ScoresProps> = ({ state }) => {
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
        title: {
            text: "White Scores",
            align: "center",
        },
    };
    const whiteChartData = [
        {
            name: "Score",
            data: [30, 25, 22, 40, 19],
        },
        {
            name: "Mistakes",
            data: [5, 2, 7, 0, 10],
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
        title: {
            text: "Black Scores",
            align: "center",
        },
    };
    const blackChartData = [
        {
            name: "Score",
            data: [30, 25, 22, 40, 19],
        },
        {
            name: "Mistakes",
            data: [5, 2, 7, 0, 10],
        },
    ];

    return (
        <div className={classes.root}>
            {state.onMenu && state.gameScore !== 0 && (
                <>
                    <Typography variant="h4" component="p" className={classes.text}>
                        <span className={classes.textTitle}>Latest Score:</span> {state.gameScore} ({state.latestScorePos!.charAt(0).toUpperCase() + state.latestScorePos!.slice(1)})
                    </Typography>
                    <Chart options={whiteChartOptions} series={whiteChartData} type="line" width="100%" height="auto" />
                    <Chart options={blackChartOptions} series={blackChartData} type="line" width="100%" height="auto" />
                </>
            )}
        </div>
    );
};

export default Scores;
