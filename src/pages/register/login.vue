<template>
    <div class="loginBox">

      <div class="nameBox">
        <el-input
          placeholder="请输入账号"
          v-model="account"
          clearable class="loginInput">
          <i slot="prefix" class="el-input__icon"></i>
        </el-input>
        <img class="login_people" src="../../assets/login_people.png">
      </div>

      <div class="pwdBox">
        <el-input
          placeholder="请输入密码"
          v-model="pwd"
          clearable class="loginInput" @keyup.enter.native="loginSubmit" show-password>
          <i slot="prefix" class="el-input__icon"></i>
        </el-input>
        <img class="login_pwd" src="../../assets/login_pwd.png">
        <p class="login-error" v-if="msg">{{msg}} !</p>

      </div>


      <div class="loginBtnBox">
        <el-checkbox v-model="auto" class="autoLogin">下次自动登录</el-checkbox>
        <router-link class="forgetBtn regretBtn" to="/find">忘记密码</router-link>
        <router-link class="registerBtn regretBtn" to="/register/phone_1">注册</router-link>
      </div>

      <el-button class="loginBtn" type="warning" round @click="loginSubmit">登录</el-button>

      <div class="anotherLogin">
          <div class="wxLogin">
            <p>使用第三方账号登录</p>
            <img src="../../assets/WeChat_active.png" alt="" @click="wxlogin()">
          </div>
      </div>
      <!--<a id="target" style="display: none" target="_blank"></a>-->
      <transition name="el-fade-in-linear">
        <div class="shadeBox" v-show="blank!=''">
          <div class="contentBox" id="wxCodeBox">
            <iframe :src="blank" width="430" height="420" scrolling="no" frameborder="0"></iframe>
            <p>微信扫描二维码登录</p>
          </div>
        </div>
      </transition>
    </div>
</template>

<script>
    import axios from "axios"
    export default {
        name: "login",
        data () {
            return {
                account:'',
                pwd:'',
                auto:'',
                msg:'',
                blank:''
            }
        },
        methods:{
            wxlogin(){
                axios.get('/home/weixin_login_qrcode'
                ).then((response)=> {
                    if(response.data.ret == 0){
                        this.loginStatus(response.data.data.scene_id);
                        this.blank=response.data.data.qrcode;
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
                            this.blank = '';
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

            loginSubmit () {
                // let formData = new FormData(this.form)
                if(this.auto = true){
                    localStorage.setItem('user',this.account);
                    localStorage.setItem('pwd',JSON.stringify(this.pwd));
                    this.auto = !this.auto
                }
                axios({
                    method: 'post',
                    url: '/home/login',
                    headers:{
                        'Content-type': 'application/x-www-form-urlencoded'
                    },
                    data:{
                        account:this.account,
                        password:this.pwd
                    },
                    transformRequest: [function (data) {
                        let ret = ''
                        for (let it in data) {
                            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                        }
                        return ret
                    }]
                }).then((response)=> {
                    if(response.data.ret == 0){
                        if(this.account.match(/^[1][3,4,5,7,8][0-9]{9}$/)){
                            localStorage.setItem('method','phone');
                        }else if(this.account.match(/^\w+@\w+\.com$/)){
                            localStorage.setItem('method','email');
                        }
                        localStorage.setItem('user_id',JSON.stringify(response.data.data.user_id));
                        localStorage.setItem('user',this.account);
                        localStorage.setItem('createAt', new Date().getTime());
                        this.login = false;
                        this.log_btn = false;
                        this.$router.push('/control/list')
                    }else{
                        this.msg = response.data.msg
                    }
                })
            },
        },
        mounted(){
            if(localStorage.user){
                this.account = localStorage.getItem("user").replace("\"","").replace("\"","")
                if(localStorage.pwd){
                    this.pwd = localStorage.getItem("pwd").replace("\"","").replace("\"","")
                }
            }
            if(localStorage.getItem('enter')){
                localStorage.removeItem('enter')
            }
        },
    }
</script>
<style>
    /*输入框*/
    .loginBox .loginInput .el-input__inner{
        font-size: 16px;
      border-top: none;
      border-left: none;
      border-right: none;
      border-radius: 0px;
      background: #fff;
    }
    .loginBox .loginInput .el-input__inner:focus{
      border-color:  #ED9515;
    }
    /*复选框*/
    .loginBox .loginBtnBox .el-checkbox__label{
      font-size:12px;
      font-family:PingFang-SC-Light;
      font-weight:bold;
      color:rgba(50,49,49,1);
    }
    .loginBox .loginBtnBox .el-checkbox__input{
        line-height: 16px;
    }
</style>
<style scoped>
    .loginBox{
      text-align: center;
      position: relative;
      width: 328px;
      margin: auto;
    }

    .loginBox .nameBox{
      position: relative;
    }

    .loginBox .nameBox .login_people{
      width: 16px;
      height: 20px;
      position: absolute;
      top: 7px;
      left: 2px;
    }

    .loginBox .pwdBox{
      position: relative;
    }

    .loginBox .pwdBox .login_pwd{
      width: 16px;
      height: 20px;
      position: absolute;
      top: 6px;
      left: 2px;
    }

    .loginBox .loginInput{
      width: 324px;
      margin-bottom: 20px;
      /*margin-left: 64px;*/
    }


    .loginBox  .login-error{
        font-size: 14px;
        line-height: 14px;
        color: #fd4444;
        text-align: left;
        margin:-5px 0 10px
    }
    .loginBox  .loginBtnBox,
    .anotherLogin{
      width: 324px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: auto;
    }

    .loginBox .anotherLogin{
      margin-top: 82px;
    }

    .loginBox .anotherLogin .wxLogin{
      height: 32px;
      line-height: 32px;
      display: flex;
    }

    .loginBox .anotherLogin .wxLogin p{
      font-size:12px;
      font-family:PingFang-SC-Light;
      font-weight:bold;
      color:rgba(50,49,49,1);
    }

    .loginBox .anotherLogin .wxLogin img{
      margin-left: 20px;
      cursor: pointer;
    }

    .loginBox  .loginBtnBox .autoLogin{
      margin-bottom: 0;
    }

    .loginBox .loginBtnBox .regretBtn{
      font-size:12px;
      font-family:PingFang-SC-Regular;
      font-weight:bold;
      color:rgba(50,49,49,1);
      opacity:0.6;
      text-decoration: none;
    }

    .loginBox .loginBtnBox .forgetBtn{
      margin-right: -86px;
    }

    .loginBox .loginBtnBox .registerBtn{
      border-left: 1px silver solid;
      padding-left: 10px;
    }

    .loginBox .loginBtn{
      margin-top: 36px;
      width: 326px;
      height: 36px;
      line-height: 10px;
      font-size: 18px;
      color: #fff;
      background-color: #ED9515 !important;
    }

  /*遮罩*/
  .loginBox .shadeBox{
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 1999;
    background: rgba(0,0,0,0.3);
  }

  .loginBox .shadeBox .contentBox{
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

  .loginBox .shadeBox .contentBox p{
    line-height: 14px;
    text-align: center;
  }
</style>
