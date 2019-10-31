<template>
    <div id="reward">
        <div class="topBox">
            <img src="../../assets/rewardTitle.png" alt="" class="topTitle">
            <p class="topDesc">邀请好友注册双方均可获得随机优惠券</p>
            <div class="topExplain">最高可得<p>888元</p>
                <el-popover
                    placement="bottom-start" :visible-arrow="false"
                    width="200" trigger="hover">
                    <p class="topExplainTxt">优惠券可用于抵扣开通套餐以及顺场景表下载所需要的费用</p>
                    <div slot="reference" class="topExplainBox">?</div>
                </el-popover>
            </div>
            <div class="topBtn" @click="invite">立即邀请</div>
            <div class="topCheckBox">
                <router-link class="topCheckBtn" to="/control/inviteRules">活动规则</router-link>
                <router-link class="topCheckBtn" to="/mine/coupon">查看优惠券</router-link>
                <div class="topCheckBtn" @click="getRecord();recordDialogVisible=true">邀请记录</div>
            </div>
        </div>
        <div class="contentBox">
            <div class="contentTitle">提升账户安全级别 领取更多优惠券</div>
            <div class="couponList">
                <div class="couponBox">
                    <div class="topBox">
                        <div class="leftBox">
                            <i class="iconfont iconbangdingshouji"></i>
                            <p>绑定手机<br>领取代金券</p>
                        </div>
                        <p class="numBox">￥ <span>10</span></p>
                    </div>
                    <div class="bottomBox">
                        <p></p>
                        <div class="bottomBtn" v-if="phone!='' && phoneGet==false && phone!=undefined" @click="receive('bind_phone')">领取</div>
                        <div class="bottomBtn null" v-else-if="phoneGet==true">已领取</div>
                        <div class="bottomBtn" @click="binding('phone')" v-else>绑定</div>
                    </div>
                </div>
                <div class="couponBox">
                    <div class="topBox">
                        <div class="leftBox">
                            <i class="iconfont iconbangdingweixin"></i>
                            <p>绑定微信<br>领取代金券</p>
                        </div>
                        <p class="numBox">￥ <span>10</span></p>
                    </div>
                    <div class="bottomBox">
                        <p></p>
                        <div class="bottomBtn" @click="binding('wechat')" v-if="source!='weixin' && bindWechat==false && wechatGet==false">绑定</div>
                        <div class="bottomBtn null" v-else-if="source=='weixin' || bindWechat==true && wechatGet==true">已领取</div>
                        <div class="bottomBtn" v-else @click="receive('bind_wechat')">领取</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="enterpriseServiceBox">
            <div class="enterpriseServiceLeft">
                <div class="enterpriseServiceTitle">非幕企业级服务</div>
                <div class="enterpriseServiceDesc">
                    为注重数据私密的企业用户打造的一款专属服务<br/>
                    可以将非幕部署到自己公司的服务器上<br/>并提供专业的技术支持和维护服务
                </div>
            </div>
            <div class="enterpriseServicePlanBox">
                <div class="enterpriseServicePlanForm">
                    公司名称
                    <el-input
                        placeholder="请输入公司名称"
                        v-model="enterpriseServicePlanForm.company"
                        clearable class="enterpriseServicePlanInput">
                    </el-input>
                </div>
                <div class="enterpriseServicePlanForm">
                    联系人
                    <el-input
                        placeholder="请输入联系人"
                        v-model="enterpriseServicePlanForm.contact"
                        clearable class="enterpriseServicePlanInput">
                    </el-input>
                </div>
                <div class="enterpriseServicePlanForm">
                    手机号
                    <el-input
                        placeholder="请输入手机号"
                        v-model="enterpriseServicePlanForm.phone"
                        clearable class="enterpriseServicePlanInput">
                    </el-input>
                </div>
                <div class="enterpriseServicePlanForm">
                    联系邮箱
                    <el-input
                        placeholder="请输入联系邮箱"
                        v-model="enterpriseServicePlanForm.email"
                        clearable class="enterpriseServicePlanInput">
                    </el-input>
                </div>
                <p class="enterpriseServicePlanError">{{error}}</p>

                <div class="enterpriseServicePlanSubmit" @click="company">提交</div>
            </div>
        </div>

        <!--邀请记录-->
        <el-dialog
            title="邀请记录" :visible.sync="recordDialogVisible"
            width="500px" center>
            <div class="inviteList">
                <div class="inviteBox" v-if="recordList!=''" v-for="item,index in recordList" :key="index">
                    <div class="inviteInfoBox">
                        <div class="inviteHeadBox">
                            <img :src="item.profile_picture" alt="" v-if="item.profile_picture">
                            <img src="../../assets/detailLogo.png" alt="" v-else>
                        </div>
                        <div class="inviteTxtBox">
                            <div class="inviteName">{{item.name}}</div>
                            <div class="inviteAccount" v-if="item.phone">{{item.phone}}</div>
                            <div class="inviteAccount" v-else>{{item.email}}</div>
                        </div>
                    </div>
                    <div class="inviteStatusBox">领取到{{item.coupon_name}}</div>
                </div>
                <div class="inviteBox" v-else>
                    暂无邀请记录
                </div>
            </div>
        </el-dialog>

        <!--邀请好友 -->
        <el-dialog
            title="邀请好友" :visible.sync="inviteDialogVisible"
            width="500px" center :before-close="inviteClose">
            <div class="inviteDialogBox">
                <div class="inviteTitle">直接复制链接发给好友</div>
                <el-input placeholder="请输入内容" v-model="link" class="inputWithBtn" :disabled="true" id="copy">
                    <div slot="append" class="inputBtn"  v-clipboard:copy="link" v-clipboard:success="onCopy">{{copyTxt}}</div>
                </el-input>
                <div class="inviteDesc">
                    <img src="../../assets/rewardIcon.png" alt="">
                    好友注册成功，您即可获得相应奖励
                </div>
            </div>
        </el-dialog>

        <!--绑定手机-->
        <el-dialog title="绑定手机号" :visible.sync="phoneFormVisible" class="binding_phone pwdDialog" width="540px">
            <el-form :model="phoneForm">
                <el-form-item label="手机号码" prop="phone" :rules="[{ required: true, message: '手机号码不能为空',trigger:'blur'}]">
                    <el-input v-model="phoneForm.phone" auto-complete="off" class="pwdPhone_input"></el-input>
                </el-form-item>
                <el-form-item label="验证码" prop="code" :rules="[{ required: true, message: '验证码不能为空',trigger:'blur'}]">
                    <el-input v-model="phoneForm.code" auto-complete="off" class="phone_input"></el-input>
                    <el-button type="primary" @click="code" class="phone_code" v-if="sendMsgDisabled">{{time}}秒后获取</el-button>
                    <el-button type="primary" @click="code" class="phone_code" v-else>获取验证码</el-button>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="phoneBind">确 定</el-button>
            </div>
        </el-dialog>
        <a href="" style="display: none" id="emaillogin"></a>
    </div>
