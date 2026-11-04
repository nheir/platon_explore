import type { User } from "#lib/platon-types/core/user.model.js";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async function ({ params, cookies }) {
    const userIdOrName = params.userIdOrName;

    const users = await fetch(`https://platon.univ-eiffel.fr/api/v1/users/${userIdOrName}`, {
        "credentials": "include",
        "headers": {
            "Accept": "application/json, text/plain, */*",
            "Authorization": `Bearer ${cookies.get('token')}`,
        },
        "method": "GET",
        "mode": "cors"
    }).then((r) => r.json());

    return users.resource as User;
}