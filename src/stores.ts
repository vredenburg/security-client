import { writable } from 'svelte/store';

export const user = writable(null);
export const userEdit = writable(null);
export const activeRoute = writable({});
export const routes = writable({});
