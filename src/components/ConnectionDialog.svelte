<script lang="ts">
	let value = $state(+(localStorage.getItem('baudrate') ?? 115200));

	$inspect(value);

	$effect(() => {
		localStorage.setItem('baudrate', value.toString());
	});

	async function connect() {
		console.log('Connect');
	}
</script>

<div class="popup-container">
	<h2>Connect</h2>
	<datalist id="baudrates">
		{#each [4800, 9600, 19200, 38400, 57600, 115200, 230400, 460800, 921600] as rate}
			<option value={rate}>{rate}</option>
		{/each}
	</datalist>
	<input type="number" class="mb-2" bind:value list="baudrates" placeholder="Select speed" />
	<button class="w-full" onclick={connect}>Continue</button>
</div>

<style>
	h2 {
		@apply text-2xl mb-4;
	}
</style>
