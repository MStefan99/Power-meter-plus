<script>
	import { getActiveDevice } from '$lib/driver/driver.svelte';
	import ConnectionDialog from '../components/ConnectionDialog.svelte';
	import PowerView from '../components/PowerView.svelte';
	import SevenSegment from '../components/SevenSegment.svelte';
</script>

<div class="home">
	{#if !getActiveDevice()}
		<ConnectionDialog />
		<SevenSegment digit={2} />
	{:else}
		<PowerView />
	{/if}
</div>
