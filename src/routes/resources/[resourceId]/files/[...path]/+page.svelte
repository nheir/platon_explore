<script lang="ts">
    import { resolve } from '$app/paths';

    export let data;
</script>

{#if data.type == "folder" && data.children}
    <ul>
        {#each data.children as child}
            <li>
                <a
                    href={resolve("/resources/[resourceId]/files/[...path]", {
                        resourceId: data.resourceId,
                        path: child.path,
                    })}>{child.path}</a
                >
            </li>
        {/each}
    </ul>
{/if}
{#if data.text}
    <textarea>{data.text}</textarea>
{/if}

<pre>
{JSON.stringify(data, null, 2)}
</pre>

<style>
    textarea {
        font-family: monospace;
        min-height: 30em;
        width: 100%;
    }
</style>
