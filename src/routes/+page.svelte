<script>
	import { getActiveDevice } from '$lib/driver/driver.svelte';
	import ConnectionDialog from '../components/ConnectionDialog.svelte';
	import PowerView from '../components/PowerView.svelte';
	import SevenSegment from '../components/SevenSegment.svelte';

	let digit = 0;

	setInterval(() => (digit = (digit + 1) % 10), 1000);
</script>

<div class="home">
	{#if !getActiveDevice()}
		<ConnectionDialog />
		<div class="m-24">
			<SevenSegment {digit} />
		</div>
	{:else}
		<PowerView />
	{/if}
</div>
