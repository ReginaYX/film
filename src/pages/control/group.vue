<template>
  <div class="group">
    <div class="groupTab">
      <el-tabs v-model="activeName">
        <el-tab-pane label="成员管理" name="first" class="firstTab" id="first">
          <div class="departmentBox">
            <div class="departmentTitle">
              <p><i class="iconfont iconquanbu"></i>全部分组</p>
              <div class="departmentTopBtn" @click="()=>{if(authId==1){addGroupDialog=true}else{noAccess = true}}">+创建分组</div>
            </div>
            <div class="departmentGroupBox">
              <transition-group tag="div" enter-active-class="animated slideInLeft" leave-active-class="animated flipOutX">
                <div :class="['departmentGroup',currentGroup.department_id==item.department_id?'active':'']"
                     v-for="item,index in department" :key="index" @click="getMember(item)">
                  <div class="departmentGroupContent">
                    <div class="departmentGroupName">{{item.name}}</div>
                    <div class="departmentGroupInfo">
                      <span v-if="item.num">{{item.num}}</span>
                      <span v-else>0</span>
                      <popover v-if="item.num" :editBtn="false" @dele="removeMove(item.department_id)" msg="组，组内人员自动分配至未分组" title="<i class='iconfont icongengduo4'>" :authId="authId" :confirm="false"></popover>
                      <popover v-else :editBtn="false" @dele="removeAll(item.department_id)" msg="组" title="<i class='iconfont icongengduo4'>" :authId="authId"></popover>
                    </div>
                  </div>
                </div>
              </transition-group>
            </div>
          </div>
          <transition name="el-zoom-in-top">
            <div class="memberBox" v-if="addMember==false">
             <div class="memberTitleBox">
               <div class="memberTitleHrBox">
                 <div class="titleHr"></div>
                 <p>{{currentGroup.name}}
                   <span v-if="currentGroup.num">（全部{{currentGroup.num}}个成员）</span>
                   <span v-else>（全部0个成员）</span>
                 </p>
               </div>
               <div class="memberTitleRight">
                 <div class="memberTitleBtn" @click="()=>{if(authId==1){addMember=true}else{noAccess = true}}">＋添加成员</div>
                 <search-input @get-search="getSearch"></search-input>
               </div>
             </div>
             <div class="memberContentBox" v-if="groupUser.length!==0">
               <div class="memberContent" v-for="item,index in groupUser" :key="index">
                <div class="memberInfoFlex">
                  <div class="memberPortrait normalPortrait">{{item.name.substr(0,1)}}</div>
                  <div class="memberInfoTxt">{{item.name}}</div>
                </div>
                 <div class="memberInfoTxt" v-if="item.phone">{{item.phone}}</div>
                 <div class="memberInfoTxt" v-else>{{item.email}}</div>
                 <div class="memberInfoTxt">{{currentGroup.name}}</div>
                 <div class="memberInfoTxt">{{item.role_name}} </div>
                 <div class="memberInfoFlex">
                   <el-tooltip effect="dark" content="移动分组" placement="bottom">
                     <div class="memberInfoBtn"
                          @click="()=>{if(authId==1){
                          moveGroupDialog=true;moveGroupForm.user_id=item.user_id;moveGroupForm.department_id=item.department_id
                          }else{noAccess = true}}">
                       <i class="iconfont iconyidong"></i>
                     </div>
                   </el-tooltip>
                   <el-tooltip effect="dark" content="修改权限" placement="bottom">
                     <div class="memberInfoBtn"
                          @click="()=>{if(authId==1){openUpsetAuth(item)}else{noAccess = true}}">
                       <i class="iconfont iconquanxian"></i>
                     </div>
                   </el-tooltip>
                   <div class="memberInfoBtn" @click="()=>{if(authId==1){memberDele(item.user_id)}else{noAccess = true}}"><i class="iconfont iconshanchu"></i></div>
                 </div>
               </div>
             </div>
              <div class="memberContentBox" v-else>
                <null-box msg="成员" btn="true" @add="()=>{if(authId==1){addMember=true}else{noAccess = true}}"></null-box>
              </div>
            </div>
          </transition>
          <transition name="el-zoom-in-bottom">
            <div v-show="addMember" class="memberBox">
              <div class="addMemberBox">
                <div class="addMemberTop">
                  <div class="addMemberTitle">添加成员</div>
                  <el-popover
                    placement="bottom-end"
                    width="370" :visible-arrow="false"
                    trigger="hover" popper-class="helpBox">
                    <div class="helpContent" v-for="item,index in authGroupList" :key="index" v-if="item.default_role">
                      <div class="helpLeft">{{item.role_name}}</div>
                      <div class="helpRight" v-html="item.description.substring(0,item.description.length-7)+'权限'"></div>
                    </div>
                    <div class="helpTitle" slot="reference">
                      成员权限&#12288;<i class="iconfont iconbangzhu"></i>
                    </div>
                  </el-popover>
                </div>
                <el-menu :default-active="activeIndex" class="addMemberMenu" mode="horizontal" @select="changeAddMenu">
                  <el-menu-item index="1">微信邀请</el-menu-item>
                  <el-menu-item index="2">邮件/手机号邀请</el-menu-item>
                </el-menu>
                <div v-if="activeIndex==2">
                  <transition-group class="addMemberFormBox" tag="div" enter-active-class="animated slideInLeft">
                  <div v-for="items,index in addMemberForm" :key="index">
                    <el-form :model="items" ref="addMemberValidateForm" class="addMemberForm">
                      <el-form-item prop="department_id" :rules="[{ required: true, message: '必须选择分组',trigger:'change'}]">
                        <el-popover  popper-class="addMembePopover" :visible-arrow="false"
                                     placement="bottom" width="200" trigger="manual" v-model="items.groupVisible">
                          <el-form :model="addGroupForm" ref="addValidateForm" class="addFormBox popoverContent">
                            <el-form-item class="onlyForm"
                                          label="新建分组名称" prop="name" :rules="[{ required: true, message: '请输入分组名称',trigger:'blur'}]">
                              <el-input v-model="addGroupForm.name" clearable  placeholder="请输入分组名称" @blur="addDepartment('add',items)"></el-input>
                            </el-form-item>
                          </el-form>
                          <el-select v-model="items.department_id" placeholder="选择分组" slot="reference"
                                     @change="groupSelect($event,items)"  popper-class="addMemberSelectPopper">
                            <el-option
                                v-for="item in departmentOptions"
                                :key="item.department_id"
                                :label="item.name"
                                :value="item.department_id">
                            </el-option>
                          </el-select>
                        </el-popover>
                      </el-form-item>
                      <el-form-item prop="role_id" :rules="[{ required: true, message: '必须选择权限',trigger:'change'}]">
                        <el-popover  popper-class="addMembePopover addAuthPopover" :visible-arrow="false"
                                     placement="bottom" width="375" trigger="manual" v-model="items.authVisible">
                          <div class="popoverContent">
                            <div class="popoverContentInfo">
                              <div class="title">权限组名称：</div>
                              <el-input placeholder="请输入权限组名称" v-model="addAuthForm.role_name" clearable></el-input>
                            </div>
                            <div class="popoverContentSwitch">
                              <el-switch
                                  v-model="item.is_enable" v-for="item,index in authorityContent" :key="index"
                                  :inactive-text="item.name" active-color="#32C58F" inactive-color="#BCBEC5">
                              </el-switch>
                            </div>
                            <div class="popoverFooter">
                              <div class="popoverFooterBtn" @click="authorityAdd(items)">确定</div>
                              <div class="popoverFooterBtn" @click="items.authVisible=false;items.role_id=''">取消</div>
                            </div>
                          </div>
                          <el-select v-model="items.role_id" placeholder="选择权限" slot="reference"
                                     @change="authSelect($event,items)" popper-class="addMemberSelectPopper moveMemberSelectPopper">
                            <el-option
                                v-for="item in authGroup"
                                :key="item.role_id"
                                :label="item.role_name"
                                :value="item.role_id">
                            </el-option>
                          </el-select>
                        </el-popover>
                      </el-form-item>
                      <el-form-item prop="email_list" class="addMemberFormLast" :rules="[{ required: true, message: '请输入账号',trigger:'blur'}]">
                        <el-input v-model="items.email_list" clearable  @focus="increaseMemberForm"
                                  placeholder="请输入邀请成员的邮箱/手机号，可以同时添加多个账号，以分号分隔。"></el-input>
                      </el-form-item>
                    </el-form>
                  </div>
                </transition-group>
                  <div class="addMemberBtnBox">
                    <div class="addMemberBtn" @click="submitAddMember">确定</div>
                    <div class="addMemberBtn" @click="addMember=false">取消</div>
                  </div>
                </div>
                <div v-else class="wxBox">
                  <div class="wxContentBox">
                    <img src="../../assets/groupCodeBg.png" alt="" class="bg">
                    <img :src="codeUrl" alt="" class="code">
                  </div>
                  <p>将二维码转发给微信好友<br />即可邀请团队成员加入该项目<br />（该方式进入项目的成员默认拥有“访客”权限）</p>
                </div>
              </div>
            </div>
          </transition>
        </el-tab-pane>
        <el-tab-pane label="权限说明" name="second" class="secondTab" id="second">
          <transition-group tag="div" enter-active-class="animated slideInLeft" leave-active-class="animated flipOutX">
            <div class="authorityBox" v-for="item,index in authGroupList" :key="index">
              <div class="authorityTitle">
                <div class="authorityTitleLeft">
                  <title-hr :msg="item.role_name"></title-hr>
                  <div class="authorityTitleNum">（全部成员{{item.num}}人）</div>
                </div>
                <i class="iconfont iconshanchu" v-if="item.default_role==false" @click="()=>{if(authId==1){authorityDele(item.role_id)}else{noAccess = true}}"></i>
              </div>
              <div class="authorityDesc" v-html="item.description"></div>
              <div class="authoritySwitchBox popoverContentSwitch" v-if="index!=3">
                <el-switch active-color="#32C58F" inactive-color="#BCBEC5" v-model="items.is_enable"
                           class="authoritySwitch disabled" disabled :inactive-text="items.name" v-for="items,indexs in item.auth_group_list" :key="indexs">
                </el-switch>
              </div>
              <div class="authoritySwitchBox popoverContentSwitch" v-else>
                <el-switch active-color="#32C58F" inactive-color="#BCBEC5" :value="items.name=='财务系统'?false:true"
                           class="authoritySwitch disabled" disabled :inactive-text="items.name" v-for="items,indexs in item.auth_group_list" :key="indexs">
                </el-switch>
              </div>
            </div>
          </transition-group>

        </el-tab-pane>
        <el-tab-pane label="项目设置" name="third" id="third">
          <div class="basicSettingBox">
            <div class="basicSetting">
              <p class="editLabel">片名：</p>
              <input type="text" class="name editInput" v-model="editForm.name" placeholder="请输入片名" :disabled="authId!=1">
            </div>
            <div class="basicSetting">
              <p class="editLabel">导演：</p>
              <input type="text" class="director editInput" v-model="editForm.director" placeholder="请输入导演名称" :disabled="authId!=1">
            </div>
            <div class="basicSetting">
              <p class="editLabel">制片方：</p>
              <input type="text" class="production_manager editInput" v-model="editForm.production_manager" placeholder="请输入制片方名称" :disabled="authId!=1">
            </div>
            <div class="basicSetting">
              <p class="editLabel">制片人：</p>
              <input type="text" class="producer editInput" v-model="editForm.producer" placeholder="请输入制片人名称" :disabled="authId!=1">
            </div>
            <div class="basicSetting">
              <p class="editLabel">制片主任：</p>
              <input type="text" class="marketing_producer editInput" name="marketing_producer"  :disabled="authId!=1"
                     v-model="editForm.marketing_producer" placeholder="请输入制片主任名称">
            </div>
            <div class="basicSetting">
              <p class="editLabel">统筹：</p>
              <input type="text" class="coordinator editInput" name="coordinator"  :disabled="authId!=1"
                     v-model="editForm.coordinator" placeholder="请输入统筹名称">
            </div>
          </div>
          <!--类型-->
          <div class="editKindBox">
            <p class="editLabel">类型： </p>
            <div class="editKind">
              <el-checkbox-group v-model="type" class="editKindCheckbox">
                <el-checkbox label="电影" class="memberCheckBox" disabled></el-checkbox>
                <el-checkbox label="电视剧" class="memberCheckBox" disabled></el-checkbox>
                <el-checkbox label="网络电影" class="memberCheckBox" disabled></el-checkbox>
                <el-checkbox label="网剧" class="memberCheckBox" disabled></el-checkbox>
                <el-checkbox label="剧情短片" class="memberCheckBox" disabled></el-checkbox>
              </el-checkbox-group>
              <span class="editKindDesc">注：类型确定后无法修改</span>
            </div>

          </div>
          <!--海报-->
          <div style="margin-top: 38px;position: relative" class="editPosterBox">
            <span class="editLabel">海报：</span>
            <img v-if="poster" :src="'http://service.test.filmptn.com/files/'+poster" class="poster-show" align="middle" id="poster-show">
            <div v-else class="poster-show defaultPoster"></div>
            <div class="posterBtn" @click="()=>{if(authId==1){posterSelect = true}else{noAccess = true}}">
              <p>点击上传</p>
            </div>
            <my-upload field="img"
                       @crop-success="cropSuccess"
                       v-model="posterSelect"
                       :width="248"
                       :height="185"
                       :params="posterParams"
                       img-format="jpg" noCircle>
            </my-upload>
            <!--<input type="file" class="poster"  accept="image/*" value="选择图片" @change="getFile($event)">-->
          </div>
          <div class="settingBoxFooter">
            <div class="settingFooterBtn" @click="saveProjectInfo">保存</div>
            <div class="settingFooterBtn" @click="deleProject">删除</div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!--引导-->
    <div id="walkthrough-content" style="display: none">
      <div id="walkthrough-1">
        成员管理
        <p>点击下一步了解更多...</p>
      </div>
      <div id="walkthrough-2">点击此处分享剧组小程序二维码</div>
      <div id="walkthrough-3">在此处对申请进行管理</div>
    </div>
    <no-access></no-access>
    <!--移动组弹框-->
    <el-dialog
      title="移动分组"
      :visible.sync="moveGroupDialog"
      width="480px" center class="addDialog">
      <el-form :model="moveGroupForm" ref="moveValidateForm" class="addFormBox">
        <el-form-item class="onlyForm"
          label="移动组别至" prop="department_id" :rules="[{ required: true, message: '请选择组别',trigger:'change'}]">
          <el-popover  popper-class="addMembePopover" :visible-arrow="false"
                       placement="bottom" width="200" trigger="manual" v-model="addGroupForm.visible">
            <el-form :model="addGroupForm" ref="addValidateForm" class="addFormBox popoverContent">
              <el-form-item class="onlyForm"
                            label="新建分组名称" prop="name" :rules="[{ required: true, message: '请输入分组名称',trigger:'blur'}]">
                <el-input v-model="addGroupForm.name" clearable  placeholder="请输入分组名称" @blur="addDepartment('move')"></el-input>
              </el-form-item>
            </el-form>
            <el-select v-model="moveGroupForm.department_id" placeholder="请选择分组名称" slot="reference"
                       @change="groupSelect($event)"  popper-class="addMemberSelectPopper moveMemberSelectPopper">
              <el-option
                v-for="item in departmentOptions"
                :key="item.department_id"
                :label="item.name"
                :value="item.department_id">
              </el-option>
            </el-select>
          </el-popover>
        </el-form-item>
      </el-form>
      <div class="addDialogFooter">
        <div class="addFooterBtn" @click="moveGroup">确认</div>
        <div class="addFooterBtn" @click="resetForm('moveValidateForm');moveGroupDialog=false">取消</div>
      </div>
    </el-dialog>
    <!--创建组弹框-->
    <el-dialog
      title="添加分组"
      :visible.sync="addGroupDialog"
      width="480px" center class="addDialog">
      <el-form :model="addGroupForm" ref="addValidateForm" class="addFormBox">
        <el-form-item class="onlyForm"
                      label="分组名称" prop="name" :rules="[{ required: true, message: '请输入分组名称',trigger:'blur'}]">
          <el-input v-model="addGroupForm.name" clearable  placeholder="请输入分组名称"></el-input>
        </el-form-item>
      </el-form>
      <div class="addDialogFooter">
        <div class="addFooterBtn" @click="addDepartment">创建</div>
        <div class="addFooterBtn" @click="resetForm('addValidateForm');addGroupDialog=false">取消</div>
      </div>
    </el-dialog>
    <!--修改权限弹框-->
    <el-dialog
      title="修改权限"
      :visible.sync="upsetAuthDialog"
      width="480px" center class="addDialog">
      <el-form :model="upsetAuthForm" ref="upsetAuthValidateForm" class="addFormBox">
        <el-form-item class="onlyForm notOnly"
                      label="权限组名称" prop="role_id" :rules="[{ required: true, message: '请输入权限组名称',trigger:'change'}]">
          <el-popover  popper-class="addMembePopover addAuthPopover" :visible-arrow="false"
                       placement="bottom" width="375" trigger="manual" v-model="addAuthForm.visible">
            <div class="popoverContent">
              <div class="popoverContentInfo">
                <div class="title">权限组名称：</div>
                <el-input placeholder="请输入权限组名称" v-model="addAuthForm.role_name" clearable></el-input>
              </div>
              <div class="popoverContentSwitch">
                <el-switch
                  v-model="item.is_enable" v-for="item,index in authorityContent" :key="index"
                  :inactive-text="item.name" active-color="#32C58F" inactive-color="#BCBEC5">
                </el-switch>
              </div>
              <div class="popoverFooter">
                <div class="popoverFooterBtn" @click="authorityAdd">确定</div>
                <div class="popoverFooterBtn" @click="addAuthForm.visible=!addAuthForm.visible;upsetAuthForm.role_id=''">取消</div>
              </div>
            </div>
            <el-select v-model="upsetAuthForm.role_id" placeholder="选择权限" slot="reference"
                       @change="authSelect($event,'get')" popper-class="addMemberSelectPopper moveMemberSelectPopper">
              <el-option
                v-for="item in authGroup"
                :key="item.role_id"
                :label="item.role_name"
                :value="item.role_id">
              </el-option>
            </el-select>
          </el-popover>
        </el-form-item>
        <transition name="el-zoom-in-top">
          <el-form-item class="onlyForm notOnly" label="所属权限" prop="value" v-if="upsetAuthForm.role_id!=''&&upsetAuthForm.role_id!='0'">
            <div class="popoverContentSwitch">
              <el-switch disabled
                         v-model="item.is_enable" v-for="item,index in roleAuth.auth_group_list" :key="index"
                         :inactive-text="item.name" active-color="#32C58F" inactive-color="#BCBEC5">
              </el-switch>
            </div>
          </el-form-item>
        </transition>
      </el-form>
      <div class="addDialogFooter">
        <div class="addFooterBtn" @click="authorityUpdate">确定</div>
        <div class="addFooterBtn" @click="resetForm('upsetAuthValidateForm');upsetAuthDialog=false">取消</div>
      </div>
    </el-dialog>
    <!--无权限弹框-->
    <no-access :noAccessVisible="noAccess" @close="(v)=>{noAccess = v}"></no-access>
  </div>
