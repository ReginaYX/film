<template>
    <div id="done">
        <index-top :register="registerBtn" @register1="registerData"></index-top>
        <div class="contentBox">
            <div class="titleBox">
                订单支付详情
            </div>
            <div class="infoContent">
                <div class="left">
                    <div class="title"><i class="iconfont iconchenggong"></i>购买成功</div>
                    <div class="desc">支付时间：{{time}}</div>
                    <div class="btnBox">
                        <router-link class="btn" to="/">返回首页</router-link>
                        <el-popover
                            placement="right" popper-class="cordPopper"
                            width="120" trigger="click" >
                            <img src="../../assets/serviceCode.jpg" alt="" width="120px" height="120px">
                            <div class="btn" slot="reference">开具发票</div></el-popover>
                    </div>
                </div>
                <div class="right">
                    <p>商品详情：非幕统筹2019单机版</p>
                    <!--<p>激活码：FSFAFG</p>-->
                    <p>交易金额：￥{{amount}}</p>
                    <p>激活码已发送至<span>{{email}}</span>，请前往查看</p>
                    <p>激活码是用于激活非幕统筹单机版的唯一方式，请妥善保管<br>激活码可在个人中心-交易记录中查看</p>
                </div>
            </div>
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
        name: "done",
        components: {indexTop},
        data() {
            return {
                registerBtn: false,
                time:'',
                amount:'',
                email:'',
            }
        },
        methods:{
            registerData(data){
                if(data == false){
                    this.registerBtn = false
                }
            },
        },
        mounted(){
            var myDate = new Date();
            var y = myDate.getFullYear();    //获取完整的年份(4位,1970-????)
            var m = myDate.getMonth();       //获取当前月份(0-11,0代表1月)
            var d = myDate.getDate();        //获取当前日(1-31)
            var h = myDate.getHours();       //获取当前小时数(0-23)
            var minute = myDate.getMinutes();     //获取当前分钟数(0-59)
            this.time = y+'-'+m+'-'+d+' '+h+':'+minute;
            this.amount = this.$route.query.amount;
            this.email = this.$route.query.email
        }
    }
</script>

<style>
    .cordPopper.el-popover{
        min-width: 120px;
        padding: 0;
    }
</style>

<style scoped>
    *{
        box-sizing: border-box;
    }

    #done{
        width: 100vw;
        min-height: 100vh;
        overflow: hidden;
        background:rgba(28,54,113,0.04);
    }

    #done .contentBox{
        margin: 75px auto 0;
        width: 1132px;
    }

    #done .contentBox .titleBox{
        width: 100%;
        height: 42px;
        border-bottom: 1px solid rgba(168,167,167,0.4);
        font-size:14px;
        line-height: 42px;
    }

    #done .contentBox .infoContent{
        margin-top: 30px;
        width: 100%;
        height:300px;
        background-image: url("../../assets/doneInfoBg.png");
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 160px 0 86px;
    }

    #done .contentBox .infoContent .left{
        width: 290px;
    }

    #done .contentBox .infoContent .left .title{
        display: flex;
        align-items: center;
        justify-content: center;
        font-size:28px;
        color:rgba(0,0,0,1);
    }

    #done .contentBox .infoContent .left .title i{
        font-size: 40px;
        color: #ED9515;
        margin-right: 20px;
    }

    #done .contentBox .infoContent .left .desc{
        font-size:12px;
        margin: 22px 0 60px;
        color:rgba(0,0,0,1);
        text-align: center;
    }

    #done .contentBox .infoContent .left .btnBox{
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    #done .contentBox .infoContent .left .btnBox .btn{
        width:120px;
        height:32px;
        background:rgba(237,149,21,1);
        border-radius:16px;
        font-size:12px;
        text-align: center;
        line-height: 32px;
        color:rgba(255,254,254,1);
        cursor: pointer;
    }

    #done .contentBox .infoContent .left .btnBox .btn:last-child{
        background:rgba(255,105,14,1);
    }

    #done .contentBox .infoContent .right p{
        font-size:12px;
        color:rgba(0,0,0,1);
        margin-bottom: 20px;
        line-height: 12px;
    }

    #done .contentBox .infoContent .right p span{
        color: #F05050;
        font-size: 12px;
    }

    #done .contentBox .infoContent .right p:last-child{
        line-height: 20px;
        margin-bottom: 0;
    }

    #done .contentBox>.desc{
        text-align: center;
        font-size:12px;
        margin-top: 30px;
        color:rgba(148,148,149,1);
    }

    #done .contentBox .cordPopperTxt{
        font-size: 12px;
        color: #F16161;
        cursor: pointer;
        text-decoration: underline;
    }
</style>