</template>

<script>
    import global_ from '../../common/Global'
    export default {
        name: "reward",
        data(){
            return{
                enterpriseServicePlanForm:{//公司信息
                    company:'',
                    contact:'',
                    phone:'',
                    email:''
                },
                error:'',
                link:'',//邀请链接
                copyTxt:'复制',//复制文本
                recordDialogVisible:false,//邀请记录弹框
                recordList:'',//邀请记录列表
                inviteDialogVisible:false,//邀请好友弹框
                phoneFormVisible:false,//绑定手机弹框
                phoneForm:{
                    phone:'',
                    code:'',
                },//绑定手机表单
                time: 60, // 发送验证码倒计时
                sendMsgDisabled: false,
                phone:'',//是否绑定手机号
                source:'',//是否绑定微信
                bindWechat:false,//是否绑定微信
                phoneGet:false,
                wechatGet:false
            }
        },
        methods:{
            receive(type){
                this.$axios.get('/coupon/get_bind_coupon', {
                    params: {
                        origin: type,
                        user_id: JSON.parse(localStorage.user_id)
                    }
                }).then((response) => {
                    if (response.data.ret == '0') {
                        this.$message({
                            message: response.data.msg,
                            type: 'success'
                        });
                        if(type == 'bind_wechat'){
                            this.wechatGet =  true
                        }else{
                            this.phoneGet =  true
                        }
                    } else {
                        this.$message(response.data.msg);
                    }
                })
            },
            invite(){
                if(localStorage.user_id){
                    this.inviteDialogVisible=true
                }else{
                    this.$message('请先登录');
                    this.$router.push('/login')
                }
            },

            binding(type){
                if(localStorage.user_id){
                    if(type == 'phone'){
                        this.phoneFormVisible=true
                    }else{
                        this.wchat()
                    }
                }else{
                    this.$message('请先登录');
                    this.$router.push('/login')
                }
            },

            onCopy (e) {
                var Url2 = document.getElementById("copy");
                Url2.select(); // 选择对象
                this.copyTxt = '已复制';
            },

            inviteClose(){
                this.copyTxt = '复制';
                this.inviteDialogVisible=false
            },

            //绑定手机验证码
            code() {
                let form = new FormData()
                form.append('phone', this.phoneForm.phone)
                this.$axios.post('/sms/bind_phone', form
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
                        this.$message(response.data.msg);
                    }
                })
            },

            //绑定手机
            phoneBind(){
                let form = new FormData()
                form.append('phone', this.phoneForm.phone)
                form.append('code', this.phoneForm.code)
                form.append('user_id', JSON.parse(localStorage.user_id))
                this.$axios.post('/account/bind_phone', form
                ).then((response) => {
                    if (response.data.msg == 'ok') {
                        this.$message({
                            message: '绑定成功',
                            type: 'success'
                        });
                        this.phoneFormVisible = false
                    } else {
                        this.$message(response.data.msg);
                    }
                })
            },

            //绑定微信
            wchat(){
                this.$axios.get('/account/weixin_bind_qrcode'
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

            //公司信息
            company(){
                this.error = '';
                if(this.enterpriseServicePlanForm.company !=''  && this.enterpriseServicePlanForm.email !='' && this.enterpriseServicePlanForm.contact !='' && this.enterpriseServicePlanForm.phone !=''){
                    if(this.enterpriseServicePlanForm.email.match(/^\w+@\w+\.com$/) && this.enterpriseServicePlanForm.phone.match(/^[0-9]*$/)){
                        let formData = new FormData();
                        formData.append('fullname', this.enterpriseServicePlanForm.company);
                        formData.append('contact_email', this.enterpriseServicePlanForm.email);
                        formData.append('contact_person', this.enterpriseServicePlanForm.contact);
                        formData.append('contact_phone', this.enterpriseServicePlanForm.phone);
                        this.$axios({
                            method: 'post',
                            url: '/company/apply',
                            data: formData,
                            headers:{
                                'Content-Type': 'multipart/form-data',
                                'Accept': '*/*',
                                'X-Requested-With': 'XMLHttpRequest'
                            }
                        }).then((response)=> {
                            if(response.data.ret == 0){
                                this.$message({
                                    message: '提交成功，我们将在1-2个工作日内与您取得联系',
                                    type: 'success'
                                });

                            }else{
                                this.$message.error(response.data.msg);
                            }
                        })
                    }else{
                        this.error = '输入的格式不正确，请重新输入'
                    }

                }else{
                    this.error = '请填写完整'
                }
            },

            //获取邀请记录
            getRecord(){
                this.$axios({
                    method: 'get',
                    url: '/coupon/get_invite_history?user_id='+JSON.parse(localStorage.user_id),
                    headers:{
                        'Content-type': 'application/x-www-form-urlencoded'
                    }
                }).then((response)=> {
                    this.recordList = response.data.data
                })
            },

        },
        mounted(){
            this.$axios.get('/coupon/is_bind', {
                params: {
                    origin: 'bind_wechat',
                    user_id: JSON.parse(localStorage.user_id)
                }
            }).then((response) => {
                if (response.data.data == true) {
                     this.wechatGet =  true
                }
            })
            this.$axios.get('/coupon/is_bind', {
                params: {
                    origin: 'bind_phone',
                    user_id: JSON.parse(localStorage.user_id)
                }
            }).then((response) => {
                if (response.data.data == true) {
                    this.phoneGet =  true
                }
            })
            this.$axios({
                method: 'get',
                url: '/coupon/get_invite_code?user_id='+JSON.parse(localStorage.user_id),
                headers:{
                    'Content-type': 'application/x-www-form-urlencoded'
                }
            }).then((response)=> {
                this.link = global_.pathInfo + response.data.data
            })
            this.$axios({
                method: 'get',
                url: '/user/info?user_id='+JSON.parse(localStorage.user_id),
                headers:{
                    'Content-type': 'application/x-www-form-urlencoded'
                }
            }).then((response)=> {
                this.phone = response.data.data.phone
                this.source = response.data.data.source
                this.bindWechat = response.data.data.whether_weixin_bind
            })
        }
    }
