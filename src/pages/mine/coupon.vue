<template>
    <div id="coupon">
        <div class="topBox">
            <el-menu :default-active="activeIndex" class="topNav" mode="horizontal" @select="handleSelect">
                <el-menu-item index="0">未使用</el-menu-item>
                <el-menu-item index="1">已使用</el-menu-item>
                <el-menu-item index="2">已失效</el-menu-item>
            </el-menu>
            <div class="topRight">
                <el-popover placement="bottom-end" width="186" trigger="click" popper-class="couponExchange" :visible-arrow="false">
                    <el-input placeholder="请输入兑换码" v-model="exchange_code" class="inputWithBtn">
                        <div slot="append" class="inputBtn" @click="exchange">领取</div>
                    </el-input>
                    <span slot="reference" class="topTxt">优惠券领取</span>
                </el-popover>
                <el-popover placement="bottom-end" width="242" trigger="hover" popper-class="couponExchange" :visible-arrow="false">
                    <p>扫码关注微信公众号，回复“领取福利”即可获取优惠兑换码。更多优惠活动也将通过公众号发布，请持续关注。</p>
                    <i slot="reference" class="iconfont iconbangzhu"></i>
                </el-popover>
            </div>
        </div>
        <div class="couponList">
            <nullBox v-if="couponList.length==0" txt="暂无优惠券">
                暂无优惠券
            </nullBox>
            <div :class="['couponBox',activeIndex=='2'?'null':'',activeIndex=='1'?'already':'']" v-else v-for="item,index in couponList" :key="index">
                <div class="topBox">
                    <div class="numBox">￥<span>{{item.discount}}</span></div>
                    <div class="desBox">满{{item.restrict}}元可用<span>有效期至：{{item.expire_at | dateChange}}</span></div>
                </div>
                <div class="bottomBtn" v-if="activeIndex=='2'">已失效</div>
                <div class="bottomBtn" v-else-if="activeIndex=='1'">已使用</div>
                <router-link class="bottomBtn" v-else to="/control/list">立即使用</router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import nullBox from '../../common/nullBox'
    export default {
        name: "coupon",
        data() {
            return {
                activeIndex: '0',
                exchange_code: '',
                couponList:''
            };
        },
        components: {nullBox},
        methods:{
            //切换菜单
            handleSelect(key, keyPath) {
                this.activeIndex = key
                this.getCoupon(key);
            },

            //获取优惠券
            getCoupon(status){
                this.$axios.get('/coupon/get_user_coupon', {
                    params: {
                        user_id: JSON.parse(localStorage.user_id),
                        status: status
                    }
                }).then((response)=> {
                    this.couponList = response.data.data
                })
            },

            //兑换优惠券
            exchange(){
                this.$axios.get('/coupon/use_exchange_code', {
                    params: {
                        user_id: JSON.parse(localStorage.user_id),
                        exchange_code: this.exchange_code
                    }
                }).then((response)=> {
                    if(response.data.ret == '0'){
                        this.$message({
                            message: '兑换成功',
                            type: 'success'
                        });
                        this.getCoupon('0')
                    }else{
                        this.$message(response.data.cause);
                    }
                })
            }
        },
        mounted(){
            this.getCoupon('0');
        }
    }
</script>

<style>
    @import "../../css/el-form.css";
    /*顶部切换*/
    #coupon .topBox .topNav .el-tabs__nav-wrap::after{
        height: 0;
    }

    #coupon .topBox .topNav.el-menu--horizontal{
        border-bottom: none;
        background-color: transparent;
    }

    #coupon .topBox .topNav.el-menu--horizontal > .el-menu-item{
        height: 14px;
        line-height: 14px;
        font-size: 14px;
        border-bottom: none;
        padding: 0;
        margin-right: 35px;
    }


    #coupon .topBox .topNav.el-menu--horizontal > .el-menu-item:hover,
    #coupon .topBox .topNav.el-menu--horizontal > .el-menu-item.is-active{
        color: #6C6FBF;
    }

    /*兑换输入框*/
    .couponExchange{
        box-sizing: border-box;
        padding: 16px 12px 22px;
    }

    .couponExchange p{
        font-size:12px;
        line-height: 20px;
        color:rgba(0,0,0,1);
    }

</style>

<style scoped>
    *{
        box-sizing: border-box;
    }

    #coupon{
        padding: 20px 35px;
        min-height: 648px;
        background: #fff;
        width: 100%;
        height: 100%;
    }

    #coupon>.topBox{
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 24px;
    }

    #coupon .topBox .topTxt{
        font-size:14px;
        color:rgba(108,111,191,1);
        cursor: pointer;
    }

    #coupon .topBox .iconbangzhu{
        font-size:14px;
        color: #F05050;
        cursor: pointer;
    }

    #coupon .couponList{
        width: 100%;
        height: 604px;
        overflow-y: scroll;
        display: flex;
        flex-wrap: wrap;
        position: relative;
        align-content: flex-start;
    }

    #coupon .couponList .couponBox{
        background-image: url("../../assets/mineCouponBg.png");
        width:200px;
        height:198px;
        margin: 0 30px 20px 0;
        flex-shrink: 0;
    }

    #coupon .couponList .couponBox.null{
        background-image: url("../../assets/mineCouponBgNull.png");
    }

    #coupon .couponList .couponBox.already{
        background-image: url("../../assets/mineCouponBgAlready.png");
    }

    #coupon .couponList .couponBox .topBox .numBox{
        margin: 32px auto 12px;
        font-size: 30px;
        color: #F05050;
        font-weight: bold;
        text-align: center;
        line-height: 40px;
    }

    #coupon .couponList .couponBox.null .topBox .numBox{
        color: #a8a7a7;
    }

    #coupon .couponList .couponBox.already .topBox .numBox{
        color: #616574;
    }

    #coupon .couponList .couponBox .topBox .numBox span{
        font-size: 54px;
        color: #F05050;
    }

    #coupon .couponList .couponBox.null .topBox .numBox span{
        color: #a8a7a7;
    }

    #coupon .couponList .couponBox.already .topBox .numBox span{
        color: #616574;
    }

    #coupon .couponList .couponBox .topBox .desBox{
        font-size:14px;
        line-height: 14px;
        color:rgba(237,149,21,1);
        text-align: center;
    }

    #coupon .couponList .couponBox.null .topBox .desBox{
        color: #a8a7a7;
    }

    #coupon .couponList .couponBox.already .topBox .desBox{
        color: #616574;
    }

    #coupon .couponList .couponBox .topBox .desBox span{
        font-size:12px;
        line-height: 12px;
        display: block;
        margin-top: 8px;
    }

    #coupon .couponList .couponBox.null .topBox .desBox span{
        color: #a8a7a7;
    }

    #coupon .couponList .couponBox.already .topBox .desBox span{
        color: #616574;
    }

    #coupon .couponList .couponBox .bottomBtn{
        font-size:18px;
        margin-top: 22px;
        text-align: center;
        color:rgba(240,80,80,1);
        cursor: pointer;
        display: block;
    }

    #coupon .couponList .couponBox.null .bottomBtn{
        color: #a8a7a7;
    }

    #coupon .couponList .couponBox.already .bottomBtn{
        color: #616574;
    }

</style>