<script lang="ts">
	import { disconnectDevice, getActiveDevice } from '$lib/driver/driver.svelte';
	import NumberDisplay from './NumberDisplay.svelte';

	const historyEntries = 60; // History entries to keep
	const historyLength = 30; // History duration in seconds

	let voltageHistory: number[] = $state([]);
	let currentHistory: number[] = $state([]);
	let powerHistory: number[] = $state([]);

	$effect(() => {
		const interval = setInterval(
			() => {
				if (getActiveDevice() !== null) {
					voltageHistory.push(+getActiveDevice()._request('MEAS:VOLT?'));
					currentHistory.push(+getActiveDevice()._request('MEAS:CURR?'));
					powerHistory.push(+getActiveDevice()._request('MEAS:POW?'));

					voltageHistory = voltageHistory.slice(voltageHistory.length - historyEntries);
					currentHistory = currentHistory.slice(currentHistory.length - historyEntries);
					powerHistory = powerHistory.slice(powerHistory.length - historyEntries);
				}
			},
			(1000 * historyLength) / historyEntries
		);

		return () => {
			clearInterval(interval);
		};
	});
</script>

<div class="power-view">
	<p>Power view</p>
	<NumberDisplay
		value={voltageHistory[voltageHistory.length - 1]}
		integerDigits={2}
		decimalDigits={3}
		--color="#300"
		--color-lit="#f00"
	/>
	<NumberDisplay
		value={currentHistory[currentHistory.length - 1]}
		integerDigits={2}
		decimalDigits={3}
	/>
	<NumberDisplay
		value={powerHistory[powerHistory.length - 1]}
		integerDigits={3}
		decimalDigits={3}
		--color="#330"
		--color-lit="#ff0"
	/>
	<button onclick={disconnectDevice}>Disconnect</button>
</div>
