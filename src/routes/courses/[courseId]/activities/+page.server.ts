import type { Activity } from "#lib/platon-types/course/activity.model.d.ts";

export async function load({ params, cookies }) {
    const courseId = params.courseId;

    const activities = await fetch(`https://platon.univ-eiffel.fr/api/v1/courses/${courseId}/activities`, {
        "credentials": "include",
        "headers": {
            "Accept": "application/json",
            "Authorization": `Bearer ${cookies.get('token')}`,
        },
        "method": "GET",
        "mode": "cors"
    }).then((r) => r.json());

    return activities as { resources: Activity[] };
}