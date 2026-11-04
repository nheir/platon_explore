import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async function ({ params, cookies }) {
    const activitySessionId = params.activitySessionId;
    const exerciseSessionId = params.exerciseSessionId;

    console.log(params);

    const exercises = await fetch(`https://platon.univ-eiffel.fr/api/v1/player/play/exercises`, {
        "credentials": "include",
        "headers": {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${cookies.get('token')}`,
        },
        "body": JSON.stringify({ "activitySessionId": activitySessionId, "exerciseSessionIds": [exerciseSessionId] }),
        "method": "POST",
        "mode": "cors"
    }).then((r) => r.json());

    return exercises;
}