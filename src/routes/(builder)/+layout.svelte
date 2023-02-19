<script>
	import Header from '$lib/components/header.svelte';
	import Footer from '$lib/components/footer.svelte';
	import { setContext } from 'svelte';

	setContext('setListener', setListener);
	setContext('execute', execute);

	/** @type {any} */
	let comps = {};

	/**
	 * @param {string} name
	 * @param {function} callback
	 */
	function setListener(name, callback) {
		comps[name] = callback;
	}

	/**
	 * @param {string} name
	 * @param {string} cmd
	 * @param {any} data
	 */
	function execute(name, cmd, data) {
		comps[name](cmd, data);
	}
</script>

<Header />
<div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
	<slot />
</div>
<Footer />
