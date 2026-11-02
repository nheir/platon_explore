<script lang="ts">
    import { resolve } from "$app/paths";
    export let data;
    export let form;

    let fields = [
        ["Name", "name"],
        ["Type", "type"],
        ["Description", "desc"],
        ["Status", "status"],
        ["Type", "type"],
    ];

    let editablefields = [
        ["Name", "name"],
        ["Description", "desc"],
    ];
</script>

{#if data.resource.permissions?.write}
    <form method="POST" action="?/update">
        <table>
            <tbody>
                {#each editablefields as [label, key]}
                    <tr>
                        <td>{label}</td>
                        <td><input name={key} value={data.resource[key]} /></td>
                    </tr>
                {/each}
                <tr>
                    <td>Status</td>
                    <td
                        ><select name="status" value={data.resource.status}>
                            <option>DRAFT</option>
                            <option>NOT_TESTED</option>
                            <option>BUGGED</option>
                            <option>DEPRECATED</option>
                            <option>READY</option>
                        </select></td
                    >
                </tr>
            </tbody>
        </table>
        <button type="submit">Update</button>
    </form>
{/if}

{#if data.resource.permissions?.write && data.resource.type != "CIRCLE"}
    <form method="POST" action="?/move">
        <table>
            <tbody>
                <tr>
                    <td>Circle</td>
                    <td
                        ><input
                            name="circle"
                            value={data.resource.parentId}
                        /></td
                    >
                    <td><button type="submit">Move</button></td>
                </tr>
            </tbody>
        </table>
    </form>
    <form method="POST" action="?/template">
        <table>
            <tbody>
                <tr>
                    <td>Template Id</td>
                    <td
                        ><input
                            name="templateId"
                            value={data.resource.templateId}
                        /></td
                    >
                </tr>
                <tr>
                    <td>Template Version</td>
                    <td
                        ><input
                            name="templateVersion"
                            value={data.resource.templateVersion}
                        /></td
                    >
                </tr>
                <tr><td><button type="submit">Move</button></td></tr>
            </tbody>
        </table>
    </form>
{/if}

{#if form?.error}
    <p class="error">{form.error}</p>
{/if}

<table>
    <tbody>
        {#each fields as [name, key]}
            <tr><td>{name}</td><td><code>{data.resource[key]}</code></td></tr>
        {/each}
        {#if data.resource.parentId}
            <tr
                ><td>Parent</td><td
                    ><a
                        href={resolve("/resources/[resourceId]", {
                            resourceId: data.resource.parentId,
                        })}
                    >
                        <code>{data.resource.parentId}</code></a
                    >
                </td></tr
            >
        {/if}
        {#if data.resource.templateId}
            <tr
                ><td>Template</td><td
                    ><a
                        href={resolve("/resources/[resourceId]", {
                            resourceId: data.resource.templateId,
                        })}
                    >
                        <code>{data.resource.templateId}</code></a
                    >
                </td></tr
            >
        {/if}
        <tr
            ><td>Files</td><td
                ><a
                    href="{resolve('/resources/[resourceId]', {
                        resourceId: data.resource.id,
                    })}/files"
                >
                    Files</a
                >
            </td></tr
        >

        {#if data.resource.type == "CIRCLE"}
            <tr
                ><td>Children</td><td>
                    <a
                        href="{resolve('/resources/[resourceId]', {
                            resourceId: data.resource.id,
                        })}/children">Children</a
                    >
                </td></tr
            >
        {/if}
        {#if data.resource.type == "EXERCISE"}
            <tr
                ><td>Preview</td><td>
                    <a
                        href={resolve("/player/preview/[resourceId]", {
                            resourceId: data.resource.id,
                        })}>Preview</a
                    >
                </td></tr
            >
        {/if}
    </tbody>
</table>

<pre>
{JSON.stringify(data, null, 2)}
</pre>
