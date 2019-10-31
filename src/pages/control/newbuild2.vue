<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right" class="newbuildBreadcrumb">
            <el-breadcrumb-item :to="{ path: '/control/list' }">项目列表</el-breadcrumb-item>
            <el-breadcrumb-item :to="{path: '/control/newbuildKind'}">创建项目</el-breadcrumb-item>
            <el-breadcrumb-item :to="{path: '/control/newbuild'}">顺场制作</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="newbuildBox">
            <div class="kind2TitleBox">智能拆表：可将已做好的顺场景表拆解为分场景表和人物戏量统计表。</div>
            <div class="newbuildLeftBox">
                <div class="newbuildInputBox">
                    片名：
                    <el-input
                            placeholder="请输入内容"
                            v-model="form.name"
                            clearable class="newbuildInput">
                    </el-input>
                </div>
                <div class="newbuildInputBox">
                    导演：
                    <el-input
                            placeholder="请输入内容"
                            v-model="form.director"
                            clearable class="newbuildInput">
                    </el-input>
                </div>
                <div class="newbuildInputBox">
                    类型：
                    <el-radio-group v-model="form.type" class="newbuildRadioBox">
                        <el-radio :label="1" class="newbuildRadio">电影</el-radio>
                        <el-radio :label="2" class="newbuildRadio">电视剧</el-radio>
                        <el-radio :label="3" class="newbuildRadio">网络电影</el-radio>
                        <el-radio :label="4" class="newbuildRadio">网剧</el-radio>
                        <el-radio :label="5" class="newbuildRadio">剧情短片</el-radio><br>
                        <span class="playKindDesc">（类型选择确定后将无法进行修改）</span>
                    </el-radio-group>
                </div>
                <div class="newbuildInputBox newbuildUploadBox">
                    剧本：
                    <el-upload
                            class="uploadFile"
                            ref="uploadFile"
                            :action="uploadUrl"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            drag
                            :limit='1'
                            :before-upload="beforeAvatarUploadTxt"
                            :auto-upload='false'>
                        <div class="el-upload__text">电视剧/网剧剧本需将所有集合并于同一文档中进行上传<br><em>点击上传</em></div>
                    </el-upload>
                </div>
            </div>
            <div class="newbuildLeftBox newbuildRightBox">
                <div class="newbuildInputBox newbuildUploadBox">
                    顺场景表上传：
                    <el-upload
                            class="uploadFile"
                            ref="uploadExcel"
                            :action="uploadUrl"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            drag
                            accept=".xlsx,.xls"
                            :limit=1
                            :before-upload="beforeAvatarUploadExcel"
                            :auto-upload="false">
                        <div class="el-upload__text">将已做好的顺场景表拖拽至空白处进行上传或<br><em>点击上传</em></div>
                    </el-upload>
                </div>
                <div class="newbuildInputBox newbuildUploadBox">
                    顺场景表示例：(点击 " <a href="http://service.filmptn.com/files/muban.xlsx" target="_blank">下载</a> " 非幕顺场景表模板)
                    <img src="../../assets/newBuildTemplate.png" alt="" class="uploadFile">
                </div>
            </div>
            <div class="formatBox">
                <div class="formatTopBox">
                    <span class="line"></span>
                    <span class="txt">段首格式选择</span>
                    <span class="line"></span>
                </div>
                <p class="formatDesc">*为了提高您剧本的识别率，请选择最符合您剧本样式的段首格式</p>
                <el-carousel :autoplay="false" type="card" height="330px" class="newbuildFormat" arrow="always" indicator-position="none"
                             ref="carousel" @change="formatChange" @click.native="activeChange">
                    <el-carousel-item name="WB" :class="[active == 0?'active':'']">
                        <span class="newbuildFormatTop" style="height: 120px">常规文本格式</span>
                        <div class="newbuildFormatContent newbuildFormatWidthMin">
                            <p>3&#8195;夜&#8195;内&#8195;小石头家&#8195;雨</p><br>
                            <p>3&#8195;小石头家&#8195;夜&#8195;内&#8195;雨</p><br>
                            <p>3&#8195;小石头家&#8195;夜&#8195;内</p><br>
                            <p>3&#8195;夜&#8195;内&#8195;小石头家</p>
                        </div>
                    </el-carousel-item>
                    <el-carousel-item name="WB1" :class="[active == 1?'active':'']">
                        <span class="newbuildFormatTop">文本格式1</span>
                        <div class="newbuildFormatContent">
                            <p>场 次：1</p>
                            <p>气 氛：日外</p>
                            <p>场 景：动物园</p>
                            <p>人 物：张三、李四、王五</p>
                            <p>道 具：棍子，绳子</p>
                        </div>
                    </el-carousel-item>
                    <el-carousel-item name="WB2" :class="active == 2?'active':''">
                        <span class="newbuildFormatTop">文本格式2</span>
                        <div class="newbuildFormatContent newbuildFormatMax">
                            <p>1.动物园外</p>
                            <p class="br">人：张三 李四</p>
                            <p>1.日  内 动物园</p>
                            <p class="br">人物：张三 李四</p>
                            <p>2-1     动物园。夜。外。</p>
                            <p class="br">（人物：张三   李四）</p>
                            <p>1、动物园</p>
                            <p class="br">人物 张三 李四 王五</p>
                            <p>1   动物园  内  日</p>
                            <p class="br">人物：张三、李四、王五；</p>
                            <p>一、动物园 夜 内</p>
                            <p class="br">人物：张三 </p>
                        </div>
                    </el-carousel-item>
                    <el-carousel-item name="WB3" :class="active == 3?'active':''">
                        <span class="newbuildFormatTop">文本格式3</span>
                        <div class="newbuildFormatContent">
                            <p>#2.</p>
                            <p>景时：动物园  日/内</p>
                            <p>人物：张三 李四 王五</p><br>
                            <p>一.</p>
                            <p>场景：动物园</p>
                            <p>时间：雷雨夜</p>
                            <p>人物：张三 李四 </p><br>
                            <p>第01场</p>
                            <p>时间：夜</p>
                            <p>地点：动物园</p>
                            <p>人 物：张三、李四、王五。</p><br>
                            <p>第三场</p>
                            <p>场景：动物园</p>
                            <p>人物：张三，李四</p>
                        </div>
                    </el-carousel-item>
                    <el-carousel-item name="WB4" :class="active == 4?'active':''">
                        <span class="newbuildFormatTop">文本格式4</span>
                        <div class="newbuildFormatContent newbuildFormatWidth">
                            <p>1.内景 动物园 夜  人物：张三  李四</p><br>
                            <p>1-1日 内 动物园  人：张三、李四、王五</p><br>
                            <p>2  动物园  日  外    人物   张三   李四</p>
                        </div>
                    </el-carousel-item>
                    <el-carousel-item name="BG1" :class="active == 5?'active':''">
                        <span class="newbuildFormatTop">表格格式1</span>
                        <div class="newbuildFormatContent newbuildFormatTable">
                            <table cellspacing="0">
                                <tr>
                                    <th>场：一</th>
                                    <th>景：动物园</th>
                                </tr>
                                <tr>
                                    <th>时：夜</th>
                                    <th>人：张三、李四、王五</th>
                                </tr>
                            </table>
                            <table cellspacing="0">
                                <tr>
                                    <th>场：1</th>
                                    <th>景：动物园</th>
                                </tr>
                                <tr>
                                    <th>时：日</th>
                                    <th>人：张三、李四、王五</th>
                                </tr>
                                <tr>
                                    <th colspan="2">特约：陶掌柜</th>
                                </tr>
                                <tr>
                                    <th colspan="2">备注： 第九集E9 11:10起（有改编）</th>
                                </tr>
                            </table>
                            <table cellspacing="0">
                                <tr>
                                    <th>场次：1</th>
                                    <th>场景：动物园</th>
                                </tr>
                                <tr>
                                    <th>时空：日/外</th>
                                    <th>人物：张三、李四、王五</th>
                                </tr>
                            </table>
                        </div>
                    </el-carousel-item>
                    <el-carousel-item name="BG2" :class="active == 6?'active':''">
                        <span class="newbuildFormatTop">表格格式2</span>
                        <div class="newbuildFormatContent newbuildFormatTable">
                            <table cellspacing="0">
                                <tr>
                                    <th>1.</th>
                                    <th width="20%">动物园</th>
                                    <th>夜</th>
                                    <th>外</th>
                                    <th width="46%">人物：张三、李四、王五</th>
                                </tr>
                            </table>
                            <table cellspacing="0">
                                <tr>
                                    <th>一，</th>
                                    <th>动物园</th>
                                    <th>日</th>
                                    <th>内</th>
                                </tr>
                                <tr>
                                    <th colspan="4">人物：张三、李四、王五</th>
                                </tr>
                            </table>
                        </div>
                    </el-carousel-item>
                    <el-carousel-item name="null">
                        <div class="newbuildFeedback">
                            <p class="title" @click="newbuildFormat = false">敬请期待</p>
                            <transition name="el-zoom-in-center">
                                <img src="../../assets/erweima.png" alt="" v-show="wchatCode">
                            </transition>
                            <p class="desc">其他段首格式还在努力调试,客官稍等···</p>
                            <p class="desc">如有需要请<span @click="wchatCode = !wchatCode">添加微信</span>或<router-link to="/feedback">反馈</router-link>给我们</p>
                        </div>
                    </el-carousel-item>
                </el-carousel>
            </div>

            <div class="newbuildBtnBox" @click="submit" id="submitBtn">
                提交
            </div>
        </div>
    </div>
</template>

<script>
    import axios from "axios"
    export default {
        name: "newbuild",
        data () {
            return {
                uploadUrl:'/project/create',
                form:{
                    user_id:'',
                    name:'',
                    director:'',
                    type:'',
                    play:'',
                    linage:44,
                    operation_type:2,
                    table:'',
                    formatChoiceId:'WB',//选择的段首类型
                },
                play_name:'',
                project_id:'',
                play_id :'',
                loading: false,
                currentFormat:'',//当前段首类型
                formatChoice:'',//选择的段首类型名
                newbuildFormat:false,//段首类型显示
                wchatCode:false,//微信二维码显示
                active:0,//走马灯
            }
        },
        methods:{
            activeChange(i){
                this.active = this.$refs.carousel.activeIndex
                if(this.active == 0){
                    this.form.formatChoiceId = 'WB'
                    this.formatChoice = '常规格式段首'
                }else if(this.active == 1){
                    this.form.formatChoiceId = 'WB1'
                    this.formatChoice = '文本格式1段首'
                }else if(this.active == 2){
                    this.form.formatChoiceId = 'WB2'
                    this.formatChoice = '文本格式2段首'
                }else if(this.active == 3){
                    this.form.formatChoiceId = 'WB3'
                    this.formatChoice = '文本格式3段首'
                }else if(this.active == 4){
                    this.form.formatChoiceId = 'WB4'
                    this.formatChoice = '文本格式4段首'
                }else if(this.active == 5){
                    this.form.formatChoiceId = 'BG1'
                    this.formatChoice = '表格格式1段首'
                }else if(this.active == 6){
                    this.form.formatChoiceId = 'BG2'
                    this.formatChoice = '表格格式2段首'
                }else{
                    this.$message('请选择一种段首格式');
                }
            },
            //文件上传
            submitUpload() {
                this.$refs.upload.submit();
            },
            handleRemove(file) {
                // console.log(file);
            },
            handlePreview(file) {
                // console.log(file);
            },
            beforeAvatarUploadExcel(file) {
                this.form.table =  file
                return false
            },
            beforeAvatarUploadTxt(file) {
                this.form.play =  file
            },
            //段首格式切换
            formatChange(i){
                this.currentFormat = i
            },
            //段首格式确认
            formatConfirm(){
                if(this.currentFormat == 0){
                    this.form.formatChoiceId = 'WB'
                    this.formatChoice = '常规格式段首'
                }else if(this.currentFormat == 1){
                    this.form.formatChoiceId = 'WB1'
                    this.formatChoice = '文本格式1段首'
                }else if(this.currentFormat == 2){
                    this.form.formatChoiceId = 'WB2'
                    this.formatChoice = '文本格式2段首'
                }else if(this.currentFormat == 3){
                    this.form.formatChoiceId = 'WB3'
                    this.formatChoice = '文本格式3段首'
                }else if(this.currentFormat == 4){
                    this.form.formatChoiceId = 'WB4'
                    this.formatChoice = '文本格式4段首'
                }else if(this.currentFormat == 5){
                    this.form.formatChoiceId = 'BG1'
                    this.formatChoice = '表格格式1段首'
                }else if(this.currentFormat == 6){
                    this.form.formatChoiceId = 'BG2'
                    this.formatChoice = '表格格式2段首'
                }else{
                    this.$message('请选择一种段首格式');
                }
                if(this.currentFormat != 7){
                    this.newbuildFormat = false
                }
            },
            // 下一个段首格式
            next(){
                this.$refs.carousel.next();
            },
            // 上一个段首格式
            prev(){
                this.$refs.carousel.prev();
            },
            submit () {
              this.$refs.uploadExcel.submit(); // 提交时分别触发各上传组件的before-upload函数
                this.$refs.uploadFile.submit();
              this.loading = true
                document.getElementById("submitBtn").style.pointerEvents="none";
              if(this.form.name && this.form.director && this.form.type && this.form.play){
                    let formData = new FormData()
                    formData.append('user_id', this.form.user_id)
                    formData.append('name', this.form.name)
                    formData.append('director', this.form.director)
                    formData.append('type', this.form.type)
                    formData.append('play', this.form.play)
                    formData.append('linage', this.form.linage)
                    formData.append('operation_type', this.form.operation_type)
                    formData.append('table', this.form.table)
                    formData.append('head_style',this.form.formatChoiceId)
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
                        if(response.data.msg == 'ok'){
                            this.project_id = response.data.data.project_id
                            this.play_id = response.data.data.play_id
                            this.$router.push('/details/count?play_id='+this.play_id+'&project_id='+this.project_id)
                        }else{
                            this.$alert(response.data.msg, '提示', {
                                confirmButtonText: '确定'
                            });
                            this.loading = false;
                            document.getElementById("submitBtn").style.pointerEvents="auto";
                        }
                    })
                }else{
                  this.$message('请填写完整');
                 document.getElementById("submitBtn").style.pointerEvents="auto";
                }

            },
        },
        mounted(){
            if(localStorage.user_id){
                this.form.user_id = localStorage.getItem("user_id").replace("\"","").replace("\"","")
            }else {
                this.$alert('登录已超时，请重新登录', '提示', {
                    confirmButtonText: '确定'
                });
                this.$router.push('/index/introduce')
            }
        }
    }
