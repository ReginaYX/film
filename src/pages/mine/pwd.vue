<template>
  <div class="pwdCard">
    <el-card class="box-card" shadow="never">
      <p style="font-size: 18px;font-family: Microsoft Yahei, 微软雅黑;color: #333;margin-left: 30px;margin-bottom: 40px">安全及登录</p>
      <li>
        <p>绑定手机</p>
        <span v-if="phone">{{phone}}</span>
        <span v-else>未绑定手机，绑定后可使用该邮箱直接登录</span>
        <el-button type="text" @click="phoneFormVisible = true" v-if="phone" class="binding_btn">更换</el-button>
        <el-button type="text" @click="phoneFormVisible = true" v-else class="binding_btn">绑定</el-button>
        <el-dialog title="绑定手机号" :visible.sync="phoneFormVisible" class="binding_phone pwdDialog">
          <el-form :model="phoneForm">
            <el-form-item label="手机号码">
              <el-input v-model="phoneForm.phone" auto-complete="off" class="pwdPhone_input"></el-input>
            </el-form-item>
            <el-form-item label="验证码" >
              <el-input v-model="phoneForm.code" auto-complete="off" class="phone_input"></el-input>
              <el-button type="primary" @click="code" class="phone_code" v-if="sendMsgDisabled">{{time}}秒后获取</el-button>
              <el-button type="primary" @click="code" class="phone_code" v-else>获取验证码</el-button>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="phoneBind">确 定</el-button>
          </div>
        </el-dialog>
      </li>
      <li>
        <p>绑定邮箱</p>
        <span v-if="email">{{email}}</span>
        <span v-else>未绑定邮箱，绑定后可使用该邮箱直接登录</span>
        <el-button type="text" @click="emailFormVisible = true" v-if="email" class="binding_btn">更换</el-button>
        <el-button type="text" @click="emailFormVisible = true" v-else class="binding_btn">绑定</el-button>
        <el-dialog title="绑定邮箱" :visible.sync="emailFormVisible" class="email pwdDialog">
          <el-form>
            <el-form-item label="邮箱"  class="pwdEmail">
              <el-input v-model="emailForm" auto-complete="off" class="pwdEmail_input"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="emailBind">去验证</el-button>
          </div>
        </el-dialog>
      </li>
      <li>
        <p>绑定微信</p>
        <span v-if="source=='weixin'">{{name}}</span>
        <span v-else-if="bindWechat">已绑定</span>
        <span v-else>未绑定微信，绑定后可使用该微信直接登录</span>
        <el-button type="text" @click="wchat" class="binding_btn" v-if="source!=='weixin' && bindWechat==false">绑定</el-button>
      </li>
    </el-card>
    <div class="em" style="width: 100%;height: 1px;background: #ddd"></div>
    <el-card class="box-card" shadow="never">
      <p style="font-size: 18px;font-family: Microsoft Yahei, 微软雅黑;color: #333;margin-left: 30px;margin-bottom: 38px">密码安全</p>
      <el-form :model="form" status-icon :rules="rules2" ref="form" label-width="100px" class="demo-ruleForm pwdSafe">
        <el-form-item label="初始密码" prop="password_old">
          <el-input type="password" v-model="form.password_old" auto-complete="off" class="pwdChange_input"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="password_new">
          <el-input type="password" v-model="form.password_new" auto-complete="off" class="pwdChange_input"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="form.checkPass" auto-complete="off" class="pwdChange_input"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')" style="" class="pwdChange_btn">保存</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <div class="em" style="width: 100%;height: 1px;background: #ddd"></div>
    <el-card class="box-card" shadow="never">
      <p style="font-size: 18px;font-family: Microsoft Yahei, 微软雅黑;color: #333;margin-left: 30px;margin-bottom: 38px">二级密码保护</p>
      <el-form :model="secondForm" status-icon :rules="rules3" ref="secondForm" label-width="100px" class="demo-ruleForm pwdSafe">
        <el-form-item label="初始密码" prop="password_old" >
          <el-input type="password" v-model="secondForm.password_old" auto-complete="off" class="pwdChange_input"></el-input>
          <span class="forgetPwd" @click="dialogForgetSecond = true">忘记密码</span>
        </el-form-item>
        <el-form-item label="新密码" prop="password_new">
          <el-input type="password" v-model="secondForm.password_new" auto-complete="off" class="pwdChange_input"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="secondForm.checkPass" auto-complete="off" class="pwdChange_input"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitSecond('secondForm')" style="" class="pwdChange_btn">保存</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-dialog title="忘记二级密码" :visible.sync="dialogForgetSecond" class="binding_phone pwdDialog secondDialog">
      <el-form :model="formSecond" status-icon :rules="rules4" ref="formSecond">
        <el-form-item label="手机号码" >
          <el-input v-model="this.phone" auto-complete="off" class="pwdPhone_input"  :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="验证码" >
          <el-input v-model="formSecond.code" auto-complete="off" class="phone_input"></el-input>
          <el-button type="primary" @click="code" class="phone_code" v-if="sendMsgDisabled">{{time}}秒后获取</el-button>
          <el-button type="primary" @click="getNdPwdCode" class="phone_code" v-else>获取验证码</el-button>
        </el-form-item>
        <el-form-item label="新密码" prop="password_new">
          <el-input type="password" v-model="formSecond.passwordNewSecond" auto-complete="off" class="pwdChange_input pwdNdInput"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="formSecond.checkPass" auto-complete="off" class="pwdChange_input pwdNdInput"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="psdNdForget('formSecond')">确 定</el-button>
      </div>
    </el-dialog>
    <a href="" style="display: none" id="emaillogin"></a>
  </div>
