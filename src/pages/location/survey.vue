<template>
  <div id="locationSurvey">
    <div class="SurveyTitle">
      <div class="SurveyTitleBorder"></div>
      <span class="SurveyTitleTxt">堪景记录</span>
    </div>
    <div class="SurveyInfoBox">
      <div class="SurveyInfo" v-for="item,index in survey" :key="index">
        <div class="SurveyInfoTop">
          <el-date-picker
            v-model="item.dateValue" class="SurveyInfoDate"
            type="daterange" value-format="timestamp"
            range-separator="至" disabled
            start-placeholder="开始日期" prefix-icon="iconfont iconriqi1"
            end-placeholder="结束日期">
          </el-date-picker>
        </div>
        <div class="SurveyInfoBottom">
          <div class="SurveyInfoTitleBox">
            {{item.location_name}}
            <div class="SurveyInfoBtnBox">
              <div class="SurveyInfoBtn"><i class="iconfont iconbianji1" @click="editSurveyDialog(index)"></i></div>
              <div class="SurveyInfoBtn"><i class="iconfont iconshanchu" @click="()=>{if(authId==1){item.deleMemberShadow = true}else{noAccess = true}}"></i></div>
            </div>
          </div>
          <div class="SurveyInfoContentBox">
            <i class="iconfont iconrenyuan"></i>
            <span class="SurveyInfoName" v-if="item.people[0] != ''" v-for="i in item.people">{{i}}</span>
            <span class="SurveyInfoName" v-else>暂无参与人员</span>
          </div>
        </div>
        <transition name="el-zoom-in-top">
          <div class="SurveyDeleShadow" v-show="item.deleMemberShadow">
            <div class="SurveyDeleText">
              <i class="iconfont icontips-copy"></i>确认删除该地接人员信息
            </div>
            <div class="SurveyDeleFooter">
              <div class="SurveyDeleBtn" @click="item.deleMemberShadow = false">取消</div>
              <div class="SurveyDeleBtn" @click="deleSurvey(index)">确认</div>
            </div>
          </div>
        </transition>
      </div>
      <div class="SurveyInfo SurveyAdd" @click="()=>{if(authId==1){addDialog = true;dialogTitle = '添加堪景信息';}else{noAccess = true}}">
        <i class="iconfont iconjilu"></i><br />
        ＋添加堪景信息
      </div>
    </div>
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
      :title="dialogTitle"
      :visible.sync="addDialog"
      width="480px" center class="addDialog">
      <div class="addFormBox">
        <div class="addForm">
          堪景地名称<span class="addFormSign">*</span>
          <el-input
            placeholder="请输入堪景地名称"
            v-model="addSurveyInfo.location_name"
            clearable class="addFormInput">
          </el-input>
        </div>
        <div class="addForm">
          堪景时间<span class="addFormSign">*</span>
          <el-date-picker
            v-model="addDate" :class="['addFormInput','addFormDate',addDate.length!=0?'active':'']"
            type="daterange" value-format="timestamp"
            range-separator="至"  prefix-icon="iconfont iconriqi1"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </div>
        <div class="addSmallForm">
          <div class="addForm" v-for="item,index in addSurveyInfo.people.length" :key="index">

            <div class="addFormTitle" v-if="index==0">
              参与人员
              <div class="addFormTitleBtn" @click="addSurveyInfo.people.push('')" v-if="addSurveyInfo.people.length<4">+ 添加</div>
            </div>
            <div class="addFormTitle" v-else-if="index == 1">
              &#12288;
            </div>
            <el-input
              placeholder="请输入参与人员姓名"
              v-model="addSurveyInfo.people[index]"
              clearable class="addFormInput">
            </el-input>
          </div>
        </div>
      </div>
      <div class="addDialogFooter">
        <div class="addFooterBtn" v-if="addSurveyInfo.search_id" @click="addSurvey">确认</div>
        <div class="addFooterBtn" v-else @click="addSurvey">创建</div>
        <div class="addFooterBtn" @click="addDialog = false; addDate = [];addSurveyInfo = {shoot_location_id:$route.query.id, people:['']}">取消</div>
      </div>
    </el-dialog>
    <!--无权限弹框-->
    <no-access :noAccessVisible="noAccess" @close="(v)=>{noAccess = v}"></no-access>
  </div>
</template>

