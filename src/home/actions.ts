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

export async function status() {
	return axios.get(MPC_STATUS, config)
		.then((response) => {
			if (response.status === 200) {
				const { data } = response;
				const fullStatus = data.substring(10, data.length - 1);

				const fnFull = fullStatus.split("\", \"");
				const filename: string = fnFull[0];

				const stFull = fnFull[1].split("\", ");
				const status: number = stFull[0] === "Playing" ? 1 : 0;
				const volume: number = +stFull[3].split(", ")[1];

				return {
					filename,
					status,
					volume,
				};
			}
		});
}

export async function play() {
	const data = {
		wm_command: 887,
		null: 0,
	};

	return axios.post(MPC, qs.stringify(data), config);
}

export async function pause() {
	const data = {
		wm_command: 888,
		null: 0,
	};

	return axios.post(MPC, qs.stringify(data), config);
}
