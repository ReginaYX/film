<template>
  <div id="scene">
    <!--加载圈-->
    <div class="loadingBox errorBox" v-if="error">
      <div class="speedBox">
        <img src="../../assets/sceneError.png" alt="">
        <div class="errorTitle">咦？解析失败了!</div>
        <div class="errorDesc">
          文档空白没有内容？您可能是没有选择合适的剧本格式？<br/>
          <router-link class="link" :to="'/control/tipsChoice?project_id='+$route.query.project_id">从哪里选择呢</router-link>？
          不知道<router-link class="link" to="/control/tipsFormat">专业剧本写作格式</router-link>？<br/>
          不要担心，如果该资源对您 很重要，请<span>联系管理员</span>或者点击<span @click="newtext" class="againBox">重新上传<input class="script-file" type="file" name="play" style="opacity: 0;" id="file" @change="getFile($event)"></span><br/>有非幕，不迷路，这就带你回家。
        </div>
        <div class="errorBtnBox">
          <router-link  :to="{path: '/control/list'}" class="errorBtn">返回列表</router-link>
          <div class="errorBtn" @click="feedbackDialog=true">反馈入口</div>
        </div>
      </div>
    </div>


    <div v-else>
      <div id="content_right_biaoge" class="content_right_biaoge" v-if="info">
        <div class="menu">
          <div class="menuTitle">
            <div class="menuTitleLeft">
              <img src="../../assets/merge.png">
              <span>合并演员至</span>
            </div>
            <div class="menuTitleName">【<span>{{seachActorName.title}}</span>】</div>
          </div>
          <div class="menuContentBox">
            <div class="menuContent">
              <div class="menuContentTitle">推荐合并</div>
              <div class="actorBox">
                <div class="actorName"
                     v-for="item in seachActors.recommend"
                     @click="actorsMerge(item.actor_id,item.role_name)">
                  {{item.role_name}}
                </div>
              </div>
            </div>
            <div class="menuContent">
              <div class="menuContentTitle">演员列表</div>
              <div class="actorBox list">
                <div class="actorName"
                     v-for="item,index in seachActors.otherall"
                     :key="index"
                     @click="actorsMerge(item.actor_id,item.role_name)">
                  {{item.role_name}}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>

          <!--<div class="sceneTopBox">-->
          <ul class="topBox sceneTopBox">
            <li class="details_button">
              <el-popover
                placement="bottom-start"
                width="340" popper-class="screenPopover"
                trigger="click" v-model="filterVisible">
                <el-tabs tab-position="left" class="screenTab">
                  <el-tab-pane label="日/夜">
                    <el-checkbox-group v-model="checked.dn" @change="filter" v-if="airList.length>0">
                      <el-checkbox v-for="(item, index) in airList" :key="index"  :label="item" border></el-checkbox>
                    </el-checkbox-group>
                    <p v-else>暂无数据</p>
                  </el-tab-pane>
                  <el-tab-pane label="内/外">
                    <el-checkbox-group v-model="checked.io" @change="filter" v-if="airIOList.length>0">
                      <el-checkbox v-for="(item, index) in airIOList" :key="index"  :label="item" border></el-checkbox>
                    </el-checkbox-group>
                    <p v-else>暂无数据</p>
                  </el-tab-pane>
                  <el-tab-pane label="场景">
                    <el-checkbox-group v-model="checked.scene" @change="filter" v-if="selectList.length>0">
                      <el-checkbox v-for="(item, index) in selectList" :key="index"  :label="item.names" border></el-checkbox>
                    </el-checkbox-group>
                    <p v-else>暂无数据</p>
                  </el-tab-pane>
                  <el-tab-pane label="角色">
                    <el-checkbox-group v-model="checked.actor" @change="filter" v-if="actorNames.length>0">
                      <el-checkbox v-for="(item, index) in actorNames" :key="index" :label="item.names" border></el-checkbox>
                    </el-checkbox-group>
                    <p v-else>暂无数据</p>
                  </el-tab-pane>
                </el-tabs>
                <div slot="reference" class="screening">筛选<i class="el-icon-caret-bottom"></i></div>
              </el-popover>
            </li>

            <li class="details_button toPreview" @click="preview">
              <i class="iconfont iconxiugai1"></i>极速调整
            </li>

            <li class="details_button download" v-if="payDialog.isPay">
              <div class="download " @click="payDialog.dialogVisible=true">
                <!--<div class="download " @click="download" v-if="download_auth !== ''">-->
                <img src="../../assets/excelDown.gif" alt="">
                <span>导出</span>
              </div>
            </li>
            <li class="details_button download" v-else>
              <div class="download " @click="download" style="background: #3f3e6a">
                <img src="../../assets/excelDown1.gif" alt="">
                <span>导出</span>
              </div>
            </li>
            <!--下载预览-->
            <transition name="el-zoom-in-top">
              <div class="shadeBox" v-show="downLoadPreview">
                <el-carousel arrow="always" class="downLoadPreview">
                  <el-carousel-item v-for="item in 4" :key="item">
                    <h3>{{ item }}</h3>
                  </el-carousel-item>
                </el-carousel>
              </div>
            </transition>
            <!--微信支付浮窗-->
            <transition name="el-zoom-in-top">
              <div class="payCodeBox" v-show="innerVisible">
                <div class="innerVisibleBox" id="wxpayCodeBox">
                  <!--<img src="../../assets/paySuccess.png" alt="" class="payInside" v-if="payResult">-->
                  <img class="payInside" :src="payInsideSrc">
                  <div class="payDesc">微信扫码完成支付</div>
                  <!--<div class="payDesc payResult" v-if="payResult">{{payResult}}</div>-->
                </div>
              </div>
            </transition>
            <!--支付宝支付浮窗-->
            <transition name="el-zoom-in-top">
              <div class="payCodeBox" v-show="alipayDialog">
                <div class="innerVisibleBox alipayVisibleBox" id="alipayCodeBox">
                  <!--<img src="../../assets/paySuccess.png" alt="" class="payInside" v-if="payResult">-->
                  <iframe class="alipayQRcode" src=""></iframe>
                  <div class="payDesc">支付宝扫码完成支付</div>
                  <!--<div class="payDesc payResult" v-if="payResult">{{payResult}}</div>-->
                </div>
              </div>
            </transition>

            <!--顺场支付弹窗-->
            <el-dialog class="payBox scenePayBox" :title="name" :visible.sync="payDialog.dialogVisible" center @closed="payStep=1">
              <el-steps :active="payStep" align-center class="scenePayStepBox">
                <el-step title="确认订单"></el-step>
                <el-step title="订单支付"></el-step>
                <el-step title="支付成功"></el-step>
              </el-steps>
              <div class="downLoadMain" v-if="payStep==1">
                <div class="countBox">
                  <div class="countItemBox">
                    <div class="countItemLeft">顺场景表下载</div>
                    <div class="countItemRight"></div>
                  </div>
                  <div class="countItemBox">
                    <div class="countItemLeft">场次数量</div>
                    <div class="countItemRight">{{payDialog.sceneNum}}场次</div>
                  </div>
                  <div class="countItemBox">
                    <div class="countItemLeft">单价</div>
                    <div class="countItemRight"><span class="desc">限时折扣￥0.3/场 </span><span class="discount"> ￥0.5/场</span></div>
                  </div>
                  <div class="countItemBox">
                    <div class="countItemLeft">优惠方式</div>
                    <div class="countItemRight">限时打折</div>
                  </div>
                  <div class="countItemBox">
                    <div class="countItemLeft">小计</div>
                    <div class="countItemRight">￥{{payDialog.scenePrice/10}}</div>
                  </div>
                </div>
                <div class="countBox">
                  <div class="countItemBox">
                    <div class="countItemLeft">分场景表下载/人物戏量统计表</div>
                    <div class="countItemRight"><span class="desc">随产品赠送</span></div>
                  </div>
                  <div class="countItemBox">
                    <div class="countItemLeft">分场景表场次数量</div>
                    <div class="countItemRight">{{payDialog.sceneNum}}场次</div>
                  </div>
                  <div class="countItemBox">
                    <div class="countItemLeft">场次数量</div>
                    <div class="countItemRight">{{payDialog.sceneNum}}场次</div>
                  </div>
                  <div class="countItemBox">
                    <div class="countItemLeft">单价</div>
                    <div class="countItemRight">￥0.00</div>
                  </div>
                </div>
                <div class="couponBox">
                  <div class="couponTopBox">
                    <div class="couponTitle" v-if="coupon.length!=0">使用优惠券 ∨</div>
                    <div class="couponTitle" v-else>使用优惠券</div>
                    <div class="couponNum" v-if="coupon.length==0">暂无可用优惠券</div>
                    <div class="couponNum" v-else-if="couponValue.discount&&coupon.length!=0">－￥{{couponValue.discount}}</div>
                    <div class="couponNum" v-else>－￥0</div>
                  </div>
                  <div class="couponContentBox" v-if="coupon.length!=0">
                    <div class="couponBtn" @click="couponScroll('prev')"><i class="el-icon-arrow-left"></i></div>
                    <div class="scrollBox">
                      <ul id="couponScroll" style="left: 0px">
                        <li v-for="item in coupon" :key="item.coupon_id" @click="currentSel(item.coupon_id)">
                          <div class="couponItemTop">
                            <div class="couponNum">￥{{item.discount}}</div>
                            <div class="couponDesc">满{{item.restrict}}可用</div>
                          </div>
                          <div class="couponDate">有效期至{{item.expire_at | dateChange}}</div>
                        </li>
                      </ul>
                    </div>
                    <div class="couponBtn" @click="couponScroll('next')"><i class="el-icon-arrow-right"></i></div>
                  </div>
                </div>
                <div class="totalBox">
                  <div class="totalTop">
                    <div class="totalTitle">实付金额：</div>
                    <div class="totalNum">￥{{payDialog.total}}</div>
                  </div>
                  <div class="memberBox">
                    <div class="desc">开通会员,不限场次随心下载</div>
                    <router-link to="/recharge" class="btn">开通会员</router-link>
                  </div>
                </div>
                <div class="downLoadDesc">
                  <div class="left"><span>*</span>提示：若开通下载功能后场次数量增加，需增补场次数量差价</div>
                  <!--<div class="right">预览示例图</div>-->
                </div>
                <div class="stepBtn" @click="payStep = 2">确认订单</div>
              </div>
              <div class="downLoadMain" v-else-if="payStep==2">
                <div class="totalBox">
                  <div class="totalTop">
                    <div class="totalTitle">实付金额：</div>
                    <div class="totalNum">￥{{payDialog.total}}</div>
                  </div>
                  <div class="memberBox">
                    <div class="desc">开通会员,不限场次随心下载</div>
                    <router-link to="/recharge" class="btn">开通会员</router-link>
                  </div>
                </div>
                <div class="payMethodBox">
                  <div class="payMethodTitleBox">
                    <div class="payMethodTitle">请选择以下支付方式</div>
                  </div>
                  <el-radio-group v-model="payDialog.payMethodRadio" class="payMethodRadio">
                    <el-radio :label="1" class="payMethodItem" border><i class="iconfont iconweixin2"></i>微信支付</el-radio>
                    <el-radio :label="2" class="payMethodItem" border><i class="iconfont iconbig-Pay"></i>支付宝支付</el-radio>
                  </el-radio-group>
                </div>
                <div class="stepBtn" @click="PayButtom">确认支付</div>
              </div>
              <div class="downLoadMain payFinish" v-else-if="payStep==3">
                <i class="iconfont iconchenggong"></i>支付成功
              </div>
            </el-dialog>

          </ul>
        </div>

        <vxe-grid border :row-class-name="tableRow" class="sceneTable" show-header-overflow
            :columns="tableHead" align="center" show-overflow :cell-class-name="tableCell" @header-cell-click="headCellHandle"
            :data="tableMain" :header-cell-class-name="tableHeadCell" height="98%" @cell-click="cellHandle"
            :optimization="{scrollX: {gt: 800}}" ref="sceneTable">
        </vxe-grid>

      </div>

      <!--loading圈-->
      <div class="loading" v-else-if="info=='' && enter == 'loading'">
        <i class="el-icon-loading loadingIcon"></i>
        <span style="position: absolute;width: 216px;left: 48%;top: 50%;margin-left:-100px;font-size: 16px;letter-spacing: 2px">非幕始终保障您的数据安全</span>
      </div>

      <!--加载圈-->
      <div class="loadingBox" v-else-if="info=='' && enter == ''">
        <div class="speedBox">
          <div class="speedTitle">{{speedTitle}}</div>
          <div class="waitTxt"><i class="iconfont iconshijian"></i>预计时间{{waitTxt}}分钟，请耐心等待</div>
          <el-steps :active="speedActive" class="loadingSteps">
            <el-step title="上传剧本" icon="iconfont iconsuccess"></el-step>
            <el-step title="正在解码" icon="iconfont iconsuccess"></el-step>
            <el-step title="解码成功" icon="iconfont icon4 iconCircle"></el-step>
            <el-step title="检查标注" icon="iconfont iconjiancha iconCircle"></el-step>
          </el-steps>
          <p class="speedDesc">
            <span>小非温馨提示：</span>
            剧本解析成功后可使用剧本标注对内容进行调整与修改。创建项目后，可邀请团队成员进行协作，轻松解决沟通困扰。
          </p>
          <img src="../../assets/sceneLoadingBg.gif" alt="">
        </div>
      </div>

      <!--<div v-else></div>-->
    </div>
    <a id="target" style="display: none"></a>
    <!--引导-->
    <div id="walkthrough-content" style="display: none">
      <div id="walkthrough-1">
        欢迎进入非幕制片体验教程
        <p>帮助你快速了解非幕制片</p>
        <p>点击下一步了解更多...</p>
      </div>
      <div id="walkthrough-2">
        点击这里可以快速合并编辑演员
        <p>举例：如您发现 段小楼 小楼 段老板为同演员时，您可将他们的戏份快速合并到一起。</p>
        <img src="../../assets/guide.gif" class="guideImg">

      </div>
      <div id="walkthrough-3">
        点击这里可以快速跳转编辑场次内容
      </div>
      <div id="walkthrough-4">设定筛选条件
        <p>如您可勾选气氛信息为：日/内 场景信息为：剧院， 非幕将帮您筛选出全部相关的戏份。</p>
      </div>
    </div>
    <!--无权限弹框-->
    <no-access :noAccessVisible="noAccess" @close="(v)=>{noAccess = v}"></no-access>
    <!--反馈弹框-->
    <el-dialog title="意见反馈" :visible.sync="feedbackDialog" width="500px" center class="addDialog feedbackDialog">
      <el-form :model="feedbackForm" ref="feedbackValidateForm" class="addFormBox">
        <el-form-item class="margin"
            label="反馈内容" prop="content" :rules="[{ required: true, message: '反馈内容不能为空',trigger:'blur'}]">
          <el-input v-model="feedbackForm.content" clearable  placeholder="请详细描述您的问题或建议，我们将及时跟进解决。" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="上传照片" prop="files" class="margin">
          <el-upload
              list-type="picture-card" multiple :auto-upload='false'
              ref="uploadMakeup" :class="['photoUpload',hideUpload?'hide':'']"
              action="#" :limit='5' :on-remove="()=>{hideUpload = false}"
              accept=".jpg,.png" :before-remove="removePhoto" :on-change="onChange">
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item class="margin"
                      label="联系方式（推荐手机或邮箱）" prop="contact">
          <el-input v-model="feedbackForm.contact" clearable  placeholder="请留下您的联系方式，以便我们联系您。"></el-input>
        </el-form-item>
      </el-form>
        <div class="addDialogFooter">
          <div class="addFooterBtn" @click="submitFeedback">提交</div>
          <div class="addFooterBtn" @click="resetForm('feedbackValidateForm')">返回</div>
        </div>
    </el-dialog>
  </div>
