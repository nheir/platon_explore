export async function load({ params, cookies }) {
    const resourceId = params.resourceId;

    const resource = await fetch(`https://platon.univ-eiffel.fr/api/v1/resources/${resourceId}`, {
        "credentials": "include",
        "headers": {
            "Accept": "application/json",
            "Authorization": `Bearer ${cookies.get('token')}`,
        },
        "method": "GET",
        "mode": "cors"
    }).then((r) => r.json());

    return resource;
}