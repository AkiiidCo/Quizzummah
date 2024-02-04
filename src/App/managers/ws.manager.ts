import { EventEmitter } from './emitter/emitter';
import Pusher, { Channel } from 'pusher-js';
import { store } from '../redux/store';

export enum WSStatus {
	DISCONNECTED = 'Disconnected',
	CONNECTED = 'Connected',
	RECONNECTING = 'Reconnecting',
}

export default class WSManager extends EventEmitter {
	private static instance: WSManager;

	static getInstance(): WSManager {
		if (!WSManager.instance) {
			WSManager.instance = new WSManager();
		}
		return WSManager.instance;
	}

	private static _status = WSStatus.DISCONNECTED;
	private static _ws: Pusher;
	private static _wsChannel: Channel;
	private static _wsChannelHost: Channel;
	private static _currentId = 1;
	private static _promises: { [key: string]: any } = {};
	private static _timer: ReturnType<typeof setTimeout>;

	private constructor() {
		super();
	}

	static reconnect = () => {
		WSManager.connect();
	};

	static connect = () => {
		if (WSManager._ws) {
			WSManager.disconnect();
		}

		const gameId = store.getState().game.gameId;

		Pusher.logToConsole = true;
		Pusher.log = (msg) => {
			console.debug(msg);
		};
		WSManager._ws = new Pusher(import.meta.env.VITE_WEBSOCKET_KEY, {
			cluster: 'us2',
			// wsHost: 'localhost', wsPort: 6001, wssPort: 6001, httpHost: 'http://localhost', httpPort: 5690, httpsPort: 5690
			wsHost: import.meta.env.VITE_WEBSOCKET_HOST,
			wsPort: import.meta.env.VITE_WEBSOCKET_PORT,
			// httpHost: 'http://localhost',
			// httpPort: 80,
			enabledTransports: ['ws'],
			forceTLS: false,
		});

		WSManager._wsChannel = WSManager._ws.subscribe(gameId);
		// WSManager._wsChannel.bind('data', (body) => {
		WSManager._ws.bind_global((eventName, body) => {
			console.debug('eventName: ', eventName, '\nbody: ', body);

			WSManager.emit('message', { eventName, ...(body?.state ?? body ?? {}) });
			// if (eventName === 'gamestate') {
			// if (body) {
			// 	// const body = JSON.parse(e.data);
			// 	if (body.context) {
			// 		const promise = WSManager._promises[body.context];
			// 		if (promise) {
			// 			if (body.error === 'error') {
			// 				promise.reject(new Error(body.error));
			// 			} else {
			// 				promise.resolve(body);
			// 			}
			// 			delete WSManager._promises[body.context];
			// 		}
			// 	}
			// }
			// }
		});

		WSManager._ws.connection.bind('error', function (err) {
			console.debug('WS Error: ', err);
			if (err.error?.data.code === 4004) {
				console.debug('Over limit!');
			}
		});

		// WSManager._ws.connection.bind('connected', () => {
		WSManager._wsChannel.bind('pusher:subscription_succeeded', () => {
			console.debug('CONNECTED');
			WSManager._status = WSStatus.CONNECTED;
			WSManager.emit('status', WSStatus.CONNECTED);
			// var triggered = WSManager._wsChannel.trigger('client-event', { wow: 2 });
			// console.debug('triggered: ', triggered);
		});

		// WSManager._ws.connection.bind('error', (error) => {
		WSManager._wsChannel.bind('pusher:subscription_error', (error) => {
			console.debug('error', error);
			WSManager.emit('error', error.error);
			WSManager.reconnectTimer();
		});

		WSManager._ws.connection.bind('disconnected', () => {
			// WSManager.reconnectTimer();
			WSManager._status = WSStatus.DISCONNECTED;
			WSManager.emit('status', WSStatus.DISCONNECTED);
		});
	};

	static disconnect = () => {
		// WSManager._wsChannel?.unsubscribe(channelName);
		WSManager._wsChannel?.unbind_all();
		WSManager._wsChannelHost?.unbind_all();
		WSManager._ws?.disconnect();
		// @ts-ignore
		WSManager._ws = null;
	};

	static reconnectTimer = () => {
		if (WSManager._timer) return;
		// WSManager._timer = setInterval(() => {
		// // pusher.connection.state;
		// 	switch (WSManager._ws?.readyState) {
		// 		case 0: // Connecting, wait
		// 		case 1: // Connected, all good
		// 			if (WSManager._timer) {
		// 				clearInterval(WSManager._timer);
		// 				WSManager._timer = null;
		// 			}
		// 			return;
		// 		case 2: // Disconnecting
		// 		case 3: // Disconnected
		// 		default:
		// 			WSManager.reconnect();
		// 	}
		// }, 1000);
	};

	static sendCommand = (body: any) => {
		return new Promise((resolve, reject) => {
			try {
				if (WSManager._ws?.connection.state === 'connected') {
					body.context = WSManager._currentId;
					// WSManager._ws.send(JSON. pstringify(body));
					WSManager._promises[WSManager._currentId] = { resolve, reject };
					WSManager._currentId++;
				} else {
					return resolve(false);
				}
			} catch (err) {
				return reject(false);
			}
		});
	};
}
