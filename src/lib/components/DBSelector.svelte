<script lang="ts">
	import { Icon, CircleStack, PlusCircle, MinusCircle, EllipsisVertical } from "svelte-hero-icons"
	import { dbCredsStore } from "$lib/store/dbCreds"
	import ConnectionForm from "./ConnectionForm.svelte"
	import ConnectionError from "./ConnectionError.svelte"

	let formVisible = false
	let optionsVisibleFor: null | number = null
</script>

<ConnectionError />

<div class="flex flex-col rounded-2xl shadow-lg h-full">
	<div class="flex flex-row justify-between items-center bg-blue-600 p-2 rounded-t-2xl">
		<Icon src={CircleStack} class="w-6 h-6 text-slate-100" />
		<h3 class="text-slate-100 font-semibold">Databases</h3>
		<button class="group" on:click={() => (formVisible = !formVisible)}>
			<Icon
				src={formVisible ? MinusCircle : PlusCircle}
				class="w-6 h-6 text-slate-100 group-hover:scale-110 transition-transform"
			/>
		</button>
	</div>
	<div
		class="flex flex-row rounded-b-2xl w-full h-full overflow-x-hidden overflow-y-auto flex-nowrap relative"
	>
		<div class="bg-slate-100 p-2 w-full border-r border-slate-500">
			{#if !$dbCredsStore.creds.length}
				<button
					class="flex flex-row justify-center items-center w-full gap-2"
					on:click={() => (formVisible = !formVisible)}
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
							<div
								class="absolute bg-slate-100 top-full right-0 rounded-xl shadow-xl flex flex-col"
							>
								<button
									class="px-4 py-2"
									on:click={() => {
										optionsVisibleFor = null
									}}
								>
									<span class="text-blue-500">Connect</span>
								</button>
								<hr />
								<button
									class="px-4 py-2"
									on:click={() => {
										optionsVisibleFor = null
									}}
								>
									<span class="text-red-500">Delete</span>
								</button>
							</div>
						{/if}
					</div>
				{/each}
			{/if}
		</div>
		<ConnectionForm {formVisible} on:hideForm={() => (formVisible = false)} />
	</div>
</div>
