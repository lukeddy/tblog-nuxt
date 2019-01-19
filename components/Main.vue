<template>
    <div class="container main">
        <div class="col-md-9">
            <div class="panel">
                <Menu :cat-list="catList" v-on:parentChangeTab="changeTab"></Menu>
                <div class="inner no-padding">
                    <PostList :pager="pager" :jump-page="jumpPage" v-on:parentChangeTab="changeTab"></PostList>
                </div>
            </div>
        </div>
        <Advertisement/>
    </div>
</template>
<script>
    import Menu from "./Menu";
    import PostList from "./PostList";
    import Advertisement from './Advertisement'

    export default {
        name: "Main",
        components: {
            PostList,
            Menu,
            Advertisement
        },
        data(){
            return{
                currentPage:1,
                currentTab:'all',
                catList:null,
                pager:null,
                alertObj:null,
            }
        },
        mounted:function(){
            this.loadData(this.currentPage,this.currentTab);
        },
        methods:{
            loadData(pageNo,tab){
                this.$store.dispatch('home', {
                    pageNO: pageNo,
                    tab:tab
                }).then((response) => {
                    this.catList=response.data.data.catList
                    this.pager=response.data.data.pager
                    this.currentTab=response.data.data.indexVo.tag
                    //console.log(this.pager)
                })
                .catch(error => {
                    this.alertObj={status:false,msg:error.toString()}
                })
            },
            changeTab(tab){
                this.currentPage=1;
                this.currentTab=tab;
                this.loadData(this.currentPage,this.currentTab);
            },
            jumpPage(pageNo){
                this.loadData(pageNo,this.currentTab);
            }
        }
    };
</script>

