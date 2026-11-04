<script lang="ts">
    import Exercise from "../../../../components/Exercise.svelte";

    export let data;
</script>

{#if data.exercise}
<Exercise exercises={[data.exercise]}/>
{/if}

<details>
    <pre>{JSON.stringify(data, null, 2)}</pre>
</details>
