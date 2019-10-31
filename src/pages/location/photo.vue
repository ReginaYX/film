<template>
  <div id="locationPhoto">
    <div class="photoTitle">
      <div class="photoTitleBorder"></div>
      <span class="photoTitleTxt">现场照片</span>
    </div>
    <div class="photoInfoBox">
      <div class="photoInfo" v-for="item,index in photo" :key="index">
        <img :src="host+'/files/'+item.path" alt="">
        <div class="photoInfoDesc">{{item.origin_name}}</div>
        <el-collapse-transition>
          <div class="photoInfoBtnBox">
            <div class="photoInfoBtn" @click="()=>{if(authId==1){item.deleMemberShadow = true}else{noAccess = true}}"><i class="iconfont iconshanchu"></i></div>
            <div class="photoInfoBtn" @click="detailImg = host+'/files/'+item.path"><i class="iconfont iconchakan"></i></div>
          </div>
        </el-collapse-transition>
        <transition name="el-zoom-in-top">
          <div class="SurveyDeleShadow" v-if="item.deleMemberShadow">
            <div class="SurveyDeleText">
              <i class="iconfont icontips-copy"></i>确认删除该现场照片
            </div>
            <div class="SurveyDeleFooter">
              <div class="SurveyDeleBtn" @click="item.deleMemberShadow = false">取消</div>
              <div class="SurveyDeleBtn" @click="delePhoto(item.photo_id)">确认</div>
            </div>
          </div>
        </transition>
      </div>
      <div class="photoInfo photoAdd" @click="()=>{if(authId==1){addDialog = true}else{noAccess = true}}">
        <i class="iconfont iconshangchuanxianchangzhaopian"></i>
        ＋添加现场照片
      </div>
    </div>
    <transition name="el-zoom-in-center">
      <div class="detailImgBox" v-show="detailImg">
        <img :src="detailImg" alt="">
        <div class="detailImgClose" @click="detailImg = ''">×</div>
      </div>
    </transition>
    <transition name="el-zoom-in-center">
      <div v-show="shade" class="shadeBox">
        <div class="shadeTxt">
          <i class="iconfont iconwushuju1"></i>
          <p>您还没有添加拍摄地哦！</p>
          <p>您可点击页面左上角的添加按钮来添加新拍摄地</p>
        </div>
      </div>
    </transition>
    <el-dialog
      title="添加现场照片"
      :visible.sync="addDialog"
      width="480px" center class="addDialog">
      <el-upload :show-file-list="false"
        class="photoAddBox" :on-change="onChange" accept=".jpg,.png"
        action="/finance/flow/certificate/add" :http-request="upLoad">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <div class="uploadBox" v-else>
          <i class="iconfont iconshangchuanxianchangzhaopian"></i><br />
          可拖动图片至该区域，或<span class="addClick">点击添加</span>
        </div>
      </el-upload>
      <div class="addFormBox">
        <div class="addForm">
          照片名称<span class="addFormSign">*</span>
          <el-input
            placeholder="请输入照片名称"
            v-model="addPhotoInfo.origin_name"
            clearable class="addFormInput">
          </el-input>
        </div>
      </div>
      <div class="addDialogFooter">
        <div class="addFooterBtn" @click="addPhoto">创建</div>
        <div class="addFooterBtn" @click="addDialog = false">取消</div>
      </div>
    </el-dialog>
    <!--无权限弹框-->
    <no-access :noAccessVisible="noAccess" @close="(v)=>{noAccess = v}"></no-access>
  </div>
</template>

