<script lang="ts">
    import { resolve } from "$app/paths";
    import SimpleTable from "../../../../components/SimpleTable.svelte";

    export let data;
</script>

{#each data.users as { username, exercises }}
    {#if Object.values(exercises).some((e) => e.state != "NOT_STARTED")}
        <h2>{username}</h2>
        <SimpleTable
            array={Object.values(exercises)}
            keys={["state", "title", "id", "attempts", "duration", "grade"]}
        >
            <svelte:fragment slot="row" let:row>
                <td><code>{row.state}</code></td>
                <td>{row.title}</td>
                <td>
                    {#if "sessionId" in row}
                        <a
                            href={resolve("/player/play/answers/[sessionId]", {
                                sessionId: row.sessionId,
                            })}>{row.id}</a
                        >
                    {/if}
                </td>
                <td align="right">{row.attempts}</td>
                <td align="right">{row.duration}</td>
                <td align="right">{row.grade}</td>
            </svelte:fragment>
        </SimpleTable>
    {/if}
{/each}

<details>
    <pre>{JSON.stringify(data, null, 2)}</pre>
</details>
