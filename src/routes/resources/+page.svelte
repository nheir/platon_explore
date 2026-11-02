<script lang="ts">
    import { resolve } from "$app/paths";
    import SimpleTable from "../../components/SimpleTable.svelte";

    export let data;
    let activities = data.resources.filter((r) => r.type == "ACTIVITY");
    let exercises = data.resources.filter((r) => r.type == "EXERCISE");
    let circles = data.resources.filter((r) => r.type == "CIRCLE");
</script>

{#if circles.length > 0}
<h2>Circles</h2>
<SimpleTable
    array={circles}
    keys={["id", "name", "status", "createdAt", "updatedAt"]}
>
    <svelte:fragment slot="row" let:row>
        <td><a href="{resolve("/resources/[resourceId]", {resourceId: row.id})}"><code>{row.id}</code></a></td>
        <td>{row.name}</td>
        <td><code>{row.status}</code></td>
        <td><time datetime="{row.createdAt}">{row.createdAt}</time></td>
        <td><time datetime="{row.updatedAt}">{row.updatedAt}</time></td>
    </svelte:fragment>
</SimpleTable>
{/if}

{#if activities.length > 0}
<h2>Activities</h2>
<SimpleTable
    array={activities}
    keys={["id", "name", "status", "createdAt", "updatedAt"]}
>
    <svelte:fragment slot="row" let:row>
        <td><a href="{resolve("/resources/[resourceId]", {resourceId: row.id})}"><code>{row.id}</code></a></td>
        <td>{row.name}</td>
        <td><code>{row.status}</code></td>
        <td><time datetime="{row.createdAt}">{row.createdAt}</time></td>
        <td><time datetime="{row.updatedAt}">{row.updatedAt}</time></td>
    </svelte:fragment>
</SimpleTable>
{/if}

{#if exercises.length > 0}
<h2>Exercises</h2>
<SimpleTable
    array={exercises}
    keys={["id", "name", "status", "createdAt", "updatedAt"]}
>
    <svelte:fragment slot="row" let:row>
        <td><a href="{resolve("/resources/[resourceId]", {resourceId: row.id})}"><code>{row.id}</code></a></td>
        <td>{row.name}</td>
        <td><code>{row.status}</code></td>
        <td><time datetime="{row.createdAt}">{row.createdAt}</time></td>
        <td><time datetime="{row.updatedAt}">{row.updatedAt}</time></td>
    </svelte:fragment>
</SimpleTable>
{/if}

<details>
    <pre>
{JSON.stringify(data, null, 2)}
</pre>
</details>

<style>
    time {
        font-family: monospace;
    }
    td {
        border-left: 1pt dashed;
    }
</style>
