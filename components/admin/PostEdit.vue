<template>
    <div class="container main">
        <div class="col-md-9">
            <ul class="breadcrumb">
                <li><router-link to="/">首页</router-link><span class="divider"></span></li>
                <li><router-link to="/post">帖子管理</router-link><span class="divider"></span></li>
                <li class="active">修改帖子</li>
            </ul>
            <div class="panel">
                <div class="inner">
                    <Alert v-if="alertObj" :data="alertObj"/>
                    <h3>修改帖子</h3>
                    <form method="post" @submit.prevent="editPost">
                        <input type="hidden" name="thumbURL" id="thumbURL" value="">
                        <div class="form-group">
                            <div class="input-group">
                                <div class="input-group-addon">栏目:</div>
                                <select v-validate="'required'" data-vv-as="栏目" v-model="post.category.id" class="form-control">
                                    <option value="" selected="">---请先选择栏目---</option>
                                    <option v-for="(cat,index) in allCategory" :key="index"  :value="cat.id">{{cat.catName}}</option>
                                </select>
                            </div>
                            <span v-show="errors.has('catId')" class="errors">{{ errors.first('catId') }}</span>
                        </div>
                        <div class="form-group">
                            <div class="input-group">
                                <div class="input-group-addon">标题*:</div>
                                <input v-validate="'required'" data-vv-as="标题" type="text" v-model="post.title" name="title" class="form-control" placeholder="输入帖子标题" value="">
                            </div>
                            <span v-show="errors.has('title')" class="errors">{{ errors.first('title') }}</span>
                        </div>

                        <div class="form-group">
                            <div class="input-group">
                                <div class="input-group-addon">摘要:</div>
                                <textarea name="desc" class="form-control" v-model="post.desc" rows="3" placeholder="输入摘要"></textarea>
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="input-group">
                                <div class="input-group-addon">标签:</div>
                                <input type="text" name="tags" v-model="post.tags" class="form-control" placeholder="输入标签" value="">
                            </div>
                            <span class="label-info">注意：标签使用英文逗号分隔</span>
                        </div>

                        <div class="form-group">
                            <mavon-editor v-validate="'required'" data-vv-as="内容" v-model="post.contentMD" ref=editor @imgAdd="uploadImage" placeholder="帖子内容..."/>
                        </div>
                        <span v-show="errors.has('contentMD')" class="errors">{{ errors.first('contentMD') }}</span>

                        <div class="checkbox">
                            <label>
                                <input type="checkbox" name="contentIsHTML" v-model="post.contentIsHTML" value="true"> 是否网页？
                            </label>
                            <label>
                                <input type="checkbox" name="top" value="true" v-model="post.top"> 置顶帖？
                            </label>
                            <label>
                                <input type="checkbox" name="good" value="true" v-model="post.good"> 精华帖？
                            </label>
                        </div>

                        <div class="form-group">
                            <div class="text-center">
                                <button class="btn btn-success" id="submit" type="submit">修改</button>
                                <button class="btn btn-default" type="reset">清空</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div class="col-md-3">
            <div class="panel">
                <div class="header">
                    <span class="col_fade">文章缩略图</span>
                </div>
                <div class="inner">
                    <vue2Dropzone ref="myDropZone" id="dropzone" :style="{backgroundSize:'cover',backgroundImage:'url('+this.thumbBG+')'}" :options="dropzoneOptions" v-on:vdropzone-success="dropzoneSuccess" class="dropzone needsclick dz-clickable"></vue2Dropzone>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Alert from '../Alert'
    import vue2Dropzone from 'vue2-dropzone'
    import 'vue2-dropzone/dist/vue2Dropzone.min.css'

    export default {
        name: "PostEdit",
        components:{
            Alert,
            vue2Dropzone
        },
        data(){
            return {
                allCategory:[],
                id:null,
                post:null,
                thumbBG:null,
                dropzoneOptions: {
                    url: process.env.VUE_APP_API_BASE_URL+'/upload/file',
                    paramName:"file",
                    acceptedFiles:"image/png,image/jpg,image/jpeg",
                    autoDiscover:false,
                    thumbnailWidth: 150,
                    dictDefaultMessage: '<div class="dz-message needsclick"><i class="fa fa-cloud-upload"></i>\n' +
                        '                            点击或者拖拽上传<br/>\n' +
                        '                            <span class="note needsclick">(<strong>文章缩略图</strong>)</span>\n' +
                        '                        </div>',
                    maxFilesize: 2,
                    maxFiles:1,
                    headers: {'Access-Control-Allow-Origin': '*','Authorization':this.$store.getters.getToken },
                },
                alertObj:null,
            }
        },
        mounted:function(){
            this.id=this.$route.params.id
            this.$store.dispatch('getPost',{id:this.id}).then((response) => {
                this.post=response.data.data
                this.thumbBG=process.env.VUE_APP_SERVER_BASE_URL+this.post.thumbURL
            }).catch(error => {
                this.alertObj={status:false,msg:error.toString()}
            })

            this.$store.dispatch('allCategory').then((response) => {
                this.allCategory=response.data.data
            }).catch(error => {
                this.alertObj={status:false,msg:error.toString()}
            })
        },
        methods:{
            editPost(){
                this.$validator.validateAll().then((result) => {
                    if (result) {
                        var tags='';
                        if(this.post.tags!=null){
                            tags=this.post.tags.join(", ")
                        }
                        this.$store.dispatch('updatePost', {
                            id:this.id,
                            authorId:this.post.author.id,
                            catId:this.post.category.id,
                            title: this.post.title,
                            desc: this.post.desc,
                            tags:tags,
                            thumbURL:this.post.thumbURL,
                            contentMD:this.post.contentMD,
                            contentHTML:this.$refs.editor.d_render,
                            contentIsHTML:this.post.contentIsHTML,
                            top:this.post.top,
                            good:this.post.good,
                        })
                            .then((response) => {
                                //console.log(response.data)
                                this.alertObj=response.data
                            })
                            .catch(error => {
                                //this.loading = false
                                this.alertObj={status:false,msg:error.toString()}
                            })

                        return;
                    }
                    this.alertObj={status:false,msg:"请输入帖子信息"}
                });
            },
            uploadImage(pos, $file){
                //第一步.将图片上传到服务器.
                const data = new FormData();
                data.append('file', $file);

                this.$store.dispatch('uploadFile',data).then((response) => {
                    //console.log(response.data)
                    //第二步.将返回的url替换到文本原位置![...](./0) -> ![...](url)
                    this.$refs.editor.$img2Url(pos,process.env.VUE_APP_SERVER_BASE_URL+ response.data.data);
                }).catch(error => {
                    this.alertObj={status:false,msg:error.toString()}
                })
            },
            dropzoneSuccess(file,response){
                this.alertObj=response
                if(response.status==true){
                    this.post.thumbURL=response.data
                    this.thumbBG=process.env.VUE_APP_SERVER_BASE_URL+this.post.thumbURL
                    this.$refs.myDropZone.removeFile(file);
                }
            }
        }


    }
</script>

<style scoped>

</style>