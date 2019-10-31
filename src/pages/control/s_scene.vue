<template>
  <div class="s_Scene_Content">
    <div class="s_SceneListBox" id="s_SceneListBox">
      <div class="s_Scene_list" v-for="(item, index) in selectList" :key="index" @click="handleChange(index,$event)" id="s_Scene_list">
        <div class="s_SceneDesc">
          <div class="actorNames">
            {{item.names}}
          </div>
          <div class="title_Content">
            共{{item.sessions}}场戏，合计{{item.pages}}页
          </div>
        </div>
      </div>
    </div>
    <el-collapse class="listBox" style="">
      <!--<a class="s_SceneRightBtn" :href="'https://service.filmptn.com/file/download/extract_result_sub?project_id='+this.$route.query.project_id+'&user_id='+user_id">-->
        <!--<i class="iconfont iconxiazai1"></i>下载-->
      <!--</a>-->
      <div class="s_SceneRightBtn" @click="payDialog.dialogVisible=true" v-if="payDialog.isPay">
        <i class="iconfont iconxiazai1"></i>导出
      </div>
      <div class="s_SceneRightBtn" @click="download" v-else>
        <i class="iconfont iconxiazai1"></i>导出
      </div>

      <el-collapse-item class="s_SceneInfoBox">
        <template slot="title">
          <div class="s_sceneBox">
            <div class="s_sceneTitleBox">
              <div class="actorNames">
                {{sizeForm.name}}
              </div>
              <div class="title_Content">
                共{{sizeForm.sessions}}场戏，合计{{sizeForm.pages}}页
              </div>
            </div>
          </div>
        </template>
        <el-form ref="form" :model="sizeForm" label-width="80px" size="mini" class="s_Scene_list_Form">
          <div class="s_SceneCity">
            <el-form-item label="地址:" class="s_Scene_list_FormCity">
              <area-cascader class="citySelet" type='text' placeholder="请选择地址" v-model="sizeForm.selected" :level='1' :data="pcaa" v-if="areaCascaderShow"></area-cascader>
            </el-form-item>
            <el-input v-model="sizeForm.realAddress" placeholder="请选择位置" class="s_Scene_list_FormPlace"></el-input>
          </div>
          <div class="contractPeriod">
            <!--<el-form-item-->
              <!--label="合约期:">-->
              <!--<div class="block">-->
                <!--<el-date-picker-->
                  <!--v-model="sizeForm.date1[0]"-->
                  <!--type="daterange"-->
                  <!--range-separator="至"-->
                  <!--value-format="timestamp"-->
                  <!--start-placeholder="开始日期"-->
                  <!--end-placeholder="结束日期">-->
                <!--</el-date-picker>-->
                <!--<div @click="addDomain" class="timeBtn addTimeBtn">添加</div>-->
              <!--</div>-->
            <!--</el-form-item>-->
            <el-form-item
              v-for="(domain, index) in sizeForm.date1"
              :key="index" class="s_SceneDatePicker" :label="index=='0'?'合约期:':''">
              <el-date-picker
                v-model="sizeForm.date1[index]"
                type="daterange"
                value-format="timestamp"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
              <div class="timeBtnBox">
                <div @click="addDomain" class="timeBtn addTimeBtn">添加</div>
                <div @click.prevent="removeDomain(domain)" class="timeBtn" v-if="index!=0">删除</div>
              </div>
            </el-form-item>
            <div class="s_Scene_list_Save" @click="saveData">保存</div>
          </div>
        </el-form>
      </el-collapse-item>
      <div id="sceneHot-preview">
        <div v-for="item,key in settings.data" class="trBox" :key="key">
          <div v-for="i,index in item" class="thBox" :key="index" v-if="key == 0" v-html="i"></div>
          <div v-for="i,index in item" class="thBox" :key="index" v-if="key != 0 && index != 6 && index != 7 && index != 8 && index != 9 && index != 10" v-html="i"></div>
          <div v-for="i,index in item" class="thBox" :key="index" v-if="key != 0 && index == 6">
            <el-popover
              placement="bottom"
              width="200"
              trigger="hover"
              :content="i">
              <el-button slot="reference" class="s_scenTableBtn">演员</el-button>
            </el-popover>
          </div>
          <div v-for="i,index in item" class="thBox" :key="index" v-if="key != 0 && index == 7">
            <el-popover
              placement="bottom"
              width="200"
              trigger="hover"
              :content="i">
              <el-button slot="reference" class="s_scenTableBtn">道具</el-button>
            </el-popover>
          </div>
          <div v-for="i,index in item" class="thBox" :key="index" v-if="key != 0 && index == 8">
            <el-popover
                placement="bottom"
                width="200"
                trigger="hover"
                :content="i">
              <el-button slot="reference" class="s_scenTableBtn">特殊道具</el-button>
            </el-popover>
          </div>
          <div v-for="i,index in item" class="thBox" :key="index" v-if="key != 0 && index == 9">
            <el-popover
                placement="bottom"
                width="200"
                trigger="hover"
                :content="i">
              <el-button slot="reference" class="s_scenTableBtn">服化</el-button>
            </el-popover>
          </div>
          <div v-for="i,index in item" class="thBox" :key="index" v-if="key != 0 && index == 10">
            <el-popover
                placement="bottom"
                width="200"
                trigger="hover"
                :content="i">
              <el-button slot="reference" class="s_scenTableBtn">特效</el-button>
            </el-popover>
          </div>
        </div>
      </div>

    </el-collapse>
    <a id="target" style="display: none"></a>
    <!--微信支付浮窗-->
    <transition name="el-zoom-in-top">
      <div class="payCodeBox" v-show="innerVisible">
        <div class="innerVisibleBox" id="wxpayCodeBox">

          <img class="payInside" :src="payInsideSrc">
          <div class="payDesc">微信扫码完成支付</div>
        </div>
      </div>
    </transition>
    <!--支付宝支付浮窗-->
    <transition name="el-zoom-in-top">
      <div class="payCodeBox" v-show="alipayDialog">
        <div class="innerVisibleBox alipayVisibleBox" id="alipayCodeBox">

          <iframe class="alipayQRcode" src=""></iframe>
          <div class="payDesc">支付宝扫码完成支付</div>
        </div>
      </div>
    </transition>

    <!--顺场支付弹窗-->
    <el-dialog class="payBox s_scenePayBox" :title="name" :visible.sync="payDialog.dialogVisible" center @closed="payStep=1">
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
        <div class="downLoadDesc"><span>*</span>提示：若开通下载功能后场次数量增加，需增补场次数量差价</div>
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
    <!--无权限弹框-->
    <no-access :noAccessVisible="noAccess" @close="(v)=>{noAccess = v}"></no-access>
  </div>
