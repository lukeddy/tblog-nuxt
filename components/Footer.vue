<template>
    <div id="footer">
       <div id="footer-main">
        <div class="links">
            <strong class="env">环境：{{appName}}||{{env}}</strong>
            |
            <a class="dark" href="/tblog/rss">RSS</a>
            |
            <a href="/tblog/swagger-ui.html" target="_blank">API</a>
            |
            <a class="dark" href="https://github.com/tzq668766/tblog/tree/origin/tblog-springboot-mongo-thymeleaf/">源码地址</a>
            | 本次构建于：
            <a href="https://github.com/tzq668766/tblog/commit/3f1db24fbdab0e018dd1d977398060d1f62be1db" target="_blank" title="页脚添加api入口">0.0.1-2018-11-03T22:25:37+0800</a>
        </div>

        <div class="col_fade">
            <p>TBlog使用Java技术，结合流行框架开发个人博客系统。</p>
            <p>如果感觉系统比错，请不要吝啬您的星星，只需要轻轻的戳一下，谢谢！ <a href="https://github.com/${fns:getConfig(&quot;git.build.user.name&quot;)}">个人博客(https://www.xxoo.com/)</a></p>
        </div>
    </div>
</div>
</template>
<script>
  import {environment} from '../environment'
  import {app,server} from '../config/app.config'
export default {
    name:"Footer",
    data(){
        return {
            appName:app.appName,
            env:environment.NODE_ENV,
            apiUrl:server.apiBaseUrl,
            serverUrl:server.serverBaseUrl
        }
    }
}
</script>
<style>
  .env{
     color:tomato;
  }
  #footer {
    clear: both;
    background: #fff;
  }
  #footer-main {
    width: 90%;
    max-width: 1400px;
    min-width: 960px;
    margin: 0 auto;
    color: #e2e2e2;
    padding: 20px 0;
    font-size: 13px;
    line-height: 2em;
  }
</style>
