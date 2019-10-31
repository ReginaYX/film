<template>
    <div class="enterpriseServiceBox">
        <div class="enterpriseServiceLeft">
            <div class="enterpriseServiceTitle">非幕企业级服务</div>
            <div class="enterpriseServiceDesc">
                为注重数据私密的企业用户打造的一款专属服务<br/>
                可以将非幕部署到自己公司的服务器上<br/>并提供专业的技术支持和维护服务
            </div>
        </div>
        <div class="enterpriseServicePlanBox">
            <el-form :model="enterpriseForm" ref="validateForm" class="enterpriseForm">
                <el-form-item class="enterpriseServicePlanForm"
                    label="公司名称" prop="company" :rules="[{required: true, message: '公司名称不能为空',trigger:'blur'}]">
                    <el-input v-model="enterpriseForm.company" clearable  placeholder="请输入公司名称" class="enterpriseServicePlanInput"></el-input>
                </el-form-item>
                <el-form-item class="enterpriseServicePlanForm"
                              label="联系人" prop="contact" :rules="[{required: true, message: '联系人不能为空',trigger:'blur'}]">
                    <el-input v-model="enterpriseForm.contact" clearable  placeholder="请输入联系人" class="enterpriseServicePlanInput"></el-input>
                </el-form-item>
                <el-form-item class="enterpriseServicePlanForm"
                              label="手机号" prop="phone" :rules="[{required: true, message: '手机号不能为空',trigger:'blur'},
                            {validator: this.checkPhone, message: '请输入正确的手机号', trigger: ['blur', 'change'] }]">
                    <el-input v-model="enterpriseForm.phone" clearable  placeholder="请输入手机号" class="enterpriseServicePlanInput"></el-input>
                </el-form-item>
                <el-form-item class="enterpriseServicePlanForm"
                              label="联系邮箱" prop="email" :rules="[{required: true, message: '联系邮箱不能为空',trigger:'blur'},
                            {type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }]">
                    <el-input v-model="enterpriseForm.email" clearable  placeholder="请输入联系邮箱" class="enterpriseServicePlanInput"></el-input>
                </el-form-item>
            </el-form>
            <div class="enterpriseServicePlanSubmit" @click="company">提交</div>
        </div>
    </div>
</template>

<script>
    import global_ from '../common/Global'
    export default {
        name: "enterpriseService",
        data(){
            return{
                enterpriseForm:{//公司信息
                    company:'',
                    contact:'',
                    phone:'',
                    email:''
                },
                checkPhone:global_.isPhone,
            }
        },
        methods:{
            //公司信息
            company(){
                this.$refs['validateForm'].validate((valid) => {
                    let formData = new FormData();
                    formData.append('fullname', this.enterpriseForm.company);
                    formData.append('contact_email', this.enterpriseForm.email);
                    formData.append('contact_person', this.enterpriseForm.contact);
                    formData.append('contact_phone', this.enterpriseForm.phone);
                    this.$axios({
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
                                message: '提交成功，我们将在1-2个工作日内与您取得联系',
                                type: 'success'
                            });

                        }else{
                            this.$message.error(response.data.msg);
                        }
                    })
                })
            }
        }
    }
</script>

<style>
    .enterpriseServiceBox+#footer .hr{
        display: none;
    }
    .enterpriseServiceBox+#footer .footer_content{
        padding-top: 84px;
    }

    .enterpriseServiceBox .enterpriseServicePlanBox .enterpriseForm{
        padding: 0;
    }

    .enterpriseServiceBox .enterpriseServicePlanBox .enterpriseServicePlanForm .enterpriseServicePlanInput .el-input__inner{
        height: 34px;
        margin-top: 12px;
        border:1px solid rgba(186,186,186,0.3);
        border-radius:2px;
        padding-left: 14px;
    }

    .enterpriseServiceBox .enterpriseServicePlanBox .enterpriseServicePlanForm .enterpriseServicePlanInput  .el-input__suffix{
        line-height: 34px;
        height: 34px;
        top: 12px;
    }

    .enterpriseServiceBox .enterpriseServicePlanBox .enterpriseServicePlanForm .el-form-item__label{
        font-size:12px;
        font-family:MicrosoftYaHei;
        font-weight:bold;
        color:rgba(0,0,0,0.7);
        line-height: 16px;
        margin-bottom: 0;
    }

    .enterpriseServiceBox .enterpriseServicePlanBox .enterpriseServicePlanForm .el-form-item__label:after{
        display: none;
    }
</style>

<style scoped>
    .enterpriseServiceBox{
        height: 492px;
        background:rgba(108,111,191,1);
        box-sizing: border-box;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .enterpriseServiceBox .enterpriseServiceTitle{
        line-height: 30px;
        font-weight: bold;
        font-size:30px;
        font-family:宋体;
        color:rgba(255,255,255,1);
        margin: 0 0 30px;
        /*position: absolute;*/
        /*top: 58px;*/
    }
    .enterpriseServiceBox .enterpriseServiceDesc{
        line-height: 26px;
        font-size:12px;
        font-family:MicrosoftYaHei;
        font-weight:bold;
        color:rgba(255,255,255,1);
        letter-spacing: 2px;
    }
    .enterpriseServiceBox .enterpriseServicePlanBox{
        width:470px;
        height:536px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        margin: -126px 0 62px 160px;
        padding: 0 50px 0 40px;
        box-shadow: 0 0 10px 6px rgba(0,0,0,.05);
        box-sizing: border-box;
    }
    .enterpriseServiceBox .enterpriseServicePlanBox .enterpriseServicePlanLeft{
        width: 1000px;
        margin: auto;
        margin-top: 60px;
    }

    .enterpriseServiceBox .enterpriseServicePlanBox .enterpriseServicePlanForm{
        width: 100%;
        margin-bottom: 26px;
    }

    .enterpriseServiceBox .enterpriseServicePlanBox .enterpriseServicePlanForm:first-child{
        margin-top: 50px;
    }

    .enterpriseServiceBox .enterpriseServicePlanBox  .enterpriseServicePlanError{
        color: #F05050;
    }
    .enterpriseServiceBox .enterpriseServicePlanBox .enterpriseServicePlanSubmit{
        width:200px;
        height:40px;
        background:rgba(108,111,191,1);
        border-radius:20px;
        font-size:14px;
        font-family:MicrosoftYaHei;
        margin: 60px auto 0;
        color:rgba(255,255,255,1);
        line-height: 40px;
        text-align: center;
        cursor: pointer;
    }
</style>