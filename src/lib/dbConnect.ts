import mysql from "mysql2/promise"
import type { DBCreds } from "./types/db"

export async function dbConnect(args: DBCreds) {
	return await mysql.createConnection(args)
}
