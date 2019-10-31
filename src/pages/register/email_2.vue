<template>

  <div class="email">
    <div class="emailNum">

      <el-input
        placeholder="邮箱"
        v-model="form.email"
        :disabled="true">
        <i slot="prefix" class="el-input__icon"></i>
      </el-input>
      <img class="login_email_tabs" src="../../assets/login_email_tabs.png">

    </div>

    <div class="nameBox">
      <el-input
        placeholder="请输入验证码"
        v-model="form.code"
        clearable class="registerInput registerName">
        <i slot="prefix" class="el-input__icon"></i>
      </el-input>
      <img class="login_code" src="../../assets/login_phot_validation.png">
    </div>

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
      <div class="pwdError">{{msg}}</div>
    </div>

    <el-checkbox v-model="state" class="agreementBox">
      已阅读<router-link to="/agreement">非幕平台服务协议</router-link>、<router-link to="/privacyProtocol">保密协议</router-link>
    </el-checkbox>
    <el-button type="warning" round class="btn" @click="submitemail">确认并登录</el-button>
  </div>

</template>

<script>
    import axios from "axios"
    export default {
        name: "email_2",
        data() {
            return {
                form: {
                    email: this.$route.query.email,
                    name: '',
                    password: '',
                    code:''
                },
                state:true,
                msg:''
            }
        },
        methods:{
          submitemail(){
            if(this.state){
                if(this.$route.query.invite_code&&this.$route.query.invite_code!='undefined'){
                    this.form.invite_code = this.$route.query.invite_code
                }
              axios({
                url:'/home/signup_email',
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
                  this.msg='注册成功，正在登录'
                  axios({
                    method: 'post',
                    url: '/home/login',
                    headers:{
                      'Content-type': 'application/x-www-form-urlencoded'
                    },
                    data:{
                      account:this.form.email,
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
                      localStorage.setItem('user',this.form.email);
                      localStorage.setItem('enter','1');
                      localStorage.removeItem('register_info')
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
          //测试密码强度
          testing(){
            var spanDoms = document.querySelectorAll('#tips>.tipsSelect>span');
            // this.form.password.onkeyup = function(){
            //获取用户输入的密码,然后判断其强度 返回0 或者 1 2 3 4
            var index = checkPassWord(this.form.password);
            for(var i = 0; i <spanDoms.length; i++){
              spanDoms[i].className = "";//清空span标签所有的class样式
              if(index){//0 代表false 其余代表true
                spanDoms[index-1].className = "s" + index ;
              }
            }
            // }
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
        },
        mounted(){
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

        }
    }
</script>
<style src="../../css/el-message-box.css"></style>

<style>
  .email .el-input__inner{
    font-size: 16px;
    border-top: none;
    border-left: none;
    border-right: none;
    border-radius: 0px;
  }

</style>

<style scoped>

    .email{
      width: 328px;
      margin: auto;
    }

    .email .registerInput{
      margin: 10px 0;
      margin-bottom: 28px !important;
    }

    .email .btn{
      width:324px;
      height:36px;
      background:rgba(237,149,21,1);
      border-radius:16px;
    }

    .email .emailNum{
      position: relative;
      margin-bottom: 20px;
    }

    .email .emailNum .login_email_tabs{
      width: 18px;
      height: 18px;
      position: absolute;
      top: 12px;
      left: 0;
    }

    .email .nameBox .login_code{
      width: 16px;
      height: 20px;
      position: absolute;
      top: 20px;
      left: 2px;
    }

    .email .nameBox{
      position: relative;
    }

    .email .nameBox .login_card{
      width: 21px;
      height: 14px;
      position: absolute;
      top: 24px;
      left: 0;
    }

    .email .pwdBox{
      position: relative;
    }

    .email .pwdBox .login_pwd{
      width: 18px;
      height: 18px;
      position: absolute;
      top: 21px;
      left: 0;
    }

    .email .pwdBox .registerPwd{
      margin-bottom: 10px;
    }

    .email .pwdBox .pwdError{
      color: #fd4444;
      position: absolute;
      top: 105px;
    }


  /*密码强度*/
    .email .pwdBox #tips{
      font-size: 12px;
      width: 100%;
      height: 25px;
    }
    .email .pwdBox #tips span{
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
    .email .pwdBox #tips .s1{
      background: #F45A68;
    }/*红色*/
    .email .pwdBox #tips .s2{
      background: #fc0;
    }/*橙色*/
    .email .pwdBox #tips .s3{
      background: #cc0;
    }/*黄色*/
    .email .pwdBox #tips .s4{
      background: #14B12F;
    }/*绿色*/

    .email .agreementBox{
      margin: 20px 0;
    }

    .email .agreementBox a{
      text-decoration: none;
    }

    .email .agreementBox a:hover{
      color: #3b85f5;
    }
</style>
