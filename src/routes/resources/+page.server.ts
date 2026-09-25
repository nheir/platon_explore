export async function load({ cookies }) {
    const resource = await fetch(`https://platon.univ-eiffel.fr/api/v1/resources?types=CIRCLE`, {
        "credentials": "include",
        "headers": {
            "Accept": "application/json",
            "Authorization": `Bearer ${cookies.get('token')}`,
        },
        "method": "GET",
        "mode": "cors"
    }).then((r) => r.json());

    return resource as { resources: Platon.Resource[]};
}