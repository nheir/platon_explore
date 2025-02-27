<script lang="ts">
    import Highlight from "svelte-highlight";
    import clang from "svelte-highlight/languages/c";
    import { marked } from "marked";
    import admonition from "marked-admonition-extension";
    import codeStyle from "svelte-highlight/styles/github";
    import FoldableFeedback from "./FoldableFeedback.svelte";
    export let data;

    marked.use(admonition);
</script>

<svelte:head>
    {@html codeStyle}
</svelte:head>

<details>
    <pre>{JSON.stringify(data, null, 2)}</pre>
</details>

{#if !data.exercises || data.exercises.length == 0}
    Vide
{:else}
    <h2>{data.exercises[0].title}</h2>
    <p>
        <a href="/player/environment/{data.exercises[0].sessionId}"
            >Environment</a
        >
    </p>
    <div class="statement">
        {@html marked(data.exercises[0].statement)}
    </div>

    <div class="container-fluid">
        {#each data.exercises as { feedbacks, form, components }}
            <div class="answer row">
                {#each components as component}
                    {#if component.selector == "wc-code-editor"}
                        <div class="col">
                            <Highlight language={clang} code={component.code} />
                        </div>
                    {/if}
                {/each}
                <div class="col">
                    {#if feedbacks}
                        {#each feedbacks as { type, content }}
                            <div class={type}>
                                {@html marked(content.replaceAll(":::", "!!!"))}
                            </div>
                        {/each}
                    {/if}
                    {#each components as component}
                        {#if component.selector == "wc-foldable-feedback"}
                            <FoldableFeedback content={component.content} />
                        {/if}
                    {/each}
                </div>
            </div>
        {/each}
    </div>
{/if}

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
