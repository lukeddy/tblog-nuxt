<template>
    <div class="container main">
        <div class="col-md-9">
            <ul class="breadcrumb">
                <li><router-link to="/">首页</router-link><span class="divider"></span></li>
                <li class="active">登录</li>
            </ul>
            <div class="row wrapper">
                <div class="col-sm-3">&nbsp;</div>
                <div class="col-sm-6">
                    <Alert v-if="alertObj" :data="alertObj"/>
                    <form action="#" @submit.prevent="login">
                        <h3 class="form-signin-header text-center">登录TBlog</h3>
                        <div class="form-group">
                            <div class="input-group">
                                <div class="input-group-addon">用户名:</div>
                                <input v-validate="'required'" data-vv-as="用户名" type="text" name="username" value="" v-model="username" class="form-control">
                            </div>
                            <span v-show="errors.has('username')" class="errors">{{ errors.first('username') }}</span>
                        </div>
                        <div class="form-group">
                            <div class="input-group">
                                <div class="input-group-addon">密&nbsp;&nbsp;&nbsp;&nbsp;码:</div>
                                <input v-validate="'required'" data-vv-as="密码" name="password" type="password" value="" v-model="password" class="form-control">
                            </div>
                            <span v-show="errors.has('password')" class="errors">{{ errors.first('password') }}</span>
                        </div>
                        <div class="btn-group btn-group-justified" role="group" aria-label="...">
                            <div class="btn-group" role="group">
                                <button class="btn btn-success" type="submit">登录</button>
                            </div>
                            <div class="btn-group" role="group">
                                <button class="btn btn-default" type="reset">重置</button>
                            </div>
                        </div>
                        <br>
                        <p>没有账户？点击 <router-link to="/register">注册</router-link></p>
                    </form>
                </div>
                <div class="col-sm-3">&nbsp;</div>
            </div>
        </div>
        <Advertisement/>
    </div>
</template>

<script>
    import Advertisement from './Advertisement'
    import Alert from './Alert'

    export default {
        name: "Login",
        components:{
            Advertisement,
            Alert,
        },
        data(){
            return {
                username: '',
                password: '',
                alertObj:null,
            }
        },
        methods:{
            login() {
                this.$validator.validateAll().then((result) => {
                    if (result) {
                        //this.loading = true
                        this.$store.dispatch('doHttpLogin', {
                            username: this.username,
                            password: this.password,
                        })
                            .then((response) => {
                                //this.loading = false
                                //console.log(response)
                                if(response.data.status){
                                    this.$router.push({ path: '/' })
                                }
                                this.alertObj=response.data
                            })
                            .catch(error => {
                                //this.loading = false
                                //console.log(error)
                                this.alertObj={status:false,msg:error.toString()}
                            })
                        return;
                    }
                    this.alertObj={status:false,msg:"请输入账号信息"}
                });
            }
        }
    }
</script>

<style scoped>

</style>