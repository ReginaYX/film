<template>
    <div>
        <div id="xiangqing" class="xiangqing">

            <!-- 侧边栏 -->
            <div class="xiangqing-wrapper">
                <div style="float: left" @mouseenter="isCollapse = false" @mouseleave="isCollapse = true">


                <el-menu default-active="$route.path"
                             router
                             class="el-menu-vertical-demo detailsLeftNav"
                             :collapse="isCollapse"
                             active-text-color="#409EFF"
                             text-color="#666"
                    >


                        <el-menu-item index="1" :route="{path:'/'}" class="logoMenuItem">
                            <div class="detailsLogoBox">F</div>
                            <span slot="title"><img src="../../assets/indexTop_logo.png" alt="" class="menuLogo"></span>
                        </el-menu-item>

                        <el-menu-item index="/details/scene"
                                      :route="{path: '/details/scene?play_id='+this.$route.query.play_id+'&project_id='+this.$route.query.project_id}">
                            <i :class="['iconfont','detailsLeftIcon','iconchangjing',this.$route.path == '/details/scene'?'active':'']"></i>
                            <!--<img src="../../assets/detailsIcon2Active.png" alt="" class="detailsLeftIcon" v-if="this.$route.path == '/details/scene'">-->
                            <!--<img src="../../assets/detailsIcon2.png" alt="" class="detailsLeftIcon" v-else>-->
                            <span slot="title">总（顺）场景表</span>
                        </el-menu-item>

                  <el-menu-item index="/details/preview"
                                :route="{path: '/preview?play_id='+this.$route.query.play_id+'&project_id='+this.$route.query.project_id}"
                                v-if="type == '1'">
                    <i :class="['iconfont','detailsLeftIcon','iconpintuhudong',this.$route.path == '/details/preview'?'active':'']"></i>

                    <span slot="title">剧本标注</span>
                  </el-menu-item>

                  <el-menu-item index="/details/location"
                                :route="{path: '/details/location?play_id='+this.$route.query.play_id+'&project_id='+this.$route.query.project_id}">
                    <i :class="['iconfont','detailsLeftIcon','iconpaisedi-',this.$route.path == '/details/location'?'active':'']"></i>

                    <span slot="title">拍摄地管理</span>
                  </el-menu-item>

                  <el-menu-item index="/details/clothing"
                                :route="{path: '/details/clothing?play_id='+this.$route.query.play_id+'&project_id='+this.$route.query.project_id}">
                    <i :class="['iconfont','detailsLeftIcon','iconshangyi',this.$route.path == '/details/clothing'?'active':'']"></i>
                    <span slot="title">服化管理</span>
                  </el-menu-item>

                  <el-menu-item index="/details/art"
                                :route="{path: '/details/art?play_id='+this.$route.query.play_id+'&project_id='+this.$route.query.project_id}">
                    <i :class="['iconfont','detailsLeftIcon','iconbujing',this.$route.path == '/details/art'?'active':'']"></i>
                    <span slot="title">美术管理</span>
                  </el-menu-item>

                  <el-menu-item index="/details/tools"
                                :route="{path: '/details/tools?play_id='+this.$route.query.play_id+'&project_id='+this.$route.query.project_id}">
                    <i :class="['iconfont','detailsLeftIcon','icondaoju-',this.$route.path == '/details/tools'?'active':'']"></i>
                    <span slot="title">道具管理</span>
                  </el-menu-item>

                        <el-menu-item index="/details/budget"
                                      :route="{path: '/details/budget?play_id='+this.$route.query.play_id+'&project_id='+this.$route.query.project_id}">
                            <i :class="['iconfont','detailsLeftIcon','iconyusuan1',this.$route.path == '/details/budget'?'active':'']"></i>
                            <span slot="title">预算<img class="sign" src="../../assets/detailNavSign.png"></span>
                        </el-menu-item>

                        <el-menu-item index="/details/income"
                                      :route="{path: '/details/income?play_id='+this.$route.query.play_id+'&project_id='+this.$route.query.project_id}">
                            <i :class="['iconfont','detailsLeftIcon','iconshouzhi',this.$route.path == '/details/income'?'active':'']"></i>
                            <span slot="title">收支<img class="sign" src="../../assets/detailNavSign.png"></span>
                        </el-menu-item>

                        <el-menu-item index="/details/reportForm"
                                      :route="{path: '/details/reportForm?play_id='+this.$route.query.play_id+'&project_id='+this.$route.query.project_id}">
                            <i :class="['iconfont','detailsLeftIcon','iconbaobiao',this.$route.path == '/details/reportForm'?'active':'']"></i>
                            <span slot="title">报表<img class="sign" src="../../assets/detailNavSign.png"></span>
                        </el-menu-item>

                  <el-menu-item index="/details/announcement"
                                :route="{path: '/details/announcement?play_id='+this.$route.query.play_id+'&project_id='+this.$route.query.project_id}">
                    <i :class="['iconfont','detailsLeftIcon','iconGRP_FI_RP',this.$route.path == '/details/announcement'||this.$route.path == '/details/noticeForm'?'active':'']"></i>
                    <span slot="title">电子通告单</span>
                  </el-menu-item>

                  <el-menu-item index="/details/group"
                                :route="{path: '/details/group?play_id='+this.$route.query.play_id+'&project_id='+this.$route.query.project_id}">
                    <i :class="['iconfont','detailsLeftIcon','iconquanxianshezhi',this.$route.path == '/details/group'?'active':'']"></i>
                    <span slot="title">权限设置</span>
                  </el-menu-item>


                        <el-menu-item @click="signOut">
                            <img src="../../assets/detailsIcon7.png" alt="" class="detailsLeftIcon">
                            <span slot="title">退出登录</span>
                        </el-menu-item>
                    </el-menu>
                </div>


              <!-- 右侧页面 -->
              <div style="margin-left: 52px">
                <div id="content_right" class="content_right">
                    <div class="content_rightTop">
                        <div>
                            <el-breadcrumb  class="detailsBreadcrumb" separator=">>">
                                <el-breadcrumb-item :to="{ path: '/control/list' }">项目列表</el-breadcrumb-item>
                                <el-breadcrumb-item :to="{path: '/details/scene?play_id='+this.$route.query.play_id+'&project_id='+this.$route.query.project_id}">{{projectName}}</el-breadcrumb-item>
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
                                                    v-if="$route.path == '/details/announcement'||$route.path == '/details/noticeForm'">电子通告单</el-breadcrumb-item>

                                <el-breadcrumb-item :to="{path: '/details/group?play_id='+this.$route.query.play_id+'&project_id='+this.$route.query.project_id}"
                                                    v-if="$route.path == '/details/group'">成员管理</el-breadcrumb-item>
                                <el-breadcrumb-item :to="{path: '/details/budget?play_id='+this.$route.query.play_id+'&project_id='+this.$route.query.project_id}"
                                                    v-if="$route.path == '/details/budget'">预算</el-breadcrumb-item>
                                <el-breadcrumb-item :to="{path: '/details/income?play_id='+this.$route.query.play_id+'&project_id='+this.$route.query.project_id}"
                                                    v-if="$route.path == '/details/income'">收支</el-breadcrumb-item>
                                <el-breadcrumb-item :to="{path: '/details/reportForm?play_id='+this.$route.query.play_id+'&project_id='+this.$route.query.project_id}"
                                                    v-if="$route.path == '/details/reportForm'">报表</el-breadcrumb-item>
                                <el-breadcrumb-item :to="{path: '/details/location?play_id='+this.$route.query.play_id+'&project_id='+this.$route.query.project_id}"
                                                    v-if="$route.path.substring(0, 17) == '/details/location'">拍摄地管理</el-breadcrumb-item>
                                <el-breadcrumb-item :to="{path: '/details/art?play_id='+this.$route.query.play_id+'&project_id='+this.$route.query.project_id}"
                                                    v-if="$route.path == '/details/art'">美术管理</el-breadcrumb-item>
                                <el-breadcrumb-item :to="{path: '/details/tools?play_id='+this.$route.query.play_id+'&project_id='+this.$route.query.project_id}"
                                                    v-if="$route.path == '/details/tools'">道具管理</el-breadcrumb-item>
                                <el-breadcrumb-item :to="{path: '/details/clothing?play_id='+this.$route.query.play_id+'&project_id='+this.$route.query.project_id+'&id='+this.actor}"
                                                    v-if="$route.path.substring(0, 17) == '/details/clothing'">服化管理</el-breadcrumb-item>
                            </el-breadcrumb>
                        </div>

                        <div class="content_rightTopFunction">
                            <div v-if="$route.path != '/details/budget'&&$route.path != '/details/reportForm'&&$route.path != '/details/income'">
                                <el-popover
                                        class="collaboration"
                                        width="400"  placement="bottom-end"
                                        trigger="click"  popper-class="detailPopover">
                                    <div class="rightPopoverBox">
                                        <div class="rightPopoverTitle">
                                            <img src="../../assets/collaborationPopoverIcon.png" alt="">协作
                                        </div>
                                        <div class="collaborationBox">
                                            <div class="projectOwnerBox">项目所有者：<span>{{projectOwnName}}</span></div>
                                            <div class="collaborationNum">与【<span>{{groupUser.length}}</span>】人一起协作</div>
                                            <div class="collaborationInfoBox">
                                                <div class="memberContent" v-if="groupUser != ''" v-for="(item, index) in groupUser" :key="index">
                                                    <img v-if="item.profile_picture" :src="item.profile_picture" class="defaultPortrait">
                                                    <div class="defaultPortrait normalPortrait" v-else></div>
                                                    <p class="memberCheckName memberName">{{item.name}}</p>
                                                </div>
                                                <router-link :to="'/details/group?play_id='+this.$route.query.play_id+'&project_id='+this.$route.query.project_id"
                                                             class="memberContent memberAddBtn"
                                                             v-if="group !== ''"
                                                >+</router-link>
                                            </div>
                                        </div>
                                    </div>
                                    <i class="icontianjiahaoyou- iconfont cooperationBtn" type="text" slot="reference"></i>
                                </el-popover>
                            </div>

                            <div v-if="$route.path != '/details/budget'&&$route.path != '/details/reportForm'&&$route.path != '/details/income'">
                                <el-popover
                                        class="history"
                                        width="400" placement="bottom-end"
                                        trigger="click" popper-class="detailPopover">
                                    <div class="rightPopoverBox">
                                        <div class="rightPopoverTitle">
                                            <img src="../../assets/historyPopoverIcon.png" alt="">历史</div>
                                        <el-timeline class="historyTimelineBox" v-if="history.length != 0">
                                            <el-timeline-item v-for="item,index in history" :key="index" :timestamp="item.created_at | dateChange" placement="top" class="historyTimelineItem">
                                                <div class="historyTimelineContent" v-if="index == 0"><span>[更新] </span>{{item.description}}</div>
                                                <div class="historyTimelineContent" v-else>{{item.description}}</div>
                                            </el-timeline-item>
                                        </el-timeline>
                                        <p v-else>暂无历史记录</p>
                                    </div>
                                    <i class="iconlishi iconfont cooperationBtn" type="text" slot="reference"></i>
                                    <div type="text" slot="reference" class="el-dropdown-link"></div>
                                </el-popover>

                            </div>



                            <div class="head_right" @mouseleave="showList=false">
                                <div class="portrait">
                                    <div class="profile" @mouseenter="showList=true" style="position: absolute;margin-top: -1px;">
                                        <img v-if="file" :src="file" alt="" plain>
                                        <!--<img v-else-if="wxFile" :src="wxFile" alt="" >-->
                                        <div v-else class="defaultProfile" plain>{{defaultProfile}}</div>
                                    </div>
                                    <div style="width: 20px;height: 20px;background: #ff0000;border-radius: 50%;position: relative;left: 32px;top: 1px;font-size: 11px;color: #fff;text-align: center;line-height: 20px;z-index: 2147483647" v-if="news_num>0">{{news_num}}</div>
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
                  <!--顺场景表顶部-->
                    <li class="detailsTopNav" v-if="topNav === '0'">
                        <el-menu :default-active="activeIndex" class="detailsTopMenu" mode="horizontal" router>
                          <el-menu-item
                          index="/details/scene"
                          :route="{path: '/details/scene?play_id='+this.$route.query.play_id+'&project_id='+this.$route.query.project_id}">
                              总(顺)场景表
                          </el-menu-item>
                          <el-menu-item
                          index="/details/s_scene"
                          :route="{path: '/details/s_scene?play_id='+this.$route.query.play_id+'&project_id='+this.$route.query.project_id}">
                              分场景表
                          </el-menu-item>
                          <el-menu-item
                          index="/details/count"
                          :route="{path: '/details/count?play_id='+this.$route.query.play_id+'&project_id='+this.$route.query.project_id}">
                              人物戏量统计
                          </el-menu-item>
                        </el-menu>

                    </li>
                  <router-view></router-view>
                </div>
              </div>

            </div>
        </div>
    </div>
