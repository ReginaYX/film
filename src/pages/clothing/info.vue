<template>
  <div id="clothingInfo">
    <div class="addressBox">
      <div class="clothingInfoTitle">
        <div class="clothingInfoTitleBorder"></div>
        <span class="clothingInfoTitleTxt">演员基本信息</span>
      </div>
      <div class="clothingInfoContent">
        <el-carousel :interval="5000" arrow="always" indicator-position="none" class="clothingInfoLeft" height="200px" v-if="actor_photo.length != 0">
          <el-carousel-item v-for="item,index in actor_photo" :key="index">
            <img :src="host+'/files/'+item.path" alt="" class="actorPhoto">
            <div class="actorPhotoTop">
              <div class="actorPhotoBtn" @click="()=>{if(authId==1){addPhotoDialog = true}else{noAccess = true}}">＋添加照片</div>
              <div class="actorPhotoBtnBox">
                <div class="actorPhotoBtn" @click="delePhoto(item.photo_id)"><i class="iconfont iconshanchu"></i></div>
                <div class="actorPhotoBtn" @click="detailImg = host+'/files/'+item.path"><i class="iconfont iconchakan"></i></div>
              </div>
            </div>
            <div class="actorPhotoDescBox">
              <div class="actorPhotoDesc">{{item.photo_name}}</div>
              <div class="actorPhotoDesc"><span>{{index+1}} </span>/ {{actor_photo.length}}</div>
            </div>
          </el-carousel-item>
        </el-carousel>
        <div class="clothingInfoLeft" v-else @click="()=>{if(authId==1){addPhotoDialog = true}else{noAccess = true}}"><i class="iconfont iconnan"></i></div>
        <div class="addressFormBox">
          <div class="addressForm">
            姓名<span class="addressFormSign">*</span>
            <el-input
              placeholder="请输入演员姓名" :disabled="authId!=1"
              v-model="actorInfo.actor_name" @blur="submitInfo('actor_name')"
              clearable class="addressFormInput">
            </el-input>
          </div>
          <div class="addressForm">
            身高
            <el-input
              placeholder="请输入演员身高" :disabled="authId!=1"
              v-model="actorInfo.height" @blur="submitInfo('height')"
              clearable class="addressFormInput">
            </el-input>
          </div>
          <div class="addressForm">
            性别
            <el-radio-group v-model="actorInfo.sex" size="small" class="addressFormRadio" @change="submitInfo('sex')" :disabled="authId!=1">
              <el-radio label="1"><i class="iconfont iconnan"></i></el-radio>
              <el-radio label="2"><i class="iconfont iconnv"></i></el-radio>
            </el-radio-group>
          </div>
          <div class="addressForm">
            体重
            <el-input
              placeholder="请输入演员体重" :disabled="authId!=1"
              v-model="actorInfo.weight" @blur="submitInfo('weight')"
              clearable class="addressFormInput">
            </el-input>
          </div>
          <div class="addressForm">
            联系电话
            <el-input
              placeholder="请输入联系电话" @input="numCheck($event,'phone')"
              v-model="actorInfo.phone" @blur="submitInfo('phone')"
              clearable class="addressFormInput" :disabled="authId!=1">
            </el-input>
          </div>
          <div class="addressForm">
            尺码
            <el-input
              placeholder="请输入尺码" :disabled="authId!=1"
              v-model="actorInfo.size" @blur="submitInfo('size')"
              clearable class="addressFormInput">
            </el-input>
          </div>
        </div>
      </div>
    </div>
    <el-collapse class="clothingCollapse" v-model="activeCollapse">
      <el-collapse-item  name="1">
        <template slot="title">
          <div class="clothingInfoTitle">
            <div class="clothingInfoTitleBorder"></div>
            <span class="clothingInfoTitleTxt">服装信息&#12288;</span>
            <div class="clothingInfoTitleHr"></div>
          </div>
        </template>
        <div class="dressBox">
          <div class="dressInfoBox">
            <div class="dressInfo" v-for="item in dress_photo">
              <router-link :to="{path: '/details/clothing/dress?play_id='+$route.query.play_id+'&project_id='+$route.query.project_id+'&actor='+$route.query.id+'&id='+item.dress_id}">
                <img  v-if='item.path' :src="host+'/files/'+item.path" alt="" class="dressPhoto">
                <div v-else class="dressPhoto"><i class="iconfont iconfuzhuang1"></i></div>
                <div class="dressInfoContent">
                  <div class="dressInfoTitle">{{item.dress_name}}</div>
                  <div class="dressInfoDesc" v-if="item.amount">数量：{{item.amount}}</div>
                  <div class="dressInfoDesc" v-else>数量：暂无</div>
                </div>
              </router-link>
              <div class="dressDeleBox">
                <div class="dressDele" @click="()=>{if(authId==1){item.deleMemberShadow = true}else{noAccess = true}}"><i class="iconfont iconshanchu"></i></div>
                <div class="dressDele" v-if='item.url' @click="detailImg = item.url"><i class="iconfont iconchakan"></i></div>
              </div>
              <transition name="el-zoom-in-top">
                <div class="dressDeleShadow" v-show="item.deleMemberShadow">
                  <div class="dressDeleText">
                    <i class="iconfont icontips-copy"></i>确认删除该服装
                  </div>
                  <div class="dressDeleFooter">
                    <div class="dressDeleBtn" @click="item.deleMemberShadow = false">取消</div>
                    <div class="dressDeleBtn" @click="deleDress(item.dress_id)">确认</div>
                  </div>
                </div>
              </transition>
            </div>
            <div class="dressInfo dressAdd" @click="()=>{if(authId==1){addDressDialog = true}else{noAccess = true}}">
              <i class="iconfont iconfuzhuang"></i><br />
              ＋添加相关服装
            </div>
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item  name="2">
        <template slot="title">
          <div class="clothingInfoTitle">
            <div class="clothingInfoTitleBorder"></div>
            <span class="clothingInfoTitleTxt">化妆信息&#12288;</span>
            <div class="clothingInfoTitleHr"></div>
          </div>
        </template>
        <div class="dressBox">
          <div class="dressInfoBox">
            <div class="dressInfo" v-for="item,index in makeup_photo" :key="index">
              <router-link :to="{path: '/details/clothing/makeup?play_id='+$route.query.play_id+'&project_id='+$route.query.project_id+'&actor='+$route.query.id+'&id='+item.makeup_id}">
                <img  v-if='item.path' :src="host+'/files/'+item.path" alt="" class="dressPhoto">
                <div v-else class="dressPhoto"><i class="iconfont iconyoupinwangtubiao-"></i></div>
                <div class="dressInfoContent makeupInfoContent">{{item.makeup_name}}</div>
              </router-link>
              <div class="dressDeleBox">
                <div class="dressDele" @click="()=>{if(authId==1){item.deleMemberShadow = true}else{noAccess = true}}"><i class="iconfont iconshanchu"></i></div>
                <div class="dressDele" v-if='item.url' @click="detailImg = item.url"><i class="iconfont iconchakan"></i></div>
              </div>
              <transition name="el-zoom-in-top">
                <div class="dressDeleShadow" v-show="item.deleMemberShadow">
                  <div class="dressDeleText">
                    <i class="iconfont icontips-copy"></i>确认删除该妆容
                  </div>
                  <div class="dressDeleFooter">
                    <div class="dressDeleBtn" @click="item.deleMemberShadow = false">取消</div>
                    <div class="dressDeleBtn" @click="deleMakeup(item.makeup_id)">确认</div>
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
      <div class="addressFormBox">
        <div class="addressForm">
          妆容名称<span class="addressFormSign">*</span>
          <el-input
            placeholder="请输入妆容名称" maxlength="8"
            v-model="addMakeupInfo.makeup_name"
            clearable class="addressFormInput">
          </el-input>
        </div>
        <div class="addressForm">
          妆容备注
          <el-input
            placeholder="请输入妆容备注"
            v-model="addMakeupInfo.remark" maxlength="30"
            clearable class="addressFormInput">
          </el-input>
        </div>
        <div class="addressForm">
          上传妆容照片
          <el-upload
            list-type="picture-card" multiple
            ref="uploadMakeup" :class="['photoUpload',hideUpload?'hide':'']"
            :action="addUploadUrl"
            :limit='3' :on-remove="()=>{hideUpload = false}"
            accept=".jpg,.png" :before-remove="removeMakeupPhoto"
            :on-change="onChange" :http-request="upLoadMakeup">
            <i class="el-icon-plus"></i>
          </el-upload>
        </div>
      </div>
      <div class="addDialogFooter">
        <div class="addFooterBtn" @click="addMakeup">创建</div>
        <div class="addFooterBtn" @click="addMakeDialog = false;hideUpload = false">取消</div>
      </div>
    </el-dialog>
    <el-dialog
      title="添加演员服装"
      :visible.sync="addDressDialog"
      width="480px" center class="addDialog">
      <div class="addressFormBox">
        <div class="addressForm">
          服装名称<span class="addressFormSign">*</span>
          <el-input
            placeholder="请输入服装名称" maxlength="8"
            v-model="addDressInfo.dress_name"
            clearable class="addressFormInput">
          </el-input>
        </div>
        <div class="addressForm">
          使用时间
          <el-date-picker
            v-model="dressDate" :class="['addressFormInput','addressFormDate',dressDate?'active':'']"
            type="daterange" value-format="timestamp"
            range-separator="至"  prefix-icon="iconfont iconriqi1"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </div>
        <div class="addressForm">
          服装备注
          <el-input
            placeholder="请输入服装备注"
            v-model="addDressInfo.remark" maxlength="30"
            clearable class="addressFormInput">
          </el-input>
        </div>
        <div class="addressForm">
          上传服装照片
          <el-upload
            list-type="picture-card" multiple
            ref="uploadDress" :class="['photoUpload',hideUpload?'hide':'']"
            :action="addUploadUrl"
            :limit='3' :on-remove="()=>{hideUpload = false}"
            accept=".jpg,.png" :before-remove="removeDressPhoto"
            :on-change="onChange" :http-request="upLoadDress">
            <i class="el-icon-plus"></i>
          </el-upload>
        </div>
      </div>
      <div class="addDialogFooter">
        <div class="addFooterBtn" @click="addDress">创建</div>
        <div class="addFooterBtn" @click="addDressDialog = false;hideUpload = false">取消</div>
      </div>
    </el-dialog>
    <el-dialog
      title="添加演员照片"
      :visible.sync="addPhotoDialog"
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
      <div class="addressFormBox addPhotoFormBox">
        <div class="addressForm addPhotoFormBox">
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
  import global_ from '../../common/Global'
  import Qs from 'qs'
    export default {
      name: "info",
      data(){
        return{
          toolsInfoTitleTxt:'',
          activeCollapse:['1','2'],
          sex:'1',
          detailImg:'',
          addMakeDialog:false,//添加妆容弹框
          addDressDialog:false,//添加服装弹框
          addPhotoDialog:false,//添加演员照片弹框
          addUploadUrl:'/finance/flow/certificate/add',//添加图片
          actorInfo:'',//演员信息
          actor_photo:[],//演员照片
          dress_photo:[],//服装信息
          addDressInfo:{
            actor_id:this.$route.query.id,
            dress_name:'',
            remark:'',
            start_date:'',
            end_date:'',
            path_list:[],
          },//添加服装信息
          dressDate:'',//服装使用期
          makeup_photo:[],//化妆信息
          addMakeupInfo:{
            actor_id:this.$route.query.id,
            makeup_name:'',
            remark:'',
            path_list:[],
          },//添加妆容信息
          imageUrl:'',//图片路径
          addPhotoInfo:{
            photo_name:'',
            path:'',
            actor_id:this.$route.query.id
          },
          hideUpload:false,
          host:global_.pathInfo,
          authId:0,//权限信息
          noAccess:false,//无权限弹框
        }
      },
      methods: {
        removeMakeupPhoto(file, fileList){
          let index = fileList.findIndex(d => d.name == file.name);
          this.addMakeupInfo.path_list.splice(index,1)
        },
        removeDressPhoto(file, fileList){
          let index = fileList.findIndex(d => d.name == file.name);
          this.addDressInfo.path_list.splice(index,1)
        },
        //数字验证
        numCheck(v,form){
          if(form == 'phone'){
            this.actorInfo.phone = v.match(/\d/ig) ? v.match(/\d/ig).join('') : ''
          }
        },
        //上传图片控制
        onChange(file, fileList) {
          const isJPG = file.raw.type === 'image/jpeg';
          const isPNG = file.raw.type === 'image/png';

          if (!isJPG && !isPNG) {
            this.$message.error('上传凭证图片只能是 JPG/PNG 格式!');
          }
          this.hideUpload = fileList.length>=3
          return isJPG && isPNG;
        },
        //图片上传
        upLoad(file){
          global_.upLoad(file).then((response)=>{
            this.imageUrl = global_.pathInfo+'/files/'+response.data[0]
            this.addPhotoInfo.path = response.data[0]
          })
        },
        //图片上传列表
        upLoadMakeup(file,v){
          global_.upLoad(file).then((response)=>{
              this.addMakeupInfo.path_list.push(response.data[0])
          })
        },
        upLoadDress(file,v){
          global_.upLoad(file).then((response)=>{
              this.addDressInfo.path_list.push(response.data[0])
          })
        },
        //获取演员照片
        getPhoto(){
          axios.get('/manage/actor/get_all_actor_photo', {
            params: {
              actor_id: this.$route.query.id
            }
          }).then((response) => {
            if (response.data.ret == '0') {
              this.actor_photo = response.data.data
            }else{
              this.$message(response.data.msg+','+response.data.cause);
            }
          })
        },
        //添加演员照片
        addPhoto(){
          if(this.addPhotoInfo.photo_name && this.addPhotoInfo.path){
            this.addPhotoInfo.actor_id = this.$route.query.id;
            this.addPhotoDialog = false;
            axios({
              method: 'post',
              url: '/manage/actor/add_actor_photo',
              data:this.addPhotoInfo,
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
              },
              transformRequest: [data => Qs.stringify(data)]
            }).then((response)=> {
              if(response.data.ret == '0'){
                this.getPhoto();
                this.$emit('getPhoto',this.addPhotoInfo.actor_id);
                this.addPhotoInfo.photo_name = '';
                this.imageUrl = '';
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
        //删除演员照片
        delePhoto(v){
          if(this.authId==1){
            this.$confirm('确认删除该照片？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
            }).then(() => {
              axios.get('/manage/actor/delete_actor_photo', {
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
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              });
            });
          }else{
            this.noAccess = true
          }
        },
        //演员信息获取
        getInfo(){
          axios.get('/manage/actor/get_one_actor', {
            params: {
              actor_id : this.$route.query.id,
            }
          }).then((response)=> {
            if(response.data.ret=='0'){
              if(response.data.data.dress_photo){
                for(let i=0;i< response.data.data.dress_photo.length;i++){
                  response.data.data.dress_photo[i].deleMemberShadow = false
                }
              }
              if(response.data.data.makeup_photo){
                for(let i=0;i< response.data.data.makeup_photo.length;i++){
                  response.data.data.makeup_photo[i].deleMemberShadow = false
                }
              }
              if(response.data.data.actor_info.sex){
                response.data.data.actor_info.sex = response.data.data.actor_info.sex.toString()
              }
              this.actorInfo = response.data.data.actor_info;
              this.actor_photo = response.data.data.actor_photo;
              this.dress_photo = response.data.data.dress_photo;
              this.makeup_photo = response.data.data.makeup_photo;
            }
          })
        },
        //演员信息保存
        submitInfo(v){
          let formData = new FormData()
          let str = eval('this.actorInfo.'+v)
          formData.append(v,str);
          formData.append('actor_id  ',this.$route.query.id);
          axios({
            method: 'post',
            url: '/manage/actor/update_actor',
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
        //添加服装
        addDress(){
          if(this.addDressInfo.dress_name){
            if(this.dressDate){
              this.addDressInfo.start_date = this.dressDate[0]/1000
              this.addDressInfo.end_date = this.dressDate[1]/1000
            }
            this.addDressInfo.actor_id = this.$route.query.id;
            this.addDressInfo.path_list = this.addDressInfo.path_list.join(',')
            this.hideUpload = false
            this.addDressDialog = false
            axios({
              method: 'post',
              url: '/manage/actor/add_dress_info',
              data:this.addDressInfo,
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
              },
              transformRequest: [data => Qs.stringify(data)]
            }).then((response)=> {
              if(response.data.ret == '0'){
                this.getInfo();
                this.addDressInfo.dress_name = '';
                this.dressDate = '';
                this.addDressInfo.remark = '';
                this.addDressInfo.path_list = [];
                this.$refs.uploadDress.clearFiles();
              }else{
                this.addDressDialog = true
                this.$nextTick( ()=> {
                  this.$message(response.data.msg+','+response.data.cause);
                })
              }
            })
          }else{
            this.$message('请填写完整');
          }
        },
        //删除服装
        deleDress(v) {
          axios.get('/manage/actor/delete_dress_info', {
            params: {
              dress_id: v
            }
          }).then((response) => {
            if (response.data.ret == '0') {
              this.getInfo()
            }
          })
        },
        //添加妆容
        addMakeup(){
          if(this.addMakeupInfo.makeup_name){
            this.hideUpload = false;
            this.addMakeupInfo.actor_id = this.$route.query.id;
            this.addMakeDialog = false;
            this.addMakeupInfo.path_list = this.addMakeupInfo.path_list.join(',')
            axios({
              method: 'post',
              url: '/manage/actor/add_makeup_info',
              data:this.addMakeupInfo,
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
              },
              transformRequest: [data => Qs.stringify(data)]
            }).then((response)=> {
              if(response.data.ret == '0'){
                this.getInfo();
                this.addMakeupInfo.makeup_name = '';
                this.addMakeupInfo.remark = '';
                this.addMakeupInfo.path_list = [];
                this.$refs.uploadMakeup.clearFiles();
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
        //删除妆容
        deleMakeup(v) {
          axios.get('/manage/actor/delete_makeup', {
            params: {
              makeup_id: v
            }
          }).then((response) => {
            if (response.data.ret == '0') {
              this.getInfo()
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
        if(this.$route.query.id){
          this.getInfo();
        }
      },
      watch:{
        $route(to,from){
          if(to.path == '/details/clothing/info' && this.$route.query.id){
            this.getInfo();
          }else{
            this.actorInfo = [];
            this.actor_photo = [];
            this.dress_photo = [];
            this.makeup_photo = [];
          }
        }
      },
    }
</script>

<style scoped>
  *{
    box-sizing: border-box;
  }

  #clothingInfo .clothingInfoTitle{
    display: flex;
    align-items: center;
    height: 25px;
    width: 100%;
  }

  #clothingInfo .clothingInfoTitle .clothingInfoTitleBorder{
    width:4px;
    height:14px;
    background:rgba(50,197,143,1);
    margin-right: 6px;
  }

  #clothingInfo .clothingInfoTitle .clothingInfoTitleTxt{
    font-size:14px;
    color:rgba(57,63,81,1);
    flex-shrink: 0;
  }

  #clothingInfo .clothingInfoTitle .clothingInfoTitleHr{
    width: calc(100% - 108px);
    height: 1px;
    background: rgba(226,226,233,1);
    margin-left: 18px;
  }

  #clothingInfo .clothingInfoContent{
    display: flex;
    padding-left: 10px;
    margin-top: 20px;
  }

  #clothingInfo .clothingInfoContent .clothingInfoLeft{
    width:300px;
    height:200px;
    border-radius:2px;
    flex-shrink: 0;
    margin-right: 30px;
    overflow: hidden;
    background: #f7f7f9;
  }

  #clothingInfo .clothingInfoContent .clothingInfoLeft:not(.el-carousel){
    background:rgba(57,63,81,0.3);
    text-align: center;
    cursor: pointer;
  }

  #clothingInfo .clothingInfoContent div.clothingInfoLeft i{
    font-size: 58px;
    color: #fff;
    line-height: 200px;
  }

  /*演员照片走马灯*/
  #clothingInfo .clothingInfoContent .clothingInfoLeft .actorPhoto{
    width: 100%;
    /*height: 100%;*/
  }

  #clothingInfo .clothingInfoContent .clothingInfoLeft .actorPhotoTop{
    position: absolute;
    top: 8px;
    left: 0;
    width: 100%;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    opacity: 0;
    transition: opacity 1s;
  }

  #clothingInfo .clothingInfoContent .clothingInfoLeft:hover .actorPhotoTop{
    opacity: 1;
  }

  #clothingInfo .clothingInfoContent .clothingInfoLeft .actorPhotoTop>.actorPhotoBtn{
    width:70px;
    height:30px;
    background:rgba(50,197,143,1);
    border-radius:2px;
    font-size:12px;
    color: #fff;
    text-align: center;
    line-height: 30px;
    cursor: pointer;
  }

  #clothingInfo .clothingInfoContent .clothingInfoLeft .actorPhotoTop .actorPhotoBtnBox{
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 64px;
    height: 30px;
  }

  #clothingInfo .clothingInfoContent .clothingInfoLeft .actorPhotoTop .actorPhotoBtnBox .actorPhotoBtn{
    width:30px;
    height:30px;
    background:rgba(50,197,143,1);
    border-radius:2px;
    text-align: center;
    cursor: pointer;
  }

  #clothingInfo .clothingInfoContent .clothingInfoLeft .actorPhotoTop .actorPhotoBtnBox .actorPhotoBtn:last-of-type{
    background: rgba(234,80,80,1);
  }

  #clothingInfo .clothingInfoContent .clothingInfoLeft .actorPhotoTop .actorPhotoBtnBox .actorPhotoBtn i{
    font-size: 20px;
    color: #fff;
    line-height: 30px;
  }

  #clothingInfo .clothingInfoContent .clothingInfoLeft .actorPhotoDescBox{
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
    box-sizing: border-box;
  }

  #clothingInfo .clothingInfoContent .clothingInfoLeft .actorPhotoDescBox .actorPhotoDesc{
    font-size: 12px;
    color: #fff;
  }

  #clothingInfo .clothingInfoContent .clothingInfoLeft .actorPhotoDescBox .actorPhotoDesc span{
    font-size: 12px;
    color:rgba(240,80,80,1);
  }

  #clothingInfo .addressFormBox{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 10px;
    flex-wrap: wrap;
    width: calc(100% - 460px);
  }

  #clothingInfo .addressFormBox .addressForm{
    font-size:12px;
    color:rgba(97,101,116,1);
    width: 400px;
    flex-shrink: 0;
    margin:0 0 20px 0;
  }

  #clothingInfo .addressFormBox .addressForm:nth-child(3n){
    margin-right: 0;
  }

  #clothingInfo .addressFormBox .addressForm .addressFormSign{
    color: #F05050;
    margin-left: 4px;
  }

  /*地址搜索框*/
  #clothingInfo .addressForm .addressFormMap{
    display: block;
    width: 400px;
  }

  /*日期选择器*/
  #clothingInfo .addressForm .addressFormDate{
    width: 400px;
    border-radius: 0;
    border: none;
    border-bottom: 1px solid rgba(210,210,210,0.6);
    height: 36px;
    padding-left: 6px;
  }

  #clothingInfo .addressForm .addressFormDate.is-active{
    border-color: rgba(255,105,14,0.6);
  }

  /*单选框组*/
  #clothingInfo .addressForm .addressFormRadio{
    margin-left: 80px;
    display: block;
  }

  /*折叠面板*/
  #clothingInfo .clothingCollapse{
    border: none;
    margin-top: 60px;
  }

  /*服装信息*/
  #clothingInfo .dressBox{
    margin-top: 10px;
  }

  #clothingInfo .dressBox .dressInfoBox{
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-left: 10px;
  }

  #clothingInfo .dressBox .dressInfoBox .dressInfo{
    width:150px;
    height:200px;
    border-radius:2px;
    overflow: hidden;
    position: relative;
    margin: 0 14px 20px 0;
    cursor: pointer;
    background: #f7f7f9;
  }

  #clothingInfo .dressBox .dressInfoBox .dressInfo>a{
    width:150px;
    height:200px;
    border-radius:2px;
    overflow: hidden;
    display: block;
  }

  #clothingInfo .dressBox .dressInfoBox .dressPhoto{
    width: 100%;
    height: 100%;
    object-fit: cover;
    background:rgba(195,197,202,1);
    border-radius:2px;
    text-align: center;
  }

  #clothingInfo .dressBox .dressInfoBox div.dressPhoto{
    height: 100%;
  }

  #clothingInfo .dressBox .dressInfoBox .dressPhoto i{
    font-size: 60px;
    line-height: 145px;
    color: #fff;
  }


  #clothingInfo .dressBox .dressInfoBox .dressInfoContent{
    position: absolute;
    width:100%;
    height:54px;
    background:rgba(57,63,81,1);
    bottom: 0;
    left: 0;
    padding: 10px;
  }

  #clothingInfo .dressBox .dressInfoBox .makeupInfoContent{
    height:34px;
    font-size: 14px;
    color: #Fff;
    line-height: 14px;
  }

  #clothingInfo .dressBox .dressInfoBox .dressInfo .dressInfoTitle{
    font-size:14px;
    line-height: 14px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    color:rgba(255,255,255,1);
  }

  #clothingInfo .dressBox .dressInfoBox .dressInfo .dressInfoDesc{
    font-size:12px;
    line-height: 12px;
    margin-top: 8px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    color:rgba(255,255,255,1);
  }

  #clothingInfo .dressBox .dressInfoBox .dressInfo .dressDeleBox{
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

  #clothingInfo .dressBox .dressInfoBox .dressInfo:hover .dressDeleBox{
    opacity: 1;
  }

  #clothingInfo .dressBox .dressInfoBox .dressInfo .dressDeleBox .dressDele{
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

  #clothingInfo .dressBox .dressInfoBox .dressInfo .dressDeleBox .dressDele:last-of-type{
    margin-left: 6px;
    background: rgba(50,197,143,1);
  }

  #clothingInfo .dressBox .dressInfoBox .dressInfo:hover .dressDeleBox .dressDele{
    opacity: 1;
  }

  #clothingInfo .dressBox .dressInfoBox .dressInfo .dressDeleBox i{
    font-size: 18px;
    color: #fff;
    line-height: 24px;
  }

  /*删除阴影*/
  #clothingInfo .dressDeleShadow{
    position: absolute;
    width: 100%;
    height: 100%;
    background:rgba(0,0,0,.7);
    top: 0;
    left: 0;
  }

  #clothingInfo .dressDeleShadow .dressDeleText{
    font-size:12px;
    color:rgba(255,255,255,1);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 82px;
  }

  #clothingInfo .dressDeleShadow .dressDeleText i{
    margin-right: 8px;
  }

  #clothingInfo .dressDeleShadow .dressDeleFooter{
    width: 100%;
    height: 24px;
    display: flex;
    align-items: center;
    position: absolute;
    bottom: 0;
  }

  #clothingInfo .dressDeleShadow .dressDeleFooter .dressDeleBtn{
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

  #clothingInfo .dressDeleShadow .dressDeleFooter .dressDeleBtn:first-of-type{
    opacity: 0.6;
  }
  
  /*场景信息添加框*/
  #clothingInfo .dressBox .dressInfoBox .dressAdd{
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

  #clothingInfo .dressBox .dressInfoBox .dressAdd i{
    color: #393F51;
    opacity: 0.8;
    display: inline-block;
    line-height: 32px;
    font-size: 32px;
  }

  /*查看图片*/
  #clothingInfo .detailImgBox{
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

  #clothingInfo .detailImgBox>img{
    margin: 0 auto;
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
  
  #clothingInfo .detailImgBox .detailImgClose{
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
  #clothingInfo .addDialog .addressFormBox{
    padding: 0 40px;
    margin-top: 20px;
  }

  /*弹框图片上传*/
  #clothingInfo .addDialog .photoUpload{
    margin-top: 10px;
  }

  #clothingInfo .addDialog .photoUpload i{
    line-height: 90px;
    color:rgba(108,111,191,1);
  }

  #clothingInfo .addDialog .addPhotoFormBox{
    width: 290px;
    margin: 30px auto;
    padding: 0;
  }

  #clothingInfo .addFormBox .addPhotoForm{
    font-size:12px;
    color:rgba(97,101,116,1);
    width: 290px;
  }

  #clothingInfo .addDialog .addDialogFooter{
    width: 100%;
    height: 75px;
    border-top: 1px solid rgba(180,180,180,0.2);
    margin-top: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  #clothingInfo .addDialog .addDialogFooter .addFooterBtn{
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

  #clothingInfo .addDialog .addDialogFooter .addFooterBtn:last-of-type{
    border:1px solid rgba(186,186,186,1);
    background: #fff;
    margin-left: 36px;
    color: rgba(0,0,0,.8);
  }

  /*弹框表单 图片上传*/
  #clothingInfo .photoAddBox{
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

  #clothingInfo .photoAddBox .uploadBox{
    font-size: 12px;
    color:rgba(97,101,116,1);
  }

  #clothingInfo .photoAddBox .uploadBox span{
    font-size: 12px;
    color: #6C6FBF;
  }

  #clothingInfo .photoAddBox .uploadBox i{
    font-size: 28px;
  }

  #clothingInfo .photoAddBox img.avatar{
    max-width:290px;
    overflow: hidden;
    height:190px;
    border:1px solid rgba(136,135,162,0.3);
    border-radius:2px;
  }
