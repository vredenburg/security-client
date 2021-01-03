<script lang="ts">
	import page from "page";
	import { onMount } from "svelte";
	import { AuthController } from "../controllers/AuthController";

	const controller: AuthController = new AuthController();

	const handleSignOut = () => {
		controller.signOut();
		page.redirect("/");
	};

	onMount(handleSignOut);
</script>

<h2>Signing out...</h2>
