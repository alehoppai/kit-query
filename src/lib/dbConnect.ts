import mysql from "mysql2/promise"
import type { DBCreds } from "./types/db"

let cachedDB: mysql.Connection | null = null

export async function dbConnect(args?: DBCreds) {
	if (!cachedDB && args) {
		cachedDB = await mysql.createConnection(args)
	}

	return cachedDB
}
