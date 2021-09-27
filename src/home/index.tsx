import { default as React, useEffect, useState } from "react";
import c from "clsx";

import style from "./index.scss";

import { pause, play, status } from "./actions";

export default function Home() {
	const [playerStatus, setPlayerStatus] = useState({
		filename: "",
		status: 0,
		volume: 0,
	});

	const port = process.env.port || "3000";
	let interval: NodeJS.Timer;

	const handlePlay = async () => {
		await play();
	}

	const handlePause = async () => {
		await pause();
	}

	useEffect(() => {
		if (window.location.port !== port) {
			interval = setInterval(async () => {
				setPlayerStatus(await status());
			}, 1000);
		}
	}, []);

	useEffect(() => () => {
		if (interval) clearInterval(interval);
	}, [])

	return (
		<div className={style.container}>
			<div className={style.headerContainer}>
				<p className={style.header}>
					Filename - Very Long Long Long Long
					Long Long Long Long Long Long Filename
				</p>
			</div>

			<div className={style.close}>
				<button className={c(style.button, style.closeButton)}>CLOSE</button>
			</div>

			<div className={style.col6}>
				<button className={style.button}>
					<i className="material-icons">undo</i>
				</button>
			</div>

			<div className={style.col6}>
				<button className={style.button}>
					<i className="material-icons">redo</i>
				</button>
			</div>

			<div className={style.midContainer}>
				<div className={style.audioSubsContainer}>
					<button className={style.audioSubsButton}>
						<i className="material-icons">audiotrack</i>
					</button>
				</div>

				<div className={style.playButtonContainer}>
					{playerStatus.status ? (
						<button className={style.playButton} onClick={handlePause}>
							<i className={"material-icons " + style.playIcon}>pause</i>
						</button>
					) : (
						<button className={style.playButton} onClick={handlePlay}>
							<i className={"material-icons " + style.playIcon}>play_arrow</i>
						</button>
					)}
				</div>

				<div className={style.audioSubsContainer}>
					<button className={style.audioSubsButton}>
						<i className="material-icons">closed_caption</i>
					</button>
				</div>
			</div>

			<div className={c(style.col6, style.fwdRwdContainer)}>
				<button className={style.button}>
					<i className="material-icons">fast_rewind</i>
				</button>
			</div>

			<div className={c(style.col6, style.fwdRwdContainer)}>
				<button className={style.button}>
					<i className="material-icons">fast_forward</i>
				</button>
			</div>

			<div className={c(style.col4, style.volumeBtnContainer)}>
				<button
					className={c(
						style.button,
						style.volumeButton,
						style.volumeButtonMinus
					)}
				>
					<i className="material-icons">remove</i>
				</button>
			</div>

			<div className={c(style.col4, style.volumeBtnContainer)}>
				<button
					className={c(
						style.button,
						style.volumeButton,
						style.volumeButtonMute
					)}
				>
					<i className="material-icons">volume_off</i>
					{/* <i className="material-icons">volume_up</i> */}
				</button>
			</div>

			<div className={c(style.col4, style.volumeBtnContainer)}>
				<button
					className={c(
						style.button,
						style.volumeButton,
						style.volumeButtonPlus
					)}
				>
					<i className="material-icons">add</i>
				</button>
			</div>

			<div className={style.volumeSliderContainer}>
				{/* <input type="range" min="1" max="100" value="0" className={style.volumeSlider} /> */}
			</div>
		</div>
	);
}
