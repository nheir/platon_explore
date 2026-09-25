<script lang="ts" generics="T">
    export let array: T[];
    export let keys: (keyof T)[];

    // Holds table sort state.  Initialized to reflect table sorted by id column ascending.
    let sortBy = { col: keys[0], ascending: true };

    $: sort = (column: keyof T) => {
        if (sortBy.col == column) {
            sortBy.ascending = !sortBy.ascending;
        } else {
            sortBy.col = column;
            sortBy.ascending = true;
        }

        // Modifier to sorting function for ascending or descending
        let sortModifier = sortBy.ascending ? 1 : -1;

        let sort = (a: T, b: T) =>
            a[column] < b[column]
                ? -1 * sortModifier
                : a[column] > b[column]
                  ? 1 * sortModifier
                  : 0;

        array = array.sort(sort);
    };
</script>

<table>
    <thead>
        <tr>
            {#each keys as key}
                <th on:click={sort(key)}>{key}</th>
            {/each}
        </tr>
    </thead>
    <tbody>
        {#each array as row}
            <tr
                ><slot name="row" {row}>
                    {#each keys as key}
                        <td>{row[key]}</td>
                    {/each}
                </slot>
            </tr>
        {/each}
    </tbody>
</table>
