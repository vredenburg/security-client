<script lang="ts">
	import { onMount } from "svelte";
	import page from "page";
	import { UserController } from "../../controllers/UserController";
	import type { User } from "../../models/User";
	import { user, userEdit } from "../../stores";

	const controller: UserController = new UserController();

	let users: User[] = null;
	let apiMessage: string = undefined;

	const handleUpdate = (user: User): void => {
		$userEdit = user;
		page.redirect("/user/" + user.id + "/update");
	};

	const handleDelete = async (userId: string): Promise<void> => {
		apiMessage = await controller.deleteUser(userId);
		// users.splice(
		// 	users.findIndex((user) => user.id === userId),
		// 	1
		// );
		users = await controller.listUsers();
	};

	onMount(async () => {
		users = await controller.listUsers();
	});
</script>

{#if users !== null}
	{#if apiMessage}
		<span>
			<p>{apiMessage}</p>
		</span>
	{/if}
	<table>
		<thead>
			<tr>
				<th>Email</th>
				<th>First Name</th>
				<th>Last Name</th>
				<th>Role</th>
				<th>Edit</th>
				<th>Delete</th>
			</tr>
		</thead>
		<tbody>
			{#each users as user}
				<tr>
					<td>{user.email}</td>
					<td>{user.firstName}</td>
					<td>{user.lastName}</td>
					<td>{user.role}</td>
					<td>
						<button
							on:click={() => handleUpdate(user)}>Edit</button>
					</td>
					<td>
						<button
							on:click={async () => await handleDelete(user.id)}>Delete</button>
					</td>
				</tr>
			{/each}
			<tr>
				<td><a href="/dashboard/create">New User</a></td>
			</tr>
		</tbody>
	</table>
{/if}
