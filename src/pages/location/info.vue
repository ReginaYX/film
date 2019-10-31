<template>
    <div id="locationInfo">
      <div class="addressBox">
        <div class="locationInfoTitle">
          <div class="locationInfoTitleBorder"></div>
          <el-collapse-transition>
            <span class="locationInfoTitleTxt" v-show="locationInfoTitleInput == false"
                  @mouseenter="()=>{if(authId==1){locationInfoTitleInput = true}else{noAccess = true}}" v-if="locationInfo.location_name">
              {{locationInfo.location_name}}
            </span>
            <span class="locationInfoTitleTxt" v-else>
              暂无数据
            </span>
          </el-collapse-transition>
          <el-collapse-transition>
            <el-input v-show="locationInfoTitleInput"
              placeholder="请输入内容" autofocus
              v-model="locationInfo.location_name" @blur="submitInfo('location_name')"
              clearable class="locationInfoInput"></el-input>
          </el-collapse-transition>
        </div>
        <div class="addressFormBox">
          <div class="addressForm">
            地址<span class="addressFormSign">*</span>
            <el-autocomplete  placeholder="点击地图插件选择"
                       v-model="locationInfo.address" :trigger-on-focus="false" :disabled="authId!=1"
                       clearable class="addressFormInput addressFormMap" :fetch-suggestions="querySearch" @select="handleSelect($event,'address')">
              <i slot="prefix" :class="['iconfont','icondingweiweizhi',locationInfo.address?'active':'']"></i>
              <template slot-scope="props">
                <div class="addressMap">
                  {{ props.item.name}}<span>({{props.item.district}}{{props.item.address}})</span>
                </div>
              </template>
            </el-autocomplete>
          </div>
          <div class="addressForm">
            停车场地址
            <el-autocomplete  placeholder="点击地图插件选择" :disabled="authId!=1"
                              v-model="locationInfo.parking_lot"  :trigger-on-focus="false"
                              clearable class="addressFormInput addressFormMap" :fetch-suggestions="querySearch" @select="handleSelect($event,'parking_lot')">
              <i slot="prefix" :class="['iconfont','icondingweiweizhi',locationInfo.parking_lot?'active':'']"></i>
              <template slot-scope="props">
                <div class="addressMap">
                  {{ props.item.name}}<span>({{props.item.district}}{{props.item.address}})</span>
                </div>
              </template>
            </el-autocomplete>
          </div>
          <div class="addressForm">
            最近的酒店
            <el-autocomplete  placeholder="点击地图插件选择" :disabled="authId!=1"
                              v-model="locationInfo.nearest_hotel" clearable class="addressFormInput addressFormMap"
                              :fetch-suggestions="querySearchHotel" @select="handleSelect($event,'nearest_hotel')">
              <i slot="prefix" :class="['iconfont','icondingweiweizhi',locationInfo.nearest_hotel?'active':'']"></i>
              <template slot-scope="props">
                <div class="addressMap">
                  {{ props.item.name}}<span>({{props.item.district}}{{props.item.address}})</span>
                </div>
              </template>
            </el-autocomplete>
          </div>
          <div class="addressForm">
            地方语言/方言
            <el-input
              placeholder="请输入方言" @blur="submitInfo('language')"
              v-model="locationInfo.language" :disabled="authId!=1"
              clearable class="addressFormInput">
            </el-input>
          </div>
          <div class="addressForm">
            最近的医院
            <el-autocomplete  placeholder="点击地图插件选择" :disabled="authId!=1"
                              v-model="locationInfo.nearest_hospital" clearable class="addressFormInput addressFormMap"
                              :fetch-suggestions="querySearchHospital" @select="handleSelect($event,'nearest_hospital')">
              <i slot="prefix" :class="['iconfont','icondingweiweizhi',locationInfo.nearest_hospital?'active':'']"></i>
              <template slot-scope="props">
                <div class="addressMap">
                  {{ props.item.name}}<span>({{props.item.district}}{{props.item.address}})</span>
                </div>
              </template>
            </el-autocomplete>
          </div>
          <div class="addressForm">
            场地使用合约期
            <el-date-picker  @blur="submitInfo('date')" :disabled="authId!=1"
              v-model="dateValue" :class="['addressFormInput','addressFormDate',dateValue?'active':'']"
              type="daterange" value-format="timestamp"
              range-separator="至"  prefix-icon="iconfont iconriqi1"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </div>
          <div class="addressForm">
            供电方式
            <el-radio-group v-model="locationInfo.power_supply_mode" size="small"  :disabled="authId!=1"
                            class="addressFormRadio" @change="submitInfo('power_supply_mode')">
              <el-radio :label="1" border>附近接电</el-radio>
              <el-radio :label="2" border>发电车</el-radio>
              <el-radio :label="3" border>发电机</el-radio>
              <el-radio :label="4" border>其他</el-radio>
            </el-radio-group>
          </div>
          <div class="addressForm">
            备注信息
            <el-input
              placeholder="请输入备注信息" @blur="submitInfo('remark')"
              v-model="locationInfo.remark" maxlength="30"
              clearable class="addressFormInput" :disabled="authId!=1">
            </el-input>
          </div>
          <div class="addressForm"></div>
        </div>
      </div>
      <el-collapse class="locationCollapse" v-model="activeCollapse">
        <el-collapse-item  name="1">
          <template slot="title">
            <div class="locationInfoTitle">
              <div class="locationInfoTitleBorder"></div>
              <span class="locationInfoTitleTxt">相关场景&#12288;</span>
              <div class="locationInfoTitleHr"></div>
            </div>
          </template>
          <div class="sceneBox">
            <p class="sceneDesc" v-if="scene.total_session">共{{scene.total_session}}场&#12288;合计{{scene.total_page}}页</p>
            <p class="sceneDesc" v-else>共0场&#12288;合计0页</p>
            <div class="sceneInfoBox">
              <div class="sceneInfo" v-for="item in sceneSelectValue">
                <div class="sceneInfoTitle">{{item.scene_name}}</div>
                <div class="sceneInfoDesc">共{{item.sessions}}场戏，合计{{item.pages}}页</div>
                <div class="sceneDeleBox">
                  <div class="sceneDele" @click="deleScene(item.scene_id)"><i class="iconfont iconshanchu"></i></div>
                </div>
              </div>
              <div class="sceneInfo sceneAdd"  @click="()=>{if(authId==1){addSceneDialog = true}else{noAccess = true}}">
                <i class="iconfont iconchangjing1"></i><br />
                ＋添加相关场景
              </div>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item  name="2" style="margin-top: 60px">
          <template slot="title">
            <div class="locationInfoTitle">
              <div class="locationInfoTitleBorder"></div>
              <span class="locationInfoTitleTxt">相关场次&#12288;</span>
              <div class="locationInfoTitleHr"></div>
            </div>
          </template>
          <div class="sessionBox">
            <div class="sessionInfoBox">
              <div class="sessionInfo" v-if='scene.field_number_list==undefined||scene.field_number_list.length==0'>
                暂无场次
              </div>
              <div class="sessionInfo" v-else v-for="item in scene.field_number_list">
                第{{item}}场
              </div>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
      <div class="personnelBox">
        <div class="locationInfoTitle">
          <div class="locationInfoTitleBorder"></div>
          <span class="locationInfoTitleTxt">地接人员信息</span>
          <div class="locationInfoTitleHr"></div>
        </div>
        <div class="personnelInfoBox">
          <div class="personnelInfo" v-for="item,index in personnel" :key="index">
            <div class="personnelLeft personnelLeftMan">
              <i class="iconfont iconnan"></i>
            </div>
            <div class="personnelRight">
              <div class="personnelTop">
                <div class="personnelName">{{item.name}}<span v-if="item.post"> · {{item.post}}</span></div>
                <div class="personnelDeleBox" @click="()=>{if(authId==1){item.deleMemberShadow = true}else{noAccess = true}}">
                  <i class="iconfont iconshanchu"></i></div>
              </div>
              <div class="personnelPosition" v-if="item.company && item.department">{{item.company}}/{{item.department}}</div>
              <div class="personnelPosition" v-else-if="item.company">{{item.company}}</div>
              <div class="personnelPosition" v-else-if="item.department">{{item.department}}</div>
              <div class="personnelPosition" v-else>暂无公司信息</div>
              <div class="personnelContactBox">
                <div class="personnelContact">
                  <i class="iconfont icondianhuazixunhuawuzongheguanlibl"></i>{{item.phone}}
                </div>
                <div class="personnelContact personnelWchat" v-if="item.we_chat">
                  <i class="iconfont iconweixin-copy"></i>{{item.we_chat}}
                </div>
                <div class="personnelContact personnelWchat" v-else>
                  <i class="iconfont iconweixin-copy"></i>暂无微信
                </div>
              </div>
            </div>
            <transition name="el-zoom-in-top">
              <div class="personnelDeleShadow" v-show="item.deleMemberShadow">
                <div class="personnelDeleText">
                  <i class="iconfont icontips-copy"></i>确认删除该地接人员信息
                </div>
                <div class="personnelDeleFooter">
                  <div class="personnelDeleBtn" @click="item.deleMemberShadow = false">取消</div>
                  <div class="personnelDeleBtn" @click="deleContact(index)">确认</div>
                </div>
              </div>
            </transition>
          </div>
          <div class="personnelInfo personnelAdd" @click="()=>{if(authId==1){addDialog = true}else{noAccess = true}}">
            <i class="iconfont iconrenyuanxinxi"></i><br />
            ＋添加地接人员信息
          </div>
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
        title="添加地接人员信息"
        :visible.sync="addDialog"
        width="480px" center class="addDialog">
        <div class="addressFormBox">
          <div class="addressForm">
            地接人员姓名<span class="addressFormSign">*</span>
            <el-input
              placeholder="请输入地接人员姓名"
              v-model="addPersonnel.name"
              clearable class="addressFormInput">
            </el-input>
          </div>
          <div class="addressForm">
            联系电话<span class="addressFormSign">*</span>
            <el-input
              placeholder="请输入地接人员电话"
              v-model="addPersonnel.phone" @input="numCheck"
              clearable class="addressFormInput">
            </el-input>
          </div>
          <div class="addressForm">
            地接人职位
            <el-input
              placeholder="请输入地接人职位"
              v-model="addPersonnel.post" maxlength="30"
              clearable class="addressFormInput">
            </el-input>
          </div>
          <div class="addFormBox">
            <div class="addressForm">
              公司
              <el-input
                placeholder="请输入公司"
                v-model="addPersonnel.company"
                clearable class="addressFormInput">
              </el-input>
            </div>
            <div class="addressForm">
              部门
              <el-input
                placeholder="请输入部门"
                v-model="addPersonnel.department"
                clearable class="addressFormInput">
              </el-input>
            </div>
          </div>
          <div class="addressForm">
            微信号
            <el-input
              placeholder="请输入微信号"
              v-model="addPersonnel.we_chat"
              clearable class="addressFormInput">
            </el-input>
          </div>
        </div>
        <div class="addDialogFooter">
          <div class="addFooterBtn" @click="addContact">创建</div>
          <div class="addFooterBtn" @click="addDialog = false">取消</div>
        </div>
      </el-dialog>
      <el-dialog
        title="添加相关场景"
        :visible.sync="addSceneDialog"
        width="480px" center class="addDialog addSceneDialog">
        <div class="addSceneDialog">
          <div class="sceneBox">
            <div class="sceneTitle">场景选择<span>*</span></div>
            <el-checkbox-group v-model="sceneSelect" class="sceneSelectBox">
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
  import AMap from 'AMap';
  import Qs from 'qs'
  var map, placeSearch,that;
    export default {
      name: "info",
      data(){
        return{
          locationInfo:{},//拍摄地信息
          locationInfoTitleInput:false,
          locationInfoTitleTxt:'',
          dateValue:'',//日期选择
          powerRadio:'1',
          activeCollapse:['1','2'],
          addDialog:false,//添加地接人员弹框
          addSceneDialog:false,//添加场景弹框
          personnel:[],//地接人信息
          addPersonnel:{
            shoot_location_id:this.$route.query.id,
            name:'',
            post:'',
            company:'',
            department:'',
            phone:'',
            we_chat:''
          },//添加地接人信息
          scene:[],
          sceneList:[],//场景列表
          sceneSelect:[],//场景选择
          sceneSelectValue:[],//相关场景
          city:'',//城市
          authId:0,//权限信息
          noAccess:false,//无权限弹框
        }
      },
      props:['shade'],
      methods: {
        //数字验证
        numCheck(v){
          this.addPersonnel.phone = v.match(/\d/ig) ? v.match(/\d/ig).join('') : ''
        },
        //拿场景名称
        sceneName() {
          axios.get('/play/scenes_all', {
            params: {
              play_id: this.$route.query.play_id
            }
          }).then((response) => {
            if (response.data.ret == '0') {
              this.sceneList = response.data.data
            }
          })
        },
        //添加相关场景的移除
        removeScene(i){
          if(this.authId==1){
            this.sceneSelect.splice(i,1)
          }else{
            this.noAccess = true
          }
        },
        //获取相关场景
        getSceneInfo(){
          axios.get('/manage/scene/find_all', {
            params: {
              shoot_location_id : this.$route.query.id,
            }
          }).then((response)=> {
            if(response.data.ret=='0'){
              if(response.data.data.scene_list.length!=0){
                let arr = [];
                for(let i=0;i<response.data.data.scene_list.length;i++){
                  arr.push(response.data.data.scene_list[i].scene_id)
                }
                this.sceneSelect = arr;
              }else{
                this.sceneSelect = [];
              }
              this.sceneSelectValue = response.data.data.scene_list;
              this.scene = response.data.data
            }
          })
        },
        //保存相关场景
        saveSceneInfo(){
          this.addSceneDialog = false;
          let form = new FormData();
          form.append('scene_list',this.sceneSelect.join(','));
          form.append('shoot_location_id',this.$route.query.id);
          axios({
            method: 'post',
            url: '/manage/scene/add_shoot_scene',
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
                if(response.data.cause){
                  this.$message(response.data.msg+','+response.data.cause);
                }else{
                  this.$message(response.data.msg);
                }
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
              axios.get('/manage/scene/delete_shoot_scene', {
                params: {
                  scene_id: v,
                  shoot_location_id: this.$route.query.id
                }
              }).then((response) => {
                if (response.data.ret == '1') {
                  this.$message(response.data.msg+','+response.data.cause);
                }else{
                  this.getSceneInfo()
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
        //地址查询选择保存
        handleSelect(item,v) {
          let formData = new FormData()
          if(v == 'address'){
            this.locationInfo.address = item.name+'('+item.district+item.address+')';
            this.city = item.adcode;
            formData.append('city_code',item.adcode)
          }else if(v == 'nearest_hotel'){
            this.locationInfo.nearest_hotel = item.name+'('+item.district+item.address+')'
          }else if(v == 'nearest_hospital'){
            this.locationInfo.nearest_hospital = item.name+'('+item.district+item.address+')'
          }else if(v == 'parking_lot'){
            this.locationInfo.parking_lot = item.name+'('+item.district+item.address+')'
          }
          if(this.$route.query.id){
            let str = eval('this.locationInfo.'+v);
            formData.append(v,str);
            formData.append('shoot_location_id',this.$route.query.id);
            formData.append('project_id',this.$route.query.project_id);
            formData.append('address',this.locationInfo.address);
            formData.append('location_name',this.locationInfo.location_name);
            axios({
              method: 'post',
              url: '/manage/location/update_location',
              data:formData,
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
              }
            }).then((response)=> {
              if(response.data.ret == '1'){
                this.$message(response.data.msg+','+response.data.cause);
              }
            })
          }else{
            this.$message('请先添加拍摄地');
          }

        },
        //地址数据获取
        querySearch(queryString, cb) {
          if(queryString != ''){
            AMap.plugin('AMap.Autocomplete', ()=>{
              var autoOptions
              if(this.city){
                autoOptions = {city: this.city}
              }else{
                autoOptions = {city: '全国'}
              }
              var autoComplete= new AMap.Autocomplete(autoOptions);
              autoComplete.search(queryString, (status, result)=> {
                var restaurants = result.tips
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
            if(this.city){
              autoOptions = {city: this.city}
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
        querySearchHotel(queryString, cb) {
          AMap.plugin('AMap.Autocomplete', ()=>{
            var autoOptions
            if(this.city){
              autoOptions = {city: this.city}
            }else{
              autoOptions = {city: '全国'}
            }
            var autoComplete= new AMap.Autocomplete(autoOptions);
            autoComplete.search(queryString+'酒店', (status, result)=> {
              var restaurants = result.tips
              this.timeout = setTimeout(() => {
                cb(restaurants);
              }, 100);
            })
          })
        },
        //拍摄地信息保存
        submitInfo(v){
          if(this.$route.query.id){
            let formData = new FormData()
            if(v == 'date'){
              formData.append('start_date',this.dateValue[0]/1000)
              formData.append('end_date',this.dateValue[1]/1000)
            }else{
              let str = eval('this.locationInfo.'+v)
              formData.append(v,str);
            }
            formData.append('shoot_location_id',this.$route.query.id);
            formData.append('project_id',this.$route.query.project_id);
            formData.append('address',this.locationInfo.address);
            if(v != 'location_name'){
              formData.append('location_name',this.locationInfo.location_name);
            }else{
              this.locationInfoTitleInput = false
            }
            axios({
              method: 'post',
              url: '/manage/location/update_location',
              data:formData,
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
              }
            }).then((response)=> {
              if(response.data.ret == '1'){
                this.$message(response.data.msg+','+response.data.cause);
              }
            })
          }else{
            this.$message('请先添加拍摄地');
          }

        },
        //拍摄地信息获取
        getInfo(){
          axios.get('/manage/location/find_one_by_shoot_location_id', {
            params: {
              shoot_location_id : this.$route.query.id
            }
          }).then((response) => {
            if (response.data.ret == '0') {
              if(response.data.data){
                if(response.data.data.nearest_hotel == undefined){
                  response.data.data.nearest_hotel = ''
                }
                if(response.data.data.nearest_hospital == undefined){
                  response.data.data.nearest_hospital = ""
                }
                this.locationInfo = response.data.data
                this.city = response.data.data.city_code
                if(response.data.data.start_date){
                  this.dateValue = [response.data.data.start_date*1000,response.data.data.end_date*1000]
                }
              }
            }
          })
        },
        //获取地接人信息
        getContact(){
          axios.get('/manage/contact/find_all', {
            params: {
              shoot_location_id : this.$route.query.id
            }
          }).then((response) => {
            if (response.data.ret == '0') {
              for(let i=0;i<response.data.data.length;i++){
                response.data.data[i].deleMemberShadow = false
              }
              this.personnel = response.data.data
            }
          })
        },
        //添加地接人信息
        addContact(){
          if(this.addPersonnel.name && this.addPersonnel.phone){
            this.addPersonnel.shoot_location_id = this.$route.query.id
            this.addDialog = false
            axios({
              method: 'post',
              url: '/manage/contact/add_contact',
              data:this.addPersonnel,
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
              },
              transformRequest: [data => Qs.stringify(data)]
            }).then((response)=> {
              if(response.data.ret == '0'){
                this.getContact();
                this.addPersonnel = {shoot_location_id:this.$route.query.id};
              }else{
                this.addDialog = true
                this.$nextTick( ()=> {
                  if(response.data.cause){
                    this.$message(response.data.msg+','+response.data.cause);
                  }else{
                    this.$message(response.data.msg);
                  }
                })
              }
            })
          }else{
            this.$message('请填写完整');
          }
        },
        //删除地接人信息
        deleContact(i){
          if(this.authId==1){
            this.personnel[i].deleMemberShadow = false
            axios.get('/manage/contact/delete_contact', {
              params: {
                contact_id: this.personnel[i].contact_id
              }
            }).then((response) => {
              if(response.data.ret == '0'){
                this.getContact()
              }else{
                if(response.data.cause){
                  this.$message(response.data.msg+','+response.data.cause);
                }else{
                  this.$message(response.data.msg);
                }
              }
            })
          }else{
            this.noAccess = true
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
        this.sceneName();
        if(this.$route.query.id){
          this.getInfo();
          this.getContact();
          this.getSceneInfo()
        }
      },
      watch:{
        $route(to,from){
          if(to.path == '/details/location/info'){
            if(this.$route.query.id){
              this.getInfo();
              this.sceneName();
              this.getContact();
              this.getSceneInfo()
            }
          }else{
            this.sceneSelectValue = [];
            this.personnel = [];
            this.locationInfo = []
          }
        }
      },
    }
</script>

<style scoped>
  *{
    box-sizing: border-box;
  }

  #locationInfo .locationInfoTitle{
    display: flex;
    align-items: center;
    height: 25px;
    width: 100%;
  }

  #locationInfo .locationInfoTitle .locationInfoTitleBorder{
    width:4px;
    height:14px;
    background:rgba(50,197,143,1);
    margin-right: 6px;
  }

  #locationInfo .locationInfoTitle .locationInfoTitleTxt{
    font-size:14px;
    color:rgba(57,63,81,1);
    flex-shrink: 0;
  }

  #locationInfo .locationInfoTitle .locationInfoTitleHr{
    width: calc(100% - 108px);
    height: 1px;
    background: rgba(226,226,233,1);
    margin-left: 18px;
  }

  #locationInfo .locationInfoTitle .locationInfoInput{
    width: 200px;
  }

  /*拍摄地信息表单*/
  #locationInfo .addressFormBox{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 10px;
    margin-top: 20px;
    flex-wrap: wrap;
  }

  #locationInfo .addressFormBox .addressForm{
    font-size:12px;
    color:rgba(97,101,116,1);
    width: 400px;
    flex-shrink: 0;
    margin:0 0 20px 0;
  }

  #locationInfo .addressFormBox .addressForm:nth-child(3n){
    margin-right: 0;
  }

  #locationInfo .addressFormBox .addressForm .addressFormSign{
    color: #F05050;
    margin-left: 4px;
    font-size: 12px;
  }

  /*地址搜索框*/
  #locationInfo .addressForm .addressFormMap{
    display: block;
    width: 400px;
  }

  /*日期选择器*/
  #locationInfo .addressForm .addressFormDate{
    width: 400px;
    border-radius: 0;
    border: none;
    border-bottom: 1px solid rgba(210,210,210,0.6);
    height: 36px;
    padding-left: 6px;
  }

  .el-range-editor.is-disabled{
    background-color: transparent;
  }

  #locationInfo .addressForm .addressFormDate.is-active{
    border-color: rgba(255,105,14,0.6);
  }

  /*单选框组*/
  #locationInfo .addressForm .addressFormRadio{
    margin-top: 12px;
  }

  /*折叠面板*/
  #locationInfo .locationCollapse{
    border: none;
    margin-top: 60px;
  }

  /*场景信息*/
  #locationInfo .sceneBox .sceneDesc{
    font-size:12px;
    color:rgba(57,63,81,0.8);
    line-height: 12px;
    margin: 6px 0 30px 10px;
  }

  #locationInfo .sceneBox .sceneInfoBox{
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-left: 10px;
  }

  #locationInfo .sceneBox .sceneInfoBox .sceneInfo{
    width:170px;
    height:70px;
    border-radius:2px;
    overflow: hidden;
    position: relative;
    margin: 0 14px 20px 0;
  }

  #locationInfo .sceneBox .sceneInfoBox .sceneInfo .sceneInfoTitle{
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

  #locationInfo .sceneBox .sceneInfoBox .sceneInfo .sceneInfoDesc{
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

  #locationInfo .sceneBox .sceneInfoBox .sceneInfo .sceneDeleBox{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(51,51,51,0.8);
    opacity: 0;
    transition: opacity .6s;
  }

  #locationInfo .sceneBox .sceneInfoBox .sceneInfo:hover .sceneDeleBox{
    opacity: 1;
  }

  #locationInfo .sceneBox .sceneInfoBox .sceneInfo .sceneDeleBox .sceneDele{
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

  #locationInfo .sceneBox .sceneInfoBox .sceneInfo:hover .sceneDeleBox .sceneDele{
    opacity: 1;
  }

  #locationInfo .sceneBox .sceneInfoBox .sceneInfo .sceneDeleBox i{
    font-size: 18px;
    color: #fff;
    line-height: 30px;
  }

  /*场景信息添加框*/
  #locationInfo .sceneBox .sceneInfoBox .sceneAdd{
    background:rgba(250,250,251,0.3);
    border:1px solid rgba(136,135,162,0.3);
    text-align: center;
    font-size:12px;
    color:rgba(57,63,81,0.8);
    cursor: pointer;
  }

  #locationInfo .sceneBox .sceneInfoBox .sceneAdd i{
    margin: 18px 0 8px;
    color: #393F51;
    opacity: 0.8;
    display: inline-block;
    line-height: 12px;
  }

  /*场次信息*/
  #locationInfo .sessionBox .sessionInfoBox{
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin: 30px 0 0 10px;
  }

  #locationInfo .sessionBox .sessionInfoBox .sessionInfo{
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

  #locationInfo .sessionBox .sessionInfoBox .sessionInfo:nth-of-type(even){
    background: rgba(237,149,21,.2);
  }

  /*地接人员信息*/
  #locationInfo .personnelBox{
    margin-top: 60px;
  }

  #locationInfo .personnelBox .personnelInfoBox{
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin: 30px 0 0 10px;
  }

  #locationInfo .personnelBox .personnelInfoBox .personnelInfo{
    margin: 0 14px 20px 0;
    display: flex;
    align-items: center;
    width:354px;
    height:130px;
    border-radius:2px;
    overflow: hidden;
    background: rgba(242,242,244,0.3);
    position: relative;
    cursor: pointer;
  }

  #locationInfo .personnelBox .personnelInfoBox .personnelLeft{
    width: 64px;
    height: 100%;
    background:rgba(137,140,204,1);
    text-align: center;
  }

  #locationInfo .personnelBox .personnelInfoBox .personnelLeft i{
    font-size: 32px;
    line-height: 130px;
    color: #fff;
  }

  #locationInfo .personnelBox .personnelInfoBox .personnelLeft.personnelLeftWoman{
    background: rgba(243,115,115,1);
  }

  #locationInfo .personnelBox .personnelInfoBox .personnelRight{
    border: 1px solid rgba(136,135,162,0.3);
    border-left: none;
    width: calc(100% - 64px);
    height: 100%;
    padding: 14px 12px 10px 12px;
  }

  #locationInfo .personnelBox .personnelInfoBox .personnelTop{
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 24px;
  }

  #locationInfo .personnelBox .personnelInfoBox .personnelTop .personnelName{
    font-size:14px;
    color:rgba(57,63,81,1);
  }

  #locationInfo .personnelBox .personnelInfoBox .personnelTop .personnelName span{
    font-size:14px;
    color:rgba(57,63,81,0.8);
  }

  #locationInfo .personnelBox .personnelInfoBox .personnelTop .personnelDeleBox{
    width:24px;
    height:24px;
    background:rgba(234,80,80,1);
    border-radius:2px;
    text-align: center;
    cursor: pointer;
  }

  #locationInfo .personnelBox .personnelInfoBox .personnelTop .personnelDeleBox i{
    color: #fff;
    line-height: 24px;
  }

  #locationInfo .personnelBox .personnelInfoBox .personnelPosition{
    font-size:12px;
    color:rgba(57,63,81,0.8);
    line-height: 12px;
    margin-top: 16px;
  }

  #locationInfo .personnelBox .personnelInfoBox .personnelContactBox{
    display: flex;
    height:24px;
    align-items: center;
    margin-top: 30px;
  }

  #locationInfo .personnelBox .personnelInfoBox .personnelContactBox .personnelContact{
    width:123px;
    height:24px;
    background:rgba(129,132,144,0.1);
    border-radius:4px;
    padding-left: 6px;
    font-size:12px;
    color:rgba(57,63,81,1);
    display: flex;
    align-items: center;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }

  #locationInfo .personnelBox .personnelInfoBox .personnelContactBox .personnelContact i{
    font-size: 16px;
    color: #39BEE8;
    margin-right: 10px;
  }

  #locationInfo .personnelBox .personnelInfoBox .personnelWchat{
    margin-left: 20px;
  }

  #locationInfo .personnelBox .personnelInfoBox .personnelContactBox .personnelWchat i{
    color: #32C58F;
  }

  #locationInfo .personnelBox .personnelAdd{
    border:1px solid rgba(136,135,162,0.3);
    justify-content: center;
    flex-direction: column;
    color:rgba(57,63,81,0.8);
    font-size: 12px;
  }

  #locationInfo .personnelBox .personnelAdd i{
    color:rgba(57,63,81,0.8);
    font-size: 24px;
    cursor: pointer;
    line-height: 24px;
  }

  #locationInfo .personnelBox .personnelDeleShadow{
    position: absolute;
    width: 100%;
    height: 100%;
    background:rgba(0,0,0,.7);
  }

  #locationInfo .personnelBox .personnelDeleText{
    font-size:12px;
    color:rgba(255,255,255,1);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 40px;
  }

  #locationInfo .personnelBox .personnelDeleText i{
    margin-right: 8px;
  }

  #locationInfo .personnelBox .personnelDeleFooter{
    width: 100%;
    height: 24px;
    display: flex;
    align-items: center;
    position: absolute;
    bottom: 0;
  }

  #locationInfo .personnelBox .personnelDeleFooter .personnelDeleBtn{
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

  #locationInfo .personnelBox .personnelDeleFooter .personnelDeleBtn:first-of-type{
    opacity: 0.6;
  }

  /*遮罩*/
  #locationInfo .shadeBox{
    width: calc(100% - 346px);
    height: calc(100vh - 117px);
    position: fixed;
    background:rgba(0,0,0,0.6);
    top: 98px;
    left: 326px;
    border-radius: 0 0 4px 4px;
  }

  #locationInfo .shadeBox .shadeTxt{
    position: absolute;
    top: 38%;
    left: 0;
    width: 100%;
    text-align: center;
    font-size:16px;
    color:rgba(255,255,255,1);
  }

  #locationInfo .shadeBox .shadeTxt i{
    font-size:64px;
    color:rgba(255,255,255,1);
  }

  #locationInfo .shadeBox .shadeTxt p:first-of-type{
    margin-top: 20px;
  }

  #locationInfo .shadeBox .shadeTxt p{
    line-height: 26px;
  }

  /*弹框表单*/
  #locationInfo .addDialog .addressFormBox{
    padding: 0 40px;
  }

  #locationInfo .addFormBox{
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  #locationInfo .addFormBox .addressForm{
    width: 185px;
  }

  #locationInfo .addDialog .addDialogFooter{
    width: 100%;
    height: 75px;
    border-top: 1px solid rgba(180,180,180,0.2);
    margin-top: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  #locationInfo .addDialog .addDialogFooter .addFooterBtn{
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

  #locationInfo .addDialog .addDialogFooter .addFooterBtn:last-of-type{
    border:1px solid rgba(186,186,186,1);
    background: #fff;
    margin-left: 36px;
    color: rgba(0,0,0,.8);
  }


  /*场景选择弹框*/
  #locationInfo .addDialog .addSceneDialog{
    display: flex;
  }

  #locationInfo .addDialog .addSceneDialog .sceneBox{
    width: 312px;
    background:rgba(63,62,106,0.05);
    border-right: 1px solid rgba(0,0,0,.05);
  }

  #locationInfo .addDialog .addSceneDialog .sceneBox .sceneTitle{
    font-size:12px;
    color:rgba(57,63,81,1);
    padding-left: 40px;
    margin-top: 18px;
  }

  #locationInfo .addDialog .addSceneDialog .sceneBox .sceneTitle span{
    font-size: 12px;
    color: #EB5252;
    margin-left: 4px;
  }

  #locationInfo .addDialog .addSceneDialog .sceneSelectBox{
    margin-top: 18px;
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    height: 280px;
    overflow-y: scroll;
    align-content: flex-start;
  }

  #locationInfo .addDialog .addSceneDialog .sceneBox .sceneSelect{
    margin: 0 0 8px 40px;
    width: 110px;
    height: 14px;
    display: flex;
    align-items: center;
    flex-shrink: 0;
  }

  #locationInfo .addDialog .addSceneDialog .sceneRightBox{
    width: 168px;
  }

  #locationInfo .addDialog .addSceneDialog .sceneRightBox .sceneSelectTotal{
    width: 100%;
    font-size:12px;
    height: 52px;
    line-height: 52px;
    padding-left: 12px;
    color:rgba(57,63,81,1);
  }

  #locationInfo .addDialog .addSceneDialog .sceneRightBox .sceneCheckBox{
    height: 280px;
    overflow-y: scroll;
    overflow-x: hidden;
  }

  #locationInfo .addDialog .addSceneDialog .sceneRightBox .sceneCheckBox .sceneSelectInfo{
    width:164px;
    height:26px;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px 0 12px;
  }

  #locationInfo .addDialog .addSceneDialog .sceneRightBox .sceneCheckBox .sceneSelectInfo:nth-child(odd){
    background:rgba(63,62,106,0.05);
  }

  #locationInfo .addDialog .addSceneDialog .sceneRightBox .sceneCheckBox .sceneSelectInfo .sceneName{
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

  #locationInfo .addDialog .addSceneDialog .sceneRightBox .sceneCheckBox .sceneSelectInfo i{
    font-size: 12px;
    color:rgba(129,132,144,1);
    line-height: 12px;
    cursor: pointer;
    opacity: 0;
    transition: opacity 1s;
    display: inline-block;
    margin-top: 2px;
  }

  #locationInfo .addDialog .addSceneDialog .sceneRightBox .sceneCheckBox .sceneSelectInfo:hover i{
    opacity: 1;
  }

  #locationInfo .addDialog.addSceneDialog .addDialogFooter{
    margin-top: 0;
  }