</template>

<script>
    import axios from "axios"
    export default {
        name: "detail",
        data () {
            return{
              showList:false,//个人
              active:false,
              isCollapse: true,
              type: '1',
              activeIndex:'/details/scene',
              topNav: false,
              projectName:'',
              file:'',
              defaultProfile:'',
              name:'',
              account:'',
              news_num:0,
              history:[],//历史记录
              groupUser:[],//协作人员
              projectOwnName:'',//项目所有者
              group:'',
                budget:'1',
                income:'1',
                reportForm:'1',
                location:'1',
                art:'1',
                tools:'1',
                clothing:'1',
                clothingTotal:'1',
              actor:'',//演员id
            }
        },
      methods: {
          //获取协作人员
          getMember(){
              axios.get('/department/members', {
                  params: {
                      project_id: this.$route.query.project_id
                  }
              }).then((response)=> {
                  if(response.data.ret == '0'){
                      this.groupUser = response.data.data
                      this.$nextTick( ()=> {
                          this.defaultPortrait()
                      })
                  }else{
                      // this.$message(response.data.msg);
                  }
              })
          },
          //默认头像
          defaultPortrait () {
              var color = [
                  {0:'ff9a9e',1:'fad0c4'},
                  {0:'a18cd1',1:'fbc2eb'},
                  {0:'fad0c4',1:'ffd1ff'},
                  {0:'ffecd2',1:'fcb69f'},
                  {0:'ff9a9e',1:'fecfef'},
                  {0:'f6d365',1:'fda085'},
                  {0:'fbc2eb',1:'a6c1ee'},
                  {0:'fdcbf1',1:'e6dee9'},
                  {0:'a1c4fd',1:'c2e9fb'},
                  {0:'d4fc79',1:'96e6a1'},
                  {0:'84fab0',1:'8fd3f4'},
                  {0:'a6c0fe',1:'f68084'},
                  {0:'fccb90',1:'d57eeb'},
              ];
              var direction = ['left' , 'right' , 'top' , 'bottom','left' , 'right' , 'top' , 'bottom','left' , 'right' , 'top' , 'bottom','left']
              var giveColor = document.getElementsByClassName('normalPortrait');
              var colorNum = [];
              var directionNum = [];
              for(var i = 0; i < giveColor.length ; i++) {
                  const num = Math.floor(Math.random() * color.length); //获取随机数
                  colorNum.push(color[num]); //把随机数添加到数组中
                  // color.splice(num, 1); //删除原有数组的颜色
              }
              for(var l = 0; l < giveColor.length; l++) {
                  const numD = Math.floor(Math.random() * direction.length); //获取随机数
                  directionNum.push(direction[numD]); //把随机数添加到数组中
                  // direction.splice(numD, 1); //删除原有数组的颜色
              }
              for(var j = 0; j < giveColor.length; j++) {
                  giveColor[j].style.background = '-webkit-linear-gradient('+directionNum[j]+', #'+colorNum[j][0]+' , #'+colorNum[j][1]+')';
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
      },
       mounted(){
           this.getMember()
           var user_id = JSON.parse(localStorage.user_id);

           this.activeIndex = this.$route.path

           axios.get('/project/info', {
               params: {
                   project_id: this.$route.query.project_id
               }
           }).then((response)=> {
               axios({
                   method: 'get',
                   url: '/user/info?user_id='+response.data.data.user_id,
                   headers:{
                       'Content-type': 'application/x-www-form-urlencoded'
                   }
               }).then((data)=> {
                   if(data.data.data.name){
                       this.projectOwnName = data.data.data.name
                   }
               })
               this.type = response.data.data.operation_type;
               if(response.data.data.name.length > 12){
                   this.projectName = response.data.data.name.substring(0,12)+'...';
               }else{
                   this.projectName = response.data.data.name
               }
           })
           axios.get('/project/edit_history', {
               params: {
                   project_id: this.$route.query.project_id
               }
           }).then((response)=> {
               let arr = response.data.data
               for(let i=0; i<arr.length; i++){
                   axios({
                       method: 'get',
                       url: '/user/info?user_id='+arr[i].user_id,
                       headers:{
                           'Content-type': 'application/x-www-form-urlencoded'
                       }
                   }).then((data)=> {
                       if(data.data.data.name){
                           arr[i].name = data.data.data.name
                       }else if(data.data.data.phone){
                           arr[i].name = data.data.data.phone
                       }else{
                           arr[i].name = data.data.data.email
                       }
                   })
               }
               this.history = arr
           })
           axios({
               method: 'get',
               url: '/user/info?user_id='+user_id,
               headers:{
                   'Content-type': 'application/x-www-form-urlencoded'
               }
           }).then((response)=> {
               this.file = response.data.data.profile_picture
               if(response.data.data.name){
                   this.name = response.data.data.name
               }else if(response.data.data.phone){
                   this.name = response.data.data.phone
               }else{
                   this.name = response.data.data.email
               }
               if(response.data.data.phone){
                   this.account = response.data.data.phone
               }else{
                   this.account = response.data.data.email
               }
               this.defaultProfile = this.name.substr(0,1)
           })
           if(this.file==''){
            //    var giveColor = document.getElementsByClassName('defaultProfile');
               var color = ['fecfcf','ffdf9b','7ee9f0','e29bff','9ec0ff','ff88ad','5df3c3','ffe6a1','8eec9f','ffb7b7','d3b8ff','ffc4f7'];
               var num = Math.floor(Math.random() * color.length); //获取随机数
               document.querySelector('.defaultProfile').style.background = '#' + color[num]
           }
        },
        updated(){
            if(this.$route.path == "/details/scene" || this.$route.path == "/details/s_scene" || this.$route.path == "/details/count"){
              this.activeIndex = '/details/scene'
              this.topNav = '0'//顺场景的顶部
            }else{
                this.topNav = false
            }
            if(this.$route.path == "/details/scene"){
                this.return = '/control/list'
            }else{
                this.return = '/details/scene?play_id='+this.$route.query.play_id+'&project_id='+this.$route.query.project_id
            }
        },
      watch:{
        $route(to,from){
          if(to.query.actor){
            this.actor = to.query.actor;
          }
        }
      },
    }
</script>

<style>
  #content_right .detailsTopNav{
    width: 100%;
    margin-top: 45px;
  }

  .xiangqing .xiangqing-wrapper .detailsLeftNav .el-menu-item .el-tooltip,
  .xiangqing .xiangqing-wrapper .detailsLeftNav>.el-menu-item{
      padding-left: 16px!important;
  }

  .xiangqing .xiangqing-wrapper .detailsLeftNav>.el-menu-item:not(.logoMenuItem){
    height: 44px;
    line-height: 44px;
      display: flex;
      /*align-items: center;*/
  }

  .xiangqing .xiangqing-wrapper .detailsLeftNav>.el-menu-item.is-active{
      color: #ed9515!important;
  }

  .xiangqing .xiangqing-wrapper .detailsLeftNav .el-menu-item.logoMenuItem{
      height: 30px;
      margin: 12px 0 13px;
      line-height: normal;
      display: flex;
      align-items: center;
  }

  .xiangqing .xiangqing-wrapper .detailsLeftNav>.el-menu-item:last-of-type{
      position: absolute;
      bottom: 4px;
      width: 100%;
  }
  .xiangqing .xiangqing-wrapper .detailsLeftNav .el-menu-item:last-of-type span{
      color: rgb(102, 102, 102);
  }
  .xiangqing .xiangqing-wrapper .detailsLeftNav .el-submenu:first-of-type{
      padding-bottom: 32px;
      margin-bottom: 32px;
      border-bottom: 1px solid #Ddd;
  }
  .xiangqing .xiangqing-wrapper .detailsLeftNav .el-submenu.is-opened .el-menu-item{
      padding-left: 60px!important;
  }

  .xiangqing .xiangqing-wrapper .el-menu-vertical-demo:not(.el-menu--collapse) .el-menu-item.is-active span{
      color: #ed9515;
  }
  /*右面包屑*/
    #content_right .detailsBreadcrumb .el-breadcrumb__item span.is-link{
        font-size:12px;
        font-family:MicrosoftYaHei;
        font-weight: normal;
        color: #656588;
        text-decoration: underline;
    }

  #content_right .detailsBreadcrumb .el-breadcrumb__item:last-of-type span.is-link{
      color: #6F6F6F;
      text-decoration: none;
      cursor: pointer;
  }

  #content_right .detailsBreadcrumb .el-breadcrumb__item .el-breadcrumb__separator{
      font-size:12px;
      color: #656588;
  }

    #content_right .history .el-dropdown{
       display: block;
    }
    /*右顶栏菜单*/
  #content_right .detailsTopNav{
      width: 100%;
      margin-top: 26px;
      height: 20px;
  }
  #content_right .detailsTopNav .detailsTopMenu{
      height: 20px;
      padding:0 20px 0 18px;
  }
  #content_right .detailsTopNav .detailsTopMenu li{
      line-height: 20px;
      height: 20px;
      border-right: 1px solid #909399;
      font-size: 14px;
  }

  #content_right .detailsTopNav .detailsTopMenu li:hover{
      background: none;
  }

  #content_right .detailsTopNav .detailsTopMenu li:first-of-type{
      padding-left: 0;
  }
  #content_right .detailsTopNav .detailsTopMenu li:last-of-type{
      border-right: none;
  }
  #content_right .detailsTopNav .detailsTopMenu li.is-active{
        color: #ed9515;
  }
  #content_right .detailsTopNav .detailsTopMenu.el-menu--horizontal,
  #content_right .detailsTopNav .detailsTopMenu.el-menu--horizontal>.el-menu-item.is-active{
      border-bottom: none;
      background: #F5F5F7;
  }

  .xiangqing .xiangqing-wrapper .detailsLeftNav .el-menu-item:last-of-type .detailsLeftIcon{
      width: 18px;
      height: 18px;
      margin-top: 14px;
  }
    /*历史记录*/
  .detailPopover{
      padding: 0!important;
  }

  .detailPopover.el-popper[x-placement^="bottom"] .popper__arrow::after{
      border-bottom-color:rgba(245,245,247,1);
  }

    .historyTimelineBox .el-timeline-item__tail{
        border-left:1px solid rgba(26,26,44,0.05);
    }

  .historyTimelineBox .el-timeline-item__timestamp{
      font-size:12px;
      font-family:MicrosoftYaHei;
      color:rgba(0,0,0,0.8);
      padding-top: 3px;
      left: 5px;
    }

  .historyTimelineBox .el-timeline-item__node--normal{
      width:12px;
      height:12px;
      background:#3F3E6A;
      box-sizing: border-box;
      border: 3px solid #D9D8E1;
    }

