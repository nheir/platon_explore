import { Bearer } from '$lib';

export async function load({ params }) {
    const sessionId = params.sessionId;

    const comments = await fetch(`https://platon.univ-eiffel.fr/api/v1/results/session/${sessionId}/comments`, {
        "credentials": "include",
        "headers": {
            "Accept": "application/json",
            "Authorization": `Bearer ${Bearer}`,
        },
        "method": "GET",
        "mode": "cors"
    }).then((r) => r.json());

    return comments;
}