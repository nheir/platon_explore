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

    if (answers.exercises) {
        answers.exercises.reverse();

        const answerRegex = />(\{.*\})</g;
        for (const a of answers.exercises) {
            const form = a.form;
            const groups = form.matchAll(answerRegex);
            a.components = [];
            for (const group of groups) {
                try {
                    a.components.push(JSON.parse(group[1]));
                } catch { }
            }
        }
    }

    return answers;
}