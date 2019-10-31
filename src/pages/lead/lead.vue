<template>
    <div>
        <!-- 页面整体开始 -->
        <!-- 页面头部开始 -->
        <index-top :register="registerBtn" @register1="registerData"></index-top>
        <!--页面主体-->
        <div class="lead_content">
            <el-menu
                    :default-active="index"
                    class="el-menu-vertical-demo lead_menu"
                    @open="handleOpen"
                    @close="handleClose" router>
                <el-menu-item index="/lead/newBuild" class="lead_menuItem">
                    <img src="../../assets/lead_newBuild.png" alt="" class="lead_menuIMG">
                    <span slot="title" class="lead_menuTitle">新建项目</span>
                </el-menu-item>
                <el-menu-item index="/lead/tagging" class="lead_menuItem">
                    <img src="../../assets/lead_tagging.png" alt="" class="lead_menuIMG">
                    <span slot="title" class="lead_menuTitle">剧本标注</span>
                </el-menu-item>
                <el-menu-item index="/lead/performer" class="lead_menuItem">
                    <img src="../../assets/lead_performer.png" alt="" class="lead_menuIMG">
                    <span slot="title" class="lead_menuTitle">调整演员表</span>
                </el-menu-item>
                <el-menu-item index="/lead/Table" class="lead_menuItem">
                    <img src="../../assets/lead_table.png" alt="" class="lead_menuIMG">
                    <span slot="title" class="lead_menuTitle">智能拆表</span>
                </el-menu-item>
                <el-menu-item index="/lead/announcement" class="lead_menuItem">
                    <img src="../../assets/lead_announcement.png" alt="" class="lead_menuIMG">
                    <span slot="title" class="lead_menuTitle">电子通告单</span>
                </el-menu-item>
                <el-menu-item index="/lead/group" class="lead_menuItem">
                    <img src="../../assets/lead_group.png" alt="" class="lead_menuIMG">
                    <span slot="title" class="lead_menuTitle">成员管理</span>
                </el-menu-item>
            </el-menu>
            <div class="lead_main">
                <router-view></router-view>
            </div>
        </div>
        <footer>
            <div :class="['enter',fixed?'fixed':'']" @click="control" @mouseenter="show=true" @mouseleave="show=false"><img src="../../assets/enter.png" alt=""></div>
            <div :class="['enterToast',fixed?'fixed':'',show?'show':'']">点击进入<br>制片系统</div>
            <div :class="['returnTop',fixed?'fixed':'']" v-show="scroll"><img src="../../assets/returnTop.png" alt="" @click="returnTop"></div>
            <fm-footer />
        </footer>
    </div>
</template>

