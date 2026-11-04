<script lang="ts">
    interface Item {
        content: string;
        checked?: boolean;
        css?: string;
    }

    export let content: {
        items: (string | Item)[];
        horizontal?: boolean;
    };

    $: items = (content.items ?? []).map((i) => (typeof i === "string" ? { content: i } : i)) as Item[];
</script>

<div class:d-flex={content.horizontal} class:gap-3={content.horizontal}>
    {#each items as item}
        <div class="form-check" style="{item.css ?? ''}">
            <label class="form-check-label">
                <input class="form-check-input" type="checkbox" checked={!!item.checked} disabled />
                {item.content}
            </label>
        </div>
    {/each}
</div>