<template>
  <div id="preview">
      <div>
          <div class="script-container" v-if="previewScene.length != 0">
              <div class="script-wrapper">
                  <div class="script-movie-content" style="display: none;">
                      <div class="content"></div>
                      <div class="pagination"></div>
                  </div>
                  <div class="collect-content" >

                      <div class="collect-right" id="collect-right">
                          <div class="collect-left previewEpisode" v-if="episode">
                              <h3>集数</h3>
                              <div class="collect-list">
                                  <div :class="['list-item',episode_num==item?'active':'']" v-for="item in episode" style="cursor: pointer" @click="change(item)" >{{item}}</div>
                              </div>
                          </div>
                          <div class="previewSceneList">
                              <div class="previewSceneListTitle">
                                  <img src="../../assets/navigation.png" style="margin: 0 6px 0 8px;">
                                  <span>场次导航</span>
                              </div>
                              <div class="previewSceneListBox" id="previewSceneListBox" v-intro = "'在这里可以合并、删除、添加场次'"  v-intro-position="'right'"  v-intro-step="1">
                                  <div :class="['previewSceneListContent',previewSceneId==item.session_id?'is-active':'']" v-for="item,index in previewScene" @click="saveFetch(item.session_id)">
                                      <span class="previewSceneName" v-html="item.label_head"></span>
                                      <div class="previewSceneMenu" @click="previewSceneMenuOpen(index,$event)"></div>
                                  </div>
                                  <div class="previewSceneMenuOpen" v-show="previewSceneBtn">
                                      <div class="previewSceneMenuBtn" @click="merge('up')"><i class="iconfont iconxiangshanghebing nomargin"></i>向上合并</div>
                                      <div class="previewSceneMenuBtn" @click="sceneAdd"><i class="iconfont iconiconfont"></i>添加</div>
                                      <div class="previewSceneMenuBtn" @click="sceneDele"><i class="iconfont icondelete"></i>删除</div>
                                  </div>
                              </div>
                          </div>


                          <div id="toolbar" slot="toolbar">

                              <div id ="menu" @click="menu($event)">
                                  <ul>
                                      <li class="menuTitle">
                                          <div><img  src="../../assets/info.png" style="margin:  -3px 10px"></div>标注选择
                                      </li>
                                      <li @click="appendA('empty')">
                                          <div id="ffffff" class="ql-background menuColor" ></div>取消标注
                                      </li>
                                      <li @click="appendA('actor')">
                                          <div id="eb6feb" class="ql-background menuColor" value="#eb6feb"></div>演员
                                      </li>
                                      <li @click="appendA('tool')">
                                          <div id="22d7fb" class="ql-background menuColor" value="#ED9515"></div>道具
                                      </li>
                                      <li @click="appendA('special_tool')">
                                          <div id="459df5" class="ql-background menuColor" value="#459df5"></div>特殊道具
                                      </li>
                                      <li @click="appendA('dress_makeup')">
                                          <div id="ff9899" class="ql-background menuColor" value="#ff9899"></div>服化
                                      </li>
                                      <li @click="appendA('special_effect')">
                                          <div id="22d7bb" class="ql-background menuColor" value="#ED9515"></div>特效
                                      </li>
                                  </ul>
                              </div>


                          </div>
                      </div>
                      <!--<div class="tabs_scroll">-->
                      <div class="previewContentBox">
                          <div class="previewCollapseDisabledBox" v-model="sceneName,sceneNum,sceneDay,sceneIndoor" v-if="authId==0">
                              第{{sceneNum}}场
                              {{sceneDay}}
                              {{sceneIndoor}}
                              {{sceneName}}
                          </div>
                          <el-collapse class="previewCollapseBox" v-if="origin_head != ''&&authId==1">
                              <el-collapse-item class="previewCollapse">
                                  <template slot="title">
                                      <div class="previewContentSetting">
                                          <span class="textOne">第</span>
                                          <input type="text" v-model="sceneNum" style="font-size: 12px">
                                          <span class="textOne">场</span>
                                          <el-select v-model="sceneDay" placeholder="无" class="sceneSelectBox" >
                                              <el-option
                                                      v-for="item in optionsDay"
                                                      :key="item.value"
                                                      :label="item.label"
                                                      :value="item.value" class="sceneSelect" style="font-size: 12px">
                                              </el-option>
                                          </el-select>
                                          <el-select v-model="sceneIndoor" placeholder="无" class="sceneSelectBox">
                                              <el-option
                                                      v-for="item in optionsIndoor"
                                                      :key="item.value"
                                                      :label="item.label"
                                                      :value="item.value" class="sceneSelect">
                                              </el-option>
                                          </el-select>
                                          <input type="text" v-model="sceneName" style="width: 180px;font-size: 12px">
                                          <div class="savePreview" @click="saveData">
                                              <i class="iconfont icontongbu1"></i>
                                              同步
                                          </div>
                                          <router-link :to="{path: '/details/scene?play_id='+this.$route.query.play_id+'&project_id='+this.$route.query.project_id}" class="routerScene">
                                              <el-tooltip class="item" effect="dark" content="查看顺场景表" placement="bottom">
                                                  <i class="iconfont  iconchangjing"></i>
                                              </el-tooltip>
                                          </router-link>
                                      </div>
                                  </template>
                                  <div v-model="sceneName,sceneNum,sceneDay,sceneIndoor">
                                      {{sceneNum}}
                                      {{sceneDay}}
                                      {{sceneIndoor}}
                                      {{sceneName}}
                                  </div>
                              </el-collapse-item>
                          </el-collapse>
                          <div class="previewContentSetting"  v-if="origin_head == ''&&authId==1" style="border-bottom: 1px solid #ddd">
                              <input type="text" v-model="sceneNum">
                              <el-select v-model="sceneDay" placeholder="无" class="sceneSelectBox">
                                  <el-option
                                          v-for="item in optionsDay"
                                          :key="item.value"
                                          :label="item.label"
                                          :value="item.value" class="sceneSelect">
                                  </el-option>
                              </el-select>
                              <el-select v-model="sceneIndoor" placeholder="无" class="sceneSelectBox">
                                  <el-option
                                          v-for="item in optionsIndoor"
                                          :key="item.value"
                                          :label="item.label"
                                          :value="item.value" class="sceneSelect">
                                  </el-option>
                              </el-select>
                              <input type="text" v-model="sceneName" style="width: 180px;">
                              <div class="savePreview  el-icon-upload" @click="saveData">
                                  同步
                              </div>
                          </div>

                          <!--文本内容-->
                          <div class="previewContentOut">
                              <div class="previewContent" v-html="content" id="previewContent" @mouseup="getString($event)" v-show="content" v-intro = "'在文本区域点击右键对场景内容进行标注'"  v-intro-position="'right'"></div>
                          </div>
                          <div class="previewHelp"  @click="videoShade=true"></div>
                          <div class="previewBottomTip">
                            <i class="iconfont iconxiaolaba"></i>
                              <p>剧本标注可以快速核查场景表内容信息，还不会使用？<span @click="videoShade=true">点击此处观看教学视频</span></p>
                          </div>
                          <div class="previewBottomBox">
                              <div class="previewBottomLeftBox">
                                  <div class="previewBottomLeft">
                                      <img src="../../assets/previewFooterIcon3.png" alt="">
                                      总场次：{{previewScene.length}}
                                  </div>
                              </div>
                              <div class="previewBottomRightBox">
                                  标注提示：
                                  <div class="previewBottomRightTips">演员</div>
                                  <div class="previewBottomRightTips">道具</div>
                                  <div class="previewBottomRightTips">特殊道具</div>
                                  <div class="previewBottomRightTips">服化</div>
                                  <div class="previewBottomRightTips">特效</div>
                              </div>
                          </div>
                      </div>
                      <el-row :gutter="10" class="previewPerformerMenu" v-intro = "'在这里对单场的场次信息、演员、道具进行编辑'"  v-intro-position="'right'">
                          <el-menu :default-active="activeMenu" class="previewMenuLeft" :collapse="isCollapse" mode="vertical"  @select="handleSelectRightMenu">
                              <el-menu-item index="1" style="margin-top: 18px">
                                  <i class="el-icon-s-order" ><br/><p style="font-size: 12px;line-height: 20px">信息</p></i>
                                  <span slot="title">本场信息</span>
                              </el-menu-item>
                              <el-menu-item index="2">
                                  <i class="el-icon-s-custom"><br/><p style="font-size: 12px;line-height: 20px">演员</p></i>
                                  <span slot="title">演员</span>
                              </el-menu-item>
                              <el-menu-item index="3">
                                  <i class="el-icon-s-cooperation"><br/><p style="font-size: 12px;line-height: 20px">道具</p></i>
                                  <span slot="title">道具</span>
                              </el-menu-item>
                              <el-menu-item index="4" class="height">
                                  <i class="iconfont iconcaizhangdie-daojuqia height"><p style="font-size: 12px;line-height: 20px">特殊<br>道具</p></i>
                                  <span slot="title">特殊道具</span>
                              </el-menu-item>
                              <el-menu-item index="5">
                                  <i class="iconfont iconfuzhuang"><p style="font-size: 12px;line-height: 20px">服化</p></i>
                                  <span slot="title">服化</span>
                              </el-menu-item>
                              <el-menu-item index="6">
                                  <i class="iconfont icontexiao"><p style="font-size: 12px;line-height: 20px">特效</p></i>
                                  <span slot="title">特效</span>
                              </el-menu-item>
                          </el-menu>
                          <div class="previewHead" v-show="activeMenu == 1">
                              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" style="margin-top: 4px;font-size: 12px;display: flex;align-items: center;line-height: 14px">
                                  场号
                              </el-col>
                              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                                  <input
                                          type="text"
                                          v-model="sceneNum" :disabled="authId!=1"
                                          class="previewHeadInput"
                                          placeholder="场号"><br/>
                              </el-col>
                              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" style=";font-size: 12px">
                                  气氛
                              </el-col>
                              <el-col :xs="10" :sm="10" :md="10" :lg="10" :xl="9">
                                  <el-select
                                          v-model="sceneDay"
                                          placeholder="无" :disabled="authId!=1"
                                          class="sceneSelectBox previewRightSelect" size="mini">
                                      <el-option
                                              v-for="item in optionsDay"
                                              :key="item.value"
                                              :label="item.label"
                                              :value="item.value" class="sceneSelect">
                                      </el-option>
                                  </el-select>
                              </el-col>

                              <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="1">&nbsp</el-col>
                              <el-col :xs="10" :sm="10" :md="10" :lg="10" :xl="9">
                                  <el-select
                                          v-model="sceneIndoor"
                                          placeholder="无" :disabled="authId!=1"
                                          class="sceneSelectBox previewRightSelect" size="mini">
                                      <el-option
                                              v-for="item in optionsIndoor"
                                              :key="item.value"
                                              :label="item.label"
                                              :value="item.value" class="sceneSelect">
                                      </el-option>
                                  </el-select>
                              </el-col>
                              <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="3">&nbsp</el-col><br/>
                              <br/>
                              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" style=";font-size: 12px">
                                  场景
                              </el-col>
                              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                                  <input
                                          type="text"
                                          v-model="sceneName" :disabled="authId!=1"
                                          class="previewHeadInput"
                                          placeholder="请输入场景名称"><br/>
                              </el-col>
                              <br/>
                              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" style=";font-size: 12px">
                                  天气
                              </el-col>
                              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                                  <input
                                      type="text"
                                      v-model="weather"
                                      class="previewHeadInput" :disabled="authId!=1"
                                      placeholder="请输入场景所需天气信息"><br/>
                              </el-col>
                              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" style=";font-size: 12px">
                                  内容提示
                              </el-col>
                              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" style="margin-bottom: 20px">
                                  <el-input
                                          type="textarea"
                                          autosize
                                          class="previewHeadInput"
                                          placeholder="请输入内容"
                                          style="margin-top: 14px" :disabled="authId!=1"
                                          v-model="summary">
                                  </el-input>
                              </el-col>
                              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" style=";font-size: 12px">
                                  备注信息
                              </el-col>
                              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                                  <textarea
                                          class="previewHeadLabel"
                                           v-model="sceneRemark" :disabled="authId!=1"
                                          placeholder="请输入备注信息"
                                          style="margin-top: 14px;background-color: #f5f5f7">
                                  </textarea>
                              </el-col>
                              <el-col :xs="7" :sm="7" :md="7" :lg="7" :xl="7">
                                  <div class="previewHeadSubmit" @click="saveData">保存</div>
                              </el-col>
                          </div>
                          <div class="previewHead previewPerformer" v-show="activeMenu == 2">
                              <div class="previewRightHead">
                                  <span>演员</span>
                                  <div class="previewRightHeadBtn" @click="previewPerformerAdd">+ 添加</div>
                              </div>
                              <div v-for="item,index in data" class="previewPerformerName" :key="index" id="previewPerformerName">
                                  <div class="defaultPerformerBox" id="defaultPerformerBox">
                                      <span @click="routerCount(item.actor_id,item.role_name)">{{item.role_name}}</span>
                                      <img src="../../assets/previewEditIcon.png" alt="" class="previewPerformerBtn" @click="previewPerformerEdit(index)">
                                      <img src="../../assets/previewDeleIcon.png" alt="" class="previewPerformerBtn" @click="previewPerformerDele(index)">
                                  </div>
                                  <div class="editPerformerBox" id="editPerformerBox">
                                      <input type="text" v-model="item.role_name" @blur="previewPerformerEditSubmit('blur',index)">
                                      <i class="el-icon-check previewPerformerBtn" @click="previewPerformerEditSubmit('submit',index)"></i>
                                  </div>
                              </div>
                          </div>
                          <div class="previewHead previewPerformer previewScene" v-show="activeMenu == 3">
                              <div class="previewRightHead">
                                  <span>道具</span>
                                  <div class="previewRightHeadBtn" @click="previewToolAdd">+ 添加</div>
                              </div>
                              <div v-for="item,index in tool" class="previewPerformerName" :key="index" id="previewToolName">
                                  <div class="defaultPerformerBox" id="defaultToolBox">
                                      <span>{{item.tool_name}}</span>
                                      <img src="../../assets/previewEditIcon.png" alt="" class="previewPerformerBtn" @click="previewToolEdit(index)">
                                      <img src="../../assets/previewDeleIcon.png" alt="" class="previewPerformerBtn" @click="previewToolDele(index)">
                                  </div>
                                  <div class="editPerformerBox" id="editToolBox">
                                      <input type="text" v-model="item.tool_name" @blur="previewToolEditSubmit('blur',index)">
                                      <i class="el-icon-check previewPerformerBtn" @click="previewToolEditSubmit('submit',index)"></i>
                                  </div>
                              </div>
                          </div>
                          <div class="previewHead previewPerformer previewScene" v-show="activeMenu == 4">
                              <div class="previewRightHead">
                                  <span>特殊道具</span>
                                  <div class="previewRightHeadBtn" @click="previewSToolAdd">+ 添加</div>
                              </div>
                              <div v-for="item,index in stool" class="previewPerformerName" :key="index" id="previewSToolName">
                                  <div class="defaultPerformerBox" id="defaultSToolBox">
                                      <span>{{item.special_tool_name}}</span>
                                      <img src="../../assets/previewEditIcon.png" alt="" class="previewPerformerBtn" @click="previewSToolEdit(index)">
                                      <img src="../../assets/previewDeleIcon.png" alt="" class="previewPerformerBtn" @click="previewSToolDele(index)">
                                  </div>
                                  <div class="editPerformerBox" id="editSToolBox">
                                      <input type="text" v-model="item.special_tool_name" @blur="previewSToolEditSubmit('blur',index)">
                                      <i class="el-icon-check previewPerformerBtn" @click="previewSToolEditSubmit('submit',index)"></i>
                                  </div>
                              </div>
                          </div>
                          <div class="previewHead previewPerformer previewScene" v-show="activeMenu == 5">
                              <div class="previewRightHead">
                                  <span>服化</span>
                                  <div class="previewRightHeadBtn" @click="previewDressAdd">+ 添加</div>
                              </div>
                              <div v-for="item,index in dress" class="previewPerformerName" :key="index" id="previewDressName">
                                  <div class="defaultPerformerBox" id="defaultDressBox">
                                      <span>{{item.dress_makeup_name}}</span>
                                      <img src="../../assets/previewEditIcon.png" alt="" class="previewPerformerBtn" @click="previewDressEdit(index)">
                                      <img src="../../assets/previewDeleIcon.png" alt="" class="previewPerformerBtn" @click="previewDressDele(index)">
                                  </div>
                                  <div class="editPerformerBox" id="editDressBox">
                                      <input type="text" v-model="item.dress_makeup_name" @blur="previewDressEditSubmit('blur',index)">
                                      <i class="el-icon-check previewPerformerBtn" @click="previewDressEditSubmit('submit',index)"></i>
                                  </div>
                              </div>
                          </div>
                          <div class="previewHead previewPerformer previewScene" v-show="activeMenu == 6">
                              <div class="previewRightHead">
                                  <span>特效</span>
                                  <div class="previewRightHeadBtn" @click="previewEffectAdd">+ 添加</div>
                              </div>
                              <div v-for="item,index in effect" class="previewPerformerName" :key="index" id="previewEffectName">
                                  <div class="defaultPerformerBox" id="defaultEffectBox">
                                      <span>{{item.special_effect_name}}</span>
                                      <img src="../../assets/previewEditIcon.png" alt="" class="previewPerformerBtn" @click="previewEffectEdit(index)">
                                      <img src="../../assets/previewDeleIcon.png" alt="" class="previewPerformerBtn" @click="previewEffectDele(index)">
                                  </div>
                                  <div class="editPerformerBox" id="editEffectBox">
                                      <input type="text" v-model="item.special_effect_name" @blur="previewEffectEditSubmit('blur',index)">
                                      <i class="el-icon-check previewPerformerBtn" @click="previewEffectEditSubmit('submit',index)"></i>
                                  </div>
                              </div>
                          </div>
                      </el-row>
                  </div>
              </div>

          </div>
          <!--loading圈-->
          <div class="loading" v-else-if="previewScene.length==0 && enter == 'loading'">
              <i class="el-icon-loading loadingIcon"></i>
              <span style="position: absolute;width: 216px;left: 48%;top: 50%;margin-left:-100px;font-size: 16px;letter-spacing: 2px">非幕始终保障您的数据安全</span>
          </div>

          <!--加载圈-->
          <div class="loading noResult" v-else-if="previewScene.length==0 && enter == ''">
              <div class="text loadingIcon">{{seconds}} %</div>
              <span style="position: absolute;width: 216px;left: 48%;top: 52%;margin-left:-100px;font-size: 16px;letter-spacing: 2px">非幕始终保障您的数据安全</span>
          </div>
      </div>

    <!--引导-->
    <div id="walkthrough-content" style="display: none">
      <div id="walkthrough-1">
        剧本标注
        <!-- <p>现在我们先对"剧本标注"做一个初步了解</p> -->
        <p>点击下一步了解更多...</p>
      </div>
      <div id="walkthrough-2">点击这里可以合并、删除、添加场次</div>
      <div id="walkthrough-3">
        在内容区域右键可以标注场景内容
        <img src="../../assets/previewGuide.gif" class="previewGuide">
      </div>
      <div id="walkthrough-4">这里显示单场的场次信息、演员、道具，并可编辑</div>
    </div>
      <!--视屏弹窗-->
      <transition name="el-zoom-in-center">
          <div class="videoShade" v-if="videoShade">
              <i class="el-icon-circle-close" @click="stopVideo"></i>
              <video class="projectLead" muted loop controls id="leadVideo" autoplay>
                  <source :src="host+'/files/notice_introduce.mp4'" type="video/mp4">
              </video>
          </div>
      </transition>
      <!--添加场景弹框-->
      <el-dialog
          title="新增场景" :close-on-click-modal="false"
          :visible.sync="addSceneDialog" width="478px" center class="addDialog addSceneDialog">
          <el-form :model="addSceneForm" ref="sceneValidateForm" class="addFormBox sceneForm">
              <div class="formFlex averageForm">
                  <el-form-item
                      label="拍摄场次" prop="field_number" :rules="[{ required: true, message: '拍摄场次不能为空',trigger:'blur'}]">
                      <el-input v-model="addSceneForm.field_number" clearable  placeholder="请输入拍摄场次"></el-input>
                  </el-form-item>
                  <el-form-item
                      label="拍摄场景" prop="scene_name" :rules="[{ required: true, message: '拍摄场景不能为空',trigger:'blur'}]">
                      <el-input v-model="addSceneForm.scene_name" clearable  placeholder="请输入拍摄场景"></el-input>
                  </el-form-item>
              </div>
              <el-form-item label="气氛" class="addSelectForm">
                  <el-select v-model="sceneDay" placeholder="无" class="sceneSelectBox">
                      <el-option
                          v-for="item in optionsDay"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value" class="sceneSelect">
                      </el-option>
                  </el-select>
                  <el-select v-model="sceneIndoor" placeholder="无" class="sceneSelectBox">
                      <el-option
                          v-for="item in optionsIndoor"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value" class="sceneSelect">
                      </el-option>
                  </el-select>
              </el-form-item>
          </el-form>
          <div class="addDialogFooter">
              <div class="addFooterBtn" @click="addScene">创建</div>
              <div class="addFooterBtn" @click="addSceneDialog = false">取消</div>
          </div>
      </el-dialog>
    <!--无权限弹框-->
    <no-access :noAccessVisible="noAccess" @close="(v)=>{noAccess = v}"></no-access>
  </div>
