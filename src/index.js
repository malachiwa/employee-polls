import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import reducer from "./reducers";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import logger from "./middleware/logger";
import { BrowserRouter as Router } from "react-router-dom";

const store = configureStore({
	reducer,
	middleware: [thunk, logger],
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<Provider store={store}>
		<Router>
			<App />
		</Router>
	</Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
