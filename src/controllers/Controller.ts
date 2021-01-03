export class Controller {
	protected getCookie(name: string): string | null {
		const nameLenPlus: number = (name.length + 1);

		return document.cookie
			.split(';')
			.map(c => c.trim())
			.filter(cookie => {
				return cookie.substring(0, nameLenPlus) === `${name}=`;
			})
			.map(cookie => {
				return decodeURIComponent(cookie.substring(nameLenPlus));
			})[0] || null;
	}

	protected setCookie(name: string, data: any, minutes: number): void {
		const date: Date = new Date();
		date.setTime(date.getTime() + minutes * 60 * 1000)
		const expires: string = "; expires=" + date.toUTCString() + "; path=/";

		document.cookie = "jwt=" + data + expires;
	}

	protected deleteCookie(name: string): void {
		document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
	}
}