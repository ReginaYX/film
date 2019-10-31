<template>
    <div id="xiangqing" class="xiangqing" style="width: 930px;margin:0 auto;">
        <!-- 页面内容部分 -->
        <!-- 第一个 -->
        <div  class="lead_main" style="height: 370px">
            <img src="../../assets/table_uploadtable1.png" style="float: left;margin-top: 30px;">
            <div style="text-align: left;margin-top: 160px;">
                <p class="lead_desc" style="width: 320px;line-height: 24px">应用于根据现有剧本完成顺场景表（或将非幕帮您做好的顺场景表进行二次编辑的情况。）</p>
            </div>
        </div>
        <!-- 第二个 -->
        <div class="lead_main">
            <div>
                <p class="lead_desc">1.点击新建项目。</p>
            </div>
            <img src="../../assets/table_uploadtable2.png">
        </div>
        <!-- 第三个 -->
        <div class="lead_main">
            <img src="../../assets/table_uploadtable1.png" style="float: left">
            <div style="text-align: left">
                <p class="lead_desc">2.选择智能拆表</p>
            </div>
        </div>
        <!-- 第四个 -->
        <div class="lead_main">
            <div>
                <p class="lead_desc">3.填写项目信息，并上传剧本。</p>
            </div>
            <img src="../../assets/table_uploadtable4.png">
        </div>
        <!-- 第五个 -->
        <div class="lead_main">
            <img src="../../assets/table_uploadtable5.png" style="float: left">
            <div style="text-align: left">
                <p class="lead_desc" style="width: 244px;line-height: 24px">4.根据非幕所提供的表格示例修改顺场景表样式。</p>
            </div>
        </div>
        <!-- 第六个 -->
        <div class="lead_main">
            <div>
                <p class="lead_desc">5.将修改好后的顺场景表提交至服务器。</p>
            </div>
            <img src="../../assets/yindao_xiazai.png">
        </div>
        <!-- 第七个 -->
        <div class="lead_main">
            <img src="../../assets/table_uploadtable7.png" style="float: left">
            <div style="text-align: left">
                <p class="lead_desc" style="width: 310px;line-height: 24px">6.非幕将根据您表格内容为您生成<span>顺场景表</span>及<span>人物戏量统计表</span>。</p>
            </div>
        </div>
        <!-- 页面内容部分结束 -->
    </div>
</template>

<script>
    export default {
        name: "leadTable"
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
    .lead_main:last-child{
        border-bottom: none;
    }
    .lead_main img{
        margin: 40px 0 40px 20px;
        display: inline-block;
        float: right;
        width: 500px;height: 300px;
        box-shadow: 1px 1px 10px 2px rgba(0,0,0,.05);
    }
    .lead_main:nth-of-type(even) img{
        margin-right: 20px;
        margin-left: 0;
    }
    .lead_main>div{
        display: inline-block;
        text-align: left;
        margin-top: 180px;
        margin-left: 40px;
    }
    .lead_main:nth-of-type(even) div{
        text-align: right;
        /*margin-right: 40px;*/
        margin-left: 0;
    }
    .lead_main div .lead_title{
        font-family: Microsoft Yahei, 微软雅黑;
        font-size: 18px;
        color: #333;
        display: block;
        width: 360px;
        margin-bottom: 14px;
    }
    .lead_main div .lead_desc{
        font-size: 16px;color: #666;font-family: 新宋体;display: inline-block;width: 370px
    }
    .lead_main div .lead_desc span{
        color: #fd4444;
        font-size: 16px;
    }
    .lead_main:nth-of-type(2n) div .lead_title,
    .lead_main:nth-of-type(2n) div .lead_desc{
        text-align: right;
    }
</style>