<script>
  import axios from "axios"
  import global_ from '../../common/Global'
  import Qs from 'qs'
    export default {
      name: "photo",
      data(){
        return{
          shade:false,//遮罩
          photo: '',
          detailImg:'',
          addDialog:false,//添加弹框
          photoTxt:'1',
          imageUrl:'',//图片路径
          addPhotoInfo:{
            origin_name:'',
            path:'',
            shoot_location_id:''
          },
          host:global_.pathInfo,
          authId:0,//权限信息
          noAccess:false,//无权限弹框
        }
      },
      methods: {
        //图片上传
        upLoad(file){
          global_.upLoad(file).then((response)=>{
            this.imageUrl = global_.pathInfo+'/files/'+response.data[0]
            this.addPhotoInfo.path = response.data[0]
          })
        },
        onChange(file) {
          const isJPG = file.raw.type === 'image/jpeg';
          const isPNG = file.raw.type === 'image/png';

          if (!isJPG && !isPNG) {
            this.$message.error('上传凭证图片只能是 JPG/PNG 格式!');
          }
          return isJPG && isPNG;
        },
        //获取现场照片
        getPhoto(){
          if(this.$route.query.id){
            axios.get('/manage/location/find_all_photo', {
              params: {
                shoot_location_id: this.$route.query.id
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
          }else{
            this.photo = []
          }
        },
        //添加照片
        addPhoto(){
          if(this.addPhotoInfo.origin_name && this.addPhotoInfo.path){
            this.addPhotoInfo.shoot_location_id = this.$route.query.id;
            this.addDialog = false
            axios({
              method: 'post',
              url: '/manage/location/add_photo',
              data:this.addPhotoInfo,
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
              },
              transformRequest: [data => Qs.stringify(data)]
            }).then((response)=> {
              if(response.data.ret == '0'){
                this.getPhoto();
                this.addPhotoInfo.origin_name = '';
                this.imageUrl = ''
              }else{
                this.addDialog = true
                this.$nextTick( ()=> {
                  this.$message(response.data.msg+','+response.data.cause);
                })
              }
            })
          }else{
            this.$message('请填写完整');
          }
        },
        //删除
        delePhoto(v){
          axios.get('/manage/location/delete_by_photo_id', {
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
                    let index = response.data.data.auths[i][j].findIndex(d => d.id == '4');
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
        if(this.$route.query.id){
          this.getPhoto()
        }else{
          this.shade = true
        }
      },
      watch:{
        $route(to,from){
          if(to.path == '/details/location/photo'){
            if(this.$route.query.id){
              this.getPhoto()
            }else{
              this.shade = true
            }
          }
        }
      },
    }
</script>

<style scoped>
  #locationPhoto .photoTitle{
    display: flex;
    align-items: center;
    height: 25px;
  }

  #locationPhoto .photoTitle .photoTitleBorder{
    width:4px;
    height:14px;
    background:rgba(50,197,143,1);
    margin-right: 6px;
  }

  #locationPhoto .photoTitle .photoTitleTxt{
    font-size:14px;
    color:rgba(57,63,81,1);
    flex-shrink: 0;
  }

  #locationPhoto .photoInfoBox{
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-top: 20px;
  }

  #locationPhoto .photoInfo{
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

  #locationPhoto .photoInfo>img{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  #locationPhoto .photoInfo .photoInfoDesc{
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

  #locationPhoto .photoInfo .photoInfoBtnBox{
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

  #locationPhoto .photoInfo:hover .photoInfoDesc{
    opacity: 0;
  }

  #locationPhoto .photoInfo:hover .photoInfoBtnBox{
    opacity: 1;
  }

  #locationPhoto .photoInfo .photoInfoBtnBox .photoInfoBtn{
    width: 50%;
    flex-shrink: 0;
    height: 100%;
    background:rgba(50,197,143,1);
    text-align: center;
    opacity:0.96;
    color: #fff;
    cursor: pointer;
  }

  #locationPhoto .photoInfo .photoInfoBtnBox .photoInfoBtn:first-of-type{
    background: rgba(240,80,80,1);
  }

  #locationPhoto .photoInfo .photoInfoBtnBox .photoInfoBtn i{
    line-height: 42px;
    font-size: 18px;
  }

  /*删除阴影框*/
  #locationPhoto .SurveyDeleShadow{
    position: absolute;
    width: 100%;
    height: 100%;
    background:rgba(0,0,0,.7);
    top: 0;
    left: 0;
    z-index: 5;
  }

  #locationPhoto .SurveyDeleShadow .SurveyDeleText{
    font-size:12px;
    color:rgba(255,255,255,1);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 72px;
  }

  #locationPhoto .SurveyDeleShadow .SurveyDeleText i{
    margin-right: 8px;
  }

  #locationPhoto .SurveyDeleShadow .SurveyDeleFooter{
    width: 100%;
    height: 24px;
    display: flex;
    align-items: center;
    position: absolute;
    bottom: 0;
  }

  #locationPhoto .SurveyDeleShadow .SurveyDeleFooter .SurveyDeleBtn{
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

  #locationPhoto .SurveyDeleShadow .SurveyDeleFooter .SurveyDeleBtn:first-of-type{
    opacity: 0.6;
  }

  #locationPhoto .photoAdd{
    border:1px solid rgba(136,135,162,0.3);
    justify-content: center;
    flex-direction: column;
    color:rgba(57,63,81,0.8);
    font-size: 12px;
    cursor: pointer;
  }

  #locationPhoto .photoAdd i{
    color:rgba(57,63,81,0.8);
    font-size: 28px;
    cursor: pointer;
    display: inline-block;
    margin-bottom: 6px;
  }

  #locationPhoto .detailImgBox{
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

  #locationPhoto .detailImgBox>img{
    margin: 0 auto;
    object-fit: contain;
    width: 100%;
    height: 100%;
  }

  #locationPhoto .detailImgBox .detailImgClose{
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

  /*弹框表单 图片上传*/
  #locationPhoto .photoAddBox{
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
    overflow: hidden;
  }

  #locationPhoto .photoAddBox i{
    font-size: 26px;
    color: #606574;
    margin-bottom: 8px;
    display: inline-block;
  }

  #locationPhoto .photoAddBox .uploadBox{
    font-size: 12px;
    color:rgba(97,101,116,1);
  }

  #locationPhoto .photoAddBox .uploadBox span{
    font-size: 12px;
    color: #6C6FBF;
  }

  #clothingInfo .photoAddBox .uploadBox i{
    font-size: 28px;
  }

  #locationPhoto .photoAddBox img.avatar{
    max-width:290px;
    overflow: hidden;
    height:190px;
    border:1px solid rgba(136,135,162,0.3);
    border-radius:2px;
  }

  #locationPhoto .addFormBox{
    width: 290px;
    margin: 30px auto;
  }

  #locationPhoto .addFormBox .addForm{
    font-size:12px;
    color:rgba(97,101,116,1);
    width: 290px;
  }

  #locationPhoto .addFormBox .addForm .addFormSign{
    color: #F05050;
    margin-left: 4px;
  }

  #locationPhoto .addDialog .addDialogFooter{
    width: 100%;
    height: 75px;
    border-top: 1px solid rgba(180,180,180,0.2);
    margin-top: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  #locationPhoto .addDialog .addDialogFooter .addFooterBtn{
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

  #locationPhoto .addDialog .addDialogFooter .addFooterBtn:last-of-type{
    border:1px solid rgba(186,186,186,1);
    background: #fff;
    margin-left: 36px;
    color: rgba(0,0,0,.8);
  }

  /*无数据遮罩*/
  #locationPhoto .shadeBox{
    width: calc(100% - 346px);
    height: calc(100vh - 117px);
    position: fixed;
    background:rgba(0,0,0,0.6);
    top: 98px;
    left: 326px;
    border-radius: 0 0 4px 4px;
  }

  #locationPhoto .shadeBox .shadeTxt{
    position: absolute;
    top: 38%;
    left: 0;
    width: 100%;
    text-align: center;
    font-size:16px;
    color:rgba(255,255,255,1);
  }

  #locationPhoto .shadeBox .shadeTxt i{
    font-size:64px;
    color:rgba(255,255,255,1);
  }

  #locationPhoto .shadeBox .shadeTxt p:first-of-type{
    margin-top: 20px;
  }

  #locationPhoto .shadeBox .shadeTxt p{
    line-height: 26px;
  }
