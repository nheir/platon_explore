<script lang="ts">
    import { resolve } from "$app/paths";

    import Highlight from "svelte-highlight";
    import clang from "svelte-highlight/languages/c";
    import diff from "svelte-highlight/languages/diff";
    import codeStyle from "svelte-highlight/styles/github";

    import { marked } from "marked";
    import admonition from "marked-admonition-extension";

    import { createPatch } from "diff";

    import CheckBoxGroup from "../../../CheckBoxGroup.svelte";
    import CodeEditor from "../../../CodeEditor.svelte";
    import CodeViewer from "../../../CodeViewer.svelte";
    import FoldableFeedback from "../../../FoldableFeedback.svelte";
    import InputBox from "../../../InputBox.svelte";
    import RadioGroup from "../../../RadioGroup.svelte";

    export let data;

    marked.use(admonition);

    let diffMode: "none" | "prev" | "next" = "none";

    const codeOf = (ex: any): string | undefined =>
        ex?.parts?.find(
            (p: any) =>
                p.type === "component" &&
                p.component.selector === "wc-code-editor",
        )?.component.code;

    // null si pas de voisine ou pas de mode diff
    function getDiff(exercises: any[], i: number, mode: string) {
        if (mode === "none") return null;
        const cur = codeOf(exercises[i]);
        const other = codeOf(exercises[mode === "prev" ? i - 1 : i + 1]);
        if (cur == null || other == null) return null;
        return mode === "prev"
            ? createPatch("code", other, cur, undefined, undefined, {
                  ignoreWhitespace: true,
              })
            : createPatch("code", cur, other, undefined, undefined, {
                  ignoreWhitespace: true,
              });
    }
</script>

<svelte:head>
    {@html codeStyle}
</svelte:head>

<fieldset>
    <label><input type="radio" name="mode" id="radio-tout" checked />Tout</label
    >
    <label><input type="radio" name="mode" id="radio-code" />Form seul</label>
    <label
        ><input type="radio" name="mode" id="radio-feedback" />Feedback seul</label
    >
</fieldset>

<label>
    Diff :
    <select bind:value={diffMode}>
        <option value="none">Aucun</option>
        <option value="prev">vs précédente</option>
        <option value="next">vs suivante</option>
    </select>
</label>

{#if !data.exercises || data.exercises.length == 0}
    Vide
{:else}
    <h2>{data.exercises[0].title}</h2>
    <p>
        <a
            href={resolve("/player/environment/[sessionId]", {
                sessionId: data.exercises[0].sessionId,
            })}>Environment</a
        >
    </p>

    <div class="statement">
        {@html marked(data.exercises[0].statement)}
    </div>

    {#snippet renderComponent(component)}
        <svelte:boundary>
            {#if component.selector == "wc-foldable-feedback"}
                <FoldableFeedback content={component.content} />
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

    <table>
        <tbody>
            <tr><td>startedAt</td><td>{data.exercises[0].startedAt}</td></tr>
            <tr
                ><td>lastGradedAt</td><td>{data.exercises[0].lastGradedAt}</td
                ></tr
            >
        </tbody>
    </table>

    <div class="container-fluid">
        {#each data.exercises as { feedbacks, parts }, i}
            {@const code = codeOf(data.exercises[i])}
            {@const patch = getDiff(data.exercises, i, diffMode)}
            <div class="answer row">
                <div class="code col">
                    {#each parts as part}
                        {#if part.type === "text"}
                            {@html marked(part.text)}
                        {:else if part.component.selector !== "wc-code-editor"}
                            {@render renderComponent(part.component)}
                        {:else}
                            <div class="border rounded p-2 bg-light">
                                {#if patch}
                                    <Highlight language={diff} code={patch} />
                                {:else}
                                    <Highlight language={clang} {code} />
                                {/if}
                            </div>
                        {/if}
                    {/each}
                </div>
                <div class="feedback col">
                    {#if feedbacks}
                        {#each feedbacks as { type, content }}
                            {#if content.replaceAll}
                                <div class={type}>
                                    {@html marked(
                                        content.replaceAll(":::", "!!!"),
                                    )}
                                </div>
                            {:else}
                                <FoldableFeedback {content} />
                            {/if}
                        {/each}
                    {/if}
                </div>
            </div>
        {/each}
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
    fieldset:has(#radio-code:checked) ~ div .feedback,
    fieldset:has(#radio-feedback:checked) ~ div .code {
        display: none;
    }

    .diff {
        margin: 0;
        white-space: pre-wrap;
    }
    .diff .added {
        background: #0f03;
    }
    .diff .removed {
        background: #f003;
        text-decoration: line-through;
    }
</style>
