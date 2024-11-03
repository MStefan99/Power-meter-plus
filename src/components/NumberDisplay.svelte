<script lang="ts">
	import DigitDisplay from './DigitDisplay.svelte';

	interface Props {
		value: number | string;
		integerDigits?: number;
		decimalDigits?: number;
	}

	type NumberSymbol = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '-' | '.';

	let { value = 0, integerDigits, decimalDigits }: Props = $props();

	let digits = $derived(extractDigits(value, integerDigits, decimalDigits));

	function extractDigits(
		num: number | string,
		intLength?: number,
		decLength?: number
	): NumberSymbol[] {
		const numStr = typeof num === 'number' ? num.toString() : num;

		const isNegative = numStr[0] === '-';
		const absNumStr = isNegative ? numStr.slice(1) : numStr;

		const intPart = absNumStr.split('.')[0] || '';
		const decPart = absNumStr.split('.')[1] || '';

		const paddedIntPart =
			intLength !== undefined
				? intPart.slice(-intLength + ~~isNegative).padStart(intLength - ~~isNegative, '0')
				: intPart;
		const paddedDecPart =
			decLength !== undefined ? decPart.slice(0, decLength).padEnd(decLength, '0') : decPart;

		return (
			(isNegative ? '-' : '') +
			paddedIntPart +
			(paddedDecPart ? `.${paddedDecPart}` : '')
		).split('') as NumberSymbol[];
	}
</script>

<div class="number-editor">
	{#each digits as digit}
		<span class="mr-2">
			{#if digit === '.'}
				<div class="decimal-separator"></div>
			{:else}
				<DigitDisplay symbol={digit} />
			{/if}
		</span>
	{/each}
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
