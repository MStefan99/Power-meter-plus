<script>
	// let { digit } = $props();

	const segments = String.fromCharCode(
		...new Array(7).fill(0).map((v, i) => i + 'a'.charCodeAt(0))
	);
</script>

<div class="digit">
	{#each segments as segment}
		<div class="segment {segment}"></div>
	{/each}
</div>

<style>
	.digit {
		--height: 100px;
		--segment-width: 10px;

		--s-long: calc((var(--height) - 3 * var(--segment-width)) / 2);
		--s-short: var(--segment-width);
		--bg: var(--color, #0f0);
		--digit-skew: -8deg;

		transform: skewX(var(--digit-skew));
		height: var(--height);
		width: calc(var(--s-long) + 2 * var(--s-short));
	}

	.segment {
		background-color: var(--bg);
		border-radius: 2px;
		position: absolute;
		box-shadow: 0 0 calc(var(--segment-width) / 2) calc(0px - var(--segment-width) / 8) var(--bg);
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
