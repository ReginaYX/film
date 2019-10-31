<template>
    <div id="buy">
        <index-top :register="registerBtn" @register1="registerData"></index-top>
        <div class="contentBox">
            <div class="titleBox">
                订单支付中心
            </div>
            <div class="carouselList">
                <ul ref="con1" :class="{anim:animate==true}">
                    <li v-for="item in noticeList" class="carouselBox">
                        <i class="iconfont iconxiaolaba"></i>{{item}}
                    </li>
                </ul>
            </div>
            <div class="infoContent">
                <div :class="['infoItem',activeMeal.package_id==item.package_id?'active':'']" @click="activeMeal=item" v-for="item,index in package" :key="index">
                    <div class="title">{{item.name}}</div>
                    <div class="desc">{{item.description}}</div>
                    <div class="price">
                        <div class="now">￥<span>{{item.fee}}</span></div>
                        <div class="ago">原价￥<span>{{item.origin_fee}}</span></div>
                    </div>
                    <!--<div class="time">活动截止日期：2019-12-01</div>-->
                </div>
            </div>
            <div class="payContent">
                <div class="left">
                    <div class="descItem">
                        <img src="../../assets/downloadDescIcon1.png" alt="">
                        <span>一键统筹，智能标注</span>
                    </div>
                    <div class="descItem">
                        <img src="../../assets/downloadDescIcon2.png" alt="">
                        <span>随时随地，离线使用</span>
                    </div>
                    <div class="descItem">
                        <img src="../../assets/downloadDescIcon3.png" alt="">
                        <span>安全稳定，快速高效</span>
                    </div>
                </div>
                <div class="right">
                    <div class="infoBox">
                        <el-form :model="emailForm" ref="emailValidateForm" class="emailFormBox">
                            <el-form-item
                                label="邮箱号" prop="email" :rules="[{required: true, message: '邮箱号不能为空',trigger:'blur'},
                        {type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }]">
                                <el-input v-model="emailForm.email" clearable  placeholder="请输入您的邮箱号以便接收激活码"></el-input>
                            </el-form-item>
                            <el-form-item prop="checkEmail" :rules="[{ required: true, message: '请确认邮箱号',trigger:'blur'},
                    {validator: this.checkEmail, message: '两次输入邮箱号不一致',trigger:'blur'}]" label="邮箱号确认">
                                <el-input v-model="emailForm.checkEmail" clearable  placeholder="请再次确认您的邮箱号"></el-input>
                            </el-form-item>
                            <div class="discountBox">
                                <el-form-item prop="checkEmail">
                                    <el-input v-model="code" clearable  placeholder="请输入优惠码"></el-input>
                                </el-form-item>
                                <div class="btn" @click="checkCode">确认</div>
                            </div>
                        </el-form>
                    </div>
                    <div class="discountInfo" v-if="discount!=''">已优惠 ￥{{discount}}&#8195;&#8195;合计：<span>￥{{activeMeal.fee}}</span></div>
                    <div class="discountInfo" v-else>合计：<span>￥{{activeMeal.fee}}</span></div>
                    <div class="payMethodBox">
                        <div class="payMethodTitleBox">
                            <div class="payMethodTitle">请选择以下支付方式</div>
                        </div>
                        <el-radio-group v-model="radio" class="payMethodRadio">
                            <el-radio :label="1" class="payMethodItem" border><i class="iconfont iconweixin2"></i>微信支付</el-radio>
                            <el-radio :label="2" class="payMethodItem" border><i class="iconfont iconbig-Pay"></i>支付宝支付</el-radio>
                        </el-radio-group>
                    </div>
                    <div class="stepBtn" @click="pay">确认支付</div>
                </div>
            </div>
            <!--二维码弹窗-->
            <el-dialog class="payRight" title="扫码支付" width="400px" :visible.sync="dialogFormVisible">
                <img class="QRCode" :src="payInsideSrc" v-if="radio == '1'">
                <iframe class="alipayQRcode" :src="payInsideSrc" v-else></iframe>
                <div class="payDesc">
                    <br>要了解更多信息，请阅读<router-link to="/agreement">服务协议</router-link>。
                </div>
            </el-dialog>
            <div class="desc">
                说明：购买成功后激活码会发送到您所填写的邮箱地址。完成支付后可添加<el-popover
                placement="bottom" popper-class="cordPopper"
                width="120" trigger="hover" >
                <img src="../../assets/serviceCode.jpg" alt="" width="120px" height="120px">
                <span slot="reference" class="cordPopperTxt">客服微信</span>
            </el-popover>申请发票。更多问题请关注<el-popover
                placement="bottom" popper-class="cordPopper"
                width="120" trigger="hover">
                <img src="../../assets/erweima.png" alt="非幕科技公众号二维码" width="120px" height="120px">
                <span slot="reference" class="cordPopperTxt">非幕公众号</span>
            </el-popover>
            </div>
        </div>
    </div>
