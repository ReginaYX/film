<template>
    <div id="head">
        <div id="head_content" class="head_content row">
            <div id="head_left" class="head_left">
                <router-link to="/">
                    <img src="../assets/indexTop_logo.png" style="height: 40px;margin-right: 30px">
                </router-link>
                <el-breadcrumb separator-class="el-icon-arrow-right" class="detailsBreadcrumb">
                    <el-breadcrumb-item :to="{ path: '/control/list' }" v-if="$route.path.substring(0, 8) != '/control'">项目列表</el-breadcrumb-item>
                    <el-breadcrumb-item :to="{path: '/details/scene?play_id='+this.$route.query.play_id+'&project_id='+this.$route.query.project_id}" v-if="$route.path == '/details/scene'">{{projectName}}</el-breadcrumb-item>
                    <el-breadcrumb-item :to="{path: '/preview?play_id='+this.$route.query.play_id+'&project_id='+this.$route.query.project_id}"
                                        v-if="$route.path == '/preview'">剧本标注</el-breadcrumb-item>
                    <el-breadcrumb-item :to="{path: '/details/performer?play_id='+this.$route.query.play_id+'&project_id='+this.$route.query.project_id}"
                                        v-if="$route.path == '/details/performer'">演员表</el-breadcrumb-item>
                    <el-breadcrumb-item :to="{path: '/details/s_scene?play_id='+this.$route.query.play_id+'&project_id='+this.$route.query.project_id}"
                                        v-if="$route.path == '/details/s_scene'">分场景表</el-breadcrumb-item>
                    <el-breadcrumb-item :to="{path: '/details/count?play_id='+this.$route.query.play_id+'&project_id='+this.$route.query.project_id}"
                                        v-if="$route.path == '/details/count'">人物戏量统计表</el-breadcrumb-item>
                    <el-breadcrumb-item :to="{path: '/details/s_scene?play_id='+this.$route.query.play_id+'&project_id='+this.$route.query.project_id}"
                                        v-if="$route.path == '/details/s_sceneTable'">分场景表</el-breadcrumb-item>
                    <el-breadcrumb-item :to="{path: '/details/count?play_id='+this.$route.query.play_id+'&project_id='+this.$route.query.project_id}"
                                        v-if="$route.path == '/details/countTable'">人物戏量统计表</el-breadcrumb-item>
                    <el-breadcrumb-item :to="{path: '/details/announcement?play_id='+this.$route.query.play_id+'&project_id='+this.$route.query.project_id}"
                                        v-if="$route.path == '/details/announcement'">电子通告单</el-breadcrumb-item>
                    <el-breadcrumb-item :to="{path: '/details/group?play_id='+this.$route.query.play_id+'&project_id='+this.$route.query.project_id}"
                                        v-if="$route.path == '/details/group'">成员管理</el-breadcrumb-item>
                    <el-breadcrumb-item :to="{path: '/mine/security'}"
                                        v-if="$route.path == '/mine/security'">安全设置</el-breadcrumb-item>
                    <el-breadcrumb-item :to="{path: '/mine/setting'}"
                                        v-if="$route.path == '/mine/setting'">基本设置</el-breadcrumb-item>
                    <el-breadcrumb-item :to="{path: '/mine/binding'}"
                                        v-if="$route.path == '/mine/binding'">账号绑定</el-breadcrumb-item>
                    <el-breadcrumb-item :to="{path: '/news'}"
                                        v-if="$route.path == '/news'">新消息通知</el-breadcrumb-item>
                    <el-breadcrumb-item :to="{path: '/mine/tradingCenter'}"
                                        v-if="$route.path == '/mine/tradingCenter'">交易中心</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="rightBox">
                <transition enter-active-class="animated bounceInDown" leave-active-class="animated bounceOutUp">
                    <router-link class="rewardBox" to="/control/reward" v-show="reward">
                        <img src="../assets/rewardIcon.png" alt="">领取福利
                    </router-link>
                </transition>

                <div class="head_right">
                    <!--<img class="company" src="../assets/xiangqing_tongchou.png"style="margin-top: 23px;">-->
                    <div class="portrait" @mouseleave="showList=false">
                        <div class="profile" @mouseenter="handleShowList" style="position: absolute;margin-top: -1px;">
                            <img v-if="file" :src="file" alt="" plain>
                            <!--<img v-else-if="wxFile" :src="wxFile" alt="" >-->
                            <div v-else class="defaultProfile" plain>{{defaultProfile}}</div>
                        </div>
                        <div style="width: 18px;height: 18px;background: #ff0000;border-radius: 50%;position: relative;left: 28px;top: -2px;font-size: 11px;color: #fff;text-align: center;line-height: 16px;z-index: 2147483647" v-if="news_num>0">{{news_num}}</div>
                        <ul class="head-menu" v-show="showList">
                            <li class="nickname">
                                <div class="headBox"><i class="iconfont iconnan"></i></div>
                                <div class="infoBox">
                                    <p>{{name}}</p>
                                    <p>{{account}}</p>
                                </div>
                            </li>
                            <li class="border">
                                <router-link class="setting" to="/mine/setting">个人设置</router-link>
                                <router-link class="security" to="/mine/pwd">账号设置</router-link>
                            </li>
                            <li>
                                <router-link class="message" to="/news">
                                    <span>消息中心</span>
                                    <div class="newNumBox" v-if="news_num>0">{{news_num}}</div>
                                </router-link>
                                <router-link class="message tradingCenter" to="/tradingCenter">交易中心</router-link>
                                <router-link class="message tradingCenter" to="/mine/coupon">优惠券</router-link>
                            </li>
                            <li class="logout" @click="signOut">退出</li>
                        </ul>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import {userApi} from "../service/api";
    export default {
        name: "top_mine",
        data () {
            return {
                showList:false,
                news_num:0,
                file:'',
                name:'',
                account:'',
                t1:'',
                defaultProfile:'',
                projectName:'',
                reward:false,//是否显示福利
            }
        },
        methods:{
            handleShowList(){
                if(JSON.parse(localStorage.user_id)){
                    this.showList = true
                }
            },

            signOut(){
                var r=confirm("确认退出吗？")
                if (r==true)
                {
                    localStorage.removeItem('user_id')
                    this.$router.push('/')
                }
            },
            msg (){
                var user_id = JSON.parse(localStorage.user_id)
                axios({
                    method: 'get',
                    url: '/message/list?user_id='+user_id,
                    headers:{
                        'Content-type': 'application/x-www-form-urlencoded'
                    }
                }).then((response)=> {
                    let num = 0
                    if(response.data.data){
                        for (let it in response.data.data) {
                            if(response.data.data[it].status == '1' ){
                                num ++;
                            }
                        }
                        this.news_num = num
                        return this.news_num
                    }
                })
            },
            handleScroll () {
                var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
                var indexTop = document.querySelector('#head')
                if(scrollTop > 100){
                    indexTop.classList.add('bgColor')
                }
                if(scrollTop <= 100){
                    indexTop.classList.remove('bgColor')
                }
            },
        },
        mounted () {
          userApi().then(response=>{
            this.file = response.profile_picture
            if(response.name){
              this.name = response.name
            }else if(response.phone){
              this.name = response.phone
            }else{
              this.name = response.email
            }
              if(response.phone){
                  this.account = response.phone
              }else{
                  this.account = response.email
              }
            this.defaultProfile = this.name.substr(0,1)
          })
            window.addEventListener('scroll', this.handleScroll)
            var user_id = JSON.parse(localStorage.user_id)
            this.msg()
            this.t1=window.setInterval(this.msg, 20000);
            // var refreshCount = () => {
            //     console.log("ready");
            // }

            if(this.$route.query.project_id){
                axios({
                    method: 'get',
                    url: '/project/info?project_id='+this.$route.query.project_id,
                    headers:{
                        'Content-type': 'application/x-www-form-urlencoded'
                    }
                }).then((response)=> {
                    if(response.data.data.name.length > 6){
                        this.projectName = response.data.data.name.substring(0,6)+'...';
                    }else{
                        this.projectName = response.data.data.name
                    }

                })
            }
            if(this.$route.path != "/control/reward"){
                this.reward = true
            }
            // axios({
            //     method: 'get',
            //     url: '/user/info?user_id='+user_id,
            //     headers:{
            //         'Content-type': 'application/x-www-form-urlencoded'
            //     }
            // }).then((response)=> {
            //     this.file = response.data.data.profile_picture
            //     if(response.data.data.name){
            //         this.name = response.data.data.name
            //     }else if(response.data.data.phone){
            //         this.name = response.data.data.phone
            //     }else{
            //         this.name = response.data.data.email
            //     }
            //     this.defaultProfile = this.name.substr(0,1)
            // })
            if(this.file==''){
                var giveColor = document.getElementsByClassName('defaultProfile');
                var color = ['fecfcf','ffdf9b','7ee9f0','e29bff','9ec0ff','ff88ad','5df3c3','ffe6a1','8eec9f','ffb7b7','d3b8ff','ffc4f7'];
                var num = Math.floor(Math.random() * color.length); //获取随机数
                document.querySelector('.defaultProfile').style.background = '#' + color[num]
            }
        },
        updated(){
            window.addEventListener('scroll', this.handleScroll)
        },
        watch:{
            $route(to,from){
                if(this.$route.path != "/control/reward"){
                    this.reward = true
                }else{
                    this.reward = false
                }
            }
        },
        beforeDestroy() {
            clearInterval(this.t1);
            window.removeEventListener('scroll', this.handleScroll)
        },
        beforeRouteLeave (to, from, next){
            console.log(next)
            window.removeEventListener('scroll', this.handleScroll)
            next()
        },
    }
