<script lang="ts">
    import { resolve } from "$app/paths";
    import SimpleTable from "../../../../components/SimpleTable.svelte";

    export let data;
</script>

<SimpleTable
    array={data.resources}
    keys={[
        "title",
        "sectionId",
        "exerciseCount",
        "createdAt",
        "updatedAt",
        "resourceId",
    ]}
>
    <svelte:fragment slot="row" let:row>
        <td>
            <a
                href={resolve("/results/activity/[activityId]", {
                    activityId: row.id,
                })}>{row.title}</a
            >
        </td>
        <td><code>{row.sectionId}</code></td>
        <td align="right">{row.exerciseCount}</td>
        <td><time datetime={row.createdAt}>{row.createdAt}</time></td>
        <td><time datetime={row.updatedAt}>{row.updatedAt}</time></td>
        <td>
            <a
                href={resolve("/resources/[resourceId]", {
                    resourceId: row.resourceId,
                })}><code>{row.resourceId}</code></a
            >
        </td>
    </svelte:fragment>
</SimpleTable>

<details>
    <pre>{JSON.stringify(data, null, 2)}</pre>
</details>
