<script lang="ts">
	import DbSelector from "$lib/components/DBSelector.svelte"
	import TableSelector from "$lib/components/TableSelector.svelte"

	export let data: { tables: any[] }
</script>

<div class="flex flex-col gap-4">
	<div class="flex flex-row gap-4 h-96">
		<div class="w-96 h-full">
			<DbSelector />
		</div>
		<div class="w-full"></div>
	</div>

	<div class="flex flex-row gap-4">
		<div class="w-96">
			<TableSelector tables={data.tables} />
		</div>
		<div class="w-full"></div>
	</div>
</div>
