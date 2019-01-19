<template>
    <div class="container main">
        <Advertisement/>
        <div class="col-md-9">
            <ul class="breadcrumb">
                <li><router-link to="/">首页</router-link><span class="divider"></span></li>
                <li class="active">栏目管理</li>
            </ul>
            <div class="panel">
                <div class="inner">
                    <Alert v-if="alertObj" :data="alertObj"/>
                    <div class="topic_content">
                        <div class="markdown-text">
                            <h3>已有栏目 <router-link to="/categoryadd">新增</router-link> </h3>
                            <table v-if="pager!=null" class="table">
                                <tbody><tr>
                                    <th>栏目名称</th>
                                    <th>目录</th>
                                    <th>创建日期</th>
                                    <th>更新日期</th>
                                    <th>操作</th>
                                </tr>
                                <tr v-for="(cat,index) in pager.content" :key="index">
                                    <td>{{cat.catName}}</td>
                                    <td>{{cat.catDir}}</td>
                                    <td>{{cat.createAtFormatted}}</td>
                                    <td>{{cat.updateAtFormatted}}</td>
                                    <td>
                                        <router-link class="title" v-bind:to="'/categoryedit/'+cat.id">修改</router-link>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            <!--分页开始-->
                            <Pagination v-if="pager" v-on:parentJumpPage="jumpPage" :total-pages="pager.totalPages" :current-page="pager.number+1"/>
                            <!--分页结束-->
                        </div>
                        <div v-if="pager==null" class="text-center">暂无数据</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Advertisement from '../Advertisement'
    import Alert from '../Alert'
    import Pagination from '../common/Pagination'

    export default {
        name: "Category",
        components:{
            Pagination,
            Advertisement,
            Alert
        },
        data(){
            return {
                pager:null,
                alertObj:null,
            }
        },
        mounted:function(){
            this.$store.dispatch('listCategory', {
                pageNO: 1,
            }).then((response) => {
                this.pager=response.data.data
            })
            .catch(error => {
                this.alertObj={status:false,msg:error.toString()}
            })

        },
        methods:{
            jumpPage(pageNo){
                this.$store.dispatch('listCategory', {
                    pageNO: pageNo,
                }).then((response) => {
                    this.pager=response.data.data
                })
                .catch(error => {
                    this.alertObj={status:false,msg:error.toString()}
                })
            }
        }
    }
</script>

<style scoped>

</style>