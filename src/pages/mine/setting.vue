<template>
    <el-card class="setting-card" shadow="never">
      <el-collapse v-model="activeName" accordion class="mineCollapse">
        <el-collapse-item title="基础信息" name="1">
          <el-form ref="form" :model="form" label-width="100px" style="background-color: #ffffff;" class="settingForm">
            <el-form-item label="姓名">
              <el-input v-model="form.name" class="input_width"></el-input>
            </el-form-item>
            <el-form-item label="性别">
              <el-radio-group v-model="form.sex">
                <el-radio label="男"></el-radio>
                <el-radio label="女" ></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="公司">
              <el-input v-model="form.company"  class="input_width"></el-input>
            </el-form-item>
            <el-form-item label="工作岗位">
              <el-input v-model="form.post"  class="input_width"></el-input>
            </el-form-item>
            <el-form-item label="个人简介" class="setting_resume">
              <el-input type="textarea" v-model="form.introduction"></el-input>
            </el-form-item>
          </el-form>
        </el-collapse-item>
        <el-collapse-item title="详细信息" name="2">
          <el-form ref="form" :model="form" label-width="100px" style="background-color: #ffffff;" class="settingForm">
            <el-form-item label="毕业院校">
              <el-input v-model="form.school"  class="input_width"></el-input>
            </el-form-item>
            <el-form-item label="生日">
              <el-date-picker  class="input_width"
                               v-model="form.birthday"
                               type="date"
                               placeholder="选择日期" value-format="timestamp">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="所在城市">
              <el-input v-model="form.city"  class="input_width"></el-input>
            </el-form-item>
            <el-form-item label="身份证号">
              <el-input v-model="form.id_number"  class="input_width"></el-input>
            </el-form-item>
            <el-form-item label="国籍">
              <el-input v-model="form.nationality"  class="input_width"></el-input>
            </el-form-item>
            <el-form-item label="语言">
              <el-input v-model="form.language"  class="input_width"></el-input>
            </el-form-item>
            <el-form-item label="护照">
              <el-input v-model="form.passport"  class="input_width"></el-input>
            </el-form-item>
            <el-form-item label="宗教">
              <el-input v-model="form.religion"  class="input_width"></el-input>
            </el-form-item>
            <el-form-item label="持有驾照">
              <el-radio-group v-model="form.has_driver_license">
                  <el-radio :label="1">是</el-radio>
                  <el-radio :label="0" >否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
        </el-collapse-item>
        <el-collapse-item title="个性化设置" name="3">
          <div class="setting_defaultRow">
            <p class="setting_defaultRowDsc">默认剧本行数<span>（作为页面量统计的依据）</span></p>
            <li class="setting_Row active" @click="selectedLinage(1)">44行</li>
            <li class="setting_Row" @click="selectedLinage(2)">40行</li>
            <li class="setting_Row" @click="selectedLinage(3)">30行</li>
            <li class="setting_Row" @click="selectedLinage(4)">20行</li>
          </div>
        </el-collapse-item>
      </el-collapse>

      <el-button type="warning" @click="submit"  class="setting_save">保存</el-button>
    </el-card>
</template>

<script>
    import axios from "axios"
    export default {
        name: "setting",
        data () {
            return {
                form:{
                  user_id:'',
                  name:'',
                  sex:0,
                  school:'',
                  company:'',
                  post:'',
                  introduction:'',
                  birthday:0,
                  city:'',
                  linage:0,
                    nationality:'',
                    language:'',
                    passport:'',
                    religion:'',
                    id_number:'',
                    has_driver_license:''
                },
              pickerOptions1: {
                disabledDate(time) {
                  return time.getTime() > Date.now();
                },
                shortcuts: [{
                  text: '今天',
                  onClick(picker) {
                    picker.$emit('pick', new Date());
                  }
                }, {
                  text: '昨天',
                  onClick(picker) {
                    const date = new Date();
                    date.setTime(date.getTime() - 3600 * 1000 * 24);
                    picker.$emit('pick', date);
                  }
                }, {
                  text: '一周前',
                  onClick(picker) {
                    const date = new Date();
                    date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit('pick', date);
                  }
                }],
              },
              value1: '',
              value2: '',
              activeName: '1',//折叠面板展开
            }
        },
        methods:{
          selectedLinage(n){
              $(".setting_Row").eq(n-1).addClass("active").siblings().removeClass("active");
              this.form.linage = $(".setting_Row").eq(n-1)[0].innerText.substr(0, 2)
          },

          submit () {
              for (var j in this.form) {
                  if (j == 'auths' || j == 'package_id' || j == 'package_name' || j == 'package_due' || j == 'invite_code') {
                      delete this.form[j];
                  }
              }
              if(this.form.birthday){
                  var day = this.form.birthday / 1000
                  this.form.birthday = day
              }
              if(this.form.sex){
                  var sex = this.form.sex;
                  if(sex == '女'){
                      this.form.sex =2
                  }else{
                      this.form.sex =1
                  }
              }
              if(this.form.has_driver_license){
                  this.form.has_driver_license = 1
              }else{
                  this.form.has_driver_license = 0
              }
              axios({
                  method: 'post',
                  url: '/user/update_info',
                  data:this.form,
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
                  if(response.data.msg == 'ok'){
                      this.$message({
                          message: '保存成功',
                          type: 'success'
                      })
                      this.fetchData()
                  }else{
                      this.$message.error(response.data.msg);
                  }
              })
          },
          fetchData(){
                this.form.user_id = localStorage.getItem("user_id").replace("\"","").replace("\"","")
                axios({
                    method: 'get',
                    url: '/user/info?user_id='+this.form.user_id,
                    headers:{
                        'Content-type': 'application/x-www-form-urlencoded'
                    }
                }).then((response)=> {
                    for (var j in response.data.data){
                        if(j != 'created_at' && j!= 'updated_at' && j!= 'project_num' && j!= 'status' && j!= 'type' && j != 'last_upload_at' && j!= 'whether_weixin_bind' && j!= 'source' && j!= 'phone' && j!= 'profile_picture'){
                            this.form[j] = response.data.data[j]
                            if(j == 'birthday'){
                                this.form.birthday = response.data.data.birthday*1000
                            }
                            if(j == 'sex'){
                                if(response.data.data.sex ==1){
                                    this.form.sex = '男'
                                }else{
                                    this.form.sex = '女'
                                }
                            }
                            if(j == 'linage'){
                                $(".setting_Row").each((index,ele)=>{
                                    if(this.form.linage == $(".setting_Row").eq(index)[0].innerText.substr(0, 2)){
                                        $(".setting_Row").eq(index).addClass("active").siblings().removeClass("active");
                                    }
                                });
                            }
                        }else{
                            continue;
                        }

                    }
                })
          }
        },
        mounted(){
            if(localStorage.user_id){
                this.fetchData()
            }else {
                this.$alert('登录已超时，请重新登录', '提示', {
                    confirmButtonText: '确定',
                    confirmButtonClass: 'aloneConfirmButton'
                });
                this.$router.push('/')
            }


          // 页面跳转tabs修复
          if (this.$route.path == '/mine/setting') {

            var setting = document.getElementsByClassName('setting');
            var tradingCenter = document.getElementsByClassName('tradingCenter');

            setting[1].style = 'color:#333 ;';
            tradingCenter[0].style = '';
          }

        }
    }
