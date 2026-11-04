<script lang="ts">
    export let counts: Record<string, number>;

    const meta: Record<string, { label: string; cls: string }> = {
        SUCCEEDED:   { label: "Réussi",       cls: "success" },
        PART_SUCC:   { label: "Partiel",      cls: "warning" },
        FAILED:      { label: "Échoué",       cls: "danger" },
        ERROR:       { label: "Erreur",       cls: "dark" },
        ANSWERED:    { label: "Répondu",      cls: "info" },
        STARTED:     { label: "Commencé",     cls: "primary" },
        NOT_STARTED: { label: "Non commencé", cls: "secondary" },
    };

    $: entries = Object.entries(meta)
        .map(([key, m]) => ({ ...m, key, n: counts[key] ?? 0 }))
        .filter((e) => e.n > 0);
</script>

<td>
    {#each entries as e (e.key)}
        <span class="badge text-bg-{e.cls} me-1" title={e.label}>{e.n}</span>
    {:else}
        <span class="text-muted">–</span>
    {/each}
</td>

<style>
    td {
        white-space: nowrap;
    }
    span {
        min-width: 3em;
    }
</style>