</template>
<script>
    import axios from "axios"
    import global_ from '../../common/Global'
    import virtualList from 'vue-virtual-scroll-list'
    export default {
        name: "scene",
        data () {
            var that = this;
            return {
                downLoadPreview:false,//下载预览
                type_name:'',//类型名
                tableHead:[],
                tableMain:[],
              actorNames:[],
              selectList:[],
              checked:{
                actor:[],
                scene:[],
                dn:[],
                io:[]
              },//筛选选项
                payStep:1,//支付步骤
                coupon:[],//优惠券
                couponId:'',//选择的优惠券id
                couponValue:'',//选择的优惠券
                payResult:'',//支付结果
                pwdNdDialog:false,
                outBalance:'',//余额
                payDialog:{
                    payChecked:true,//下载抵扣复选框
                    payMethodRadio:1,//下载方式微信
                    dialogVisible:false,//下载弹框
                    sceneNum:'',//场次数量
                    scenePrice:'',//场次合计
                    actorNum:'',//演员数量
                    s_sceneNum:'',//场景
                    balance:'',//余额
                    total:'',//总价
                    rmb:'',//人民币
                    isPay:true,//是否下载过
                    deduction:'',//抵扣多少
                },
                payInsideSrc:'',//支付图片路径
                innerVisible:false,//下载内层弹窗
                alipayDialog:false,//支付宝弹框
              filterVisible:false,//筛选弹框
              activeNames: ['1','2','3','4',],//筛选按钮展开框
              inputSearch:'',//頭部搜索
              tableData:[],
              tableLength:0,
              originalTableData:[],
              activeIndex:'',//顶栏菜单
              allPerformer:'',//显示全部演员
              enter: 'true',//是否加载过
              qrcode:false,
              root: 'test-hot',
              airList:[],//气氛列表
              airIOList:[],//内外列表
              info :'',
              hot:'',
              name:'',
              state1: '',
              sessions_id:'',
              actors_id:'',
              input3 : '',
              restaurants: [],
              operation_type:'',
              utl:{},
              saveData:[],
              cells_o:[],
              ret:true,
              error:false,
              feedbackDialog:false,//反馈弹窗
              hideUpload:false,//反馈添加按钮
              feedbackForm:{
                  contact:'',
                  content:'',
                  files:[]
              },//反馈数据
              play:this.$route.query.play_id,
              seconds:0,
              speedTitle:'您的剧本已上传成功',//解析文本
              waitTxt:'1',//等待文本
              speedActive:1,//解析步骤
              director:'',
              type:'',
              play_file:'',
              user_id:localStorage.getItem("user_id").replace("\"","").replace("\"",""),
              project_id:'',
              play_id:'',
              poster_path:'',
              linage:'',
              head_style:'',
              i:0,
              t1:'',
              seachActors:[], //演员右键搜索
              seachActorName:'',//搜索的演员名
              actorTotal:[],//演员id
              sessionTotal:[],//场次id
              actorChildren:'',//演员lenght
              is_default:'',//默认项目
              authId:0,//权限信息
              noAccess:false,//无权限弹框
              host: global_.pathInfo,
              worker:'',
              origin:'',//原始数据
              thead:'',//表头
              fixedVisible: true,//右侧固定
              trLeft:[],//左侧数据
            }
        },
        components: {'virtual-list': virtualList },
        methods:{
            //表格行
            tableRow(seq){
                if(seq.row.dn == '日'||seq.row.dn == '晨'||seq.row.dn == '午'||seq.row.dn == '凌晨'||seq.row.dn == '清晨'||seq.row.dn == '早晨'||seq.row.dn == '早上'||seq.row.dn == '白天'||seq.row.dn == '中午'||seq.row.dn == '正午'||seq.row.dn == '晌午'||seq.row.dn == '午后'||seq.row.dn == '黄昏'){
                    return 'dayRow'
                }else if(seq.row.dn == '夜'||seq.row.dn == '傍晚'||seq.row.dn == '晚'||seq.row.dn == '晚上'||seq.row.dn == '午夜'||seq.row.dn == '夜晚'||seq.row.dn == '黑夜'){
                    return 'nightRow'
                }else{
                    return 'nullRow'
                }
            },
            //表格单元格
            tableCell(seq){
                if(seq.column.own.title == '页码量'){
                    return 'pageTh tableTr'
                }else if(seq.column.own.width == '34'){
                    return 'nameTh tableTr'
                }else if(seq.column.own.title == '调整'){
                    return 'iconTh tableTr'
                } else if(seq.column.own.title == '场次'){
                    return 'linkTh tableTr'
                }else{
                    return 'tableTr'
                }
            },
            //表头单元格
            tableHeadCell(seq){
                if(seq.column.own.title == '页码量'){
                    return 'tableHeadTh pageTh'
                }else if(seq.column.own.width == '34'){
                    return 'tableHeadTh nameTh'
                }else{
                    return 'tableHeadTh'
                }
            },
            //单元格点击
            cellHandle(value,event){
                if(value.column.own.title == '场次'||value.column.own.title == '调整'){
                    localStorage.setItem('previewSceneId', value.row.session_id);
                    this.$router.push('/preview?play_id='+this.$route.query.play_id+'&project_id='+this.$route.query.project_id+'&episode_num='+value.row.episode)
                }
            },
            headCellHandle(value,event){
                if(value.column.level == '2'){
                    this.seachActorName = value.column.own
                    axios.get('/play/actors_search', {
                        params: {
                            name: value.column.own.title,
                            play_id: this.$route.query.play_id
                        }
                    }).then((response)=> {
                        let arr = response.data.data;
                        this.seachActors = arr;
                        this.$nextTick( ()=> {
                            //获取我们自定义的右键菜单
                            var menu=document.querySelector(".menu");

                            //根据事件对象中鼠标点击的位置，进行定位
                            menu.style.left=event.clientX+8+'px';
                            menu.style.top=event.clientY+'px';

                            //改变自定义菜单的宽，让它显示出来
                            menu.style.display='block';
                        })
                    })

                }
                //关闭右键菜单，很简单
                window.onclick=function() {

                    //用户触发click事件就可以关闭了，因为绑定在window上，按事件冒泡处理，不会影响菜单的功能
                    if (document.querySelector('.menu')) {
                        document.querySelector('.menu').style.display = 'none';
                    }
                }
            },
            //优惠券滚动
            couponScroll(type){
                var content = document.getElementById("couponScroll");
                if(type == 'next'){
                    if(468+content.offsetLeft*-1>=content.offsetWidth){
                        return
                    }else{
                        content.style.left = content.offsetLeft - 156 + 'px';
                    }
                }else{
                    if(content.offsetLeft>=0){
                        return
                    }else{
                        content.style.left = content.offsetLeft + 156 + 'px';
                    }
                }
            },
            //上传图片
            removePhoto(file, fileList){
                let index = fileList.findIndex(d => d.name == file.name);
                this.feedbackForm.files.splice(index,1)
            },
            onChange(file, fileList) {
                const isJPG = file.raw.type === 'image/jpeg';
                const isPNG = file.raw.type === 'image/png';

                if (!isJPG && !isPNG) {
                    this.$message.error('上传凭证图片只能是 JPG/PNG 格式!');
                }
                this.feedbackForm.files.push(file.raw);
                this.hideUpload = fileList.length>=5
                return isJPG && isPNG;
            },
            submitFeedback(){
                this.$refs['feedbackValidateForm'].validate((valid) => {
                    if (valid) {
                        axios({
                                url:'/feedback/commit',
                                method: 'post',
                                headers:{
                                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                                    'Accept':'*/*'
                                },
                                data: this.feedbackForm,
                                transformRequest: [function (data) {
                                    let ret = ''
                                    for (let it in data) {
                                        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                                    }
                                    return ret
                                }]
                            }
                        ).then((response) => {
                            if(response.data.msg == 'ok'){
                                this.$message('感谢您的建议，我们将尽快和您联系');
                                this.feedbackDialog = false;
                                this.feedbackForm.files = [];
                                this.resetForm('feedbackValidateForm')
                            }
                        })
                    }
                })
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.feedbackForm.files = [];
            },
            //使用优惠券
            currentSel(value){
                    let index = this.coupon.findIndex(d => d.coupon_id == value);
                    if($('#couponScroll li').eq(index).attr("class")=='active'){
                        $('#couponScroll li').eq(index).removeClass("active");
                        this.couponValue = '';
                        this.couponId = '';
                        this.payDialog.total = this.payDialog.scenePrice/10
                    }else{
                        $('#couponScroll li').eq(index).addClass("active").siblings().removeClass("active");
                        this.couponValue = this.coupon[index];
                        this.couponId = value;
                        this.payDialog.total = (this.payDialog.scenePrice - (this.couponValue.discount*10))/10
                    }
            },
            PayButtom(){
                // this.$axios({
                //     method: 'get',
                //     url: '/coupon/use?coupon_id='+this.couponId,
                //     headers:{
                //         'Content-type': 'application/x-www-form-urlencoded'
                //     }
                // }).then((response)=> {
                    if (this.payDialog.payMethodRadio == 1){
                        this.payChat()
                    } else {
                        this.alipay()
                    }
                // })
            },
            //支付宝支付
            alipay(){

                axios.get('/pay/alipay/unifiedorder_project', {
                    params:{
                        user_id: this.user_id,
                        project_id: this.$route.query.project_id,
                        fee: this.payDialog.scenePrice * 10,
                        coupon_id: this.couponId,
                    }
                }).then((response)=> {
                    if(response.data.ret == '0'){
                        //二维码
                        this.$nextTick( ()=> {
                            document.getElementsByClassName('alipayQRcode')[0].src = response.data.data.url;
                            this.alipayDialog = true;
                            var documentHandler = (e)=>{
                                var sp = document.getElementById("alipayCodeBox");
                                if(sp){
                                    if(!sp.contains(e.target)){
                                        this.alipayDialog = false;
                                    }
                                }
                            }

                            document.addEventListener('click', documentHandler);

                        })
                        this.order_id = response.data.data.order_id;

                        // 订单查询接口
                        var payLoad = window.setInterval(() => {
                            axios.get('/order/status', {
                                params:{
                                    order_id: this.order_id,
                                }
                            }).then((response)=> {
                                if(this.alipayDialog == false){
                                    window.clearInterval(payLoad);
                                }
                                if(response.data.ret == '0'){
                                    this.alipayDialog = false;
                                    this.payStep = 3;
                                    window.clearInterval(payLoad);
                                    var payClose = window.setTimeout(() => {
                                        this.payDialog.dialogVisible = false
                                        this.payDialog.isPay = false
                                    },3000)
                                    this.download()
                                }
                            })
                        }, 3000);
                    }else{
                        this.$message.error(response.data.msg);
                    }
                })
            },
            //微信支付
            payChat(){

                axios.get('/pay/wxpay/unifiedorder_project', {
                    params:{
                        user_id: this.user_id,
                        project_id: this.$route.query.project_id,
                        fee: this.payDialog.scenePrice * 10,
                        coupon_id: this.couponId,
                    }
                }).then((response)=> {
                    if(response.data.ret == '0'){
                        //二维码
                        this.innerVisible = true;
                        this.payInsideSrc = response.data.data.img;
                        this.order_id = response.data.data.order_id;
                        var documentHandler = (e)=>{
                            var sp = document.getElementById("wxpayCodeBox");
                            if(sp){
                                if(!sp.contains(e.target)){
                                    this.innerVisible = false;
                                }
                            }
                        }
                        document.addEventListener('click', documentHandler);

                        // 订单查询接口
                        var payLoad = window.setInterval(() => {
                            axios.get('/order/status', {
                                params:{
                                    order_id: this.order_id,
                                }
                            }).then((response)=> {
                                if(this.innerVisible == false){
                                    window.clearInterval(payLoad);
                                }
                                if(response.data.ret == '0'){
                                    this.innerVisible = false;
                                    this.payStep = 3;
                                    window.clearInterval(payLoad);
                                    var payClose = window.setTimeout(() => {
                                        this.payDialog.dialogVisible = false
                                        this.payDialog.isPay = false
                                    },3000)
                                    this.download()
                                }
                            })
                        }, 3000);

                    }else{
                        this.$message.error(response.data.msg);
                    }
                })
            },

            download(){
                var href = this.host+'/file/download/extract_result?project_id='+this.$route.query.project_id+'&user_id='+this.user_id
                document.getElementById('target').href= href
                document.getElementById('target').click()
            },

            //生成错误跳转
            feedbacks(){
                this.$router.push('/feedback')
            },
          //演员合并
          actorsMerge(id,name){
              if(this.authId==1){
                  this.$confirm('确认将“'+name+'”演员合并至“'+this.seachActorName.title+'”演员吗？', '演员合并', {
                      confirmButtonText: '确定',
                      cancelButtonText: '取消'
                  }).then(() => {
                      let form = new FormData;
                      let arr = [{"parent":this.seachActorName.field,"children":[id]}]
                      form.append('payload', JSON.stringify(arr));
                      form.append('project_id', this.$route.query.project_id);
                      axios.post('/play/actors_merge', form
                      ).then((response) => {
                          if(response.data.ret == 0){
                              axios({
                                  method: 'get',
                                  url: '/play/extract_result?play_id='+this.$route.query.play_id,
                                  headers:{
                                      'Content-type': 'application/x-www-form-urlencoded'
                                  }
                              }).then((response)=> {
                                  if(response.data.ret=='0'){
                                      response.data.data.head[0].width = '55';
                                      response.data.data.head[1].width = '55';
                                      response.data.data.head[2].width = '106';
                                      response.data.data.head[3].width = '126';
                                      response.data.data.head[4].width = '55';
                                      response.data.data.head[5].width = '55';
                                      response.data.data.head[6].width='46';
                                      response.data.data.head[7].width = '218';
                                      for(let i=0;i<response.data.data.head[8].children.length;i++){
                                          response.data.data.head[8].children[i].title = response.data.data.head[8].children[i].title.replace(/&nbsp;/ig,'');
                                          response.data.data.head[8].children[i].title = response.data.data.head[8].children[i].title.replace(/\s*/g,"");
                                          response.data.data.head[8].children[i].width='34';
                                      }
                                      response.data.data.head[9].width = '98';
                                      response.data.data.head[10].width = '60';
                                      response.data.data.head[11].width = '150';
                                      response.data.data.head[12].width = '102';
                                      response.data.data.head[13].width = '118';
                                      response.data.data.head[14].width = '92';
                                      response.data.data.head[15].width = '146';
                                      if(this.type_name != '电视剧'){
                                          response.data.data.head.splice(0,1)
                                      }
                                      response.data.data.head.push({title:'调整',field:'tiao',width:'56',
                                          slots: {
                                              default: ({ row, column }) => {
                                                  return [<i class="iconfont iconxiugai1"></i>]
                                              }
                                          }
                                      });
                                      this.tableHead = response.data.data.head;
                                      this.tableMain = response.data.data.body;
                                      this.info = '1';
                                      this.actorTotal = response.data.data.head[8].children;
                                      this.nameData();
                                  }
                              })
                              this.$message({
                                  type: 'success',
                                  message: '合并成功'
                              });
                          }
                      })

                  })
              }else{
                  this.noAccess = true
              }
          },

          //筛选
          filter(){
              axios.get('/play/extract_result_filter',{
                  params:{
                      payload : JSON.stringify(this.checked),
                      play_id : this.$route.query.play_id
                  }
              }).then((response)=> {
                if (response.data.ret == '0') {
                    response.data.data.head[0].width = '55';
                    response.data.data.head[1].width = '55';
                    response.data.data.head[2].width = '106';
                    response.data.data.head[3].width = '126';
                    response.data.data.head[4].width = '55';
                    response.data.data.head[5].width = '55';
                    response.data.data.head[6].width='46';
                    response.data.data.head[7].width = '218';
                    for(let i=0;i<response.data.data.head[8].children.length;i++){
                        response.data.data.head[8].children[i].title = response.data.data.head[8].children[i].title.replace(/&nbsp;/ig,'');
                        response.data.data.head[8].children[i].title = response.data.data.head[8].children[i].title.replace(/\s*/g,"");
                        response.data.data.head[8].children[i].width='34';
                    }
                    response.data.data.head[9].width = '98';
                    response.data.data.head[10].width = '60';
                    response.data.data.head[11].width = '150';
                    response.data.data.head[12].width = '102';
                    response.data.data.head[13].width = '118';
                    response.data.data.head[14].width = '92';
                    response.data.data.head[15].width = '146';
                    if(this.type_name != '电视剧'){
                        response.data.data.head.splice(0,1)
                    }
                    response.data.data.head.push({title:'调整',field:'tiao',width:'56',
                        slots: {
                            default: ({ row, column }) => {
                                return [<i class="iconfont iconxiugai1"></i>]
                            }
                        }
                    });
                    this.tableHead = response.data.data.head;
                    this.tableMain = response.data.data.body;
                    this.info = '1';
                }
              })
          },

          //获取姓名
          nameData(){
            axios.get('/play/actors_all',{
              params:{
                page_size:'100',
                page_num: '1',
                play_id : this.$route.query.play_id
              }
            }).then((response)=> {
              if(response.data.ret == '0'){
                this.payDialog.actorNum = response.data.data.length;
                for(var i = 0; i < response.data.data.length ; i++){
                  if(response.data.data[i] != null){
                    let obj = {names:response.data.data[i].role_name,id:response.data.data[i].actor_id};
                    this.actorNames.push(obj)
                  }
                }

              }
            })
          },

          //拿场景名称
          sceneName(){
            axios.get('/play/scenes_all',{
              params:{
                page_size:'1000',
                page_num: '1',
                play_id : this.$route.query.play_id
              }
            }).then((response)=> {
              if(response.data.ret == '0'){
                this.payDialog.s_sceneNum = response.data.data.length
                for(var i = 0; i < response.data.data.length ; i++){
                  if(response.data.data[i] != null){
                    let j = { region: '', realAddress: '', date1:[,],
                      dynamicValidateForm: {
                        domains: [{
                          value: ''
                        }],
                      },
                    }
                    let obj = {names:response.data.data[i].scene_name,sizeForm:j,id:response.data.data[i].scene_id};
                    this.selectList.push(obj)
                  }
                }
              }
            })
          },
            editor(){
                this.$router.push('/control/edit?project_id='+this.$route.query.project_id);
            },
            circleProgress () {
              if(this.waitTxt == '20'){
                var timerTimeCount = window.setInterval(()=> {
                  this.seconds++;
                  if (this.seconds >= 10) {
                    this.speedActive = 2;
                    this.speedTitle = '正在解码...道具识别'
                  }
                  if (this.seconds >= 40) {
                    this.speedTitle = '正在解码...人名识别'
                  }
                  if (this.seconds >= 80) {
                    this.speedTitle = '正在解码...场次识别'
                  }
                  if (this.seconds >= 99) {
                    window.clearInterval(timerTimeCount);
                    timerTimeCount = null;
                  }
                }, 5000);
              }else{
                var timerTimeCount = window.setInterval(()=> {
                  this.seconds++;
                  if (this.seconds >= 14) {
                    this.speedActive = 2;
                    this.speedTitle = '正在解码...道具识别'
                  }
                  if (this.seconds >= 40) {
                    this.speedTitle = '正在解码...人名识别'
                  }
                  if (this.seconds >= 80) {
                    this.speedTitle = '正在解码...场次识别'
                  }
                  if (this.seconds >= 99) {
                    window.clearInterval(timerTimeCount);
                    timerTimeCount = null;
                  }
                }, 1000);
              }
                this.t1=window.setInterval(this.fetchTable, 6000);
            },

            preview(){
                this.$router.push({name:'preview',query:{play_id:this.$route.query.play_id,project_id:this.$route.query.project_id}});
            },

          //重新上传
            newtext(){
                if(this.authId==1){
                    document.querySelector('#file').click();
                }else{
                    this.noAccess = true
                }

            },
            getFile(e){
                let deviceFile = e.target.files;
                this.play_file = deviceFile[0];
                if(this.play_file){
                    let formData = new FormData()
                    formData.append('user_id', this.user_id);
                    formData.append('name', this.name);
                    formData.append('director', this.director);
                    formData.append('type', this.type);
                    formData.append('play', this.play_file);
                    formData.append('linage', this.linage);
                    formData.append('head_style',this.head_style);
                    axios({
                        method: 'post',
                        url: '/project/create',
                        data: formData,
                        headers:{
                            'Content-Type': 'multipart/form-data',
                            'Accept': '*/*',
                            'X-Requested-With': 'XMLHttpRequest'
                        }
                    }).then((response)=> {
                        if(response.data.msg == 'ok') {
                            this.error =false;
                            this.project_id = response.data.data.project_id
                            this.play_id = response.data.data.play_id
                            let formData = new FormData()
                            formData.append('play_id', this.play_id)
                            axios({
                                method: 'post',
                                url: '/project/delete',
                                data: {
                                    user_id: this.user_id,
                                    project_id: this.$route.query.project_id
                                },
                                transformRequest: [function (data) {
                                    let ret = ''
                                    for (let it in data) {
                                        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                                    }
                                    return ret
                                }],
                                headers: {
                                    'Content-type': 'application/x-www-form-urlencoded'
                                }
                            }).then((response) => {
                                if (response.data.msg == 'ok') {
                                    this.$router.push('/details/scene?play_id=' + this.play_id + '&project_id=' + this.project_id)
                                    this.$router.go(0)
                                }
                            })
                        }
                    })
                }
            },
            //处理数据
            handleTableData(n){
              let n1 = n+1;
              if(this.origin.length <= 200*n1){
                var arr = this.origin.slice(200 *n, this.origin.length);
              }else{
                var arr = this.origin.slice(200 *n, 200 * n1);
              }
              this.worker = this.$worker.run(
                n => {
                  for (let i = 0; i < n.length; i++) {
                    n[i].splice(0,2);
                    for (let m = 6; m < n[i].length - 4; m++) {
                      if (n[i][m] != '') {
                        n[i][m] = '<i class="el-icon-check"></i>'
                      }
                    }
                  }
                  // for (let i = 1; i < n.length; i++) {
                  //   for (let m = 7; m < n[i].length - 4; m++) {
                  //     if (n[i][m] != '') {
                  //       n[i][m] = '<i class="el-icon-check"></i>'
                  //     }
                  //   }
                  // }
                  // for (let i = 0; i < n.length; i++) {
                  //   n[i].shift();
                  // }
                  return n
                }, [arr])
                .then(res => {
                  this.tableData = this.tableData.concat(res);
                  var sessionBox = document.querySelectorAll('#hot-preview>.trBox');
                  for(let i=1; i<sessionBox.length; i++){
                    sessionBox[i].childNodes[0].addEventListener('click',()=>{
                      localStorage.setItem('previewSceneId', this.sessionTotal[i-1]);
                      this.$router.push('/preview?play_id='+this.$route.query.play_id+'&project_id='+this.$route.query.project_id+'&episode_num='+this.origin[i][0])
                    },false);
                  }
                  if(this.origin.length > 200*n1){
                    this.handleTableData(n1);
                  }
                })
            },
            fetchTable(){
              axios.get('/project/info', {
                  params: {
                      project_id: this.$route.query.project_id
                  }
              }).then((data)=> {
                  this.type_name = data.data.data.type_name;
                  if(data.data.data.extract_status == 2){
                      this.ret=false;
                      if(data.data.msg =='统筹表生成错误'){
                          this.error =true;
                          localStorage.removeItem(this.play)
                          clearInterval(this.t1);
                      }
                  }else if(data.data.data.extract_status == 3){
                      this.ret=false;
                      this.error =true;
                      clearInterval(this.t1);
                      localStorage.removeItem(this.play)
                  }else if(data.data.data.extract_status == 1){
                      var formData = new FormData();
                      formData.append('play_id', this.$route.query.play_id);
                      var that = this;
                    axios({
                      method: 'get',
                      url: '/play/extract_result?play_id='+this.$route.query.play_id,
                      headers:{
                        'Content-type': 'application/x-www-form-urlencoded'
                      }
                    }).then((response)=> {
                      if(response.data.ret=='1'){
                        this.ret=false;
                        if(response.data.msg =='统筹表生成错误'){
                          this.error =true;
                          clearInterval(this.t1);
                          localStorage.removeItem(this.play)
                        }
                      }else{
                          clearInterval(this.t1);
                          this.downloadCheck();
                          response.data.data.head[0].width = '55';
                          response.data.data.head[1].width = '55';
                          response.data.data.head[2].width = '106';
                          response.data.data.head[3].width = '126';
                          response.data.data.head[4].width = '55';
                          response.data.data.head[5].width = '55';
                          response.data.data.head[6].width='46';
                          response.data.data.head[7].width = '218';
                          for(let i=0;i<response.data.data.head[8].children.length;i++){
                              response.data.data.head[8].children[i].title = response.data.data.head[8].children[i].title.replace(/&nbsp;/ig,'');
                              response.data.data.head[8].children[i].title = response.data.data.head[8].children[i].title.replace(/\s*/g,"");
                              response.data.data.head[8].children[i].width='34';
                          }
                          response.data.data.head[9].width = '98';
                          response.data.data.head[10].width = '60';
                          response.data.data.head[11].width = '150';
                          response.data.data.head[12].width = '102';
                          response.data.data.head[13].width = '118';
                          response.data.data.head[14].width = '92';
                          response.data.data.head[15].width = '146';
                          if(data.data.data.type_name != '电视剧'){
                              response.data.data.head.splice(0,1)
                          }
                          response.data.data.head.push({title:'调整',field:'tiao',width:'56',
                              slots: {
                                  default: ({ row, column }) => {
                                      return [<i class="iconfont iconxiugai1"></i>]
                                  }
                              }
                          });
                          this.tableHead = response.data.data.head;
                          this.tableMain = response.data.data.body;
                          this.info = '1';
                        this.actorTotal = response.data.data.head[8].children;
                        this.worker = this.$worker.run(
                          data => {
                            let arr ={dn:[],io:[]};
                            for(let i=0; i<data.length; i++){
                              arr.dn.push(data[i].dn)
                              arr.io.push(data[i].io)
                            }
                            return arr
                          }, [response.data.data.body])
                          .then(res => {
                            var dn = new Set(res.dn);
                            var io = new Set(res.io);
                            var dnList = [...dn];
                            var ioList = [...io];
                            for(let l=0; l<dnList.length; l++){
                              if(dnList[l] != null && dnList[l] != ""){
                                this.airList.push(dnList[l]);
                              }
                            }
                              for(let l=0; l<ioList.length; l++){
                                  if(ioList[l] != null && ioList[l] != ""){
                                      this.airIOList.push(ioList[l]);
                                  }
                              }
                          })
                          .catch(e => console.log(e));
                        this.sceneName();
                        this.nameData();
                        localStorage.setItem(this.$route.query.play_id,'true');
                          this.$nextTick(() => {
                              document.getElementById('content_right_biaoge').onselectstart = new Function("event.returnValue=false");
                              document.onkeydown=function (e) {
                                  if(e.keyCode == 65 && (navigator.platform.match('Mac') ? e.metaKey : e.ctrlKey)){
                                      e.preventDefault();
                                  }
                              }
                          })

                      }
                    })
                  }
              })
            },
          //新手引导
          reard(){

            // if(this.is_default == '1'){
            if(this.$route.query.project_id == '1'){
                //新手引导2，加演示器
                setTimeout(() => {
                    this.$nextTick(()=>{
                        this.$intro().setOptions({
                            'prevLabel':'&larr; 上一步',
                            'nextLabel':'下一步 &rarr;',
                            'skipLabel':'跳过',
                            steps:  [
                                {
                                    element: document.querySelector('#hot-preview .thBox:nth-child(8)'),  // 在对应的元素上加上 id="#step1"
                                    intro: '<div id="">\n' +
                                    '        点击这里可以快速合并编辑演员\n' +
                                    '        <p>举例：如您发现 段小楼 小楼 段老板为同演员时，您可将他们的戏份快速合并到一起。</p>\n' +
                                    // '        <img src="../../assets/guide.gif" >\n' +
                                    '\n' +
                                    '      </div>', // 导航显示的内容， 可以加图片
                                    position: 'bottom'  // 导航现实的位置
                                },
                                {
                                    element:document.querySelector( '#hot-preview .trBox:nth-child(2) .thBox'),
                                    intro: '<div id="">\n' +
                                    '        点击这里可以快速跳转编辑场次内容\n' +
                                    '      </div>\n' +
                                    '      <div id="">设定筛选条件\n' +
                                    '        <p>如您可勾选气氛信息为：日/内 场景信息为：剧院， 非幕将帮您筛选出全部相关的戏份。</p>\n' +
                                    '      </div>',
                                    position: 'bottom'
                                },
                            ],
                        }).start();
                        // .oncomplete(function () {
                        //     console.log('completed');
                        // }).onchange(()=>{
                        //     // 点击下一步导航的回调
                        //
                        // }).onbeforechange(function(targetElement) {
                        //     // 点击下一步导航前的回调
                        //     alert("before new step");
                        // }).onafterchange(()=>{
                        //     // 点击下一步导航后的回调
                        //
                        // })
                    })
                }, 1000)
              $("body").pagewalkthrough({
                name: "introduction",
                steps: [{
                  popup: {
                    content: "#walkthrough-1",
                    // 弹出方式 : modal/tooltip/mohighlight
                    type: "modal"
                  }
                }, {
                  wrapper: "#hot-preview .trBox>div:nth-child(n+8) .thBox",
                  popup: {
                    content: "#walkthrough-2",
                    type: "tooltip",
                    position: "left"
                  }
                }, {
                  wrapper: "#hot-preview .trBox:nth-child(2) .thBox",
                  popup: {
                    content: "#walkthrough-3",
                    type: "tooltip",
                    position: "right"
                  }
                }, {
                  wrapper: ".screening",
                  popup: {
                    content: "#walkthrough-4",
                    type: "tooltip",
                    position: "bottom"
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

                onClose:(n)=>{
                  setTimeout(()=>{
                    this.$router.push('/preview?play_id='+this.$route.query.play_id+'&project_id='+this.$route.query.project_id)
                  }, 600);
                },
                // onClose:()=>{
                //   localStorage.setItem('enter',['scene'])
                // }
              });
              $('body').pagewalkthrough('show');
              document.getElementById('jpwOverlay').style.display = 'block';
              document.getElementById('jpWalkthrough').style.display = 'block';
            }
          },
            //下载校验
            downloadCheck(){
                axios({
                    method: 'get',
                    url: '/pay/project/cost?project_id='+this.$route.query.project_id,
                    headers:{
                        'Content-type': 'application/x-www-form-urlencoded'
                    }
                }).then((response)=> {
                    if(response.data.ret=='0'){
                        if(response.data.data !== 0){
                            if(response.data.data>0){
                                this.payDialog.isPay = true
                                this.payDialog.scenePrice =  response.data.data;
                                this.payDialog.sceneNum = this.payDialog.scenePrice/3;
                                this.payDialog.total =  response.data.data/10;
                                //获取代金券
                                this.$axios.get('/coupon/get_user_coupon', {
                                    params: {
                                        user_id: JSON.parse(localStorage.user_id),
                                        status: '0',
                                        fee: response.data.data/10
                                    }
                                }).then((response)=> {
                                    this.coupon = response.data.data
                                })
                            }else{
                                this.payDialog.isPay = false
                            }
                        }else{
                            this.payDialog.isPay = false
                        }
                    }
                });
            },
        },
        mounted () {
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
            this.reard();
            this.activeIndex = this.$route.path;
            var that = this;

            //获取项目信息
            axios.get('/project/info', {
                params: {
                    project_id: this.$route.query.project_id
                }
            }).then((response)=> {
                this.name = response.data.data.name;
                this.director = response.data.data.director;
                this.type = response.data.data.type;
                this.linage = response.data.data.linage;
                this.head_style = response.data.data.head_style;
                this.operation_type = response.data.data.operation_type;
                this.is_default = response.data.data.is_default;
                if(response.data.data.type == '2'){
                  this.waitTxt = '20'
                }
                this.fetchTable()
            })
            if(localStorage.getItem(this.play)){
                if(localStorage.getItem(this.play) !== 'true'){
                  this.seconds = localStorage.getItem(this.play);
                  if (this.seconds >= 10) {
                    this.speedActive = 2;
                    this.speedTitle = '正在解码...道具识别'
                  }
                  if (this.seconds >= 40) {
                    this.speedTitle = '正在解码...人名识别'
                  }
                  if (this.seconds >= 80) {
                    this.speedTitle = '正在解码...场次识别'
                  }
                }
            }

            // 元素
            if (this.info=='' && localStorage.getItem(this.$route.query.play_id) !== 'true'){
                this.enter = ''
            }else if(this.info=='' && localStorage.getItem(this.$route.query.play_id) == ''){
                this.enter = ''
            }else if(localStorage.getItem(this.$route.query.play_id) == 'true'){
                this.enter = 'loading'
            }
            window.addEventListener("beforeunload", (event)=> {
              if(localStorage.getItem(this.$route.query.play_id)){
                if(localStorage.getItem(this.$route.query.play_id) == 'true'){
                  return
                }else{
                  localStorage.setItem(this.$route.query.play_id,this.seconds)
                }
              }else{
                localStorage.setItem(this.$route.query.play_id,this.seconds)
              }
              clearInterval(this.t1);
            });
        },

        watch: {
          actorChildren:function(){
            for (var i = 7; i < this.actorChildren ; i++ ){
              var trBox = document.getElementsByClassName('trBox')[0].children[i];
              if(trBox != undefined){
                var that = this;
                trBox.onclick=function(e){
                  if (e.target.innerText == '次要角色' || e.target.innerText == '天气'){
                    document.getElementsByClassName('.menu').style.display = 'none';
                  }
                  that.seachActorName = e.target.innerText
                  axios.get('/play/actors_search', {
                    params: {
                      name: e.target.innerHTML,
                      play_id: that.$route.query.play_id
                    }
                  }).then((response)=> {
                    let arr = response.data.data;
                    that.seachActors = arr;
                    that.$nextTick( ()=> {
                      //获取我们自定义的右键菜单
                      var menu=document.querySelector(".menu");

                      //根据事件对象中鼠标点击的位置，进行定位
                      menu.style.left=e.clientX+'px';
                      menu.style.top=e.clientY+'px';

                      //改变自定义菜单的宽，让它显示出来
                      menu.style.display='block';
                    })
                  })

                }
                //关闭右键菜单，很简单
                window.onclick=function(e) {

                  //用户触发click事件就可以关闭了，因为绑定在window上，按事件冒泡处理，不会影响菜单的功能
                  if (document.querySelector('.menu')) {
                    document.querySelector('.menu').style.display = 'none';
                  }
                }
              }
            }
          },

            isShow: function(newVal) {
                newVal ? this.btnStyle = 'Primary' : this.btnStyle = 'Default'
            },
            enter: function (newVal) {
                if(newVal == ''){
                    let that = this
                    let timeOut = setTimeout(() => {
                        that.circleProgress()
                    }, 1000);
                }
            },
            info:function (newVal) {
                if(newVal !== ''){
                    clearInterval(this.t1);
                }
            }
        },
        beforeRouteLeave (to, from, next){
            if(localStorage.getItem(this.$route.query.play_id) !== 'true'){
                localStorage.setItem(this.$route.query.play_id,this.seconds)
            }
            clearInterval(this.t1);
            if(document.getElementById('jpwOverlay')){
              document.getElementById('jpwOverlay').style.display = 'none';
              document.getElementById('jpWalkthrough').style.display = 'none';
            }

            next(true)
        },

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<!--<style src="../../css/el-message-box.css"></style>-->

<style>
  @import "../../css/el-form.css";
  @import "../../css/el-dialog.css";
    .scenePwd .pwdNdInput .el-input__inner{
        text-align: center;
    }
    .scenePwd .pwdNdInput .el-input__inner:focus{
        border-color: #ED9515;
    }

  #J_qrPayOrder canvas{
    width: 100% !important;
  }

  /*弹窗抵扣*/
  .sceneTopBox .payBox .el-dialog{
    width: 800px;
    margin-top: 5vh!important;
  }

  .sceneTopBox .payBox .el-dialog__header{
    /*border-bottom: none;*/
    display: none;
  }

    .sceneTopBox .payBox .el-dialog__body{
      padding: 34px 0;
    }

  /*步骤条*/
  .sceneTopBox .payBox .scenePayStepBox .el-step__line{
    height:1px;
    background:rgba(168,167,167,1);
    top: 10px;
  }

  .sceneTopBox .payBox .scenePayStepBox .el-step__head.is-process{
    color: #A8A7A7;
    border-color: #A8A7A7;
  }

  .sceneTopBox .payBox .scenePayStepBox .el-step__head .el-step__icon{
    background:rgba(168,167,167,1);
    border-color: rgba(168,167,167,1);
    width: 20px;
    height: 20px;
    color: #fff;
  }

  .sceneTopBox .payBox .scenePayStepBox .el-step__head .el-step__icon .el-step__icon-inner{
    font-size: 12px;
  }

  .sceneTopBox .payBox .scenePayStepBox .el-step__title{
    font-size:14px;
    line-height: 14px;
    margin-top: 15px;
    color: #A8A7A7;
    font-weight: normal;
  }

  .sceneTopBox .payBox .scenePayStepBox .el-step__head.is-finish .el-step__line-inner{
    background: #32C58F;
    color: #32C58F;
    border-color: #32C58F;
    border-bottom: 0;
  }

  .sceneTopBox .payBox .scenePayStepBox .el-step__head.is-finish .el-step__icon{
    background: #fff;
    border-color: #32C58F;
    color: #32C58F;
  }


  .sceneTopBox .payBox .scenePayStepBox .el-step__title.is-finish{
    color:rgba(57,63,81,1);
  }

    /*单选框*/
  .sceneTopBox .payBox .payMethodBox .el-radio__input{
    display: none;
  }

  .sceneTopBox .payBox .payMethodBox .el-radio__label{
    font-size:14px;
    color:rgba(57,63,81,1);
    font-family: Microsoft Yahei, 微软雅黑;
    display: flex;
    align-items: center;
    padding: 0;
  }

  .sceneTopBox .payBox .payMethodBox .el-radio__label i{
    font-size: 32px;
    color: #1AB45E;
    margin-right: 12px;
  }

  .sceneTopBox .payBox .payMethodBox .el-radio:last-child .el-radio__label i{
    color: #1296DB;
  }

    /*反馈弹窗图片上传*/
  #hot-preview .trBox .thBox .el-popover__reference{
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }

    .htContextMenu table.htCore{
      border-radius: 8px;
      /*box-shadow: #8c8c8c;*/
      overflow: hidden;
    }

    .htContextMenu table tbody tr td .htItemWrapper{
      margin-top: 4px;
      margin-bottom: 4px;
    }


    .el-input__inner{
      background-color: #ffffff !important;
    }




    .sceneTopBox{
      width: 600px;
      height: 38px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      position: absolute;
      top: 62px;
      right: 20px;
    }

    .sceneTopBox .toPreview{
      font-size: 14px;
      display: flex;
      align-items: center;
    }

    .sceneTopBox .toPreview>i{
      margin: 4px 6px 0 0;
      display: inline-block;
      font-size: 18px;
      color: rgba(0,0,0,.6);
    }


    .sceneTopBox .sceneTopMenu{
      width: auto;
    }

    /*顶部按钮*/
    .sceneTopBox .details_button{
      cursor: pointer;
      margin-right: 50px;
    }

    .sceneTopBox .details_button:last-of-type{
      margin-right: 0;
    }

    .sceneTopBox.noDownload .details_button:nth-last-of-type(2){
      margin-right: 0;
    }

    .sceneTopBox .details_button .el-popover__reference{
      font-size: 14px;
    }

    /*.screenPopover{*/
      /*padding: 0;*/
    /*}*/

    .screenPopover.el-popper .popper__arrow:after{
      border-bottom-color:#F5F5F7;
    }

    .screenPopover.el-popper .screenTitle{
      width: 100%;
      height: 38px;
      display: flex;
      align-items: center;
      background:rgba(63,62,106,0.05);
      font-size:12px;
      color:rgba(0,0,0,0.8);
      /*border:1px solid rgba(235,235,240,1);*/
    }

    .screenPopover.el-popper .screenTitle>img{
      margin: 0 10px;
    }

    .sceneTopBox .details_button .el-popover__reference .el-icon-caret-bottom{
      margin-left: 6px;
      color: #bbbbbb;
    }

    /*筛选框*/
 .el-popover.screenPopover {
      overflow: auto;
      height: 300px;
      padding: 0;
    }

  .screenPopover .screenTab{
    height: 300px;
  }

  .screenPopover .screenTab .el-tabs__header{
    margin-right: 14px;
    width: 60px;
    background:rgba(57,63,81,0.1);
    padding-top: 8px;
  }

  .screenPopover .screenTab.el-tabs--left .el-tabs__nav-wrap::after,
  .screenPopover .screenTab.el-tabs--left .el-tabs__active-bar.is-left{
    display: none;
  }

  .screenPopover .screenTab .el-tabs__item{
    padding: 0;
    text-align: center;
    font-size: 12px;
    color:rgba(97,101,116,1);
    height: 46px;
    transition: all 0.6s;
  }

  .screenPopover .screenTab .el-tabs__item:after{
    content: '';
    position: absolute;
    top: 16px;
    right: 0;
    display: inline-block;
    border-top: 4px solid transparent;
    border-bottom: 4px solid transparent;
    border-left: 4px solid transparent;
    border-right: 8px solid transparent;
    transition: all 0.6s;
  }

  .screenPopover .screenTab .el-tabs__item.is-active{
    color:rgba(237,149,21,1);
  }

  .screenPopover .screenTab .el-tabs__item.is-active:after{
    border-right-color: #fff;
  }

  .screenPopover .screenTab .el-tabs__content .el-tab-pane{
    padding: 8px 22px 0 0;
    overflow-y: scroll;
    overflow-x: hidden;
  }

  .screenPopover .screenTab .el-tabs__content .el-checkbox{
    padding: 0 10px;
    height: 24px;
    background:rgba(242,242,242,1);
    border-radius: 2px;
    border-color: rgba(242,242,242,1);
    margin: 10px 10px 0 0;
    position: relative;
  }

  .screenPopover .screenTab .el-tabs__content .el-checkbox:after{
    content: '';
    position: absolute;
    bottom:0;
    right: 0;
    width: 0; height: 0;
    border-color: transparent; /*上下颜色 左右颜色*/
    border-width: 8px 8px 0 0 ;
    border-style: solid;
    transition: all 0.6s;
  }

  .screenPopover .screenTab .el-tabs__content .el-checkbox.is-checked{
    background:rgba(255,234,204,1);
    border-color:rgba(255,213,153,1);
  }

  .screenPopover .screenTab .el-tabs__content .el-checkbox.is-checked:after{
    border-color: transparent #F0BB6F; /*上下颜色 左右颜色*/
  }

  .screenPopover .screenTab .el-tabs__content .el-checkbox__input{
    display: none;
  }

  .screenPopover .screenTab .el-tabs__content .el-checkbox__label{
    padding: 0;
    font-size:12px;
    line-height: 22px;
    color:rgba(97,101,116,1);
  }

  .screenPopover .screenTab .el-tabs__content p{
    font-size:12px;
    line-height: 12px;
    margin-top: 14px;
  }

    .sceneTopBox .details_button .sceneTopMenu{
      background: #f9f9f9;
    }

    .sceneTopBox .details_button .sceneTopMenu>.el-menu-item{
      margin-right: 16px;
    }


    /*.sceneTopBox .details_input{*/
    /*border-left: 1px solid #666;*/
    /*box-sizing: revert;*/
    /*}*/

    /*.sceneTopBox .details_button .el-col-12{*/
    /*width: 170%;*/
    /*}*/

    .sceneTopBox .details_button .button_font{
      font-size: 14px;
      color: #999 !important;
      position: relative;
    }

    .sceneTopBox .details_button .button_font .fontSelect{
      display: inline-block;
      position: absolute;
      top: 14px;
      left: 22px;
      width: 90px;
    }

    .sceneTopBox .details_button .button_font .fontSelect .selectBox {
      width: 18px !important;
    }

    .sceneTopBox .details_button .button_font .fontSelect .selectBox .el-input__inner{
      width: 100px !important;
    }

    .sceneTopBox .details_button .button_font .fontSelect .el-input__inner{
      width: 100px !important;
    }

    .sceneTopBox .details_button .button_font span{
      color: #999 !important;
      font-size: 14px !important;
    }

    .sceneTopBox .details_button:hover .button_font span{
      color: #333 !important;
    }

    @media screen and (max-width: 1500px){
      .sceneTopBox .details_button.preview{
        right: 11vw!important;
      }
      .sceneTopBox {
        width: 46%;
      }
      #hot-preview {
        height: 80.5vh;
      }
    }
    @media screen and (max-width: 1300px){
      .sceneTopBox .details_button.preview{
        right: 12vw!important;
      }
      .sceneTopBox {
        width: 50%;
      }
    }
    .sceneTopBox li .preview{
      width: 150px;
      height: 33px;
      background: #ED9515;
      color: #ffffff;
      border: none;
      /*margin-bottom: 11px;*/
    }


    .sceneTopBox li .preview span{
      color: #fff!important;
      font-size: 18px!important;
      line-height: 18px;
    }
    .sceneTopBox li .preview span img{
      margin-right: 10px;
      width: 16px;
    }
    .sceneTopBox .details_input{
      margin-top: 18px;
    }

    .sceneTopBox .details_input .fxInput {
      margin-top: 10px;
    }

    .sceneTopBox .details_input .fxInput .el-input__inner{
      width: 100% !important;
    }

    /*解析过程步骤条*/
    .loadingBox .speedBox .loadingSteps .el-step{
      overflow: visible;
    }
    .loadingBox .speedBox .loadingSteps .el-step.is-horizontal .el-step__line{
      height: 1px;
      background:rgba(207,209,214,1);
      width: 170px;
      left: 12px;
    }

    .loadingBox .speedBox .loadingSteps .el-step .is-finish .el-step__line{
      background: rgba(108,111,191,1);
    }

    .loadingBox .speedBox .loadingSteps .el-step .el-step__line-inner{
      display: none;
    }

    /*步骤条icon*/
    .loadingBox .speedBox .loadingSteps .el-step__icon{
      width: 20px;
      margin-left: 13px;
    }

    .loadingBox .speedBox .loadingSteps .el-step__icon-inner{
      font-size: 20px;
      color: #C4C5E5;
    }

    .loadingBox .speedBox .loadingSteps .is-finish .el-step__icon-inner.iconsuccess{
      color: #6C6FBF;
    }

    .loadingBox .speedBox .loadingSteps .el-step__icon-inner.iconCircle{
      /*font-size: 22px;*/
      position: relative;
      color: #ED9515;
      line-height: 20px;
    }

    .loadingBox .speedBox .loadingSteps .el-step__icon-inner.iconCircle:after{
      position: absolute;
      content: '';
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: #fff;
      border: 2px solid rgba(237,149,21,0.4);
      left: -4px;
      top: -3px;
      z-index: -1;
    }

    .loadingBox .speedBox .loadingSteps .el-step:last-of-type .el-step__icon-inner.iconCircle:after{
      top: -4px;
      left: -4px;
    }

    .loadingBox .speedBox .loadingSteps .el-step__title{
      font-size: 12px;
      color: rgba(0,0,0,1);
      line-height: 12px;
      margin-top: 12px;
      font-weight: normal;
    }

    /*表格*/
    #scene .sceneTable .tableHeadTh{
      background:rgba(83,113,128,0.8);
      border-color: rgba(255,255,255,.7);
    }

  #scene .sceneTable .tableHeadTh .vxe-cell{
    font-size:14px;
    font-family:Microsoft YaHei;
    font-weight:400;
    color:rgba(255,255,255,1);
    white-space:nowrap;
  }

  #scene .sceneTable .dayRow{
    background:rgba(237,224,201,1);
    transition: all 0.6s;
  }

  #scene .sceneTable .dayRow:hover{
    background:#dfd1b9;
  }

  #scene .sceneTable .nightRow{
    background:rgba(155,183,203,1);
    transition: all 0.6s;
  }

  #scene .sceneTable .nightRow:hover{
    background:rgba(140,165,183,1);
  }

  #scene .sceneTable .nullRow{
    background:rgba(232,232,232,1);
    transition: all 0.6s;
  }

  #scene .sceneTable .nullRow:hover{
    background:#d7d7d7;
  }

  #scene .sceneTable .tableTr{
    border-color: #fff;
    height: 46px;
  }

  #scene .sceneTable .tableTr .vxe-cell{
    color: rgba(0,0,0,.8);
  }

  #scene .sceneTable .nightRow .vxe-cell{
    color:rgba(255,255,255,1);
  }

  #scene .sceneTable .pageTh .vxe-cell,
  #scene .sceneTable .nameTh .vxe-cell{
    writing-mode:horizontal-tb;
    overflow: visible;
    word-wrap: break-word;
    word-break: break-all;
    white-space: normal;
  }

  #scene .sceneTable .nameTh .vxe-cell{
    color:rgba(240,80,80,0.8);
  }

  #scene .sceneTable .tableHeadTh.nameTh .vxe-cell{
    text-decoration:underline;
    color:rgba(255,239,205,1);
    cursor: pointer;
    padding:4px 10px;
  }

  #scene .sceneTable .linkTh .vxe-cell{
    font-size:14px;
    text-decoration:underline;
    color:rgba(71,74,152,0.8);
    cursor: pointer;
  }

  #scene .sceneTable .tableTr .vxe-cell i{
    cursor: pointer;
    color: rgba(0,0,0,.2);
    font-size: 20px;
    transition: all 0.8s;
    margin-top: 4px;
    display: block;
  }

  #scene .sceneTable .vxe-body--row:hover .vxe-cell i{
    /*color: rgba(0,0,0,.6);*/
    color: #f05050;
  }

    @-moz-document url-prefix(){
      #hot-preview .rightFixed .thBox:last-of-type{
        width: 132px!important;
      }
    }
