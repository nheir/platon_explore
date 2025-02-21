import { Bearer } from '$lib';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
    const courseId = params.courseId;

    const course = await fetch(`https://platon.univ-eiffel.fr/api/v1/courses/${courseId}`, {
        "credentials": "include",
        "headers": {
            "Accept": "application/json",
            "Authorization": `Bearer ${Bearer}`,
        },
        "method": "GET",
        "mode": "cors"
    }).then((r) => r.json());

    return course;
}