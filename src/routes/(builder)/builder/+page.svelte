<script>
	import Grid from '$lib/grid/index.svelte';
	import gridHelp from '$lib/grid/utils/helper';

	const id = () => '_' + Math.random().toString(36).substr(2, 9);

	let items = [
		{
			12: gridHelp.item({
				x: 0,
				y: 0,
				w: 2,
				h: 2,
				draggable: true
			}),
			render: 'testing',
			id: id()
		},

		{
			12: gridHelp.item({
				x: 2,
				y: 0,
				w: 2,
				h: 1
			}),
			id: id()
		}
	];

	const cols = [[1100, 12]];

	/**
	 * @type {{ [x: string]: any; }}
	 */
	let paths = {};

	/**
	 * @param {string} path
	 */
	async function renderItem(path) {
		if (paths[path]) return paths[path];
		const p = (await import(`../../../widgets/${path}.svelte`)).default;
		paths[path] = p;
		return p;
	}
</script>

<a href="/">Back</a>
<div class="demo-container">
	<Grid bind:items rowHeight={50} let:item let:dataItem {cols} fastStart={true}>
		{#if dataItem.render}
			{#await renderItem(dataItem.render) then Module}
				<Module />
			{/await}
		{/if}
		<div class="demo-widget">{dataItem.id}</div>
	</Grid>
</div>