</script>


<style scoped>
    *{
        box-sizing: border-box;
    }

    #reward>.topBox{
        width: 100vw;
        height: 864px;
        background-image: url("../../assets/rewardTopBg.png");
        background-size: auto 100%;
        background-repeat: no-repeat;
        overflow: hidden;
    }

    #reward .topBox .topTitle{
        margin: 265px auto 0;
        display: block;
    }

    #reward .topBox .topDesc{
        font-size:40px;
        font-family:SimHei;
        font-weight:400;
        color:rgba(255,255,255,1);
        text-align: center;
        line-height: 40px;
        margin: 78px 0 46px;
    }

    #reward .topBox .topExplain{
        font-size:40px;
        font-family:SimHei;
        font-weight:400;
        color:rgba(255,255,255,1);
        display: flex;
        align-items: center;
        justify-content: center;
        line-height: 40px;
        position: relative;
        width: 272px;
        margin: 0 auto;
    }

    #reward .topBox .topExplain:before{
        content: '';
        position: absolute;
        width:142px;
        height:6px;
        border-radius: 10% / 100%;
        background: linear-gradient(to right,rgba(255,255,255,0) 40%,rgba(255,255,255,0.6));
        top: 0;
        bottom: 0;
        margin: auto 0;
        left: -196px;
    }

    #reward .topBox .topExplain:after{
        content: '';
        position: absolute;
        width:142px;
        height:6px;
        border-radius: 10% / 100%;
        background: linear-gradient(to right,rgba(255,255,255,0.6),rgba(255,255,255,0) 60%);
        top: 0;
        bottom: 0;
        margin: auto 0;
        right: -200px;
    }

    #reward .topBox .topExplain p{
        font-size:40px;
        font-family:SimHei;
        color: #FFB140;
    }

    #reward .topBox .topExplain .topExplainBox{
        width:24px;
        height:24px;
        border-radius: 50%;
        border:2px solid #FFB140;
        color: #FFB140;
        font-size: 20px;
        text-align: center;
        line-height: 20px;
        font-family:SimHei;
        position: absolute;
        top: -14px;
        right: -28px;
        cursor: pointer;
    }

    #reward .topBox .topBtn{
        width:240px;
        height:52px;
        background:rgba(237,149,21,1);
        border-radius:26px;
        font-size:16px;
        text-align: center;
        line-height: 52px;
        font-weight:bold;
        color:rgba(255,255,255,1);
        letter-spacing: 2px;
        margin: 126px auto 88px;
        cursor: pointer;
    }

    #reward .topBox .topCheckBox{
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 392px;
        margin: 0 auto;
    }

    #reward .topBox .topCheckBox .topCheckBtn{
        font-size:14px;
        text-decoration:underline;
        color:rgba(255,255,255,1);
        cursor: pointer;
        transition: all 0.8s;
    }

    #reward .topBox .topCheckBox .topCheckBtn:hover{
        color: rgba(237,149,21,1);
    }

    #reward .contentBox{
        width: 1038px;
        height: 720px;
        margin: 0 auto;
    }

    #reward .contentBox .contentTitle{
        font-size:28px;
        font-family:SimSun;
        font-weight:bold;
        color:rgba(57,63,81,1);
        text-align: center;
        margin: 176px 0 106px;
    }

    #reward .contentBox .couponList{
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    #reward .contentBox .couponList .couponBox{
        width: 492px;
        height: 242px;
        padding: 16px;
        background-image: url("../../assets/rewardCouponBg.png");
        background-repeat: no-repeat;
    }

    #reward .contentBox .couponList .couponBox>.topBox{
        height: 155px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 38px 46px 38px 26px;
    }

    #reward .contentBox .couponList .couponBox>.topBox .leftBox{
        display: flex;
        align-items: center;
    }

    #reward .contentBox .couponList .couponBox>.topBox .leftBox i{
        font-size: 94px;
        color: #6C6FBF;
        opacity: 0.6;
        margin-left: -6px;
    }

    #reward .contentBox .couponList .couponBox:nth-of-type(2)>.topBox .leftBox i{
        color: #72CB8D;
        opacity: 1;
        font-size: 80px;
        margin-left: 0;
    }

    #reward .contentBox .couponList .couponBox>.topBox .leftBox p{
        font-size:14px;
        margin-left: 20px;
        line-height: 30px;
        font-weight:bold;
        color:rgba(57,63,81,1);
    }

    #reward .contentBox .couponList .couponBox>.topBox .numBox{
        font-size: 30px;
        color: #ED9515;
    }

    #reward .contentBox .couponList .couponBox>.topBox .numBox span{
        font-size: 50px;
    }

    #reward .contentBox .couponList .couponBox>.bottomBox{
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: 46px;
        padding: 0 40px 0 28px;
    }

    #reward .contentBox .couponList .couponBox>.bottomBox p{
        font-size:12px;
        font-weight:bold;
        color:rgba(57,63,81,1);
        opacity:0.8;
    }

    #reward .contentBox .couponList .couponBox>.bottomBox .bottomBtn{
        width:110px;
        height:24px;
        background:rgba(237,149,21,1);
        border-radius:12px;
        font-size:12px;
        text-align: center;
        line-height: 24px;
        font-weight:bold;
        color:rgba(255,255,255,1);
        letter-spacing: 1px;
        cursor: pointer;
    }

    #reward .contentBox .couponList .couponBox>.bottomBox .bottomBtn.null{
        background: rgba(0,0,0,.2);
        cursor: not-allowed;
    }

    .enterpriseServiceBox{
        height: 492px;
        background:rgba(108,111,191,1);
        box-sizing: border-box;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .enterpriseServiceBox .enterpriseServiceTitle{
        line-height: 30px;
        font-weight: bold;
        font-size:30px;
        font-family:宋体;
        color:rgba(255,255,255,1);
        margin: 0 0 30px;
        /*position: absolute;*/
        /*top: 58px;*/
    }
    .enterpriseServiceBox .enterpriseServiceDesc{
        line-height: 26px;
        font-size:12px;
        font-family:MicrosoftYaHei;
        font-weight:bold;
        color:rgba(255,255,255,1);
        letter-spacing: 2px;
    }
    .enterpriseServiceBox .enterpriseServicePlanBox{
        width:420px;
        height:480px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        margin: -46px 0 62px 160px;
        padding: 16px 50px 0 40px;
        box-shadow: 0 0 10px 6px rgba(0,0,0,.05);
        box-sizing: border-box;
    }
    .enterpriseServiceBox .enterpriseServicePlanBox .enterpriseServicePlanLeft{
        width: 1000px;
        margin: auto;
        margin-top: 60px;
    }

    .enterpriseServiceBox .enterpriseServicePlanBox .enterpriseServicePlanForm{
        width: 100%;
        font-size:12px;
        font-family:MicrosoftYaHei;
        font-weight:bold;
        color:rgba(0,0,0,0.7);
        margin-top: 24px;
    }
    .enterpriseServiceBox .enterpriseServicePlanBox .enterpriseServicePlanForm .enterpriseServicePlanInput{
        margin-top: 10px;
    }

    .enterpriseServiceBox .enterpriseServicePlanBox  .enterpriseServicePlanError{
        color: #F05050;
    }
    .enterpriseServiceBox .enterpriseServicePlanBox .enterpriseServicePlanSubmit{
        width:200px;
        height:40px;
        background:rgba(108,111,191,1);
        border-radius:20px;
        font-size:14px;
        font-family:MicrosoftYaHei;
        margin: 40px auto 0;
        color:rgba(255,255,255,1);
        line-height: 40px;
        text-align: center;
        cursor: pointer;
    }

    /*邀请记录*/
    #reward .inviteList{
        max-height: 520px;
        min-height: 200px;
        overflow-y: scroll;
        padding-bottom: 20px;
    }

    #reward .inviteList .inviteBox{
        padding: 0 48px 0 30px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 72px;
    }

    #reward .inviteList .inviteBox .inviteInfoBox{
        display: flex;
        align-items: center;
        width: 60%;
    }

    #reward .inviteList .inviteBox .inviteInfoBox .inviteHeadBox{
        width:48px;
        height:48px;
        background:rgba(237,237,237,1);
        border-radius:50%;
        display: flex;
        align-items: center;
        margin-right: 14px;
    }

    #reward .inviteList .inviteBox .inviteInfoBox .inviteHeadBox>img{
        width: 25px;
        margin: 0 auto;
        display: block;
    }

    #reward .inviteList .inviteBox .inviteInfoBox .inviteTxtBox{
        width: calc(100% - 62px);
    }

    #reward .inviteList .inviteBox .inviteInfoBox .inviteTxtBox .inviteName{
        font-size:14px;
        color:rgba(0,0,0,1);
        line-height: 14px;
        margin-bottom: 10px;
        width: 100%;
        height: 14px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }

    #reward .inviteList .inviteBox .inviteInfoBox .inviteTxtBox .inviteAccount{
        font-size:12px;
        color:rgba(0,0,0,0.6);
        line-height: 12px;
        width: 100%;
        height: 12px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }

    #reward .inviteList .inviteBox .inviteStatusBox{
        font-size:14px;
        color:rgba(0,0,0,0.8);
    }

    /*邀请好友*/
    #reward .inviteDialogBox{
        padding: 0 30px 26px;
    }

    #reward .inviteDialogBox .inviteTitle{
        font-size:14px;
        color:rgba(0,0,0,0.8);
    }

    #reward .inviteDialogBox .inviteDesc{
        display: flex;
        align-items: center;
        font-size:12px;
        color:rgba(0,0,0,0.6);
    }

    #reward .inviteDialogBox .inviteDesc img{
        width:22px;
        margin:-1px 6px 0 0;
    }
