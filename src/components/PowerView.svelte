<script lang="ts">
	import { disconnectDevice } from '$lib/driver/driver.svelte';

	// $effect(() => {
	// 	const interval = setInterval(() => {
	// 		console.log('Interval', interval, getActiveDevice());
	// 		getActiveDevice()?._request('*IDN?');
	// 	}, 1000);
	//
	// 	return () => {
	// 		clearInterval(interval);
	// 	}
	// });
</script>

<div class="power-view">
	<p>Power view</p>
	<button onclick={disconnectDevice}>Disconnect</button>
</div>
