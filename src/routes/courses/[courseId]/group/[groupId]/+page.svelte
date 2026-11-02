<script lang="ts">
    export let data;
</script>

<table>
    <tbody>
        {#each data.resources as resource}
            <tr
                ><td>{resource.user.username}</td><td
                    ><code>{resource.userId}</code></td
                ></tr
            >
        {/each}
    </tbody>
</table>

<details>
    <pre>{JSON.stringify(data, null, 2)}</pre>
</details>
