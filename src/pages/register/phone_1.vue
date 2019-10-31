<template>
    <div class="registeredPage">
      <transition name="el-fade-in-linear">
        <div class="shadeBox" v-show="blank!=''">
          <div class="contentBox" id="wxCodeBox">
            <iframe :src="blank" width="430" height="420" scrolling="no" frameborder="0"></iframe>
            <p>微信扫描二维码登录</p>
          </div>
        </div>
      </transition>
      <el-tabs v-model="activeName" class="registerTabs" :stretch="true" @tab-click="handleClick">
        <el-tab-pane name="first">
          <span slot="label" class="callPhone">
            <img class="login_phone_tabs" src="../../assets/login_phone_tabs.png" v-if="activeName == 'second'">
            <img class="login_phone_tabs2" src="../../assets/login_phone_tabs2.png" v-else>
            手机注册
          </span>
          <div class="verificaBefore" v-if="verifica">

            <div class="photoInpt">
              <el-input
                placeholder="请输入手机号"
                v-model="form.phone"
                clearable class="registerInput iphoneInput" @blur="testPhone">
                <i slot="prefix" class="el-input__icon"></i>
              </el-input>
              <img class="login_phone_tabs" src="../../assets/login_phone_tabs.png">
            </div>


            <div class="sliderBox">
              <img class="login_validation" src="../../assets/login_validation.png">
              <div id="box">
                <div class="bgColor"></div>
                <div class="txt" >请向右滑动滑块</div>
                <div class="slider">
                  <div class="iconfont icon-double-right"></div>
                </div>
              </div>
            </div>

            <div class="codeBox">
              <el-input type="text" class="account" placeholder="请输入验证码" v-model="form.code">
                <div slot="append" v-if="sendMsgDisabled" class="verification">{{time}}秒后获取</div>
                <div slot="append" v-else @click="code" class="verification">获取验证码</div>
                <i slot="prefix" class="el-input__icon"></i>
              </el-input>
              <img class="login_phot_validation" src="../../assets/login_phot_validation.png">
              <div class="error" v-if="msg">{{msg}}</div>
            </div>


            <el-button class="registeredBtn" type="warning" round @click="registeredSubmit">注册</el-button>

            <div class="anotherLogin">
              <div class="wxLogin">
                通过第三方注册：
                <img src="../../assets/WeChat_active.png" alt="" @click="wxlogin()">
              </div>
              <p>已有账号， 立即<router-link class="registerBtn" to="/login">登录</router-link></p>
            </div>

          </div>

          <!--跳转-->

          <div class="verificaAfter" v-else>

            <div class="nameBox">
              <el-input
                placeholder="请输入姓名"
                v-model="form.name"
                clearable class="registerInput registerName">
                <i slot="prefix" class="el-input__icon"></i>
              </el-input>
              <img class="login_card" src="../../assets/login_card.png">
            </div>

            <div class="pwdBox">
              <el-input
                placeholder="请输入密码"
                v-model="form.password"
                class="registerInput registerPwd" @input="testing" minlength="6" show-password>
                <i slot="prefix" class="el-input__icon"></i>
              </el-input>
              <img class="login_pwd" src="../../assets/login_pwd.png">

              <div id="tips">
                <div class="tipsSelect">
                  <div class="tipsBox"></div>
                  <span></span>
                </div>
                <div class="tipsSelect tipsSpan2">
                  <div class="tipsBox"></div>
                  <span></span>
                </div>
                <div class="tipsSelect tipsSpan3">
                  <div class="tipsBox"></div>
                  <span></span>
                </div>
              </div>
              <div class="pwdError">{{msg}}</div>
            </div>

            <el-checkbox v-model="state" class="agreementBox">
              已阅读<router-link to="/agreement">非幕平台服务协议</router-link>、<router-link to="/privacyProtocol">隐私协议</router-link>
            </el-checkbox>

            <el-button type="warning" round class="nextBtn" @click="submit">确认并登录</el-button>

            <div class="anotherLogin">
              <div class="wxLogin">
                通过第三方注册：
                <img src="../../assets/WeChat_active.png" alt="" @click="wxlogin()">
              </div>

              <el-button class="registeredBtn" type="text"  @click="returnSubmit">返回上一步</el-button>
            </div>

          </div>

          <a id="target" style="display: none"></a>

        </el-tab-pane>



        <!-- 邮箱-->
        <el-tab-pane name="second">
          <span slot="label">
            <img class="login_email_tabs2" src="../../assets/login_email_tabs2.png" v-if="activeName == 'second'">
            <img class="login_email_tabs" src="../../assets/login_email_tabs.png" v-else>
            邮箱注册
          </span>
          <div>

            <div class="emailInputBox">
              <el-input
                class="emailInput"
                placeholder="请输入邮箱"
                v-model="register_info"
                clearable @blur="testEmail">
                <i slot="prefix" class="el-input__icon"></i>
              </el-input>
              <img class="login_email_tabs" src="../../assets/login_email_tabs.png">
            </div>

            <el-button class="emailSubmitBtn" type="warning" round @click="emailCode">进入邮箱验证</el-button>

            <!--邮箱跳转-->
            <a href="" style="display: none" id="emaillogin" target="_blank"></a>

            <div class="anotherLogin">
              <div class="wxLogin">
                通过第三方注册：
                <img src="../../assets/WeChat_active.png" alt="" @click="wxlogin()">
              </div>
              <p>已有账号， 立即<router-link class="registerBtn" to="/login">登录</router-link></p>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>

    </div>
