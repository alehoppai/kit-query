<script lang="ts">
  import { Icon, CircleStack, PlusCircle, MinusCircle, Wifi, ArrowPath, ExclamationCircle, CheckCircle } from "svelte-hero-icons"
  import { dbCredsStore } from "$lib/store/dbCreds"
  import type { DBCreds } from "$lib/types/db"

  let formVisible = false

  let host = "localhost"
  let port = "3306"
  let user = ""
  let password = ""
  let database = ""

  let testStatus: null | "pending" | "success" | "fail" = null
  let testStatusIcon = Wifi
  let testStatusColor = "text-blue-500"
  let testStatusErrorMessage = ""

  $: switch (testStatus) {
    case "pending":
      testStatusIcon = ArrowPath
      testStatusColor = "text-slate-400"
      break;
    case "fail":
      testStatusIcon = ExclamationCircle 
      testStatusColor = "text-red-500"
      break;
    case "success":
      testStatusIcon = CheckCircle 
      testStatusColor = "text-green-500"
      break;
    case null:
      testStatusColor = "text-blue-500"
      testStatusIcon = Wifi
      testStatusErrorMessage = ""
      break;
  }

  $: formData = { host, port, user, password, database }

  async function testConnection() {
    if (testStatus === "pending") return

    testStatus = "pending"
    const res =  await fetch("/api/check-db-connection", {
      method: "POST",
      body: JSON.stringify(formData)
    })
    const json = await res.json()
    console.log(res.status, json)

    if (res.status === 500) {
      testStatusErrorMessage = json.message
      testStatus = "fail"
      return
    }

    testStatus = "success"
  }
</script>

{#if testStatusErrorMessage.length}
<div class="absolute p-4 top-4 left-1/2 -translate-x-1/2 bg-red-500 rounded-2xl shadow-2xl flex flex-row items-center gap-4">
  <Icon src={ExclamationCircle} class="w-8 h-8 text-slate-100" />
  <span class="text-slate-100 font-semibold">{testStatusErrorMessage}</span>
  <button on:click={() => { testStatus = null }}>
    <span class="text-slate-100 font-bold">Close</span>
  </button>
</div>
{/if}

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
      class="bg-slate-100 p-2 w-full absolute left-0 min-h-full translate-x-full transition-transform flex flex-col items-center gap-2 pb-4"
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
        value={user}
        on:input={e => user = e.currentTarget.value}
        placeholder="User"
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

      <div class="flex-1"></div>

      <div class="flex flex-row items-center justify-between gap-12">
        <button type="submit">
          <span class="text-blue-500 font-semibold">Save</span>
        </button>

        <button
          type="button"
          class="flex flex-row justify-center items-center gap-1"
          class:cursor-not-allowed={testStatus === "pending"}
          disabled={testStatus === "pending"}
          on:click={testConnection}
        >
          <span class="{testStatusColor} font-semibold">Test</span>
          <Icon
            src={testStatusIcon}
            class="w-6 h-6 {testStatusColor} {testStatus === "pending" && "animate-spin"}"
          />
        </button>
      </div>
    </form>
  </div>
</div>