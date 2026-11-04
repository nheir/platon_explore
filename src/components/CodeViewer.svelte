<script lang="ts">
    export let content: {
        code: string;
        language?: string;
        lines?: string;      // "" = aucune numérotation, "n" = une ligne sur n
        highlights?: string; // "1 3-5 8"
    };

    $: step = parseInt(content.lines ?? "", 10) || 0;
    $: rows = (content.code ?? "").replace(/^\n|\n\s*$/g, "").split("\n");
    $: highlighted = parseRanges(content.highlights ?? "");

    function parseRanges(spec: string): Set<number> {
        const set = new Set<number>();
        for (const part of spec.split(/\s+/).filter(Boolean)) {
            const [a, b] = part.split("-").map(Number);
            for (let n = a; n <= (b ?? a); n++) set.add(n);
        }
        return set;
    }
</script>

<pre class="border rounded p-2 bg-light" data-language={content.language ?? "plaintext"}><code>{#each rows as row, i}<span class="line" class:hl={highlighted.has(i + 1)}>{#if step}<span class="num">{(i + 1) % step === 0 ? i + 1 : ""}</span>{/if}{row}
</span>{/each}</code></pre>

<style>
    .line { display: block; }
    .hl { background: rgba(255, 193, 7, 0.3); }
    .num { display: inline-block; width: 2.5em; margin-right: 1em; text-align: right; color: #888; user-select: none; }
</style>