</style>

<style>
  /*演员照片走马灯*/
  #clothingInfo .clothingInfoContent .clothingInfoLeft.el-carousel .el-carousel__arrow{
    background: none;
    width: 26px;
  }

  #clothingInfo .clothingInfoContent .clothingInfoLeft.el-carousel .el-carousel__arrow i{
    font-size: 20px;
    font-weight: bold;
  }

  #clothingInfo .clothingInfoContent .clothingInfoLeft.el-carousel .el-carousel__arrow--left{
    left: 0;
  }

  #clothingInfo .clothingInfoContent .clothingInfoLeft.el-carousel .el-carousel__arrow--right{
    right: 0;
  }

  /*信息输入框*/
  #clothingInfo .addressForm .addressFormInput .el-input__inner{
    height: 36px;
    border-radius: 0;
    border: none;
    border-bottom: 1px solid rgba(210,210,210,0.6);
    font-size:12px;
    color:rgba(57,63,81,1);
  }

  #clothingInfo .addressForm .addressFormInput:not(.addressFormMap) .el-input__inner{
    padding-left: 0;
  }

  #clothingInfo .addressForm .addressFormInput .el-input__inner:focus{
    border-color: rgba(255,105,14,0.6);
  }

  #clothingInfo .addressForm .addressFormInput .el-input__prefix i{
    line-height: 36px;
    transition: color 1s;
  }

  #clothingInfo .addressForm .addressFormInput .el-input__suffix i{
    line-height: 40px;
  }

  #clothingInfo .addressForm .addressFormInput .el-input__prefix i.active{
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
  #clothingInfo .addressForm .addressFormDate .el-input__icon{
    transition: color 1s;
    line-height: 36px;
  }

  #clothingInfo .addressForm .addressFormDate.active .el-range__icon{
    color: #EE7373;
  }

  #clothingInfo .addressForm .addressFormDate .el-range-input,
  #clothingInfo .addressForm .addressFormDate .el-range-separator{
    font-size: 12px;
    color:rgba(57,63,81,1);
    line-height: 36px;
  }

  #clothingInfo .addressForm .addressFormDate .el-range-input{
    padding-top: 5.5px;
  }

  /*单选组*/
  #clothingInfo .addressForm .addressFormRadio .el-radio{
    margin: 0 62px 0 0;
    padding: 0;
    cursor: pointer;
    width: 33px;
    height: 33px;
  }

  #clothingInfo .addressForm .addressFormRadio .el-radio:last-of-type{
    margin: 0;
  }

  #clothingInfo .addressForm .addressFormRadio .el-radio__input{
    display: none;
  }

  #clothingInfo .addressForm .addressFormRadio .el-radio__label{
    padding-left: 0;
    width: 100%;
    height:100%;
    text-align: center;
    display: inline-block;
    transition: color 0.5s;
  }

  #clothingInfo .addressForm .addressFormRadio .el-radio__label i{
    font-size: 33px;
    line-height: 33px;
    color:#B0B2B9;
  }

  #clothingInfo .addressForm .addressFormRadio .el-radio.is-checked .el-radio__label i{
    color: #EB5252;
  }

  #clothingInfo .addressForm .addressFormRadio .el-radio:first-of-type.is-checked .el-radio__label i{
    color: #6C6FBF;
  }

  /*折叠面板*/
  #clothingInfo .clothingCollapse .el-collapse-item__header{
    border: none;
    position: relative;
  }

  #clothingInfo .clothingCollapse .el-collapse-item__arrow{
    position: absolute;
    left: 72px;
    color: rgba(57,63,81,1);
  }

  #clothingInfo .clothingCollapse .el-collapse-item__wrap{
    border-bottom: none;
  }


  /*弹框表单*/
  #clothingInfo .addDialog .el-dialog .el-dialog__header{
    height: 54px;
    padding: 0;
  }

  #clothingInfo .addDialog .el-dialog .el-dialog__header .el-dialog__title{
    font-size: 14px;
    line-height: 54px;
    height: 54px;
  }

  #clothingInfo .addDialog .el-dialog .el-dialog__header .el-dialog__headerbtn{
    top: 15px;
    right: 36px;
  }

  #clothingInfo .addDialog .el-dialog .el-dialog__header .el-dialog__headerbtn>i{
    font-size: 16px;
    line-height: 16px;
    font-weight: bold;
  }

  #clothingInfo .addDialog .el-dialog__body{
    padding: 0;
    overflow: hidden;
  }

  /*弹框图片上传*/
  #clothingInfo .addDialog .photoUpload .el-upload{
    width:110px;
    height:90px;
    background:rgba(245,245,247,1);
    border:1px solid rgba(217,216,225,1);
    border-radius:4px;
    line-height: 90px;
  }

  #clothingInfo .addDialog .photoUpload.hide .el-upload{
    display: none;
  }

  #clothingInfo .addDialog .photoUpload .el-upload-list li{
    width:110px;
    height:90px;
    border-radius:4px;
    line-height: 90px;
    border: none;
  }

  #clothingInfo .addDialog .photoUpload .el-upload-list--picture-card .el-upload-list__item-thumbnail{
    vertical-align: top;
  }

  /*上传演员图片框*/
  #clothingInfo .photoAddBox .el-upload{
    font-size: 12px;
    color:rgba(97,101,116,1);
  }

  #clothingInfo .photoAddBox .el-upload span{
    font-size: 12px;
    color: #6C6FBF;
  }
</style>
