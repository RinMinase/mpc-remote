import { default as React, useEffect } from "react";
import c from "clsx";

import style from "./index.scss";

import { play } from "./actions";

export default function Home() {
	const handlePlay = async () => {
		await play();
	}

	useEffect(async () => {
	}, []);

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
					<i class="material-icons">undo</i>
				</button>
			</div>

			<div className={style.col6}>
				<button className={style.button}>
					<i class="material-icons">redo</i>
				</button>
			</div>

			<div className={style.playButtonContainer}>
				<button className={style.playButton} onClick={handlePlay}>
					<i className={"material-icons " + style.playIcon}>play_arrow</i>
					{/* <i class="material-icons">pause</i> */}
				</button>
			</div>

			<div className={c(style.col6, style.fwdRwdContainer)}>
				<button className={style.button}>
					<i class="material-icons">fast_rewind</i>
				</button>
			</div>

			<div className={c(style.col6, style.fwdRwdContainer)}>
				<button className={style.button}>
					<i class="material-icons">fast_forward</i>
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
					<i class="material-icons">remove</i>
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
					<i class="material-icons">volume_off</i>
					{/* <i class="material-icons">volume_up</i> */}
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
					<i class="material-icons">add</i>
				</button>
			</div>

			<div className={style.volumeSliderContainer}>
				{/* <input type="range" min="1" max="100" value="0" className={style.volumeSlider} /> */}
			</div>
		</div>
	);
}