</template>

<script>
  import myUpload from 'vue-image-crop-upload';
  import axios from "axios"
  import { pca, pcaa } from "area-data";
  import global_ from '../../common/Global'
  import 'vue-area-linkage/dist/index.css'; // v2 or higher
    export default {
      name: "s_scene",
      data () {
        var that = this;
        return {
          pcaa: pcaa,//最多省市区三级，结合:level='2'选择，0省、1省市、2省市区
          tableData4:[],
          tableTitle:[],
          show : false,
          imgDataUrl: this.$route.createImgUrl,
          params: {
              user_id:'',
              profile:''
          },
            payStep:1,//支付步骤
            coupon:[],//优惠券
            couponId:'',//选择的优惠券id
            couponValue:'',//选择的优惠券
            payResult:'',//支付结果
            payDialog:{
                payChecked:true,//下载抵扣复选框
                payMethodRadio:1,//下载方式微信
                dialogVisible:false,//下载弹框
                sceneNum:'',//场次数量
                scenePrice:'',//场次合计
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
            name:'',//项目名称
          selectList:[],
          sizeForm: {
            name:'',
            selected: [],
            date1: [],
            realAddress:'',
            dynamicValidateForm: {
              domains: [{
                value: ''
              }],
            },
            sessions:0,
            pages:0
          },
          root: 'test-hot',
          info :'',
          hot:'',
          settings: {
            data: [],
            language: 'zh-CN',//语言
              colWidths:[94,160,92,92,92,340,700,90],
              readOnly:true,//锁定只读
            filters: false,// 筛选条件
            exportFile:true,
            customBorders:[],//添加边框
            fixedRowsTop:1,
            outsideClickDeselects: false,
            minSpareRows:4, //最小行数
            selectionMode: 'multiple',// 'single', 'range' or 'multiple'选择范围
              renderer: "html",
          },
          utl:{},
          cells_o:[],
          ret:true,
          error:false,
          play:this.$route.query.play_id,
          seconds:0,
          director:'',
          type:'',
          play_file:'',
          user_id:localStorage.getItem("user_id").replace("\"","").replace("\"",""),
          project_id:'',
          play_id:'',
          pages_num:1,
          page_size:'12',
          index:0,
            areaCascaderShow:true,//控制地区层级选择器显示
          host:global_.pathInfo,
          authId:0,//权限信息
          noAccess:false,//无权限弹框
        }
      },
      components: {myUpload},
      methods:{
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

          PayButtom(){
              if (this.payDialog.payMethodRadio == 1){
                  this.payChat()
              } else {
                  this.alipay()
              }

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
                              if(response.data.ret == '0'){
                                  this.payResult= '支付成功'
                                  window.clearInterval(payLoad);
                                  var payClose = window.setTimeout(() => {
                                      this.alipayDialog = false;
                                      this.payDialog.dialogVisible = false
                                      this.payDialog.isPay = false
                                  },3000)

                                  this.download()

                              }else{
                                  if(this.alipayDialog == false){
                                      window.clearInterval(payLoad);
                                  }
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
                                  this.payResult= '支付成功'
                                  window.clearInterval(payLoad);
                                  var payClose = window.setTimeout(() => {
                                      this.innerVisible = false;
                                      this.payDialog.dialogVisible = false
                                      this.payDialog.isPay = false
                                  },3000)
                                  this.download()
                              }else{
                                  if(this.innerVisible == false){
                                      window.clearInterval(payLoad);
                                  }
                                  // this.$message.error(response.data.msg);
                              }
                          })
                      }, 3000);

                  }else{
                      this.$message.error(response.data.msg);
                  }
              })
          },
        //下载
          download(){
              var href = this.host+'/file/download/extract_result_sub?project_id='+this.$route.query.project_id+'&user_id='+this.user_id
              document.getElementById('target').href= href
              document.getElementById('target').click()
          },
        // 保存
        saveData(val){
          if(this.authId==1){
            let form = new FormData()
            form.append("scene_id", this.selectList[this.index].id);
            if(this.sizeForm.selected){
              form.append("city", this.sizeForm.selected);
            }
            if(this.sizeForm.realAddress != '' && this.sizeForm.realAddress != undefined){
              form.append("location", this.sizeForm.realAddress);
            }
            let arr = new Array();
            for(let i = 0; i <this.sizeForm.date1.length; i++){
              if(this.sizeForm.date1[i] != '' && this.sizeForm.date1[i] != undefined){
                let obj = {start: this.sizeForm.date1[i][0], end: this.sizeForm.date1[i][1]}
                arr.push(obj)
              }
            }
            if(arr != ''){
              form.append("contract", JSON.stringify(arr));
            }
            axios({
              method: 'post',
              url: '/play/scene_addon_upsert',
              data:form,
              headers:{
                'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundaryAZCU7ve1goo6tPnP',
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
                this.$message.error(response.data.msg);
              }
            })
          }else{
            this.noAccess = true
          }

          },
        //拿场景名称
        sceneName(){
          axios.get('/play/scenes_all',{
            params:{
              page_size:'12',
              page_num: this.pages_num,
              play_id : this.$route.query.play_id
            }
          }).then((response)=> {
            if(response.data.ret == '0'){
              for(var i = 0; i < response.data.data.length ; i++){
                if(response.data.data[i] != null){
                  let j = { region: '', realAddress: '', date1:[,],
                    dynamicValidateForm: {
                      domains: [{
                        value: ''
                      }],
                    },
                  }
                  let obj = {names:response.data.data[i].scene_name,sizeForm:j,id:response.data.data[i].scene_id,sessions:response.data.data[i].sessions,pages:response.data.data[i].pages};
                  this.selectList.push(obj)
                }
              }
              this.$nextTick( ()=> {
                  this.handleChange(0)
              })
            }
          })
        },

        handleChange(val,e) {
            this.areaCascaderShow = false
          this.index = val
          if(e != undefined){
              const path = e.path || (e.composedPath && e.composedPath());
              if(path.length == 13){
                  $(path[0]).addClass("active").siblings().removeClass("active");
              }else if (path.length == 15){
                $(path[2]).addClass("active").siblings().removeClass("active");
              }else{
                  $(path[1]).addClass("active").siblings().removeClass("active");
              }
          }else{
              $('#s_Scene_list').addClass("active").siblings().removeClass("active");
          }
          if(this.selectList[val].names != ''){
            this.sizeForm.name = this.selectList[val].names
            axios.get('/play/scene_addon', {
                params: {
                    scene_id: this.selectList[val].id,
                }
            }).then((response)=> {
                if(response.data.ret=='0'){
                    if(response.data.data.location !== 'undefined'){
                        this.sizeForm.realAddress = response.data.data.location
                    }
                    // this.selectList[0].sizeForm.date1.push(response.data.data.contract)
                    var arr = new Array;
                    if(response.data.data.contract){
                        arr = JSON.parse(response.data.data.contract)
                        // this.sizeForm.date1.shift()
                        for(let i = 0; i < arr.length; i++){
                              let day = [arr[i].start,arr[i].end]
                              this.sizeForm.date1.push(day)
                              if(i != 0 && i != 1 && arr[0][i]!=''){
                                  this.selectList[val].sizeForm.dynamicValidateForm.domains.push({
                                      value: '',
                                      key: Date.now()
                                  });
                              }

                        }
                    }else{
                        this.sizeForm.date1 = [[]]
                    }
                    this.sizeForm.pages = response.data.data.pages
                    this.sizeForm.sessions = response.data.data.sessions
                    if(response.data.data.city){
                        var cityArr = new Array()
                        cityArr.push(response.data.data.city.split(','))
                        this.sizeForm.selected = []
                        for(let i = 0; i < cityArr[0].length; i++){
                            this.sizeForm.selected.push(cityArr[0][i])
                        }
                    }else{
                        this.sizeForm.selected = []
                    }
                    this.$nextTick(() => {
                        this.areaCascaderShow = true
                    })

                }
            })
            axios.get('/play/extract_result_sub', {
              params: {
                  id: this.selectList[val].id,
                  option: 'scene'
              }
            }).then((response)=> {
              if(response.data.ret=='0'){
                  this.settings.data = response.data.data
              }
            })
          }
        },
        objectSpanMethod({ row, column, rowIndex, columnIndex }) {
          if (columnIndex === 8) {
            if (rowIndex % 10 === 0) {
              return {
                rowspan: 10,
                colspan: 1
              };
            } else {
              return {
                rowspan: 0,
                colspan: 1
              };
            }
          }
        },

        //上传头像部分
        handleSelect(key, keyPath) {
            // console.log(key, keyPath);
        },
        input(res){
            this.show=res
        },
        getBlobBydataURI(imgDataUrl,type) {
            var binary = atob(imgDataUrl.split(',')[1]);
            var array = [];
            for(var i = 0; i < binary.length; i++) {
                array.push(binary.charCodeAt(i));
            }
            return new Blob([new Uint8Array(array)], {type:type });
        },

        toggleShow() {
            this.show = !this.show;
        },
        cropSuccess(imgDataUrl, field){
          this.imgDataUrl = imgDataUrl;
          var $Blob= this.getBlobBydataURI(imgDataUrl,'image/jpeg');
          let form = new FormData()
          form.append("user_id",JSON.parse(localStorage.user_id));
          form.append("profile_picture", $Blob ,"file_"+Date.parse(new Date())+".jpeg");
          axios({
            method: 'post',
            url: '/user/upload_profile_picture',
            data:form,
            headers:{
                'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundaryAZCU7ve1goo6tPnP',
                'Accept': '*/*',
                'X-Requested-With': 'XMLHttpRequest'
            }
          }).then((response)=> {
            if(response.data.msg == 'ok'){
                this.show = false
                this.$router.go(0)
            }
          })
        },
        cropUploadSuccess(jsonData, field){
          axios({
            method: 'post',
            url: '/user/profile/upload',
            data:this.params,
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
              // if(response.data.msg == 'ok'){
              //     alert('保存成功')
              // }
              console.log(response)
          })
        },
        cropUploadFail(status, field){

        },

        //下载校验
        downloadCheck(){
          if(this.authId==1){
              axios({
                  method: 'get',
                  url: '/pay/project/cost?project_id='+this.$route.query.project_id,
                  headers:{
                      'Content-type': 'application/x-www-form-urlencoded'
                  }
              }).then((response) => {
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
            })
          }else{
            this.noAccess = true
          }

        },

        addDomain() {
          // this.sizeForm.dynamicValidateForm.domains.push({
          //   value: '',
          //   key: Date.now()
          // });
            this.sizeForm.date1.push([])
        },
        removeDomain(item) {
          // var i = this.sizeForm.dynamicValidateForm.domains.indexOf(item)
            var date = this.sizeForm.date1.indexOf(item)
          if (date !== -1) {
            // this.sizeForm.dynamicValidateForm.domains.splice(i, 1)
            // if( this.sizeForm.date1.length >= i && this.sizeForm.date1 != ''){
                this.sizeForm.date1.splice(date, 1)
            // }
          }else{
              this.sizeForm.dynamicValidateForm.domains.pop()
          }
        },

        //懒加载
        nexts(){
          this.pages_num++;
          this.sceneName();
        },

        //懒加载滚动条
        scroll(){

          // 滚动条距离顶部高度
          let scrollTop = document.getElementById('s_SceneListBox').scrollTop;

          // 可见区域高度
          let clientHeight = document.getElementById('s_SceneListBox').clientHeight;

          let scrollHeight = document.getElementById('s_SceneListBox').scrollHeight;

          if(scrollHeight <= clientHeight + scrollTop ) {
            this.nexts()
          }

        }
      },
      mounted () {
          document.getElementById('s_SceneListBox').addEventListener('scroll', this.scroll);
          // this.scroll();
          this.sceneName();
          axios.get('/project/info', {
              params: {
                  project_id: this.$route.query.project_id
              }
          }).then((response)=> {
              this.name = response.data.data.name;
          })
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
            this.downloadCheck();
        })
      },
    }