</style>

<style>
  /*弹框表单*/
  #locationPhoto .addDialog .el-dialog .el-dialog__header{
    height: 54px;
    padding: 0;
  }

  #locationPhoto .addDialog .el-dialog .el-dialog__header .el-dialog__title{
    font-size: 14px;
    line-height: 54px;
    height: 54px;
  }

  #locationPhoto .addDialog .el-dialog .el-dialog__header .el-dialog__headerbtn{
    top: 15px;
    right: 36px;
  }

  #locationPhoto .addDialog .el-dialog .el-dialog__header .el-dialog__headerbtn>i{
    font-size: 16px;
    line-height: 16px;
    font-weight: bold;
  }

  #locationPhoto .addDialog .el-dialog__body{
    padding: 0;
    overflow: hidden;
  }

  /*信息输入框*/
  #locationPhoto .addForm .addFormInput .el-input__inner{
    height: 36px;
    border-radius: 0;
    border: none;
    border-bottom: 1px solid rgba(210,210,210,0.6);
    font-size:12px;
    color:rgba(57,63,81,1);
  }

  #locationPhoto .addForm .addFormInput:not(.addFormMap) .el-input__inner{
    padding-left: 0;
  }

  #locationPhoto .addForm .addFormInput .el-input__inner:focus{
    border-color: rgba(255,105,14,0.6);
  }

  #locationPhoto .addForm .addFormInput .el-input__prefix i{
    line-height: 36px;
    transition: color 1s;
  }

  #locationPhoto .addForm .addFormInput .el-input__suffix i{
    line-height: 40px;
  }

  #locationPhoto .addForm .addFormInput .el-input__prefix i.active{
    color: #EE7373;
  }
</style>
