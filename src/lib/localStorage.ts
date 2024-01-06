import { browser } from "$app/environment"

export function write<T>(key: string, data: T) {
	if (!browser) return

	localStorage.setItem(key, JSON.stringify(data))
}

export function read<T>(key: string, fallback: T): T {
	if (!browser) return fallback

	const item = localStorage.getItem(key)

	if (!item) return fallback

	return JSON.parse(item) as T
}
