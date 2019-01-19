<template>
    <div class="ref">
        <!--递归调用自身-->
        <CommentReply v-if="parentComment.parentComment!=null" :parent-comment="parentComment.parentComment"></CommentReply>
        <h4>引用来自“{{parentComment.author.username}}”的评论</h4>
        <p v-html="parentComment.commentHTML"></p>
    </div>
</template>

<script>
    export default {
        name: "CommentReply",
        props:['parentComment']
    }
</script>

<style scoped>
    .comment .content .ref {
        position: relative;
        margin: 10px;
        color: #6a6a6a;
    }
    .comment .content .ref:before {
        position: absolute;
        content: '';
        border-left: 1px solid #c8c7cc;
        height: 100%;
        margin-left: -10px;
    }

    .comment .content .ref h4 {
        font-size:1em;
        font-weight: 700;
        padding: 0;
        margin: 0 0 5px;
    }
</style>