</script>
<style src="../../css/el-message-box.css"></style>
<style>
    /*输入框*/
    .newbuildBox .newbuildLeftBox .newbuildInputBox .newbuildInput .el-input__inner{
        height: 48px;
        border: none;
        border-bottom: 1px solid rgba(0,0,0,.2);
        border-radius: 0;
        color: #000;
        padding-left: 8px;
        font-size: 14px;
        line-height: 48px;
    }

    .newbuildBox .newbuildLeftBox .newbuildInputBox .newbuildInput .el-input__inner:focus{
        border-color: rgba(255,105,14,1);
    }

    /*单选框*/
    .newbuildBox .newbuildLeftBox .newbuildRadioBox .newbuildRadio .el-radio__label{
        padding-left: 8px;
        font-size:12px;
        color:rgba(0,0,0,1);
    }

    .newbuildBox .newbuildLeftBox .newbuildRadioBox .newbuildRadio .el-radio__inner{
        border-radius: 2px;
        width:12px;
        height:12px;
        border:1px solid rgba(186,186,186,.8);
    }

    .newbuildBox .newbuildLeftBox .newbuildRadioBox .newbuildRadio .el-radio__input.is-checked .el-radio__inner{
        background: rgba(255,105,14,1);
        border-color: rgba(255,105,14,1);
    }

    .newbuildBox .newbuildLeftBox .newbuildRadioBox .newbuildRadio .el-radio__input.is-checked .el-radio__inner:after{
        display: none;
    }

    /*上传框*/
    .newbuildBox .uploadFile .el-upload-dragger{
        width:330px;
        height:160px;
        border-radius:6px;
    }

    .newbuildBox .uploadFile .el-upload-dragger:hover{
        border-color: rgba(255,105,14,1);
    }

    .newbuildBox .uploadFile .el-upload-dragger .el-upload__text{
        font-size: 12px;
        margin-top: 40px;
        line-height: 50px;
    }

    .newbuildBox .uploadFile .el-upload-dragger .el-upload__text em{
        color: rgba(255,105,14,1);
    }

    .newbuildBox .uploadFile .el-upload-list__item.is-ready{
        margin-top: 0;
    }

    /*格式选择走马灯*/
    .newbuildBox .newbuildFormat .el-carousel__item--card{
        background: rgba(255,255,255,1);
        border:1px solid rgba(191,191,191,1);
        border-radius:6px;
        cursor: pointer;
    }
    .newbuildBox .newbuildFormat .el-carousel__item--card.active{
        border: 2px solid #F89C3B;
    }
