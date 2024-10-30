<script>
	import ConnectionDialog from '../components/ConnectionDialog.svelte';
	import { device } from '$lib/store.svelte';
</script>

<div class="home">
	{#if !device}
		<ConnectionDialog />
	{:else}
		<p>Power meter</p>
	{/if}
</div>
