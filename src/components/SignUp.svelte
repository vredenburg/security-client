<script lang="ts">
	import page from "page";
	import { AuthController } from "../controllers/AuthController";
	import { NewUser } from "../models/NewUser";
	import { apiMessage } from "../stores";

	let newUser: NewUser = new NewUser();
	const controller: AuthController = new AuthController();

	const handleSignUp = async () => {
		await controller.signUp(newUser);

		console.log("hoi");
		if ($apiMessage !== null) {
			console.log($apiMessage);
		} else {
			page.redirect("/dashboard");
		}
	};

	// $: if ($user !== null) {
	// 	page.redirect("/dashboard");
	// }
</script>

<form on:submit|preventDefault={handleSignUp}>
	<div>
		<h1>Sign Up</h1>
		{#if $apiMessage}
			<span>
				<p>{$apiMessage}</p>
			</span>
		{/if}

		<label for="email"><b>Email</b></label>
		<input
			bind:value={newUser.email}
			type="email"
			placeholder="Enter Email"
			name="email"
			required />

		<label for="first-name"><b>First name</b></label>
		<input
			bind:value={newUser.firstName}
			type="text"
			placeholder="Enter first name"
			name="first-name"
			required />

		<label for="last-name"><b>Last name</b></label>
		<input
			bind:value={newUser.lastName}
			type="text"
			placeholder="Enter last name"
			name="last-name"
			required />

		<label for="psw"><b>Password</b></label>
		<input
			bind:value={newUser.password}
			type="password"
			name="psw"
			placeholder="Enter Password"
			required />

		<label for="psw-repeat"><b>Repeat Password</b></label>
		<input
			bind:value={newUser.passwordRepeat}
			type="password"
			name="psw-repeat"
			placeholder="Repeat Password"
			required />
		{#if !newUser.passwordsMatch() && newUser.passwordRepeat != ''}
			<span> Passwords don't match. </span>
		{/if}
		<div>
			<button type="submit">Sign Up</button>
			<button type="button">Cancel</button>
		</div>
	</div>
</form>
