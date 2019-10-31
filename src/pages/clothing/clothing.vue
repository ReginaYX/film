<template>
  <div id="clothing">
    <div class="clothingLeft">
      <div class="clothingLeftTop">
        <div class="clothingLeftTitleBox">
          <div class="clothingLeftTitle">
            <i class="iconfont iconjiaose"></i>角色列表
          </div>
        </div>
        <div class="clothingLeftSearchBox">
          <el-input placeholder="请输入查找内容" v-model="searchScene" class="clothingLeftSearch" @keyup.enter.native="getSearch">
            <el-button slot="append" icon="iconfont iconsousuo" @click="getSearch"></el-button>
          </el-input>
          <div class="sortBox">
            <el-dropdown trigger="click" @command="sortChange" placement="bottom-start">
              <span class="sortDropdownLink" v-if="order_field =='0'">
                名称<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <span class="sortDropdownLink" v-else>
                次数<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown" class="sortDropBox">
                <el-dropdown-item :class="['dropItem',order_field =='1'?'active':'']" command="1">次数 <i class="el-icon-check"></i></el-dropdown-item>
                <el-dropdown-item :class="['dropItem',order_field =='0'?'active':'']" command="0">名称<i class="el-icon-check"></i></el-dropdown-item>
                <el-dropdown-item divided :class="['dropItem',method =='0'?'active':'']" command="2">升序<i class="el-icon-check"></i></el-dropdown-item>
                <el-dropdown-item :class="['dropItem',method =='1'?'active':'']" command="3">降序<i class="el-icon-check"></i></el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>

      </div>
      <div class="clothingLeftContentBox" id="toolList">
        <div class="clothingLeftContent clothingContentNull" v-if='actorList.length == 0'>暂无数据</div>
        <div class="clothingLeftContent" v-for="item,index in actorList" :key="index" @click="handleChange(index,$event)" v-else>
          <div class="clothingContentInfo">
            <img class="clothingContentLeft" :src="host+'/files/'+item.photo.path" alt="" v-if="item.photo">
            <div class="clothingContentLeft" v-else><i class="iconfont iconnan"></i></div>
            <div class="clothingContentRight">
              <el-input v-model="item.role_name" placeholder="请输入名称" v-if="item.input == true" class="clothingLeftInput" autofocus @blur="submitRename(item)"></el-input>
              <div class="clothingContentTitle" v-else>{{item.role_name}}</div>
              <div class="clothingContentNum">性别：
                <span v-if="item.sex == '1'">男</span><span v-else-if="item.sex == '2'">女</span><span v-else>暂无</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="clothingRight">
      <keep-alive>
        <router-view @getPhoto="actorsName"></router-view>
      </keep-alive>
    </div>
    <el-dialog
      title="添加角色"
      :visible.sync="addDialog"
      width="480px" center class="addDialog">
      <div class="addressFormBox">
        <div class="addressForm">
          角色名称<span class="addressFormSign">*</span>
          <el-input
            placeholder="请输入角色名称"
            v-model="addActorInfo.role_name"
            clearable class="addressFormInput">
          </el-input>
        </div>
        <div class="addressForm">
          演员姓名
          <el-input
            placeholder="请输入演员姓名  "
            v-model="addActorInfo.actor_name" maxlength="30"
            clearable class="addressFormInput">
          </el-input>
        </div>
        <div class="addressForm">
          性别
          <el-radio-group v-model="addActorInfo.sex" size="small" class="addressFormRadio">
            <el-radio label="1"><i class="iconfont iconnan"></i></el-radio>
            <el-radio label="2"><i class="iconfont iconnv"></i></el-radio>
          </el-radio-group>
        </div>
      </div>
      <div class="addDialogFooter">
        <div class="addFooterBtn" @click="addActor">创建</div>
        <div class="addFooterBtn" @click="addDialog = false">取消</div>
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
      name: "clothing",
      data(){
        return{
          activeIndex: '1',
          searchScene:'',//场景搜索
          pages_num:1,//场景页数
          actorList:[],//场景列表
          addDialog:false,//添加角色弹框
          toolsInfoTitleTxt:'',
          sex:'1',//性别选择
          method:'1',//排序方式1降0升
          order_field:'1',//排序字段0名称1次数
          addActorInfo:{
            play_id: this.$route.query.play_id,
            role_name: '',
            actor_name:'',
            sex:'',
          },//添加角色表单
          host:global_.pathInfo,
          addId:'',//新增id
          authId:0,//权限信息
          noAccess:false,//无权限弹框
        }
      },
      methods: {
        //演员搜索
        getSearch(){
          axios.get('/manage/actor/search_by_role_name', {
            params: {
              order_field: this.order_field,
              method : this.method,
              play_id: this.$route.query.play_id,
              keyword:this.searchScene
            }
          }).then((response) => {
            if (response.data.ret == '0') {
              if(response.data.data){
                this.actorList = response.data.data
                this.$nextTick(() => {
                  this.handleChange(0)
                })
              }else{
                this.actorList = []
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
            this.actorsName()
          })
        },
        //拿演员名称
        actorsName(v) {
          axios.get('/manage/actor/get_all_actor', {
            params: {
              order_field: this.order_field,
              method : this.method,
              play_id: this.$route.query.play_id
            }
          }).then((response) => {
            if (response.data.ret == '0') {
              for (var i = 0; i < response.data.data.length; i++) {
                response.data.data.visible = false
              }
              this.actorList = response.data.data
              this.$nextTick(() => {
                if(this.addId){
                  let index = this.actorList.findIndex(d => d.actor_id == this.addId);
                  this.handleChange(index);
                }else if(v){
                  return
                }else{
                  this.handleChange(0)
                }
              })
            }
          })
        },
        //选中场景样式以及数据获取
        handleChange(val,e) {
          $('.clothingLeftContentBox .clothingLeftContent').eq(val).addClass("active").siblings().removeClass("active");
          if(val != 0){
            $(".clothingLeftContentBox").animate({scrollTop:$('.clothingLeftContentBox .clothingLeftContent').eq(val).offset().top - $(".clothingLeftContentBox").offset().top + $(".clothingLeftContentBox").scrollTop()},800);
          }
          this.addId = '';
          this.$router.push('/details/clothing/info?play_id='+this.$route.query.play_id+'&project_id='+this.$route.query.project_id+'&id='+this.actorList[val].actor_id)

        },
        //懒加载
        nexts(){
          this.pages_num++;
          this.actorsName();
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
        //重命名
        rename(v){
          if(this.authId==1){
            if(v.input != true){
              v.visible = !v.visible
              v.input = true
            }else{
              v.visible = !v.visible
            }
          }else{
            document.querySelector("#app").click();
            this.noAccess = true
          }

        },
        //提交重命名
        submitRename(v){
          if(v.role_name != ''){
            v.input = false
            delete v.input
            delete v.visible
            axios({
              method: 'post',
              url: '/manage/actor/update_actor',
              data:v,
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
              },
              transformRequest: [data => Qs.stringify(data)]
            }).then((response)=> {
              if(response.data.ret == '0'){
                this.actorsName()
              }else{
                this.$message(response.data.msg+','+response.data.cause);
              }
            })
          }else{
            this.$message('请输入角色名称');
          }
        },
        //删除
        dele(i){
          if(this.authId==1){
            this.$confirm('此操作将永久删除该演员, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消'
            }).then(() => {
              axios.get('/manage/actor/delete_all', {
                params: {
                  actor_id : this.actorList[i].actor_id
                }
              }).then((response) => {
                if(response.data.ret == '0'){
                  this.actorsName()
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
        //添加场景
        addActor(){
          if(this.addActorInfo.role_name){
            this.addDialog = false
            axios({
              method: 'post',
              url: '/manage/actor/add_role_name',
              data:this.addActorInfo,
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
              },
              transformRequest: [data => Qs.stringify(data)]
            }).then((response)=> {
              if(response.data.ret == '0'){
                this.addId = response.data.data;
                this.actorsName()
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
      },
      mounted(){
        this.actorsName();
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
    }
</script>

<style scoped>
  *{
    box-sizing: border-box;
  }

  #clothing{
    display: flex;
    padding: 10px 20px 0 12px;
  }

  #clothing .clothingLeft{
    width: 250px;
    height: calc(100vh - 70px);
    background:rgba(255,255,255,1);
    border:1px solid rgba(231,231,236,1);
    border-radius:4px;
    flex-shrink: 0;
  }

  #clothing .clothingLeft .clothingLeftTop{
    border-bottom: 1px solid rgba(210,210,210,0.6);
  }

  #clothing .clothingLeft .clothingLeftTitleBox{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    height: 54px;
  }

  #clothing .clothingLeft .clothingLeftTitle{
    height: 14px;
    font-size:14px;
    display: flex;
    align-items: center;
    color:rgba(57,63,81,1);
  }

  #clothing .clothingLeft .clothingLeftTitle i{
    font-size: 16px;
    color: #8C8BA6;
    margin-right: 7px;
  }

  #clothing .clothingLeftAdd{
    font-size:12px;
    color:rgba(108,111,191,1);
    cursor: pointer;
  }

  /*搜索框*/
  #clothing .clothingLeft .clothingLeftSearchBox{
    margin: 8px 0 16px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 24px;
    padding: 0 20px;
  }

  #clothing .clothingLeft .clothingLeftSearchBox .clothingLeftSearch{
    width: 160px;
    flex-shrink: 0;
  }

  #clothing .clothingLeft .clothingLeftSearchBox .sortBox{
    width: 40px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
    height: 20px;
    cursor: pointer;
  }

  #clothing .clothingLeft .clothingLeftSearchBox .sortBox .sortDropdownLink{
    font-size:12px;
    color:rgba(98,98,99,1);
    width: 100%;
    display: inline-block;
  }

  #clothing .clothingLeft .clothingLeftSearchBox .sortBox .sortDropdownLink i{
    margin-left: 4px;
    font-size: 12px;
  }

  #clothing .clothingLeftContentBox{
    height: calc(100% - 104px);
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
  }

  #clothing .clothingLeftContentBox .clothingLeftContent{
    display: flex;
    width: 100%;
    height: 94px;
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

  #clothing .clothingLeftContentBox .clothingLeftContent:last-of-type{
    border-bottom: none;
  }

  #clothing .clothingLeftContentBox .clothingLeftContent:hover,
  #clothing .clothingLeftContentBox .clothingLeftContent.active{
    background: #EBEBF0;
    border-left-color: #6C6FBF;
  }

  #clothing .clothingLeftContentBox .clothingContentNull{
    padding: 0;
    color: rgba(0,0,0,.6);
    justify-content: center;
  }

  #clothing .clothingLeftContentBox .clothingContentInfo{
    display: flex;
    align-items: center;
  }

  #clothing .clothingLeftContentBox .clothingContentInfo .clothingContentLeft{
    width:86px;
    height:70px;
    border-radius:2px;
    margin-right: 10px;
  }

  #clothing .clothingLeftContentBox .clothingContentInfo img.clothingContentLeft{
    object-fit:cover;
  }

  #clothing .clothingLeftContentBox .clothingContentInfo div.clothingContentLeft{
    background:rgba(57,63,81,0.3);
    text-align: center;
  }

  #clothing .clothingLeftContentBox .clothingContentInfo div.clothingContentLeft i{
    font-size: 28px;
    color: #fff;
    line-height: 70px;
  }

  #clothing .clothingLeftContentBox .clothingContentInfo .clothingContentRight{
    width: 110px;
  }

  #clothing .clothingLeftContentBox .clothingLeftContent .clothingContentTitle{
    font-size:14px;
    color:rgba(57,63,81,1);
    line-height: 14px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }

  /*左侧输入框*/
  #clothing .clothingLeftContentBox .clothingLeftInput{
    width: 100px;
  }

  #clothing .clothingLeftContentBox .clothingLeftContent .clothingContentDesc,
  #clothing .clothingLeftContentBox .clothingLeftContent .clothingContentNum{
    font-size:12px;
    color:rgba(57,63,81,1);
    margin-top: 20px;
    line-height: 12px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }

  #clothing .clothingLeftContentBox .clothingLeftContent .clothingContentRight span{
    font-size:12px;
    color:rgba(57,63,81,0.6);
    line-height: 12px;
  }

  #clothing .clothingLeftContentBox .clothingLeftContent .clothingContentDesc i{
    color: #EF6F70;
    opacity:0.8;
    font-size: 14px;
    margin-right: 8px;
  }

  /*右侧*/
  #clothing .clothingRight{
    width: calc(100% - 260px);
    height: calc(100vh - 70px);
    overflow-y: scroll;
    margin-left: 12px;
    background: #fff;
    border-radius: 4px;
    border:1px solid rgba(231,231,236,1);
    padding: 16px 30px 20px 20px;
  }

  /*弹框表单*/
  #clothing .addDialog .addressFormBox{
    padding: 0 40px;
    margin-top: 20px;
  }

  #clothing .addressFormBox{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 10px;
    flex-wrap: wrap;
    width: calc(100% - 460px);
  }

  #clothing .addressFormBox .addressForm{
    font-size:12px;
    color:rgba(97,101,116,1);
    width: 400px;
    flex-shrink: 0;
    margin:0 0 20px 0;
  }

  #clothing .addressFormBox .addressForm:nth-child(3n){
    margin-right: 0;
  }

  #clothing .addressFormBox .addressForm .addressFormSign{
    color: #F05050;
    margin-left: 4px;
  }
  
  /*单选框组*/
  #clothing .addressForm .addressFormRadio{
    margin-left: 80px;
    display: block;
  }

  #clothing .addDialog .addDialogFooter{
    width: 100%;
    height: 75px;
    border-top: 1px solid rgba(180,180,180,0.2);
    margin-top: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  #clothing .addDialog .addDialogFooter .addFooterBtn{
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

  #clothing .addDialog .addDialogFooter .addFooterBtn:last-of-type{
    border:1px solid rgba(186,186,186,1);
    background: #fff;
    margin-left: 36px;
    color: rgba(0,0,0,.8);
  }
