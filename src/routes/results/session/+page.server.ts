export async function load({ cookies }) {
    const session = await fetch(`https://platon.univ-eiffel.fr/api/v1/results/session`, {
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