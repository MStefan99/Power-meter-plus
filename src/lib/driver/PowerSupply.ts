export class PowerSupply {
	readonly _debug: boolean;
	_port: SerialPort;
	_incomingBuffer: string = '';
	_pendingRequest: {
		resolve: (response: string) => void;
		reject: (err: Error) => void;
		timeout: number;
	} | null = null;

	constructor(port: SerialPort, debug: boolean = false) {
		this._port = port;
		this._debug = debug;
	}

	async _send(command: string): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			this._debug && console.log('Sending', command, '\n', command);

			const writer = this._port.writable?.getWriter();
			const encoder = new TextEncoder();
			const bytes = encoder.encode(command);

			writer
				?.write(bytes)
				.then(() => {
					writer.releaseLock();
					resolve();
				})
				.catch(reject);
		});
	}

	async _request(command: string): Promise<string> {
		return new Promise<string>((resolve, reject) => {
			const encoder = new TextEncoder();
			const bytes = encoder.encode(command.replace(/\s*$/, '\r\n'));
			this._debug && console.log('Sending', command);

			const writer = this._port.writable?.getWriter();
			writer?.write(bytes).then(() => {
				writer?.releaseLock();

				this._pendingRequest = {
					resolve: resolve as (response: string) => void,
					reject,
					timeout: setTimeout(() => {
						reject(new Error('Timed out while waiting for motor response'));
					}, 20)
				};
			});
		});
	}

	async _parse(data: Uint8Array) {
		const decoder = new TextDecoder();
		const str = decoder.decode(data);
		this._incomingBuffer += str;
		this._debug && console.log('Received', str);

		if (this._incomingBuffer.match('\r\n$')) {
			const response = this._incomingBuffer.replace(/\r\n$/, '');
			this._incomingBuffer = '';

			this._debug && console.log('Parsed response:', response);
			this._pendingRequest?.resolve(response);
			clearTimeout(this._pendingRequest?.timeout);
		}
	}

	async getInfo(): Promise<{ brand: string; model: string; serial: string; fw: string }> {
		const response = await this._request('*IDN?');
		const [brand, model, serial, fw] = response.split(',');

		return { brand, model, serial, fw };
	}
}
