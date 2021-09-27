import axios from "axios";
import qs from "qs";

// const MPC_BASE_DOMAIN = process.env.MPC_BASE_DOMAIN || "localhost";
// const MPC_BASE_PORT = process.env.MPC_BASE_PORT || "13579";
const MPC_BASE_DOMAIN = "localhost";
const MPC_BASE_PORT = "13579";
const MPC = `http://${MPC_BASE_DOMAIN}:${MPC_BASE_PORT}/command.html`;

const config = {
	headers: {
		"Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
		"Content-Type": "application/x-www-form-urlencoded"
	}
}

export async function play() {
	const data = {
		wm_command: 887,
		null: 0,
	}

	return axios.post(MPC, qs.stringify(data), config);
}

export async function pause() {
	return axios.post(MPC, { wm_command: 888 });
}
