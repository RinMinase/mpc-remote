import axios from "axios";

export async function getUser() {
	return axios.get("https://api.github.com/users/torvalds")
		.then((response) => response.data);
}