</template>

<script>
  import axios from "axios";
  import animate from 'animate.css'
  import titleHr from '../../common/titleHr';
  import popover from '../../common/popoverFunction'
  import searchInput from '../../common/searchInput'
  import nullBox from '../../common/nullBox'
  import myUpload from 'vue-image-crop-upload';
  import global_ from '../../common/Global'
    export default {
      name: "group",
      components: {myUpload,titleHr,popover,searchInput,nullBox},
      data() {
        return {
          visible:false,
          authId:0,//权限信息
          activeName:'first',//topnav
          department: [],//分组信息
          departmentOptions: [],//分组选项
          addGroupForm:{
            name:'',
            visible:false
          },
          tree:true,
          currentGroup:{},//当前组的信息
          groupUser:[],//群组人员
          getDepartmentMember:[],//获取某部门成员
          addMember:false,//新增成员
          moveGroupForm:{
            department_id:'',
            user_id:''
          },//移动组表单
          moveGroupId:'',
          upsetAuthForm:{
            user_id:'',
            role_id:''
          },//修改权限组表单
          addAuthForm:{
            visible:false,
            role_name:''
          },//添加权限组表单
          activeIndex:'1',//新增tab
          value: '',
          codeUrl:'',//二维码链接
          host:global_.pathInfo,
          addMemberForm:[{department_id:'',email_list:'',role_id:'',groupVisible:false,authVisible:false}],//添加成员表单
          authorityContent:[],//可设置的权限内容
          roleAuth:'',//权限组对应权限
          authGroup:'',//权限组列表
          authGroupList:'',//权限组
          editForm:{
              user_id:JSON.parse(localStorage.user_id),
              name:'',
              director:'',
              poster:'',
              production_manager:'',
              producer:'',
              marketing_producer:'',
              coordinator:'',
              ownerUser:''
          },//项目编辑
          poster: '',//项目海报
          posterParams: {
              user_id:'',
              profile:''
          },
          posterSelect:false,
          type:'',//项目类型
          moveGroupDialog:false,//移动组弹框
          addGroupDialog:false,//创建分组弹框
          upsetAuthDialog:false,//修改权限弹框
          noAccess:false,//无权限弹框
        };
      },
      methods:{
          //添加成员menu
          changeAddMenu(key, keyPath){
              this.activeIndex = key
          },
          //获取分组
          getDepartment(type){
            axios.get('/auth/get_department_member', {
                params: {
                    project_id: this.$route.query.project_id
                }
            }).then((response)=> {
                if(response.data.ret == '0'){
                  this.department = response.data.data;
                  if(type!='return'){
                    if(this.currentGroup.department_id){
                      this.getMember(this.currentGroup)
                    }else{
                      this.getMember(this.department[0])
                    }
                  }
                }else{
                    this.$message(response.data.msg+'，'+response.data.cause);
                }
            })
          },
          //分组列表
          getDepartmentList(){
            axios.get('/auth/get_department', {
              params: {
                project_id: this.$route.query.project_id
              }
            }).then((response)=> {
              if(response.data.ret == '0'){
                this.departmentOptions = response.data.data;
                let obj = {"name": "＋添加分组",department_id:'0'};
                this.departmentOptions.splice(0,0,obj)
              }else{
                this.$message(response.data.msg+'，'+response.data.cause);
              }
            })
          },
          //添加部门保存
          addDepartment(kind,data){
            if(this.authId==1){
              if(this.$refs['addValidateForm'].validate){
                this.$refs['addValidateForm'].validate((valid) => {
                  if (valid) {
                    this.submitAddDepartment(kind,data)
                  }else{
                    if(data){
                      data.groupVisible=false;
                      data.department_id = '';
                    }else{
                      this.addGroupForm.visible=false;
                      this.moveGroupForm.department_id = '';
                    }
                  }
                })
              }else{
                this.submitAddDepartment(kind,data)
                if(data.groupVisible){
                  data.groupVisible=false;
                  data.department_id = ''
                }
              }
            }else{
              this.noAccess = true
            }
          },
        submitAddDepartment(kind,data){
          let form = new FormData();
          form.append("project_id", this.$route.query.project_id);
          form.append("name", this.addGroupForm.name);
          axios({
            method: 'post',
            url: '/auth/add_department',
            headers:{
              'Content-type': 'application/x-www-form-urlencoded'
            },
            data:form
          }).then((response)=> {
            if(response.data.ret == '0'){
              this.getDepartmentList();
              this.getDepartment();
              this.addGroupDialog = false;
              if(this.addGroupForm.visible){
                if(kind == 'move'){
                  this.$nextTick( ()=> {
                    this.moveGroupForm.department_id = response.data.data
                  })
                }
                this.addGroupForm.visible = false;
              }
              if(data){
                this.$nextTick( ()=> {
                  data.department_id = response.data.data
                });
                data.groupVisible = false;
              }
            }else{
              this.$message(response.data.msg+'，'+response.data.cause);
            }
          })
        },
          //移除分组
          remove(id,data) {
            if(this.authId==1){
              axios.get('/auth/delete_department', {
                params: {
                  department_id: id,
                  default_department_id: data,
                  project_id : this.$route.query.project_id
                }
              }).then((response)=> {
                if(response.data.ret == 0){
                  let index = this.department.findIndex(d => d.department_id == data);
                  this.currentGroup = this.department[index];
                  this.getDepartment();
                  this.getDepartmentList()
                }else{
                  this.$message(response.data.msg+'，'+response.data.cause);
                }
              })
            }else{
              this.noAccess = true
            }
          },
        removeAll(id,data) {
          if(this.authId==1){
            axios.get('/auth/delete_department', {
              params: {
                department_id: id,
                default_department_id: '',
                project_id : this.$route.query.project_id
              }
            }).then((response)=> {
              if(response.data.ret == 0){
                this.currentGroup = {};
                this.getDepartment();
                this.getDepartmentList()
              }else{
                this.$message(response.data.msg+'，'+response.data.cause);
              }
            })
          }else{
            this.noAccess = true
          }
        },
        //删除并移动组
        removeMove(id){
          this.$confirm('该组内有项目成员，是否继续删除？（温馨提示：确认删除后将移除组内相关人员）', '提示', {
            confirmButtonText: '确定删除',
            cancelButtonText: '移动组员',
            cancelButtonClass:'reverseCancel',
            confirmButtonClass:'reverseConfirm',
            distinguishCancelAndClose: true,
          }).then(() => {
            axios.get('/auth/delete_department', {
              params: {
                department_id: id,
                default_department_id:'',
                project_id : this.$route.query.project_id
              }
            }).then((response)=> {
              if(response.data.ret == 0){
                this.getDepartment();
                this.getDepartmentList()
              }else{
                this.$message(response.data.msg+'，'+response.data.cause);
              }
            })
          }).catch((action ) => {
            if(action == 'cancel'){
              this.moveGroupForm.department_id =  id;
              this.moveGroupId = id;
              this.moveGroupDialog = true
            }
          });
        },
        //移动分组
        moveGroup(){
          if(this.authId==1){
            if(this.moveGroupForm.user_id!=''){
              let form = new FormData();
              form.append("project_id", this.$route.query.project_id);
              form.append("user_id", this.moveGroupForm.user_id);
              form.append("department_id", this.moveGroupForm.department_id);
              axios({
                method: 'post',
                url: '/auth/update_member',
                headers:{
                  'Content-type': 'application/x-www-form-urlencoded'
                },
                data:form
              }).then((response)=> {
                if(response.data.ret == '0'){
                  this.getDepartment('return');
                  this.moveGroupDialog = false;
                  setTimeout( ()=>{
                    let index = this.department.findIndex(d => d.department_id == this.moveGroupForm.department_id);
                    this.getMember(this.department[index]);
                  }, 800);
                }else{
                  this.$message(response.data.msg+'，'+response.data.cause);
                }
                this.moveGroupForm.user_id = ''
              })
            }else{
              this.moveGroupDialog = false;
              this.remove(this.moveGroupId,this.moveGroupForm.department_id)
            }
          }else{
            this.noAccess = true
          }

        },
          //获取群组人员
          getMember(data){
              axios.get('/auth/get_all_member', {
                  params: {
                    department_id : data.department_id
                  }
              }).then((response)=> {
                  if(response.data.ret == '0'){
                      this.currentGroup = data;
                      this.groupUser = response.data.data;
                      // this.addMember = false;
                      this.$nextTick( ()=> {
                          this.defaultPortrait()
                      })
                  }else{
                      this.groupUser = [];
                      if(response.data.msg != '没有数据'){
                          this.$message(response.data.msg+'，'+response.data.cause);
                      }
                  }
              })
          },
          //删除成员
          memberDele(id){
            if(this.authId==1){
              this.$confirm('此操作将永久删除该成员, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
              }).then(() => {
                this.$axios.get('/auth/delete_member',{
                  params:{
                    department_id : this.currentGroup.department_id,
                    to_user_id : id,
                    this_user_id : JSON.parse(localStorage.user_id)
                  }
                }).then((res)=> {
                  if(res.data.ret == 0){
                    this.getDepartment()
                  }else{
                    this.$message.error(res.data.msg+'，'+res.data.cause);
                  }
                })
              })
            }else{
              this.noAccess = true
            }
          },
          //新增成员表单
        increaseMemberForm(){
          if(this.addMemberForm[this.addMemberForm.length-1].role_id==''&&
            this.addMemberForm[this.addMemberForm.length-1].department_id==''&&
            this.addMemberForm[this.addMemberForm.length-1].email_list==''){
           return
          }else{
            let obj = {department_id:'',email_list:'',role_id:'',groupVisible:false,authVisible:false};
            this.addMemberForm.push(obj)
          }
        },
          //新增成员二维码
          getCode(){
              axios.get('/auth/get_qr_code', {
                  params: {
                      project_id: this.$route.query.project_id
                  }
              }).then((response)=> {
                  if(response.data.ret == '0'){
                      this.codeUrl = this.host + '/files/' +response.data.data
                  }else{
                      this.$message(response.data.msg+'，'+response.data.cause);
                  }
              })
          },
          //搜索组内成员
        getSearch(v) {
              axios.get('/auth/search', {
                  params: {
                    project_id:this.$route.query.project_id,
                    keyword: v,
                  }
              }).then((response)=> {
                  if(response.data.ret == '0') {
                    this.groupUser = response.data.data
                  }
              })
          },
          //添加成员
          submitAddMember(){
            if(this.authId==1){
              let arr = [];
              if(this.addMemberForm.length==1&&this.addMemberForm[0].role_id==''&&this.addMemberForm[0].department_id==''&&this.addMemberForm[0].email_list==''){
                  this.addMember=false;
                  return
              }
              for (var i = 0; i < this.addMemberForm.length; i++) {
                if(this.addMemberForm[i].role_id!=''||this.addMemberForm[i].department_id!=''||this.addMemberForm[i].email_list!=''){
                  this.$refs['addMemberValidateForm'][i].validate((valid) => {
                    if (valid) {
                      delete this.addMemberForm[i].groupVisible;
                      delete this.addMemberForm[i].authVisible;
                      arr.push(this.addMemberForm[i])
                    }else{
                        arr.push('1')
                    }
                  });
                }
              }
              let index = arr.findIndex(d => d == '1');
              if(index == -1){
                this.finishAdd(arr)
              }
            }else{
              this.noAccess = true
            }
          },
        finishAdd(arr){
          if(arr.length == 0){
            return
          }else{
            let form = new FormData();
            form.append("signup", JSON.stringify(arr));
            form.append("project_id", this.$route.query.project_id);
            axios({
              method: 'post',
              url: '/auth/add_member',
              headers:{
                'Content-type': 'application/x-www-form-urlencoded'
              },
              data:form
            }).then((response)=> {
              if(response.data.ret == '0'){
                this.getDepartment();
                this.addMember=false;
                this.addMemberForm = [{department_id:'',email_list:'',role_id:'',groupVisible:false,authVisible:false}]
              }else{
                this.$message(response.data.msg+'，'+response.data.cause);
              }
            })
          }
        },
          //权限下拉框
          authSelect(event,handle){
            if(event == '0'){
              this.addAuthForm.visible=true;
              if(handle.authVisible!=undefined){
                this.addAuthForm.visible=false;
                handle.authVisible = true
              }
            }else if(handle == 'get'){
              this.getOneRole(event)
            }
          },
        //分组下拉框
        groupSelect(event,data){
          if(event == '0'){
            this.addGroupForm.visible=true;
            if(data){
              data.groupVisible = true;
              this.addGroupForm.visible=false;
            }
          }
        },
        //获取权限组
        getAuthGroup(){
          axios.get('/auth/get_all_role', {
            params: {
              project_id: this.$route.query.project_id
            }
          }).then((response)=> {
            if(response.data.ret == '0'){
              this.authGroup = response.data.data.slice(1);
              this.authGroupList = response.data.data;
              let obj = {role_name: "＋添加权限组",role_id:'0'};
              this.authGroup.splice(0,0,obj)
            }else{
              this.$message(response.data.msg+'，'+response.data.cause);
            }
          })
        },
        //获取该权限组权限
        getOneRole(id){
          axios.get('/auth/get_oen_role', {
            params: {
              role_id: id
            }
          }).then((response)=> {
            if(response.data.ret == '0'){
              this.roleAuth = response.data.data;
            }else{
              this.$message(response.data.msg+'，'+response.data.cause);
            }
          })
        },
          //新增权限组
          authorityAdd(data){
            if(this.authId==1){
              let arr = new Array();
              for(let i=0;i<this.authorityContent.length;i++){
                if(this.authorityContent[i].is_enable==true){
                  arr.push(this.authorityContent[i].group_list[0].id)
                }else{
                  arr.push(this.authorityContent[i].group_list[1].id)
                }
              }
              let form = new FormData();
              form.append("project_id", this.$route.query.project_id);
              form.append("role_name", this.addAuthForm.role_name);
              form.append("auth_group_id", arr.join(','));
              axios({
                method: 'post',
                url: '/auth/add_role',
                headers:{
                  'Content-type': 'application/x-www-form-urlencoded'
                },
                data:form
              }).then((response)=> {
                if(response.data.ret == '0'){
                  if(data){
                    data.authVisible = !data.authVisible;
                    data.role_id = response.data.data;
                  }else{
                    this.addAuthForm.visible = false;
                    this.upsetAuthForm.role_id = response.data.data;
                    this.authSelect(response.data.data,'get');
                  }
                  this.getAuthGroup();
                  this.addAuthForm.role_name='';
                  for(let i=0;i<this.authorityContent.length;i++){
                    this.authorityContent[i].is_enable=false
                  }
                }else{
                  this.$message(response.data.msg+'，'+response.data.cause);
                }
              })
            }else{
              this.noAccess = true
            }

          },
          //删除权限组
          authorityDele(id){
            if(this.authId==1){
              this.$confirm('此操作将永久删除该权限组，组内人员自动分配至成员?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
              }).then(() => {
                axios.get('/auth/delete_role', {
                  params: {
                    role_id: id,
                    project_id: this.$route.query.project_id
                  }
                }).then((response)=> {
                  if(response.data.ret == '0'){
                    this.getAuthGroup()
                  }else{
                    this.$message(response.data.msg+'，'+response.data.cause);
                  }
                })
              })
            }else{
              this.noAccess = true
            }
          },
          //修改某成员权限
          authorityUpdate(){
            if(this.authId==1){
              let form = new FormData()
              form.append("user_id", this.upsetAuthForm.user_id);
              form.append("project_id", this.$route.query.project_id);
              form.append("department_id", this.currentGroup.department_id);
              form.append("role_id", this.upsetAuthForm.role_id);
              axios({
                method: 'post',
                url: '/auth/modify_role',
                headers:{
                  'Content-type': 'application/x-www-form-urlencoded'
                },
                data:form
              }).then((response)=> {
                if(response.data.ret == '0'){
                  this.upsetAuthDialog = false;
                  this.getMember(this.currentGroup)
                }else{
                  this.$message(response.data.msg+'，'+response.data.cause);
                }
              })
            }else{
              this.noAccess = true
            }

          },
          //获取权限开关
          getAuthority(){
              axios.get('/auth/get_auth_group').then((response)=> {
                  if(response.data.ret == '0'){
                      this.authorityContent = response.data.data
                  }else{
                      this.$message(response.data.msg+'，'+response.data.cause);
                  }
              })
          },
        //打开修改权限
        openUpsetAuth(data){
          if(data.role_id != this.authGroupList[0].role_id){
            this.upsetAuthForm.role_id=data.role_id;
            this.upsetAuthForm.user_id=data.user_id;
            this.getOneRole(data.role_id);
            this.upsetAuthDialog=true;
          }else{
            this.$message('无法修改创建者权限');
          }
          // setTimeout( ()=>{
          //   console.log(2)
          // }, 1000);

        },
          //默认头像
          defaultPortrait () {
              var color = ['#ee9904','#6280ee','#ed1875','#0ab683','#38beb7','#00c2e7','#f05050','#f8907f'];
              var giveColor = document.getElementsByClassName('normalPortrait');
              for(var i = 0; i < giveColor.length ; i++) {
                  const num = Math.floor(Math.random() * color.length); //获取随机数
                  giveColor[i].style.background = color[num];
              }
          },
          //项目编辑海报上传
          getFile(e){
              let deviceFile = e.target.files;
              this.editForm.poster = deviceFile[0];
              var r= new FileReader();
              r.readAsDataURL(this.editForm.poster);
              r.onload=function  (e) {
                  document.getElementById('poster-show').src=this.result;
              };

          },
          //项目编辑保存
          saveProjectInfo () {
            if(this.authId==1){
              let formData = new FormData()
              formData.append('project_id', this.$route.query.project_id);
              formData.append('user_id', this.editForm.user_id);
              formData.append('name', this.editForm.name);
              formData.append('director', this.editForm.director);
              formData.append('production_manager', this.editForm.production_manager);
              formData.append('producer', this.editForm.producer);
              formData.append('marketing_producer', this.editForm.marketing_producer);
              formData.append('coordinator', this.editForm.coordinator);
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
                  this.$message({
                    message: '保存成功',
                    type: 'success'
                  });
                }else{
                  this.$message.error(response.data.msg+'，'+response.data.cause);
                }
              })
            }else{
              this.noAccess = true
            }
          },
          //项目编辑删除
          deleProject(){
            if(this.editForm.ownerUser == JSON.parse(localStorage.user_id)){
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
                    project_id:this.$route.query.project_id,
                    user_id:this.editForm.user_id
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
                    this.$router.push({path:'/control/list'})
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

        //重置表单
        resetForm(formName) {
          this.$refs[formName].resetFields();
        },
      },
      mounted(){
        this.getDepartment();
        this.getDepartmentList();
        this.getAuthGroup();
        this.getAuthority();
        this.getCode();
          axios({
              method: 'get',
              url: '/project/info?project_id='+this.$route.query.project_id,
              headers:{
                  'Content-type': 'application/x-www-form-urlencoded'
              }
          }).then((response)=> {
              if(response.data.ret == 0){
                  this.editForm.name = response.data.data.name
                  this.editForm.director = response.data.data.director
                  this.editForm.project_id = response.data.data.project_id
                  this.editForm.ownerUser = response.data.data.user_id
                  this.type = [response.data.data.type_name]
                  if(response.data.data.production_manager){
                      this.editForm.production_manager = response.data.data.production_manager
                  }
                  if(response.data.data.producer){
                      this.editForm.producer = response.data.data.producer
                  }
                  if(response.data.data.coordinator){
                      this.editForm.coordinator = response.data.data.coordinator
                  }
                  if(response.data.data.poster_path){
                      this.poster = response.data.data.poster_path
                  }
                  if(response.data.data.marketing_producer){
                      this.editForm.marketing_producer = response.data.data.marketing_producer
                  }
              }
          })
          axios({
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
                                let index = response.data.data.auths[i][j].findIndex(d => d.id == '9');
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
          // authId:{
          //     immediate: true,
          //     handler(curVal, oldVal) {
          //
          //     },
          //     deep: true
          // },
      }
    }
</script>

<style>
  @import "../../css/el-form.css";
  @import "../../css/el-dialog.css";

  /*顶栏菜单*/
  .groupTab .el-tabs__header,
  .groupTab .el-tabs__content{
    margin-left: 12px;
    overflow: visible;
  }

  .groupTab .el-tabs__header{
    margin-bottom: 15px;
  }

  .groupTab .el-tabs__nav-wrap::after,
  .groupTab .el-tabs__active-bar{
    display: none;
  }

  .groupTab .el-tabs__nav{
    height: 20px;
  }

  .groupTab .el-tabs__item{
    border-right: 1px solid #909399;
    height: 20px;
    line-height: 20px;
    color: #909399;
    font-size: 14px;
  }

  .groupTab .el-tabs__item:last-of-type{
    border-right: none;
  }

  .groupTab .el-tabs__item:hover{
    color: #333;
  }

  .groupTab .el-tabs__item.is-active{
    color: #ed9515;
  }

  /*权限开关*/
  .group #second .authorityBox .authoritySwitchBox .authoritySwitch .el-switch__label.is-active span{
    font-size:12px;
    color:rgba(97,101,116,1);
  }

  /*添加成员tab*/
  .group #first .addMemberBox .addMemberMenu .el-menu-item{
    height: 32px;
    line-height: 32px;
    color:rgba(134,134,134,1);
    padding: 0 8px;
    margin-right: 22px;
  }

  .group #first .addMemberBox .addMemberMenu .el-menu-item.is-active{
    color:rgba(108,111,191,1);
    border-color: rgba(108,111,191,1);
  }

  /*添加成员帮助*/
  .helpBox{
    padding: 20px 30px 0;
  }

  .helpBox .helpContent{
    margin-bottom: 25px;
    display: flex;
    align-items: center;
  }

  .helpBox .helpContent .helpLeft{
    font-size:14px;
    color:rgba(234,80,80,1);
    width: 42px;
    flex-shrink: 0;
  }

  .helpBox .helpContent .helpRight{
    font-size:12px;
    color:rgba(97,101,116,0.8);
    width: calc(100% - 54px);
    margin-left: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space:nowrap;
  }

  .helpBox .helpContent .helpRight span{
    font-size:12px;
  }

  /*添加成员表单*/
  .group #first .addMemberBox .addMemberFormBox .addMemberForm .el-form-item{
    width: 100px;
  }

  .group #first .addMemberBox .addMemberFormBox .addMemberForm .el-form-item.addMemberFormLast{
    width: calc(100% - 206px);
  }

  .group #first .addMemberBox .addMemberFormBox .addMemberForm .el-select{
    width: 100%;
  }

  .group #first .addMemberBox .addMemberFormBox .addMemberForm .el-select .el-input{
    height: 32px;
  }

  .group #first .addMemberBox .addMemberFormBox .addMemberForm .el-select .el-input__inner{
    border-bottom: none;
  }

  /*添加成员下拉菜单*/
  .moveMemberSelectPopper{
    min-width: 200px!important;
  }

  .addMemberSelectPopper .el-select-dropdown__wrap{
    max-height: 155px;
  }

  .addMemberSelectPopper .el-select-dropdown__item span{
    font-size:12px;
    color:rgba(97,101,116,0.7);
  }

  .addMemberSelectPopper .el-select-dropdown__item.selected span{
    color:rgba(97,101,116,1);
  }

  .addMemberSelectPopper .el-select-dropdown__item:first-of-type span{
    color:rgba(108,111,191,1);
  }

  .addMemberSelectPopper .el-select-dropdown__item:first-of-type{
    width: calc(100% - 12px);
    margin: 0 auto;
    border-bottom: 1px solid rgba(210,210,210,0.6);
    padding: 0;
    text-align: center;
  }

  .addMemberSelectPopper .el-select-dropdown__item:first-of-type.hover{
    background: none;
  }

  /*添加成员弹出框*/
  .addMembePopover .popoverContent{
    padding: 0;
  }

  .addMembePopover .popoverContent.el-form .el-form-item.onlyForm .el-form-item__content{
    margin-bottom: 0;
  }

  .addMembePopover .popoverContent.el-form .el-form-item{
    margin-bottom: 10px;
  }

  .addMembePopover .popoverContent .title{
    font-size:12px;
    line-height: 12px;
    color:rgba(97,101,116,1);
  }

  .addMembePopover .popoverContent .popoverContentInfo{
    display: flex;
    align-items: center;
    padding-right: 80px;
  }

  .addAuthPopover{
    padding-top: 4px;
  }

  .addMembePopover .popoverContent .popoverContentInfo .title{
    flex-shrink: 0;
  }

  .addMembePopover .popoverContent .popoverContentSwitch{
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    margin: 0 20px;
  }

  .addMembePopover .popoverContent .popoverContentSwitch .el-switch{
    margin-top: 20px;
    flex-shrink: 0;
    width: 100px;
  }

  .popoverContentSwitch .el-switch.is-disabled{
    opacity: 1;
  }

  .popoverContentSwitch .el-switch.is-disabled .el-switch__core{
    opacity: 0.6;
  }

  .popoverContentSwitch .el-switch.disabled .el-switch__core{
    opacity: 1;
  }

  .popoverContentSwitch .el-switch .el-switch__core{
    height: 14px;
    width: 28px!important;
    margin-top: 3px;
  }

  .popoverContentSwitch .el-switch .el-switch__core:after{
    top: -2px;
    left: -1px;
    box-shadow: 0 0 4px 1px rgba(188,190,197,1);
  }

  .popoverContentSwitch .el-switch__label span{
    font-size: 12px;
    color:rgba(57,63,81,1);
  }

  .popoverContentSwitch .el-switch.is-checked .el-switch__core:after{
    box-shadow: 0 0 4px 1px rgb(193, 237, 221);
    left: 28px;
  }

  .addDialog .el-form-item .popoverContentSwitch{
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .addDialog .el-form-item .popoverContentSwitch .el-switch{
    margin-top: 20px;
    width: 120px;
  }

  /*浮框底部按钮*/
  .addAuthPopover{
    padding: 0;
  }

  .addAuthPopover .popoverContentInfo{
    margin: 4px 20px 0;
  }

  .addAuthPopover .popoverContent .popoverFooter{
    width: 100%;
    height: 38px;
    border-top: 1px solid rgba(210,210,210,0.4);
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-top: 20px;
  }

  .addAuthPopover .popoverContent .popoverFooter .popoverFooterBtn{
    font-size:14px;
    color:rgba(57,63,81,0.6);
    margin-right: 34px;
    cursor: pointer;
  }

  .addAuthPopover .popoverContent .popoverFooter .popoverFooterBtn:first-of-type{
    color:rgba(234,80,80,1);
  }

  /*权限说明*/
  .group #second .authorityBox .authorityDesc span{
    color: #EA5050;
    font-size:12px;
  }

