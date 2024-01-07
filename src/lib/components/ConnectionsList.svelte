<script lang="ts">
	import { Icon, PlusCircle, EllipsisVertical } from "svelte-hero-icons"
	import { dbCredsStore, setupConnection, deleteConnection } from "$lib/store/dbCreds"

	let optionsVisibleFor: null | number = null

	// TODO: On app load retriev the connection creds for connected from LS
	// and Reconnect
	// connection works between page reloads, but not with server start!
	async function onSetupConnection() {
		if (optionsVisibleFor == null) return

		$dbCredsStore.setupStatus = "pending"
		const res = await fetch("/api/connect", {
			method: "POST",
			body: JSON.stringify($dbCredsStore.creds[optionsVisibleFor]),
		})
		const json = await res.json()

		if (res.status === 500) {
			$dbCredsStore.setupError = json.message
			$dbCredsStore.setupStatus = "fail"
			return
		}

		$dbCredsStore.setupStatus = "success"

		setupConnection(optionsVisibleFor)
		optionsVisibleFor = null
	}

	async function onDeleteConnection() {
		if (!optionsVisibleFor) return
		deleteConnection(optionsVisibleFor)
		optionsVisibleFor = null
	}

	// I'm doing it late night and I'm tired so fuck it
	// LET BE DUPES
	// TODO: refactor/combine with similar from store
	function isSelectedAlsoConnectedOne(i: number) {
		if (!$dbCredsStore.connected) return false

		const selected = $dbCredsStore.creds[i]

		return (
			$dbCredsStore.connected.database === selected.database &&
			$dbCredsStore.connected.host === selected.host &&
			$dbCredsStore.connected.password === selected.password &&
			$dbCredsStore.connected.port === selected.port &&
			$dbCredsStore.connected.user === selected.user
		)
	}
</script>

<div class="bg-slate-100 p-2 w-full border-r border-slate-500">
	{#if !$dbCredsStore.creds.length}
		<button
			class="flex flex-row justify-center items-center w-full gap-2"
			on:click={() => ($dbCredsStore.formVisible = true)}
		>
			<Icon src={PlusCircle} class="w-6 h-6 text-slate-900" />
			<span class="text-slate-900">New Connection</span>
		</button>
	{:else}
		{#each $dbCredsStore.creds as connection, i}
			<div
				class="flex flex-row items-center justify-between relative rounded-xl px-4 py-2"
				class:bg-blue-500={isSelectedAlsoConnectedOne(i)}
			>
				<span class:text-slate-100={isSelectedAlsoConnectedOne(i)}>
					{connection.database} | {connection.host}:{connection.port}
				</span>
				<button
					on:click={() =>
						optionsVisibleFor == null ? (optionsVisibleFor = i) : (optionsVisibleFor = null)}
				>
					<Icon
						src={EllipsisVertical}
						class="w-6 h-6 {isSelectedAlsoConnectedOne(i) ? 'text-slate-100' : 'text-slate-700'}"
					/>
				</button>

				{#if optionsVisibleFor === i}
					<div class="absolute bg-slate-100 top-full right-0 rounded-xl shadow-xl flex flex-col">
						<button
							class="flex flex-row items-center justify-between gap-2 px-4 py-2"
							on:click={onSetupConnection}
						>
							<span class="text-blue-500">Connect</span>
						</button>
						<hr />
						<button
							class="flex flex-row items-center justify-between gap-2 px-4 py-2"
							on:click={onDeleteConnection}
						>
							<span class="text-red-500">Delete</span>
						</button>
					</div>
				{/if}
			</div>
		{/each}
	{/if}
</div>
