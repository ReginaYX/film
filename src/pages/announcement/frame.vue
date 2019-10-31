<template>
  <div id="noticeForm">
    <div class="frameTop">
      <div class="stepBox">
        <div :class="['step',placeList.length>0?'active':'']">
          <div class="innerBox">
            <div :class="['stepTooltip',steps==1?'':'stepTitle']" @click="steps = 1">拍摄场次</div>
            <div class="stepCircle" @click="steps = 1"></div>
          </div>
        </div>
        <div :class="['step',timeForm.start_time&&timeForm.end_time?'active':'']">
          <div class="innerBox">
            <div :class="['stepTooltip',steps==2?'':'stepTitle']" @click="steps = 2">拍摄时间</div>
            <div class="stepCircle" @click="steps = 2"></div>
          </div>
        </div>
        <div :class="['step',bigGo.departure&&bigGo.location?'active':'']">
          <div class="innerBox">
            <div :class="['stepTooltip',steps==3?'':'stepTitle']" @click="steps = 3;">出发时间</div>
            <div class="stepCircle" @click="steps = 3"></div>
          </div>
        </div>
        <div :class="['step',dressList.length>0&&dressList[0].departure?'active':'']">
          <div class="innerBox">
            <div :class="['stepTooltip',steps==4?'':'stepTitle']" @click="steps = 4;stepTitle='演员化妆时间'">化妆时间</div>
            <div class="stepCircle" @click="steps = 4;stepTitle='演员化妆时间';previewNum=true"></div>
          </div>
        </div>
        <div :class="['step',contactList.length>0?'active':'']">
          <div class="innerBox">
            <div :class="['stepTooltip',steps==5?'':'stepTitle']" @click="steps = 5;stepTitle='主要联络咨询'">联络咨询</div>
            <div class="stepCircle" @click="steps = 5;stepTitle = '主要联络咨询';previewNum='1'"></div>
          </div>
        </div>
        <div :class="['step',memberList.length>0?'active':'']">
          <div class="innerBox">
            <div :class="['stepTooltip',steps==6?'':'stepTitle']" @click="steps = 6;getDepartment()">推送对象</div>
            <div class="stepCircle" @click="steps = 6;getDepartment()"></div>
          </div>
        </div>
      </div>
      <div class="frameBtnBox">
        <div class="frameBtnTxt" @click="previewDownload">通告单下载</div>
        <div class="frameBtn" @click="saveNotice('1')">保存</div>
        <div class="frameBtn" @click="()=>{if(authId==1){publishDialog=true}else{noAccess = true}}">发布</div>
      </div>
    </div>
    <div class="frameContent">
      <div class="frameContentLeft">
        <div :class="['frameContentLeftTop', steps == 6 || steps == 1?'noBottom':'']"></div>
        <div class="frameContentTopBox" v-if="steps != 1 && steps != 2 && steps != 3 && steps != 6">
          <title-hr :msg="stepTitle"></title-hr>
          <div class="addBtn" @click="addDialog">添加{{steps | addTitle}}</div>
        </div>
        <!--拍摄地点-->
        <div class="placeBox" v-if="steps == 1">
          <null-box v-if="placeList.length==0" msg="拍摄地" btn="true" @add="()=>{if(authId==1){addPlaceDialog=true}else{noAccess = true}}"></null-box>
          <div v-else>
            <div class="noticeInfoBox">
              <div class="noticeInfo">
                <p class="noticeInfoTitle">日期</p>
                <p class="noticeInfoDesc">{{noticeInfo.shoot_date | dateChange}} &#12288; {{noticeInfo.week | weekFormat}}</p>
              </div>
              <div class="noticeInfo">
                <p class="noticeInfoTitle">拍摄场地</p>
                <p class="noticeInfoDesc">{{placeInfo}}</p>
              </div>
            </div>
            <div class="noticeInfoBox">
              <div class="noticeInfoFlex">
                <div class="noticeInfo">
                  <p class="noticeInfoTitle">天气</p>
                  <div class="form">
                    <el-input v-model="placeList[0].day" placeholder="天气"></el-input>
                    <el-input v-model="placeList[0].temp" placeholder="温度"></el-input>
                  </div>
                </div>
                <div class="noticeInfo">
                  <p class="noticeInfoTitle">日出日落</p>
                  <div class="form">
                    <el-input v-model="placeList[0].sunrise_time" placeholder="日出时间"></el-input>
                    <el-input v-model="placeList[0].sunset_time" placeholder="日落时间"></el-input>
                  </div>
                </div>
              </div>
              <div class="noticeInfo">
                <p class="noticeInfoTitle">备注</p>
                <el-input v-model="timeForm.remark" clearable  placeholder="请输入备注信息" @blur="submitTime('remark')" :disabled="authId!=1"></el-input>
              </div>
            </div>
            <div class="addHr">
              <div class="dashedHr line"></div>
              <div class="addBtn" @click="()=>{if(authId==1){addPlaceDialog = true}else{noAccess = true}}">＋新增拍摄场地</div>
            </div>
            <div class="placeTable" v-for="item,index in placeList" :key="index">
              <div class="placeTitleBox">
                <div class="left">
                  拍摄场地：
                  <el-input v-model="item.shoot_location" clearable  placeholder="请输入详细地址" v-if="item.edit"
                            @blur="updatePlace(item,'shoot_location',item.shoot_location_id)" :disabled="authId!=1"></el-input>
                  <popover msg="拍摄场地" :title="item.shoot_location+'  ∨'" icon="iconpencil" first="重命名" class="placeTitlePopover" placement='bottom' @rename="item.edit = true" @dele="delePlace(item.shoot_location_id)" :authId="authId"  v-else></popover>
                </div>
              </div>
              <vxe-table cell-class-name="placeTableTd" :edit-config="{trigger: 'click', mode: 'cell',showIcon:false}" show-overflow
                :data.sync="item.play_session_list" header-row-class-name="placeTableHead" border @edit-closed="submitSessionRemark">
                <vxe-table-column
                  field="field_number" title="场次">
                </vxe-table-column>
                <vxe-table-column
                  field="scene_name" title="场景" align="center">
                </vxe-table-column>
                <vxe-table-column
                  field="air" title="气氛" align="center">
                </vxe-table-column>
                <vxe-table-column
                  field="page" title="页码量" align="center" width="44">
                </vxe-table-column>
                <vxe-table-column
                  field="summary" title="内容提示" width="100">
                </vxe-table-column>
                <vxe-table-column
                  field="only_role_name_list" title="角色">
                  <template slot-scope="scope">
                    <span>{{scope.row.only_role_name_list.join('，')}}</span>
                  </template>
                </vxe-table-column>
                <vxe-table-column
                  field="tool_list" title="道具">
                  <template slot-scope="scope">
                    <span v-if="scope.row.tool_list.length==0"></span>
                    <span v-else>{{scope.row.tool_list.join('，')}}</span>
                  </template>
                </vxe-table-column>
                <vxe-table-column
                    field="tool_list" title="特殊道具">
                  <template slot-scope="scope">
                    <span v-if="scope.row.only_special_tool_name_list.length==0"></span>
                    <span v-else>{{scope.row.only_special_tool_name_list.join('，')}}</span>
                  </template>
                </vxe-table-column>
                <vxe-table-column
                    field="tool_list" title="服化">
                  <template slot-scope="scope">
                    <span v-if="scope.row.only_dress_makeup_name_list.length==0"></span>
                    <span v-else>{{scope.row.only_dress_makeup_name_list.join('，')}}</span>
                  </template>
                </vxe-table-column>
                <vxe-table-column
                    field="tool_list" title="特效">
                  <template slot-scope="scope">
                    <span v-if="scope.row.only_special_effect_name_list.length==0"></span>
                    <span v-else>{{scope.row.only_special_effect_name_list.join('，')}}</span>
                  </template>
                </vxe-table-column>
                <vxe-table-column
                  field="remark" title="备注" :edit-render="{name: 'input'}">
                  <template slot-scope="scope">
                    <span class="remarkTxt">{{scope.row.remark}}</span>
                    <i class="iconfont iconbianji11 editIcon"></i>
                  </template>
                </vxe-table-column>
                <vxe-table-column field="name" title="操作" align="center" width="69">
                  <template slot-scope="scope">
                    <div class="placeTableBtn">
                      <div class="placeTableDele" @click="editSceneOpen(scope.row)">
                        <i class="iconfont iconbianji11"></i>
                      </div>
                      <div class="placeTableDele" @click="delePlaceScene(item.shoot_location_id,scope.row.session_id,scope.$index)">
                        <i class="iconfont iconshanchu"></i>
                      </div>
                    </div>
                  </template>
                </vxe-table-column>
              </vxe-table>
              <div class="addBox">
                <div class="addBtn" @click="()=>{
                if(authId==1){sceneName(item.shoot_location_id)}else{noAccess = true}}">＋选择场景</div>
                <div class="addBtn" @click="()=>{if(authId==1){addSceneDialog = true;addSceneForm.shoot_location_id=item.shoot_location_id}else{noAccess = true}}">＋新增场景</div>
              </div>
            </div>
          </div>
        </div>
        <!--拍摄时间-->
        <div class="timeBox" v-else-if="steps == 2">
          <title-hr msg="起止时间"></title-hr>
          <el-form class="timeFormBox" :model="timeForm" ref="timeForm">
            <el-form-item class="timeForm"
                          label="开始时间" prop="start_time" :rules="[{ required: true, message: '开始时间不能为空',trigger:'blur'}]">
              <el-time-picker class="timeSelect"  placeholder="请选择开始时间" :clearable="false" :disabled="authId!=1"
                              v-model="timeForm.start_time" format="HH:mm" value-format="HH:mm" @change="submitTime('start_time')">
              </el-time-picker>
            </el-form-item>
            <el-form-item class="timeForm"
                          label="结束时间" prop="start_time" :rules="[{ required: true, message: '结束时间不能为空',trigger:'blur'}]">
              <el-time-picker class="timeSelect"  placeholder="请选择结束时间" :clearable="false" :disabled="authId!=1"
                              v-model="timeForm.end_time" format="HH:mm" value-format="HH:mm" @change="submitTime('end_time')">
              </el-time-picker>
            </el-form-item>
          </el-form>
          <div class="dashedHr"></div>
          <title-hr msg="餐饮时间"></title-hr>
            <el-form class="timeFormBox timeFormBoxNd">
              <div class="timeFormFlexBox">
                <el-form-item class="timeForm"
                              label="早餐时间">
                  <el-time-picker class="timeSelect"  placeholder="请选择早餐时间" :clearable="false" :disabled="authId!=1"
                                  v-model="timeForm.cater_list[0].cater_time" format="HH:mm" value-format="HH:mm"
                                  @change="submitCater('1',timeForm.cater_list[0].cater_time,'cater_time')">
                  </el-time-picker>
                </el-form-item>
                <el-form-item
                  label="早餐人数" class="timeFormNum">
                  <el-input v-model="timeForm.cater_list[0].people_number" clearable  placeholder="请输入早餐人数"
                            @blur="submitCater('1',timeForm.cater_list[0].people_number,'people_number')" :disabled="authId!=1"></el-input>
                </el-form-item>
                <el-form-item
                  label="早餐用餐地点" class="timeForm">
                  <el-input v-model="timeForm.cater_list[0].cater_location" clearable   :disabled="authId!=1"
                            placeholder="请输入早餐用餐地点" @blur="submitCater('1',timeForm.cater_list[0].cater_location,'cater_location')"></el-input>
                </el-form-item>
                <el-form-item class="timeForm"
                              label="午餐时间">
                  <el-time-picker class="timeSelect"  placeholder="请选择午餐时间" :clearable="false" :disabled="authId!=1"
                                  v-model="timeForm.cater_list[1].cater_time" format="HH:mm" value-format="HH:mm"
                                  @change="submitCater('2',timeForm.cater_list[1].cater_time,'cater_time')">
                  </el-time-picker>
                </el-form-item>
                <el-form-item
                  label="午餐人数" class="timeFormNum">
                  <el-input v-model="timeForm.cater_list[1].people_number" clearable  placeholder="请输入午餐人数"
                            @blur="submitCater('2',timeForm.cater_list[1].people_number,'people_number')" :disabled="authId!=1"></el-input>
                </el-form-item>
                <el-form-item
                  label="午餐用餐地点" class="timeForm">
                  <el-input v-model="timeForm.cater_list[1].cater_location" clearable   :disabled="authId!=1"
                            placeholder="请输入午餐用餐地点" @blur="submitCater('2',timeForm.cater_list[1].cater_location,'cater_location')"></el-input>
                </el-form-item>
                <el-form-item class="timeForm"
                              label="晚餐时间">
                  <el-time-picker class="timeSelect"  placeholder="请选择晚餐时间" :clearable="false" :disabled="authId!=1"
                                  v-model="timeForm.cater_list[2].cater_time" format="HH:mm" value-format="HH:mm"
                                  @change="submitCater('3',timeForm.cater_list[2].cater_time,'cater_time')">
                  </el-time-picker>
                </el-form-item>
                <el-form-item
                  label="晚餐人数" class="timeFormNum">
                  <el-input v-model="timeForm.cater_list[2].people_number" clearable  placeholder="请输入晚餐人数"  :disabled="authId!=1"
                            @blur="submitCater('3',timeForm.cater_list[2].people_number,'people_number')"></el-input>
                </el-form-item>
                <el-form-item
                  label="晚餐用餐地点" class="timeForm">
                  <el-input v-model="timeForm.cater_list[2].cater_location" clearable   :disabled="authId!=1"
                            placeholder="请输入晚餐用餐地点" @blur="submitCater('3',timeForm.cater_list[2].cater_location,'cater_location')"></el-input>
                </el-form-item>
                <el-form-item class="timeForm"
                              label="夜宵时间">
                  <el-time-picker class="timeSelect"  placeholder="请选择夜宵时间" :clearable="false" :disabled="authId!=1"
                                  v-model="timeForm.cater_list[3].cater_time" format="HH:mm" value-format="HH:mm"
                                  @change="submitCater('4',timeForm.cater_list[3].cater_time,'cater_time')">
                  </el-time-picker>
                </el-form-item>
                <el-form-item
                    label="夜宵人数" class="timeFormNum">
                  <el-input v-model="timeForm.cater_list[3].people_number" clearable  placeholder="请输入夜宵人数"  :disabled="authId!=1"
                            @blur="submitCater('4',timeForm.cater_list[3].people_number,'people_number')"></el-input>
                </el-form-item>
                <el-form-item
                    label="夜宵用餐地点" class="timeForm">
                  <el-input v-model="timeForm.cater_list[3].cater_location" clearable   :disabled="authId!=1"
                            placeholder="请输入夜宵用餐地点" @blur="submitCater('4',timeForm.cater_list[3].cater_location,'cater_location')"></el-input>
                </el-form-item>
              </div>
            </el-form>
        </div>
        <!--出发时间-->
        <div class="goBox timeBox" v-else-if="steps == 3">
          <div class="bigTimeBox">
            <title-hr msg="大部队出发时间"></title-hr>
            <el-form :model="bigGo" ref="goValidateForm" class="timeFormBox">
              <el-form-item
                label="出发时间" prop="departure" :rules="[{ required: true, message: '出发时间不能为空',trigger:'blur'}]">
                <el-time-picker
                  v-model="bigGo.departure" placeholder="请选择出发时间" format="HH:mm" value-format="HH:mm" :disabled="authId!=1"
                  :clearable="false" prefix-icon="el-icon-arrow-down" @change="updateGo(bigGo.departure,'departure','大部队')">
                </el-time-picker>
              </el-form-item>
              <el-form-item
                label="出发地点" prop="location" :rules="[{ required: true, message: '出发地点不能为空',trigger:'blur'}]">
                <el-input v-model="bigGo.location" clearable  placeholder="请输入出发地点"  :disabled="authId!=1"
                          @blur="updateGo(bigGo.location,'location','大部队')"></el-input>
              </el-form-item>
              <el-form-item
                label="备注信息" prop="remark">
                <el-input v-model="bigGo.remark" clearable  placeholder="请输入备注信息" :disabled="authId!=1"
                          maxlength="26" @blur="updateGo(bigGo.remark,'remark','大部队')"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <div class="hrBtnBox">
            <div class="hr"></div>
            <div class="addBtn" @click="addDialog">添加{{steps | addTitle}}</div>
          </div>
          <div class="goTimeInfoBox">
            <div class="goTimeBox" v-for="item,index in goList" :key="index">
              <div class="goTimeContentBox">
                <div class="goTimeTop">
                  <title-hr :msg="item.department"></title-hr>
                  <div class="goTimeTopRight">
                    出发时间：
                    <el-time-picker class="dressTime" v-model="item.departure" format="HH:mm" value-format="HH:mm" :disabled="authId!=1"
                                    :clearable="false" @change="updateGo(item.departure,'departure',item.department)">
                    </el-time-picker>
                  </div>
                </div>
                <div class="goTimePlace">
                  <div class="title">出发地点 :</div>
                  <el-popover
                    placement="bottom" popper-class="contactPopover"
                    width="200" :visible-arrow="false" trigger="click">
                    <div class="contactContent">
                      <div class="title">出发地点:</div>
                      <el-input
                        placeholder="请输入出发地点"  @blur="updateGo(item.location,'location',item.department)"
                        v-model="item.location" clearable  :disabled="authId!=1"></el-input>
                    </div>
                    <span slot="reference">{{item.location}}</span>
                  </el-popover>
                  <div class="deleBtn" @click="item.dele = true"><i class="iconfont iconshanchu"></i></div>
                </div>
              </div>
              <div class="goTimeRemark">备注：
                <el-popover
                  placement="bottom" popper-class="contactPopover"
                  width="200" :visible-arrow="false"
                  trigger="click">
                  <div class="contactContent">
                    <div class="title">备注:</div>
                    <el-input
                      placeholder="请输入备注" @blur="updateGo(item.remark,'remark',item.department)"
                      v-model="item.remark" clearable :disabled="authId!=1"></el-input>
                  </div>
                  <span slot="reference" v-if="item.remark">{{item.remark}}</span>
                  <span slot="reference" v-else>暂无</span>
                </el-popover>
              </div>
              <dele-box msg="出发时间" @dele="deleGoTime(item)" @close="item.dele=false" :deleVisible="item.dele"></dele-box>
            </div>
          </div>

        </div>
        <!--推送对象-->
        <div class="pushBox" v-else-if="steps == 6">
          <div class="pushLeftBox">
            <div class="pushLeftTitle">
              <title-hr msg="推送组" class="titleHr"></title-hr>
              <div class="add" @click="addMember=true">＋添加成员</div>
            </div>
            <div class="groupBox">
              <div :class="['groupName',groupMemberList.department_id==item.department_id?'active':'']" v-for="item,index in groupList" :key="index" @click="groupMemberList = item">{{item.name}}</div>
            </div>
          </div>
          <div class="pushRightBox">
            <div class="pushRightTitleBox">
              <title-hr :msg="'组内人员（'+groupMemberList.num+'人）'" class="pushRightTitle" v-if="groupMemberList.num"></title-hr>
              <title-hr msg="组内人员（0人）" class="pushRightTitle" v-else></title-hr>
              <search-input class="pushLeftSearch" @get-search="searchMember"></search-input>
            </div>
            <div class="pushListBox">
              <div class="pushTr" v-if="groupMemberList.memberList==undefined">暂无人员</div>
              <div class="pushTr" v-else-if="groupMemberList.memberList.length==0">暂无人员</div>
              <div class="pushTr" v-else v-for="item,index in groupMemberList.memberList" :key="index">
                <div class="pushTd">
                  <i class="iconfont iconnan"></i><span>{{item.name}}</span>
                </div>
                <div class="pushTd">{{item.department_name}}</div>
                <div class="pushTd">
                  <i class="iconfont"></i>
                  <i class="iconfont iconshanchu" @click="memberDele(item.user_id)"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="frameContentFromBox" v-else>
          <!--化妆时间-->
          <null-box v-if="steps == 4&&dressList.length==0" msg="化妆时间"></null-box>
          <div class="goTimeBox dressBox" v-if="steps == 4&&dressList.length>0" v-for="item,index in dressList" :key="index">
            <div class="goTimeContentBox">
              <div class="goTimeTop dressTop">
                <title-hr :msg="item.role_name+'【'+item.actor_name+'】'" v-if="item.actor_name"></title-hr>
                <title-hr :msg="item.role_name" v-else></title-hr>
                <div class="goTimeTopRight">出发时间：
                  <el-time-picker class="dressTime" @change="updateDress(item.departure,'departure',item.actor_name)"
                    v-model="item.departure" format="HH:mm" value-format="HH:mm" :clearable="false" disabled>
                  </el-time-picker>
                </div>
              </div>
              <div class="dressInfoBox">
                <div class="dressInfo">
                  是否现场化妆
                  <el-select v-model="item.shot" :class="['dressSelectBox',item.shot==='1'?'active':'']" disabled  placeholder="暂无"
                             popper-class="dressSelectPopper" @change="updateDress(item.shot,'shot',item.actor_name)">
                    <el-option
                      v-for="item in dressSelect"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
                <transition name="el-zoom-in-center">
                  <div class="dressInfo" v-if="item.shot&&item.shot!='1'&&item.shot!='现场化妆'">
                    化妆时间
                    <el-time-picker class="dressTime" @change="updateDress(item.makeup_time,'makeup_time',item.actor_name)"
                                    v-model="item.makeup_time" format="HH:mm" value-format="HH:mm" :clearable="false" disabled>
                    </el-time-picker>
                  </div>
                </transition>
                <div class="btnBox">
                  <div class="deleBtn editBtn" @click="()=>{if(authId==1){editDressForm = item;editDressDialog=true}else{noAccess = true}}">
                    <i class="iconfont iconbianji"></i></div>
                  <div class="deleBtn" @click="()=>{if(authId==1){item.dele = true}else{noAccess = true}}"><i class="iconfont iconshanchu"></i></div>
                </div>
              </div>
            </div>
            <dele-box msg="化妆人员" @dele="deleDressTime(item)" @close="item.dele=false" :deleVisible="item.dele"></dele-box>
          </div>
          <!--联络咨询-->
          <null-box v-if="steps == 5&&contactList.length==0" msg="主要联络人"></null-box>
          <div class="contactBox" v-if="steps == 5&&contactList.length>0" v-for="item,index in contactList" :key="index">
            <div class="contactTop">
              <title-hr :msg="item.name"></title-hr>
              <div class="contactTopRight">{{item.post}}</div>
            </div>
            <div class="contactContent">
              <div class="title">联系方式 :</div>
              <el-popover
                placement="bottom" popper-class="contactPopover"
                width="120" :visible-arrow="false"
                trigger="click">
                <el-form :model="item" class="contactContent">
                  <el-form-item
                    label="联系方式" prop="phone"
                    :rules="[{ required: true, message: '联系方式不能为空',trigger:'blur'},{ validator: checkPhone, message: '您输入的号码不正确',trigger:'blur'}]">
                    <el-input v-model="item.phone" clearable  placeholder="请输入联系方式"  @blur="updateContact(item)" :disabled="authId!=1"></el-input>
                  </el-form-item>
                </el-form>
                <!--<div class="contactContent">-->
                  <!--<div class="title">联系方式 :</div>-->
                  <!--<el-input-->
                    <!--placeholder="请输入联系方式"-->
                    <!--v-model="item.phone" clearable></el-input>-->
                <!--</div>-->
                <span slot="reference">{{item.phone}}</span>
              </el-popover>
              <div class="deleBtn" @click="()=>{if(authId==1){item.dele = true}else{noAccess = true}}"><i class="iconfont iconshanchu"></i></div>
            </div>
            <dele-box msg="出发时间" @dele="deleContact(item)" @close="item.dele=false" :deleVisible="item.dele"></dele-box>
          </div>
        </div>
      </div>
      <!--&lt;!&ndash;推送对象&ndash;&gt;-->
      <!--<div class="frameContentRight pushRightBox" v-if="steps == 6">-->
        <!--<title-hr :msg="'已选推送对象（'+memberList.length+'人）'" class="pushRightTitle"></title-hr>-->
        <!--<div class="pushListBox">-->
          <!--<div class="pushTr" v-for="item,index in memberList" :key="index">-->
            <!--<div class="pushTd">-->
              <!--<i class="iconfont iconnan"></i><span>{{item.name}}</span>-->
            <!--</div>-->
            <!--<div class="pushTd">{{item.department_name}}</div>-->
            <!--<div class="pushTd"><i class="iconfont iconshanchu" @click="deleMember(item.user_id)"></i></div>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
      <div :class="['frameContentRight',sceneBox?'':'previewBox',steps == 6?'pushRightBox':'']">
        <!--拍摄地点场景选择-->
        <transition name="el-zoom-in-top">
          <div v-if="sceneBox" style="width: 100%;height: 100%">
            <div class="frameTopBox">
              <div class="leftBtn" @click="sceneBox = false;shoot_location_id=''">添加完成</div>
              <div class="right">
                <div class="frameTopSearchBox">
                  <search-input class="frameTopSearch" @get-search="getSearch"></search-input>
                </div>
                <el-popover
                    placement="bottom"
                    width="218" :visible-arrow="false"
                    trigger="click" popper-class="frameTopSelectPopper">
                  <div class="frameTopSelectBox">
                    <div class="frameTopSelectTopBox">
                      <div class="frameTopSelectTop" v-for="item,index in episodeList" :key="index" @click="episodeRange(index)">{{item.episode_interval}}</div>
                    </div>
                    <div class="frameTopSelectMainBox">
                      <div class="frameTopSelectMain" v-for="item,index in episodeMainList" :key="index" @click="episodeChange(index,item)">{{item}}</div>
                    </div>
                  </div>
                  <span slot="reference" class="frameTopSelect" v-if="episodeList[0].episode_interval!='1-1'">剧集选择 ∨</span>
                </el-popover>
              </div>
            </div>
            <div id="sceneListBox">
              <div class="sceneList" v-if="selectList.length==0">
                <div class="sceneListItem">无结果</div>
              </div>
              <div class="sceneList" v-else v-for="item,index in selectList" :key="index">
                <div class="sceneListBtn" @click="addPlaceScene(item.session_id)"><i class="iconfont iconzuobian"></i></div>
                <div class="sceneListItem">{{item.field_number}}</div>
                <div class="sceneListItem">{{item.scene_name}}</div>
                <div class="sceneListItem">{{item.air}}</div>
                <div class="sceneListItem">{{item.page}}</div>
                <div class="sceneListItem">{{item.summary}}</div>
                <div class="sceneListItem">{{item.only_role_name_list.join('，')}}</div>
                <div class="sceneListItem" v-if="item.tool_list.length==0">暂无道具信息</div>
                <div class="sceneListItem" v-else>{{item.tool_list.join('，')}}</div>
              </div>
            </div>
          </div>
        </transition>
        <!--通告单预览-->
        <transition name="el-zoom-in-top">
          <div v-if="sceneBox==false" style="width: 100%;height: 100%">
            <div class="previewBoxTop">
              <div class="previewBtn" v-if="previewNum==false" @click="previewNum=!previewNum">
                <i class="iconfont iconfanzhuan"></i>下一页
              </div>
              <div class="previewBtn" v-if="previewNum==true" @click="previewNum=!previewNum">
                <i class="iconfont iconfanzhuan"></i>上一页
              </div>
              <div class="previewBtn" @click="preview">
                <i class="iconfont iconyulan"></i>预览
              </div>
              <el-popover placement="bottom-end" width="120" trigger="hover" popper-class="popoverCodeBox">
                <img :src="codeUrl" alt="" class="popoverCode">
                <div class="previewBtn" slot="reference">
                  <i class="iconfont iconshoujichakan"></i>手机查阅
                </div>
              </el-popover>
            </div>
            <div id="flipBox" :class="previewNum?'active':''">
              <div id="noticeSide1">
                <div class="previewBoxTitle">{{noticeInfo.shoot_date | dateChange}}拍摄通告单<span>《{{noticeInfo.notice_name}}》</span></div>
                <div class="previewContentBox">
                  <div class="previewInfoBox bigBox">
                    <div class="previewInfoTitle green" v-if="placeList[0]">拍摄场地信息：{{placeList[0].city}}</div>
                    <div class="previewInfoTitle green" v-else>拍摄场地信息：</div>
                    <div class="previewInfoTxt big"><span class="big">拍摄地：</span>{{placeInfo}}</div>
                    <div class="previewInfoTxt">
                      <span>拍摄日期：</span>{{noticeInfo.shoot_date | dateChange}}
                      <p>{{noticeInfo.week | weekFormat}}</p><p>拍摄第{{noticeInfo.days}}天</p>
                    </div>
                    <div class="previewInfoTxt previewInfoTxtBox" v-if="placeList.length==0||placeList[0].day==undefined">
                      <span>天气：</span>暂无当天天气信息
                      <span>日出时间：</span>暂无
                      <span>日落时间：</span>暂无
                    </div>
                    <div class="previewInfoTxt previewInfoTxtBox" v-else>
                      <span>天气：</span>{{placeList[0].day}} &#12288; {{placeList[0].temp_min}}°C ~ {{placeList[0].temp_max}}°C
                      <span>日出时间：</span>{{placeList[0].sunrise_time}}
                      <span>日落时间：</span>{{placeList[0].sunset_time}}
                    </div>
                    <div class="previewInfoTxt big2"><span class="big">备注：</span>{{timeForm.remark}}</div>
                  </div>
                  <div class="previewInfoBox previewTime">
                    <div class="previewInfoTitle green flex">
                      <span>拍摄时间</span>
                      <span>起始时间：<p>{{timeForm.start_time}}~{{timeForm.end_time}}</p></span>
                    </div>
                    <div class="previewTimeBox">
                      <div class="previewInfoTxt">
                        <div class="previewTimeTitle">早餐<span>{{timeForm.cater_list[0].cater_time}}</span></div>
                        <div class="previewTimeInfo">
                          <p v-if="timeForm.cater_list[0].people_number">{{timeForm.cater_list[0].people_number}}人</p>
                          <p v-else>无</p>
                          <p class="border" v-if="timeForm.cater_list[0].cater_location">{{timeForm.cater_list[0].cater_location}}</p>
                          <p class="border" v-else>无</p>
                        </div>
                      </div>
                      <div class="previewInfoTxt">
                        <div class="previewTimeTitle">午餐<span>{{timeForm.cater_list[1].cater_time}}</span></div>
                        <div class="previewTimeInfo">
                          <p v-if="timeForm.cater_list[1].people_number">{{timeForm.cater_list[1].people_number}}人</p>
                          <p v-else>无</p>
                          <p class="border" v-if="timeForm.cater_list[1].cater_location">{{timeForm.cater_list[1].cater_location}}</p>
                          <p class="border" v-else>无</p>
                        </div>
                      </div>
                      <div class="previewInfoTxt">
                        <div class="previewTimeTitle">晚餐<span>{{timeForm.cater_list[2].cater_time}}</span></div>
                        <div class="previewTimeInfo">
                          <p v-if="timeForm.cater_list[2].people_number">{{timeForm.cater_list[2].people_number}}人</p>
                          <p v-else>无</p>
                          <p class="border" v-if="timeForm.cater_list[2].cater_location">{{timeForm.cater_list[2].cater_location}}</p>
                          <p class="border" v-else>无</p>
                        </div>
                      </div>
                      <div class="previewInfoTxt">
                        <div class="previewTimeTitle">夜宵<span>{{timeForm.cater_list[3].cater_time}}</span></div>
                        <div class="previewTimeInfo">
                          <p v-if="timeForm.cater_list[3].people_number">{{timeForm.cater_list[3].people_number}}人</p>
                          <p v-else>无</p>
                          <p class="border" v-if="timeForm.cater_list[3].cater_location">{{timeForm.cater_list[3].cater_location}}</p>
                          <p class="border" v-else>无</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="previewInfoBox">
                    <div class="previewInfoTitle green">出发时间</div>
                    <table cellspacing="0" class="previewTable">
                      <tr class="previewThead">
                        <th>部门</th>
                        <th class="center">出发时间</th>
                        <th>出发地点</th>
                        <th>备注</th>
                      </tr>
                      <tr v-if="allGoList.length==0" class="previewTr"><th>暂无数据</th></tr>
                      <tr v-for="item,index in allGoList" :key="index" class="previewTr" v-else>
                        <th>{{item.department}}出发</th>
                        <th class="center">{{item.departure}}</th>
                        <th>{{item.location}}</th>
                        <th>{{item.remark}}</th>
                      </tr>
                      <tr  class="previewTr" v-else>
                        暂无数据
                      </tr>
                    </table>
                  </div>
                  <div class="previewInfoBox tableBox" v-for="item,index in placeList" :key="index">
                    <div class="previewInfoTitle previewInfoTxt red" v-if="item.shoot_location"><span>拍摄地：</span>{{item.shoot_location}}</div>
                    <div class="previewInfoTitle previewInfoTxt red" v-else><span>拍摄地：</span>暂无拍摄地</div>
                    <table cellspacing="0" class="previewTable">
                      <tr class="previewThead">
                        <th class="center">场次</th>
                        <th>场景</th>
                        <th class="center">气氛</th>
                        <th class="center">页码量</th>
                        <th>内容</th>
                        <th>角色</th>
                        <th>道具/服化/特效 </th>
                        <th>备注</th>
                      </tr>
                      <tr v-if="item.play_session_list.length==0" class="previewTr"><th>暂无数据</th></tr>
                      <tr v-else v-for="items,indexs in item.play_session_list" :key="indexs" class="previewTr">
                        <th class="center">{{items.field_number}}</th>
                        <th>{{items.scene_name}}</th>
                        <th class="center">{{items.air}}</th>
                        <th class="center">{{items.page}}</th>
                        <th>{{items.summary}}</th>
                        <th v-if="items.only_role_name_list.length==0"></th>
                        <th v-else>{{items.only_role_name_list.join('，')}}</th>
                        <th v-if="items.tool_special_effect_makeup.length==0"></th>
                        <th v-else>{{items.tool_special_effect_makeup.join('，')}}</th>
                        <th>{{items.remark}}</th>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
              <div id="noticeSide2">
                <div class="previewContentBox">
                  <div class="previewInfoBox">
                    <div class="previewInfoTitle yellow">演员化妆时间</div>
                    <table cellspacing="0" class="previewTable">
                      <tr class="previewThead">
                        <th>角色</th>
                        <th>演员</th>
                        <th class="center">是否现场化妆</th>
                        <th class="center">化妆时间</th>
                        <th class="center">出发时间</th>
                      </tr>
                      <tr v-if="dressList.length==0" class="previewTr"><th>暂无数据</th></tr>
                      <tr v-for="items,indexs in dressList" :key="indexs" class="previewTr" v-else>
                        <th>{{items.role_name}}</th>
                        <th>{{items.actor_name}}</th>
                        <th class="center" v-if="items.shot=='现场化妆'">现场化妆</th>
                        <th class="center" v-else-if="items.shot=='非现场化妆'">非现场化妆</th>
                        <th class="center" v-else></th>
                        <th class="center" v-if="items.makeup_time&&items.makeup_time!='undefined'">{{items.makeup_time}}</th>
                        <th class="center" v-else></th>
                        <th class="center">{{items.departure}}</th>
                      </tr>
                    </table>
                  </div>
                  <div class="previewInfoBox">
                    <div class="previewInfoTitle">联络咨询</div>
                    <div class="previewInfoTxt previewInfoTxtFlex" v-if="contactList.length==0" >
                      <p>暂无联络咨询</p>
                    </div>
                    <p class="contactTxt" v-else v-for="item,index in contactList" :key="index">
                      {{item.post}}：{{item.name}}：{{item.phone}}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <transition name="el-zoom-in-center">
        <div v-if="previewImg.length!=0" :class="['previewShade',previewNumShade?'active':'']">
          <img :src="previewImg[0]" alt="" oncontextmenu="return false;">
          <img :src="previewImg[1]" alt="" oncontextmenu="return false;">
          <div class="previewShadeBtnBox">
            <i class="iconfont iconfanzhuan" @click="previewNumShade=!previewNumShade"></i>
            <i class="el-icon-circle-close" @click="previewImg=[]"></i>
          </div>
        </div>
      </transition>
      <!--添加拍摄场地弹框-->
      <el-dialog
        title="添加拍摄场地" :close-on-click-modal="false"
        :visible.sync="addPlaceDialog"
        width="480px" center class="addDialog">
        <el-form :model="addPlaceForm" ref="placeValidateForm" class="addFormBox">
          <el-form-item
            label="拍摄场地" prop="city" :rules="[{ required: true, message: '拍摄场地不能为空',trigger:'blur'}]">
            <area-cascader :class="['citySelet',addPlaceForm.city?'active':'']" type='text' placeholder="请选择地址" v-model="addPlaceForm.city" :level='1' :data="pcaa"></area-cascader>
          </el-form-item>
          <el-form-item
            label="详细地址" prop="shoot_location">
            <el-input v-model="addPlaceForm.shoot_location" clearable  placeholder="请输入详细地址"></el-input>
          </el-form-item>
        </el-form>
        <div class="addDialogFooter">
          <div class="addFooterBtn" @click="addPlace">创建</div>
          <div class="addFooterBtn" @click="resetForm('placeValidateForm');addPlaceDialog=false">取消</div>
        </div>
      </el-dialog>
      <!--添加场景弹框-->
      <el-dialog
          title="新增场景" :close-on-click-modal="false"
          :visible.sync="addSceneDialog" :before-close="closeSceneDialog"
          width="568px" center class="addDialog addSceneDialog">
        <el-form :model="addSceneForm" ref="sceneValidateForm" class="addFormBox sceneForm">
          <div class="formFlex formFlexTh">
            <el-form-item
                label="拍摄场次" prop="field_number" :rules="[{ required: true, message: '拍摄场次不能为空',trigger:'blur'}]">
              <el-input v-model="addSceneForm.field_number" clearable  placeholder="请输入拍摄场次" v-if="addSceneForm.session_id==''"></el-input>
              <el-input v-model="addSceneForm.field_number" clearable  placeholder="请输入拍摄场次"
                        v-else @blur="editScene('field_number')"></el-input>
            </el-form-item>
            <el-form-item
                label="拍摄场景" prop="scene_name" :rules="[{ required: true, message: '拍摄场景不能为空',trigger:'blur'}]">
              <el-input v-model="addSceneForm.scene_name" clearable  placeholder="请输入拍摄场景" v-if="addSceneForm.session_id==''"></el-input>
              <el-input v-model="addSceneForm.scene_name" clearable  placeholder="请输入拍摄场景"
                        v-else @blur="editScene('scene_name')"></el-input>
            </el-form-item>
            <el-form-item label="气氛" prop="air">
              <el-input v-model="addSceneForm.air" clearable  placeholder="请输入气氛" v-if="addSceneForm.session_id==''"></el-input>
              <el-input v-model="addSceneForm.air" clearable  placeholder="请输入气氛"
                        v-else @blur="editScene('air')"></el-input>
            </el-form-item>
            <el-form-item label="页面量" prop="page">
              <el-input v-model="addSceneForm.page" clearable  placeholder="请输入页面量" v-if="addSceneForm.session_id==''"></el-input>
              <el-input v-model="addSceneForm.page" clearable  placeholder="请输入页面量"
                        v-else @blur="editScene('page')"></el-input>
            </el-form-item>
          </div>
          <div class="formFlex">
            <el-form-item label="集数" prop="episode" :rules="[{ required: true, message: '集数不能为空',trigger:'blur'}]">
              <el-input v-model="addSceneForm.episode" clearable  placeholder="请输入集数" v-if="addSceneForm.session_id==''"></el-input>
              <el-input v-model="addSceneForm.episode" clearable  placeholder="请输入集数"
                        v-else @blur="editScene('episode')"></el-input>
            </el-form-item>
            <el-form-item
                label="内容提示" prop="summary">
              <el-input v-model="addSceneForm.summary" clearable  placeholder="请输入内容提示" v-if="addSceneForm.session_id==''"></el-input>
              <el-input v-model="addSceneForm.summary" clearable  placeholder="请输入内容提示"
                        v-else @blur="editScene('summary')"></el-input>
            </el-form-item>
          </div>
          <div class="formFlexNoLabel roleForm">
            <el-form-item v-for="(item,index) in addSceneForm.role_name_list"
                          :label="index=='0'?'角色':''" :key="index">
              <el-input v-model="addSceneForm.role_name_list[index]"  placeholder="角色名称" v-if="addSceneForm.session_id==''"></el-input>
              <el-input v-model="addSceneForm.role_name_list[index].role_name"  placeholder="角色名称"
                        v-else @blur="editRole(addSceneForm.role_name_list[index])"></el-input>
            </el-form-item>
            <div :class="['addBtn',addSceneForm.role_name_list.length<7?'first':'']" @click="formAdd('role')">＋新增</div>
          </div>
          <div class="formFlexNoLabel roleForm">
            <el-form-item v-for="(item,index) in addSceneForm.tool_name_list"
                          :label="index=='0'?'道具':''" :key="index">
              <el-input v-model="addSceneForm.tool_name_list[index]"  placeholder="请输入道具" v-if="addSceneForm.session_id==''"></el-input>
              <el-input v-model="addSceneForm.tool_name_list[index].tool_name"  placeholder="请输入道具"
                        v-else @blur="editTool(addSceneForm.tool_name_list[index])"></el-input>
            </el-form-item>
            <div :class="['addBtn',addSceneForm.tool_name_list.length<7?'first':'']" @click="formAdd('tool')">＋新增</div>
          </div>
          <div class="formFlexNoLabel roleForm">
            <el-form-item v-for="(item,index) in addSceneForm.dress_makeup_name_list"
                          :label="index=='0'?'服化':''" :key="index">
              <el-input v-model="addSceneForm.dress_makeup_name_list[index]"  placeholder="请输入服化" v-if="addSceneForm.session_id==''"></el-input>
              <el-input v-model="addSceneForm.dress_makeup_name_list[index].dress_makeup_name"  placeholder="请输入服化"
                        v-else @blur="editSceneDress(addSceneForm.dress_makeup_name_list[index])"></el-input>
            </el-form-item>
            <div :class="['addBtn',addSceneForm.dress_makeup_name_list.length<7?'first':'']" @click="formAdd('dress')">＋新增</div>
          </div>
          <div class="formFlexNoLabel roleForm">
            <el-form-item v-for="(item,index) in addSceneForm.special_effect_name_list"
                          :label="index=='0'?'特效':''" :key="index">
              <el-input v-model="addSceneForm.special_effect_name_list[index]"  placeholder="请输入特效" v-if="addSceneForm.session_id==''"></el-input>
              <el-input v-model="addSceneForm.special_effect_name_list[index].special_effect_name"  placeholder="请输入特效"
                        v-else @blur="editEffect(addSceneForm.special_effect_name_list[index])"></el-input>
            </el-form-item>
            <div :class="['addBtn',addSceneForm.special_effect_name_list.length<7?'first':'']" @click="formAdd('effect')">＋新增</div>
          </div>
          <div class="formFlexNoLabel roleForm">
            <el-form-item v-for="(item,index) in addSceneForm.special_tool_name_list"
                          :label="index=='0'?'特殊道具':''" :key="index">
              <el-input v-model="addSceneForm.special_tool_name_list[index]"  placeholder="特殊道具" v-if="addSceneForm.session_id==''"></el-input>
              <el-input v-model="addSceneForm.special_tool_name_list[index].special_tool_name"  placeholder="特殊道具"
                        v-else @blur="editSpecial(addSceneForm.special_tool_name_list[index])"></el-input>
            </el-form-item>
            <div :class="['addBtn',addSceneForm.special_tool_name_list.length<7?'first':'']" @click="formAdd('special')">＋新增</div>
          </div>
        </el-form>
        <div :class="['addDialogFooter',addSceneForm.session_id!=''?'null':'']">
          <div class="addFooterBtn" @click="addScene">创建</div>
          <div class="addFooterBtn" @click="addSceneDialog = false">取消</div>
        </div>
      </el-dialog>
      <!--添加出发时间弹框-->
      <el-dialog
        title="添加出发时间" :close-on-click-modal="false"
        :visible.sync="addGoDialog"
        width="480px" center class="addDialog">
        <el-form :model="addGoForm" ref="goValidateForm" class="addFormBox">
          <el-form-item
            label="部门名称" prop="department" :rules="[{ required: true, message: '部门名称不能为空',trigger:'blur'}]">
            <el-input v-model="addGoForm.department" clearable  placeholder="请输入部门名称"></el-input>
          </el-form-item>
          <div class="formFlex">
            <el-form-item
              label="出发时间" prop="departure" :rules="[{ required: true, message: '出发时间不能为空',trigger:'blur'}]">
              <el-time-picker
                v-model="addGoForm.departure" placeholder="请选择出发时间" format="HH:mm" value-format="HH:mm"
                :clearable="false" prefix-icon="el-icon-arrow-down" :disabled="authId!=1">
              </el-time-picker>
            </el-form-item>
            <el-form-item
              label="出发地点" prop="location" :rules="[{ required: true, message: '出发地点不能为空',trigger:'blur'}]">
              <el-input v-model="addGoForm.location" clearable  placeholder="请输入出发地点"></el-input>
            </el-form-item>
          </div>
          <el-form-item
            label="备注信息" prop="remark">
            <el-input v-model="addGoForm.remark" clearable  placeholder="请输入备注信息" maxlength="26"></el-input>
          </el-form-item>
        </el-form>
        <div class="addDialogFooter">
          <div class="addFooterBtn" @click="addGo">创建</div>
          <div class="addFooterBtn" @click="resetForm('goValidateForm');addGoDialog = false">取消</div>
        </div>
      </el-dialog>
      <!--添加化妆时间弹框-->
      <el-dialog
        title="添加化妆人员" :close-on-click-modal="false"
        :visible.sync="addDressDialog"
        width="480px" center class="addDialog">
        <el-form :model="addDressForm" ref="dressValidateForm" class="addFormBox">
          <el-form-item
            label="演员名称" prop="actor_name" :rules="[{ required: true, message: '演员名称不能为空',trigger:'blur'}]">
            <el-input v-model="addDressForm.actor_name" clearable  placeholder="请输入演员名称"></el-input>
          </el-form-item>
          <el-form-item
            label="饰演角色" prop="role_name" :rules="[{ required: true, message: '角色名称不能为空',trigger:'blur'}]">
            <el-input v-model="addDressForm.role_name" clearable  placeholder="请输入角色名称"></el-input>
          </el-form-item>
          <div class="formFlex dressFormFlex">
            <el-form-item :class="['normal',addDressForm.shot==='0'?'active':'']"
              label="是否现场化妆" prop="shot" :rules="[{ required: true, message: '请选择',trigger:'change'}]">
              <el-select v-model="addDressForm.shot" class="dressSelectBox"
                         popper-class="dressSelectPopper addSelectPopper"  placeholder="请选择化妆地点">
                <el-option
                  v-for="item in dressSelect"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <transition name="el-zoom-in-center">
              <el-form-item v-if="addDressForm.shot==='0'" class="dressTime"
                label="化妆时间" prop="makeup_time" :rules="[{ required: true, message: '化妆时间不能为空',trigger:'change'}]">
                <el-time-picker class="dressTime" prefix-icon="el-icon-arrow-down" placeholder="请选择" :disabled="authId!=1"
                                v-model="addDressForm.makeup_time" format="HH:mm" value-format="HH:mm" :clearable="false">
                </el-time-picker>
              </el-form-item>
            </transition>
          </div>
          <el-form-item
            label="出发时间" prop="departure" :rules="[{ required: true, message: '出发时间不能为空',trigger:'change'}]">
            <el-time-picker class="dressTime" prefix-icon="el"
                            v-model="addDressForm.departure" format="HH:mm" value-format="HH:mm" :clearable="false" placeholder="请选择出发时间">
            </el-time-picker>
          </el-form-item>
        </el-form>
        <div class="addDialogFooter">
          <div class="addFooterBtn" @click="addDress">创建</div>
          <div class="addFooterBtn" @click="resetForm('dressValidateForm');addDressDialog = false">取消</div>
        </div>
      </el-dialog>
      <!--修改化妆时间弹框-->
      <el-dialog
        title="化妆信息确认" :close-on-click-modal="false"
        :visible.sync="editDressDialog"
        width="480px" center class="addDialog">
        <el-form :model="editDressForm" ref="editDressValidateForm" class="addFormBox">
          <el-form-item
            label="演员名称" prop="actor_name" :rules="[{ required: true, message: '演员名称不能为空',trigger:'blur'}]">
            <el-input v-model="editDressForm.actor_name" clearable  placeholder="请输入演员名称"></el-input>
          </el-form-item>
          <el-form-item
            label="饰演角色" prop="role_name" :rules="[{ required: true, message: '角色名称不能为空',trigger:'blur'}]">
            <el-input v-model="editDressForm.role_name" clearable  placeholder="请输入角色名称"></el-input>
          </el-form-item>
          <div class="formFlex dressFormFlex">
            <el-form-item :class="['normal',editDressForm.shot==='0'||editDressForm.shot==='非现场化妆'?'active':'']"
                          label="是否现场化妆" prop="shot" :rules="[{ required: true, message: '请选择',trigger:'change'}]">
              <el-select v-model="editDressForm.shot" class="dressSelectBox"
                         popper-class="dressSelectPopper addSelectPopper"  placeholder="请选择化妆地点">
                <el-option
                  v-for="item in dressSelect"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <transition name="el-zoom-in-center">
              <el-form-item v-if="editDressForm.shot==='0'||editDressForm.shot==='非现场化妆'" class="dressTime"
                            label="化妆时间" prop="makeup_time" :rules="[{ required: true, message: '化妆时间不能为空',trigger:'change'}]">
                <el-time-picker class="dressTime" prefix-icon="el-icon-arrow-down" placeholder="请选择" :disabled="authId!=1"
                                v-model="editDressForm.makeup_time" format="HH:mm" value-format="HH:mm" :clearable="false">
                </el-time-picker>
              </el-form-item>
            </transition>
          </div>
          <el-form-item
            label="出发时间" prop="departure" :rules="[{ required: true, message: '出发时间不能为空',trigger:'change'}]">
            <el-time-picker class="dressTime" prefix-icon="el"
                            v-model="editDressForm.departure" format="HH:mm" value-format="HH:mm" :clearable="false" placeholder="请选择出发时间">
            </el-time-picker>
          </el-form-item>
        </el-form>
        <div class="addDialogFooter">
          <div class="addFooterBtn" @click="editDress">确定</div>
          <div class="addFooterBtn" @click="editDressDialog = false">取消</div>
        </div>
      </el-dialog>
      <!--添加联络人弹框-->
      <el-dialog
        title="添加联络人" :close-on-click-modal="false"
        :visible.sync="addContactDialog"
        width="480px" center class="addDialog">
        <el-form :model="addContactForm" ref="contactValidateForm" class="addFormBox">
          <el-form-item
            label="联络人" prop="name" :rules="[{ required: true, message: '联络人名称不能为空',trigger:'blur'}]">
            <el-input v-model="addContactForm.name" clearable  placeholder="请输入联络人名称"></el-input>
          </el-form-item>
          <el-form-item
            label="联络人职位" prop="post" :rules="[{ required: true, message: '联络人职位不能为空',trigger:'blur'}]">
            <el-input v-model="addContactForm.post" clearable  placeholder="请输入联络人职位"></el-input>
          </el-form-item>
          <el-form-item
            label="联系方式" prop="phone"
            :rules="[{ required: true, message: '联系方式不能为空',trigger:'blur'},{ validator: this.checkPhone, message: '您输入的号码不正确',trigger:'blur'}]">
            <el-input v-model="addContactForm.phone" clearable  placeholder="请输入联系方式"></el-input>
          </el-form-item>
        </el-form>
        <div class="addDialogFooter">
          <div class="addFooterBtn" @click="addContact">创建</div>
          <div class="addFooterBtn" @click="resetForm('contactValidateForm');addContactDialog=false">取消</div>
        </div>
      </el-dialog>
      <!--通告单发布弹框-->
      <el-dialog
        title="通告单发布"
        :visible.sync="publishDialog"
        width="520px" center class="addDialog">
        <div class="publishInfoBox">
          <div class="publishInfoFlex">
            <div class="publishInfo">拍摄时间：{{noticeInfo.shoot_date | dateChange}}</div>
            <div class="publishInfo">拍摄地点：{{placeInfo}}</div>
          </div>
          <div class="publishInfoFlex" v-if="placeList.length==0||placeList[0].day==undefined">
            <div class="publishInfo">天气信息：暂无天气</div>
            <div class="publishInfo">日出时间：暂无</div>
            <div class="publishInfo">日落时间：暂无</div>
          </div>
          <div class="publishInfoFlex" v-else>
            <div class="publishInfo">天气信息：{{placeList[0].day}} &#12288; {{placeList[0].temp_min}}°C ~ {{placeList[0].temp_max}}°C</div>
            <div class="publishInfo">日出时间：{{placeList[0].sunrise_time}}</div>
            <div class="publishInfo">日落时间：{{placeList[0].sunset_time}}</div>
          </div>
          <div class="codeBox">
            <img :src="codeUrl" alt="" class="code canvasImg">
            <p>将此小程序分享至微信好友，即可通过<span>手机查看</span>通告单<br>未加入剧组的成员，扫码注册成功后即可加入该剧组</p>
          </div>
        </div>
        <div class="addDialogFooter">
          <div class="addFooterBtn" @click="publish">发布</div>
          <div class="addFooterBtn" @click="downs">保存二维码</div>
        </div>
      </el-dialog>
      <!--添加成员-->
      <transition name="el-fade-in-linear">
        <div class="addShade" v-show="addMember">
          <div class="addBox">
            <div class="addTitleBox">
              <div class="left">
                <div class="title">添加成员</div>
                <el-popover
                    placement="bottom"
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
              <i class="el-icon-close" @click="addMember=false"></i>
            </div>
            <el-menu :default-active="activeIndex" class="addMemberMenu" mode="horizontal" @select="changeAddMenu">
              <el-menu-item index="1">邮件/手机号邀请</el-menu-item>
              <el-menu-item index="2">微信邀请</el-menu-item>
            </el-menu>
            <div v-if="activeIndex==1">
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
              <p>将二维码转发给微信好友即可邀请团队成员加入该项目<br />（该方式进入项目的成员默认拥有“访客”权限）</p>
            </div>
          </div>
        </div>
      </transition>
      <!--无权限弹框-->
      <no-access :noAccessVisible="noAccess" @close="(v)=>{noAccess = v}"></no-access>
    </div>
  </div>
