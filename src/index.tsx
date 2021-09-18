import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import store from "./reducers";
import { Routes, DynamicRoute } from "./routes";
import Navbar from "./core/navbar";

import "./global.scss";

export default function App(props: any) {
	return(
		<div>
			<Navbar />
			<div className="container">
				<Container routes={props.routes} />
			</div>
		</div>
	);
}

function Container(props: any) {
	return props.routes.map((route: any) => <DynamicRoute key={route.path} { ...route }/>);
}

ReactDOM.render(
	<StrictMode>
		<Provider store={store}>
			<Routes />
		</Provider>
	</StrictMode>,
	document.getElementById("app")
);
