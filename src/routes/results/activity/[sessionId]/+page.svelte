<script lang="ts">
    export let data;
</script>

<details>
    <pre>{JSON.stringify(data, null, 2)}</pre>
</details>

{#each data.users as { username, exercises }}
    {#if Object.values(exercises).some((e) => e.state != "NOT_STARTED")}
        <h2>{username}</h2>
        <ul>
            {#each Object.values(exercises) as exercise (exercise.id)}
                {#if exercise.attempts > 0}
                    <li>
                        <a href="/player/play/answers/{exercise.sessionId}"
                            >{exercise.id}</a
                        >
                    </li>
                {/if}
            {/each}
        </ul>
    {/if}
{/each}
