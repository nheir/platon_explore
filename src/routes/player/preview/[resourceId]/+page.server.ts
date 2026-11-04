import type { ExercisePlayer, PreviewOuput } from "#lib/platon-types/player/player.model.js";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async function ({ params, cookies }) {
    const resourceId = params.resourceId;

    const preview: PreviewOuput = await fetch(`https://platon.univ-eiffel.fr/api/v1/player/preview`, {
        "credentials": "include",
        "headers": {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${cookies.get('token')}`,
        },
        "body": JSON.stringify({ "resource": resourceId, "version": "latest" }),
        "method": "POST",
        "mode": "cors"
    }).then((r) => r.json());

    return preview;
}