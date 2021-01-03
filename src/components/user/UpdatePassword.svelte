<script lang="ts">
	import page from "page";
	import { UserController } from "../../controllers/UserController";

	const controller: UserController = new UserController();
	let apiMessage: string = undefined;
	let passwordOld: string = "";
	let passwordNew: string = "";

	const handleSubmit = async (): Promise<void> => {
		apiMessage = await controller.updateUserPassword(
			userId,
			passwordOld,
			passwordNew
		);
	};
	const handleCancel = (): void => {
		page.redirect("/dashboard");
	};

	export let userId: string;
</script>

<p>{userId}</p>
<form on:submit|preventDefault={handleSubmit}>
	<div>
		<h1>Change password</h1>
		{#if apiMessage}
			<span>
				<p>{apiMessage}</p>
			</span>
		{/if}

		<label for="psw"><b>Password</b></label>
		<input
			bind:value={passwordOld}
			type="password"
			name="psw"
			placeholder="Enter Old Password"
			required />

		<label for="psw-repeat"><b>Repeat Password</b></label>
		<input
			bind:value={passwordNew}
			type="password"
			name="psw-repeat"
			placeholder="Enter New Password"
			required />
		<div>
			<button type="submit">Sign Up</button>
			<button type="button" on:click={handleCancel}>Cancel</button>
		</div>
	</div>
</form>
