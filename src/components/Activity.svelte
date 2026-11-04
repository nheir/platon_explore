<script lang="ts">
    import Navigation from './Navigation.svelte';

    export let activity;

    const fmt = (iso?: string | null) =>
        iso ? new Date(iso).toLocaleString("fr-FR", { dateStyle: "short", timeStyle: "short" }) : "–";
</script>

<div class="container-fluid py-3">
    <h1 class="h4">{activity.title || "Activité"}</h1>

    <dl class="row small mb-4">
        <dt class="col-sm-2">État</dt>
        <dd class="col-sm-10">
            {activity.state}{activity.navigation.terminated ? " (terminée)" : ""}
        </dd>
        <dt class="col-sm-2">Commencée</dt>
        <dd class="col-sm-10">{fmt(activity.startedAt)}</dd>
        <dt class="col-sm-2">Dernière correction</dt>
        <dd class="col-sm-10">{fmt(activity.lastGradedAt)}</dd>
    </dl>

    {#if activity.introduction}
        <p>{activity.introduction}</p>
    {/if}

    <Navigation nav={activity.navigation} activitySessionId={activity.sessionId}/>

    {#if activity.conclusion}
        <p>{activity.conclusion}</p>
    {/if}
</div>
