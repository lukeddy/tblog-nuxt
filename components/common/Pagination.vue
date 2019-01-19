<template>
    <ul class="pagination">
        <li :class="{'disabled':currentPage==1}"><span @click="goPage(1)">«</span></li>

        <li v-for="index in totalPages" :key="index" :class="{'active':index==currentPage}">
            <a @click="goPage(index)">{{index}}</a>
        </li>
        <li>
            <span>当前第{{currentPage}}页,共{{totalPages}}页</span>
        </li>
    </ul>
</template>

<script>
    export default {
        name: "Pagination",
        props:['totalPages','currentPage'],
        methods:{
            goPage(index){
                this.$emit('parentJumpPage', index)
            }
        }
    }
</script>

<style scoped>

</style>