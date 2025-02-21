<script lang="ts">
    export let data;
</script>

<details>
    <pre>{JSON.stringify(data, null, 2)}</pre>
</details>

{#each data.resources as resource}
    <h2>{resource.activityName}</h2>
    <ul>
        <li><a href="/results/activity/{resource.activityId}">Results</a></li>
        <li>
            <a href="/results/corrections/{resource.activityId}">Corrections</a>
        </li>
    </ul>
{/each}
