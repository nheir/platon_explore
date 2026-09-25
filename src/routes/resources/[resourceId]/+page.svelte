<script lang="ts">
    export let data;

    let fields = [
        ["Name", "name"],
        ["Type", "type"],
        ["Description", "desc"],
        ["Status", "status"],
        ["Type", "type"],
    ];
</script>

<table>
    {#each fields as [name, key]}
        <tr><td>{name}</td><td><code>{data.resource[key]}</code></td></tr>
    {/each}
    {#if data.resource.parentId}
        <tr
            ><td>Parent</td><td
                ><a href="/resources/{data.resource.parentId}">
                    <code>{data.resource.parentId}</code></a
                >
            </td></tr
        >
    {/if}
    <tr
        ><td>Files</td><td
            ><a href="/resources/{data.resource.id}/files"> Files</a>
        </td></tr
    >

    {#if data.resource.type == "CIRCLE"}
        <tr
            ><td>Children</td><td>
                <a href="/resources/{data.resource.id}/children">Children</a>
            </td></tr
        >
    {/if}
</table>

{#if data.resource.type == "CIRCLE"}{:else if data.resource.type == "ACTIVITY"}{:else if data.resource.type == "EXERCISE"}{/if}

<pre>
{JSON.stringify(data, null, 2)}
</pre>
