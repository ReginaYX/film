<template>
    <div id="noticeIntroduce">
        <index-top :register="registerBtn" @register1="registerData"></index-top>
        <div class="topBox">
            <img src="../../assets/noticeIntroduceTopBg.png" alt="">
            <div class="TxtBox">
                <div class="title">电子通告单</div>
                <div class="desc">影视数据化时代到来，告别纸质通告单<br/>剧组高效沟通，从这里开始...</div>
                <div class="btn" @click="list">立即体验</div>
            </div>
            <!--<div class="startBtn"><i class="iconfont iconbofang3"></i></div>-->
        </div>
        <div class="summaryBox">
            <div class="summaryItem">
                <div class="summaryIconBox"><i class="iconfont icondingweiweizhi"></i></div>
                <div class="summaryTitle">GPS精准定位</div>
                <div class="summaryDesc">自动连接GPS定位<br />轻松获取所在地点</div>
            </div>
            <div class="summaryItem">
                <div class="summaryIconBox"><i class="iconfont icontianqi"></i></div>
                <div class="summaryTitle">天气信息</div>
                <div class="summaryDesc">天气信息每分钟更新<br />实时查看您的拍摄条件</div>
            </div>
            <div class="summaryItem">
                <div class="summaryIconBox"><i class="iconfont iconpaishe-z"></i></div>
                <div class="summaryTitle">拍摄计划</div>
                <div class="summaryDesc">根据剧本信息<br />提前安排拍摄计划</div>
            </div>
            <div class="summaryItem">
                <div class="summaryIconBox"><i class="iconfont iconchayuerenshu"></i></div>
                <div class="summaryTitle">移动查阅</div>
                <div class="summaryDesc">微信小程序直接查看<br />无需下载，高效沟通</div>
            </div>
            <div class="summaryItem">
                <div class="summaryIconBox"><i class="iconfont icontongxunlu1"></i></div>
                <div class="summaryTitle">便捷通讯录</div>
                <div class="summaryDesc">实时查看剧组通讯录<br/>没有联系不到的人员</div>
            </div>
        </div>
        <div class="hr"></div>
        <div class="contentBox">
            <div class="mainTitle">行业领先的全新通告单</div>
            <div class="desc">覆盖电脑，移动设备双终端，满足团队成员多场景的通告需求</div>
            <div class="contentItemOutside">
                <div class="contentItem">
                    <div class="contentTxt">
                        <i class="iconfont iconshujutongbu"></i>
                        <div class="contentTxtTitle">数据实时同步</div>
                        <div class="contentTxtDesc">
                            影视拍摄计划瞬息万变<br/>
                            面对不断变化的拍摄要求<br/>
                            您需要一个实时同步的通告单
                        </div>
                    </div>
                    <video class="indexBannerBg" autoplay muted loop>
                        <source src="../../assets/noticeIntroduceVideo1.mp4" type="video/mp4">
                    </video>
                </div>
            </div>
            <div class="contentItemOutside">
                <div class="contentItem">
                    <img src="../../assets/moticeIntroContent1.png" alt="">
                    <div class="contentTxt">
                        <i class="iconfont iconjihua1"></i>
                        <div class="contentTxtTitle">有它再行动</div>
                        <div class="contentTxtDesc">
                            计划制定后进行发布<br/>
                            剧组人员将提前看到拍摄计划<br/>
                            让拍摄任务不再繁杂，显而易见
                        </div>
                    </div>
                </div>
            </div>
            <div class="contentItemOutside bg">
                <div class="contentItem">
                    <div class="contentTxt">
                        <i class="iconfont iconbushu"></i>
                        <div class="contentTxtTitle">部门任务单独部署</div>
                        <div class="contentTxtDesc">
                            可将任务开始的时间细化到部门<br/>
                            独立查看所属部门的当日拍摄计划<br/>
                            包括部门出发时间及联系电话,有<br/>
                            它你还担心什么呢?
                        </div>
                    </div>
                    <img src="../../assets/moticeIntroContent2.png" alt="">
                </div>
            </div>
            <div class="contentItemOutside">
                <div class="contentItem">
                    <video class="indexBannerBg" autoplay muted loop>
                        <source src="../../assets/noticeIntroduceVideo2.mp4" type="video/mp4">
                    </video>
                    <div class="contentTxt">
                        <i class="iconfont iconchayue"></i>
                        <div class="contentTxtTitle">一键发布，可全员查看</div>
                        <div class="contentTxtDesc">
                            PC端制定好当日拍摄计划后<br/>
                            进行一键发布<br/>
                            剧组所有成员将收到指定日期拍摄计划
                        </div>
                        <div class="contentTxtDesc">
                            漏发通告？存在错版？拍摄计划无法正常开展？<br/>
                            现在开始，你所看到的通告单都是最新的
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="bottomBox">
            <div class="bottomTitle">配合统筹系统使用，它更加便捷</div>
            <div class="bottomDesc">
                通告统筹系统对剧本的拆解与分析，可在通告单中直接选取需要的场景内容与场次<br/>
                快速添加当日的拍摄任务。简单操作，通告单即刻呈现
            </div>
            <img src="../../assets/noticeIntroduceBottomBg.png" alt="">
        </div>
        <fm-footer />
    </div>
