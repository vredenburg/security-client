import { Controller } from "./Controller"
import type { NewUser } from "../models/NewUser";
import type { User } from "../models/User";
import { apiMessage } from "../stores";

export class UserController extends Controller {

	public async getUserById(userId: string): Promise<User | undefined> {
		const res: Response = await fetch("https://localhost:7000/api/users/" + userId, {
			method: "GET",
			headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.getCookie("jwt") }
		});
		const data: any = await res.json();

		if (res.status !== 200) {
			apiMessage.set(JSON.stringify(data.errors));
			return;
		}

		apiMessage.set(null);
		return data;
	}

	public async listUsers(): Promise<User[] | undefined> {
		const res: Response = await fetch("https://localhost:7000/api/users/", {
			method: "GET",
			headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.getCookie("jwt") }
		});
		const data: any = await res.json();

		if (res.status !== 200) {
			apiMessage.set(JSON.stringify(data.errors));
			return;
		}

		apiMessage.set(null);
		return data;
	}

	public async createUser(newUser: NewUser): Promise<void> {
		const res: Response = await fetch("https://localhost:7000/api/users/", {
			method: "POST",
			headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.getCookie("jwt") },
			body: JSON.stringify(newUser)
		});

		if (res.status !== 201) {
			const data: any = await res.json();
			apiMessage.set(JSON.stringify(data.errors));
			return;
		}

		apiMessage.set("User created succesfully.");
	}

	public async updateUser(user: User): Promise<void> {
		const res: Response = await fetch("https://localhost:7000/api/users/" + user.id, {
			method: "PUT",
			mode: "cors",
			headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.getCookie("jwt") },
			body: JSON.stringify(user)
		});

		if (res.status !== 200) {
			const data: any = await res.json();
			apiMessage.set(JSON.stringify(data.errors));
			return;
		}

		apiMessage.set("User updated succesfully.");
	}

	public async updateUserPassword(userId: string, passwordOld: string, passwordNew: string): Promise<null> {
		const res: Response = await fetch("https://localhost:7000/api/users/" + userId + "/password_change", {
			method: "POST",
			headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.getCookie("jwt") },
			body: JSON.stringify({ id: userId, old: passwordOld, new: passwordNew })
		});

		if (res.status !== 200) {
			const data: any = await res.json();
			console.log(JSON.stringify(data.errors));
			apiMessage.set(JSON.stringify(data.errors));
			return;
		}

		apiMessage.set("Password changed succesfully.");
	}

	public async deleteUser(userId: string): Promise<void> {
		const res: Response = await fetch("https://localhost:7000/api/users/" + userId, {
			method: "DELETE",
			headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.getCookie("jwt") }
		});

		if (res.status !== 200) {
			const data: any = await res.json();
			apiMessage.set(JSON.stringify(data.errors));
			return;
		}

		apiMessage.set("User deleted succesfully.");
	}

}