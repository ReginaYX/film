<template>
    <div>
        <logo></logo>
        <div class="find_title">
            <p>欢迎使用非幕制片！</p>

        </div>
        <div class="find_main">
            <div class="find_box">
                <div class="findBox_title">完善资料</div>
                <p class="complete_desc">为了保障你的帐户安全，请设置安全手机，同时该手机号也可以作为登陆账号使用</p>
                <div class="phoneFind_main">
                    <input type="text" v-model="form.phone" placeholder="手机号" @blur="testPhone">
                    <input type="text" placeholder="请输入验证码" v-model="form.code">
                    <div v-if="sendMsgDisabled" class="findPhone_code">{{time}}秒后获取</div>
                    <div v-else @click="code" class="findPhone_code">获取验证码</div>
                    <input type="password" placeholder="登录密码" v-model="form.password">
                    <span class="error">{{error}}</span>
                    <el-checkbox v-model="checked" class="complete_check">
                        同意<router-link to="/agreement" class="checkbox_desc">非幕科技注册协议</router-link>
                    </el-checkbox>
                    <div class="findNext_btn" @click="submit" :plain="true">完 成</div>
                </div>
            </div>

        </div>

    </div>
</template>

<script>
    import axios from "axios"
    import logo from "../common/logo";
    export default {
        name: "complete",
        components: {logo},
        data(){
            return{
                checked:true,
                time: 60, // 发送验证码倒计时
                sendMsgDisabled: false,
                form:{
                    phone:'',
                    code:'',
                    password:''
                },
                error:'',
                title:false,
                type: false,
            }
        },
        methods: {
            testPhone(){
                var phoneRule = /^[1][3,4,5,7,8][0-9]{9}$/;
                if(this.form.phone.match(/^[1][3,4,5,7,8][0-9]{9}$/)){
                    let form = new FormData()
                    form.append('account',this.form.phone)
                    axios.post('/account/check_exist',form
                    ).then((response)=> {
                        if(response.data.msg == '账号可用'){
                            this.error=''
                            return
                        }else if(response.data.msg == '账号已存在'){
                            this.error='该账号已存在'
                        }else {
                            this.error=response.data.msg
                        }
                    })
                }
                else{
                    this.error='输入的手机号格式不正确，请重新输入'
                }

            },
            code() {
                if(this.error == ''){
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
                        url: '/sms/complete_phone',
                        data: form
                    }).then((response) => {})
                }
            },
            submit() {
                if (this.form.code !== '' && this.error == '' && this.checked) {
                    axios({
                        method: 'post',
                        url: '/account/complete_phone',
                        data: {
                            'phone': this.form.phone,
                            'code': this.form.code,
                            'password': this.form.password,
                            'user_id': JSON.parse(localStorage.user_id)
                        },
                        transformRequest: [function (data) {
                            let ret = ''
                            for (let it in data) {
                                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                            }
                            return ret
                        }],
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                            'Accept': '*/*'
                        }
                    }).then((response) => {
                        if (response.data.ret == 0) {
                            this.type = true
                            this.$message({
                                message: '完善成功，正在跳转',
                                type: 'success'
                            });
                            this.$router.push('/control/list')
                        } else {
                            this.error = response.data.msg
                        }
                    })
                } else {
                    this.error = '请填写完整'
                }
            }
        },
        beforeRouteLeave (to, from, next){
            if(this.type == true){
                next()
            }
        },
    }
</script>
<style>
    .complete_check.is-checked .el-checkbox__label{
        color: #999;
        font-size: 16px;
        font-family: 新宋体;
    }
    .complete_check .el-checkbox__label{
        color: #999;
        font-size: 16px;
        font-family: 新宋体;
    }
    .el-checkbox__input.is-checked+.el-checkbox__label{
        color: #999!important;
    }
</style>
<style scoped>
    .complete_check{
        margin-bottom: 20px;
    }
    .checkbox_desc{
        font-size: 16px;
        color: #459df5;
        font-family: 新宋体;
    }
    .complete_desc{
        font-size: 14px;
        color: #666;
        line-height: 54px;
        text-align: center;
    }
    .find_title{
        width: 600px;
        margin: 2% auto 0;
        text-align: center;
    }
    .find_title p{
        font-size: 24px;
        font-family: 新宋体;
        color: #333;
    }
    .find_title .login,.find_title .login span{
        margin-left: 160px;
        font-size: 14px;
        color: #999;
        font-family: 新宋体;
        border-right: 1px solid #999;
        padding-right: 6px;
        box-sizing: border-box;
    }
    .find_title .login span,.find_title span{
        margin-left: 0;
        color: #459df5;
        font-family: 新宋体;
        font-size: 14px;
        border: none;
        cursor: pointer;
    }
    .find_main{
        width: 600px;
        margin: 2% auto 0;
    }
    title{
        display: block;
        font-size: 20px;
        font-family: Microsoft Yahei, 微软雅黑;
        color: #333;
        text-align: center;
        margin-bottom: 20px;
    }
    .error{
        font-size: 14px;
        color: #fd4444;
        font-family: 新宋体;
        position: absolute;
        top: 206px;
        left: 140px;
    }
    .find_box{
        width: 600px;
        height: 420px;
        border-radius: 5px;
        background: #fff;
        box-shadow: 0 3px 6px 3px rgba(0,0,0,.06);
        overflow: hidden;
    }
    .findBox_title{
        height: 60px;
        background: #f6ae45;
        text-align: center;
        line-height: 60px;
        font-size: 20px;
        color: #666;
    }
    .phoneFind_main{
        padding: 0 140px 0;
        position: relative;
    }
    input{
        width: 320px;
        height: 40px;
        border-radius: 5px;
        border: 1px solid #ddd;
        margin-bottom: 20px;
        padding-left: 20px;
        font-size: 16px;
        color: #666;
        font-family: 新宋体;
    }
    input:focus{
        outline: none;
        border-color: #ED9515;
    }
    input::-webkit-input-placeholder{
        color: #999;
    }
    input:-moz-placeholder {
        color: #999;
    }
    input:-ms-input-placeholder {
        color: #999;
    }
    input:focus::-webkit-input-placeholder{
        text-indent: -999em;
        z-index: -20;
    }
    .findPhone_code{
        width: 111px;
        height: 40px;
        border-left: 1px solid #ddd;
        text-align: center;
        line-height: 40px;
        font-size: 16px;
        font-family: 新宋体;
        color: #459df5;
        position: absolute;
        top: 63px;
        left: 366px;
        cursor: pointer;
    }
    .findNext_btn{
        width: 320px;
        height: 40px;
        border-radius: 20px;
        background: #ED9515;
        color: #fff;
        line-height: 40px;
        text-align: center;
        font-size: 18px;
        font-family: Microsoft Yahei, 微软雅黑;
        margin-top: 10px;
        cursor: pointer;
    }
    .findNext_btn:hover{
        background: #ED9515;
    }
</style>
