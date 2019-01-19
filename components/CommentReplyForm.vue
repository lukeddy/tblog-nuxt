<template>
    <div class="comment-form">
        <!--评论表单-->
        <Alert v-if="alertObj" :data="alertObj"/>
        <form method="post" @submit.prevent="addReply" class="form-vertical">
            <fieldset>
                <div class="form-group">
                    <label>回复</label>
                    <mavon-editor v-model="replyValue" ref=editor @imgAdd="uploadImage" placeholder="回复内容..."/>
                </div>
                <div class="form-group text-right">
                    <input type="hidden" ref="commentId" :value="comment.id"/>
                    <img id="vCodeImage" src="../assets/validateCode.jpeg" onclick="javascript:reloadCommentVCode();" autocomplete="off">
                    <input type="text" name="vcode" id="vCodeInput" class="form-control" style="display:inline-block;width:120px;margin-right:6px;" readonly="readonly">
                    <button type="button" class="btn btn-default pull-left">取消</button>
                    <button type="submit" class="btn btn-success pull-right" :disabled="replyValue==null">回复</button>
                </div>
            </fieldset>
        </form>
    </div>
</template>

<script>
    import Alert from './Alert'

    export default {
        name: "CommentReplyForm",
        components:{
            Alert
        },
        props:["comment"],
        data(){
            return {
                replyValue:'',
                alertObj:null,
            }
        },
        methods:{
            addReply(){
                const data={
                    commentId:this.$refs.commentId.value,
                    replyMD:this.replyValue,
                    replyHtml:this.$refs.editor.d_render
                }

                //console.log(data)
                this.$store.dispatch('replyComment',data).then((response) => {
                    this.alertObj=response.data
                    this.$emit("parentReloadComments")
                }).catch(error => {
                    this.alertObj={status:false,msg:error.toString()}
                })
            },

            //绑定@imgAdd event
            uploadImage(pos, $file){
                //第一步.将图片上传到服务器.
                const data = new FormData();
                data.append('file', $file);

                this.$store.dispatch('uploadFile',data).then((response) => {
                    //console.log(response.data)
                    //第二步.将返回的url替换到文本原位置![...](./0) -> ![...](url)
                    this.$refs.editor.$img2Url(pos, response.data.data);
                }).catch(error => {
                    this.alertObj={status:false,msg:error.toString()}
                })
            }
        }
    }
</script>

<style scoped>
    .comment-form{
        margin:20px 0 0 0;
    }
</style>