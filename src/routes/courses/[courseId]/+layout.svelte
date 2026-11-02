<script>
    import { resolve } from '$app/paths';

    export let data;
</script>

<nav>
    <a href="{resolve("/courses/[courseId]/activities", {courseId: data.courseId})}">activities</a>
    <a href="{resolve("/courses/[courseId]/groups", {courseId: data.courseId})}">groups</a>
    <a href="{resolve("/courses/[courseId]/members", {courseId: data.courseId})}">members</a>
</nav>

<slot></slot>