</template>

<script>
    import fmFooter from "../../common/fmFooter";
    import indexTop from "../../common/indexTop";
    export default {
        name: "noticeIntroduce",
        components: {fmFooter, indexTop},
        metaInfo: {
            title: '【通告单】如何快速制作通告单', // set a title
            meta: [{                 // set meta
                name: 'keyWords',
                content: '标准化影视通告单模板（call sheet），适合于电影，电视剧项目使用，详细记录每日拍摄任务，可以导出PDF版纸质通告单，可将电子通告单发布至微信小程序进行查看。'
            }]
        },
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
    #noticeIntroduce .topBox{
        position: relative;
    }

    #noticeIntroduce .topBox>img{
        width: 100vw;
    }

    #noticeIntroduce .topBox .TxtBox{
        width: 340px;
        position: absolute;
        top: 30%;
        left: 20%;
        z-index: 2;
    }

    #noticeIntroduce .topBox .TxtBox .title{
        font-size:30px;
        line-height: 30px;
        font-family:SimSun;
        color:rgba(255,255,255,1);
        margin: 32% 0 10%;
        font-weight: bold;
    }

    #noticeIntroduce .topBox .TxtBox .desc{
        font-size:18px;
        color:rgba(255,255,255,0.8);
        line-height:34px;
    }

    #noticeIntroduce .topBox .TxtBox .btn{
        width:140px;
        height:34px;
        background:#fff;
        border-radius:26px;
        line-height: 34px;
        font-size:16px;
        color:#ED9515;
        margin-top: 16%;
        font-weight: bold;
        cursor: pointer;
        text-align: center;
    }

    #noticeIntroduce .topBox .startBtn{
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

    #noticeIntroduce .topBox .startBtn i{
        font-size: 40px;
        color: rgba(109,113,213,1);
        line-height: 82px;
        margin-left: 8px;
    }

    /*总结介绍*/
    #noticeIntroduce .summaryBox{
        display: flex;
        align-items: center;
        width: 1132px;
        margin: 200px auto 152px;
        justify-content: space-between;
    }

    #noticeIntroduce .summaryBox .summaryItem{
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    #noticeIntroduce .summaryBox .summaryItem .summaryIconBox{
        width:80px;
        height:80px;
        background:rgba(50,197,143,1);
        border-radius:50%;
        text-align: center;
    }

    #noticeIntroduce .summaryBox .summaryItem:nth-of-type(2) .summaryIconBox{
        background:rgba(237,149,21,1);
    }

    #noticeIntroduce .summaryBox .summaryItem:nth-of-type(3) .summaryIconBox{
        background:rgba(57,190,232,1);
    }

    #noticeIntroduce .summaryBox .summaryItem:nth-of-type(4) .summaryIconBox{
        background:rgba(240,80,80,1);
    }

    #noticeIntroduce .summaryBox .summaryItem:nth-of-type(5) .summaryIconBox{
        background:rgba(108,111,191,1);
    }

    #noticeIntroduce .summaryBox .summaryItem .summaryIconBox i{
        font-size: 40px;
        color: #fff;
        line-height: 80px;
    }

    #noticeIntroduce .summaryBox .summaryItem .summaryTitle{
        font-size:18px;
        font-weight:bold;
        color:rgba(57,63,81,1);
        margin: 40px 0 26px;
        line-height: 18px;
    }

    #noticeIntroduce .summaryBox .summaryItem .summaryDesc{
        font-size:12px;
        line-height: 18px;
        color:rgba(57,63,81,0.8);
        text-align: center;
    }

    #noticeIntroduce .hr{
        position: absolute;
        width: 100vw;
        height: 1px;
        background:rgba(0,0,0,0.04);
    }

    /*主要功能*/
    #noticeIntroduce .contentBox{
        text-align: center;
        padding-top: 226px;
    }

    #noticeIntroduce .contentBox .mainTitle{
        font-size:28px;
        font-family:SimSun;
        font-weight:bold;
        position: relative;
        margin-bottom: 34px;
    }

    #noticeIntroduce .contentBox .mainTitle:after{
        content: '';
        position: absolute;
        bottom: -6px;
        right: 40%;
        background:rgba(50,197,143,0.2);
        width:200px;
        height:25px;
    }

    #noticeIntroduce .contentBox .desc{
        font-size:18px;
        color:rgba(0,0,0,0.8);
        line-height: 18px;
        margin-bottom: 38px;
        letter-spacing: 2px;
    }

    #noticeIntroduce .contentItemOutside{
        width: 100%;
        margin-bottom: 200px;
    }

    #noticeIntroduce .contentItem{
        width: 1132px;
        height: 528px;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    #noticeIntroduce .contentItem .contentTxt{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin-top: 6px;
    }

    #noticeIntroduce .contentItem .contentTxt>i{
        font-size: 44px;
        color: #6C6FBF;
        line-height: 44px;
        margin-bottom: 30px;
    }

    #noticeIntroduce .contentItem .contentTxt .contentTxtTitle{
        font-size:26px;
        font-weight:bold;
        color:rgba(57,63,81,1);
        line-height: 30px;
        margin-bottom: 40px;
        text-align: left;
    }

    #noticeIntroduce .contentItem .contentTxt .contentTxtDesc{
        font-size:16px;
        text-align: left;
        line-height: 30px;
        /*color:rgba(0,0,0,0.8);*/
        color:rgba(0,0,0,0.8);
    }

    #noticeIntroduce .contentItem .indexBannerBg{
        width: 700px;
    }

    #noticeIntroduce .contentItemOutside:nth-of-type(4) .contentItem>img{
        margin-left: -20px;
    }

    #noticeIntroduce .contentItemOutside:nth-last-of-type(2) .contentItem>img{
        margin-left: -86px;
    }

    /*底部*/
    #noticeIntroduce .bottomBox{
        height: 860px;
        width: 1132px;
        margin: 260px auto 0;
    }

    #noticeIntroduce .bottomBox .bottomTitle{
        font-size:26px;
        line-height: 26px;
        margin: 0 0 34px;
        text-align: center;
        font-weight: bold;
        color:rgba(57,63,81,1);
    }

    #noticeIntroduce .bottomBox .bottomDesc{
        font-size:14px;
        color:rgba(0,0,0,0.8);
        line-height:24px;
        text-align: center;
    }

    #noticeIntroduce .bottomBox img{
        width: 1200px;
        margin: 60px 0 0 6px;
    }

    @media screen and (max-width: 1400px){
        /*页面顶部*/
        #noticeIntroduce .topBox .TxtBox{
            left: 18%;
        }

        #noticeIntroduce .topBox .TxtBox .title{
            margin-top: 20%;
        }

        #noticeIntroduce .topBox .TxtBox .btn{
            margin-top: 10%;
        }

    }


</style>
