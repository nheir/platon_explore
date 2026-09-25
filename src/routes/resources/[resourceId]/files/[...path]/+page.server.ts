export async function load({ params, cookies }) {
    const resourceId = params.resourceId;
    const path = params.path;
    const resource = await fetch(`https://platon.univ-eiffel.fr/api/v1/files/${resourceId}/${path}`, {
        "credentials": "include",
        "headers": {
            "Accept": "application/json",
            "Authorization": `Bearer ${cookies.get('token')}`,
        },
        "method": "GET",
        "mode": "cors"
    }).then((r) => {
        const contentType = r.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
            return r.json();
        } else {
            return r.text().then(text => ({text:text}));
        }
    });
    return resource as Platon.ResourceFile;
} 
