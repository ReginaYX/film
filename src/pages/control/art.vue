<template>
  <div id="art">
    <div class="artLeft">
      <div class="artLeftTop">
        <div class="artLeftTitleBox">
          <div class="artLeftTitle">
            <i class="iconfont iconchangjingguanli"></i>场景列表
          </div>
        </div>
        <div class="artLeftSearchBox">
          <el-input placeholder="请输入查找内容" v-model="searchScene" class="artLeftSearch" @keyup.enter.native="getSearch">
            <el-button slot="append" icon="iconfont iconsousuo" @click="getSearch"></el-button>
          </el-input>
          <div class="sortBox">
            <el-dropdown trigger="click" @command="sortChange">
              <span class="sortDropdownLink" v-if="order_field =='0'">
                名称<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <span class="sortDropdownLink" v-else>
                次数<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown" class="sortDropBox" placement="bottom-start">
                <el-dropdown-item :class="['dropItem',order_field =='1'?'active':'']" command="1">次数 <i class="el-icon-check"></i></el-dropdown-item>
                <el-dropdown-item :class="['dropItem',order_field =='0'?'active':'']" command="0">名称<i class="el-icon-check"></i></el-dropdown-item>
                <el-dropdown-item divided :class="['dropItem',method =='0'?'active':'']" command="2">升序<i class="el-icon-check"></i></el-dropdown-item>
                <el-dropdown-item :class="['dropItem',method =='1'?'active':'']" command="3">降序<i class="el-icon-check"></i></el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </div>
      <div class="artLeftContentBox" id="s_Scene_list">
        <div class="artLeftContent artContentNull" v-if='selectList.length == 0'>暂无数据</div>
        <div class="artLeftContent" v-for="item,index in selectList" :key="index" @click="handleChange(index,$event)" v-else>
          <div class="artContentInfo">
            <div class="artContentTitle">{{item.scene_name}}</div>
            <div class="artContentDesc">
              共计{{item.total_sessioin}}场戏，合计{{item.total_page}}页
            </div>
          </div>
          <div class="artContentHr"></div>
        </div>
      </div>
    </div>
    <div class="artRight">
      <div class="addressBox">
        <div class="artInfoTitle">
          <div class="artInfoTitleBorder"></div>
          <span class="artInfoTitleTxt">置景信息</span>
        </div>
        <div class="addressFormBox">
          <div class="addressForm">
            置景地点
            <el-input
              placeholder="请输入置景地点" @blur="submitInfo('scene_location')"
              v-model="artInfo.scene_location"
              clearable class="addressFormInput" :disabled="authId!=1">
            </el-input>
          </div>
          <div class="addressForm">
            置景时间
            <el-date-picker
              v-model="sceneDate" :class="['addressFormInput','addressFormDate',sceneDate?'active':'']"
              type="daterange" value-format="timestamp" @blur="submitInfo('sceneDate')"
              range-separator="至"  prefix-icon="iconfont iconriqi1"
              start-placeholder="开始日期"
              end-placeholder="结束日期" :disabled="authId!=1">
            </el-date-picker>
          </div>
          <div class="addressForm">
            场地使用时间
            <el-date-picker
              v-model="locationDate" :class="['addressFormInput','addressFormDate',locationDate?'active':'']"
              type="daterange" value-format="timestamp" @blur="submitInfo('locationDate')"
              range-separator="至"  prefix-icon="iconfont iconriqi1"
              start-placeholder="开始日期"
              end-placeholder="结束日期" :disabled="authId!=1">
            </el-date-picker>
          </div>
          <div class="addressForm">
            场地联系方式
            <el-input @input="numCheck($event,'location_contact')" @blur="submitInfo('location_contact')"
              placeholder="请输入场地联系方式"
              v-model="artInfo.location_contact"
              clearable class="addressFormInput"  :disabled="authId!=1">
            </el-input>
          </div>
          <div class="addressForm">
            负责人
            <el-input @blur="submitInfo('head')"
              placeholder="请输入负责人"
              v-model="artInfo.head" :disabled="authId!=1"
              clearable class="addressFormInput">
            </el-input>
          </div>
          <div class="addressForm">
            负责人联系电话
            <el-input @blur="submitInfo('head_contact')"
              placeholder="请输入联系电话" @input="numCheck($event,'head_contact')"
              v-model="artInfo.head_contact" :disabled="authId!=1"
              clearable class="addressFormInput">
            </el-input>
          </div>
          <div class="addressForm">
            协助制片
            <el-input @blur="submitInfo('helper')"
              placeholder="请输入协助制片"
              v-model="artInfo.helper" :disabled="authId!=1"
              clearable class="addressFormInput">
            </el-input>
          </div>
          <div class="addressForm">
            协助制片联系电话
            <el-input @blur="submitInfo('helper_contact')"
              placeholder="请输入联系电话" @input="numCheck($event,'helper_contact')"
              v-model="artInfo.helper_contact" :disabled="authId!=1"
              clearable class="addressFormInput">
            </el-input>
          </div>
          <div class="addressForm"></div>
        </div>
      </div>
      <el-collapse class="artCollapse" v-model="activeCollapse">
        <el-collapse-item  name="1">
          <template slot="title">
            <div class="artInfoTitle">
              <div class="artInfoTitleBorder"></div>
              <span class="artInfoTitleTxt">气氛图&#12288;</span>
              <div class="artInfoTitleHr"></div>
            </div>
          </template>
          <div class="photoInfoBox">
            <div class="photoInfo" v-for="item,index in photo" :key="index">
              <img :src="host+'/files/'+item.path" alt="">
              <div class="photoInfoDesc">{{item.photo_name}}</div>
              <el-collapse-transition>
                <div class="photoInfoBtnBox">
                  <div class="photoInfoBtn" @click="()=>{if(authId==1){item.deleMemberShadow = true}else{noAccess = true}}"><i class="iconfont iconshanchu"></i></div>
                  <div class="photoInfoBtn" @click="detailImg = host+'/files/'+item.path"><i class="iconfont iconchakan"></i></div>
                </div>
              </el-collapse-transition>
              <transition name="el-zoom-in-top">
                <div class="photoDeleShadow" v-if="item.deleMemberShadow">
                  <div class="photoDeleText">
                    <i class="iconfont icontips-copy"></i>确认删除该道具图
                  </div>
                  <div class="photoDeleFooter">
                    <div class="photoDeleBtn" @click="item.deleMemberShadow = false">取消</div>
                    <div class="photoDeleBtn" @click="delePhoto(item.photo_id)">确认</div>
                  </div>
                </div>
              </transition>
            </div>
            <div class="photoInfo photoAdd" @click="()=>{if(authId==1){addPhotoDialog = true}else{noAccess = true}}">
              <i class="iconfont iconshangchuanxianchangzhaopian"></i>
              ＋添加气氛图
            </div>
          </div>
          <transition name="el-zoom-in-center">
            <div class="detailImgBox" v-show="detailImg">
              <img :src="detailImg" alt="">
              <div class="detailImgClose" @click="detailImg = ''">×</div>
            </div>
          </transition>
        </el-collapse-item>
      </el-collapse>
    </div>
    <el-dialog
      title="添加场景"
      :visible.sync="addSceneDialog"
      width="480px" center class="addDialog">
      <div class="addressFormBox">
        <div class="addressForm">
          场景名称<span class="addressFormSign">*</span>
          <el-input
            placeholder="请输入场景名称"
            v-model="addSceneInfo.scene_name"
            clearable class="addressFormInput">
          </el-input>
        </div>
        <div class="addressForm">
          置景地点
          <el-input
            placeholder="请输入置景地点"
            v-model="addSceneInfo.scene_location" maxlength="30"
            clearable class="addressFormInput">
          </el-input>
        </div>
        <div class="addressForm">
          场地联系方式
          <el-input
            placeholder="请输入场地联系方式" @input="numCheck($event,'addContact')"
            v-model="addSceneInfo.location_contact"
            clearable class="addressFormInput">
          </el-input>
        </div>
      </div>
      <div class="addDialogFooter">
        <div class="addFooterBtn" @click="addScene">创建</div>
        <div class="addFooterBtn" @click="addSceneDialog = false">取消</div>
      </div>
    </el-dialog>
    <el-dialog
      title="添加现场照片"
      :visible.sync="addPhotoDialog"
      width="480px" center class="addDialog addPhotoDialog">
      <el-upload :show-file-list="false"
                 class="photoAddBox" :on-change="onChange" accept=".jpg,.png"
                 action="/finance/flow/certificate/add" :http-request="upLoad">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <div class="uploadBox" v-else>
          <i class="iconfont iconshangchuanxianchangzhaopian"></i><br />
          可拖动图片至该区域，或<span class="addClick">点击添加</span>
        </div>
      </el-upload>
      <div class="addressFormBox">
        <div class="addressForm">
          照片名称<span class="addressFormSign">*</span>
          <el-input
            placeholder="请输入照片名称" maxlength="8"
            v-model="addPhotoInfo.photo_name"
            clearable class="addressFormInput">
          </el-input>
        </div>
      </div>
      <div class="addDialogFooter">
        <div class="addFooterBtn" @click="addPhoto">创建</div>
        <div class="addFooterBtn" @click="addPhotoDialog = false">取消</div>
      </div>
    </el-dialog>
    <!--无权限弹框-->
    <no-access :noAccessVisible="noAccess" @close="(v)=>{noAccess = v}"></no-access>
  </div>
