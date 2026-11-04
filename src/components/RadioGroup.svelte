<script lang="ts">
    interface Item {
        content: string;
        css?: string;
    }

    export let content: {
        items: (string | Item)[];
        selection?: string;
        selectedIndex?: number;
        horizontal?: boolean;
    };

    $: items = (content.items ?? []).map((i) => (typeof i === "string" ? { content: i } : i)) as Item[];
    $: selectedIndex = content.selectedIndex !== undefined && content.selectedIndex >= 0
        ? content.selectedIndex
        : items.findIndex((i) => i.content === content.selection);
</script>

<div class:d-flex={content.horizontal} class:gap-3={content.horizontal}>
    {#each items as item, index}
        <div class="form-check" style="{item.css ?? ''}">
            <label class="form-check-label">
                <input class="form-check-input" type="radio" checked={index === selectedIndex} disabled />
                {item.content}
            </label>
        </div>
    {/each}
</div>