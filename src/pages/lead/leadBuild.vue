<template>
    <div id="xiangqing" class="xiangqing" style="width: 930px;margin:0 auto ;">
        <!-- 页面内容部分 -->
        <!-- 第一个 -->
        <div  class="lead_main" style="height: 370px">
            <img src="../../assets/yindao_denglu.jpg" style="float: left;margin-top: 30px;">
            <div style="text-align: left;margin-top: 120px">
                <p class="lead_title">登录  注册</p><hr>
                <p class="lead_desc">点击登录/注册按钮  填写账号信息 完成登录。</p>
            </div>
        </div>
        <!-- 第二个 -->
        <div class="lead_main">
            <div>
                <p class="lead_title">进入统筹系统</p><hr>
                <p class="lead_desc">已登陆用户点击进入统筹系统进入项目列表页面。</p>
            </div>
            <img src="../../assets/yindao.jpg">
        </div>
        <!-- 第三个 -->
        <div class="lead_main">
            <img src="../../assets/yindao_liebiao.png" style="float: left">
            <div style="text-align: left">
                <p class="lead_title">添加项目</p><hr>
                <p class="lead_desc">点击图标“+”或新建项目按钮添加项目。</p>
            </div>
        </div>
        <!-- 第四个 -->
        <div class="lead_main">
            <div>
                <p class="lead_title">项目信息</p><hr>
                <p class="lead_desc">根据要求填写项目信息。</p>
            </div>
            <img src="../../assets/yindao_xinxi.png">
        </div>
        <!-- 第五个 -->
        <div class="lead_main">
            <img src="../../assets/yindao_changshuan.png" style="float: left">
            <div style="text-align: left">
                <p class="lead_title">上传剧本</p><hr>
                <p class="lead_desc">选择项目类型及要上传的剧本，点击“ 确定 ”按钮。</p>
            </div>
        </div>
        <!-- 第六个 -->
        <div class="lead_main">
            <div>
                <p class="lead_title">生成场景表</p><hr>
                <p  class="lead_desc">系统将自动生成顺场景表，如图所示。</p>
            </div>
            <img src="../../assets/yindao_changjing.jpg">
        </div>
        <!-- 第七个 -->
        <!-- <div class="lead_main">
            <img src="../../assets/yindao_bianji.jpg" style="float: left">
            <div style="text-align: left">
                <p class="lead_title">修改编辑</p><hr>
                <p class="lead_desc">对表格内容进行修改与再编辑。</p>
            </div>
        </div> -->
        <!-- 第八个 -->
        <div style="border-bottom: none" class="lead_main">
            <img src="../../assets/yindao_xiazai.png" style="float: left">
            <div style="text-align: left"> 
                <p class="lead_title">下载</p><hr>
                <p class="lead_desc">可将表格生成Excel格式并下载。</p>
            </div>
        </div>
        <!-- 页面内容部分结束 -->
    </div>
</template>

<script>
    export default {
        name: "leadBuild"
    }
</script>

<style scoped>
    hr{
        width: 60px;background: #ED9515;margin:20px 0 30px 0;height: 4px
    }
    .lead_main:nth-of-type(2n) div hr{
        margin-left: 310px;
    }
    .lead_main{
        height: 380px;border-bottom:1px solid #ddd;
        width: 100%;
    }
    .lead_main img{
        margin: 40px 0 40px 20px;
        display: inline-block;
        float: right;
        width: 500px;
        height: 300px;
        box-shadow: 1px 1px 10px 2px rgba(0,0,0,.05);
    }
    .lead_main:nth-of-type(even) img{
        margin-right: 18px;
        margin-left: 0;
    }
    .lead_main>div{
        display: inline-block;
        text-align: left;
        margin-top: 130px;
        margin-left: 40px;
    }
    .lead_main:nth-of-type(even) div{
        text-align: right;
        margin-right: 38px;
        margin-left: 0;
    }
    .lead_main div .lead_title{
        font-family: Microsoft Yahei, 微软雅黑;font-size: 20px;color: #333;
        display: inline-block;width: 270px
    }
    .lead_main div .lead_desc{
        font-size: 16px;color: #666;font-family: 新宋体;display: inline-block;width: 270px
    }
    .lead_main:nth-of-type(2n) div .lead_title,
    .lead_main:nth-of-type(2n) div .lead_desc{
        text-align: right;
    }
</style>
