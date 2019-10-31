<template>
    <div id="location">
        <div class="locationLeft">
          <div class="locationLeftTop">
            <div class="locationLeftTitle">
              <i class="iconfont icondidian"></i>拍摄地
            </div>
            <div class="locationLeftAdd" @click="()=>{if(authId==1){addDialog = true}else{noAccess = true}}">＋添加新拍摄地</div>
          </div>
          <div class="locationLeftContentBox">
            <div class="locationLeftContent locationContentNull" v-if='location.length == 0'>暂无数据</div>
            <div class="locationLeftContent" v-else v-for="item,index in location" :key="index" id="locationList" @click="handleChange(index)">
              <div class="locationContentInfo">
                <el-input v-model="item.location_name" placeholder="请输入名称" v-if="item.input == true" class="locationLeftInput" autofocus @blur="submitRename(item)"></el-input>
                <div class="locationContentTitle" v-else>{{item.location_name}}</div>
                <div class="locationContentDesc">
                  <i class="iconfont icondingweiweizhi"></i><span>{{item.address}}</span>
                </div>
              </div>
              <el-popover
                placement="bottom"
                width="100" v-model="item.visible"
                trigger="click" popper-class="locationLeftBtnBox">
                <div class="locationLeftBtn" @click="rename(item)">
                  <i class="iconfont iconpencil"></i>重命名
                </div>
                <div class="locationLeftBtn" @click="dele(index)">
                  <i class="iconfont icondelete"></i>删除
                </div>
                <i class="iconfont icongengduo" slot="reference"></i>
              </el-popover>
              <div class="locationContentHr"></div>
            </div>
          </div>
        </div>
        <div class="locationRight">
          <el-menu :default-active="$route.path" class="locationRightTab" mode="horizontal" router>
            <el-menu-item index="/details/location/info" :route="{path: '/details/location/info?play_id='+this.$route.query.play_id+'&project_id='+this.$route.query.project_id+'&id='+shoot_location_id}">拍摄地信息</el-menu-item>
            <el-menu-item index="/details/location/survey" :route="{path: '/details/location/survey?play_id='+this.$route.query.play_id+'&project_id='+this.$route.query.project_id+'&id='+shoot_location_id}">堪景信息</el-menu-item>
            <el-menu-item index="/details/location/photo" :route="{path: '/details/location/photo?play_id='+this.$route.query.play_id+'&project_id='+this.$route.query.project_id+'&id='+shoot_location_id}">现场照片</el-menu-item>
          </el-menu>
          <div class="locationRightContent">
            <keep-alive>
              <router-view :shade="shade"></router-view>
            </keep-alive>
          </div>
        </div>
      <el-dialog
        title="添加新拍摄地"
        :visible.sync="addDialog"
        width="480px" center class="addDialog">
        <div class="addFormBox">
          <div class="addForm">
            拍摄地名称<span class="addFormSign">*</span>
            <el-input
              placeholder="请输入拍摄地名称"
              v-model="addLocation.location_name"
              clearable class="addFormInput">
            </el-input>
          </div>
          <div class="addForm">
            地址<span class="addFormSign">*</span>
            <el-autocomplete  placeholder="点击地图插件选择"
                              v-model="addLocation.address" :trigger-on-focus="false"
                              clearable class="addFormInput addFormMap" :fetch-suggestions="querySearch" @select="handleSelect($event,'addLocation.address')">
              <i slot="prefix" :class="['iconfont','icondingweiweizhi',addLocation.address?'active':'']"></i>
              <template slot-scope="props">
                <div class="addMap">
                  {{ props.item.name}}<span>({{props.item.district}}{{props.item.address}})</span>
                </div>
              </template>
            </el-autocomplete>
          </div>
          <div class="addForm">
            最近的医院
            <el-autocomplete  placeholder="点击地图插件选择"
                              v-model="addLocation.nearest_hospital" clearable class="addFormInput addFormMap"
                              :fetch-suggestions="querySearchHospital" @select="handleSelect($event,'addLocation.nearest_hospital')">
              <i slot="prefix" :class="['iconfont','icondingweiweizhi',addLocation.nearest_hospital?'active':'']"></i>
              <template slot-scope="props">
                <div class="addMap">
                  {{ props.item.name}}<span>({{props.item.district}}{{props.item.add}})</span>
                </div>
              </template>
            </el-autocomplete>
          </div>
          <div class="addForm">
            场地使用合约期
            <el-date-picker
              v-model="dateValue" :class="['addFormInput','addFormDate',dateValue?'active':'']"
              type="daterange" value-format="timestamp"
              range-separator="至"  prefix-icon="iconfont iconriqi1"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </div>
        </div>
        <div class="addDialogFooter">
          <div class="addFooterBtn" @click="locationAdd">创建</div>
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
  import AMap from 'AMap';
  var map, placeSearch;
  export default {
    name: "location",
    data(){
      return{
        shade:false,//空状态遮罩
        location:[],
        addDialog:false,//添加弹框
        locationInfoTitleTxt:'迎泽公园',
        shoot_location_id:'',//拍摄地id
        dateValue:'',
        addLocation:{
          location_name:'',//拍摄地名称
          address:'',//拍摄地地址
          nearest_hospital:'',//最近的医院.
          start_date:'',//开始时间
          end_date:'',//结束时间
          city_code:'',//城市码
          project_id: this.$route.query.project_id
        },
        fromPath:'',//上级路由
        addId:'',//新增id
        authId:0,//权限信息
        noAccess:false,//无权限弹框
      }
    },
    methods: {
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
        v.input = false
        delete v.input
        delete v.visible
        axios({
          method: 'post',
          url: '/manage/location/update_location',
          data:v,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          },
          transformRequest: [data => Qs.stringify(data)]
        }).then((response)=> {
          if(response.data.ret == '0'){
            this.locationList()
          }else{
            this.$message(response.data.msg+','+response.data.cause);
          }
        })
      },
      //删除
      dele(i){
        if(this.authId==1){
          this.$confirm('此操作将永久删除该拍摄地, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          }).then(() => {
            axios.get('/manage/location/delete_one_by_shoot_location_id', {
              params: {
                shoot_location_id: this.location[i].shoot_location_id
              }
            }).then((response) => {
              if(response.data.ret == '0'){
                this.locationList()
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
      //地址查询选择
      handleSelect(item,v) {
        if(v == 'addLocation.address'){
          this.addLocation.address = item.name+'('+item.district+item.address+')'
          this.addLocation.city_code = item.adcode
        }else if(v == 'addLocation.nearest_hospital'){
          this.addLocation.nearest_hospital = item.name+'('+item.district+item.address+')'
        }
      },
      //地址数据获取
      querySearch(queryString, cb) {
        if(queryString != ''){
          AMap.plugin('AMap.Autocomplete', ()=>{
            var autoOptions = {city: '全国'}
            var autoComplete= new AMap.Autocomplete(autoOptions);
            autoComplete.search(queryString, (status, result)=> {
              var restaurants = result.tips;
              this.timeout = setTimeout(() => {
                cb(restaurants);
              }, 100);
            })
          })
        }
      },
      querySearchHospital(queryString, cb) {
        AMap.plugin('AMap.Autocomplete', ()=>{
          var autoOptions
          if(this.addLocation.city_code){
            autoOptions = {city: this.addLocation.city_code}
          }else{
            autoOptions = {city: '全国'}
          }
          var autoComplete= new AMap.Autocomplete(autoOptions);
          autoComplete.search(queryString+'医院', (status, result)=> {
            var restaurants = result.tips
            this.timeout = setTimeout(() => {
              cb(restaurants);
            }, 100);
          })
        })
      },
      //获取拍摄地信息
      locationList(){
        axios.get('/manage/location/get_shoot_location', {
          params: {
            project_id: this.$route.query.project_id
          }
        }).then((response) => {
          if (response.data.ret == '0') {
            if(response.data.data.length==0){
              this.shade = true;
              this.location = [];
              return
            }
            for(let i=0;i<response.data.data.length;i++){
              response.data.data[i].visible = false
              response.data.data[i].input = false
            }
            this.location = response.data.data
            this.$nextTick(()=>{
              if(this.location.length!=0){
                this.shade = false;
                if(this.addId){
                  let index = this.location.findIndex(d => d.shoot_location_id == this.addId);
                  this.handleChange(index);
                }else{
                  this.handleChange(0)
                }
              }else{
                this.$router.push('/details/location/info?play_id='+this.$route.query.play_id+'&project_id='+this.$route.query.project_id)
              }
            })
          }
        })
      },
      //选中场景样式以及数据获取
      handleChange(val,e) {
        $('.locationLeftContentBox #locationList').eq(val).addClass("active").siblings().removeClass("active");
        if(val != 0){
          $(".locationLeftContentBox").animate({scrollTop:$('.locationLeftContentBox #locationList').eq(val).offset().top - $(".locationLeftContentBox").offset().top + $(".locationLeftContentBox").scrollTop()},800);
        }
        this.shoot_location_id = this.location[val].shoot_location_id;
        this.addId = '';
        this.$router.push(this.fromPath+'?play_id='+this.$route.query.play_id+'&project_id='+this.$route.query.project_id+'&id='+this.location[val].shoot_location_id)
      },
      //新增拍摄地
      locationAdd(){
        if(this.addLocation.location_name && this.addLocation.address){
          this.addDialog = false
          if(this.dateValue.length != 0){
            this.addLocation.start_date = this.dateValue[0]/1000;
            this.addLocation.end_date = this.dateValue[1]/1000
          }
          axios({
            method: 'post',
            url: '/manage/location/update_location',
            data:this.addLocation,
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            transformRequest: [data => Qs.stringify(data)]
          }).then((response)=> {
            if(response.data.ret == '0'){
              this.addId = response.data.data
              this.locationList();
              this.addLocation.location_name = '';
              this.addLocation.address = '';
              this.dateValue = '';
              this.addLocation.nearest_hospital = '';
            }else{
              this.addDialog = true;
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
      this.locationList();
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

    },
    beforeRouteLeave (to, from, next){
      this.fromPath = from.path
      next(true)
    },
  }
</script>

<style scoped>
  *{
    box-sizing: border-box;
  }

  #location{
     display: flex;
     padding: 10px 20px 0 12px;
  }

  #location .locationLeft{
    width: 250px;
    height: calc(100vh - 70px);
    background:rgba(255,255,255,1);
    border:1px solid rgba(231,231,236,1);
    border-radius:4px;
  }

  #location .locationLeft .locationLeftTop{
    border-bottom: 1px solid rgba(210,210,210,0.6);
  }

  #location .locationLeft .locationLeftTitle{
    height: 48px;
    padding-left: 20px;
    font-size:14px;
    display: flex;
    align-items: center;
    color:rgba(57,63,81,1);
  }

  #location .locationLeft .locationLeftTitle i{
    font-size: 16px;
    color: #8C8BA6;
    margin-right: 7px;
  }

  #location .locationLeftAdd{
    width:214px;
    height:32px;
    background:rgba(108,111,191,1);
    border-radius:2px;
    font-size:12px;
    color:rgba(255,255,255,1);
    text-align: center;
    line-height: 32px;
    cursor: pointer;
    margin: 10px 0 12px 18px;
  }

  #location .locationLeftContentBox{
    height: calc(100% - 104px);
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
  }

  #location .locationLeftContentBox .locationLeftContent{
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

  #location .locationLeftContentBox .locationLeftContent:hover,
  #location .locationLeftContentBox .locationLeftContent.active{
    background: #EBEBF0;
    border-color: #6C6FBF;
  }

  #location .locationLeftContentBox .locationLeftContent .locationContentTitle{
    font-size:12px;
    color:rgba(57,63,81,1);
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }

  /*左侧输入框*/
  #location .locationLeftContentBox .locationLeftContent .locationLeftInput{
    width: 140px;
  }

  #location .locationLeftContentBox .locationLeftContent .locationContentDesc{
    display: flex;
    align-items: center;
    margin-top: 8px;
    width: 196px;
    height: 22px;
  }

  #location .locationLeftContentBox .locationLeftContent .locationContentDesc span{
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    font-size:12px;
    color:rgba(57,63,81,0.6);
  }

  #location .locationLeftContentBox .locationLeftContent .locationContentDesc i{
    color: #EF6F70;
    opacity:0.8;
    font-size: 14px;
    margin-right: 8px;
  }

  #location .locationLeftContentBox .locationLeftContent .locationContentHr{
    position: absolute;
    bottom: 0;
    left: 25px;
    width: 200px;
    height: 1px;
    background: rgba(210,210,210,0.6);
  }

  #location .locationLeftContentBox .locationContentNull{
    padding: 0;
    color: rgba(0,0,0,.6);
    justify-content: center;
  }

  /*右侧*/
  #location .locationRight{
    width: calc(100% - 260px);
    min-height: calc(100vh - 70px);
    margin-left: 12px;
  }

  #location .locationRightContent{
    background: #fff;
    border-radius: 0 0 4px 4px;
    border:1px solid rgba(231,231,236,1);
    border-top: none;
    padding: 30px 30px 30px 20px;
    height: calc(100vh - 116px);
    overflow-y: scroll;
    overflow-x: hidden;
  }

  /*弹框表单*/
  #location .addFormBox{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
    flex-wrap: wrap;
    padding: 0 40px;
  }

  #location .addFormBox .addForm{
    font-size:12px;
    color:rgba(97,101,116,1);
    width: 400px;
    flex-shrink: 0;
    margin:0 0 20px 0;
  }

  #location .addFormBox .addForm:nth-child(3n){
    margin-right: 0;
  }

  #location .addFormBox .addForm .addFormSign{
    color: #F05050;
    margin-left: 4px;
    font-size:12px;
  }

  /*地址搜索框*/
  #location .addForm .addFormMap{
    display: block;
    width: 400px;
  }

  /*日期选择器*/
  #location .addForm .addFormDate{
    width: 400px;
    border-radius: 0;
    border: none;
    border-bottom: 1px solid rgba(210,210,210,0.6);
    height: 36px;
    padding-left: 6px;
  }

  #location .addForm .addFormDate.is-active{
    border-color: rgba(255,105,14,0.6);
  }

  /*单选框组*/
  #location .addForm .addFormRadio{
    margin-top: 12px;
  }

  #location .addDialog .addDialogFooter{
    width: 100%;
    height: 75px;
    border-top: 1px solid rgba(180,180,180,0.2);
    margin-top: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  #location .addDialog .addDialogFooter .addFooterBtn{
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

  #location .addDialog .addDialogFooter .addFooterBtn:last-of-type{
    border:1px solid rgba(186,186,186,1);
    background: #fff;
    margin-left: 36px;
    color: rgba(0,0,0,.8);
  }
