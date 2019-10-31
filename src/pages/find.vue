<template>
    <div>
        <div style="width: 670px;margin: 0 auto">
            <div style="width: 580px;margin: 0 auto;height: 154px;border-bottom:1px solid #ddd;margin-top: 140px;">
                <img src="../assets/register_logo.png" alt="" style="text-align: center;display: block;width: 103px;margin: 0 auto">
            </div>
        </div>
        <div style="width: 320px;margin: 0 auto">
            <span class="title">欢迎注册非幕制片!</span>
            <div class="top" style="margin-top: 39px;margin-bottom: 20px">
                <span style="font-size: 20px;font-family: Microsoft Yahei, 微软雅黑;color: #459df5;text-align: center;display: block">账号安全</span>
                <div class="em" style="margin-top: 19px;width: 100%;height: 1px;background: #ddd"></div>
                <span style="font-size: 18px;font-family: Microsoft Yahei, 微软雅黑;color: #666;text-align: center;display: block;margin-top: 30px">找回密码</span>
            </div>
            <div class="main" style="position: relative">
                <input type="text" placeholder="手机号/邮箱" v-model="form.account">
                <input type="text" placeholder="请输入验证码"  v-model="form.code">
                <div v-if="sendMsgDisabled">{{time}}秒后获取</div>
                <div v-else @click="code">获取验证码</div>
                <input type="password" placeholder="设置密码" v-model="form.password">
                <input type="password" placeholder="确认密码">
            </div>
            <div class="footer" style="display: flex;width: 280px;margin: 0 auto">
                <div class="btn" @click="login" style="margin-left: 0;margin-right: 0">马上登录</div>
                <router-link class="btn" to="/">返回首页</router-link>
            </div>
        </div>
    </div>

</template>

<script>
    import axios from "axios"
    export default {
        name: "find",
        data(){
            return{
                form:{
                    account:'',
                    code:'',
                    password:''
                },
                time: 60, // 发送验证码倒计时
                sendMsgDisabled: false,
            }
        },
        methods: {
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
                form.append('account', this.form.account)
                axios.post('/password/forget', form
                ).then((response) => {
                    if (response.data.msg == 'ok') {
                        console.log(response.data.data)
                    } else {
                        this.$alert(response.data.msg, '提示', {
                            confirmButtonText: '确定',
                            confirmButtonClass: 'aloneConfirmButton'
                        });
                    }
                })
            },
            login(){
                let form = new FormData()
                form.append('account', this.form.account)
                form.append('code', this.form.code)
                form.append('password', this.form.password)
                axios({
                        url:'/password/reset',
                        method: 'post',
                        headers:{
                            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                            'Accept':'*/*'
                        },
                        data:{
                            'account':this.form.account,
                            'code': this.form.code,
                            'password': this.form.password
                        },
                        transformRequest: [function (data) {
                            let ret = ''
                            for (let it in data) {
                                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                            }
                            return ret
                        }]
                    }
                ).then((response) => {
                    if (response.data.msg == 'ok') {
                        this.$alert('修改成功，正在登录', '提示', {
                            confirmButtonText: '确定',
                            confirmButtonClass: 'aloneConfirmButton'
                        });
                        axios({
                            method: 'post',
                            url: '/login',
                            headers:{
                                'Content-type': 'application/x-www-form-urlencoded'
                            },
                            data:{
                                account:this.form.account,
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
                                localStorage.setItem('createAt', new Date().getTime());
                                localStorage.setItem('user',JSON.stringify(this.account));
                                this.$router.push('/control/list')
                            }else{
                                this.msg = response.data.msg
                            }
                        })
                    } else {
                        this.$alert(response.data.msg, '提示', {
                            confirmButtonText: '确定',
                            confirmButtonClass: 'aloneConfirmButton'
                        });
                    }
                })
            }
        }
    }
</script>

<style scoped>
    *{
        font-family: 新宋体;
        box-sizing: border-box;
    }
    .title{
        font-size: 20px;
        margin-top: 60px;
        text-align: center;
        color: #333;
        display: block;
    }
    .main input{
        margin-bottom: 20px;
        width: 320px;
        height: 40px;
        border-radius: 5px;
        border: 1px solid #ddd;
        font-size: 16px;
        line-height: 40px;
        font-family: 新宋体;
        color: #999;
        padding-left: 20px;
    }
    .main div{
        position: absolute;
        width: 107px;
        height: 38px;
        font-size: 16px;
        text-align: center;
        color: #459df5;
        line-height: 38px;
        top: 25.5%;
        left: 66.5%;
        border-left: 1px solid #ddd;
        cursor: pointer;
    }
    .footer .btn{
        margin-top: 40px;
        width: 120px;
        height: 40px;
        background: #ED9515;
        color: #fff;
        font-size: 18px;
        font-family: Microsoft Yahei, 微软雅黑;
        line-height: 28px;
        text-align: center;
        border-radius: 20px;
    }
    .footer a.btn{
        margin-left: 40px;
        background: #fff;
        border: 1px solid #ED9515;
        color: #666;
    }
</style>
