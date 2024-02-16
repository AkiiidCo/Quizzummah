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
	private static _currentId = 1;
	private static _promises: { [key: string]: any } = {};

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

		Pusher.logToConsole = true;
		Pusher.log = (msg) => {
			console.debug(msg);
		};

		const isLocal = import.meta.env.VITE_WEBSOCKET_LOCAL === 'true';
		WSManager._ws = new Pusher(import.meta.env.VITE_WEBSOCKET_KEY, {
			cluster: 'us2',
			wsHost: import.meta.env.VITE_WEBSOCKET_HOST,
			wsPort: isLocal && import.meta.env.VITE_WEBSOCKET_PORT,
			wssPort: !isLocal && import.meta.env.VITE_WEBSOCKET_PORT,
			enabledTransports: ['ws'],
			forceTLS: !isLocal,
		});

		WSManager._wsChannel = WSManager._ws.subscribe(store.getState().game.gameId);
		WSManager._ws.bind('gamestate', (body) => {
			WSManager.emit('message', { eventName: 'gamestate', ...(body?.state ?? body ?? {}) });
		});
		WSManager._ws.bind('gameplayers', (body) => {
			WSManager.emit('message', { eventName: 'gameplayers', ...(body?.state ?? body ?? {}) });
		});
		WSManager._ws.bind('gameover', (body) => {
			WSManager.emit('message', { eventName: 'gameover', ...(body?.state ?? body ?? {}) });
		});
		WSManager._ws.bind('gamechat', (body) => {
			WSManager.emit('message', { eventName: 'gamechat', ...(body?.state ?? body ?? {}) });
		});

		WSManager._ws.connection.bind('error', function (err) {
			console.debug('WS Error: ', err);
			if (err.error?.data.code === 4004) {
				console.debug('Over limit!');
			}
		});

		// WSManager._ws.connection.bind('connected', () => {
		WSManager._wsChannel.bind('pusher:subscription_succeeded', () => {
			console.debug('[Pusher] Connected');
			WSManager._status = WSStatus.CONNECTED;
			WSManager.emit('status', WSStatus.CONNECTED);
		});

		WSManager._wsChannel.bind('pusher:subscription_error', (error) => {
			console.error('[Pusher] subscription_error', error);
			WSManager.emit('error', error.error);
		});

		WSManager._ws.connection.bind('disconnected', () => {
			WSManager._status = WSStatus.DISCONNECTED;
			WSManager.emit('status', WSStatus.DISCONNECTED);
		});
	};

	static disconnect = () => {
		WSManager._wsChannel?.unbind_all();
		WSManager._wsChannel?.unsubscribe();
		WSManager._ws?.disconnect();
		WSManager._wsChannel = null;
		WSManager._ws = null;
	};

	static sendCommand = (body: any) => {
		return new Promise((resolve, reject) => {
			try {
				if (WSManager._ws?.connection.state === 'connected') {
					body.context = WSManager._currentId;
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
