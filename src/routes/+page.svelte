<script>
    import { resolve } from "$app/paths";

</script>
<form method="post" action="{resolve("/jwt")}">
    <input name="token" placeholder="Placer ici le token d'accès">
    <input value="Use" type="submit">
</form>

<a href="https://platon.univ-eiffel.fr/">Platon</a>
