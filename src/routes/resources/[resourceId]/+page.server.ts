import { fail, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async function ({ params, cookies }) {
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

export const actions: Actions = {
    update: async ({ request, fetch, params, cookies }) => {
        const resourceId = params.resourceId;
        const form = await request.formData();
        const payload = Object.fromEntries(form);

        const res = await fetch(`https://platon.univ-eiffel.fr/api/v1/resources/${resourceId}`, {
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

    move: async ({ request, fetch, params, cookies }) => {
        const resourceId = params.resourceId;
        const form = await request.formData();
        const payload = Object.fromEntries(form);

        const res = await fetch(`https://platon.univ-eiffel.fr/api/v1/resources/${resourceId}/move`, {
            method: 'PATCH',
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${cookies.get('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ parentId: payload.circle })
        });

        if (!res.ok) return fail(res.status, { error: await res.text() });
        return { success: true, resource: await res.json() };
    },

    template: async ({ request, fetch, params, cookies }) => {
        const resourceId = params.resourceId;
        const form = await request.formData();
        const payload = Object.fromEntries(form);

        if (!!payload.template) {
            const res = await fetch(`https://platon.univ-eiffel.fr/api/v1/resources/${resourceId}/template`, {
                method: 'PATCH',
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${cookies.get('token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ templateId: payload.templateId, templateVersion: payload.templateVersion })
            });
            
            if (!res.ok) return fail(res.status, { error: await res.text() });
            return { success: true, resource: await res.json() };
        } else {
            const res = await fetch(`https://platon.univ-eiffel.fr/api/v1/resources/${resourceId}/template`, {
                method: 'DELETE',
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${cookies.get('token')}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!res.ok) return fail(res.status, { error: await res.text() });
            return { success: true, resource: await res.json() };
        }
    }
};