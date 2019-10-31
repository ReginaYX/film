<template>
    <div class="box">
      <index-top :register="registerBtn" @register1="registerData"></index-top>
      <div>
        <div class="headBackg">
          <div class="headContent">
            <div class="handLeft">
              <div class="topTitle">非幕制片</div>
              <div class="topcont">
                为中大型企业提供安全有效的私有化部署方案<br/>
                可提供局域网配置方案
              </div>
              <el-button class="topbutton"  @click="openCompany">立即获取</el-button>
            </div>

            <div class="handRight"></div>
          </div>

        </div>

        <div class="contentsBox">

          <div class="leftContent diversify">
            <div class="leftContentBox">
              <div class="firstLeft">
                <div class="firstTitle">多样化部署方式</div>
                <div class="firstCont">
                  <span>私有云部署:</span>
                  支持企业内部机房或私有云部署，满足中大型企业剧本安全需求
                </div>
                <div class="firstCont" style="margin-top: 14px">
                  <span>混合云部署:</span>
                  多样化的混合部署方式，满足网络安全控制体系的要求
                </div>
              </div>
              <div class="firstRight diversifyRight"></div>
            </div>

          </div>


          <div class="rightContent security">
            <div class="leftContentBox">
              <div class="RightLeft securityLeft"></div>
              <div class="rightFirst">
                <div class="rightTitle" style="margin-top: 140px">多重安全保障</div>
                <div class="rightCont">
                  <span>安全存储:</span>
                  可将剧本等敏感信息存储至自由服务器，全方位保障知识产权安全
                </div>
                <div class="rightCont" style="margin-top: 14px">
                  <span>高效传输:</span>
                  独立线程，避免使用高峰信息传输缓慢
                </div>
              </div>
            </div>

          </div>


          <div class="leftContent infinite">
            <div class="leftContentBox">
              <div class="firstLeft">
                <div class="firstTitle">无限次使用</div>
                <div class="firstCont">
                  <span>订阅周期内不限制项目数量和下载次数，使用无忧</span>
                </div>
              </div>
              <div class="firstRight infiniteRight"></div>
            </div>

          </div>


          <div class="rightContent ux">
            <div class="leftContentBox">
              <div class="RightLeft uxLeft"></div>
              <div class="rightFirst">
                <div class="rightTitle" style="margin-top: 82px">系统交互</div>
                <div class="rightCont">
                  <span>账户融合:</span>
                  提供账户体系的API接口与实现企业内部账户体系的同步
                </div>
                <div class="rightCont" style="margin-top: 14px">
                  <span>协同编辑:</span>
                  提供协同编辑SDK和配套接口实现跨系统的文档实时协同编辑
                </div>
                <div class="rightCont" style="margin-top: 14px">
                  <span>交叉融合:</span>
                  开放和全面的API与企业现有服务进行融合
                </div>
              </div>
            </div>

          </div>


          <div class="leftContent AfterSsales">
            <div class="leftContentBox">
              <div class="firstLeft">
                <div class="firstTitle AfterSsalesTitle">售后服务保障</div>
                <div class="firstCont">
                <span>
                  为企业提供完整的私有化部署方案和高质量的交付<br/>
                  提供7x24小时不间断的售后能力为客户提供“一站式”服务体验
                </span>
                </div>
              </div>
              <div class="firstRight AfterSsalesRight"></div>
            </div>

          </div>

        </div>

        <div class="footerBox">
          <div class="footerTitle">立即获取企业部署方案</div>
          <div class="footerCont">
            为注重数据私密的企业用户打造的一款专属服务<br/>
            可以将非幕部署到自己公司的服务器上并提供专业的技术支持和维护服务
          </div>
          <el-button class="footerButton" @click="openCompany">立即获取</el-button>
        </div>
      </div>

      <!--企业信息弹窗-->
      <el-dialog title="企业联系方式" :visible.sync="dialogFormVisible" width="500px" class="serviceDialog">
        <el-form :model="form">
          <el-form-item label="公司全称" :label-width="formLabelWidth">
            <el-input v-model="form.fullname" autocomplete="off" class="serviceInfoInput"></el-input>
          </el-form-item>
          <el-form-item label="公司简称" :label-width="formLabelWidth">
            <el-input v-model="form.abbreviation" autocomplete="off" class="serviceInfoInput"></el-input>
          </el-form-item>
          <el-form-item label="联系邮箱" :label-width="formLabelWidth">
            <el-input v-model="form.contact_email" autocomplete="off" class="serviceInfoInput"></el-input>
          </el-form-item>
          <el-form-item label="企业联系人" :label-width="formLabelWidth">
            <el-input v-model="form.contact_person" autocomplete="off" class="serviceInfoInput"></el-input>
          </el-form-item>
          <el-form-item label="联系人电话" :label-width="formLabelWidth">
            <el-input v-model="form.contact_phone" autocomplete="off" class="serviceInfoInput"></el-input>
          </el-form-item>
          <el-form-item label="备注" :label-width="formLabelWidth">
            <el-input  type="textarea" v-model="form.remark" autocomplete="off" class="serviceInfoInput"></el-input>
          </el-form-item>
          <p style="color: red; margin-left: 120px" v-if="error">{{error}}</p>
        </el-form>
        <div slot="footer" class="dialog-footer serviceInfoFooter">
          <!--<el-button @click="dialogFormVisible = false">取 消</el-button>-->
          <el-button type="primary" @click="company" class="serviceInfoSubmit">提 交</el-button>
        </div>
      </el-dialog>

      <fm-footer />
    </div>
