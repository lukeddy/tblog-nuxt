<template>
    <div class="comment" :id="comment.id">
        <Alert v-if="alertObj" :data="alertObj"/>
        <a class="avatar" href="#" target="_blank">
            <img :src="comment.author.avatarURL" :title="comment.author.username">
        </a>
        <div class="content">
            <a class="author" href="#" target="_blank">{{comment.author.username}}</a>
            <div class="metadata">
                <span class="date">{{comment.friendlyTime}}</span>
            </div>
            <div class="text">
                <CommentReply v-if="comment.parentComment!=null" :parent-comment="comment.parentComment"></CommentReply>
                <p v-html="comment.commentHTML">评论内容</p>
            </div>
            <div class="operations">
                <a class="like" @click="thumbsUp(comment.id)">
                    <i class="fa fa-thumbs-up"></i> {{comment.thumbsUPCount}} 赞
                </a>
                <a v-if="this.$store.getters.isLoggedIn" class="reply btn-reply-to" :id="comment.id" @click="toggleReplyForm">
                    <i class="fa fa-comments"></i> 回复
                </a>
                <a v-if="this.$store.getters.isLoggedIn" @click="deleteComment(comment.id)" class="remove">
                    <i class="fa fa-trash"></i> 删除
                </a>
                <a class="ban">
                    <i class="fa fa-ban"></i> 举报
                </a>
            </div>
            <CommentReplyForm v-if="currentReplyForm==comment.id" :comment="comment" v-on:parentReloadComments="parentReloadComments"></CommentReplyForm>
        </div>
    </div>
</template>

<script>
    import CommentReply from './CommentReply'
    import CommentReplyForm from './CommentReplyForm'
    import Alert from './Alert'

    export default {
        name: "CommentItem",
        props:["comment"],
        components:{
            CommentReply,
            CommentReplyForm,
            Alert
        },
        data(){
            return{
               currentReplyForm:null,
               alertObj:null,
            }
        },
        methods:{
            toggleReplyForm(e){
                this.currentReplyForm=null
                this.currentReplyForm=e.target.id
            },
            async deleteComment(commentId){
              try{
                //this.$axios.defaults.headers.common['Authorization'] = this.$store.state.token
                const response= await this.$axios.$delete('/comment/'+commentId,{id:commentId});
                console.log(response);
                if(response.status){
                  this.parentReloadComments()
                }
                this.alertObj=response
              }catch(error){
                this.alertObj={status:false,msg:error.message}
              }
            },
           async thumbsUp(commentId){
              try{
                //this.$axios.defaults.headers.common['Authorization'] = this.$store.state.token
                const response= await this.$axios.$put('/comment/thumbsup/'+commentId,{id:commentId});
                console.log(response);
                if(response.status){
                  this.$emit("parentLoadComments")
                }
                this.alertObj=response
              }catch(error){
                this.alertObj={status:false,msg:error.message}
              }
            },
            parentReloadComments(){
                this.$emit("parentLoadComments")
            }

        }
    }
</script>

<style scoped>
    .comment {
        position: relative;
        background: 0 0;
        margin: .5em 0;
        padding: .5em 0 0;
        border: none;
        border-top: none;
        line-height: 1.2;
    }

    .comment .avatar {
        display: block;
        width: 2.5em;
        height: 2.5em!important;
        float: left;
        margin: .2em 0 0;
        border-radius: 500rem;
    }
    .comment .avatar img {
        display: block;
        margin: 0 auto;
        height: 35px;
        width: 35px;
        border-radius: .25rem;
    }

    .comment>.content {
        display: block;
        margin-left: 3.5em;
    }
    .comment .author {
        font-size: 1em;
        color: rgba(0,0,0,.87);
        font-weight: 700;
    }
    .comment .metadata {
        display: inline-block;
        margin-left: .5em;
        color: rgba(0,0,0,.4);
        font-size: .875em;
    }
    .comment .metadata>* {
        display: inline-block;
        margin: 0 .5em 0 0;
    }
    .comment .metadata>:last-child {
        margin-right: 0;
    }

    .comment .text {
        margin: .25em 0 .5em;
        font-size: .9em;
        word-wrap: break-word;
        color: rgba(0,0,0,.87);
        line-height: 1.3;
    }

    .comment>.content>.text {
        -ms-word-break: break-all;
        word-break: break-all;
        word-break: break-word;
        -webkit-hyphens: auto;
        -ms-hyphens: auto;
        hyphens: auto;
        word-wrap: break-word;
        margin: .75em 0 .5em;
        line-height: 1.5;
    }

    .comment .operations {
        font-size: .875em;
    }
    .comment .operations a {
        cursor: pointer;
        display: inline-block;
        margin: 0 .75em 0 0;
        color: rgba(0,0,0,.4);
    }
</style>