</template>

<script>
    import axios from "axios"
    export default {
        name: "password",
        data () {
          var validatePass = (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请输入密码'));
            } else {
              if (this.form.checkPass  !== '') {
                this.$refs.form.validateField('checkPass');
              }
              callback();
            }
          };
          var validatePass2 = (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请再次输入密码'));
            } else if (value !== this.form.password_new) {
              callback(new Error('两次输入密码不一致!'));
            } else {
              callback();
            }
          };
            var validatePass3 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.secondForm.checkPass  !== '') {
                        this.$refs.form.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validatePass4 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.secondForm.password_new) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            var validatePass5 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.secondForm.checkPass  !== '') {
                        this.$refs.formSecond.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validatePass6 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.formSecond.passwordNewSecond) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
          return {
              activeName:'first',
              dialogForgetSecond:false,
              phoneFormVisible:false,
              emailFormVisible:false,
              phoneForm:{
                  phone:'',
                  code:'',
              },
              emailForm:'',
              error:'',
            form:{
              user_id:'',
              password_old:'',
              password_new:'',
              checkPass :'',
            },
            formSecond:{
                code:'',
                passwordNewSecond:'',
                checkPass :'',
            },
              rules4: {
                  password_new: [
                      { validator: validatePass5, trigger: 'blur' }
                  ],
                  checkPass: [
                      { validator: validatePass6, trigger: 'blur' }
                  ],
              },
              secondForm:{
                  password_old:'',
                  password_new:'',
                  checkPass:''
              },
              rules3: {
                  password_new: [
                      { validator: validatePass3, trigger: 'blur' }
                  ],
                  checkPass: [
                      { validator: validatePass4, trigger: 'blur' }
                  ],
              },
              secondPwdCode:'',
            time: 60, // 发送验证码倒计时
            sendMsgDisabled: false,
            phone : '',
            email : '',
            rules2: {
              password_new: [
                { validator: validatePass, trigger: 'blur' }
              ],
              checkPass: [
                { validator: validatePass2, trigger: 'blur' }
              ],
            },
            form1: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            },
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
              source:'',
              name:'',
              bindWechat:false
          };
        },
        methods:{
            psdNdForget(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let form = new FormData()
                        form.append('user_id', this.form.user_id)
                        form.append('secondary_password', this.formSecond.passwordNewSecond)
                        form.append('code', this.formSecond.code)
                        axios.post('/account/secondary_password_forget', form
                        ).then((response) => {
                            if (response.data.msg == 'ok') {
                                this.$message({
                                    message: '修改成功',
                                    type: 'success'
                                });
                                this.dialogForgetSecond = false
                            } else {
                                this.$alert(response.data.msg, '提示', {
                                    confirmButtonText: '确定',
                                    confirmButtonClass: 'aloneConfirmButton'
                                });
                            }
                        })
                    } else {
                        return false;
                    }
                });

            },
            pwdNewSecond(){
                let form = new FormData()
                form.append('user_id', this.form.user_id)
                form.append('secondary_password', this.formSecond.passwordNewSecond)
                form.append('code', this.secondPwdCode)
                axios.post('/account/secondary_password_forget', form
                ).then((response) => {
                    if (response.data.msg == 'ok') {
                        this.$message({
                            message: '修改成功',
                            type: 'success'
                        });
                    } else {
                        this.$alert(response.data.msg, '提示', {
                            confirmButtonText: '确定',
                            confirmButtonClass: 'aloneConfirmButton'
                        });
                    }
                })
            },
            getNdPwdCode(){
                let form = new FormData()
                form.append('user_id', this.form.user_id)
                axios({
                    method: 'get',
                    url: '/sms/secondary_password_forget?user_id='+this.form.user_id,
                    headers:{
                        'Content-type': 'application/x-www-form-urlencoded'
                    }
                }).then((response) => {
                    if (response.data.msg == 'ok') {
                        this.sendMsgDisabled = true;
                        var auth_timetimer = setInterval(() => {
                            this.time--;
                            if (this.time <= 0) {
                                this.time = 60;
                                this.sendMsgDisabled = false;
                                clearInterval(auth_timetimer);
                            }
                        }, 1000);
                    } else {
                        this.$alert(response.data.msg, '提示', {
                            confirmButtonText: '确定',
                            confirmButtonClass: 'aloneConfirmButton'
                        });
                    }
                })
            },
          wchat(){
              axios.get('/account/weixin_bind_qrcode'
              ).then((response)=> {
                  if(response.data.ret == 0){
                      document.getElementById('emaillogin').href=response.data.data
                      document.getElementById('emaillogin').click()
                  }else{
                      this.$alert('请重新尝试微信登录', '提示', {
                          confirmButtonText: '确定',
                          confirmButtonClass: 'aloneConfirmButton'
                      });
                  }
              })
          },
            submitSecond(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        var form = new FormData();
                        form.append('user_id',this.form.user_id);
                        form.append('secondary_password_old',this.secondForm.password_old);
                        form.append('secondary_password_new',this.secondForm.password_new);
                        axios({
                            method: 'post',
                            url: '/account/secondary_password_update',
                            data:form,
                            headers:{
                                'Content-type': 'application/x-www-form-urlencoded'
                            }
                        }).then((response)=> {
                            if(response.data.msg =='ok'){
                                this.$message({
                                    message: '修改成功',
                                    type: 'success'
                                });
                            }else{
                                this.$alert(response.data.msg, '提示', {
                                    confirmButtonText: '确定',
                                    confirmButtonClass: 'aloneConfirmButton'
                                });
                            }

                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
          submitForm(formName) {
            this.$refs[formName].validate((valid) => {
              if (valid) {
                var form = new FormData();
                form.append('user_id',this.form.user_id);
                form.append('password_old',this.form.password_old);
                form.append('password_new',this.form.password_new);
                  axios({
                  method: 'post',
                  url: '/account/password_update',
                  data:form,
                  headers:{
                    'Content-type': 'application/x-www-form-urlencoded'
                  }
                }).then((response)=> {
                  if(response.data.msg =='ok'){
                      this.$alert('修改成功', '提示', {
                          confirmButtonText: '确定',
                          confirmButtonClass: 'aloneConfirmButton'
                      });
                  }else{
                      this.$alert(response.data.msg, '提示', {
                          confirmButtonText: '确定',
                          confirmButtonClass: 'aloneConfirmButton'
                      });
                  }

                })
              } else {
                return false;
              }
            });
          },
          resetForm(formName) {
            this.$refs[formName].resetFields();
          },
          code() {
              let form = new FormData()
              form.append('phone', this.phoneForm.phone)
              axios.post('/sms/bind_phone', form
              ).then((response) => {
                  if (response.data.msg == 'ok') {
                    this.sendMsgDisabled = true;
                    var auth_timetimer = setInterval(() => {
                      this.time--;
                      if (this.time <= 0) {
                        this.time = 60;
                        this.sendMsgDisabled = false;
                        clearInterval(auth_timetimer);
                      }
                    }, 1000);
                  } else {
                      this.$alert(response.data.msg, '提示', {
                          confirmButtonText: '确定',
                          confirmButtonClass: 'aloneConfirmButton'
                      });
                  }
              })
          },
          phoneBind(){
              let form = new FormData()
              form.append('phone', this.phoneForm.phone)
              form.append('code', this.phoneForm.code)
              form.append('user_id', JSON.parse(localStorage.user_id))
              axios.post('/account/bind_phone', form
              ).then((response) => {
                  if (response.data.msg == 'ok') {
                      this.$message({
                          message: '绑定成功',
                          type: 'success'
                      });
                      this.phoneFormVisible = false
                      if(localStorage.getItem("method")== 'phone'){
                          this.$router.push('/')
                          localStorage.removeItem('user_id')
                      }else{
                          this.$router.go(0)
                      }
                  } else {
                      this.$alert(response.data.msg, '提示', {
                          confirmButtonText: '确定',
                          confirmButtonClass: 'aloneConfirmButton'
                      });
                  }
              })
          },
          emailBind(){
              let form = new FormData()
              form.append('email', this.emailForm)
              form.append('user_id', JSON.parse(localStorage.user_id))
              axios.post('/email/bind_email', form
              ).then((response) => {
                  if (response.data.msg == 'ok') {
                      console.log(response.data.data)
                      var _mail = this.emailForm.split('@')[1];    //获取邮箱域
                      for (var j in this.hash){
                          if(j == _mail){
                              document.getElementById('emaillogin').href=this.hash[_mail]
                              document.getElementById('emaillogin').click()
                              return
                          }else{
                              this.$alert('请手动登录邮箱', '提示', {
                                  confirmButtonText: '确定',
                                  confirmButtonClass: 'aloneConfirmButton'
                              });
                              return
                          }
                      }

                  } else {
                      this.$alert(response.data.msg, '提示', {
                          confirmButtonText: '确定',
                          confirmButtonClass: 'aloneConfirmButton'
                      });
                  }
              })
              this.emailFormVisible = false
          }
        },
        mounted(){
            if(localStorage.user_id){
                this.form.user_id = localStorage.getItem("user_id").replace("\"","").replace("\"","")
            }else {
                this.$alert('登录已超时，请重新登录', '提示', {
                    confirmButtonText: '确定',
                    confirmButtonClass: 'aloneConfirmButton'
                });
                this.$router.push('/')
            }
            axios({
                method: 'get',
                url: '/user/info?user_id='+this.form.user_id,
                headers:{
                    'Content-type': 'application/x-www-form-urlencoded'
                }
            }).then((response)=> {
                this.phone = response.data.data.phone
                this.email = response.data.data.email
                this.source = response.data.data.source
                this.name = response.data.data.name
                this.bindWechat = response.data.data.whether_weixin_bind
            })

          // 页面跳转tabs修复
          if (this.$route.path == '/mine/pwd') {

            var tradingCenter = document.getElementsByClassName('tradingCenter');

            tradingCenter[0].style = '';
          }
        }
    }
</script>
<style src="../../css/el-message-box.css"></style>

<style>
  .pwdCard .el-form-item__error{
    left: 20px!important;
  }
  .pwdCard .el-input__suffix{
    right: -80px!important;
  }
  .pwdNdInput .el-input__suffix{
    right: 60px!important;
  }
  .binding_phone .el-dialog .el-dialog__body .el-form .el-form-item__content{
    margin-left: 86px!important;
  }

  .pwdSafe .el-form-item .el-form-item__content .el-input{
    width: 260px!important;
  }
  .pwdEmail .el-form-item__label{
    width: 82px!important;
  }
  .pwdEmail .el-form-item__content{
    margin-left: 86px!important;
  }

  .pwdCard .el-form-item__label{
    font-size: 16px!important;
    color: #999!important;
    font-family: Microsoft Yahei, 微软雅黑;
    font-weight: normal;
    padding: 0!important;
    margin-right: 20px;
  }

  .pwdCard .el-button--primary{
    width: 100px;
    height: 40px;
    background: #ED9515;
    border-color: #ED9515;
  }

  .pwdChange_btn:hover{
    background: #ED9515!important;
    border-color: #ED9515!important;
  }
  .pwdCard .el-button--text span{
    font-size: 18px;
  }
  .pwdDialog .el-dialog{
    margin-top: 25vh!important;
    width: 600px!important;
    height: 400px!important;
    padding: 40px 50px 72px;
    border-radius: 5px!important;
  }

  .pwdDialog .el-dialog__header{
    height: 58px;
    padding: 0!important;
    border-bottom: 1px solid #ddd;
  }
  .pwdDialog .el-dialog__title{
    line-height: 58px!important;
    /*margin-left: 50px;*/
    height: 58px!important;
    font-size: 18px!important;
  }
  .pwdDialog .el-dialog__headerbtn{
    right: 97px!important;
    top: 56px!important;
  }
  .pwdDialog .el-dialog__headerbtn .el-dialog__close{
    font-size: 25px;
  }
  .pwdDialog .el-dialog__headerbtn .el-dialog__close:hover{
    color: #fd4444!important;
  }
  .pwdDialog .el-dialog__body{
    padding: 40px 0 0!important;
  }
  .secondDialog .el-dialog{
    height: 500px!important;
  }
  .pwdDialog .el-form-item__label{
      width: 66px!important;
    line-height: 40px;
  }
  .pwdCard .el-form-item{
    margin-bottom: 24px!important;
  }
  .pwdCard .el-form-item .el-form-item__content{
    margin-left: 86px;
  }
  .pwdPhone_input .el-input__inner,
  .pwdEmail_input .el-input__inner,
  .pwdChange_input .el-input__inner,
  .phone_input .el-input__inner{
    width: 350px!important;
    height: 40px;
    background: #f9f9f9!important;
    border: 1px solid #ddd;
    border-radius: 5px;
  }

  .pwdCard .el-input__inner:focus{
    background: #fff!important;
    border-color: #ddd!important;
  }
  .phone_input .el-input__inner,.phone_input{
    width: 240px!important;
  }
  .pwdCard  .phone_code{
    width: 84px;
    height: 40px;
    background: #f9f9f9!important;
    margin-left: 5px!important;
    border-radius: 5px!important;
    padding: 0!important;
    border:none!important;
  }
  .phone_code:hover,.phone_code:focus{
    background-color: #f9f9f9!important;
  }
  .phone_code span{
    font-size: 14px;
    color: #459df5;
    font-family: 新宋体;
  }
  .pwdDialog .el-dialog__footer{
    text-align: center!important;
  }
  .pwdCard .dialog-footer .el-button--primary{
    width: 400px!important;
    border-radius: 20px;
  }
  .pwdCard .dialog-footer .el-button--primary:hover{
    background-color: #ED9515;
  }
  .email .el-dialog{
    height: 350px!important;
  }
  .pwdCard .box-card .el-card__body{
    padding-left: 5px!important;
  }
</style>
<style src="../../css/el-message-box.css"></style>
<style scoped>
.pwdSafe .el-form-item .el-form-item__content .pwdChange_btn{
  margin-left: 20px!important;
}
  .box-card{
    border: none;
    border-radius: initial;

  }
  .box-card li{
    display: flex;
    align-items: center;
    margin-bottom: 30px;
  }
  .box-card li:last-of-type{
    margin-bottom: 20px;
  }
  .box-card li p{
    margin-left: 36px;
    font-size: 16px;
    font-family: Microsoft Yahei, 微软雅黑;
    color: #999;
    margin-right: 40px;
  }
  .box-card li span{
    font-family: 新宋体;
    font-size: 16px;
    color: #666;
    width: 520px;
  }
  .box-card li .binding_btn{
    width: 120px;
    height: 40px;
    border-radius: 5px;
    background: #ED9515;
    color: #fff;
    font-size: 18px;
    padding: 0;
    cursor: pointer;
  }
  .box-card li .binding_btn:hover{
    background: #ED9515;
  }
  .forgetPwd{
    position: absolute;
    left: 400px;
    font-size:14px;
    cursor: pointer;
    color:rgba(109,109,109,1);
  }
</style>
