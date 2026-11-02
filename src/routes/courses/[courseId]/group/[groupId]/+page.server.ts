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


export const actions: Actions = {
    update: async ({ request, fetch, params, cookies }) => {
        const courseId = params.courseId;
        const groupId = params.groupId;
        const form = await request.formData();
        const payload = Object.fromEntries(form);

        const res = await fetch(`https://platon.univ-eiffel.fr/api/v1/courseGroupMembers/${courseId}/${groupId}`, {
            method: 'PATCH',
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${cookies.get('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });

        if (!res.ok) return fail(res.status, { error: await res.text() });
        return { success: true, resource: await res.json() };
    },
};