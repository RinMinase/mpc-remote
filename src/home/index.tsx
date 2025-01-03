import { useEffect, useRef, useState } from "preact/hooks";
import debounce from "./debounce";

import * as actions from "./actions";
import useLongPress from "./longpress";

import "./index.css";

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
		}, 150),
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

	const pollRate = +import.meta.env.VITE_POLL_RATE || 1500;
	const port = import.meta.env.VITE_PORT || "3000";
	let interval: NodeJS.Timeout;

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
		setPlayerStatus({ ...status });

		blur();
		await actions.play();
	};

	const handlePause = async () => {
		const status = { ...playerStatus };

		status.status = +!status.status;
		setPlayerStatus({ ...status });

		blur();
		await actions.pause();
	};

	const handleBack = async () => {
		blur();
		await actions.backKeyframe();
	};

	const handleBackHold = useLongPress(async () => {
		blur();
		await actions.backLarge();
	});

	const handleForward = async () => {
		blur();
		await actions.fwdKeyframe();
	};

	const handleForwardHold = useLongPress(async () => {
		blur();
		await actions.fwdLarge();
	});

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
		setPlayerStatus({ ...status });

		blur();
		await actions.volumeMute();
	};

	const handleVolumeSlider = async (e: any) => {
		const target = e.target as HTMLInputElement;
		const value = target.value;

		setVolumeSlider(+value);
		setSliderDebounced.current(+value);
	};

	useEffect(() => {
		if (window.location.port !== port) {
			setDisabledRemote(false);

			interval = setInterval(async () => {
				try {
					const status = await actions.status();

					if (status) {
						setPlayerStatus(status);
					}
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
		<div class="container">
			<div class="headerContainer">
				<div class="headerSubContainer">
					<p class="header">{playerStatus.filename}</p>
				</div>
			</div>

			<div class="close">
				{disabledRemote ? (
					<button
						class="button closeReloadButton reloadButton"
						onClick={handleReload}
					>
						<i class="material-icons iconTopSpace closeReloadButton">sync</i>
					</button>
				) : (
					<button
						class="button closeReloadButton closeButton"
						onClick={handleClose}
					>
						<i class="material-icons iconTopSpace closeReloadButton">
							power_settings_new
						</i>
					</button>
				)}
			</div>

			<div class="col6">
				<button
					class="button"
					disabled={disabledRemote}
					onClick={handlePrev}
					{...handlePrevHold}
				>
					<i class="material-icons iconTopSpace">undo</i>
				</button>
			</div>

			<div class="col6">
				<button
					class="button"
					disabled={disabledRemote}
					onClick={handleNext}
					{...handleNextHold}
				>
					<i class="material-icons iconTopSpace">redo</i>
				</button>
			</div>

			<div class="midContainer">
				<div class="audioSubsContainer">
					<button
						class="button audioSubsButton"
						disabled={disabledRemote}
						onClick={handleAudio}
					>
						<i class="material-icons">audiotrack</i>
					</button>
				</div>

				<div class="playButtonContainer">
					{playerStatus.status ? (
						<button
							class="button playButton"
							disabled={disabledRemote}
							onClick={handlePause}
						>
							<i class="material-icons playIcon">pause</i>
						</button>
					) : (
						<button
							class="button playButton"
							disabled={disabledRemote}
							onClick={handlePlay}
						>
							<i class="material-icons playIcon">play_arrow</i>
						</button>
					)}
				</div>

				<div class="audioSubsContainer">
					<button
						class="button audioSubsButton"
						disabled={disabledRemote}
						onClick={handleSubtitle}
					>
						<i class="material-icons">closed_caption</i>
					</button>
				</div>
			</div>

			<div class="col6 fwdRwdContainer">
				<button
					class="button"
					disabled={disabledRemote}
					onClick={handleBack}
					{...handleBackHold}
				>
					<i class="material-icons iconTopSpace">fast_rewind</i>
				</button>
			</div>

			<div class="col6 fwdRwdContainer">
				<button
					class="button"
					disabled={disabledRemote}
					onClick={handleForward}
					{...handleForwardHold}
				>
					<i class="material-icons iconTopSpace">fast_forward</i>
				</button>
			</div>

			<div class="col4 volumeBtnContainer">
				<button
					class="button volumeButton volumeButtonMinus"
					disabled={disabledRemote}
					onClick={handleVolumeDown}
				>
					<i class="material-icons">remove</i>
				</button>
			</div>

			<div class="col4 volumeBtnContainer">
				<button
					class={`button volumeButton volumeButtonMute ${
						playerStatus.muted ? "volumeMuteButtonMuted" : ""
					}`}
					disabled={disabledRemote}
					onClick={handleVolumeMute}
				>
					{playerStatus.muted ? (
						<i class="material-icons volumeMuteIconMuted">volume_off</i>
					) : (
						<i class="material-icons">volume_up</i>
					)}
				</button>
			</div>

			<div class="col4 volumeBtnContainer">
				<button
					class="button volumeButton volumeButtonPlus"
					disabled={disabledRemote}
					onClick={handleVolumeUp}
				>
					<i class="material-icons">add</i>
				</button>
			</div>

			<div class="volumeSliderContainer">
				<input
					type="range"
					min="0"
					max="100"
					name="volume"
					// disabled={disabledRemote}
					value={volumeSlider}
					class="volumeSlider"
					onChange={handleVolumeSlider}
				/>
			</div>
		</div>
	);
}