</template>

<script>
    import axios from "axios"
    export default {
        name: "phone_1",
        data(){
            return{
              activeName: 'first',
              verifica:true,
              form:{
                  phone:'',
                  name:'',
                  password:'',
                  code:''
              },
              time: 60, // 发送验证码倒计时
              sendMsgDisabled: false,
              state:true,
              msg:'',
              slider: false,
              //邮箱
              register_info:'',
              hash : {
                'qq.com': 'http://mail.qq.com',
                'gmail.com': 'http://mail.google.com',
                'sina.com': 'http://mail.sina.com.cn',
                '163.com': 'http://mail.163.com',
                '126.com': 'http://mail.126.com',
                'yeah.net': 'http://www.yeah.net/',
                'sohu.com': 'http://mail.sohu.com/',
                'tom.com': 'http://mail.tom.com/',
                'sogou.com': 'http://mail.sogou.com/',
                '139.com': 'http://mail.10086.cn/',
                'hotmail.com': 'http://www.hotmail.com',
                'live.com': 'http://login.live.com/',
                'live.cn': 'http://login.live.cn/',
                'live.com.cn': 'http://login.live.com.cn',
                '189.com': 'http://webmail16.189.cn/webmail/',
                'yahoo.com.cn': 'http://mail.cn.yahoo.com/',
                'yahoo.cn': 'http://mail.cn.yahoo.com/',
                'eyou.com': 'http://www.eyou.com/',
                '21cn.com': 'http://mail.21cn.com/',
                '188.com': 'http://www.188.com/',
                'foxmail.com': 'http://www.foxmail.com',
                'outlook.com': 'http://www.outlook.com'
              },
                blank:''
            }
        },
        methods:{

          handleClick(tab, event) {
            // console.log(tab, event);
            // let phone = document.getElementsByClassName("callPhone");
            // console.log(phone)
            // phone[0].style.color = "#ED9515"
          },

          registeredSubmit(){
              if(this.form.phone!='' && this.state && this.slider && this.form.code!=''){
                  this.verifica = false
              }else{
                  this.msg = '请填写完整'
              }

          },

          returnSubmit(){
            this.verifica = true
          },

          testPhone(){
              var phoneRule = /^[1][3,4,5,7,8,9][0-9]{9}$/;
              if(this.form.phone.match(/^[1][3,4,5,7,8,9][0-9]{9}$/)){
                  let form = new FormData()
                  form.append('account',this.form.phone)
                  axios.post('/account/check_exist',form
                  ).then((response)=> {
                      if(response.data.msg == '账号可用'){
                          this.msg=''
                          return
                      }else if(response.data.msg == '账号已存在'){
                          this.msg='该账号已存在'
                      }else {
                          this.msg=response.data.msg
                      }
                  })
              }
              else{
                  this.msg='输入的手机号格式不正确，请重新输入'
              }

          },
          //测试密码强度
          testing(){
              var spanDoms = document.querySelectorAll('#tips>.tipsSelect>span');
              //获取用户输入的密码,然后判断其强度 返回0 或者 1 2 3 4
              var index = checkPassWord(this.form.password);
              for(var i = 0; i <spanDoms.length; i++){
                  spanDoms[i].className = "";//清空span标签所有的class样式
                  if(index){//0 代表false 其余代表true
                      spanDoms[index-1].className = "s" + index ;
                  }
              }
              //校验密码强度
              function checkPassWord(value){
                  //三个级别
                  var modes = 0;
                  if(/[a-zA-Z]+/.test(value) && /[0-9]+/.test(value) && /\W+\D+/.test(value)) {
                      modes = 3;
                  }else if(/[a-zA-Z]+/.test(value) || /[0-9]+/.test(value) || /\W+\D+/.test(value)) {
                      if(/[a-zA-Z]+/.test(value) && /[0-9]+/.test(value)) {
                          modes = 2;
                      }else if(/\[a-zA-Z]+/.test(value) && /\W+\D+/.test(value)) {
                          modes = 2;
                      }else{
                          modes = 1
                      }
                  }
                  switch(modes){
                      case 1 :
                          return 1;
                          break;
                      case 2 :
                          return 2;
                          break;
                      case 3 :
                          return 3;
                          break;
                  }
              }
          },
          code(){
              let form = new FormData()
              form.append('phone',this.form.phone)
              axios.post('/sms/signup',form
              ).then((response)=> {
                  if(response.data.msg == 'ok'){
                      this.sendMsgDisabled = true;
                      var auth_timetimer =  setInterval(()=>{
                          this.time--;
                          if(this.time<=0){
                              this.time=60;
                              this.sendMsgDisabled = false;
                              clearInterval(auth_timetimer);
                          }
                      }, 1000);
                  }else{
                      this.$alert(response.data.msg, '提示', {
                          confirmButtonText: '确定'
                      });
                  }
              })
          },
          wxlogin(){
              axios.get('/home/weixin_login_qrcode'
              ).then((response)=> {
                  if(response.data.ret == 0){
                      this.loginStatus(response.data.data.scene_id);
                      this.blank=response.data.data.qrcode
                  }else{
                      this.$alert('请重新尝试微信登录', '提示', {
                          confirmButtonText: '确定'
                      });
                  }
              })
          },
            //微信状态查询
            loginStatus(v){
                var payLoad = window.setInterval(() => {
                    axios.get('/home/weixin_login_check', {
                        params:{
                            scene_id: v,
                        }
                    }).then((response)=> {
                        if(response.data.ret == 0) {
                            window.clearInterval(payLoad);
                            this.blank= '';
                            localStorage.setItem('user_id', JSON.stringify(response.data.data.user_id));
                            localStorage.setItem('createAt', new Date().getTime());
                            localStorage.setItem('method', 'wchat');
                            localStorage.setItem('enter', '1');
                            if (response.data.data.whether_weixin_bind == 'weixin' && response.data.data.phone) {
                                this.$router.push('/control/list')
                            } else {
                                this.$router.push('/complete')
                            }
                        }
                    })
                }, 2000);
                var documentHandler = (e)=>{
                    var sp = document.getElementById("wxCodeBox");
                    if(sp){
                        if(!sp.contains(e.target)){
                            this.blank = '';
                            window.clearInterval(payLoad);
                        }
                    }
                }
                document.addEventListener('click', documentHandler);
            },

          agreement(){
              this.$router.push('/agreement')
          },
          submit(){
              if(this.state && this.slider){
                  if(this.$route.query.invite_code){
                      this.form.invite_code = this.$route.query.invite_code
                  }
                  axios({
                          url:'/home/signup_sms',
                          method: 'post',
                          headers:{
                              'Content-type': 'application/x-www-form-urlencoded'
                          },
                          data:this.form,
                          transformRequest: [function (data) {
                              let ret = ''
                              for (let it in data) {
                                  ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                              }
                              return ret
                          }]
                      }
                  ).then((response)=> {
                      if(response.data.msg == 'ok'){
                          this.$message({
                              message: '注册成功，正在登录',
                              type: 'success'
                          });
                          axios({
                              method: 'post',
                              url: '/home/login',
                              headers:{
                                  'Content-type': 'application/x-www-form-urlencoded'
                              },
                              data:{
                                  account:this.form.phone,
                                  password:this.form.password
                              },
                              transformRequest: [function (data) {
                                  let ret = ''
                                  for (let it in data) {
                                      ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                                  }
                                  return ret
                              }]
                          }).then((response)=> {
                              if(response.data.msg=='ok'){
                                  localStorage.setItem('user_id',JSON.stringify(response.data.data.user_id))
                                  localStorage.setItem('createAt', new Date().getTime());
                                  localStorage.setItem('user',this.form.phone);
                                  localStorage.setItem('enter','1');
                                  localStorage.removeItem('register_info');
                                  this.$router.push('/control/list')
                              }else{
                                  this.msg = response.data.msg
                              }
                          })
                      }else{
                          this.msg=response.data.msg
                      }
                  })
              }else{
                  this.msg='请确认是否同意注册协议!'
              }
          },


          //  邮箱
          testEmail(){
            if(this.register_info.match(/^\w+@\w+\.com$/)){
              let form = new FormData()
              form.append('account',this.register_info)
              axios.post('/account/check_exist',form
              ).then((response)=> {
                if(response.data.msg == '账号可用'){
                  // this.emailCode()
                }else if(response.data.msg == '账号已存在'){
                  this.error='该账号已存在'
                }
              })

            }
            else{
              this.error='输入的邮箱格式不正确，请重新输入'
            }
          },
          emailCode(){
            let form = new FormData()
            form.append('email',this.register_info)
            axios.post('/email/signup',form
            ).then((response)=> {
              if(response.data.msg == 'ok'){
                this.$message({
                  message: '已发送，请登录邮箱查看',
                  type: 'success'
                })
                  this.$router.push('/register/email_2?invite_code='+this.$route.query.invite_code+'&email='+this.register_info)
              }else{
                this.$message(response.data.msg);
              }
            })
          },

        },
        mounted(){

          function getEle(selector){
            return document.querySelector(selector);
          }
          //二、获取到需要用到的DOM元素
          var box = getEle("#box"),//容器
              bgColor = getEle(".bgColor"),//背景色
              txt = getEle(".txt"),//文本
              slider = getEle(".slider"),//滑块
              icon = getEle(".slider>.icon-double-right"),
              successMoveDistance = box.offsetWidth- slider.offsetWidth,//解锁需要滑动的距离
              downX,//用于存放鼠标按下时的位置
              isSuccess = false;//是否解锁成功的标志，默认不成功

          //三、给滑块添加鼠标按下事件
          slider.onmousedown = mousedownHandler;

          //3.1鼠标按下事件的方法实现
          function mousedownHandler(e){
            bgColor.style.transition = "";
            slider.style.transition = "";
            var e = e || window.event || e.which;
            downX = e.clientX;
            //在鼠标按下时，分别给鼠标添加移动和松开事件
            document.onmousemove = mousemoveHandler;
            document.onmouseup = mouseupHandler;
          };

          //四、定义一个获取鼠标当前需要移动多少距离的方法
          function getOffsetX(offset,min,max){
            if(offset < min){
                offset = min;
            }else if(offset > max){
                offset = max;
            }
            return offset;
          }

          //3.1.1鼠标移动事件的方法实现
          function mousemoveHandler(e){
            var e = e || window.event || e.which;
            var moveX = e.clientX;
            var offsetX = getOffsetX(moveX - downX,0,successMoveDistance);
            bgColor.style.width = offsetX + "px";
            slider.style.left = offsetX + "px";

            if(offsetX == successMoveDistance){
                success();
            }
            //如果不设置滑块滑动时会出现问题（目前还不知道为什么）
            e.preventDefault();
          };

          //3.1.2鼠标松开事件的方法实现
          function mouseupHandler(e){
            if(!isSuccess){
              bgColor.style.width = 0 + "px";
              slider.style.left = 0 + "px";
              bgColor.style.transition = "width 0.8s linear";
              slider.style.transition = "left 0.8s linear";
            }
            document.onmousemove = null;
            document.onmouseup = null;
          };

          //五、定义一个滑块解锁成功的方法
          let success=()=>{
            isSuccess = true;
            txt.innerHTML = "解锁成功";
            bgColor.style.backgroundColor ="lightgreen";
            slider.className = "slider active";
            icon.className = "iconfont icon-xuanzhong";
            //滑动成功时，移除鼠标按下事件和鼠标移动事件
            slider.onmousedown = null;
            document.onmousemove = null;
            this.slider = true
          }

          //邮箱
          if(this.$route.query.status){
            if(this.$route.query.status=='2'){
              this.$alert('邮箱已激活，请登录', '提示', {
                confirmButtonText: '确定'
              });
              this.$router.push('/')
            }else if(this.$route.query.status=='3'){
              this.$alert('链接已失效，请重新注册', '提示', {
                confirmButtonText: '确定'
              });
              this.$router.push('/')
            }else if(this.$route.query.status=='4'){
              this.$alert('链接不正确', '提示', {
                confirmButtonText: '确定'
              });
              this.$router.push('/')
            }
          }
        },
    }