</template>

<script>
    import fmFooter from "../../common/fmFooter";
    import indexTop from "../../common/indexTop";
    import axios from "axios"
    export default {
      name: "serviceIndex",
      components: {fmFooter, indexTop},
      data (){
        return{
          registerBtn :false,
          form:{
            fullname:'',
            abbreviation:'',
            contact_email:'',
            contact_person:'',
            contact_phone:'',
            remark:''
          },
          error:'',
          dialogFormVisible: false,
          formLabelWidth: '120px'
        }
      },
      methods:{
        //顶部按钮控制
        registerData(data){
          if(data == false){
            this.registerBtn = false
          }
        },
        //立即按钮
        register(kind){
          if(kind == 'personal'){
            this.registerBtn = true
          }else  if(kind == 'enterprise'){
            this.$router.push('/enterpriseApply')
          }
        },
        //公司信息弹窗
        openCompany() {
          this.dialogFormVisible = true;
        },

        company(){
          this.error = ''
          if(this.form.fullname !='' && this.form.abbreviation !='' && this.form.contact_email !='' && this.form.contact_person !='' && this.form.contact_phone !=''){
            if(this.form.contact_email.match(/^\w+@\w+\.com$/) && this.form.contact_phone.match(/^[0-9]*$/)){
              let formData = new FormData()
              formData.append('fullname', this.form.fullname)
              // formData.append('abbreviation', this.form.abbreviation)
              formData.append('contact_email', this.form.contact_email)
              formData.append('contact_person', this.form.contact_person)
              formData.append('contact_phone', this.form.contact_phone)
              if(this.form.remark){
                formData.append('remark', this.form.remark)
              }
              axios({
                  method: 'post',
                  url: '/company/apply',
                  data: formData,
                  headers:{
                      'Content-Type': 'multipart/form-data',
                      'Accept': '*/*',
                      'X-Requested-With': 'XMLHttpRequest'
                  }
              }).then((response)=> {
                if(response.data.ret == 0){
                  this.$message({
                    message: '申请成功',
                    type: 'success'
                  });
                  this.dialogFormVisible = false;

                }else{
                  this.$message.error(response.data.msg);
                }
              })
            }else{
              this.error = '输入的格式不正确，请重新输入'
            }

          }else{
            this.error = '请填写完整'
          }
        }
      }
    }
</script>

<style>
  .box .headBackg .handLeft .topbutton span{
    color:rgba(237,149,21,1);
  }
  .box .footerBox .footerButton span{
    font-size:20px;
    color:rgba(237,149,21,1);
  }
  .serviceDialog+#footer .hr{
    display: none;
  }
  .serviceDialog+#footer .footer_content{
    padding-top: 84px!important;
  }
</style>

