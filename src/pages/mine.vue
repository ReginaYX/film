<template>
    <div class="mineBox">
      <img src="../assets/listBg.png" class="backImg"></img>
      <div class="nav">
        <div class="nav-bar">
          <router-link class="nav-left" to="/">
            <img src="../assets/indexTop_logo.png" style="margin-top: 2px">
          </router-link>
          <div class="rightBox">
            <transition enter-active-class="animated bounceInDown" leave-active-class="animated bounceOutUp">
              <router-link class="rewardBox" to="/control/reward">
                <img src="../assets/rewardIcon.png" alt="">领取福利
              </router-link>
            </transition>
            <div class="nav-right">
              <div class="portrait" style="margin-right: 8px" @mouseleave="topshowList=false">
                <div class="profile" @mouseenter="topshowList=true" >
                  <img v-if="file" :src="file" alt="" >
                  <div v-else class="defaultProfile" plain>{{defaultProfile}}</div>
                </div>
                <div style="width: 20px;height: 20px;background: #ff0000;border-radius: 50%;position: relative;left: 56px;top: -48px;font-size: 11px;color: #fff;text-align: center;line-height: 18px" v-if="news_num>0">{{news_num}}</div>
                <ul class="head-menu" v-show="topshowList">
                  <li class="nickname">
                    <div class="headBox"><i class="iconfont iconnan"></i></div>
                    <div class="infoBox">
                      <p>{{name}}</p>
                      <p v-if="phone">{{phone}}</p>
                      <p v-else>{{email}}</p>
                    </div>
                  </li>
                  <li class="border">
                    <router-link class="setting" to="/mine/setting">个人设置</router-link>
                    <router-link class="security" to="/mine/pwd">账号设置</router-link>
                  </li>
                  <li>
                    <router-link class="message" to="/news">
                      <span>消息中心</span>
                      <div class="newNumBox" v-if="news_num>0">{{news_num}}</div>
                    </router-link>
                    <router-link class="message tradingCenter" to="/tradingCenter">交易中心</router-link>
                    <router-link class="message tradingCenter" to="/mine/coupon">优惠券</router-link>
                  </li>
                  <li class="logout" @click="signOut">退出</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 页面头部结束 -->
      <div id="xiangqing" class="xiangqing">
        <div class="activityBox">
          <p>安全升级，领取更多福利</p>
          <router-link class="btn" to="/control/reward">立即前往 <i class="iconfont iconyou3"></i></router-link>
        </div>
        <!-- 页面内容部分 -->
        <div style="width: 100%;">
          <div class="contentBox">
            <p class="contentBoxTitle">基本信息</p>
            <div class="geren_touxiang">
              <img v-if="file" :src="file" alt="" @click="toggleShow">
              <div v-else class="defaultProfileSetting" plain  @click="toggleShow">{{defaultProfile}}</div>
            </div>
            <div class="upload-head-img">
              <my-upload field="img"
                         @crop-success="cropSuccess"
                         @crop-upload-success="cropUploadSuccess"
                         @crop-upload-fail="cropUploadFail"
                         v-model="show"
                         :width="300"
                         :height="300"
                         :params="params"
                         img-format="jpg"
                         noSquare>
              </my-upload>
            </div>
            <ul class="infor-left">
              <li>
                {{this.name}}
              </li>
              <li class="userVip" v-if="this.package_name && this.package_name == '基础版'">
                <i class="iconfont iconhuangguan guan1"></i>{{this.package_name}}用户</li>
              <li class="userVip" v-else-if="this.package_name && this.package_name == '高级版'">
                <i class="iconfont iconhuangguan guan2"></i>{{this.package_name}}用户</li>
              <li class="userVip" v-else-if="this.package_name && this.package_name == '企业版'">
                <i class="iconfont iconhuangguan guan3"></i>{{this.package_name}}用户</li>
              <li class="userVip" v-else>免费版用户</li>
              <li class="mobile-reg" style="display: list-item;" v-if="this.package_due && this.package_due != '-1'">
                到期时间：{{this.package_due | changeTimeDay}}
              </li>
              <li class="mobile-reg" style="display: list-item;" v-if="this.phone">
                Tel：{{this.phone}}
              </li>
              <li class="mobile-reg email-reg" v-if="email">
                Email：{{this.email}}
              </li>
              <li class="mobile-reg rechangeBtn" style="display: list-item;">
                <router-link class="chargBtn" :to="{path: '/recharge'}">立即升级</router-link>
              </li>
            </ul>
          </div>
          <!-- 页面左边部分结束 -->
          <div class="mineRight">
            <!-- 项目设置和密码开始 -->
            <el-menu :default-active="activeIndex" class="el-menu-demo" router mode="horizontal">
              <el-menu-item index="1" :route="{path: '/mine/setting'}" class="setting">个人设置</el-menu-item>
              <el-menu-item index="2" :route="{path: '/mine/pwd'}">账号设置</el-menu-item>
              <el-menu-item index="3" :route="{path: '/news'}">消息中心</el-menu-item>
              <el-menu-item index="4" :route="{path: '/tradingCenter'}" class="tradingCenter">交易中心</el-menu-item>
              <el-menu-item index="5" :route="{path: '/mine/coupon'}" class="tradingCenter">优惠券</el-menu-item>
            </el-menu>
              <!-- 项目设置和密码结束 -->
              <!-- 项目表格开始 -->
              <div id="content_right_biaoge" class="content_right_biaoge">
                <router-view></router-view>
              </div>
          </div>
        </div>
      </div>
      <fm-footer></fm-footer>
    </div>
