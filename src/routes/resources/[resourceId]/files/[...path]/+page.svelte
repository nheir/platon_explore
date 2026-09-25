<script lang="ts">
    export let data;
</script>

{#if data.type == "folder" && data.children}
<ul>
    {#each data.children as child}
        <li><a href="/resources/{data.resourceId}/files/{child.path}">{child.path}</a></li>
    {/each}
</ul>
{/if}
{#if data.text}
<pre>
{data.text}
</pre>
{/if}

<pre>
{JSON.stringify(data, null, 2)}
</pre>
