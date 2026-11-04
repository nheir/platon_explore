<script lang="ts">
    import Activity from "../../../../../components/Activity.svelte";

    export let data;
</script>

<Activity activity={data.activity}/>

<details><pre>{JSON.stringify(data, null, 2)}</pre></details>
