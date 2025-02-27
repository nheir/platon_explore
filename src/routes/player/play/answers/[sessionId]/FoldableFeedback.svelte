<script lang="ts">
    interface FFData {
        name: string;
        type: "success" | "error" | "warning";
        display: boolean;
        expected?: string;
        obtained?: string;
        arguments?: string;
        description?: string;
        feedbacks?: FFData[];
    }

    export let content: FFData;

    const toAlert = (type: string) => {
        if (type === "error") return "danger";
        return type;
    }
</script>

{#if Array.isArray(content)}
    {#each content as content}
        <svelte:self {content} />
    {/each}
{:else}
    <div class={content.type}>
        <div class="alert alert-{toAlert(content.type)}">
            <h4 class="alert-heading">{content.name}</h4>
            {#if content.description}<p>{content.description}</p>{/if}
            {#if content.arguments}
                <p><strong>Arguments</strong></p>
                <pre>{content.arguments}</pre>
            {/if}
            {#if content.expected}
                <p><strong>Expected</strong></p>
                <pre>{content.expected}</pre>
            {/if}
            {#if content.obtained}
                <p><strong>Obtained</strong></p>
                <pre>{content.obtained}</pre>
            {/if}
            {#if content.feedbacks}
                {#each content.feedbacks as feedback}
                    <svelte:self content={feedback}/>
                {/each}
            {/if}
        </div>
    </div>
{/if}
