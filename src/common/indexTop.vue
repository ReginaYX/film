<template>
    <div class="index_top head_top">

        <div class="indexTop_main">
            <router-link to="/">
                <img src="../assets/indexTop_logo.png" style="height: 40px;margin-right: 30px">
            </router-link>
            <div class="indexTop_right">
                <el-menu :default-active="activeIndex" class="el-menu-index" mode="horizontal" popper-class="indexTopPopper">
                    <el-submenu index="56" popper-class="indexTop_mainSubmenu">
                        <template slot="title">功能</template>
                        <el-menu-item index="5"><router-link to="/toolIntroduce">服化道管理系统</router-link></el-menu-item>
                        <el-menu-item index="6"><router-link to="/financeIntroduce">影视财务系统</router-link></el-menu-item>
                        <el-menu-item index="7"><router-link to="/noticeIntroduce">电子通告单</router-link></el-menu-item>
                    </el-submenu>
                    <el-menu-item index="8"><router-link to="/downLoad">下载</router-link></el-menu-item>
                    <el-menu-item index="2"><router-link to="/recharge">价格</router-link></el-menu-item>
                    <el-menu-item index="3"><router-link to="/service">私有化部署</router-link></el-menu-item>
                    <el-menu-item index="4"><router-link to="/activity">活动</router-link></el-menu-item>
                </el-menu>
                <div class="indexTop_login" @click="login" v-if="log_btn">登录</div>
                <div class="indexTop_register" @click="register" v-if="log_btn">免费注册</div>
                <router-link to="/control/list" class="into_system" v-else>进入制片系统</router-link>
            </div>
        </div>

        <a id="target" style="display: none"></a>
    </div>
</template>

<script>
    import axios from "axios"
    export default {
        name: "indexTop",
        data() {
            return {
                activeIndex: '1',
                register1:this.register,
                account:'',
                pwd:'',
                msg:'',
                log_btn:true,
                register_info:'',
                register_method:'phone',
                checked:false,
                error:'',
                id:0,
                // login:false
            };
        },
        // props:['register'],
        methods: {

          login(){
            this.$router.push('/login')
          },

          register(){
            this.$router.push('/register/phone_1')
          },
          handleScroll () {
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
            var indexTop = document.querySelector('.index_top')
            if(scrollTop > 180){
                indexTop.classList.add('bgColor')
            }
            if(scrollTop <= 180){
                indexTop.classList.remove('bgColor')
            }
          },

        },
        mounted(){
            window.addEventListener('scroll', this.handleScroll)
            if(localStorage.user){
                this.account = localStorage.getItem("user").replace("\"","").replace("\"","")
                if(localStorage.pwd){
                    this.pwd = localStorage.getItem("pwd").replace("\"","").replace("\"","")
                }
            }
            if(localStorage.user_id){
                axios({
                    method: 'get',
                    url: '/user/info?user_id='+localStorage.getItem("user_id").replace("\"","").replace("\"",""),
                    headers:{
                        'Content-type': 'application/x-www-form-urlencoded'
                    }
                }).then((response)=> {
                    if(response.data.data.source == 'weixin'){
                        if(response.data.data.phone){
                            if (new Date().getTime() - window.localStorage.getItem('createAt') > 60 * 60 * 12 * 1000){
                                this.log_btn=true
                                localStorage.removeItem('user_id')
                                localStorage.removeItem('createAt')
                            }else{
                                this.log_btn =false
                            }
                        }else{
                            this.log_btn=true
                            localStorage.removeItem('user_id')
                        }
                    }else{
                        if (new Date().getTime() - window.localStorage.getItem('createAt') > 60 * 60 * 12 * 1000){
                            this.log_btn=true
                            localStorage.removeItem('user_id')
                            localStorage.removeItem('createAt')
                        };
                        this.log_btn =false
                    }
                })
            }else{
                this.log_btn=true
            }
        },
        updated(){
            window.addEventListener('scroll', this.handleScroll)
        },
        watch:{
            $route: {
                immediate: true,
                handler: function(val, oldVal){
                    if(this.$route.path=='/recharge'){
                        this.activeIndex = '2'
                    }else if(this.$route.path=='/service'){
                        this.activeIndex = '3'
                    }else if(this.$route.path=='/activity'){
                        this.activeIndex = '4'
                    }else if(this.$route.path=='/toolIntroduce'){
                        this.activeIndex = '5'
                    }else if(this.$route.path=='/financeIntroduce'){
                        this.activeIndex = '6'
                    }else if(this.$route.path=='/noticeIntroduce'){
                        this.activeIndex = '7'
                    }else if(this.$route.path=='/downLoad'){
                        this.activeIndex = '8'
                    }else{
                        this.activeIndex = '56'
                    }
                    if(localStorage.user_id){
                        this.log_btn=false
                    }
                },
                // 深度观察监听
                deep: true
            },
            register: {
                immediate: true,    // 这句重要
                handler(curVal, oldVal) {
                    this.register1 = curVal
                },
                deep: true
            },
            register1: {
                immediate: true,    // 这句重要
                handler(curVal, oldVal) {
                    this.$emit('register1',curVal)
                },
                deep: true
            }
        },
        beforeRouteLeave (to, from, next){
            window.removeEventListener('scroll', this.handleScroll)
            next()
        },
        destroyed () {
            window.removeEventListener('scroll', this.handleScroll)
        },
    }
