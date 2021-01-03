export class NewUser {
	email: string;
	firstName: string;
	lastName: string;
	password: string;
	passwordRepeat: string;

	constructor() {
		this.email = "";
		this.firstName = "";
		this.lastName = "";
		this.password = "";
		this.passwordRepeat = "";
	}

	passwordsMatch(): boolean {
		return this.password === this.passwordRepeat;
	}
}