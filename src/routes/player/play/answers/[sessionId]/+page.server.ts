import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async function ({ params, cookies }) {
    const sessionId = params.sessionId;

    const answers = await fetch(`https://platon.univ-eiffel.fr/api/v1/player/play/answers`, {
        "credentials": "include",
        "headers": {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${cookies.get('token')}`,
        },
        "body": JSON.stringify({ "sessionId": sessionId }),
        "method": "POST",
        "mode": "cors"
    }).then((r) => r.json());

    if (answers.exercises) {
        answers.exercises.reverse();

        const answerRegex = /<script type='application\/json' id='([-0-9a-f]+)'>(\{.*\})<\/script>/g;
        for (const a of answers.exercises) {
            const form = a.form as string;
            a.components = {}
            a.form_without_components = form.replaceAll(answerRegex, function (match, id, json) {
                try {
                    const payload = JSON.parse(json);
                    a.components[id] = payload;
                    return "";
                } catch { }
                return match;
            });
        }

        const formRegex = /<([-a-z]+) data-script-id='([-0-9a-f]+)' cid='([-0-9a-f]+)'>.*?<\/[-a-z]+>/g;
        for (const a of answers.exercises) {
            const form = a.form_without_components as string;
            a.form_without_components = form.replaceAll(formRegex, function(match, tag, id, cid) {
                if (a.components[id]) {
                    return "" + a.components[id].value + "\n";
                }
                return match;
            });
        }

    }

    return answers;
}