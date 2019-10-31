<template>
    <div id="toolIntroduce">
        <index-top :register="registerBtn" @register1="registerData"></index-top>
        <div class="topBox">
            <img src="../../assets/toolIntroduceTopBg.png" alt="">
            <div class="TxtBox">
                <div class="title">服化道管理系统</div>
                <div class="desc">面对剧组内部云端交流的协同工具<br/>实现剧组无缝对接，实时传输信息<br/>快速确定方案，高效落地实施</div>
                <div class="btn" @click="list">立即体验</div>
            </div>
            <!--<div class="startBtn"><i class="iconfont iconbofang3"></i></div>-->
        </div>
        <div class="summaryBox">
            <div class="summaryItem">
                <img src="../../assets/toolIntroduceSummary1.png" alt="">拍摄地管理
            </div>
            <div class="hr"><div class="circle"><i class="iconfont iconyou"></i></div></div>
            <div class="summaryItem">
                <img src="../../assets/toolIntroduceSummary2.png" alt="">美术管理
            </div>
            <div class="hr"><div class="circle"><i class="iconfont iconyou"></i></div></div>
            <div class="summaryItem">
                <img src="../../assets/toolIntroduceSummary3.png" alt="">服装管理
            </div>
            <div class="hr"><div class="circle"><i class="iconfont iconyou"></i></div></div>
            <div class="summaryItem">
                <img src="../../assets/toolIntroduceSummary4.png" alt="">道具管理
            </div>
        </div>
        <div class="contentBox">
            <div class="contentTitle">高效协同从这里开始</div>
            <div class="contentItemOutside">
                <div class="contentItem">
                    <div class="contentTxt">
                        <div class="contentTxtTitle">拍摄地管理</div>
                        <div class="contentTxtDesc">
                            拍摄地信息实时录用，云端保存。堪景信<br/>
                            息可多人查看，剧本场景与拍摄地信息相关联<br/>
                            根据当地信息精准定位<br/>
                            为实际拍摄提供最近的酒店与医院
                        </div>
                    </div>
                    <video class="indexBannerBg" autoplay muted loop>
                        <source src="../../assets/toolIntroduceVideo1.mp4" type="video/mp4">
                    </video>
                </div>
            </div>
            <div class="contentItemOutside">
                <div class="contentItem">
                    <img src="../../assets/toolIntroduceImg1.png" alt="">
                    <div class="contentTxt">
                        <div class="contentTxtTitle">美术管理</div>
                        <div class="contentTxtDesc">
                            根据剧本，场景信息自动展现，可编辑<br/>
                            场景所需的置景信息以及气氛图，成员及<br/>
                            时查看，快速布景并记录场地使用时间<br/>
                            合理的规划拍摄任务
                        </div>
                    </div>
                </div>
            </div>
            <div class="contentItemOutside">
                <div class="contentItem">
                    <div class="contentTxt">
                        <div class="contentTxtTitle">演员服装管理</div>
                        <div class="contentTxtDesc">
                            根据角色信息可添加对应演员信息<br/>
                            包含演员的身高、尺码、体重以<br/>
                            及服装照片根据服装信息，提前准备服装
                        </div>
                    </div>
                    <video class="indexBannerBg" autoplay muted loop>
                        <source src="../../assets/toolIntroduceVideo3.mp4" type="video/mp4">
                    </video>
                </div>
            </div>
            <div class="contentItemOutside">
                <div class="contentItem">
                    <img src="../../assets/toolIntroduceImg2.png" alt="">
                    <div class="contentTxt">
                        <div class="contentTxtTitle">道具管理</div>
                        <div class="contentTxtDesc">
                            通过对剧本信息的筛选，可将该剧中<br/>
                            所有道具进行编辑,将道具信息编辑好<br/>
                            后,所有成员均可查看快速、高效准<br/>
                            确的所需道具
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="bottomBox">
            <div class="bottomTitle">手机查阅，任务随时掌握</div>
            <div class="bottomDesc">
                团队成员手机查阅数据，告别群聊发布任务<br/>
                随时随地，查看任务如此简单</div>
            <img src="../../assets/toolIntroduceBottomBg.png" alt="">
        </div>
        <fm-footer />
    </div>
</template>

<script>
    import fmFooter from "../../common/fmFooter";
    import indexTop from "../../common/indexTop";
    export default {
        name: "toolIntroduce",
        components: {fmFooter, indexTop},
        data(){
            return{
                registerBtn :false,
            }
        },
        methods:{
            list(){
                if(localStorage.user_id){
                    this.$router.push('/control')
                }else{
                    this.$message('请先登录');
                    this.$router.push('/login')
                }
            },
            //头部登录
            registerData(data){
                if(data == false){
                    this.registerBtn = false
                }
            },

        }
    }
</script>

