<template>
    <div id="downLoad">
        <index-top :register="registerBtn" @register1="registerData"></index-top>
        <div class="topBox">
            <div class="title">非幕统筹&#8197;2019&#8197;单机&#8197;版</div>
            <div class="desc">
                我们不只关心你的效率，我们更注重用户的数据安全<br/>
                下载非幕统筹桌面版，随时随地使用，无需网络，更方便的编辑你的场景表
            </div>
            <div class="btnBox">
                <div class="btn"><i class="iconfont iconwindows"></i>Windows版下载</div>
                <div class="btn">购买激活码</div>
            </div>
            <div class="buyTxt">仅支持Windows系统环境下使用</div>
        </div>
        <div class="descBox">
            <div class="descItem">
                <img src="../../assets/downloadDescIcon1.png" alt="">
                <span>一键统筹，智能标注<br>采用最新算法和技术</span>
            </div>
            <div class="descItem">
                <img src="../../assets/downloadDescIcon2.png" alt="">
                <span>随时随地<br>离线使用</span>
            </div>
            <div class="descItem">
                <img src="../../assets/downloadDescIcon3.png" alt="">
                <span>无需年费<br>一次付费终生使用</span>
            </div>
        </div>
        <div class="introduceBox">
            <div class="contentTitle">为用户解决实际难题，高效创作</div>
            <div class="contentBox">
                <div class="contentItem">
                    <i class="iconfont iconlixianshiyong"></i>
                    <div class="contentTitle">离线使用</div>
                    <div class="contentDesc">移动办公，随时随地<br/>用最便捷的方法解决最复杂问题</div>
                </div>
                <div class="contentItem">
                    <i class="iconfont iconwending"></i>
                    <div class="contentTitle">高稳定性</div>
                    <div class="contentDesc">软件稳定运行，无需网络<br/>不再受外在因素影响</div>
                </div>
                <div class="contentItem">
                    <i class="iconfont iconanquan2"></i>
                    <div class="contentTitle">安全可靠</div>
                    <div class="contentDesc">无需担心账号遗失或泄露<br/>你需要做的是不遗失你的电脑</div>
                </div>
            </div>
        </div>
        <el-carousel :interval="4000" type="card" class="evaluateBox" indicator-position="none" arrow="never" height="900px">
            <el-carousel-item class="itemBox">
                <div class="main">
                    <img src="../../assets/evaluateHead1.png" alt="" class="head">
                    <div class="right">
                        <div class="name">寂言</div>
                        <div class="contentBox imgBox">
                            <div class="imgTitle">剧本标注</div>
                            <img src="../../assets/evaluateContentImg1.png" alt="">
                        </div>
                        <div class="contentBox smallBox">标注完之后可直接导出Excel，非常方便。</div>
                    </div>
                </div>
            </el-carousel-item>
            <el-carousel-item class="itemBox">
                <div class="main">
                    <img src="../../assets/evaluateHead2.png" alt="" class="head">
                    <div class="right">
                        <div class="name">佛系将军</div>
                        <div class="contentBox imgBox">
                            <div class="imgTitle">总顺场景表</div>
                            <img src="../../assets/evaluateContentImg2.png" alt="">
                        </div>
                        <div class="contentBox smallBox">非幕对于咱们影视项目的管理真的事太有帮助了，牛！</div>
                    </div>
                </div>
            </el-carousel-item>
            <el-carousel-item class="itemBox">
                <div class="main">
                    <img src="../../assets/evaluateHead3.jpg" alt="" class="head">
                    <div class="right">
                        <div class="name">小杨树</div>
                        <div class="contentBox">
                            非幕的单机版统筹软件简直对我帮助太大了，以前拆解一个电视剧需要4~5天的时间，现在3个小时就完成了，极力推荐！！！
                        </div>
                    </div>
                </div>
                <div class="main">
                    <img src="../../assets/evaluateHead4.jpg" alt="" class="head">
                    <div class="right">
                        <div class="name">小杨树</div>
                        <div class="contentBox">
                            非幕对于中文剧本识别率非常高，稍微调整一下基本就可 以使用了，制片统筹必备啊！
                        </div>
                    </div>
                </div>
            </el-carousel-item>
            <el-carousel-item class="itemBox">
                <div class="main">
                    <img src="../../assets/evaluateHead5.jpg" alt="" class="head">
                    <div class="right">
                        <div class="name">喵了个咪</div>
                        <div class="contentBox">
                            单机版和线上的版本功能基本是一致的，可以放心购买。
                        </div>
                    </div>
                </div>
                <div class="main">
                    <img src="../../assets/evaluateHead6.jpg" alt="" class="head">
                    <div class="right">
                        <div class="name">老柒xk</div>
                        <div class="contentBox">
                            单机版的出现真的解决了我多年的烦恼，除了非幕，我找不到其他家了。
                        </div>
                    </div>
                </div>
            </el-carousel-item>
            <el-carousel-item class="itemBox">
                <div class="main">
                    <img src="../../assets/evaluateHead2.png" alt="" class="head">
                    <div class="right">
                        <div class="name">bzh的遥远</div>
                        <div class="contentBox imgBox">
                            <div class="imgTitle">电子通告单</div>
                            <img src="../../assets/evaluateContentImg3.jpg" alt="">
                        </div>
                        <div class="contentBox smallBox">刚开机的电影正在使用，推荐！！！</div>
                    </div>
                </div>
            </el-carousel-item>
        </el-carousel>
        <enterprise></enterprise>
        <fm-footer></fm-footer>
    </div>
