<script lang="ts">
    import { resolve } from "$app/paths";
    import SimpleTable from "../../components/SimpleTable.svelte";

    export let data;
</script>

{#if data.success}
<SimpleTable
    array={data.resources}
    keys={["id", "name", "desc", "ownerId", "createdAt", "updatedAt", "isTest"]}
>
    <svelte:fragment slot="row" let:row>
        <td><a href="{resolve("/courses/[courseId]/activities", {courseId: row.id})}"><code>{row.id}</code></a></td>
        <td>{row.name}</td>
        <td>{row.desc}</td>
        <td><code>{row.ownerId}</code></td>
        <td><time datetime="{row.createdAt}">{row.createdAt}</time></td>
        <td><time datetime="{row.updatedAt}">{row.updatedAt}</time></td>
        <td><code>{row.isTest}</code></td>
    </svelte:fragment>
</SimpleTable>
{/if}

<details>
    <pre>{JSON.stringify(data, null, 2)}</pre>
</details>