<style scoped>
    /*页面顶部*/
    #toolIntroduce .topBox{
        position: relative;
    }

    #toolIntroduce .topBox>img{
        width: 100vw;
    }

    #toolIntroduce .topBox .TxtBox{
        width: 216px;
        position: absolute;
        top: 34%;
        left: 20%;
        z-index: 2;
    }

    #toolIntroduce .topBox .TxtBox .title{
        font-size:30px;
        line-height: 30px;
        font-family:SimSun;
        color:rgba(255,255,255,1);
        margin: 30% 0 10%;
    }

    #toolIntroduce .topBox .TxtBox .desc{
        font-size:12px;
        color:rgba(254,254,254,1);
        line-height:30px;
    }

    #toolIntroduce .topBox .TxtBox .btn{
        width:160px;
        height:34px;
        background:rgba(237,149,21,1);
        border-radius:20px;
        line-height: 34px;
        font-size:14px;
        color:rgba(255,255,255,1);
        margin-top: 14%;
        cursor: pointer;
        text-align: center;
    }

    #toolIntroduce .topBox .startBtn{
        width: 80px;
        height: 80px;
        border-radius: 50%;
        background: #fff;
        position: absolute;
        right: 35%;
        top: 48%;
        box-shadow: 0 0 30px 15px rgba(109,113,213,0.16);
        cursor: pointer;
        text-align: center;
    }

    #toolIntroduce .topBox .startBtn i{
        font-size: 40px;
        color: rgba(109,113,213,1);
        line-height: 82px;
        margin-left: 8px;
    }

    /*总结介绍*/
    #toolIntroduce .summaryBox{
        display: flex;
        align-items: center;
        width: 1132px;
        margin: 150px auto 220px;
        justify-content: space-between;
    }

    #toolIntroduce .summaryBox .summaryItem{
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size:18px;
        line-height: 18px;
        font-family:NSimSun;
        color:rgba(57,63,81,1);
    }

    #toolIntroduce .summaryBox .summaryItem img{
        width: 100px;
        display: block;
        margin-bottom: 25px;
    }

    #toolIntroduce .summaryBox .hr{
        width: 190px;
        height: 1px;
        background: rgba(215,217,220,1);
        position: relative;
    }

    #toolIntroduce .summaryBox .hr .circle{
        position: absolute;
        top: -16px;
        left: 80px;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        border: 1px solid rgba(215,217,220,1);
        background: #fff;
        text-align: center;
    }

    #toolIntroduce .summaryBox .hr .circle i{
        line-height: 32px;
        color: #F05050;
        font-size: 18px;
        margin-left: 2px;
    }

    /*主要功能*/
    #toolIntroduce .contentBox .contentTitle{
        font-size:30px;
        font-family:NSimSun;
        font-weight:bold;
        color:rgba(57,63,81,1);
        line-height: 30px;
        text-align: center;
    }

    #toolIntroduce .contentBox .contentItemOutside{
        width: 100vw;
        height: 800px;
    }

    #toolIntroduce .contentBox .contentItemOutside:nth-of-type(odd){
        background-image: url("../../assets/contentItemBg.png");
        height: 570px;
    }

    #toolIntroduce .contentBox .contentItem{
        width: 1132px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 0 auto;
    }

    #toolIntroduce .contentBox .contentItem .indexBannerBg{
        width: 700px;
    }

    #toolIntroduce .contentBox .contentItem .contentTxtTitle{
        font-size:24px;
        line-height: 24px;
        color:rgba(57,63,81,1);
        position: relative;
        margin-bottom: 30px;
        z-index: 2;
        letter-spacing: 3px;
    }

    #toolIntroduce .contentBox .contentItem .contentTxtTitle:before{
        position: absolute;
        content: '';
        width: 100px;
        height:20px;
        background:rgba(240,81,81,1);
        opacity:0.3;
        z-index: -1;
        bottom: -8px;
        left: -2px;
    }

    #toolIntroduce .contentBox .contentItemOutside:nth-of-type(3) .contentItem .contentTxtTitle:before{
        left: 52px;
        background:rgba(108,111,191,1);
        width: 72px;
    }

    #toolIntroduce .contentBox .contentItemOutside:nth-of-type(4) .contentItem .contentTxtTitle:before{
        background:rgba(237,149,21,1);
    }

    #toolIntroduce .contentBox .contentItemOutside:nth-of-type(5) .contentItem .contentTxtTitle:before{
        left: 28px;
        width: 86px;
        background:rgba(50,197,143,1);
    }

    #toolIntroduce .contentBox .contentItem .contentTxtDesc{
        font-size:14px;
        color:rgba(116,120,133,1);
        line-height:34px;
    }

    /*底部*/
    #toolIntroduce .bottomBox{
        height: 900px;
        width: 1132px;
        margin: 0 auto;
    }

    #toolIntroduce .bottomBox .bottomTitle{
        font-size:26px;
        font-family:SimSun;
        font-weight: bold;
        line-height: 26px;
        margin: 164px 0 30px;
        text-align: center;
        color:rgba(57,63,81,1);
    }

    #toolIntroduce .bottomBox .bottomDesc{
        font-size:14px;
        color:rgba(116,120,133,1);
        line-height:34px;
        text-align: center;
    }

    #toolIntroduce .bottomBox img{
        width: 1000px;
        margin: 30px auto 0;
        display: block;
    }

    @media screen and (max-width: 1400px){
        /*页面顶部*/
        #toolIntroduce .topBox .TxtBox{
            top: 32%;
            left: 18%;
        }

        #toolIntroduce .topBox .TxtBox .title{
            margin-top: 28%;
        }

        #toolIntroduce .topBox .startBtn{
            width: 60px;
            height: 60px;
        }

        #toolIntroduce .topBox .startBtn i{
            line-height: 62px;
            font-size: 34px;
        }
    }


</style>
