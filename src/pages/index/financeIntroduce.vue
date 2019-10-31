<template>
    <div id="financeIntro">
        <index-top :register="registerBtn" @register1="registerData"></index-top>
        <div class="topBox">
            <img src="../../assets/financeIntroTopBg.png" alt="">
            <div class="topContent">
                <span class="mainTitle">影视财务系统</span>
                <div class="desc">现代影视工业需要智能的财务系统，所以，它来了。<br/>一切从这里开始...</div>
                <div class="btn" @click="list">立即体验</div>
            </div>
        </div>
        <div class="summaryBox">
            <div class="summaryTitle">财务系统包含三大内容</div>
            <div class="summaryContentBox">
                <div class="summaryContent">
                    <div class="iconBox"><i class="iconfont iconyusuan"></i></div>
                    <div class="title">预算</div>
                    <div class="desc">影视预算快速制作</div>
                </div>
                <div class="summaryContent">
                    <div class="iconBox"><i class="iconfont iconnav_daily"></i></div>
                    <div class="title">收支</div>
                    <div class="desc">收入支出一目了然</div>
                </div>
                <div class="summaryContent">
                    <div class="iconBox"><i class="iconfont iconbaobiao1"></i></div>
                    <div class="title">报表</div>
                    <div class="desc">实时报表透明可控</div>
                </div>
            </div>
        </div>
        <div class="contentBox">
            <div class="mainTitle">财务更便捷</div>
            <div class="desc">-财务系统将更专业的为您解决烦恼-</div>
            <div class="contentItemOutside">
                <div class="contentItem">
                    <div class="contentTxt">
                        <i class="iconfont iconmoban"></i>
                        <div class="contentTxtTitle">专业的财务模板</div>
                        <div class="contentTxtDesc">
                            在预算系统中，我们有专业的预算模板<br/>
                            为您省去反复添加的烦恼<br/>
                            已使用过的财务分类可保存为模板<br/>
                            下一个项目不必添加，选取后直接使用
                        </div>
                    </div>
                    <video class="indexBannerBg" autoplay muted loop>
                        <source src="../../assets/financeIntroVideo1.mp4" type="video/mp4">
                    </video>
                </div>
            </div>
            <div class="contentItemOutside">
                <div class="contentItem">
                    <img src="../../assets/financeIntroContent2.png" alt="">
                    <div class="contentTxt">
                        <i class="iconfont iconjilu1"></i>
                        <div class="contentTxtTitle">实时操作记录<br/>保证数据安全</div>
                        <div class="contentTxtDesc">
                            每一次操作均会有记录保存<br/>
                            我们每时每刻都在保护用户的数据安全
                        </div>
                    </div>
                </div>
            </div>
            <div class="contentItemOutside bg">
                <div class="contentItem">
                    <div class="contentTxt">
                        <i class="iconfont icongengxin"></i>
                        <div class="contentTxtTitle">财务数据实时更新<br/>随时随地查看进度</div>
                        <div class="contentTxtDesc">
                            财务数据毫秒级同步，时刻掌握最新财务情况<br/>
                            随时随地为投资人、制片方提供便捷的资金掌控手段
                        </div>
                    </div>
                    <img src="../../assets/financeIntroContent3.png" alt="">
                </div>
            </div>
            <div class="contentItemOutside">
                <div class="contentItem">
                    <img src="../../assets/financeIntroContent4.png" alt="">
                    <div class="contentTxt">
                        <i class="iconfont iconxietong"></i>
                        <div class="contentTxtTitle">财务高效协同<br/>当然不仅仅是记录</div>
                        <div class="contentTxtDesc">
                            在财务系统中，我们加入了线上审批机制<br/>
                            财务不再是复杂的工作<br/>
                            线上审阅，快速审批，多人协作<br/>
                            让影视剧拍摄准备时间更短，更早开机
                        </div>
                    </div>
                </div>
            </div>
            <div class="contentItemOutside">
                <div class="contentItem">
                    <div class="contentTxt">
                        <i class="iconfont iconyujing"></i>
                        <div class="contentTxtTitle">财务预警<br/>让资金规划更加合理</div>
                        <div class="contentTxtDesc">
                            收入支出实时录入，财务报表及时生成<br/>
                            根据预算与拍摄周期的预设对资金的超支进行预警<br/>
                            可让剧组及时调整与管理资金状况
                        </div>
                    </div>
                    <img src="../../assets/financeIntroContent5.png" alt="">
                </div>
            </div>
        </div>
        <fm-footer />
    </div>
</template>

<script>
    import fmFooter from "../../common/fmFooter";
    import indexTop from "../../common/indexTop";
    export default {
        name: "financeIntroduce",
        components: {fmFooter, indexTop},
        metaInfo: {
            title: '【影视财务】如何快速制作电影预算表', // set a title
            meta: [{                 // set meta
                name: 'keyWords',
                content: '标准化影视财务范本，快速制作影视预算表，与电影电视剧项目支出同步对比，并提供财务报表，实时查看项目财务信息，帮助投资方，制片人了解项目支出与进度。'
            }]
        },
        data() {
            return {
                registerBtn: false,
            }
        },
        methods: {
            list(){
                if(localStorage.user_id){
                    this.$router.push('/control')
                }else{
                    this.$message('请先登录');
                    this.$router.push('/login')
                }
            },
            //头部登录
            registerData(data) {
                if (data == false) {
                    this.registerBtn = false
                }
            },
        }
    }