<style scoped>
  .box{

  }

  .box .headBackg{
    width: 100%;
    height: 540px;
    background: url("../../assets/topbackg.png") no-repeat 100%/100%;
  }

  .headContent{
    width: 1132px;
    margin: 0 auto;
  }

  .box .headBackg .handLeft{
    float: left;
  }

  .box .headBackg .handLeft .topTitle{
    font-size:30px;
    font-family:MicrosoftYaHei;
    font-weight:bold;
    color:rgba(255,255,255,1);
    margin-top: 200px;
  }

  .box .headBackg .handLeft .topcont{
    font-size:18px;
    font-family:MicrosoftYaHei;
    font-weight:bold;
    color:rgba(255,255,255,1);
    margin-top: 46px;
  }

  .box .headBackg .handLeft .topbutton{
    width:190px;
    height:52px;
    background:rgba(255,255,255,1);
    border-radius:26px;
    font-size:18px;
    font-family:MicrosoftYaHei;
    font-weight:bold;
    color:rgba(237,149,21,1)!important;
    margin-top: 46px;
  }

  .box .headBackg .handRight{
    float: right;
    width: 424px;
    height: 356px;
    background: url("../../assets/topRightpoh.png") no-repeat 100%/100%;
    margin-top: 144px;
  }

  .box .contentsBox{

  }

  .box .contentsBox .leftContent{
    height: 410px;
  }

  .leftContentBox{
      width: 1132px;
    margin: 0 auto;
  }

  .box .contentsBox .leftContent .firstLeft{
    margin-top: 154px;
    float: left;
  }

  .box .contentsBox .leftContent .firstLeft .firstTitle{
    font-size:26px;
    font-family:MicrosoftYaHei;
    font-weight:bold;
    color:rgba(63,63,63,1);
    margin-bottom: 44px;
    text-align: center;
  }

  .box .contentsBox .leftContent .firstLeft .firstCont{
    font-size:16px;
    font-family:MicrosoftYaHei;
    color:#6E6E6E;
    text-align: center;
  }

  .box .contentsBox .leftContent .firstLeft .firstCont span{
    font-size:16px;
    font-family:MicrosoftYaHei;
    font-weight:bold;
    color:rgba(63,63,63,1);
  }

  .box .contentsBox .leftContent .firstRight{
    width: 264px;
    height: 238px;
    margin-top: 94px;
    float: right;

  }

  .box .contentsBox .diversify .diversifyRight{
    background: url("../../assets/diversification.png") no-repeat 100%/100%;
  }

  .box .contentsBox .infinite .infiniteRight{
    background: url("../../assets/infinite.png") no-repeat 100%/100%;
  }

  .box .contentsBox .AfterSsales .AfterSsalesRight{
    background: url("../../assets/AfterSsales.png") no-repeat 100%/100%;
  }



  .box .contentsBox .rightContent{
    height: 410px;
    background: #F7F7F7;
  }

  .box .contentsBox .rightContent .RightLeft{
    width: 264px;
    height: 238px;
    margin-top: 94px;
    float: left;
  }

  .box .contentsBox .rightContent .rightFirst{
    float: right;
  }

  .box .contentsBox .rightContent .rightFirst .rightTitle{
    font-size:26px;
    font-family:MicrosoftYaHei;
    font-weight:bold;
    color:rgba(63,63,63,1);
    margin-bottom: 42px;
    text-align: center;
  }

  .box .contentsBox .rightContent .rightFirst .rightCont{
    font-size:16px;
    font-family:MicrosoftYaHei;
    color:#6E6E6E;
    text-align: center;
  }

  .box .contentsBox .rightContent .rightFirst .rightCont span{
    font-size:16px;
    font-family:MicrosoftYaHei;
    font-weight:bold;
    color:rgba(63,63,63,1);
  }


  .box .contentsBox .security .securityLeft{
    background: url("../../assets/security.png") no-repeat 100%/100%;
  }

  .box .contentsBox .ux .uxLeft{
    background: url("../../assets/uxLeft.png") no-repeat 100%/100%;
  }


  .box .footerBox{
    width: 100%;
    height: 402px;
    background: url("../../assets/footerBox.png") no-repeat 100%/100%;
    overflow: hidden;
  }

  .box .footerBox .footerTitle{
    font-size:28px;
    font-family:MicrosoftYaHei;
    font-weight:bold;
    color:rgba(255,255,255,1);
    text-align: center;
    margin-top: 60px;
  }

  .box .footerBox .footerCont{
    font-size:18px;
    font-family:MicrosoftYaHei;
    font-weight:bold;
    color:rgba(255,255,255,1);
    text-align: center;
    margin-top: 46px;
  }

  .box .footerBox .footerButton{
    width:280px;
    height:52px;
    background:rgba(255,255,255,1);
    border-radius:26px;
    font-family:MicrosoftYaHei;
    font-weight:bold;
    color:rgba(237,149,21,1) !important;
    margin-top: 72px;
    position: absolute;
    left: 50%;
    margin-left: -140px;
  }


  .serviceInfoInput{
    width: 90%;
  }

  .serviceInfoFooter{
    text-align: center;
  }

  .serviceInfoSubmit{
    margin: 0 auto;
    background: rgba(237,149,21,1)!important;
    border-color: rgba(237,149,21,1)!important;
    width: 200px!important;
  }

  @media screen and (max-width: 1400px){
    .box .headBackg{
      height: 500px;
    }
  }

  @media screen and (max-width: 1300px){
    .box .headBackg{
      height: 475px;
    }
  }

</style>
