import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async function ({ params, cookies }) {
    const activityId = params.activityId;

    const activity = await fetch(`https://platon.univ-eiffel.fr/api/v1/player/play/activity`, {
        "credentials": "include",
        "headers": {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${cookies.get('token')}`,
        },
        "body": JSON.stringify({ "activityId": activityId }),
        "method": "POST",
        "mode": "cors"
    }).then((r) => r.json());

    return activity;
}