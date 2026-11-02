<script>
    import { resolve } from "$app/paths";

</script>
<form method="post" action="{resolve("/jwt", {})}">
    <input name="token">
    <input value="Use" type="submit">
</form>

<a href="https://platon.univ-eiffel.fr/">Platon</a>
