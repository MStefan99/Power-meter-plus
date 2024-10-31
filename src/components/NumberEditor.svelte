<script lang="ts">
	interface Props {
		integer?: number;
		separator?: string;
		decimal?: number;
		value: number;
	}

	let { integer = 1, separator = '', decimal = 0, value = $bindable(0) }: Props = $props();

	let integerPart = $derived(Math.trunc(value));
	let decimalPart = $derived(value % 1);
</script>

<div class="number-editor">
	<span
		>{integerPart.toString().padStart(integer, '0')}{separator}{decimalPart
			.toString()
			.replace('0.', '')
			.substring(0, decimal)
			.padEnd(decimal, '0')}</span
	>
</div>
