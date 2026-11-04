<script lang="ts">
    import { resolve } from "$app/paths";

    import Highlight from "svelte-highlight";
    import clang from "svelte-highlight/languages/c";
    import diff from "svelte-highlight/languages/diff";
    import codeStyle from "svelte-highlight/styles/github";

    import { marked } from "marked";
    import admonition from "marked-admonition-extension";

    import { createPatch } from "diff";

    import CheckBoxGroup from "./CheckBoxGroup.svelte";
    import CodeEditor from "./CodeEditor.svelte";
    import CodeViewer from "./CodeViewer.svelte";
    import FoldableFeedback from "./FoldableFeedback.svelte";
    import InputBox from "./InputBox.svelte";
    import RadioGroup from "./RadioGroup.svelte";

    import type { ExercisePlayer } from "#lib/platon-types/player/player.model.js";

    export let exercises: ExercisePlayer[];
    export let dontRepeatStatement = true;
    export let reversed = true;

    const processedExercises: (ExercisePlayer & {
        parts: (
            | { type: "text"; text: string }
            | { type: "component"; component: any }
        )[];
    })[] = [];

    for (const exercise of exercises) {
        const scriptRegex = /<script type='application\/json' id='([-0-9a-f]+)'>(\{.*?\})<\/script>/g;
        const tagRegex = /<([-a-z]+) data-script-id='([-0-9a-f]+)' cid='([-0-9a-f]+)'>.*?<\/[-a-z]+>/g;

        const components: Record<string, any> = {};

        // 1. extrait les JSON et retire <style>
        const form = (exercise.form as string)
            .replace(/<style>[\s\S]*?<\/style>/g, "")
            .replaceAll(scriptRegex, (match, id, json) => {
                try {
                    components[id] = JSON.parse(json);
                    return "";
                } catch {
                    return match;
                }
            });

        // 2. découpe le texte aux emplacements des balises <wc-...>
        const parts: ({ type: "text"; text: string } | { type: "component"; component: any })[] = [];
        let last = 0;
        for (const m of form.matchAll(tagRegex)) {
            const [match, , id] = m;
            if (m.index > last) parts.push({ type: "text", text: form.slice(last, m.index) });
            parts.push(
                components[id]
                    ? { type: "component", component: components[id] }
                    : { type: "text", text: match },
            );
            last = m.index + match.length;
        }
        if (last < form.length) parts.push({ type: "text", text: form.slice(last) });

        processedExercises.push({parts, ...exercise});
    }

    if (reversed) processedExercises.reverse();

    marked.use(admonition);
    
    const markdown = (str: string) => {
        try {
            return { html: marked(str) };
        } catch {
            return { raw: str };
        }
    };

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

{#snippet mark(str: string)}
    {@const m = markdown(str)}
    {#if m.html}
        {@html m.html}
    {:else}
        <pre>{m.raw}</pre>
    {/if}
{/snippet}

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

{#snippet renderComponent(component: any)}
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

{#each processedExercises as exercise, i}
    {@const code = codeOf(exercise)}
    {@const patch = getDiff(processedExercises, i, diffMode)}
    <div class="container-fluid">
        {#if !dontRepeatStatement || i == 0}
            <h2>{exercise.title}</h2>

            <p>
                <a
                    href={resolve("/player/environment/[sessionId]", {
                        sessionId: exercise.sessionId,
                    })}>Environment</a
                >
            </p>

            <div class="statement">
                {@render mark(exercise.statement)}
            </div>

            <table>
                <tbody>
                    <tr><td>startedAt</td><td>{exercise.startedAt}</td></tr>
                    <tr
                        ><td>lastGradedAt</td><td
                            >{exercise.lastGradedAt}</td
                        ></tr
                    >
                </tbody>
            </table>
        {/if}

        <div class="answer row">
            <div class="code col">
                {#each exercise.parts as part}
                    {#if part.type === "text"}
                        {@render mark(part.text)}
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
                {#if exercise.feedbacks}
                    {#each exercise.feedbacks as { type, content }}
                        {#if content.replaceAll}
                            <div class={type}>
                                {@render mark(content.replaceAll(":::", "!!!"))}
                            </div>
                        {:else}
                            <FoldableFeedback {content} />
                        {/if}
                    {/each}
                {/if}
            </div>
        </div>
    </div>
{/each}

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
</style>
