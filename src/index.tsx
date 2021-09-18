import React, { StrictMode } from "react";
import ReactDOM from "react-dom";

import Home from "./home";

import "./global.scss";

ReactDOM.render(
	<StrictMode>
		<Home />
	</StrictMode>,
	document.getElementById("app")
);