</template>

<script>
  import searchInput from '../../common/searchInput'
  import titleHr from '../../common/titleHr'
  import deleBox from '../../common/deleBox'
  import global_ from '../../common/Global'
  import popover from '../../common/popoverFunction'
  import nullBox from '../../common/nullBox'
  import { pca, pcaa } from "area-data";
  import 'vue-area-linkage/dist/index.css'; // v2 or higher
  import html2canvas from 'html2canvas';
    export default {
      name: "noticeForm",
      data(){
          return{
            previewImg:[],
            detail_id:'',
            previewNum:false,//页面翻转
            previewNumShade:false,//预览页面翻转
            timeForm:{
              start_time:'',
              end_time:'',
              cater_location:'',
              remark:'',
              test:'测试',
              cater_list:[{},{},{},{}]
            },//拍摄时间数据
            pcaa: pcaa,//省市区选择
            steps: 1,//步骤
            stepTitle:'主要联络咨询',//步骤名称
            noticeInfo:{
              week:'',//周几
              days:'',//拍摄第几天
              notice_name:'',//通告单名称
              shoot_date:'',//拍摄时间
            },
            time:'11:00',
            sceneBox:false,//场景块显示
            scenePages:'1',//场景页码
            selectList:[],//场景列表
            deleVisible:false,//删除框
            addPlaceDialog:false,//添加拍摄场地
            addSceneDialog:false,//添加场景
            editSceneDialog:false,//添加场景
            addGoDialog:false,//添加出发时间
            addDressDialog:false,//添加化妆时间
            editDressDialog:false,//修改化妆时间
            addContactDialog:false,//添加联络人
            publishDialog:false,
            placeList:[],//拍摄地
            placeInfo:'',//拍摄地信息
            addPlaceForm:{
              shoot_location :'',
              city:'',
            },//添加拍摄地
            addSceneForm:{
                shoot_location_id:'',
                field_number:'',
                scene_name:'',
                air:'',
                page:'',
                summary:'',
                role_name_list:['',''],
                tool_name_list:['',''],
                dress_makeup_name_list:['',''],
                special_effect_name_list:['',''],
                special_tool_name_list:['',''],
                episode:'',
                detail_id:'',
                play_id:this.$route.query.play_id,
                session_id:''
            },//添加场景
            shoot_location_id:'',//选择的拍摄地id
            scene_num:'1',//选择拍摄地的场次页数
            scene_episode:'1',//选择拍摄场地集数
              episodeMainList:'',//拍摄场地集数
              episodeList:'',//拍摄场地总集
              episodeRangeList:'',//当前集数范围集数
            goList:[],//部门出发时间
            allGoList:[],//全部出发时间
            bigGo:{
              departure:'',
              location:'',
              remark:'',
              department:'大部队'
            },//大部队出发时间
            addGoForm:{
              department:'',
              departure:'',
              location:'',
              remark:''
            },//添加出发时间
            dressList:[],//化妆时间
            addDressForm:{
              actor_name:'',
              departure:'',
              shot:'',
              role_name:''
            },//添加化妆时间
            editDressForm:'',//修改该演员化妆
            contactList:[],//联络人
            addContactForm:{
              name:'',
              post:'',
              phone:'',
            },//添加联络人
            addForm:{},//添加的表单
            checkPhone:global_.isPhone,
            host:global_.pathInfo,
            select:'1',
            dressSelect: [{
              value: '1',
              label: '现场化妆'
            }, {
              value: '0',
              label: '非现场化妆'
            }],
            groupList:[],//分组列表
            groupMemberList:[],//分组成员列表
            memberList:[],//推送人员
              codeUrl:'',//小程序二维码
            authId:0,//权限
              authGroupList:'',//权限组
              activeIndex:'1',//新增tab
              addMemberForm:[
                  {department_id:'',email_list:'',role_id:'',groupVisible:false,authVisible:false},
              ],//添加成员表单
              addGroupForm:{
                  name:'',
                  visible:false
              },
              addAuthForm:{
                  visible:false,
                  role_name:''
              },//添加权限组表单
              departmentOptions: [],//分组选项
              authorityContent:[],//可设置的权限内容
              authGroup:'',//权限组列表
              addMember:false,
            noAccess:false,//无权限弹框
          }
      },
      components: {searchInput,titleHr,deleBox,popover,nullBox},
      methods:{
          //关闭场景弹框
          closeSceneDialog(done) {
              this.getPlace();
              done();
              this.addSceneForm = {
                  shoot_location_id:'',
                  field_number:'',
                  scene_name:'',
                  air:'',
                  page:'',
                  summary:'',
                  role_name_list:['',''],
                  tool_name_list:['',''],
                  dress_makeup_name_list:['',''],
                  special_effect_name_list:['',''],
                  special_tool_name_list:['',''],
                  episode:'',
                  detail_id:'',
                  play_id:this.$route.query.play_id,
                  session_id:''
              };
          },
          //编辑场景信息
          editScene(v){
              let form = new FormData();
              var str = eval('this.addSceneForm.'+v);
              form.append('session_id',this.addSceneForm.session_id);
              form.append(v,str);
              this.$axios({
                  method: 'post',
                  url: '/play/session_update',
                  data:form,
                  headers:{
                      'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'
                  },
                  dataType:"json",
              }).then((response)=> {
                  if (response.data.ret != 0) {
                      this.$message.error(response.data.msg);
                  }
              })
          },
          //编辑角色
          editRole(v){
              if(v.actor_id){
                  let form1 = new FormData();
                  form1.append('actor_id',v.actor_id);
                  form1.append('role_name',v.role_name);
                  this.$axios({
                      method: 'post',
                      url: '/play/actors_update',
                      data:form1,
                      headers:{
                          'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'
                      },
                      dataType:"json",
                  }).then((response)=> {
                      if(response.data.ret == 0){
                          this.addSceneForm = {
                              shoot_location_id:'',
                              field_number:'',
                              scene_name:'',
                              air:'',
                              page:'',
                              summary:'',
                              role_name_list:['',''],
                              tool_name_list:['',''],
                              dress_makeup_name_list:['',''],
                              special_effect_name_list:['',''],
                              special_tool_name_list:['',''],
                              episode:'',
                              detail_id:'',
                              play_id:this.$route.query.play_id,
                              session_id:''
                          };
                          this.addSceneDialog = false;
                          this.getPlace();
                      }else{
                          this.$message.error(response.data.msg);
                      }
                  })
              }else{
                  let form = new FormData();
                  form.append('play_id',this.$route.query.play_id);
                  form.append('session_id',this.addSceneForm.session_id);
                  form.append('role_name',v.role_name);
                  this.$axios({
                      method: 'post',
                      url: '/play/actors_add',
                      data:form,
                      headers:{
                          'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'
                      },
                      dataType:"json",
                  }).then((response)=> {
                      if(response.data.ret != 0){
                          this.$message.error(response.data.msg);
                      }
                  })
              }
          },
          //编辑道具
          editTool(v){
              if(v.tool_id){
                  let form1 = new FormData();
                  form1.append('tool_id',v.tool_id);
                  form1.append('tool_name',v.tool_name);
                  this.$axios({
                      method: 'post',
                      url: '/play/tools_update',
                      data:form1,
                      headers:{
                          'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'
                      },
                      dataType:"json",
                  }).then((response)=> {
                      if(response.data.ret == 0){
                          this.addSceneForm = {
                              shoot_location_id:'',
                                  field_number:'',
                                  scene_name:'',
                                  air:'',
                                  page:'',
                                  summary:'',
                                  role_name_list:['',''],
                                  tool_name_list:['',''],
                                  dress_makeup_name_list:['',''],
                                  special_effect_name_list:['',''],
                                  special_tool_name_list:['',''],
                                  episode:'',
                                  detail_id:'',
                                  play_id:this.$route.query.play_id,
                                  session_id:''
                          };
                          this.addSceneDialog = false;
                          this.getPlace();
                      }else{
                          this.$message.error(response.data.msg);
                      }
                  })
              }else{
                  let form = new FormData();
                  form.append('play_id',this.$route.query.play_id);
                  form.append('session_id',this.addSceneForm.session_id);
                  form.append('tool_name',v.tool_name);
                  this.$axios({
                      method: 'post',
                      url: '/play/tools_add',
                      data:form,
                      headers:{
                          'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'
                      },
                      dataType:"json",
                  }).then((response)=> {
                      if(response.data.ret != 0){
                          this.$message.error(response.data.msg);
                      }
                  })
              }
          },
          //编辑特殊道具
          editSpecial(v){
              if(v.special_tool_id){
                  let form1 = new FormData();
                  form1.append('special_tool_name',v.special_tool_name);
                  form1.append('special_tool_id',v.special_tool_id)
                  this.$axios({
                      method: 'post',
                      url: '/play/special_tools_update',
                      data:form1,
                      headers:{
                          'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'
                      },
                      dataType:"json",
                  }).then((response)=> {
                      if(response.data.ret != 0){
                          this.$message.error(response.data.msg);
                      }
                  })
              }else{
                  let form = new FormData();
                  form.append('play_id',this.$route.query.play_id);
                  form.append('session_id',this.addSceneForm.session_id);
                  form.append('special_tool_name',v.special_tool_name)
                  this.$axios({
                      method: 'post',
                      url: '/play/special_tools_add',
                      data:form,
                      headers:{
                          'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'
                      },
                      dataType:"json",
                  }).then((response)=> {
                      if(response.data.ret != 0){
                          this.$message.error(response.data.msg);
                      }
                  })
              }
          },
          //编辑服化
          editSceneDress(v){
              if(v.dress_makeup_id){
                  let form1 = new FormData();
                  form1.append('dress_makeup_name',v.dress_makeup_name);
                  form1.append('dress_makeup_id',v.dress_makeup_id);
                  this.$axios({
                      method: 'post',
                      url: '/play/dress_makeup_update',
                      data:form1,
                      headers:{
                          'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'
                      },
                      dataType:"json",
                  }).then((response)=> {
                      if(response.data.ret != 0){
                          this.$message.error(response.data.msg);
                      }
                  })
              }else{
                  let form = new FormData();
                  form.append('play_id',this.$route.query.play_id);
                  form.append('session_id',this.addSceneForm.session_id);
                  form.append('dress_makeup_name',v.dress_makeup_name);
                  this.$axios({
                      method: 'post',
                      url: '/play/dress_makeup_add',
                      data:form,
                      headers:{
                          'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'
                      },
                      dataType:"json",
                  }).then((response)=> {
                      if (response.data.ret != 0) {
                          this.$message.error(response.data.msg);
                      }
                  })
              }
          },
          //编辑特效
          editEffect(v){
              if(v.special_effect_id){
                  let form1 = new FormData();
                  form1.append('special_effect_name',v.special_effect_name);
                  form1.append('special_effect_id',v.special_effect_id)
                  this.$axios({
                      method: 'post',
                      url: '/play/special_effect_update',
                      data:form1,
                      headers:{
                          'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'
                      },
                      dataType:"json",
                  }).then((response)=> {
                      if(response.data.ret != 0){
                          this.$message.error(response.data.msg);
                      }
                  })
              }else{
                  let form = new FormData();
                  form.append('play_id',this.$route.query.play_id);
                  form.append('session_id',this.addSceneForm.session_id);
                  form.append('special_effect_name',v.special_effect_name)
                  this.$axios({
                      method: 'post',
                      url: '/play/special_effect_add',
                      data:form,
                      headers:{
                          'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'
                      },
                      dataType:"json",
                  }).then((response)=> {
                      if(response.data.ret != 0){
                          this.$message.error(response.data.msg);
                      }
                  })
              }
          },
          //场景编辑打开
          editSceneOpen(value){
              this.addSceneDialog=true;
              this.editSceneDialog=true;
              this.addSceneForm.field_number = value.field_number;
              this.addSceneForm.scene_name = value.scene_name;
              this.addSceneForm.air = value.air;
              this.addSceneForm.page = value.page;
              this.addSceneForm.summary = value.summary;
              if(value.role_name_list.length!=0){
                  this.addSceneForm.role_name_list = value.role_name_list;
              }else{
                  this.addSceneForm.role_name_list = [{role_name:''},{role_name:''}]
              }
              if(value.tool_name_id_list.length!=0){
                  this.addSceneForm.tool_name_list = value.tool_name_id_list;
              }else{
                  this.addSceneForm.tool_name_list = [{tool_name:''},{tool_name:''}]
              }
              if(value.dress_makeup_list.length!=0){
                  this.addSceneForm.dress_makeup_name_list = value.dress_makeup_list;
              }else{
                  this.addSceneForm.dress_makeup_name_list = [{dress_makeup_name:''},{dress_makeup_name:''}]
              }
              if(value.special_tool_list.length!=0){
                  this.addSceneForm.special_tool_name_list = value.special_tool_list;
              }else{
                  this.addSceneForm.special_tool_name_list = [{special_tool_name:''},{special_tool_name:''}]
              }
              if(value.special_effect_list.length!=0){
                  this.addSceneForm.special_effect_name_list = value.special_effect_list;
              }else{
                  this.addSceneForm.special_effect_name_list = [{special_effect_name:''},{special_effect_name:''}]
              }
              if(value.episode != ''&&value.episode != null){
                  this.addSceneForm.episode = value.episode;
              }else{
                  this.addSceneForm.episode = '1';
              }
              this.addSceneForm.session_id = value.session_id;
          },
          //添加场景
          addScene(id){
              if(this.authId==1){
                  this.$refs['sceneValidateForm'].validate((valid) => {
                      if (valid) {
                          let form = this.addSceneForm;
                          form.detail_id = this.detail_id;
                          form.role_name_list = this.addSceneForm.role_name_list.join(',');
                          form.tool_name_list = this.addSceneForm.tool_name_list.join(',');
                          delete form.session_id;
                          this.$axios({
                              method: 'post',
                              url: '/notice/add_scene_session',
                              data: form,
                              transformRequest: [function (data) {
                                  let ret = ''
                                  for (let it in data) {
                                      ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                                  }
                                  return ret
                              }],
                              headers:{
                                  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                                  'Accept':'*/*'
                              }
                          }).then((response)=> {
                              if(response.data.ret == 0){
                                  this.getPlace();
                                  this.addSceneForm = {
                                      shoot_location_id:'',
                                      field_number:'',
                                      scene_name:'',
                                      air:'',
                                      page:'',
                                      summary:'',
                                      role_name_list:['',''],
                                      tool_name_list:['',''],
                                      dress_makeup_name_list:['',''],
                                      special_effect_name_list:['',''],
                                      special_tool_name_list:['',''],
                                      episode:'',
                                      detail_id:'',
                                      play_id:this.$route.query.play_id,
                                      session_id:''
                                  };
                                  this.addSceneDialog = false;
                              }else{
                                  if(response.data.cause){
                                      this.$message.error(response.data.cause);
                                  }else{
                                      this.$message.error(response.data.msg);
                                  }
                              }
                          })
                      } else {
                          return;
                      }
                  });
              }else{
                  this.noAccess = true
              }
          },
          //添加场景弹框添加输入框
          formAdd(type){
              if(type == 'tool'){
                  if(this.editSceneDialog == true){
                      this.addSceneForm.tool_name_list.push({tool_name:''})
                  }else{
                      this.addSceneForm.tool_name_list.push('')
                  }
              }else if(type == 'dress'){
                  if(this.editSceneDialog == true){
                      this.addSceneForm.dress_makeup_name_list.push({dress_makeup_name:''})
                  }else{
                      this.addSceneForm.dress_makeup_name_list.push('')
                  }
              }else if(type == 'special'){
                  if(this.editSceneDialog == true){
                      this.addSceneForm.special_tool_name_list.push({special_tool_name:''})
                  }else{
                      this.addSceneForm.special_tool_name_list.push('')
                  }
              }else if(type == 'effect'){
                  if(this.editSceneDialog == true){
                      this.addSceneForm.special_effect_name_list.push({special_effect_name:''})
                  }else{
                      this.addSceneForm.special_effect_name_list.push('')
                  }
              }else{
                  if(this.editSceneDialog == true){
                      this.addSceneForm.role_name_list.push({role_name:''})
                  }else{
                      this.addSceneForm.role_name_list.push('')
                  }
              }
          },
          //删除成员
          memberDele(id){
              if(this.authId==1){
                  this.$confirm('该操作将从项目中移除该成员，是否确认删除?', '提示', {
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
          //下载图片
          downloadIamge(imgsrc, name) {//下载图片地址和图片名
              var image = new Image();
              // 解决跨域 Canvas 污染问题
              image.setAttribute("crossOrigin", "anonymous");
              image.onload = function() {
                  var canvas = document.createElement("canvas");
                  canvas.width = image.width;
                  canvas.height = image.height;
                  var context = canvas.getContext("2d");
                  context.drawImage(image, 0, 0, image.width, image.height);
                  var url = canvas.toDataURL("image/png"); //得到图片的base64编码数据

                  var a = document.createElement("a"); // 生成一个a元素
                  var event = new MouseEvent("click"); // 创建一个单击事件
                  a.download = name || "photo"; // 设置图片名称
                  a.href = url; // 将生成的URL设置为a.href属性
                  a.dispatchEvent(event); // 触发a的单击事件
              };
              image.src = imgsrc;
          },
          downs(){
              this.downloadIamge(this.codeUrl, '小程序二维码')
          },
          //分组列表
          getDepartmentList(){
              this.$axios.get('/auth/get_department', {
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
          //获取权限开关
          getAuthority(){
              this.$axios.get('/auth/get_auth_group').then((response)=> {
                  if(response.data.ret == '0'){
                      this.authorityContent = response.data.data
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
                  this.$axios({
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
              this.$axios({
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
          //添加成员menu
          changeAddMenu(key, keyPath){
              this.activeIndex = key
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
                  this.$axios({
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
          //新增成员二维码
          getCode(){
              this.$axios.get('/auth/get_qr_code', {
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
        //通告单下载
        previewDownload(){
          if(this.authId==1){
            this.$axios({
              method: 'get',   // 请求方式
              url: '/notice/down_pdf',  // 请求地址
              params: {   // 请求参数
                detail_id : this.detail_id,
                project_id: this.$route.query.project_id,
                user_id: JSON.parse(localStorage.user_id)
              },
              responseType: 'blob'   // 重点，请求的数据类型
            }).then((res)=> {
              var blob = new Blob([res.data]);
              var downloadElement = document.createElement('a');
              var href = window.URL.createObjectURL(blob); //创建下载的链接
              downloadElement.href = href;
              downloadElement.download = this.$options.filters['dateChange'](this.noticeInfo.shoot_date)+this.noticeInfo.notice_name+'通告单.pdf'; //下载后文件名
              document.body.appendChild(downloadElement);
              downloadElement.click(); //点击下载
              document.body.removeChild(downloadElement); //下载完成移除元素
              window.URL.revokeObjectURL(href); //释放掉blob对象
            })
          }else{
            this.noAccess = true
          }
        },
        //通告单预览
        preview(){
          var a = document.createElement("a");
          a.setAttribute("href", this.host+'/notice/preview_pdf?detail_id='+this.detail_id+ '&project_id=' + this.$route.query.project_id + '&user_id=' + JSON.parse(localStorage.user_id));
          a.setAttribute("target", "_blank");
          a.click();
        },
        // 将返回的流数据转换为url
        getObjectURL(file) {
          let url = null;
          if (window.createObjectURL != undefined) { // basic
            url = window.createObjectURL(file);
          } else if (window.webkitURL != undefined) { // webkit or chrome
            try {
              url = window.webkitURL.createObjectURL(file);
            } catch (error) {

            }
          } else if (window.URL != undefined) { // mozilla(firefox)
            try {
              url = window.URL.createObjectURL(file);
            } catch (error) {

            }
          }
          return url;
        },
        //获取通告单总信息
        getNotice(){
          this.$axios.get('/notice/summary_detail_info',{
            params:{
              detail_id : this.detail_id
            }
          }).then((res)=> {
            if(res.data.ret == 0){
              let str = res.data.data.remark;
              this.timeForm.remark = str;
              this.noticeInfo.week = res.data.data.day_for_week;
              this.noticeInfo.days = res.data.data.days;
              this.noticeInfo.notice_name = res.data.data.notice_name;
              this.noticeInfo.shoot_date = res.data.data.shoot_date;
            }else{
              this.$message.error(res.data.msg);
            }
          })
        },
        //提交起始时间及用餐地点
        submitTime(v){
          if(this.authId==1){
            let form = new FormData;
            let str = eval('this.timeForm.'+v);
            form.append(v, str);
            form.append('detail_id',this.detail_id);
            this.$axios({
              method: 'post',
              url: '/notice/update_notice_detail',
              data: form,
              headers:{
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Accept':'*/*'
              }
            }).then((response)=> {
              if(response.data.ret != 0){
                this.$message.error(response.data.msg);
              }
            })
          }else{
            this.noAccess = true
          }

        },
        //提交用餐时间
        submitCater(type,v,str){
          if(this.authId==1){
            let form = new FormData;
            form.append(str, v);
            form.append('type', type);
            form.append('detail_id',this.detail_id);
            this.$axios({
              method: 'post',
              url: '/notice/update_cater',
              data: form,
              headers:{
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Accept':'*/*'
              }
            }).then((response)=> {
              if(response.data.ret != 0){
                this.$message.error(response.data.msg);
              }
            })
          }else{
            this.noAccess = true
          }

        },
        //获取拍摄时间
        getTime(){
          this.$axios.get('/notice/get_cater_by_detail_id',{
            params:{
              detail_id : this.detail_id,
              project_id : this.$route.query.project_id,
              user_id : JSON.parse(localStorage.user_id)
            }
          }).then((res)=> {
            if(res.data.ret == 0){
                let arr = [{},{},{},{}];
                for(let i=0;i<res.data.data.cater_list.length;i++){
                    arr[res.data.data.cater_list[i].type-1] = res.data.data.cater_list[i]
                }
              res.data.data.remark = '';
                this.timeForm = res.data.data;
                this.timeForm.cater_list = arr
              // if(this.timeForm.cater_list.length != 4){
              //   let times = 4 - this.timeForm.cater_list.length;
              //   for(let i=0;i<times;i++){
              //     this.timeForm.cater_list.push({})
              //   }
              // }
            }else{
              this.$message.error(res.data.msg);
            }
          })
        },
        //打开新建弹框
        addDialog(){
          if(this.authId==1){
            if(this.steps == 3){
              this.addGoDialog = true
            }else if(this.steps == 4){
              this.addDressDialog = true
            }else if(this.steps == 5){
              this.addContactDialog = true
            }
          }else{
            this.noAccess = true
          }

        },
        //获取拍摄地
        getPlace(){
          this.$axios.get('/notice/get_shoot_session_info',{
            params:{
              detail_id : this.detail_id,
              project_id : this.$route.query.project_id,
              user_id : JSON.parse(localStorage.user_id)
            }
          }).then((res)=> {
            if(res.data.ret == 0){
                if(res.data.data!=null&&res.data.data.length!=0){
                    let arr = [];
                    for(let i=0;i<res.data.data.length;i++){
                        res.data.data[i].dele = false;
                        res.data.data[i].edit = false;
                        arr.push(res.data.data[i])
                    }
                    this.placeList = arr;
                    this.placeList.temp = this.placeList[0].temp_min+'°C ~ '+this.placeList[0].temp_max+'°C';
                    this.getDress()
                } else{
                this.placeList = []
              }
            }else{
              this.$message.error(res.data.msg);
            }
          })
        },
        //修改拍摄地
        updatePlace(data,str,id){
          if(this.authId==1){
            let form = new FormData;
            form.append('shoot_location', data.shoot_location);
            form.append('detail_id',this.detail_id);
            form.append('shoot_location_id',id);
            this.$axios({
              method: 'post',
              url: '/notice/modify_shoot_location',
              data: form,
              headers:{
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Accept':'*/*'
              }
            }).then((response)=> {
              if(response.data.ret != 0){
                if(response.data.cause){
                  this.$message.error(response.data.cause);
                }else{
                  this.$message.error(response.data.msg);
                }
              }else{
                data.edit = false
              }
            })
          }else{
            this.noAccess = true
          }

        },
        //添加拍摄地
        addPlace(){
          if(this.authId==1){
            this.$refs['placeValidateForm'].validate((valid) => {
              if (valid) {
                this.addPlaceForm.detail_id = this.detail_id;
                this.addPlaceForm.shoot_date = this.noticeInfo.shoot_date;
                this.addPlaceForm.city = this.addPlaceForm.city.join(',');
                this.$axios({
                  method: 'post',
                  url: '/notice/add_shoot_location',
                  data: this.addPlaceForm,
                  transformRequest: [function (data) {
                    let ret = ''
                    for (let it in data) {
                      ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                    }
                    return ret
                  }],
                  headers:{
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'Accept':'*/*'
                  }
                }).then((response)=> {
                  if(response.data.ret == 0){
                    this.getPlace();
                    this.resetForm('placeValidateForm');
                    this.addPlaceDialog = false;
                  }else{
                    if(response.data.cause){
                      this.$message.error(response.data.cause);
                    }else{
                      this.$message.error(response.data.msg);
                    }
                  }
                })
              } else {
                return;
              }
            });
          }else{
            this.noAccess = true
          }

        },
        //删除拍摄地
        delePlace(v){
          if(this.authId==1){
            this.$axios.get('/notice/delete_by_shoot_location_id',{
              params:{
                shoot_location_id : v
              }
            }).then((res)=> {
              if(res.data.ret == 0){
                this.getPlace()
              }else{
                if(res.data.cause){
                  this.$message.error(res.data.cause);
                }else{
                  this.$message.error(res.data.msg);
                }
              }
            })
          }else{
            this.noAccess = true
          }
        },
          //获取场景集数
          getEpisode(){
              this.$axios.get('/notice/get_episode',{
                  params:{
                      play_id : this.$route.query.play_id
                  }
              }).then((response)=> {
                  if(response.data.ret == '0'){
                      this.episodeList = response.data.data;
                      // this.episodeRangeList = Object.keys(response.data.data);
                      this.episodeMainList = response.data.data[0].episode_list;
                  }
              })
          },
          //选择拍摄地场景集数范围
          episodeRange(val){
              $('.frameTopSelectTopBox .frameTopSelectTop').eq(val).addClass("active").siblings().removeClass("active");
              this.episodeMainList = this.episodeList[val].episode_list;
              let val2='';
              for(let i=0;i<this.episodeList[val].episode_list.length;i++){
                  if(this.scene_episode == this.episodeList[val].episode_list[i]){
                      val2 = i;
                      break
                  }
              }
             if(val2===''){
                 $('.frameTopSelectMainBox .frameTopSelectMain').siblings().removeClass("active");
             }else{
                 $('.frameTopSelectMainBox .frameTopSelectMain').eq(val2).addClass("active").siblings().removeClass("active");
             }
          },
          //选择拍摄地场景集数
          episodeChange(val,data){
              $('.frameTopSelectMainBox .frameTopSelectMain').eq(val).addClass("active").siblings().removeClass("active");
              this.scene_episode=data;
              this.sceneName(this.shoot_location_id)
          },
        //获取该拍摄地所有场景
        sceneName(v){
            this.shoot_location_id = v;
            this.$nextTick( ()=> {
                this.$axios.get('/notice/get_all_session_info',{
                    params:{
                        play_id : this.$route.query.play_id,
                        shoot_location_id : v,
                        page_size:'20',
                        page_num:this.scene_num,
                        episode:this.scene_episode
                    }
                }).then((response)=> {
                    if(response.data.ret == '0'){
                        this.sceneBox = true;
                        this.selectList = response.data.data;
                        if(this.scene_episode=='1'){
                            setTimeout(function (){
                                $('.frameTopSelectTopBox .frameTopSelectTop').eq(0).addClass("active").siblings().removeClass("active");
                                $('.frameTopSelectMainBox .frameTopSelectMain').eq(0).addClass("active").siblings().removeClass("active");
                            }, 400);
                        }
                        document.querySelector("#app").click();
                        // else{
                        //     let val1=0;
                        //     let val2=0;
                        //     for(let key=0;key<this.episodeList.length;key++){
                        //         for(let i=0;i<this.episodeList[key].episode_list.length;i++){
                        //             if(this.episodeList[key].episode_list[i] == this.scene_episode){
                        //                 val1 = key;
                        //                 val2 = i;
                        //                 break
                        //             }
                        //         }
                        //     }
                        //     this.episodeMainList = this.episodeList[val1].episode_list;
                        //     setTimeout(function (){
                        //         $('.frameTopSelectTopBox .frameTopSelectTop').eq(val1).addClass("active").siblings().removeClass("active");
                        //         $('.frameTopSelectMainBox .frameTopSelectMain').eq(val2).addClass("active").siblings().removeClass("active");
                        //     }, 400);
                        // }
                    }
                })
            })
        },
        //场景搜索
        getSearch(v){
          this.$axios.get('/notice/search_session_info',{
            params:{
              play_id : this.$route.query.play_id,
              keyword : v,
              shoot_location_id : this.shoot_location_id
            }
          }).then((res)=> {
            if(res.data.ret == 0){
              this.selectList = res.data.data;
            }else{
              if(res.data.cause){
                this.$message.error(res.data.cause);
              }else{
                this.$message.error(res.data.msg);
              }
            }
          })
        },
        //获取该拍摄地已选场景
        getPlaceScene(v){
          this.$axios.get('/notice/get_one_shoot_session',{
            params:{
              shoot_location_id : v
            }
          }).then((response)=> {
            if(response.data.ret == '0'){
              const index = this.placeList.findIndex(d => d.shoot_location_id === v);
              this.placeList[index].play_session_list = response.data.data
            }
          })
        },
        //添加拍摄地场景
        addPlaceScene(v){
          if(this.authId==1){
            let form = new FormData();
            form.append('session_id',v);
            form.append('shoot_location_id',this.shoot_location_id);
            form.append('detail_id',this.detail_id);
            this.$axios({
              method: 'post',
              url: '/notice/add_shoot_session',
              data: form,
              headers:{
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Accept':'*/*'
              }
            }).then((response)=> {
              if(response.data.ret == 0){
                this.getPlaceScene(this.shoot_location_id);
                this.sceneName(this.shoot_location_id);
                this.getDress()
              }else{
                if(response.data.cause){
                  this.$message.error(response.data.cause);
                }else{
                  this.$message.error(response.data.msg);
                }
              }
            })
          }else{
            this.noAccess = true
          }

        },
        //删除拍摄地场景
        delePlaceScene(shoot_location_id,session_id,index){
          if(this.authId==1){
            this.$confirm('此操作将删除该拍摄地场景, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消'
            }).then(() => {
              this.$axios.get('/notice/delete_shoot_session',{
                params:{
                  session_id:session_id,
                  shoot_location_id : shoot_location_id,
                  detail_id:this.detail_id
                }
              }).then((res)=> {
                if(res.data.ret == 0){
                  const index = this.placeList.findIndex(d => d.shoot_location_id === shoot_location_id);
                  const index2 = this.placeList[index].play_session_list.findIndex(d => d.session_id === session_id);
                  this.placeList[index].play_session_list.splice(index2, 1);
                  this.sceneName(shoot_location_id);
                  this.getDress()
                }else{
                  if(res.data.cause){
                    this.$message.error(res.data.cause);
                  }else{
                    this.$message.error(res.data.msg);
                  }
                }
              })
            })
          }else{
            this.noAccess = true
          }

        },
        //修改拍摄场次备注
        submitSessionRemark({ row, column }, event){
          if(this.authId==1){
            let form = new FormData;
            form.append('session_id', row.session_id);
            form.append('remark', row.remark);
            form.append('shoot_location_id', row.shoot_location_id);
            this.$axios({
              method: 'post',
              url: '/notice/update_session_remark',
              data: form,
              headers:{
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Accept':'*/*'
              }
            }).then((response)=> {
              if(response.data.ret != 0){
                if(response.data.cause){
                  this.$message.error(response.data.cause);
                }else{
                  this.$message.error(response.data.msg);
                }
              }
            })
          }else{
            this.noAccess = true
          }

        },
        //获取出发时间
        getGo(){
          this.$axios.get('/notice/get_all_departure_by_id',{
            params:{
              detail_id : this.detail_id,
              project_id : this.$route.query.project_id,
              user_id : JSON.parse(localStorage.user_id)
            }
          }).then((res)=> {
            if(res.data.ret == 0){
              let arr = [];
              if(res.data.data!=null){
                  for(let i=0;i<res.data.data.length;i++){
                      res.data.data[i].dele = false;
                      arr.push(res.data.data[i])
                  }
                  this.goList = arr
              }
            }else{
              if(response.data.cause){
                this.$message.error(response.data.cause);
              }else{
                this.$message.error(response.data.msg);
              }
            }
          })
        },
        //获取大部队出发时间
        getBigGo(){
          this.$axios.get('/notice/get_large_unit_departure',{
            params:{
              detail_id : this.detail_id,
              project_id : this.$route.query.project_id,
              user_id : JSON.parse(localStorage.user_id)
            }
          }).then((res)=> {
            if(res.data.ret == 0){
              if(res.data.data!= null){
                this.bigGo = res.data.data
              }
            }else{
              if(response.data.cause){
                this.$message.error(response.data.cause);
              }else{
                this.$message.error(response.data.msg);
              }
            }
          })
        },
        //修改出发时间
        updateGo(data,str,department){
          if(this.authId==1){
            let form = new FormData;
            form.append(str, data);
            form.append('detail_id',this.detail_id);
            form.append('department',department);
            this.$axios({
              method: 'post',
              url: '/notice/update_departure',
              data: form,
              headers:{
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Accept':'*/*'
              }
            }).then((response)=> {
              if(response.data.ret != 0){
                if(response.data.cause){
                  this.$message.error(response.data.cause);
                }else{
                  this.$message.error(response.data.msg);
                }
              }
            })
          }else{
            this.noAccess = true
          }

        },
        //添加出发时间
        addGo(){
          if(this.authId==1){
            this.$refs['goValidateForm'].validate((valid) => {
              if (valid) {
                this.addGoForm.detail_id = this.detail_id;
                this.$axios({
                  method: 'post',
                  url: '/notice/add_departure',
                  data: this.addGoForm,
                  transformRequest: [function (data) {
                    let ret = ''
                    for (let it in data) {
                      ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                    }
                    return ret
                  }],
                  headers:{
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'Accept':'*/*'
                  }
                }).then((response)=> {
                  if(response.data.ret == 0){
                    this.getGo();
                    this.resetForm('goValidateForm');
                    this.addGoDialog = false;
                  }else{
                    if(response.data.cause){
                      this.$message.error(response.data.cause);
                    }else{
                      this.$message.error(response.data.msg);
                    }
                  }
                })
              } else {
                return;
              }
            });
          }else{
            this.noAccess = true
          }

        },
        //删除出发时间
        deleGoTime(v){
          if(this.authId==1){
            this.$axios.get('/notice/delete_departure',{
              params:{
                detail_id : this.detail_id,
                department : v.department
              }
            }).then((res)=> {
              if(res.data.ret == 0){
                this.getGo()
              }else{
                this.$message.error(res.data.msg);
              }
            })
          }else{
            this.noAccess = true
          }

        },
        //获取化妆时间
        getDress(){
          this.$axios.get('/notice/get_all_actor_dress',{
            params:{
              detail_id : this.detail_id,
              project_id : this.$route.query.project_id,
              user_id : JSON.parse(localStorage.user_id)
            }
          }).then((res)=> {
            if(res.data.ret == 0){
              let arr = [];
              if(res.data.data){
                for(let i=0;i<res.data.data.length;i++){
                  if(res.data.data[i].shot == 0){
                    res.data.data[i].shot = '非现场化妆'
                  }else if(res.data.data[i].shot == 1){
                    res.data.data[i].shot = '现场化妆'
                  }
                  res.data.data[i].dele = false;
                  arr.push(res.data.data[i])
                }
                this.dressList = arr
              }
            }else{
              this.$message.error(res.data.msg);
            }
          })
        },
        //添加化妆时间
        addDress(){
          if(this.authId==1){
            this.$refs['dressValidateForm'].validate((valid) => {
              if (valid) {
                this.addDressForm.detail_id = this.detail_id;
                this.$axios({
                  method: 'post',
                  url: '/notice/add_actor_dress',
                  data: this.addDressForm,
                  transformRequest: [function (data) {
                    let ret = ''
                    for (let it in data) {
                      ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                    }
                    return ret
                  }],
                  headers:{
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'Accept':'*/*'
                  }
                }).then((response)=> {
                  if(response.data.ret == 0){
                    this.getDress();
                    this.resetForm('dressValidateForm');
                    this.addDressDialog = false;
                  }else{
                    this.$message.error(response.data.msg);
                  }
                })
              } else {
                return;
              }
            });
          }else{
            this.noAccess = true
          }

        },
        //编辑化妆时间
        editDress(){
          if(this.authId==1){
            this.$refs['editDressValidateForm'].validate((valid) => {
              if (valid) {
                this.editDressForm.detail_id = this.detail_id;
                this.$axios({
                  method: 'post',
                  url: '/notice/update_actor_dress',
                  data: this.editDressForm,
                  transformRequest: [function (data) {
                    let ret = ''
                    for (let it in data) {
                      ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                    }
                    return ret
                  }],
                  headers:{
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'Accept':'*/*'
                  }
                }).then((response)=> {
                  if(response.data.ret == 0){
                    this.getDress();
                    this.editDressDialog = false;
                  }else{
                    this.$message.error(response.data.msg);
                  }
                })
              } else {
                return;
              }
            });
          }else{
            this.noAccess = true
          }

        },
        //删除化妆时间
        deleDressTime(v){
          if(this.authId==1){
            this.$axios.get('/notice/delete_actor_dress',{
              params:{
                detail_id : this.detail_id,
                actor_id : v.actor_id
              }
            }).then((res)=> {
              if(res.data.ret == 0){
                this.getDress()
              }else{
                this.$message.error(res.data.msg);
              }
            })
          }else{
            this.noAccess = true
          }

        },
        //获取联络人
        getContact(){
          this.$axios.get('/notice/get_all_contact',{
            params:{
              detail_id : this.detail_id,
              project_id : this.$route.query.project_id,
              user_id : JSON.parse(localStorage.user_id)
            }
          }).then((res)=> {
            if(res.data.ret == 0){
                if(res.data.data!=null){
                    let arr = [];
                    for(let i=0;i<res.data.data.length;i++){
                        res.data.data[i].dele = false;
                        arr.push(res.data.data[i])
                    }
                    this.contactList = arr
                }

            }else{
              this.$message.error(res.data.msg);
            }
          })
        },
        //修改联络人
        updateContact(data){
          if(this.authId==1){
            this.$axios({
              method: 'post',
              url: '/notice/update_contact',
              data: data,
              transformRequest: [function (data) {
                let ret = ''
                for (let it in data) {
                  ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                }
                return ret
              }],
              headers:{
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Accept':'*/*'
              }
            }).then((response)=> {
              if(response.data.ret != 0){
                this.$message.error(response.data.msg);
              }
            })
          }else{
            this.noAccess = true
          }

        },
        //添加联络人
        addContact(){
          if(this.authId==1){
            this.$refs['contactValidateForm'].validate((valid) => {
              if (valid) {
                this.addContactForm.detail_id = this.detail_id;
                this.$axios({
                  method: 'post',
                  url: '/notice/add_contact',
                  data: this.addContactForm,
                  transformRequest: [function (data) {
                    let ret = ''
                    for (let it in data) {
                      ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                    }
                    return ret
                  }],
                  headers:{
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'Accept':'*/*'
                  }
                }).then((response)=> {
                  if(response.data.ret == 0){
                    this.getContact();
                    this.resetForm('contactValidateForm');
                    this.addContactDialog = false;
                  }else{
                    this.$message.error(response.data.msg);
                  }
                })
              } else {
                return;
              }
            });
          }else{
            this.noAccess = true
          }

        },
        //删除联络人
        deleContact(v){
          if(this.authId==1){
            let form = new FormData;
            form.append('detail_id',this.detail_id);
            form.append('name', v.name);
            form.append('post',v.post);
            this.$axios({
              method: 'post',
              url: '/notice/delete_one',
              data: form,
              headers:{
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Accept':'*/*'
              }
            }).then((res)=> {
              if(res.data.ret == 0){
                this.getContact()
              }else{
                this.$message.error(res.data.msg);
              }
            })
          }else{
            this.noAccess = true
          }

        },
        //获取部门
        getDepartment(){
          this.$axios.get('/notice/get_department_member',{
            params:{
              project_id : this.$route.query.project_id,
              detail_id : this.detail_id
            }
          }).then((res)=> {
            if(res.data.ret == 0){
              this.groupList = res.data.data;
              this.groupMemberList = res.data.data[0]
            }else{
              this.$message.error(res.data.msg);
            }
          })
        },
        //搜索人员
        searchMember(v){
          this.$axios.get('/notice/member_search',{
            params:{
              project_id : this.$route.query.project_id,
              keyword : v
            }
          }).then((res)=> {
            if(res.data.ret == 0){
              this.groupMemberList.memberList = res.data.data
            }else{
              this.$message.error(res.data.msg);
            }
          })
        },
        //获取推送人员
        getMember(){
          this.$axios.get('/notice/get_detail_member',{
            params:{
              detail_id : this.detail_id
            }
          }).then((res)=> {
            if(res.data.ret == 0){
              this.memberList = res.data.data
            }else{
              this.$message.error(res.data.msg);
            }
          })
        },
        //删除推送人员
        deleMember(v){
          if(this.authId==1){
            this.$confirm('确认删除该推送人?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消'
            }).then(() => {
              this.$axios.get('/notice/delete_member',{
                params:{
                  detail_id : this.detail_id,
                  user_id : v,
                }
              }).then((res)=> {
                if(res.data.ret == 0){
                  this.getMember()
                }else{
                  this.$message.error(res.data.msg);
                }
              })
            })
          }else{
            this.noAccess = true
          }

        },
          //获取权限组
          getAuthGroup(){
              this.$axios.get('/auth/get_all_role', {
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
        //保存通告单
        saveNotice(v){
          if(this.authId==1){
            let form = new FormData;
            form.append('status',v);
            form.append('detail_id',this.detail_id);
            this.$axios({
              method: 'post',
              url: '/notice/update_notice_detail',
              data: form,
              headers:{
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Accept':'*/*'
              }
            }).then((response)=> {
              if(response.data.ret != 0){
                this.$message.error(response.data.msg);
              }else{
                  this.$message({
                      message: '保存成功',
                      type: 'success'
                  });
              }
            })
          }else{
            this.noAccess = true
          }

        },
        //发布通告单
        publish(){
          if(this.authId==1){
            this.$axios.get('/notice/release_notice',{
              params:{
                detail_id : this.detail_id
              }
            }).then((res)=> {
              if(res.data.ret == 0){
                  this.$message({
                      message: '发布成功',
                      type: 'success'
                  });
              }else{
                this.$message.error(res.data.cause);
              }
            })
          }else{
            this.noAccess = true
          }

        },
        //提交表单
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              alert('submit!');
            } else {
              console.log('error submit!!');
              return;
            }
          });
        },
        //重置表单
        resetForm(formName) {
          this.$refs[formName].resetFields();
        },
        //懒加载
        nexts(){
          this.scene_num++;
          this.sceneName(this.shoot_location_id);
        },

        //懒加载滚动条
        scroll(){

          // 滚动条距离顶部高度
          let scrollTop = document.getElementById('sceneListBox').scrollTop;

          // 可见区域高度
          let clientHeight = document.getElementById('sceneListBox').clientHeight;

          let scrollHeight = document.getElementById('sceneListBox').scrollHeight;

          if(scrollHeight <= clientHeight + scrollTop ) {
            this.nexts()
          }

        }
      },
      mounted(){
        this.detail_id = this.$route.query.id;
        this.getCode();
        this.getPlace();
        this.getTime();
        this.getBigGo();
        this.getGo();
        this.getDress();
        this.getContact();
        this.getNotice();
        this.getMember();
        this.getEpisode();
          this.getDepartment();
          this.getDepartmentList();
          this.getAuthGroup();
          this.getAuthority();
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
      },
      updated(){
        this.detail_id = this.$route.query.id;
      },
      watch:{
        sceneBox:{
          immediate: true,
          handler(curVal, oldVal) {
            if(curVal == true){
              this.$nextTick( ()=> {
                document.getElementById('sceneListBox').addEventListener('scroll', this.scroll);
              })
            }
          },
          deep: true
        },
        shoot_location_id:{
          immediate: true,
          handler(curVal, oldVal) {
            this.scene_num = '1';
            this.scene_episode = '1';
          },
          deep: true
        },
        steps:{
          immediate: true,
          handler(curVal, oldVal) {
            this.sceneBox=false;
            if(curVal=='1'||curVal=='2'||curVal=='3'||curVal=='6'){
              this.previewNum = false
            }else{
              this.previewNum = true
            }
          },
          deep: true
        },
        placeList:{
          immediate: true,
          handler(curVal, oldVal) {
            let arr = [];
            for(let i=0;i<curVal.length;i++){
              arr.push(curVal[i].shoot_location)
            }
            this.placeInfo = arr.join('，')
          },
          deep: true
        },
        bigGo:{
          immediate: true,
          handler(curVal, oldVal) {
            let arr = new Array();
            arr.push(this.bigGo);
            this.allGoList = arr.concat(this.goList)
          },
          deep: true
        },
        goList:{
          immediate: true,
          handler(curVal, oldVal) {
            let arr = new Array();
            arr.push(this.bigGo);
            this.allGoList = arr.concat(this.goList)
          },
          deep: true
        },
      },
      filters: {
        //添加名称
        addTitle: function (value) {
          if(value == 3){
            return '出发时间'
          }else if(value == 4){
            return '化妆人员'
          }else if(value == 5){
            return '联络人'
          }
        }
      },

    }
</script>

<style scoped>
  *{
    box-sizing: border-box;
  }

  #noticeForm{
    width: calc(100% - 32px);
    height: calc(100vh - 80px);
    margin: 24px 0 0 12px;
  }

  /*顶部*/
  #noticeForm .frameTop{
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(207,209,214,1);
  }

  /*步骤条*/
  #noticeForm .stepBox{
    display: flex;
    width: 55%;
    justify-content: space-between;
  }

  #noticeForm .stepBox .step{
    position: relative;
    width: 20%;
  }

  #noticeForm .stepBox .step:after{
    content: " ";
    width: 0;
    height: 1px;
    background: rgba(108,111,191,1);
    position: absolute;
    bottom: 4px;
    transition: width 1s;
  }

  #noticeForm .stepBox .step.active:after{
    width: 100%;
  }

  #noticeForm .stepBox .step:last-of-type.active:after{
    width: 55px;
  }

  #noticeForm .stepBox .step .innerBox{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 110px;
  }

  #noticeForm .stepBox .stepTooltip.stepTitle{
    background: none;
    box-shadow: none;
    width: 60px;
    transition: width 1s,background 0.6s,box-shadow 1s;
    cursor: pointer;
  }

  #noticeForm .stepBox .stepTooltip.stepTitle:after{
    opacity: 0;
  }

  /*对话框样式*/
  #noticeForm .stepBox .stepTooltip{
    background: #fff;
    color:rgba(129,132,144,1);
    font-size:14px;
    line-height: 38px;
    text-align: center;
    position: relative;
    margin-bottom: 11px;
    width: 110px;
    box-shadow: 1px 1px 5px 5px rgba(0,0,0,.04);
    border-radius: 2px;
    transition: width 0.6s,background 1s,box-shadow 1s;
    cursor: pointer;
  }

  #noticeForm .stepBox .stepTooltip:after {
    border-left: solid transparent 8px;
    border-right: solid transparent 8px;
    border-top: solid #fff 8px;
    bottom: -6px;
    content: " ";
    height: 0;
    left: 50%;
    margin-left: -8px;
    position: absolute;
    width: 0;
    transition: opacity 1s;
  }

  #noticeForm .stepBox .stepCircle{
    width:10px;
    height:10px;
    background:rgba(243,179,180,1);
    border-radius:50%;
    cursor: pointer;
    position: relative;
    z-index: 10;
  }

  #noticeForm .stepBox .stepCircle:after{
    position: absolute;
    width: 4px;
    height: 4px;
    background:rgba(240,80,80,1);
    border-radius:50%;
    top: 3px;
    left: 3px;
    content: " ";
  }

  /*顶部右侧*/
  #noticeForm .frameBtnBox{
    display: flex;
    align-items: center;
  }

  #noticeForm .frameBtnBox .frameBtnTxt{
    font-size:12px;
    margin-right: 22px;
    color:rgba(108,111,191,1);
    cursor: pointer;
  }

  #noticeForm .frameBtnBox .frameBtn{
    width:80px;
    height:24px;
    background:transparent;
    border: 1px solid rgba(237,149,21,1);
    border-radius:12px;
    font-size:12px;
    line-height: 22px;
    cursor: pointer;
    text-align: center;
    color: rgba(237,149,21,1);
  }

  #noticeForm .frameBtnBox .frameBtn:last-child{
    color: #fff;
    background:rgba(237,149,21,1);
    margin-left: 14px;
  }

  /*主页面*/
  #noticeForm .frameContent {
    width: 100%;
    height: calc(100vh - 150px);
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
  }

  /*主页面左侧*/
  #noticeForm .frameContent .frameContentLeft{
    width: 60%;
    border:1px solid rgba(231,231,236,1);
    border-radius:2px;
    background: #fff;
  }

  #noticeForm .frameContent .frameContentLeft .frameContentLeftTop{
    width: 100%;
    height: 4px;
    background: rgba(108,111,191,1);
    margin-bottom: 35px;
  }

  #noticeForm .frameContent .frameContentLeft .frameContentLeftTop.noBottom{
    margin-bottom: 0;
  }

  #noticeForm .frameContent .frameContentLeft .frameContentTopBox{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 30px;
    margin-bottom: 20px;
  }

  #noticeForm .frameContent .frameContentLeft .frameContentTopBox div:first-of-type{
    width: 80%;
  }

  #noticeForm .frameContent .frameContentLeft .frameContentTopBox .addBtn,
  #noticeForm .frameContent .frameContentLeft .goBox .addBtn{
    width:auto;
    min-width: 100px;
    height:32px;
    background:rgba(108,111,191,1);
    border-radius:16px;
    padding: 0 15px;
    font-size:12px;
    color:rgba(255,255,255,1);
    text-align: center;
    line-height: 32px;
    cursor: pointer;
    transition: all 0.6s;
  }

  /*主页面左侧主表单*/
  #noticeForm .frameContent .frameContentLeft .frameContentFromBox{
    width: 100%;
    height: calc(100% - 92px);
    padding: 0 0 0 44px;
    overflow-y: scroll;
    display: flex;
    flex-wrap: wrap;
    position: relative;
    align-content: flex-start;
  }

  /*拍摄地点*/
  #noticeForm .frameContent .frameContentLeft .placeBox{
    width: 100%;
    height: calc(100% - 4px);
    padding: 10px 25px 0 23px;
    overflow-y: scroll;
    position: relative;
  }

  #noticeForm .frameContentLeft .placeBox .noticeInfoBox{
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 22px;
  }

  #noticeForm .frameContentLeft .placeBox .noticeInfoBox .noticeInfo{
    width: 40%;
  }

  #noticeForm .frameContentLeft .placeBox .noticeInfoBox .noticeInfo p{
    font-size:12px;
    line-height: 12px;
    margin-top: 14px;
    color:rgba(57,63,81,1);
  }

  #noticeForm .frameContentLeft .placeBox .noticeInfoBox .noticeInfo .noticeInfoTitle{
    margin-top: 20px;
    color:rgba(97,101,116,1);
  }

  #noticeForm .frameContentLeft .placeBox .noticeInfoBox .noticeInfo .form{
    display: flex;
    justify-content: space-between;
  }

  #noticeForm .frameContentLeft .placeBox .noticeInfoBox .noticeInfoFlex{
    display: flex;
    justify-content: space-between;
    width: 40%;
  }

  #noticeForm .frameContentLeft .addHr{
    width: 100%;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 50px auto 28px;
  }

  #noticeForm .frameContentLeft .addHr>.dashedHr{
    height:1px;
    background: rgba(176,178,185,0.6);
    width: calc(100% - 130px);
  }

  #noticeForm .frameContentLeft .addHr .addBtn{
    width:110px;
    height:24px;
    background:rgba(108,111,191,1);
    border-radius:12px;
    font-size:12px;
    text-align: center;
    line-height: 24px;
    color:rgba(255,255,255,1);
    cursor: pointer;
  }

  #noticeForm .frameContentLeft .dashedHr:not(.line){
    width: 100%;
    height:1px;
    border-bottom:1px dashed rgba(176,178,185,1);
    margin: 60px 0 30px;
  }

  #noticeForm .frameContent .placeBox .placeTitleBox{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 14px 0 12px;
    width:100%;
    height:24px;
    background:rgba(249,239,218,1);
    border:1px solid rgba(215,217,220,0.8);
    border-bottom: none;
    border-radius:2px 2px 0px 0px;
    font-size: 14px;
    line-height: 14px;
    color: rgba(97,101,116,1);
  }

  #noticeForm .frameContent .placeBox .placeTitleBox .left{
    display: flex;
    align-items: center;
    font-size: 14px;
    line-height: 14px;
    color: rgba(97,101,116,1);
  }

  #noticeForm .frameContent .placeBox .placeTitleBox .right{
    font-size:12px;
    color:rgba(108,111,191,1);
    cursor: pointer;
  }

  #noticeForm .frameContent .placeBox .placeTableBtn{
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100%;
  }

  #noticeForm .frameContent .placeBox .placeTableDele{
    width:24px;
    height:24px;
    background:rgba(240,80,80,1);
    opacity:0.6;
    border-radius:2px;
    margin: 0 auto;
    text-align: center;
    color: #fff;
    cursor: pointer;
    transition: opacity 0.8s;
    flex-shrink: 0;
  }

  #noticeForm .frameContent .placeBox .placeTableDele:first-child{
    background:rgba(50,197,143,1);
  }

  #noticeForm .frameContent .placeBox .placeTableDele i{
    line-height: 24px;
  }

  #noticeForm .frameContent .placeBox .placeTableDele:hover{
    opacity: 1;
  }

  #noticeForm .frameContent .placeBox .addBox{
    display: flex;
    width: 100%;
    border: 1px solid rgba(215,217,220,0.8);
    border-bottom: none;
    border-top: none;
    height: 46px;
    align-items: center;
    padding-left: 16px;
  }

  #noticeForm .frameContent .placeTable:last-of-type .addBox{
    border-bottom: 1px solid rgba(215,217,220,0.8);
  }

  #noticeForm .frameContent .placeBox .addBox .addBtn{
    font-size:12px;
    color:rgba(108,111,191,1);
    margin-right: 33px;
    cursor: pointer;
    transition: color .6s;
  }

  #noticeForm .frameContent .placeBox .addBox .addBtn.finish{
    color: #F05050;
  }

  /*拍摄地的角色对应*/
  #noticeForm .frameContent .actorBox{
    margin-top: 40px;
  }

  #noticeForm .frameContent .actorBox .actorInfoBox{
    margin-top: 22px;
    display: flex;
    padding-left: 11px;
    flex-wrap: wrap;
  }

  #noticeForm .frameContent .actorBox .actorInfoBox .actorInfo{
    width:190px;
    height:75px;
    background:rgba(245,245,247,1);
    border:1px solid rgba(228,228,234,1);
    border-radius:4px;
    margin: 0 20px 20px 0;
    display: flex;
    justify-content: space-between;
    padding: 15px 18px;
    line-height: 45px;
  }

  #noticeForm .frameContent .actorInfoBox .actorInfo .actorNameBox{
    font-size:12px;
    color:rgba(97,101,116,1);
    line-height: 12px;
  }

  #noticeForm .frameContent .actorInfoBox .actorInfo .actorNameBox .actorName{
    font-size:14px;
    color:rgba(97,101,116,1);
    margin-top: 16px;
  }

  #noticeForm .frameContent .actorInfoBox .actorInfo .actorNameBox:last-of-type .actorName{
    color:rgba(108,111,191,1);
    cursor: pointer;
  }

  #noticeForm .frameContent .actorInfoBox .actorInfo i{
    transform: rotate(180deg);
    font-weight: bold;
    line-height: 20px;
    font-size: 20px;
  }

  /*拍摄时间*/
  #noticeForm .frameContent .timeBox{
    width: 100%;
    height: calc(100% - 40px);
    padding: 10px 30px 0;
    overflow-y: scroll;
  }

  #noticeForm .frameContent .timeFormBox{
    width: 400px;
    padding-left: 12px;
    padding-right: 0;
    margin-top: 30px;
  }

  #noticeForm .frameContent .timeFormBox.timeFormBoxNd{
    width: calc(100% - 10px);
  }

  #noticeForm .frameContent .timeFormFlexBox{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  #noticeForm .frameContent .timeFormFlexBox .timeForm{
    width: 30%;
  }

  /*#noticeForm .frameContent .timeFormFlexBox .timeFormNum{*/
    /*width: 36%;*/
  /*}*/

    /*出发时间*/
  #noticeForm .frameContent .frameContentLeft .hrBtnBox{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 75px;
  }

  #noticeForm .frameContent .frameContentLeft .hrBtnBox .hr{
    width: calc(100% - 132px);
    height:2px;
    background:rgba(226,226,233,1);
  }

  #noticeForm .frameContent .frameContentLeft .hrBtnBox .addBtn.null{
    background:rgba(215,217,220,1);
    cursor: not-allowed;
    color:rgba(57,63,81,1);
  }

  #noticeForm .frameContent .frameContentLeft .goTimeInfoBox{
    padding: 0 12px;
    margin-top: 40px;
    display: flex;
  }

  #noticeForm .frameContent .frameContentLeft .goTimeBox{
    width:350px;
    height:130px;
    background:rgba(255,255,255,1);
    border:1px solid rgba(231,231,236,1);
    border-radius:4px;
    overflow: hidden;
    margin: 0 14px 22px 0;
    transition: all 0.6s;
    position: relative;
  }
  #noticeForm .frameContent .frameContentLeft .goTimeBox:hover{
    box-shadow: 0 0 10px 1px rgba(0,0,0,.08);
    background: #fff;
  }

  #noticeForm .frameContent .frameContentLeft .goTimeBox .goTimeContentBox{
    padding: 0 15px;
  }

  #noticeForm .frameContent .frameContentLeft .goTimeBox .goTimeTop{
    width: 100%;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 5px;
    border-bottom: 1px solid rgba(225,224,231,1);
  }

  #noticeForm .frameContent .frameContentLeft .goTimeBox .goTimeTop>div:first-of-type{
    width: 44%;
  }

  #noticeForm .frameContent .frameContentLeft .goTimeBox .goTimeTopRight{
    border-left: 1px solid rgba(207,209,214,1);
    width: 50%;
    height: 30px;
    line-height: 30px;
    padding-left: 12px;
    font-size:12px;
    color:rgba(97,101,116,1);
    display: flex;
    align-items: center;
  }

  #noticeForm .frameContent .frameContentLeft .goTimeBox .goTimeTopRight span{
    color: #F05050;
  }

  #noticeForm .frameContent .frameContentLeft .goTimeBox .goTimePlace{
    width: 100%;
    height: 60px;
    padding: 20px 5px;
    position: relative;
    display: flex;
  }

  #noticeForm .frameContent .frameContentLeft .goTimeBox .goTimePlace .title{
    font-size:12px;
    color:rgba(97,101,116,1);
    line-height: 12px;
  }

  #noticeForm .frameContent .frameContentLeft .goTimeBox .goTimePlace span{
    font-size:14px;
    color:rgba(108,111,191,1);
    width: 60%;
    line-height: 14px;
    margin-left: 6px;
    display: inline-block;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    cursor: pointer;
  }

  #noticeForm .frameContent .frameContentLeft .goTimeBox .goTimePlace .deleBtn{
    width:24px;
    height:24px;
    background:rgba(234,80,80,1);
    border-radius:2px;
    position: absolute;
    top: 14px;
    right: 4px;
    text-align: center;
    cursor: pointer;
    opacity: 0;
    transition: opacity 1s;
  }

  #noticeForm .frameContent .frameContentLeft .goTimeBox .goTimePlace .deleBtn i{
    font-size: 14px;
    color: #fff;
    line-height: 24px;
  }

  #noticeForm .frameContent .goTimeBox:hover .goTimePlace .deleBtn{
    opacity: 1;
  }

  #noticeForm .frameContent .frameContentLeft .goTimeBox .goTimeCar{
    margin: 14px 5px;
    font-size:12px;
    line-height: 14px;
    color:rgba(97,101,116,1);
  }

  #noticeForm .frameContent .frameContentLeft .goTimeBox .goTimeCar span{
    color:rgba(108,111,191,1);
    font-size: 12px;
    cursor: pointer;
  }

  #noticeForm .frameContent .frameContentLeft .goTimeBox .goTimeRemark{
    width:100%;
    height:24px;
    background:rgba(246,236,214,1);
    padding: 0 20px;
    line-height: 24px;
    font-size:12px;
    color:rgba(97,101,116,1);
  }

  #noticeForm .frameContent .frameContentLeft .goTimeBox .goTimeRemark span{
    line-height: 24px;
    font-size:12px;
    color:rgba(97,101,116,1);
    cursor: pointer;
  }

  /*化妆时间*/
  #noticeForm .frameContent .frameContentFromBox .dressBox{
    height: 130px;
    background:rgba(245,245,247,1);
  }

  #noticeForm .frameContent .frameContentFromBox .goTimeBox .dressTop>div:first-of-type{
    width: 50%;
  }

  #noticeForm .frameContent .frameContentFromBox .goTimeBox .dressTop .goTimeTopRight{
    width: 44%;
    display: flex;
    align-items: center;
  }

  #noticeForm .frameContent .goTimeBox .goTimeTopRight .dressTime{
    width: 40%;
  }

  #noticeForm .frameContent .frameContentFromBox .dressBox .dressInfoBox{
    display: flex;
    justify-content: space-between;
    height: 85px;
    padding: 16px 4px 0 10px;
  }

  #noticeForm .frameContentFromBox .dressBox .dressInfoBox .dressInfo{
    width: 80px;
    font-size:12px;
    color:rgba(97,101,116,1);
  }

  #noticeForm .frameContentFromBox .dressBox .dressInfoBox .btnBox{
    display: flex;
    flex-shrink: 0;
  }

  #noticeForm .frameContentFromBox .dressBox .dressInfoBox .deleBtn{
    width:24px;
    height:24px;
    background:rgba(234,80,80,1);
    border-radius:2px;
    text-align: center;
    cursor: pointer;
    opacity: 0;
    transition: opacity 1s;
    flex-shrink: 0;
  }

  #noticeForm .frameContentFromBox .dressBox .dressInfoBox .editBtn{
    background:rgba(50,197,143,1);
    margin-right: 10px;
  }

  #noticeForm .frameContentFromBox .dressBox .dressInfoBox .deleBtn i{
    font-size: 14px;
    color: #fff;
    line-height: 24px;
  }

  #noticeForm .frameContentFromBox .dressBox:hover .dressInfoBox .deleBtn{
    opacity: 1;
  }

  /*主要联络咨询*/
  #noticeForm .frameContent .frameContentFromBox .contactBox{
    width:246px;
    height:130px;
    background:rgba(246,247,251,1);
    border:1px solid rgba(228,228,234,1);
    border-radius:4px;
    padding: 0 15px;
    margin: 0 14px 22px 0;
    transition: all 0.6s;
    position: relative;
  }
  #noticeForm .frameContent .frameContentFromBox .contactBox:hover{
    box-shadow: 0 0 10px 1px rgba(0,0,0,.08);
    background: #fff;
  }

  #noticeForm .frameContent .frameContentFromBox .contactBox .contactContentBox{
    padding: 0 15px;
  }

  #noticeForm .frameContent .frameContentFromBox .contactBox .contactTop{
    width: 100%;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 5px;
    border-bottom: 1px solid rgba(225,224,231,1);
  }

  #noticeForm .frameContent .frameContentFromBox .contactBox .contactTop div:first-of-type{
    width: 44%;
  }

  #noticeForm .frameContent .frameContentFromBox .contactBox .contactTopRight{
    border-left: 1px solid rgba(207,209,214,1);
    width: 50%;
    height: 30px;
    line-height: 30px;
    padding-left: 12px;
    font-size:12px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    color:rgba(97,101,116,1);
  }

  #noticeForm .frameContent .frameContentFromBox .contactBox .contactTopRight span{
    color: #F05050;
  }

  #noticeForm .frameContent .frameContentFromBox .contactBox .contactContent{
    width: 100%;
    height: 85px;
    border-bottom: 1px solid rgba(225,224,231,1);
    padding: 20px 5px;
    position: relative;
  }

  #noticeForm .frameContent .frameContentFromBox .contactBox .contactContent .title{
    font-size:12px;
    color:rgba(97,101,116,1);
    line-height: 12px;
    margin-bottom: 12px;
  }

  #noticeForm .frameContent .frameContentFromBox .contactBox .contactContent span{
    font-size:14px;
    color:rgba(108,111,191,1);
    width: 100%;
    display: inline-block;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    cursor: pointer;
  }

  #noticeForm .frameContent .frameContentFromBox .contactBox .contactContent .deleBtn{
    width:24px;
    height:24px;
    background:rgba(234,80,80,1);
    border-radius:2px;
    position: absolute;
    top: 20px;
    right: 4px;
    text-align: center;
    cursor: pointer;
    opacity: 0;
    transition: opacity 1s;
  }

  #noticeForm .frameContent .frameContentFromBox .contactBox .contactContent .deleBtn i{
    font-size: 14px;
    color: #fff;
    line-height: 24px;
  }

  #noticeForm .frameContent .frameContentFromBox .contactBox:hover .contactContent .deleBtn{
    opacity: 1;
  }

  /*推送对象*/
  /*推送对象左侧*/
  #noticeForm .frameContent .pushBox{
    display: flex;
    width: 100%;
    height: calc(100% - 4px);
    position: relative;
  }

  #noticeForm .frameContent .pushBox .pushLeftBox{
    width: 34%;
    height: 100%;
    border-right: 1px solid rgba(207,209,214,1);
    padding: 40px 0 0;
  }

  #noticeForm .frameContent .pushBox .pushLeftBox .pushLeftTitle{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 32px;
    margin-bottom: 30px;
  }

  #noticeForm .frameContent .pushBox .pushLeftBox .titleHr{
    width: 60%;
  }

  #noticeForm .frameContent .pushBox .pushLeftBox .pushLeftTitle .add{
    font-size:12px;
    color:rgba(108,111,191,1);
    cursor: pointer;
  }

  #noticeForm .frameContent .pushBox .pushLeftBox .groupBox{
    height: calc(100% - 99px);
    overflow-y: scroll;
  }

  #noticeForm .frameContent .pushBox .pushLeftBox .groupName{
    font-size:14px;
    color:rgba(129,132,144,1);
    padding: 0 42px 30px;
    width: 100%;
    height: 12px;
    line-height: 12px;
    cursor: pointer;
    transition: color 0.6s;
  }

  #noticeForm .frameContent .pushBox .pushLeftBox .groupName:hover,
  #noticeForm .frameContent .pushBox .pushLeftBox .groupName.active{
    color: rgba(108,111,191,1);
  }

  #noticeForm .frameContent .pushBox .pushLeftBox .groupName:last-of-type{
    margin-bottom: 0;
  }

  #noticeForm .frameContent .pushBox .pushRightBox .pushListBox{
    border-top: 1px solid rgba(207,209,214,1);
    height: calc(100% - 59px);
  }
  #noticeForm .frameContent .pushBox .pushRightBox .pushTr i.iconzuobian{
    color: rgba(108,111,191,1);
    transform: rotate(180deg);
    display: inline-block;
  }

  /*推送对象右侧*/
  #noticeForm .frameContent .pushRightBox{
    padding: 35px 0 0;
    width: 66%;
  }

  #noticeForm .frameContent .pushBox .pushRightBox .pushRightTitleBox{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 30px 0 10px;
    margin-bottom: 22px;
  }

  #noticeForm .frameContent .pushBox .pushRightBox .pushRightTitleBox .pushRightTitle{
    width: 50%;
  }

  #noticeForm .frameContent .pushBox .pushRightBox .pushRightTitleBox .frameTopSearch{
    width: 40%;
  }

  #noticeForm .frameContent .pushRightBox .pushListBox{
    overflow-y: scroll;
    height: calc(100% - 70px);
  }

  #noticeForm .frameContent .pushRightBox .pushTr{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 35px;
    background: rgba(235,235,240,0.4);
    height: 40px;
  }

  #noticeForm .frameContent .pushRightBox .pushTr:nth-of-type(even){
    background: #fff;
  }

  #noticeForm .frameContent .pushRightBox .pushTr i{
    color: #F05050;
  }

  #noticeForm .frameContent .pushRightBox .pushTr i:first-of-type{
    margin-right: 12px;
  }

  #noticeForm .frameContent .pushRightBox .pushTd{
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    height: 100%;
    font-size:12px;
    color:rgba(57,63,81,1);
    line-height: 40px;
    width: 40%;
  }

  #noticeForm .frameContent .pushRightBox .pushTd:first-of-type{
    display: flex;
    align-items: center;
  }

  #noticeForm .frameContent .pushRightBox .pushTd:first-of-type span{
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    font-size:12px;
    color:rgba(57,63,81,1);
  }

  #noticeForm .frameContent .pushRightBox .pushTd:last-of-type i{
    cursor: pointer;
  }

  #noticeForm .frameContent .pushRightBox .pushTd:last-of-type{
    width: 10%;
    display: flex;
    align-items: center;
  }

  #noticeForm .frameContent .pushRightBox .pushTd:last-of-type i:first-of-type{
    font-size: 18px;
  }

    /*主页面右侧*/
  #noticeForm .frameContent .frameContentRight{
    width: calc(40% - 12px);
    border:1px solid rgba(231,231,236,1);
    border-radius:2px;
    background: #fff;
    padding: 28px 0 0;
  }

  /*右侧场景选择*/
  /*顶部搜索，选择*/
  #noticeForm .frameContent .frameContentRight .frameTopBox{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 26px;
    padding: 0 14px;
  }

  #noticeForm .frameContent .frameContentRight .frameTopBox .leftBtn{
    width:80px;
    height:24px;
    background:rgba(207,209,214,1);
    border-radius:12px;
    font-size:12px;
    color:rgba(0,0,0,0.8);
    line-height: 24px;
    text-align: center;
    cursor: pointer;
    transition: all 0.8s linear;
  }

  #noticeForm .frameContent .frameContentRight .frameTopBox .leftBtn:hover{
    background:rgba(237,149,21,1);
    color: #fff;
  }

  #noticeForm .frameContent .frameContentRight .frameTopBox .right{
    display: flex;
    align-items: center;
  }

  #noticeForm .frameContent .frameContentRight .frameTopSearchBox{
    width: 186px;
    margin-right: 22px;
  }

  #noticeForm .frameContent .frameContentRight .frameTopBox .frameTopSelect{
    font-size:12px;
    color:rgba(97,101,116,1);
    cursor: pointer;
  }

  #noticeForm .frameContent .frameContentRight #sceneListBox{
    overflow-y: scroll;
    overflow-x: hidden;
    width: 100%;
    height: calc(100% - 66px);
    padding: 0 10px;
  }

  #noticeForm .frameContent .frameContentRight .sceneList{
    width:100%;
    height:50px;
    background:rgba(250,250,251,1);
    border:1px solid rgba(215,217,220,1);
    border-radius:4px;
    margin-top: 4px;
    display: flex;
    align-items: center;
    overflow: hidden;
  }

  #noticeForm .frameContent .frameContentRight .sceneList .sceneListBtn{
    width:0;
    height:50px;
    background:rgba(108,111,191,1);
    text-align: center;
    transition: width 0.5s;
    flex-shrink: 0;
    cursor: pointer;
  }

  #noticeForm .frameContent .frameContentRight .sceneList .sceneListBtn i{
    font-size: 26px;
    color: #fff;
    line-height: 50px;
    opacity: 0;
  }

  #noticeForm .frameContent .frameContentRight .sceneList:hover .sceneListBtn{
    width: 50px;
  }

  #noticeForm .frameContent .frameContentRight .sceneList:hover .sceneListBtn i{
    opacity: 1;
  }

  #noticeForm .frameContent .frameContentRight .sceneList .sceneListItem{
    border-right: 1px solid rgba(215,217,220,1);
    font-size:12px;
    font-weight:400;
    color:rgba(97,101,116,1);
    flex-shrink: 0;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    padding: 0 1.4%;
    width: 6.2%;
    text-align: center;
    transition: transform 0.5s;
  }

  #noticeForm .frameContent .frameContentRight .sceneList:hover .sceneListItem{
    transform: translate(0,0px);
  }

  #noticeForm .frameContent .frameContentRight .sceneList .sceneListItem:nth-of-type(3){
    width: 12%;
  }

  #noticeForm .frameContent .frameContentRight .sceneList .sceneListItem:nth-of-type(4),
  #noticeForm .frameContent .frameContentRight .sceneList .sceneListItem:nth-of-type(5){
    width: 9.4%;
  }

  #noticeForm .frameContent .frameContentRight .sceneList .sceneListItem:nth-of-type(6){
    width: 24%;
  }

  #noticeForm .frameContent .frameContentRight .sceneList .sceneListItem:nth-of-type(7){
    width: 22%;
  }

  #noticeForm .frameContent .frameContentRight .sceneList .sceneListItem:last-of-type{
    width: 18%;
    border-right: none;
  }

  /*右侧通告单预览*/
  #noticeForm .frameContent .frameContentRight #flipBox{
    position:relative;
    width: 100%;
    height: calc(100% - 30px);
    overflow-y: scroll;
  }

  #noticeForm .frameContent .frameContentRight #flipBox>div{
    transform-style: preserve-3d;
    transition: all 2s;
    backface-visibility: hidden;
    position: absolute;
    top: 0;
    left: 0;
    min-height: 100%;
    width: 100%;
  }

  #noticeForm .frameContent .frameContentRight #flipBox>div:first-child{
    transform: rotateY(0deg);
    z-index: 2;
    background: #fff;
  }

  #noticeForm .frameContent .frameContentRight #flipBox>div:last-child{
    transform: rotateY(360deg);
    z-index: 0;
    background: #fff;
  }

  #noticeForm .frameContent .frameContentRight #flipBox.active>div:first-child{
    transform: rotateY(360deg);
    z-index: 0;
    opacity: 0;
  }

  #noticeForm .frameContent .frameContentRight #flipBox.active>div:last-child{
    transform: rotateY(0deg);
    z-index: 2;
  }

  #noticeForm .frameContent .frameContentRight.previewBox{
    padding: 8px 20px 0;
  }

  #noticeForm .frameContent .previewBox .previewBoxTop{
    display: flex;
    justify-content: flex-end;
  }

  #noticeForm .frameContent .previewBox .previewBoxTop .previewBtn{
    display: flex;
    align-items: center;
    font-size:14px;
    line-height: 22px;
    color:rgba(57,63,81,1);
    cursor: pointer;
    margin-left: 16px;
  }

  #noticeForm .frameContent .previewBox .previewBoxTop .previewBtn:hover{
    color:rgba(129,132,144,1);
  }

  #noticeForm .frameContent .previewBox .previewBoxTop .previewBtn i{
    font-size: 20px;
    color: #ED9515;
    margin-right: 5px;
  }

  #noticeForm .frameContent .previewBox .previewBoxTop .previewBtn:nth-last-child(2) i{
    font-size: 18px;
  }

  #noticeForm .frameContent .previewBox .previewBoxTop .previewBtn:last-child i{
    font-size: 22px;
  }

  #noticeForm .frameContent .previewBox .previewBoxTitle{
    margin: 10px 0;
    width: 100%;
    font-size:20px;
    color:rgba(0,0,0,1);
    display: flex;
    align-items: center;
  }

  #noticeForm .frameContent .previewBox .previewBoxTitle span{
    font-size:20px;
    color:rgba(0,0,0,1);
    margin-left: 8%;
    width: 36%;
    display: inline-block;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }

  #noticeForm .frameContent .previewBox .previewContentBox{
    border: 1px solid rgba(136,140,151,1);
    border-width:1px 0;
    padding: 0 1px 10px;
    /*height: calc(100% - 76px);*/
    /*overflow-y: scroll;*/
    height: 100%;
    width: 100%;
  }

  #noticeForm .frameContent .previewBox #flipBox>div:last-child .previewContentBox{
    margin-top: 10px;
    height: calc(100% - 44px);
  }

  #noticeForm .frameContent .previewBox .previewInfoBox{
    width: 100%;
    border:1px solid rgba(136,140,151,1);
    border-radius:4px;
    flex-shrink: 0;
    margin-top: 8px;
    overflow: hidden;
    height: auto;
  }

  #noticeForm .frameContent .previewBox .previewInfoBox.bigBox{
    height: 118px;
  }

  #noticeForm .frameContent .previewBox .previewInfoBox .previewInfoTitle{
    background:rgba(215,217,220,1);
    font-size:12px;
    padding-left: 10px;
    line-height: 18px;
    height:18px;
    color:rgba(57,63,81,1);
    border: 1px solid rgba(136,140,151,1);
    border-width: 0 0 1px 0;
  }

  #noticeForm .frameContent .previewBox .previewInfoBox .previewInfoTitle.green{
    background:rgba(124,212,185,0.6);
  }

  #noticeForm .frameContent .previewBox .previewInfoBox .previewInfoTitle.red{
    background:rgba(251,121,138,0.6);
  }

  #noticeForm .frameContent .previewBox .previewInfoBox .previewInfoTitle.yellow{
    background:rgba(245,229,194,0.6);
  }

  #noticeForm .frameContent .previewBox .previewInfoBox .previewInfoTitle.flex{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 55px;
  }

  #noticeForm .frameContent .previewBox .previewInfoBox .previewInfoTitle.flex span{
    font-size:12px;
    line-height: 18px;
    color:rgba(57,63,81,1);
  }

  #noticeForm .frameContent .previewBox .previewInfoBox .previewInfoTitle.flex p{
    color: #000;
    display: inline-block;
    font-size:12px;
    line-height: 20px;
  }

  /*拍摄时间预览*/
  #noticeForm .frameContent .previewBox .previewInfoBox.previewTime{
    height: 55px;
  }

  #noticeForm .frameContent .previewBox .previewTimeBox{
    display: flex;
  }

  #noticeForm .frameContent .previewBox .previewInfoBox .previewTimeBox .previewInfoTxt{
    flex: 1;
    border-bottom: none;
    padding-left: 0;
    flex-shrink: 0;
    height: 36px;
    border-right: 1px solid rgba(136,140,151,1);
  }

  #noticeForm .frameContent .previewBox .previewInfoBox .previewTimeBox .previewInfoTxt:last-of-type{
    border-right: none;
  }

  #noticeForm .frameContent .previewBox .previewTimeBox .previewInfoTxt .previewTimeTitle{
    border: 1px solid rgba(136,140,151,1);
    border-width: 0 0 1px 0;
    width: 100%;
    height: 18px;
    text-align: center;
    color:rgba(97,101,116,1);
    font-size:12px;
    line-height: 18px;
  }

  #noticeForm .frameContent .previewBox .previewTimeBox .previewInfoTxt .previewTimeTitle span{
    margin-left: 2%;
    color:#000;
    font-size:12px;
    line-height: 18px;
  }

  #noticeForm .frameContent .previewBox .previewTimeBox .previewTimeInfo{
    height: 18px;
    width: 100%;
  }

  #noticeForm .frameContent .previewBox .previewInfoBox.previewTime .previewTimeInfo p:first-of-type{
    width: 24%;
    margin-left: 0;
    padding-left: 4px;
    text-align: center;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }

  #noticeForm .frameContent .previewBox .previewInfoBox.previewTime .previewTimeInfo p.border{
    border:1px solid rgba(136,140,151,0.4);
    border-width: 0 0 0 1px;
    width: 74%;
    margin-left: 0;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }

  #noticeForm .frameContent .previewBox .previewInfoBox.tableBox{
    width: 100%;
    height: auto;
  }

  #noticeForm .frameContent .previewBox .previewInfoBox.small{
    height: 64px;
  }

  #noticeForm .frameContent .previewBox .previewInfoBox .previewInfoTxt{
    font-size:12px;
    padding-left: 10px;
    line-height: 18px;
    height:18px;
    color:rgba(0,0,0,1);
    border: 1px solid rgba(136,140,151,1);
    border-width: 0 0 1px 0;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }

  #noticeForm .frameContent .previewBox .previewInfoBox .previewInfoTxt:last-child{
    border-bottom: none;
  }

  #noticeForm .frameContent .previewBox .previewInfoBox .previewInfoTxt.big{
    height: 42px;
    font-size: 16px;
    line-height: 30px;
  }

  #noticeForm .frameContent .previewBox .previewInfoBox .previewInfoTxt.big2{
    font-size: 14px;
    line-height: 18px;
  }

  #noticeForm .frameContent .previewBox .previewInfoBox .previewInfoTxt.previewInfoTxtFlex{
    display: flex;
    align-items: center;
  }

  #noticeForm .frameContent .previewBox .previewInfoBox .previewInfoTxtFlex>.previewInfoTxt:first-child{
    padding-left: 0;
    width: 50%;
  }

  #noticeForm .frameContent .previewBox .previewInfoBox .previewInfoTxt.txtBorder{
    display: inline-block;
    border-left: 1px solid rgba(136,140,151,1);
    padding-left: 15px;
  }

  #noticeForm .frameContent .previewBox .previewInfoBox .contactTxt{
    font-size:12px;
    padding: 0 10px;
    line-height: 20px;
    height:20px;
    color:rgba(0,0,0,1);
    display: inline-block;
  }

  #noticeForm .frameContent .previewBox .previewInfoBox .previewInfoTxt span{
    color: #616574;
    font-size:12px;
  }

  #noticeForm .frameContent .previewBox .previewInfoBox .previewInfoTxt.big span.big{
    color: #000;
    font-size:20px;
  }

  #noticeForm .frameContent .previewBox .previewInfoBox .previewInfoTxt.big2 span.big{
    color: #000;
    font-size:16px;
  }

  #noticeForm .frameContent .previewBox .previewInfoBox .previewInfoTxt.previewInfoTxtBox span{
    margin-left: 10%;
  }

  #noticeForm .frameContent .previewBox .previewInfoBox .previewInfoTxt.previewInfoTxtBox span:first-of-type{
    margin-left: 0;
  }

  #noticeForm .frameContent .previewBox .previewInfoBox .previewInfoTxt p{
    display: inline-block;
    margin-left: 10%;
    color:rgba(57,63,81,1);
    font-size:12px;
  }

  #noticeForm .frameContent .previewBox .previewInfoBox .previewInfoTxt p.border{
    border-left: 1px solid rgba(136,140,151,1);
    padding-left: 15px;
  }

  #noticeForm .frameContent .previewBox .previewInfoBox .previewInfoTxt.previewInfoTxtFlex p{
    margin-left: 0;
    width: 40%;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    display: inline-block;
  }

  /*发布弹框*/
  #noticeForm .frameContent .publishInfoBox{
    padding: 0 68px;
  }

  #noticeForm .frameContent .publishInfoBox .publishInfoFlex{
    display: flex;
    margin-bottom: 20px;
  }

  #noticeForm .frameContent .publishInfoBox .publishInfoFlex .publishInfo{
    font-size:12px;
    line-height: 12px;
    color:rgba(102,102,102,1);
    margin-right: 20px;
    width: 132px;
    height: 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    flex-shrink: 0;
  }

  #noticeForm .frameContent .publishInfoBox .publishInfoFlex:nth-of-type(2) .publishInfo:nth-of-type(2),
  #noticeForm .frameContent .publishInfoBox .publishInfoFlex:nth-of-type(2) .publishInfo:last-of-type{
    width: 102px;
    margin-right: 16px;
  }

  #noticeForm .frameContent .publishInfoBox .codeBox{
    width: 400px;
    height: 230px;
    margin: 40px 0 0 -10px;
    background-image: url("../../assets/computerBg.png");
    background-repeat: no-repeat;
    background-position: center;
    background-size: 400px;
    overflow: hidden;
  }

  #noticeForm .frameContent .publishInfoBox .codeBox img{
    width: 120px;
    display: block;
    margin: 30px auto 0;
  }

  #noticeForm .frameContent .publishInfoBox .codeBox p,
  #noticeForm .frameContent .publishInfoBox .codeBox p span{
    font-size:12px;
    text-align: center;
    color:rgba(57,63,81,1);
    line-height:18px;
    margin-top: 2px;
  }

  #noticeForm .frameContent .publishInfoBox .codeBox p span{
    color: #F05050;
  }

  /*通告单预览表格*/
  #noticeForm .frameContent .previewBox .previewTable{
    width: 100%;
  }

  #noticeForm .frameContent .previewBox .previewThead th{
    padding: 0;
    height: 18px;
    border: 1px solid rgba(136,140,151,1);
    border-width: 0 1px 1px 0;
    background:rgba(97,101,116,0.1);
    font-size:12px;
    color:rgba(97,101,116,1);
    font-weight: normal;
    line-height: 18px;
    vertical-align: top;
    padding: 0 10px;
    text-align: left;
  }

  #noticeForm .frameContent .previewBox .previewThead th:last-of-type{
    border-right: none;
  }

  #noticeForm .frameContent .previewBox .previewTr th{
    /*border-color: rgba(136,140,151,1);*/
    padding: 0;
    vertical-align: top;
    border: 1px solid rgba(136,140,151,1);
    border-width: 0 1px 1px 0;
    padding: 0 10px;
    font-size:12px;
    color:rgba(0,0,0,1);
    line-height: 18px;
    font-weight: normal;
    text-align: left;
  }

  #noticeForm .frameContent .previewBox .previewTr:last-child th{
    border-bottom: none;
  }

  #noticeForm .frameContent .previewBox .previewTr th:last-child{
    border-right: none;
  }

  #noticeForm .frameContent .previewBox .previewTr th.center,
  #noticeForm .frameContent .previewBox .previewThead th.center{
    text-align: center;
  }

  /*通告单大图预览*/
  #noticeForm .frameContent .previewShade{
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0,0,0,.6);
    z-index: 2000;
    width: 100vw;
    height: 100vh;
  }

  #noticeForm .frameContent .previewShade img{
    transform-style: preserve-3d;
    transition: transform 2s;
    backface-visibility: hidden;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    height: 90%;
    overflow-y: scroll;
  }

  #noticeForm .frameContent .previewShade img:first-of-type{
    transform: rotateY(0deg);
  }

  #noticeForm .frameContent .previewShade img:last-of-type{
    transform: rotateY(180deg);
  }

  #noticeForm .frameContent .previewShade.active img:first-of-type{
    transform: rotateY(180deg);
  }

  #noticeForm .frameContent .previewShade.active img:last-of-type{
    transform: rotateY(0deg);
  }

  #noticeForm .frameContent .previewShadeBtnBox{
    position: absolute;
    right: 4%;
    top: 6%;
  }

  #noticeForm .frameContent .previewShadeBtnBox i{
    font-size: 40px;
    color: #fff;
    margin-left: 24px;
    cursor: pointer;
  }

  #noticeForm  .unopenedMask{
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    background: rgba(0,0,0,0.2);
    width: 100%;
    height: 100%;
    text-align: center;
    border-radius: 0 0 2px 2px;
  }

  #noticeForm  .unopenedMask img{
    width: 200px;
    margin:0 0 10px;
  }

  #noticeForm  .unopenedMask>div{
    text-align: center;
    display: block;
    position: absolute;
    top: 0;
    left: 50%;
    bottom: 0;
    margin: auto 0;
    width: 200px;
    height: 230px;
  }

  #noticeForm  .unopenedMask>div p{
    color: #616574;
    font-size: 14px;
    line-height: 26px;
  }

  /*添加成员弹框*/
  #noticeForm .addShade{
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 1999;
    background: rgba(0,0,0,0.3);
  }

  #noticeForm .addShade .addBox{
    width:976px;
    height:560px;
    background:rgba(255,255,255,1);
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    padding: 50px 60px 34px 46px;
  }

  #noticeForm .addShade .addBox .addTitleBox{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 40px;
  }

  #noticeForm .addShade .addBox .addTitleBox .left{
    display: flex;
    align-items: center;
  }

  #noticeForm .addShade .addBox .addTitleBox .left .title{
    font-size:24px;
    color:rgba(0,0,0,1);
    margin-right: 12px;
  }

  #noticeForm .addShade .addBox .addTitleBox>i{
    font-size:30px;
    color:rgba(97,101,116,1);
    cursor: pointer;
  }

  #noticeForm .addShade .addBox .helpTitle{
    font-size:12px;
    color:rgba(97,101,116,1);
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  #noticeForm .addShade .addBox .helpTitle i{
    font-size: 18px;
  }

  #noticeForm .addShade .addBox .addMemberMenu{
    border-color: rgba(210,210,210,1);
  }

  /*添加成员表单*/
  #noticeForm .addShade .addBox .addMemberFormBox{
    max-height: calc(100% - 220px);
    width: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
    margin-top: 20px;
  }

  #noticeForm .addShade .addBox .addMemberFormBox .addMemberForm{
    padding: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  #noticeForm .addShade .addBox .addMemberBtnBox{
    margin-top: 40px;
    display: flex;
    justify-content: flex-end;
  }

  #noticeForm .addShade .addBox .addMemberBtnBox .addMemberBtn{
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

  #noticeForm .addShade .addBox .addMemberBtnBox .addMemberBtn:last-child{
    background: none;
    border:1px solid rgba(186,186,186,1);
    color:rgba(0,0,0,1);
    line-height: 30px;
    margin-left: 40px;
  }

  /*微信邀请*/
  #noticeForm .addShade .addBox .wxBox{
    width: 100%;
    height: calc(100% - 100px);
    overflow: hidden;
    overflow-y: scroll;
  }

  #noticeForm .addShade .addBox .wxBox .wxContentBox{
    position: relative;
    margin: 40px auto 30px;
    max-width: 678px;
    height: 235px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  #noticeForm .addShade .addBox .wxBox .bg{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    margin: 0 auto;
    z-index: 0;
    /*width: 200px;*/
    height: 235px;
  }

  #noticeForm .addShade .addBox .wxBox .code{
    position: absolute;
    z-index: 1;
    width: 94px;
    top: 126px;
    left: 0;
    right: 0;
    margin: 0 auto;
    border-radius: 40px;
  }

  #noticeForm .addShade .addBox .wxBox>p{
    text-align: center;
    line-height: 20px;
    margin-bottom: 20px;
  }

  @media screen and (max-width: 1400px){
    #noticeForm .frameContent .frameContentFromBox .goTimeBox{
      width: 300px;
    }

    #noticeForm .frameContent .frameContentFromBox .contactBox{
      width: 220px;
    }
  }

  @media screen and (max-width: 1300px){
    #noticeForm .frameContent .frameContentFromBox .contactBox{
      width: 200px;
    }
  }
