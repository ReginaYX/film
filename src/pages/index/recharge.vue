<template>
    <div id="recharge">
        <index-top :register="registerBtn" @register1="registerData"></index-top>
        <!--充值介绍-->
        <div class="rechargeDescBox">
            <p>我们为不同规模的团队提供最适用的方案</p>
        </div>
        <div class="rechargeServicePickerBox">
            <!--套餐-->
            <div v-for="(item, index) in Plan" :key="index" :class="['rechargeServicePick',item.recommend=='1'?'active':'']" @mouseenter ="selectedYearPrice(index)">
                <div class="rechargeServiceNumBackg">
                    <div class="ServiceTitle">{{item.name}}</div>
                    <span class="ServiceTitleContent">{{item.description}}</span>
                    <div class="price"  v-if="item.fee != '-1'">
                        ￥<span class="rechargeServicePresent">{{item.fee}}</span>/年
                    </div>
                    <div class="price"  v-else>
                        <span class="rechargeServicePresent">按需</span>
                    </div>
                    <div class="mask" v-if="item.convert">{{item.convert}}</div>
                    <div class="mask sale" v-else>&nbsp</div>
                    <!--<div class="sale" v-if="item.package_id == 7">低至2.1元/人/天</div>-->
                    <div class="payButton" @click="login" v-if="item.fee == 0">{{item.name}}</div>
                    <div class="payButton" @click="service" v-else-if="item.fee == -1">升级到{{item.name}}</div>
                    <div class="payButton" @click="payBox(index)" v-else-if="item.package_id == userPackage.package_id">{{item.name}}续费</div>
                    <div class="payButton" @click="payBox(index)" v-else>升级到{{item.name}}</div>
                </div>
                <div class="rechargeContent">
                    <div class="rechargeServiceNum" v-for="(items, indexs) in item.base" :key="indexs" >
                        <div class="serviceList" >
                            <p class="originalText">{{items.left}}</p>
                        </div>
                        <div class="serviceIcon">
                            <p class="originalText">{{items.right}}</p>
                        </div>
                    </div>
                    <div class="rechargeServiceDiscount" v-if="item.more">更多特权</div>
                    <div class="rechargeServicePrice" v-for="privilege in item.more">
                        <div class="serviceList">
                            <p class="originalText">{{privilege.left}}</p>
                        </div>
                        <div class="serviceIcon">
                            <p class="originalText">{{privilege.right}}</p>
                        </div>
                    </div>
                </div>

            </div>

        </div>
        <div class="payProblem">
            <div class="problem">
                <div class="textTitle">常见付费问题</div>
                <div class="contentBox">
                    <el-collapse class="textBox" accordion>
                        <el-collapse-item title="1.免费版用户顺场景表只能下载50场吗？" name="1" class="textProblem">
                            <div class="textContent">免费版用户场景表下载50场内不收取任何费用，超出的场次将按0.5元/场进行收费。</div>
                        </el-collapse-item>
                        <el-collapse-item title="2.可以开具发票吗？" name="2" class="textProblem">
                            <div class="textContent">由于非幕公司每月开票数量限制，需开具发票的用户需提前申请和备注，以免公司当月开票量太大，发票限额用尽，导致延迟或耽误为您开票。公司开具的增值税(电子或纸质）专用发票的货物或应税劳务、服务名称一栏填写的是*信息技术服务*软件服务费*，开出的发票金额均为含税价格，税率为3%。</div>
                        </el-collapse-item>
                        <el-collapse-item title="3.付费/试用版本到期以后还可以继续使用吗？" name="3" class="textProblem">
                            <div class="textContent">当您购买的付费版本到期后，您可以选择续费，正常使用非幕的付费功能。如果您暂时不希望付费，您的版本将会自动降为免费版，并且将无法使用非幕的付费功能。</div>
                        </el-collapse-item>
                        <el-collapse-item title="4.可以对公支付吗？可以微信或支付宝吗？" name="4" class="textProblem">
                            <div class="textContent">如需对公转账，扫描二维码通过[微信公众号]后台联系非幕科技。您也可以直接通过支付宝或微信付费。</div>
                        </el-collapse-item>
                        <el-collapse-item title="5.月付和年付分别是按多少天来计算的？" name="5" class="textProblem">
                            <div class="textContent">为了公平起见，我们是按照每月31天，每年366天来计算，给到大家更多的时长</div>
                        </el-collapse-item>
                        <el-collapse-item title="6.购买之后，还可以更换方案吗？" name="6" class="textProblem">
                            <div class="textContent">我们提供套餐升级服务，如果您希望升级套餐，请联系我们的在线客服，为您处理。</div>
                        </el-collapse-item>
                        <el-collapse-item title="7.付费价格有优惠吗？" name="7"  class="textProblem">
                          <div class="textFlex">
                            <div class="textLeft">
                              <div class="textContent">目前我们主要是在一些线上、线下活动中给参与者发放付费折扣券。如果您想获得折扣券，建议关注一下我们的公众号</div>
                              <div class="textContent">和讨论区，以便第一时间获取我们的线上、线下活动信息。用微信扫描以下二维码即可关注我们的公众号：</div>
                            </div>
                            <img src="../../assets/erweima.png">
                          </div>

                        </el-collapse-item>
                    </el-collapse>
                </div>
            </div>

            <!--二维码弹窗-->
            <el-dialog class="payRight" title="扫码支付" width="400px" :visible.sync="dialogFormVisible">
                <img src="../../assets/paySuccess.png" alt="" class="QRCode" v-if="payResult">
                <img class="QRCode" src="" v-else-if="radio == '1'">
                <iframe class="alipayQRcode" src="" v-else></iframe>
                <div class="payDesc" style="color: #00c800" v-if="payResult">{{payResult}}</div>
                <div class="payDesc">
                    <br>要了解更多信息，请阅读<router-link to="/agreement">服务协议</router-link>。
                </div>
            </el-dialog>
        </div>
        <el-dialog title="确认信息" :visible.sync="outerVisible" class="payDialog" width="624px" center>
            <div class="countBox">
                <div class="countTopBox">
                    <div class="countTopLeft">
                        <p class="title">{{priceData[0].type}}</p>
                        <p>有效期至{{priceData[0].validity}}</p>
                    </div>
                    <div class="countNum">{{priceData[0].price}}</div>
                </div>
                <div class="countBottomBox">
                    <p v-for="item,index in priceData[0].base" :key="index">
                        {{item.left}}<span v-if="item.right!='√'">{{item.right}}</span>
                    </p>
                    <p></p>     <p></p>
                </div>
            </div>
            <div class="couponBox">
                <div class="couponTopBox">
                    <div class="couponTitle" v-if="coupon.length!=0">使用优惠券 ∨</div>
                    <div class="couponTitle" v-else>使用优惠券</div>
                    <div class="couponNum" v-if="coupon.length!=0">－{{priceData[0].due}}</div>
                    <div class="couponNum" v-else>暂无可用优惠券</div>
                </div>
                <div class="couponContentBox" v-if="coupon.length!=0">
                    <div class="couponBtn" @click="couponScroll('prev')"><i class="el-icon-arrow-left"></i></div>
                    <div class="scrollBox">
                        <ul id="couponScroll" style="left: 0px">
                            <li v-for="item in coupon" :key="item.coupon_id" @click="currentSel(item.coupon_id)">
                                <div class="couponItemTop">
                                    <div class="couponNum">￥{{item.discount}}</div>
                                    <div class="couponDesc">满{{item.restrict}}可用</div>
                                </div>
                                <div class="couponDate">有效期至{{item.expire_at | dateChange}}</div>
                            </li>
                        </ul>
                    </div>
                    <div class="couponBtn" @click="couponScroll('next')"><i class="el-icon-arrow-right"></i></div>
                </div>
            </div>
            <div class="totalBox">
                <div class="totalTop">
                    <div class="totalTitle">实付金额：</div>
                    <div class="totalNum">￥{{this.payment | changeFee}}</div>
                </div>
            </div>
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
            <div class="payDesc"><span>*</span>当您提交您的支付信息时，您的资料将得到具有安全套接层（SSL）技术认证的数字证书保护</div>
        </el-dialog>
        <enterprise></enterprise>
        <fm-footer />
    </div>
</template>

<script>
    import axios from "axios"
    import fmFooter from "../../common/fmFooter";
    import indexTop from "../../common/indexTop";
    import enterprise from "../../common/enterpriseService";
    export default {
        name: "recharge",
        components: {fmFooter, indexTop,enterprise},
        data(){
            return{
                registerBtn :false,
                price: '',//价格
                type: '',//充值类型
                unit: '',//月/年
                scale: '',//适用人数
                coupon:[{//优惠券
                    coupon_id: '',
                    description: '',
                    discount: '',
                    expire_at: '',
                    name: '',
                    user_id: '',
                }],
                discount:'',
                payment: '',//最终价格
                dueId: '',//优惠ID
                due: '',//优惠ID
                activeName: 'second',//切换支付方式
                radio:1,//选择支付方式
                outerVisible:false,//支付弹窗
                innerVisible:false,//支付内层弹窗
                enterpriseServicePlanForm:{//公司信息
                    company:'',
                    contact:'',
                    phone:'',
                    email:''
                },
                payResult:'',
                dialogFormVisible:false,//支付弹窗
                order_id:'',
                priceData:[{//支付列表
                    type:'',
                    price:'',
                    validity:'',
                    due:'',
                    payment:'',
                    package_id:'',
                    base:''
                }],
                options:'',
                Plan:'',//套餐列表
                bases:'',//功能内容
                userPackage:{package_id:'',package_due:''},//用户套餐
            }
        },
        methods:{
            //优惠券滚动
            couponScroll(type){
                var content = document.getElementById("couponScroll");
                if(type == 'next'){
                    if(468+content.offsetLeft*-1>=content.offsetWidth){
                        return
                    }else{
                        content.style.left = content.offsetLeft - 156 + 'px';
                    }
                }else{
                    if(content.offsetLeft>=0){
                        return
                    }else{
                        content.style.left = content.offsetLeft + 156 + 'px';
                    }
                }
            },
            //头部登录
            registerData(data){
                if(data == false){
                    this.registerBtn = false
                }
            },

            login(){
                this.$router.push('/')
            },

            service(){
                this.$router.push('/service')
            },

            //价格选择
            selectedPrice(n){
                $(".rechargeServicePick").eq(n-1).addClass("active").siblings().removeClass("active");
            },

            //年费价格选择
            selectedYearPrice(n){
                $(".rechargeServicePick").eq(n).addClass("active").siblings().removeClass("active");
            },

            leaveYearPrice(n){
                $(".rechargeServicePick").eq(n-5).removeClass("active");
            },

            //支付弹窗
            payBox(n){
                if(localStorage.user_id){
                    this.outerVisible = true;
                    this.priceData[0].type = this.Plan[n].name;
                    this.price = this.Plan[n].fee + '00';
                    this.priceData[0].price = "￥" + this.Plan[n].fee + '.00';
                    this.scale = this.Plan[n].people;
                    this.priceData[0].package_id = this.Plan[n].package_id
                    this.unit = this.Plan[n].duration;
                    this.type = this.Plan[n].package_id;
                    this.priceData[0].base = this.Plan[n].base;

                    if(this.userPackage.package_id == this.Plan[n].package_id){
                        if(this.Plan[n].duration == 'month'){
                            if(this.userPackage.package_due!='-1'){
                                var time = new Date(this.userPackage.package_due*1000);
                            }else{
                                var time = new Date();   // 程序计时的月从0开始取值后+1
                            }

                            var y = time.getFullYear();
                            var m = time.getMonth() + 1;
                            var t = y + "-" + m + "-"
                                + time.getDate();
                            this.priceData[0].validity = t;
                        }else{
                            if(this.userPackage.package_due!='-1'){
                                var time = new Date(this.userPackage.package_due*1000);
                            }else{
                                var time = new Date();   // 程序计时的月从0开始取值后+1
                            }

                            var y = time.getFullYear() + 1;
                            var m = time.getMonth() + 1;
                            var t = y + "-" + m + "-"
                                + time.getDate();
                            this.priceData[0].validity = t;
                        }
                    }else{
                        if(this.Plan[n].duration == 'month'){
                            if(this.userPackage.package_due!='-1'){
                                var time = new Date(this.userPackage.package_due*1000);
                            }else{
                                var time = new Date();   // 程序计时的月从0开始取值后+1
                            }

                            var y = time.getFullYear();
                            var m = time.getMonth() + 2;
                            var t = y + "-" + m + "-"
                                + time.getDate();
                            this.priceData[0].validity = t;
                            console.log(this.userPackage)
                        }else{
                            if(this.userPackage.package_due!='-1'){
                                var time = new Date(this.userPackage.package_due*1000);
                            }else{
                                var time = new Date();   // 程序计时的月从0开始取值后+1
                            }

                            var y = time.getFullYear() + 1;
                            var m = time.getMonth() + 1;
                            var t = y + "-" + m + "-"
                                + time.getDate();
                            this.priceData[0].validity = t;
                        }
                    }

                    //获取代金券
                    this.$axios.get('/coupon/get_user_coupon', {
                        params: {
                            user_id: JSON.parse(localStorage.user_id),
                            status: '0',
                            fee: this.Plan[n].fee
                        }
                    }).then((response)=> {
                        this.coupon = response.data.data
                    })

                    if(this.discount){
                        this.priceData[0].due = "￥" + this.discount;
                    }else{
                        this.priceData[0].due = "￥0";
                    }

                    this.due = this.discount + '00';

                    this.payment = this.price;
                    this.priceData[0].payment ="￥" + this.price / 100;

                    if( this.due != 0){
                        this.payment = this.price - this.due;
                        this.priceData[0].payment ="￥" + (this.price - this.due) / 100;
                    }
                }else{
                    this.$message('请先登录');
                    this.$router.push('/login')
                }
            },

            //使用优惠券
            currentSel(value){
                let index = this.coupon.findIndex(d => d.coupon_id == value);
                if($('#couponScroll li').eq(index).attr("class")=='active'){
                    $('#couponScroll li').eq(index).removeClass("active");
                    this.dueId = value;
                    this.priceData[0].due = "￥" + this.coupon[index].discount;
                    if(this.priceData[0].payment.substring(1) - this.coupon[index].discount>=0){

                        this.payment = (this.priceData[0].payment.substring(1) - this.coupon[index].discount)*100;
                    }else{
                        this.payment = 0;
                    }
                }else{
                    $('#couponScroll li').eq(index).addClass("active").siblings().removeClass("active");
                    this.dueId = '';
                    this.priceData[0].due = "￥0";
                    this.payment = this.priceData[0].payment.substring(1)*100
                }
            },



            // 支付
            pay(){

                if(localStorage.user_id === undefined){

                    this.$confirm('请先登录', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.$router.push('/login')
                    });

                }else {
                    //微信支付
                    if (this.radio == 1){

                        this.dialogFormVisible = true;

                        //微信支付
                        this.QRcode();
                        this.payStatus();

                    }else if (this.radio == 2) {
                        this.dialogFormVisible = true;
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

            },

            useCoupon(){
                //使用优惠券
                let form = new FormData();
                form.append("coupon_id",this.dueId);
                axios({
                    method: 'post',
                    url: '/coupon/use',
                    data: form,
                    headers:{
                        'Content-Type': 'multipart/form-data',
                        'Accept': '*/*',
                        'X-Requested-With': 'XMLHttpRequest'
                    }
                }).then((response)=> {
                    // this.$message({
                    //   message: '优惠券已使用',
                    //   type: 'success'
                    // })
                })
            },


            //支付状态查询
            payStatus(){
                var payLoad = window.setInterval(() => {
                    axios.get('/order/status', {
                        params:{
                            order_id: this.order_id,
                        }
                    }).then((response)=> {
                        if(response.data.ret == '0'){
                            this.useCoupon();
                            this.payResult = '支付成功';
                            window.clearInterval(payLoad);
                            var payClose = window.setTimeout(() => {
                                this.dialogFormVisible = false;
                                this.outerVisible = false
                            },3000)

                        }else{
                            // this.$message.error(response.data.msg);
                            if (this.dialogFormVisible == false) {
                                window.clearInterval(payLoad);

                            }
                        }


                    })
                }, 3000);
            },

            //获取微信充值二维码
            QRcode(n){
              if(this.dueId){
                var obj = {user_id: JSON.parse(localStorage.user_id),package_id: this.priceData[0].package_id,coupon_id:this.dueId};
              }else{
                var obj = {user_id: JSON.parse(localStorage.user_id),package_id: this.priceData[0].package_id};
              }
                axios.get('/pay/wxpay/unifiedorder_package', {
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
                if(this.dueId){
                  var obj = {user_id: JSON.parse(localStorage.user_id),package_id: this.priceData[0].package_id,coupon_id:this.dueId};
                }else{
                  var obj = {user_id: JSON.parse(localStorage.user_id),package_id: this.priceData[0].package_id};
                }
                axios.get('/pay/alipay/unifiedorder_package', {
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
                        axios({
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
            }
        },
        filters: {

            //时间转换
            changeTimeDay: function (value) {
                var date = new Date();
                date.setTime(value * 1000);
                var y = date.getFullYear();
                var m = date.getMonth() + 1;
                m = m < 10 ? ('0' + m) : m;
                var d = date.getDate();
                d = d < 10 ? ('0' + d) : d;
                var H = date.getHours();
                H = H < 10 ? ('0' + H) : H;
                var M = date.getMinutes();
                M = M < 10 ? ('0' + M) : M;
                var S = date.getSeconds();
                S = S < 10 ? ('0' + S) : S;
                return y + '-' + m + '-' + d + '  ' + H + ':' + M + ':' + S;

                return date;
            },

            //时间转换
            changeFee: function (value) {
                var fee = value / 100;

                return fee;
            }
        },
        mounted(){
            axios.get('/home/packages').then((response)=> {
                this.Plan = response.data.data;
                for ( var i = 0; i < response.data.data.length; i++){
                    this.Plan[i].base = JSON.parse(response.data.data[i].base);
                    this.Plan[i].more = JSON.parse(response.data.data[i].more);

                    if (this.bases.right == "√" ){
                        this.right = '<i class="el-icon-check"></i>'
                    }
                }
            })
            if(localStorage.user_id) {
                var user_id = JSON.parse(localStorage.user_id)
                this.$axios.get('/user/info', {
                    params: {
                        user_id: user_id
                    }
                }).then((response)=> {
                    if(response.data.data.package_id){
                        this.userPackage = {package_id:response.data.data.package_id,package_due:response.data.data.package_due}
                    }
                })
            }
        },
        updated(){


        }
    }
</script>
<style>

    .payProblem .problem .contentBox .el-collapse{
        border: none !important;
    }

    #recharge .payDialog .el-dialog__header{
        border-bottom: none!important;
        padding-top: 26px;
    }

    #recharge .payDialog .el-dialog__header .el-dialog__headerbtn{
        display: none;
    }

    #recharge .payDialog .el-dialog__body{
      padding: 0 61px 60px!important;
    }

    .payRight.el-dialog__wrapper .el-dialog .el-dialog__body{
        padding: 20px 0;
    }


    .enterpriseServicePlanLeft .enterpriseServicePlanForm  .el-input{
        width: auto;
    }

    .enterpriseServicePlanLeft .enterpriseServicePlanForm .enterpriseServicePlanInput .el-input__inner{
        width: 410px;
        font-size: 16px;
        background: none;
        border: 1px solid rgba(255,255,255,.8);
        border-radius: 6px;
        transition: border-bottom-color 1s;
        color: #fff;
        background: none!important;
    }

    .enterpriseServicePlanLeft .enterpriseServicePlanForm .enterpriseServicePlanInput .el-input__inner:focus{
      border-bottom-color: #fff;
    }

    .enterpriseServicePlanLeft .enterpriseServicePlanForm .enterpriseServicePlanInput .el-input__inner::placeholder{
      color: rgba(255,255,255,.8);
    }

    .enterpriseServicePlanLeft .enterpriseServicePlanForm .enterpriseServicePlanInput .el-input__suffix i{
      color: rgba(255,255,255,.8);
      line-height: 40px;
    }

    /*按钮修改*/
    .payDialog .payContent .el-button--info{
        background: #DCDCE4;
        border-color:#DCDCE4;
    }

    .rechargeServicePickerBox .rechargeServicePick.active .el-button--info{
        background: #ffffff;
        border-color:#ffffff;
        color: #ED9515;
    }
    .enterpriseServiceBox+#footer .hr{
        display: none;
    }
    .enterpriseServiceBox+#footer .footer_content{
        padding-top: 84px;
    }

    /*常见问题手风琴*/
    .payProblem .textBox .el-collapse-item__header{
      font-size:14px;
      font-family:MicrosoftYaHei;
      font-weight: bold;
      color:rgba(0,0,0,1);
      border-bottom: none;
      height: 40px;
      line-height: 40px;
      background:rgba(245,245,246,1);
    }

    .payProblem .textBox .el-collapse-item__header i{
      font-weight: bold;
      font-size: 10px;
    }

    .payProblem .textBox .el-collapse-item__wrap{
      border-bottom: none;
    }

    .payProblem .textBox .el-collapse-item__content{
      padding: 20px 0 40px;
      background:rgba(245,245,246,1);
    }

    /*企业服务输入框*/
    .enterpriseServiceBox .enterpriseServicePlanBox .enterpriseServicePlanForm .enterpriseServicePlanInput .el-input__inner{
      height: 34px;
    }

    .enterpriseServiceBox .enterpriseServicePlanBox .enterpriseServicePlanForm .enterpriseServicePlanInput  .el-input__suffix i{
      line-height: 34px;
    }
</style>
<style scoped>
    *{
        box-sizing: border-box;
    }

    .rechargeDescBox{
        width: 100vw;
        height: 660px;
        background-image: url("../../assets/rechargeTitle.png");
        background-size: 100vw 659px;
        background-repeat: no-repeat;
        overflow: hidden;
    }

    .rechargeDescBox p{
        text-align: center;
        font-size:30px;
        font-family:SimSun;
        font-weight:bold;
        color:rgba(255,255,255,1);
        margin: 160px 0 0;
    }

    .rechargeServicePickerBox{
        width: 1130px;
        margin: -324px auto 150px;
        display: flex;
        justify-content: space-between;
    }
    .rechargeServicePickerBox .rechargeServicePick{
        margin-right: 14px;
        width: 350px;
        cursor: pointer;
        height: 1062px;
        flex-shrink: 0;
        border: 1px solid rgba(211,212,236,1);
        box-sizing: border-box;
        text-align: center;
        overflow: hidden;
        position: relative;
      border-radius: 6px;
      transition: all 0.8s;
      /*border-radius: 6px;*/
    }

    .rechargeServicePickerBox .rechargeServicePick.active{
        border-color: #F05050;
        box-shadow: 0 0 10px 6px rgba(0,0,0,.05);
        /*border-top: none;*/
    }

    .rechargeServicePickerBox .rechargeServicePick .rechargeServiceNumBackg{
        width: 100%;
        height: 322px;
        background-color: transparent;
        font-size:70px;
        font-family:MicrosoftYaHei;
        font-weight:400;
        text-align: center;
        /*position: relative;*/
        /*border-radius: 6px 6px 0 0;*/
        transition: all 0.8s;
    }

    .rechargeServicePickerBox .rechargeServicePick.active .rechargeServiceNumBackg{
        background-color:#F05050 ;
        color: #ffffff;
    }

    .rechargeServicePickerBox .rechargeServicePick .rechargeServiceNumBackg .rechargeBackg{
      position: absolute;
      top: 0;
      left: 0;
      width: 165px;
      opacity: 0;
      transition: opacity 1s;
    }

    .rechargeServicePickerBox .rechargeServicePick.active .rechargeServiceNumBackg .rechargeBackg{
      opacity: 1;
    }

    .rechargeServicePickerBox .rechargeServicePick .rechargeServiceNumBackg .ServiceTitle{
        font-size:20px;
        font-family:SimSun;
        font-weight:bold;
        color:#ffffff;
        padding-top: 20px;
    }

    .rechargeServicePickerBox .rechargeServicePick.active .rechargeServiceNumBackg .ServiceTitle{
        color: #ffffff;
    }

    .rechargeServicePickerBox .rechargeServicePick .rechargeServiceNumBackg .ServiceTitleContent{
        display: inline-block;
        font-size:12px;
        font-family:MicrosoftYaHeiLight;
        font-weight:300;
        color:rgba(255,254,254,1);
        opacity:0.8;
        line-height: 18px;
        width: 60%;
    }


    .rechargeServicePickerBox .rechargeServicePick .rechargeServiceNumBackg .price{
        font-size:24px;
        font-weight:600;
        color:#ffffff;
        margin-top: 34px;
    }

    .rechargeServicePickerBox .rechargeServicePick:last-child .rechargeServiceNumBackg .price{
        margin-top: 33px;
    }

    .rechargeServicePickerBox .rechargeServicePick.active .rechargeServiceNumBackg .price{
        font-size:26px;
        font-family:MicrosoftYaHei;
        font-weight:600;
        color: #ffffff;
        margin-top: 34px;
    }

    .rechargeServicePickerBox .rechargeServicePick .rechargeServiceNumBackg .price span{
        font-size: 46px;
    }

    .rechargeServicePickerBox .rechargeServicePick:last-child .rechargeServiceNumBackg .price span{
        font-size: 38px;
        line-height: 39px;
    }

    .rechargeServicePickerBox .rechargeServicePick .rechargeServiceNumBackg .mask{
        width:212px;
        height:24px;
        position: static;
        margin: 15px auto 0;
        font-size:12px;
        text-align: center;
        line-height: 24px;
        letter-spacing: 2px;
        color:rgba(255,255,255,1);
        background:  linear-gradient(
            to right,
            rgba(255,255,255,0) 0%,
            rgba(255,255,255,0.1) 10%,
            rgba(255,255,255,0.2) 20%,
            rgba(255,255,255,0.3) 30%,
            rgba(255,255,255,0.4) 40%,
            rgba(255,255,255,0.5) 50%,
            rgba(255,255,255,0.4) 60%,
            rgba(255,255,255,0.3) 70%,
            rgba(255,255,255,0.2) 80%,
            rgba(255,255,255,0.1) 90%,
            rgba(255,255,255,0) 100%)
    }

    .rechargeServicePickerBox .rechargeServicePick .rechargeServiceNumBackg .sale{
        background: none;
    }

    .rechargeServicePickerBox .rechargeServicePick .rechargeServiceNumBackg .payButton{
        width:220px;
        height:34px;
        border:1px solid rgba(255,255,255,1);
        border-radius:16px;
        text-align: center;
        line-height: 34px;
        margin: 42px auto 0;
        cursor: pointer;
        color: #fff;
        font-size: 12px;
        letter-spacing: 2px;
        font-weight: bold;
        transition: all 0.8s;
    }

    .rechargeServicePickerBox .rechargeServicePick.active .rechargeServiceNumBackg .payButton{
        background:rgba(255,255,255,1);
        color:rgba(237,149,21,1);
    }

    .rechargeServicePickerBox .rechargeServicePick .rechargeContent{
      width: 100%;
      height: calc(100% - 322px);
      border: 1px solid #fff;
        box-sizing: border-box;
      border-top: none;
      transition: all 0.8s;
      padding: 30px 0;
      border-radius: 0 0 6px 6px;
    }

    .rechargeServicePickerBox .rechargeServicePick.active .rechargeContent{
      border-color: #F05050;
    }

    .rechargeServicePickerBox .rechargeServicePick{
        font-family:MicrosoftYaHeiLight;
        font-weight:bold;
        color:rgba(0,0,0,1);
        line-height:30px;
        /*opacity:0.6;*/
    }

    .rechargeServicePickerBox .rechargeServicePick .rechargeServiceNum{
        display: flex;
        align-items: center;
        justify-content: space-between;
        /*margin-top: 26px;*/
        opacity: 0.6;
        width: 100%;
        padding: 0 30px;
        box-sizing: border-box;
        transition: all 0.8s;
    }

    .rechargeServicePickerBox .rechargeServicePick.active .rechargeServiceNum{
        opacity: 1;
    }

    .rechargeServicePickerBox .rechargeServicePick  .originalText{
        font-size: 12px;
        color: #000;
        font-weight: normal;
    }

    .rechargeServicePickerBox .rechargeServicePick .serviceIcon .originalText{
        color: #F05050;
    }

    .rechargeServicePickerBox .rechargeServicePick .serviceList{
        width: 108px;
        text-align: left;
    }

    .rechargeServicePickerBox .rechargeServicePick .serviceIcon{
        text-align: right;
    }

    .rechargeServicePickerBox .rechargeServicePick .rechargeServicePrice{
        box-sizing: border-box;
        padding: 0 30px;
        font-family: Microsoft Yahei, 微软雅黑;
        width: 100%;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .rechargeServicePickerBox .rechargeServicePick .rechargeServicePrice span{
        font-size: 18px;
        margin-left: 22px;
        color: #fff;
        font-family: Microsoft Yahei, 微软雅黑;
    }

    .rechargeServicePickerBox .rechargeServicePick .rechargeServiceDiscount{
        margin-top: 54px;
        margin-bottom: 40px;
        font-size:12px;
        text-align: center;
        position: relative;
        color: #8D8D8D;
        line-height:30px;
        font-weight: bold;
    }

    .rechargeServicePickerBox .rechargeServicePick.active .rechargeServiceDiscount{
      color: rgba(57,63,81,1);;
    }
    /*折扣伪类横线*/
    .rechargeServicePickerBox .rechargeServicePick .rechargeServiceDiscount:after,
    .rechargeServicePickerBox .rechargeServicePick .rechargeServiceDiscount:before {
        background: rgba(186,186,186,1);
        content: "";
        height: 1px;
        position: absolute;
        top: 50%;
        width: 20%;
      opacity: 0.8;
    }

    /*调整背景横线的左右距离*/
    .rechargeServicePickerBox .rechargeServicePick .rechargeServiceDiscount:before{
        left: 30px;
    }

    .rechargeServicePickerBox .rechargeServicePick .rechargeServiceDiscount:after {
        right: 30px;
    }


    .payProblem{
        display: flex;
        align-items: center;
        padding: 90px 0 300px;
      background:rgba(245,245,246,1);
    }

    .payProblem .problem{
        margin: 0 auto;
    }

    .payProblem .problem .textTitle{
        display: block;
        text-align: center;
        margin: 0 auto;
        font-size:26px;
        font-family:MicrosoftYaHei;
        font-weight:bold;
        color:rgba(57,63,81,1);
      line-height: 26px;
    }

    .payProblem .problem .contentBox{
        margin-top: 2px;
        width: 800px;
    }

    .payProblem .problem .contentBox .textBox{
        margin-top: 58px;
    }

    .payProblem .problem .contentBox .textBox .textProblem{
        font-size:14px !important;
        font-family:MicrosoftYaHei;
        font-weight:bold;
        color:rgba(0,0,0,1);
        display: block;
    }

    .payProblem .problem .contentBox .textBox .textContent{
        font-size:12px !important;
        font-family:MicrosoftYaHei;
        color:rgba(0,0,0,1);
        opacity:0.8;
      font-weight: normal;
    }

    .payProblem .problem .contentBox .textBox .textFlex{
      display: flex;
      justify-content: space-between;
    }

    .payProblem .problem .contentBox .textBox .textFlex img{
      width: 80px;
      height: 80px;
    }

    /*支付弹框*/
    #recharge .payDialog .countBox{
        background-image: url("../../assets/rechargePayBg.png");
        width:100%;
        height:180px;
        border-radius:4px;
        background-repeat: no-repeat;
        background-color: #8249E0;
        padding: 0 18px 0 22px;
    }

    #recharge .payDialog .countBox .countTopBox{
        display: flex;
        padding: 16px 0 15px;
        align-items: center;
        justify-content: space-between;
    }

    #recharge .payDialog .countBox .countTopBox .countTopLeft p{
        font-size:12px;
        line-height: 12px;
        color:rgba(255,255,255,1);
        margin-left: -5px;
    }

    #recharge .payDialog .countBox .countTopBox .countTopLeft p.title{
        font-size:18px;
        line-height: 18px;
        margin-bottom: 8px;
        color:rgba(255,255,255,1);
    }

    #recharge .payDialog .countBox .countTopBox .countNum{
        font-size:44px;
        line-height: 40px;
        font-weight:bold;
        color:rgba(255,255,255,1);
        margin-right: 3px;
    }

    #recharge .payDialog .countBox .countBottomBox{
        padding: 12px 0 0;
        border-top: 2px dashed #fff;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }

    #recharge .payDialog .countBox .countBottomBox p{
        font-size:12px;
        line-height: 12px;
        margin-top: 12px;
        color:rgba(255,255,255,1);
        flex-shrink: 0;
        width: calc(100%/3 - 24px);
    }

    #recharge .payDialog .countBox .countBottomBox span{
        font-size:12px;
        line-height: 12px;
    }

    /*优惠券*/
    #recharge .payDialog .couponBox .couponTopBox{
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 18px 0;
    }

    #recharge .payDialog .couponBox .couponTopBox>div{
        font-size:12px;
        font-family:Microsoft YaHei;
        font-weight:400;
        color:rgba(0,0,0,1);
        opacity:0.8;
    }

    #recharge .payDialog .couponBox .couponContentBox{
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 18px;
        height: 60px;
        width: 100%;
        overflow: hidden;
    }

    #recharge .payDialog .couponBox .couponContentBox .couponBtn{
        width:14px;
        height: 100%;
        background:rgba(57,63,81,0.08);
        border:1px solid rgba(0,0,0,0.08);
        border-radius:6px;
        text-align: center;
        cursor: pointer;
    }

    #recharge .payDialog .couponBox .couponContentBox .couponBtn i{
        font-size: 14px;
        color: #616574;
        line-height: 58px;
    }

    #recharge .payDialog .couponBox .couponContentBox .scrollBox{
        width: calc(100% - 28px);
        height: 60px;
        overflow: hidden;
        position: relative;
    }

    #recharge .payDialog .couponBox .couponContentBox ul{
        display: flex;
        align-items: center;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        transition: left .8s;
    }

    #recharge .payDialog .couponBox .couponContentBox ul li{
        width:150px;
        height:100%;
        background:rgba(235,235,237,1);
        border:1px solid rgba(210,210,210,1);
        border-radius:4px;
        margin-left: 6px;
        flex-shrink: 0;
        cursor: pointer;
        padding: 0 5px 0 7px;
        transition: all 0.4s;
    }

    #recharge .payDialog .couponBox .couponContentBox ul li.active{
        background:rgba(251,234,208,1);
        border-color:rgba(237,149,21,1);
    }

    #recharge .payDialog .couponBox .couponContentBox ul .couponItemTop{
        display: flex;
        align-items: flex-end;
        padding: 8px 0 8px 6px;
        border-bottom: 1px dashed;
        border-color: rgba(210,210,210,1);
        transition: all 0.4s;
    }

    #recharge .payDialog .couponBox .couponContentBox ul li.active .couponItemTop{
        border-color: rgba(237,149,21,1);
    }

    #recharge .payDialog .couponBox .couponContentBox ul .couponItemTop .couponNum{
        font-size:24px;
        color:rgba(57,63,81,0.8);
        margin-right: 12px;
        line-height: 20px;
        transition: all 0.4s;
    }

    #recharge .payDialog .couponBox .couponContentBox ul li.active .couponNum{
        color:rgba(240,80,80,1);
    }

    #recharge .payDialog .couponBox .couponContentBox ul .couponItemTop .couponDesc{
        font-size:12px;
        color:rgba(57,63,81,0.8);
        line-height: 13px;
        transition: all 0.4s;
    }

    #recharge .payDialog .couponBox .couponContentBox ul li.active .couponDesc,
    #recharge .payDialog .couponBox .couponContentBox ul li.active .couponDate{
        color:rgba(0,0,0,.8);
    }

    #recharge .payDialog .couponBox .couponContentBox ul .couponDate{
        font-size:12px;
        color:rgba(57,63,81,0.8);
        line-height: 12px;
        margin-top: 4px;
        padding-left: 5px;
        transition: all 0.4s;
    }

    /*开通会员*/
    #recharge .payDialog .totalBox{
        width:100%;
        height:50px;
        background:rgba(108,111,191,0.08);
        border:1px solid rgba(0,0,0,0.08);
        border-radius:6px;
        margin-top: 26px;
    }

    #recharge .payDialog .totalBox>div{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 25px 0 20px;
        height: 100%;
    }

    #recharge .payDialog .totalBox .totalTop .totalTitle{
        font-size:12px;
        line-height: 12px;
        color:rgba(0,0,0,1);
    }

    #recharge .payDialog .totalBox .totalTop .totalNum{
        font-size:16px;
        line-height: 16px;
        color:#F05050;
        font-weight: bold;
        margin-right: 8px;
    }

    #recharge .payDialog .payDesc{
        font-size:12px;
        line-height: 12px;
        color:#888C97;
        margin: 15px 0 0;
    }

    #recharge .payDialog .payDesc span{
        font-size:12px;
        line-height: 12px;
        color:rgba(240,80,80,1);
    }

    #recharge .payDialog .stepBtn{
        width:100%;
        height:34px;
        background:rgba(237,149,21,1);
        border-radius:16px;
        margin-top: 32px;
        font-size:14px;
        line-height: 34px;
        text-align: center;
        color:rgba(255,255,255,1);
        cursor: pointer;
    }

    /*支付方式*/
    #recharge .payDialog .payMethodBox .payMethodTitleBox{
        margin: 20px 0;
    }

    #recharge .payDialog .payMethodBox .payMethodTitleBox .payMethodTitle{
        font-size:14px;
        color:rgba(57,63,81,1);
        line-height: 14px;
    }

    #recharge .payDialog .payMethodBox .payMethodRadio{
        display: flex;
    }

    #recharge .payDialog .payMethodBox .payMethodItem{
        width:150px;
        height:54px;
        background:rgba(255,255,255,0.3);
        border:1px solid rgba(57,63,81,0.3);
        border-radius:4px;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 10px;
    }

    #recharge .payDialog .payMethodBox .payMethodItem.is-checked{
        background:rgba(253,244,231,1);
        border-color: rgba(237,149,21,1);
    }

    .payRight .QRCode{
        width: 200px;
        height: 200px;
        display: block;
        margin: auto;
    }

    .payRight .alipayQRcode{
        width: 116px;
        height: 105px;
        display: block;
        margin: auto;
        overflow-x: hidden;
        overflow-y: hidden;
        border: none;
    }

    .payRight .alipayQRcode .qrPayImg{
        width: 200px;
        height: 200px;
    }

    .payRight .payDesc{
        font-size: 14px;
        width: 308px;
        margin: auto;
        text-align: center;
        margin-top: 10px;
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
      width:470px;
      height:536px;
      background:rgba(255,255,255,1);
      border-radius:4px;
      margin: -126px 0 62px 160px;
      padding: 0 50px 0 40px;
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
      margin-top: 40px;
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
      margin: 60px auto 0;
      color:rgba(255,255,255,1);
      line-height: 40px;
      text-align: center;
        cursor: pointer;
    }
    @media screen and (max-width: 1500px){
        .payRight{
            margin-left: 6%;
        }
        .payRight img{
            width: 80%;
        }
    }
</style>
