import { json, error } from "@sveltejs/kit"
import { dbConnect } from "$lib/dbConnect.js"

// TODO: Execute queries sent trhough POST body
export async function POST() {
	try {
		const db = await dbConnect()

		if (!db) {
			return error(500, { message: "Connection is null" })
		}

		await db.ping()
		return json({})
	} catch (e) {
		return error(500, (e as Error).message)
	}
}
