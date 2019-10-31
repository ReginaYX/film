<template>
    <div class="leadPerformerContent">
        <li>
            <img src="../../assets/leadGroup1.png" alt="">
            <div class="leadPerformerContent_desc">
                1.选择设置通告单日期及拍摄地。
            </div>
        </li>
        <li>
            <div class="leadPerformerContent_desc">
                2.点击操作，勾选通告单推送对象。（如果需要添加新成员，需要至成员管理页面添加）
            </div>
            <img src="../../assets/leadGroup2.png" alt="">
        </li>
        <li>
            <img src="../../assets/leadGroup3.png" alt="">
            <div class="leadPerformerContent_desc">
                3.按顺序一次勾选拍摄场次。
            </div>
        </li>
        <li>
            <div class="leadPerformerContent_desc">
                4.完善出发时间，化妆时间，主要联络咨询等信息。
            </div>
            <img src="../../assets/leadGroup4.png" alt="">
        </li>
        <li>
            <img src="../../assets/leadGroup5.png" alt="">
            <div class="leadPerformerContent_desc">
                5.提交后对通告单信息进行核查。
            </div>
        </li>
        <li>
            <div class="leadPerformerContent_desc">
                6.发布成功后切换至小程序端进行查看。
            </div>
            <img src="../../assets/leadGroup6.png" alt="">
        </li>
    </div>

</template>

<script>
    export default {
        name: "leadAnnouncement"
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
    }
    .leadPerformerContent li:nth-of-type(even)>img{
        margin-left: 36px;
        margin-right: 20px;
    }
    .leadPerformerContent li .leadPerformerContent_desc{
        display: inline-block;
        width: 290px;
        font-size: 16px;
        color: #666;
        font-family: 新宋体;
        text-align: left;
        line-height: 26px;
    }
    .leadPerformerContent li:nth-of-type(even) .leadPerformerContent_desc{
        text-align: right;
    }
    .leadPerformerContent li:nth-of-type(2) .leadPerformerContent_desc{
        width: 280px;
    }
</style>