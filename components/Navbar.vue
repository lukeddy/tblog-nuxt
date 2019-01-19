<template>
    <div class="navbar navbar-inverse navbar-fixed-top">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target=".navbar-collapse">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <nuxt-link class="navbar-brand hidden-sm" to="/"><span class="tblog-leaf-logo">&nbsp;</span></nuxt-link>
            <form class="navbar-form pull-right" action="/tblog/search">
                <div class="form-group hidden-xs">
                    <div class="input-group">
                        <div class="input-group-addon"><i class="glyphicon glyphicon-search"></i></div>
                        <input type="text" name="keywords" class="form-control" placeholder="">
                    </div>
                </div>
            </form>
        </div>
        <div class="navbar-collapse collapse pull-right">
            <ul class="nav navbar-nav">
                <li><nuxt-link to="/">首页</nuxt-link></li>
                <li><nuxt-link to="/about">关于我们</nuxt-link></li>
                <li v-if="loggedIn"><nuxt-link to="/category">栏目管理</nuxt-link></li>
                <li v-if="loggedIn"><nuxt-link to="/post">帖子管理</nuxt-link></li>
                <li v-if="loggedIn"><nuxt-link to="/protected">私有资源</nuxt-link></li>
                <li v-if="!loggedIn"><nuxt-link to="/register">注册</nuxt-link></li>
                <li v-if="!loggedIn"><nuxt-link to="/login">登录</nuxt-link></li>
                <li v-if="loggedIn"><nuxt-link to="/logout">退出</nuxt-link></li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    name:"Navbar",
    computed: {
        loggedIn() {
            return this.$store.getters.isLoggedIn;
        }
    }
}
</script>
<style>
.tblog-leaf-logo {
    display: block;
    width: 120px;
    height: 53px;
    background-size: cover;
    background-image: url(../assets/tblog-leaf-logo3.png);
    margin-left: 36px;
    margin-top: -18px;
}
</style>
