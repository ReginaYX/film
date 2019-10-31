<template>
  <div class="invoice">
    <div class="handTitle">
      <el-tabs v-model="activeName" @tab-click="handleClick">

        <el-tab-pane label="个人" name="first">

          <el-button class="newBtn" type="text" @click="personalFormVisible = true">+新增发票抬头</el-button>

          <el-dialog title="新增发票抬头" :visible.sync="personalFormVisible">
            <el-form :model="invoices"  status-icon  :rules="rules" ref="invoices">
              <el-form-item label="名称"  prop="title" :label-width="formLabelWidth">
                <el-input v-model="invoices.title" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="personalFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="valInvoice('invoices')">确 定</el-button>
            </div>
          </el-dialog>

          <el-row class="invoiceCard">
            <el-col  v-for="(item, index) in personalLists" :key="index" v-if="item.type == '0' ">
            <!--<el-col >-->
              <el-card :body-style="{ padding: '0px' }">
                <div style="padding: 14px;">
                  <el-form :model="item">
                    <el-form-item label="" :label-width="formLabelWidth">
                      <el-input v-model="item.title" autocomplete="off"></el-input>
                    </el-form-item>
                  </el-form>
                  <div class="bottom clearfix">
                    <el-button type="text" class="button" @click="deleteInvoice(item)">删除</el-button>
                    <el-button type="text" class="button" @click="savPpersonal(item)">保存</el-button>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>

        </el-tab-pane>


        <el-tab-pane label="增值税专用发票资质" name="second">

          <el-button class="newBtn" type="text" @click="enterpriseFormVisible = true">+新增专票资质</el-button>

          <el-dialog title="增值税专用发票资质" :visible.sync="enterpriseFormVisible">
            <el-form :model="invoices"  status-icon  :rules="rules" ref="invoices">
              <el-form-item label="单位名称" :label-width="formLabelWidth" prop="title">
                <el-input v-model="invoices.title" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="电话号码" :label-width="formLabelWidth" prop="regist_telphone">
                <el-input v-model="invoices.regist_telphone" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="纳税人识别号" :label-width="formLabelWidth" prop="tax_number">
                <el-input v-model="invoices.tax_number" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="开户银行名称" :label-width="formLabelWidth" prop="bank_name">
                <el-input v-model="invoices.bank_name" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="开户银行账号" :label-width="formLabelWidth" prop="bank_account">
                <el-input v-model="invoices.bank_account" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="单位地址" :label-width="formLabelWidth" prop="regist_address">
                <el-input type="textarea" v-model="invoices.regist_address" autocomplete="off"></el-input>
              </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="enterpriseFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="companyInvoice('invoices')">确 定</el-button>
            </div>
          </el-dialog>

          <el-row class="invoiceCard">
            <el-col  v-for="(item, index) in personalLists" :key="index" v-if="item.type == '1' ">
              <el-card :body-style="{ padding: '0px' }">
                <div style="padding: 14px;">
                  <el-form :model="item">
                    <el-form-item label="" :label-width="formLabelWidth">
                      <el-input v-model="item.title" autocomplete="off"></el-input>
                    </el-form-item>
                  </el-form>
                  <div class="bottom clearfix">
                    <el-button type="text" class="button" @click="deleteCompany(item)">删除</el-button>
                    <el-button type="text" class="button" @click="editorCompany(item)">编辑</el-button>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>

        </el-tab-pane>

        <el-tab-pane label="发票寄送地址" name="third">

          <el-button class="newBtn" type="text" @click="addressFormVisible = true">+新增寄送地址</el-button>

          <el-dialog title="寄送地址" :visible.sync="addressFormVisible">
            <el-form :model="address" status-icon  :rules="rules" ref="address">
              <el-form-item label="收件人" :label-width="formLabelWidth" prop="addressee">
                <el-input v-model="address.addressee" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="电话号码" :label-width="formLabelWidth"  prop="phone">
                <el-input v-model="address.phone" autocomplete="off"></el-input>
              </el-form-item>
              <!--<el-form-item label="省市区" :label-width="formLabelWidth" class="province" prop="city">-->
              <el-form-item label="省市区" :label-width="formLabelWidth" class="province">
              <area-cascader class="announcementCitySelet"
                             type='text'
                             placeholder="请选择地址"
                             v-model="city[0]"
                             :level='1'
                             :data="pcaa"
                             ></area-cascader>
                <span class="error" style="color: red;font-size: 12px" v-if="cityErroe">请选择地址</span>
              </el-form-item>
              <el-form-item label="详细地址" :label-width="formLabelWidth" prop="street">
                <el-input type="textarea" v-model="address.street" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="邮政编码" :label-width="formLabelWidth">
                <el-input v-model="address.postal_code" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="addressFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="addressPost('address')">确 定</el-button>
            </div>
          </el-dialog>

          <el-row class="invoiceCard">
            <el-col  v-for="(item, index) in addressLists" :key="index">
              <el-card :body-style="{ padding: '0px' }">
                <div style="padding: 14px;">
                  <div :model="item">
                    <div style="font-size: 16px;font-weight: 500">{{item.addressee}}</div>
                    <div>{{item.phone}}</div>
                    <div>{{item.province}}{{item.city}}{{item.county}}</div>
                    <div>{{item.street}}</div>
                  </div>
                  <div class="bottom clearfix">
                    <el-button type="text" class="button" @click="deleteAddress(item)">删除</el-button>
                    <el-button type="text" class="button" @click="addressEditor(item)">编辑</el-button>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>

        </el-tab-pane>

      </el-tabs>
    </div>

  </div>
