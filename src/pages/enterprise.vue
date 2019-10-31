<template>
    <div>
        <top-nav />
        <div class="enterpriseTitle">企业用户申请</div>
        <hr>
        <div class="enterpriseBox">
            <div class="enterpriseContentBox">
                <img src="../assets/enterpriseBg.jpg" alt="">
                <div class="enterpriseForm">
                    <p>企业全称</p>
                    <input type="text" placeholder="请输入公司全称" v-model="form.fullname">
                    <p>企业简称</p>
                    <input type="text" placeholder="请输入公司简称" v-model="form.abbreviation">
                    <p>联系邮箱</p>
                    <input type="text" placeholder="使用该邮箱账号进行登录" v-model="form.contact_email">
                    <p>企业联系人</p>
                    <input type="text" placeholder="请输入企业联系人" v-model="form.contact_person">
                    <p>联系人电话</p>
                    <input type="text" placeholder="请输入联系人电话" v-model="form.contact_phone">
                    <p>备注</p>
                    <textarea type="text" placeholder="可以为空" v-model="form.remark"></textarea>
                    <div class="submitBox">
                        <p>{{error}}</p>
                        <div class="enterpriseBtn" @click="submit">提交</div>
                    </div>
                </div>
            </div>
        </div>
        <hr>
        <fm-footer />
    </div>
</template>

<script>
    import fmFooter from "../common/fmFooter";
    import topNav from "../common/topNav";
    import axios from "axios"
    export default {
        name: "enterprise",
        components: {fmFooter, topNav},
        data () {
            return{
                form:{
                    fullname:'',
                    abbreviation:'',
                    contact_email:'',
                    contact_person:'',
                    contact_phone:'',
                    remark:''
                },
                error:''
            }
        },
        methods:{
            submit(){
                this.error = ''
                if(this.form.fullname !='' && this.form.abbreviation !='' && this.form.contact_email !='' && this.form.contact_person !='' && this.form.contact_phone !=''){
                    if(this.form.contact_email.match(/^\w+@\w+\.com$/) && this.form.contact_phone.match(/^[0-9]*$/)){
                        let formData = new FormData()
                        formData.append('fullname', this.form.fullname)
                        formData.append('abbreviation', this.form.abbreviation)
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
                                let t = setTimeout(() => {
                                    this.$router.push('/')
                                }, 3000);

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

<style scoped>
    *{
        font-family: Microsoft Yahei, 微软雅黑;
        box-sizing: border-box;
    }
    .enterpriseTitle{
        width: 100%;
        height: 120px;
        background: -webkit-linear-gradient(left, #d0b2ee , #7fb3e9); /* Safari 5.1 - 6.0 */
        background: -o-linear-gradient(right, #d0b2ee, #7fb3e9); /* Opera 11.1 - 12.0 */
        background: -moz-linear-gradient(right, #d0b2ee, #7fb3e9); /* Firefox 3.6 - 15 */
        background: linear-gradient(to right, #d0b2ee , #7fb3e9); /* 标准的语法 */
        margin-top: 60px;
        font-size: 36px;
        color: #fff;
        text-align: center;
        line-height: 120px;
    }
    hr{
        height: 60px;
        background: #f9f9f9;
    }
    .enterpriseBox{
        background: #fff;
        width: 100%;
        height: 860px;
        border-bottom: 40px solid #f9f9f9;
        padding: 60px 0;
    }
    .enterpriseBox .enterpriseContentBox{
        width: 1200px;
        height: 100%;
        margin: 0 auto;
    }
    .enterpriseBox .enterpriseContentBox img{
        height: 100%;
        box-shadow: 2px 2px 6px 2px rgba(0,0,0,0.08);
        border-radius: 5px;
        display: block;
        float: left;
    }
    .enterpriseBox .enterpriseContentBox .enterpriseForm{
        margin-left: 60px;
        float: left;
    }
    .enterpriseBox .enterpriseContentBox .enterpriseForm p{
        font-size: 18px;
        color: #333;
        margin-bottom: 16px;
        line-height: 18px;
    }
    .enterpriseBox .enterpriseContentBox .enterpriseForm input,
    .enterpriseBox .enterpriseContentBox .enterpriseForm textarea{
        width: 400px;
        height: 50px;
        border-radius: 5px;
        border:1px solid #ddd;
        padding-left: 22px;
        font-size: 16px;
        color: #666;
        font-family: 新宋体;
        margin-bottom: 16px;
    }
    .enterpriseBox .enterpriseContentBox .enterpriseForm textarea{
        height: 80px;
        padding-top: 10px;
        margin-bottom: 0;
    }
    .enterpriseBox .enterpriseContentBox .enterpriseForm input:focus,
    .enterpriseBox .enterpriseContentBox .enterpriseForm textarea:focus{
        border-color: #ED9515;
    }
    .enterpriseBox .enterpriseContentBox .enterpriseForm .submitBox{
        position: relative;
    }
    .enterpriseBox .enterpriseContentBox .enterpriseForm .submitBox p{
        position: absolute;
        top: -28px;
        left: 0;
        font-size: 14px;
        color: #fd4444;
    }
    .enterpriseBox .enterpriseContentBox .enterpriseForm .enterpriseBtn{
        width: 400px;
        height: 50px;
        border-radius: 25px;
        background: #ED9515;
        cursor: pointer;
        color: #fff;
        font-size: 18px;
        text-align: center;
        line-height: 50px;
        margin-top: 32px;
    }
    .enterpriseBox .enterpriseContentBox .enterpriseForm .enterpriseBtn:hover{
        background: #ED9515;
    }
</style>
