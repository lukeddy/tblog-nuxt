<template>
    <div class="container main">
        <!--<h1> {{ $route.params.id }}</h1>-->
        <div class="col-md-9" id="content">
            <ul class="breadcrumb">
                <li><router-link to="/">首页</router-link><span class="divider"></span></li>
                <li class="active"><a href="/tblog/?tab=java">Java</a></li>
            </ul>
            <Alert v-if="alertObj" :data="alertObj"/>
            <div v-if="post!=null" class="panel">
                <div class="header topic-header">
                    <h1 class="topic-full-title">{{post.title}}</h1>
                    <div class="changes">
                        <span>{{post.friendlyTime}}</span><span>&nbsp;&nbsp;作者：<a href="/tblog/pub/user/5b7d59bbbf578d05d7046ef6">{{post.author.username}}</a></span><span>&nbsp;&nbsp;{{post.visitCount}}次浏览</span>
                    </div>
                </div>
                <div class="inner topic">
                    <div class="topic-content">
                        <div class="editormd-preview-container" v-html="post.contentHTML"></div>
                    </div>
                    <div class="topic-tags">
                        <span>标签：</span>
                        <a v-for="(tag,index) in post.tags" :key="index" href="" class="tag">{{tag}}</a>
                        <!--<a href="/tblog/tag/" class="tag"></a>-->
                    </div>
                    <div class="topic-action-wrapper">
                        <div class="topic-actions">
                            <a href="/tblog/like/add/5b87dceabf578d115d2357ac" class="action-link">
                                <img src="../assets/ico/like-lg.svg" alt="">
                                <span>喜欢</span>
                            </a>
                            <a href="#reply" class="action-link">
                                <img src="../assets/ico/comment-lg.svg" alt="">
                                <span>评论</span>
                            </a>
                            <a id="collectLink" href="/tblog/collect/add/5b87dceabf578d115d2357ac" class="action-link" title="收藏">
                                <img src="../assets/ico/collect-lg.svg" alt="">
                            </a>
                            <a href="javascript:;" class="action-link">
                                <img src="../assets/ico/share-lg.svg" alt="">
                                <span>分享</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="post==null" class="text-center">
                帖子内容为空
            </div>
            <!--TODO 评论区-->
            <Comment></Comment>
        </div>
        <Advertisement/>
    </div>
</template>

<script>
    import Advertisement from './Advertisement'
    import Comment from './Comment'
    import Alert from './Alert'

    export default {
        name: "PostDetail",
        components:{
            Advertisement,
            Comment,
            Alert
        },
        data(){
            return {
                post:null,
                alertObj:null,
            }
        },
        mounted:function () {
            this.id=this.$route.params.id
            this.$store.dispatch('getPost',{id:this.id}).then((response) => {
                this.post=response.data.data
            }).catch(error => {
                this.alertObj={status:false,msg:error.toString()}
            })


        }
    }
</script>

<style scoped>
    #content .topic-full-title {
        font-size: 22px;
        font-weight: 700;
        margin: 8px 0;
        display: inline-block;
        vertical-align: bottom;
        width: 75%;
        line-height: 130%
    }

    #content .changes {
        font-size: 12px;
        color: #838383
    }


    #content .changes a {
        color: inherit
    }

    #content .action {
        float: right;
        margin-top: 8px
    }

    #content .share {
        text-align: right;
        margin-top:-5px;
    }
    .topic-content {
        margin: 0 10px
    }
    .topic-content img{
        display: block;
        max-width:100%;
        height: auto;
    }

    .topic-content p,
    .preview p,
    .reply-content p,
    .reply-form p {
        font-size: 15px;
        line-height: 1.7em;
        overflow: auto;
    }

    .topic-tags {
        margin: 1.2rem 0;
        padding-left: 24px;
        padding-right: 24px;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-wrap: wrap;
        flex-wrap: wrap;
    }
    .topic-tags .tag {
        display: inline-block;
        background-color: #f1f1f1;
        border: none;
        color: #666;
        padding: .7rem 1rem;
        border-radius: 2px;
        margin-right: .6rem;
        margin-bottom: .6rem;
        line-height: 1.5;
    }
    .topic-action-wrapper {
        display: flex;
        justify-content: flex-end;
    }
    .action-link {
        width: 66px;
        margin: 0 10px;
    }
</style>