<script lang="ts">
	let { digit }: { digit: number } = $props();

	const table = [
		[1, 1, 1, 1, 1, 1, 0],
		[0, 1, 1, 0, 0, 0, 0],
		[1, 1, 0, 1, 1, 0, 1],
		[1, 1, 1, 1, 0, 0, 1],
		[0, 1, 1, 0, 0, 1, 1],
		[1, 0, 1, 1, 0, 1, 1],
		[1, 0, 1, 1, 1, 1, 1],
		[1, 1, 1, 0, 0, 0, 0],
		[1, 1, 1, 1, 1, 1, 1],
		[1, 1, 1, 1, 0, 1, 1]
	];
	const error = [1, 0, 0, 1, 1, 1, 1];

	const segments = String.fromCharCode(
		...new Array(7).fill(0).map((v, i) => i + 'a'.charCodeAt(0))
	);
</script>

<div class="digit">
	{#each segments as segment, i}
		<div class="segment {segment}" class:lit={table[digit]?.[i] ?? error[i]}></div>
	{/each}
</div>

<style>
	.digit {
		--h: var(--height, 100px);
		--segment-width: var(--segment, calc(var(--h) / 10));

		--s-long: calc((var(--h) - 3 * var(--segment-width)) / 2);
		--s-short: var(--segment-width);

		--bg: var(--color, #030);
		--bg-lit: var(--color-lit, #0f0);
		--digit-skew: -8deg;

		display: inline-block;
		transform: skewX(var(--digit-skew));
		height: var(--h);
		width: calc(var(--s-long) + 2 * var(--s-short));
	}

	.segment {
		background-color: var(--bg);
		border-radius: calc(var(--segment-width) / 4);
		position: absolute;
		transition: background-color 0.1s ease-out;
	}

	.segment.lit {
		background-color: var(--bg-lit);
		box-shadow: 0 0 min(calc(var(--segment-width)), 36px) calc(0px - var(--segment-width) / 8)
			var(--bg-lit);
	}

	.segment.a,
	.segment.d,
	.segment.g {
		width: var(--s-long);
		height: var(--s-short);
	}

	.segment.b,
	.segment.c,
	.segment.e,
	.segment.f {
		width: var(--s-short);
		height: var(--s-long);
	}

	.segment.a {
		left: var(--s-short);
	}

	.segment.b {
		top: var(--s-short);
		right: 0;
	}

	.segment.c {
		bottom: var(--s-short);
		right: 0;
	}

	.segment.d {
		left: var(--s-short);
		bottom: 0;
	}

	.segment.e {
		bottom: var(--s-short);
	}

	.segment.f {
		top: var(--s-short);
	}

	.segment.g {
		top: calc(var(--s-short) + var(--s-long));
		left: var(--s-short);
	}
</style>
