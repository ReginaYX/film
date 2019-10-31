<template>
    <div class="leadPerformerContent">
        <li>
            <img src="../../assets/leadAnnouncement1.png" alt="">
            <div class="leadPerformerContent_desc">
                1.进入成员管理页面，创建分享链接。
            </div>
        </li>
        <li>
            <div class="leadPerformerContent_desc">
                2.通过微信将邀请二维码分享至好友。
            </div>
            <img src="../../assets/leadAnnouncement2.png" alt="">
        </li>
        <li>
            <img src="../../assets/leadAnnouncement3.png" alt="">
            <div class="leadPerformerContent_desc">
                3.在小程序点击加入剧组。
            </div>
        </li>

        <li>
            <div class="leadPerformerContent_desc">
                4.好友通过扫描二维码在微信小程序中 完成注册。
            </div>
          <img src="../../assets/leadAnnouncement5.png" alt="">

        </li>
        <li>
          <img src="../../assets/leadAnnouncement6.png" alt="">

          <div class="leadPerformerContent_desc">
                5.项目创建者需要在申请列表中接受申请。
            </div>
        </li>
        <li>
          <div class="leadPerformerContent_desc" style="text-align: left">
            方法二：<br/>
            1.通过公众号下方搜索进入“非幕通告单”小程序<br/>
            2.在“我的”——“点击加入剧组”——输入“剧组验证码”，加入项目组<br/>
            3.项目创建者在申请列表中接受申请
          </div>
          <img src="../../assets/leadAnnouncement4.png" alt="">
        </li>
    </div>
</template>

<script>
    export default {
        name: "leadGroup"
    }
</script>

<style scoped>
    .leadPerformerContent{
        width: 100%;
        height: auto;
    }
    .leadPerformerContent li{
        height: 380px;
        margin: 0 auto;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: 930px;
        border-bottom: 1px solid #ddd;
    }
    .leadPerformerContent li:first-child{
        height: 370px;
    }
    .leadPerformerContent li:nth-of-type(even){
        justify-content: flex-end;
    }
    .leadPerformerContent li>img{
        margin-left: 20px;
        margin-right: 36px;
        width: 500px;
        height: 300px;
        box-shadow: 1px 1px 10px 2px rgba(0,0,0,.05);
    }
    .leadPerformerContent li:nth-of-type(even)>img{
        margin-left: 36px;
        margin-right: 20px;
    }
    .leadPerformerContent li .leadPerformerContent_desc{
        display: inline-block;
        width: 305px;
        font-size: 16px;
        color: #666;
        font-family: 新宋体;
        text-align: left;
        line-height: 26px;
    }
    .leadPerformerContent li:nth-of-type(even) .leadPerformerContent_desc{
        text-align: right;
    }
    .leadPerformerContent li:nth-of-type(4) .leadPerformerContent_desc{
        width: 336px;
    }
</style>
