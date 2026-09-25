<script>
    export let data;
</script>

<nav>
    <a href="/courses/{data.courseId}/activities">activities</a>
    <a href="/courses/{data.courseId}/groups">groups</a>
    <a href="/courses/{data.courseId}/members">members</a>
</nav>

<slot></slot>