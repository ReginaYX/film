<template>
  <el-row>
    <index-top :register="registerBtn" @register1="registerData"></index-top>
    <div class="indexBannerBox">
        <video class="indexBannerBg" autoplay muted loop>
            <source src="../assets/indexVideo.mp4" type="video/mp4">
        </video>
        <div class="mask"></div>
        <p class="indexTitle">非幕制片</p>
        <p class="indexTitle">AI 开启影视新纪元</p>
        <div class="indexBtn" @click="list">开始使用</div>
        <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">&nbsp</el-col>
        <el-col :xs="16" :sm="16" :md="16" :lg="16" :xl="16" class="indexBanner">
          <el-carousel height="382px" class="indexBanner_Carousel">
            <el-carousel-item>
              <img src="../assets/indexbanner2.jpg" alt="" class="indexBannerImg">
            </el-carousel-item>
            <el-carousel-item>
              <img src="../assets/indexbanner3.jpg" alt="" class="indexBannerImg">
            </el-carousel-item>
            <el-carousel-item>
              <img src="../assets/indexbanner4.jpg" alt="" class="indexBannerImg">
            </el-carousel-item>
            <el-carousel-item>
              <router-link class="activityBanner" to="/activity">
                <img src="../assets/indexbanner1.jpg" alt="" class="indexBannerImg">
              </router-link>
            </el-carousel-item>
            <el-carousel-item>
              <router-link class="activityBanner" to="/control/reward">
                <img src="../assets/indexbanner5.png" alt="" class="indexBannerImg">
              </router-link>
            </el-carousel-item>
          </el-carousel>
        </el-col>
        <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">&nbsp</el-col>
    </div>
    <div class="indexContent">
      <li class="indexContentBox">
        <div class="indexContentTitle">数字化影视制作<br/>为影视行业解决实际难题</div>
        <div class="indexContentListBox">
          <div class="indexContentList">
            <i class="iconfont iconzhineng"></i><span>智能统筹</span>
          </div>
          <div class="indexContentList">
            <i class="iconfont iconxiezuo"></i><span>多人协作</span>
          </div>
          <div class="indexContentList">
            <i class="iconfont iconfuhuadao"></i><span>服化道管理</span>
          </div>
          <div class="indexContentList">
            <i class="iconfont iconGRP_FI_RP"></i><span>电子通告</span>
          </div>
          <div class="indexContentList">
            <i class="iconfont iconlock"></i><span>HTTPS加密</span>
          </div>
          <div class="indexContentList">
            <i class="iconfont iconxiazai"></i><span>通告单下载</span>
          </div>
          <div class="indexContentList">
            <i class="iconfont iconanquanbaozhang"></i><span>多重安全保障</span>
          </div>
          <div class="indexContentList">
            <i class="iconfont iconxiezuokongjian"></i><span>专属协作空间</span>
          </div>
          <div class="indexContentList">
            <i class="iconfont iconyichayue"></i><span>信息多人查阅</span>
          </div>
          <div class="indexContentList">
            <i class="iconfont icontj"></i><span>人物戏量统计</span>
          </div>
          <div class="indexContentList">
            <i class="iconfont iconpaisedi-"></i><span>拍摄地管理</span>
          </div>
          <div class="indexContentList">
            <i class="iconfont iconshibiezhong"></i><span>道具信息识别</span>
          </div>
        </div>
      </li>
      <li class="indexContentBox indexContentFirstBox">
        <img src="../assets/indexContentFirstBg.png" alt="">
        <div class="indexContentFirst">
          <div class="indexContentTitle">非幕制片<br/>为影视创作团队提供技术支撑</div>
          <div class="indexContentDesc">非幕制片又能为剧组带来哪些改变呢？</div>
        </div>
      </li>
      <li class="indexContentBox indexContenMain">
        <div class="indexMainBox">
          <div class="indexMainTitle">智能统筹系统</div>
          <el-carousel indicator-position="none" arrow="always" class="indexMainCarousel" :autoplay="false" height="550px">
            <el-carousel-item v-for="item,index in 3" :key="index" class="indexMainImg">
              <div class="indexMainDesc" v-if="index==0">统筹表一键生成，剧本智能拆解<br/><span>一键生成，为您节省工作时间，减轻工作强度</span></div>
              <div class="indexMainDesc" v-if="index==1">
                戏量快速统计，一键统计人物戏量统计表及分场景表<br/>帮您快速评估项目周期及成本制定详细的拍摄计划
              </div>
              <div class="indexMainDesc margin" v-if="index==2">
                支持二次编辑，拆解过程透明可控<br/>场景信息急速查核，表格内容精炼准确，修改内容一键更新
              </div>
              <img src="../assets/indexContentCarousel1.gif" alt="" v-if="index==0">
              <img src="../assets/indexContentCarousel2.gif" alt="" v-if="index==1">
              <img src="../assets/indexContentCarousel3.gif" alt="" v-if="index==2">
            </el-carousel-item>
          </el-carousel>
        </div>
        <div class="indexMainBox">
          <div class="indexMainTitle">电子通告单</div>
          <div class="indexMainDesc">影视数据化时代到来，告别纸质通告单。在线制定拍摄计划，全员查收通告单<br>
            实时同步数据，移动查阅当日任务。用最短的时间进行通知，用最快的效率进行拍摄 </div>
          <video class="indexMainImg" autoplay muted loop style="width: 800px">
            <source src="../assets/indexContentVideo.mp4" type="video/mp4">
          </video>
        </div>
        <div class="indexMainBox">
          <div class="indexMainTitle">高效服化道管理</div>
          <div class="indexMainDesc">
            拍摄地实时记录，方便组员查看拍摄地详细信息。角色演员服装预设<br/>
            高效制定演员服装要求。根据剧本默认的场景信息,可快速设定置景信息。演员定妆照实时查看<br/>
            实际拍摄更加方便演员信息快速录入快速制定演员服装。道具信息及时查看，拍摄计划有序进行<br/>
          </div>
          <img src="../assets/indexContent1.png" alt="">
        </div>
      </li>
      <li class="indexContentBox indexContentNth">
        <div class="indexContentInside">
          <div>
            <div class="indexContentSymbol">“</div>
            <div class="indexContentTitle">多重保障<br/>从源头开始保护数据安全</div>
            <div class="indexContentDesc">采用HTTPS加密，数据安全有保障。云端数据加密，信息独立安全无忧</div>
          </div>
          <img src="../assets/indexContent4.png" alt="">
        </div>
      </li>
      <li class="indexContentBox">
        <div class="indexContentTitle">团队无缝对接<br/>开启高效沟通模式</div>
        <div class="indexContentDesc">
          工作繁杂沟通不畅？拍摄计划无法如期进行？<br/>要知道，团结和协作是工作的前提和基础。非幕制片所有功能均支持多人协作及查看<br/>
          将团队人员高度统一各个部门与环节任务同步进行，实现剧组无缝对接，大幅提升工作效率
        </div>
        <img src="../assets/indexContent3.png" alt="">
      </li>
      <div class="indexBottom">
        <img src="../assets/indexBottom.png" alt="" class="indexBottomBg">
        <div class="indexBottomBox">
          <p>以更高效的方式开始您的影视创作历程</p>
          <p>支持多种格式剧本识别，你还在等什么？</p>
          <div class="indexBottomBtn" @click="list">开始创建</div>
        </div>
      </div>
    </div>
    <footer>
      <div :class="['enter',fixed?'fixed':'']" @click="control" @mouseenter="show=true" @mouseleave="show=false"><img src="../assets/enter.png" alt=""></div>
      <div :class="['enterToast',fixed?'fixed':'',show?'show':'']">点击进入<br>制片系统</div>
      <div :class="['returnTop',fixed?'fixed':'']" v-show="scroll"><img src="../assets/returnTop.png" alt="" @click="returnTop"></div>
      <fm-footer></fm-footer>
    </footer>
  </el-row>
