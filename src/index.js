import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import { ThemeProvider } from "@material-ui/styles";
import { CssBaseline } from "@material-ui/core";
import App from "./App";
import Themes from "./themes";
import reportWebVitals from "./reportWebVitals";

const history = createBrowserHistory();
ReactDOM.render(
  <Router history={history}>
      <ThemeProvider theme={Themes.default}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </Router>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
