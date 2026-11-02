<script lang="ts">
    import { resolve } from "$app/paths";

    import { marked } from "marked";
    import admonition from "marked-admonition-extension";

    import CheckBoxGroup from "../../CheckBoxGroup.svelte";
    import CodeEditor from "../../CodeEditor.svelte";
    import CodeViewer from "../../CodeViewer.svelte";
    import FoldableFeedback from "../../FoldableFeedback.svelte";
    import InputBox from "../../InputBox.svelte";
    import RadioGroup from "../../RadioGroup.svelte";

    export let data;

    marked.use(admonition);
</script>

{#if !data.exercise}
    Vide
{:else}
    <h2>{data.exercise.title}</h2>
    <p>
        <a
            href={resolve("/player/environment/[sessionId]", {
                sessionId: data.exercise.sessionId,
            })}>Environment</a
        >
    </p>

    <div class="statement">
        {@html marked(data.exercise.statement)}
    </div>

    {#snippet renderComponent(component)}
        <svelte:boundary>
            {#if component.selector == "wc-foldable-feedback"}
                <FoldableFeedback content={component} />
            {:else if component.selector == "wc-input-box"}
                <InputBox content={component} />
            {:else if component.selector == "wc-checkbox-group"}
                <CheckBoxGroup content={component} />
            {:else if component.selector == "wc-radio-group"}
                <RadioGroup content={component} />
            {:else if component.selector == "wc-code-viewer"}
                <CodeViewer content={component} />
            {:else if component.selector == "wc-code-editor"}
                <CodeEditor content={component} />
            {:else}
                <pre>{JSON.stringify(component)}</pre>
            {/if}
            {#snippet failed()}
                <pre>{JSON.stringify(component)}</pre>
            {/snippet}
        </svelte:boundary>
    {/snippet}

    <div class="container-fluid">
            <div class="answer row">
                <div class="code col">
                    {#each data.exercise.parts as part}
                        {#if part.type === "text"}
                            {@html marked(part.text)}
                        {:else}
                            {@render renderComponent(part.component)}
                        {/if}
                    {/each}
                </div>
            </div>
    </div>
{/if}

<details>
    <pre>{JSON.stringify(data, null, 2)}</pre>
</details>

<style>
    .answer {
        border: 1px solid;
    }
    .error {
        background: #f002;
    }

    .warning {
        background: #ff02;
    }

    .success {
        background: #0f02;
    }
</style>
