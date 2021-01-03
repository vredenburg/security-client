<script lang="ts">
	import page from "page";
	import { user } from "../stores";
	import { AuthController } from "../controllers/AuthController";

	const controller: AuthController = new AuthController();
	let serverError: string = undefined;
	let email: string = "";
	let password: string = "";

	const handleSignIn = async () => {
		serverError = await controller.signIn(email, password);

		console.log("hoi");
		if (serverError !== null) {
			console.log(serverError);
		} else {
			page.redirect("/dashboard");
		}

		// controller.signIn(email, password).then((errors) => {
		// 	console.log("hoi");
		// 	if (errors !== null) {
		// 		console.log(errors);
		// 		serverError = errors;
		// 	} else {
		// 		page.redirect("/dashboard");
		// 	}
		// });
	};

	// $: if ($user !== null) {
	// 	page.redirect("/dashboard");
	// }
</script>

<form on:submit|preventDefault={handleSignIn}>
	<div>
		<h1>Sign In</h1>
		{#if serverError}
			<div>
				<p>{serverError}</p>
			</div>
		{/if}
		<label for="email"><b>Email</b></label>
		<input
			bind:value={email}
			type="email"
			name="email"
			placeholder="Enter Email"
			required />

		<label for="password"><b>Password</b></label>
		<input
			bind:value={password}
			type="password"
			name="password"
			placeholder="Enter Password"
			required />

		<div>
			<button type="submit">Login</button>
			<button type="button">Cancel</button>
		</div>
	</div>
</form>
