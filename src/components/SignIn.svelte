<script lang="ts">
	import page from "page";
	import { AuthController } from "../controllers/AuthController";
	import { apiMessage } from "../stores";

	const controller: AuthController = new AuthController();
	let email: string = "";
	let password: string = "";

	const handleSignIn = async () => {
		console.log(email);
		await controller.signIn(email, password);

		console.log("hoi");
		if ($apiMessage !== null) {
			console.log($apiMessage);
		} else {
			page.redirect("/dashboard");
		}
	};
</script>

<form on:submit|preventDefault={handleSignIn}>
	<div>
		<h1>Sign In</h1>
		{#if $apiMessage}
			<div>
				<p>{$apiMessage}</p>
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