</template>

<script>
    import indexTop from "../common/indexTop";
    import fmFooter from "../common/fmFooter";
    import axios from "axios"
    import animate from 'animate.css'
    export default {
        name: "index",
        components: {indexTop,fmFooter},
        data (){
            return{
                returnA:false,
                fixed : false,
                show : false,
                scroll : false,
                registerBtn :false
            }
        },
        methods:{
            //footer的
            list(){
                if(localStorage.user_id){
                    this.$router.push('/control')
                }else{
                    this.$message('请先登录');
                    this.$router.push('/login')
                }
            },
            registerData(data){
                if(data == false){
                    this.registerBtn = false
                }
            },
            control () {
                if(localStorage.user_id){
                    if (new Date().getTime() - window.localStorage.getItem('createAt') > 60 * 60 * 12 * 1000){
                        this.login=true
                        localStorage.removeItem('user_id')
                        localStorage.removeItem('createAt')
                    };
                    this.$router.push('/control')
                }else{
                    this.registerBtn = true
                }
            },
            returnTop(){
                var goTop=setInterval(scrollMove,10);
                function scrollMove(){
                    setScrollTop(getScrollTop()/1.1);
                    if(getScrollTop()<1)clearInterval(goTop);
                }
                function getScrollTop(){
                    return document.documentElement.scrollTop;
                }
                function setScrollTop(value){
                    document.documentElement.scrollTop=value;
                }
            },
            handleScroll () {
                var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
                var scrollBottom=document.documentElement.scrollHeight-document.documentElement.scrollTop-document.documentElement.clientHeight;
                if(scrollTop > 300){

                }
                if(scrollTop > 750){

                }
                if(scrollTop > 1200){

                }
                if(scrollBottom < 350){
                    this.fixed = true
                    if(scrollBottom >= 350){
                        this.fixed = false
                    }
                } else if(scrollBottom >= 350){
                    this.fixed = false
                    if(scrollBottom < 350){
                        this.fixed = true
                    }
                }

                if(scrollTop >= 300){
                    this.scroll = true
                }else{
                    this.scroll = false
                }
            }
        },
        mounted(){
            window.addEventListener('scroll', this.handleScroll)
            let form = new FormData();
            form.append('page','home');
            this.$axios({
                method: 'post',
                url: '/pageview/record',
                data: form,
                headers:{
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'Accept':'*/*'
                }
            })
        },
        updated(){
            window.addEventListener('scroll', this.handleScroll)
        },

        beforeRouteLeave (to, from, next){
            window.removeEventListener('scroll', this.handleScroll)
            next()
        },
        destroyed () {
            window.removeEventListener('scroll', this.handleScroll)
        },
    }