</template>

<script>
    import fmFooter from "../common/fmFooter";
    import myUpload from 'vue-image-crop-upload';
    import axios from "axios"
    export default {
        name: "mine",
        components: {fmFooter,myUpload},
        data () {
            return {
              activeIndex: '1',
                showList:false,
                show: false,
                file:'',
                params: {
                    user_id:'',
                    profile:''
                },
                img:'',
                imgDataUrl: this.$route.createImgUrl,
                name :'',
                phone:'',
                email:'',
                topshowList:false,
                news_num:0,
                t1:'',
                package_name:'',//套餐名
                package_due:'',//到期时间
                defaultProfile:'',
              balance:'',

            }
        },
        methods: {

            input(res){
                this.show=res
            },
            getBlobBydataURI(imgDataUrl,type) {
                var binary = atob(imgDataUrl.split(',')[1]);
                var array = [];
                for(var i = 0; i < binary.length; i++) {
                    array.push(binary.charCodeAt(i));
                }
                return new Blob([new Uint8Array(array)], {type:type });
            },

            toggleShow() {
                this.show = !this.show;
            },

            cropSuccess(imgDataUrl, field){
                this.imgDataUrl = imgDataUrl;
                var $Blob= this.getBlobBydataURI(imgDataUrl,'image/jpeg');
                let form = new FormData()
                form.append("user_id",JSON.parse(localStorage.user_id));
                form.append("profile_picture", $Blob ,"file_"+Date.parse(new Date())+".jpeg");
                axios({
                    method: 'post',
                    url: '/user/upload_profile_picture',
                    data:form,
                    headers:{
                        'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundaryAZCU7ve1goo6tPnP',
                        'Accept': '*/*',
                        'X-Requested-With': 'XMLHttpRequest'
                    }
                }).then((response)=> {
                    if(response.data.msg == 'ok'){
                        this.show = false
                        this.$router.go(0)
                    }
                })
            },

            cropUploadSuccess(jsonData, field){
                axios({
                    method: 'post',
                    url: '/user/profile/upload',
                    data:this.params,
                    transformRequest: [function (data) {
                        let ret = ''
                        for (let it in data) {
                            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                        }
                        return ret
                    }],
                    headers:{
                        'Content-type': 'application/x-www-form-urlencoded'
                    }
                }).then((response)=> {

                })
            },

            cropUploadFail(status, field){
                console.log('-------- upload fail --------');
                console.log(status);
                console.log('field: ' + field);
            },
            signOut(){
                var r=confirm("确认退出吗？")
                if (r==true)
                {
                    localStorage.removeItem('user_id')
                    localStorage.removeItem('createAt')
                    this.$router.push('/')
                }
            },
            msg (){
                var user_id = JSON.parse(localStorage.user_id)
                axios({
                    method: 'get',
                    url: '/message/list?user_id='+user_id,
                    headers:{
                        'Content-type': 'application/x-www-form-urlencoded'
                    }
                }).then((response)=> {
                    let num = 0
                    if(response.data.data){
                        for (let it in response.data.data) {
                            if(response.data.data[it].status == '1' ){
                                num ++;
                            }
                        }
                        this.news_num = num
                        return this.news_num
                    }
                })
            },
        },
        mounted(){
            if(this.$route.path=='/mine/pwd'){
                this.activeIndex = '2'
            }else if(this.$route.path=='/news'){
                this.activeIndex = '3'
            }else if(this.$route.path=='/tradingCenter'){
                this.activeIndex = '4'
            }else if(this.$route.path=='/mine/coupon'){
                this.activeIndex = '5'
            }
            if(localStorage.user_id){
                this.params.user_id = localStorage.getItem("user_id").replace("\"","").replace("\"","")
                axios({
                    method: 'get',
                    url: '/user/info?user_id='+this.params.user_id,
                    headers:{
                        'Content-type': 'application/x-www-form-urlencoded'
                    }
                }).then((response)=> {
                    this.file = response.data.data.profile_picture
                    if(response.data.data.name){
                        this.name = response.data.data.name
                    }
                    this.package_name = response.data.data.package_name
                    this.package_due = response.data.data.package_due
                    this.phone = response.data.data.phone
                    this.email = response.data.data.email
                    if(this.name != ''){
                        this.defaultProfile = this.name.substr(0,1)
                    }else if(this.phone != ''){
                        this.defaultProfile = this.phone.substr(0,1)
                    }else if(this.email != ''){
                        this.defaultProfile = this.email.substr(0,1)
                    }

                })
                if(this.file==''){
                    var giveColor = document.getElementsByClassName('defaultProfile');
                    var color = ['fecfcf','ffdf9b','7ee9f0','e29bff','9ec0ff','ff88ad','5df3c3','ffe6a1','8eec9f','ffb7b7','d3b8ff','ffc4f7'];
                    var num = Math.floor(Math.random() * color.length); //获取随机数
                    document.querySelector('.defaultProfile').style.background = '#' + color[num]
                    document.querySelector('.defaultProfileSetting').style.background = '#' + color[num]
                }
                var user_id = JSON.parse(localStorage.user_id)
                axios({
                    method: 'get',
                    url: '/message/list?user_id='+user_id,
                    headers:{
                        'Content-type': 'application/x-www-form-urlencoded'
                    }
                }).then((response)=> {
                    let num = 0
                    if(response.data.data){
                        for (let it in response.data.data) {
                            if(response.data.data[it].status == '1' ){
                                num ++;
                                this.$notify({
                                    title: response.data.data[it].title,
                                    message: response.data.data[it].content,
                                    type: 'success',
                                    offset: 68,
                                    duration: 8000,
                                    onClick:()=>{
                                        axios({
                                            method: 'post',
                                            url: '/message/update_status_single',
                                            data:{
                                                message_id:response.data.data[it].message_id,
                                                status:2,
                                            },
                                            headers:{
                                                'Content-type': 'application/x-www-form-urlencoded'
                                            },
                                            transformRequest: [function (data) {
                                                let ret = ''
                                                for (let it in data) {
                                                    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                                                }
                                                return ret
                                            }]
                                        }).then((response)=> {
                                            // this.fetchData()
                                            if(this.$route.path == '/control/list'){
                                                this.msg()
                                            }else{
                                                this.$router.push('/control/list?user_id='+this.user_id)
                                            }
                                        })
                                    },
                                    onClose:()=>{
                                        axios({
                                            method: 'post',
                                            url: '/message/update_status_single',
                                            data:{
                                                message_id:response.data.data[it].message_id,
                                                status:2,
                                            },
                                            headers:{
                                                'Content-type': 'application/x-www-form-urlencoded'
                                            },
                                            transformRequest: [function (data) {
                                                let ret = ''
                                                for (let it in data) {
                                                    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                                                }
                                                return ret
                                            }]
                                        }).then((response)=> {
                                            this.$notify.close()
                                            this.msg()
                                        })
                                    }
                                });
                            }
                        }
                        this.news_num = num
                        return this.news_num
                    }
                })

                this.t1=window.setInterval(this.msg, 20000);

            }else {
                this.$alert('登录已超时，请重新登录', '提示', {
                    confirmButtonText: '确定',
                    confirmButtonClass: 'aloneConfirmButton'
                });
                this.$router.push('/')
            }
        },
        beforeDestroy() {
            clearInterval(this.t1);
        },
        updated(){
            if(this.$route.path=='/mine/pwd'){
                this.activeIndex = '2'
            }else if(this.$route.path=='/news'){
                this.activeIndex = '3'
            }else if(this.$route.path=='/tradingCenter'){
                this.activeIndex = '4'
            }else if(this.$route.path=='/mine/coupon'){
                this.activeIndex = '5'
            }else{
                this.activeIndex = '1'
            }
        },
        filters: {

          //时间转换
          changeTimeDay: function (value) {
            var date = new Date();
            date.setTime(value * 1000);
            var y = date.getFullYear();
            var m = date.getMonth() + 1;
            m = m < 10 ? ('0' + m) : m;
            var d = date.getDate();
            d = d < 10 ? ('0' + d) : d;
            var H = date.getHours();
            H = H < 10 ? ('0' + H) : H;
            var M = date.getMinutes();
            M = M < 10 ? ('0' + M) : M;
            var S = date.getSeconds();
            S = S < 10 ? ('0' + S) : S;
            return y + '-' + m + '-' + d + '  ' + H + ':' + M + ':' + S;

            return date;
          },

        },
    }
