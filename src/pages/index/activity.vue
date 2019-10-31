<template>
    <div>
      <index-top :register="registerBtn" @register1="registerData"></index-top>
      <div class="activity_main">
        <img src="../../assets/activeBakg.png" alt="" class="activityBg">
        <div class="activity_title">
          <div class="titleBox">
            <span class="titleFree">免费领取</span>
            <span class="titleFreeEN"> FREE  TO  GET  IT</span>
          </div>
          <div class="titleT">
            <img src="../../assets/activeTitle.png">
          </div>
          <div class="titleBotm">关注电影更关注你</div>
        </div>
        <div class="activity_des">
          <div class="desTitle">
            <span class="orangeRed"></span>
            <span class="orange"></span>
            活动介绍
            <span class="orange"></span>
            <span class="orangeRed"></span>
          </div>
          <ul class="activity_desLeft">
            <li>
              <span>活动时间：2019年04月10日-2020年04月9日</span>
            </li>
            <li>
              <span>给你一个剧本，你该如何拍摄呢？拍摄计划杂乱无章？
                <br>统筹表、通告单不知道如何写？
                <br>场记单格式又是如何更合理？
              </span>
            </li>
            <li>
              <span>作为一个剧组新人十分头大？
                <br>作为一个剧组老油条也为之烦恼？
              </span>
            </li>
            <li>
              <span>别担心！
                <br>4月，我们将送出制片表格模板
                <br>非幕制片，永远为电影人保驾护航~
              </span>
            </li>
          </ul>
          <img src="../../assets/activity_des.png" alt="">
        </div>
        <div class="chain">
          <img src="../../assets/activeBackg.png" class="imgLeft">
          <img src="../../assets/activeBackg.png" class="imgRight">
        </div>
        <div class="activity_state">
          <div class="activity_stateTitle">
            <span class="orangeRed"></span>
            <span class="orange"></span>
            特此声明
            <span class="orange"></span>
            <span class="orangeRed"></span>
          </div>
          <div class="activity_stateMain">
            <div class="activity_stateMain_back"></div>
            <p>1.本站收集的部分资料来源于互联网，仅做参考使用</p>
            <p>2.禁止转载和出售本站相关资料作为商业用途</p>
            <p>3.本资料基于通常情况下的行业范本，不能视为非幕制片的指导意见</p>
          </div>
        </div>
          <div class="activity_details">
            <div class="detailsBottm">
              <p>参与方式</p>
              <div class="bottmBack"></div>
            </div>
              <span>扫描下方二维码,关注“非幕制片”官方公众号</span>
              <span>在公众号中回复“制片表格”即可获得活动内容 </span>
          </div>
        <img src="../../assets/erweima.png" alt="" class="activity_scan">
      </div>
      <fm-footer></fm-footer>
    </div>
</template>

<script>
    import fmFooter from "../../common/fmFooter";
    import indexTop from "../../common/indexTop";
    export default {
        name: "activity",
        components: { indexTop,fmFooter},
        data(){
            return{
                registerBtn :false
            }
        },
        methods:{
            registerData(data){
                if(data == false){
                    this.registerBtn = false
                }
            },
        }
    }
</script>

