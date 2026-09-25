<script lang="ts">
    export let data;
</script>

<table>
    {#each data.resources as resource}
        <tr
            ><td><a href="group/{resource.groupId}">{resource.name}</a></td><td
                ><code>{resource.groupId}</code></td
            ></tr
        >
    {/each}
</table>

<details>
    <pre>{JSON.stringify(data, null, 2)}</pre>
</details>