<script>
	import { activeRoute, apiMessage } from "../stores";
	import { register } from "./Router.svelte";

	export let path = "/";
	export let component = null;
	export let middleware = [];

	let params = {};

	register({ path, component, middleware });

	$: if ($activeRoute.path === path) {
		apiMessage.set(null);
		params = $activeRoute.params;
	}
</script>

{#if $activeRoute.path === path}
	{#if $activeRoute.component}
		<svelte:component
			this={$activeRoute.component}
			{...$$restProps}
			{...params} />
	{:else}
		<slot {params} />
	{/if}
{/if}
