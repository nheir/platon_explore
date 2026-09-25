<script lang="ts">
    export let data;
</script>

<table>
    {#each data.resources as resource}
        <tr
            ><td>{resource.user.username}</td><td
                ><code>{resource.userId}</code></td
            ></tr
        >
    {/each}
</table>

<details>
    <pre>{JSON.stringify(data, null, 2)}</pre>
</details>
