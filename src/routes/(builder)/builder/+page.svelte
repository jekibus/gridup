<script>
	import Grid from '$lib/grid/index.svelte';
	import gridHelp from '$lib/grid/utils/helper';
	import { getContext } from 'svelte';

	const id = () => Math.round(Math.random() * 1000);

	const setListener = getContext('setListener');

	setListener('page', listener);

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

	// let items = JSON.parse(`[{"12":{"fixed":false,"resizable":true,"draggable":true,"customDragger":false,"customResizer":false,"min":{"w":1,"h":1},"max":{},"x":0,"y":0,"w":2,"h":2},"render":"testing","id":948},{"12":{"fixed":false,"resizable":true,"draggable":true,"customDragger":false,"customResizer":false,"min":{"w":1,"h":1},"max":{},"x":2,"y":0,"w":2,"h":1},"id":865}]`)

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

	/**
	 * @param {object} options
	 */
	function buildGrid(options) {
		const ser = JSON.stringify(items);
		console.log(ser);
		console.log(options);
	}

	/**
	 * @param {string} cmd
	 * @param {object} data
	 */
	function listener(cmd, data) {
		switch (cmd) {
			case 'build':
				buildGrid(data);
				break;

			default:
				break;
		}
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
