<script lang="ts">
	import { Icon, CircleStack, PlusCircle, MinusCircle } from "svelte-hero-icons"
	import ConnectionForm from "./ConnectionForm.svelte"
	import ConnectionError from "./ConnectionError.svelte"
	import ConnectionsList from "./ConnectionsList.svelte"

	let formVisible = false
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
		<ConnectionsList {formVisible} on:toggleForm={() => (formVisible = !formVisible)} />
		<ConnectionForm {formVisible} on:hideForm={() => (formVisible = false)} />
	</div>
</div>
