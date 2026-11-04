<script lang="ts">
    interface InputBoxData {
        type?: "text" | "number" | "textarea" | "password";
        value?: string | number;
        placeholder?: string;
        hint?: string;
        width?: string | number;
        disabled?: boolean;
    }

    export let content: InputBoxData;

    $: type = content.type ?? "text";
    $: width = typeof content.width === "number" ? `${content.width}px` : content.width;
</script>

<div class="mb-3" style:width>
    {#if type === "textarea"}
        <textarea class="form-control" rows="4" readonly value={content.value ?? ""} placeholder={content.placeholder}></textarea>
    {:else}
        <input
            class="form-control"
            type={type === "password" ? "password" : "text"}
            readonly
            value={content.value ?? ""}
            placeholder={content.placeholder}
        />
    {/if}
    {#if content.hint}<div class="form-text">{content.hint}</div>{/if}
</div>