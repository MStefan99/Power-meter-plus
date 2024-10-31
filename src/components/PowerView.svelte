<script lang="ts">
	import { disconnectDevice } from '$lib/driver/driver.svelte';
	import NumberEditor from './NumberEditor.svelte';

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
	<NumberEditor value={5.125} integer={2} decimal={8} separator="." />
</div>