</template>

<script>
  import axios from "axios"
  import Qs from 'qs'
  import global_ from '../../common/Global'
    export default {
      name: "art",
      data(){
        return{
          activeIndex: '1',
          searchScene:'',//场景搜索
          pages_num:1,//场景页数
          selectList:[],//场景列表
          artInfoTitleTxt:'迎泽公园',
          dateValue:'',
          sceneDate:'',//置景时间
          locationDate:'',//场地租期
          addSceneDialog:false,//添加场景弹框
          addPhotoDialog:false,//添加气氛图
          activeCollapse:'1',//折叠面板展开项
          photo: [],
          detailImg:'',
          addSceneInfo:{
            play_id: this.$route.query.play_id,
            scene_name: '',
            scene_location:'',
            location_contact:'',
          },
          method:'1',//排序方式1降0升
          order_field:'1',//排序字段0名称1次数
          artInfo:{
            scene_id:'',
            scene_location:'',
            scene_start_date:'',
            scene_end_date:'',
            location_start_date:'',
            location_end_date:'',
            location_contact:'',
            head:'',
            head_contact:'',
            helper:'',
            helper_contact:''
          },//置景信息
          imageUrl:'',//图片路径
          sceneId:"",//场景id
          addPhotoInfo:{
            photo_name:'',
            path:'',
            scene_id:''
          },//添加照片信息
          host:global_.pathInfo,
          addId:'',//新增id
          authId:0,//权限信息
          noAccess:false,//无权限弹框
        }
      },
      methods: {
        //图片上传
        upLoad(file){
          if(this.authId==1){
            global_.upLoad(file).then((response)=>{
              this.imageUrl = global_.pathInfo+'/files/'+response.data[0]
              this.addPhotoInfo.path = response.data[0]
            })
          }else{
            this.noAccess = true
          }


        },
        //获取照片
        getPhoto(){
          axios.get('/manage/scene/find_all_photo', {
            params: {
              scene_id: this.sceneId
            }
          }).then((response) => {
            if (response.data.ret == '0') {
              if(response.data.data.length != 0){
                for(let i=0; i<response.data.data.length; i++){
                  response.data.data[i].deleMemberShadow = false
                }
              }
              this.photo = response.data.data
            }else{
              this.$message(response.data.msg+','+response.data.cause);
            }
          })
        },
        //添加照片
        addPhoto(){
          if(this.addPhotoInfo.photo_name && this.addPhotoInfo.path){
            this.addPhotoInfo.scene_id = this.sceneId
            this.addPhotoDialog = false
            axios({
              method: 'post',
              url: '/manage/scene/add_air_photo',
              data:this.addPhotoInfo,
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
              },
              transformRequest: [data => Qs.stringify(data)]
            }).then((response)=> {
              if(response.data.ret == '0'){
                this.getPhoto();
                this.addPhotoInfo.photo_name = '';
                this.imageUrl = ''
              }else{
                this.addPhotoDialog = true
                this.$nextTick( ()=> {
                  this.$message(response.data.msg+','+response.data.cause);
                })
              }
            })
          }else{
            this.$message('请填写完整');
          }
        },
        //删除照片
        delePhoto(v){
          axios.get('/manage/scene/delete_one_photo', {
            params: {
              photo_id: v
            }
          }).then((response) => {
            if (response.data.ret == '1') {
              this.$message(response.data.msg+','+response.data.cause);
            }else{
              this.getPhoto()
            }
          })
        },
        //场景搜索
        getSearch(){
          axios.get('/manage/scene/search_scene', {
            params: {
              order_field:this.order_field,
              method : this.method,
              play_id: this.$route.query.play_id,
              keyword:this.searchScene
            }
          }).then((response) => {
            if (response.data.ret == '0') {
              if(response.data.data){
                this.selectList = response.data.data
                this.$nextTick(() => {
                  this.handleChange(0)
                })
              }else{
                this.selectList = []
              }
            }
          })
        },
        //排序改变
        sortChange(v){
          if(v=='0'){
            this.order_field = '0'
          }else if(v=='1'){
            this.order_field = '1'
          }else if(v=='2'){
            this.method = '0'
          }else if(v=='3'){
            this.method = '1'
          }
          this.$nextTick(() => {
            this.sceneName()
          })
        },
        //数字验证
        numCheck(v,form){
          if(form == 'addContact'){
            this.addSceneInfo.location_contact = v.match(/\d/ig) ? v.match(/\d/ig).join('') : ''
          }else if(form == 'head_contact'){
            this.artInfo.head_contact = v.match(/\d/ig) ? v.match(/\d/ig).join('') : ''
          }else if(form == 'helper_contact'){
            this.artInfo.helper_contact = v.match(/\d/ig) ? v.match(/\d/ig).join('') : ''
          }else if(form == 'location_contact'){
            this.artInfo.location_contact = v.match(/\d/ig) ? v.match(/\d/ig).join('') : ''
          }
        },
        //置景信息修改
        submitInfo(v){
          let formData = new FormData();
          if(v == 'sceneDate'){
            formData.append('scene_start_date',this.sceneDate[0]/1000);
            formData.append('scene_end_date',this.sceneDate[1]/1000);
          }else if(v == 'locationDate'){
            formData.append('location_start_date',this.locationDate[0]/1000);
            formData.append('location_end_date',this.locationDate[1]/1000);
          }else{
            let str = eval('this.artInfo.'+v)
            formData.append(v,str);
          }
          formData.append('scene_id',this.sceneId);
          axios({
            method: 'post',
            url: '/manage/scene/update_scene_info',
            data:formData,
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
          }).then((response)=> {
            if(response.data.ret == '1'){
              this.$message(response.data.msg+','+response.data.cause);
            }
          })
        },
        //拿场景名称
        sceneName() {
          axios.get('/manage/scene/find_scene', {
            params: {
              order_field: this.order_field,
              method : this.method,
              play_id: this.$route.query.play_id
            }
          }).then((response) => {
            if (response.data.ret == '0') {
              this.selectList = response.data.data
              this.$nextTick(() => {
                if(this.addId){
                  let index = this.selectList.findIndex(d => d.scene_id == this.addId);
                  this.handleChange(index);
                }else{
                  this.handleChange(0)
                }
              })
            }
          })
        },
        //添加场景
        addScene(){
          if(this.addSceneInfo.scene_name){
            this.addSceneDialog = false
            axios({
              method: 'post',
              url: '/manage/scene/add_art_scene',
              data:this.addSceneInfo,
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
              },
              transformRequest: [data => Qs.stringify(data)]
            }).then((response)=> {
              if(response.data.ret == '0'){
                this.addId = response.data.data;
                this.sceneName()
              }else{
                this.addSceneDialog = true
                this.$nextTick( ()=> {
                  this.$message(response.data.msg+','+response.data.cause);
                })
              }
            })
          }else{
            this.$message('请填写完整');
          }
        },
        //选中场景样式以及数据获取
        handleChange(val,e) {
          this.sceneId = this.selectList[val].scene_id
          $('#s_Scene_list .artLeftContent').eq(val).addClass("active").siblings().removeClass("active");
          if(val != 0){
            $("#s_Scene_list").animate({scrollTop:$('#s_Scene_list .artLeftContent').eq(val).offset().top - $("#s_Scene_list").offset().top + $("#s_Scene_list").scrollTop()},800);
          }
          this.addId = '';
          axios.get('/manage/scene/find_scene_info', {
            params: {
              scene_id: this.selectList[val].scene_id,
            }
          }).then((response)=> {
            if(response.data.ret=='0'){
              this.getPhoto()
              this.artInfo = response.data.data
              if(response.data.data.location_start_date){
                this.locationDate = [response.data.data.location_start_date*1000,response.data.data.location_end_date*1000]
              }
              if(response.data.data.scene_start_date){
                this.sceneDate = [response.data.data.scene_start_date*1000,response.data.data.scene_end_date*1000]
              }
            }
          })
        },
        //懒加载
        nexts(){
          this.pages_num++;
          this.sceneName();
        },
        //懒加载滚动条
        scroll(){
          // 滚动条距离顶部高度
          let scrollTop = document.getElementById('s_Scene_list').scrollTop;
          // 可见区域高度
          let clientHeight = document.getElementById('s_Scene_list').clientHeight;
          let scrollHeight = document.getElementById('s_Scene_list').scrollHeight;
          if(scrollHeight <= clientHeight + scrollTop ) {
            this.nexts()
          }
        },
        //删除
        dele(i){
          if(this.authId==1){
            this.art.splice(i,1)
          }else{
            this.noAccess = true
          }


        },
        //上传后
        onChange(file) {
          const isJPG = file.raw.type === 'image/jpeg';
          const isPNG = file.raw.type === 'image/png';

          if (!isJPG && !isPNG) {
            this.$message.error('上传凭证图片只能是 JPG/PNG 格式!');
          }
          return isJPG && isPNG;
        },
      },
      mounted(){
        this.sceneName();
        this.$axios({
          method: 'get',
          url: '/auth/user/info?user_id='+JSON.parse(localStorage.user_id),
          headers:{
            'Content-type': 'application/x-www-form-urlencoded'
          }
        }).then((response)=> {
          for (var i = 0; i <response.data.data.auths.length; i++ ){
            if(this.$route.query.project_id in response.data.data.auths[i]){
              for (var key in response.data.data.auths[i]){
                if (key == this.$route.query.project_id) {
                  for (var j in response.data.data.auths[i] ){
                    let index = response.data.data.auths[i][j].findIndex(d => d.id == '8');
                    if(index != '-1'){
                      this.authId=1
                    }else{
                      this.authId = 0;
                    }

                  }
                }
              }
              break
            }else{
              this.authId = 0;
            }
          }
        })
      }
    }
