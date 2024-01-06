import { writable } from "svelte/store"
import type { DBCreds } from "$lib/types/db"
import * as ls from "$lib/localStorage"

type DBCredsStore = {
	creds: DBCreds[]
	connected: DBCreds | null
}

export const dbCredsStore = writable<DBCredsStore>({
	creds: ls.read<DBCreds[]>("dbCreds", []),
	connected: null,
})

// TODO: hash password. NOT REQUIRED ON THIS STAGE
// And I don't roadmap, so don't care for now.
// THINK about moving creds to creating .env file by server
// With [CUSTOM_NAME]_[DB_TYPE]_HOST etc...
// in that case don't hash password
export function saveConnection(creds: DBCreds) {
	dbCredsStore.update((state) => {
		const existingIndex = state.creds.findIndex(
			(existingCreds) =>
				existingCreds.database === creds.database &&
				existingCreds.host === creds.host &&
				existingCreds.password === creds.password &&
				existingCreds.port === creds.port &&
				existingCreds.user === creds.user
		)

		if (existingIndex >= 0) return state

		const newCreds = [...state.creds, creds]

		ls.write<DBCreds[]>("dbCreds", newCreds)

		return {
			...state,
			creds: newCreds,
		}
	})
}