</template>

<script>
    import indexTop from "../../common/indexTop";
    export default {
        name: "buy",
        components: {indexTop},
        data(){
            var that = this;
            return{
                package:[],
                animate:false,
                noticeList:[],
                registerBtn :false,
                activeMeal:'',
                emailForm:{
                    email:'',
                    checkEmail:'',
                },
                code:'',//优惠码
                discount:'',//折扣
                checkEmail:(rule, value, callback) => {
                    if(value != that.emailForm.email) {
                        callback(new Error('两次输入邮箱号不一致'))
                    }
                    else{
                        callback();
                    }
                },
                radio:1,
                dialogFormVisible:false,
                payInsideSrc:'',
                time:'',
                order_id:''
            }
        },
        methods:{
            //验证优惠码
            checkCode(){
                this.$axios.get('/pay/promo_code_check', {
                    params:{
                        code: this.code,
                    }
                }).then((response)=> {
                    if(response.data.ret == '0'){
                        if(this.activeMeal.fee){
                            let total = this.activeMeal.fee;
                            this.discount = response.data.data/100*total;
                            this.activeMeal.fee = (100-response.data.data)/100*total
                        }
                    }else{
                        this.$message(response.data.msg);
                    }
                })
            },
            scroll(){
                let con1 = this.$refs.con1;

                con1.style.marginTop='-20px';

                this.animate=!this.animate;

                var that = this; // 在异步函数中会出现this的偏移问题，此处一定要先保存好this的指向

                setTimeout(function(){

                    that.noticeList.push(that.noticeList[0]);

                    that.noticeList.shift();

                    con1.style.marginTop='0px';

                    that.animate=!that.animate;  // 这个地方如果不把animate 取反会出现消息回滚的现象，此时把ul 元素的过渡属性取消掉就可以完美实现无缝滚动的效果了

                },500)

            },

            numRandom(type){
                var chars,id;
                if(type == 'email'){
                    chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
                    id = Math.ceil(Math.random() * 35);
                }else if(type == 'account'){
                    chars = ['qq.com','sina.com','163.com','139.com','188.com','sogou.com'];
                    id = Math.ceil(Math.random() * 5);
                }else if(type == 'member'){
                    chars = ['1年VIP', '2年VIP', '终生VIP'];
                    id = Math.ceil(Math.random() * 2);
                }else{
                    chars = ['2', '3', '4', '5'];
                    id = Math.ceil(Math.random() * 3);
                }
                var res = "";
                res = chars[id];
                return res;
            },

            registerData(data){
                if(data == false){
                    this.registerBtn = false
                }
            },

            // 支付
            pay(){
                this.$refs['emailValidateForm'].validate((valid) => {
                    if (valid) {
                        this.dialogFormVisible = true;
                        //微信支付
                        if (this.radio == 1){
                            //微信支付
                            this.QRcode();
                            this.payStatus();
                        }else if (this.radio == 2) {
                            //支付宝支付
                            this.alipayQRcode();
                            this.payStatus();
                        }else {
                            this.$message({
                                    message: '请选择支付方式',
                                    type: 'warning'
                                }
                            );
                        }
                    }
                });
            },
            //支付状态查询
            payStatus(){
                var payLoad = window.setInterval(() => {
                    this.$axios.get('/order/status', {
                        params:{
                            order_id: this.order_id,
                        }
                    }).then((response)=> {
                        if(response.data.ret == '0'){
                            window.clearInterval(payLoad);
                            this.$router.push('/downLoad/done?amount='+this.activeMeal.fee+'&email='+this.emailForm.email)
                        }else{
                            if (this.dialogFormVisible == false) {
                                window.clearInterval(payLoad);
                            }
                        }


                    })
                }, 3000);
            },

            //获取微信充值二维码
            QRcode(n){
                if(this.discount){
                    var obj = {package_id: this.activeMeal.package_id,code: this.code,email:this.emailForm.email};
                }else{
                    var obj = {package_id: this.activeMeal.package_id,email:this.emailForm.email};
                }
                this.$axios.get('/pay/wxpay/unifiedorder_standalone', {
                    params: obj
                }).then((response)=> {
                    // this.payQRCode == response.data.data;
                    if(response.data.msg == 'ok'){
                        //二维码
                        document.getElementsByClassName('QRCode')[0].src = response.data.data.img;
                        this.order_id = response.data.data.order_id
                    }else{
                        this.$message.error(response.data.msg);
                    }
                })
            },


            //获取支付宝充值二维码
            alipayQRcode(){
                if(this.discount){
                    var obj = {package_id: this.activeMeal.package_id,code: this.code,email:this.emailForm.email};
                }else{
                    var obj = {package_id: this.activeMeal.package_id,email:this.emailForm.email};
                }
                this.$axios.get('/pay/alipay/unifiedorder_standalone', {
                    params: obj
                }).then((response)=> {
                    if(response.data.msg == 'ok'){
                        //二维码
                        document.getElementsByClassName('alipayQRcode')[0].src = response.data.data.url;
                        this.order_id = response.data.data.order_id;
                    }else{
                        this.$message.error(response.data.msg);
                    }
                })
            },
        },
        mounted(){
            this.$axios.get('/home/package_standalone').then((response)=> {
                if(response.data.ret=='0'){
                    this.package = response.data.data;
                    this.activeMeal = response.data.data[0]
                }
            });
            for(let i=0;i<51;i++){
                this.noticeList.push('用户'+this.numRandom('email')+this.numRandom('email')+'****@'+this.numRandom('account')+' '+this.numRandom('hour')+'小时前成功购买'+this.numRandom('member'))
            }
            this.time = setInterval(this.scroll,10000);
        },
        beforeDestroy() {
            clearInterval(this.time);
        }
    }
