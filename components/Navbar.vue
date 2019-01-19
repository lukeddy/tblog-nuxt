<template>
    <div class="navbar navbar-inverse navbar-fixed-top">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target=".navbar-collapse">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <router-link class="navbar-brand hidden-sm" to="/">
              <span class="tblog-leaf-logo">&nbsp;</span>
            </router-link>
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
                <li><router-link to="/">首页</router-link></li>
                <li><router-link to="/about">关于我们</router-link></li>
                <li v-if="loggedIn"><router-link to="/category">栏目管理</router-link></li>
                <li v-if="loggedIn"><router-link to="/post">帖子管理</router-link></li>
                <li v-if="!loggedIn"><router-link to="/register">注册</router-link></li>
                <li v-if="!loggedIn"><router-link to="/login">登录</router-link></li>
                <li v-if="loggedIn"><router-link to="/logout">退出</router-link></li>
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