<script>
  import axios from "axios"
  import Qs from 'qs'
    export default {
      name: "survey",
      data(){
        return{
          shade:false,//遮罩
          survey:[],
          dateValue:[],
          addDate:[],//添加时间选择
          addDialog:false,//添加弹框
          addSurveyInfo:{
            shoot_location_id:'',
            location_name:'',
            people:[''],
            start_date:'',
            end_date:''
          },//添加信息
          locationInfoTitleTxt:'1',
          dialogTitle:'新增堪景信息',//弹框标题
          authId:0,//权限信息
          noAccess:false,//无权限弹框
        }
      },
      methods: {
        //修改
        editSurveyDialog(i){
          if(this.authId==1){
            this.addSurveyInfo = this.survey[i];
            this.addDate = [this.survey[i].start_date * 1000,this.survey[i].end_date * 1000];
            this.dialogTitle = '编辑堪景信息';
            this.$nextTick( ()=> {
              this.addDialog = true
            })
          }else{
            this.noAccess = true
          }
        },
        //获取堪景记录
        getSurvey(){
          if(this.$route.query.id){
            axios.get('/manage/search/find_all', {
              params: {
                shoot_location_id : this.$route.query.id
              }
            }).then((response) => {
              if (response.data.ret == '0') {
                for(let i=0;i<response.data.data.length;i++){
                  if(response.data.data[i].people){
                    if(response.data.data[i].people.length != 0){
                      response.data.data[i].people = response.data.data[i].people.split(',')
                    }else{
                      response.data.data[i].people = ['']
                    }
                  }else{
                    response.data.data[i].people = ['']
                  }
                  response.data.data[i].deleMemberShadow = false;
                  if(response.data.data[i].start_date){
                    response.data.data[i].dateValue = [response.data.data[i].start_date*1000,response.data.data[i].end_date*1000]
                  }
                }
                this.survey = response.data.data
              }
            })
          }else{
            this.survey = []
          }

        },
        //添加堪景信息
        addSurvey(){
          if(this.addSurveyInfo.location_name && this.addDate.length!= 0){
            this.addSurveyInfo.shoot_location_id = this.$route.query.id;
            if(this.addSurveyInfo.people.length!=0){
              let add = [];
              for(let i=0;i<this.addSurveyInfo.people.length;i++){
                if(this.addSurveyInfo.people[i] != ''){
                  add.push(this.addSurveyInfo.people[i])
                }
              }
              this.addSurveyInfo.people = add.join(',')
            }else{
              this.addSurveyInfo.people = ''
            }
            if(this.addSurveyInfo.search_id){
              delete this.addSurveyInfo.updated_at
              delete this.addSurveyInfo.created_at
              delete this.addSurveyInfo.dateValue
            }
            this.addDialog = false
            this.addSurveyInfo.start_date = this.addDate[0]/1000;
            this.addSurveyInfo.end_date = this.addDate[1]/1000;
            axios({
              method: 'post',
              url: '/manage/search/update_location_search',
              data:this.addSurveyInfo,
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
              },
              transformRequest: [data => Qs.stringify(data)]
            }).then((response)=> {
              if(response.data.ret == '0'){
                this.getSurvey();
                this.addDate = [];//添加时间选择
                this.addSurveyInfo = {shoot_location_id:this.$route.query.id, people:['']}
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
        //删除地接人信息
        deleSurvey(i){
          if(this.authId==1){
            this.survey[i].deleMemberShadow = false
            axios.get('/manage/search/delete', {
              params: {
                search_id: this.survey[i].search_id
              }
            }).then((response) => {
              if(response.data.ret == '0'){
                this.getSurvey()
              }else{
                this.$message(response.data.msg+','+response.data.cause);
              }
            })
          }else{
            this.noAccess = true
          }

        }
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
          this.getSurvey()
        }else{
          this.shade = true
        }
      },
      watch:{
        $route(to,from){
          if(to.path == '/details/location/survey'){
            if(this.$route.query.id){
              this.getSurvey()
            }else{
              this.shade = true
            }
          }
        }
      },
    }
</script>

<style scoped>
  *{
    box-sizing: border-box;
  }

  #locationSurvey .SurveyTitle{
    display: flex;
    align-items: center;
    height: 25px;
  }

  #locationSurvey .SurveyTitle .SurveyTitleBorder{
    width:4px;
    height:14px;
    background:rgba(50,197,143,1);
    margin-right: 6px;
  }

  #locationSurvey .SurveyTitle .SurveyTitleTxt{
    font-size:14px;
    color:rgba(57,63,81,1);
    flex-shrink: 0;
  }

  #locationSurvey .SurveyInfoBox{
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-top: 20px;
  }

  #locationSurvey .SurveyInfo{
    margin: 0 14px 20px 0;
    width:300px;
    height:122px;
    border-radius:2px;
    overflow: hidden;
    background: rgba(242,242,244,0.3);
    position: relative;
    flex-shrink: 0;
  }

  #locationSurvey .SurveyInfo .SurveyInfoTop{
    width: 100%;
    height: 42px;
    background: rgba(237,149,21,1);
  }

  #locationSurvey .SurveyInfo .SurveyInfoTop .SurveyInfoDate{
    border: none;
    background: rgba(237,149,21,1)!important;
    width: 100%;
    color: #fff;
    cursor: default;
    padding: 0 0 0 10px;
    height: 100%;
  }

  #locationSurvey .SurveyInfo .SurveyInfoBottom{
    border:1px solid rgba(136,135,162,0.4);
    border-top: none;
    height: 80px;
    padding: 8px 12px 20px 12px;
  }

  #locationSurvey .SurveyInfo .SurveyInfoBottom .SurveyInfoTitleBox{
    width: 100%;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size:14px;
    color:rgba(57,63,81,1);
  }

  #locationSurvey .SurveyInfo .SurveyInfoBottom .SurveyInfoBtnBox{
    opacity: 0;
    transition: opacity 1s;
  }

  #locationSurvey .SurveyInfo:hover .SurveyInfoBottom .SurveyInfoBtnBox{
    opacity: 1;
  }

  #locationSurvey .SurveyInfo .SurveyInfoBottom .SurveyInfoBtnBox .SurveyInfoBtn{
    display: inline-block;
    width:24px;
    height:24px;
    background:rgba(50,197,143,1);
    border-radius:2px;
    text-align: center;
    cursor: pointer;
  }

  #locationSurvey .SurveyInfo .SurveyInfoBottom .SurveyInfoBtnBox .SurveyInfoBtn:last-of-type{
    margin-left: 6px;
    background:rgba(234,80,80,1);
  }

  #locationSurvey .SurveyInfo .SurveyInfoBottom .SurveyInfoBtnBox .SurveyInfoBtn i{
    line-height: 24px;
    color: #fff;
    font-size: 14px;
  }

  #locationSurvey .SurveyInfo .SurveyInfoBottom .SurveyInfoContentBox{
    margin-top: 12px;
    display: flex;
    align-items: center;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }

  #locationSurvey .SurveyInfo .SurveyInfoBottom .SurveyInfoContentBox i{
    line-height: 16px;
    color: #32C58F;
  }

  #locationSurvey .SurveyInfo .SurveyInfoBottom .SurveyInfoContentBox .SurveyInfoName{
    font-size: 12px;
    color: rgba(57,63,81,1);
    margin-left: 10px;
  }

  #locationSurvey .SurveyAdd{
    border:1px solid rgba(136,135,162,0.3);
    justify-content: center;
    flex-direction: column;
    color:rgba(57,63,81,0.8);
    font-size: 12px;
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  #locationSurvey .SurveyAdd i{
    color:rgba(57,63,81,0.8);
    font-size: 28px;
    line-height: 28px;
  }

  /*删除阴影框*/
  #locationSurvey .SurveyDeleShadow{
    position: absolute;
    width: 100%;
    height: 100%;
    background:rgba(0,0,0,.7);
    top: 0;
    left: 0;
  }

  #locationSurvey .SurveyDeleShadow .SurveyDeleText{
    font-size:12px;
    color:rgba(255,255,255,1);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 40px;
  }

  #locationSurvey .SurveyDeleShadow .SurveyDeleText i{
    margin-right: 8px;
  }

  #locationSurvey .SurveyDeleShadow .SurveyDeleFooter{
    width: 100%;
    height: 24px;
    display: flex;
    align-items: center;
    position: absolute;
    bottom: 0;
  }

  #locationSurvey .SurveyDeleShadow .SurveyDeleFooter .SurveyDeleBtn{
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

  #locationSurvey .SurveyDeleShadow .SurveyDeleFooter .SurveyDeleBtn:first-of-type{
    opacity: 0.6;
  }

  /*弹框表单*/
  #locationSurvey .addFormBox{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
    flex-wrap: wrap;
    padding: 0 40px;
  }

  #locationSurvey .addFormBox .addForm{
    font-size:12px;
    color:rgba(97,101,116,1);
    width: 400px;
    flex-shrink: 0;
    margin:0 0 20px 0;
  }

  #locationSurvey .addFormBox .addForm:nth-child(3n){
    margin-right: 0;
  }

  #locationSurvey .addFormBox .addForm .addFormSign{
    color: #F05050;
    margin-left: 4px;
  }

  /*日期选择器*/
  #locationSurvey .addForm .addFormDate{
    width: 400px;
    border-radius: 0;
    border: none;
    border-bottom: 1px solid rgba(210,210,210,0.6);
    height: 36px;
    padding-left: 6px;
  }

  #locationSurvey .addForm .addFormDate.is-active{
    border-color: rgba(255,105,14,0.6);
  }

  #locationSurvey .addDialog .addSmallForm{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: -4px;
    flex-wrap: wrap;
  }

  #locationSurvey .addDialog .addSmallForm .addForm{
    width: 185px;
  }

  #locationSurvey .addDialog .addSmallForm .addForm .addFormTitle{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 12px;
    color:rgba(102,102,102,1);
  }

  #locationSurvey .addDialog .addSmallForm .addForm .addFormTitle .addFormTitleBtn{
    font-size:12px;
    color:rgba(108,111,191,1);
    cursor: pointer;
  }

  #locationSurvey .addDialog .addDialogFooter{
    width: 100%;
    height: 75px;
    border-top: 1px solid rgba(180,180,180,0.2);
    margin-top: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  #locationSurvey .addDialog .addDialogFooter .addFooterBtn{
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

  #locationSurvey .addDialog .addDialogFooter .addFooterBtn:last-of-type{
    border:1px solid rgba(186,186,186,1);
    background: #fff;
    margin-left: 36px;
    color: rgba(0,0,0,.8);
  }

  /*无数据遮罩*/
  #locationSurvey .shadeBox{
    width: calc(100% - 346px);
    height: calc(100vh - 117px);
    position: fixed;
    background:rgba(0,0,0,0.6);
    top: 98px;
    left: 326px;
    border-radius: 0 0 4px 4px;
  }

  #locationSurvey .shadeBox .shadeTxt{
    position: absolute;
    top: 38%;
    left: 0;
    width: 100%;
    text-align: center;
    font-size:16px;
    color:rgba(255,255,255,1);
  }

  #locationSurvey .shadeBox .shadeTxt i{
    font-size:64px;
    color:rgba(255,255,255,1);
  }

  #locationSurvey .shadeBox .shadeTxt p:first-of-type{
    margin-top: 20px;
  }

  #locationSurvey .shadeBox .shadeTxt p{
    line-height: 26px;
  }
