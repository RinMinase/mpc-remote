import { useState, useEffect } from "preact/hooks";

export default function useLongPress(callback = () => {}, ms = 500) {
	const [startLongPress, setStartLongPress] = useState(false);

	useEffect(() => {
		let timerId: NodeJS.Timeout;

		if (startLongPress) {
			timerId = setTimeout(callback, ms);
		} else {
			// @ts-expect-error
			clearTimeout(timerId);
		}

		return () => {
			clearTimeout(timerId);
		};
	}, [callback, ms, startLongPress]);

	return {
		onMouseDown: () => setStartLongPress(true),
		onMouseUp: () => setStartLongPress(false),
		onMouseLeave: () => setStartLongPress(false),
		onTouchStart: () => setStartLongPress(true),
		onTouchEnd: () => setStartLongPress(false),
	};
}
