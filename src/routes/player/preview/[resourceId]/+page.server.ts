import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async function ({ params, cookies }) {
    const resourceId = params.resourceId;

    const preview = await fetch(`https://platon.univ-eiffel.fr/api/v1/player/preview`, {
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

    if (preview.exercise) {
        const exercise = preview.exercise;
        const scriptRegex = /<script type='application\/json' id='([-0-9a-f]+)'>(\{.*?\})<\/script>/g;
        const tagRegex = /<([-a-z]+) data-script-id='([-0-9a-f]+)' cid='([-0-9a-f]+)'>.*?<\/[-a-z]+>/g;

        const components: Record<string, any> = {};

        // 1. extrait les JSON et retire <style>
        const form = (exercise.form as string)
            .replace(/<style>[\s\S]*?<\/style>/g, "")
            .replaceAll(scriptRegex, (match, id, json) => {
                try {
                    components[id] = JSON.parse(json);
                    return "";
                } catch {
                    return match;
                }
            });

        // 2. découpe le texte aux emplacements des balises <wc-...>
        const parts: ({ type: "text"; text: string } | { type: "component"; component: any })[] = [];
        let last = 0;
        for (const m of form.matchAll(tagRegex)) {
            const [match, , id] = m;
            if (m.index > last) parts.push({ type: "text", text: form.slice(last, m.index) });
            parts.push(
                components[id]
                    ? { type: "component", component: components[id] }
                    : { type: "text", text: match },
            );
            last = m.index + match.length;
        }
        if (last < form.length) parts.push({ type: "text", text: form.slice(last) });

        exercise.parts = parts;

    }

    return preview;
}