<script lang="ts">
	import page from "page";
	import { UserController } from "../../controllers/UserController";
	import { NewUser } from "../../models/NewUser";
	import { apiMessage } from "../../stores";

	const controller: UserController = new UserController();
	const options: string[] = ["MEMBER", "ADMIN"];

	let newUser: NewUser = new NewUser();
	let selected: string = "MEMBER";

	const handleSubmit = async (): Promise<void> => {
		await controller.createUser(newUser);
	};
	const handleCancel = (): void => {
		page.redirect("/dashboard");
	};
</script>

<form on:submit|preventDefault={handleSubmit}>
	<div>
		<h1>Create new user</h1>
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
		<label for="role"><b>Role</b></label>
		<div name="role">
			{#each options as value}
				<label>
					<input type="radio" {value} bind:group={selected} />{value}
				</label>
			{/each}
		</div>
		<div>
			<button type="submit">Create</button>
			<button type="button" on:click={handleCancel}>Cancel</button>
		</div>
	</div>
</form>
