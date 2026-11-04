<script lang="ts">
    import { resolve } from "$app/paths";
    import SimpleTable from "../../../../components/SimpleTable.svelte";
    import ExerciseState from "../../../../components/ExerciseState.svelte";
    import ExerciseStates from "../../../../components/ExerciseStates.svelte";
    import Stat from "../../../../components/Stat.svelte";

    import type { ActivityResults } from "../../../../lib/platon-types/result/results.model";

    export let data: ActivityResults;
</script>

<h1>Exercises</h1>
<SimpleTable
    array={data.exercises}
    keys={[
        "title",
        "id",
        "states",
        "grades",
        "attempts",
        "durations",
        "averageAttemptsToSuccess",
        "answerRate",
        "successRate",
        "successRateOnFirstAttempt",
        "averageTimeToAttempt",
        "dropoutRate",
    ]}
>
    <svelte:fragment slot="row" let:row>
        <td style="white-space: nowrap;">{row.title}</td>
        <td><code>{row.id}</code></td>
        <ExerciseStates counts={row.states}/>
        <Stat stat={row.grades}/>
        <Stat stat={row.attempts}/>
        <Stat stat={row.durations}/>
        <Stat stat={row.averageAttemptsToSuccess}/>
        <Stat stat={row.answerRate}/>
        <Stat stat={row.successRate}/>
        <Stat stat={row.successRateOnFirstAttempt}/>
        <Stat stat={row.averageTimeToAttempt}/>
        <Stat stat={row.dropoutRate}/>
    </svelte:fragment>
</SimpleTable>
<h1>Users</h1>
{#each data.users as { username, exercises, activitySessionId }}
    {#if Object.values(exercises).some((e) => e.state != "NOT_STARTED")}
        <h2>{username} <a href="{resolve("/results/session/[sessionId]", {sessionId: activitySessionId})}"><code>{activitySessionId}</code></a></h2>
        <SimpleTable
            array={Object.values(exercises).map((v,i) => ({i, ...v}))}
            keys={["i", "state", "title", "id", "attempts", "duration", "grade"]}
        >
            <svelte:fragment slot="row" let:row>
                <td>{row.i}</td>
                <td><ExerciseState state={row.state}/></td>
                <td>{row.title}</td>
                <td>
                    {#if row.sessionId}
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
