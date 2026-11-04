<script lang="ts">
    import type { ExercisePlayer } from "#lib/platon-types/player/player.model.js";
    import Exercise from "../../../../../components/Exercise.svelte";

    export let data: {
        exercises: ExercisePlayer[];
    };
</script>

{#if data.exercises}
<Exercise exercises={data.exercises}/>
{/if}
<details><pre>{JSON.stringify(data)}</pre></details>
