<template>
  <div class="container main">
    <div class="col-md-9" id="content">
      <ul class="breadcrumb">
        <li><router-link to="/">首页</router-link><span class="divider"></span></li>
        <li class="active"><a href="/tblog/?tab=java">Java</a></li>
      </ul>
      <Alert v-if="alertObj" :data="alertObj"/>
      <div v-if="post!=null" class="panel">
        <div class="header topic-header">
          <h1 class="topic-full-title">{{post.title}}</h1>
          <div class="changes">
            <span>{{post.friendlyTime}}</span><span>&nbsp;&nbsp;作者：<a href="/tblog/pub/user/5b7d59bbbf578d05d7046ef6">{{post.author.username}}</a></span><span>&nbsp;&nbsp;{{post.visitCount}}次浏览</span>
          </div>
        </div>
        <div class="inner topic">
          <div class="topic-content">
            <div class="editormd-preview-container" v-html="post.contentHTML"></div>
          </div>
          <div class="topic-tags">
            <span>标签：</span>
            <a v-for="(tag,index) in post.tags" :key="index" href="" class="tag">{{tag}}</a>
            <!--<a href="/tblog/tag/" class="tag"></a>-->
          </div>
          <div class="topic-action-wrapper">
            <div class="topic-actions">
              <a href="/tblog/like/add/5b87dceabf578d115d2357ac" class="action-link">
                <img src="../../assets/ico/like.svg" alt="">
                <span>喜欢</span>
              </a>
              <a href="#reply" class="action-link">
                <img src="../../assets/ico/comment.svg" alt="">
                <span>评论</span>
              </a>
              <a id="collectLink" href="/tblog/collect/add/5b87dceabf578d115d2357ac" class="action-link" title="收藏">
                <img src="../../assets/ico/collect.svg" alt="">
              </a>
              <a href="javascript:;" class="action-link">
                <img src="../../assets/ico/share.svg" alt="">
                <span>分享</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <!--no-ssr声明此组件仅在客户端呈现,不做服务端渲染 -->
      <no-ssr placeholder="Loading...">
        <Comment/>
      </no-ssr>
    </div>
    <Advertisement/>
  </div>
</template>
<script>
  import Advertisement from '../../components/Advertisement'
  import Alert from '../../components/Alert'
  import Comment from '../../components/Comment'

  export default {
    components:{
      Advertisement,
      Comment,
      Alert
    },
    validate ({ params }) {
      //验证是否合规的ID
      return /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i.test(params.id)
    },
    head() {
      const post = this.post
      return {
        title:post?(post.title || 'tblog文章标题'):'',
        meta: [
          {
            hid: 'keywords',
            name: 'keywords',
            content:post?((post.tags ? post.tags.join(',') : post.title) || ''):''
          },
          { hid: 'description', name: 'description', content: post?post.desc:'' }
        ]
      }
    },
    data(){
      return {
        post:null,
        alertObj:null,
      }
    },
    async asyncData({$axios,params}){
      try{
        const {status,data,msg}= await $axios.$get('/post/detail/'+params.id);
        //console.log(data)
        if(status){
          return {post:data}
        }else{
          return {alertObj:{status:false,msg:msg}}
        }
      }catch(error){
        return {alertObj:{status:false,msg:error.message}}
      }
    },
  }
</script>

<style scoped>
  #content .topic-full-title {
    font-size: 22px;
    font-weight: 700;
    margin: 8px 0;
    display: inline-block;
    vertical-align: bottom;
    width: 75%;
    line-height: 130%
  }

  #content .changes {
    font-size: 12px;
    color: #838383
  }


  #content .changes a {
    color: inherit
  }

  #content .action {
    float: right;
    margin-top: 8px
  }

  #content .share {
    text-align: right;
    margin-top:-5px;
  }
  .topic-content {
    margin: 0 10px
  }
  .topic-content img,
  .editormd-preview-container img{
    display: inline-block;
    max-width:100%;
    height: auto;
  }

  .topic-content p,
  .preview p,
  .reply-content p,
  .reply-form p {
    font-size: 15px;
    line-height: 1.7em;
    overflow: auto;
  }

  .topic-tags {
    margin: 1.2rem 0;
    padding-left: 24px;
    padding-right: 24px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
  }
  .topic-tags .tag {
    display: inline-block;
    background-color: #f1f1f1;
    border: none;
    color: #666;
    padding: .7rem 1rem;
    border-radius: 2px;
    margin-right: .6rem;
    margin-bottom: .6rem;
    line-height: 1.5;
  }
  .topic-action-wrapper {
    display: flex;
    justify-content: flex-end;
  }
  .action-link {
    width: 66px;
    margin: 0 10px;
  }
</style>
