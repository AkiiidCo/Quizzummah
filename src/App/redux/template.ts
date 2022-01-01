const auth: {
	signedIn: boolean;
	token: string;
	email: string;
	username: string;
	host: string;
	port: number;
	premium: boolean;
} = {
	signedIn: false,
	token: '',
	email: '',
	username: '',
	host: '',
	port: 39222,
	premium: false,
};

const settings: {
	language: string;
} = {
	language: 'en',
};

export default { auth, settings };
