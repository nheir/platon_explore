<script lang="ts">
    import { AnswerStateColors, answerStateFromGrade, AnswerStateLabels, type AnswerStates } from "#lib/platon-types/result/answer.model.js";


    export let state: AnswerStates | undefined = undefined;
    export let grade: number | null | undefined = undefined;

    $: s = state ?? answerStateFromGrade(grade);
</script>

<span class="badge rounded-pill text-dark" style:background-color={AnswerStateColors[s]}>
    {AnswerStateLabels[s]}{#if grade != null && grade >= 0}&nbsp;({grade} %){/if}
</span>

<style>
    span {
        min-width: 8em;
    }
</style>