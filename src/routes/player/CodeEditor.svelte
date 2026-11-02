<script lang="ts">
    import CodeViewer from "./CodeViewer.svelte";

    export let content: {
        code: string;
        language?: string;
        height?: number;
    };
</script>

<div style="max-height: {content.height ?? 500}px; overflow: auto;">
    <CodeViewer content={{ code: content.code, language: content.language, lines: "1" }} />
</div>