</style>
<style>
  /*左侧搜索框*/
  #clothing .clothingLeft .clothingLeftSearchBox .clothingLeftSearch .el-input__inner{
    height: 24px;
    padding: 0 12px;
    border-radius:12px 0 0 12px;
    width: 127px;
    font-size:12px;
    border-right: none;
  }

  #clothing .clothingLeft .clothingLeftSearchBox .clothingLeftSearch .el-input-group__append{
    border-radius:0 12px 12px 0;
    width: 33px;
    padding: 0;
    height: 24px;
    background:rgba(237,149,21,1);
    border: none;
  }

  #clothing .clothingLeft .clothingLeftSearchBox .clothingLeftSearch .el-button{
    width: 33px;
    padding: 0;
    height: 22px;
    margin: 0;
  }

  #clothing .clothingLeft .clothingLeftSearchBox .clothingLeftSearch .el-button i{
    font-size: 14px;
    color: #fff;
  }

  /*左侧输入框*/
  #clothing .clothingLeftContentBox .clothingLeftInput .el-input__inner{
    height: 22px;
    font-size: 12px;
    padding-left: 10px;
  }

  /*左侧菜单栏*/
  .clothingLeftBtnBox{
    padding: 0 14px;
    min-width: 116px;
  }

  .clothingLeftBtnBox .clothingLeftBtn{
    width: 100%;
    height: 44px;
    display: flex;
    align-items: center;
    font-size:12px;
    color:rgba(57,63,81,1);
    justify-content: space-between;
    padding: 0 8px;
    cursor: pointer;
  }

  .clothingLeftBtnBox .clothingLeftBtn:first-of-type{
    border-bottom: 1px solid rgba(210,210,210,0.6);
  }

  .clothingLeftBtnBox .clothingLeftBtn i{
    color: #EB5252;
    font-size: 14px;
  }

  .clothingLeftBtnBox .clothingLeftBtn:first-of-type i{
    color: #32C58F;
    font-size: 16px;
  }


  /*弹框表单*/
  #clothing .addDialog .el-dialog .el-dialog__header{
    height: 54px;
    padding: 0;
  }

  #clothing .addDialog .el-dialog .el-dialog__header .el-dialog__title{
    font-size: 14px;
    line-height: 54px;
    height: 54px;
  }

  #clothing .addDialog .el-dialog .el-dialog__header .el-dialog__headerbtn{
    top: 15px;
    right: 36px;
  }

  #clothing .addDialog .el-dialog .el-dialog__header .el-dialog__headerbtn>i{
    font-size: 16px;
    line-height: 16px;
    font-weight: bold;
  }

  #clothing .addDialog .el-dialog__body{
    padding: 0;
    overflow: hidden;
  }


  /*信息输入框*/
  #clothing .addressForm .addressFormInput .el-input__inner{
    height: 36px;
    border-radius: 0;
    border: none;
    border-bottom: 1px solid rgba(210,210,210,0.6);
    font-size:12px;
    color:rgba(57,63,81,1);
  }

  #clothing .addressForm .addressFormInput:not(.addressFormMap) .el-input__inner{
    padding-left: 0;
  }

  #clothing .addressForm .addressFormInput .el-input__inner:focus{
    border-color: rgba(255,105,14,0.6);
  }
  
  /*单选组*/
  #clothing .addressForm .addressFormRadio .el-radio{
    margin: 0 62px 0 0;
    padding: 0;
    cursor: pointer;
    width: 33px;
    height: 33px;
  }

  #clothing .addressForm .addressFormRadio .el-radio:last-of-type{
    margin: 0;
  }

  #clothing .addressForm .addressFormRadio .el-radio__input{
    display: none;
  }

  #clothing .addressForm .addressFormRadio .el-radio__label{
    padding-left: 0;
    width: 100%;
    height:100%;
    text-align: center;
    display: inline-block;
    transition: color 0.5s;
  }

  #clothing .addressForm .addressFormRadio .el-radio__label i{
    font-size: 33px;
    line-height: 33px;
    color:#B0B2B9;
  }

  #clothing .addressForm .addressFormRadio .el-radio.is-checked .el-radio__label i{
    color: #EB5252;
  }

  #clothing .addressForm .addressFormRadio .el-radio:first-of-type.is-checked .el-radio__label i{
    color: #6C6FBF;
  }
</style>
