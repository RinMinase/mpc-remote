import axios from "axios";
import qs from "qs";

const MPC_BASE_DOMAIN = process.env.MPC_BASE_DOMAIN || "localhost";
const MPC_BASE_PORT = process.env.MPC_BASE_PORT || "13579";
const MPC = `http://${MPC_BASE_DOMAIN}:${MPC_BASE_PORT}/command.html`;
const MPC_STATUS = `http://${MPC_BASE_DOMAIN}:${MPC_BASE_PORT}/status.html`;

const config = {
	headers: {
		"Content-Type": "application/x-www-form-urlencoded",
	}
}

const data = (wm_command: number, param?: object) => {
	return qs.stringify({
		wm_command,
		null: 0,
		...param,
	});
};

export async function status() {
	return axios.get(MPC_STATUS, config)
		.then((response) => {
			if (response.status === 200) {
				const { data } = response;
				const fullStatus = data.substring(10, data.length - 1);

				const fnFull = fullStatus.split("\", \"");
				const filename: string = fnFull[0] || "— Not Playing —";

				const stFull = fnFull[1].split("\", ");
				const status: number = stFull[0] === "Playing" ? 1 : 0;

				const volFull = stFull[3].split(", ");
				const muted: number = +volFull[0];
				const volume: number = +volFull[1];

				return {
					filename,
					muted,
					status,
					volume,
				};
			}
		});
}

export async function close() {
	return axios.post(MPC, data(816), config);
}

export async function play() {
	return axios.post(MPC, data(887), config);
}

export async function pause() {
	return axios.post(MPC, data(888), config);
}

export async function previousChapter() {
	return axios.post(MPC, data(921), config);
}

export async function nextChapter() {
	return axios.post(MPC, data(922), config);
}

export async function previousFile() {
	return axios.post(MPC, data(920), config);
}

export async function nextFile() {
	return axios.post(MPC, data(919), config);
}

export async function audio() {
	return axios.post(MPC, data(952), config);
}

export async function subtitle() {
	return axios.post(MPC, data(954), config);
}

export async function fwdKeyframe() {
	return axios.post(MPC, data(898), config);
}

export async function fwdSmall() {
	return axios.post(MPC, data(900), config);
}

export async function fwdMedium() {
	return axios.post(MPC, data(902), config);
}

export async function fwdLarge() {
	return axios.post(MPC, data(904), config);
}

export async function backKeyframe() {
	return axios.post(MPC, data(897), config);
}

export async function backSmall() {
	return axios.post(MPC, data(899), config);
}

export async function backMedium() {
	return axios.post(MPC, data(901), config);
}

export async function backLarge() {
	return axios.post(MPC, data(903), config);
}

export async function volumeUp() {
	return axios.post(MPC, data(907), config);
}

export async function volumeDown() {
	return axios.post(MPC, data(908), config);
}

export async function volumeMute() {
	return axios.post(MPC, data(909), config);
}

export async function volumeSet(volume: number) {
	return axios.post(MPC, data(-2, { volume }), config);
}

export default {
	status,
	close,
	play,
	pause,
	previousChapter,
	nextChapter,
	previousFile,
	nextFile,
	audio,
	subtitle,
	fwdKeyframe,
	fwdSmall,
	fwdMedium,
	fwdLarge,
	backKeyframe,
	backSmall,
	backMedium,
	backLarge,
	volumeUp,
	volumeDown,
	volumeSet,
};
