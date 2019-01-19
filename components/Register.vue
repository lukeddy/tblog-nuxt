<template>
    <div class="container main">
        <div class="col-md-9">
            <ul class="breadcrumb">
                <li><router-link to="/">首页</router-link><span class="divider"></span></li>
                <li class="active">注册</li>
            </ul>
            <div class="row wrapper">
                <div class="col-sm-3">&nbsp;</div>
                <div class="col-sm-6">
                    <div v-if="serverError" class="alert alert-danger">{{ serverError }}</div>
                    <form action="#" @submit.prevent="register" method="post">
                        <h3 class="form-signin-header text-center">用户注册</h3>
                        <div class="form-group">
                            <div class="input-group">
                                <div class="input-group-addon">用户名:</div>
                                <input v-validate="'required|alpha_dash'" data-vv-as="用户名" value="" name="username" v-model="username" class="form-control" placeholder="请输入用户名">
                            </div>
                            <span v-show="errors.has('username')" class="errors">{{ errors.first('username') }}</span>
                        </div>
                        <div class="form-group">
                            <div class="input-group">
                                <div class="input-group-addon">密&nbsp;&nbsp;&nbsp;&nbsp;码:</div>
                                <input v-validate="'required|min:6|max:12'" data-vv-as="密码" value="" type="password" name="password" class="form-control" v-model="password" placeholder="请输入密码">
                            </div>
                            <span v-show="errors.has('password')" class="errors">{{ errors.first('password') }}</span>
                        </div>
                        <div class="form-group">
                            <div class="input-group">
                                <div class="input-group-addon">邮&nbsp;&nbsp;&nbsp;&nbsp;件:</div>
                                <input v-validate="'required|email'" data-vv-as="邮箱地址" value="" type="email" name="email" class="form-control" v-model="email" placeholder="电子邮件">
                            </div>
                            <span v-show="errors.has('email')" class="errors">{{ errors.first('email') }}</span>
                        </div>
                        <div class="form-group">
                            <div class="input-group">
                                <div class="input-group-addon">验证码:</div>
                                <input value="" type="text" name="validateCode" class="form-control" style="display:inline-block;width:120px;margin-right:13px;" id="validateCode">
                                <img id="validateCodeImg" src="../assets/validateCode.jpeg">&nbsp;&nbsp;<a href="#" onclick="javascript:reloadValidateCode();">看不清？</a>
                            </div>
                        </div>
                        <div class="btn-group btn-group-justified" role="group" aria-label="...">
                            <div class="btn-group" role="group">
                                <button class="btn btn-success" type="submit">注册</button>
                            </div>
                            <div class="btn-group" role="group">
                                <button class="btn btn-default" type="reset">重置</button>
                            </div>
                        </div>
                        <br>
                        <p>已经有账户？点击 <router-link to="/login">登录</router-link></p>
                    </form>
                </div>
                <div class="com-sm-3">&nbsp;</div>
            </div>
        </div>
        <Advertisement/>
    </div>
</template>

<script>
    import Advertisement from './Advertisement'
    export default {
        name: "Register",
        components:{
            Advertisement
        },
        data(){
            return {
                username: '',
                password: '',
                email:'',
                serverError: '',
            }
        },
        methods:{
            register(){
                this.$validator.validateAll().then((result) => {
                    if (result) {
                        //TODO 调用注册Api

                        return;
                    }
                    alert("请输入正确的账户信息")
                });
            }
        }
    }
</script>

<style scoped>

</style>