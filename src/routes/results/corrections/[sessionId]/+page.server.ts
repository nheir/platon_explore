import { Bearer } from '$lib';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
    const sessionId = params.sessionId;

    const activity = await fetch(`https://platon.univ-eiffel.fr/api/v1/results/corrections/${sessionId}`, {
        "credentials": "include",
        "headers": {
            "Accept": "application/json",
            "Authorization": `Bearer ${Bearer}`,
        },
        "method": "GET",
        "mode": "cors"
    }).then((r) => r.json());

    return activity;
}