<style scoped>
    *{
        box-sizing: border-box;
        font-family: Microsoft Yahei, 微软雅黑;
        color: #333;
    }
    .activity_main{
        width: 100%;
        height: fit-content;
        padding-top: 100px;
        position: relative;
        /* background-color: #ED9515; */
        box-sizing: border-box;
        overflow: hidden;
    }

    .activity_main .activityBg{
      position: fixed;
      top: 0;
      z-index: -1;
      width: 100vw;
    }

    .activity_main .activity_title{
      width: 1132px;
      margin: auto;
      line-height: 60px;
      font-size: 24px;
      text-align: center;
      margin-bottom: 60px;
    }

    .activity_main .activity_title .titleBox{
      margin-bottom: 26px;
      margin-left: 126px;
      width: fit-content;
    }

    .activity_main .activity_title .titleBox .titleFree{
      width:154px;
      height:52px;
      background: #ffffff;
      border-radius:6px 0px 6px 0px;
      font-size:29px;
      font-family:MicrosoftYaHei;
      font-weight:bold;
      color:rgba(233,108,89,1);
    }

    .activity_main .activity_title .titleBox .titleFreeEN{
      width:294px;
      height:29px;
      font-size:35px;
      font-family:MicrosoftYaHei;
      font-weight:bold;
      color:#ffffff;
    }

    .activity_main .activity_title .titleT{
      margin-bottom: 78px;
    }

    .activity_main .activity_title .titleBotm{
      font-size:50px;
      font-family:MicrosoftYaHei;
      font-weight:bold;
      color: #ffffff;
      text-align: center;
    }

    .activity_main  .activity_des{
      width:1132px;
      height:665px;
      background:rgba(255,255,255,1);
      border-radius:10px;
        margin: 0 auto 30px;
        padding: 58px 72px 60px 80px;
    }

    .activity_main  .activity_des .desTitle{
      height:33px;
      font-size:32px;
      font-family:MicrosoftYaHei;
      font-weight:bold;
      color:rgba(0,0,0,1);
      text-align: center;
      margin-bottom: 88px;
    }

    .activity_main  .orangeRed{
      display: inline-block;
      width:10px;
      height:10px;
      background:rgba(255,88,51,1);
      border-radius:50%;
      margin-bottom: 4px;
    }

    .activity_main  .orange{
      display: inline-block;
      width:16px;
      height:16px;
      background:rgba(237,149,21,1);
      opacity:0.6;
      border-radius:50%;
      margin-bottom: 1px;
    }

    .activity_main  .orange:nth-child(2){
      margin-right: 26px;
      margin-left: 22px;
    }

    .activity_main  .orange:nth-child(3){
      margin-right: 22px;
      margin-left: 26px;
    }

    .activity_main  .activity_des .activity_desLeft{
      font-size: 18px;
        float: left;
    }
    .activity_main  .activity_des .activity_desLeft li{
        list-style-type: disc;
        color: #f6ae45;
        margin-bottom: 40px;
    }
    .activity_main  .activity_des .activity_desLeft li:last-child{
        margin-bottom: 0;
    }
    .activity_main  .activity_des .activity_desLeft li span{
        font-size: 18px;
        line-height: 28px;
    }
    .activity_main  .activity_des img{
        float: right;
    }
    .activity_main  .activity_state{
      width:1132px;
      height:100%;
      background:rgba(255,255,255,1);
      border-radius:10px;
      margin: 0 auto 60px;
      background: #fff;
    }
    .activity_main  .activity_state .activity_stateTitle{
        width: 100%;
        border-bottom: none;
        line-height: 60px;
      text-align: center;
      font-size:32px;
      font-family:MicrosoftYaHei;
      font-weight:bold;
      color:rgba(0,0,0,1);
      padding-top: 50px;
    }
    .activity_main  .activity_state .activity_stateMain{
      box-shadow: 1px 2px 6px 5px rgba(0,0,0,.04);
      width: 952px;
      height:180px;
      margin: 46px 90px 46px;
      border-radius:6px;
    }

    .activity_main  .activity_state  .activity_stateMain .activity_stateMain_back{
      box-shadow: 1px 2px 6px 5px rgba(0,0,0,.04);
      width: 952px;
      height:180px;
      background:rgba(240,125,103,1);
      opacity:0.2;
      border-radius:6px;
    }

    .activity_main  .activity_state  .activity_stateMain p{
      margin-bottom: 16px;
      font-size:14px;
      font-family:MicrosoftYaHei;
      font-weight:400;
      color:rgba(51,51,51,1);
      text-align: left;
      padding:0px 0px 0px 260px;
    }

    .activity_main  .activity_state  .activity_stateMain p:nth-child(2){
      display: block;
      margin-top: -134px

    }

    .activity_main  .activity_state .activity_stateMain p:first-child {
      padding-top: 50px;
    }

    .activity_main .chain{
      width:1132px;
      position: absolute;
      left: 50%;
      margin: -80px 0 0 -566px ;
    }

    .activity_main .chain .imgLeft{
      float: left;
      margin-left: 120px;
    }

    .activity_main .chain .imgRight {
      float: right;
      margin-right: 120px;
    }

    .activity_main  .activity_details{
        width: 1200px;
        margin: 0 auto 18px;
    }

    .activity_main  .activity_details .detailsBottm{
      width:561px;
      height:59px;
      margin: 0 auto;
    }

    .activity_main  .activity_details .detailsBottm p{
      font-size:32px;
      font-family:MicrosoftYaHei;
      font-weight:400;
      color: #000000;
      line-height:18px;
      text-align: center;
      z-index: 10;
      position: relative;
    }

    .activity_main  .activity_details .detailsBottm .bottmBack{
      width:561px;
      height:59px;
      opacity:0.6;
      background: linear-gradient(to right, #E86F5D, white, #E86F5D);
      margin-top: -36px;
      z-index: 1;
      position: absolute;
    }

    .activity_main  .activity_details img{
        margin: 0 auto 18px;
        display: block;
    }

    .activity_main  .activity_details span{
      display: block;
      text-align: center;
      font-size:22px;
      font-family:NSimSun;
      font-weight:400;
      color:rgba(255,255,255,1);
    }

    .activity_main  .activity_details span:last-child {
      margin-bottom: 60px;
    }

    .activity_main  .activity_scan{
      width:220px;
      height:220px;
      display: block;
      margin: 0 auto;
      margin-bottom: 242px;
    }

</style>
