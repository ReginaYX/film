<template>
    <div class="find_box">
        <div class="findBox_title">修改密码</div>
        <div class="phoneFind_main">


          <div class="photoInpt">
            <el-input
              :disabled="true"
              placeholder="请输入手机号"
              v-model="form.phone"
              clearable class="registerInput iphoneInput">
              <i slot="prefix" class="el-input__icon"></i>
            </el-input>
            <img class="login_phone_tabs" src="../../assets/login_phone_tabs.png">
          </div>


          <div class="codeBox">
            <el-input type="text" class="account" placeholder="请输入验证码" v-model="form.code">
              <el-button slot="append" v-if="sendMsgDisabled" class="verification">{{time}}秒后获取</el-button>
              <el-button slot="append" v-else @click="code" class="verification">获取验证码</el-button>
              <i slot="prefix" class="el-input__icon"></i>
            </el-input>
            <img class="login_phot_validation" src="../../assets/login_phot_validation.png">

          </div>

          <div class="pwdBox">

            <el-form :model="form" status-icon :rules="rules2" ref="form" label-width="100px" class="demo-ruleForm pwdSafe">
              <el-form-item label="" prop="password">
                <el-input type="password"
                          placeholder="请输新入密码"
                          v-model="form.password"
                          class="registerInput registerPwd"
                          @change="testing"
                          minlength="6"
                          show-password
                          autocomplete="off">
                  <i slot="prefix" class="el-input__icon"></i>
                </el-input>
                <img class="login_pwd" src="../../assets/login_pwd.png">

                <div id="tips">
                  <div class="tipsSelect">
                    <div class="tipsBox"></div>
                    <span>弱</span>
                  </div>
                  <div class="tipsSelect">
                    <div class="tipsBox"></div>
                    <span>中</span>
                  </div>
                  <div class="tipsSelect">
                    <div class="tipsBox"></div>
                    <span>强</span>
                  </div>
                </div>
              </el-form-item>
              <el-form-item label="" prop="confirmPWD">
                <el-input type="password"
                          placeholder="确认密码"
                          v-model="form.confirmPWD"
                          autocomplete="off"
                          class="pwdChange_input">
                  <i slot="prefix" class="el-input__icon"></i>
                </el-input>
                <img class="login_pwd" src="../../assets/login_pwd.png">
              </el-form-item>

            </el-form>
          </div>

            <span class="error">{{error}}</span>
            <el-button type="warning" round class="findNext_btn" @click="submit" :plain="true">马上登录</el-button>
        </div>
    </div>
</template>

<script>
    import axios from "axios"
    export default {
        name: "phoneFind",
        data(){
          //密码二次验证
          var validatePass = (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请输入密码'));
            } else {
              if (this.form.confirmPWD  !== '') {
                this.$refs.form.validateField('confirmPWD');
              }
              callback();
            }
          };
          var validatePass2 = (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请再次输入密码'));
            } else if (value !== this.form.password) {
              callback(new Error('两次输入密码不一致!'));
            } else {
              callback();
            }
          };
          return{
            activeName: 'phone',
            time: 60, // 发送验证码倒计时
            sendMsgDisabled: false,
            form:{
              phone:this.$route.query.phone,
              code:'',
              password:'',
              confirmPWD:''
            },
            // confirmPWD:'',
            error:'',
            title:false,
            rules2: {
              password: [
                { validator: validatePass, trigger: 'blur' }
              ],
              confirmPWD: [
                { validator: validatePass2, trigger: 'blur' }
              ],
            },
          };


        },
        methods: {
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
              // if(value.length < 6){
              //     return modes;
              // }
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
            code() {
                this.sendMsgDisabled = true;
                var auth_timetimer = setInterval(() => {
                    this.time--;
                    if (this.time <= 0) {
                        this.time = 60;
                        this.sendMsgDisabled = false;
                        clearInterval(auth_timetimer);
                    }
                }, 1000);
                let form = new FormData()
                form.append('phone', this.form.phone)
                axios({
                    method: 'post',
                    url: '/sms/password_forget',
                    data:form
                }).then((response) => {})
            },
            submit(){
                if(this.form.code!=='' && this.error == ''){
                    if(this.form.confirmPWD == this.form.password){
                        axios({
                            method: 'post',
                            url: '/home/password_reset_sms',
                            data:{
                                'phone':this.form.phone,
                                'code':this.form.code,
                                'password':this.form.password
                            },
                            transformRequest: [function (data) {
                                let ret = ''
                                for (let it in data) {
                                    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                                }
                                return ret
                            }],
                            headers:{
                                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                                'Accept':'*/*'
                            }
                        }).then((response) => {
                            if(response.data.ret == 0){
                                this.$message({
                                    message: '修改成功，正在登录',
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
                                        localStorage.setItem('user_id',JSON.stringify(response.data.data.user_id));
                                        localStorage.setItem('user',JSON.stringify(this.form.phone));
                                        localStorage.setItem('createAt', new Date().getTime());
                                        localStorage.removeItem('findPhone')
                                        this.$router.push('/control/list')
                                    }else{
                                        this.msg = response.data.msg
                                    }
                                })
                            }else{
                                this.error = response.data.msg
                            }
                        })
                    }else{
                        this.error = '两次密码不一致，请重新输入'
                    }
                }else{
                    this.error = '请填写完整'
                }
            }
        }
    }