</style>

<style scoped>
  *{
    box-sizing: border-box;
    font-family:MicrosoftYaHei;
  }

  .group{
    margin-top: 28px;
    /*padding-bottom: 20px;*/
    box-sizing: border-box;
  }

  .group #first{
    width: calc(100% - 30px);
    height: calc(100vh - 123px);
    display: flex;
    justify-content: space-between;
  }

  /*剧组管理左侧*/
  .group #first .departmentBox{
    width: 290px;
    height: 100%;
    border-radius: 6px;
    /*box-shadow: 0 0 10px 3px #d9d8e1;*/
    border: 1px solid #e4e4ea;
    box-sizing: border-box;
    flex-shrink: 0;
    background: #fff;
    overflow: hidden;
    padding-bottom: 2px;
  }

  .group #first .departmentBox .departmentTitle{
    width: 100%;
    height: 52px;
    box-sizing: border-box;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(210,210,210,0.6);
  }

  .group #first .departmentBox .departmentTitle p{
    font-size:14px;
    color:rgba(57,63,81,1);
  }

  .group #first .departmentBox .departmentTitle p i{
    color: #8C8BA6;
    margin-right: 6px;
  }

  .group #first .departmentBox .departmentTitle .departmentTopBtn{
    font-size:12px;
    font-family:MicrosoftYaHei;
    color:rgba(108,111,191,1);
    cursor: pointer;
  }

  .group #first .departmentBox .departmentGroupBox{
    height: calc(100% - 52px);
    overflow-y: scroll;
  }

  .group #first .departmentBox .departmentGroupBox .departmentGroup{
    padding: 0 22px;
    height: 60px;
    cursor: pointer;
    border-left: 4px solid rgba(255,255,255,1);
    transition: all 0.8s;
  }

  .group #first .departmentBox .departmentGroupBox .departmentGroup:hover,
  .group #first .departmentBox .departmentGroupBox .departmentGroup.active{
    background:rgba(235,235,240,1);
    border-color: rgba(108,111,191,1);
  }

  .group #first .departmentBox .departmentGroupBox .departmentGroup .departmentGroupContent{
    padding: 0 4px;
    border-bottom: 1px solid rgba(210,210,210,0.6);
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    transition: all 0.8s;
  }

  .group #first .departmentBox .departmentGroupBox .departmentGroup:hover .departmentGroupContent,
  .group #first .departmentBox .departmentGroupBox .departmentGroup.active .departmentGroupContent{
    border-bottom: 1px solid rgba(235,235,240,1);
  }

  .group #first .departmentBox .departmentGroupBox .departmentGroup .departmentGroupName{
    font-size:12px;
    color:rgba(57,63,81,1);
    width: 60%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space:nowrap;
  }

  .group #first .departmentBox .departmentGroupBox .departmentGroup .departmentGroupInfo{
    display: flex;
    align-items: center;
  }

  .group #first .departmentBox .departmentGroupBox .departmentGroup .departmentGroupInfo span:first-of-type{
    font-size:12px;
    line-height: 16px;
    color:rgba(132,136,147,1);
    margin-right: 16px;
  }

  /* 剧组管理右侧*/
  .group #first .memberBox{
    width: calc(100% - 292px);
    height: 100%;
    flex-shrink: 0;
    border-radius: 6px;
    border: 1px solid #e4e4ea;
    margin-left: 12px;
    background: #fff;
    padding: 14px 40px 20px 20px;
  }

  /*成员列表顶部*/
  .group #first .memberBox .memberTitleBox{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .group #first .memberBox .memberTitleBox .memberTitleHrBox{
    display: flex;
    align-items: center;
    width: 40%;
  }

  .group #first .memberBox .memberTitleHrBox .titleHr{
    width:4px;
    height:14px;
    background:rgba(50,197,143,1);
    flex-shrink: 0;
  }

  .group #first .memberBox .memberTitleHrBox p{
    font-size:14px;
    color:rgba(57,63,81,1);
    line-height: 14px;
    width: calc(100% - 40px);
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    display: block;
    padding: 0 8px;
  }

  .group #first .memberBox .memberTitleHrBox p span{
    color: #848893;
    font-size:12px;
  }

  .group #first .memberBox .memberTitleRight{
    display: flex;
    align-items: center;
    width: 300px;
  }

  .group #first .memberBox .memberTitleRight .memberTitleBtn{
    width:100px;
    height:24px;
    background:rgba(71,129,255,1);
    border-radius:12px;
    font-size:12px;
    color:rgba(255,255,255,1);
    text-align: center;
    line-height: 24px;
    margin-right: 30px;
    flex-shrink: 0;
    cursor: pointer;
  }

  /*成员列表*/
  .group #first .memberBox .memberContentBox{
    width: 100%;
    padding-left: 6px;
    margin-top: 15px;
    height: calc(100% - 28px);
    overflow-y: scroll;
    position: relative;
  }

  .group #first .memberBox .memberContentBox .memberContent{
    width: 100%;
    height: 56px;
    border-bottom: 1px solid rgba(217,218,222,1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 12px 0 5px;
  }

  .group #first .memberBox .memberContentBox .memberContent .memberPortrait{
    width:40px;
    height:40px;
    background:rgba(240,80,80,1);
    border-radius:2px;
    text-align: center;
    line-height: 40px;
    color: #fff;
    font-size:24px;
    font-family:SimSun;
    color:rgba(245,245,247,1);
    margin-right: 20px;
  }

  .group #first .memberBox .memberContentBox .memberContent .memberInfoFlex{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .group #first .memberBox .memberContentBox .memberContent .memberInfoFlex:first-of-type{
    width: 24%;
    justify-content: flex-start;
  }

  .group #first .memberBox .memberContentBox .memberContent .memberInfoTxt{
    font-size:12px;
    color:rgba(57,63,81,1);
    line-height: 14px;
    width: 18%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space:nowrap;
  }

  .group #first .memberBox .memberContentBox .memberContent .memberInfoTxt:nth-of-type(2){
    width: 20%;
  }

  .group #first .memberBox .memberContentBox .memberContent .memberInfoFlex:first-of-type .memberInfoTxt{
    width: calc(100% - 80px);
  }

  .group #first .memberBox .memberContentBox .memberContent .memberInfoBtn{
    width:24px;
    height:24px;
    background:rgba(71,129,255,1);
    opacity:0.5;
    border-radius:2px;
    margin-right: 20px;
    text-align: center;
    cursor: pointer;
    flex-shrink: 0;
    transition: all 1s;
  }

  .group #first .memberBox .memberContentBox .memberContent .memberInfoBtn:nth-of-type(2){
    background:rgba(50,197,143,1);
  }

  .group #first .memberBox .memberContentBox .memberContent .memberInfoBtn:nth-of-type(3){
    background:rgba(240,80,80,1);
  }

  .group #first .memberBox .memberContentBox .memberContent .memberInfoBtn:hover{
    opacity: 1;
  }

  .group #first .memberBox .memberContentBox .memberContent .memberInfoBtn i{
    color: #fff;
    line-height: 24px;
  }

  /*添加成员*/
  .group #first .addMemberBox{
    width: 80%;
    height: calc(100% - 14px);
    margin: 34px auto 0;
  }

  .group #first .addMemberBox .addMemberTop{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 6px 0 20px;
  }

  .group #first .addMemberBox .addMemberTitle{
    font-size:24px;
    color:rgba(0,0,0,1);
    line-height: 24px;
  }

  .group #first .addMemberBox .addMemberTop .helpTitle{
    font-size:12px;
    color:rgba(97,101,116,1);
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .group #first .addMemberBox .addMemberTop .helpTitle i{
    font-size: 20px;
  }

  .group #first .addMemberBox .addMemberMenu{
    border-color: rgba(210,210,210,1);
  }

  /*添加成员表单*/
  .group #first .addMemberBox .addMemberFormBox{
    max-height: calc(100% - 220px);
    width: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
    margin-top: 20px;
  }

  .group #first .addMemberBox .addMemberFormBox .addMemberForm{
    padding: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .group #first .addMemberBox .addMemberBtnBox{
    margin-top: 40px;
    display: flex;
  }

  .group #first .addMemberBox .addMemberBtnBox .addMemberBtn{
    width:100px;
    height:32px;
    background:rgba(237,149,21,1);
    border-radius:16px;
    cursor: pointer;
    text-align: center;
    line-height: 32px;
    font-size:14px;
    color:rgba(255,255,255,1);
  }

  .group #first .addMemberBox .addMemberBtnBox .addMemberBtn:last-child{
    background: none;
    border:1px solid rgba(186,186,186,1);
    color:rgba(0,0,0,1);
    line-height: 30px;
    margin-left: 40px;
  }

  /*微信邀请*/
  .group #first .wxBox{
    width: 100%;
    height: calc(100% - 100px);
    overflow: hidden;
    overflow-y: scroll;
  }

  .group #first .wxBox .wxContentBox{
    position: relative;
    margin: 40px auto 50px;
    max-width: 678px;
    height: 344px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .group #first .wxBox .bg{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    margin: 0 auto;
    z-index: 0;
    width: 100%;
    height: 344px;
  }

  .group #first .wxBox .code{
    position: absolute;
    z-index: 1;
    width: 138px;
    top: 53.4%;
    left: 0;
    right: 0;
    margin: 0 auto;
    border-radius: 40px;
  }

  .group #first .wxBox>p{
    text-align: center;
    line-height: 20px;
    margin-bottom: 20px;
  }

  /*权限设置*/
  .group #second{
    width: calc(100% - 88px);
    height: calc(100vh - 123px);
    overflow-y: scroll;
    padding-left: 10px;
  }

  .group #second .authorityBox{
    margin-top: 50px;
    width: calc(100% - 388px);
  }

  .group #second .authorityBox:first-of-type{
    margin-top: 16px;
  }

  .group #second .authorityBox .authorityTitle{
    border-bottom: 1px solid rgba(210,210,210,1);
    padding-bottom: 8px;
    display: flex;
    justify-content: space-between;
  }

  .group #second .authorityBox .authorityTitle .authorityTitleLeft{
    display: flex;
    align-items: center;
  }

  .group #second .authorityBox .authorityTitle .authorityTitleNum{
    font-size: 12px;
    color: #616574;
    flex-shrink: 0;
  }

  .group #second .authorityBox .authorityTitle>i{
    color: #EA5050;
    cursor: pointer;
    font-size: 14px;
    line-height: 16px;
  }

  .group #second .authorityBox .authorityDesc{
    font-size:12px;
    color:rgba(97,101,116,0.8);
    margin: 20px 0 8px;
    padding-left: 12px;
    line-height: 12px;
  }

  .group #second .authorityBox .authoritySwitchBox{
    display: flex;
    flex-wrap: wrap;
  }

  .group #second .authorityBox .authoritySwitchBox .authoritySwitch{
    margin-left: 12px;
    margin-top: 12px;
    width: 120px;
  }

  /*项目设置*/
  .group #third{
    width: calc(100% - 20px);
    height: calc(100vh - 123px);
    /*box-shadow: 0 0 10px 2px #d9d8e1;*/
    border: 1px solid #e4e4ea;
    border-radius: 6px;
    background: #fff;
    padding: 40px 0 60px 36px;
  }

  .group #third .basicSettingBox{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
  }

  .group #third .basicSettingBox .basicSetting{
    flex-shrink: 0;
    width: 15%;
    height: 52px;
    margin-bottom: 40px;
    margin-right: 12%;
  }

  .group #third .basicSettingBox .basicSetting:nth-of-type(4){
    margin-right: 36px;
  }

  .group #third .editLabel{
    font-size:14px;
    color:rgba(0,0,0,.6);
    height: 12px;
    line-height: 12px;
  }

  .group #third .basicSettingBox .basicSetting .editInput{
    height: 38px;
    border: none;
    line-height: 38px;
    border-bottom: 1px solid rgba(0,0,0,.2);
    padding-left: 10px;
    width: 100%;
    font-size: 12px;
  }

  .group #third .basicSettingBox .basicSetting .editInput:focus{
    border-bottom-color: rgba(255,105,14,1);
  }

  .group #third .editKindBox .editKind{
    display: flex;
    margin-top: 20px;
  }

  .group #third .editKindBox .editKind .editKindDesc{
    margin-left: 22px;
    opacity: 0.4;
  }

  .group #third .editPosterBox{
    position: relative;
    display: flex;

  }

  .group #third .editPosterBox .poster-show{
    width: 344px;
    height: 130px;
    border-radius:6px;
    margin-left: 15px;
  }

  .group #third .editPosterBox .poster-show.defaultPoster{
    border:1px dashed rgba(186,186,186,1);
    background: #f5f5f7;
  }

  .group #third .editPosterBox .posterBtn{
    position: absolute;
    top: 0px;
    left: 57px;
    width: 344px;
    height: 130px;
    padding-top: 4px;
    text-align: center;
    cursor: pointer;

  }

  .group #third .editPosterBox .posterBtn p{
    line-height: 52px;
    font-size:14px;
    color:rgba(255,105,14,1);
    margin: 32px 0 0;
    cursor: pointer;
  }

  .group #third .editPosterBox .posterBtn p.postDesc{
    color:rgba(186,186,186,1);
  }

  .group #third .editPosterBox .poster{
    width: 344px;
    height: 160px;
    position: absolute;
    top: 0;
    left: 57px;
    opacity: 0;
    cursor: pointer;
  }

  .group #third .settingBoxFooter{
    margin-top: 100px;
    display: flex;
    justify-content: center;
    height: 34px;
  }

  .group #third .settingBoxFooter .settingFooterBtn{
    width:120px;
    height:34px;
    background:rgba(237,149,21,1);
    border-radius:16px;
    font-size:14px;
    color:rgba(255,255,255,1);
    text-align: center;
    line-height: 34px;
    cursor: pointer;
  }

  .group #third .settingBoxFooter .settingFooterBtn:last-of-type{
    border:1px solid rgba(186,186,186,1);
    background: none;
    color:rgba(0,0,0,.8);
    line-height: 32px;
    margin-left: 30px;
  }

  @media screen and (max-width: 1266px){
    .group #first .wxBox .code{
      width: 130px;
      top: 53.8%;
      left: 0;
      right: 0;
      margin: 0 auto;
    }
  }
</style>
