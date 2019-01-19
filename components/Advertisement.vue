<template>
    <div class="col-md-3">
        <div class="panel">
            <div class="header">
                <span class="col_fade">关于</span>
            </div>
            <div class="inner">
                <p>TBlog：tblog开源博客</p>

                <p>在这里你可以：</p>
                <ul>
                    <li>提出由建设性的建议</li>
                    <li>随意修改代码，修改成您需要的风格</li>
                    <li>分享给您的朋友</li>
                </ul>
            </div>
        </div>
        <div class="panel">
            <div class="header">
                <span class="col_fade">广告</span>
            </div>
            <div class="inner ads">
                <Logo/>
            </div>
        </div>
    </div>
</template>

<script>
  import Logo from './Logo'
    export default {
        name: "Advertisement",
        components:{
          Logo
        }
    }
</script>

<style scoped>

</style>
