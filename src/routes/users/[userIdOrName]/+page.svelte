<script lang="ts">
    import type { User } from "../../../lib/platon-types/core/user.model";

    export let data: User;

    const keys: (keyof User)[] = [
        "id",
        "username",
        "firstName",
        "lastName",
        "hasPassword",
        "createdAt",
        "updatedAt",
        "active",
        "role",
        "email",
        "firstLogin",
        "lastLogin",
        "discordId",
        "lastActivity",
    ];
</script>

<table>
    <tbody>
        {#each keys as key}
            <tr><th>{key}</th><td>{data[key]}</td></tr>
        {/each}
    </tbody>
</table>

<details>
    <pre>{JSON.stringify(data, null, 2)}</pre>
</details>
