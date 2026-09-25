export async function load({ params, cookies }) {
    const activityId = params.activityId;

    const activity = await fetch(`https://platon.univ-eiffel.fr/api/v1/results/activity/${activityId}`, {
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