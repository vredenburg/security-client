import page from "page";
import { Controller } from "./Controller";
import type { NewUser } from '../models/NewUser';
import { user } from "../stores";

export class AuthController extends Controller {

	/**
	 * Validates the JWT cookie if set. If no cookie is found, the token has either expired or has 
	 * never been set. If the JWT cookie is set and valid, it will be refreshed.
	 * @returns True if the user is still authenticated, false if not.
	 */
	public async validateAuth(): Promise<boolean> {
		const jwt: string = this.getCookie("jwt");

		if (!jwt) {
			user.set(null);
			return false;
		}

		const res: Response = await fetch("http://localhost:7000/api/auth/refresh", {
			method: "POST",
			headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + jwt }
		});
		const data: any = await res.json();

		if (res.status !== 200) {
			console.log(data);
			user.set(null);
			return false;
		}

		this.setCookie("jwt", data.jwt, 5);
		user.set(data.user);
		return true;
	}

	// public async refresh(): Promise<void> {
	// 	const res: Response = await fetch("http://localhost:7000/api/auth/refresh", {
	// 		method: "POST",
	// 		headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.getCookie("jwt") }
	// 	});
	// 	const data: any = await res.json();

	// 	if (res.status !== 200) {
	// 		page.redirect("/");
	// 		return;
	// 	}

	// 	this.setCookie("jwt", data.jwt, 5);
	// 	user.set(data.user);
	// 	page.redirect("/dashboard");
	// }

	/**
	 * Authenticates the user.
	 * @param email - The user's email.
	 * @param password - The user's password.
	 * @returns Error messages if there are any. Returns null in case of a succesful authentication.
	 */
	public async signIn(email: string, password: string): Promise<string | null> {
		const res: Response = await fetch("http://localhost:7000/api/auth/signin", {
			method: "POST",
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email: email, password: password })
		});
		const data: any = await res.json();

		if (res.status !== 200) {
			return data.errors;
		}

		this.setCookie("jwt", data.jwt, 5);
		user.set(data.user);
		return null;
	}

	public signOut(): void {
		this.deleteCookie("jwt");
		user.set(null);
	}

	/**
	 * Authenticates the user.
	 * @param newUser - New user object.
	 * @returns Error messages if there are any. In case of a succesful sign up, nothing is 
	 * returned.
	 */
	public async signUp(newUser: NewUser): Promise<string | undefined> {
		const res: Response = await fetch("http://localhost:7000/api/auth/signup", {
			method: "POST",
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(newUser)
		});
		const data: any = await res.json();

		if (res.status !== 201) {
			console.log(data.errors);
			return data.errors;
		}

		this.setCookie("jwt", data.jwt, 5);
		user.set(data.user);
	}

}