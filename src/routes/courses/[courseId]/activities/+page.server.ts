import { Bearer } from '$lib';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
    const courseId = params.courseId;

    const activities = await fetch(`https://platon.univ-eiffel.fr/api/v1/courses/${courseId}/activities`, {
        "credentials": "include",
        "headers": {
            "Accept": "application/json",
            "Authorization": `Bearer ${Bearer}`,
        },
        "method": "GET",
        "mode": "cors"
    }).then((r) => r.json());

    return activities;
}