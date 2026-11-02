<script lang="ts">
    import { resolve } from "$app/paths";
    import 'bootstrap/dist/css/bootstrap.min.css';
</script>

<nav>
    <a href="{resolve("/")}">home</a>
    <a href="{resolve("/courses")}">courses</a>
    <a href="{resolve("/results/corrections")}">corrections</a>
    <a href="{resolve("/resources")}">resources</a>
</nav>

<slot></slot>