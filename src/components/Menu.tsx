import React from "react";
import { Button, Grid, makeStyles, Typography, Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        height: "100%",
        [theme.breakpoints.down("xl")]: {},
    },
    rootContainer: {
        height: "100%",
    },
}));

interface MenuProps {}

const Menu: React.FC<MenuProps> = () => {
    const classes = useStyles();

    return (
        <section className={classes.root}>
            <Grid className={classes.rootContainer} container direction="column" justify="space-between">
                <Paper>
                    <Typography>Instructions / Notes</Typography>
                </Paper>
                <Grid container item spacing={1}>
                    <Grid item xs={4}>
                        <Button color="secondary" variant="contained">
                            White
                        </Button>
                    </Grid>
                    <Grid item xs={4}>
                        <Button color="secondary" variant="contained">
                            Random
                        </Button>
                    </Grid>
                    <Grid item xs={4}>
                        <Button color="secondary" variant="contained">
                            Black
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button color="secondary" variant="contained">
                            Practice
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button color="secondary" variant="contained">
                            Start
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </section>
    );
};

export default Menu;
