<script lang="ts">
    import { resolve } from "$app/paths";
    import Exercise from "../../../../../../components/Exercise.svelte";
    import Navigation from "../../../../../../components/Navigation.svelte";

    export let data;
    export let params;
</script>

<Exercise exercises={data.exercises}/>
<Navigation nav={data.navigation} activitySessionId={params.activitySessionId}/>

<details><pre>{JSON.stringify(data)}</pre></details>