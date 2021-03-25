import React from "react";
import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        color: "#fff",
        [theme.breakpoints.down("xl")]: {},
    },
}));

interface CenterProps {}

const Center: React.FC<CenterProps> = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Typography variant="h1" component="p">
                3
            </Typography>
        </div>
    );
};

export default Center;
