<script lang="ts">
    import { resolve } from "$app/paths";
    import { page } from "$app/state";
    import 'bootstrap/dist/css/bootstrap.min.css';
</script>

<nav class="navbar navbar-expand-lg border-bottom px-3 bg-body-tertiary">
    <div class="navbar-nav">
        <a class="nav-link" href="{resolve("/")}">home</a>
        <a class="nav-link" class:active={page.url.pathname.startsWith(resolve("/courses"))} href="{resolve("/courses")}">courses</a>
        <a class="nav-link" class:active={page.url.pathname.startsWith(resolve("/results"))} href="{resolve("/results/corrections")}">corrections</a>
        <a class="nav-link" class:active={page.url.pathname.startsWith(resolve("/resources"))} href="{resolve("/resources")}">resources</a>
    </div>
</nav>

<slot></slot>