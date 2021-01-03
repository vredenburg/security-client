<script>
	import { activeRoute } from "../stores";
	import { register } from "./Router.svelte";

	// page.js catch all handler
	export let path = "*";
	export let component = null;

	register({ path, component, middleware: [] });
</script>

{#if $activeRoute.path === path}
	<svelte:component this={component} />
	<slot />
{/if}
