<script>
    import { resolve } from '$app/paths';

    export let data;
</script>

<nav class="navbar navbar-expand-lg nav-pills bg-body-tertiary border-bottom px-3 py-1 small">
    <div class="navbar-nav">
        <a class="nav-link" href="{resolve("/courses/[courseId]/activities", {courseId: data.courseId})}">activities</a>
        <a class="nav-link" href="{resolve("/courses/[courseId]/groups", {courseId: data.courseId})}">groups</a>
        <a class="nav-link" href="{resolve("/courses/[courseId]/members", {courseId: data.courseId})}">members</a>
    </div>
</nav>

<slot></slot>