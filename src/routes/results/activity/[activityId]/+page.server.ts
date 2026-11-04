import type { ActivityResults } from "#lib/platon-types/result/results.model.js";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async function ({ params, cookies }) {
    const activityId = params.activityId;

    const activity: ActivityResults = await fetch(`https://platon.univ-eiffel.fr/api/v1/results/activity/${activityId}`, {
        "credentials": "include",
        "headers": {
            "Accept": "application/json, text/plain, */*",
            "Authorization": `Bearer ${cookies.get('token')}`,
        },
        "method": "GET",
        "mode": "cors"
    }).then((r) => r.json());

    return activity;
}