</template>

<script>
    import fmFooter from "../../common/fmFooter";
    import indexTop from "../../common/indexTop";
    import enterprise from "../../common/enterpriseService";
    export default {
        name: "downLoad",
        components: { indexTop,fmFooter,enterprise},
        data(){
            var that = this;
            return{
                registerBtn :false,
                emailForm:{
                    email:'',
                    checkEmail:'',
                },
                checkEmail:(rule, value, callback) => {
                    if(value != that.emailForm.email) {
                        callback(new Error('两次输入邮箱号不一致'))
                    }
                    else{
                        callback();
                    }
                },
                radio:1,
                payStep:0,
                codeVisible:'',
                payResult:'',
                payInsideSrc:''
            }
        },
        methods:{
            registerData(data){
                if(data == false){
                    this.registerBtn = false
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
                        this.$nextTick( ()=> {
                            this.payInsideSrc = response.data.data.url;
                            this.alipayDialog = true;
                            var documentHandler = (e)=>{
                                var sp = document.getElementById("payCodeBox");
                                if(sp){
                                    if(!sp.contains(e.target)){
                                        this.alipayDialog = false;
                                    }
                                }
                            }

                            document.addEventListener('click', documentHandler);

                        })
                    }else if (this.radio == 2) {
                        this.dialogFormVisible = true;
                        //支付宝支付
                        this.alipayQRcode();
                        this.payStatus();
                        this.$nextTick( ()=> {
                            document.getElementsByClassName('payCodeBox')[0].src = response.data.data.url;
                            this.alipayDialog = true;


                        })
                    }else {
                        this.$message({
                                message: '请选择支付方式',
                                type: 'warning'
                            }
                        );
                    }

                }

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
                this.$axios.get('/pay/wxpay/unifiedorder_package', {
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
                this.$axios.get('/pay/alipay/unifiedorder_package', {
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
        watch:{
            codeVisible(newVal){
                if(newVal != ''){
                    setTimeout( ()=>{
                        var documentHandler = (e)=>{
                            console.log(e)
                            var sp = document.getElementById("payCodeBox");
                            if(sp){
                                if(!sp.contains(e.target)){
                                    this.codeVisible = '';
                                }
                            }
                        };
                        document.addEventListener('click', documentHandler);
                    }, 1000);
                }
            }
        }
    }
</script>

<style scoped>
    *{
        box-sizing: border-box;
    }

    #downLoad .topBox{
        background-image: url("../../assets/downloadBg.png");
        width: 100vw;
        height: 618px;
        overflow: hidden;
    }

    #downLoad .topBox .title{
        font-size:30px;
        font-family:SimSun;
        font-weight:bold;
        line-height: 38px;
        margin-top: 202px;
        letter-spacing: 5px;
        color:rgba(255,255,255,1);
        text-align: center;
    }

    #downLoad .topBox .desc{
        font-size:14px;
        color:rgba(255,255,255,1);
        line-height:24px;
        text-align: center;
        margin-top: 35px;
    }

    #downLoad .topBox .btnBox{
        width: 498px;
        height: 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 90px auto 0;
    }

    #downLoad .topBox .btn,
    #downLoad .topBox .btn:last-of-type:hover{
        width:220px;
        height:40px;
        background:rgba(237,149,21,1);
        border-radius:20px;
        font-size:12px;
        color:rgba(255,255,255,1);
        text-align: center;
        line-height: 40px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.8s;
    }

    #downLoad .topBox .btn:last-of-type{
        border:1px solid rgba(237,149,21,1);
        color:rgba(255,255,255,1);
        background:transparent ;
    }

    #downLoad .topBox .btn i{
        margin-right: 6px;
    }

    #downLoad .topBox .buyTxt{
        font-size:12px;
        text-align: center;
        font-weight:bold;
        color:rgba(255,255,255,1);
        letter-spacing: 1px;
        margin: 130px 0 0;
    }

    #downLoad .descBox{
        width: 100vw;
        height: 350px;
        background-color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    #downLoad .descBox .descItem{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    #downLoad .descBox .descItem:nth-of-type(2){
        margin: 0 256px 0 244px;
    }

    #downLoad .descBox .descItem img{
        height:52px;
        display: block;
        margin-bottom: 32px;
    }

    #downLoad .descBox .descItem span{
        font-size:14px;
        color:rgba(0,0,0,0.8);
        text-align: center;
        letter-spacing: 1px;
    }

    #downLoad .introduceBox{
        width:100vw;
        height:923px;
        background:rgba(28,54,113,0.04);
        overflow: hidden;
    }

    #downLoad .introduceBox .contentTitle{
        font-size:28px;
        font-family:SimSun;
        font-weight:bold;
        color:rgba(57,63,81,1);
        line-height: 35px;
        margin: 170px 0 142px;
        text-align: center;
    }

    #downLoad .introduceBox .contentBox{
        display: flex;
        align-items: center;
        justify-content: center;
    }

    #downLoad .introduceBox .contentBox .contentItem{
        width:350px;
        height:374px;
        background:rgba(255,255,255,1);
        border-radius:2px;
        border-bottom: 3px solid rgba(3,74,195,1);
        box-shadow: 0 0 6px 5px rgba(0,0,0,.04);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }

    #downLoad .introduceBox .contentBox .contentItem:nth-of-type(2){
        margin:  0 40px;
    }

    #downLoad .introduceBox .contentBox .contentItem i{
        font-size: 64px;
        color: #ED9515;
    }

    #downLoad .introduceBox .contentBox .contentItem .contentTitle{
        margin: 60px auto 26px;
        font-size:26px;
        font-family:SimSun;
        font-weight:bold;
        color:rgba(57,63,81,1);
        line-height: 32px;
    }

    #downLoad .introduceBox .contentBox .contentItem .contentDesc{
        font-size:14px;
        color:rgba(0,0,0,0.8);
        text-align: center;
        line-height: 20px;
    }

    #downLoad .evaluateBox .itemBox{
        width: 760px;
        height: 550px;
        margin-top: 130px;
        background:rgba(255,255,255,1);
        border-radius:10px;
        box-shadow: 0 0 10px 6px rgba(0,0,0,0.03);
        padding: 28px 70px 0;
    }

    #downLoad .evaluateBox .itemBox .main{
        display: flex;
        margin-bottom: 52px;
    }

    #downLoad .evaluateBox .itemBox .head{
        width:50px;
        height:50px;
        border-radius:50%;
        margin-right: 20px;
    }

    #downLoad .evaluateBox .itemBox .right .name{
        font-size:12px;
        font-weight:bold;
        line-height: 12px;
        color:rgba(0,0,0,10.4);
        opacity:0.4;
        letter-spacing: 1px;
        margin: 8px auto 0;
    }

    #downLoad .evaluateBox .itemBox .right .contentBox{
        width:550px;
        height:160px;
        background:rgba(246,248,250,1);
        border-radius:6px;
        font-size:14px;
        font-weight:bold;
        color:rgba(0,0,0,0.7);
        line-height:26px;
        padding: 38px 16px;
        margin-top: 15px;
    }

    #downLoad .evaluateBox .itemBox .right .contentBox.imgBox{
        padding-top: 12px;
        height: 360px;
    }

    #downLoad .evaluateBox .itemBox .right .contentBox.imgBox .imgTitle{
        font-size:12px;
        font-family:Microsoft YaHei;
        font-weight:bold;
        color:rgba(110,148,244,1);
        line-height: 16px;
        margin: 0 5px 16px;
    }

    #downLoad .evaluateBox .itemBox .right .contentBox.imgBox img{
        width: 522px;
        height: 302px;
    }

    #downLoad .evaluateBox .itemBox .right .contentBox.smallBox{
        height:60px;
        padding: 22px 16px;
        font-size:12px;
        line-height: 14px;
        font-family:Microsoft YaHei;
        font-weight:bold;
        color:rgba(0,0,0,0.8);
        opacity:0.8;
    }
</style>