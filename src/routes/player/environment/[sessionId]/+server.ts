export async function GET({ params, cookies }) {
    const environment = await fetch(`https://platon.univ-eiffel.fr/api/v1/player/environment/${params.sessionId}`, {
        "credentials": "include",
        "headers": {
            "Accept": "application/gzip",
            "Authorization": `Bearer ${cookies.get('token')}`,
        },
        "method": "GET",
        "mode": "cors"
    });

    return environment;
}