<script lang="ts">
    import { resolve } from "$app/paths";
    import SimpleTable from "../../../components/SimpleTable.svelte";

    export let data;
</script>

{#if data.success}
<SimpleTable
    array={data.resources}
    keys={["activityId", "activityName", "courseId", "courseName", "totalExercises", "correctedExercises"]}
>
    <svelte:fragment slot="row" let:row>
        <td><a href="{resolve("/results/activity/[activityId]", {activityId: row.activityId})}"><code>{row.activityId}</code></a></td>
        <td>{row.activityName}</td>
        <td><a href="{resolve("/courses/[courseId]/activities", {courseId: row.courseId})}"><code>{row.courseId}</code></a></td>
        <td>{row.courseName}</td>
        <td>{row.totalExercises}</td>
        <td>{row.correctedExercises}</td>
    </svelte:fragment>
</SimpleTable>
{/if}

<details>
    <pre>{JSON.stringify(data, null, 2)}</pre>
</details>
