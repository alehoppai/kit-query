import { json, error } from "@sveltejs/kit"
import { dbConnect } from "$lib/dbConnect.js"

export async function POST({ request }) {
	const body = await request.json()

	try {
		const db = await dbConnect({ ...body, port: Number(body.port) })
		await db.ping()
		await db.end()
		return json({})
	} catch (e) {
		return error(500, (e as Error).message)
	}
}
