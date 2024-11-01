<script lang="ts">
	import { connectDevice } from '$lib/driver/driver.svelte';

	let baudRate = $state(+(localStorage.getItem('baudrate') ?? 115200));

	$effect(() => {
		localStorage.setItem('baudrate', baudRate.toString());
	});

	async function connect() {
		const device = await connectDevice(
			{
				baudRate,
				stopBits: 1,
				dataBits: 8,
				parity: 'odd'
			},
			true
		);

		console.log(device);

		const info = await device?.getInfo();

		console.log(info);
	}
</script>

<div class="popup-container">
	<h2>Connect</h2>
	<datalist id="baudrates">
		{#each [2400, 4800, 9600, 19200, 38400, 57600, 115200, 230400, 460800, 921600] as rate}
			<option value={rate}>{rate}</option>
		{/each}
	</datalist>
	<input
		type="number"
		class="mb-2"
		bind:value={baudRate}
		list="baudrates"
		placeholder="Select speed"
	/>
	<button class="w-full" onclick={connect}>Continue</button>
</div>

<style>
	h2 {
		@apply mb-4 text-2xl;
	}
</style>