</template>

<script>
  import fmFooter from "../../common/fmFooter";
  import top_mine from "../../common/top_mine";
  import axios from "axios"
  import global_ from '../../common/Global'

  export default {
    name: "preview",
    components: {fmFooter,top_mine},
    data (){
      return{
          addSceneDialog:false,//添加场景
          addSceneForm:{
              field_number:'',
              scene_name:'',
              air:'',
              parent_id:'',
              play_id:this.$route.query.play_id,
          },//添加场景
          host:global_.pathInfo,
          videoShade:false,//视屏弹窗
          effect:[],//特效
          dress:[],//服化
          stool:[],//特殊道具
          seconds:0,
        isCollapse:true,
        activeMenu:'1',
        saveBtn:false,
        revocationBtn:false,
        reformBtn:false,
        menu:'',
        txt:'',//选中内容
        openMethod:'',//触发标记菜单方式
        origin_head:'',
        sceneNum:'1',
        sceneName:'一',
          summary:'',
          weather:'',
        sceneDay:'无',
        sceneIndoor:'无',
        sceneRemark:'',
        optionsDay: [{
            value: '日',
            label: '日'
        }, {
            value: '夜',
            label: '夜'
        }, {
            value: '晨',
            label: '晨'
        }, {
            value: '午',
            label: '午'
        }, {
            value: '晚',
            label: '晚'
        }, {
            value: '凌晨',
            label: '凌晨'
        }, {
            value: '清晨',
            label: '清晨'
        }, {
            value: '早晨',
            label: '早晨'
        }, {
            value: '早上',
            label: '早上'
        }, {
            value: '白天',
            label: '白天'
        }, {
            value: '中午',
            label: '中午'
        }, {
            value: '正午',
            label: '正午'
        }, {
            value: '晌午',
            label: '晌午'
        }, {
            value: '午后',
            label: '午后'
        }, {
            value: '黄昏',
            label: '黄昏'
        }, {
            value: '傍晚',
            label: '傍晚'
        }, {
            value: '晚上',
            label: '晚上'
        }, {
            value: '午夜',
            label: '午夜'
        }, {
            value: '夜晚',
            label: '夜晚'
        }, {
            value: '黑夜',
            label: '黑夜'
        }],
        optionsIndoor:[{
            value: '内',
            label: '内'
        }, {
            value: '外',
            label: '外'
        }, {
            value: '内-外',
            label: '内-外'
        }, {
            value: '外-内',
            label: '外-内'
        }, {
            value: '内/外',
            label: '内/外'
        }, {
            value: '外/内',
            label: '外/内'
        }, {
            value: '内景',
            label: '内景'
        }, {
            value: '外景',
            label: '外景'
        }],
        previewSceneBtn:false,//场次导航右侧按钮点击菜单
        data: [],//演员
        tool:[],//道具
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        content:'',
        previewScene:[],//场次列表
        previewSceneId:'',//当前选中场次
        parentSceneId:'',//添加场次
        pages:'',
        episode:'',
        episode_num:1,
        pages_num:1,
        sceneDayClass:'',
        sceneHead:'',
        scene:[],
        is_default:'',//默认项目
        enter:'loading',
        authId:0,//权限信息
        noAccess:false,//无权限弹框
      }
    },
    methods:{
        //暂停播放
        stopVideo(i){
            var video=document.getElementById("leadVideo");
            video.pause();
            this.videoShade = false
        },
        //演员删除
        previewPerformerDele(i){
            if(this.authId==1){
                this.$confirm('确认删除 "'+this.data[i].role_name+'" 演员吗？','删除', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(() => {
                    let form2 = new FormData();
                    form2.append('actor_id',this.data[i].actor_id);
                    form2.append('session_id',this.previewSceneId)
                    axios({
                        method: 'post',
                        url: '/play/session_actor_delete',
                        data:form2,
                        headers:{
                            'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'
                        },
                        dataType:"json",
                    }).then((response)=> {
                        if(response.data.ret == 0){
                            this.data.splice(i, 1);
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                        }else{
                            this.$message.error(response.data.msg);
                        }
                    })
                })
            }else{
                this.noAccess = true
            }

        },
        //演员添加
        previewPerformerAdd(){
            if(this.authId==1){
                var obj = {actor_id:'',role_name:''};
                this.data.push(obj);
                this.$nextTick( ()=> {
                    document.querySelectorAll('#previewPerformerName')[document.querySelectorAll('#previewPerformerName').length-1].childNodes[0].style.display = 'none'
                    document.querySelectorAll('#previewPerformerName')[document.querySelectorAll('#previewPerformerName').length-1].childNodes[2].style.opacity = '1'
                    document.querySelectorAll('#previewPerformerName')[document.querySelectorAll('#previewPerformerName').length-1].childNodes[2].childNodes[0].focus()
                })
            }else{
                this.noAccess = true
            }

        },
        //演员编辑
        previewPerformerEdit(i){
            if(this.authId==1){
                document.querySelectorAll('#previewPerformerName')[i].childNodes[0].style.display = 'none'
                document.querySelectorAll('#previewPerformerName')[i].childNodes[2].style.opacity = '1'
                document.querySelectorAll('#previewPerformerName')[i].childNodes[2].childNodes[0].focus()
            }else{
                this.noAccess = true
            }
        },
        //演员编辑完成
        previewPerformerEditSubmit(type,i){
            if(this.data[i].role_name != ''){
              if(this.data[i].actor_id == ''){
                let form = new FormData();
                form.append('play_id',this.$route.query.play_id);
                form.append('session_id',this.previewSceneId);
                form.append('role_name',this.data[i].role_name)
                axios({
                  method: 'post',
                  url: '/play/actors_add',
                  data:form,
                  headers:{
                    'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'
                  },
                  dataType:"json",
                }).then((response)=> {
                  if(response.data.ret == 0){
                    this.showCast()
                    document.querySelectorAll('#previewPerformerName')[i].childNodes[0].style.display = 'block'
                    document.querySelectorAll('#previewPerformerName')[i].childNodes[2].style.opacity = '0'
                  }else{
                    this.$message.error(response.data.msg);
                  }
                })
              }else{
                let form1 = new FormData();
                form1.append('actor_id',this.data[i].actor_id);
                form1.append('role_name',this.data[i].role_name)
                axios({
                  method: 'post',
                  url: '/play/actors_update',
                  data:form1,
                  headers:{
                    'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'
                  },
                  dataType:"json",
                }).then((response)=> {
                  if(response.data.ret == 0){
                    document.querySelectorAll('#previewPerformerName')[i].childNodes[0].style.display = 'block'
                    document.querySelectorAll('#previewPerformerName')[i].childNodes[2].style.opacity = '0'
                  }else{
                    this.$message.error(response.data.msg);
                  }
                })
              }
            }else{
              if(this.data[i].actor_id == ''){
                this.data.splice(i,1)
                document.querySelectorAll('#previewPerformerName')[i].childNodes[0].style.display = 'block'
                document.querySelectorAll('#previewPerformerName')[i].childNodes[2].style.opacity = '1'
              }else{
                let form2 = new FormData();
                form2.append('actor_id',this.data[i].actor_id);
                form2.append('session_id',this.previewSceneId)
                axios({
                  method: 'post',
                  url: '/play/session_actor_delete',
                  data:form2,
                  headers:{
                    'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'
                  },
                  dataType:"json",
                }).then((response)=> {
                  if(response.data.ret == 0){
                    this.data.splice(i,1)
                    document.querySelectorAll('#previewPerformerName')[i].childNodes[0].style.display = 'block'
                    document.querySelectorAll('#previewPerformerName')[i].childNodes[2].style.opacity = '1'
                  }else{
                    this.$message.error(response.data.msg);
                  }
                })
              }

            }


        },
        //道具删除
        previewToolDele(i){
            if(this.authId==1){
                this.$confirm('确认删除 "'+this.tool[i].tool_name+'" 道具吗？','删除', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(() => {
                    let form2 = new FormData();
                    form2.append('tool_id',this.tool[i].tool_id);
                    form2.append('session_id',this.previewSceneId)
                    axios({
                        method: 'post',
                        url: '/play/session_tool_delete',
                        data:form2,
                        headers:{
                            'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'
                        },
                        dataType:"json",
                    }).then((response)=> {
                        if(response.data.ret == 0){
                            this.tool.splice(i, 1);
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                        }else{
                            this.$message.error(response.data.msg);
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
        //道具添加
        previewToolAdd(){
            if(this.authId==1){
                var obj = {play_id:this.$route.query.play_id,times:'',tool_id:'',tool_name:''};
                this.tool.push(obj);
                this.$nextTick( ()=> {
                    document.querySelectorAll('#previewToolName')[document.querySelectorAll('#previewToolName').length-1].childNodes[0].style.display = 'none'
                    document.querySelectorAll('#previewToolName')[document.querySelectorAll('#previewToolName').length-1].childNodes[2].style.opacity = '1'
                    document.querySelectorAll('#previewToolName')[document.querySelectorAll('#previewToolName').length-1].childNodes[2].childNodes[0].focus()
                })
            }else{
                this.noAccess = true
            }
        },
        //道具编辑
        previewToolEdit(i){
            if(this.authId==1){
                document.querySelectorAll('#previewToolName')[i].childNodes[0].style.display = 'none'
                document.querySelectorAll('#previewToolName')[i].childNodes[2].style.opacity = '1'
                document.querySelectorAll('#previewToolName')[i].childNodes[2].childNodes[0].focus()
            }else{
                this.noAccess = true
            }
        },
        //道具编辑完成
        previewToolEditSubmit(type,i){
            if(this.tool[i].tool_name != ''){
              if(this.tool[i].tool_id == ''){
                let form = new FormData();
                form.append('play_id',this.$route.query.play_id);
                form.append('session_id',this.previewSceneId);
                form.append('tool_name',this.tool[i].tool_name)
                axios({
                  method: 'post',
                  url: '/play/tools_add',
                  data:form,
                  headers:{
                    'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'
                  },
                  dataType:"json",
                }).then((response)=> {
                  if(response.data.ret == 0){
                    this.fetchTool()
                    document.querySelectorAll('#previewToolName')[i].childNodes[0].style.display = 'block'
                    document.querySelectorAll('#previewToolName')[i].childNodes[2].style.opacity = '0'
                  }else{
                    this.$message.error(response.data.msg);
                  }
                })
              }else{
                let form1 = new FormData();
                form1.append('tool_id',this.tool[i].tool_id);
                form1.append('tool_name',this.tool[i].tool_name)
                axios({
                  method: 'post',
                  url: '/play/tools_update',
                  data:form1,
                  headers:{
                    'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'
                  },
                  dataType:"json",
                }).then((response)=> {
                  if(response.data.ret == 0){
                    document.querySelectorAll('#previewToolName')[i].childNodes[0].style.display = 'block'
                    document.querySelectorAll('#previewToolName')[i].childNodes[2].style.opacity = '0'
                  }else{
                    this.$message.error(response.data.msg);
                  }
                })
              }
            }else{
              if(this.tool[i].tool_id == ''){
                this.tool.splice(i,1)
                document.querySelectorAll('#previewToolName')[i].childNodes[0].style.display = 'block'
                document.querySelectorAll('#previewToolName')[i].childNodes[2].style.opacity = '1'
              }else{
                let form2 = new FormData();
                form2.append('tool_id',this.tool[i].tool_id);
                form2.append('session_id',this.previewSceneId)
                axios({
                  method: 'post',
                  url: '/play/session_tool_delete',
                  data:form2,
                  headers:{
                    'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'
                  },
                  dataType:"json",
                }).then((response)=> {
                  if(response.data.ret == 0){
                    this.tool.splice(i,1)
                    document.querySelectorAll('#previewToolName')[i].childNodes[0].style.display = 'block'
                    document.querySelectorAll('#previewToolName')[i].childNodes[2].style.opacity = '1'
                  }else{
                    this.$message.error(response.data.msg);
                  }
                })
              }
            }
        },
        //特殊道具删除
        previewSToolDele(i){
            if(this.authId==1){
                this.$confirm('确认删除 "'+this.stool[i].special_tool_name+'" 道具吗？','删除', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(() => {
                    let form2 = new FormData();
                    form2.append('special_tool_id',this.stool[i].special_tool_id);
                    form2.append('session_id',this.previewSceneId)
                    axios({
                        method: 'post',
                        url: '/play/session_special_tool_delete',
                        data:form2,
                        headers:{
                            'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'
                        },
                        dataType:"json",
                    }).then((response)=> {
                        if(response.data.ret == 0){
                            this.stool.splice(i, 1);
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                        }else{
                            this.$message.error(response.data.msg);
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
        //特殊道具添加
        previewSToolAdd(){
            if(this.authId==1){
                var obj = {play_id:this.$route.query.play_id,times:'',special_tool_id:'',special_tool_name:''};
                this.stool.push(obj);
                this.$nextTick( ()=> {
                    document.querySelectorAll('#previewSToolName')[document.querySelectorAll('#previewSToolName').length-1].childNodes[0].style.display = 'none'
                    document.querySelectorAll('#previewSToolName')[document.querySelectorAll('#previewSToolName').length-1].childNodes[2].style.opacity = '1'
                    document.querySelectorAll('#previewSToolName')[document.querySelectorAll('#previewSToolName').length-1].childNodes[2].childNodes[0].focus()
                })
            }else{
                this.noAccess = true
            }
        },
        //特殊道具编辑
        previewSToolEdit(i){
            if(this.authId==1){
                document.querySelectorAll('#previewSToolName')[i].childNodes[0].style.display = 'none'
                document.querySelectorAll('#previewSToolName')[i].childNodes[2].style.opacity = '1'
                document.querySelectorAll('#previewSToolName')[i].childNodes[2].childNodes[0].focus()
            }else{
                this.noAccess = true
            }
        },
        //特殊道具编辑完成
        previewSToolEditSubmit(type,i){
                if(this.stool[i].special_tool_name != ''){
                    if(this.stool[i].special_tool_id == ''){
                        let form = new FormData();
                        form.append('play_id',this.$route.query.play_id);
                        form.append('session_id',this.previewSceneId);
                        form.append('special_tool_name',this.stool[i].special_tool_name)
                        axios({
                            method: 'post',
                            url: '/play/special_tools_add',
                            data:form,
                            headers:{
                                'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'
                            },
                            dataType:"json",
                        }).then((response)=> {
                            if(response.data.ret == 0){
                                this.fetchSTool()
                                document.querySelectorAll('#previewSToolName')[i].childNodes[0].style.display = 'block'
                                document.querySelectorAll('#previewSToolName')[i].childNodes[2].style.opacity = '0'
                            }else{
                                this.$message.error(response.data.msg);
                            }
                        })
                    }else{
                        let form1 = new FormData();
                        form1.append('special_tool_name',this.stool[i].special_tool_name);
                        form1.append('special_tool_id',this.stool[i].special_tool_id)
                        axios({
                            method: 'post',
                            url: '/play/special_tools_update',
                            data:form1,
                            headers:{
                                'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'
                            },
                            dataType:"json",
                        }).then((response)=> {
                            if(response.data.ret == 0){
                                document.querySelectorAll('#previewSToolName')[i].childNodes[0].style.display = 'block'
                                document.querySelectorAll('#previewSToolName')[i].childNodes[2].style.opacity = '0'
                            }else{
                                this.$message.error(response.data.msg);
                            }
                        })
                    }
                }else{
                    if(this.stool[i].special_tool_id == ''){
                        this.stool.splice(i,1)
                        document.querySelectorAll('#previewSToolName')[i].childNodes[0].style.display = 'block'
                        document.querySelectorAll('#previewSToolName')[i].childNodes[2].style.opacity = '1'
                    }else{
                        let form2 = new FormData();
                        form2.append('special_tool_id',this.stool[i].special_tool_id);
                        form2.append('session_id',this.previewSceneId)
                        axios({
                            method: 'post',
                            url: '/play/session_special_tool_delete',
                            data:form2,
                            headers:{
                                'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'
                            },
                            dataType:"json",
                        }).then((response)=> {
                            if(response.data.ret == 0){
                                this.stool.splice(i,1)
                                document.querySelectorAll('#previewSToolName')[i].childNodes[0].style.display = 'block'
                                document.querySelectorAll('#previewSToolName')[i].childNodes[2].style.opacity = '1'
                            }else{
                                this.$message.error(response.data.msg);
                            }
                        })
                    }
                }
        },
        //服化删除
        previewDressDele(i){
            if(this.authId==1){
                this.$confirm('确认删除 "'+this.dress[i].dress_makeup_name+'" 服化吗？','删除', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(() => {
                    let form2 = new FormData();
                    form2.append('dress_makeup_id',this.dress[i].dress_makeup_id);
                    form2.append('session_id',this.previewSceneId)
                    axios({
                        method: 'post',
                        url: '/play/session_dress_makeup_delete',
                        data:form2,
                        headers:{
                            'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'
                        },
                        dataType:"json",
                    }).then((response)=> {
                        if(response.data.ret == 0){
                            this.dress.splice(i, 1);
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                        }else{
                            this.$message.error(response.data.msg);
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
        //服化添加
        previewDressAdd(){
            if(this.authId==1){
                var obj = {play_id:this.$route.query.play_id,times:'',dress_makeup_name:'',dress_makeup_id:''};
                this.dress.push(obj);
                this.$nextTick( ()=> {
                    document.querySelectorAll('#previewDressName')[document.querySelectorAll('#previewDressName').length-1].childNodes[0].style.display = 'none'
                    document.querySelectorAll('#previewDressName')[document.querySelectorAll('#previewDressName').length-1].childNodes[2].style.opacity = '1'
                    document.querySelectorAll('#previewDressName')[document.querySelectorAll('#previewDressName').length-1].childNodes[2].childNodes[0].focus()
                })
            }else{
                this.noAccess = true
            }
        },
        //服化编辑
        previewDressEdit(i){
            if(this.authId==1){
                document.querySelectorAll('#previewDressName')[i].childNodes[0].style.display = 'none'
                document.querySelectorAll('#previewDressName')[i].childNodes[2].style.opacity = '1'
                document.querySelectorAll('#previewDressName')[i].childNodes[2].childNodes[0].focus()
            }else{
                this.noAccess = true
            }
        },
        //服化编辑完成
        previewDressEditSubmit(type,i){
                if(this.dress[i].dress_makeup_name != ''){
                    if(this.dress[i].dress_makeup_id == ''){
                        let form = new FormData();
                        form.append('play_id',this.$route.query.play_id);
                        form.append('session_id',this.previewSceneId);
                        form.append('dress_makeup_name',this.dress[i].dress_makeup_name)
                        axios({
                            method: 'post',
                            url: '/play/dress_makeup_add',
                            data:form,
                            headers:{
                                'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'
                            },
                            dataType:"json",
                        }).then((response)=> {
                            if(response.data.ret == 0){
                                this.fetchDress()
                                document.querySelectorAll('#previewDressName')[i].childNodes[0].style.display = 'block'
                                document.querySelectorAll('#previewDressName')[i].childNodes[2].style.opacity = '0'
                            }else{
                                this.$message.error(response.data.msg);
                            }
                        })
                    }else{
                        let form1 = new FormData();
                        form1.append('dress_makeup_name',this.dress[i].dress_makeup_name);
                        form1.append('dress_makeup_id',this.dress[i].dress_makeup_id)
                        axios({
                            method: 'post',
                            url: '/play/dress_makeup_update',
                            data:form1,
                            headers:{
                                'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'
                            },
                            dataType:"json",
                        }).then((response)=> {
                            if(response.data.ret == 0){
                                document.querySelectorAll('#previewDressName')[i].childNodes[0].style.display = 'block'
                                document.querySelectorAll('#previewDressName')[i].childNodes[2].style.opacity = '0'
                            }else{
                                this.$message.error(response.data.msg);
                            }
                        })
                    }
                }else{
                    if(this.dress[i].dress_makeup_id == ''){
                        this.dress.splice(i,1)
                        document.querySelectorAll('#previewDressName')[i].childNodes[0].style.display = 'block'
                        document.querySelectorAll('#previewDressName')[i].childNodes[2].style.opacity = '1'
                    }else{
                        let form2 = new FormData();
                        form2.append('dress_makeup_id',this.dress[i].dress_makeup_id);
                        form2.append('session_id',this.previewSceneId)
                        axios({
                            method: 'post',
                            url: '/play/session_dress_makeup_delete',
                            data:form2,
                            headers:{
                                'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'
                            },
                            dataType:"json",
                        }).then((response)=> {
                            if(response.data.ret == 0){
                                this.dress.splice(i,1)
                                document.querySelectorAll('#previewDressName')[i].childNodes[0].style.display = 'block'
                                document.querySelectorAll('#previewDressName')[i].childNodes[2].style.opacity = '1'
                            }else{
                                this.$message.error(response.data.msg);
                            }
                        })
                    }
                }
        },
        //特效删除
        previewEffectDele(i){
            if(this.authId==1){
                this.$confirm('确认删除 "'+this.effect[i].special_effect_name+'" 特效吗？','删除', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(() => {
                    let form2 = new FormData();
                    form2.append('dress_makeup_id',this.effect[i].special_effect_id);
                    form2.append('session_id',this.previewSceneId)
                    axios({
                        method: 'post',
                        url: '/play/session_dress_makeup_delete',
                        data:form2,
                        headers:{
                            'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'
                        },
                        dataType:"json",
                    }).then((response)=> {
                        if(response.data.ret == 0){
                            this.effect.splice(i, 1);
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                        }else{
                            this.$message.error(response.data.msg);
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
        //特效添加
        previewEffectAdd(){
            if(this.authId==1){
                var obj = {play_id:this.$route.query.play_id,times:'',special_effect_id:'',special_effect_name:''};
                this.effect.push(obj);
                this.$nextTick( ()=> {
                    document.querySelectorAll('#previewEffectName')[document.querySelectorAll('#previewEffectName').length-1].childNodes[0].style.display = 'none'
                    document.querySelectorAll('#previewEffectName')[document.querySelectorAll('#previewEffectName').length-1].childNodes[2].style.opacity = '1'
                    document.querySelectorAll('#previewEffectName')[document.querySelectorAll('#previewEffectName').length-1].childNodes[2].childNodes[0].focus()
                })
            }else{
                this.noAccess = true
            }
        },
        //特效编辑
        previewEffectEdit(i){
            if(this.authId==1){
                document.querySelectorAll('#previewEffectName')[i].childNodes[0].style.display = 'none'
                document.querySelectorAll('#previewEffectName')[i].childNodes[2].style.opacity = '1'
                document.querySelectorAll('#previewEffectName')[i].childNodes[2].childNodes[0].focus()
            }else{
                this.noAccess = true
            }
        },
        //特效编辑完成
        previewEffectEditSubmit(type,i){
                if(this.effect[i].special_effect_name != ''){
                    if(this.effect[i].special_effect_id == ''){
                        let form = new FormData();
                        form.append('play_id',this.$route.query.play_id);
                        form.append('session_id',this.previewSceneId);
                        form.append('special_effect_name',this.effect[i].special_effect_name)
                        axios({
                            method: 'post',
                            url: '/play/special_effect_add',
                            data:form,
                            headers:{
                                'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'
                            },
                            dataType:"json",
                        }).then((response)=> {
                            if(response.data.ret == 0){
                                this.fetchDress()
                                document.querySelectorAll('#previewEffectName')[i].childNodes[0].style.display = 'block'
                                document.querySelectorAll('#previewEffectName')[i].childNodes[2].style.opacity = '0'
                            }else{
                                this.$message.error(response.data.msg);
                            }
                        })
                    }else{
                        let form1 = new FormData();
                        form1.append('special_effect_name',this.effect[i].special_effect_name);
                        form1.append('special_effect_id',this.effect[i].special_effect_id)
                        axios({
                            method: 'post',
                            url: '/play/special_effect_update',
                            data:form1,
                            headers:{
                                'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'
                            },
                            dataType:"json",
                        }).then((response)=> {
                            if(response.data.ret == 0){
                                document.querySelectorAll('#previewEffectName')[i].childNodes[0].style.display = 'block'
                                document.querySelectorAll('#previewEffectName')[i].childNodes[2].style.opacity = '0'
                            }else{
                                this.$message.error(response.data.msg);
                            }
                        })
                    }
                }else{
                    if(this.effect[i].special_effect_id == ''){
                        this.effect.splice(i,1)
                        document.querySelectorAll('#previewEffectName')[i].childNodes[0].style.display = 'block'
                        document.querySelectorAll('#previewEffectName')[i].childNodes[2].style.opacity = '1'
                    }else{
                        let form2 = new FormData();
                        form2.append('special_effect_id',this.effect[i].special_effect_id);
                        form2.append('session_id',this.previewSceneId)
                        axios({
                            method: 'post',
                            url: '/play/session_special_effect_delete',
                            data:form2,
                            headers:{
                                'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'
                            },
                            dataType:"json",
                        }).then((response)=> {
                            if(response.data.ret == 0){
                                this.effect.splice(i,1)
                                document.querySelectorAll('#previewEffectName')[i].childNodes[0].style.display = 'block'
                                document.querySelectorAll('#previewEffectName')[i].childNodes[2].style.opacity = '1'
                            }else{
                                this.$message.error(response.data.msg);
                            }
                        })
                    }
                }
        },
        handleSelectRightMenu(key, keyPath){
            this.activeMenu = key
        },
        saveFetch(id){
            this.saveData();
            this.fetchData(id);
            this.addSceneForm.parent_id=id
        },
        //添加场景
        addScene(){
            if(this.$refs['sceneValidateForm'].validate){
                this.$refs['sceneValidateForm'].validate((valid) => {
                    if (valid) {
                        // let form = new FormData();
                        // form.append('air', this.sceneDay + ',' + this.sceneIndoor);
                        // form.append('field_number', this.addSceneForm.field_number);
                        // form.append('parent_id', this.addSceneForm.parent_id);
                        // form.append('scene_name', this.addSceneForm.scene_name);
                        // form.append('play_id', this.addSceneForm.play_id);
                        this.addSceneForm.air = this.sceneDay + ',' + this.sceneIndoor;
                        axios({
                            method: 'post',
                            url: '/play/session_add',
                            data:this.addSceneForm,
                            transformRequest: [function (data) {
                                let ret = ''
                                for (let it in data) {
                                    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                                }
                                return ret
                            }],
                            headers:{
                                'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'
                            },
                            dataType:"json",
                        }).then((response)=> {
                            if(response.data.ret == 0){
                                this.getScene();
                                this.addSceneDialog = false;
                            }else{
                                this.$message.error(response.data.msg);
                            }
                        })
                    }
                })
            }
        },
        saveData(n){
          let form = new FormData();
          form.append('session_id',this.previewSceneId);
          form.append('field_number',this.sceneNum);
            if(this.sceneName != ''){
                form.append('scene_name',this.sceneName);
            }
          form.append('summary',this.summary);
          form.append('air',this.sceneDay + ',' + this.sceneIndoor);
          if(this.weather != ''){
              form.append('weather',this.weather);
          }
          form.append('label_end',document.getElementById('previewContent').innerHTML);
          if(this.sceneRemark != ''){
            form.append('remark',this.sceneRemark);
          }
          let label_head = '';
          for(let i=0; i< this.previewScene.length; i++){
            if(this.previewScene[i].session_id == this.previewSceneId){
              label_head = this.previewScene[i].label_head
              break
            }else{
              continue
            }
          }
          form.append('label_head',label_head);
          if(this.previewSceneId != ''){
            axios({
              method: 'post',
              url: '/play/session_update',
              data:form,
              headers:{
                'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'
              },
              dataType:"json",
            }).then((response)=> {
              if(response.data.ret == 0){
                if(n =='no'){
                  return
                }else{
                  this.$message({
                    message: '同步成功',
                    type: 'success'
                  });
                }
              }else{
                this.$message.error(response.data.msg);
              }
            })
          }else{
            form.append('play_id',this.$route.query.play_id);
            form.append('parent_id',this.addSceneForm.parent_id);
            axios({
              method: 'post',
              url: '/play/session_add',
              data:form,
              headers:{
                'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'
              },
              dataType:"json",
            }).then((response)=> {
              if(response.data.ret == 0){
                if(n =='no'){
                  return
                }else{
                  this.$message({
                    message: '同步成功',
                    type: 'success'
                  });
                }
              }else{
                this.$message.error(response.data.msg);
              }
            })
          }
        },
        //添加标签
      appendA(className) {
          if(this.authId==1){
              var menu = $("#menu")[0];
              if (this.txt.toString() !== '') {
                  if(className == 'empty'){
                      menu.style.display = "none";
                      window.getSelection().removeAllRanges();
                      return
                  }else{
                      if(this.txt.commonAncestorContainer.childElementCount > 1){
                          menu.style.display = "none";
                          window.getSelection().removeAllRanges();
                          return
                      }else if(this.txt.commonAncestorContainer.parentElement.nodeName== 'A'){
                          menu.style.display = "none";
                          window.getSelection().removeAllRanges();
                          return
                      }else{
                          if(this.txt.commonAncestorContainer.firstChild){
                              if(this.txt.commonAncestorContainer.firstChild.nodeName== 'A'){
                                  menu.style.display = "none";
                                  window.getSelection().removeAllRanges();
                                  return
                              }
                          }
                          var a = document.createElement("a")
                          a.setAttribute("class", className);
                          this.txt.surroundContents(a)
                          $('#previewContent').on('click', 'a', (event) => {
                              var mX = event.clientX + 10;
                              var mY = event.clientY;
                              menu.style.display = "block";
                              menu.style.left = mX + "px";
                              if(document.documentElement.clientHeight<mY+236){
                                  menu.style.top = mY + document.documentElement.clientHeight-(mY+236) + "px";
                              }else{
                                  menu.style.top = mY + "px";
                              }
                          })
                      }

                  }
                  menu.style.display = "none";
                  window.getSelection().removeAllRanges();
                  if(className == 'empty'){
                      this.saveLabel('cancel')
                  }else if(className == 'weather'){
                      this.saveLabelHead(className,sessionStorage.getItem('sceneHead'))
                  }else{
                      this.saveLabel(className)
                  }
                  // console.log(sessionStorage.getItem('sceneHead'))
              }else if(this.txt.commonAncestorContainer.parentNode.className !== 'previewContent'){
                  if(className == 'empty'){
                      let oldHtml = this.txt.commonAncestorContainer.parentNode.outerHTML
                      if(this.txt.commonAncestorContainer.parentNode.tagName == 'P'){
                          let child = this.txt.commonAncestorContainer.parentNode.childNodes
                      }else{
                          sessionStorage.setItem('oldHtml',oldHtml);
                          this.txt.commonAncestorContainer.parentNode.outerHTML = oldHtml.replace(/<.+?>/g,"")
                      }
                  }else{
                      this.txt.commonAncestorContainer.parentNode.className = className
                  }
                  menu.style.display = "none";
                  if(className == 'empty'){
                      this.saveLabel('cancel')
                  }else if(className == 'changhao'){
                      this.saveLabelHead('field_number',sessionStorage.getItem('sceneHeadOver'))
                  }else if(className == 'changjing'){
                      this.saveLabelHead('scene_name',sessionStorage.getItem('sceneHeadOver'))
                  }else if(className == 'qifen'){
                      this.saveLabelHead('air',sessionStorage.getItem('sceneHeadOver'))
                  }else if(className == 'xingming'){
                      this.saveLabel('actor')
                  }else if(className == 'tianqi'){
                      this.saveLabelHead('weather',sessionStorage.getItem('sceneHeadOver'))
                  }else if(className == 'daoju'){
                      this.saveLabel('tool')
                  }
                  // console.log(sessionStorage.getItem('sceneHeadOver'))
                  // console.log(this.txt.commonAncestorContainer.parentNode.parentNode.outerHTML)
              }else{
                  menu.style.display = "none";
              }
          }else{
              this.noAccess = true
          }

      },
      saveLabel(o,v){
          let form = new FormData();
          form.append('option',o);
          form.append('session_id',this.previewSceneId);
          form.append('user_id',JSON.parse(localStorage.user_id));
          form.append('project_id',this.$route.query.project_id);
          form.append('play_id',this.$route.query.play_id);
          if(this.txt.commonAncestorContainer.parentNode.className !== 'previewContent'){
            if(o == 'cancel'){
              if(sessionStorage.getItem('oldHtml').slice(10,18) == 'xingming'){
                form.append('type','actor');
              }else{
                form.append('type','tool');
              }
              form.append('text',sessionStorage.getItem('oldHtml').replace(/<.+?>/g,""));
            }else{
              form.append('text',this.txt.commonAncestorContainer.parentNode.innerHTML);
            }
          }else{
            if(o == 'cancel'){
              if(sessionStorage.getItem('oldHtml').slice(10,18) == 'xingming'){
                form.append('type','actor');
              }else{
                form.append('type','tool');
              }
              form.append('text',sessionStorage.getItem('oldHtml').replace(/<.+?>/g,""));
            }else{
              form.append('text',this.txt.toString());
            }
          }
          if(v){
            form.append('current',v)
          }

          axios({
            method: 'post',
            url: '/play/label',
            data:form,
            headers:{
              'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'
            },
            dataType:"json",
          }).then((response)=> {
            if(response.data.ret == 0){
              if(v){
                localStorage.setItem('previewSceneId',this.previewSceneId);
                this.$router.go(0)
              }else{
                this.saveData('no')
              }
            }else{
              this.$message.error(response.data.msg);
            }
          })
      },
      saveLabelHead(o,v){
          // this.content = '';
          this.$confirm('标注段首内容会拆分该场，确认标注?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          }).then(() => {
            let form = new FormData();
            form.append('option',o);
            form.append('session_id',this.previewSceneId);
            form.append('user_id',JSON.parse(localStorage.user_id));
            form.append('project_id',this.$route.query.project_id);
            form.append('play_id',this.$route.query.play_id);
            if(this.txt.commonAncestorContainer.parentNode.className !== 'previewContent'){
              if(o == 'cancel'){
                if(sessionStorage.getItem('oldHtml').slice(10,18) == 'xingming'){
                  form.append('type','actor');
                }else{
                  form.append('type','tool');
                }
                form.append('text',sessionStorage.getItem('oldHtml').replace(/<.+?>/g,""));
              }else{
                form.append('text',this.txt.commonAncestorContainer.parentNode.innerHTML);
              }
            }else{
              if(o == 'cancel'){
                if(sessionStorage.getItem('oldHtml').slice(10,18) == 'xingming'){
                  form.append('type','actor');
                }else{
                  form.append('type','tool');
                }
                form.append('text',sessionStorage.getItem('oldHtml').replace(/<.+?>/g,""));
              }else{
                form.append('text',this.txt.toString());
              }
            }
            if(v){
              form.append('current',v)
            }
              axios({
                  method: 'post',
                  url: '/play/label',
                  data:form,
                  headers:{
                      'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'
                  },
                  dataType:"json",
              }).then((response)=> {
                  if(response.data.ret == 0){
                      if(v){
                          localStorage.setItem('previewSceneId',this.previewSceneId);
                          this.$router.go(0)
                      }else{
                          this.saveData('no')
                      }
                  }else{
                      this.$message.error(response.data.msg);
                  }
              })
          }).catch(() => {
              this.$nextTick( ()=> {
                  this.content = sessionStorage.getItem('sceneHeadOver').slice(130,-6)
              })
          });
        },
      getString(event){
        this.txt = window.getSelection?window.getSelection().getRangeAt(0):document.selection.createRange().text;
        sessionStorage.setItem('sceneHead',window.getSelection?window.getSelection().getRangeAt(0).commonAncestorContainer.parentNode.outerHTML:document.selection.createRange().parentElement().outerHTML);
          sessionStorage.setItem('sceneHeadOver',window.getSelection?window.getSelection().getRangeAt(0).commonAncestorContainer.parentNode.parentNode.outerHTML:document.selection.createRange().parentElement().parentElement().outerHTML)
          var menu =  $("#menu")[0];
              var ev = event || window.event;
              var mX = event.clientX;
              var mY = event.clientY;
              if(this.txt!=''){
                  if(document.body.clientHeight || document.documentElement.clientHeight-350<=event.clientY){
                      let ch = document.body.clientHeight || document.documentElement.clientHeight-350
                      menu.style.top = ch + "px";
                  }else{
                      menu.style.top = mY + "px";
                  }
                  menu.style.left = mX + "px";
                  menu.style.display = "block";
                  // 点击页面菜单消失
                  document.getElementById('previewContent').addEventListener("mousedown", ()=>{
                      menu.style.display = "none";
                  });
              }
      },
        //获取场次列表
      getScene(){
          axios.get('/play/preview/sessions',{
              params:{
                  play_id : this.$route.query.play_id,
                  episode : this.episode_num
              }
          }).then((response)=> {
              if(response.data.ret == '0'){
                  if(response.data.data.length != 0){
                      this.previewScene = response.data.data
                      if(localStorage.previewSceneId){
                          // console.log(localStorage.getItem("previewSceneId"))
                          this.previewSceneId = localStorage.getItem("previewSceneId").replace("\"","").replace("\"","")
                          localStorage.removeItem('previewSceneId')
                          this.fetchData(this.previewSceneId);
                      }else{
                          this.fetchData(this.previewScene[0].session_id);
                      }
                  }
                  this.$nextTick( ()=> {
                    if(document.getElementById('previewSceneListBox')){
                      document.getElementById('previewSceneListBox').scrollTop = 0;
                    }
                  })
              }
          })

      },
      previewSceneMenuOpen(i,event){
          this.parentSceneId = this.previewScene[i].session_id
          this.previewSceneBtn = true;
          let top = event.clientY + 11;
          let left = event.clientX - 5;
          let previewSceneMenu = document.getElementsByClassName('previewSceneMenuOpen')[0];
          previewSceneMenu.style.top = top + 'px'
          previewSceneMenu.style.left = left + 'px'
      },
      performerRouter(){
        this.$router.push('/details/performer?play_id='+this.$route.query.play_id)
      },
      show(){
        // console.log(window.event);
        // window.event.returnValue = false;
        // return false;
      },

      lineClick(){
        // this.$refs.myQuillEditor.quill.setText('Hello World!');
        // this.$refs.myQuillEditor.quill.formatLine(1, 476, 'list', 'ordered');
        let lengthNum = this.$refs.myQuillEditor.quill.getLength();
        let text = this.$refs.myQuillEditor.quill.getText(0,);
        let lines = this.$refs.myQuillEditor.quill.getLines();
        var delta = this.$refs.myQuillEditor.quill.getContents();

        for (let j = 0; j <= lines.length; j++){
          // console.log(j)
          let linesNum = lines[j].cache.delta.ops;
          // console.log(linesNum);
          if (linesNum){
            this.$refs.myQuillEditor.quill.formatLine(1, 50, 'list', 'ordered');
          }

          // linesNum. unshift(j);
        }

      },

      handleNodeClick(data) {
        // console.log(data);
      },
      //场景合并
      merge(direction){
          if(this.authId==1){
              let child = '';
              for (let i=0;i<this.previewScene.length;i++){
                  if(this.previewScene[i].session_id == this.previewSceneId){
                      if(direction == 'up'){
                          child = this.previewScene[i-1].session_id
                      }else{
                          child = this.previewScene[i+1].session_id
                      }

                  }
              }
              axios({
                  method: 'post',
                  url: '/play/session_merge',
                  data:{
                      parent: child,
                      child: this.previewSceneId
                  },
                  headers:{
                      'Content-type': 'application/x-www-form-urlencoded'
                  },
                  transformRequest: [function (data) {
                      let ret = ''
                      for (let it in data) {
                          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                      }
                      return ret
                  }]
              }).then((response)=> {
                  if(response.data.ret == 0){
                      this.$message({
                          message: '合并成功',
                          type: 'success'
                      });
                      this.getScene()
                  }else{
                      this.$message.error(response.data.msg);
                  }
              })
          }else{
              this.noAccess = true
          }

      },
      //场景添加
      sceneAdd(v){
          this.sceneDay = '';
          this.sceneIndoor = '';
          if(this.authId==1){
              this.addSceneDialog=true
          }else{
              this.noAccess = true
          }
      },
      //场景删除
      sceneDele(){
          if(this.authId==1){
              this.$confirm('确认删除该场景吗？','删除', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消'
              }).then(() => {
                  let form2 = new FormData();
                  form2.append('session_id',this.previewSceneId)
                  axios({
                      method: 'post',
                      url: '/play/session_delete',
                      data:form2,
                      headers:{
                          'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'
                      },
                      dataType:"json",
                  }).then((response)=> {
                      if(response.data.ret == 0){
                          for (let i=0;i<this.previewScene.length;i++){
                              if(this.previewScene[i].session_id == this.previewSceneId){
                                  this.previewScene.splice(i,1)
                              }
                          }
                          this.$message({
                              type: 'success',
                              message: '删除成功!'
                          });
                      }else{
                          this.$message.error(response.data.msg);
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
      //  获取演员
      showCast(){
        axios({
          method: 'get',
          url: '/play/session_actors?session_id='+this.previewSceneId,
          headers:{
            'Content-type': 'application/x-www-form-urlencoded'
          }
        }).then((response)=> {
            this.data = response.data.data
        })
          axios.get('/play/scenes_all',{
              params:{
                  play_id : this.$route.query.play_id
              }
          }).then((response)=> {
              if(response.data.ret == '0'){
                  for(var i = 0; i < response.data.data.length ; i++){
                      if(response.data.data[i] != null){
                          let obj = {names:response.data.data[i].scene_name,id:response.data.data[i].scene_id};
                          this.scene.push(obj)
                      }
                  }
              }
          })
      },
      //  获取道具
        fetchTool(){
            axios.get('/play/session_tools',{
                params:{
                    session_id : this.previewSceneId
                }
            }).then((response)=> {
                if(response.data.ret == '0'){
                   this.tool = response.data.data
                }
            })
        },
        //  获取特殊道具
        fetchSTool(){
            axios.get('/play/session_special_tools',{
                params:{
                    session_id : this.previewSceneId
                }
            }).then((response)=> {
                if(response.data.ret == '0'){
                    this.stool = response.data.data
                }
            })
        },
        //  获取服化
        fetchDress(){
            axios.get('/play/session_dress_makeups',{
                params:{
                    session_id : this.previewSceneId
                }
            }).then((response)=> {
                if(response.data.ret == '0'){
                    this.dress = response.data.data
                }
            })
        },
        //  获取特效
        fetchEffect(){
            axios.get('/play/session_special_effects',{
                params:{
                    session_id : this.previewSceneId
                }
            }).then((response)=> {
                if(response.data.ret == '0'){
                    this.effect = response.data.data
                }
            })
        },
      fetchData(session_id){
        axios.get('/play/preview/contents',{
            params:{
                session_id : session_id
            }
        }).then((response)=> {
            if(response.data.ret == '0'){
                this.reard();
                if(response.data.data != undefined){
                    const index = this.previewScene.findIndex(d => d.session_id === session_id);
                    if(index != 0 && index != -1){
                      $(".previewSceneListBox").animate({scrollTop:$('.previewSceneListBox .previewSceneListContent').eq(index).offset().top - $(".previewSceneListBox").offset().top + $(".previewSceneListBox").scrollTop()},800);
                    }
                    this.previewSceneId = session_id;
                    this.showCast();
                    this.fetchTool();
                    this.fetchSTool();
                    this.fetchDress();
                    this.fetchEffect();
                    if(response.data.data[0].field_number){
                        this.sceneNum = response.data.data[0].field_number;
                    }
                    this.sceneName = response.data.data[0].scene_name;
                    if(response.data.data[0].summary){
                      this.summary = response.data.data[0].summary;
                    }
                    if(response.data.data[0].remark){
                      this.sceneRemark = response.data.data[0].remark
                    }else{
                      this.sceneRemark = ''
                    }
                    if(response.data.data[0].air){
                        let responseStr = response.data.data[0].air.split(',');
                        this.sceneDay = responseStr[0];
                        if(this.sceneDay == '日' || this.sceneDay == '晨' || this.sceneDay == '早晨' || this.sceneDay == '白天' || this.sceneDay == '上午' || this.sceneDay == '中午' || this.sceneDay == '正午' || this.sceneDay == '晌午' || this.sceneDay == '午后' || this.sceneDay == '午' || this.sceneDay == '早上' || this.sceneDay == '凌晨' || this.sceneDay == '清晨'){
                            this.sceneDayClass = 'ri'
                        }else if(this.sceneDay == '夜' || this.sceneDay == '晚' || this.sceneDay == '黄昏' || this.sceneDay == '傍晚' || this.sceneDay == '晚上' || this.sceneDay == '午夜' || this.sceneDay == '夜晚' || this.sceneDay == '黑夜'){
                            this.sceneDayClass = 'ye'
                        }
                        this.sceneIndoor = responseStr[1];
                    }
                    if(response.data.data[0].origin_head){
                        this.origin_head = response.data.data[0].origin_head
                    }
                    if(response.data.data[0].weather){
                        this.weather = response.data.data[0].weather
                    }
                    this.content = response.data.data[0].label_end;
                    this.$nextTick( ()=> {
                      var a=document.getElementById('previewContent').getElementsByTagName('a');
                      var menu = $("#menu")[0];
                      for(var i=0;i<a.length;i++){
                        if(!a[i].hasChildNodes()) {
                          a[i].remove()
                        }
                        a[i].onclick= (event)=>{
                          $('#previewContent').on('click', 'a', (event) => {
                            var mX = event.clientX + 10;
                            var mY = event.clientY;
                            menu.style.display = "block";
                            menu.style.left = mX  + "px";
                            if(document.documentElement.clientHeight<mY+236){
                                menu.style.top = mY + document.documentElement.clientHeight-(mY+236) + "px";
                            }else{
                                menu.style.top = mY + "px";
                            }
                          })
                        }
                      }
                    })

                }

            }else{
                this.$alert(response.data.msg, '提示', {
                    confirmButtonText: '确定'
                });
            }
        })
      },
      change(k){
        this.episode_num = k
        this.saveData();
        this.getScene()
      },

      //新手引导
      reard(){
          if(this.$route.query.project_id == '1'){
              //新手引导2，加演示器
              this.$nextTick(()=>{
                  this.$intro().setOptions({'prevLabel':'&larr; 上一步','nextLabel':'下一步 &rarr;','skipLabel':'跳过'}).start();
              });
              $("body").pagewalkthrough({
                  name: "introduction",
                  steps: [{
                      popup: {
                          content: "#walkthrough-1",
                          type: "modal"
                      }
                  }, {
                      wrapper: ".previewSceneMenu",
                      popup: {
                          content: "#walkthrough-2",
                          type: "tooltip",
                          position: "right"
                      }
                  }, {
                      wrapper: ".previewContent",
                      popup: {
                          content: "#walkthrough-3",
                          type: "tooltip",
                          position: "top"
                      }
                  }, {
                      wrapper: ".previewPerformerMenu",
                      popup: {
                          content: "#walkthrough-4",
                          type: "tooltip",
                          position: "left"
                      }
                  }],
                  buttons: {
                      jpwClose: {
                          i18n: "点击关闭"
                      },
                      jpwNext: {
                          i18n: "下一步 &rarr;"
                      },
                      jpwPrevious: {
                          i18n: "&larr; 上一步"
                      },
                      jpwFinish: {
                          i18n: "完成 &#10004;"
                      }
                  },
                  onClose:()=>{

                      setTimeout(()=>{
                          this.$router.push('/details/performer?play_id='+this.$route.query.play_id+'&project_id='+this.$route.query.project_id)
                      }, 600);

                  },
              });
              $('body').pagewalkthrough('show');
              document.getElementById('jpwOverlay').style.visibility="visible";
              document.getElementById('jpWalkthrough').style.visibility="visible";
          }

      }

    },

    mounted () {
        //  成员信息权限设置
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
                                let index = response.data.data.auths[i][j].findIndex(d => d.id == '3');
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
      //获取项目信息
      axios.get('/project/info', {
          params: {
              project_id: this.$route.query.project_id
          }
      }).then((response)=> {
          this.is_default = response.data.data.is_default;
          
      })
      if(document.getElementsByClassName('collect-right')[0]){
          document.getElementsByClassName('collect-right')[0].addEventListener('scroll', this.scroll);
      }

      document.title="剧本预览";
      if(this.$route.query.episode_num){
          this.episode_num = this.$route.query.episode_num;
      }
      this.getScene()
      axios.get('/play/preview/episodes',{
          params:{
              play_id : this.$route.query.play_id
          }
      }).then((response)=> {
          if(response.data.ret == '0'){
              if(response.data.data != '1'){
                  this.episode = response.data.data
              }
          }
      })

    },
    updated(){


      function $(selector){
        return document.querySelectorAll(selector);
      }


      if($("#menu")[0]){
          var li = $("#menu ul li");
          var menu =  $("#menu")[0];


          //右键菜单单击
          // document.getElementById('previewContent').oncontextmenu = function(event){
          //     var ev = event || window.event;
          //     var mX = event.clientX;
          //     var mY = event.clientY;
          //     menu.style.display = "block";
          //     menu.style.left = mX + "px";
          //     menu.style.top = mY + "px";
          //     return false;   //取消window自带的菜单弹出来
          // }
          //
          // //点击页面菜单消失
          // document.getElementById('previewContent').onclick = function(){
          //     menu.style.display = "none";
          // }

          //阻止点击li冒泡
          for(var i = 0, len = li.length; i < len; i++ ){
              li.item(i).onclick = function(event){
                  var ev = event || window.event;
                  // console.log(this.innerText);
                  if(ev.stopPropagation()){
                      ev.stopPropagation();
                  }else{
                      ev.cancelBubble = false;
                  }
              }
          }
      }
    },
    watch:{
        previewSceneBtn(curVal,oldVal){
          if(curVal == true){
              window.addEventListener('click',()=>{
                  this.previewSceneBtn = false
              },true)
          }else{
              window.removeEventListener('click',()=>{
                  this.previewSceneBtn = true
              },true)
          }
        },
        sceneNum(curval){
            for(let i=0; i< this.previewScene.length; i++){
                if(this.previewScene[i].session_id == this.previewSceneId){
                    if(curval!= undefined){
                        this.previewScene[i].label_head = '<a class="changhao">'+curval+'</a> <a class="changjing">'+this.sceneName+'</a> <a class="'+this.sceneDayClass+'">'+this.sceneDay+','+this.sceneIndoor+'</a>'
                    }else{
                        this.sceneNum = ''
                    }
                    break
                }else{
                    continue
                }
            }
        },
        sceneName(curval){
            for(let i=0; i< this.previewScene.length; i++){
                if(this.previewScene[i].session_id == this.previewSceneId){
                    if(curval!= undefined) {
                        this.previewScene[i].label_head = '<a class="changhao">' + this.sceneNum + '</a> <a class="changjing">' + curval + '</a> <a class="' + this.sceneDayClass + '">' + this.sceneDay +','+ this.sceneIndoor + '</a>'
                    }else{
                        this.sceneName = ''
                    }
                    break
                }else{
                    continue
                }
            }
        },
        sceneDay(curval){
            if(this.sceneDay == '日' || this.sceneDay == '晨' || this.sceneDay == '早晨' || this.sceneDay == '白天' || this.sceneDay == '上午' || this.sceneDay == '中午' || this.sceneDay == '正午' || this.sceneDay == '晌午' || this.sceneDay == '午后' || this.sceneDay == '午' || this.sceneDay == '早上' || this.sceneDay == '凌晨' || this.sceneDay == '清晨'){
                this.sceneDayClass = 'ri'
            }else if(this.sceneDay == '夜' || this.sceneDay == '晚' || this.sceneDay == '黄昏' || this.sceneDay == '傍晚' || this.sceneDay == '晚上' || this.sceneDay == '午夜' || this.sceneDay == '夜晚' || this.sceneDay == '黑夜'){
                this.sceneDayClass = 'ye'
            }
            for(let i=0; i< this.previewScene.length; i++){
                if(this.previewScene[i].session_id == this.previewSceneId){
                    if(curval!= undefined) {
                        this.previewScene[i].label_head = '<a class="changhao">' + this.sceneNum + '</a> <a class="changjing">' + this.sceneName + '</a> <a class="' + this.sceneDayClass + '">' + curval +','+ this.sceneIndoor + '</a>'
                    }else{
                        this.sceneDay = ''
                    }
                    break
                }else{
                    continue
                }
            }
        },
        sceneIndoor(curval){
            for(let i=0; i< this.previewScene.length; i++){
                if(this.previewScene[i].session_id == this.previewSceneId){
                    if(curval!= undefined) {
                        this.previewScene[i].label_head = '<a class="changhao">' + this.sceneNum + '</a> <a class="changjing">' + this.sceneName + '</a> <a class="' + this.sceneDayClass + '">' + this.sceneDay +','+ curval + '</a>'
                    }else{
                        this.sceneIndoor = ''
                    }
                    break
                }else{
                    continue
                }
            }
        },
        enter: function (newVal) {
            if(newVal == ''){
                this.$message('请核查非幕为您的标注结果是否准确，如有错误请右键进行取消，或对目标内容进行选中并右键将其重新标注。');
            }
        },
        info:function (newVal) {
            if(newVal.length !== 0){
                clearInterval(this.t1);
            }
        }
    },
      beforeRouteLeave (to, from, next){
          if(document.getElementById('jpwOverlay')){
              document.getElementById('jpwOverlay').style.display = 'none';
              document.getElementById('jpWalkthrough').style.display = 'none';
          }

          next(true)
      },
  }
</script>

<style>
    @import "../../css/el-form.css";

    /*添加场景弹框*/
    #preview .addSelectForm .el-form-item__label{
        display: block;
        width: 100%;
        text-align: left;
    }

  .previewPerformerBtn span{
    font-size: 18px;
  }
  .previewPerformerMenu .previewMenuLeft li .el-tooltip{
    padding: 0 10.6px!important;
  }
  .previewHead .sceneSelectBox .el-input__inner{
    border: none;
    padding: 0 7px;
    background-color: #f5f5f7 !important;
      font-size: 12px;
      height: 22px !important;
  }
  .previewHead .sceneSelectBox .el-input__suffix{
    right: 0px;
  }
  .previewHead .sceneSelectBox .el-input__icon{
    line-height: 24px;
  }

  .collect-content .previewContentBox .previewCollapse .el-collapse-item__header{
    height: 68px;
    line-height: normal;
    border-color: #ddd;
    position: relative;
    padding: 0 190px;
    justify-content: space-between;
  }
  .collect-content .previewContentBox .previewCollapse .el-collapse-item__header .el-collapse-item__arrow{
    transform:rotate(90deg);
    margin: 10px 0 0 10px;
  }
  .collect-content .previewContentBox .previewCollapse .el-collapse-item__content{
    padding: 20px 166px;
    color: #666;
    line-height: 30px;
    letter-spacing: 2px;
  }
  .collect-content .previewContentBox .previewContentSetting .sceneSelectBox .el-input--suffix .el-input__inner{
    border: none !important;
    font-size: 12px !important;
    border-radius: 0 !important;
    padding-left: 16px!important;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }

  .collect-content .previewContentBox .previewContentSetting .sceneSelectBox .el-input .el-input__inner:nth-of-type(2){
      padding-left: 16px!important;
  }

  .collect-content .previewContentBox .previewContentSetting .sceneSelectBox .el-input--suffix.is-focus .el-input__inner{
    color: #333 !important;
  }
  .collect-content .previewContentBox .previewContentSetting .sceneSelectBox .el-input--suffix .el-input__suffix{
      right: 5px!important;
  }
  .previewSceneList .previewSceneListBox .previewSceneListContent .previewSceneName a{
    color: #666;
    text-decoration: none;
    display: block;
    height: 40px;
    font-size: 14px;
  }
  .previewSceneList .previewSceneListBox .previewSceneListContent .previewSceneName a.changhao{
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    width: 26px;
    text-align: center;
    flex-shrink: 0;
      font-size:12px
  }
  .previewSceneList .previewSceneListBox .previewSceneListContent .previewSceneName a.changjing,
  .previewSceneList .previewSceneListBox .previewSceneListContent .previewSceneName a.tianqi{
    width: 80px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    line-height: 40px;
    margin-left: 2px;
    display: block;
    flex-shrink: 0;
      font-size: 12px;
  }
  .previewSceneList .previewSceneListBox .previewSceneListContent .previewSceneName a.ri,
  .previewSceneList .previewSceneListBox .previewSceneListContent .previewSceneName a.ye{
    background: #F8D5A1;
    font-size: 12px;
    height: 20px;
    line-height: 20px;
    padding: 0 10px;
    margin-left: 18px;
    border-radius: 4px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .previewSceneList .previewSceneListBox .previewSceneListContent .previewSceneName a.ye{
    background: rgba(125,225,255,.6);
  }

  .collect-content .previewContentBox .previewContent p a{
    color: #666;
    cursor: pointer;
    font-size: 14px;
    margin: 0 4px;
    padding: 0 4px;
  }
  .collect-content .previewContentBox .previewContent a.changhao{
    background: #ffc776;
  }

  .collect-content .previewContentBox .previewContent a.changjing{
    background: #b0eeaa;
  }

  .collect-content .previewContentBox .previewContent a.qifen{
    background: #ef76dc;
  }

  .collect-content .previewContentBox .previewContent a.xingming,
  .collect-content .previewContentBox .previewContent a.actor{
      background:rgba(249,192,168,1);
  }

  .collect-content .previewContentBox .previewContent a.tianqi,
  .collect-content .previewContentBox .previewContent a.weather{
      background:rgba(241,239,28,1);
  }
  .collect-content .previewContentBox .previewContent a.daoju,
  .collect-content .previewContentBox .previewContent a.tool{
      background:#5DDC9A;
  }
  .collect-content .previewContentBox .previewContent a.special_tool{
      background:rgba(130,239,255,1);
  }
  .collect-content .previewContentBox .previewContent a.special_effect{
      background:rgba(255,199,118,1);
  }
  .collect-content .previewContentBox .previewContent a.dress_makeup{
      background:rgba(253,170,175,1);
  }


  .previewHead .previewHeadInput.el-textarea .el-textarea__inner{
    height: 50px;
    max-height: 50px;
  }

  #preview .el-menu--collapse > .el-menu-item .iconfont{
      vertical-align: middle;
      width: 24px;
      text-align: center;
      font-size: 18px;
      display: block;
      margin: 0 auto;
  }

  #preview .el-menu--collapse > .el-menu-item .iconfont p{
      margin-top: -20px;
  }

  #preview .el-menu--collapse > .el-menu-item.height{
      height: 75px;
  }

  #preview .el-menu--collapse > .el-menu-item .iconfont{
      margin-top: -8px;
  }

  @media screen and (max-width: 1500px) {

    .previewPerformerMenu .el-tabs__header .el-tabs__nav-scroll .el-tabs__nav {
      padding: 0 32%;
    }
    .previewPerformerMenu .el-tabs__header .el-tabs__nav-scroll .el-tabs__nav .el-tabs__active-bar {
      left: 32.4%;
    }
    .previewSceneList .previewSceneListBox .previewSceneListContent .previewSceneName a.changjing{
      width: 64px;
      text-align: left;
      overflow: hidden;
    }
    .previewSceneList .previewSceneListBox .previewSceneListContent .previewSceneName a.ri,
    .previewSceneList .previewSceneListBox .previewSceneListContent .previewSceneName a.ye{
      margin-left: 10px;
    }
    .collect-content .previewContentBox .previewCollapse .el-collapse-item__content{
      padding: 20px 100px;
    }
    .collect-content .previewContentBox .previewCollapse .el-collapse-item__header{
      padding: 0 100px;
    }
  }
  @media screen and (max-width: 1300px){

    .collect-content .previewContentBox .previewCollapse .el-collapse-item__content{
      padding: 20px 70px;
    }
    .collect-content .previewContentBox .previewCollapse .el-collapse-item__header{
      padding: 0 60px;
    }
  }
</style>
<style scoped>
    /*添加场景*/
    #preview .addSelectForm .sceneSelectBox{
        width: 84px;
        margin-right: 8px;
    }

  #menu{
    display:none;
    position:fixed;
    /*width:125px;*/
    background: #f9f9f9;
    border-radius: 10px;
    overflow: hidden;
      box-shadow: 0 0 6px #d9d8e1;
      border: 1px solid #ebebf0;

  }
  #menu ul{
    margin-bottom: 0;
    width: 160px;
    height: 308px;
    border-radius: 6px;
    padding: 0 0 10px 0;
    box-sizing: border-box;
      background-color: #ffffff;
  }

  #menu ul .menuTitle{
      width: 100%;
      background-color: #f5f5f7;
  }

  #menu ul .menuTitle .icon{
      margin: 10px;
  }

  #menu ul li{
    height:42px;
    /*width:120px;*/
    line-height:36px;
    /*text-align:center;*/
    list-style:none;
    cursor: pointer;
    display: flex;
    align-items: center;
  }

  #menu ul li:hover{
    background:rgba(63,62,106,0.1);;
    user-select: none;
  }

  #menu ul li .menuColor{
    border-radius: 4px;
    margin: 0 10px 0;
    width: 16px;
    height: 16px;
  }

  #menu ul li:nth-child(2) .menuColor{
    background-color: #ffffff;
      border: 1px solid #C5C5D2 ;

  }

  #menu ul li:nth-child(3) .menuColor{
    background-color: #F9C0A8;

  }

  #menu ul li:nth-child(4) .menuColor{
    background-color: #5DDC9A;
  }

  #menu ul li:nth-child(5) .menuColor{
    background-color: #82EFFF;
  }

  #menu ul li:nth-child(6) .menuColor{
    background-color:#FDAAAF;
  }

  #menu ul li:nth-child(7) .menuColor{
      background-color: #FFC776;
  }

  /* 引导 */
  .previewGuide{
    position: absolute;
    /* top: 1008px; */
    left: -600px;
    z-index: -1
  }

  .previewContentSetting .previewTopBtn{
    height: 36px;
    font-size: 18px;
    text-align: center;
    line-height: 36px;
    border-radius: 5px;
    margin-right: 20px;
    cursor: pointer;
  }


  .previewContentSetting .previewTopBtn img{
    margin-right: 4px;
    margin-top: -2px;
  }

  .previewContentSetting .previewTopBtn.performerRouter{
    width: 134px;
    height: 40px;
    background: #fff;
    line-height: 40px;
    border: 1px solid #ddd;
    color: #666;
    display: inline-block;
    margin-left: 20px;
  }

  .previewContentSetting .previewTopBtn.performerRouter:hover{
    background: #eee;
  }

  .previewContentSetting .savePreview{
    width: 74px;
    height: 40px;
    color: #666;
    text-align: center;
    line-height: 40px;
    /*display: inline-block;*/
    cursor: pointer;
    /*float: right;*/
    margin-top: 10px;
    /*border-bottom: 1px solid #ddd;*/
      opacity: 0.8;
  }

  .previewContentSetting .savePreview i{
      color: rgba(237,149,21,1);
  }

  .previewContentSetting .savePreview:hover{
    color: rgba(237,149,21,1);
  }

  .previewContentSetting .routerScene{
      margin-top: 10px;
      color: rgba(237,149,21,1);
      margin-left: 14px;
  }

  .previewContentSetting .routerScene i{
      font-size: 20px;
  }

  .previewContentSetting .textOne{
      margin-bottom: -12px;
      opacity: 0.6;
  }

  #toolbar .buttons span{
    font-size: 14px;
    font-weight: 700;
    color: #999;
  }

  #toolbar .buttons:hover span{
    color: #333;
  }

  .script-container{
    width: 100%;
    height: 100%;
    /*margin-top: 40px;*/
    /*margin-bottom: 100px;*/
  }

  .script-wrapper{
    width: 100%;
    margin: 0 auto;
    height: 100%;
    /*padding: 40px 60px 0px 40px;*/
  }

  .script-container .script-wrapper .script-movie-content{
    width: 1160px;
    border: solid 1px #dddddd;
    padding: 20px 30px ;
    font-family: MicrosoftYaHei;
    font-size: 12px;
    font-weight: normal;
    color: #666666;
    display: none;
    height: 600px;
    overflow-x: hidden;
    overflow-y: scroll;
  }

  .script-movie-content .content{
    width: 100%;
    font-size: 12px;
    line-height: 1.5;
  }

  .script-movie-content .pagination,
  .collect-right .pagination{
    height: 25px;
    width: 100%;
    text-align: center;
    margin-top: 50px;
    margin-bottom: 21px;
  }

  .pagination span{
    height: 25px;
    line-height: 25px;
    color: #999999;
    font-family: NSimSun;
    font-size: 12px;
    text-align: center;
    border-radius: 5px;
    cursor: pointer;
    border: solid 1px #dddddd;
    padding: 8px;
    margin-left: 8px;
  }

  .collect-content{
    width: 100%;
    /*height: 97vh;*/
    height: 100%;
    overflow: hidden;
    /*padding-top: 31px;*/
    box-sizing: border-box;
    padding: 16px 20px 0 0;
    display: flex;
    justify-content: space-between;
  }

  .collect-content .collect-left{
    /*float: left;*/
    width: 80px;
    height: 100%;
    margin-left: 12px;
    background-color: #fff;
    box-sizing: border-box;
    border-radius: 5px;
    overflow: hidden;
    box-shadow: 0 0 6px 2px #d9d8e1;
  }


  /*.collect-content .collect-left:hover{*/
  /*overflow-y: scroll;*/
  /*}*/

  .collect-left h3 {
    font-family: MicrosoftYaHei;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #333;
    margin: 0;
    border-bottom: 1px solid #ddd;
    background: #fff;
    height: 42px;
    width: 100%;
    line-height: 42px;
    text-align: center;
    box-sizing: border-box;
    /*position: fixed;*/
    border-radius: 5px 5px 0 0;
  }

  .collect-left .collect-list{
    /*width: 190px;*/
    /*clear: both;*/
    /*margin-top: 42px;*/
    padding-top: 16px;
    overflow-x: hidden;
    overflow-y: scroll;
    height: calc(100% - 42px);
    width: 100%;
    /*box-sizing: border-box;*/
  }

  .collect-list .list-item{
    width: 24px;
    height: 24px;
    /*float: left;*/
    border: 1px solid #ddd;
    border-radius: 5px;
    font-family: MicrosoftYaHei;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    color: #666;
    text-align: center;
    line-height: 24px;
    margin: 0 0 16px 25px;
    box-sizing: border-box;
  }
  .collect-list .list-item.active{
    background: #ED9515;
    border-color: #ED9515;
    color: #Fff;
  }
  .collect-content .collect-right{
    width: auto;
    /*height: 91vh;*/
    /*height: 888px;*/
    /*margin-top: 20px;*/
    /*height: 88.5vh;*/
    height: calc(100vh - 70px);
    /*margin-left: 6%;*/
    font-size: 14px;
    /*padding: 22px 30px;*/
    font-family: MicrosoftYaHei;
    color: #666666;
    /*overflow: hidden;*/
    display: flex;
    justify-content: space-between;
  }
  .collect-content .previewSceneList{
    width: 250px;
    height: 100%;
    background: #fff;
    border-radius: 5px;
    /*float: left;*/
    margin-left: 12px;
    overflow-y: hidden;
    overflow-x: hidden;
    /*box-shadow: 0 0 6px 2px #d9d8e1;*/
    border: 1px solid #e4e4ea;
  }
  .collect-content .previewSceneList .previewSceneListTitle{
    width: 250px;
    font-family: MicrosoftYaHei;
    font-size: 14px;
    color: #333;
    padding-left: 10px;
    border-bottom: 1px solid #ddd;
    background: #fff;
    height: 42px;
    line-height: 42px;
    text-align: left;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    border-radius: 5px 5px 0 0;
  }
  .collect-content .previewSceneList .previewSceneListBox{
    width: 100%;
    /*height: 86.3vh;*/
    height: calc(100% - 42px);
    /*margin-top: 42px;*/
    overflow-y: scroll;
    overflow-x: hidden;
  }
  .collect-content .previewSceneList .previewSceneListBox .previewSceneListContent{
    width: 100%;
    height: 40px;
    border-bottom: 1px solid #ddd;
    border-top: none;
    line-height: 40px;
    padding-left: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #666;
    cursor: pointer;
    overflow-x: visible;
    position: relative;
    border-left: 2px solid #fff;
  }

  .collect-content .previewSceneList .previewSceneListBox .previewSceneListContent:first-child{
    /*margin-top: 8px;*/
  }
  .collect-content .previewSceneList .previewSceneListBox .previewSceneListContent:hover,
  .collect-content .previewSceneList .previewSceneListBox .previewSceneListContent.is-active{
    background: #EBEBF0;
      border-left-color: #ED9515;
  }
  .previewSceneList .previewSceneListBox .previewSceneListContent .previewSceneName{
    display: flex;
    align-items: center;
    height: 40px;
    width: calc(100% - 40px);
    overflow: hidden;
    font-size: 12px;
  }
  .collect-content .previewSceneList .previewSceneListBox .previewSceneListContent .previewSceneMenu{
    margin-right: 20px;
    height: 28px;
    width: 16px;
    margin-top: 1px;
    background: url("../../assets/foldMenuIcon.png") no-repeat right;
  }
  /*.collect-content .previewSceneList .previewSceneListBox .previewSceneListContent .previewSceneMenu:hover{*/
    /*background-image: url("../../assets/foldMenuHoverIcon.png");*/
  /*}*/
  .collect-content .previewSceneList .previewSceneListBox .previewSceneMenuOpen{
    position: absolute;
    background: #fff;
    width: 90px;
    border-radius: 2px;
    height: 100px;
    z-index: 100;
    /*right: 6px;*/
    top: 39px;
    left: 150px;
    box-shadow: 0 0 10px #d9d8e1;
  }
  .collect-content .previewSceneList .previewSceneListBox .previewSceneMenuOpen .previewSceneMenuBtn{
    border-bottom: 1px solid rgba(210,210,210,0.6);
    width: 100%;
    color: rgba(0,0,0,.8);
    height: 33px;
    line-height: 33px;
    font-size: 12px;
    cursor: pointer;
  }
  .collect-content .previewSceneList .previewSceneListBox .previewSceneMenuOpen .previewSceneMenuBtn:last-of-type{
    border-bottom: none;
  }
  .collect-content .previewSceneList .previewSceneListBox .previewSceneMenuOpen .previewSceneMenuBtn:hover{
    background: #eee;
  }

  .collect-content .previewSceneList .previewSceneListBox .previewSceneMenuOpen .previewSceneMenuBtn>.iconfont{
    color: #8887a2;
    font-size: 14px;
    line-height: 33px;
    margin: 0 6px 0 10px;
  }

  .collect-content .previewSceneList .previewSceneListBox .previewSceneMenuOpen .previewSceneMenuBtn>.iconfont.nomargin{
      margin: 0 0 0 4px;
  }

  .collect-content .collect-right .content{
    width: 100%;
    font-size: 12px;
    line-height: 1.5;
  }

  .previewPerformerMenu{
    width: 400px;
    float: right;
    height: calc(100vh - 70px);
    overflow: hidden;
    border-radius: 5px;
    background: #fff;
    display: flex;
    /*box-shadow: 0 0 6px 2px #d9d8e1;*/
      border: 1px solid #e4e4ea;
  }
  .previewMenuLeft{
    width: 45px;
    flex-shrink: 0;
      border-left: 2px solid #D9D8E1;
  }

  /*.previewMenuLeft .previewRightIcon{*/
    /*background: url("../../assets/previewRightIcon2.png") 60%/78% no-repeat;*/
    /*width: 26px;*/
    /*height: 26px;*/
    /*margin-top: 12px;*/
    /*border-radius: 4px;*/
      /*!*margin-left: 6px;*!*/
      /*!*background-color: #EBEBF0;*!*/
  /*}*/
  /*.previewMenuLeft .el-menu-item:nth-of-type(2) .previewRightIcon{*/
    /*background-image: url("../../assets/previewRightIcon1.png");*/
  /*}*/
  /*.previewMenuLeft .el-menu-item:nth-of-type(3) .previewRightIcon{*/
    /*background-image: url("../../assets/previewRightIcon3.png");*/
  /*}*/
  /*.previewMenuLeft .el-menu-item.is-active .previewRightIcon{*/
    /*background-image: url("../../assets/previewRightIconActive2.png");*/
    /*!*background-color: #ed9515;*!*/
  /*}*/
  /*.previewMenuLeft .el-menu-item:nth-of-type(2).is-active .previewRightIcon{*/
    /*background-image: url("../../assets/previewRightIconActive1.png");*/
    /*!*background-color: #ed9515;*!*/
  /*}*/
  /*.previewMenuLeft .el-menu-item:nth-of-type(3).is-active .previewRightIcon{*/
    /*background-image: url("../../assets/previewRightIconActive3.png");*/
    /*!*background-color: #ed9515;*!*/
  /*}*/


  .previewHead{
    width: 500px;
    background: #ffffff;
    padding: 20px 6%;
    box-sizing: border-box;
    overflow-y: scroll;
      color: #8C8BA6;
  }

  .previewHead .previewHeadInput{
    width: 100%;
    margin-bottom: 20px;
    height: 30px;
    border: none;
    border-bottom: 1px solid #ddd;
    font-size: 12px;
  }

  .previewHead .previewHeadInput.el-textarea{
      border-bottom: none;
  }

  .previewHead .previewHeadInput:focus{
      border-bottom-color: rgba(255,105,14,1);
  }
  .previewHead .previewHeadInput:last-of-type{
    /*margin: 30px 0;*/
  }

  .previewHead .sceneSelectBox{
    /*float: left;*/
    /*width: 98px;*/
    height:24px !important;
    background:rgba(243,243,243,1);
    border:1px solid rgba(210,210,210,1);
    border-radius:4px;
      margin-top: 10px;
      margin-bottom: 20px;
  }
  .previewHead .sceneSelectBox:nth-of-type(2){
    margin-left: 4%;
    width: 98px;
  }
  .previewHead .previewHeadLabel{
    width: 100%;
    border-radius: 5px;
    border-color: #ddd;
    padding: 8px;
    min-height: 78px;
    box-sizing: border-box;
      font-size: 12px;
  }
  .previewHead .previewHeadSubmit{
    width:94px;
    height:28px;
    font-size:16px;
    color:rgba(255,255,255,1);
    text-align: center;
    line-height: 28px;
    background:rgba(237,149,21,1);
    border-radius:15px;
    margin: 90px auto 0;
    cursor: pointer;
  }

  .previewHead.previewPerformer{
    padding: 14px 0 20px;
  }

  .previewHead.previewPerformer .previewRightHead{
    display: flex;
    height: 35px;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #EEEEEE;
    margin-bottom: 15px;
    padding: 0 10px;
    margin-left: 12px;
      /*margin-top: 26px;*/
  }

  .previewHead.previewPerformer.previewScene .previewRightHead{
    margin-left: 0;
    margin-right: 12px;
    padding-left: 22px;
  }

  .previewHead.previewPerformer .previewRightHead span{
    color: #000;
    font-size:14px;
      opacity: 0.8;
  }

  .previewHead.previewPerformer .previewRightHead .previewRightHeadBtn{
    font-size:12px;
    color:rgba(237,149,21,1);
    cursor: pointer;
      opacity: 0.8;
  }

  .previewHead .previewPerformerName{
    cursor: pointer;
    height: 34px;
    width: auto;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }

  .previewHead .previewPerformerName:nth-of-type(even){
    background: #F6F6F6;
  }
  .previewHead .previewPerformerName .defaultPerformerBox{
    padding-left: 22px;
  }
  .previewHead .previewPerformerName span{
    text-align: left;
    line-height: 34px;
    font-size:12px;
    color:rgba(110,110,110,1);
    width: 40%;
    display: inline-block;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .previewHead .previewPerformerName:hover span{
    color: #ED9515;
  }

  .previewHead .previewPerformerName .previewPerformerBtn{
    margin-left: 32%;
    opacity: 0;
    transition: opacity .4s;
    margin-bottom: 10px;
  }

  .previewHead .previewPerformerName .previewPerformerBtn:last-of-type{
    margin-left: 5%;
  }

  .previewHead .previewPerformerName:hover .previewPerformerBtn{
    opacity: 1;
  }

  .previewHead .editPerformerBox{
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 12px;
    box-sizing: border-box;
    opacity: 0;
  }

  .previewHead .editPerformerBox input{
    border: 1px solid #ED9515;
    border-radius: 5px;
    height: 24px;
    width: 50%;
    padding-left: 10px;
    box-sizing: border-box;
  }

  .previewHead .editPerformerBox .previewPerformerBtn{
    opacity: 1;
    font-size: 18px;
    color: #ED9515;
    margin-bottom: 0;
  }

  .collect-content .previewContentBox{
    width: 1200px;
    height: calc(100vh - 70px);
    background: #fff;
    border-radius: 5px;
    overflow: hidden;
    margin:0 12px;
    /*box-shadow: 0 0 6px 2px #d9d8e1;*/
    border: 1px solid #e4e4ea;
  }
  .collect-content .previewContentBox .previewCollapseBox{
    border: none;
  }

  .collect-content .previewContentBox .previewCollapseDisabledBox{
    border-bottom: 1px solid #E5E5E5;
      height: 68px;
      text-align: center;
      line-height: 68px;
  }
  .collect-content .previewContentBox .previewCollapse{
    margin-bottom: 0;
  }
  /*.collect-content .previewContentBox .previewCollapse .previewCollapseIcon{*/
    /*width: 30px;*/
    /*height: 30px;*/
    /*border-radius: 50%;*/
    /*border: 1px solid #ddd;*/
    /*background: #fff url("../../assets/previewCollapseIcon.png") no-repeat 5px;*/
    /*background-size: 18px;*/
    /*position: absolute;*/
    /*top: 52px;*/
    /*right: 50%;*/
    /*line-height: 24px;*/
    /*text-align: center;*/
  /*}*/
  /*.collect-content .previewContentBox .previewCollapse .previewCollapseIcon:hover{*/
    /*border-color: #459df5;*/
    /*background-image: url("../../assets/previewCollapseIconHover.png");*/
  /*}*/
  .collect-content .previewContentBox .previewContentSetting{
    width: 100%;
    height: 68px;
    line-height: normal;
    border-color: #ddd;
    /*padding: 0 190px;*/
    display: flex;
    justify-content: center;
    align-items: center;
      font-size: 12px;
  }

  .collect-content .previewContentBox .previewContentSetting input{
    border: none;
    border-bottom: 1px solid #ddd;
    height: 26px;
    text-align: center;
    font-size: 16px;
    color: #666;
    width: 60px;
    margin-top: 10px;
  }

  .collect-content .previewContentBox .previewContentSetting input:focus{
    border: none;
    border-bottom: 1px solid #ED9515;
  }
  .collect-content .previewContentBox .previewContentSetting input:last-child{
    width: 200px;
    /*margin-left: 40px;*/
  }
  .collect-content .previewContentBox .previewContentSetting .sceneSelectBox{
    width: 80px;
    height: 30px;
    margin-top: 10px;
    /*margin-left: 10px;*/
  }

  .collect-content .previewContentBox .previewContentOut{
      width: 100%;
      height: calc(100% - 118px);
  }

  .collect-content .previewContentBox .previewContent{
    width: 100%;
    height: 100%;
    padding: 30px 166px 0;
    color: #666;
    line-height: 30px;
    letter-spacing: 2px;
    overflow-y: scroll;
    box-sizing: border-box;
  }
  .collect-content .previewContentBox .previewHelp{
    position: fixed;
    width: 35px;
    height: 35px;
    top: 180px;
    right: 24%;
    background: url("../../assets/previewHelp.png") no-repeat 100%;
    cursor: pointer;
  }
  .collect-content .previewContentBox .previewHelp:hover{
    background-image: url("../../assets/previewHelpHover.png");
  }

  .collect-content .previewContentBox .previewBottomTip{
      width:100%;
      height:20px;
      background:rgba(50,197,143,0.3);
      display: flex;
      align-items: center;
      padding-left: 16px;
  }

  .collect-content .previewContentBox .previewBottomTip i{
      color: #239168;
      font-size: 14px;
      margin: 1px 10px 0 0;
  }

  .collect-content .previewContentBox .previewBottomTip p{
      font-size:12px;
      line-height: 14px;
      color:rgba(35,145,104,1);
  }

  .collect-content .previewContentBox .previewBottomTip p span{
      font-size:12px;
      line-height: 14px;
      color:rgba(35,145,104,1);
      cursor: pointer;
      text-decoration: underline;
  }

  .collect-content .previewContentBox .previewBottomBox{
    width: 100%;
    height: 30px;
    background-color: #F5F5F7;
    color: #666;
  }
  .collect-content .previewContentBox .previewBottomBox .previewBottomLeftBox{
    float: left;
    margin-left: 4px;
    height: 100%;
    padding: 5px 0;
      box-sizing: border-box;
  }
  .previewContentBox .previewBottomBox .previewBottomLeftBox .previewBottomLeft{
    float: left;
    height: 100%;
    line-height: 20px;
    padding: 0 8px;
    font-size: 12px;
      color:rgba(63,62,106,0.8);
  }
  .previewContentBox .previewBottomBox .previewBottomLeftBox .previewBottomLeft img{
    vertical-align: top;
    margin-top: 2px;
    margin-right: 5px;
  }
  .previewContentBox .previewBottomBox .previewBottomLeftBox .previewBottomLeft:nth-child(2) img{
    margin-top: 3px;
  }

  .collect-content .previewContentBox .previewBottomBox .previewBottomRightBox{
    float: right;
    display: flex;
    align-items: center;
    height: 100%;
    font-size: 12px;
    margin-right: 2%;
      color:rgba(63,62,106,0.8);
      font-family:MicrosoftYaHei;
  }
  .previewContentBox .previewBottomBox .previewBottomRightBox .previewBottomRightTips{
    height: 20px;
    width: auto;
    padding: 0 8px;
    font-size: 12px;
    margin-left: 8px;
      background:rgba(249,192,168,1);
      border-radius: 2px;
      color: rgba(0,0,0,.8);
      line-height: 20px;
  }
  .previewContentBox .previewBottomBox .previewBottomRightBox .previewBottomRightTips:nth-child(2){
      background:rgba(93,220,154,1);
  }
  .previewContentBox .previewBottomBox .previewBottomRightBox .previewBottomRightTips:nth-child(3){
      background:rgba(130,239,255,1);
  }
  .previewContentBox .previewBottomBox .previewBottomRightBox .previewBottomRightTips:nth-child(4){
      background:rgba(253,170,175,1);
  }
  .previewContentBox .previewBottomBox .previewBottomRightBox .previewBottomRightTips:nth-child(5){
      background:rgba(255,199,118,1);
  }

  .loading{
      position: absolute;
      left: 70px;
      top: 62px;
      width: calc(100vw - 100px);
      height: calc(100vh - 98px);
      z-index: 0;
      background: #f9f9f9;
  }

  .loading .loadingIcon{
      position: absolute;
      left: 48%;
      top: 44%;
  }

  .loading.noResult .loadingIcon{
      left: 47.6%;
  }

  /*视频遮罩*/
  #preview .videoShade{
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: 1999;
      background: rgba(0,0,0,0.3);
  }

  #preview .videoShade .projectLead{
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

  #preview .videoShade i{
      color: #fff;
      font-size: 40px;
      position: absolute;
      top: 20px;
      right: 2.6%;
      cursor: pointer;
  }

  #footer{
    display: none;
  }

  @media screen and (max-width: 1500px) {
    #toolbar .previewTopBtn.savePreview {
      margin-right: 95px;
    }
    .collect-content .previewSceneList,
    .collect-content .collect-left{
      margin-left: 15px;
    }
    .collect-content .collect-left{
      width: 68px;
    }
    .collect-list .list-item{
      margin-left: 22px;
    }
    .collect-content .previewSceneList,
    .collect-content .previewSceneList .previewSceneListTitle,
    .tabs.previewPerformerMenu {
      width: 220px;
    }
    .collect-content .previewContentBox{
      margin: 0 12px;
    }
    .collect-content .previewContentBox .previewContent{
      padding: 58px 100px 0;
    }

    .collect-content .previewContentBox .previewHelp{
      right: 23%;
    }

    .previewHead .previewPerformerName .previewPerformerBtn{
      margin-left: 25%;
    }

  }
  @media screen and (max-width: 1300px){
    .collect-content .previewSceneList,
    .collect-content .collect-left{
      margin-left: 10px;
    }
    .collect-content .collect-left{
      width: 60px;
    }
    .collect-list .list-item{
      margin-left: 16px;
    }
    .collect-content .previewContentBox{
      margin: 0 10px;
      width: 1000px;
    }
    .collect-content .previewContentBox .previewContent{
      padding: 30px 60px 0;
    }
    /*.collect-content .previewContentBox .previewContentSetting{*/
      /*padding: 0 80px;*/
    /*}*/
    .collect-content .previewContentBox .previewHelp{
      right: 23%;
    }
    .previewHead .previewPerformerName .previewPerformerBtn{
      margin-left: 24%;
    }

    .previewContentSetting .routerScene{
      margin-left: 0px;
    }
    /*.collect-content .previewContentBox .previewContentSetting input:last-child,*/
    /*.collect-content .previewContentBox .previewContentSetting .sceneSelectBox{*/
      /*margin-left: 30px;*/
    /*}*/
  }
</style>
