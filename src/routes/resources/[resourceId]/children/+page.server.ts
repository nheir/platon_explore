import type { Resource } from "#lib/platon-types/resource/resource.model.js";

export async function load({ params, cookies }) {
    const resourceId = params.resourceId;

    const getParams = new URLSearchParams();
    getParams.append("parents", resourceId);
    const resource = await fetch(`https://platon.univ-eiffel.fr/api/v1/resources?${getParams}`, {
        "credentials": "include",
        "headers": {
            "Accept": "application/json",
            "Authorization": `Bearer ${cookies.get('token')}`,
        },
        "method": "GET",
        "mode": "cors"
    }).then((r) => r.json());

    return resource as { resources: Resource[]};
}
