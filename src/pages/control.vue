<template>
    <div>
        <!-- 页面整体开始 -->
        <!-- 页面头部开始 -->
      <top_mine></top_mine>
        <!-- 页面头部结束 -->
        <div id="xiangqing" class="xiangqing">
            <!-- 页面内容部分 -->
            <div id="content" class="content" style="overflow: hidden;">
                <router-view></router-view>
                <fm-footer></fm-footer>
            </div>

        </div>
    </div>
</template>

<script>
    import fmFooter from "../common/fmFooter";
    import top_mine from "../common/top_mine";
    export default {
        name: "control",
        components: {fmFooter,top_mine},
        data(){
            return{
                table:false
            }
        },
        methods:{

        },

    }
</script>
<style scoped src="../css/liebiaopage.css"></style>

<style scoped>
    *{
        box-sizing: border-box;
    }
    .router-link-active {
        text-decoration: none;
    }
    .url{
        background-image: url(../assets/xinjian_queding.png);
    }
    .content .content_left{
        float: left;
        padding: 0;
        margin-top: 15px;
        width: auto;
    }
    .content .content_left a{
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 40px;
        margin-left: 30px;
    }
    .content .content_left a img{
        margin-bottom: 8px;
    }
    .content .content_left a span{
        font-size: 18px;
        font-family: Microsoft Yahei, 微软雅黑;
        color: #f6ae45;
    }
    .content .content_left a:first-child img{
        margin-bottom: -20px;
    }
    .content .content_left a:nth-of-type(2) span{
        color: #666;
    }
    .content .content_left a:hover,
    .content .content_left a:active{
        text-decoration: none;
    }
    .content .content_left ul li a{
        text-decoration: none;
    }

    .content .content_left ul li a{
        font-size: 20px;
        font-family: 新宋体;
        margin-left: 28px;
    }
    .content .content_left ul li a img{
        display: inline-block;
        margin-right: 8px;
        margin-top: -6px;
        margin-left: -24px;
    }

</style>
