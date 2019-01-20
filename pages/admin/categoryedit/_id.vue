<template>
  <div class="container main">
    <Advertisement/>
    <div class="col-md-9">
      <ul class="breadcrumb">
        <li><nuxt-link to="/">主页</nuxt-link><span class="divider"></span></li>
        <li><nuxt-link to="/admin/category">管理栏目</nuxt-link><span class="divider"></span></li>
        <li class="active">修改栏目</li>
      </ul>
      <div class="panel">
        <div class="inner">
          <div class="topic_content">
            <Alert v-if="alertObj" :data="alertObj"/>
            <div class="markdown-text">
              <h3>修改栏目</h3>
              <form method="post" action="#" @submit.prevent="updateCategory">
                <div class="form-group">
                  <div class="input-group">
                    <div class="input-group-addon">栏目名称:</div>
                    <input v-validate="'required'" data-vv-as="栏目名称" v-model="category.catName" type="text" class="form-control" name="catName" value="" placeholder="">
                  </div>
                  <span v-show="errors.has('catName')" class="errors">{{ errors.first('catName') }}</span>
                </div>
                <div class="form-group">
                  <div class="input-group">
                    <div class="input-group-addon">目录名称（小写英文字母）:</div>
                    <input v-validate="'required'" data-vv-as="目录名称" v-model="category.catDir" type="text" class="form-control" name="catDir" value="" placeholder="">
                  </div>
                  <span v-show="errors.has('catDir')" class="errors">{{ errors.first('catDir') }}</span>
                </div>
                <div class="form-group">
                  <div class="input-group">
                    <div class="input-group-addon">目录简介:</div>
                    <textarea v-model="category.catDesc" name="catDesc" class="form-control" rows="4" placeholder="请输入栏目简介，方便SEO优化"></textarea>
                  </div>
                </div>
                <div class="form-group">
                  <div class="text-center">
                    <button class="btn btn-success" type="submit">更新</button>
                    <button class="btn btn-default" type="reset">清空</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Advertisement from '../../../components/Advertisement'
  import Alert from '../../../components/Alert'

  export default {
    name: "CategoryEdit",
    components:{
      Advertisement,
      Alert,
    },
    validate ({ params }) {
      //验证是否合规的ID
      return /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i.test(params.id)
    },
    data(){
      return {
        category:{},
        alertObj:null,
      }
    },
    mounted:function(){
      const {id}=this.$route.params
      //console.log(id)
      this.initData(id);
    },
    methods:{
      async initData(catId){
        try{
          this.$axios.defaults.headers.common['Authorization'] = this.$store.state.token
          const response=await this.$axios.$get('/category/'+catId);
          //console.log('category:', response)
          if(response.status){
            this.category=response.data
          }else{
            this.alertObj=response
          }
        }catch(error){
          this.alertObj={status:false,msg:error.message}
        }
      },
     async updateCategory(){
        const result=await this.$validator.validateAll()
        if(result){
          try{
            this.$axios.defaults.headers.common['Authorization'] = this.$store.state.token
            const params={
                    id:this.category.id,
                    catName: this.category.catName,
                    catDir: this.category.catDir,
                    catDesc:this.category.catDesc,
             }
            const response=await this.$axios.$put('/category/'+params.id,params);
            this.alertObj=response
          }catch(error){
            this.alertObj={status:false,msg:error.message}
          }
        }else{
          this.alertObj={status:false,msg:"请输入栏目信息"}
        }
      }
    }

  }
</script>

<style scoped>

</style>
