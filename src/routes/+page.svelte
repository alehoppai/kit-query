<script lang="ts">
  import DbSelector from "$lib/components/DBSelector.svelte"
</script>

<div class="flex flex-col gap-4">
  <div class="flex flex-row gap-4 h-96">
    <div class="w-72 h-full">
      <DbSelector />
    </div>
    <div class="w-full"></div>
  </div>

  <div class="flex flex-row gap-4">
    <div class="w-72">
    </div>
    <div class="w-full"></div>
  </div>
</div>