import { fail, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async function ({ params, cookies }) {
    const courseId = params.courseId;
    const groupId = params.groupId;

    const groups = await fetch(`https://platon.univ-eiffel.fr/api/v1/courseGroupMembers/${courseId}/${groupId}`, {
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