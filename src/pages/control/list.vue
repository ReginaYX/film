<template>
    <div id="liebiao">
      <img src="../../assets/listBg.png" alt="" class="listBg">


      <div class="listProjectBox">
        <div class="listProject" v-if="first!=''" >

          <div class="listLate">
            <div class="projectLate" >
              <!--<div class="projectLateBox">-->
                <div class="projectInfo" @click.self="fetchPwd(first.play_id,first.project_id)">
                  <div class="projectLate_name">{{first.name}}</div>
                  <div class="projectLate_director">导演：{{first.director}}</div>
                  <div class="projectLate_director projectLate_date">最近更新：
                    <p v-if="first.updated_at != undefined">{{first.updated_at | changeTime}}</p>
                    <p v-else>{{first.created_at | changeTime}}</p>
                  </div>
                  <div class="projectLateBtn" @click="edit(first.project_id)">编辑项目</div>
                </div>
                <!--<div class="projectFunctionBox">-->
                  <!--<div class="projectFunction">-->
                    <!--&lt;!&ndash;<div class="projectEditBox" v-if='first.project_id != 1' @click="edit(first.project_id)">编辑项目</div>&ndash;&gt;-->
                    <!--&lt;!&ndash;<div class="projectPwdBox" @click="projectPwd" v-if="pwdNd">&ndash;&gt;-->
                    <!--&lt;!&ndash;申请二级密码保护&ndash;&gt;-->
                    <!--&lt;!&ndash;</div>&ndash;&gt;-->
                  <!--</div>-->
                <!--</div>-->
              <!--</div>-->
              <div class="projectLateRightBox">
                <img :src="'http://service.test.filmptn.com/files/'+first.poster_path" alt="" v-if="first.poster_path" class="projectLateRight">
                <img src="../../assets/list_defaultFirstPost.png" alt="" class="projectLateRight">
                <img src="../../assets/signImgBig.png" alt="" v-if="first.operation_type == 2" class="signImg">
              </div>

            </div>
          </div>
        </div>
        <!--为空时-->
        <div class="listProject projectNull" v-else>
          <div class="listLate">
            <div class="projectLate" >
              <!--<div class="projectLateBox">-->
                <div class="projectInfo">
                  <div class="projectLate_name">暂无项目</div>
                </div>
                <!--<div class="projectFunctionBox">-->
                  <!--<div class="projectFunction">-->
                    <!--<div class="projectEditBox">编辑项目</div>-->
                    <!--&lt;!&ndash;<div class="projectPwdBox">&ndash;&gt;-->
                    <!--&lt;!&ndash;申请二级密码保护&ndash;&gt;-->
                    <!--&lt;!&ndash;</div>&ndash;&gt;-->
                  <!--</div>-->

                <!--</div>-->
              <!--</div>-->
              <div class="projectLateRightBox">
                <img src="../../assets/list_defaultFirstPost.png" alt="" class="projectLateRight">
              </div>

            </div>
          </div>
        </div>
        <div class="leadBox">
          <div class="txt">一分钟快速入门非幕制片</div>
          <i class="iconfont iconbofang" @click="videoSelect('4')"></i>
          <div class="btn" @click="moreVideoShade=true">更多视频</div>
        </div>
      </div>

      <div class="listHistory">

        <div class="projectTop">
          <div class="projectTitleBorder"></div>
          <p class="projectTitle">全部项目</p>
          <!--<router-link class="list-new-project" to="/lead">-->
            <!--<img src="../../assets/listHelp.png" alt="" class="projectFunctionIcon">-->
          <!--</router-link>-->
        </div>

        <div class="projectHistory">

          <el-row class="history_List">
            <el-col class="history_Project">
              <!--<el-card class="project_Box">-->
                <div class="new_Project">
                  <router-link class="Project_Link" to="/control/newbuild">
                    <i class="el-icon-plus addIcon"></i>
                    <span>添加项目</span>
                  </router-link>
                </div>
            </el-col>
            <el-col class="history_Project" v-if="item_info!=''" v-for="item,key in item_info" :key="item.project_id">
              <div class="project_Box" @click.self="fetchPwd(item.play_id,item.project_id)">
                <img :src="'https://service.test.filmptn.com/files/'+item.poster_path" alt="" v-if="item.poster_path" class="projectHistoryPoster" @click.self="fetchPwd(item.play_id,item.project_id)">
                <div v-else class="projectHistoryPoster projectDefaultPoster" @click.self="fetchPwd(item.play_id,item.project_id)"></div>
                <!--<img src="../../assets/signImgSmall.png" alt="" v-show="item.operation_type == '2'" class="signImg">-->
                <span class="project_name" @click.self="fetchPwd(item.play_id,item.project_id)">{{item.name}}</span>
                <div class="projectBtnBox">
                  <div class="editBtn" @click="edit(item.project_id)">编辑项目</div>
                  <div class="deleBtn" @click="dele(item)"><i class="iconfont iconshanchu"></i></div>
                </div>
              </div>
            </el-col>
          </el-row>


        </div>
      </div>
      <!--更多视频-->
      <transition name="el-zoom-in-center">
        <div class="videoShade" v-show="moreVideoShade" id="moreVideoShade">
          <div class="moreVideoBox">
            <i class="el-icon-circle-close" @click="moreVideoShade = false"></i>
            <div class="leadBox">
              <div class="txt">快速了解统筹系统</div>
              <i class="iconfont iconbofang" @click="videoSelect('1')"></i>
              <div class="btn time">1分19秒</div>
            </div>
            <div class="leadBox">
              <div class="txt">快速了解服化道系统</div>
              <i class="iconfont iconbofang" @click="videoSelect('2')"></i>
              <div class="btn">1分30秒</div>
            </div>
            <div class="leadBox">
              <div class="txt">快速了解电子通告单</div>
              <i class="iconfont iconbofang" @click="videoSelect('3')"></i>
              <div class="btn">1分56秒</div>
            </div>
            <div class="leadBox">
              <div class="txt">快速了解非幕制片</div>
              <i class="iconfont iconbofang" @click="videoSelect('4')"></i>
              <div class="btn">1分43秒</div>
            </div>
          </div>

        </div>
      </transition>
      <!--视频弹框-->
      <transition name="el-zoom-in-center">
        <div class="videoShade" v-if="videoShade1">
          <i class="el-icon-circle-close" @click="stopVideo('1')"></i>
          <video class="projectLead" muted loop controls id="leadVideo" autoplay>
            <source src="../../assets/sceneIntroduceVideo.mp4" type="video/mp4">
          </video>
        </div>
      </transition>
      <transition name="el-zoom-in-center">
        <div class="videoShade" v-if="videoShade2">
          <i class="el-icon-circle-close" @click="stopVideo('2')"></i>
          <video class="projectLead" muted loop controls id="leadVideo" autoplay>
            <source src="../../assets/toolLeadVideo.mp4" type="video/mp4">
          </video>
        </div>
      </transition>
      <transition name="el-zoom-in-center">
        <div class="videoShade" v-if="videoShade3">
          <i class="el-icon-circle-close" @click="stopVideo('3')"></i>
          <video class="projectLead" muted loop controls id="leadVideo" autoplay>
            <source src="../../assets/noticeLeadVideo.mp4" type="video/mp4">
          </video>
        </div>
      </transition>
      <transition name="el-zoom-in-center">
        <div class="videoShade" v-if="videoShade">
          <i class="el-icon-circle-close" @click="stopVideo('4')"></i>
          <video class="projectLead" muted loop controls id="leadVideo" autoplay>
            <source src="../../assets/listLead.mp4" type="video/mp4">
          </video>
        </div>
      </transition>
      <!--优惠券弹框-->
      <transition name="el-fade-in-linear">
        <div class="videoShade" v-show="couponNum!=0">
          <div class="couponBox">
            <i class="el-icon-circle-close" @click="couponNum=0"></i>
            <p>￥{{couponNum}}</p>
            <router-link class="couponBtn" to="/mine/coupon">查看优惠券</router-link>
          </div>
        </div>
      </transition>
      <el-dialog title="编辑项目" :visible.sync="editDialogVisible" width="570px" center class="addDialog" :before-close="resetForm">
        <el-form :model="form" ref="editValidateForm" class="addFormBox">
          <div class="formFlex averageForm">
            <el-form-item
                label="片名" prop="name" :rules="[{ required: true, message: '片名不能为空',trigger:'blur'}]">
              <el-input v-model="form.name" clearable  placeholder="请输入片名"></el-input>
            </el-form-item>
            <el-form-item
                label="导演" prop="director" :rules="[{ required: true, message: '导演不能为空',trigger:'blur'}]">
              <el-input v-model="form.director" clearable  placeholder="请输入导演姓名"></el-input>
            </el-form-item>
          </div>
          <div class="formFlex averageForm">
            <el-form-item
                label="制片方" prop="production_manager">
              <el-input v-model="form.production_manager" clearable  placeholder="请输入制片方姓名"></el-input>
            </el-form-item>
            <el-form-item
                label="制片主任" prop="marketing_producer">
              <el-input v-model="form.marketing_producer" clearable  placeholder="请输入制片主任姓名"></el-input>
            </el-form-item>
          </div>
          <div class="formFlex averageForm">
            <el-form-item
                label="制片人" prop="producer">
              <el-input v-model="form.producer" clearable  placeholder="请输入制片人姓名"></el-input>
            </el-form-item>
            <el-form-item
                label="统筹" prop="coordinator">
              <el-input v-model="form.coordinator" clearable  placeholder="请输入统筹姓名"></el-input>
            </el-form-item>
          </div>
          <div class="editKindBox">
            <p class="editLabel">类型 </p>
            <el-radio-group v-model="type" class="editKindCheckbox">
              <el-radio label="电影" class="editCheckBox" disabled></el-radio>
              <el-radio label="电视剧" class="editCheckBox" disabled></el-radio>
              <el-radio label="网络电影" class="editCheckBox" disabled></el-radio>
              <el-radio label="网剧" class="editCheckBox" disabled></el-radio>
              <el-radio label="剧情短片" class="editCheckBox" disabled></el-radio>
            </el-radio-group>
          </div>
          <div class="editPosterBox">
            <span class="editLabel">海报：</span>
            <img v-if="poster!=''&&form.poster==''" :src="'http://service.test.filmptn.com/files/'+poster" class="poster-show" align="middle" @click="posterSelect = true">
            <img v-else-if="form.poster!=''" :src="form.poster" class="poster-show" align="middle" @click="posterSelect = true">
            <div v-else class="posterBtn" @click="posterSelect = true">点击上传</div>
            <my-upload field="img"
                       @crop-success="cropSuccess"
                       v-model="posterSelect"
                       :width="248"
                       :height="185"
                       img-format="jpg" noCircle>
            </my-upload>
          </div>
        </el-form>
        <div class="addDialogFooter">
          <div class="addFooterBtn" @click="save">保存</div>
        </div>
      </el-dialog>
      <!--无权限弹框-->
      <no-access :noAccessVisible="noAccess" @close="(v)=>{noAccess = v}"></no-access>
    </div>
