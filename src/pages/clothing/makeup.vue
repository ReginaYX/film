<template>
  <div id="makeInfo">
    <div class="addressBox">
      <div class="dressInfoTitle">
        <div class="dressInfoTitleBorder"></div>
        <span class="dressInfoTitleTxt">化妆信息</span>
      </div>
      <div class="dressInfoContent">
        <img class="dressInfoLeft" :src="host+'/files/'+mainPhoto.path" alt="" v-if="mainPhoto">
        <el-upload
          class="dressInfoLeft dressInfoLeftAddBox"
          :action="addUploadUrl"
          :show-file-list="false" :http-request="upLoad" v-else>
          <i class="iconfont iconyoupinwangtubiao-"></i>
           点击上传定妆照
        </el-upload>
        <div class="addressFormBox">
          <div class="addressForm">
            妆容名称<span class="addressFormSign">*</span>
            <el-input @blur="submitInfo('makeup_name')"
              placeholder="请输入妆容名称" maxlength="8"
              v-model="makeupInfo.makeup_name" :disabled="authId!=1"
              clearable class="addressFormInput">
            </el-input>
          </div>
          <div class="addressForm">
            负责人
            <el-input @blur="submitInfo('head')"
              placeholder="请输入负责人名称"
              v-model="makeupInfo.head" :disabled="authId!=1"
              clearable class="addressFormInput">
            </el-input>
          </div>
          <div class="addressForm">
            剧中角色
            <el-input @blur="submitInfo('role_name')"
              placeholder="请输入剧中角色名"
              v-model="makeupInfo.role_name" :disabled="authId!=1"
              clearable class="addressFormInput">
            </el-input>
          </div>
          <div class="addressForm">
            负责人联系电话
            <el-input @blur="submitInfo('head_contact')"
              placeholder="请输入负责人联系电话" :disabled="authId!=1"
              v-model="makeupInfo.head_contact" @input="numCheck($event,'head_contact')"
              clearable class="addressFormInput">
            </el-input>
          </div>
          <div class="addressForm">
            妆容备注
            <el-input @blur="submitInfo('remark')"
              placeholder="请输入备注信息" :disabled="authId!=1"
              v-model="makeupInfo.remark" maxlength="30"
              clearable class="addressFormInput">
            </el-input>
          </div>
        </div>
      </div>
    </div>
    <el-collapse class="dressCollapse" v-model="activeCollapse">
      <el-collapse-item  name="1">
        <template slot="title">
          <div class="dressInfoTitle">
            <div class="dressInfoTitleBorder"></div>
            <span class="dressInfoTitleTxt">相关场景&#12288;</span>
            <div class="dressInfoTitleHr"></div>
          </div>
        </template>
        <div class="sceneBox">
          <p class="sceneDesc">共{{makeup_scene.total_session}}场&#12288;合计{{makeup_scene.total_page}}页</p>
          <div class="sceneInfoBox">
            <div class="sceneInfo" v-for="item in sceneSelectValue">
              <div class="sceneInfoTitle">{{item.scene_name}}</div>
              <div class="sceneInfoDesc">共{{item.sessions}}场戏，合计{{item.pages}}页</div>
              <div class="sceneDeleBox">
                <div class="sceneDele" @click="deleScene(item.scene_id)"><i class="iconfont iconshanchu"></i></div>
              </div>
            </div>
            <div class="sceneInfo sceneAdd" @click="()=>{if(authId==1){addSceneDialog = true}else{noAccess = true}}">
              <i class="iconfont iconchangjing1"></i><br />
              ＋添加相关场景
            </div>
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item  name="2">
        <template slot="title">
          <div class="dressInfoTitle">
            <div class="dressInfoTitleBorder"></div>
            <span class="dressInfoTitleTxt">定妆照片&#12288;</span>
            <div class="dressInfoTitleHr"></div>
          </div>
        </template>
        <div class="dressBox">
          <div class="dressInfoBox">
            <div class="dressInfo" v-for="item,index in makeupPhoto" :key="index">
              <img  v-if='item.path' :src="host+'/files/'+item.path" alt="" class="dressPhoto">
              <div v-else class="dressPhoto"><i class="iconfont iconyoupinwangtubiao-"></i></div>
              <div class="dressInfoContent">{{item.photo_name}}</div>
              <div class="dressDeleBox">
                <div class="dressDele" @click="()=>{if(authId==1){item.deleMemberShadow = true}else{noAccess = true}}"><i class="iconfont iconshanchu"></i></div>
                <div class="dressDele"  v-if='item.path' @click="detailImg = host+'/files/'+item.path"><i class="iconfont iconchakan"></i></div>
              </div>
              <transition name="el-zoom-in-top">
                <div class="dressDeleShadow" v-show="item.deleMemberShadow">
                  <div class="dressDeleText">
                    <i class="iconfont icontips-copy"></i>确认删除该妆容
                  </div>
                  <div class="dressDeleFooter">
                    <div class="dressDeleBtn" @click="item.deleMemberShadow = false">取消</div>
                    <div class="dressDeleBtn" @click="delePhoto(item.photo_id)">确认</div>
                  </div>
                </div>
              </transition>
            </div>
            <div class="dressInfo dressAdd" @click="()=>{if(authId==1){addMakeDialog = true}else{noAccess = true}}">
              <i class="iconfont iconyoupinwangtubiao-"></i><br />
              ＋添加相关妆容
            </div>
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item  name="3">
        <template slot="title">
          <div class="dressInfoTitle">
            <div class="dressInfoTitleBorder"></div>
            <span class="dressInfoTitleTxt">相关场次&#12288;</span>
            <div class="dressInfoTitleHr"></div>
          </div>
        </template>
        <div class="sessionBox">
          <div class="sessionInfoBox">
            <div class="sessionInfo" v-if='makeup_scene.field_number_list==undefined||makeup_scene.field_number_list.length==0'>
              暂无场次
            </div>
            <div class="sessionInfo" v-else v-for="item in makeup_scene.field_number_list">
              第{{item}}场
            </div>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
    <transition name="el-zoom-in-center">
      <div class="detailImgBox" v-show="detailImg">
        <img :src="detailImg" alt="">
        <div class="detailImgClose" @click="detailImg = ''">×</div>
      </div>
    </transition>
    <el-dialog
      title="添加演员妆容"
      :visible.sync="addMakeDialog"
      width="480px" center class="addDialog">
      <el-upload
        class="photoAddBox" :on-change="onChange" :show-file-list="false"
        action="/finance/flow/certificate/add"  accept=".jpg,.png" :http-request="upLoad">
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
            placeholder="请输入照片名称"
            v-model="addPhotoInfo.photo_name"
            clearable class="addressFormInput">
          </el-input>
        </div>
      </div>
      <div class="addDialogFooter">
        <div class="addFooterBtn" @click="addPhoto">创建</div>
        <div class="addFooterBtn" @click="addMakeDialog = false">取消</div>
      </div>
    </el-dialog>
    <el-dialog
      title="添加相关场景"
      :visible.sync="addSceneDialog"
      width="480px" center class="addDialog addSceneDialog">
      <div class="addSceneDialog">
        <div class="sceneBox">
          <div class="sceneTitle">场景选择<span>*</span></div>
          <el-checkbox-group v-model="sceneSelect" class="sceneSelectBox" @change="">
            <el-checkbox v-for="item in sceneList" :label="item.scene_id" class="sceneSelect">{{item.scene_name}}</el-checkbox>
          </el-checkbox-group>
        </div>
        <div class="sceneRightBox">
          <div class="sceneSelectTotal">已选{{sceneSelect.length}}个场景</div>
          <div class="sceneCheckBox">
            <div class="sceneSelectInfo" v-for="item,index in sceneSelect" :key="index">
              <div class="sceneName">{{item | findName}}</div>
              <i class="iconfont iconguanbi" @click="removeScene(index)"></i>
            </div>
          </div>
        </div>
      </div>
      <div class="addDialogFooter">
        <div class="addFooterBtn" @click="saveSceneInfo">确定</div>
        <div class="addFooterBtn" @click="addSceneDialog = false">取消</div>
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
  var that;
    export default {
      name: "makeup",
      data(){
        return{
          dressInfoTitleTxt:'迎泽公园',
          dressInfoTitleInput:false,
          dateValue:'',
          powerRadio:'1',
          activeCollapse:['1','2','3'],
          useType:'1',
          dressInfoInfoTitleTxt:'迎泽公园',
          detailImg:'',
          addUploadUrl:'/finance/flow/certificate/add',//上传图片
          addMakeDialog:false,//添加服装弹框
          addSceneDialog:false,//添加场景弹框
          sceneList:[],//场景列表
          sceneSelect:[],//场景选择
          makeupInfo:{},//服装信息
          makeup_scene:'',//相关场景
          sceneSelectValue:'',//相关场次
          makeupPhoto:'',//服装照片
          mainPhoto:'',//主图
          imageUrl:'',//图片路径
          addPhotoInfo:{
            photo_name:'',
            path_list:'',
            makeup_id:this.$route.query.id
          },
          host:global_.pathInfo,
          authId:0,//权限信息
          noAccess:false,//无权限弹框
        }
      },
      methods: {
        //数字验证
        numCheck(v,form){
          if(form == 'head_contact'){
            this.makeupInfo.head_contact = v.match(/\d/ig) ? v.match(/\d/ig).join('') : ''
          }
        },
        //化妆信息获取
        getInfo(){
          axios.get('/manage/actor/find_makeup_info', {
            params: {
              makeup_id : this.$route.query.id,
            }
          }).then((response)=> {
            if(response.data.ret=='0'){
              if(response.data.data.makeup_scene.scene_list.length!=0){
                let arr = [];
                for(let i=0;i<response.data.data.makeup_scene.scene_list.length;i++){
                  arr.push(response.data.data.makeup_scene.scene_list[i].scene_id)
                }
                this.sceneSelect = arr;
              }
              this.sceneSelectValue = response.data.data.makeup_scene.scene_list;
              if(response.data.data.makeup_photo){
                for(let i=0; i<response.data.data.makeup_photo.length; i++){
                  response.data.data.makeup_photo[i].deleMemberShadow = false
                }
              }
              this.makeupInfo = response.data.data.makeup_info
              if(response.data.data.makeup_info.start_date){
                this.dateValue = [response.data.data.makeup_info.start_date*1000,response.data.data.makeup_info.end_date*1000]
              }
              if(response.data.data.makeup_info.use_method == 0){
                this.makeupInfo.use_method = '0'
              }else{
                this.makeupInfo.use_method = '1'
              }
              this.makeup_scene = response.data.data.makeup_scene
              this.makeupPhoto = response.data.data.makeup_photo
              this.mainPhoto = response.data.data.makeup_photo[0]
            }
          })
        },
        //化妆信息保存
        submitInfo(v){
          if(v == 'makeup_name' && this.makeupInfo.makeup_name == ''){
            return
          }
          let formData = new FormData()
          let str = eval('this.makeupInfo.'+v)
          formData.append(v,str);
          formData.append('makeup_id',this.$route.query.id);
          axios({
            method: 'post',
            url: '/manage/actor/update_makeup_info',
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
          axios.get('/manage/actor/get_scene', {
            params: {
              actor_id: this.$route.query.actor
            }
          }).then((response) => {
            if (response.data.ret == '0') {
              this.sceneList = response.data.data
            }
          })
        },
        //获取相关场景
        getSceneInfo(){
          axios.get('/manage/actor/find_makeup_scene', {
            params: {
              makeup_id : this.$route.query.id,
            }
          }).then((response)=> {
            if(response.data.ret=='0'){
              if(response.data.data.scene_list.length!=0){
                let arr = [];
                for(let i=0;i<response.data.data.scene_list.length;i++){
                  arr.push(response.data.data.scene_list[i].scene_id)
                }
                this.sceneSelect = arr;
              }
              this.sceneSelectValue = response.data.data.scene_list;
              this.makeup_scene = response.data.data
            }
          })
        },
        //保存相关场景
        saveSceneInfo(){
          this.addSceneDialog = false;
          let form = new FormData();
          form.append('scene_list',this.sceneSelect.join(','));
          form.append('makeup_id',this.$route.query.id);
          axios({
            method: 'post',
            url: '/manage/actor/add_makeup_scene',
            data:form,
            headers: {
              'Content-Type': 'application/json'
            },
          }).then((response)=> {
            if(response.data.ret == '0'){
              this.getSceneInfo()
            }else{
              this.addSceneDialog = true
              this.$nextTick( ()=> {
                this.$message(response.data.msg+','+response.data.cause);
              })
            }
          })
        },
        //删除场景
        deleScene(v){
          if(this.authId==1){
            this.$confirm('此操作将删除该相关场景, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
            }).then(() => {
              axios.get('/manage/actor/delete_makeup_scene', {
                params: {
                  scene_id: v,
                  makeup_id:this.$route.query.id
                }
              }).then((response) => {
                if (response.data.ret == '1') {
                  this.$message(response.data.msg+','+response.data.cause);
                }else{
                  this.getSceneInfo()
                }
              })
            })
          }else{
            this.noAccess = true
          }

        },
        //添加相关场景的移除
        removeScene(i){
          if(this.authId==1){
            this.sceneSelect.splice(i,1)
          }else{
            this.noAccess = true
          }
        },
        submitdressInfoTitle(){
          if(this.authId==1){
            this.dressInfoTitleInput = false
          }else{
            this.noAccess = true
          }
        },
        //上传图片控制
        onChange(file, fileList) {
          const isJPG = file.raw.type === 'image/jpeg';
          const isPNG = file.raw.type === 'image/png';

          if (!isJPG && !isPNG) {
            this.$message.error('上传凭证图片只能是 JPG/PNG 格式!');
          }
          return isJPG && isPNG;
        },
        //图片上传
        upLoad(file){
          if(this.authId==1){
            global_.upLoad(file).then((response)=>{
              this.imageUrl = global_.pathInfo+'/files/'+response.data[0]
              this.addPhotoInfo.path_list = response.data[0]
            })
          }else{
            this.noAccess = true
          }
        },
        //服装照片获取
        getPhoto(){
          axios.get('/manage/actor/find_makeup_photo', {
            params: {
              makeup_id : this.$route.query.id,
            }
          }).then((response)=> {
            if (response.data.ret == '0') {
              if (response.data.data.length != 0) {
                for (let i = 0; i < response.data.data.length; i++) {
                  response.data.data[i].deleMemberShadow = false
                }
              }
              this.makeupPhoto = response.data.data
            } else {
              this.$message(response.data.msg + ',' + response.data.cause);
            }
          })
        },
        //添加服装照片
        addPhoto(){
          if(this.addPhotoInfo.photo_name && this.addPhotoInfo.path_list){
            this.addMakeDialog = false
            axios({
              method: 'post',
              url: '/manage/actor/add_makeup_photo',
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
                this.addMakeDialog = true
                this.$nextTick( ()=> {
                  this.$message(response.data.msg+','+response.data.cause);
                })
              }
            })
          }else{
            this.$message('请填写完整');
          }
        },
        //删除服装照片
        delePhoto(v){
          axios.get('/manage/actor/delete_makeup_photo', {
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
      },
      mounted(){
        this.sceneName();
        this.getInfo();
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
                    let index = response.data.data.auths[i][j].findIndex(d => d.id == '5');
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
      },
      watch:{
        $route(to,from){
          if(to.path == '/details/clothing/makeup'){
            this.getInfo();
          }
        }
      },
      beforeCreate() {
        that = this;
      },
      filters: {
        findName: function (value){
          if(that.sceneList.length!=0){
            let index = that.sceneList.findIndex(d => d.scene_id == value);
            return that.sceneList[index].scene_name;
          }
        }
      },
    }
</script>

<style scoped>
  *{
    box-sizing: border-box;
  }

  #makeInfo .dressInfoTitle{
    display: flex;
    align-items: center;
    height: 25px;
    width: 100%;
  }

  #makeInfo .dressInfoTitle .dressInfoTitleBorder{
    width:4px;
    height:14px;
    background:rgba(50,197,143,1);
    margin-right: 6px;
  }

  #makeInfo .dressInfoTitle .dressInfoTitleTxt{
    font-size:14px;
    color:rgba(57,63,81,1);
    flex-shrink: 0;
  }

  #makeInfo .dressInfoTitle .dressInfoTitleHr{
    width: calc(100% - 108px);
    height: 1px;
    background: rgba(226,226,233,1);
    margin-left: 18px;
  }

  #makeInfo .dressInfoContent{
    display: flex;
    padding-left: 10px;
    margin-top: 20px;
  }

  #makeInfo .dressInfoContent .dressInfoLeft{
    width:200px;
    height:250px;
    border-radius:2px;
    flex-shrink: 0;
    margin-right: 40px;
  }

  #makeInfo .dressInfoContent .dressInfoLeft:not(.el-carousel){
    background:rgba(57,63,81,0.3);
    text-align: center;
    object-fit: cover;
  }

  #makeInfo .dressInfoContent div.dressInfoLeft i{
    font-size: 58px;
    color: #fff;
    line-height: 58px;
    display: inline-block;
    margin-bottom: 10px;
    margin-left: -2px;
  }

  /*演员照片走马灯*/
  #makeInfo .dressInfoContent .dressInfoLeft .actorPhoto{
    width: 100%;
    height: 100%;
  }

  #makeInfo .dressInfoContent .dressInfoLeft .actorPhotoTop{
    position: absolute;
    top: 8px;
    left: 0;
    width: 100%;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
  }

  #makeInfo .dressInfoContent .dressInfoLeft .actorPhotoTop>.actorPhotoBtn{
    width:70px;
    height:30px;
    background:rgba(50,197,143,1);
    border-radius:2px;
    font-size:12px;
    color: #fff;
    text-align: center;
    line-height: 30px;
  }

  #makeInfo .dressInfoContent .dressInfoLeft .actorPhotoTop .actorPhotoBtnBox{
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 64px;
    height: 30px;
  }

  #makeInfo .dressInfoContent .dressInfoLeft .actorPhotoTop .actorPhotoBtnBox .actorPhotoBtn{
    width:30px;
    height:30px;
    background:rgba(50,197,143,1);
    border-radius:2px;
    text-align: center;
  }

  #makeInfo .dressInfoContent .dressInfoLeft .actorPhotoTop .actorPhotoBtnBox .actorPhotoBtn:last-of-type{
    background: rgba(234,80,80,1);
  }

  #makeInfo .dressInfoContent .dressInfoLeft .actorPhotoTop .actorPhotoBtnBox .actorPhotoBtn i{
    font-size: 20px;
    color: #fff;
    line-height: 30px;
  }

  #makeInfo .dressInfoContent .dressInfoLeft .actorPhotoDescBox{
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 32px;
    background:rgba(57,63,81,0.6);
    border-radius:0px 0px 2px 2px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 14px;
  }

  #makeInfo .dressInfoContent .dressInfoLeft .actorPhotoDescBox .actorPhotoDesc{
    font-size: 12px;
    color: #fff;
  }

  #makeInfo .dressInfoContent .dressInfoLeft .actorPhotoDescBox .actorPhotoDesc span{
    font-size: 12px;
    color:rgba(240,80,80,1);
  }

  #makeInfo .addressFormBox{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 10px;
    flex-wrap: wrap;
    width: calc(100% - 460px);
  }

  #makeInfo .addressFormBox .addressForm{
    font-size:12px;
    color:rgba(97,101,116,1);
    width: 400px;
    flex-shrink: 0;
    margin:0 0 20px 0;
  }

  #makeInfo .addressFormBox .addressForm:nth-child(3n){
    margin-right: 0;
  }

  #makeInfo .addressFormBox .addressForm .addressFormSign{
    color: #F05050;
    margin-left: 4px;
  }

  /*地址搜索框*/
  #makeInfo .addressForm .addressFormMap{
    display: block;
    width: 400px;
  }

  /*日期选择器*/
  #makeInfo .addressForm .addressFormDate{
    width: 400px;
    border-radius: 0;
    border: none;
    border-bottom: 1px solid rgba(210,210,210,0.6);
    height: 36px;
    padding-left: 6px;
  }

  #makeInfo .addressForm .addressFormDate.is-active{
    border-color: rgba(255,105,14,0.6);
  }

  /*单选框组*/
  #makeInfo .addressForm .addressFormRadio{
    margin-top: 12px;
    display: block;
  }

  /*折叠面板*/
  #makeInfo .dressCollapse{
    border: none;
    margin-top: 60px;
  }

  /*服装信息*/
  #makeInfo .dressBox{
    margin-top: 10px;
  }

  #makeInfo .dressBox .dressInfoBox{
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-left: 10px;
  }

  #makeInfo .dressBox .dressInfoBox .dressInfo{
    width:150px;
    height:200px;
    border-radius:2px;
    overflow: hidden;
    position: relative;
    margin: 0 14px 20px 0;
    background: #f7f7f9;
  }

  #makeInfo .dressBox .dressInfoBox .dressPhoto{
    width: 100%;
    height: 100%;
    border-radius:2px;
    text-align: center;
    object-fit: cover;
  }

  #makeInfo .dressBox .dressInfoBox .dressPhoto i{
    font-size: 60px;
    line-height: 145px;
    color: #fff;
  }

  #makeInfo .dressBox .dressInfoBox .dressInfoContent{
    position: absolute;
    width:100%;
    height:34px;
    background:rgba(57,63,81,1);
    bottom: 0;
    left: 0;
    padding: 10px;
    font-size: 14px;
    color: #Fff;
    line-height: 14px;
  }

  #makeInfo .dressBox .dressInfoBox .dressInfo .dressDeleBox{
    position: absolute;
    top: 10px;
    right: 8px;
    width: 60px;
    height: 24px;
    opacity: 0;
    transition: opacity .6s;
    z-index: 20;
    display: flex;
    justify-content: flex-end;
  }

  #makeInfo .dressBox .dressInfoBox .dressInfo:hover .dressDeleBox{
    opacity: 1;
  }

  #makeInfo .dressBox .dressInfoBox .dressInfo .dressDeleBox .dressDele{
    display: inline-block;
    width:24px;
    height:24px;
    background:rgba(234,80,80,1);
    border-radius:2px;
    text-align: center;
    cursor: pointer;
    opacity: 0;
    transition: opacity 1.2s;
  }

  #makeInfo .dressBox .dressInfoBox .dressInfo .dressDeleBox .dressDele:last-of-type{
    margin-left: 6px;
    background: rgba(50,197,143,1);
  }

  #makeInfo .dressBox .dressInfoBox .dressInfo:hover .dressDeleBox .dressDele{
    opacity: 1;
  }

  #makeInfo .dressBox .dressInfoBox .dressInfo .dressDeleBox i{
    font-size: 18px;
    color: #fff;
    line-height: 24px;
  }

  /*删除阴影*/
  #makeInfo .dressDeleShadow{
    position: absolute;
    width: 100%;
    height: 100%;
    background:rgba(0,0,0,.7);
    top: 0;
    left: 0;
  }

  #makeInfo .dressDeleShadow .dressDeleText{
    font-size:12px;
    color:rgba(255,255,255,1);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 82px;
  }

  #makeInfo .dressDeleShadow .dressDeleText i{
    margin-right: 8px;
  }

  #makeInfo .dressDeleShadow .dressDeleFooter{
    width: 100%;
    height: 24px;
    display: flex;
    align-items: center;
    position: absolute;
    bottom: 0;
  }

  #makeInfo .dressDeleShadow .dressDeleFooter .dressDeleBtn{
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

  #makeInfo .dressDeleShadow .dressDeleFooter .dressDeleBtn:first-of-type{
    opacity: 0.6;
  }

  /*服化添加框*/
  #makeInfo .dressBox .dressInfoBox .dressAdd{
    background:rgba(250,250,251,0.3);
    border:1px solid rgba(136,135,162,0.3);
    text-align: center;
    font-size:12px;
    color:rgba(57,63,81,0.8);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  #makeInfo .dressBox .dressInfoBox .dressAdd i{
    color: #393F51;
    opacity: 0.8;
    display: inline-block;
    line-height: 32px;
    font-size: 32px;
  }

  /*查看图片*/
  #makeInfo .detailImgBox{
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

  #makeInfo .detailImgBox>img{
    margin: 0 auto;
    object-fit: contain;
    width: 100%;
    height: 100%;
  }

  #makeInfo .detailImgBox .detailImgClose{
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

  /*场景信息*/
  #makeInfo .sceneBox .sceneDesc{
    font-size:12px;
    color:rgba(57,63,81,0.8);
    line-height: 12px;
    margin: 6px 0 30px 10px;
  }

  #makeInfo .sceneBox .sceneInfoBox{
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-left: 10px;
  }

  #makeInfo .sceneBox .sceneInfoBox .sceneInfo{
    width:170px;
    height:70px;
    border-radius:2px;
    overflow: hidden;
    position: relative;
    margin: 0 14px 20px 0;
  }

  #makeInfo .sceneBox .sceneInfoBox .sceneInfo .sceneInfoTitle{
    width: 100%;
    height:32px;
    background:rgba(237,149,21,1);
    font-size:12px;
    line-height: 32px;
    padding: 0 10px 0 15px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    color:rgba(255,255,255,1);
  }

  #makeInfo .sceneBox .sceneInfoBox .sceneInfo .sceneInfoDesc{
    width: 100%;
    height: 38px;
    border: 1px solid rgba(209,208,219,1);
    background: rgba(250,250,251,1);
    border-top: none;
    padding: 10px 10px 0 15px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    color:rgba(57,63,81,1);
    font-size:12px;
    border-radius: 2px;
  }

  #makeInfo .sceneBox .sceneInfoBox .sceneInfo .sceneDeleBox{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(51,51,51,0.8);
    opacity: 0;
    transition: opacity .6s;
  }

  #makeInfo .sceneBox .sceneInfoBox .sceneInfo:hover .sceneDeleBox{
    opacity: 1;
  }

  #makeInfo .sceneBox .sceneInfoBox .sceneInfo .sceneDeleBox .sceneDele{
    width:30px;
    height:30px;
    background:rgba(234,80,80,1);
    border-radius:2px;
    margin: 20px auto 0;
    text-align: center;
    cursor: pointer;
    opacity: 0;
    transition: opacity 1.2s;
  }

  #makeInfo .sceneBox .sceneInfoBox .sceneInfo:hover .sceneDeleBox .sceneDele{
    opacity: 1;
  }

  #makeInfo .sceneBox .sceneInfoBox .sceneInfo .sceneDeleBox i{
    font-size: 18px;
    color: #fff;
    line-height: 30px;
  }

  /*场景信息添加框*/
  #makeInfo .sceneBox .sceneInfoBox .sceneAdd{
    background:rgba(250,250,251,0.3);
    border:1px solid rgba(136,135,162,0.3);
    text-align: center;
    font-size:12px;
    color:rgba(57,63,81,0.8);
    cursor: pointer;
  }

  #makeInfo .sceneBox .sceneInfoBox .sceneAdd i{
    margin: 18px 0 8px;
    color: #393F51;
    opacity: 0.8;
    display: inline-block;
    line-height: 12px;
  }

  /*场次信息*/
  #makeInfo .sessionBox .sessionInfoBox{
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin: 30px 0 0 10px;
  }

  #makeInfo .sessionBox .sessionInfoBox .sessionInfo{
    width:100px;
    height:33px;
    background:rgba(235,235,240,1);
    border-radius:2px;
    font-size:12px;
    color:rgba(57,63,81,1);
    margin: 0 14px 20px 0;
    text-align: center;
    line-height: 33px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }

  #makeInfo .sessionBox .sessionInfoBox .sessionInfo:nth-of-type(even){
    background: rgba(237,149,21,.2);
  }


  /*弹框图片上传*/
  #makeInfo .addDialog .photoAddBox{
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

  #makeInfo .photoAddBox .uploadBox{
    font-size: 12px;
    color:rgba(97,101,116,1);
  }

  #makeInfo .photoAddBox .uploadBox span{
    font-size: 12px;
    color: #6C6FBF;
  }

  #makeInfo .photoAddBox .uploadBox i{
    font-size: 28px;
  }

  #makeInfo .photoAddBox img.avatar{
    max-width:290px;
    overflow: hidden;
    height:190px;
    border:1px solid rgba(136,135,162,0.3);
    border-radius:2px;
  }
  /*弹框表单*/
  #makeInfo .addDialog .addressFormBox{
    width: 290px;
    margin: 30px auto;
    padding-left: 0;
  }

  #makeInfo .addDialog .addressFormBox .addressForm{
    font-size:12px;
    color:rgba(97,101,116,1);
    width: 290px;
  }

  #makeInfo .addDialog .addDialogFooter{
    width: 100%;
    height: 75px;
    border-top: 1px solid rgba(180,180,180,0.2);
    margin-top: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  #makeInfo .addDialog .addDialogFooter .addFooterBtn{
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

  #makeInfo .addDialog .addDialogFooter .addFooterBtn:last-of-type{
    border:1px solid rgba(186,186,186,1);
    background: #fff;
    margin-left: 36px;
    color: rgba(0,0,0,.8);
  }

  /*场景选择弹框*/
  #makeInfo .addDialog .addSceneDialog{
    display: flex;
  }

  #makeInfo .addDialog .addSceneDialog .sceneBox{
    width: 312px;
    background:rgba(63,62,106,0.05);
    border-right: 1px solid rgba(0,0,0,.05);
  }

  #makeInfo .addDialog .addSceneDialog .sceneBox .sceneTitle{
    font-size:12px;
    color:rgba(57,63,81,1);
    padding-left: 40px;
    margin-top: 18px;
  }

  #makeInfo .addDialog .addSceneDialog .sceneBox .sceneTitle span{
    font-size: 12px;
    color: #EB5252;
    margin-left: 4px;
  }

  #makeInfo .addDialog .addSceneDialog .sceneSelectBox{
    margin-top: 18px;
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    height: 280px;
    overflow-y: scroll;
    align-content: flex-start;
  }

  #makeInfo .addDialog .addSceneDialog .sceneBox .sceneSelect{
    margin: 0 0 8px 40px;
    width: 110px;
    height: 14px;
    display: flex;
    align-items: center;
    flex-shrink: 0;
  }

  #makeInfo .addDialog .addSceneDialog .sceneRightBox{
    width: 168px;
  }

  #makeInfo .addDialog .addSceneDialog .sceneRightBox .sceneSelectTotal{
    width: 100%;
    font-size:12px;
    height: 52px;
    line-height: 52px;
    padding-left: 12px;
    color:rgba(57,63,81,1);
  }

  #makeInfo .addDialog .addSceneDialog .sceneRightBox .sceneCheckBox{
    height: 280px;
    overflow-y: scroll;
    overflow-x: hidden;
  }

  #makeInfo .addDialog .addSceneDialog .sceneRightBox .sceneCheckBox .sceneSelectInfo{
    width:164px;
    height:26px;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px 0 12px;
  }

  #makeInfo .addDialog .addSceneDialog .sceneRightBox .sceneCheckBox .sceneSelectInfo:nth-child(odd){
    background:rgba(63,62,106,0.05);
  }

  #makeInfo .addDialog .addSceneDialog .sceneRightBox .sceneCheckBox .sceneSelectInfo .sceneName{
    width: 110px;
    height: 12px;
    font-size:12px;
    line-height: 12px;
    color:rgba(97,101,116,1);
    display: inline-block;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }

  #makeInfo .addDialog .addSceneDialog .sceneRightBox .sceneCheckBox .sceneSelectInfo i{
    font-size: 12px;
    color:rgba(129,132,144,1);
    line-height: 12px;
    cursor: pointer;
    opacity: 0;
    transition: opacity 1s;
    display: inline-block;
    margin-top: 2px;
  }

  #makeInfo .addDialog .addSceneDialog .sceneRightBox .sceneCheckBox .sceneSelectInfo:hover i{
    opacity: 1;
  }

  #makeInfo .addDialog.addSceneDialog .addDialogFooter{
    margin-top: 0;
  }
