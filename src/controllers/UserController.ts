import { Controller } from "./Controller"
import type { NewUser } from "../models/NewUser";
import type { User } from "../models/User";

export class UserController extends Controller {

	public async getUserById(userId: string): Promise<User> {
		const res: Response = await fetch("http://localhost:7000/api/users/" + userId, {
			method: "GET",
			headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.getCookie("jwt") }
		});

		if (res.status !== 200) {
			const errors = await res.json();
			return errors.errors;
		}
		else {
			const data: User = await res.json();
			return data;
		}
	}

	public async listUsers(): Promise<User[]> {
		const res: Response = await fetch("http://localhost:7000/api/users/", {
			method: "GET",
			headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.getCookie("jwt") }
		});

		if (res.status !== 200) {
			const errors = await res.json();
			return errors.errors;
		}
		else {
			const data: User[] = await res.json();
			return data;
		}
	}

	public async createUser(newUser: NewUser): Promise<string> {
		const res: Response = await fetch("http://localhost:7000/api/users/", {
			method: "POST",
			headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.getCookie("jwt") },
			body: JSON.stringify(newUser)
		});

		if (res.status !== 201) {
			const data: any = await res.json();
			return data.errors;
		}
		else {
			return "User created succesfully.";
		}
	}

	public async updateUser(user: User): Promise<string> {
		const res: Response = await fetch("http://localhost:7000/api/users/" + user.id, {
			method: "PUT",
			headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.getCookie("jwt") },
			body: JSON.stringify(user)
		});

		if (res.status !== 200) {
			const data: any = await res.json();
			return data.errors;
		}
		else {
			return "User updated succesfully.";
		}
	}

	public async updateUserPassword(userId: string, passwordOld: string, passwordNew: string): Promise<string> {
		const res: Response = await fetch("http://localhost:7000/api/users/" + userId + "/password_change", {
			method: "POST",
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ id: userId, old: passwordOld, new: passwordNew })
		});

		if (res.status !== 200) {
			const data: any = await res.json();
			return data.errors;
		}
		else {
			return "Password changed succesfully.";
		}
	}

	public async deleteUser(userId: string): Promise<string> {
		const res: Response = await fetch("http://localhost:7000/api/users/" + userId, {
			method: "DELETE",
			headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.getCookie("jwt") }
		});

		if (res.status !== 200) {
			const data: any = await res.json();
			return data.errors;
		}
		else {
			return "User deleted succesfully.";
		}
	}

}