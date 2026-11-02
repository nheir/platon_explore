<script lang="ts">
    import SimpleTable from "../../../../components/SimpleTable.svelte";

    export let data;
</script>

<SimpleTable array={data.resources} keys={["user", "userId"]}>
    <svelte:fragment slot="row" let:row>
        <td>{row.user.username}</td>
        <td><code>{row.userId}</code></td>
    </svelte:fragment>
</SimpleTable>

<details>
    <pre>{JSON.stringify(data, null, 2)}</pre>
</details>
