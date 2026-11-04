<!-- Stat.svelte -->
<script lang="ts">
    export let stat: { sum: number; avg: number; count: number; isRate?: boolean };

    const nf = (n: number) => n.toLocaleString("fr-FR", { maximumFractionDigits: 1 });

    // 0 % → red (hue 0), 100 % → green (hue 120)
    const rateColor = (pct: number) => {
        const hue = Math.max(0, Math.min(100, pct)) * 1.2;
        return `hsl(${hue} 70% 85%)`;
    };

    $: bg = stat.isRate ? rateColor(stat.avg) : undefined;
</script>

<td style:background-color={bg} title="sum: {stat.sum}, count: {stat.count}">
    {nf(stat.avg)}{stat.isRate ? " %" : ""} <small class="text-muted">({stat.count})</small>
</td>