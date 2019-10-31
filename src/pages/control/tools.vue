<template>
  <div id="tools">
    <div class="toolsLeft">
      <div class="toolsLeftTop">
        <div class="toolsLeftTitleBox">
          <div class="toolsLeftTitle">
            <i class="iconfont iconicon_meishu"></i>道具列表
          </div>
          <div class="toolsLeftAdd" @click="()=>{if(authId==1){addToolDialog = true}else{noAccess = true}}">＋添加道具</div>
        </div>
        <div class="toolsLeftSearchBox">
          <el-input placeholder="请输入查找内容" v-model="searchScene" class="toolsLeftSearch" @keyup.enter.native="getSearch">
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
      <div class="toolsLeftContentBox" id="toolList">
        <div class="toolsLeftContent toolsContentNull" v-if='toolsList.length == 0'>暂无数据</div>
        <div class="toolsLeftContent" v-for="item,index in toolsList" :key="index" @click="handleChange(index,$event)" id="toolListItem" v-else>
          <div class="toolsContentInfo">
            <img class="toolsContentLeft" :src="host+'/files/'+item.photo" alt="" v-if="item.photo">
            <div class="toolsContentLeft" v-else><i class="iconfont icondaoju"></i></div>
            <div class="toolsContentRight">
              <div class="toolsContentTitle">{{item.tool_name}}</div>
              <div class="toolsContentNum">数量：
                <span v-if="item.amount">{{item.amount}}</span><span v-else>暂无</span>
              </div>
              <div class="toolsContentDesc">备注：
                <span v-if="item.remark">{{item.remark}}</span><span v-else>暂无</span>
              </div>
            </div>
          </div>
          <el-popover
            placement="bottom"
            width="116" v-model="item.visible"
            trigger="click" popper-class="toolsLeftBtnBox">
            <div class="toolsLeftBtn" @click="dele(index)">
              <i class="iconfont icondelete"></i>删除
            </div>
            <i class="iconfont icongengduo" slot="reference"></i>
          </el-popover>
        </div>
      </div>
    </div>
    <div class="toolsRight">
      <div class="addressBox">
        <div class="toolsInfoTitle">
          <div class="toolsInfoTitleBorder"></div>
          <span class="toolsInfoTitleTxt">道具信息</span>
        </div>
        <div class="toolInfoContent">
          <img class="toolsInfoLeft" :src="host+'/files/'+mainPhoto.path" alt="" v-if="mainPhoto">
          <div class="toolsInfoLeft" v-else @click="addPhotoDialog = true"><i class="iconfont icondaoju"></i></div>
          <div class="addressFormBox">
            <div class="addressForm">
              道具名称<span class="addressFormSign">*</span>
              <el-input
                placeholder="请输入道具名称" :disabled="authId!=1"
                v-model="toolInfo.tool_name" @blur="submitInfo('tool_name')"
                clearable class="addressFormInput">
              </el-input>
            </div>
            <div class="addressForm">
              租赁地址
              <el-input
                placeholder="请输入租赁地址" :disabled="authId!=1"
                v-model="toolInfo.lease_address" @blur="submitInfo('lease_address')"
                clearable class="addressFormInput">
              </el-input>
            </div>
            <div class="addressForm">
              数量
              <el-input
                placeholder="请输入数量" :disabled="authId!=1"
                v-model="toolInfo.amount" @blur="submitInfo('amount')"
                clearable class="addressFormInput">
              </el-input>
            </div>
            <div class="addressForm">
              使用方式
              <el-radio-group v-model="toolInfo.use_method" size="small" class="addressFormRadio" @change="submitInfo('use_method')" :disabled="authId!=1">
                <el-radio label="0" border>租赁</el-radio>
                <el-radio label="1" border>购买</el-radio>
              </el-radio-group>
            </div>
            <div class="addressForm">
              道具备注
              <el-input
                placeholder="请输入备注信息" @blur="submitInfo('remark')"
                v-model="toolInfo.remark" maxlength="30" :disabled="authId!=1"
                clearable class="addressFormInput">
              </el-input>
            </div>
            <div class="addressForm">
              价格
              <el-input
                placeholder="请输入具体价格" :disabled="authId!=1"
                v-model="toolInfo.price" @blur="submitInfo('price')"
                clearable class="addressFormInput">
              </el-input>
            </div>
            <div class="addressForm">
              使用时间
              <el-date-picker
                v-model="dateValue" :class="['addressFormInput','addressFormDate',dateValue?'active':'']"
                type="daterange" value-format="timestamp" @blur="submitInfo('date')"
                range-separator="至"  prefix-icon="iconfont iconriqi1"
                start-placeholder="开始日期" :disabled="authId!=1"
                end-placeholder="结束日期">
              </el-date-picker>
            </div>
            <div class="addressForm">
              联系方式
              <el-input @blur="submitInfo('contact')"
                placeholder="请输入联系方式" :disabled="authId!=1"
                v-model="toolInfo.contact" @input="numCheck($event,'contact')"
                clearable class="addressFormInput">
              </el-input>
            </div>
          </div>
        </div>
      </div>
      <el-collapse class="toolsCollapse" v-model="activeCollapse">
        <el-collapse-item  name="1">
          <template slot="title">
            <div class="toolsInfoTitle">
              <div class="toolsInfoTitleBorder"></div>
              <span class="toolsInfoTitleTxt">道具照片&#12288;</span>
              <div class="toolsInfoTitleHr"></div>
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
              ＋添加道具图
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
      title="添加道具"
      :visible.sync="addToolDialog"
      width="480px" center class="addDialog">
      <div class="addressFormBox">
        <div class="addressForm">
          道具名称<span class="addressFormSign">*</span>
          <el-input
            placeholder="请输入道具名称"
            v-model="addToolInfo.tool_name"
            clearable class="addressFormInput">
          </el-input>
        </div>
        <div class="addressForm">
          道具备注
          <el-input
            placeholder="请输入道具备注"
            v-model="addToolInfo.remark" maxlength="30"
            clearable class="addressFormInput">
          </el-input>
        </div>
      </div>
      <div class="addDialogFooter">
        <div class="addFooterBtn" @click="addTool">创建</div>
        <div class="addFooterBtn" @click="addToolDialog = false">取消</div>
      </div>
    </el-dialog>
    <el-dialog
      title="添加道具照片"
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
    name: "tools",
    data(){
      return{
        activeIndex: '1',
        searchScene:'',//场景搜索
        pages_num:1,//场景页数
        toolsList:[],//场景列表
        toolsInfoTitleTxt:'迎泽公园',
        dateValue:'',
        useType:'1',
        addToolDialog:false,//添加道具弹框
        addPhotoDialog:false,//添加照片弹框
        activeCollapse:'1',//折叠面板展开项
        photo: [],//道具图片
        detailImg:'',
        method:'1',//排序方式1降0升
        order_field:'1',//排序字段0名称1次数
        addToolInfo:{
          play_id : this.$route.query.play_id,
          tool_name: '',
          remark:'',
        },//添加道具
        toolInfo:{},//道具信息
        imageUrl:'',//图片路径
        toolId:"",//道具id
        mainPhoto:'',//主图
        addPhotoInfo:{
          photo_name:'',
          path:'',
          tool_id:''
        },//添加照片信息
        host:global_.pathInfo,
        addId:'',//新增id
        authId:0,//权限信息
        noAccess:false,//无权限弹框
      }
    },
    methods: {
      //道具搜索
      getSearch(){
        axios.get('/manage/tool/find_tool_keyword', {
          params: {
            order_field:this.order_field,
            method : this.method,
            play_id: this.$route.query.play_id,
            keyword:this.searchScene
          }
        }).then((response) => {
          if (response.data.ret == '0') {
            if(response.data.data){
              for (var i = 0; i < response.data.data.length; i++) {
                response.data.data[i].visible = false;
              }
              this.toolsList = response.data.data
              this.$nextTick(() => {
                this.handleChange(0)
              })
            }else{
              this.toolsList = []
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
          this.toolName()
        })
      },
      //数字验证
      numCheck(v,form){
        if(form == 'contact'){
          this.toolInfo.contact = v.match(/\d/ig) ? v.match(/\d/ig).join('') : ''
        }
      },
      //拿道具名称
      toolName() {
        axios.get('/manage/tool/find_summary_msg', {
          params: {
            order_field: this.order_field,
            method : this.method,
            play_id: this.$route.query.play_id
          }
        }).then((response) => {
          if (response.data.ret == '0') {
            if(response.data.data){
              for (var i = 0; i < response.data.data.length; i++) {
                response.data.data[i].visible = false;
              }
              this.toolsList = response.data.data
              this.$nextTick(() => {
                if(this.addId){
                  let index = this.toolsList.findIndex(d => d.tool_id == this.addId);
                  this.handleChange(index);
                }else{
                  this.handleChange(0)
                }
              })
            }else{
              this.toolsList = []
            }
          }
        })
      },
      //选中场景样式以及数据获取
      handleChange(val,e) {
        if(this.toolsList[val]){
          this.toolId = this.toolsList[val].tool_id;
          $('.toolsLeftContentBox .toolsLeftContent').eq(val).addClass("active").siblings().removeClass("active");
          if(val != 0){
            $(".toolsLeftContentBox").animate({scrollTop:$('.toolsLeftContentBox .toolsLeftContent').eq(val).offset().top - $(".toolsLeftContentBox").offset().top + $(".toolsLeftContentBox").scrollTop()},800);
          }
          this.addId = '';
          axios.get('/manage/tool/find_one', {
            params: {
              tool_id: this.toolsList[val].tool_id,
            }
          }).then((response)=> {
            this.getPhoto();
            if(response.data.ret=='0'){
              if(response.data.data.use_method != undefined){
                response.data.data.use_method = response.data.data.use_method.toString()
              }
              this.toolInfo = response.data.data
              if(response.data.data.start_date){
                this.dateValue = [response.data.data.start_date*1000,response.data.data.end_date*1000]
              }
            }
          })
        }
      },
      //添加道具
      addTool(){
        if(this.addToolInfo.tool_name){
          this.addToolDialog = false
          axios({
            method: 'post',
            url: '/manage/tool/add_tool',
            data:this.addToolInfo,
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            transformRequest: [data => Qs.stringify(data)]
          }).then((response)=> {
            if(response.data.ret == '0'){
              this.addId = response.data.data;
              this.toolName()
            }else{
              this.addToolDialog = true
              this.$nextTick( ()=> {
                this.$message(response.data.msg+','+response.data.cause);
              })
            }
          })
        }else{
          this.$message('请填写完整');
        }
      },
      //道具信息修改
      submitInfo(v){
        let formData = new FormData()
        if(v == 'date'){
          formData.append('start_date',this.dateValue[0]/1000)
          formData.append('end_date',this.dateValue[1]/1000)
        }else{
          let str = eval('this.toolInfo.'+v)
          formData.append(v,str);
        }
        if(v != 'tool_name'){
          formData.append('tool_name',this.toolInfo.tool_name);
        }
        formData.append('tool_id',this.toolInfo.tool_id);
        axios({
          method: 'post',
          url: '/manage/tool/update',
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
      //懒加载
      nexts(){
        this.pages_num++;
        this.toolName();
      },
      //懒加载滚动条
      scroll(){
        // 滚动条距离顶部高度
        let scrollTop = document.getElementById('toolList').scrollTop;
        // 可见区域高度
        let clientHeight = document.getElementById('toolList').clientHeight;
        let scrollHeight = document.getElementById('toolList').scrollHeight;
        if(scrollHeight <= clientHeight + scrollTop ) {
          this.nexts()
        }
      },
      //删除
      dele(i){
        if(this.authId==1){
          this.$confirm('此操作将永久删除该道具, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          }).then(() => {
            axios.get('/manage/tool/delete_one', {
              params: {
                tool_id: this.toolsList[i].tool_id
              }
            }).then((response) => {
              if(response.data.ret == '0'){
                this.toolName()
              }else{
                this.$message(response.data.msg+','+response.data.cause);
              }
            })
          })
        }else{
          document.querySelector("#app").click();
          this.noAccess = true
        }
      },
      //上传限制
      onChange(file) {
        const isJPG = file.raw.type === 'image/jpeg';
        const isPNG = file.raw.type === 'image/png';

        if (!isJPG && !isPNG) {
          this.$message.error('上传凭证图片只能是 JPG/PNG 格式!');
        }
        return isJPG && isPNG;
      },
      //图片上传
      upLoad(file){
        global_.upLoad(file).then((response)=>{
          this.imageUrl = global_.pathInfo+'/files/'+response.data[0]
          this.addPhotoInfo.path = response.data[0]
        })
      },
      //获取照片
      getPhoto(){
        axios.get('/manage/tool/get_all_photo', {
          params: {
            tool_id: this.toolId
          }
        }).then((response) => {
          if (response.data.ret == '0') {
            if(response.data.data.length != 0){
              for(let i=0; i<response.data.data.length; i++){
                response.data.data[i].deleMemberShadow = false
              }
            }
            this.mainPhoto = response.data.data[0]
            this.photo = response.data.data
          }else{
            this.$message(response.data.msg+','+response.data.cause);
          }
        })
      },
      //添加照片
      addPhoto(){
        if(this.addPhotoInfo.photo_name && this.addPhotoInfo.path){
          this.addPhotoInfo.tool_id = this.toolId
          this.addPhotoDialog = false
          axios({
            method: 'post',
            url: '/manage/tool/add_photo',
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
        axios.get('/manage/tool/delete_one_photo', {
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
      this.toolName();
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
    }
  }
</script>

<style scoped>
  *{
    box-sizing: border-box;
  }

  #tools{
    display: flex;
    padding: 10px 20px 0 12px;
  }

  #tools .toolsLeft{
    width: 250px;
    height: calc(100vh - 70px);
    background:rgba(255,255,255,1);
    border:1px solid rgba(231,231,236,1);
    border-radius:4px;
    flex-shrink: 0;
  }

  #tools .toolsLeft .toolsLeftTop{
    border-bottom: 1px solid rgba(210,210,210,0.6);
  }

  #tools .toolsLeft .toolsLeftTitleBox{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    height: 54px;
  }

  #tools .toolsLeft .toolsLeftTitle{
    height: 14px;
    font-size:14px;
    display: flex;
    align-items: center;
    color:rgba(57,63,81,1);
  }

  #tools .toolsLeft .toolsLeftTitle i{
    font-size: 16px;
    color: #8C8BA6;
    margin-right: 7px;
  }

  #tools .toolsLeftAdd{
    font-size:12px;
    color:rgba(108,111,191,1);
    cursor: pointer;
  }

  /*搜索框*/
  #tools .toolsLeft .toolsLeftSearchBox{
    margin: 8px 0 16px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 24px;
    padding: 0 20px;
  }

  #tools .toolsLeft .toolsLeftSearchBox .toolsLeftSearch{
    width: 160px;
    flex-shrink: 0;
  }

  #tools .toolsLeft .toolsLeftSearchBox .sortBox{
    width: 40px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
    height: 20px;
    cursor: pointer;
  }

  #tools .toolsLeft .toolsLeftSearchBox .sortBox .sortDropdownLink{
    font-size:12px;
    color:rgba(98,98,99,1);
    width: 100%;
    display: inline-block;
  }

  #tools .toolsLeft .toolsLeftSearchBox .sortBox .sortDropdownLink i{
    margin-left: 4px;
    font-size: 12px;
  }

  #tools .toolsLeftContentBox{
    height: calc(100% - 104px);
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
  }

  #tools .toolsLeftContentBox .toolsLeftContent{
    display: flex;
    width: 100%;
    height: 102px;
    padding: 12px 12px 12px 7px;
    align-items: center;
    border-left: 2px solid #fff;
    justify-content: space-between;
    background: #fff;
    color: #747885;
    cursor: pointer;
    position: relative;
    border-bottom: 1px solid rgba(210,210,210,0.6);
  }

  #tools .toolsLeftContentBox .toolsLeftContent:last-of-type{
    border-bottom: none;
  }

  #tools .toolsLeftContentBox .toolsLeftContent:hover,
  #tools .toolsLeftContentBox .toolsLeftContent.active{
    background: #EBEBF0;
    border-left-color: #6C6FBF;
  }

  #tools .toolsLeftContentBox .toolsContentNull{
    padding: 0;
    color: rgba(0,0,0,.6);
    justify-content: center;
  }

  #tools .toolsLeftContentBox .toolsContentInfo{
    display: flex;
    align-items: center;
  }

  #tools .toolsLeftContentBox .toolsContentInfo .toolsContentLeft{
    width:86px;
    height:78px;
    border-radius:2px;
    margin-right: 10px;
  }

  #tools .toolsLeftContentBox .toolsContentInfo div.toolsContentLeft{
    background:rgba(57,63,81,0.3);
    text-align: center;
  }

  #tools .toolsLeftContentBox .toolsContentInfo div.toolsContentLeft i{
    font-size: 28px;
    color: #fff;
    line-height: 78px;
  }

  #tools .toolsLeftContentBox .toolsContentInfo .toolsContentRight{
    width: 110px;
  }

  #tools .toolsLeftContentBox .toolsLeftContent .toolsContentTitle{
    font-size:14px;
    color:rgba(57,63,81,1);
    line-height: 14px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }

  #tools .toolsLeftContentBox .toolsLeftContent .toolsContentDesc,
  #tools .toolsLeftContentBox .toolsLeftContent .toolsContentNum{
    font-size:12px;
    color:rgba(57,63,81,1);
    margin-top: 12px;
    line-height: 12px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }

  #tools .toolsLeftContentBox .toolsLeftContent .toolsContentRight span{
    font-size:12px;
    color:rgba(57,63,81,0.6);
    line-height: 12px;
  }

  #tools .toolsLeftContentBox .toolsLeftContent .toolsContentDesc i{
    color: #EF6F70;
    opacity:0.8;
    font-size: 14px;
    margin-right: 8px;
  }

  /*右侧*/
  #tools .toolsRight{
    width: calc(100% - 260px);
    height: calc(100vh - 70px);
    overflow-y: scroll;
    margin-left: 12px;
    background: #fff;
    border-radius: 4px;
    border:1px solid rgba(231,231,236,1);
    padding: 16px 30px 20px 20px;
  }

  #tools .toolsInfoTitle{
    display: flex;
    align-items: center;
    height: 25px;
    width: 100%;
  }

  #tools .toolsInfoTitle .toolsInfoTitleBorder{
    width:4px;
    height:14px;
    background:rgba(50,197,143,1);
    margin-right: 6px;
  }

  #tools .toolsInfoTitle .toolsInfoTitleTxt{
    font-size:14px;
    color:rgba(57,63,81,1);
    flex-shrink: 0;
  }

  #tools .toolsInfoTitle .toolsInfoTitleHr{
    width: calc(100% - 96px);
    height: 1px;
    background: rgba(226,226,233,1);
    margin-left: 30px;
  }

  #tools .toolsInfoTitle .toolsInfoInput{
    width: 200px;
  }

  #tools .toolInfoContent{
    display: flex;
    padding-left: 10px;
    margin-top: 20px;
  }

  #tools .toolInfoContent .toolsInfoLeft{
    width:300px;
    height:200px;
    border-radius:2px;
    flex-shrink: 0;
    margin-right: 30px;
    object-fit: cover;
  }

  #tools .toolInfoContent div.toolsInfoLeft{
    background:rgba(57,63,81,0.3);
    text-align: center;
    cursor: pointer;
  }

  #tools .toolInfoContent div.toolsInfoLeft i{
    font-size: 58px;
    color: #fff;
    line-height: 200px;
  }

  #tools .addressFormBox{
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    width: calc(100% - 460px);
  }

  #tools .addressFormBox .addressForm{
    font-size:12px;
    color:rgba(97,101,116,1);
    width: 400px;
    flex-shrink: 0;
    margin:0 0 20px 0;
  }

  #tools .addressFormBox .addressForm:nth-child(3n){
    margin-right: 0;
  }

  #tools .addressFormBox .addressForm .addressFormSign{
    color: #F05050;
    margin-left: 4px;
    font-size: 12px;
  }

  /*单选框组*/
  #tools .addressForm .addressFormRadio{
    margin-top: 12px;
    display: block;
  }

  /*日期选择器*/
  #tools .addressForm .addressFormDate{
    width: 400px;
    border-radius: 0;
    border: none;
    border-bottom: 1px solid rgba(210,210,210,0.6);
    height: 36px;
    padding-left: 6px;
  }

  #tools .addressForm .addressFormDate.is-active{
    border-color: rgba(255,105,14,0.6);
  }

  /*折叠面板*/
  #tools .toolsCollapse{
    border: none;
    margin-top: 60px;
  }

  /*气氛图*/
  /*删除阴影框*/
  #tools .photoDeleShadow{
    position: absolute;
    width: 100%;
    height: 100%;
    background:rgba(0,0,0,.7);
    top: 0;
    left: 0;
    z-index: 5;
  }

  #tools .photoDeleShadow .photoDeleText{
    font-size:12px;
    color:rgba(255,255,255,1);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 72px;
  }

  #tools .photoDeleShadow .photoDeleText i{
    margin-right: 8px;
  }

  #tools .photoDeleShadow .photoDeleFooter{
    width: 100%;
    height: 24px;
    display: flex;
    align-items: center;
    position: absolute;
    bottom: 0;
  }

  #tools .photoDeleShadow .photoDeleFooter .photoDeleBtn{
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

  #tools .photoDeleShadow .photoDeleFooter .photoDeleBtn:first-of-type{
    opacity: 0.6;
  }

  #tools .photoTitle{
    display: flex;
    align-items: center;
    height: 25px;
  }

  #tools .photoTitle .photoTitleBorder{
    width:4px;
    height:14px;
    background:rgba(50,197,143,1);
    margin-right: 6px;
  }

  #tools .photoTitle .photoTitleTxt{
    font-size:14px;
    color:rgba(57,63,81,1);
    flex-shrink: 0;
  }

  #tools .photoInfoBox{
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-top: 20px;
    padding-left: 10px;
  }

  #tools .photoInfo{
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

  #tools .photoInfo>img{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  #tools .photoInfo .photoInfoDesc{
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

  #tools .photoInfo .photoInfoBtnBox{
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

  #tools .photoInfo:hover .photoInfoDesc{
    opacity: 0;
  }

  #tools .photoInfo:hover .photoInfoBtnBox{
    opacity: 1;
  }

  #tools .photoInfo .photoInfoBtnBox .photoInfoBtn{
    width: 50%;
    flex-shrink: 0;
    height: 100%;
    background:rgba(50,197,143,1);
    text-align: center;
    opacity:0.96;
    color: #fff;
    cursor: pointer;
  }

  #tools .photoInfo .photoInfoBtnBox .photoInfoBtn:first-of-type{
    background: rgba(240,80,80,1);
  }

  #tools .photoInfo .photoInfoBtnBox .photoInfoBtn i{
    line-height: 42px;
    font-size: 18px;
  }

  #tools .photoAdd{
    border:1px solid rgba(136,135,162,0.3);
    justify-content: center;
    flex-direction: column;
    color:rgba(57,63,81,0.8);
    font-size: 12px;
    cursor: pointer;
  }

  #tools .photoAdd i{
    color:rgba(57,63,81,0.8);
    font-size: 28px;
    margin-bottom: 6px;
    display: inline-block;
    cursor: pointer;
  }

  #tools .detailImgBox{
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

  #tools .detailImgBox>img{
    margin: 0 auto;
    object-fit: contain;
    width: 100%;
    height: 100%;
  }

  #tools .detailImgBox .detailImgClose{
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
  #tools .addDialog .addressFormBox{
    padding: 0 40px;
    margin-top: 20px;
  }

  #tools .addDialog .addDialogFooter{
    width: 100%;
    height: 75px;
    border-top: 1px solid rgba(180,180,180,0.2);
    margin-top: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  #tools .addDialog .addDialogFooter .addFooterBtn{
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

  #tools .addDialog .addDialogFooter .addFooterBtn:last-of-type{
    border:1px solid rgba(186,186,186,1);
    background: #fff;
    margin-left: 36px;
    color: rgba(0,0,0,.8);
  }

  /*弹框上传*/
  #tools .photoAddBox{
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

  #tools .photoAddBox .uploadBox{
    font-size: 12px;
    color:rgba(97,101,116,1);
  }

  #tools .photoAddBox .uploadBox span{
    font-size: 12px;
    color: #6C6FBF;
  }

  #tools .photoAddBox .uploadBox i{
    font-size: 28px;
  }

  #tools .photoAddBox img.avatar{
    max-width:290px;
    overflow: hidden;
    height:190px;
    border:1px solid rgba(136,135,162,0.3);
    border-radius:2px;
  }

  #tools .addPhotoDialog .addressFormBox{
    width: 290px;
    margin: 30px auto;
    padding: 0;
  }

  #tools .addPhotoDialog .addressFormBox .addressForm{
    font-size:12px;
    color:rgba(97,101,116,1);
    width: 290px;
  }
