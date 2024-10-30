<script>
	import ConnectionDialog from '../components/ConnectionDialog.svelte';
	import { getActiveDevice } from '$lib/driver/driver.svelte';
</script>

<div class="home">
	{#if !getActiveDevice()}
		<ConnectionDialog />
	{:else}
		<p>Power meter</p>
	{/if}
</div>
