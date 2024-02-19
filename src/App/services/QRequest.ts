import axios from 'axios';
import { toast } from 'react-toastify';

if (process.env.NODE_ENV !== 'production') {
	sessionStorage.setItem('token', import.meta.env.VITE_TOKEN);
}

const QRequest = axios.create({
	baseURL: import.meta.env.VITE_API_SERVER,
	method: 'GET',
	timeout: 10000,
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

// This handles auto retrying up to 3 times
let proceedRetries = 0;
let proceedTimeout: ReturnType<typeof setTimeout>;
export async function proceedGame() {
	try {
		clearTimeout(proceedTimeout);
		await QRequest.get('/gamerun/proceed');
	} catch (err) {
		if (proceedRetries > 3) {
			console.error('Proceed game err not trying again: ', err);
			toast.error('Could not proceed with game, please try again later. Error: ' + err.message);
			throw err;
		} else {
			console.warn('Proceed game err is trying again: ', err);
			proceedRetries++;
			proceedTimeout = setTimeout(() => {
				proceedGame();
			}, proceedRetries * 1000);
		}
	}
}

export default QRequest;