</script>

<style>
    @import "../../css/el-form.css";
    #buy .emailFormBox.el-form{
        padding: 0;
    }

    #buy .emailFormBox.el-form .el-form-item{
        margin-bottom: 24px;
    }

    #buy .emailFormBox.el-form .el-form-item .el-form-item__label{
        margin-bottom: -2px;
    }

    #buy .emailFormBox.el-form .el-form-item .el-form-item__error{
        padding-top: 0;
        top: 99%;
    }

    #buy .contentBox .payContent .right .discountBox .el-form-item{
        width: calc(100% - 90px);
        margin: -9px 0 0;
    }

    #buy .contentBox .payContent .right .discountBox .el-form-item .el-input__inner{
        background-color: transparent!important;
    }

    #buy  .payMethodBox .payMethodItem{
        width: 160px;
        height: 46px;
        margin-right: 18px;
    }
</style>

<style scoped>
    *{
        box-sizing: border-box;
    }

    #buy{
        width: 100vw;
        min-height: 100vh;
        background: rgba(28,54,113,0.04);
        overflow-y: scroll;
    }

    #buy .contentBox{
        margin: 75px auto 0;
        width: 1132px;
    }

    #buy .contentBox .titleBox{
        width: 100%;
        height: 42px;
        border-bottom: 1px solid rgba(168,167,167,0.4);
        font-size:14px;
        line-height: 42px;
    }

    #buy .contentBox .carouselList{
        margin: 10px 0 14px;
        width: 100%;
        height:20px;
        line-height: 20px;
        overflow: hidden;
        transition: all 0.5s;
    }

    #buy .contentBox .carouselList .anim{
        transition: all 0.5s;
    }

    #buy .contentBox .carouselBox{
        display: flex;
        align-items: center;
        width: 100%;
        height: 100%;
        background:rgba(32,176,243,0.14);
        font-size:12px;
        color:rgba(86,91,105,1);
   }

    #buy .contentBox .carouselBox i{
        font-size: 14px;
        color: rgba(32,176,243,0.8);
        margin: 0 14px 0 9px;
    }

    #buy .contentBox .infoContent{
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    #buy .contentBox .infoContent .infoItem{
        width:340px;
        height:220px;
        background-color:rgba(255,255,255,1);
        border-radius:2px;
        background-image: url("../../assets/buyItemBg.png");
        background-size: 340px 220px;
        cursor: pointer;
        transition: all 0.8s;
    }

    #buy .contentBox .infoContent .infoItem:hover,
    #buy .contentBox .infoContent .infoItem.active{
        background-image: url("../../assets/buyItemBgActive.png");
    }

    #buy .contentBox .infoContent .infoItem:hover>div,
    #buy .contentBox .infoContent .infoItem.active>div{
        color: #fff;
    }

    #buy .contentBox .infoContent .infoItem .title{
        font-size:24px;
        margin: 26px 0 12px;
        line-height: 24px;
        text-align: center;
        color:rgba(57,63,81,1);
        position: relative;
    }

    #buy .contentBox .infoContent .infoItem .title .sign{
        position: absolute;
        top: -10px;
        right: 80px;
        width:40px;
        height:18px;
        background:rgba(240,80,80,1);
        border-radius:4px 0px 4px 0px;
        font-size:12px;
        text-align: center;
        line-height: 18px;
        color:rgba(255,255,255,1);
    }

    #buy .contentBox .infoContent .infoItem .desc{
        font-size:16px;
        margin: 0 0 52px;
        line-height: 16px;
        text-align: center;
        color:rgba(57,63,81,0.9);
    }

    #buy .contentBox .infoContent .infoItem .price{
        position: relative;
    }

    #buy .contentBox .infoContent .infoItem .price .now{
        font-size:20px;
        font-weight:bold;
        color:rgba(237,149,21,0.9);
        text-align: center;
    }

    #buy .contentBox .infoContent .infoItem .price .now span{
        font-size: 40px;
    }

    #buy .contentBox .infoContent .infoItem .price .ago{
        position: absolute;
        top: -16px;
        right: 34px;
        font-size:16px;
        text-decoration:line-through;
        color:rgba(237,149,21,1);
    }

    #buy .contentBox .infoContent .infoItem .price .ago span{
        font-size:20px;
    }

    #buy .contentBox .infoContent .infoItem .time{
        font-size:14px;
        color:rgba(75,83,101,1);
        margin-top: 5px;
        text-align: center;
    }

    #buy .contentBox .payContent{
        height:500px;
        background:rgba(255,255,255,1);
        margin-top: 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 114px 0 96px;
    }

    #buy .contentBox .payContent .descItem{
        width:340px;
        height:100px;
        background:rgba(246,247,249,0.4);
        border:1px solid rgba(160,160,160,0.4);
        border-radius:2px;
        margin-bottom: 50px;
        display: flex;
        align-items: center;
        transition: all 0.8s;
    }

    #buy .contentBox .payContent .descItem:hover{
        background:rgba(255,255,255,1);
        border-color: transparent;
        box-shadow: 0 0 8px 5px rgba(0,0,0,.03);
    }

    #buy .contentBox .payContent .descItem:last-child{
        margin-bottom: 0;
    }

    #buy .contentBox .payContent .descItem img{
        margin: 0 30px 0 20px;
        width: 50px;
    }

    #buy .contentBox .payContent .descItem:last-child img{
        width: 40px;
        margin: 0 34px 0 25px;
    }

    #buy .contentBox .payContent .descItem span{
        font-size:12px;
        color:rgba(0,0,0,1);
    }

    #buy .contentBox .payContent .right{
        width: 450px;
    }

    #buy .contentBox .payContent .right .discountBox{
        display: flex;
        align-items: center;
        justify-content: space-between;
        width:100%;
        height:54px;
        background:rgba(246,247,249,0.4);
        border:1px solid rgba(204,204,204,0.4);
        border-radius:2px;
        padding: 0 12px;
    }

    #buy .contentBox .payContent .right .discountBox .btn{
        width:80px;
        height:24px;
        background:rgba(237,149,21,1);
        border-radius:12px;
        font-size:12px;
        text-align: center;
        line-height: 24px;
        color:rgba(255,254,254,1);
        cursor: pointer;
    }

    #buy .contentBox .payContent .right .discountInfo{
        text-align: right;
        font-size:12px;
        color:rgba(0,0,0,1);
        margin: 14px 0 20px;
    }

    #buy .contentBox .payContent .right .discountInfo span{
        color: #F05050;
        font-size: 14px;
    }

    #buy .contentBox .payContent .right .stepBtn{
        width:450px;
        height:32px;
        background:rgba(237,149,21,1);
        border-radius:16px;
        font-size:12px;
        text-align: center;
        line-height: 32px;
        color:rgba(255,254,254,1);
        margin-top: 34px;
        cursor: pointer;
    }

    #buy .contentBox>.desc{
        text-align: center;
        font-size:12px;
        margin: 32px 0 110px;
        color:rgba(148,148,149,1);
    }

    #buy .contentBox .cordPopperTxt{
        font-size: 12px;
        color: #F16161;
        cursor: pointer;
        text-decoration: underline;
    }

    /*支付二维码*/
    #downLoad  .payCodeBox{
        background: rgba(0,0,0,.4);
        z-index: 2034;
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
    }

    #downLoad .innerVisibleBox{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        width:260px;
        height:270px;
        background:rgba(255,255,255,1);
    }

    #downLoad .innerVisibleBox.alipayVisibleBox{
        width:200px;
        height:180px;
        box-sizing: border-box;
        padding-top: 28px;
    }

    #downLoad .innerVisibleBox img{
        width:200px;
        height:200px;
        /*margin: 0 auto;*/
        margin: 20px auto 0;
        display: block;
    }

    #downLoad .innerVisibleBox .payDesc{
        font-size:12px;
        text-align: center;
        color:rgba(0,0,0,1);
        line-height: 18px;
    }
</style>