</template>

<script>
    import axios from "axios"
    import myUpload from 'vue-image-crop-upload';
    import nullBox from '../../common/nullBox'
    export default {
        name: "list",
        components: {myUpload,nullBox},
        data () {
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.pwdNdForm.checkPass  !== '') {
                        this.$refs.pwdNdForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.pwdNdForm.secondary_password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
           return {
             pwdNdDialog:false,//二级密码输入弹窗
             pwdNdValue:'',//二级密码值
             pwdNdForm:{
                 phone:"",
                 code:'',
                 secondary_password:'',
                 checkPass:''
             },
             pwdNd:true,
             time: 60, // 发送验证码倒计时
             sendMsgDisabled:false,
             dialogProjectPwd:false,//二级密码保护
             item_info:'',
             first:'',
             videoUrl:'',//视频url
             videoShade:false,//视频遮罩
             videoShade1:false,//视频遮罩
             videoShade2:false,//视频遮罩
             videoShade3:false,//视频遮罩
             moreVideoShade:false,//更多视频遮罩
             authId:1,
             noAccess:false,
             editDialogVisible:false,
             posterSelect:false,//图片上传框显示
             form:{
                 project_id:'',
                 user_id:JSON.parse(localStorage.user_id),
                 name:'',
                 director:'',
                 poster:'',
                 production_manager:'',
                 producer:'',
                 marketing_producer:'',
                 coordinator:'',
                 play:'',
                 type:'电视剧'
             },
             imgFile:'',
             poster:'',
             type:'',
             play:'',//跳转到的项目id
             project:'',//跳转到的项目id
             rules2: {
               secondary_password: [
                 { validator: validatePass, trigger: 'blur' }
               ],
               checkPass: [
                 { validator: validatePass2, trigger: 'blur' }
               ],
             },
             couponNum:'0',//优惠券金额
           }
        },
      methods:{
            //打开视频
          videoSelect(i){
              // var video=document.querySelectorAll('#leadVideo')
              // video[i-1].muted = false
              if(i=='1'){
                  this.videoShade1 = true
              }else if(i == '2'){
                  this.videoShade2 = true
              }else if(i == '3'){
                  this.videoShade3 = true
              }else if(i == '4'){
                  this.videoShade = true;
                  // video[3].play();
              }
          },

          //暂停播放
        stopVideo(i){
          var video=document.getElementById("leadVideo");
          video.pause();
          if(i=='1'){
              this.videoShade1 = false
          }else if(i == '2'){
              this.videoShade2 = false
          }else if(i == '3'){
              this.videoShade3 = false
          }else if(i == '4'){
              this.videoShade = false
          }
        },

          //验证是否有二级密码
          fetchPwd(play,project){
              this.play = play;
              this.project = project;

              this.$router.push('/details/scene?play_id='+this.play+'&project_id='+this.project)
          },
          //  打开二级密码弹窗
          projectPwd(){
              axios({
                  method: 'get',
                  url: '/user/info?user_id=' + this.form.user_id,
                  headers: {
                      'Content-type': 'application/x-www-form-urlencoded'
                  }
              }).then((response) => {
                  if (response.data.data.phone) {
                      this.pwdNdForm.phone = response.data.data.phone
                      this.dialogProjectPwd = true
                  }else{
                      this.$message('请先绑定手机号');
                  }
              })
          },
          //设置二级密码
          pwdNewSecond(formName){
              this.$refs[formName].validate((valid) => {
                  if (valid) {
                      let form = new FormData()
                      form.append('user_id', this.form.user_id)
                      form.append('secondary_password', this.pwdNdForm.secondary_password)
                      form.append('code', this.pwdNdForm.code)
                      axios.post('/account/secondary_password', form
                      ).then((response) => {
                          if (response.data.msg == 'ok') {
                              this.$message({
                                  message: '设置成功',
                                  type: 'success'
                              });
                              this.pwdNd = false
                              this.dialogProjectPwd = false
                          } else {
                              this.$alert(response.data.msg, '提示', {
                                  confirmButtonText: '确定'
                              });
                          }
                      })
                  } else {
                      return false;
                  }
              });
          },
          //  设置二级密码发送验证码
          secondPwdCode(){
              axios({
                  method: 'get',
                  url: '/sms/secondary_password?user_id='+this.form.user_id,
                  headers:{
                      'Content-type': 'application/x-www-form-urlencoded'
                  }
              }).then((response) => {
                  if (response.data.msg == 'ok') {
                      this.sendMsgDisabled = true;
                      var auth_timetimer = setInterval(() => {
                          this.time--;
                          if (this.time <= 0) {
                              this.time = 60;
                              this.sendMsgDisabled = false;
                              clearInterval(auth_timetimer);
                          }
                      }, 1000);
                  } else {
                      this.$alert(response.data.msg, '提示', {
                          confirmButtonText: '确定'
                      });
                  }
              })
          },
          //海报上传
          cropSuccess(imgDataUrl, field){
              if(this.authId==1){
                  var $Blob= this.getBlobBydataURI(imgDataUrl,'image/jpeg');
                  let formData = new FormData();
                  formData.append('project_id', this.form.project_id)
                  formData.append('user_id', JSON.parse(localStorage.user_id))
                  formData.append('poster', $Blob ,"file_"+Date.parse(new Date())+".jpeg")
                  axios({
                      method: 'post',
                      url: '/project/update',
                      data: formData,
                      headers:{
                          'Content-Type': 'multipart/form-data',
                          'Accept': '*/*',
                          'X-Requested-With': 'XMLHttpRequest'
                      }
                  }).then((response)=> {
                      if(response.data.ret == 0){
                         this.form.poster = imgDataUrl;
                      }else{
                          this.$message.error(response.data.msg+'，'+response.data.cause);
                      }
                  })
              }else{
                  this.noAccess = true
              }
          },
          getBlobBydataURI(imgDataUrl,type) {
              var binary = atob(imgDataUrl.split(',')[1]);
              var array = [];
              for(var i = 0; i < binary.length; i++) {
                  array.push(binary.charCodeAt(i));
              }
              return new Blob([new Uint8Array(array)], {type:type });
          },
          edit(id){
              this.$axios({
                  method: 'get',
                  url: '/auth/user/info?user_id='+JSON.parse(localStorage.user_id),
                  headers:{
                      'Content-type': 'application/x-www-form-urlencoded'
                  }
              }).then((response)=> {
                  for (var i = 0; i <response.data.data.auths.length; i++ ){
                      if(id in response.data.data.auths[i]){
                          for (var key in response.data.data.auths[i]){
                              if (key == id) {
                                  for (var j in response.data.data.auths[i] ){
                                      let index = response.data.data.auths[i][j].findIndex(d => d.id == '7');
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
              axios({
                  method: 'get',
                  url: '/project/info?project_id='+id,
                  headers:{
                      'Content-type': 'application/x-www-form-urlencoded'
                  }
              }).then((response)=> {
                  this.form.name = response.data.data.name
                  this.form.director = response.data.data.director
                  this.form.project_id = id
                  this.type = response.data.data.type_name
                  if(response.data.data.production_manager){
                      this.form.production_manager = response.data.data.production_manager
                  }
                  if(response.data.data.producer){
                      this.form.producer = response.data.data.producer
                  }
                  if(response.data.data.coordinator){
                      this.form.coordinator = response.data.data.coordinator
                  }
                  if(response.data.data.poster_path){
                      this.poster = response.data.data.poster_path
                  }
                  if(response.data.data.marketing_producer){
                      this.form.marketing_producer = response.data.data.marketing_producer
                  }
                  this.editDialogVisible = true
              }).then(()=>{
                  if(this.form.production_manager=='null'){
                      this.form.production_manager = ''
                  }
                  if(this.form.coordinator=='null'){
                      this.form.coordinator = ''
                  }
                  if(this.form.producer=='null'){
                      this.form.producer = ''
                  }
              })
          },
          getFile(e){
              let deviceFile = e.target.files;
              this.form.poster = deviceFile[0];
              var r= new FileReader();
              r.readAsDataURL(this.form.poster);
              r.onload=function  (e) {
                  document.getElementById('poster-show').src=this.result;
              };

          },
          save () {
            if(this.form.project_id == '1'){
               this.$message({
                      type: 'info',
                      message: '测试项目无法编辑'
                  });
            }else{
              if(this.authId==1){
                  let formData = new FormData()
                  formData.append('project_id', this.form.project_id)
                  formData.append('user_id', this.form.user_id)
                  formData.append('name', this.form.name)
                  formData.append('director', this.form.director)
                  formData.append('production_manager', this.form.production_manager)
                  formData.append('producer', this.form.producer)
                  formData.append('marketing_producer', this.form.marketing_producer)
                  formData.append('coordinator', this.form.coordinator)
                  axios({
                      method: 'post',
                      url: '/project/update',
                      data: formData,
                      headers:{
                          'Content-Type': 'multipart/form-data',
                          'Accept': '*/*',
                          'X-Requested-With': 'XMLHttpRequest'
                      }
                  }).then((response)=> {
                      if(response.data.ret == 0){
                          this.editDialogVisible = false;
                          this.$refs['editValidateForm'].resetFields();
                          this.poster='';
                          this.form.poster = '';
                          this.fetchData();
                          this.$message({
                              message: '保存成功',
                              type: 'success'
                          });
                      }else{
                          this.$message.error(response.data.msg);
                      }
                  })
              }else{this.noAccess = true}
            }
              
          },
          dele (data) {
              if(data.user_id == JSON.parse(localStorage.user_id)){
                  this.$confirm('确认删除后项目将不可恢复，是否刪除?', '项目管理', {
                      confirmButtonText: '确认删除',
                      cancelButtonText: '我不删了',
                      cancelButtonClass:'reverseCancel',
                      confirmButtonClass:'reverseConfirm'
                  }).then(() => {
                      axios({
                          method: 'post',
                          url: '/project/delete',
                          data:{
                              project_id:data.project_id,
                              user_id:JSON.parse(localStorage.user_id)
                          },
                          transformRequest: [function (data) {
                              let ret = ''
                              for (let it in data) {
                                  ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                              }
                              return ret
                          }],
                          headers:{
                              'Content-type': 'application/x-www-form-urlencoded'
                          }
                      }).then((response)=> {
                          if(response.data.ret == '0'){
                              this.$message({
                                  type: 'success',
                                  message: '删除成功!'
                              });
                              var user_id = JSON.parse(localStorage.user_id)
                              axios({
                                  method: 'get',
                                  url: '/project/list?user_id=' + user_id,
                                  headers: {
                                      'Content-type': 'application/x-www-form-urlencoded'
                                  }
                              }).then((response) => {
                                  if (response.data.data) {
                                      this.first = response.data.data[0]
                                      this.item_info = response.data.data;
                                  }
                              })
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
          //关闭编辑弹窗
          resetForm(done) {
              this.$refs['editValidateForm'].resetFields();
              this.poster='';
              this.form.poster = ''
              done();
          },
          fetchData(){
              var user_id = JSON.parse(localStorage.user_id)
              axios({
                  method: 'get',
                  url: '/project/list?user_id=' + user_id,
                  headers: {
                      'Content-type': 'application/x-www-form-urlencoded'
                  }
              }).then((response) => {
                  if (response.data.data) {
                      this.first = response.data.data[0]
                      this.item_info = response.data.data;
                  }
              })
          }

      },
        mounted () {
            if(localStorage.user_id) {
                var user_id = JSON.parse(localStorage.user_id)
                this.$axios.get('/coupon/coupon_by_invite', {
                    params: {
                        user_id: user_id
                    }
                }).then((response)=> {
                    if(response.data.data[0]){
                        this.couponNum = response.data.data[0].discount
                    }
                })
                this.fetchData();
                let form = new FormData()
                form.append('user_id', user_id)
                axios.post('/account/check_secondary_password', form
                ).then((response) => {
                    if (response.data.ret == 0) {
                        this.pwdNd = false
                    }
                })
            }else {
                this.$alert('登录已超时，请重新登录', '提示', {
                    confirmButtonText: '确定',
                    confirmButtonClass: 'aloneConfirmButton'
                });
                this.$router.push('/')
            }

        },
        filters: {
            changeIMG:function (url) {
                JSON.parse(url)
            },
            changeTime: function (value) {
                var date = new Date();
                date.setTime(value * 1000);
                var y = date.getFullYear();
                var m = date.getMonth() + 1;
                m = m < 10 ? ('0' + m) : m;
                var d = date.getDate();
                d = d < 10 ? ('0' + d) : d;
                var h = date.getHours();
                h = h < 10 ? ('0' + h) : h;
                var minute = date.getMinutes();
                var second = date.getSeconds();
                minute = minute < 10 ? ('0' + minute) : minute;
                return y + '-' + m + '-' + d+' '+h+':'+minute;
            }
        }
    }
</script>
<style src="../../css/el-message-box.css"></style>
<style>
  @import "../../css/el-form.css";
  @import "../../css/el-dialog.css";

  /*编辑弹框*/
  .editKindBox .editCheckBox .el-radio__input{
    display: none;
  }

  .editKindBox .editCheckBox .el-radio__label{
    padding: 4px 15px;
    /*height:24px;*/
    border-radius:12px;
    text-align: center;
    line-height: 10px;
    font-size:12px;
    color:rgba(0,0,0,0.6)!important;
  }

  .editKindBox .editCheckBox.is-checked .el-radio__label{
    background:rgba(237,149,21,1);
    color: #fff!important;
  }

  #liebiao+#footer .footer_content{
    padding-top: 60px;
    background: none;
  }
</style>
<style scoped>
  *{
    box-sizing: border-box;
    font-family: Microsoft Yahei, 微软雅黑;
  }
  body{
    padding: 0;
  }
  #liebiao{
    position: relative;
    overflow: hidden;
    padding-top: 50px;
    padding-bottom: 100px;
  }
  #liebiao .listBg{
    width: 100%;
    height: calc(100vh + 50px);
    position: fixed;
    top: -50px;
    left: 0;
    filter:alpha(opacity=5); /*支持 IE 浏览器*/
    /*filter: blur(6px);*/
    -moz-opacity:0.05; /*支持 FireFox 浏览器*/
    opacity:0.05; /*支持 Chrome, Opera, Safari 等浏览器*/
    mix-blend-mode: multiply;
    z-index: -1;
  }

  .listProjectBox{
    width: 1132px;
    height: 312px;
    margin: 0 auto;
    padding-top: 40px;
    display: flex;
    justify-content: space-between;
  }
  .listProject{
    height: 100%;
    position: relative;
    box-shadow: -1px 5px 6px 1px rgba(0,0,0,.12);
    background: #fff;
    width: 636px;
  }

  /*视频遮罩*/
  #liebiao .videoShade{
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 1999;
    background: rgba(0,0,0,0.3);
  }

  #liebiao .videoShade .projectLead{
    height: 88%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 88%;
    margin: auto;
    display: block;
  }

  #liebiao .videoShade i{
    color: #fff;
    font-size: 40px;
    position: absolute;
    top: 20px;
    right: 2.6%;
    cursor: pointer;
  }

  /*更多视频遮罩*/
  #liebiao .videoShade .moreVideoBox{
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    margin: auto;
    width:1132px;
    height:755px;
    background-color:rgba(255,255,255,1);
    background-image: url("../../assets/moreVideoBg.png");
    border-radius:2px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-content: space-between;
    padding: 80px 50px;
  }

  #liebiao .videoShade .moreVideoBox>i{
    color: #fff;
    font-size: 40px;
    position: absolute;
    top: 20px;
    right: -66px;
    cursor: pointer;
  }

  #liebiao .videoShade .moreVideoBox .leadBox{
    width: 490px;
    height: 270px;
    border-radius: 6px;
    transition: all 0.8s;
  }

  #liebiao .videoShade .moreVideoBox .leadBox:after{
    content: '';
    background: rgba(0,0,0,0);
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    transition: all 0.8s;
  }

  #liebiao .videoShade .moreVideoBox .leadBox:hover{
    transform:translateY(-12px);
  }

  #liebiao .videoShade .moreVideoBox .leadBox:hover:after{
    background: rgba(0,0,0,.2);
  }

  #liebiao .videoShade .moreVideoBox .leadBox .txt{
    font-size:30px;
    font-weight:bold;
    color:rgba(255,255,255,1);
    z-index: 1;
  }

  #liebiao .videoShade .moreVideoBox .leadBox:hover .txt{
    opacity: 0.4;
  }

  #liebiao .videoShade .moreVideoBox .leadBox i{
    opacity: 0;
    z-index: 2;
  }

  #liebiao .videoShade .moreVideoBox .leadBox:hover i{
    opacity: 1;
  }

  #liebiao .videoShade .moreVideoBox .leadBox .btn{
    width:70px;
    height:24px;
    background:rgba(255,255,255,0.2);
    line-height: 24px;
    border-radius:2px;
    top: initial;
    bottom: 15px;
    right: 15px;
  }

  #liebiao .videoShade .moreVideoBox .leadBox:hover .btn{
    color: rgba(255,255,255,.2);
  }

  /*优惠券遮罩*/
  #liebiao .videoShade .couponBox i{
    top: -4px;
    right: -10px;
  }

  #liebiao .videoShade .couponBox{
    width: 480px;
    height: 446px;
    background-image: url("../../assets/listCouponBg.png");
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }

  #liebiao .videoShade .couponBox p{
    font-size:64px;
    font-weight:bold;
    color:rgba(251,87,30,1);
    position: absolute;
    top: 233px;
    width: 100%;
    text-align: center;
  }

  #liebiao .videoShade .couponBox .couponBtn{
    width:190px;
    height:40px;
    line-height: 40px;
    font-size:16px;
    text-align: center;
    color:rgba(255,255,255,1);
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 0 auto;
    cursor: pointer;
  }

  /*默认图片遮罩*/
  .listProject .projectLate_list{
    display: block;
    width: 54%;
    height: 100%;
    margin: 0;
  }


  /*最新编辑默认图片*/
  .listProject .projectLate_list .customPostFirst{
    position: absolute;
    top: 0;
    left: 0;
    width: 54%;
    height: 250px;
    mix-blend-mode: overlay;
  }

  .listProject .listLate{
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    /*padding-left: 90px;*/
    box-sizing: border-box;
    overflow: hidden;
  }

  .listProject .listLate .projectTitle{
    /*color: #fff;*/
    font-size: 20px;
    font-family: 'PingFangSC-Semibold', 'PingFang SC Semibold', 'PingFang SC';
    margin-bottom: 18px;
    line-height: 24px;
  }

  .listProject .listLate .projectDesc{
    font-size:12px;
    color:rgba(29,24,25,1);
    line-height: 20px;
    margin-bottom: 40px;
  }

  .listProject .listLate .projectBtn{
    width:123px;
    height:34px;
    background:rgba(237,149,21,1);
    border-radius:16px;
    font-size:14px;
    color:rgba(255,255,255,1);
    text-align: center;
    line-height: 34px;
    cursor: pointer;
  }


  /*历史项目*/
  .listHistory{
    width: 1132px;
    margin: 40px auto 0;
  }
  .listHistory .projectTop{
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-sizing: border-box;
      margin-bottom: 20px;
      position: relative;
      height: 82px;
  }
  .listHistory .projectTitle{
    font-size:22px;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(29,24,25,1);
    padding-left: 6px;
    letter-spacing: 1px;
  }

  .listHistory .projectTitleBorder{
    position: absolute;
    top: 48px;
    left: 0;
    width:105px;
    height:4px;
    background:rgba(246,174,69,1);
    opacity:0.5;
    border-radius:2px;
    z-index: -2;
  }

  .listHistory .projectHistory{
    height: auto;
    display: flex;
    /*flex-wrap: wrap;*/
  }

  /*新建项目*/
  .listHistory .projectHistory  .new_Project{
    width: 250px;
    height: 282px;
    background: #fff;
    border-radius: 6px;
    margin-right: 20px;
  }

  .listHistory .projectHistory  .new_Project span{
    display: block;
    font-size:16px;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(42,42,42,1);
  }

  .listHistory .projectHistory  .new_Project .Project_Link{
    width: 250px;
    height: 282px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .listHistory .projectHistory  .new_Project .addIcon{
    font-size: 40px;
    line-height: 58px;
    text-align: center;
    color: rgba(9,12,51,1);
    width: 58px;
    height: 58px;
    border-radius: 50%;
    border:2px solid rgba(9,12,51,1);
    opacity:0.2;
    margin-bottom: 15px;
  }
  .listHistory .projectHistory .history_List{
    width: auto;
    display: inline-block;
  }

  .listHistory .projectHistory .history_List .history_Project{
    width: 250px;
    height: 282px;
    margin-right: 44px;
    margin-bottom: 50px;
    cursor: pointer;
  }

  .listHistory .projectHistory .history_List .history_Project:nth-of-type(4n){
    margin-right: 0;
  }

  .listHistory .projectHistory .history_List .history_Project .project_Box{
    width: 250px;
    height: 282px;
    border-radius: 6px;
    background: #fff;
    box-shadow: 0 0 10px 5px rgba(0,0,0,0.05);
    overflow: hidden;
    transition: all 0.8s;
  }

  .listHistory .projectHistory .history_List .history_Project .project_Box:hover{
    background: rgba(63,62,106,1);
  }

  .listHistory .projectHistory .history_List .history_Project .project_Box .projectHistoryPoster{
    width: 100%;
    height: 185px;
  }

  .listHistory .projectHistory .history_List .history_Project .project_Box .projectDefaultPoster{
    background: url("../../assets/list_defaultPost.png") 100%/100% no-repeat;
  }

  .listHistory .projectHistory .history_List .history_Project .project_Box .signImg{
    border-width: 0px;
    position: absolute;
    right: -6px;
    top: -2px;
  }

  .listHistory .projectHistory .history_List .history_Project .project_Box .project_name{
    font-size:16px;
    color:rgba(42,42,42,1);
    line-height: 16px;
    padding: 0 15px;
    width: 100%;
    display: block;
    margin-top: 10px;
    height: 16px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }

  .listHistory .projectHistory .history_List .history_Project .project_Box:hover .project_name{
    color: #fff;
  }

  .listHistory .projectHistory .history_List .history_Project .project_Box .projectBtnBox {
    display: flex;
    align-items: center;
    padding: 0 15px;
    justify-content: space-between;
    margin-top: 24px;
  }

  .listHistory .projectHistory .history_List .history_Project .project_Box .projectBtnBox>div{
    background:rgba(237,237,237,1);
    border-radius:2px;
    cursor: pointer;
    text-align: center;
    color:rgba(57,63,81,1);
    font-size: 12px;
    line-height: 32px;
    height: 32px;
    width: 182px;
    transition: all 0.8s;
  }

  .listHistory .projectHistory .history_List .history_Project .project_Box:hover .projectBtnBox>div{
    color: #fff;
    background:rgba(255,255,255,0.2);
  }

  .listHistory .projectHistory .history_List .history_Project .project_Box .projectBtnBox .deleBtn{
    width:34px;
    background:rgba(237,237,237,1);
  }

  .listHistory .projectHistory .history_List .history_Project .project_Box .projectBtnBox .editBtn:hover{
    background:rgba(108,111,191,1);
  }

  .listHistory .projectHistory .history_List .history_Project .project_Box .projectBtnBox .deleBtn:hover{
    background:rgba(240,80,80,1);
  }

  .listProject .listLate .projectLate{
    display: flex;
    justify-content: space-between;
    height: 100%;
  }
  .listProject .listLate .projectLate .projectLateBox{
      /*max-width: 900px;*/
      width: 60%;
  }

  .listProject .listLate .projectLate .projectLead{
    width:420px;
    height:236px;
  }

  .listProject .listLate .projectLate .projectLateRight{
    width: 100%;
    height: 100%;
  }
  .listProject .listLate .projectLate .signImg{
    position: absolute;
    top: -3px;
    right: -6px;
  }

  .listProject .listLate .projectLate .projectInfo{
    height: 272px;
    width: 225px;
    padding: 60px 0 0 30px;
    cursor: pointer;
  }

  .listProject .listLate .projectLate .projectInfo .projectLate_name{
    /*color: #fff;*/
    font-size:22px;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(29,24,25,1);
    line-height: 22px;
    margin: 0 0 20px;
    height: 22px;
    text-overflow: ellipsis;
    width: 300px;
    white-space: nowrap;
    overflow: hidden;
  }

  .listProject .listLate .projectLate .projectInfo .projectLate_director,
  .listProject .listLate .projectLate .projectInfo .projectLate_date p{
    font-size:12px;
    font-family:PingFang-SC-Regular;
    color:rgba(29,24,25,1);
    line-height: 12px;
    margin-bottom: 12px;
  }

  .listProject .listLate .projectLate .projectInfo .projectLate_date p{
    margin-bottom: 0;
  }

  .listProject .listLate .projectLate .projectLate_date{
    display: inline-flex;
    font-size: 14px;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.647058823529412);
  }


  .listProject .listLate .projectLate .projectLate_date p{
    /*margin-top: 20px;*/
  }
  .listProject .listLate .projectLate .projectLate_director span{
    color: #999;
    font-family: 新宋体;
    font-size: 18px;
  }

  .listProject .listLate .projectLate .projectLateBtn{
    width:123px;
    height:34px;
    background:rgba(237,149,21,1);
    border-radius:17px;
    font-size:14px;
    text-align: center;
    line-height: 34px;
    color:rgba(255,255,255,1);
    margin-top: 30px;
  }


  #liebiao .leadBox{
    width:483px;
    height:272px;
    background-image: url("../../assets/leadVideoBg.png");
    text-align: center;
    box-shadow: 1px 5px 6px 1px rgba(0,0,0,.12);
    position: relative;
    background-repeat: no-repeat;
    background-color: #000;
  }

  #liebiao .leadBox .txt{
    font-size:22px;
    line-height: 22px;
    width: 100%;
    height: 22px;
    text-align: center;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    color:rgba(255,255,255,0.4);
    z-index: 0;
    transition: all 0.8s;
  }

  #liebiao .leadBox i{
    font-size: 64px;
    line-height: 272px;
    color: #fff;
    cursor: pointer;
    transition: font-size .2s,opacity .8s;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    margin: auto;
  }

  #liebiao .leadBox:hover i{
    font-size: 80px;
  }

  #liebiao .leadBox .btn{
    width:60px;
    height:18px;
    background:rgba(255,255,255,0.3);
    cursor: pointer;
    text-align: center;
    line-height: 18px;
    border-radius:2px;
    font-size:12px;
    color:rgba(255,255,255,1);
    transition: all 0.8s;
    position: absolute;
    top: 12px;
    right: 12px;
  }

  #liebiao .leadBox .btn:hover{
    color:rgba(237,149,21,1);
  }

  /*项目编辑*/
  .editKindBox .editLabel{
    font-size:12px;
    color:rgba(102,102,102,1);
  }

  .editKindBox .editKindCheckbox{
    margin-top: 6px;
  }

  .editPosterBox{
    margin-top: 36px;
    display: flex;
    position: relative;
  }

  .editPosterBox .editLabel{
    font-size:12px;
    color:rgba(56,56,56,1);
    margin-right: 8px;
  }

  .editPosterBox .poster-show{
    width: 200px;
    height: 150px;
    object-fit: cover;
    border-radius: 6px;
    cursor: pointer;
  }

  .editPosterBox .posterBtn{
    font-size:12px;
    text-decoration:underline;
    color:rgba(240,80,80,1);
    cursor: pointer;
  }

  .addDialog .addDialogFooter .addFooterBtn{
    width:140px;
    height:32px;
    background:rgba(237,149,21,1);
    border-radius:16px;
    border: none;
    color: #fff;
    margin-left: 0;
  }

  @media screen and (max-width: 1500px) {
   .listHistory .projectHistory .projectHistory_list{
       width: 15.4vw!important;
       margin-right: 1.58vw;
   }
    .editDialogTitleIcon{
      left: 41%;
    }
  }
  @media screen and (max-width: 1300px){
      .listHistory .projectHistory .projectHistory_list{
          width: 15vw!important;
          margin-right: 1.6vw;
      }

    #liebiao .videoShade i{
      right: 1.2%;
    }
      /*.listProject .listLate .projectLate .projectLate_list.defaultPostFirst{*/
          /*width: 290px;*/
      /*}*/
  }
</style>
