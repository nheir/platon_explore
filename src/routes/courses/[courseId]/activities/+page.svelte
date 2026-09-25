<script lang="ts">
    export let data;
</script>

<table>
    <tr><th>Titre</th><th>SectionId</th><th>Resource</th></tr>
{#each data.resources as resource}
    <tr><td><a href="/results/activity/{resource.id}">{resource.title}</a></td><td>{resource.sectionId}</td><td><a href="/resources/{resource.resourceId}">{resource.resourceId}</a></td></tr>
{/each}
</table>

<details>
    <pre>{JSON.stringify(data, null, 2)}</pre>
</details>