import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async function ({ cookies }) {
    const courses = await fetch(`https://platon.univ-eiffel.fr/api/v1/courses`, {
        "credentials": "include",
        "headers": {
            "Accept": "application/json",
            "Authorization": `Bearer ${cookies.get('token')}`,
        },
        "method": "GET",
        "mode": "cors"
    }).then((r) => r.json());

    return courses;
}