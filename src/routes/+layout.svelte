<script lang="ts">
    import "../app.scss";
    // import "marked-admonition-extension/dist/index.css";

    let bearer: string = "";
</script>

<nav>
    <a href="/">home</a>
    <a href="/courses">courses</a>
    <a href="/results/corrections">corrections</a>
</nav>

<code>{bearer}</code>
<slot></slot>