</style>

<style>
  #locationSurvey .SurveyInfo .SurveyInfoTop .SurveyInfoDate .el-input__icon,
  #locationSurvey .SurveyInfo .SurveyInfoTop .SurveyInfoDate .el-range-separator{
    color: #fff;
    line-height: 42px;
  }

  #locationSurvey .SurveyInfo .SurveyInfoTop .SurveyInfoDate .el-range-separator{
    font-size: 12px;
    width: 6%;
    padding-left: 3px;
  }

  #locationSurvey .SurveyInfo .SurveyInfoTop .SurveyInfoDate .el-range-input{
    background: none;
    color: #fff;
    width: 24%;
    font-size: 12px;
    cursor: default;
  }

  #locationSurvey .SurveyInfo .SurveyInfoTop .SurveyInfoDate .el-range-input:last-of-type{
    margin-left: 2px;
  }

  /*弹框表单*/
  #locationSurvey .addDialog .el-dialog .el-dialog__header{
    height: 54px;
    padding: 0;
  }

  #locationSurvey .addDialog .el-dialog .el-dialog__header .el-dialog__title{
    font-size: 14px;
    line-height: 54px;
    height: 54px;
  }

  #locationSurvey .addDialog .el-dialog .el-dialog__header .el-dialog__headerbtn{
    top: 15px;
    right: 36px;
  }

  #locationSurvey .addDialog .el-dialog .el-dialog__header .el-dialog__headerbtn>i{
    font-size: 16px;
    line-height: 16px;
    font-weight: bold;
  }

  #locationSurvey .addDialog .el-dialog__body{
    padding: 0;
    overflow: hidden;
  }

  /*信息输入框*/
  #locationSurvey .addForm .addFormInput .el-input__inner{
    height: 36px;
    border-radius: 0;
    border: none;
    border-bottom: 1px solid rgba(210,210,210,0.6);
    font-size:12px;
    color:rgba(57,63,81,1);
  }

  #locationSurvey .addForm .addFormInput:not(.addFormMap) .el-input__inner{
    padding-left: 0;
  }

  #locationSurvey .addForm .addFormInput .el-input__inner:focus{
    border-color: rgba(255,105,14,0.6);
  }

  #locationSurvey .addForm .addFormInput .el-input__prefix i{
    line-height: 36px;
    transition: color 1s;
  }

  #locationSurvey .addForm .addFormInput .el-input__suffix i{
    line-height: 40px;
  }

  #locationSurvey .addForm .addFormInput .el-input__prefix i.active{
    color: #EE7373;
  }

  /*日期选择器*/
  #locationSurvey .addForm .addFormDate .el-input__icon{
    transition: color 1s;
    line-height: 36px;
  }

  #locationSurvey .addForm .addFormDate.active .el-range__icon{
    color: #EE7373;
  }

  #locationSurvey .addForm .addFormDate .el-range-input,
  #locationSurvey .addForm .addFormDate .el-range-separator{
    font-size: 12px;
    color:rgba(57,63,81,1);
    line-height: 36px;
  }

  #locationSurvey .addForm .addFormDate .el-range-input{
    padding-top: 5.5px;
  }
</style>
