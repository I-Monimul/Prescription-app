import axios from "axios";
import baseUrl from "../config/endpoint.js";

export default class model {
	constructor() {
		this.endpoint = "";
	}

	getAll() {
		return axios.get(baseUrl + this.endpoint);
	}

	getOne(id) {
		return axios.get(baseUrl + this.endpoint + '/' + id);
	}

	post(data) {
		return axios.post(baseUrl + this.endpoint, data, { headers: { "Content-Type": "application/json" } });
	}

	put(id, data) {
		return axios.put(baseUrl + this.endpoint + '/' + id, data, { headers: { "Content-Type": "application/json" } });
	}

	delete(id) {
		return axios.delete(baseUrl + this.endpoint + '/' + id);
	}

	getPdf(id) {
		return axios.get(baseUrl + this.endpoint + '/' + id, { responseType: 'blob' });
	}
}