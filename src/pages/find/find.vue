<template>
    <div class="find_box">
        <div class="findBox_title">找回密码</div>
        <el-tabs v-model="activeName" class="find_info" :stretch="true">
            <el-tab-pane label="手机用户" name="phone" style="position: relative;">

              <div class="photoInpt">
                <el-input
                  placeholder="请输入手机号"
                  v-model="phone"
                  clearable class="registerInput iphoneInput" @blur="testPhone">
                  <i slot="prefix" class="el-input__icon"></i>
                </el-input>
                <img class="login_phone_tabs" src="../../assets/login_phone_tabs.png">
              </div>

                <span class="error">{{error}}</span>
              <el-button type="warning" round class="findNext_btn" @click="nextPhone">下一步</el-button>
                <div class="anotherLogin">
                    <div class="wxLogin">
                        通过第三方注册：
                        <img src="../../assets/WeChat_active.png" alt="" @click="wxlogin()">
                    </div>
                    <p>已有账号， 立即<router-link class="registerBtn" to="/login">登录</router-link></p>
                </div>
            </el-tab-pane>
          <!--邮箱-->
            <el-tab-pane label="邮箱用户" name="email">

              <div class="emailInputBox">
                <el-input
                  class="emailInput"
                  placeholder="请输入邮箱"
                  v-model="email"
                  clearable @blur="testEmail">
                  <i slot="prefix" class="el-input__icon"></i>
                </el-input>
                <img class="login_email_tabs" src="../../assets/login_email_tabs.png">
              </div>
                <span class="error">{{error}}</span>
              <el-button class="emailSubmitBtn" type="warning" round @click="nextEmail">下一步</el-button>
                <div class="anotherLogin">
                    <div class="wxLogin">
                        通过第三方注册：
                        <img src="../../assets/WeChat_active.png" alt="" @click="wxlogin()">
                    </div>
                    <p>已有账号， 立即<router-link class="registerBtn" to="/login">登录</router-link></p>
                </div>


            </el-tab-pane>
        </el-tabs>
        <a href="" style="display: none" id="emaillogin"></a>
    </div>
</template>

<script>
    import axios from "axios"
    export default {
        name: "find",
        data(){
            return{
                activeName: 'phone',
                phone:'',
                email:'',
                error:'',
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
                id:0,
                url:''
            }
        },
        methods: {
            testPhone(){
                var phoneRule = /^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/;
                if(phoneRule.test(this.phone)){
                    let form = new FormData()
                    form.append('account',this.phone)
                    axios.post('/account/check_exist',form
                    ).then((response)=> {
                        if(response.data.msg == '账号已存在'){
                            this.error=''
                            return
                        }else if(response.data.msg == '账号可用'){
                            this.error='账号不存在'
                        }else {
                            this.error=response.data.msg
                        }
                    })
                }
                else{
                    this.error='输入的手机号格式不正确，请重新输入'
                }

            },
            testEmail(){
                var regEmail= /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
                if(regEmail.test(this.email)){
                    let form = new FormData()
                    form.append('account',this.email)
                    axios.post('/account/check_exist',form
                    ).then((response)=> {
                        if(response.data.msg == '账号已存在'){
                            this.error=''
                            localStorage.setItem('findEmail',this.email)
                            return
                        }else if(response.data.msg == '账号可用'){
                            this.error='该账号未注册'
                        }
                    })
                }
                else{
                    this.error='输入的邮箱格式不正确，请重新输入'
                }
            },
            nextPhone(){
                if(this.phone !=='' && this.error=='') {
                    this.$router.push('/newfind/phone?phone='+this.phone)
                }else{
                    this.error='请填写手机号'
                }
            },
            nextEmail(){
                if(this.email !=='' || this.error==''){
                    this.$router.push('/newfind/email1?email='+this.email)
                }else{
                    this.error = '请填写邮箱地址'
                }
            }
        }
    }
</script>
<style src="../../css/el-message-box.css"></style>

<style>
  .find_box .find_info .el-tabs__header{
    width: 280px;
    margin: auto;
    margin-bottom: 60px;
  }

  .find_box .find_info .el-tabs__item.is-active{
    color: #ED9515;
  }

  .find_box .find_info .el-tabs__active-bar{
    background-color: #ED9515;
  }

  .find_box .find_info .el-input__inner{
    font-size: 16px;
    border-top: none;
    border-left: none;
    border-right: none;
    border-radius: 0px;
  }

  .find_box .find_info .el-input__inner:focus{
      border-color: #ED9515;
  }

  .find_box .find_info .el-input-group__append{
    border-top: none;
    border-right: none;
  }


</style>
<style scoped>

  .find_box{
    width: 328px;
    background: #fff;
    margin: auto;
  }

  .find_box .findBox_title{
    margin: auto;
    text-align: center;
    color: #ED9515;
    font-size:14px;
    font-family:PingFang-SC-Medium;
    font-weight:bold;
    margin-bottom: 60px;
  }

  .find_box .find_info{

  }

  .find_box .find_info .photoInpt{
    position: relative;
  }

  .find_box .find_info .photoInpt .login_phone_tabs{
    width: 14px;
    height: 22px;
    position: absolute;
    top: 5px;
    left: 0;
  }

  .find_box .find_info .photoInpt .iphoneInput{
    margin-bottom: 28px !important;
  }

  .find_box .find_info .findNext_btn {
    width: 327px;
    height: 36px;
    background: rgba(237, 149, 21, 1);
    border-radius: 16px;
    font-size:14px;
    font-family:PingFang-SC-Medium;
    font-weight:bold;
    color:rgba(255,255,255,1);
  }

  .find_box .find_info .emailInputBox{
    position: relative;
  }

  .find_box .find_info .emailInputBox .emailInput{
    margin-bottom: 32px;
  }

  .find_box .find_info .emailInputBox .login_email_tabs{
    width: 18px;
    height: 18px;
    position: absolute;
    top: 7px;
    left: 0px;
  }

  .find_box .find_info .emailSubmitBtn{
    width:324px;
    height:36px;
    background:rgba(237,149,21,1);
    border-radius:16px;
  }


  .error{
      font-size: 14px;
      color: #fd4444;
      font-family: 新宋体;
      position: absolute;
      top: 40px;
      left: 0px;
  }
  .anotherLogin{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 20px;
  }

  .anotherLogin a.registerBtn{
      font-size: 14px;
  }

  .anotherLogin .wxLogin img{
      vertical-align: middle;
      cursor: pointer;
  }
</style>
