<template>
    <div>
        <ul v-if="pager!=null&&pager.totalPages>=1" class="post-list">
            <PostItem v-for="(post,index) in pager.content" :key="index" :post="post" :go-to-tab="goToTab"></PostItem>
        </ul>
        <!--分页开始-->
        <Pagination v-if="pager!=null&&pager.totalPages>=1" v-on:parentJumpPage="jumpPage" :total-pages="pager.totalPages" :current-page="pager.number+1"/>
        <!--分页结束-->
        <div v-if="pager==null||pager.totalPages==0" class="text-center">
            没有帖子
        </div>
    </div>
</template>

<script>
    import PostItem from './PostItem';
    import Pagination from './common/Pagination'

    export default {
        name: "PostList",
        components:{
            PostItem,
            Pagination
        },
        props:["pager","jumpPage"],
        methods:{
            goToTab(tab){
                this.$emit("parentChangeTab",tab)
            }
        }
    }
</script>

<style scoped>
    .post-list {
        width: 100%;
        margin: 0;
        padding: 0;
    }
</style>