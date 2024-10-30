'use strict';

import { PowerSupply } from './PowerSupply';

let activeDevice = $state<PowerSupply | null>(null);
let reader: ReadableStreamDefaultReader<Uint8Array> | null = null;

export const getActiveDevice = () => activeDevice;

export async function connectDevice(
	options: SerialOptions,
	debug = false
): Promise<PowerSupply | null> {
	const port = await navigator.serial.requestPort();

	return new Promise((resolve, reject) => {
		port
			.open(options)
			.then(() => {
				const device = new PowerSupply(port, debug);
				activeDevice = device;
				resolve(device);

				(async (): Promise<void> => {
					while (port.readable) {
						reader = port.readable.getReader();
						try {
							while (true) {
								const { value, done } = await reader.read();
								if (done) {
									return;
								}
								await device._parse(value);
							}
						} finally {
							reader.releaseLock();
						}
					}
				})().catch((err) => {
					console.error(err);
					disconnectDevice();
				});

				return device;
			})
			.catch((err) => reject(err));
	});
}

export function disconnectDevice(): void {
	if (activeDevice?._port.readable?.locked) {
		reader?.cancel().then(() => activeDevice?._port.close());
	} else {
		activeDevice?._port.close();
	}

	activeDevice = null;
}
