<template>
  <div class="tradingCenter">
    <div class="title">发票信息</div>
    <el-button type="warning" size="mini" class="invoice" @click="invoice" >开票信息</el-button>

    <div class="handTitle">
      <div>
      </div>
    </div>
    <div class="tradingContent">
      <div class="contentTitle">
        <span class="contentTitleList">交易记录</span>
      </div>
      <div class="contentTable">
        <el-table
          :data="tradingCenter.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
          stripe
          style="width: 100%;font-size: 13px"
          @row-click="openDetails">
          <el-table-column
            prop="time"
            label="交易时间"
            width="120"
            sortable>
            <template slot-scope="scope">
              <span>{{scope.row.time | changeTimeDay}}</span ><br/>
            </template>
          </el-table-column>
          <el-table-column
            prop="fee"
            label="交易金额"
            width="120">
            <template slot-scope="scope">
              <span>￥{{scope.row.fee | changeFee}}</span >
            </template>
          </el-table-column>
          <el-table-column
            prop="payment_type"
            label="交易方式"
            width="120">
            <template slot-scope="scope">
              <span>{{scope.row.payment_type}}</span >
            </template>
          </el-table-column>
          <el-table-column
            prop="user_id"
            label="交易类型"
            width="120">
            <template slot-scope="scope">
              <!--顺场下载-->
              <span
                class="descriptions"
                v-if="scope.row.project_id != undefined">
                {{scope.row.description}}<br/>顺场表下载
              </span>
              <!--充值-->
              <span v-else >{{scope.row.description}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="user_id"
            label="场数"
            width="80">
            <template slot-scope="scope">
              <span>{{scope.row.session_count}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="order_id"
            label="交易编号"
            width="200">
            <template slot-scope="scope">
              <span>{{scope.row.order_id}}</span >
            </template>
          </el-table-column>
          <el-table-column
            prop="address"
            label="发票/报销">
            <template slot-scope="scope">
              <el-button class="taxInvoice"
                         v-if="scope.row.invoice_id"
                         @click="orderDetails(scope.row,scope.$index)"
                         type="text"
                         size="small">已开发票</el-button>

              <el-button class="taxInvoice"
                         v-else="scope.row.invoice_id != '' "
                         @click="invoiceOpen(scope.row,scope.$index)"
                         type="text"
                         style="color:#ed9515 "
                         size="small">发票</el-button>


            </template>

          </el-table-column>
        </el-table>


        <!--已开发票弹窗-->
        <el-dialog title="开具发票" :visible.sync="dialogOrderDetails">
          <div class="invoiceTitle">
            <ul>
              <li>支付描述：{{orderData.description}}</li>
              <li>支付账户：{{orderData.user_id}}</li>
              <li>交易编号：{{orderData.order_id}}</li>
              <li>交易日期：{{orderData.time | changeTimeDay}}</li>
            </ul>

            <ul>
              <li>结算方式：{{orderData.payment_type}}</li>
              <li>账单金额：￥{{orderData.fee | changeFee}}</li>
            </ul>
          </div>

          <div class="invoiceContent contentDetail">
            <el-radio-group v-model="issue_option">
              <el-radio disabled label="0">电子发票</el-radio>
              <el-radio label="1">纸质发票</el-radio>
            </el-radio-group>
            <p class="prompt promptDetail">
              电子发票为增值税普通发票，报销、保存更便捷，并支持下载、打印，应国家税务总局报销政策要求，
              开局企业抬头发票请填写纳税人识别号或统一社会信用代码。
            </p>
          </div>

          <div class="invoiceFoot footContent">
            发票抬头:
            <el-input
              placeholder="发票抬头"
              v-model="orderData.invoice_id"
              :disabled="true">
            </el-input><br/>
            <div style="margin-top: 16px; display: inline-flex;">
              寄送地址:
              <el-row class="invoiceCardDetail">
                <el-col>
                  <el-card :body-style="{ padding: '0px' }">
                    <div style="padding: 14px;">
                      <div>
                        <div style="font-size: 16px;font-weight: 500">{{orderData.invoice_address_id}}</div>
                        <div>{{orderData.address}}</div>
                        <div>{{orderData.phone}}</div>
                      </div>
                    </div>
                  </el-card>
                </el-col>
              </el-row>
            </div>
          </div>

          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogOrderDetails = false">取 消</el-button>
            <el-button type="primary" @click="dialogOrderDetails = false">确 定</el-button>
          </div>
        </el-dialog>

        <!--开发票弹窗-->
        <el-dialog title="开具发票" :visible.sync="dialogFormVisible">
          <div class="invoiceTitle">
            <ul>
              <li>支付账户：{{invoiceDialog.user_id}}</li>
              <li>交易编号：{{invoiceDialog.order_id}}</li>
              <li>交易日期：{{invoiceDialog.time | changeTimeDay}}</li>
              <li>账单金额：￥{{invoiceDialog.fee | changeFee}}</li>
            </ul>

            <ul>
              <li>结算方式：{{invoiceDialog.payment_type}}</li>
            </ul>
          </div>
          <el-form :model="content" class="invoiceContent">

            <el-form-item label="发票类型：" :label-width="formLabelWidth2" style="margin-top: 28px">
              <el-radio-group v-model="issue_option">
                <el-radio disabled label="0">电子发票</el-radio>
                <el-radio label="1">纸质发票</el-radio>
              </el-radio-group>
              <p class="prompt">电子发票为增值税普通发票，报销、保存更便捷，并支持下载、打印，应国家税务总局报销政策要求，
                开局企业抬头发票请填写纳税人识别号或统一社会信用代码。</p>
            </el-form-item>
            <el-form-item label="请选择发票抬头：" :label-width="formLabelWidth" style="margin-left: 24px">
              <el-select v-model="invoice_id" placeholder="请选择发票抬头">
                <el-option label="请选择" value="">
                  <el-button type="text" :to="{path:'/mine/invoice'}" @click="invoice">添加发票信息</el-button>
                </el-option>
                <el-option
                  v-for="item in invoiceList"
                  :key="item.title"
                  :label="item.title"
                  :value="item.invoice_id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>

          <el-form :model="content" class="invoiceFoot">

            <el-form-item label="请选择寄送地址：" :label-width="formLabelWidth" style="margin-left: 24px">
              <el-select v-model="invoice_address_id" placeholder="请选择寄送地址">
                <el-option label="请选择" value="">
                  <el-button type="text" :to="{path:'/mine/invoice'}" @click="invoice">添加寄送地址</el-button>
                </el-option>
                <el-option
                  v-for="item in address_id"
                  :key="item.addressee"
                  :label="item.addressee"
                  :value="item.invoice_address_id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="takeInvoice">确 定</el-button>
          </div>
        </el-dialog>

        <el-pagination
          class="paging"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[6, 8, 10, 12]"
          :page-size=pageSize
          layout="total, sizes, prev, pager, next, jumper"
          :total=totalPage>
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios"
    import Password from "./pwd";
    export default {
      name: "tradingCenter",
      components: {Password},
      data() {
        return {

          //发票弹窗
          content: {
            account: '1111',//账户
            Serial_number: '111111',//编号
            date: '2019/08/01',//日期
            amount: '123123123.11',//金额
            product: '非幕胶片',//产品
            settlement: '支付宝',//结算方式
            currency: '人民币',//币种
          },

          formLabelWidth: '124px !important',
          formLabelWidth2: '108px',
          dialogFormVisible: false,//开发票弹窗
          dialogOrderDetails:false,//已开发票弹窗

          input5: '',
          select: '',
          totalPage:0,//全部页数
          currentPage: 1,//当前页数
          pageSize:6,//每页显示条数
          balance:'',
          issue_option:"1",

          //订单历史交易表格
          tradingCenter:[{
            balance_deduction:'',
            fee:'',
            order_id:'',
            payment_type:'',
            status:'',
            time:'',
            user_id:'',
            description:''
          }],


          //弹窗数据
          invoiceDialog:[{
            balance_deduction:'',
            fee:'',
            order_id:'',
            payment_type:'',
            status:'',
            time:'',
            user_id:'',
          }],

          //已开票数据
          orderData:[{
            balance_deduction: '',
            description: '',
            fee: '',
            invoice_address_id: '',
            invoice_id: '',
            invoice_type: '',
            order_id: '',
            payment_type: '',
            project_id: '',
            session_count: '',
            status: '',
            time: '',
            user_id: '',
            address:'',
            phone:''
          }],

          //发票抬头列表
          invoiceList:'',
          //下拉获取抬头内容
          invoice_id:'',

          //寄送地址获取
          address_id:'',
          //下拉获取寄送地址内容
          invoice_address_id:'',


        }
      },
      methods : {

        //已开发票详情
        orderDetails(row){
          this.dialogOrderDetails = true;
          this.invoiceDialog=row;
          axios({
            method: 'get',
            url: '/order/info',
            headers:{
              'Content-type': 'application/x-www-form-urlencoded'
            },
            params: {
              order_id: row.order_id,
            }
          }).then((response)=> {
            if(response.data.ret=='0'){
              this.orderData = response.data.data;

              //发票地址列表
              axios({
                method: 'get',
                url: '/invoice/address_list',
                headers:{
                  'Content-type': 'application/x-www-form-urlencoded'
                },
                params: {
                  user_id: JSON.parse(localStorage.user_id),
                }
              }).then((response)=> {
                if(response.data.ret=='0'){
                  for (var i = 0; i <= response.data.data.length ; i++){
                    if (this.orderData.invoice_address_id == response.data.data[i].invoice_address_id) {
                      this.orderData.invoice_address_id = response.data.data[i].addressee;
                      this.orderData.address = response.data.data[i].address;
                      this.orderData.phone = response.data.data[i].phone;
                    }
                  }
                }
              });

              //发票抬头列表
              axios({
                method: 'get',
                url: '/invoice/list',
                headers:{
                  'Content-type': 'application/x-www-form-urlencoded'
                },
                params: {
                  user_id: JSON.parse(localStorage.user_id),
                }
              }).then((response)=> {
                if(response.data.ret=='0'){
                  // console.log(response.data.data);
                  for (var i = 0; i <= response.data.data.length ; i++){
                    if (this.orderData.invoice_id == response.data.data[i].invoice_id) {
                      this.orderData.invoice_id = response.data.data[i].title
                    }
                  }
                }
              });
            }
          });
        },


        //确定开票
        takeInvoice(){

          let forms = new FormData();
          forms.append("order_id",this.invoiceDialog.order_id);
          forms.append("invoice_id",this.invoice_id);
          forms.append("invoice_address_id", this.invoice_address_id);
          forms.append("invoice_type", '1' );
          axios({
            method: 'post',
            url: '/order/invoice',
            data:forms,
            headers:{
              'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundaryAZCU7ve1goo6tPnP',
              'Accept': '*/*',
              'X-Requested-With': 'XMLHttpRequest'
            }
          }).then((response)=> {
            if(response.data.msg == 'ok'){

              this.$message({
                message: '开具发票成功',
                type: 'success'
              });
              this.dialogFormVisible = false;

              this.order();
            }
          })

        },

        //开票跳转
        invoice(){
          this.$router.push('/mine/invoice')
        },

        //打开详情页弹窗
        openDetails(row, column, event) {
          // console.log(row, column, event);
          // this.dialogFormVisible = true;
        },

        //发票按钮
        invoiceOpen(row) {
          //记录数据
          this.invoiceDialog=row;
          //显示弹窗
          this.dialogFormVisible = true;
        },


        //分页
        handleSizeChange(val){
          this.pageSize = val;
          this.currentPage = 1;
        },
        handleCurrentChange(val){
          this.currentPage = val;
        },

        //订单查询
        order(){
          axios({
            method: 'get',
            url: '/order/list?user_id='+ JSON.parse(localStorage.user_id),
            headers:{
              'Content-type': 'application/x-www-form-urlencoded'
            }
          }).then((response)=> {
            if(response.data.ret=='0'){
              this.tradingCenter = response.data.data;
              let tradingCenter1 = response.data.data;
              this.totalPage =response.data.data.length;
              var name = '';
              this.fetchProject()
              for (var i = 0; i < this.tradingCenter.length; i++){
                if (this.tradingCenter[i].project_id != undefined){
                  this.fetchProject(this.tradingCenter[i].project_id)
                }
              }

            }
          });
        },
        fetchProject(id){

          axios.get('/project/info', {
            params: {
              project_id:id
            }
          }).then((data)=> {
            if(data.data.ret=='0') {
              for(var i = 0; i < this.tradingCenter.length; i++){
                if(id == this.tradingCenter[i].project_id){
                  this.tradingCenter[i].description ='《'+ data.data.data.name +'》'
                }
              }
            }
          })

        }
      },

      filters: {

        //时间转换
        changeTimeDay: function (value) {
          var date = new Date();
          date.setTime(value * 1000);
          var y = date.getFullYear();
          var m = date.getMonth() + 1;
          m = m < 10 ? ('0' + m) : m;
          var d = date.getDate();
          d = d < 10 ? ('0' + d) : d;
          var H = date.getHours();
          H = H < 10 ? ('0' + H) : H;
          var M = date.getMinutes();
          M = M < 10 ? ('0' + M) : M;
          var S = date.getSeconds();
          S = S < 10 ? ('0' + S) : S;
          return y + '-' + m + '-' + d + '  ' + H + ':' + M + ':' + S;

          return date;
        },

        //时间转换
        changeFee: function (value) {
          var fee = value / 100;

          return fee;
        }
      },
      mounted(){
        //订单查询
        this.order();

        //余额查询
        axios({
          method: 'get',
          url: '/user/check_balance?user_id='+ JSON.parse(localStorage.user_id),
          headers:{
            'Content-type': 'application/x-www-form-urlencoded'
          }
        }).then((response)=> {
          if(response.data.ret=='0'){
            this.balance = response.data.data
          }
        });


        //发票抬头获取
        axios({
          method: 'get',
          url: '/invoice/list?user_id='+ JSON.parse(localStorage.user_id),
          headers:{
            'Content-type': 'application/x-www-form-urlencoded'
          }
        }).then((response)=> {
          if(response.data.ret=='0'){
            this.invoiceList = response.data.data;

          }
        });


        //寄送地址获取
        axios({
          method: 'get',
          url: '/invoice/address_list?user_id='+ JSON.parse(localStorage.user_id),
          headers:{
            'Content-type': 'application/x-www-form-urlencoded'
          }
        }).then((response)=> {
          if(response.data.ret=='0'){
            this.address_id = response.data.data
          }
        });



      }
    }
</script>

<style>

  .tradingCenter .invoice .el-button span{
    font-size: 16px !important;
    line-height: 16px !important;
  }

  .tradingCenter .tradingContent .contentTable .taxInvoice .el-button--small  span{
    color: #ED9515 !important;
  }


  .tradingCenter .tradingContent .contentTable .footContent .el-input{
    width: auto !important;
    margin-left: 6px !important;
  }

  .tradingCenter .tradingContent .contentTable .footContent .invoiceCardDetail .el-col-24{
    width: auto !important;
  }
</style>

<style scoped>

  .tradingCenter{
    width: 100%;
    float: left;
    background: #fff;
    padding: 20px 0 0;
    border-left: 1px solid #f9f9f9;
  }

  .tradingCenter .title{
    font-size: 20px;
    color: #333;
    font-weight: 500;
    padding: 0 34px;
    float: left;
  }

  .tradingCenter .invoice{
    float: right;
    margin-right: 40px;
    width:93px;
    height:30px;
    background:#ED9515;
    border-radius:15px;
  }

  .tradingCenter .tradingContent{
    padding-left: 34px;
    margin-top: 30px;
  }

  .tradingCenter .tradingContent .contentTitle{
    display: flex;
    align-content: flex-start;
    font-size: 16px;
  }

  .tradingCenter .tradingContent .contentTitle .contentTitleList{
    display: block;
    line-height: 40px;
  }

  .tradingCenter .tradingContent .contentTitle .input-with-select{
    margin-left: 400px;
    width: 400px;
  }

  .tradingCenter .tradingContent .contentTitle .el-select {
    width: 110px;
  }

  .tradingCenter .tradingContent .contentTitle .el-select .el-input-group__prepend{
    background-color: #fff;
  }

  .tradingCenter .tradingContent .contentTitle .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }

   .contentTable{
    font-size: 13px !important;
  }

  .contentTable .descriptions{
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
   }

  .tradingCenter .tradingContent .contentTable .el-table__body-wrapper{
    font-size: 13px !important;
  }

  .tradingCenter .tradingContent .contentTable .paging{
    margin-top: 20px;
      margin-bottom: 20px;
  }

  .tradingCenter .tradingContent .contentTable .invoiceTitle{
    height: 100px;
    border-bottom: 1px solid silver;
    margin: 0 26px 0;
  }

  .tradingCenter .tradingContent .contentTable .invoiceTitle ul{
    display: block;
    float: left;
    margin-left: 26px;
  }

  .tradingCenter .tradingContent .contentTable .invoiceTitle ul:nth-child(2){
    margin-left: 80px;
  }

  .tradingCenter .tradingContent .contentTable .invoiceTitle ul li{
    margin-bottom: 4px;
  }

  .tradingCenter .tradingContent .contentTable .invoiceContent{
    border-bottom: 1px solid silver;
    margin: 28px 26px 0;
  }

  .tradingCenter .tradingContent .contentTable .invoiceContent .prompt{
    font-size:12px;
    font-family:MicrosoftYaHei;
    font-weight:400;
    color:#4D4D4D;
    opacity:0.8;
    display: block;
    width: 560px;
    margin-left: -80px;
    line-height: 16px;
  }

  .tradingCenter .tradingContent .contentTable .invoiceContent .prompt:before{
    content: "*";
    color: #f56c6c;
    margin-right: 4px;
  }

  .tradingCenter .tradingContent .contentTable .invoiceFoot{
    margin: 28px 26px 0;
  }

  .tradingCenter .tradingContent .contentTable  .contentDetail{
    padding-left: 26px;
  }

  .tradingCenter .tradingContent .contentTable  .contentDetail .promptDetail{
    padding-left: 80px;
    margin-bottom: 20px;
    margin-top: 10px;
  }

  .tradingCenter .tradingContent .contentTable .footContent{
    margin: 28px 50px 0;
  }

  .tradingCenter .tradingContent .contentTable .footContent .invoiceCardDetail{
    margin-left: 10px;
  }


</style>