</style>
<style scoped>
    *{
        box-sizing: border-box;
        font-family: Microsoft Yahei, 微软雅黑;
    }

    .newbuildBreadcrumb{
        width: 1132px;
        margin: 70px auto 0;
    }

    .newbuildBox{
        width:1132px;
        /*height:868px;*/
        background:rgba(255,255,255,1);
        border-radius:6px;
        box-shadow: 0 0 20px 4px rgba(0,0,0,.03);
        margin: 22px auto 180px;
        padding: 18px 70px 62px 50px;
    }

    .newbuildBox .newbuildLeftBox{
        float: left;
        width: 420px;
    }

    .newbuildBox .newbuildLeftBox .newbuildInputBox{
        margin-top: 40px;
        font-size:14px;
        color:rgba(0,0,0,.6);
    }

    .newbuildBox .newbuildLeftBox .newbuildInputBox .newbuildInput{
        height: 48px;
    }

    .newbuildBox .newbuildLeftBox .newbuildRadioBox{
        margin-top: 34px;
        padding-left: 8px;
    }

    .newbuildBox .newbuildLeftBox .newbuildRadioBox .newbuildRadio:last-of-type{
        margin-right: 0;
    }

    .newbuildBox .newbuildLeftBox .newbuildRadioBox .playKindDesc{
        font-size:12px;
        color:rgba(0,0,0,.5);
    }

    .newbuildBox .newbuildLeftBox .newbuildInputBox a{
        color:rgba(255,105,14,1);
    }

    .newbuildBox .uploadFile{
        margin-top: 20px;
        width:330px;
        height:160px;
        border-radius:6px;
    }

    .newbuildBox .newbuildRightBox{
        float: right;
    }

    .newbuildBox img.uploadFile{
        width: 430px;
        height: 310px;
    }

    .newbuildBox .newbuildBtnBox{
        margin: 40px auto 0;
        width:120px;
        height:34px;
        background:rgba(237,149,21,1);
        border-radius:16px;
        font-size:14px;
        color:rgba(255,255,255,1);
        text-align: center;
        line-height: 34px;
        cursor: pointer;
    }

    .newbuildBox .newbuildFormat{
        width: 100%;
        margin: 58px auto 0;
    }

    .newbuildBox .formatDesc{
        text-align: center;
        margin-top: 20px;
        font-size: 12px;
    }


    .newbuildBox .newbuildFormat .newbuildFormatTop{
        display: inline-block;
        height: 110px;
        width: 24px;
        background:rgba(63,62,106,.3);
        border-radius:0 0 6px 0;
        font-size:12px;
        padding: 8px 4px 0;
        text-align: center;
        color:rgba(0,0,0,.8);
    }

    .newbuildBox .newbuildFormat .active .newbuildFormatTop{
        background: #F89C3B;
        color: #fff;
    }

    .newbuildBox .newbuildFormat .newbuildFormatContent{
        width: 268px;
        margin-right: 8%;
        padding-top: 20px;
        height: 79%;
        float: right;
    }

    .newbuildBox .newbuildFormat .newbuildFormatContent.newbuildFormatTable{
        width: 170px;
        margin-right: 9%;
    }

    .newbuildBox .newbuildFormat .newbuildFormatContent.newbuildFormatWidthMin{
        width: 288px;
    }

    .newbuildBox .newbuildFormat .newbuildFormatContent.newbuildFormatWidth{
        width: 308px;
    }

    .newbuildBox .newbuildFormat .newbuildFormatContent p{
        font-size:12px;
        color:rgba(0,0,0,1);
        line-height: 24px;
    }

    .newbuildBox .newbuildFormat .newbuildFormatContent p.br{
        padding-left: 4px;
    }

    .newbuildBox .newbuildFormat .newbuildFormatContent.newbuildFormatMax p{
        line-height: 20px;
    }

    .newbuildBox .newbuildFormat .newbuildFormatContent.newbuildFormatMax p.br{
        margin-bottom: 10px;
    }

    .newbuildBox .newbuildFormat .newbuildFormatContent.newbuildFormatTable{
        width: 400px;
    }

    .newbuildBox .newbuildFormat .newbuildFormatContent table{
        margin-bottom: 20px;
        border-radius: 2px;
        width: 100%;
        border-width: 0 0 1px 1px;
        border-color: rgba(0,0,0,.4);
        border-style: solid;
    }

    .newbuildBox .newbuildFormat .newbuildFormatContent table th{
        border-width: 1px 1px 0 0;
        border-color: rgba(0,0,0,.4);
        border-style: solid;
        height: 28px;
        text-align: left;
        padding-left: 10px;
        font-size: 12px;
        font-weight: normal;
    }
    .newbuildBox .formatBox{
        margin-top: 650px;
    }

    .newbuildBox .formatBox .formatTopBox {
        height: 14px;
        text-align: center;
        width: 100%;
        position: relative;
    }
    .newbuildBox .formatBox .formatTopBox .line {
        position: absolute;
        width: 42%;
        height: 1px;
        background: rgba(0,0,0,0.1);
        top: 50%;
    }

    .newbuildBox .formatBox .formatTopBox .line:first-of-type{
        left: 0;
    }

    .newbuildBox .formatBox .formatTopBox .line:last-of-type{
        right: 0;
    }

    .newbuildBox .formatBox .formatTopBox .txt {
        font-size:14px;
        text-align: center;
        line-height: 14px;
        color:rgba(0,0,0,0.6);
    }


    /*.newbuildBox .newbuildShadeBox{*/
        /*position: fixed;*/
        /*top: 0;*/
        /*left: 0;*/
        /*background: rgba(0,0,0,.3);*/
        /*width: 100vw;*/
        /*height: 100%;*/
        /*z-index: 2001;*/
    /*}*/

    /*.newbuildBox .newbuildShadeBox .closeBtn{*/
        /*position: absolute;*/
        /*top: 10%;*/
        /*right: 10%;*/
        /*font-size: 40px;*/
        /*color: rgba(0,0,0,.4);*/
        /*cursor: pointer;*/
    /*}*/

    /*.newbuildBox .newbuildShadeBox .newbuildFormat{*/
        /*width: 900px;*/
        /*margin: 120px auto 0;*/
    /*}*/

    /*.newbuildBox .newbuildShadeBox .newbuildFormat .newbuildFormatTop{*/
        /*height:24px;*/
        /*background:rgba(63,62,106,1);*/
        /*border-radius:0 6px 6px 0;*/
        /*margin: 12px 0 40px;*/
        /*font-size:14px;*/
        /*line-height: 24px;*/
        /*padding:0 16px;*/
        /*color:rgba(255,255,255,1);*/
        /*display: inline-block;*/
    /*}*/

    /*.newbuildBox .newbuildShadeBox .newbuildFormat .newbuildFormatContent{*/
        /*width: 170px;*/
        /*margin: 0 auto;*/
        /*height: 79%;*/
    /*}*/

    /*.newbuildBox .newbuildShadeBox .newbuildFormat .newbuildFormatContent.newbuildFormatWidth{*/
        /*width: 245px;*/
    /*}*/

    /*.newbuildBox .newbuildShadeBox .newbuildFormat .newbuildFormatContent p{*/
        /*font-size:14px;*/
        /*color:rgba(0,0,0,1);*/
        /*line-height: 24px;*/
    /*}*/

    /*.newbuildBox .newbuildShadeBox .newbuildFormat .newbuildFormatContent p.br{*/
        /*padding-left: 4px;*/
    /*}*/

    /*.newbuildBox .newbuildShadeBox .newbuildFormat .newbuildFormatContent.newbuildFormatTable{*/
        /*width: 400px;*/
    /*}*/

    /*.newbuildBox .newbuildShadeBox .newbuildFormat .newbuildFormatContent table{*/
        /*margin-bottom: 40px;*/
        /*border-radius: 2px;*/
        /*width: 100%;*/
        /*border-width: 0 0 1px 1px;*/
        /*border-color: rgba(0,0,0,.4);*/
        /*border-style: solid;*/
    /*}*/

    /*.newbuildBox .newbuildShadeBox .newbuildFormat .newbuildFormatContent table th{*/
        /*border-width: 1px 1px 0 0;*/
        /*border-color: rgba(0,0,0,.4);*/
        /*border-style: solid;*/
        /*height: 36px;*/
        /*text-align: left;*/
        /*padding-left: 10px;*/
        /*font-size: 14px;*/
        /*font-weight: normal;*/
    /*}*/

    .newbuildBox .carouselBtn{
        width:100px;
        height:34px;
        border-radius:16px;
        font-size:14px;
        color:rgba(255,254,254,1);
        text-align: center;
        line-height: 32px;
        margin: 0 auto;
        cursor: pointer;
        background:rgba(237,149,21,1);
        border-color: rgba(237,149,21,1);
    }

    .newbuildBox .newbuildFeedback{
        position: relative;
        overflow: hidden;
    }

    .newbuildBox .newbuildFeedback .title{
        font-size:26px;
        font-family:MicrosoftYaHei;
        color:rgba(0,0,0,1);
        opacity:0.4;
        text-align: center;
        line-height: 26px;
        margin: 12% 0 30%;
    }

    .newbuildBox .newbuildFeedback .desc{
        font-size:12px;
        font-family:MicrosoftYaHei;
        color:rgba(0,0,0,1);
        text-align: center;
        line-height: 22px;
        cursor: text;
    }

    .newbuildBox .newbuildFeedback>img{
        position: absolute;
        top: 39%;
        left: 33%;
        width: 150px;
    }

    .newbuildBox .newbuildFeedback .desc span,
    .newbuildBox .newbuildFeedback .desc a{
        font-size:12px;
        cursor: pointer;
        color:rgba(237,149,21,1);
    }
</style>
