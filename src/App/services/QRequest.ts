import axios from 'axios';

if (process.env.NODE_ENV !== 'production') {
	sessionStorage.setItem('token', process.env.REACT_APP_TOKEN);
}

const QRequest = axios.create({
	baseURL: process.env.REACT_APP_API_SERVER,
	method: 'GET',
	onUploadProgress: (event) => {
		console.debug(event);
	},
});

QRequest.interceptors.request.use((config) => {
	const token = sessionStorage.getItem('token');
	if (token) {
		config.headers['Authorization'] = `Bearer ${token}`;
	}
	const gameToken = sessionStorage.getItem('gameToken');
	if (gameToken) {
		config.headers['GameToken'] = gameToken;
	}
	return config;
});

export default QRequest;
