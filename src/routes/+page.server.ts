import { dbConnect } from "$lib/dbConnect.js"

export async function load() {
	try {
		const db = await dbConnect()

		if (!db)
			return {
				error: "DB connection didn't set up",
			}

		const [tables] = await db.query("SHOW TABLES")

		return { tables }
	} catch (e) {
		return {
			error: (e as Error).message,
		}
	}
}