</script>

<style scoped>
  *{
    box-sizing: border-box;
  }

  #art{
    display: flex;
    padding: 10px 20px 0 12px;
  }

  #art .artLeft{
    width: 250px;
    height: calc(100vh - 70px);
    background:rgba(255,255,255,1);
    border:1px solid rgba(231,231,236,1);
    border-radius:4px;
  }

  #art .artLeft .artLeftTop{
    border-bottom: 1px solid rgba(210,210,210,0.6);
  }

  #art .artLeft .artLeftTitleBox{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    height: 54px;
  }

  #art .artLeft .artLeftTitle{
    height: 14px;
    font-size:14px;
    display: flex;
    align-items: center;
    color:rgba(57,63,81,1);
  }

  #art .artLeft .artLeftTitle i{
    font-size: 16px;
    color: #8C8BA6;
    margin-right: 7px;
  }

  #art .artLeftAdd{
    font-size:12px;
    color:rgba(108,111,191,1);
    cursor: pointer;
  }

  /*搜索框*/
  #art .artLeft .artLeftSearchBox{
    margin: 8px 0 16px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 24px;
    padding: 0 20px;
  }

  #art .artLeft .artLeftSearchBox .artLeftSearch{
    width: 160px;
    flex-shrink: 0;
  }

  #art .artLeft .artLeftSearchBox .sortBox{
    width: 40px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
    height: 20px;
    cursor: pointer;
  }

  #art .artLeft .artLeftSearchBox .sortBox .sortDropdownLink{
    font-size:12px;
    color:rgba(98,98,99,1);
    width: 100%;
    display: inline-block;
  }

  #art .artLeft .artLeftSearchBox .sortBox .sortDropdownLink i{
    margin-left: 4px;
    font-size: 12px;
  }

  #art .artLeftContentBox{
    height: calc(100% - 104px);
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
  }

  #art .artLeftContentBox .artLeftContent{
    display: flex;
    width: 100%;
    height: 70px;
    padding: 0 12px 0 20px;
    align-items: center;
    border-left: 4px solid #fff;
    justify-content: space-between;
    background: #fff;
    color: #747885;
    cursor: pointer;
    position: relative;
  }

  #art .artLeftContentBox .artLeftContent:hover,
  #art .artLeftContentBox .artLeftContent.active{
    background: #EBEBF0;
    border-color: #6C6FBF;
  }


  #art .artLeftContentBox .artContentNull{
    padding: 0;
    color: rgba(0,0,0,.6);
    justify-content: center;
  }

  #art .artLeftContentBox .artLeftContent .artContentInfo{
    width: 80%;
  }

  #art .artLeftContentBox .artLeftContent .artContentTitle{
    font-size:12px;
    color:rgba(57,63,81,1);
    width: 100%;
    height: 18px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }

  #art .artLeftContentBox .artLeftContent .artContentDesc{
    font-size:12px;
    color:rgba(57,63,81,0.6);
    margin-top: 8px;
    width: 100%;
    height: 18px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }

  #art .artLeftContentBox .artLeftContent .artContentDesc i{
    color: #EF6F70;
    opacity:0.8;
    font-size: 14px;
    margin-right: 8px;
  }

  #art .artLeftContentBox .artLeftContent .artContentHr{
    position: absolute;
    bottom: 0;
    left: 25px;
    width: 200px;
    height: 1px;
    background: rgba(210,210,210,0.6);
  }

  /*右侧*/
  #art .artRight{
    width: calc(100% - 260px);
    height: calc(100vh - 70px);
    overflow-y: scroll;
    margin-left: 12px;
    background: #fff;
    border-radius: 4px;
    border:1px solid rgba(231,231,236,1);
    padding: 16px 30px 20px 20px;
  }

  #art .artInfoTitle{
    display: flex;
    align-items: center;
    height: 25px;
    width: 100%;
  }

  #art .artInfoTitle .artInfoTitleBorder{
    width:4px;
    height:14px;
    background:rgba(50,197,143,1);
    margin-right: 6px;
  }

  #art .artInfoTitle .artInfoTitleTxt{
    font-size:14px;
    color:rgba(57,63,81,1);
    flex-shrink: 0;
  }

  #art .artInfoTitle .artInfoTitleHr{
    width: calc(100% - 96px);
    height: 1px;
    background: rgba(226,226,233,1);
    margin-left: 30px;
  }

  #art .artInfoTitle .artInfoInput{
    width: 200px;
  }

  #art .addressFormBox{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 10px;
    margin-top: 20px;
    flex-wrap: wrap;
  }

  #art .addressFormBox .addressForm{
    font-size:12px;
    color:rgba(97,101,116,1);
    width: 400px;
    flex-shrink: 0;
    margin:0 0 20px 0;
  }

  #art .addressFormBox .addressForm:nth-child(3n){
    margin-right: 0;
  }

  #art .addressFormBox .addressForm .addressFormSign{
    color: #F05050;
    margin-left: 4px;
    font-size: 12px;
  }

  /*日期选择器*/
  #art .addressForm .addressFormDate{
    width: 400px;
    border-radius: 0;
    border: none;
    border-bottom: 1px solid rgba(210,210,210,0.6);
    height: 36px;
    padding-left: 6px;
  }

  #art .addressForm .addressFormDate.is-active{
    border-color: rgba(255,105,14,0.6);
  }

  /*折叠面板*/
  #art .artCollapse{
    border: none;
    margin-top: 60px;
  }

  /*气氛图*/
  /*删除阴影框*/
  #art .photoDeleShadow{
    position: absolute;
    width: 100%;
    height: 100%;
    background:rgba(0,0,0,.7);
    top: 0;
    left: 0;
    z-index: 5;
  }

  #art .photoDeleShadow .photoDeleText{
    font-size:12px;
    color:rgba(255,255,255,1);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 72px;
  }

  #art .photoDeleShadow .photoDeleText i{
    margin-right: 8px;
  }

  #art .photoDeleShadow .photoDeleFooter{
    width: 100%;
    height: 24px;
    display: flex;
    align-items: center;
    position: absolute;
    bottom: 0;
  }

  #art .photoDeleShadow .photoDeleFooter .photoDeleBtn{
    width:50%;
    height:100%;
    background:rgba(237,149,21,1);
    color: #fff;
    opacity: 0.9;
    text-align: center;
    line-height: 24px;
    font-size: 12px;
    cursor: pointer;
  }

  #art .photoDeleShadow .photoDeleFooter .photoDeleBtn:first-of-type{
    opacity: 0.6;
  }

  #art .photoTitle{
    display: flex;
    align-items: center;
    height: 25px;
  }

  #art .photoTitle .photoTitleBorder{
    width:4px;
    height:14px;
    background:rgba(50,197,143,1);
    margin-right: 6px;
  }

  #art .photoTitle .photoTitleTxt{
    font-size:14px;
    color:rgba(57,63,81,1);
    flex-shrink: 0;
  }

  #art .photoInfoBox{
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-top: 20px;
    padding-left: 10px;
  }

  #art .photoInfo{
    margin: 0 16px 20px 0;
    display: flex;
    align-items: center;
    width:290px;
    height:190px;
    border-radius:2px;
    overflow: hidden;
    background: rgba(242,242,244,0.3);
    position: relative;
    flex-shrink: 0;
  }

  #art .photoInfo>img{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  #art .photoInfo .photoInfoDesc{
    width: 100%;
    height: 32px;
    background:rgba(51,51,51,0.7);
    font-size:14px;
    text-align: center;
    line-height: 32px;
    color:rgba(255,255,255,1);
    position: absolute;
    bottom: 0;
    z-index: 2;
    opacity: 1;
    transition: opacity 1.4s;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    padding: 0 6px;
  }

  #art .photoInfo .photoInfoBtnBox{
    display: flex;
    align-items: center;
    height: 42px;
    position: absolute;
    bottom: 0;
    width: 100%;
    z-index: 3;
    opacity: 0;
    transition: opacity 1s;
  }

  #art .photoInfo:hover .photoInfoDesc{
    opacity: 0;
  }

  #art .photoInfo:hover .photoInfoBtnBox{
    opacity: 1;
  }

  #art .photoInfo .photoInfoBtnBox .photoInfoBtn{
    width: 50%;
    flex-shrink: 0;
    height: 100%;
    background:rgba(50,197,143,1);
    text-align: center;
    opacity:0.96;
    color: #fff;
    cursor: pointer;
  }

  #art .photoInfo .photoInfoBtnBox .photoInfoBtn:first-of-type{
    background: rgba(240,80,80,1);
  }

  #art .photoInfo .photoInfoBtnBox .photoInfoBtn i{
    line-height: 42px;
    font-size: 18px;
  }

  #art .photoAdd{
    border:1px solid rgba(136,135,162,0.3);
    justify-content: center;
    flex-direction: column;
    color:rgba(57,63,81,0.8);
    font-size: 12px;
    cursor: pointer;
  }

  #art .photoAdd i{
    color:rgba(57,63,81,0.8);
    font-size: 28px;
    cursor: pointer;
    display: inline-block;
    margin-bottom: 6px;
  }

  #art .detailImgBox{
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0,0,0,.7);
    width: 100vw;
    height: 100vh;
    z-index: 2000;
    display: flex;
    align-items: center;
  }

  #art .detailImgBox>img{
    margin: 0 auto;
    object-fit: contain;
    width: 100%;
    height: 100%;
  }

  #art .detailImgBox .detailImgClose{
    position: absolute;
    top: 40px;
    right: 100px;
    width: 40px;
    height: 40px;
    border: 1px solid #fff;
    color: #fff;
    border-radius: 50%;
    text-align: center;
    line-height: 35px;
    font-size: 30px;
    cursor: pointer;
  }


  /*弹框表单*/
  #art .addDialog .addressFormBox{
    padding: 0 40px;
  }

  #art .addDialog .addDialogFooter{
    width: 100%;
    height: 75px;
    border-top: 1px solid rgba(180,180,180,0.2);
    margin-top: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  #art .addDialog .addDialogFooter .addFooterBtn{
    width:100px;
    height:32px;
    background:rgba(237,149,21,1);
    border-radius:16px;
    font-size:14px;
    color:rgba(255,255,255,1);
    text-align: center;
    line-height: 32px;
    cursor: pointer;
  }

  #art .addDialog .addDialogFooter .addFooterBtn:last-of-type{
    border:1px solid rgba(186,186,186,1);
    background: #fff;
    margin-left: 36px;
    color: rgba(0,0,0,.8);
  }

  /*弹框上传*/
  #art .photoAddBox{
    width:290px;
    height:190px;
    background:rgba(250,250,251,0.3);
    border:1px solid rgba(136,135,162,0.3);
    border-radius:2px;
    margin: 20px auto 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  #art .photoAddBox .uploadBox{
    font-size: 12px;
    color:rgba(97,101,116,1);
  }

  #art .photoAddBox .uploadBox span{
    font-size: 12px;
    color: #6C6FBF;
  }

  #art .photoAddBox .uploadBox i{
    font-size: 28px;
  }

  #art .photoAddBox img.avatar{
    max-width:290px;
    overflow: hidden;
    height:190px;
    border:1px solid rgba(136,135,162,0.3);
    border-radius:2px;
  }

  #art .addPhotoDialog .addressFormBox{
    width: 290px;
    margin: 30px auto;
    padding: 0;
  }

  #art .addPhotoDialog .addressFormBox .addressForm{
    font-size:12px;
    color:rgba(97,101,116,1);
    width: 290px;
  }
