export async function load({ cookies }) {
    const corrections = await fetch(`https://platon.univ-eiffel.fr/api/v1/results/corrections`, {
        "credentials": "include",
        "headers": {
            "Accept": "application/json",
            "Authorization": `Bearer ${cookies.get('token')}`,
        },
        "method": "GET",
        "mode": "cors"
    }).then((r) => r.json());

    return corrections;
}