<script lang="ts">
	import { Icon, TableCells, PlusCircle } from "svelte-hero-icons"
	export let tables: any[]
</script>

<div class="flex flex-col rounded-2xl shadow-lg h-full">
	<div class="flex flex-row justify-between items-center bg-blue-600 p-2 rounded-t-2xl">
		<Icon src={TableCells} class="w-6 h-6 text-slate-100" />
		<h3 class="text-slate-100 font-semibold">Tables</h3>
		<button class="group" on:click={() => console.warn("CREATE TABLE: NOOP")}>
			<Icon
				src={PlusCircle}
				class="w-6 h-6 text-slate-100 group-hover:scale-110 transition-transform"
			/>
		</button>
	</div>
	<div class="flex flex-col rounded-b-2xl w-full h-full overflow-hidden">
		<div class="bg-slate-100 p-2">
			{#if !tables.length}
				<button
					class="flex flex-row justify-center items-center w-full gap-2"
					on:click={() => console.warn("CREATE TABLE: NOOP")}
				>
					<Icon src={PlusCircle} class="w-6 h-6 text-slate-900" />
					<span class="text-slate-900">New Table</span>
				</button>
			{/if}
		</div>
	</div>
</div>