</style>

<style>
  /*图片上传*/
  #makeInfo .dressInfoContent .dressInfoLeft.dressInfoLeftAddBox .el-upload{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
    font-size: 12px;
    color: #fff;
  }

  /*信息输入框*/
  #makeInfo .addressForm .addressFormInput .el-input__inner{
    height: 36px;
    border-radius: 0;
    border: none;
    border-bottom: 1px solid rgba(210,210,210,0.6);
    font-size:12px;
    color:rgba(57,63,81,1);
  }

  #makeInfo .addressForm .addressFormInput:not(.addressFormMap) .el-input__inner{
    padding-left: 0;
  }

  #makeInfo .addressForm .addressFormInput .el-input__inner:focus{
    border-color: rgba(255,105,14,0.6);
  }

  #makeInfo .addressForm .addressFormInput .el-input__prefix i{
    line-height: 36px;
    transition: color 1s;
  }

  #makeInfo .addressForm .addressFormInput .el-input__suffix i{
    line-height: 40px;
  }

  #makeInfo .addressForm .addressFormInput .el-input__prefix i.active{
    color: #EE7373;
  }

  /*地址信息输入框*/
  .addressMap{
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    font-size: 12px;
  }

  .addressMap span{
    color: #999;
    font-size: 12px;
  }

  /*日期选择器*/
  #makeInfo .addressForm .addressFormDate .el-input__icon{
    transition: color 1s;
    line-height: 36px;
  }

  #makeInfo .addressForm .addressFormDate.active .el-range__icon{
    color: #EE7373;
  }

  #makeInfo .addressForm .addressFormDate .el-range-input,
  #makeInfo .addressForm .addressFormDate .el-range-separator{
    font-size: 12px;
    color:rgba(57,63,81,1);
    line-height: 36px;
  }

  #makeInfo .addressForm .addressFormDate .el-range-input{
    padding-top: 5.5px;
  }

  /*单选组*/
  #makeInfo .addressForm .addressFormRadio .el-radio{
    width: 74px;
    margin: 0 22px 0 0;
    padding: 0;
    height: 24px;
    border:1px solid rgba(136,135,162,0.4);
    border-radius:12px;
    transition: background 0.5s;
    cursor: pointer;
  }

  #makeInfo .addressForm .addressFormRadio .el-radio.is-checked{
    background: rgba(237,149,21,1);
    border-color: rgba(237,149,21,1);
  }

  #makeInfo .addressForm .addressFormRadio .el-radio__input{
    display: none;
  }

  #makeInfo .addressForm .addressFormRadio .el-radio__label{
    padding-left: 0;
    width: 72px;
    line-height: 22px;
    text-align: center;
    display: inline-block;
    font-size:12px;
    color:rgba(57,63,81,1);
    transition: color 0.5s;
  }

  #makeInfo .addressForm .addressFormRadio .el-radio.is-checked .el-radio__label{
    color: #fff;
  }


  /*折叠面板*/
  #makeInfo .dressCollapse .el-collapse-item__header{
    border: none;
    position: relative;
  }

  #makeInfo .dressCollapse .el-collapse-item__arrow{
    position: absolute;
    left: 72px;
    color: rgba(57,63,81,1);
  }

  #makeInfo .dressCollapse .el-collapse-item__wrap{
    border-bottom: none;
  }

  /*弹框表单*/
  #makeInfo .addDialog .el-dialog .el-dialog__header{
    height: 54px;
    padding: 0;
  }

  #makeInfo .addDialog .el-dialog .el-dialog__header .el-dialog__title{
    font-size: 14px;
    line-height: 54px;
    height: 54px;
  }

  #makeInfo .addDialog .el-dialog .el-dialog__header .el-dialog__headerbtn{
    top: 15px;
    right: 36px;
  }

  #makeInfo .addDialog .el-dialog .el-dialog__header .el-dialog__headerbtn>i{
    font-size: 16px;
    line-height: 16px;
    font-weight: bold;
  }

  #makeInfo .addDialog .el-dialog__body{
    padding: 0;
    overflow: hidden;
  }

  /*弹框图片上传*/
  #makeInfo .addDialog  .photoAddBox .el-upload{
    font-size: 12px;
    color:rgba(97,101,116,1);
  }

  #makeInfo .addDialog  .photoAddBox .el-upload span{
    font-size: 12px;
    color: #6C6FBF;
  }


  /*场景选择弹框*/
  #makeInfo .addDialog .addSceneDialog .sceneBox .sceneSelect .el-checkbox__label{
    font-size: 12px;
    color:rgba(97,101,116,1);
    padding-left: 8px;
    width: 100px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    display: inline-block;
    flex-shrink: 0;
    line-height: 12px;
  }

  #makeInfo .addDialog .addSceneDialog .sceneBox .sceneSelect  .el-checkbox__input{
    height: 14px;
  }

  #makeInfo .addDialog .addSceneDialog .sceneBox .sceneSelect .el-checkbox__inner{
    background: none;
    border-color: rgba(129,132,144,0.8);
  }

  #makeInfo .addDialog .addSceneDialog .sceneBox .sceneSelect .el-checkbox__input.is-checked .el-checkbox__inner{
    background: #ed9515;
    border-color: #ed9515;
  }
</style>
