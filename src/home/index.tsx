import { default as React, useEffect } from "react";

import style from "./index.scss";
import {
	getUser,
} from "./actions";

export default function Home() {
	useEffect(async () => {
		await getUser();
	}, []);

	return (
		<div>
			<p className={style.test}>Home Component loaded!</p>
			<div className="spinner round"></div>

			<p>SHA IDs</p>
		</div>
	);
}
