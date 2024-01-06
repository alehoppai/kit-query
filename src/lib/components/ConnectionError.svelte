<script lang="ts">
	import { createEventDispatcher } from "svelte"
	import { Icon, ExclamationCircle } from "svelte-hero-icons"

	const dispatch = createEventDispatcher()

	export let message: string = ""
</script>

{#if message.length}
	<div class="p-4 bg-red-500 rounded-2xl shadow-2xl flex flex-row items-center gap-4">
		<Icon src={ExclamationCircle} class="w-8 h-8 text-slate-100" />
		<span class="text-slate-100 font-semibold">{message}</span>
		<button on:click={() => dispatch("onDissmiss")}>
			<span class="text-slate-100 font-bold">Close</span>
		</button>
	</div>
{/if}
