<template>
    <div id="footer">
        <div class="footer_content">
            <ul class="ul">
                <li class="col-xs-3" style="width: auto;" >
                    <ul class="text">
                        <p>产品</p>
                        <li><div @click="push('/')">产品介绍</div></li>
                        <li><div @click="push('/recharge')">价格</div></li>
                    </ul>
                </li>
                <li class="col-xs-3" style="width: auto;">
                    <ul class="text">
                        <p>服务</p>
                        <li><div @click="push('/agreement')">帮助中心</div></li>
                        <li><div @click="push('/agreement')">服务条款</div></li>
                    </ul>
                </li>
                <li class="col-xs-3" style="width: auto;">
                    <ul class="text">
                        <p>关于</p>
                        <li class="customerServiceBox">
                            <router-link to="/contact">服务咨询</router-link>
                        </li>
                        <li><div @click="push('/contact')">商务合作</div></li>
                        <li><div @click="push('/feedback')">投诉建议</div></li>
                    </ul>
                </li>
                <li class="col-xs-3" style="width: auto;">
                    <ul class="text">
                        <p>售前咨询</p>
                        <li><a href="https://weibo.com/u/6585362639?refer_flag=1001030103_&is_hot=1" target="_blank">品牌微博</a></li>
                        <li><div @click="push('/service')">私有化部署咨询</div></li>
                    </ul>
                </li>
              <li class="col-xs-3" style="width: auto;">
                <ul class="text">
                  <p>联系我们</p>
                    <el-popover
                        placement="bottom" popper-class="accountPopper"
                        width="120" trigger="hover" class="accountPopperBox">
                        <div class="customerService">
                            <img src="../assets/erweima.png" alt="非幕科技公众号二维码" width="120px" height="120px"><br>
                            扫描二维码<br>
                            关注非幕微信公众号
                        </div>
                        <i class="iconfont iconweixin1" slot="reference"></i>
                    </el-popover>
                    <a href="https://weibo.com/u/6585362639?refer_flag=1001030103_&is_hot=1" target="_blank" class="accountPopperBox">
                        <i class="iconfont iconweibo"></i>
                    </a>
                    <!--<el-popover-->
                        <!--placement="bottom" popper-class="accountPopper padding"-->
                        <!--width="120" trigger="hover" class="accountPopperBox">-->
                        <!--<div class="accountService">-->
                            <!--第 3 组 qq 群号：-->
                            <!--<p>46546498</p>-->
                        <!--</div>-->
                        <!--<i class="iconfont iconqq-copy-copy-copy-copy" slot="reference"></i>-->
                    <!--</el-popover>-->
                    <el-popover
                        placement="bottom" popper-class="accountPopper padding"
                        width="120" trigger="hover" class="accountPopperBox">
                        <div class="accountService">
                            商务合作：
                            <p>swhz@filmptn.com</p>
                        </div>
                        <i class="iconfont iconyouxiang1" slot="reference"></i>
                    </el-popover>
                </ul>
              </li>
            </ul>
        </div>
        <div class="hr"></div>
        <div class="footer_bottom">Copyright 2018-2019 北京非幕文化科技有限公司 版权所有  京ICP备18028756号</div>
    </div>
</template>

<script>
    export default {
        name: "fmFooter",
        data(){
            return{
                value:true
            }
        },
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
            },
            push(v){
                if(this.$route.path == v){
                    var goTop=setInterval(scrollMove,10);
                    function scrollMove(){
                        setScrollTop(getScrollTop()/1.1);
                        if(getScrollTop()<1)clearInterval(goTop);
                    }
                    function getScrollTop(){
                        return document.documentElement.scrollTop;
                    }
                    function setScrollTop(value){
                        document.documentElement.scrollTop=value;
                    }
                }else{
                    this.$router.push(v)
                }

            }
        },
    }
</script>


<style scoped>
*{
    box-sizing: border-box
}
#footer{
  background: rgba(57,63,81,1);
  height: 434px;
  width: 100%;
  overflow: hidden;margin: 0
}

#footer .footer_content{
    height: 358px;
    padding-top: 94px;
    box-sizing:border-box;
    overflow: hidden;
    width: 1132px;
    margin: 0 auto;
  padding-right: 20px;
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
  width: 100%
  /*padding-right: 30px;*/
}

    .text p{
      font-size:20px;
      font-family:NSimSun;
      font-weight:400;
      color:rgba(255,255,255,0.6);
      margin-bottom: 30px;
      line-height: 20px;
    }
    .text{
        margin: 0;
    }
    .text li{
        height: 14px;
        font-size: 0;
        margin-bottom: 24px;
    }
    .text li:nth-child(3){
        position: relative;
    }
    .text li:last-child{
        margin-bottom: 0;
    }
    .text li a,
    .text li>div{
      font-size:14px;
      font-family:MicrosoftYaHei;
      font-weight:400;
      color:rgba(255,255,255,1);
      line-height: 14px;
        cursor: pointer;
    }

.text li a:hover{
  color: #fff;
}

.text .accountPopperBox{
    margin-right: 40px;
}

.text a.accountPopperBox{
    display: inline-block;
}

.text .accountPopperBox i.iconfont{
  font-size: 28px;
  color: #DDDDDD;
  cursor: pointer;
  transition: all 0.8s;
}

.text .accountPopperBox:nth-child(2):hover i.iconfont{
    color: #28D052;
}

.text .accountPopperBox:nth-child(3):hover i.iconfont{
    color: #F05151;
}

.text .accountPopperBox:nth-child(4):hover i.iconfont{
    color: #4876FF;
}

.text .accountPopperBox:nth-child(5):hover i.iconfont{
    color: #fff;
}

.text .accountPopperBox i:last-child{
  margin-right: 0;
}


    .accountPopper .customerService{
        text-align: center;
        line-height: 16px;
        color:rgba(57,63,81,0.8);
        font-size: 12px;
    }

.accountPopper .accountService{
    line-height: 16px;
    color:rgba(57,63,81,0.8);
    font-size: 12px;
}

.accountPopper p{
    margin: 0;
    color:#F05151;
    font-size: 12px;
    font-family: "Microsoft Yahei";
}

    .col-xs-3{
        padding: 0;
    }

.col-xs-3:last-child{
  margin-left: 200px;
}

.hr{
  width:92vw;
  height:1px;
  background:rgba(210,210,210,0.6);
  margin: 0 auto;
}

.footer_bottom{
  color: #fff;
  font-family: Microsoft Yahei, 微软雅黑;
  font-size: 14px;
  /*margin-top: 80px;*/
  text-align: center;
  line-height: 74px;
  height: 74px;
}
</style>

<style>
    .accountPopper{
        min-width: 120px;
        padding: 0 0 8px;
    }

    .accountPopper.padding{
        padding: 12px 8px;
    }
</style>
