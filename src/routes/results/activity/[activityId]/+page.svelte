<script lang="ts">
    export let data;
</script>

{#each data.users as { username, exercises }}
    {#if Object.values(exercises).some((e) => e.state != "NOT_STARTED")}
        <h2>{username}</h2>
        <table>
            {#each Object.values(exercises) as exercise (exercise.id)}
                <tr>
                    <td><code>{exercise.state}</code></td>
                    <td>{exercise.title}</td>
                    <td>
                        {#if "sessionId" in exercise}
                            <a href="/player/play/answers/{exercise.sessionId}"
                                >{exercise.id}</a
                            >
                        {/if}
                    </td>
                </tr>
            {/each}
        </table>
    {/if}
{/each}


<details>
    <pre>{JSON.stringify(data, null, 2)}</pre>
</details>
