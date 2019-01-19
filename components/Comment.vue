<template>
    <div class="row comment-wrapper">
        <Alert v-if="alertObj" :data="alertObj"/>
        <h3 class="header">{{comments.length}} 条评论</h3>
        <div class="comment-list">
            <CommentItem v-for="(comment,index) in comments" :key="index" :comment="comment" v-on:parentLoadComments="loadComments"></CommentItem>
        </div>
        <CommentForm v-on:parentLoadComments="loadComments"></CommentForm>
    </div>
</template>

<script>
    import CommentItem from './CommentItem'
    import CommentForm from './CommentForm'
    import Alert from './Alert'

    export default {
        name: "Comment",
        components:{
            CommentItem,
            CommentForm,
            Alert
        },
        data(){
            return{
                postId:null,
                comments:[],
                alertObj:null,
            }
        },
        mounted:function(){
            this.loadComments()
        },
        methods:{
            loadComments(){
                this.postId=this.$route.params.id
                this.$store.dispatch('getComments',{id:this.postId}).then((response) => {
                    this.comments=response.data.data
                }).catch(error => {
                    this.alertObj={status:false,msg:error.toString()}
                })
            }
        }
    }
</script>

<style scoped>
    .comment-wrapper {
        margin:20px 0;
        background: #fff;
        padding: 1em 1em .25em;
    }
    .comment-wrapper .header {
        border: none;
        font-size: 1.2em;
        font-weight: 700;
        line-height: 1.2em;
        text-transform: none;
        color: rgba(0,0,0,.87);
        margin: 0;
        padding: 0 0;
    }

</style>