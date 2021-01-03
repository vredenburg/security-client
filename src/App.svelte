<script lang="ts">
	import page from "page";
	import Router from "./pager/Router.svelte";
	import Route from "./pager/Route.svelte";
	import NotFound from "./pager/NotFound.svelte";
	import Dashboard from "./components/Dashboard.svelte";
	import SignIn from "./components/SignIn.svelte";
	import SignUp from "./components/SignUp.svelte";
	import SignOut from "./components/SignOut.svelte";
	import Create from "./components/user/Create.svelte";
	import Update from "./components/user/Update.svelte";
	import UpdatePassword from "./components/user/UpdatePassword.svelte";
	import Home from "./components/Home.svelte";
	import { user, userEdit } from "./stores";
	import { AuthController } from "./controllers/AuthController";

	const controller: AuthController = new AuthController();

	const guard = async (ctx, next): Promise<void> => {
		if (!(await controller.validateAuth())) {
			page.redirect("/signin");
		} else {
			next();
		}
	};

	const requiresUserEdit = (ctx, next): void => {
		if ($userEdit === null) {
			page.redirect("/dashboard");
		} else {
			next();
		}
	};

	const skip = async (ctx, next): Promise<void> => {
		if (await controller.validateAuth()) {
			page.redirect("/dashboard");
		} else {
			next();
		}
	};
</script>

<main>
	<nav>
		<a href="/">home</a>
		<a href="/dashboard">Dashboard</a>
		{#if $user === null}
			<a href="/signin">Sign In</a>
			<a href="/signup">Sign Up</a>
		{:else}<a href="/signout">Sign Out</a>{/if}
	</nav>

	<Router>
		<Route path="/" component={Home} />
		<Route path="/signin" component={SignIn} middleware={[skip]} />
		<Route path="/signup" component={SignUp} />
		<Route path="/signout" component={SignOut} />
		<Route path="/dashboard" component={Dashboard} middleware={[guard]} />
		<Route
			path="/dashboard/create"
			component={Create}
			middleware={[guard]} />
		<Route
			path="/user/:userId/update"
			{$userEdit}
			component={Update}
			middleware={[guard, requiresUserEdit]} />
		<Route
			path="/user/:userId/changepassword"
			component={UpdatePassword}
			middleware={[guard]} />
		<NotFound>
			<h2>Sorry. Page not found.</h2>
		</NotFound>
	</Router>
</main>