<script>
    import fmFooter from "../../common/fmFooter";
    import indexTop from "../../common/indexTop";
    export default {
        name: "lead",
        components: {fmFooter,indexTop},
        data(){
            return{
                fixed : false,
                show : false,
                scroll : false,
                registerBtn :false,
                index:''
            }
        },
        methods:{
            registerData(data){
                if(data == false){
                    this.registerBtn = false
                }
            },
            handleOpen(key, keyPath) {
                // console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                // console.log(key, keyPath);
            },
            control () {
                if(localStorage.user_id){
                    if (new Date().getTime() - window.localStorage.getItem('createAt') > 60 * 60 * 12 * 1000){
                        this.login=true
                        localStorage.removeItem('user_id')
                        localStorage.removeItem('createAt')
                    };
                    this.$router.push('/control')
                }else{
                    this.registerBtn = true
                }
            },
            returnTop(){
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
                // // this.t1=window.setInterval(scrolltop, 20);
                // // function scrolltop(){
                //     document.body.scrollTop = 0
                //     document.documentElement.scrollTop = 0
                // // }
            },
            handleScroll () {
                var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
                var scrollBottom=document.documentElement.scrollHeight-document.documentElement.scrollTop-document.documentElement.clientHeight;
                if(scrollBottom < 350){
                    this.fixed = true
                    // console.log('fix=true1:'+scrollBottom)
                    if(scrollBottom >= 350){
                        this.fixed = false
                        // console.log('fix=false1:'+scrollBottom)
                    }
                } else if(scrollBottom >= 350){
                    this.fixed = false
                    // console.log('fix=false:'+scrollBottom)
                    if(scrollBottom < 350){
                        this.fixed = true
                        // console.log('fix=true'+scrollBottom)
                    }
                }
                if(scrollTop >= 300){
                    this.scroll = true
                }else{
                    this.scroll = false
                }
            }
        },
        mounted(){
            window.addEventListener('scroll', this.handleScroll)
            this.index = this.$route.path
        },
        updated(){
            window.addEventListener('scroll', this.handleScroll)
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

<style scoped>
    *{
        box-sizing: border-box;
        font-family: Microsoft Yahei, 微软雅黑;
    }
    .lead_content{
        width: 1200px;
        margin: 90px auto 100px;
        height: auto;
        display: flex;
    }
    .lead_content .lead_main{
        width: 930px;
        height: auto;
        /*float: right;*/
        box-shadow: 2px 3px 4px 1px rgba(0,0,0,.08);
        background: #fff;
        border-radius: 5px;
    }
    .lead_content .lead_menu{
        width: 240px;
        height: 1000px;
        border-right: none;
        padding-top: 30px;
        /*float: left;*/
        margin-right: 30px;
        border-radius: 5px;
        box-shadow: 2px 3px 4px 1px rgba(0,0,0,.08);
    }
    .lead_content .lead_menu .lead_menuItem:hover,
    .lead_content .lead_menu .lead_menuItem.is-active{
        background-color: #fff;
    }
    .lead_content .lead_menu .lead_menuItem{
        height: 160px;
    }
    .lead_content .lead_menu .lead_menuItem .lead_menuIMG{
        margin: 0 auto 10px;
        display: block;
    }
    .lead_content .lead_menu .lead_menuItem .lead_menuTitle{
        display: block;
        width: 120px;
        height: 40px;
        margin: 0 auto;
        text-align: center;
        border:  1px solid #ddd;
        border-radius: 5px;
        line-height: 40px;
        color: #666;
        font-size: 18px;
    }
    .lead_content .lead_menu .lead_menuItem:hover .lead_menuTitle,
    .lead_content .lead_menu .lead_menuItem.is-active .lead_menuTitle{
        background: #ED9515;
        border-color: #ED9515;
        color: #fff;
    }
    footer{
        position: relative;
    }
    footer .enter,footer .returnTop{
        width: 60px;
        height: 60px;
        background: #f6ae45;
        position: fixed;
        top: 83%;
        right: 10%;
        text-align: center;
        line-height: 60px;
        cursor: pointer;
    }
    footer .returnTop{
        margin-top: 66px;
    }
    footer .enter.fixed,footer .returnTop.fixed{
        position: absolute;
        top: -40%;
        right: 10%;
    }
    footer .enterToast{
        width: 90px;
        height: 60px;
        background: #fff;
        position: fixed;
        top: 83%;
        right: 10%;
        margin-right: 70px;
        font-size: 14px;
        color: #666;
        font-family: 新宋体;
        padding-top: 7px;
        line-height: 24px;
        text-align: center;
        box-shadow: 1px 1px 4px 2px rgba(0,0,0,.06);
        opacity: 0;
        -moz-opacity:0;
        z-index: 10;
    }
    footer .enterToast.show{
        opacity: 1;
        -moz-opacity:1;
        animation: showToast 0.5s;
    }
    @keyframes showToast
    {
        0%   {opacity: 0;-moz-opacity:0;}
        25%  {opacity: 0.2;-moz-opacity:0.2;}
        50%  {opacity: 0.4;-moz-opacity:0.4;}
        75%  {opacity: 0.8;-moz-opacity:0.8;}
        100% {opacity: 1;-moz-opacity:1;}
    }
    footer .enterToast.fixed{
        position: absolute;
        top: -40%;
    }
    @media screen and (max-width: 1500px){
        footer .enter,footer .returnTop,
        footer .enter.fixed,footer .returnTop.fixed,
        footer .enterToast{
            right: 2%;
        }
    }
</style>
