<script lang="ts">
	import { user } from "../stores";
	import Users from "./user/Users.svelte";
</script>

<div>
	{#if $user != null}
		<h1>Welcome, {$user.firstName}.</h1>
		<a href="/user/{$user.id}/changepassword">Change Password</a>
		{#if $user.role === 'ADMIN'}
			<Users />
		{/if}
	{/if}
</div>
