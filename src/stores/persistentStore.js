// src/stores/persistentStore.js
import { writable } from 'svelte/store';
import { browser } from '$app/environment'; // For SvelteKit, to ensure browser context

export function persistentStore(key, initialValue) {
	// Get initial value from localStorage if available, otherwise use the provided initialValue
	const storedValue = browser && localStorage.getItem(key);
	let value;
	try {
		value = storedValue ? JSON.parse(storedValue) : initialValue;
	} catch(e) {
		value = "";
	}

	const store = writable(value);

	// Subscribe to changes in the store and update localStorage
	store.subscribe((currentValue) => {
		if (browser) {
			localStorage.setItem(key, JSON.stringify(currentValue));
		}
	});

	return store;
}