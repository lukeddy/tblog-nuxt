<template>
    <li v-if="post!=null" class="post-item">
        <div class="entry">
            <div class="content-box">
                <div class="info-box">
                    <div class="meta-row">
                        <ul class="meta-list">
                            <li v-if="post.top" class="item recommended">置顶</li>
                            <li class="item username"><a href="/tblog/pub/user/5b7d59bbbf578d05d7046ef6">{{post.author.username}}</a>.{{post.friendlyTime}}</li>
                            <li class="item category"><a @click="goToTab(post.category.catDir)"><span class="topiclist-tab">{{post.category.catName}}</span></a></li>
                            <li class="item tag"><a class="tag" href="/tblog/tag/"></a></li>
                            <li class="item">{{post.visitCount}}次阅读</li>
                        </ul>
                    </div>
                    <div class="title-row">
                        <nuxt-link :to="`/post/${post.id}`">{{post.title}}</nuxt-link>
                    </div>
                    <div class="desc-row">{{post.desc}}</div>
                    <div class="action-row">
                        <div class="action-list">
                            <a class="action like" href="javascript:;">
                                <span class="icon"></span>
                                <span class="title">1</span>
                            </a>
                            <a class="action comment" href="/tblog/topic/5b87dceabf578d115d2357ac#comment">
                                <span class="icon"></span>
                                <span class="title">{{post.replyCount}}评论</span>
                            </a>
                            <a class="action collect hover" href="javascript:;">
                                <span class="icon"></span>
                                <span class="title">{{post.collectCount}}收藏</span>
                            </a>
                            <a class="action share hover" href="javascript:;">
                                <span class="icon"></span>
                                <span class="title">分享</span>
                            </a>
                        </div>
                    </div>
                </div>
                <div v-if="post.thumbURL" class="thumb-box" :style="{backgroundSize: 'cover',backgroundImage:'url('+thumbBG+')'}"></div>
            </div>
        </div>
    </li>
</template>

<script>
    export default {
        name: "PostItem",
        props:['post','goToTab'],
        data(){
            return {
                thumbBG:process.env.serverBaseUrl+this.post.thumbURL
            }
        }
    }
</script>

<style scoped>

    li{
        list-style: none;
    }

     .post-item {
        border-bottom: 1px solid rgba(178, 186, 194, 0.15);
    }

    .post-item .entry:hover {
        background-color: #f9fafd;
    }

    .post-item .entry-link {
        display: block;
        height: 100%;
        text-decoration: none;
        cursor: pointer;
        color: #909090;
    }

    .post-item .content-box {
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        padding: 1.7rem 2rem 1.4rem;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
    }

    .content-box .info-box {
        -webkit-box-flex: 1;
        -ms-flex: 1 1 auto;
        flex: 1 1 auto;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -ms-flex-direction: column;
        flex-direction: column;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        min-width: 0;
    }

    .content-box .thumb-box {
        background-size: cover;
        background: no-repeat 50%;
        -webkit-box-flex: 0;
        -ms-flex: 0 0 auto;
        flex: 0 0 auto;
        width: 6.25rem;
        height: 6.25rem;
        margin-left: 2rem;
        border-radius: 2px;
    }

    .info-box .meta-row {
        font-size: 1rem;
        color: #8a9aa9;
    }

    .meta-row .meta-list {
        margin: 0;
        padding: 0;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: baseline;
        -ms-flex-align: baseline;
        align-items: baseline;
        white-space: nowrap;
    }

    .meta-list .item:not(:last-child):after {
        content: "\B7";
        margin: 0 0.4em;
        color: #8a9aa9;
    }

    .meta-list .item.recommended {
        color: #f70;
        margin: 0 0.4em;
    }

    .meta-list .item.tag,
    .meta-list .item.username {
        text-overflow: ellipsis;
        overflow: hidden;
    }

    .meta-list .item.username {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: baseline;
        -ms-flex-align: baseline;
        align-items: baseline;
        max-width: 12em;
    }

    .meta-list .item.username > a {
        font-weight: 700;
        color: #3b76c5;
    }

    .meta-list .item.tag {
        min-width: 0;
        white-space: nowrap;
    }

    .meta-list .item .tag:not(:last-child):after {
        content: "/";
        margin: 0 0.5em;
        color: #b2bac2;
    }

    .info-box .title-row {
        margin-top: 0.9rem;
        color: #2e3135;
    }

    .title-row .title {
        font-size: 1.46rem;
        font-weight: 600;
        line-height: 1.5;
    }

    .info-box .desc-row {
        display: -webkit-box;
        margin-top: 0.5rem;
        max-height: 3.2em;
        font-size: 1.35rem;
        line-height: 1.6;
        letter-spacing: 0.01em;
        color: #2e3135;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    .info-box .action-row {
        margin-top: 1.1rem;
    }

    .action-row .action-list {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        white-space: nowrap;
    }

    .action-list .action {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        position: relative;
        font-size: 1.167rem;
        color: #b7c5d3;
        text-decoration: none;
    }

    .action-list .action:not(:last-child) {
        margin-right: 2.2rem;
    }

    .action-list .action > .icon {
        width: 21px;
        height: 20px;
        background-position: 50%;
        background-repeat: no-repeat;
        background-size: contain;
    }

    .action-list .action:first-child > .icon {
        width: 17px;
        background-position-x: left;
    }

    .action-list .action.like > .icon {
        background-image: url("../assets/ico/like.svg");
    }

    .action-list .action.comment > .icon {
        background-image: url("../assets/ico/comment.svg");
    }

    .action-list .action.collect > .icon {
        background-image: url("../assets/ico/collect.svg");
    }

    .action-list .action.share > .icon {
        background-image: url("../assets/ico/share.svg");
    }

    .action-list .action > .title {
        margin-left: 0.3rem;
        height: 20px;
        line-height: 20px;
    }

    .action-list:not(.active) > .action.hover {
        visibility: visible;
    }

    .action-list .action.open,
    .action-list .action:hover {
        color: #9faebd;
    }
</style>
