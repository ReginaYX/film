<template>
    <div id="tipsFormat">
        <div class="topBox">
            专业剧本写作格式
        </div>
        <div class="return" @click="$router.go(-1)"><span><< </span>&#8197;  返回上一页</div>
        <div class="txt">
            <p>1.《霸王别姬》 电影剧本    （节选）</p>
            <p>
                1.剧院 日 内  （字幕 一九七七年 中国北京）<br>
                大花脸与刀马旦缓缓步入剧院，剧院闲置，没有一个观众。<br>
                画外音：干什么的。<br>
                大花脸：噢，京剧院来走台的。<br>
                画外音：哎呦，是您二位啊？我是您二位的戏迷。<br>
                大花脸：是啊？哎呦。<br>
                画外音：您两位有二十多年，没有在一块唱了吧<br>
                大花脸：二十一年。<br>
                刀马旦：二是二年。</p>

            <p>
                2.街道 日 外（字幕 一九二四年 北平 北洋政府时代）<br>
                艳红带着小豆子急匆匆在街道行走，小豆子手上裹着厚厚的布。头上戴着帽子
                一个穿着马褂长衫戴着瓜皮帽的男子窜出一边说一遍跟着走：哟，这不是艳红
                吗？老没见，你可想死我！（伸手抚摸艳红的脸）<br>
                艳红推开男子的手。<br>
                男子拉住艳红的胳膊：诶！<br>
                艳红再度推开男子，走了。<br>
                男子停留住，然后指着艳红离开的方向：臭婊子，你!<br>
                艳红抱着小豆子在街道急行，这个时候我们看到孩子的嘴上裹着布，看不到脸。</p>
            <div class="tipsBox rightBottom right1">场景名称：该场戏的场景信息</div>
            <div class="tipsBox rightTop right2">场号：代表一场戏的开始</div>
            <div class="tipsBox rightTop right3">气氛：标明白天或晚上拍摄<br>&#12288; &#12288; &#12288; 室内或室外拍摄等信息</div>
            <div class="tipsBox leftBottom left1">两场戏之间间隔一行</div>
            <div class="tipsBox leftBottom left2">每个动作结束，或者对话结束后尽可能另起一行</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "tipsFormat",
    }
</script>

<style>
    #tipsFormat+#footer{
        display: none;
    }
</style>

<style scoped>
    #tipsFormat{
        width: 1132px;
        margin: 72px auto;
    }

    #tipsFormat .topBox{
        background-image: url("../../assets/inviteRulesBg.png");
        height:120px;
        background-size: 1132px 120px;
        font-size:40px;
        font-family:SimSun;
        text-align: center;
        line-height: 120px;
        letter-spacing: 4px;
        color:rgba(255,255,255,1);
    }

    #tipsFormat .return{
        font-size:12px;
        display: flex;
        align-items: center;
        color:rgba(101,101,136,1);
        margin-top: 24px;
        cursor: pointer;
    }

    #tipsFormat .return span{
        font-size:12px;
        color:rgba(101,101,136,1);
    }

    #tipsFormat .txt{
        width: 528px;
        margin: 50px auto 100px;
        position: relative;
    }

    #tipsFormat .txt p{
        font-size:14px;
        color:rgba(47,47,47,1);
        line-height: 24px;
        margin-bottom: 26px;
    }

    #tipsFormat .tipsBox{
        font-size:14px;
        color:rgba(47,47,47,1);
        text-align: center;
        line-height: 46px;
        width:242px;
        height:46px;
        background:rgba(57,190,232,0.3);
        border-radius:2px 2px 0 2px;
        position: absolute;
        box-sizing: border-box;
    }

    #tipsFormat .tipsBox.rightTop{
        border-radius:2px 0 2px 2px;
    }

    #tipsFormat .tipsBox.leftBottom{
        border-radius:2px 2px 2px 0 ;
    }

    #tipsFormat .tipsBox.right1{
        left: -270px;
        top: 14px;
    }

    #tipsFormat .tipsBox.right2{
        left: -270px;
        top: 66px;
    }

    #tipsFormat .tipsBox.right3{
        left: -270px;
        bottom: 130px;
        height: 66px;
        line-height: 24px;
        padding-top: 10px;
    }

    #tipsFormat .tipsBox.left1{
        right: 22px;
        bottom: 230px;
        width: 220px;
    }

    #tipsFormat .tipsBox.left2{
        right: -150px;
        bottom: 70px;
        width: 350px;
    }

    #tipsFormat .tipsBox:after{
        content: '';
        width:0;
        height:0;
        position: absolute;
    }

    #tipsFormat .tipsBox.rightBottom:after{
        border-top:6px solid transparent;
        border-bottom:0px solid transparent;
        border-left:20px solid rgba(57,190,232,0.3);
        right: -20px;
        bottom: 0;
    }

    #tipsFormat .tipsBox.rightTop:after{
        border-top:0px solid transparent;
        border-bottom:6px solid transparent;
        border-left:20px solid rgba(57,190,232,0.3);
        right: -20px;
        top: 0;
    }

    #tipsFormat .tipsBox.right3:after{
        border-bottom:10px solid transparent;
        border-left:80px solid rgba(57,190,232,0.3);
        right: -80px;
    }

    #tipsFormat .tipsBox.leftBottom:after{
        border-top:10px solid transparent;
        border-bottom:0px solid transparent;
        border-right:40px solid rgba(57,190,232,0.3);
        left: -40px;
        bottom: 0;
    }

</style>