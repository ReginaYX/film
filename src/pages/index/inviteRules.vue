<template>
    <div id="inviteRules">
        <div class="topBox">邀请好友规则说明</div>
        <router-link class="returnBox" to="/control/reward"><span><<</span>返回上一页</router-link>
        <div class="rulesBox">
            <title-hr msg="邀请规则" color="#000" bgColor="#000" class="title"></title-hr>
            <p>活动期间，每邀请一位好友使用您的邀请码注册成功，您和TA都将获得随机优惠券，最高将获得888元优惠券，优惠券可用于抵扣开通套餐以及顺场景表下载所需要的费用。</p>
        </div>
        <div class="rulesBox">
            <title-hr msg="奖励发放" color="#000" bgColor="#000" class="title"></title-hr>
            <p>奖励会直接发放到在您的帐号中，您可以通过个人中心查看您所获得的优惠券金额。 </p>
        </div>
        <div class="rulesBox">
            <title-hr msg="特别说明" color="#000" bgColor="#000" class="title"></title-hr>
            <div class="content">
                <div class="left">
                    <p>
                        以上奖励规则仅适用于2019年12月1日之前邀请注册的好友。<br>
                        同一账号将被视为同一个用户，不再重复获得奖励。<br>
                        举例：您在2019年10月31日邀请一位好友注册，您和TA都将获得随机优惠券奖励（价值10-888元）。</p>
                    <p>
                        如果您没有收到奖励，您可以通过发送邮件至我们的官方邮箱与我们沟通解决。<br>
                        收件邮箱： help@filmptn.com<br>
                        邮件标题：邀请好友没收到奖励<br>
                        邮件内容：<br>
                        1.您的非幕帐号  2.被邀请人的非幕注册账号  3.您的邀请时间
                    </p>
                </div>
                <div class="right">
                    <img src="../../assets/erweima.png" alt="">
                    <p>关注公众号，领取更多优惠券</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import titleHr from '../../common/titleHr';
    export default {
        name: "inviteRules",
        components: {titleHr},
    }
</script>

<style scoped>
    *{
        box-sizing: border-box;
    }

    #inviteRules{
        margin: 72px auto 298px;
        width: 1132px;
    }

    #inviteRules .topBox{
        width: 100%;
        height:120px;
        background-image: url("../../assets/inviteRulesBg.png");
        font-size:40px;
        font-family:SimSun;
        text-align: center;
        line-height: 120px;
        color:rgba(255,255,255,1);
        margin-bottom: 24px;
    }

    #inviteRules .returnBox{
        color: #000;
        line-height: 12px;
        font-size: 12px;
        display: flex;
        align-items: center;
        cursor: pointer;
    }

    #inviteRules .returnBox span{
        font-size: 12px;
        color: #656588;
        margin: -2px 6px 0 0;
        display: block;
    }

    #inviteRules .rulesBox{
        margin-top: 50px;
    }

    #inviteRules .rulesBox .title{
        border-bottom: 1px solid rgba(220,220,220,1);
        padding-bottom: 8px;
    }

    #inviteRules .rulesBox p{
        padding-left: 14px;
        margin-top: 15px;
        font-size:12px;
        line-height: 22px;
        color:rgba(0,0,0,0.8);
    }

    #inviteRules .rulesBox .content{
        display: flex;
        align-items: center;
    }

    #inviteRules .rulesBox .content .right{
        margin-left: 210px;
        width: 156px;
    }

    #inviteRules .rulesBox .content .right img{
        margin: 0 auto;
        display: block;
    }

    #inviteRules .rulesBox .content .right p{
        padding-left: 0;
        margin-top: 0;
    }
</style>