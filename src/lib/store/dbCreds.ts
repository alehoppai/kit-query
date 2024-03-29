import { writable } from "svelte/store"
import type { DBCreds } from "$lib/types/db"
import * as ls from "$lib/localStorage"

type DBCredsStore = {
	creds: DBCreds[]
	connected: DBCreds | null

	checkError: string
	checkStatus: null | "pending" | "success" | "fail"

	setupError: string
	setupStatus: null | "pending" | "success" | "fail"

	formVisible: boolean
}

export const dbCredsStore = writable<DBCredsStore>({
	creds: ls.read<DBCreds[]>("dbCreds", []),
	connected: ls.read<DBCreds | null>("dbConnected", null),

	checkError: "",
	checkStatus: null,

	setupError: "",
	setupStatus: null,

	formVisible: false,
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

export function setupConnection(index: number) {
	dbCredsStore.update((state) => {
		ls.write<DBCreds>("dbConnected", state.creds[index])

		return {
			...state,
			connected: state.creds[index],
		}
	})
}

export function deleteConnection(index: number) {
	dbCredsStore.update((state) => {
		let connectedAboutToDelete = false

		if (state.connected) {
			const selected = state.creds[index]
			if (
				state.connected.database === selected.database &&
				state.connected.host === selected.host &&
				state.connected.password === selected.password &&
				state.connected.port === selected.port &&
				state.connected.user === selected.user
			) {
				connectedAboutToDelete = true
			}
		}

		const newCreds = state.creds.filter((_, i) => i !== index)

		ls.write<DBCreds[]>("dbCreds", newCreds)

		return {
			...state,
			connected: connectedAboutToDelete ? null : state.connected,
			creds: newCreds,
		}
	})
}
