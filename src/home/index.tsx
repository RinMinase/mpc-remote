import { default as React, useEffect, useRef, useState } from "react";
import { debounce } from "lodash-es";
import c from "clsx";

import style from "./index.scss";

import * as actions from "./actions";
import useLongPress from "./longpress";

export default function Home() {
	const [disabledRemote, setDisabledRemote] = useState(true);
	const [volumeSlider, setVolumeSlider] = useState(0);
	const [playerStatus, setPlayerStatus] = useState({
		filename: "— Not Playing —",
		muted: 0,
		status: 1,
		volume: 0,
	});

	const setSliderDebounced = useRef(
		debounce(async (value: number) => {
			await actions.volumeSet(+value);
		}, 150)
	);

	const disablePoll = () => {
		if (interval) clearInterval(interval);
	};

	const disableRemote = () => {
		setDisabledRemote(true);
		disablePoll();
	};

	const blur = async () => {
		if (document.activeElement instanceof HTMLElement) {
			await new Promise((res) => setTimeout(res, 75));
			document.activeElement.blur();
		}
	};

	const pollRate = +process.env.POLL_RATE || 1500;
	const port = process.env.PORT || "3000";
	let interval: NodeJS.Timer;

	const handleClose = async () => {
		setPlayerStatus({
			filename: "— Not Playing —",
			muted: 0,
			status: 0,
			volume: 0,
		});

		disableRemote();
		await actions.close();
	};

	const handleReload = async () => {
		blur();
		window.location.reload();
	};

	const handlePrev = async () => {
		blur();
		await actions.previousChapter();
	};

	const handlePrevHold = useLongPress(async () => {
		blur();
		await actions.previousFile();
	});

	const handleNext = async () => {
		blur();
		await actions.nextChapter();
	};

	const handleNextHold = useLongPress(async () => {
		blur();
		await actions.nextFile();
	});

	const handleAudio = async () => {
		blur();
		await actions.audio();
	};

	const handleSubtitle = async () => {
		blur();
		await actions.subtitle();
	};

	const handlePlay = async () => {
		const status = { ...playerStatus };

		status.status = +!status.status;
		setPlayerStatus({...status});

		blur();
		await actions.play();
	};

	const handlePause = async () => {
		const status = { ...playerStatus };

		status.status = +!status.status;
		setPlayerStatus({...status});

		blur();
		await actions.pause();
	};

	const handleBack = async () => {
		blur();
		await actions.backKeyframe();
	};

	const handleForward = async () => {
		blur();
		await actions.fwdKeyframe();
	};

	const handleVolumeUp = async () => {
		if (volumeSlider !== 100) {
			let currVolume = volumeSlider + 1;

			while (currVolume % 5 !== 0) currVolume++;
			setVolumeSlider(currVolume);
		}

		blur();
		await actions.volumeUp();
	};

	const handleVolumeDown = async () => {
		if (volumeSlider !== 0) {
			let currVolume = volumeSlider - 1;

			while (currVolume % 5 !== 0) currVolume--;
			setVolumeSlider(currVolume);
		}

		blur();
		await actions.volumeDown();
	};

	const handleVolumeMute = async () => {
		const status = { ...playerStatus };

		status.muted = +!status.muted;
		setPlayerStatus({...status});

		blur();
		await actions.volumeMute();
	};

	const handleVolumeSlider = async ({ target }) => {
		setVolumeSlider(target.value);
		setSliderDebounced.current(target.value);
	};

	useEffect(() => {
		if (window.location.port !== port) {
			setDisabledRemote(false);

			interval = setInterval(async () => {
				try {
					const status = await actions.status();

					setPlayerStatus(status);
				} catch {
					disableRemote();
				}
			}, pollRate);
		}
	}, []);

	useEffect(() => {
		setVolumeSlider(playerStatus.volume);
	}, [playerStatus.volume]);

	useEffect(() => disablePoll, []);

	return (
		<div className={style.container}>
			<div className={style.headerContainer}>
				<p className={style.header}>{playerStatus.filename}</p>
			</div>

			<div className={style.close}>
				{disabledRemote ? (
					<button
						className={c(style.button, style.reloadButton)}
						onClick={handleReload}
					>
						RELOAD
					</button>
				) : (
					<button
						className={c(style.button, style.closeButton)}
						onClick={handleClose}
					>
						CLOSE
					</button>
				)}
			</div>

			<div className={style.col6}>
				<button
					className={style.button}
					disabled={disabledRemote}
					onClick={handlePrev}
					{...handlePrevHold}
				>
					<i className="material-icons">undo</i>
				</button>
			</div>

			<div className={style.col6}>
				<button
					className={style.button}
					disabled={disabledRemote}
					onClick={handleNext}
					{...handleNextHold}
				>
					<i className="material-icons">redo</i>
				</button>
			</div>

			<div className={style.midContainer}>
				<div className={style.audioSubsContainer}>
					<button
						className={c(style.button, style.audioSubsButton)}
						disabled={disabledRemote}
						onClick={handleAudio}
					>
						<i className="material-icons">audiotrack</i>
					</button>
				</div>

				<div className={style.playButtonContainer}>
					{playerStatus.status ? (
						<button
							className={c(style.button, style.playButton)}
							disabled={disabledRemote}
							onClick={handlePause}
						>
							<i className={"material-icons " + style.playIcon}>pause</i>
						</button>
					) : (
						<button
							className={c(style.button, style.playButton)}
							disabled={disabledRemote}
							onClick={handlePlay}
						>
							<i className={"material-icons " + style.playIcon}>play_arrow</i>
						</button>
					)}
				</div>

				<div className={style.audioSubsContainer}>
					<button
						className={c(style.button, style.audioSubsButton)}
						disabled={disabledRemote}
						onClick={handleSubtitle}
					>
						<i className="material-icons">closed_caption</i>
					</button>
				</div>
			</div>

			<div className={c(style.col6, style.fwdRwdContainer)}>
				<button
					className={style.button}
					disabled={disabledRemote}
					onClick={handleBack}
				>
					<i className="material-icons">fast_rewind</i>
				</button>
			</div>

			<div className={c(style.col6, style.fwdRwdContainer)}>
				<button
					className={style.button}
					disabled={disabledRemote}
					onClick={handleForward}
				>
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
					disabled={disabledRemote}
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
						style.volumeButtonMute,
						playerStatus.muted ? style.volumeMuteButtonMuted : "",
					)}
					disabled={disabledRemote}
					onClick={handleVolumeMute}
				>
					{playerStatus.muted ? (
						<i className={"material-icons " + style.volumeMuteIconMuted}>volume_off</i>
					) : (
						<i className="material-icons">volume_up</i>
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
					disabled={disabledRemote}
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
					name="volume"
					disabled={disabledRemote}
					value={volumeSlider}
					className={style.volumeSlider}
					onChange={handleVolumeSlider}
				/>
			</div>
		</div>
	);
}