</script>

<style scoped>
    *{
        text-decoration: none;
        list-style: none;
        box-sizing: border-box;
        font-family: Microsoft Yahei, 微软雅黑;
    }
    .indexBannerBox{
        position: relative;
        height: 600px;
    }
    .indexBannerBox .indexBannerBg{
        position: fixed;
        width: 100vw;
        z-index: -1;
        top: 0;
      transition: all .8s;
    }

    .indexBannerBox .mask{
      position: fixed;
      width: 100vw;
      height: 100%;
      z-index: -1;
      top: 0;
      transition: all .8s;
      background: rgba(0,0,0,.2);
    }

    .indexBannerBox .indexTitle{
        font-size: 40px;
        text-align: center;
        line-height: 40px;
        letter-spacing: 10px;
        margin: 0 auto;
        font-family:NSimSun;
        font-weight:bold;
        color:rgba(255,255,255,1);
    }
    .indexBannerBox .indexTitle:first-of-type{
        margin-top: 280px;
        margin-bottom: 40px;
        font-size:50px;
        font-family:NSimSun;
        font-weight:bold;
        color:rgba(255,255,255,1);
      letter-spacing: 2px;
    }
    .indexBannerBox .indexBtn{
        width: 240px;
        height: 42px;
        margin: 68px auto 86px;
        border-radius: 50px;
        text-align: center;
        line-height: 42px;
        font-size: 14px;
        color: #fff;
        background: #ED9515;
        cursor: pointer;
    }
    .indexBannerBox .indexBanner{
        height: 360px;
        width: 1132px;
        border-radius: 2px;
        overflow: hidden;
        position: absolute;
        top: 306px;
        left: 0;
        right: 0;
        margin: 0 auto;
    }

    .indexBannerBox .indexBanner .indexBanner_Carousel{
        height: 100%;
        width: 100%;
        border-radius: 2px;
        overflow: hidden;
    }

    .indexBannerBox .indexBanner .indexBannerImg{
        /*height: 100%;*/
        width: 100%;
    }

    .indexContent{
        width: 100vw;
        height: auto;
        background: #fff;
        padding-top: 90px;
        overflow: hidden;
    }
    .indexContent li{
        width: 1132px;
        margin: 160px auto 0;
    }

    .indexContent li:nth-last-of-type(2){
      margin-top: 140px;
    }
    @keyframes fade {
        from { opacity: 1.0; }
        50% { opacity: 0.1; }
        to { opacity: 1.0; }
    }

    .indexContent li.indexContentFirstBox{
      width: 100vw;
      position: relative;
      margin: 102px auto 0;
    }

    .indexContent li.indexContentFirstBox .indexContentFirst{
      position: absolute;
      top: 48px;
      left: 0;
      right: 0;
      margin: 0 auto;
    }

    .indexContent li.indexContentFirstBox .indexContentFirst .indexContentTitle{
      color: #fff;
      font-size: 40px;
      line-height: 60px;
      width: 660px;
      margin: 0 auto;
    }

    .indexContent li.indexContentFirstBox .indexContentFirst .indexContentTitle:before{
      content: '”';
      left: initial;
      top: 44px;
      right: 84px;
      opacity: 0.36;
    }

    .indexContent li.indexContentFirstBox .indexContentFirst .indexContentDesc{
      color: #fff;
      margin-top: 36px;
    }

    .indexContent li .indexContentTitle{
      font-size:30px;
      font-family:NSimSun;
      font-weight:bold;
      color:rgba(57,63,81,1);
      text-align: center;
      line-height: 40px;
      margin-top: -10px;
      position: relative;
    }

    .indexContent li .indexContentTitle:before{
      content: '“';
      font-size:100px;
      line-height: 100px;
      font-family:SimHei;
      font-weight:bold;
      color:rgba(237,149,21,1);
      opacity:0.2;
      position: absolute;
      top: -18px;
      left: 382px;
    }

    .indexContent li .indexContentListBox{
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      justify-content: space-between;
      padding-bottom: 138px;
    }

    .indexContent li .indexContentListBox .indexContentList{
      width: 202px;
      flex-shrink: 0;
      /*padding: 0 60px;*/
      /*margin-top: 100px;*/
      margin: 100px auto 0;
      display: flex;
      flex-direction: column;
      /*align-items: center;*/
      position: relative;
    }

    .indexContent li .indexContentListBox .indexContentList:first-of-type,
    .indexContent li .indexContentListBox .indexContentList:nth-of-type(6n),
    .indexContent li .indexContentListBox .indexContentList:nth-of-type(7){
      width: 142px;
      padding-right: 56px;
    }

    .indexContent li .indexContentListBox .indexContentList:nth-of-type(6n){
      padding-left: 58px;
      padding-right: 0;
    }

    .indexContent li .indexContentListBox .indexContentList:after{
      content: '';
      width: 1px;
      height: 40px;
      background: rgba(57,63,81,0.3);
      position: absolute;
      top: 26px;
      right: -4px;
    }

    .indexContent li .indexContentListBox .indexContentList:nth-of-type(6n):after{
      width: 0;
    }

    .indexContent li .indexContentListBox .indexContentList i{
      background-image:-webkit-linear-gradient(160deg,rgba(108,111,191,1),rgba(237,149,21,1));
      -webkit-background-clip:text;
      -webkit-text-fill-color:transparent;
      font-size: 44px;
      /*margin-bottom: 18px;*/
      transition: all 0.6s;
      margin: 0 auto 18px;
    }

    .indexContent li .indexContentListBox .indexContentList span{
      font-size:14px;
      color:rgba(57,63,81,1);
      line-height: 14px;
      transition: all 0.6s;
      width: 100%;
      text-align: center;
    }

    .indexContent li .indexContentListBox .indexContentList:hover i{
      transform: scale(1.3) translateY(-12px);
      -ms-transform:scale(1.3) translateY(-12px);     /* IE 9 */
      -moz-transform:scale(1.3) translateY(-12px);     /* Firefox */
      -webkit-transform:scale(1.3) translateY(-12px); /* Safari 和 Chrome */
      -o-transform:scale(1.3) translateY(-12px);
    }

    .indexContent li .indexContentListBox .indexContentList:hover span{
      transform: scale(1.1) translateY(-15px);
      -ms-transform:scale(1.1) translateY(-15px);     /* IE 9 */
      -moz-transform:scale(1.1) translateY(-15px);     /* Firefox */
      -webkit-transform:scale(1.1) translateY(-15px); /* Safari 和 Chrome */
      -o-transform:scale(1.1) translateY(-15px);
    }

    .indexContent li .indexContentDesc{
      font-size:14px;
      color:rgba(116,120,133,1);
      line-height: 30px;
      text-align: center;
      margin-top: 24px;
    }

    .indexContent li.indexContenMain{
      width: 100vw;
    }

    .indexContent li .indexMainBox{
      margin-bottom: 144px;
      position: relative;
      z-index: 2;
    }

    .indexContent li .indexMainBox:first-child{
      margin-bottom: 260px;
    }

    .indexContent li .indexMainBox:nth-of-type(2):before{
      content: '';
      position: absolute;
      top: -74px;
      left: 0;
      width: 100vw;
      height:754px;
      background:rgba(247,247,248,1);
      z-index: -2;
    }

    .indexContent li .indexMainBox .indexMainTitle{
      font-size:26px;
      line-height: 26px;
      color:rgba(57,63,81,1);
      text-align: center;
    }

    .indexContent li .indexMainBox .indexMainDesc{
      font-size:16px;
      line-height: 30px;
      color:rgba(116,120,133,1);
      text-align: center;
      margin: 36px 0 20px;
    }

    .indexContent li .indexMainBox .indexMainDesc.margin{
      margin-bottom: 40px;
    }

    .indexContent li .indexMainBox .indexMainDesc span{
      font-size:16px;
      line-height: 20px;
      color:#F45258;
    }

    .indexContent li .indexMainBox .indexMainImg>img{
      width: 900px;
      margin: 0 auto;
      display: block;
    }

    .indexContent li .indexMainBox .indexMainCarousel{
      width: 1132px;
      margin: 0 auto;
    }

    .indexContent li .indexMainVideo{
      width: 1000px;
      right: 0;
      margin: 0 auto;
    }

    .indexContent li .indexMainImg{
      width: 1000px;
      right: 0;
      margin: 0 auto;
      display: block;
    }

    .indexContent li .indexMainBox>img{
      width: 1000px;
      margin: 0 auto;
      display: block;
    }

    .indexContent li .indexMainBox:nth-of-type(3)>img{
      margin: 20px auto 0;
      width: 850px;
    }

    .indexContent li.indexContentBox.indexContentNth{
      width: 100vw;
      height: 520px;
      background-image: url("../assets/indexContent4Bg.png");
      background-repeat: no-repeat;
    }

    .indexContent li.indexContentBox.indexContentNth .indexContentInside{
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 1000px;
      height: 100%;
      margin: 0 auto;
    }

    .indexContent li.indexContentBox.indexContentNth .indexContentSymbol{
      font-family:SimHei;
      font-weight:bold;
      color:rgba(237,149,21,0.6);
      font-size:100px;
      line-height: 50px;
      margin-left: -50px;
    }

    .indexContent li.indexContentBox.indexContentNth .indexContentTitle{
      color: #fff;
      text-align: left;
    }

    .indexContent li.indexContentBox.indexContentNth .indexContentTitle:before{
      content: '';
    }

    .indexContent li.indexContentBox.indexContentNth .indexContentDesc{
      text-align: left;
      color: #fff;
      margin-top: 30px;
    }

    .indexContent li.indexContentBox:nth-last-of-type(1) .indexContentTitle:before{
      left: initial;
      right: 396px;
      top: -16px;
      content: '”';
    }

    .indexContent li.indexContentBox:nth-last-of-type(1)>img{
      width: 1132px;
      margin: -85px auto 0;
      display: block;
    }


    .indexBottom{
        width: 100vw;
      /*height: 552px;*/
        position: relative;
      overflow: hidden;

     /*margin-top: 100px;*/
    }

    .indexBottom>img{
      margin: 150px auto;
      display: block;
    }

    .indexBottom .indexBottomBox{
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        text-align: center;
        vertical-align:middle;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .indexBottom .indexBottomBox p{
      font-size:30px;
      line-height: 30px;
      font-family:NSimSun;
      font-weight:bold;
      color:rgba(57,63,81,1);
        margin-bottom: 40px;
    }
    .indexBottom .indexBottomBox p:nth-of-type(2){
      font-size:20px;
      line-height: 20px;
      color:rgba(57,63,81,1);
    }

    .indexBottom .indexBottomBox .indexBottomBtn{
      width:240px;
      height:42px;
      background:rgba(237,149,21,1);
      border-radius:20px;
        color: #fff;
        font-size: 14px;
        line-height: 42px;
        text-align: center;
        margin: 44px auto 0;
        cursor: pointer;
    }
    footer{
        position: relative;
    }
    footer .enter,footer .returnTop{
        width: 60px;
        height: 60px;
        background: #f6ae45;
        position: fixed;
        top: 83%;
        right: 2.7%;
        text-align: center;
        line-height: 60px;
        cursor: pointer;
        z-index: 10;
    }
    footer .enter img,footer .returnTop img{
        vertical-align: middle;
    }
    footer .returnTop{
        margin-top: 66px;
    }
    footer .enter.fixed,footer .returnTop.fixed{
        position: absolute;
        top: -40%;
        right: 2.8%;
    }
    footer .enterToast{
        width: 90px;
        height: 60px;
        background: #fff;
        position: fixed;
        top: 83%;
        right: 2.7%;
        margin-right: 70px;
        font-size: 14px;
        color: #666;
        font-family: 新宋体;
        padding-top: 7px;
        line-height: 24px;
        text-align: center;
        box-shadow: 1px 1px 4px 2px rgba(0,0,0,.06);
        opacity: 0;
        -moz-opacity:0;
        z-index: 10;
    }
    footer .enterToast.show{
        opacity: 1;
        -moz-opacity:1;
        animation: showToast 0.5s;
    }
    @keyframes showToast
    {
        0%   {opacity: 0;-moz-opacity:0;}
        25%  {opacity: 0.2;-moz-opacity:0.2;}
        50%  {opacity: 0.4;-moz-opacity:0.4;}
        75%  {opacity: 0.8;-moz-opacity:0.8;}
        100% {opacity: 1;-moz-opacity:1;}
    }
    footer .enterToast.fixed{
        position: absolute;
        top: -40%;
    }

    #footer .footer_content{
        height: 318px;
        padding-top: 94px;
        box-sizing:border-box;
        overflow: hidden;
        margin: 0 auto;
        width: 1132px;
    }
    #footer .footer_content .footerLogo{
        float: left;
        margin-top: 14px;
    }
    .footer_bottom{
        color: #fff;
        font-family: Microsoft Yahei, 微软雅黑;
        font-size: 14px;
        /*margin-top: 80px;*/
        text-align: center;
        line-height: 50px;
        height: 70px;
      background:#393F51;
    }
    .text p{
        font-size: 20px;
        color: #F6AE45;
        font-family: Microsoft Yahei, 微软雅黑;
        margin: 0;
        margin-bottom: 26px;

    }
    .text{
        margin: 0;
    }
    .text li{
        height: 14px;
        font-size: 0;
        margin-bottom: 20px;
    }
    .text li:nth-child(3){
        position: relative;
    }
    .text li:last-child{
        margin-bottom: 0;
    }
    .text li a{
        font-size: 16px;
        color: #6B6B6B!important;
        font-family: Microsoft Yahei, 微软雅黑;
    }
    .text li a:hover{
        color: #333!important;
    }
    .customerServiceBox{
        position: relative;
    }
    .text li .customerService{
        width: 220px;
        height: 200px;
        background: rgba(255,255,255,1);
        text-align: center;
        padding-top: 12px;
        line-height: 28px;
        font-family: 新宋体;
        color: #666;
        font-size: 14px;
        position: absolute;
        top: -34px;
        z-index: 20;
        opacity: 0;
        right: -220px;
        border-radius: 5px;
        box-shadow: 0 0 2px 4px rgba(0,0,0,.02);
        display: none;
    }
    .text .customerServiceBox:hover .customerService{
        animation: showService 0.5s;
        opacity: 1;
        display: block;
    }
    @keyframes showService
    {
        0%   {opacity: 0;-moz-opacity:0;}
        25%  {opacity: 0.2;-moz-opacity:0.2;}
        50%  {opacity: 0.4;-moz-opacity:0.4;}
        75%  {opacity: 0.8;-moz-opacity:0.8;}
        100% {opacity: 1;-moz-opacity:1;}
    }
    .col-xs-3{
        padding: 0;
    }
    .col-xs-3.em{
        width: 1px;height: 160px;background: #999
    }
    .footer_content .ul{
        display: -webkit-box;      /* OLD - iOS 6-, Safari 3.1-6 */
        display: -moz-box;         /* OLD - Firefox 19- (buggy but mostly works) */
        display: -ms-flexbox;      /* TWEENER - IE 10 */
        display: -webkit-flex;     /* NEW - Chrome */
        display: flex;             /* NEW, Spec - Opera 12.1, Firefox 20+ */
        margin: 0;
        -webkit-box-pack: justify;
        /* 12版 */
        -webkit-justify-content: space-between;
        -moz-justify-content: space-between;
        -ms-justify-content: space-between;
        -o-justify-content: space-between;
        justify-content: space-between;
        width: 760px;
        float: right;
    }
</style>
<style>
    .indexBanner_Carousel .el-carousel__indicators{
        left: 92%;
        bottom: 10px;
    }
    .indexBanner_Carousel .el-carousel__indicators .el-carousel__indicator .el-carousel__button{
        width: 10px;
        height: 10px;
        border-radius: 50%;
    }

  /*内容轮播*/

  .indexMainCarousel .el-carousel__arrow{
    width: 40px;
    height: 40px;
    background-color: rgba(191,191,191,1);
    box-shadow: 0 0 12px 6px rgba(0,0,0,.06);
    color: #fff;
    font-size: 18px;
    top: 66%;
  }

    .indexMainCarousel .el-carousel__arrow i{
      font-size: 18px;
    }

    .indexMainCarousel .el-carousel__arrow.el-carousel__arrow--left{
      left: 10px;
    }

    .indexMainCarousel .el-carousel__arrow.el-carousel__arrow--right{
      right: 10px;
    }
</style>