</script>

<style scoped>
    *{
        box-sizing: border-box;
    }

    /*顶部*/
    #financeIntro .topBox{
        width: 100vw;
        overflow: hidden;
        text-align: center;
    }

    #financeIntro .topBox>img{
        width: 100vw;
    }

    #financeIntro .topContent{
        position: absolute;
        z-index: 2;
        top: 0;
        left: 0;
        right: 0;
        margin: 0 auto;
    }

    #financeIntro .mainTitle{
        font-size:30px;
        font-family:SimSun;
        color:rgba(57,63,81,1);
        display: inline-block;
        margin: 9% auto 1.5%;
        position: relative;
        font-weight:bold;
    }

    #financeIntro .mainTitle:after{
        content: '';
        position: absolute;
        width: calc(100% + 52px);
        height: 25px;
        background:rgba(108,111,191,0.2);
        bottom: -12px;
        left: -26px;
        z-index: -1;
    }

    #financeIntro .topBox .desc{
        font-size:14px;
        color:rgba(0,0,0,0.8);
        line-height: 24px;
    }

    #financeIntro .topBox .btn{
        width:190px;
        height:52px;
        background:rgba(237,149,21,1);
        border-radius:26px;
        font-size:14px;
        text-align: center;
        line-height: 52px;
        margin: 4% auto 0;
        color:rgba(255,255,255,1);
        cursor: pointer;
    }

    /*总结*/
    #financeIntro .summaryBox{
        margin: -12.2% auto 0;
        width:1132px;
        height:386px;
        background:rgba(255,255,255,1);
        box-shadow: 0 6px 12px 6px rgba(0,0,0,0.04);
        position: relative;
        z-index: 2;
        padding: 35px 142px;
    }

    #financeIntro .summaryBox .summaryTitle{
        font-size:20px;
        font-family:SimSun;
        font-weight:bold;
        color:rgba(0,0,0,1);
        text-align: center;
    }

    #financeIntro .summaryBox .summaryContentBox{
        margin-top: 70px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    #financeIntro .summaryBox .summaryContent .iconBox{
        width:100px;
        height:100px;
        border:2px solid rgba(240,80,80,1);
        border-radius:50%;
        text-align: center;
    }

    #financeIntro .summaryBox .summaryContent .iconBox i{
        font-size: 45px;
        color: rgba(240,80,80,1);
        line-height: 98px;
    }

    #financeIntro .summaryBox .summaryContent:nth-of-type(2) .iconBox{
        border-color: rgba(109,112,191,1);
    }

    #financeIntro .summaryBox .summaryContent:nth-of-type(2) .iconBox i{
        color: rgba(109,112,191,1);
    }


    #financeIntro .summaryBox .summaryContent:nth-of-type(3) .iconBox{
        border-color: rgba(237,149,21,1);
    }

    #financeIntro .summaryBox .summaryContent:nth-of-type(3) .iconBox i{
        color: rgba(237,149,21,1);
    }

    #financeIntro .summaryBox .summaryContent .title{
        font-size:22px;
        font-weight:bold;
        color:rgba(57,63,81,1);
        text-align: center;
        line-height: 22px;
        margin: 32px 0 28px;
    }

    #financeIntro .summaryBox .summaryContent .desc{
        font-size:12px;
        font-weight:bold;
        color:rgba(57,63,81,0.8);
        text-align: center;
    }

    /*主要内容*/
    #financeIntro .contentBox{
        text-align: center;
    }

    #financeIntro .contentBox .mainTitle{
        font-size:26px;
    }

    #financeIntro .contentBox .mainTitle:after{
        bottom: -6px;
        background:rgba(50,197,143,0.4);
    }

    #financeIntro .contentBox .desc{
        font-size:16px;
        color:rgba(0,0,0,0.8);
        line-height: 16px;
        margin-bottom: 26px;
    }

    #financeIntro .contentItemOutside{
        width: 100%;
    }

    #financeIntro .contentItemOutside.bg{
        background-image: url("../../assets/financeIntroItemBg.png");
        background-repeat: no-repeat;
        background-position: bottom;
        height: 600px;
        margin-bottom: 50px;
    }

    #financeIntro .contentItem{
        width: 1132px;
        height: 660px;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    #financeIntro .contentItem .contentTxt{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin-top: 6px;
    }

    #financeIntro .contentItem .contentTxt>i{
        font-size: 44px;
        color: #6C6FBF;
        line-height: 44px;
        margin-bottom: 24px;
    }

    #financeIntro .contentItem .contentTxt .contentTxtTitle{
        font-size:26px;
        font-family:SimSun;
        font-weight:bold;
        color:rgba(57,63,81,1);
        line-height: 36px;
        margin-bottom: 30px;
        text-align: left;
    }

    #financeIntro .contentItem .contentTxt .contentTxtDesc{
        font-size:14px;
        text-align: left;
        line-height: 20px;
        /*color:rgba(0,0,0,0.8);*/
        color:rgba(57,63,81,0.8);
    }

    #financeIntro .contentItem .indexBannerBg{
        width: 700px;
    }

    #financeIntro .contentItemOutside:nth-of-type(4) .contentItem>img{
        margin-left: -20px;
    }

    #financeIntro .contentItemOutside:nth-last-of-type(2) .contentItem>img{
        margin-left: -86px;
    }
</style>