</style>

<style>
  @import "../../css/el-form.css";

  /*拍摄地点*/
  #noticeForm .frameContentLeft .placeBox .noticeInfoBox .noticeInfo .form .el-input{
    width: 45%;
  }

  #noticeForm .frameContentLeft .placeBox .noticeInfoBox .noticeInfo .form .el-input__inner{
    padding: 0;
  }

  #noticeForm .frameContent .placeBox .placeTitleBox .placeTitlePopover .titleName{
    font-size: 14px;
    color: #F05050;
  }

  #noticeForm .frameContent .placeBox .placeTitleBox .el-input{
    width: 20%;
  }

  #noticeForm .frameContent .placeBox .placeTitleBox .el-input .el-input__inner{
    height: 18px;
  }

  #noticeForm .frameContentLeft .placeBox .noticeInfoBox .el-input{
    margin-top: 4px;
  }

    /*拍摄地点表格*/
  #noticeForm .frameContent .placeBox .el-table--border{
    border-color: rgba(215,217,220,1);
  }

  #noticeForm .frameContent .placeBox .el-table--border:before,
  #noticeForm .frameContent .placeBox .el-table--border:after{
    background: rgba(215,217,220,1);
  }

  #noticeForm .frameContent .placeBox .placeTableHead{
    border:1px solid rgba(215,217,220,1);
    border-radius:2px 2px 0px 0px;
  }

  #noticeForm .frameContent .placeBox .placeTableHead th{
    height:30px;
    background:rgba(239,240,241,1);
    font-size:14px;
    padding: 0;
    color:rgba(57,63,81,1);
    font-weight: normal;
    border:1px solid rgba(215,217,220,1);
    border-width: 0 1px 1px 0;
  }

  #noticeForm .frameContent .placeBox .placeTableTd{
    border-color: rgba(215,217,220,1);
  }

  #noticeForm .frameContent .placeBox .placeTableHead th:last-child,
  #noticeForm .frameContent .placeBox .placeTableTd:last-child{
    border-right: none;
  }

  #noticeForm .frameContent .placeBox .placeTableTd .vxe-cell{
    height: 40px;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    white-space: normal;
  }

  #noticeForm .frameContent .placeBox .placeTableTd:last-child .vxe-cell{
    padding: 0 6px;
  }

  #noticeForm .frameContent .placeBox .placeTableTd .vxe-cell span:not(.remarkTxt){
    width: 100%;
    height: 100%;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  #noticeForm .frameContent .placeBox .placeTableHead th:first-of-type .vxe-cell,
  #noticeForm .frameContent .placeBox .placeTableTd:first-of-type .vxe-cell{
    padding-left: 16px;
  }

  #noticeForm .frameContent .placeBox .placeTableTd:first-of-type .vxe-cell,
  #noticeForm .frameContent .placeBox .placeTableTd:nth-of-type(4) .vxe-cell,
  #noticeForm .frameContent .placeBox .placeTableTd:nth-last-of-type(2) .vxe-cell{
    line-height: 40px;
  }

  #noticeForm .frameContent .placeBox .placeTableTd .cell,
  #noticeForm .frameContent .placeBox .placeTableTd .cell span{
    font-size:12px;
    color:rgba(97,101,116,1);
    width: 100%;
    display: block;

  }

  #noticeForm .frameContent .placeBox .placeTableTd .cell{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  #noticeForm .frameContent .placeBox .placeTableTd:last-of-type .cell{
    height: auto;
  }

  #noticeForm .frameContent .placeBox .placeTableTd .remarkInput{
    display: none;
  }

  #noticeForm .frameContent .placeBox .placeTableTd .current-cell .remarkInput{
    display: block;
  }

  #noticeForm .frameContent .placeBox .placeTableTd span.remarkTxt{
    color:rgba(108,111,191,1);
    width: 80%;
  }

  #noticeForm .frameContent .placeBox .placeTableTd .editIcon{
    cursor: pointer;
    color: #32C58F;
  }

  #noticeForm .frameContent .placeBox .placeTableTd .current-cell span.remarkTxt{
    display: none;
  }

  /*场景添加弹框*/
  .addSceneDialog .el-form.sceneForm .el-form-item,
  .addSceneDialog .el-form.sceneForm .roleForm{
    margin-bottom: 16px;
  }

  .addSceneDialog .el-form.sceneForm .formFlex:not(.formFlexTh) .el-form-item{
    width: 74%;
  }

  .addSceneDialog .el-form.sceneForm .formFlex .el-form-item:first-child{
    width: 23%;
  }

  .addSceneDialog .addDialogFooter{
    margin-top: 26px;
  }

  .addSceneDialog .addDialogFooter.null{
    opacity: 0;
    height: 0;
  }

  .addSceneDialog .el-form.sceneForm .el-form-item__error{
    padding-top: 0;
  }

  .addSceneDialog .el-form.sceneForm .roleForm .el-form-item{
    width:66px;
    margin-right: 8px;
    margin-bottom: 0;
  }

  .addSceneDialog .el-form.sceneForm .roleForm .el-form-item:nth-child(-n+6) .el-form-item__content{
    margin-top: 14px;
  }

  .addSceneDialog .el-form.sceneForm .roleForm .el-form-item .el-input__inner{
    padding-right: 0;
  }

  .addSceneDialog .el-form.sceneForm .roleForm .addBtn{
    font-size:12px;
    color:rgba(237,149,21,1);
    cursor: pointer;
    height: 32px;
    line-height: 32px;
  }

  .addSceneDialog .el-form.sceneForm .roleForm .addBtn.first{
    margin-top: 14px;
  }

  /*场景选择集数*/
  .frameTopSelectPopper{
    padding: 10px 0;
  }

  .frameTopSelectPopper .frameTopSelectBox{
    height: 200px;
    overflow-y: scroll;
    padding: 0 10px;
  }

  .frameTopSelectPopper .frameTopSelectTopBox{
    display: flex;
    align-items: center;
    padding: 4px 10px 6px 0;
    border-bottom: 1px solid rgba(210,210,210,0.6);
    flex-wrap: wrap;
  }

  .frameTopSelectPopper .frameTopSelectTopBox .frameTopSelectTop{
    width:50px;
    height:20px;
    border:1px solid rgba(57,63,81,0.2);
    font-size:12px;
    color:rgba(97,101,116,1);
    text-align: center;
    line-height: 18px;
    border-radius:10px;
    cursor: pointer;
    margin: 0 0 8px 10px;
    flex-shrink: 0;
    transition: all 0.8s;
  }

  .frameTopSelectPopper .frameTopSelectTopBox .frameTopSelectTop.active{
    background:rgba(108,111,191,1);
    color: #fff;
  }

  .frameTopSelectPopper .frameTopSelectMainBox{
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    padding-left: 2px;
  }

  .frameTopSelectPopper .frameTopSelectMainBox .frameTopSelectMain{
    width:34px;
    height:20px;
    font-size:12px;
    cursor: pointer;
    line-height: 20px;
    text-align: center;
    color:rgba(97,101,116,1);
    margin: 12px 5px 0 0;
    border-radius:10px;
    flex-shrink: 0;
    transition: all 0.8s;
  }

  .frameTopSelectPopper .frameTopSelectMainBox .frameTopSelectMain:nth-of-type(5n){
    margin-right: 0;
  }

  .frameTopSelectPopper .frameTopSelectMainBox .frameTopSelectMain:hover{
    background: rgba(237,149,21,0.2);
  }

  .frameTopSelectPopper .frameTopSelectMainBox .frameTopSelectMain.active{
    background: rgba(237,149,21,1);
    color: #fff;
  }

  /*拍摄时间*/
  /*时间选择器*/
  #noticeForm .frameContent .timeBox .timeFormBox .el-input__prefix{
    display: none;
  }

  /*联系方式弹出框*/
  .contactPopover{
    padding: 18px 14px 20px;
    min-width: 130px;
  }

  .contactPopover .contactContent{
    padding: 0;
  }

  .contactPopover .contactContent .el-form-item{
    margin: 0;
  }

  .contactPopover .contactContent .title,
  .contactPopover .contactContent .el-form-item__label{
    font-size: 12px;
    line-height: 12px;
    padding: 0 10px;
    margin-bottom: 10px;
  }

  .contactPopover .contactContent .el-form-item__label{
    margin-bottom: 0;
  }

  .contactPopover .contactContent .el-input__inner{
    color: rgba(108,111,191,1);
    padding: 0 10px;
    height: 26px;
  }

  /*化妆卡片
  时间选择*/
  #noticeForm .frameContentLeft .dressTime .el-input__inner,
  #noticeForm .frameContentLeft .dressSelectBox .el-input__inner{
    border: none;
    font-size: 14px;
    color: #F05050;
    cursor: pointer;
    padding: 0;
    background: none;
    margin-top: 1px;
  }

  #noticeForm .frameContentLeft .dressTime .el-input__prefix,
  #noticeForm .frameContentLeft .dressSelectBox .el-input__suffix{
   display: none;
  }

  /*下拉框选择*/
  #noticeForm .frameContentFromBox .dressBox .dressSelectBox .el-input__inner{
    padding: 0;
    transition: all 0.8s;
  }

  #noticeForm .frameContentFromBox .dressBox .dressSelectBox.active .el-input__inner{
    color:rgba(108,111,191,1);
  }

  .dressSelectPopper .el-select-dropdown__list{
    padding: 4px 15px 0;
  }

  .dressSelectPopper .el-select-dropdown__item{
    text-align: center;
    height: 40px;
    padding: 0 10px;
    line-height: 40px;
    border-bottom: 1px solid rgba(210,210,210,0.6);
    background: none;
    color:rgba(97,101,116,0.7);
  }

  .dressSelectPopper .el-select-dropdown__item:last-of-type{
    border-bottom: none;
  }

  .dressSelectPopper .el-select-dropdown__item.selected{
    color:rgba(108,111,191,1);
    font-weight: normal;
  }

  /*添加化妆时间*/
  .el-dialog .el-dialog__body .el-form.addFormBox .dressFormFlex .el-form-item.normal{
    width: 100%;
  }

  .el-dialog .el-dialog__body .el-form.addFormBox .dressFormFlex .el-form-item.active{
    width: 64%;
  }

  .el-dialog .el-dialog__body .el-form.addFormBox .dressFormFlex .el-form-item.dressTime{
    width: 30%;
  }

  .el-dialog .el-dialog__body .el-form.addFormBox .dressFormFlex .dressSelectBox{
    display: block;
  }

  .el-dialog .el-dialog__body .el-form.addFormBox .dressFormFlex .dressSelectBox .el-input__suffix{
    top: 16px;
  }

  .addSelectPopper{
    min-width: 200px!important;
  }

  /*二维码浮窗*/
  .popoverCodeBox{
    padding: 10px 2px;
  }

  .popoverCodeBox .popoverCode{
    width: 140px;
    margin: 0 auto;
    display: block;
  }

  /*添加成员tab*/
  #noticeForm .addShade .addBox .addMemberMenu .el-menu-item{
    height: 32px;
    line-height: 32px;
    color:rgba(134,134,134,1);
    padding: 0 8px;
    margin-right: 22px;
  }

  #noticeForm .addShade .addBox .addMemberMenu .el-menu-item.is-active{
    color:rgba(108,111,191,1);
    border-color: rgba(108,111,191,1);
  }

  /*添加成员表单*/
  #noticeForm .addShade .addBox .addMemberFormBox .addMemberForm .el-form-item{
    width: 100px;
  }

  #noticeForm .addShade .addBox .addMemberFormBox .addMemberForm .el-form-item.addMemberFormLast{
    width: calc(100% - 206px);
  }

  #noticeForm .addShade .addBox .addMemberFormBox .addMemberForm .el-select{
    width: 100%;
  }

  #noticeForm .addShade .addBox .addMemberFormBox .addMemberForm .el-select .el-input{
    height: 32px;
  }

  #noticeForm .addShade .addBox .addMemberFormBox .addMemberForm .el-select .el-input__inner{
    border-bottom: none;
  }
</style>
