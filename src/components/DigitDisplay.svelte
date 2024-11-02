<script lang="ts">
	const digits = [
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
	const symbols = {
		A: [1, 1, 1, 0, 1, 1, 1],
		C: [1, 0, 0, 1, 1, 1, 0],
		E: [1, 0, 0, 1, 1, 1, 1],
		F: [1, 0, 0, 0, 1, 1, 1],
		G: [1, 0, 1, 1, 1, 1, 0],
		H: [0, 1, 1, 0, 1, 1, 1],
		I: [0, 1, 1, 0, 0, 0, 0],
		J: [0, 1, 1, 1, 1, 0, 0],
		L: [0, 0, 0, 1, 1, 1, 0],
		Ml: [1, 1, 0, 0, 1, 1, 0],
		Mr: [1, 1, 1, 0, 0, 1, 0],
		N: [1, 1, 1, 0, 1, 1, 0],
		O: [1, 1, 1, 1, 1, 1, 0],
		P: [1, 1, 0, 0, 1, 1, 1],
		S: [1, 0, 1, 1, 0, 1, 1],
		U: [0, 1, 1, 1, 1, 1, 0],
		Wl: [0, 0, 1, 1, 1, 1, 0],
		Wr: [0, 1, 1, 1, 1, 0, 0],
		Z: [1, 1, 0, 1, 1, 0, 1],

		a: [1, 1, 1, 1, 1, 0, 1],
		b: [0, 0, 1, 1, 1, 1, 1],
		c: [0, 0, 0, 1, 1, 0, 1],
		d: [0, 1, 1, 1, 1, 0, 1],
		e: [1, 1, 0, 1, 1, 1, 1],
		g: [1, 1, 1, 1, 0, 1, 1],
		h: [0, 0, 1, 0, 1, 1, 1],
		i: [0, 0, 1, 0, 0, 0, 0],
		j: [0, 1, 1, 1, 0, 0, 0],
		l: [0, 0, 0, 0, 1, 1, 0],
		n: [0, 0, 1, 0, 1, 0, 1],
		o: [0, 0, 1, 1, 1, 0, 1],
		q: [1, 1, 1, 0, 0, 1, 1],
		r: [0, 0, 0, 0, 1, 0, 1],
		t: [0, 0, 0, 1, 1, 1, 1],
		u: [0, 0, 1, 1, 1, 0, 0],
		y: [0, 1, 1, 1, 0, 1, 1],

		'"': [0, 1, 0, 0, 0, 1, 0],
		"'": [0, 0, 0, 0, 0, 1, 0],
		'=': [0, 0, 0, 1, 0, 0, 1],
		'-': [0, 0, 0, 0, 0, 0, 1],
		_: [0, 0, 0, 1, 0, 0, 0],
		' ': [0, 0, 0, 0, 0, 0, 0]
	};

	let { symbol }: { symbol: number | keyof typeof symbols } = $props();

	const segments = String.fromCharCode(
		...new Array(7).fill(0).map((v, i) => i + 'a'.charCodeAt(0))
	);
</script>

<div class="digit">
	{#each segments as segment, i}
		<div
			class="segment {segment}"
			class:lit={typeof symbol === 'number'
				? (digits[symbol]?.[i] ?? symbols['E'][i])
				: (symbols[symbol]?.[i] ?? symbols['E'][i])}
		></div>
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