</script>


<style scoped>

  body {
    background-color: #f9f9f9;
  }

  p {
    font-family: 新宋体;
    font-size: 16px;
    color: #333;
  }

  .el-menu{
    padding-left: 30px;
  }
  .el-menu-item{
    font-size: 18px;
    margin-right: 70px!important;
    padding: 0 4px;
  }
  .el-menu--horizontal>.el-menu-item.is-active{
    border-color: #ED9515;
  }

  .mineBox{
    position: relative;
    overflow: hidden;

  }

  .mineBox .backImg{
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    filter:alpha(opacity=5); /*支持 IE 浏览器*/
    /*filter: blur(6px);*/
    -moz-opacity:0.05; /*支持 FireFox 浏览器*/
    opacity:0.05; /*支持 Chrome, Opera, Safari 等浏览器*/
    mix-blend-mode: multiply;
    background-image: url("../assets/listBg.png");

    background: -webkit-linear-gradient(transparent, white); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(transparent, white); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(transparent, white); /* Firefox 3.6 - 15 */
    background: linear-gradient(transparent, white); /* 标准的语法 */

    z-index: -100;
  }

  .mineBox .nav{
    width: 100%;
    height: 60px;
    border-bottom: 1px solid #eee;
    background-color: #fff;
    position: fixed;
    z-index: 50;
    top: 0;
    left: 0;
    box-shadow: 0 4px 7px 2px rgba(0,0,0,0.04);
  }

  .mineBox .nav .nav-bar {
    width: 1200px;
    height: 100%;
    margin: 0 auto;
    overflow: initial;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .mineBox .nav .nav-bar .nav-left {
    float: left;
    cursor: pointer;
  }

  .mineBox .rightBox{
    display: flex;
    align-items: center;
  }

  .mineBox .rightBox .rewardBox{
    width:130px;
    height:26px;
    background:linear-gradient(90deg,rgba(252,190,57,1) 0%,rgba(255,79,29,1) 100%);
    border-radius:12px;
    margin-right: 8px;
    display: flex;
    align-items: center;
    font-size:12px;
    letter-spacing: 1px;
    font-weight:bold;
    color:rgba(255,255,255,1);
    cursor: pointer;
  }

  .mineBox .rightBox .rewardBox>img{
    width: 38px;
    display: block;
    margin: -6px 4px 0 6px;
  }

  .mineBox .nav .nav-bar .nav-right{
    vertical-align: middle;
    height: 60px;
    float: left;
    line-height: 60px;
    width: calc(100% - 144px);
  }

  .mineBox .nav .nav-bar .nav-right img {
    margin-top: 15px;
    margin-left: 100px
  }

  .mineBox .nav .nav-bar .nav-right .portrait {
    float: right;
    vertical-align: middle;
    cursor: pointer;
    position: relative;
    width: 65px;
    height: 150%;
    margin-top: 6px;
    border-radius: 26px;
  }

  .mineBox .nav .nav-bar .nav-right .portrait .profile{
      height: 46px;
  }

  .mineBox .nav .nav-bar .nav-right .portrait .profile img{
    /*width: 60px;height: 60px;*/
    border-radius: 50%;
    margin: 0;
    width: 46px;
    height: 46px;
    position: absolute;
    right: 0;
    top: 1%;
    left: 34%;
  }

  .mineBox .nav .nav-bar .nav-right .portrait .profile .defaultProfile{
    width: 46px;
    height: 46px;
    border-radius: 50%;
    text-align: center;
    line-height: 45px;
    font-size: 24px;
    color: #666;
    font-family: KaiTi;
    font-weight: bolder;
    margin: 0;
    position: absolute;
    right: 0;
    top: 1%;
    left: 34%;
  }

  .mineBox .nav .nav-bar .nav-right .portrait  .head-menu{
    top: 54px;
  }

  .mineBox .xiangqing {
    width: 1200px;
    margin: 0px auto 0;
    padding-top: 60px;
  }

  .mineBox .xiangqing .activityBox{
    width: 100%;
    height:90px;
    margin: 20px 0;
    background-image: url("../assets/mineActivityBg.png");
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .mineBox .xiangqing .activityBox p{
    font-size:28px;
    font-family:SimHei;
    font-weight:bold;
    color:rgba(255,255,255,1);
  }

  .mineBox .xiangqing .activityBox .btn{
    width:180px;
    height:40px;
    border:1px solid rgba(255,255,255,1);
    border-radius:20px;
    font-size:18px;
    font-weight:bold;
    color:rgba(255,255,255,1);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 100px;
    box-sizing: border-box;
    padding-left: 8px;
    cursor: pointer;
  }

  .mineBox .xiangqing .activityBox .btn i{
    font-size: 20px;
    display: block;
    margin: 4px 0 0 14px;
  }

  .mineBox .xiangqing .contentBox{
    height: auto;
    background:#fff;
    width: 250px;
    float: left;
    box-shadow: 0 2px 5px 1px rgba(0,0,0,.06);
    padding-bottom: 50px;
    background: url("../assets/handIcon.png")no-repeat;
    background-size:100% 100%;
  }

  .mineBox .xiangqing .contentBox .contentBoxTitle{
    font-size:16px;
    color:rgba(29,24,25,1);
    line-height: 16px;
    margin: 16px 0 26px 12px;
    font-family: Microsoft Yahei, 微软雅黑;
  }

  .mineBox .xiangqing .contentBox .geren_touxiang{
    text-align: center;
    width: 100%;
    height: 80px;
    cursor: pointer;
  }

  .mineBox .xiangqing .contentBox .geren_touxiang img{
    width: 80px;
    height: 80px;
    border-radius: 50%;
    overflow: hidden;
    cursor: pointer;
  }

  .mineBox .xiangqing .contentBox .geren_touxiang .defaultProfileSetting{
      width: 70px;
      height: 70px;
      border-radius: 50%;
      overflow: hidden;
      cursor: pointer;
      margin: 0 auto;
      text-align: center;
      line-height: 70px;
      font-size: 28px;
      color: #666;
      font-family: KaiTi;
      font-weight: bolder;
  }

  .mineBox .xiangqing .contentBox .infor-left{
    margin-top: 10px;
    text-align: center;
  }

  .mineBox .xiangqing .contentBox .infor-left li{
    margin-top: 6px;
    font-size:12px;
    font-family:MicrosoftYaHei;
    font-weight:400;
    color:#1d1819;
  }

  .mineBox .xiangqing .contentBox .infor-left li.userVip{
    width: 98px;
    height: 18px;
    border-radius: 10px;
    margin: 4px auto 10px;
    background: #ed9515;
    font-size: 12px;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .mineBox .xiangqing .contentBox .infor-left li.userVip i{
    margin-right: 5px;
    font-size: 14px;
    color: #ad5d00;
  }

  .mineBox .xiangqing .contentBox .infor-left li.userVip i.guan2{
    color: #f3f3f3;
  }

  .mineBox .xiangqing .contentBox .infor-left li.userVip i.guan3{
    color: #ffde00;
  }

  .mineBox .xiangqing .contentBox .infor-left li.rechangeBtn{
    margin-top: 24px;
  }

  .mineBox .xiangqing .contentBox .infor-left li .chargBtn{
    width:86px;
    height:24px;
    border:1px solid rgba(237,149,21,1);
    border-radius:15px;
    font-size:14px;
    font-family:MicrosoftYaHei;
    color:rgba(237,149,21,1);
    line-height: 22px;
    margin: auto;
    cursor: pointer;
    display: block;
  }

  .mineBox .xiangqing .mineRight{
    margin-left: 40px;
    width: 910px;
    float: left;
    box-shadow: 2px 2px 5px 2px rgba(0, 0, 0, 0.06) ;
    margin-bottom: 80px;
  }

  .mineBox .xiangqing .mineRight .content_right_biaoge{
    width: 100%;
    height: 100%;
  }
</style>
<style>
    .el-notification{
        cursor: pointer;
    }
    #save-btn{
        background:#ED9515;
    }
    .content_right_mingcheng .active .a{
        color: #459df5;
    }
    .active p{
        color: #459df5;
    }
    .vue-image-crop-upload .vicp-wrap .vicp-operate a{
        color: #459df5!important;
        font-size: 16px!important;
        width: 50px!important;
    }
    .vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-right .vicp-preview .vicp-preview-item span{
        margin-left: -6px;
    }
    .vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range .vicp-icon5,
    .vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range .vicp-icon6{
        background-color: rgba(0, 0, 0, 0.2)!important;
    }
</style>
