import axios from 'axios';

if (process.env.NODE_ENV !== 'production') {
	sessionStorage.setItem('token', import.meta.env.VITE_TOKEN);
}

const QRequest = axios.create({
	baseURL: import.meta.env.VITE_API_SERVER,
	method: 'GET',
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
