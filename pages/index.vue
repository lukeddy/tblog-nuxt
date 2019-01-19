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
  import Advertisement from '../components/Advertisement'
  import Menu from "../components/Menu";
  import PostList from "../components/PostList";

  export default {
    components: {
      Advertisement,
      Menu,
      PostList,
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
     async loadData(pageNo,tab){
        const params={
          pageNO: pageNo,
          tab:tab
        }
        const response = await this.$axios.$post('/home',params)
        console.log(response)
        if(response.status){
          this.catList=response.data.catList
          this.pager=response.data.pager
          this.currentTab=response.data.indexVo.tab
        }else{
          this.alertObj={status:false,msg:response.msg}
        }
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

