<template>
    <div class="comment-form">
        <!--评论表单-->
        <Alert v-if="alertObj" :data="alertObj"/>
        <form method="post" @submit.prevent="addComment" class="form-vertical" id="reply-form">
            <fieldset>
                <div class="form-group">
                    <label>评论</label>
                    <mavon-editor v-model="commentValue" ref=editor @imgAdd="uploadImage" placeholder="留下你的角脚印..."/>
                </div>
                <div class="form-group text-right">
                    <input type="hidden" name="itemId" value="5b87dceabf578d115d2357ac">
                    <input type="hidden" name="authorId" value="5b7d59bbbf578d05d7046ef6">
                    <img id="vCodeImage" src="../assets/validateCode.jpeg" onclick="javascript:reloadCommentVCode();" autocomplete="off">
                    <input type="text" name="vcode" id="vCodeInput" class="form-control" style="display:inline-block;width:120px;margin-right:6px;" readonly="readonly">
                    <button type="submit" class="btn btn-success pull-right" :disabled="commentValue==null">发表评论</button>
                </div>
            </fieldset>
        </form>
    </div>
</template>

<script>
    import Alert from './Alert'

    export default {
        name: "CommentForm",
        components:{
            Alert
        },
        data(){
            return {
                commentValue:'',
                alertObj:null,
            }
        },
        methods:{
            addComment(){
                const data={
                    itemId:this.$route.params.id,
                    commentMD:this.commentValue,
                    commentHTML:this.$refs.editor.d_render
                }

                this.$store.dispatch('addComment',data).then((response) => {
                    this.alertObj=response.data
                    this.$emit("parentLoadComments")
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