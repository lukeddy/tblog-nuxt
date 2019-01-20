<template>
    <div class="container main">
        <Advertisement/>
        <div class="col-md-9">
            <ul class="breadcrumb">
                <li><nuxt-link to="/">首页</nuxt-link><span class="divider"></span></li>
                <li class="active">帖子管理</li>
            </ul>
            <div class="panel">
                <div class="inner">
                    <Alert v-if="alertObj" :data="alertObj"/>
                    <div class="topic_content">
                        <div class="markdown-text">
                            <h3>帖子列表 <router-link to="/admin/postadd">新增</router-link>  </h3>
                            <table v-if="pager!=null&&pager.totalPages>0" class="table">
                                <tbody><tr>
                                    <th>帖子标题</th>
                                    <th>栏目</th>
                                    <th>创建日期</th>
                                    <th>更新日期</th>
                                    <th>操作</th>
                                </tr>
                                <tr v-for="(post,index) in pager.content" :key="index">
                                    <td>
                                        <router-link v-bind:to="'/post/'+post.id">{{post.title}}</router-link>
                                    </td>
                                    <td>{{post.category.catName}}</td>
                                    <td>{{post.createAtFormatted}}</td>
                                    <td>{{post.updateAtFormatted}}</td>
                                    <td>
                                        <nuxt-link v-bind:to="'/admin/postedit/'+post.id">修改</nuxt-link>&nbsp;
                                        <a @click="deletePost(post.id)">删除</a>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            <!--分页开始-->
                            <Pagination v-if="pager!=null&&pager.totalPages>0" v-on:parentJumpPage="jumpPage" :total-pages="pager.totalPages" :current-page="pager.number+1"/>
                            <!--分页结束-->
                        </div>
                        <div v-if="pager==null||pager.totalPages<=0" class="text-center">暂无帖子</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Advertisement from '../../components/Advertisement'
    import Alert from '../../components/Alert'
    import Pagination from '../../components/common/Pagination'
    export default {
        middleware: 'authenticated',
        name: "Post",
        components:{
            Advertisement,
            Alert,
            Pagination,
        },
        data(){
            return {
                currentPage:1,
                pager:null,
                alertObj:null,
            }
        },
        mounted:function(){
            this.loadData(this.currentPage);
        },
        methods:{
           async loadData(pageNumber){
              try{
                //this.$axios.defaults.headers.common['Authorization'] = this.$store.state.token
                const params={
                  pageNO:pageNumber
                }
                const response=await this.$axios.$post('/post/list',params);
                // console.log('categorys:',response)
                if(response.status){
                  this.pager=response.data
                }
              }catch(error){
                this.alertObj={status:false,msg:error.message}
              }
            },
           async deletePost(postId){
              try{
                //this.$axios.defaults.headers.common['Authorization'] = this.$store.state.token
                const params={
                  id:postId
                }
                const response=await this.$axios.delete('/post/'+params.id,params);
                console.log('delete post:',response)
                this.alertObj=response.data
                this.loadData(this.currentPage)
              }catch(error){
                this.alertObj={status:false,msg:error.message}
              }
            },
            jumpPage(pageNo){
                this.loadData(pageNo)
            }
        }
    }
</script>

<style scoped>

</style>
