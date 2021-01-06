import page from "page";
import { Controller } from "./Controller";
import type { NewUser } from '../models/NewUser';
import { apiMessage, user } from "../stores";

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

		const res: Response = await fetch("https://localhost:7000/api/auth/refresh", {
			method: "POST",
			headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + jwt }
		});
		const data: any = await res.json();

		if (res.status !== 200) {
			user.set(null);
			return false;
		}

		this.setCookie("jwt", data.jwt, 5);
		user.set(data.user);
		apiMessage.set(null);
		return true;
	}

	/**
	 * Authenticates the user.
	 * @param email - The user's email.
	 * @param password - The user's password.
	 * @returns Error messages if there are any. Returns null in case of a succesful authentication.
	 */
	public async signIn(email: string, password: string): Promise<void> {
		const res: Response = await fetch("https://localhost:7000/api/auth/signin", {
			method: "POST",
			mode: "cors",
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email: email, password: password })
		});
		const data: any = await res.json();

		if (res.status !== 200) {
			apiMessage.set(JSON.stringify(data.errors));
			return;
		}

		this.setCookie("jwt", data.jwt, 5);
		user.set(data.user);
		apiMessage.set(null);
	}

	public signOut(): void {
		this.deleteCookie("jwt");
		user.set(null);
		apiMessage.set(null);
	}

	/**
	 * Authenticates the user.
	 * @param newUser - New user object.
	 * @returns Error messages if there are any. In case of a succesful sign up, nothing is 
	 * returned.
	 */
	public async signUp(newUser: NewUser): Promise<void> {
		const res: Response = await fetch("https://localhost:7000/api/auth/signup", {
			method: "POST",
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(newUser)
		});
		const data: any = await res.json();

		if (res.status !== 201) {
			apiMessage.set(JSON.stringify(data.errors));
			return;
		}

		this.setCookie("jwt", data.jwt, 5);
		user.set(data.user);
		apiMessage.set(null);
	}

}