</style>
<style>
  /*左侧输入框*/
  #location .locationLeftContentBox .locationLeftContent .locationLeftInput .el-input__inner{
    height: 22px;
    font-size: 12px;
    padding-left: 10px;
  }

  /*左侧菜单栏*/
  .locationLeftBtnBox{
    padding: 0 14px;
    min-width: 92px;
  }

  .locationLeftBtnBox .locationLeftBtn{
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

  .locationLeftBtnBox .locationLeftBtn:first-of-type{
    border-bottom: 1px solid rgba(210,210,210,0.6);
  }

  .locationLeftBtnBox .locationLeftBtn i{
    color: #EB5252;
    font-size: 14px;
  }

  .locationLeftBtnBox .locationLeftBtn:first-of-type i{
    color: #32C58F;
    font-size: 16px;
  }

  /*右侧菜单栏*/
  #location .locationRightTab.el-menu.el-menu--horizontal{
    border-bottom:2px solid rgba(108,111,191,1) ;
    background: none;
  }

  #location .locationRightTab .el-menu-item{
    border: none;
    height: 44px;
    color:rgba(129,132,144,1);
    border-radius:4px 4px 0 0;
    line-height: 42px;
  }

  #location .locationRightTab .el-menu-item.is-active{
    background: rgba(108,111,191,1);
    color: #fff;
  }

  /*弹框表单*/
  #location .addDialog .el-dialog .el-dialog__header{
    height: 54px;
    padding: 0;
  }

  #location .addDialog .el-dialog .el-dialog__header .el-dialog__title{
    font-size: 14px;
    line-height: 54px;
    height: 54px;
  }

  #location .addDialog .el-dialog .el-dialog__header .el-dialog__headerbtn{
    top: 15px;
    right: 36px;
  }

  #location .addDialog .el-dialog .el-dialog__header .el-dialog__headerbtn>i{
    font-size: 16px;
    line-height: 16px;
    font-weight: bold;
  }

  #location .addDialog .el-dialog__body{
    padding: 0;
    overflow: hidden;
  }
  /*信息输入框*/
  #location .addForm .addFormInput .el-input__inner{
    height: 36px;
    border-radius: 0;
    border: none;
    border-bottom: 1px solid rgba(210,210,210,0.6);
    font-size:12px;
    color:rgba(57,63,81,1);
  }

  #location .addForm .addFormInput:not(.addFormMap) .el-input__inner{
    padding-left: 0;
  }

  #location .addForm .addFormInput .el-input__inner:focus{
    border-color: rgba(255,105,14,0.6);
  }

  #location .addForm .addFormInput .el-input__prefix i{
    line-height: 36px;
    transition: color 1s;
  }

  #location .addForm .addFormInput .el-input__suffix i{
    line-height: 40px;
  }

  #location .addForm .addFormInput .el-input__prefix i.active{
    color: #EE7373;
  }

  /*地址信息输入框*/
  .addMap{
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    font-size: 12px;
  }

  .addMap span{
    color: #999;
    font-size: 12px;
  }

  /*日期选择器*/
  #location .addForm .addFormDate .el-input__icon{
    transition: color 1s;
    line-height: 36px;
  }

  #location .addForm .addFormDate.active .el-range__icon{
    color: #EE7373;
  }

  #location .addForm .addFormDate .el-range-input,
  #location .addForm .addFormDate .el-range-separator{
    font-size: 12px;
    color:rgba(57,63,81,1);
    line-height: 36px;
  }

  #location .addForm .addFormDate .el-range-input{
    padding-top: 5.5px;
  }
</style>


