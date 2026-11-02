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

        if (array.length > 0 && typeof(array[0][column]) == "string") {
            sort = (a: T, b: T) => (a[column] as string).localeCompare(b[column] as string) * sortModifier;
        }

        array = array.sort(sort);
    };
</script>

<table class="table table-striped table-hover table-sm ">
    <thead>
        <tr>
            {#each keys as key}
                <th on:click={() => sort(key)}>{key}</th>
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
