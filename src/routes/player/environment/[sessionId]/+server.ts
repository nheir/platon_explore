import { Bearer } from '$lib';
import { error } from '@sveltejs/kit';

export async function GET({ params }) {
    const environment = await fetch(`https://platon.univ-eiffel.fr/api/v1/player/environment/${params.sessionId}`, {
        "credentials": "include",
        "headers": {
            "Accept": "application/gzip",
            "Authorization": `Bearer ${Bearer}`,
        },
        "method": "GET",
        "mode": "cors"
    });

    return environment;
}