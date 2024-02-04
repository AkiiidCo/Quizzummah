import { WSStatus } from '../managers/ws.manager';

const auth: {
	signedIn: boolean;
	token: string;
	email: string;
	username: string;
} = {
	signedIn: false,
	token: '',
	email: '',
	username: '',
};

const settings: {
	language: string;
} = {
	language: 'en',
};

const game: {
	host: boolean;
	onlyDisplay: boolean;
	gameToken: string;
	gameId: string;
	room: string;
	username: string;
	status: WSStatus;
} = {
	host: false,
	onlyDisplay: false,
	gameToken: '',
	gameId: '',
	room: '',
	username: '',
	status: WSStatus.DISCONNECTED,
};

export default { auth, settings, game };