</style>

<style scoped>
    *{
        box-sizing: border-box;
    }

  .xiangqing .xiangqing-wrapper{
    position: relative;
  }
  /*左侧导航*/
  .xiangqing .xiangqing-wrapper .el-menu-vertical-demo{
    float: left;
    height: 100%;
    /*padding-top: 50px;*/
    border-right: none;
    z-index: 1999;
    position: fixed;
    width: 52px;
    box-shadow: 2px 0 20px rgba(0,0,0,.1);
  }
  .xiangqing .xiangqing-wrapper .menuLogo{
      width: 75px;
      margin-top: 2px;
  }

  .xiangqing .xiangqing-wrapper .detailsLogoBox{
      width:30px;
      height:30px;
      background:rgba(237,149,21,1);
      border-radius:4px;
      margin-left: -5px;
      /*margin: 0 10px 42px;*/
      font-size:24px;
      font-family: 新宋体;
      color:#fff;
      text-align: center;
      line-height: 30px;
      display: inline-block;
      flex-shrink: 0;
  }

  .xiangqing .xiangqing-wrapper .detailsLeftNav .mineProfile,
  .xiangqing .xiangqing-wrapper .detailsLeftNav .defaultProfile{
      width: 40px;
      height: 40px;
      border-radius: 50%;
      line-height: 40px;
      text-align: center;
      display: inline-block;
      background: #fecfcf;
  }

  .xiangqing .xiangqing-wrapper .el-menu-vertical-demo:not(.el-menu--collapse) span{
      margin-left: 10px;
      display: flex;
      align-items: center;
      float: left;
  }

    .xiangqing .xiangqing-wrapper .el-menu-vertical-demo:not(.el-menu--collapse) span .sign{
        margin-left: 10px;
        /*width: 32px;*/
    }

  .xiangqing .xiangqing-wrapper .detailsLeftNav .detailsLeftIcon{
      font-size: 20px;
      line-height: 44px;
      margin-top: 0;
      float: left;
      flex-shrink: 0;
  }

  .xiangqing .xiangqing-wrapper .detailsLeftNav .detailsLeftIcon.active{
      color: #ED9515;
  }

  .xiangqing .xiangqing-wrapper .detailsLeftNav .el-menu-item:nth-of-type(4) .detailsLeftIcon{
      /*font-size: 26px;*/
  }

  .xiangqing .xiangqing-wrapper .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    /*min-height: 400px;*/
  }
  .xiangqing .xiangqing-wrapper .el-menu-vertical-demo:not(.el-menu--collapse) .mineProfile{
      margin-right: 2px;
  }
  .xiangqing .xiangqing-wrapper .el-menu-vertical-demo .folding{
    margin-left: 20px;
  }
  /*右侧*/
  #content_right{
    float: left;
    width: 100%;
    /*min-height: 100vh;*/
    box-sizing: border-box;
      height: 100vh;
    /*overflow: hidden;*/
    padding-top: 12px;
    background: #F5F5F7;
  }

  #content_right .content_rightTop{
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-left: 12px;
      padding-right: 20px;
      height: 30px;
  }

  #content_right .content_rightTopFunction{
      display: flex;
      align-items: center;
      height: 30px;
  }

  #content_right .collaboration{
    width: 30px;
  }

  #content_right .collaboration .cooperationBtn,
  #content_right .history .cooperationBtn{
      width:30px;
      height:30px;
      border:1px solid rgba(0,0,0,0.1);
      border-radius:6px;
      /*background: url("../../assets/cooperationIcon.png") center no-repeat;*/
      cursor: pointer;
      display: inline-block;
      text-align: center;
      line-height: 32px;
      font-size: 22px;
      color: #626263;
      margin-right: 20px;
  }

    #content_right .history .cooperationBtn{
        margin-right: 0;
    }

  #content_right .history{
      width:32px;
      height:32px;
      /*margin: 0 20px;*/
  }

  #content_right .history .cooperationBtn{
      font-size: 20px;
  }
  /*#content_right .history .el-dropdown-link{*/
      /*width:30px;*/
      /*height:30px;*/
    /*border:1px solid rgba(0,0,0,0.1);*/
    /*border-radius:6px;*/
    /*background: url("../../assets/historyIcon.png") center no-repeat;*/
    /*cursor: pointer;*/
      /*margin-right: 20px;*/
  /*}*/

  .rightPopoverBox .rightPopoverTitle{
      height: 44px;
      width: 100%;
      font-size:14px;
      display: flex;
      align-items: center;
      color:rgba(0,0,0,1);
      line-height: 36px;
      box-sizing: border-box;
      padding-left: 18px;
      background:rgba(245,245,247,1);
  }

  .rightPopoverBox .rightPopoverTitle>img{
      margin-right: 8px;
  }

  .rightPopoverBox>p{
      line-height: 50px;
      text-align: center;
      font-size: 14px;
      color: rgba(0,0,0,.5);
  }

  .rightPopoverBox .collaborationBox{
      padding-left: 22px;
      padding-bottom: 30px;
      max-height: 300px;
      overflow-y: scroll;
      overflow-x: hidden;
  }

  .rightPopoverBox .collaborationBox .projectOwnerBox{
      margin-top: 22px;
      font-size:12px;
      color:rgba(0,0,0,0.8);
      line-height: 12px;
  }

  .rightPopoverBox .collaborationBox .projectOwnerBox span{
      font-size:12px;
      color:rgba(0,0,0,1);
  }

  .rightPopoverBox .collaborationBox .collaborationNum{
      font-size:12px;
      margin-top: 36px;
      line-height: 12px;
      color:rgba(0,0,0,0.8);
  }

  .rightPopoverBox .collaborationBox .collaborationInfoBox{
      display: flex;
      margin: 3px 0 10px;
      flex-wrap: wrap;
  }

  .rightPopoverBox .collaborationBox .collaborationInfoBox .memberContent{
      margin-top: 20px;
      flex-shrink: 0;
      margin-right: 7.5%;
  }

  .rightPopoverBox .collaborationBox .collaborationInfoBox .memberContent .defaultPortrait{
      width:34px;
      height:34px;
      border-radius:6px;
      margin-bottom: 10px;
  }

  .rightPopoverBox .collaborationBox .collaborationInfoBox .memberContent .defaultPortrait.normalPortrait{
      margin-bottom: 14px;
  }

  .rightPopoverBox .collaborationBox .collaborationInfoBox .memberContent .memberName{
      font-size:12px;
      color:rgba(0,0,0,0.8);
      width: 34px;
      text-align: center;
      height: 13px;
      line-height: 13px;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
  }

  .rightPopoverBox .collaborationBox .collaborationInfoBox .memberContent.memberAddBtn{
      width:34px;
      height:34px;
      border:1px solid rgba(186,186,186,1);
      border-radius:6px;
      font-size:22px;
      color:rgba(237,149,21,1);
      text-align: center;
      line-height: 30px;
      box-sizing: border-box;
      cursor: pointer;
  }

  .rightPopoverBox .collaborationBox .collaborationNum span{
      color: #FF690E;
      font-size: 12px;
  }

  .historyTimelineBox{
      padding: 20px;
      max-height: 166px;
      overflow-y: scroll;
  }

  .historyTimelineBox .historyTimelineItem .historyTimelineContent{
      padding: 10px;
      border-radius: 4px;
      font-size:12px;
      color:rgba(0,0,0,0.6);
  }

  .historyTimelineBox .historyTimelineItem:first-of-type .historyTimelineContent{
      background: rgba(63,62,106,0.05);
      color: #000;
  }

  .historyTimelineBox .historyTimelineItem:first-of-type .historyTimelineContent span{
      color: rgba(255,67,2,0.8);
      font-size: 12px;
  }

    #content_right .head_right{
        /*position: absolute;*/
        /*top: 10px;*/
        /*right: 64px;*/
        height: 50px;
        width: 50px;
        /*align-self: end;*/
        float: none;
        margin-top: 21px;
        padding-left: 20px;
    }
  #content_right .head_right .portrait{
      width: 100%;
      height: 100%;
      margin-top: 0;
  }

    #content_right .head_right .portrait .profile{
        width: 30px;
        height: 30px;
        overflow: inherit;
        border-radius: 0;
    }
    #content_right .head_right .portrait .profile img{
        width: 30px;
        height: 30px;
        border-radius: 6px;
        top: 0;
        left: 0;
    }

  #content_right .head_right .defaultProfile{
        width: 30px;
        height: 30px;
        border-radius: 6px;
        text-align: center;
        line-height: 30px;
        font-size: 20px;
        color: #666;
        font-family: 	KaiTi;
        font-weight: bolder;
        top: 0;
        left: 0;
    }
</style>
