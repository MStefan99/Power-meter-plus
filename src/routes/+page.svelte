<script>
	import ConnectionDialog from '../components/ConnectionDialog.svelte';

	let number = $state(1);
	let prod = $derived(number * 5)
</script>

<h1>Power meter</h1>
<input type="range" bind:value={number}/>
<p>{prod}</p>
<ConnectionDialog/>
