<script lang="ts">
  import { Icon, CircleStack, PlusCircle, MinusCircle } from "svelte-hero-icons"
  import { dbCredsStore } from "$lib/store/dbCreds"
  import type { DBCreds } from "$lib/types/db";

  let formVisible = false;

  let host = "localhost"
  let port = "3306"
  let name = ""
  let password = ""
  let database = ""
</script>

<div class="flex flex-col rounded-2xl shadow-lg h-full">
  <div class="flex flex-row justify-between items-center bg-blue-600 p-2 rounded-t-2xl">
    <Icon src={CircleStack} class="w-6 h-6 text-slate-100" />
    <h3 class="text-slate-100 font-semibold">Databases</h3>
    <button class="group" on:click={() => formVisible = !formVisible}>
      <Icon src={formVisible ? MinusCircle : PlusCircle} class="w-6 h-6 text-slate-100 group-hover:scale-110 transition-transform" />
    </button>
  </div>
  <div class="flex flex-row rounded-b-2xl w-full h-full overflow-x-hidden overflow-y-auto flex-nowrap relative">
    <div
      class="bg-slate-100 p-2 w-full border-r border-slate-500"
    >
      {#if !$dbCredsStore.creds.length}
        <button
          class="flex flex-row justify-center items-center w-full gap-2"
          on:click={() => formVisible = !formVisible}
        >
          <Icon src={formVisible ? MinusCircle : PlusCircle} class="w-6 h-6 text-slate-900" />
          <span class="text-slate-900">New Connection</span>
        </button>
      {:else}
        {#each $dbCredsStore.creds as connection}
          <span>{connection.database}</span>
        {/each}
      {/if}
    </div>
    <form
      class="bg-slate-100 p-2 w-full absolute left-0 min-h-full translate-x-full transition-transform flex flex-col items-center gap-2"
      class:translate-x-0={formVisible}
    >
      <input
        class="bg-transparent text-slate-900 px-4 py-2 border-b border-slate-400 outline-none focus:border-slate-600"
        type="text"
        value={host}
        on:input={e => host = e.currentTarget.value}
        placeholder="Host"
      />
      <input
        class="bg-transparent text-slate-900 px-4 py-2 border-b border-slate-400 outline-none focus:border-slate-600"
        type="text"
        value={port}
        on:input={e => port = e.currentTarget.value}
        placeholder="Port"
      />
      <input
        class="bg-transparent text-slate-900 px-4 py-2 border-b border-slate-400 outline-none focus:border-slate-600"
        type="text"
        value={name}
        on:input={e => name = e.currentTarget.value}
        placeholder="Name"
      />
      <input
        class="bg-transparent text-slate-900 px-4 py-2 border-b border-slate-400 outline-none focus:border-slate-600"
        type="password"
        value={password}
        on:input={e => password = e.currentTarget.value}
        placeholder="Password"
      />
      <input
        class="bg-transparent text-slate-900 px-4 py-2 border-b border-slate-400 outline-none focus:border-slate-600"
        type="text"
        value={database}
        on:input={e => database = e.currentTarget.value}
        placeholder="Database"
      />

      <button type="submit">
        <span class="text-blue-500 font-semibold">Save</span>
      </button>
    </form>
  </div>
</div>