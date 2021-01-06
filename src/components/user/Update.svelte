<script lang="ts">
	import page from "page";
	import { UserController } from "../../controllers/UserController";
	import { apiMessage, userEdit } from "../../stores";

	const controller: UserController = new UserController();
	const options: string[] = ["MEMBER", "ADMIN"];
	let selected: string = $userEdit.role;

	const handleSubmit = async (): Promise<void> => {
		await controller.updateUser($userEdit);
	};
	const handleCancel = (): void => {
		page.redirect("/dashboard");
	};
</script>

<form on:submit|preventDefault={handleSubmit}>
	<div>
		<h1>Update User</h1>
		{#if $apiMessage}
			<span>
				<p>{$apiMessage}</p>
			</span>
		{/if}

		<label for="id"><b>User ID</b></label>
		<span name="id">{$userEdit.id}</span>

		<label for="email"><b>Email</b></label>
		<input
			bind:value={$userEdit.email}
			type="email"
			placeholder="Enter Email"
			name="email"
			required />

		<label for="first-name"><b>First name</b></label>
		<input
			bind:value={$userEdit.firstName}
			type="text"
			placeholder="Enter first name"
			name="first-name"
			required />

		<label for="last-name"><b>Last name</b></label>
		<input
			bind:value={$userEdit.lastName}
			type="text"
			placeholder="Enter last name"
			name="last-name"
			required />

		<label for="role"><b>Role</b></label>
		<div name="role">
			{#each options as value}
				<label>
					<input type="radio" {value} bind:group={selected} />{value}
				</label>
			{/each}
		</div>

		<div>
			<button type="submit">Update</button>
			<button type="button" on:click={handleCancel}>Cancel</button>
		</div>
	</div>
</form>
