<template>
    <div class="header">
        <a @click="goToTab('all')"  :class="{'current-tab':currentTab==='all'}" class="topic-tab">全部</a>
        <span v-if="catList!=null&&catList.length>0">
            <a v-for="(cat,index) in catList.slice(0,6)" :key="index" :class="{'current-tab':cat.catDir===currentTab}" class="topic-tab" @click="goToTab(cat.catDir)">{{cat.catName}}</a>
            <span v-if="catList.length>6" class="dropdown">
                <a href="#" class="dropdown-toggle topic-tab" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                    更多 <span class="caret"></span>
                </a>
                <ul class="dropdown-menu">
                    <li v-for="(cat,index) in catList.slice(6,catList.length)" :key="index"   class="topic-tab">
                        <a @click="goToTab(cat.catDir)" :class="{'current-tab':cat.catDir===currentTab}" class="topic-tab">{{cat.catName}}</a>
                    </li>
                </ul>
            </span>
        </span>
    </div>
</template>
<script>
    export default {
        name: "Menu",
        props:['catList'],
        data(){
            return{
                currentTab:'all'
            }
        },
        methods:{
            goToTab(tab){
                //console.log(tab)
                this.currentTab=tab
                this.$emit("parentChangeTab",tab)
            }
        }
    }

</script>
<style>
    .topic-tab.current-tab {
        background-color: #80bd01;
        color: #fff;
        padding: 3px 4px;
        border-radius: 3px;
    }

    .topic-tab {
        margin: 0 10px;
        color: #80bd01;
    }
</style>


