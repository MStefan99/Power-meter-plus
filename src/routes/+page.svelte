<script>
	import { getActiveDevice } from '$lib/driver/driver.svelte';
	import ConnectionDialog from '../components/ConnectionDialog.svelte';
	import PowerView from '../components/PowerView.svelte';
	import NumberDisplay from '../components/NumberDisplay.svelte';

	let number = -2.34;

	// setInterval(() => (number = (number - 0.1234)), 200);
</script>

<div class="home">
	{#if !getActiveDevice()}
		<ConnectionDialog />
		<div class="display-frame-1">
			<div class="display-frame-2">
				<div class="display p-4">
					<NumberDisplay value={number} decimalDigits={4} />
				</div>
			</div>
		</div>
	{:else}
		<PowerView />
	{/if}
</div>
