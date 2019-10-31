<template>
    <div>
        <top-nav></top-nav>
        <img src="../../assets/aboutBanner.png" alt="" class="aboutBanner">
        <div class="aboutContent">
            <el-menu
                    :default-active="index"
                    class="el-menu-vertical-demo aboutContentLeft"
                    router>
                <el-menu-item index="/contact" class="about_menuItem">
                    <span slot="title" class="aboutContentTitle">联系我们</span>
                </el-menu-item>
                <el-menu-item index="/feedback" class="about_menuItem">
                    <span slot="title" class="aboutContentTitle">用户反馈</span>
                </el-menu-item>
                <el-menu-item index="/know" class="about_menuItem">
                    <span slot="title" class="aboutContentTitle">用户指南</span>
                </el-menu-item>
                <el-menu-item index="/agreement" class="about_menuItem">
                    <span slot="title" class="aboutContentTitle">服务协议</span>
                </el-menu-item>
                <el-menu-item index="/privacyProtocol" class="about_menuItem">
                    <span slot="title" class="aboutContentTitle">隐私协议</span>
                </el-menu-item>
            </el-menu>

            <div class="aboutContentRight">
                <router-view></router-view>
            </div>
        </div>
        <fm-footer></fm-footer>
    </div>
</template>

<script>
    import topNav from "../../common/topNav";
    import fmFooter from "../../common/fmFooter";
    export default {
        name: "about",
        components: {topNav,fmFooter},
        data(){
            return{
                index:''
            }
        },
        mounted(){
            this.index = this.$route.path
        }
    }
</script>

<style scoped>
    .aboutBanner{
        margin: 50px 0 40px;
        width: 100%;
    }
    .aboutContent{
        width: 1200px;
        margin: 0 auto;
    }
    .aboutContent .aboutContentLeft{
        float: left;
        width: 200px;
        height: 300px;
        background: #fff;
        border-radius: 5px;
        box-shadow: 1px 1px 4px 2px rgba(0,0,0,.06);
        overflow: hidden;
    }
    .aboutContent .aboutContentLeft .about_menuItem{
        padding: 0!important;
        overflow: hidden;
        transition: none;
        height: 60px;
    }
    .aboutContent .aboutContentLeft .aboutContentTitle{
        width: 100%;
        height: 40px;
        overflow: hidden;
        cursor: pointer;
        display: block;
        line-height: 40px;
        padding-left: 27px;
        border-left: 3px solid #fff;
        box-sizing: border-box;
        font-size: 16px;
        color: #666;
        margin-top: 10px;

    }
    .aboutContent .aboutContentLeft .about_menuItem:hover {
        background: #f6ae45;
    }
    .aboutContent .aboutContentLeft .aboutContentTitle span{
        height: 40px;
        margin-top: 10px;
        display: block;
        vertical-align: middle;
        line-height: 40px;
        padding-left: 27px;
        border-left: 3px solid #fff;
        box-sizing: border-box;
        font-size: 16px;
        color: #666;
    }
    .aboutContent .aboutContentLeft .about_menuItem.is-active{
        background: #fff;
    }
    .aboutContent .aboutContentLeft .about_menuItem.is-active .aboutContentTitle,
    .aboutContent .aboutContentLeft .about_menuItem:hover .aboutContentTitle{
        border-left: 3px solid #f6ae45;
    }
    .aboutContent .aboutContentRight{
        margin-left: 18px;
        border-radius: 5px;
        background: #fff;
        box-shadow: 1px 1px 4px 2px rgba(0,0,0,.06);
        float: right;
        width: 980px;
        margin-bottom: 100px;
    }
</style>