</script>


<style>
  .s_Scene_Content .payBox .el-dialog{
    width: 800px;
    margin-top: 5vh!important;
  }

  .s_Scene_Content .payBox .el-dialog__header{
    /*border-bottom: none;*/
    display: none;
  }

  .s_Scene_Content .payBox .el-dialog__body{
    padding: 34px 0;
  }

  /*步骤条*/
  .s_Scene_Content .payBox .scenePayStepBox .el-step__line{
    height:1px;
    background:rgba(168,167,167,1);
    top: 10px;
  }

  .s_Scene_Content .payBox .scenePayStepBox .el-step__head.is-process{
    color: #A8A7A7;
    border-color: #A8A7A7;
  }

  .s_Scene_Content .payBox .scenePayStepBox .el-step__head .el-step__icon{
    background:rgba(168,167,167,1);
    border-color: rgba(168,167,167,1);
    width: 20px;
    height: 20px;
    color: #fff;
  }

  .s_Scene_Content .payBox .scenePayStepBox .el-step__head .el-step__icon .el-step__icon-inner{
    font-size: 12px;
  }

  .s_Scene_Content .payBox .scenePayStepBox .el-step__title{
    font-size:14px;
    line-height: 14px;
    margin-top: 15px;
    color: #A8A7A7;
    font-weight: normal;
  }

  .s_Scene_Content .payBox .scenePayStepBox .el-step__head.is-finish .el-step__line-inner{
    background: #32C58F;
    color: #32C58F;
    border-color: #32C58F;
    border-bottom: 0;
  }

  .s_Scene_Content .payBox .scenePayStepBox .el-step__head.is-finish .el-step__icon{
    background: #fff;
    border-color: #32C58F;
    color: #32C58F;
  }


  .s_Scene_Content .payBox .scenePayStepBox .el-step__title.is-finish{
    color:rgba(57,63,81,1);
  }

  /*单选框*/
  .s_Scene_Content .payBox .payMethodBox .el-radio__input{
    display: none;
  }

  .s_Scene_Content .payBox .payMethodBox .el-radio__label{
    font-size:14px;
    color:rgba(57,63,81,1);
    font-family: Microsoft Yahei, 微软雅黑;
    display: flex;
    align-items: center;
    padding: 0;
  }

  .s_Scene_Content .payBox .payMethodBox .el-radio__label i{
    font-size: 32px;
    color: #1AB45E;
    margin-right: 12px;
  }

  .s_Scene_Content .payBox .payMethodBox .el-radio:last-child .el-radio__label i{
    color: #1296DB;
  }

  /*下拉菜单*/
  .s_Scene_Content .payBox .couponSelectBox .couponSelect .el-input__inner{
    width:160px;
    height:24px;
    background:rgba(244,244,246,1)!important;
    border:1px solid rgba(209,208,219,1);
    border-radius:2px;
    padding-left: 12px;
  }

  .s_Scene_Content .payBox .couponSelectBox .couponSelect .el-input__suffix i{
    line-height: 24px;
  }

  /*单选框*/
  .s_Scene_Content .payBox .payMethodBox .el-radio__input .el-radio__inner{
    width:16px;
    height:16px;
    border:1px solid rgba(186,186,186,0.8);
    border-radius:2px;
    transition: all 0.8s;
  }

  .s_Scene_Content .payBox .payMethodBox .el-radio__input .el-radio__inner:after{
    width: 0;
  }

  .s_Scene_Content .payBox .payMethodBox .payMethodItem .el-radio__label{
    display: flex;
    align-items: center;
    color:rgba(0,0,0,0.8);
  }

  .s_Scene_Content .payBox .downLoadMain .payFooterBox .el-checkbox span{
    color: #7C7C7C;
  }

  .s_Scene_Content .payBox .downLoadMain .payFooterBox .lineH .el-radio__input:hover .el-radio__inner,
  .s_Scene_Content .payBox .downLoadMain .payFooterBox .el-checkbox__input .el-checkbox__inner {
    border-color: #ED9515;
  }

  .s_Scene_Content .payBox .downLoadMain .payFooterBox .el-checkbox__input.is-checked .el-checkbox__inner,
  .s_Scene_Content .payBox .downLoadMain .payFooterBox .lineH .el-radio__input.is-checked .el-radio__inner{
    background-color: #ED9515;
    border-color: #ED9515;
  }

  .s_Scene_Content .payBox .el-dialog__footer{
    height: 144px;
  }

  .s_Scene_Content .el-collapse-item__header{
    height: auto !important;
    background: none;
    border-color: rgba(231,231,236,1);
  }

  .s_Scene_Content .el-collapse-item__header.is-active{
    border-bottom: 1px solid #EBEEF5;
  }

  .listBox .s_SceneInfoBox .el-collapse-item__wrap{
    overflow: visible;
    border-bottom: none;
    background: none;
  }

  .s_Scene_list_Form .s_Scene_list_FormCity,
  .s_Scene_list_Form .s_Scene_list_FormPlace{
    display: inline-block;
    margin-bottom: 30px!important;
  }

  .s_Scene_list_Form .s_Scene_list_FormCity .citySelet{
    line-height: 16px;
  }
  .s_Scene_list_Form .s_Scene_list_FormCity .citySelet .area-select.large{
    height: 32px;
    width: 300px;
    margin-top: 0;
  }
  .s_Scene_list_Form .s_Scene_list_FormCity .citySelet .area-select.large .cascader-menu-list-wrap{
    top: 32px!important;
  }

  .s_Scene_list_FormPlace .el-input__inner{
    height: 34px;
    width: 266px;
  }

  .s_Scene_list_FormPlace .el-input__inner:hover,
  .s_Scene_list_FormPlace .el-input__inner:focus{
    border-color: #a1a1a1;
  }

  .s_Scene_list_Form .el-form-item .el-form-item__content .el-input .el-input__inner,
  .s_Scene_list_Form .el-form-item .el-form-item__content .el-date-editor{
    height: 34px;
    width: 380px;
  }

  .s_Scene_list_Form .el-form-item .el-form-item__content{
    display: flex;
    align-items: center;
  }
  .s_Scene_list_Form .contractPeriod .el-form-item{
    height: 34px;
    margin-bottom: 12px!important;
  }
  .s_Scene_list_Form .el-form-item .el-form-item__content .block{
    margin-bottom: 18px;
  }
  .s_Scene_list_Form .el-form-item .el-form-item__content .el-date-editor .el-range-input,
  .s_Scene_list_Form .el-form-item .el-form-item__content .el-date-editor .el-range-separator,
  .s_Scene_list_Form .el-form-item .el-form-item__content .el-date-editor .el-input__icon{
    font-size: 14px;
    line-height: 34px;
  }

  .s_Scene_list_Form .el-form-item .el-form-item__content .el-date-editor .el-input__icon,
  .s_Scene_list_Form .el-form-item .el-form-item__content .el-date-editor .el-range-separator{
    padding: 0;
    line-height: 28px;
  }
  .s_Scene_list_Form .el-form-item .el-form-item__label{
    font-size: 18px;
    font-weight: normal;
    /*width: 100px!important;*/
    color: #333!important;
    font-family: Microsoft Yahei, 微软雅黑;
    text-align: left;
  }
  .s_Scene_list_Form .el-form-item .el-form-item__label{
    width: auto!important;
    margin-right: 0!important;
    line-height: 34px;
    font-size: 16px;
  }
  .s_Scene_list_Form .s_Scene_list_FormCity .el-form-item__content{
    margin-left: 68px!important;
    margin-right: 30px;
    height: 34px;
  }
  .s_Scene_list_Form .s_Scene_list_FormPlace .el-form-item__content{
    margin-left: 89px!important;
  }
