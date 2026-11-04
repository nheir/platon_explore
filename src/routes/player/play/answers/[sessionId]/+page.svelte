<script lang="ts">
    import type { ExercisePlayer } from "#lib/platon-types/player/player.model.js";
    import Exercise from "../../../../../components/Exercise.svelte";

    export let data: {
        exercises: (ExercisePlayer & {
            parts: (
                | { type: "text"; text: string }
                | { type: "component"; component: any }
            )[];
        })[];
    };
</script>

<Exercise exercises={data.exercises}/>

<details><pre>{JSON.stringify(data)}</pre></details>
