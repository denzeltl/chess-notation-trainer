import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        background: "orange",
        [theme.breakpoints.down("xl")]: {},
    },
}));

interface MenuProps {}

const Menu: React.FC<MenuProps> = () => {
    const classes = useStyles();

    return <div className={classes.root}>Menu</div>;
};

export default Menu;