</script>

<style>
  .find_box .phoneFind_main .el-input__inner{
    font-size: 16px;
    border-top: none;
    border-left: none;
    border-right: none;
    border-radius: 0px;
    background: none!important;
  }

  .find_box .codeBox .el-input__inner{
    height: 100%;
    padding-left: 30px;
  }

  .find_box .phoneFind_main  .el-input__suffix{
    top: 2px;
  }

  .find_box .phoneFind_main .el-form-item__content{
    margin-left: 0px !important;
  }

  .find_box .phoneFind_main .el-input-group__append{
    border: none;
    border-bottom: 1px solid rgb(220, 223, 230);
    border-radius: 0;
    background: #fff;
  }
</style>

<style scoped>

  .find_box .phoneFind_main .error{
        font-size: 14px;
        color: #fd4444;
        font-family: 新宋体;
        position: absolute;
        top: 314px;
        left: 0px;
    }
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

    .find_box .phoneFind_main {
      position: relative;
    }

    .find_box .phoneFind_main .photoInpt{
      position: relative;
    }

    .find_box .phoneFind_main .photoInpt .login_phone_tabs{
      width: 14px;
      height: 22px;
      position: absolute;
      top: 10px;
      left: 2px;
    }

    .find_box .phoneFind_main .photoInpt .iphoneInput{
      margin-bottom: 28px !important;
    }

    .find_box .phoneFind_main .codeBox{
      margin: 10px 0;
      margin-bottom: 38px;
      position: relative;
    }

    .find_box .phoneFind_main .codeBox .login_phot_validation{
      width: 16px;
      height: 20px;
      position: absolute;
      top: 10px;
      left: 2px;
    }

  .find_box .phoneFind_main .pwdBox .pwdSafe{
    padding: 0;
  }

    .find_box .phoneFind_main .codeBox .account{
      /*width:325px;*/
      height: 40px;
    }

    .find_box .phoneFind_main .codeBox .account .verification{
      background-color: #fff;
      font-size:10px;
      font-family:PingFang-SC-Regular;
      font-weight:bold;
      color:rgba(237,149,21,1);
      border: none;
      background: #fff;
    }

    .find_box .phoneFind_main .pwdBox{
      position: relative;
    }

    .find_box .phoneFind_main .pwdBox .login_pwd{
      width: 18px;
      height: 18px;
      position: absolute;
      top: 10px;
      left: 2px;
    }

    .find_box .phoneFind_main .pwdBox .registerPwd{
      margin-bottom: 10px;
      width: 100% !important;
    }

    .find_box .phoneFind_main .pwdBox .pwdError{
      color: #fd4444;
      position: absolute;
      top: 74px;
    }

    .find_box .phoneFind_main .pwdBox #tips{
      font-size: 12px;
      width: 100%;
      height: 25px;
    }
    .find_box .phoneFind_main .pwdBox #tips span{
      float: left;
      width: 20%;
      height: 20px;
      color: #fff;
      overflow:hidden;
      margin-right: 10px;
      background: #D7D9DD;
      line-height:20px;
      text-align: center;
      border-radius: 5px;
    }
    .find_box .phoneFind_main .pwdBox #tips .s1{
      background: #F45A68;
    }/*红色*/
    .find_box .phoneFind_main .pwdBox #tips .s2{
      background: #fc0;
    }/*橙色*/
    .find_box .phoneFind_main .pwdBox #tips .s3{
      background: #cc0;
    }/*黄色*/
    .find_box .phoneFind_main .pwdBox #tips .s4{
      background: #14B12F;
    }/*绿色*/

    .find_box .phoneFind_main .findNext_btn {
      width: 327px;
      height: 36px;
      background: rgba(237, 149, 21, 1);
      border-radius: 16px;
      font-size:14px;
      font-family:PingFang-SC-Medium;
      font-weight:bold;
      color:rgba(255,255,255,1);
      margin-top: 18px;
    }

</style>
