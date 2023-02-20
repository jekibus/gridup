<script>
	import Grid from '$lib/grid/index.svelte';
	import home from '../../../pages/home.json';
	import { getContext, onMount } from 'svelte';
	import gridHelp from '$lib/grid/utils/helper';

	

	/**
	 * @type {any}
	 */
	let items;
	/**
	 * @type {any}
	 */
	let cols;

	const setListener = getContext('setListener');

	setListener('page', listener);

	onMount(() => {
		items = home?.grid?.items;
		cols = home?.grid?.cols;
	})

	/**
	 * @type {{ [x: string]: any; }}
	 */
	let paths = {};

	/**
	 * @param {string} path
	 */
	async function renderItem(path) {
		const pathKey = path.replace(/\//g, '_')
		if (paths[pathKey]) return paths[pathKey];
		path = `../../../${path}.svelte`
		const p = (await import(path)).default;
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
			case 'add_grid':
				add();
				break;
			default:
				break;
		}
	}

	function id() {
		return Math.round(Math.random()*1000);
	}

	function add() {
		const c = 12;
		/** @type {any} */
		let newItem = {
			[c]: gridHelp.item({
				w: 1,
				h: 1,
				x: 0,
				y: 0,
				customDragger: true,
			}),
			render: "tag/button",
			id: id(),
		};

		let findOutPosition = gridHelp.findSpace(newItem, items, c);

		newItem = {
			...newItem,
			[c]: {
				...newItem[c],
				...findOutPosition,
			},
		};

		items = [...items, ...[newItem]];
	}

	/**
	 * @param {any} item
	 */
	function remove (item) {
		items = items.filter((/** @type {{ id: any; }} */ value) => value.id !== item.id);
	};
</script>

<div class="demo-container">
	{#if items && cols}
	<Grid bind:items rowHeight={62} let:item let:dataItem {cols} fastStart={true}  let:movePointerDown>
		<button class="absolute top-0 left-0 z-50 px-2 border border-dashed border-transparent text-transparent hover:text-gray-600 hover:border-gray-600 hover:bg-white rounded-full" on:pointerdown={e => e.stopPropagation()}
			on:click={() => remove(dataItem)}
			>
			✕
		</button>
		{#if item.customDragger}
		<button class="absolute top-0 right-0 z-50 px-2 border border-dashed border-transparent text-transparent hover:text-gray-600 hover:border-gray-600 hover:bg-white rounded-full" on:pointerdown={movePointerDown}
			>
			<span class="relative font-extrabold" style="top: -2px">&#8759;</span>
		</button>
		{/if}
		{#if dataItem.render}
			{#await renderItem(dataItem.render) then Module}
				<Module />
			{/await}
		{/if}
		<!-- <div class="demo-widget">{dataItem.id}</div> -->
	</Grid>
	{/if}
</div>
