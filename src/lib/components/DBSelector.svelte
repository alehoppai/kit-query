<script lang="ts">
	import { Icon, CircleStack, PlusCircle, MinusCircle } from "svelte-hero-icons"
	import { dbCredsStore } from "$lib/store/dbCreds"
	import ConnectionForm from "./ConnectionForm.svelte"
	import ConnectionError from "./ConnectionError.svelte"
	import ConnectionsList from "./ConnectionsList.svelte"
</script>

<div class="absolute top-4 left-1/2 -translate-x-1/2 flex flex-col">
	<ConnectionError
		message={$dbCredsStore.checkError}
		on:onDissmiss={() => {
			$dbCredsStore.checkStatus = null
			$dbCredsStore.checkError = ""
		}}
	/>
	<ConnectionError
		message={$dbCredsStore.setupError}
		on:onDissmiss={() => {
			$dbCredsStore.setupStatus = null
			$dbCredsStore.setupError = ""
		}}
	/>
</div>

<div class="flex flex-col rounded-2xl shadow-lg h-full">
	<div class="flex flex-row justify-between items-center bg-blue-600 p-2 rounded-t-2xl">
		<Icon src={CircleStack} class="w-6 h-6 text-slate-100" />
		<h3 class="text-slate-100 font-semibold">Databases</h3>
		<button class="group" on:click={() => ($dbCredsStore.formVisible = !$dbCredsStore.formVisible)}>
			<Icon
				src={$dbCredsStore.formVisible ? MinusCircle : PlusCircle}
				class="w-6 h-6 text-slate-100 group-hover:scale-110 transition-transform"
			/>
		</button>
	</div>
	<div
		class="flex flex-row rounded-b-2xl w-full h-full overflow-x-hidden overflow-y-auto flex-nowrap relative"
	>
		<ConnectionsList />
		<ConnectionForm />
	</div>
</div>
