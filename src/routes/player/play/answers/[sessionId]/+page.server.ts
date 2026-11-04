import type { ExercisePlayer } from '#lib/platon-types/player/player.model.js';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async function ({ params, cookies }) {
    const sessionId = params.sessionId;

    const answers: { exercises: ExercisePlayer[]; } = await fetch(`https://platon.univ-eiffel.fr/api/v1/player/play/answers`, {
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

    return answers;
}