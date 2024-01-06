<script lang="ts">
	import { Icon, Wifi, ArrowPath, ExclamationCircle, CheckCircle } from "svelte-hero-icons"
	import { dbCredsStore, saveConnection } from "$lib/store/dbCreds"
	import { createEventDispatcher } from "svelte"

	const dispatch = createEventDispatcher()

	export let formVisible = false

	let host = "localhost"
	let port = "3306"
	let user = ""
	let password = ""
	let database = ""

	let testStatusIcon = Wifi
	let testStatusColor = "text-blue-500"

	$: switch ($dbCredsStore.status) {
		case "pending":
			testStatusIcon = ArrowPath
			testStatusColor = "text-slate-400"
			break
		case "fail":
			testStatusIcon = ExclamationCircle
			testStatusColor = "text-red-500"
			break
		case "success":
			testStatusIcon = CheckCircle
			testStatusColor = "text-green-500"
			break
		case null:
			testStatusColor = "text-blue-500"
			testStatusIcon = Wifi
			$dbCredsStore.error = ""
			break
	}

	$: formData = { host, port, user, password, database }

	async function testConnection() {
		if ($dbCredsStore.status === "pending") return

		$dbCredsStore.status = "pending"
		const res = await fetch("/api/check-db-connection", {
			method: "POST",
			body: JSON.stringify(formData),
		})
		const json = await res.json()
		console.log(res.status, json)

		if (res.status === 500) {
			$dbCredsStore.error = json.message
			$dbCredsStore.status = "fail"
			return
		}

		$dbCredsStore.status = "success"
	}

	function submitConnection() {
		saveConnection({ ...formData, port: Number(formData.port) })
		host = "localhost"
		port = "3306"
		user = ""
		password = ""
		database = ""
		dispatch("hideForm")
	}
</script>

<form
	class="bg-slate-100 p-2 w-full absolute left-0 min-h-full translate-x-full transition-transform flex flex-col items-center gap-2 pb-4"
	class:translate-x-0={formVisible}
	on:submit|preventDefault={submitConnection}
>
	<input
		class="bg-transparent text-slate-900 px-4 py-2 border-b border-slate-400 outline-none focus:border-slate-600"
		type="text"
		value={host}
		on:input={(e) => (host = e.currentTarget.value)}
		placeholder="Host"
	/>
	<input
		class="bg-transparent text-slate-900 px-4 py-2 border-b border-slate-400 outline-none focus:border-slate-600"
		type="text"
		value={port}
		on:input={(e) => (port = e.currentTarget.value)}
		placeholder="Port"
	/>
	<input
		class="bg-transparent text-slate-900 px-4 py-2 border-b border-slate-400 outline-none focus:border-slate-600"
		type="text"
		value={user}
		on:input={(e) => (user = e.currentTarget.value)}
		placeholder="User"
	/>
	<input
		class="bg-transparent text-slate-900 px-4 py-2 border-b border-slate-400 outline-none focus:border-slate-600"
		type="password"
		value={password}
		on:input={(e) => (password = e.currentTarget.value)}
		placeholder="Password"
	/>
	<input
		class="bg-transparent text-slate-900 px-4 py-2 border-b border-slate-400 outline-none focus:border-slate-600"
		type="text"
		value={database}
		on:input={(e) => (database = e.currentTarget.value)}
		placeholder="Database"
	/>

	<div class="flex-1"></div>

	<div class="flex flex-row items-center justify-between gap-12">
		<button type="submit">
			<span class="text-blue-500 font-semibold">Save</span>
		</button>

		<button
			type="button"
			class="flex flex-row justify-center items-center gap-1"
			class:cursor-not-allowed={$dbCredsStore.status === "pending"}
			disabled={$dbCredsStore.status === "pending"}
			on:click={testConnection}
		>
			<span class="{testStatusColor} font-semibold">Test</span>
			<Icon
				src={testStatusIcon}
				class="w-6 h-6 {testStatusColor} {$dbCredsStore.status === 'pending' && 'animate-spin'}"
			/>
		</button>
	</div>
</form>
