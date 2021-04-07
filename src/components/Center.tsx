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
        textShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
    },
}));

interface CenterProps {
    generatedNotation: string | null;
    onMenu: boolean;
}

const Center: React.FC<CenterProps> = ({ generatedNotation, onMenu }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {!onMenu && (
                <Typography variant="h1" component="p" className={classes.paragraph}>
                    {generatedNotation}
                </Typography>
            )}
        </div>
    );
};

export default Center;
