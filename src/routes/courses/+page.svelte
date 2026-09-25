<script lang="ts">
    export let data;
</script>

{#if data.success}
{#each data.resources as resource}
    <h2><a href="/courses/{resource.id}/activities">{resource.name}</a></h2>
    <p>{resource.desc}</p>
{/each}
{/if}

<details>
    <pre>{JSON.stringify(data, null, 2)}</pre>
</details>
