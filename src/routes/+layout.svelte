<script>
	import '../app.css';
	import { onMount } from 'svelte';
	// import Default from "../layouts/Default.svelte";
	import { page } from '$app/stores';
	/**
	 * @type {typeof import("../layouts/Default.svelte").default | null}
	 */
	let renderLayout = null;

	const n = 'Default';

	onMount(async () => {
		renderLayout = (await import(`../layouts/${n}.svelte`)).default;
	});
</script>

{#if $page.url.pathname === '/builder'}
	<slot />
{:else if renderLayout}
	<svelte:component this={renderLayout}>
		<slot />
	</svelte:component>
{/if}
