import React from "react";
import ReactDOM from "react-dom";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#B68963",
        },
        secondary: {
            main: "#794B25",
        },
        success: {
            main: "#42b347",
        },
        error: {
            main: "#ef4a4a",
        },
        background: {
            default: "#18253e",
        },
    },
    typography: {
        fontFamily: ["Montserrat", "Roboto", "Helvetica", "Arial", "sans-serif"].join(","),
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 480,
            md: 768,
            lg: 1250,
            xl: 1450,
        },
    },
    overrides: {
        MuiButton: {
            root: {
                textTransform: "capitalize",
                minWidth: "100%",
            },
        },
    },
    props: {
        MuiButtonBase: {
            disableRipple: true,
        },
    },
});

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <App />
    </ThemeProvider>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