</style>
<style scoped>
  *{
    box-sizing: border-box;
  }

  .s_Scene_Content{
    margin: 30px 0 0 12px;
  }

  .s_Scene_Content .s_SceneListBox{
    /*width: 20%;*/
    width: 23%;
    height: calc(100vh - 160px);
    overflow-x: hidden;
    overflow-y: scroll;
    float: left;
  }

  .s_Scene_Content .listBox{
    float: left;
    margin-left: 40px;
    width: 72%;
    padding-bottom: 50px;
    border: none;
    position: relative;
  }

  .s_Scene_Content .s_SceneRightBtn{
    position: absolute;
    top: -50px;
    right: 20px;
    font-size:12px;
    line-height: 12px;
    color:rgba(102,102,102,1);
    cursor: pointer;
    text-decoration: none;
  }

  .s_Scene_Content .s_SceneRightBtn i{
    font-size: 14px;
    color: #FF690E;
    line-height: 20px;
    margin-right: 8px;
  }

  .s_Scene_Content .listBox .s_SceneInfoBox{
    margin-bottom: 30px;
  }

  .s_Scene_Content .listBox .s_SceneInfoBox.is-active{
    margin-bottom: 0px;
  }

  .s_Scene_list{
    display: flex;
    align-items: center;
    height: 80px;
    cursor: pointer;
    margin-right: 10px;
    margin-bottom: 10px;
    background: rgba(231,231,236,1);
    border-radius: 6px;
    box-sizing: border-box;
    border-bottom: 4px solid rgba(231,231,236,1);
    transition: border-bottom-color 0.6s;
  }

  .s_Scene_list.active{
    border-bottom-color: rgba(237,149,21,1);
  }

  .active{
    border-bottom-color: rgba(237,149,21,1);
  }

  .s_Scene_list:hover{
    border-bottom-color: rgba(237,149,21,1);
  }

  .s_Scene_list:last-of-type{
    margin-bottom: 0;
  }

  .s_Scene_list .s_SceneDesc{
    margin-left: 9.2%;
    width: calc(100% - 60px);
  }

  .actorNames{
    height: 14px;
    line-height: 14px;
    margin-bottom: 16px;
    color: #000;
    width: 100%;
    font-size: 14px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }

  .title_Content{
    height: 12px;
    line-height: 12px;
    width: 100%;
    font-size: 12px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    color: rgba(0,0,0,.6);
  }

  .s_sceneBox{
    width: 72%;
    float: left;
    margin-left: 15px;
  }

  .s_sceneBox .s_sceneTitleBox{
    height: 68px;
    width: 100%;
    /*border-bottom: 1px solid #EEEEEE;*/
  }

  .s_sceneBox .s_sceneTitleBox .actorNames{
    margin-bottom: 20px;
    margin-top: 20px;
  }

  /*表格*/
  #sceneHot-preview{
    float: left;
    width: 100%;
    box-sizing: border-box;
  }

  #sceneHot-preview .trBox{
    display: flex;
    height: 96px;
    align-items: center;
    border-bottom: 1px solid rgba(231,231,236,1);

  }

  #sceneHot-preview .trBox:first-of-type{
    height: 58px;
    background: rgba(231,231,236,1);
    border-radius: 6px;
    font-size: 16px;
    border-bottom: none;
  }

  #sceneHot-preview .trBox .thBox{
    width: 80px;
    height: 94px;
    line-height: 20px;
    overflow : hidden;
    text-overflow: ellipsis;
    word-break: break-all;
    display: -webkit-box;
    -webkit-line-clamp: 4; /* 行数*/
    -webkit-box-orient: vertical;
    text-align: center;
    margin-right: 20px;
    padding: 10px 0;
    color: rgba(0,0,0,.8);
    font-size: 14px;
    box-sizing: border-box;
  }

  #sceneHot-preview .trBox:first-of-type .thBox{
    line-height: 58px;
    height: 58px;
    padding: 0;
    color: #000;
  }

  #sceneHot-preview .trBox .thBox:nth-of-type(1),
  #sceneHot-preview .trBox .thBox:nth-of-type(5),
  #sceneHot-preview .trBox .thBox:nth-of-type(4){
    width: 60px;
  }

  #sceneHot-preview .trBox .thBox:nth-last-of-type(3){
    width: 230px;
  }

  #sceneHot-preview .trBox .thBox:nth-last-of-type(1),
  #sceneHot-preview .trBox .thBox:nth-last-of-type(2){
    width: 90px;
    margin: 0 10px;
  }

  #sceneHot-preview .trBox .thBox:nth-last-of-type(1){
    margin-right: 0;
  }

  #sceneHot-preview .trBox .thBox .s_scenTableBtn{
    border: none;
    color: #ED9515;
    padding: 16px 0;
    background: none;
  }

  #sceneHot-preview .trBox .thBox .s_scenTableBtn:hover{
    background: none;
  }

  /*表格上方的表单*/
  .s_Scene_list_Form{
    padding: 35px 50px 26px 30px;
    margin-top: 42px;
    min-height: 180px;
    box-sizing: border-box;
    border-radius: 6px;
    border:1px solid #e4e4ea;
    position: relative;
    margin-bottom: 24px;
    background: #fff;
  }
  .s_Scene_list_Form .s_SceneCity{
    display: flex;
    align-items: center;
  }

  .timeBtnBox .timeBtn{
    border-left: 1px solid #7B7B7B;
    padding-left: 14px;
    margin-left: 20px;
    cursor: pointer;
    font-size: 14px;
    line-height: 18px;
    height: 18px;
    display: inline-block;
    color: #7B7B7B;
  }

  .timeBtnBox .timeBtn.addTimeBtn{
    padding-left: 0;
    margin-left: 24px;
    border: none;
    color: #ED9515;
  }

  .s_Scene_list_Save{
    width:102px;
    height:32px;
    background:rgba(237,149,21,1);
    border-radius:16px;
    font-size:16px;
    color: #fff;
    text-align: center;
    line-height: 32px;
    cursor: pointer;
    position: absolute;
    bottom: 40px;
    right: 50px;
  }

  /*下载弹框*/
  .alipayQRcode{
    width: 100px;
    height: 110px;
    display: block;
    margin: 0 auto;
    overflow-x: hidden;
    overflow-y: hidden;
    border: none;
  }

  .s_Scene_Content .payBox .payDesc{
    margin-top: 20px;
    text-align: center;
  }

  /*步骤条*/
  .s_Scene_Content .payBox .scenePayStepBox{
    padding: 0 74px;
  }

  .s_Scene_Content .payBox .downLoadMain{
    padding: 36px 150px;
  }

  .s_Scene_Content .payBox .downLoadMain .countBox{
    width:100%;
    padding: 10px 18px;
    background:rgba(57,63,81,0.08);
    border:1px solid rgba(0,0,0,0.08);
    border-radius:4px;
    margin-bottom: 8px;
    box-sizing: border-box;
  }

  .s_Scene_Content .payBox .downLoadMain .countBox .countItemBox{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 14px;
  }

  .s_Scene_Content .payBox .downLoadMain .countBox .countItemBox .countItemLeft{
    color: #616574;
    font-size: 12px;
    line-height: 12px;
  }

  .s_Scene_Content .payBox .downLoadMain .countBox .countItemBox .countItemRight,
  .s_Scene_Content .payBox .downLoadMain .countBox .countItemBox .countItemRight span{
    color: #393F51;
    font-size: 12px;
    line-height: 12px;
  }

  .s_Scene_Content .payBox .downLoadMain .countBox .countItemBox:first-child{
    margin-top: 0;
  }

  .s_Scene_Content .payBox .downLoadMain .countBox .countItemBox:first-child .countItemLeft{
    font-size:14px;
    color:rgba(57,63,81,1);
    line-height: 14px;
  }

  .s_Scene_Content .payBox .downLoadMain .countBox .countItemBox .countItemRight .desc{
    color:rgba(240,80,80,.8);
  }

  .s_Scene_Content .payBox .downLoadMain .countBox .countItemBox .countItemRight .discount{
    text-decoration: line-through;
  }

  /*优惠券*/
  .s_Scene_Content .payBox .couponBox .couponTopBox{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 18px 0;
  }

  .s_Scene_Content .payBox .couponBox .couponTopBox>div{
    font-size:12px;
    font-family:Microsoft YaHei;
    font-weight:400;
    color:rgba(0,0,0,1);
    opacity:0.8;
  }

  .s_Scene_Content .payBox .couponBox .couponContentBox{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 18px;
    height: 60px;
    width: 100%;
    overflow: hidden;
  }

  .s_Scene_Content .payBox .couponBox .couponContentBox .couponBtn{
    width:14px;
    height: 100%;
    background:rgba(57,63,81,0.08);
    border:1px solid rgba(0,0,0,0.08);
    border-radius:6px;
    text-align: center;
    cursor: pointer;
  }

  .s_Scene_Content .payBox .couponBox .couponContentBox .couponBtn i{
    font-size: 14px;
    color: #616574;
    line-height: 58px;
  }

  .s_Scene_Content .payBox .couponBox .couponContentBox .scrollBox{
    width: calc(100% - 28px);
    height: 60px;
    overflow: hidden;
    position: relative;
  }

  .s_Scene_Content .payBox .couponBox .couponContentBox ul{
    display: flex;
    align-items: center;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    transition: left .8s;
  }

  .s_Scene_Content .payBox .couponBox .couponContentBox ul li{
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

  .s_Scene_Content .payBox .couponBox .couponContentBox ul li.active{
    background:rgba(251,234,208,1);
    border-color:rgba(237,149,21,1);
  }

  .s_Scene_Content .payBox .couponBox .couponContentBox ul .couponItemTop{
    display: flex;
    align-items: flex-end;
    padding: 8px 0 8px 6px;
    border-bottom: 1px dashed;
    border-color: rgba(210,210,210,1);
    transition: all 0.4s;
  }

  .s_Scene_Content .payBox .couponBox .couponContentBox ul li.active .couponItemTop{
    border-color: rgba(237,149,21,1);
  }

  .s_Scene_Content .payBox .couponBox .couponContentBox ul .couponItemTop .couponNum{
    font-size:24px;
    color:rgba(57,63,81,0.8);
    margin-right: 12px;
    line-height: 20px;
    transition: all 0.4s;
  }

  .s_Scene_Content .payBox .couponBox .couponContentBox ul li.active .couponNum{
    color:rgba(240,80,80,1);
  }

  .s_Scene_Content .payBox .couponBox .couponContentBox ul .couponItemTop .couponDesc{
    font-size:12px;
    color:rgba(57,63,81,0.8);
    line-height: 13px;
    transition: all 0.4s;
  }

  .s_Scene_Content .payBox .couponBox .couponContentBox ul li.active .couponDesc,
  .s_Scene_Content .payBox .couponBox .couponContentBox ul li.active .couponDate{
    color:rgba(0,0,0,.8);
  }

  .s_Scene_Content .payBox .couponBox .couponContentBox ul .couponDate{
    font-size:12px;
    color:rgba(57,63,81,0.8);
    line-height: 12px;
    margin-top: 4px;
    padding-left: 5px;
    transition: all 0.4s;
  }

  /*开通会员*/
  .s_Scene_Content .payBox .totalBox{
    width:100%;
    height:80px;
    background:rgba(108,111,191,0.08);
    border:1px solid rgba(0,0,0,0.08);
    border-radius:6px;
    margin-top: 26px;
    padding: 12px 10px 12px 20px;
  }

  .s_Scene_Content .payBox .totalBox>div{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .s_Scene_Content .payBox .totalBox .totalTop{
    margin-bottom: 8px;
  }

  .s_Scene_Content .payBox .totalBox .totalTop .totalTitle{
    font-size:12px;
    color:rgba(0,0,0,1);
  }

  .s_Scene_Content .payBox .totalBox .totalTop .totalNum{
    font-size:16px;
    color:#F05050;
    font-weight: bold;
    margin-right: 8px;
  }

  .s_Scene_Content .payBox .totalBox .memberBox .desc{
    font-size:12px;
    color:rgba(240,80,80,1);
  }

  .s_Scene_Content .payBox .totalBox .memberBox .btn{
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

  .s_Scene_Content .payBox .downLoadDesc{
    font-size:12px;
    line-height: 12px;
    color:#616574;
    margin: 34px 0 14px;
  }

  .s_Scene_Content .payBox .downLoadDesc span{
    font-size:12px;
    line-height: 12px;
    color:rgba(240,80,80,1);
  }

  .s_Scene_Content .payBox .stepBtn{
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

  .s_Scene_Content .payBox .downLoadDesc+.stepBtn{
    margin-top: 0;
  }

  /*支付方式*/
  .s_Scene_Content .payBox .payMethodBox .payMethodTitleBox{
    margin: 20px 0;
  }

  .s_Scene_Content .payBox .payMethodBox .payMethodTitleBox .payMethodTitle{
    font-size:14px;
    color:rgba(57,63,81,1);
    line-height: 14px;
  }

  .s_Scene_Content .payBox .payMethodBox .payMethodRadio{
    display: flex;
  }

  .s_Scene_Content .payBox .payMethodBox .payMethodItem{
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

  .s_Scene_Content .payBox .payMethodBox .payMethodItem.is-checked{
    background:rgba(253,244,231,1);
    border-color: rgba(237,149,21,1);
  }

  /*确认支付*/
  .s_Scene_Content .payBox .downLoadMain.payFinish{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 245px;
    margin-top: 15px;
    font-size:26px;
    color:rgba(57,63,81,1);
  }

  .s_Scene_Content .payBox .downLoadMain.payFinish i{
    font-size: 40px;
    color: #ED9515;
    margin-bottom: 20px;
  }

  /*支付浮窗*/
  .s_Scene_Content .payCodeBox{
    background: rgba(0,0,0,.4);
    z-index: 2034;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
  }

  .s_Scene_Content .innerVisibleBox{
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

  .s_Scene_Content .innerVisibleBox.alipayVisibleBox{
    width:200px;
    height:180px;
    box-sizing: border-box;
    padding-top: 28px;
  }

  .s_Scene_Content .innerVisibleBox img{
    width:200px;
    height:200px;
    margin: 20px auto 14px;
    display: block;
  }

  .s_Scene_Content .innerVisibleBox .payDesc{
    font-size:14px;
    text-align: center;
    font-weight:bold;
    color:rgba(0,0,0,1);
  }

  @media screen and (max-width: 1500px){
    .s_Scene_Content .s_SceneListBox{
      width: 28%;
    }
    .s_Scene_Content .listBox{
      width: 66%;
    }
  }
</style>