</script>
<style src="../../css/el-message-box.css"></style>
<style>

  .registeredPage .registerTabs .el-tabs__header{
    width: 280px;
    margin: auto;
    margin-bottom: 6vh;
  }

  .registeredPage .registerTabs .el-tabs__item.is-active{
    color: #ED9515;
  }

  .registeredPage .registerTabs .el-tabs__active-bar{
    background-color: #ED9515;
  }

  .registeredPage .registerTabs .el-input__inner{
    font-size: 16px;
    border-top: none;
    border-left: none;
    border-right: none;
    border-radius: 0px;
    height: 32px;
    padding-left: 30px;
  }

  .registeredPage .registerTabs .el-input__inner:focus{
    border-color: #ED9515;
  }

  .registeredPage .registerTabs .el-input-group__append{
    border: none;
    height: 32px;
    width: 30%;
    padding: 0;
    background: #fff;
    border-radius: 0;
  }

  .registeredPage .icon-xuanzhong{
      background: #fff url('../../assets/registerSuccessIcon.png') center no-repeat;
      background-size: 22px;
      width: 50px;
      height: 32px;
    border-radius: 0 10px 10px 0;
    border:1px solid rgba(210,210,210,1);
    border-top: none;
    border-left: none;

  }

  .registeredPage .registerRight .registerBottom{
      bottom: 2vh!important;
  }

  .registeredPage .agreementBox .el-checkbox__label{
      font-size: 16px;
  }

  .registeredPage .registerTabs .verificaBefore .codeBox .account .verification span{
    color:rgba(255,255,255,1);
  }