</style>
<style>
    @import "../../css/el-form.css";
    @import "../../css/el-dialog.css";

    .inviteDialogBox .inputWithBtn{
        margin: 12px auto 26px;
    }

    .inviteDialogBox .inputWithBtn .el-input-group__append{
        width: 18%;
    }

    /*绑定手机*/
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

    .phone_input .el-input__inner,.phone_input{
        width: 240px!important;
    }

    .phone_code{
        width: 100px;
        height: 40px;
        background: #f9f9f9!important;
        margin-left: 10px!important;
        border-radius: 5px!important;
        padding: 0!important;
        border:none!important;
    }
    .phone_code:hover,.phone_code:focus{
        background-color: #f9f9f9!important;
    }
    .phone_code span{
        font-size: 16px;
        color: #459df5;
        font-family: 新宋体;
    }

    .pwdDialog .dialog-footer .el-button--primary{
        width: 400px!important;
        border-radius: 20px;
        height: 40px;
        background-color: #ED9515;
        margin: 0 auto;
        display: block;
    }

    .binding_phone .el-dialog .el-dialog__body .el-form .el-form-item__content{
        margin-left: 86px!important;
    }

    .pwdDialog .el-form-item__label{
        width: 66px!important;
        line-height: 40px;
    }

    .pwdDialog .el-form-item__label:after{
        content: ''!important;
    }

    .pwdDialog  .phone_code{
        width: 95px;
        height: 40px;
        background: #f9f9f9!important;
        margin-left: 10px!important;
        border-radius: 5px!important;
        padding: 0!important;
        border:none!important;
    }
</style>
