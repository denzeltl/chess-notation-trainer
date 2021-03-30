import React from "react";
import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        color: "#fff",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        pointerEvents: "none",
        [theme.breakpoints.down("xl")]: {},
    },
    paragraph: {
        textShadow: "0 0 8px rgba(0, 0, 0, 0.4)",
    },
}));

interface CenterProps {
    active: boolean;
}

const Center: React.FC<CenterProps> = ({ active }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {active && (
                <Typography variant="h1" component="p" className={classes.paragraph}>
                    3
                </Typography>
            )}
        </div>
    );
};

export default Center;
