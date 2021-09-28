import { default as React, useEffect, useRef, useState } from "react";
import { debounce } from "lodash-es";
import c from "clsx";

import style from "./index.scss";

import * as actions from "./actions";
import useLongPress from "./longpress";

export default function Home() {
	const [volumeSlider, setVolumeSlider] = useState(0);
	const [playerStatus, setPlayerStatus] = useState({
		filename: "— Not Playing —",
		muted: 0,
		status: 0,
		volume: 0,
	});

	const setSliderDebounced = useRef(
		debounce(async (value: number) => {
			await actions.volumeSet(+value);
		}, 150)
	);

	const unmount = () => {
		if (interval) clearInterval(interval);
	};

	const port = process.env.port || "3000";
	let interval: NodeJS.Timer;

	const handleClose = async () => {
		setPlayerStatus({
			filename: "— Not Playing —",
			muted: 0,
			status: 0,
			volume: 0,
		});

		await actions.close();
		unmount();
	};

	const handlePrev = async () => {
		await actions.previousChapter();
	};

	const handlePrevHold = useLongPress(async () => {
		await actions.previousFile();
	});

	const handleNext = async () => {
		await actions.nextChapter();
	};

	const handleNextHold = useLongPress(async () => {
		await actions.nextFile();
	});

	const handleAudio = async () => {
		await actions.audio();
	};

	const handleSubtitle = async () => {
		await actions.subtitle();
	};

	const handlePlay = async () => {
		await actions.play();
	};

	const handlePause = async () => {
		await actions.pause();
	};

	const handleBack = async () => {
		await actions.backKeyframe();
	};

	const handleForward = async () => {
		await actions.fwdKeyframe();
	};

	const handleVolumeUp = async () => {
		if (volumeSlider !== 100) {
			let currVolume = volumeSlider + 1;

			while (currVolume % 5 !== 0) currVolume++;
			setVolumeSlider(currVolume);
		}

		await actions.volumeUp();
	};

	const handleVolumeDown = async () => {
		if (volumeSlider !== 0) {
			let currVolume = volumeSlider - 1;

			while (currVolume % 5 !== 0) currVolume--;
			setVolumeSlider(currVolume);
		}

		await actions.volumeDown();
	};

	const handleVolumeMute = async () => {
		await actions.volumeMute();
	};

	const handleVolumeSlider = async ({ target }) => {
		setVolumeSlider(target.value);
		setSliderDebounced.current(target.value);
	};

	useEffect(() => {
		if (window.location.port !== port) {
			interval = setInterval(async () => {
				const status = await actions.status();

				if (!status.hasOwnProperty("filename")) {
					unmount();
				} else {
					setPlayerStatus(status);
				}
			}, 1500);
		}
	}, []);

	useEffect(() => {
		setVolumeSlider(playerStatus.volume);
	}, [playerStatus.volume]);

	useEffect(() => unmount, []);

	return (
		<div className={style.container}>
			<div className={style.headerContainer}>
				<p className={style.header}>{playerStatus.filename}</p>
			</div>

			<div className={style.close}>
				<button
					className={c(style.button, style.closeButton)}
					onClick={handleClose}
				>
					CLOSE
				</button>
			</div>

			<div className={style.col6}>
				<button
					className={style.button}
					onClick={handlePrev}
					{...handlePrevHold}
				>
					<i className="material-icons">undo</i>
				</button>
			</div>

			<div className={style.col6}>
				<button
					className={style.button}
					onClick={handleNext}
					{...handleNextHold}
				>
					<i className="material-icons">redo</i>
				</button>
			</div>

			<div className={style.midContainer}>
				<div className={style.audioSubsContainer}>
					<button className={style.audioSubsButton} onClick={handleAudio}>
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
					<button className={style.audioSubsButton} onClick={handleSubtitle}>
						<i className="material-icons">closed_caption</i>
					</button>
				</div>
			</div>

			<div className={c(style.col6, style.fwdRwdContainer)}>
				<button className={style.button} onClick={handleBack}>
					<i className="material-icons">fast_rewind</i>
				</button>
			</div>

			<div className={c(style.col6, style.fwdRwdContainer)}>
				<button className={style.button} onClick={handleForward}>
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
					onClick={handleVolumeDown}
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
					onClick={handleVolumeMute}
				>
					{playerStatus.muted ? (
						<i className="material-icons">volume_up</i>
					) : (
						<i className="material-icons">volume_off</i>
					)}
				</button>
			</div>

			<div className={c(style.col4, style.volumeBtnContainer)}>
				<button
					className={c(
						style.button,
						style.volumeButton,
						style.volumeButtonPlus
					)}
					onClick={handleVolumeUp}
				>
					<i className="material-icons">add</i>
				</button>
			</div>

			<div className={style.volumeSliderContainer}>
				<input
					type="range"
					min="0"
					max="100"
					value={volumeSlider}
					onChange={handleVolumeSlider}
					className={style.volumeSlider}
					name="volume"
				/>
			</div>
		</div>
	);
}
