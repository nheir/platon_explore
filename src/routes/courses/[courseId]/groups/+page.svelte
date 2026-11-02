<script lang="ts">
    import SimpleTable from "../../../../components/SimpleTable.svelte";

    export let data;
</script>

<SimpleTable array={data.resources} keys={["name", "groupId", "groupId"]}>
    <svelte:fragment slot="row" let:row>
        <td><a href="group/{row.groupId}">{row.name}</a></td>
        <td><code>{row.groupId}</code></td>
        <td>
            {#if Number.parseInt(row.groupId)}
                <a
                    href="https://elearning.univ-eiffel.fr/group/group.php?id={row.groupId}"
                >
                    elearning <code>[{row.groupId}]</code>
                </a>
            {/if}
        </td>
    </svelte:fragment>
</SimpleTable>
<details>
    <pre>{JSON.stringify(data, null, 2)}</pre>
</details>
