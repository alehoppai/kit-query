import mysql from "mysql2"
import type { DBCreds } from "./types/db"

export function dbConnect(args: DBCreds) {
	return mysql.createConnection(args)
}
