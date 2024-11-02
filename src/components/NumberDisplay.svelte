<script lang="ts">
	import DigitDisplay from './DigitDisplay.svelte';

	interface Props {
		value: number;
		integerDigits?: number;
		decimalDigits?: number;
	}

	let { value = 0, integerDigits, decimalDigits = 1 }: Props = $props();

	let iDigits = $derived(integerDigits ?? Math.max(1, Math.ceil(Math.log10(Math.abs(value)))));
	let decimalPart = $derived(value % 1);

	function* range(start: number, end: number) {
		for (let i = start; i < end; i++) yield i;
	}
</script>

<div class="number-editor">
	<span>{value}</span>
	{#each range(1, iDigits + 1) as i}
		<span class="mr-2">
			<DigitDisplay symbol={Math.floor(Math.abs(value / Math.pow(10, iDigits - i))) % 10} />
		</span>
	{/each}
	{#if decimalDigits}
		<span class="decimal-separator mr-2"></span>
	{/if}
	{#each range(1, decimalDigits) as i}
		<span class="mr-2">
			<DigitDisplay symbol={Math.abs(Math.floor(decimalPart * Math.pow(10, i))) % 10} />
			<!--<span>{Math.abs(decimalPart * Math.pow(10, i))}</span>-->
		</span>
	{/each}
	<!--Rounding the last digit-->
	<DigitDisplay symbol={Math.round(decimalPart * Math.pow(10, decimalDigits)) % 10} />
</div>

<style>
	div,
	span {
		@apply text-white;
	}

	.decimal-separator {
		--h: var(--height, 100px);
		--bg-lit: var(--color-lit, #0f0);
		--digit-skew: -8deg;
		--s: var(--segment, calc(var(--h) / 10));

		content: '';
		display: inline-block;
		transform: skewX(var(--digit-skew));
		height: var(--s);
		width: var(--s);

		border-radius: calc(var(--s) / 4);
		background-color: var(--bg-lit);
		box-shadow: 0 0 min(calc(var(--s)), 36px) calc(0px - var(--s) / 8) var(--bg-lit);
	}
</style>