</script>
<style src="../../css/el-message-box.css"></style>
<style>
  .setting-card .el-card__body{
    padding-top: 10px;
  }

  /*折叠面板*/
  .mineCollapse{
    border: none!important;
  }

  .mineCollapse .el-collapse-item__header{
    font-size: 18px;
    font-family: Microsoft Yahei, 微软雅黑;
    /*padding: 0px 0 40px 15px;*/
    padding-left: 15px;
    margin-bottom: 10px;
  }

  .settingForm .el-form-item{
    margin-bottom: 18px!important;
  }
  .settingForm .el-form-item .el-form-item__label{
    width: 100px!important;
  }

  .setting_resume .el-form-item__content{
    margin-left: 120px!important;
  }
  .settingForm .el-radio__inner:hover{
    border-color: #f6ae45!important;
  }
  .settingForm .el-radio__input.is-checked .el-radio__inner{
    border-color: #f6ae45!important;
    background: #f6ae45!important;
  }
  .settingForm .el-radio__input.is-checked+.el-radio__label{
    color: #f6ae45!important;
  }

  .settingForm .el-form-item .el-form-item__content .input_width,
  .settingForm .el-form-item .el-form-item__content .input_width .el-input__inner{
    width: 220px!important;
  }
  .settingForm .el-form-item .el-input__inner{
    background: #f9f9f9!important;
  }
  .settingForm .el-form-item .el-input__inner:focus{
    background: #fff!important;
  }
  .settingForm .el-form-item__label{
    font-size: 16px;
    font-family: Microsoft Yahei, 微软雅黑;
    color: #999;
    font-weight: normal;
    margin-right: 20px;
    width: 120px!important;
  }
  .settingForm .el-radio+.el-radio{
    margin-left: 18px;
  }

  .settingForm .el-textarea__inner{
    width: 94%!important;
    background: #f9f9f9!important;
  }
  .settingForm .el-textarea__inner:focus{
    background: #fff!important;
    border-color: #ddd!important;
  }
  .settingForm .el-textarea__inner{
    min-height: 100px!important;
  }

  .settingForm .el-input__inner,.el-radio__label,
  .settingForm .el-textarea__inner{
    font-size: 16px;
    font-family: 新宋体;
  }
  .setting_save.el-button{
    width:115px;
    height:34px;
    line-height: 10px;
    background:rgba(237,149,21,1);
    border-radius:17px;
    margin: 30px 0 20px 15px;
  }
  .settingForm .el-button span{
    font-size: 18px;
    color: #fff;
  }
  .settingForm .el-card{
    border: none!important;
    border-radius: initial!important;
  }

  /*个性化设置*/
  .setting_defaultRow{
    padding-left: 15px;
  }
  .setting_defaultRow .setting_defaultRowTitle{
    font-size: 18px;
    color: #333;
    font-family: Microsoft Yahei, 微软雅黑;
    margin-top: 30px;
    line-height: 18px;
    display: inline-block;
  }
  .setting_defaultRow .setting_defaultRowDsc{
    font-size: 16px;
    font-family: Microsoft Yahei, 微软雅黑;
    color: #666;
    margin-top: 20px;
    margin-bottom: 30px;
  }
  .setting_defaultRow .setting_defaultRowDsc span{
    font-family: 新宋体;
    margin-left: 26px;
  }
  .setting_defaultRow .setting_Row{
    display: inline-block;
    width: 100px;
    height: 40px;
    background: #eee;
    margin-bottom: 40px;
    border-radius: 5px;
    font-size: 16px;
    font-family: Microsoft Yahei, 微软雅黑;
    color: #666;
    text-align: center;
    line-height: 40px;
    margin-right: 55px;
    border: 1px solid #eee;
    cursor: pointer;
  }
  .setting_defaultRow .setting_Row.active{
    background: #fff;
    border-color: #ED9515;
  }
</style>
