<script lang="ts">
	import { Icon, PlusCircle, MinusCircle, EllipsisVertical } from "svelte-hero-icons"
	import { createEventDispatcher } from "svelte"
	import { dbCredsStore, deleteConnection } from "$lib/store/dbCreds"

	export let formVisible = false

	const dispatch = createEventDispatcher()
	let optionsVisibleFor: null | number = null

	async function onDeleteConnection() {
		if (!optionsVisibleFor) return

		const res = await fetch("/api/connect", {
			method: "DELETE",
		})
		const json = await res.json()

		if (res.status === 500) {
			$dbCredsStore.checkError = json.message
			$dbCredsStore.checkStatus = "fail"
			return
		}

		deleteConnection(optionsVisibleFor)
		optionsVisibleFor = null
	}
</script>

<div class="bg-slate-100 p-2 w-full border-r border-slate-500">
	{#if !$dbCredsStore.creds.length}
		<button
			class="flex flex-row justify-center items-center w-full gap-2"
			on:click={() => dispatch("toggleForm")}
		>
			<Icon src={formVisible ? MinusCircle : PlusCircle} class="w-6 h-6 text-slate-900" />
			<span class="text-slate-900">New Connection</span>
		</button>
	{:else}
		{#each $dbCredsStore.creds as connection, i}
			<div
				class="flex flex-row items-center justify-between relative"
				class:bg-blue-400={$dbCredsStore.connected}
				class:text-slate-100={$dbCredsStore.connected}
			>
				<span>
					{connection.database} | {connection.host}:{connection.port}
				</span>
				<button
					on:click={() =>
						optionsVisibleFor == null ? (optionsVisibleFor = i) : (optionsVisibleFor = null)}
				>
					<Icon src={EllipsisVertical} class="w-6 h-6 text-slate-700" />
				</button>

				{#if optionsVisibleFor === i}
					<div class="absolute bg-slate-100 top-full right-0 rounded-xl shadow-xl flex flex-col">
						<button
							class="px-4 py-2"
							on:click={() => {
								optionsVisibleFor = null
							}}
						>
							<span class="text-blue-500">Connect</span>
						</button>
						<hr />
						<button class="px-4 py-2" on:click={onDeleteConnection}>
							<span class="text-red-500">Delete</span>
						</button>
					</div>
				{/if}
			</div>
		{/each}
	{/if}
</div>