</script>
<style>
    #head_content.row .head_left .el-breadcrumb .el-breadcrumb__item .el-breadcrumb__inner.is-link{
        font-weight: normal;
        color: #666;
    }
    #head_content.row .head_left .el-breadcrumb .el-breadcrumb__item:last-child .el-breadcrumb__inner{
        color: #333;
    }
</style>
<style scoped>
    *{
        box-sizing: border-box;
    }

    #head_content.row{
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 1132px;
        margin: 0 auto;
    }
    #head_content.row .head_left{
        width: 500px;
        display: flex;
        align-items: center;
    }

    .head_content .rightBox{
        display: flex;
        align-items: center;
    }

    .head_content .rightBox .rewardBox{
        width:130px;
        height:26px;
        background:linear-gradient(90deg,rgba(252,190,57,1) 0%,rgba(255,79,29,1) 100%);
        border-radius:12px;
        margin-right: 24px;
        display: flex;
        align-items: center;
        font-size:12px;
        letter-spacing: 1px;
        font-weight:bold;
        color:rgba(255,255,255,1);
        cursor: pointer;
    }

    .head_content .rightBox .rewardBox>img{
        width: 38px;
        display: block;
        margin: -6px 4px 0 6px;
    }

    .head_content .head_right .portrait .profile{
        width: 40px;
        height: 50px;
        overflow: inherit;
        border-radius: 0;
    }
    .head_right .portrait .profile img{
        width: 40px;
        height: 40px;
        border-radius: 50%;
        top: 0;
        left: 0;
    }
    .defaultProfile{
        width: 40px;
        height: 40px;
        border-radius: 50%;
        text-align: center;
        line-height: 39px;
        font-size: 24px;
        color: #666;
        font-family: 	KaiTi;
        font-weight: bolder;
        top: 0;
        left: 0;
    }
</style>
