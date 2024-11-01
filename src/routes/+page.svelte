<script>
	import { getActiveDevice } from '$lib/driver/driver.svelte';
	import ConnectionDialog from '../components/ConnectionDialog.svelte';
	import PowerView from '../components/PowerView.svelte';
	import NumberDisplay from '../components/NumberDisplay.svelte';

	let number = 0;

	setInterval(() => (number = (number + 0.1234) % 10), 200);
</script>

<div class="home">
	{#if !getActiveDevice()}
		<ConnectionDialog />
		<div class="m-24">
			<NumberDisplay value={number} decimalDigits={4} />
		</div>
	{:else}
		<PowerView />
	{/if}
</div>