</style>
<style scoped>
    *{
        box-sizing: border-box;
    }

    .registeredPage .registerTabs{
      width: 328px;
      margin: auto;
    }

    .registeredPage .registerTabs .callPhone .login_phone_tabs{
      position: absolute;
      top: 10px;
      left: 10px;
      width: 12px;
      height: 18px;
    }

    .registeredPage .registerTabs .callPhone .login_phone_tabs2{
      position: absolute;
      top: 10px;
      left: 10px;
      width: 12px;
      height: 18px;
    }

    .registeredPage .registerTabs .verificaBefore .photoInpt{
      position: relative;
    }

    .registeredPage .registerTabs .verificaBefore .photoInpt .login_phone_tabs{
      width: 14px;
      height: 22px;
      position: absolute;
      top:14px;
      left: 2px;
    }

    .registeredPage .registerTabs .verificaBefore .photoInpt .iphoneInput{
      margin-bottom: 28px !important;
    }

    .registeredPage .registerTabs .verificaBefore .registerInput{
        margin: 10px 0;
    }

    .registeredPage  .registerTabs .sliderBox{
      margin-bottom: 28px;
    }

    .registeredPage  .registerTabs .sliderBox .login_validation{
      width: 16px;
      height: 20px;
      float: left;
      margin: 16px 12px 0 0;

    }

    .registeredPage  .registerTabs .sliderBox #box{
      float: left;
      position: relative;
      width: 298px;
      height: 32px;
      margin-top: 10px;
      margin-bottom: 28px;
      background-color: #e8e8e8;
      box-shadow: 1px 1px 5px rgba(0,0,0,0.2);
      border-radius:10px;
      border:1px solid rgba(210,210,210,1);
      z-index: 5;
    }

    .registeredPage  .registerTabs .sliderBox #box .bgColor{
      position: absolute;
      left:0;
      top:0;
      width:40px;
      height: 31px;
      background-color: lightblue;
      border-radius: 10px 0 0 10px;
    }

    .registeredPage .registerTabs .sliderBox #box .txt{
      position: absolute;
      width: 100%;
      height: 32px;
      line-height: 32px;
      font-size: 14px;
      color: #000;
      text-align: center;
      border-radius: 10px 10px 10px 10px;
      background: -webkit-gradient(linear,left top,right top,color-stop(0,#4d4d4d),color-stop(.4,#4d4d4d),color-stop(.5,#fff),color-stop(.6,#4d4d4d),color-stop(1,#4d4d4d));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      -webkit-animation: slidetounlock 3s infinite;
      -webkit-text-size-adjust: none;
    }
    
    @keyframes slidetounlock {
      0%{
        background-position: -200px 0;
      }
      100%{
        background-position: 200px 0;
      }
    }

    .registeredPage .registerTabs .verificaBefore .sliderBox .slider{
      position: absolute;
      left:0;
      top:-1px;
      width: 50px;
      height: 32px;
      border: 1px solid #ccc;
      text-align: center;
      cursor: move;
      border-radius: 10px 10px 10px 10px;

    }
    .registeredPage .registerTabs .verificaBefore .sliderBox .slider>.icon-double-right{
      position: absolute;
      top:50%;
      left:50%;
      transform: translate(-50%,-50%);
      background: #fff url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0ZDhlNWY5My05NmI0LTRlNWQtOGFjYi03ZTY4OGYyMTU2ZTYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NTEyNTVEMURGMkVFMTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NTEyNTVEMUNGMkVFMTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo2MTc5NzNmZS02OTQxLTQyOTYtYTIwNi02NDI2YTNkOWU5YmUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NGQ4ZTVmOTMtOTZiNC00ZTVkLThhY2ItN2U2ODhmMjE1NmU2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+YiRG4AAAALFJREFUeNpi/P//PwMlgImBQkA9A+bOnfsIiBOxKcInh+yCaCDuByoswaIOpxwjciACFegBqZ1AvBSIS5OTk/8TkmNEjwWgQiUgtQuIjwAxUF3yX3xyGIEIFLwHpKyAWB+I1xGSwxULIGf9A7mQkBwTlhBXAFLHgPgqEAcTkmNCU6AL9d8WII4HOvk3ITkWJAXWUMlOoGQHmsE45ViQ2KuBuASoYC4Wf+OUYxz6mQkgwAAN9mIrUReCXgAAAABJRU5ErkJggg==) center no-repeat;
      background-size: 13px;
      width: 50px;
      height: 32px;
      border-radius: 10px 0 0 10px;
      border:1px solid rgba(210,210,210,1);

    }
    .registeredPage .registerTabs .verificaBefore .sliderBox .slider.active>.icon-double-right{
      color:green;
    }

    .registeredPage .registerTabs .verificaBefore .codeBox{
      margin: 10px 0;
      margin-bottom: 38px;
      position: relative;
    }

    .registeredPage .registerTabs .verificaBefore .codeBox .login_phot_validation{
      width: 16px;
      height: 20px;
      position: absolute;
      top: 48px;
      left: 2px;
    }

    .registeredPage .registerTabs .verificaBefore .codeBox .account{
      /*width:325px;*/
      height: 32px;
    }
    .registeredPage .registerTabs .verificaBefore .codeBox .error{
      color: #fd4444;
      position: absolute;
      top: 100px;
      left: 32px;
    }

    .registeredPage .registerTabs .verificaBefore .codeBox .account .verification{
      background-color: #fff;
      font-size:10px;
      font-family:PingFang-SC-Regular;
      color: #ED9515;
      border: none;
      border-bottom: 1px solid rgba(210,210,210,0.6);
      outline: none;
      height: 32px;
      line-height: 32px;
      text-align: center;
      cursor: pointer;
    }

    .registeredPage .registerTabs .verificaBefore .registeredBtn{
      width:327px;
      height:36px;
      background:rgba(237,149,21,1);
      border-radius:16px;
    }

    /*切换*/

    .registeredPage .registerTabs .verificaAfter .nameBox{
      margin-bottom: 20px;
      position: relative;
    }

    .registeredPage .registerTabs .verificaAfter .nameBox .login_card{
      width: 21px;
      height: 14px;
      position: absolute;
      top: 10px;
      left: 0;
    }

    .registeredPage .registerTabs .verificaAfter .pwdBox{
      position: relative;
    }

    .registeredPage .registerTabs .verificaAfter .pwdBox .login_pwd{
      width: 18px;
      height: 18px;
      position: absolute;
      top: 7px;
      left: 0;
    }

    .registeredPage .registerTabs .verificaAfter .pwdBox .registerPwd{
      margin-bottom: 10px;
    }

    .registeredPage .registerTabs .verificaAfter .pwdBox .pwdError{
      color: #fd4444;
      position: absolute;
      top: 74px;
    }

    .registeredPage .registerTabs .verificaAfter .pwdBox #tips{
      font-size: 12px;
      width: 100%;
      height: 25px;
    }
    .registeredPage .registerTabs .verificaAfter .pwdBox #tips span{
      float: left;
      width: 24px;
      height: 8px;
      color: #fff;
      overflow:hidden;
      margin-right: 6px;
      background: rgba(191,191,191,0.4);
      line-height:20px;
      text-align: center;
      border-radius: 2px;
    }

    .registeredPage .registerTabs .verificaAfter .pwdBox #tips .tipsSpan2 span{
      width: 30px;
      background: rgba(191,191,191,0.7);
    }

    .registeredPage .registerTabs .verificaAfter .pwdBox #tips .tipsSpan3 span{
      width: 36px;
      background: rgba(191,191,191,1);
    }

    .registeredPage .registerTabs .verificaAfter .pwdBox #tips .s1{
      background: rgba(237,149,21,0.4);
    }/*红色*/
    .registeredPage .registerTabs .verificaAfter .pwdBox #tips .s2{
      background: rgba(237,149,21,0.7);
    }/*橙色*/
    .registeredPage .registerTabs .verificaAfter .pwdBox #tips .s3{
      background: rgba(237,149,21,1);
    }/*黄色*/
    .registeredPage .registerTabs .verificaAfter .pwdBox #tips .s4{
      background: rgba(237,149,21,1);
    }/*绿色*/

    .registeredPage .registerTabs .verificaAfter .agreementBox{
        margin: 20px 0;
    }

    .registeredPage .registerTabs .verificaAfter .agreementBox a{
        text-decoration: none;
    }

    .registeredPage .registerTabs .verificaAfter .agreementBox a:hover{
        color: #3b85f5;
    }

    .registeredPage .registerTabs .verificaAfter .nextBtn{
      width:327px;
      height:36px;
      background:rgba(237,149,21,1);
      border-radius:16px;
    }

    .registeredPage .registerTabs .anotherLogin{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 20px;
    }

    .registeredPage .registerTabs .anotherLogin a.registerBtn{
      font-size: 14px;
    }

    .registeredPage .registerTabs .anotherLogin .wxLogin img{
        vertical-align: middle;
        cursor: pointer;
    }


  /*邮箱*/


    .registeredPage .registerTabs .login_email_tabs{
      position: absolute;
      width: 16px;
      height: 14px;
      top: 12px;
      left: 24px;
    }

    .registeredPage .registerTabs .login_email_tabs2{
      position: absolute;
      width: 16px;
      height: 14px;
      top: 12px;
      left: 24px;
    }

    .registeredPage .registerTabs .emailInputBox{
      position: relative;
    }

    .registeredPage .registerTabs .emailInputBox .emailInput{
      margin-bottom: 32px;
    }

    .registeredPage .registerTabs .emailInputBox .login_email_tabs{
      width: 18px;
      height: 18px;
      position: absolute;
      top: 8px;
      left: 0px;
    }

    .registeredPage .registerTabs .emailSubmitBtn{
      width:324px;
      height:36px;
      background:rgba(237,149,21,1);
      border-radius:16px;
    }

    /*遮罩*/
    .registeredPage .shadeBox{
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: 1999;
      background: rgba(0,0,0,0.3);
    }

    .registeredPage .shadeBox .contentBox{
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      display: block;
      width: 430px;
      height: 460px;
      background: #fff;
      border-radius: 2px;
    }

    .registeredPage .shadeBox .contentBox p{
      line-height: 14px;
      text-align: center;
    }
</style>
