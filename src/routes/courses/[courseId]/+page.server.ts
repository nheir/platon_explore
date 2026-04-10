export async function load({ params, cookies}) {
    const courseId = params.courseId;

    const course = await fetch(`https://platon.univ-eiffel.fr/api/v1/courses/${courseId}`, {
        "credentials": "include",
        "headers": {
            "Accept": "application/json",
            "Authorization": `Bearer ${cookies.get('token')}`,
        },
        "method": "GET",
        "mode": "cors"
    }).then((r) => r.json());

    return course;
}