</template>

<script>
  import axios from "axios"
  import { pca, pcaa } from "area-data";
  import 'vue-area-linkage/dist/index.css'; // v2 or higher
  export default {
    name: "invoice",
    components: {},
    data() {

      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入名称'));
        } else {
          callback();
        }
      };
      var validatePhone = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入电话号码'));
        } else {
          const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
          if (reg.test(value)) {
            callback();
          } else {
            return callback(new Error('请输入正确的手机号'));
          }
        }
      };
      var validateTaxNum = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入纳税人识别号'));
        } else {
          callback();
        }
      };
      var validateBank = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入开户行名称'));
        } else {
          callback();
        }
      };
      var validateBankNum = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入开户行账号'));
        } else {
          callback();
        }
      };
      var validateAddress = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入单位地址'));
        } else {
          callback();
        }
      };
      var validateAddressee = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入收件人'));
        } else {
          callback();
        }
      };
      var validatePhones = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入电话号码'));
        } else {
          const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
          if (reg.test(value)) {
            callback();
          } else {
            return callback(new Error('请输入正确的手机号'));
          }
        }
      };

      var validateStreet = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入详细地址'));
        } else {
          callback();
        }
      };

      return {
        activeName: 'first',//tabs切换
        personalFormVisible: false,//个人发票弹窗
        enterpriseFormVisible: false,//企业发票弹窗
        addressFormVisible:false,//寄送地址弹窗

        //验证
        rules: {
          title: [
            { validator: validatePass, trigger: 'change' }
          ],
          regist_telphone: [
            { validator: validatePhone, trigger: 'change' }
          ],
          tax_number: [
            { validator: validateTaxNum, trigger: 'change' }
          ],
          bank_name: [
            { validator: validateBank, trigger: 'change' }
          ],
          bank_account: [
            { validator: validateBankNum, trigger: 'change' }
          ],
          //寄送地址
          regist_address: [
            { validator: validateAddress, trigger: 'change' }
          ],
          addressee: [
            { validator: validateAddressee, trigger: 'change' }
          ],
          phone: [
            { validator: validatePhones, trigger: 'change' }
          ],

          street: [
            { validator: validateStreet, trigger: 'change' }
          ],
        },

        //发票信息
        invoices: {
          invoice_id: '',//发票id，传则为更新，不传则为新建
          user_id: '',//	用户id
          title: '',//发票抬头
          issue_type: '',//开具类型，0个人/1企业
          type: '',//发票类型，0增值税普通发票
          tax_number: '',//纳税人识别号
          bank_name: '',//开户银行名称
          bank_account: '',//	开户银行账号
          regist_address: '',//注册场所地址
          regist_telphone: '',//注册固定电话
        },
        formLabelWidth: '120px',
        personalLists:'',//发票列表
        pcaa: pcaa,//最多省市区三级，结合:level='2'选择，0省、1省市、2省市区
        city:[],//城市
        cityErroe:false,//城市验证

        //发票地址信息
        address:{
          invoice_address_id:'',//地址id，传则为更新，不传则为新建
          user_id:'',//	用户id
          addressee:'',//收件人
          phone:'',//手机号
          province:'',//省
          city:'',//市
          county:'',//区
          street:'',//街道
          postal_code:'000000',//邮编
        },
        addressLists:''//寄送地址列表
      }
    },
    methods : {

      //个人发票新增
      valInvoice(formName){

        this.$refs[formName].validate((valid) => {
          if (valid) {

            let forms = new FormData();
            forms.append("user_id",JSON.parse(localStorage.user_id));
            forms.append("title",this.invoices.title );
            forms.append("issue_type", '0' );
            forms.append("type", '0');
            axios({
              method: 'post',
              url: '/invoice/upsert',
              data:forms,
              headers:{
                'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundaryAZCU7ve1goo6tPnP',
                'Accept': '*/*',
                'X-Requested-With': 'XMLHttpRequest'
              }
            }).then((response)=> {
              if(response.data.msg == 'ok'){

                this.personalFormVisible = false;
                this.invoiceList()
              }
            })

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },

      //个人保存
      savPpersonal(item){
        let form = new FormData();
        form.append("invoice_id",this.invoices.invoice_id);
        form.append("user_id",JSON.parse(localStorage.user_id));
        form.append("title",this.invoices.title );
        form.append("issue_type", '0' );
        form.append("type", '1');
        axios({
          method: 'post',
          url: '/invoice/upsert',
          data:form,
          headers:{
            'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundaryAZCU7ve1goo6tPnP',
            'Accept': '*/*',
            'X-Requested-With': 'XMLHttpRequest'
          }
        }).then((response)=> {
          if(response.data.msg == 'ok'){

          }
        })
      },



      //发票按钮
      handleClick(row) {
        // console.log(row);
      },

      //个人发票列表
      invoiceList(){
        axios({
          method: 'get',
          url: '/invoice/list?user_id='+ JSON.parse(localStorage.user_id),
          headers:{
            'Content-type': 'application/x-www-form-urlencoded'
          }
        }).then((response)=> {
          if(response.data.ret=='0'){

            this.personalLists = response.data.data;
            // console.log(this.personalLists)
          }
        });
      },

      //删除发票信息
      deleteInvoice(item){

        let address = new FormData();
        address.append("invoice_id",item.invoice_id);
        address.append("user_id",JSON.parse(localStorage.user_id));

        axios({
          method: 'post',
          url: '/invoice/delete',
          data:address,
          headers:{
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Accept':'*/*'
          }
        }).then((response)=> {
          if(response.data.msg == 'ok'){
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.invoiceList()
          }else{
            this.$message.error(response.data.msg);
          }
        })
      },


      //新增专票
      companyInvoice(formName){


        this.$refs[formName].validate((valid) => {
          if (valid) {

            let companyInvoice = new FormData();
            companyInvoice.append("invoice_id",this.invoices.invoice_id);
            companyInvoice.append("user_id",JSON.parse(localStorage.user_id));
            companyInvoice.append("title",this.invoices.title );
            companyInvoice.append("issue_type", '1');
            companyInvoice.append("type", '1');
            companyInvoice.append("tax_number", this.invoices.tax_number);
            companyInvoice.append("bank_name", this.invoices.bank_name);
            companyInvoice.append("bank_account", this.invoices.bank_account);
            companyInvoice.append("regist_address", this.invoices.regist_address);
            companyInvoice.append("regist_telphone", this.invoices.regist_telphone);
            axios({
              method: 'post',
              url: '/invoice/upsert',
              data:companyInvoice,
              headers:{
                'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundaryAZCU7ve1goo6tPnP',
                'Accept': '*/*',
                'X-Requested-With': 'XMLHttpRequest'
              }
            }).then((response)=> {
              if(response.data.msg == 'ok'){

                this.enterpriseFormVisible = false;
                this.invoiceList()
              }
            })

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },


      //删除专票
      deleteCompany(item){

        let address = new FormData();
        address.append("invoice_id",item.invoice_id);
        address.append("user_id",JSON.parse(localStorage.user_id));

        axios({
          method: 'post',
          url: '/invoice/delete',
          data:address,
          headers:{
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Accept':'*/*'
          }
        }).then((response)=> {
          if(response.data.msg == 'ok'){
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.invoiceList()
          }else{
            this.$message.error(response.data.msg);
          }
        })
      },


      //编辑专票
      editorCompany(item){
        this.enterpriseFormVisible = true;

        this.invoices.invoice_id = item.invoice_id;
        this.invoices.user_id = item.user_id;
        this.invoices.title = item.title;
        this.invoices.issue_type = 1;
        this.invoices.type = 1;
        this.invoices.tax_number = item.tax_number;
        this.invoices.bank_name = item.bank_name;
        this.invoices.bank_account = item.bank_account;
        this.invoices.regist_address = item.regist_address;
        this.invoices.regist_telphone = item.regist_telphone;

      },


      //寄送地址
      addressPost(formName){

        this.$refs[formName].validate((valid) => {
          if (valid) {

            if (this.city == ''){
              this.cityErroe = true;
              return false
            }else {
              this.cityErroe = false;
            }

            let address = new FormData();
            address.append("invoice_address_id",this.address.invoice_address_id);
            address.append("user_id",JSON.parse(localStorage.user_id));
            address.append("addressee",this.address.addressee);
            address.append("phone",this.address.phone);
            address.append("province",this.city[0][0]);
            address.append("city",this.city[0][1]);
            address.append("county",this.city[0][2]);
            address.append("street",this.address.street);
            address.append("postal_code",this.address.postal_code);

            axios({
              method: 'post',
              url: '/invoice/address_upsert?user_id='+ JSON.parse(localStorage.user_id),
              data:address,
              headers:{
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Accept':'*/*'
              }
            }).then((response)=> {
              if(response.data.msg == 'ok'){
                this.$message({
                  message: '保存成功',
                  type: 'success'
                })
                this.addressFormVisible = false;
                this.addressList()
              }else{
                this.$message.error(response.data.msg);
              }
            })

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },

      //寄送地址列表
      addressList(){
        axios({
          method: 'get',
          url: '/invoice/address_list?user_id='+ JSON.parse(localStorage.user_id),
          headers:{
            'Content-type': 'application/x-www-form-urlencoded'
          }
        }).then((response)=> {
          if(response.data.ret=='0'){

            this.addressLists = response.data.data;
          }
        });
      },

      //寄送地址编辑
      addressEditor(item){
        this.addressFormVisible = true;

        this.address.invoice_address_id = item.invoice_address_id;
        this.address.user_id = item.user_id;
        this.address.addressee = item.addressee;
        this.address.phone = item.phone;
        this.address.province = item.province;
        this.address.city = item.city;
        this.address.county = item.county;
        this.address.street = item.street;
        this.address.postal_code = item.postal_code;

      },

      //删除寄送地址
      deleteAddress(item){
        let address = new FormData();
        address.append("invoice_address_id",item.invoice_address_id);
        address.append("user_id",JSON.parse(localStorage.user_id));

        axios({
          method: 'post',
          url: '/invoice/address_delete',
          data:address,
          headers:{
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Accept':'*/*'
          }
        }).then((response)=> {
          if(response.data.msg == 'ok'){
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.addressList()
          }else{
            this.$message.error(response.data.msg);
          }
        })
      },
    },

    mounted(){

      //个人发票列表
      this.invoiceList();
      //寄送地址列表
      this.addressList();


      //改变tabs底部颜色
      if (this.$route.path == '/mine/invoice') {
        var setting = document.getElementsByClassName('setting');
        var tradingCenter = document.getElementsByClassName('tradingCenter');

        setting[1].style = 'color:#909399 ; border: none';
        tradingCenter[0].style = 'border-color:#000 ;color:#303133 ;';
      }



    }
  }
</script>


<style>



  .invoice .handTitle .el-tabs__item.is-active{
    color: #ED9515;
  }

  .invoice .handTitle  .el-tabs__active-bar{
    background-color: #ED9515;
    display: none;
  }

  .invoice .handTitle .el-tabs__header{
    border-bottom: none;
    margin-left: 50%;
  }
  .invoice .handTitle .el-tabs__nav{
    border: none !important;
  }

  .invoice .handTitle .el-tabs__item{
    font-size: 16px;
    padding: 0 20px 0 20px  !important;
    border-right: 1px solid silver;
    height: 30px;
    line-height: 30px;
  }

  .invoice .handTitle .el-tabs__item:hover{
    color: #ED9515;
  }

  .invoice .handTitle .el-tabs__item:last-child{
    border-right: none;

  }

  .invoice .handTitle .el-tabs__nav-wrap::after{
    display: none;

  }

  .invoice .handTitle .invoiceCard .el-form-item__content{
    margin-left: 0px !important;
  }

  .invoice  .province .el-form-item__content{
    line-height: normal !important;
  }

  .invoice .handTitle .newBtn .el-button span{
    font-size: 14px !important;
    color: #ED9515 !important;
  }

  .invoice .handTitle .el-button span{
    font-size: 14px !important;
    /*color: #ED9515 !important;*/
  }

</style>
<style scoped>

  .invoice{
    width: 100%;
    height: auto;
    float: left;
    background: #fff;
    padding: 20px 0 0;
    border-left: 1px solid #f9f9f9;

  }

  .invoice .handTitle{
    padding-left: 34px;
    margin-top: 30px;
  }

  .invoice .handTitle .invoiceCard{
    /*width: 300px;*/
    display: flex;
    flex-wrap: wrap;
  }

  .invoice .handTitle .invoiceCard .el-col-24{
    width: 196px !important;
    margin: 20px 20px 0 0 !important;
  }

  .invoice .handTitle .invoiceCard:last-child{
    margin-bottom: 20px;
  }

  .invoice .handTitle .invoiceCard .button{
    color: #ED9515;

  }

  .invoice .handTitle .newBtn{
    margin-bottom: 20px;
    color: #ED9515;
  }






</style>
