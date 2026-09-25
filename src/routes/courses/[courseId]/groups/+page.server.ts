export async function load({ params, cookies }) {
    const courseId = params.courseId;

    const groups = await fetch(`https://platon.univ-eiffel.fr/api/v1/courseGroups/${courseId}`, {
        "credentials": "include",
        "headers": {
            "Accept": "application/json",
            "Authorization": `Bearer ${cookies.get('token')}`,
        },
        "method": "GET",
        "mode": "cors"
    }).then((r) => r.json());

    return groups;
}