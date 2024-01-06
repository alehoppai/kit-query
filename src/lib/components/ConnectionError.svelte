<script lang="ts">
	import { Icon, ExclamationCircle } from "svelte-hero-icons"
	import { dbCredsStore } from "$lib/store/dbCreds"
</script>

{#if $dbCredsStore.checkError.length}
	<div
		class="absolute p-4 top-4 left-1/2 -translate-x-1/2 bg-red-500 rounded-2xl shadow-2xl flex flex-row items-center gap-4"
	>
		<Icon src={ExclamationCircle} class="w-8 h-8 text-slate-100" />
		<span class="text-slate-100 font-semibold">{$dbCredsStore.checkError}</span>
		<button on:click={() => ($dbCredsStore.checkStatus = null)}>
			<span class="text-slate-100 font-bold">Close</span>
		</button>
	</div>
{/if}
