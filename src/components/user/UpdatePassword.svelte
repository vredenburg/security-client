<script lang="ts">
	import page from "page";
	import { UserController } from "../../controllers/UserController";
	import { apiMessage } from "../../stores";

	const controller: UserController = new UserController();
	let passwordOld: string = "";
	let passwordNew: string = "";

	const handleSubmit = async (): Promise<void> => {
		await controller.updateUserPassword(userId, passwordOld, passwordNew);
	};
	const handleCancel = (): void => {
		page.redirect("/dashboard");
	};

	export let userId: string;
</script>

<form on:submit|preventDefault={handleSubmit}>
	<div>
		<h1>Change password</h1>
		{#if $apiMessage}
			<span>
				<p>{$apiMessage}</p>
			</span>
		{/if}

		<label for="id"><b>User ID</b></label>
		<p name="id">{userId}</p>

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
			<button type="submit">Change password</button>
			<button type="button" on:click={handleCancel}>Cancel</button>
		</div>
	</div>
</form>
