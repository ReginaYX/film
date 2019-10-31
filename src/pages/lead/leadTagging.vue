<template>
    <div class="leadPerformerContent">
        <li>
            <img src="../../assets/leadTagging1.png" alt="">
            <div class="leadPerformerContent_desc" style="width: 288px">
                从左侧边栏选择您想要编辑的集数及场次
            </div>
        </li>
        <li>
            <div class="leadPerformerContent_desc">
                如果您想对场次信息进行修改， 您可以在顶栏处进行编辑
            </div>
            <img src="../../assets/leadTagging2.png" alt="">
        </li>
        <li>
            <img src="../../assets/leadTagging3.png" alt="">
            <div class="leadPerformerContent_desc">
                当您发现多分场或者误分场的情况，可在左侧边栏将误拆场次进行合并
            </div>
        </li>
        <li>
            <div class="leadPerformerContent_desc">
                当您发现少拆场或者系统未识别的情况时，对场号等信息标注之后，系统将自动判别为两场。
            </div>
            <img src="../../assets/leadTagging4.png" alt="">
        </li>
        <li>
            <img src="../../assets/leadTagging5.png" alt="">
            <div class="leadPerformerContent_desc">
                拉动右侧滚动条或拨动鼠标滑轮即可浏览剧本。
            </div>
        </li>
        <li>
            <div class="leadPerformerContent_desc">
                当您觉得小非标注的内容不准确时，您可以框选正确的关键词。
            </div>
            <img src="../../assets/leadTagging6.png" alt="">
        </li>
        <li>
            <img src="../../assets/leadTagging7.png" alt="">
            <div class="leadPerformerContent_desc">
                对框选的关键词“右击”，出现下拉框。
            </div>
        </li>
        <li>
            <div class="leadPerformerContent_desc">
                在下拉框内选择正确类别。
            </div>
            <img src="../../assets/leadTagging8.png" alt="">
        </li>
        <li>
            <img src="../../assets/leadTagging9.png" alt="">
            <div class="leadPerformerContent_desc">
                当全部标注完毕后即可将标注的内容保存了。
            </div>
        </li>
        <li>
            <div class="leadPerformerContent_desc">
                点击右侧演员姓名，可对个人戏量统计表进行编辑
            </div>
            <img src="../../assets/leadTagging10.png" alt="">
        </li>
    </div>
</template>

<script>
    export default {
        name: "leadTagging"
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
        margin-right: 40px;
    }
    .leadPerformerContent li:nth-of-type(even)>img{
        margin-left: 40px;
        margin-right: 20px;
    }
    .leadPerformerContent li .leadPerformerContent_desc{
        display: inline-block;
        width: 280px;
        font-size: 16px;
        color: #666;
        font-family: 新宋体;
        text-align: left;
        line-height: 26px;
    }
    .leadPerformerContent li:nth-of-type(even) .leadPerformerContent_desc{
        text-align: right;
    }
</style>