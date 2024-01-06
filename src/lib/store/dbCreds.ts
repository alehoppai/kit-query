import { writable } from "svelte/store"
import type { DBCreds } from "$lib/types/db"
import * as ls from "$lib/localStorage"

type DBCredsStore = {
	creds: DBCreds[]
	selected: DBCreds | null
	connected: DBCreds | null
}

export const dbCredsStore = writable<DBCredsStore>({
	creds: ls.read<DBCreds[]>("dbCreds", []),
	selected: null,
	connected: null,
})