</style>

<style>
  /*title输入框*/
  #locationInfo .locationInfoTitle .locationInfoInput .el-input__inner{
    height: 25px;
    padding-left: 5px;
    font-size:14px;
    color:rgba(57,63,81,1);
    border-radius: 0;
    border: none;
    border-bottom: 1px solid rgba(210,210,210,0.6);
  }

  #locationInfo .locationInfoTitle .locationInfoInput .el-input__inner:focus{
    border-color: rgba(255,105,14,0.6);
  }

  #locationInfo .locationInfoTitle .locationInfoInput .el-input__suffix i{
    line-height: 26px;
  }

  /*信息输入框*/
  #locationInfo .addressForm .addressFormInput .el-input__inner{
    height: 36px;
    border-radius: 0;
    border: none;
    border-bottom: 1px solid rgba(210,210,210,0.6);
    font-size:12px;
    color:rgba(57,63,81,1);
  }

  #locationInfo .addressForm .addressFormInput:not(.addressFormMap) .el-input__inner{
    padding-left: 0;
  }

  #locationInfo .addressForm .addressFormInput .el-input__inner:focus{
    border-color: rgba(255,105,14,0.6);
  }

  .el-input.is-disabled .el-input__inner{
    background-color: transparent;
  }

  #locationInfo .addressForm .addressFormInput .el-input__prefix i{
    line-height: 36px;
    transition: color 1s;
  }

  #locationInfo .addressForm .addressFormInput .el-input__suffix i{
    line-height: 40px;
  }

  #locationInfo .addressForm .addressFormInput .el-input__prefix i.active{
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
  #locationInfo .addressForm .addressFormDate .el-input__icon{
    transition: color 1s;
    line-height: 36px;
  }

  #locationInfo .addressForm .addressFormDate.active .el-range__icon{
    color: #EE7373;
  }

  #locationInfo .addressForm .addressFormDate .el-range-input,
  #locationInfo .addressForm .addressFormDate .el-range-separator{
    font-size: 12px;
    color:rgba(57,63,81,1);
    line-height: 36px;
  }

  #locationInfo .addressForm .addressFormDate .el-range-input{
    padding-top: 5.5px;
    background-color: transparent!important;
  }

  /*单选组*/
  #locationInfo .addressForm .addressFormRadio .el-radio{
    width: 74px;
    margin: 0 22px 0 0;
    padding: 0;
    height: 24px;
    border:1px solid rgba(136,135,162,0.4);
    border-radius:12px;
    transition: background 0.5s;
    cursor: pointer;
  }

  #locationInfo .addressForm .addressFormRadio .el-radio.is-checked{
    background: rgba(237,149,21,1);
    border-color: rgba(237,149,21,1);
  }

  #locationInfo .addressForm .addressFormRadio .el-radio__input{
    display: none;
  }

  #locationInfo .addressForm .addressFormRadio .el-radio__label{
    padding-left: 0;
    width: 72px;
    line-height: 22px;
    text-align: center;
    display: inline-block;
    font-size:12px;
    color:rgba(57,63,81,1);
    transition: color 0.5s;
  }

  #locationInfo .addressForm .addressFormRadio .el-radio.is-checked .el-radio__label{
    color: #fff;
  }

  /*折叠面板*/
  #locationInfo .locationCollapse .el-collapse-item__header{
    border: none;
    position: relative;
  }

  #locationInfo .locationCollapse .el-collapse-item__arrow{
    position: absolute;
    left: 72px;
    color: rgba(57,63,81,1);
  }

  #locationInfo .locationCollapse .el-collapse-item__wrap{
    border-bottom: none;
  }

  /*弹框表单*/
  #locationInfo .addDialog .el-dialog .el-dialog__header{
    height: 54px;
    padding: 0;
  }

  #locationInfo .addDialog .el-dialog .el-dialog__header .el-dialog__title{
    font-size: 14px;
    line-height: 54px;
    height: 54px;
  }

  #locationInfo .addDialog .el-dialog .el-dialog__header .el-dialog__headerbtn{
    top: 15px;
    right: 36px;
  }

  #locationInfo .addDialog .el-dialog .el-dialog__header .el-dialog__headerbtn>i{
    font-size: 16px;
    line-height: 16px;
    font-weight: bold;
  }

  #locationInfo .addDialog .el-dialog__body{
    padding: 0;
    overflow: hidden;
  }


  /*场景选择弹框*/
  #locationInfo .addDialog .addSceneDialog .sceneBox .sceneSelect .el-checkbox__label{
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

  #locationInfo .addDialog .addSceneDialog .sceneBox .sceneSelect  .el-checkbox__input{
    height: 14px;
  }

  #locationInfo .addDialog .addSceneDialog .sceneBox .sceneSelect .el-checkbox__inner{
    background: none;
    border-color: rgba(129,132,144,0.8);
  }

  #locationInfo .addDialog .addSceneDialog .sceneBox .sceneSelect .el-checkbox__input.is-checked .el-checkbox__inner{
    background: #ed9515;
    border-color: #ed9515;
  }

</style>
