export class EventEmitter {
	private static events: any = {};

	constructor() {
		EventEmitter.events = {};
	}

	static emit(eventName: string, data: any) {
		const event = this.events[eventName];
		if (event) {
			event.forEach((fn: any) => {
				fn.call(null, data);
			});
		}
	}

	static addListener(eventName: string, fn: any) {
		if (!this.events[eventName]) {
			this.events[eventName] = [];
		}

		this.events[eventName].push(fn);
		return () => {
			this.events[eventName] = this.events[eventName].filter((eventFn: any) => fn !== eventFn);
		};
	}

	static removeListener(eventName: string, fn: any) {
		if (!this.events[eventName]) {
			this.events[eventName] = [];
		}

		return () => {
			this.events[eventName] = this.events[eventName].filter((eventFn: any) => fn !== eventFn);
		};
	}

	static removeAllListeners(eventName?: string) {
		if (!this.events[eventName]) {
			this.events[eventName] = [];
		}

		if (eventName) {
			this.events[eventName] = [];
		} else {
			this.events = [];
		}
		return;
	}
}
