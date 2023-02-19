<script>
	import { getContext } from 'svelte';
	import { onMount } from 'svelte';

	const setListener = getContext('setListener');
	const execute = getContext('execute');

	onMount(() => {
		setListener('header', listener);
	});

	/**
	 * @param {string} cmd
	 * @param {any} data
	 */
	function listener(cmd, data) {
		console.log(cmd, data);
	}

	function onBuildClicked() {
		execute('page', 'build', { save: true });
	}
</script>

<nav class="bg-gray-100">
	<div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
		<div class="relative flex h-16 items-center justify-between">
			<div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
				<div class="flex flex-shrink-0 items-center">
					<p>Buildup</p>
				</div>
				<div class="hidden sm:ml-6 sm:block">
					<div class="flex space-x-4">
						<a
							href="/"
							class="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
							aria-current="page">Dashboard</a
						>

						<a
							href="/"
							class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
							>Team</a
						>

						<a
							href="/"
							class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
							>Projects</a
						>

						<a
							href="/"
							class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
							>Calendar</a
						>
					</div>
				</div>
			</div>
			<div
				class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
			>
				<div class="relative ml-3">
					<div>
						<button
							on:click={onBuildClicked}
							type="button"
							class="p-2 px-5 flex rounded-full bg-gray-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
							id="user-menu-button"
							aria-expanded="false"
							aria-haspopup="true"
						>
							Build
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</nav>