</style>
<style>
  /*左侧搜索框*/
  #tools .toolsLeft .toolsLeftSearchBox .toolsLeftSearch .el-input__inner{
    height: 24px;
    padding: 0 12px;
    border-radius:12px 0 0 12px;
    width: 127px;
    font-size:12px;
    border-right: none;
  }

  #tools .toolsLeft .toolsLeftSearchBox .toolsLeftSearch .el-input-group__append{
    border-radius:0 12px 12px 0;
    width: 33px;
    padding: 0;
    height: 24px;
    background:rgba(237,149,21,1);
    border: none;
  }

  #tools .toolsLeft .toolsLeftSearchBox .toolsLeftSearch .el-button{
    width: 33px;
    padding: 0;
    height: 22px;
    margin: 0;
  }

  #tools .toolsLeft .toolsLeftSearchBox .toolsLeftSearch .el-button i{
    font-size: 14px;
    color: #fff;
  }

  /*左侧菜单栏*/
  .toolsLeftBtnBox{
    padding: 0 14px;
    min-width: 116px;
  }

  .toolsLeftBtnBox .toolsLeftBtn{
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

  .toolsLeftBtnBox .toolsLeftBtn i{
    color: #EB5252;
  }

  /*title输入框*/
  #tools .toolsInfoTitle .toolsInfoInput .el-input__inner{
    height: 25px;
    padding-left: 5px;
    font-size:14px;
    color:rgba(57,63,81,1);
    border-radius: 0;
    border: none;
    border-bottom: 1px solid rgba(210,210,210,0.6);
  }

  #tools .toolsInfoTitle .toolsInfoInput .el-input__inner:focus{
    border-color: rgba(255,105,14,0.6);
  }

  #tools .toolsInfoTitle .toolsInfoInput .el-input__suffix i{
    line-height: 26px;
  }

  /*信息输入框*/
  #tools .addressForm .addressFormInput .el-input__inner{
    height: 36px;
    border-radius: 0;
    border: none;
    border-bottom: 1px solid rgba(210,210,210,0.6);
    font-size:12px;
    color:rgba(57,63,81,1);
  }

  #tools .addressForm .addressFormInput:not(.addressFormMap) .el-input__inner{
    padding-left: 0;
  }

  #tools .addressForm .addressFormInput .el-input__inner:focus{
    border-color: rgba(255,105,14,0.6);
  }

  #tools .addressForm .addressFormInput .el-input__prefix i{
    line-height: 36px;
    transition: color 1s;
  }

  #tools .addressForm .addressFormInput .el-input__suffix i{
    line-height: 40px;
  }

  #tools .addressForm .addressFormInput .el-input__prefix i.active{
    color: #EE7373;
  }

  /*日期选择器*/
  #tools .addressForm .addressFormDate .el-input__icon{
    transition: color 1s;
    line-height: 36px;
  }

  #tools .addressForm .addressFormDate.active .el-range__icon{
    color: #EE7373;
  }

  #tools .addressForm .addressFormDate .el-range-input,
  #tools .addressForm .addressFormDate .el-range-separator{
    font-size: 12px;
    color:rgba(57,63,81,1);
    line-height: 36px;
  }

  #tools .addressForm .addressFormDate .el-range-input{
    padding-top: 5.5px;
  }


  /*单选组*/
  #tools .addressForm .addressFormRadio .el-radio{
    width: 74px;
    margin: 0 22px 0 0;
    padding: 0;
    height: 24px;
    border:1px solid rgba(136,135,162,0.4);
    border-radius:12px;
    transition: background 0.5s;
    cursor: pointer;
  }

  #tools .addressForm .addressFormRadio .el-radio.is-checked{
    background: rgba(237,149,21,1);
    border-color: rgba(237,149,21,1);
  }

  #tools .addressForm .addressFormRadio .el-radio__input{
    display: none;
  }

  #tools .addressForm .addressFormRadio .el-radio__label{
    padding-left: 0;
    width: 72px;
    line-height: 22px;
    text-align: center;
    display: inline-block;
    font-size:12px;
    color:rgba(57,63,81,1);
    transition: color 0.5s;
  }

  #tools .addressForm .addressFormRadio .el-radio.is-checked .el-radio__label{
    color: #fff;
  }

  /*折叠面板*/
  #tools .toolsCollapse .el-collapse-item__header{
    border: none;
    position: relative;
  }

  #tools .toolsCollapse .el-collapse-item__arrow{
    position: absolute;
    left: 76px;
    color: rgba(57,63,81,1);
  }

  #tools .toolsCollapse .el-collapse-item__wrap{
    border-bottom: none;
  }

  /*图片上传*/
  #tools .photoAdd .el-upload-list{
    display: none;
  }


  /*弹框表单*/
  #tools .addDialog .el-dialog .el-dialog__header{
    height: 54px;
    padding: 0;
  }

  #tools .addDialog .el-dialog .el-dialog__header .el-dialog__title{
    font-size: 14px;
    line-height: 54px;
    height: 54px;
  }

  #tools .addDialog .el-dialog .el-dialog__header .el-dialog__headerbtn{
    top: 15px;
    right: 36px;
  }

  #tools .addDialog .el-dialog .el-dialog__header .el-dialog__headerbtn>i{
    font-size: 16px;
    line-height: 16px;
    font-weight: bold;
  }

  #tools .addDialog .el-dialog__body{
    padding: 0;
    overflow: hidden;
  }


  /*上传弹框*/
  #tools .photoAddBox .el-upload{
    font-size: 12px;
    color:rgba(97,101,116,1);
  }

  #tools .photoAddBox .el-upload span{
    font-size: 12px;
    color: #6C6FBF;
  }
</style>
