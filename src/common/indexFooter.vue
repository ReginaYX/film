<template>
    <div id="footer" style="height: 360px;background: #fff;width: 100%;overflow: hidden;margin: 0">
        <div class="footer_content">
            <div class="footerLogo">
                <img src="../assets/indexTop_logo.png" height="100">
            </div>
            <!--<ul style="display: flex;justify-content: space-between;margin: 0;">-->
            <ul class="ul">
                <li class="col-xs-3" style="width: auto;" >
                    <ul class="text">
                        <p>快速入口</p>
                        <li><router-link to="/">首页</router-link></li>
                        <li><router-link to="/demo">演示</router-link></li>
                        <li><router-link to="/lead">使用教程</router-link></li>
                    </ul>
                </li>
                <li class="col-xs-3" style="width: auto;">
                    <ul class="text">
                        <p>产品介绍</p>
                        <li><router-link to="/agreement">项目协议</router-link></li>
                    </ul>
                </li>
                <li class="col-xs-3" style="width: auto;">
                    <ul class="text">
                        <p>帮助支持</p>
                        <li class="customerServiceBox">
                            <router-link to="">在线客服</router-link>
                            <div class="customerService">
                                用微信扫描二维码<br>
                                <img src="../assets/erweima.png" alt="非幕科技公众号二维码" width="120px" height="120px"><br>
                                关注后即可与在线客服取得联系
                            </div>
                        </li>
                        <li><router-link to="/feedback">用户反馈</router-link></li>
                    </ul>
                </li>
                <li class="col-xs-3" style="width: auto;">
                    <ul class="text">
                        <p>联系我们</p>
                        <li><a href="https://weibo.com/u/6585362639?refer_flag=1001030103_&is_hot=1" target="_blank">品牌微博</a></li>
                        <li><router-link to="/contact">服务热线</router-link></li>
                    </ul>
                </li>
            </ul>
        </div>
        <div class="footer_bottom">Copyright 2018-2019 北京非幕文化科技有限公司 版权所有  京ICP备18028756号</div>
    </div>
</template>

<script>
    export default {
        name: "indexFooter",
        methods:{
            list(){
                if(localStorage.user_id){
                    this.$router.push('/control')
                }else{
                    this.$alert('请先登录', '提示', {
                        confirmButtonText: '确定'
                    });
                    document.body.scrollTop = 0
                    document.documentElement.scrollTop = 0
                }
            }
        }
    }
</script>


<style scoped>
    *{
        box-sizing: border-box
    }
    #footer .footer_content{
        height: 318px;
        padding-top: 94px;
        box-sizing:border-box;
        overflow: hidden;
        margin: 0 100px;
        margin-right: 120px;
    }
    #footer .footer_content .footerLogo{
        float: left;
        margin-top: 14px;
    }
    .footer_bottom{
        color: #6b6b6b;
        font-family: Microsoft Yahei, 微软雅黑;
        font-size: 14px;
        /*margin-top: 80px;*/
        text-align: center;
        line-height: 50px;
        height: 70px;
        background: #e5e5e5;
    }
    .text p{
        font-size: 20px;
        color: #f6ae45;
        font-family: Microsoft Yahei, 微软雅黑;
        margin: 0;
        margin-bottom: 26px;

    }
    .text{
        margin: 0;
    }
    .text li{
        height: 14px;
        font-size: 0;
        margin-bottom: 20px;
    }
    .text li:nth-child(3){
        position: relative;
    }
    .text li:last-child{
        margin-bottom: 0;
    }
    .text li a{
        font-size: 16px;
        color: #999!important;
        font-family: Microsoft Yahei, 微软雅黑;
    }
    .text li a:hover{
        color: #333!important;
    }
    .customerServiceBox{
        position: relative;
    }
    .text li .customerService{
        width: 220px;
        height: 200px;
        background: rgba(255,255,255,1);
        text-align: center;
        padding-top: 12px;
        line-height: 28px;
        font-family: 新宋体;
        color: #666;
        font-size: 14px;
        position: absolute;
        top: -40px;
        /*left: -80px;*/
        z-index: 20;
        opacity: 0;
        right: -214px;
        border-radius: 5px;
        box-shadow: 0 0 2px 4px rgba(0,0,0,.02);
    }
    .text .customerServiceBox:hover .customerService{
        animation: showService 0.5s;
        opacity: 1;
    }
    @keyframes showService
    {
        0%   {opacity: 0;-moz-opacity:0;}
        25%  {opacity: 0.2;-moz-opacity:0.2;}
        50%  {opacity: 0.4;-moz-opacity:0.4;}
        75%  {opacity: 0.8;-moz-opacity:0.8;}
        100% {opacity: 1;-moz-opacity:1;}
    }
    .col-xs-3{
        padding: 0;
    }
    .col-xs-3.em{
        width: 1px;height: 160px;background: #999
    }
    .footer_content .ul{
        display: -webkit-box;      /* OLD - iOS 6-, Safari 3.1-6 */
        display: -moz-box;         /* OLD - Firefox 19- (buggy but mostly works) */
        display: -ms-flexbox;      /* TWEENER - IE 10 */
        display: -webkit-flex;     /* NEW - Chrome */
        display: flex;             /* NEW, Spec - Opera 12.1, Firefox 20+ */
        margin: 0;
        -webkit-box-pack: justify;
        /* 12版 */
        -webkit-justify-content: space-between;
        -moz-justify-content: space-between;
        -ms-justify-content: space-between;
        -o-justify-content: space-between;
        justify-content: space-between;
        width: 800px;
        float: right;
        padding-right: 30px;
    }
</style>