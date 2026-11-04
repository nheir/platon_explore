<script lang="ts">
    import { resolve } from "$app/paths";
    import ExerciseState from "./ExerciseState.svelte";

    export let nav;
    export let activitySessionId;
</script>
<table class="table table-sm align-middle">
    <thead>
        <tr>
            <th>Exercice</th>
            <th>État</th>
        </tr>
    </thead>
    <tbody>
        {#each nav.exercises as ex (ex.id)}
            <tr class:table-active={ex.id === nav.current?.id}>
                <td>{ex.title}</td>
                <td><ExerciseState state={ex.state} /></td>
                <td>
                    <a href={resolve(`/player/play/answers/${ex.sessionId}`)}
                        >Answers</a
                    >
                </td>
                <td>
                    <a
                        href={resolve(
                            `/player/play/exercises/${activitySessionId}/${ex.sessionId}`,
                        )}>Play</a
                    >
                </td>
            </tr>
        {/each}
    </tbody>
</table>
