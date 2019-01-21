<template>
  <div class="container main">
    <div class="col-md-9">
      <ul class="breadcrumb">
        <li><nuxt-link to="/">首页</nuxt-link><span class="divider"></span></li>
        <li class="active">登录</li>
      </ul>
      <div class="row wrapper">
        <div class="col-sm-3">&nbsp;</div>
        <div class="col-sm-6">
          <Alert v-if="alertObj" :data="alertObj"/>
          <form method="post" @submit.prevent="login">
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
            <p>没有账户？点击 <nuxt-link to="/register">注册</nuxt-link></p>
          </form>
        </div>
        <div class="col-sm-3">&nbsp;</div>
      </div>
    </div>
    <Advertisement/>
  </div>
</template>

<script>
  import Advertisement from '../components/Advertisement'
  import Alert from '../components/Alert'

  export default {
    components:{
      Advertisement,
      Alert,
    },
    head() {
      return {
        title:'登录页',
        meta: [
          {
            hid: 'keywords',
            name: 'keywords',
            content:'登录'
          },
          { hid: 'description', name: 'description', content: '登录页' }
        ]
      }
    },
    data(){
      return {
        username: '',
        password: '',
        alertObj:null,
      }
    },
    methods:{
      async login() {
        const result= await this.$validator.validateAll();
        if(result){
          try {
            const params={
              username: this.username,
              password: this.password
            }
            const response = await this.$axios.$post('/login',params)
            console.log(response)
            this.alertObj=response;
            if(response.status){
              console.log(response.data)
              this.$store.commit('setToken',response.data.token)
              this.$store.commit('setUser',response.data.userInfo)
              this.$axios.setToken(response.data.token)
              this.$router.push('/')
            }
          } catch (e) {
            console.log(e)
            this.alertObj={status:false,msg:e.message}
          }
        }else{
          this.alertObj={status:false,msg:"请输入账号信息"}
        }
      },
    }
  }
</script>