</style>
<style scoped>
  *{
    box-sizing: border-box;
  }

  /* 引导动图 */
  .guideImg{
    position: absolute;
    top: 8px;
    left: 100px;
    z-index: -1;
  }

  /*下载轮播*/
  #scene .shadeBox{
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1999;
    background: rgba(0,0,0,0.3);
  }

  #scene .shadeBox .downLoadPreview{
    height: 60vh;
    margin-top: 140px;
  }

  /*顶部按钮*/
  .sceneTopBox li .download{
    width: 100px;
    height: 34px;
    border-radius: 20px;
    border: none;
    background-color: #ed9515;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    text-decoration: none;
  }

  .sceneTopBox li .download span{
    /*display: block;*/
    color: #fff;
    font-size: 14px;
  }
  .sceneTopBox li .download img{
    margin-right: 10px;
    width: 20px;
  }

  /*解析步骤*/


  /*支付弹窗样式*/

    .alipayQRcode{
        width: 100px;
        height: 110px;
        display: block;
        margin: 0 auto;
        overflow-x: hidden;
        overflow-y: hidden;
        border: none;
    }

  .sceneTopBox .payBox .payDesc{
    margin-top: 20px;
    text-align: center;
  }

  /*步骤条*/
  .sceneTopBox .payBox .scenePayStepBox{
    padding: 0 74px;
  }

  .sceneTopBox .payBox .downLoadMain{
    padding: 36px 150px 16px;
  }

  .sceneTopBox .payBox .downLoadMain .countBox{
    width:100%;
    padding: 10px 18px;
    background:rgba(57,63,81,0.08);
    border:1px solid rgba(0,0,0,0.08);
    border-radius:4px;
    margin-bottom: 8px;
    box-sizing: border-box;
  }

  .sceneTopBox .payBox .downLoadMain .countBox .countItemBox{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 14px;
  }

  .sceneTopBox .payBox .downLoadMain .countBox .countItemBox .countItemLeft{
    color: #616574;
    font-size: 12px;
    line-height: 12px;
  }

  .sceneTopBox .payBox .downLoadMain .countBox .countItemBox .countItemRight,
  .sceneTopBox .payBox .downLoadMain .countBox .countItemBox .countItemRight span{
    color: #393F51;
    font-size: 12px;
    line-height: 12px;
  }

  .sceneTopBox .payBox .downLoadMain .countBox .countItemBox:first-child{
    margin-top: 0;
  }

  .sceneTopBox .payBox .downLoadMain .countBox .countItemBox:first-child .countItemLeft{
    font-size:14px;
    color:rgba(57,63,81,1);
    line-height: 14px;
  }

  .sceneTopBox .payBox .downLoadMain .countBox .countItemBox .countItemRight .desc{
    color:rgba(240,80,80,.8);
  }

  .sceneTopBox .payBox .downLoadMain .countBox .countItemBox .countItemRight .discount{
    text-decoration: line-through;
  }

  /*优惠券*/
  .sceneTopBox .payBox .couponBox .couponTopBox{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 18px 0;
  }

  .sceneTopBox .payBox .couponBox .couponTopBox>div{
    font-size:12px;
    font-family:Microsoft YaHei;
    font-weight:400;
    color:rgba(0,0,0,1);
    opacity:0.8;
  }

  .sceneTopBox .payBox .couponBox .couponContentBox{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 18px;
    height: 60px;
    width: 100%;
    overflow: hidden;
  }

  .sceneTopBox .payBox .couponBox .couponContentBox .couponBtn{
    width:14px;
    height: 100%;
    background:rgba(57,63,81,0.08);
    border:1px solid rgba(0,0,0,0.08);
    border-radius:6px;
    text-align: center;
    cursor: pointer;
  }

  .sceneTopBox .payBox .couponBox .couponContentBox .couponBtn i{
    font-size: 14px;
    color: #616574;
    line-height: 58px;
  }

  .sceneTopBox .payBox .couponBox .couponContentBox .scrollBox{
    width: calc(100% - 28px);
    height: 60px;
    overflow: hidden;
    position: relative;
  }

  .sceneTopBox .payBox .couponBox .couponContentBox ul{
    display: flex;
    align-items: center;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    transition: left .8s;
  }

  .sceneTopBox .payBox .couponBox .couponContentBox ul li{
    width:150px;
    height:100%;
    background:rgba(235,235,237,1);
    border:1px solid rgba(210,210,210,1);
    border-radius:4px;
    margin-left: 6px;
    flex-shrink: 0;
    cursor: pointer;
    padding: 0 5px 0 7px;
    transition: all 0.4s;
  }

  .sceneTopBox .payBox .couponBox .couponContentBox ul li.active{
    background:rgba(251,234,208,1);
    border-color:rgba(237,149,21,1);
  }

  .sceneTopBox .payBox .couponBox .couponContentBox ul .couponItemTop{
    display: flex;
    align-items: flex-end;
    padding: 8px 0 8px 6px;
    border-bottom: 1px dashed;
    border-color: rgba(210,210,210,1);
    transition: all 0.4s;
  }

  .sceneTopBox .payBox .couponBox .couponContentBox ul li.active .couponItemTop{
    border-color: rgba(237,149,21,1);
  }

  .sceneTopBox .payBox .couponBox .couponContentBox ul .couponItemTop .couponNum{
    font-size:24px;
    color:rgba(57,63,81,0.8);
    margin-right: 12px;
    line-height: 20px;
    transition: all 0.4s;
  }

  .sceneTopBox .payBox .couponBox .couponContentBox ul li.active .couponNum{
    color:rgba(240,80,80,1);
  }

  .sceneTopBox .payBox .couponBox .couponContentBox ul .couponItemTop .couponDesc{
    font-size:12px;
    color:rgba(57,63,81,0.8);
    line-height: 13px;
    transition: all 0.4s;
  }

  .sceneTopBox .payBox .couponBox .couponContentBox ul li.active .couponDesc,
  .sceneTopBox .payBox .couponBox .couponContentBox ul li.active .couponDate{
    color:rgba(0,0,0,.8);
  }

  .sceneTopBox .payBox .couponBox .couponContentBox ul .couponDate{
    font-size:12px;
    color:rgba(57,63,81,0.8);
    line-height: 12px;
    margin-top: 4px;
    padding-left: 5px;
    transition: all 0.4s;
  }

  /*开通会员*/
  .sceneTopBox .payBox .totalBox{
    width:100%;
    height:80px;
    background:rgba(108,111,191,0.08);
    border:1px solid rgba(0,0,0,0.08);
    border-radius:6px;
    margin-top: 26px;
    padding: 12px 10px 12px 20px;
  }

  .sceneTopBox .payBox .totalBox>div{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .sceneTopBox .payBox .totalBox .totalTop{
    margin-bottom: 8px;
  }

  .sceneTopBox .payBox .totalBox .totalTop .totalTitle{
    font-size:12px;
    color:rgba(0,0,0,1);
  }

  .sceneTopBox .payBox .totalBox .totalTop .totalNum{
    font-size:16px;
    color:#F05050;
    font-weight: bold;
    margin-right: 8px;
  }

  .sceneTopBox .payBox .totalBox .memberBox .desc{
    font-size:12px;
    color:rgba(240,80,80,1);
  }

  .sceneTopBox .payBox .totalBox .memberBox .btn{
    width:86px;
    height:24px;
    background:rgba(240,80,80,1);
    border-radius:12px;
    font-size:14px;
    text-align: center;
    line-height: 24px;
    cursor: pointer;
    color:rgba(254,254,254,1);
  }

  .sceneTopBox .payBox .downLoadDesc{
    margin: 20px 0 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .sceneTopBox .payBox .downLoadDesc .left{
    font-size:12px;
    color:#616574;
  }

  .sceneTopBox .payBox .downLoadDesc .left span{
    font-size:12px;
    color:rgba(240,80,80,1);
  }

  .sceneTopBox .payBox .downLoadDesc .right{
    font-size:12px;
    text-decoration:underline;
    color:rgba(108,111,191,1);
    cursor: pointer;
  }

  .sceneTopBox .payBox .stepBtn{
    width:100%;
    height:34px;
    background:rgba(237,149,21,1);
    border-radius:16px;
    margin-top: 32px;
    font-size:14px;
    line-height: 34px;
    text-align: center;
    color:rgba(255,255,255,1);
    cursor: pointer;
  }

  .sceneTopBox .payBox .downLoadDesc+.stepBtn{
    margin-top: 0;
  }

  /*支付方式*/
  .sceneTopBox .payBox .payMethodBox .payMethodTitleBox{
    margin: 20px 0;
  }

  .sceneTopBox .payBox .payMethodBox .payMethodTitleBox .payMethodTitle{
    font-size:14px;
    color:rgba(57,63,81,1);
    line-height: 14px;
  }

  .sceneTopBox .payBox .payMethodBox .payMethodRadio{
    display: flex;
  }

  .sceneTopBox .payBox .payMethodBox .payMethodItem{
    width:150px;
    height:54px;
    background:rgba(255,255,255,0.3);
    border:1px solid rgba(57,63,81,0.3);
    border-radius:4px;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
  }

  .sceneTopBox .payBox .payMethodBox .payMethodItem.is-checked{
    background:rgba(253,244,231,1);
    border-color: rgba(237,149,21,1);
  }

  /*确认支付*/
  .sceneTopBox .payBox .downLoadMain.payFinish{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 245px;
    margin-top: 15px;
    font-size:26px;
    color:rgba(57,63,81,1);
  }

  .sceneTopBox .payBox .downLoadMain.payFinish i{
    font-size: 40px;
    color: #ED9515;
    margin-bottom: 20px;
  }

  /*支付浮窗*/
  .sceneTopBox .payCodeBox{
    background: rgba(0,0,0,.4);
    z-index: 2034;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
  }

  .sceneTopBox .innerVisibleBox{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width:260px;
    height:270px;
    background:rgba(255,255,255,1);
  }

  .sceneTopBox .innerVisibleBox.alipayVisibleBox{
    width:200px;
    height:180px;
    box-sizing: border-box;
    padding-top: 28px;
  }

  .sceneTopBox .innerVisibleBox img{
    width:200px;
    height:200px;
    /*margin: 0 auto;*/
    margin: 20px auto 14px;
    display: block;
  }

  .sceneTopBox .innerVisibleBox .payDesc{
    font-size:14px;
    text-align: center;
    font-weight:bold;
    color:rgba(0,0,0,1);
  }

  /*表格*/
  #scene .sceneTable{
    /*overflow: scroll;*/
    padding: 0 15px 0 18px;
    height: calc(100vh - 132px);
  }

  #hot-preview{
    width: calc(100% - 84px);
    height: calc(100vh - 120px);
    overflow: visible;
    position: absolute;
    top: 104px;
    left: 64px;
    background: none;
    /*box-shadow: 5px 5px 10px 6px rgba(0,0,0,.08);*/
  }
  #hot-preview .leftFixed{
    position: fixed;
    top: 104px;
    left: 64px;
    display: flex;
    align-items: center;
    background: #fff;
    z-index: 199;
    box-shadow: -3px 2px 6px 2px rgba(0,0,0,.02);
  }
  #hot-preview .rightFixed{
    position: fixed;
    top: 104px;
    right: 22px;
    display: flex;
    align-items: center;
    background: #fff;
    z-index: 199;
    border-top: 1px solid #e4e4ea;
  }
  #hot-preview .trBox{
    display: flex;
    flex-wrap: nowrap;
    width: 100%;
    align-items: center;
    background: #fff;
    /*margin-right: 374px;*/
  }

  #hot-preview .trBox.trBoxFirst{
    position: sticky;
    position: -webkit-sticky;
    top: 0;
    overflow-x: scroll;
    z-index: 188;
    box-shadow: 2px 2px 6px 2px rgba(0,0,0,.02);
    /*隐藏滚动条，当IE下溢出，仍然可以滚动*/
    -ms-overflow-style:none;
    /*火狐下隐藏滚动条*/
    overflow:-moz-scrollbars-none;
    scrollbar-width: none;
  }

  #hot-preview .trBox.trBoxFirst::-webkit-scrollbar,
  #hot-preview .trBox.trLeftBox::-webkit-scrollbar{
    display: none;
  }

  #hot-preview .trBox.trLeftBox{
    display: block;
    width: 60px;
    height: calc(100vh - 260px);
    overflow-y: scroll;
    overflow-x: hidden;
    flex-shrink: 0;
    scrollbar-width: none;
    background: none;
    box-shadow: 2px 2px 6px 2px rgba(0,0,0,.02);
  }

  #hot-preview .trBox:not(.trBoxFirst) .thBox{
    height: 40px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    line-height: 40px;
    background: #fafafa;
    padding: 0;
  }

  #hot-preview .trBox:not(.trBoxFirst) .thBox>div{
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }

  #hot-preview .trBox.trBoxFirst .thBox{
    border-top: 1px solid #e4e4ea;
  }

  #hot-preview .trBox.trBoxFirst .thBox:first-of-type{
    width: 60px;
  }

  #hot-preview .scrollBox{
    display: flex;
  }

  #hot-preview .trBox.trBoxFirst .thBox,
  #hot-preview .leftFixed .thBox,
  #hot-preview .rightFixed .thBox{
    height: 150px;
    line-height: 26px;
    overflow: hidden;
  }
  #hot-preview .trBox .thBox,
  #hot-preview .leftFixed .thBox,
  #hot-preview .rightFixed .thBox{
    flex-shrink: 0;
    width: 46px;
    text-align: center;
    padding: 5px 12px;
    background: #fff;
    border-right: 1px solid #ddd;
    box-sizing: border-box;
  }

  #hot-preview .leftFixed .thBox{
    border: 1px solid #e4e4ea;
    border-right: none;
    border-bottom: none;
  }

  #hot-preview .rightFixed .thBox{
    border-right: none;
  }

  #hot-preview .trBox:nth-child(even) .thBox{
    background: #fff;
  }
  #hot-preview .trBox:not(.trLeftBox) .thBox:nth-child(n+8),
  #hot-preview .trBox.scrollContentTr .thBox:nth-child(n+7){
    color: #459df5;
    /*cursor: pointer;*/
  }

  #hot-preview .trBox:first-child .thBox:nth-child(n+8){
    text-decoration: underline !important;
    cursor: pointer;
  }

  #hot-preview .trBox:not(.trLeftBox) .thBox:nth-last-child(4),
  #hot-preview .trBox:not(.trLeftBox) .thBox:nth-last-child(3){
    color: #000;
      width: 60px;
  }

  #hot-preview .trBox:first-child .thBox:nth-last-child(4),
  #hot-preview .trBox:first-child .thBox:nth-last-child(3){
    text-decoration: none !important;
    cursor: initial;
  }

  #hot-preview .trBox:not(.trLeftBox) .thBox:nth-last-child(4){
    width: 200px;
  }

  #hot-preview .trBox.trLeftBox .thBox{
    color: #459df5;
    cursor: pointer;
    text-decoration: underline !important;
  }

  #hot-preview .trBox.trLeftBox .thBox{
    position: sticky;
    position: -webkit-sticky;
    left: 0px;
    z-index: 188;
    border-right: 1px solid #ddd;
    border-left: 1px solid #ddd;
    box-shadow: 2px 2px 6px 2px rgba(0,0,0,.02);
    background: #fafafa;
  }

  #hot-preview .trBox.trLeftBox .thBox:nth-child(even){
    background: #fff;
  }

  /*#hot-preview .trBox .thBox:nth-child(2){*/
    /*left: 60px;*/
  /*}*/
  /*#hot-preview .trBox .thBox:nth-child(3){*/
    /*left: 175px;*/
  /*}*/
  /*#hot-preview .trBox .thBox:nth-child(3){*/
    /*box-shadow: 2px 2px 6px 2px rgba(0,0,0,.02);*/
  /*}*/
  #hot-preview .trBox.trLeftBox .thBox{
    cursor: pointer;
  }

  #hot-preview .trBox.trLeftBox .thBox,
  #hot-preview .leftFixed .thBox:first-child{
    width: 60px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    border-right: 1px solid #e4e4ea;
  }
  #hot-preview .trBox.trBoxFirst .thBox:nth-child(2),
  #hot-preview .trBox.scrollContentTr .thBox:first-of-type,
  #hot-preview .trBox:not(.trLeftBox) .thBox:last-of-type,
  #hot-preview .leftFixed .thBox:nth-child(2),
  #hot-preview .rightFixed .thBox:last-of-type{
    width: 115px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  #hot-preview .rightFixed .thBox:last-of-type{
    border-left: 1px solid #ddd;
  }
  #hot-preview .trBox.scrollContentTr .thBox:nth-child(2),
  #hot-preview .trBox.scrollContentTr .thBox:nth-child(3),
  #hot-preview .trBox.trBoxFirst .thBox:nth-child(3),
  #hot-preview .trBox.trBoxFirst .thBox:nth-child(4),
  #hot-preview .leftFixed .thBox:nth-child(3){
    width: 78px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  #hot-preview .trBox.trBoxFirst .thBox:nth-child(6),
  #hot-preview .trBox.scrollContentTr .thBox:nth-child(5),
  #hot-preview .trBox:not(.trLeftBox) .thBox:nth-last-of-type(2),
  #hot-preview .rightFixed .thBox:first-of-type{
    width: 260px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }

  #hot-preview .trBox.scrollContentTr .thBox:nth-child(5),
  #hot-preview .trBox:not(.trLeftBox) .thBox:nth-last-of-type(2){
    padding: 0 10px;
  }

  #hot-preview .rightFixed .thBox{
    box-shadow: 2px 2px 6px 2px rgba(0,0,0,.02);
    color: #459df5;
  }
  #hot-preview .rightFixed .thBox:first-of-type {
    width: 259px;
    border-left: 1px solid #ddd;
  }
  #hot-preview .rightFixed .thBox:last-of-type{
    width: 121px;
  }

  #hot-preview .trBox:not(.trLeftBox) .thBox:last-of-type,
  #hot-preview .trBox:not(.trLeftBox) .thBox:nth-last-of-type(2){
    position: sticky;
    right: 0;
    border-right: 1px solid #ddd;
  }

  #hot-preview .trBox.trBoxFirst.right .thBox:last-of-type{
    width: 122px;
  }

  #hot-preview .trBox:not(.trLeftBox) .thBox:nth-last-of-type(2){
    right: 116px;
    box-shadow: -6px 2px 6px 2px rgba(0,0,0,.02);
  }

  #hot-preview .trBox:not(.trBoxFirst) .thBox:nth-last-of-type(2){
    border-left: 1px solid #ddd;
  }

  #hot-preview .trBox.trBoxFirst .thBox:nth-last-of-type(2){
    right: 122px;
  }
  /*#hot-preview .rightFixed .thBox:nth-last-of-type(2){*/
      /*border-left: 1px solid #ddd;*/
  /*}*/
  .demo_newtext{
    width: 120px;
    height: 40px;
    position: absolute;
    right: 58px;
    top: 30px;
    line-height: 40px;
    text-align: center;
    background-color: #fff;
    border-radius: 5px;
    border: solid 1px #dddddd;cursor: pointer;
  }
  .demo_newtext:hover{
    border-color: #fff;
  }
  .demo_submit{
    position: absolute;
    right: 20px;
    bottom: -20px;
    width: 120px;
    height: 40px;
    color: white;
    padding-right: 10px;
  }
  /*.demo_submit:hover{*/
  /*background: #2cd2b8;*/
  /*border-radius: 5px;*/
  /*}*/
  .error_tipsEnd{
    font-family: 新宋体;
    font-size: 16px;
    color: #666;
    margin-top: 40px;
  }
  .require_kind table tr td{
    font-size: 14px;
    color: #999;
    width: 120px;
    text-align: center;
    height: 40px;
    font-family: 新宋体;
  }
  .require_kind:last-of-type table tr td:nth-of-type(n+2){
    width: 110px;
  }
  .require_kind:last-of-type table tr td:last-of-type{
    width: 180px;
  }
  .require_kind table tr td:first-of-type{
    width: 140px;
    text-align: left;
    font-size: 16px;
    color: #666;
    font-family: 新宋体;
  }
  .require_kind table tr td:last-of-type{
    width: 250px;
    text-align: right;
  }

  .input-error div .em{
    width: 100%;
    height: 1px;
    background: #ddd;
    margin: 20px 0 10px;
  }
  .error_tipsTitle{
    font-size: 16px;
    font-family: 新宋体;
    color: #666;
  }
  .error_qrcode{
    width: 130px;
    height: 130px;
    position: absolute;
    top: 30px;
    left: 630px;
    box-shadow: 0px 1px 6px 1px rgba(0,0,0,.06);
    opacity: 0;
  }
  .error_qrcode.active{
    animation: showCode 0.5s;
    opacity: 1;
  }
  @keyframes showCode
  {
    0%   {opacity: 0;-moz-opacity:0;}
    25%  {opacity: 0.2;-moz-opacity:0.2;}
    50%  {opacity: 0.4;-moz-opacity:0.4;}
    75%  {opacity: 0.8;-moz-opacity:0.8;}
    100% {opacity: 1;-moz-opacity:1;}
  }
  .error_link{
    color: #459df5;
    font-size: 16px;
    font-family: 新宋体;
    cursor: pointer;
  }
  .error_link:hover{
    text-decoration: underline;
  }

  .el-input-group__prepend{
    border-radius: 0!important;
  }
  .el-input-group{
    left: -6px;
  }
  .details_button .em{
    width: 1px;
    height: 50px;
    background: #ddd;
    position: absolute;
    top: 6px;
    left: 3.7vw;
  }
  .table_Left{
    text-align: left;
  }

  .table_Center{
    text-align: center;
  }

  .table_Right{
    text-align: right;
  }

  .table_Fontsize{

  }

  .content_right_biaoge{
    display: block;
    margin-top: 30px;
  }

  .content_right_biaoge .menu{
    background-color: white;
    border:1px solid rgba(235,235,240,1);
    border-radius: 6px;
    z-index: 2000;
    position: absolute;
    width: 220px;
    height: 300px;
    display: none;
    /*padding: 5px 0;*/
  }

  .content_right_biaoge .menu .menuTitle{
    display: flex;
    align-items: center;
    justify-content: space-between;
    width:100%;
    height:40px;
    background:rgba(63,62,106,0.05);
    border-bottom: 1px solid rgba(210,210,210,0.6);
    padding: 0 12px;
  }

  .content_right_biaoge .menu .menuTitle .menuTitleLeft{
    display: flex;
    align-items: center;
    flex-shrink: 0;
  }

  .content_right_biaoge .menu .menuTitle .menuTitleLeft span{
    font-size:12px;
    color:rgba(0,0,0,0.8);
    line-height: 12px;
    margin-left: 6px;
  }

  .content_right_biaoge .menu .menuTitle .menuTitleName{
    font-size:12px;
    color:rgba(0,0,0,0.8);
    display: flex;
    align-items: center;
    max-width: 40%;
    flex-shrink: 0;
  }

  .content_right_biaoge .menu .menuTitle .menuTitleName span{
    color: #FF690E;
    font-size:12px;
    width: 100%;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    display: inline-block;
  }

  .content_right_biaoge .menu .menuContentBox{
    display: flex;
    justify-content: space-between;
    height: calc(100% - 40px);
  }

  .content_right_biaoge .menu .menuContentBox .menuContent{
    flex-shrink: 0;
    width: 50%;
  }

  .content_right_biaoge .menu .menuContentBox .menuContent .menuContentTitle{
    font-size:12px;
    color:rgba(63,62,106,0.8);
    opacity:0.8;
    height: 33px;
    line-height: 33px;
    padding-left: 8px;
  }

  .content_right_biaoge .menu .menuContentBox .menuContent .actorBox{
    height: calc(100% - 50px);
    overflow-y: scroll;
    overflow-x: hidden;
  }

  .content_right_biaoge .menu .menuContentBox .menuContent .actorBox .actorName{
    height: 24px;
    width: 100%;
    line-height: 24px;
    font-size:12px;
    color:rgba(0,0,0,0.8);
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    padding-left: 8px;
    cursor: pointer;
  }

  .content_right_biaoge .menu .menuContentBox .menuContent .actorBox.list .actorName:nth-of-type(even){
    background:rgba(63,62,106,0.05);
  }

    .title_box{
    position: absolute;
    left: 20px;
    bottom: 4px;
    clear: both;
    display: flex;
    align-items: center;
    cursor: pointer;
    height: 40px;
  }
  .project-name{
    font-family: 微软雅黑;
    font-size: 18px;
    color: #333;
    display: inline-block;
    float: left;
    line-height: 40px;
    height: 40px;
    width: 300px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .input-error{
    width: 1200px;
    height: 860px;
    overflow: hidden;
    background-color: #ffffff;
    border: solid 1px #eeeeee;
    /*margin-bottom: 172px;*/
    margin-top: 80px
  }
  .input-error .input_box{
    width: 100%;
    height: 550px;
    overflow: hidden;
    padding:60px 150px;
    position: relative;
    padding-top: 60px;
  }
  .input-error .input_box .input_content{
    margin-bottom: 30px;
    font-family: Microsoft Yahei, 微软雅黑;
    font-size: 20px;color: #333
  }
  .input-error .input_box .input_warning{
    margin-bottom: 20px;
    font-family: 新宋体;
    font-size: 16px;color: #999
  }
  .input-error .input_box .input_example{
    margin-bottom: 20px;
    font-family: 新宋体;
    color: #666
  }
  .input-error .input_box .input_exampleBox{
    width: 798px;
    height: 240px;
    background-color: #f9f9f9;
  }
  .input-error .input_box .input_img{
    position: absolute;
    left: 40px;
    top: 60px;
    width: 61px;
    height: 53px;
  }
  .input-error .input_again{
    width: 100%;
    height: 100px;
    background-color: #eeeeee;
    position: relative;
  }
  .input-error .input_again .rept{
    width: 120px;
    height: 40px;
    position: absolute;
    right: 58px;
    top: 30px;
    line-height: 40px;
    text-align: center;
    background-color: #ffffff;
    border-radius: 5px;
    border: solid 1px #dddddd;
    cursor: pointer;
  }


  .loading{
    position: absolute;
    left: 64px;
    top: 104px;
    width: calc(100vw - 100px);
    height: calc(100vh - 120px);
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

  /*解析加载框*/
  .loadingBox{
    position: absolute;
    left: 64px;
    top: 104px;
    width: calc(100vw - 100px);
    height: calc(100vh - 120px);
    z-index: 0;
  }

  .loadingBox .speedBox{
    width:670px;
    height:390px;
    background:rgba(255,255,255,1);
    border-radius:4px;
    box-shadow: 0 0 6px 4px rgba(0,0,0,.03);
    margin: 9.4% auto 0;
    overflow: hidden;
    position: relative;
  }

  .loadingBox .speedBox .speedTitle{
    text-align: center;
    margin: 42px auto 33px;
    line-height: 14px;
    font-size:14px;
    color:rgba(0,0,0,1);
  }

  .loadingBox .speedBox .waitTxt{
    font-size:14px;
    color:rgba(240,80,80,1);
    line-height: 14px;
    display: flex;
    justify-content: center;
    margin-bottom: 38px;
  }

  .loadingBox .speedBox .waitTxt i{
    font-size: 16px;
    margin-right: 8px;
  }

  .loadingBox .speedBox .loadingSteps{
    padding: 0 58px;
  }

  .loadingBox .speedBox .speedDesc{
    margin-top: 50px;
    font-size:12px;
    line-height: 20px;
    color:rgba(0,0,0,0.5);
    padding: 0 70px;
  }

  .loadingBox .speedBox .speedDesc>span{
    font-size:12px;
    color: #F05050;
  }

  .loadingBox .speedBox>img{
    position: absolute;
    bottom: 0;
    width: 100%;
  }

  /*解析错误框*/
  .errorBox .speedBox>img{
    margin: 24px auto;
    display: block;
    position: static;
    width: auto;
  }

  .errorBox .speedBox .errorTitle{
    text-align: center;
    font-size:20px;
    font-family:SimHei;
    color:rgba(57,63,81,1);
  }

  .errorBox .speedBox .errorDesc{
    font-size:12px;
    line-height: 22px;
    color:rgba(57,63,81,1);
    width: 480px;
    text-align: center;
    margin: 16px auto 30px;
  }

  .errorBox .speedBox .errorDesc span{
    color: #F05050;
    font-size:12px;
  }

  .errorBox .speedBox .errorDesc .link{
    color: #6C6FBF;
    text-decoration: underline;
    cursor: pointer;
    font-size: 12px;
  }

  .errorBox .speedBox .errorDesc .againBox{
    position: relative;
    cursor: pointer;
  }

  .errorBox .speedBox .errorDesc .againBox input{
    position: absolute;
    width:50px;
    height:13px;
    top: 0;
    left: 0;
    z-index: -1;
  }

  .errorBox .speedBox .errorBtnBox{
    width: 270px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
  }

  .errorBox .speedBox .errorBtnBox .errorBtn{
    width:126px;
    height:32px;
    background: none;
    border-radius:15px;
    flex-shrink: 0;
    text-align: center;
    line-height: 30px;
    font-size:16px;
    background:rgba(237,149,21,1);
    color:rgba(245,245,247,1);
    box-sizing: border-box;
    cursor: pointer;
  }

  .errorBox .speedBox .errorBtnBox div.errorBtn{
    color:rgba(237,149,21,1);
    border:1px solid rgba(237,149,21,1);
    background: none;
  }

  /* Text align it the center of screen and connect the looped animation for 2 seconds */
  .text{
    position: absolute;
    left: 48%;
    top: 46%;
    -webkit-animation: text 2s infinite;
    -moz-animation: text 2s infinite;
    -moz-animation: text 2s infinite;
    -ms-animation: text 2s infinite;
    -o-animation: text 2s infinite;
    animation: text 2s infinite;
    font-size: 20px;
  }



  .footer .btn:first-of-type{
    margin-right: 180px;
    margin-left: 296px;
  }
  .footer .btn{
    width: 120px;
    height: 40px;
    border-radius: 5px;
    background: #ED9515;
    line-height: 36px;
    text-align: center;
    color: #fff;
    font-family: Microsoft Yahei, 微软雅黑;
    font-size: 18px;
    padding: 0;
  }

  #footer{
    display: none;
  }
  #head{
    position: static;
  }

</style>