</script>

<style src="../css/el-message-box.css"></style>

<style scoped>
    *{
        font-family: Microsoft Yahei, 微软雅黑;
    }
    .index_top{
        width: 100vw;
        height: 50px;
        box-shadow: 0 2px 3px 2px rgba(0,0,0,0.08);
        -moz-box-shadow: 0 2px 3px 2px rgba(0,0,0,0.08);
        -webkit-box-shadow: 0 2px 3px 2px rgba(0,0,0,0.08);
        background: rgba(255,255,255,.2);
        position: fixed;
        top: 0;
        left: 0;
        z-index: 10;
        transition: background 2s;
        -moz-transition: background 2s;	/* Firefox 4 */
        -webkit-transition: background 2s;	/* Safari 和 Chrome */
        -o-transition: background 2s;	/* Opera */
    }
    .index_top.bgColor{
        background: #fff;
    }
    .index_top .indexTop_main{
        width: auto;
        padding: 0 40px;
        height: 100%;
        margin: 0 auto;
        /*margin-right: 120px;*/
        display: flex;
        justify-content: space-between;
        align-items: center;
        overflow: hidden;
    }

    .index_top .indexTop_main>a{
        margin: 0;
        background: none;
    }

    .index_top .indexTop_main>img{
      cursor: pointer;
    }

    .index_top .indexTop_main .indexTop_right{
        height: 100%;
        display: flex;
        align-items: center;
    }
    .index_top .indexTop_main div .el-menu-index{
        border-bottom: none;
        background: none;
        height: 50px;
    }

    .index_top .indexTop_main div .el-menu-index .el-menu-item{
        padding: 0 10px;
        margin-right: 20px;
        height: 50px;
        line-height: 50px;
    }
    .index_top .indexTop_main div .el-menu-index .el-menu-item:hover{
        background: #ddd;
    }
    .index_top .indexTop_main div .el-menu-index .el-menu-item a{
        font-size: 14px;
        font-family: Microsoft Yahei, 微软雅黑;
        color: rgba(0,0,0,.8);
        text-decoration: none;
        display: inline-block;
        height: auto;
        margin-left: 0px;
        width: auto;
        text-align: center;
        background: none;
        margin-top: 0;
        height: 100%;
        line-height: 50px;
    }
    .index_top .indexTop_main div .el-menu-index .el-menu-item.is-active{
        border-color: #f6ae45;
    }
    .index_top .indexTop_main div .el-menu-index .el-menu-item.is-active a{
        color: rgba(0,0,0,1);
    }
    .index_top .indexTop_main .indexTop_right .into_system{
        width: 120px;
        height: 32px;
        margin-top: 0;
        margin-left: 10px;
        border-radius: 20px;
        text-decoration: none;
      font-size: 14px;
      color:rgba(245,245,246,1);
      line-height: 32px;
      transition: 1s background cubic-bezier(0.4, 0, 0.2, 1);
      -webkit-transition: 1s background cubic-bezier(0.4, 0, 0.2, 1);
    }
    .index_top .indexTop_main .indexTop_right .into_system:hover{
        background: #3f3e6a;
    }
    /*.index_top .indexTop_main .indexTop_right .into_system:focus{*/
      /*transition: 200ms background cubic-bezier(0.4, 0, 0.2, 1);*/
    /*}*/

    .index_top .indexTop_main div .indexTop_register{
        height: 32px;
        line-height: 32px;
        font-size: 14px;
        text-align: center;
        border-radius: 20px;
        cursor: pointer;
        width: 100px;
        background: #f0f0f0;
        /*color: #fff;*/
        margin-left: 20px;
    }
    .index_top .indexTop_main div .indexTop_register:hover{
        background: #ddd;
        /*color: #fff;*/
    }
    .index_top .indexTop_main div .indexTop_login{
        font-size: 14px;
        line-height: 59px;
        font-family: Microsoft Yahei, 微软雅黑;
        padding: 0 10px;
        box-sizing: border-box;
        cursor: pointer;
        color: #666;
        /*margin-left: 14px;*/
    }
    .index_top .indexTop_main div .indexTop_login:hover{
        background: #ddd;
    }


    .login-wrapper input:focus{
        outline: none;
        border-color: #ED9515;
    }
    .index_top .login-container,.index_top .register{
        display: block;
        height: 100vh;
        width: 100vw;
        position: fixed;
        z-index:20;
        background: rgba(0,0,0,0.3)
    }
    .register-wrapper .wx,.login-wrapper .wx{
        margin-left: 70px;
        margin-top: 26px;
        display: flex;
        align-items: center;
    }
    .login-wrapper .wx{
        margin-left: 70px;
    }
    .register-wrapper .wx span,.login-wrapper .wx span{
        font-size: 16px;
        font-family: Microsoft Yahei, 微软雅黑;
        color: #666;
    }
    .register-wrapper .wx .wxlogo,.login-wrapper .wx .wxlogo{
        background: url("../assets/WeChat_default.png") no-repeat center;
        width: 32px;
        height: 32px;
        margin-left: 30px;
        cursor: pointer;
        margin-top: 0;
    }
    .register-wrapper .wx .wxlogo:hover,.login-wrapper .wx .wxlogo:hover{
        background-image: url("../assets/WeChat_active.png");
    }
    .register-wrapper .register_top,.login-wrapper .login_top{
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        height: 37px;
        width: 100%;
        border-bottom: 1px solid #ddd;
    }
    .register-wrapper .register_top div,.login-wrapper .login_top div,.wxLogin .wx_top .wxclose_btn{
        height: 16px;
        width: 15px;
        margin-right: 75px;
        cursor: pointer;
        background: url("../assets/zhuce_guanbi.png") no-repeat center;
    }
    .register-wrapper .register_top div:hover,.login-wrapper .login_top div:hover,.wxLogin .wx_top .wxclose_btn:hover{
        background-image: url("../assets/red_close.png");
    }
    .register-wrapper .register_top ul,.login-wrapper .login_top ul{
        margin-bottom: 0;
        display: flex;
        margin-left: 68px;
        align-items: center;
    }
    .register-wrapper .register_top ul li,.login-wrapper .login_top ul li{
        font-size: 18px;
        color: #666;
        margin-right: 42px;
        font-family: Microsoft Yahei, 微软雅黑;
        cursor: pointer;
    }
    .register-wrapper .register_top ul li.active,.login-wrapper .login_top ul li.active{
        color: #ED9515;
    }
    .desc{
        margin: 18px 0 16px;
        font-size: 17px;
        color: #333;
        margin-left: 68px;
        display: block;
        font-family: 新宋体;
    }
    .register-wrapper input{
        width: 400px;
        height: 40px;
        border: 1px solid #ddd;
        box-sizing: border-box;
        padding-left: 56px;
        border-radius: 8px;
        font-size: 16px;
        color: #999;
        line-height: normal;
        /*padding-top: 10px;*/
        margin-left: 68px;
        position: absolute;
    }
    /*.login-wrapper .inp input:focus{*/
    /*border: 1px solid #ED9515;*/
    /*}*/
    .register-wrapper input:focus{
        border: 1px solid #ED9515;
        outline: none;
    }
    .register-wrapper .phone_icon{
        position: relative;
        left: 90px;
        top:7px;
    }
    .register-wrapper .email_icon{
        position: relative;
        left: 86px;
        width: 24px;
        top:8px;
    }
    .register_btn,.login_btn{
        width: 400px;
        height: 40px;
        background: #ED9515;
        border-radius: 20px;
        color: #fff;
        font-size: 18px;
        margin-top: 45px;
        line-height: 40px;
        text-align: center;
        margin-left: 68px;
        cursor: pointer;
    }
    .register_btn:hover,.login_btn:hover{
        background: #ED9515;
    }
    .login_btn{
        margin-top: 20px;
        margin-left: 68px;
    }
    .register .register-wrapper{
        width: 540px;
        height: 360px;
        padding: 40px 0 0;
        box-sizing: border-box;
        background: #f9f9f9;
        border-radius: 5px;
        margin: auto;
        margin-top: 20vh;
        /*padding-top: 40px;*/
    }
    .register-wrapper p{
        margin-left: 68px;
        width: 400px;
        height: 34px;
        display: block;
        text-align: center;
        line-height: 34px;
        font-size: 14px;
        color: #999;
    }
    .register-wrapper p span{
        line-height: 44px;
        font-size: 14px;
        color: #459df5;
        cursor: pointer;
    }
</style>

<style>
    .index_top .indexTop_main .el-menu--horizontal>.el-submenu .el-submenu__title{
        height: 50px;
        padding: 0 10px;
        line-height: 54px;
        margin-right: 20px;
        color: rgba(0,0,0,0.8);
    }

    .index_top .indexTop_main .el-menu--horizontal>.el-submenu .el-submenu__title i{
        color: rgba(0,0,0,0.8);
    }

    .index_top .indexTop_main .el-menu--horizontal>.el-submenu.is-active .el-submenu__title,
    .index_top .indexTop_main .el-menu--horizontal>.el-submenu.is-active .el-submenu__title i{
        color: rgba(0,0,0,1);
    }

    .indexTop_mainSubmenu .el-menu-item a{
        color: rgba(0,0,0,0.8);
    }

    .index_top .indexTop_main div .el-menu-index .el-submenu:hover .el-submenu__title,
    .indexTop_mainSubmenu .el-menu-item:hover{
        background: #ddd;
    }

    .indexTop_mainSubmenu .el-menu-item:hover a{
        color: rgba(0,0,0,1);
    }

    .indexTop_mainSubmenu .el-menu--popup{
        min-width: 150px;
    }

</style>
