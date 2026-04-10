export async function load({ params, cookies }) {
    const sessionId = params.sessionId;

    const session = await fetch(`https://platon.univ-eiffel.fr/api/v1/results/session/${sessionId}`, {
        "credentials": "include",
        "headers": {
            "Accept": "application/json",
            "Authorization": `Bearer ${cookies.get('token')}`,
        },
        "method": "GET",
        "mode": "cors"
    }).then((r) => r.json());

    return session;
}