<script context="module">
	const routes = {};

	export function register(route) {
		routes[route.path] = route;
	}
</script>

<script>
	import { onMount, onDestroy } from "svelte";
	import page from "page";
	import { activeRoute } from "../stores";

	const last = (route) => {
		return function (ctx) {
			$activeRoute = { ...route, params: ctx.params };
		};
	};

	const setupPage = () => {
		for (let [path, route] of Object.entries(routes)) {
			page(path, ...route.middleware, last(route));
		}
		page.start();
	};

	onMount(setupPage);

	onDestroy(page.stop);
</script>

<slot />
