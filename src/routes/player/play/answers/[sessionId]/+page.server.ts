import { Bearer } from '$lib';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
    const sessionId = params.sessionId;

    const answers = await fetch(`https://platon.univ-eiffel.fr/api/v1/player/play/answers`, {
        "credentials": "include",
        "headers": {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${Bearer}`,
        },
        "body": JSON.stringify({ "sessionId": sessionId }),
        "method": "POST",
        "mode": "cors"
    }).then((r) => r.json());

    answers.exercises.reverse();

    const answerRegex = />(\{.*\})</;
    for (const a of answers.exercises) {
        a.form = a.form.match(answerRegex);
        a.form = JSON.parse(a.form[1]);
    }

    return answers;
}