</style>
<style>
  /*左侧搜索框*/
  #art .artLeft .artLeftSearchBox .artLeftSearch .el-input__inner{
    height: 24px;
    padding: 0 12px;
    border-radius:12px 0 0 12px;
    width: 127px;
    font-size:12px;
    border-right: none;
  }

  #art .artLeft .artLeftSearchBox .artLeftSearch .el-input-group__append{
    border-radius:0 12px 12px 0;
    width: 33px;
    padding: 0;
    height: 24px;
    background:rgba(237,149,21,1);
    border: none;
  }

  #art .artLeft .artLeftSearchBox .artLeftSearch .el-button{
    width: 33px;
    padding: 0;
    height: 22px;
    margin: 0;
  }

  #art .artLeft .artLeftSearchBox .artLeftSearch .el-button i{
    font-size: 14px;
    color: #fff;
  }

  /*左侧排序下拉菜单*/
  .sortDropBox{
    width: 80px;
    padding: 12px 10px;
    height: 134px!important;
  }

  .sortDropBox .dropItem{
    padding: 0;
    font-size:12px;
    color:rgba(147,147,148,1);
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .sortDropBox .dropItem:hover,
  .sortDropBox .dropItem.active{
    background: none;
    color:rgba(98,98,99,1);
  }

  .sortDropBox .dropItem.el-dropdown-menu__item--divided{
    padding-top: 6px;
    height: 30px;
  }

  .sortDropBox .dropItem.el-dropdown-menu__item--divided:before{
    display: none;
  }

  .sortDropBox .dropItem>i{
    font-size: 12px;
    opacity: 0;
  }

  .sortDropBox .dropItem.active>i{
    opacity: 1;
  }

    /*左侧菜单栏*/
  .artLeftBtnBox{
    padding: 0 14px;
    min-width: 116px;
  }

  .artLeftBtnBox .artLeftBtn{
    width: 100%;
    height: 68px;
    display: flex;
    align-items: center;
    font-size:12px;
    color:rgba(57,63,81,1);
    justify-content: space-between;
    padding: 0 12px 0 8px;
    cursor: pointer;
  }

  .artLeftBtnBox .artLeftBtn i{
    color: #EB5252;
  }

  /*title输入框*/
  #art .artInfoTitle .artInfoInput .el-input__inner{
    height: 25px;
    padding-left: 5px;
    font-size:14px;
    color:rgba(57,63,81,1);
    border-radius: 0;
    border: none;
    border-bottom: 1px solid rgba(210,210,210,0.6);
  }

  #art .artInfoTitle .artInfoInput .el-input__inner:focus{
    border-color: rgba(255,105,14,0.6);
  }

  #art .artInfoTitle .artInfoInput .el-input__suffix i{
    line-height: 26px;
  }

  /*信息输入框*/
  #art .addressForm .addressFormInput .el-input__inner{
    height: 36px;
    border-radius: 0;
    border: none;
    border-bottom: 1px solid rgba(210,210,210,0.6);
    font-size:12px;
    color:rgba(57,63,81,1);
  }

  #art .addressForm .addressFormInput:not(.addressFormMap) .el-input__inner{
    padding-left: 0;
  }

  #art .addressForm .addressFormInput .el-input__inner:focus{
    border-color: rgba(255,105,14,0.6);
  }

  #art .addressForm .addressFormInput .el-input__prefix i{
    line-height: 36px;
    transition: color 1s;
  }

  #art .addressForm .addressFormInput .el-input__suffix i{
    line-height: 40px;
  }

  #art .addressForm .addressFormInput .el-input__prefix i.active{
    color: #EE7373;
  }

  /*日期选择器*/
  #art .addressForm .addressFormDate .el-input__icon{
    transition: color 1s;
    line-height: 36px;
  }

  #art .addressForm .addressFormDate.active .el-range__icon{
    color: #EE7373;
  }

  #art .addressForm .addressFormDate .el-range-input,
  #art .addressForm .addressFormDate .el-range-separator{
    font-size: 12px;
    color:rgba(57,63,81,1);
    line-height: 36px;
  }

  #art .addressForm .addressFormDate .el-range-input{
    padding-top: 5.5px;
  }
  
  /*折叠面板*/
  #art .artCollapse .el-collapse-item__header{
    border: none;
    position: relative;
  }

  #art .artCollapse .el-collapse-item__arrow{
    position: absolute;
    left: 64px;
    color: rgba(57,63,81,1);
  }

  #art .artCollapse .el-collapse-item__wrap{
    border-bottom: none;
  }
  
  /*图片上传*/
  #art .photoAdd .el-upload-list{
    display: none;
  }

  /*弹框表单*/
  #art .addDialog .el-dialog .el-dialog__header{
    height: 54px;
    padding: 0;
  }

  #art .addDialog .el-dialog .el-dialog__header .el-dialog__title{
    font-size: 14px;
    line-height: 54px;
    height: 54px;
  }

  #art .addDialog .el-dialog .el-dialog__header .el-dialog__headerbtn{
    top: 15px;
    right: 36px;
  }

  #art .addDialog .el-dialog .el-dialog__header .el-dialog__headerbtn>i{
    font-size: 16px;
    line-height: 16px;
    font-weight: bold;
  }

  #art .addDialog .el-dialog__body{
    padding: 0;
    overflow: hidden;
  }

  /*上传弹框*/
  #art .photoAddBox .el-upload{
    font-size: 12px;
    color:rgba(97,101,116,1);
  }

  #art .photoAddBox .el-upload span{
    font-size: 12px;
    color: #6C6FBF;
  }
</style>
