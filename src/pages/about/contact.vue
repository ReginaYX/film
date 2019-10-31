<template>
    <div>
        <div class="contact">
            <!-- 页面内容部分 -->
            <div class="contactTitle">联系我们</div>
            <div class="col-xs-3">
                <img src="../../assets/lianxi_hezuo.png">
                <h3>商务洽谈 品牌合作</h3>
                <div class="cutOff"></div>
                <p>李先生</p>
                <p>lizeqiang@filmptn.com</p>
                <p>0351-8333587</p>
            </div>
            <div class="col-xs-3">
                <img src="../../assets/lianxi_zixun.png">
                <h3>业务咨询 售后服务</h3>
                <div class="cutOff"></div>
                <p>微信搜索“非幕制片”</p>
                <p>关注服务号并进行咨询</p>
                <p>在线咨询时间：周一至周五</p>
                <p>每天9:00至18:00</p>
            </div>
            <div class="col-xs-3">
                <img src="../../assets/lianxi_tousu.png">
                <h3>投诉建议</h3>
                <div class="cutOff"></div>
                <p>请发送邮件至help@filmptn.com</p>
            </div>
            <div class="col-xs-3">
                <img src="../../assets/lianxi_jiaru.png">
                <h3>加入非幕</h3>
                <div class="cutOff"></div>
                <p>请发送邮件至zhaopin@filmptn.com</p>
            </div>
            <!-- 页面内容部分结束 -->
        </div>
        <br>
    </div>
</template>

<script>
    export default {
        name: "contact",
    }
</script>

<style scoped>
    .contact .contactTitle{
        height: 70px;
        line-height: 70px;
        border-bottom: 1px solid #ddd;
        font-size: 20px;
        color: #333;
        padding-left: 45px;
        margin-bottom: 30px;
    }
    .contact .col-xs-3{
        width: 100%;
        padding-left: 45px;
        margin-bottom: 45px;
    }
    .contact .col-xs-3 h3{
        font-size: 18px;
        color: #666;
    }
    .contact .col-xs-3 .cutOff{
        width: 60px;
        border:2px solid #ED9515;
        margin:20px 0 30px;
    }
    .contact .col-xs-3 p{
        font-size: 16px;
    }
</style>
