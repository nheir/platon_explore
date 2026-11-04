import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async function ({ params, cookies }) {
    const activitySessionId = params.activitySessionId;

    const activity = await fetch(`https://platon.univ-eiffel.fr/api/v1/player/openSession/${activitySessionId}`, {
        "credentials": "include",
        "headers": {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${cookies.get('token')}`,
        },
        "method": "POST",
        "mode": "cors"
    }).then((r) => r.json());

    if (!activity.activity) error(activity.statusCode, activity.message);

    return activity;
}