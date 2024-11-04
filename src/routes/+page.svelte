<script>
	import { getActiveDevice } from '$lib/driver/driver.svelte';
	import ConnectionDialog from '../components/ConnectionDialog.svelte';
	import PowerView from '../components/PowerView.svelte';
</script>

<div class="home">
	{#if !getActiveDevice()}
		<ConnectionDialog />
	{/if}
	<div class="ml-4">
		<PowerView />
	</div>
</div>
