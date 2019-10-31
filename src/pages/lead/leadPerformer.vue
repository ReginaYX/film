<template>
    <div class="leadPerformerContent">
        <li>
            <img src="../../assets/lead_performer1.jpg" alt="">
            <div class="leadPerformerContent_desc">
                1. 拖动演员，将同一演员合并到一起。
            </div>
        </li>
        <li>
            <div class="leadPerformerContent_desc">
                2. 调整演员顺序，选框内顶部加颜色的角色姓名为角色主名称，子名称将会自动与主名称合并。
            </div>
            <img src="../../assets/lead_performer2.jpg" alt="">
        </li>
        <li>
            <img src="../../assets/lead_performer3.jpg" alt="">
            <div class="leadPerformerContent_desc">
                3. 将所有角色姓名调整完毕后选择保存并导入表格。
            </div>
        </li>

    </div>
</template>

<script>
    export default {
        name: "leadPerformer"
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
        box-shadow: 1px 1px 10px 2px rgba(0,0,0,.05);
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
</style>