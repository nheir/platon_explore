<script lang="ts">
    export let data;
</script>

<details>
    <pre>{JSON.stringify(data, null, 2)}</pre>
</details>

{#each data.resources as resource}
    <h2><a href="/results/activity/{resource.id}">{resource.title}</a></h2>
{/each}
