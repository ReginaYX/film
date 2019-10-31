<template>
    <div id="tipsChoice">
        <div class="topBox">
            如何选择合适的剧本格式
        </div>
        <title-hr msg="选择合适的剧本格式可以有效的提升剧本的识别率" color="#000" bgColor="#000" class="title"></title-hr>
        <div class="newbuildFormat">
            <div name="WB">
                <span class="newbuildFormatTop">常规文本格式</span>
                <div class="newbuildFormatContent">
                    <p>3&#8195;夜&#8195;内&#8195;小石头家&#8195;雨</p>
                    <p>3&#8195;小石头家&#8195;夜&#8195;内&#8195;雨</p>
                    <p>3&#8195;小石头家&#8195;夜&#8195;内</p>
                    <p>3&#8195;夜&#8195;内&#8195;小石头家</p>
                </div>
            </div>
            <div name="WB1">
                <span class="newbuildFormatTop">文本格式1</span>
                <div class="newbuildFormatContent">
                    <p>场 次：NO：01</p>
                    <p class="br">气 氛：日外</p>
                    <p>场 景：动物园</p>
                    <p>人 物：张三、李四、王五</p>
                    <p>道 具：棍子，绳子</p>
                </div>
            </div>
            <div name="WB2">
                <span class="newbuildFormatTop">文本格式2</span>
                <div class="newbuildFormatContent">
                    <p>1.动物园外</p>
                    <p class="br left">人：张三 李四</p>
                    <p>1.日  内 动物园</p>
                    <p class="br left">人物：张三 李四</p>
                    <p>2-1     动物园。夜。外。</p>
                    <p class="br left">（人物：张三   李四）</p>
                    <p>1、动物园</p>
                    <p class="br left">人物 张三 李四 王五</p>
                    <p>1   动物园  内  日</p>
                    <p class="br left">人物：张三、李四、王五；</p>
                    <p>一、动物园 夜 内</p>
                    <p class="br left">人物：张三 </p>
                </div>
            </div>
            <div name="WB3">
                <span class="newbuildFormatTop">文本格式3</span>
                <div class="newbuildFormatContent">
                    <p>#2.</p>
                    <p>景时：动物园  日/内</p>
                    <p class="br">人物：张三 李四 王五</p>
                    <p>一.</p>
                    <p>场景：动物园</p>
                    <p>时间：雷雨夜</p>
                    <p class="br">人物：张三 李四 </p>
                    <p>第01场</p>
                    <p>时间：夜</p>
                    <p>地点：动物园</p>
                    <p class="br">人 物：张三、李四、王五。</p>
                    <p>第三场</p>
                    <p>场景：动物园</p>
                    <p>人物：张三，李四</p>
                </div>
            </div>
            <div name="WB4" class="formatNd">
                <span class="newbuildFormatTop">文本格式4</span>
                <div class="newbuildFormatContent">
                    <p>1.内景 动物园 夜  人物：张三  李四</p>
                    <p>1-1日 内 动物园  人：张三、李四、王五</p>
                    <p>2  动物园  日  外    人物   张三   李四</p>
                </div>
            </div>
            <div name="BG1" class="formatTable">
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
            </div>
            <div name="BG2" class="formatTable">
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
            </div>
        </div>
        <title-hr msg="在哪里选择剧本格式？" color="#000" bgColor="#000" class="title"></title-hr>
        <img src="../../assets/tipsChoice.jpg" alt="" class="choiceImg">
        <div class="bottomBox">
            <div class="btn" >重新上传剧本<input class="script-file" type="file" name="play" id="file" @change="getFile($event)"></div>
            <div class="btn" @click="$router.go(-1)">返回列表页</div>
        </div>
    </div>
</template>

<script>
    import titleHr from '../../common/titleHr'
    export default {
        name: "tipsChoice",
        components: {titleHr},
        data(){
          return {
              play_file:'',
              director:'',
              type:'',
              user_id:localStorage.getItem("user_id").replace("\"","").replace("\"",""),
              poster_path:'',
              name:'',
              linage:'',
              head_style:'',
              play_id:'',
              project_id:''
          }
        },
        methods:{
            //重新上传
            getFile(e){
                let deviceFile = e.target.files;
                this.play_file = deviceFile[0];
                if(this.play_file){
                    let formData = new FormData();
                    formData.append('user_id', this.user_id);
                    formData.append('name', this.name);
                    formData.append('director', this.director);
                    formData.append('type', this.type);
                    formData.append('play', this.play_file);
                    formData.append('linage', this.linage);
                    formData.append('head_style',this.head_style);
                    this.$axios({
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
                            this.project_id = response.data.data.project_id
                            this.play_id = response.data.data.play_id
                            let formData = new FormData()
                            formData.append('play_id', this.play_id)
                           this.$axios({
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
        },

        mounted(){
            this.$axios.get('/project/info', {
                params: {
                    project_id: this.$route.query.project_id
                }
            }).then((response)=> {
                this.name = response.data.data.name;
                this.director = response.data.data.director;
                this.type = response.data.data.type;
                this.linage = response.data.data.linage;
                this.head_style = response.data.data.head_style;
            })
        }
    }
</script>

<style>
    #tipsChoice+#footer{
        display: none;
    }
</style>

<style scoped>
    #tipsChoice{
        width: 1132px;
        margin: 72px auto;
    }

    #tipsChoice .topBox {
        background-image: url("../../assets/inviteRulesBg.png");
        height: 120px;
        background-size: 1132px 120px;
        font-size: 40px;
        font-family: SimSun;
        text-align: center;
        line-height: 120px;
        letter-spacing: 4px;
        color: #fff;
    }

    #tipsChoice .title{
        border-bottom: 1px solid rgba(220,220,220,1);
        padding-bottom: 8px;
        margin-top: 35px;
    }

    #tipsChoice .newbuildFormat{
        width: 100%;
        margin: 30px auto 6px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
    }

    #tipsChoice .newbuildFormat>div{
        width:250px;
        height:380px;
        background:rgba(255,255,255,1);
        border:1px solid rgba(191,191,191,1);
        border-radius:6px;
        position: relative;
        display: flex;
        justify-content: center;
        overflow: hidden;
        margin-bottom: 26px;
        flex-shrink: 0;
        cursor: pointer;
    }

    #tipsChoice .newbuildFormat>.formatNd{
        height: 310px;
    }

    #tipsChoice .newbuildFormat>.formatTable{
        height: 310px;
        width: 380px;
    }

    #tipsChoice .newbuildFormat .newbuildFormatTop{
        width:94px;
        height:22px;
        background:rgba(0,0,0,0.08);
        border-radius:0 0 6px 0;
        font-size:12px;
        line-height: 22px;
        text-align: center;
        color:rgba(255,166,37,1);
        position: absolute;
        top: 0;
        left: 0;
        transition: all 0.8s;
    }

    #tipsChoice .newbuildFormat .active .newbuildFormatTop{
        background: #000;
    }

    #tipsChoice .newbuildFormat .newbuildFormatContent{
        padding-top: 34px;
    }

    #tipsChoice .newbuildFormat .newbuildFormatContent.newbuildFormatTable{
        width: 340px;
        margin: 0 auto;
    }

    #tipsChoice .newbuildFormat .newbuildFormatContent p{
        font-size:12px;
        color:rgba(0,0,0,1);
        line-height: 22px;
    }

    #tipsChoice .newbuildFormat .newbuildFormatContent p.br{
        margin-bottom: 8px;
    }

    #tipsChoice .newbuildFormat .newbuildFormatContent p.left{
        padding-left: 4px;
    }

    #tipsChoice .newbuildFormat .newbuildFormatContent.newbuildFormatMax p{
        line-height: 20px;
    }

    #tipsChoice .newbuildFormat .newbuildFormatContent.newbuildFormatMax p.br{
        margin-bottom: 10px;
    }

    #tipsChoice .newbuildFormat .newbuildFormatContent table{
        margin-bottom: 16px;
        border-radius: 2px;
        width: 100%;
        border-width: 0 0 1px 1px;
        border-color: rgba(0,0,0,.4);
        border-style: solid;
    }

    #tipsChoice .newbuildFormat .newbuildFormatContent table th{
        border-width: 1px 1px 0 0;
        border-color: rgba(0,0,0,.4);
        border-style: solid;
        height: 28px;
        text-align: left;
        padding-left: 10px;
        font-size: 12px;
        font-weight: normal;
    }

    #tipsChoice .choiceImg{
        box-shadow: 0 0 6px 6px rgba(0,0,0,0.02);
        margin-top: 30px;
        border-radius:6px;
    }

    #tipsChoice .bottomBox{
        margin: 66px auto 200px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    #tipsChoice .bottomBox .btn{
        width:140px;
        height:34px;
        background:rgba(237,149,21,1);
        border-radius:16px;
        font-size:14px;
        text-align: center;
        line-height: 34px;
        color:rgba(255,255,255,1);
        cursor: pointer;
        position: relative;
    }

    #tipsChoice .bottomBox .btn input{
        position: absolute;
        width:140px;
        height:34px;
        opacity: 0;
        top: 0;
        left: 0;
        cursor: pointer;
        /*z-index: -1;*/
    }

    #tipsChoice .bottomBox .btn:last-child{
        margin-left: 60px;
        border:1px solid rgba(237,149,21,1);
        background: #fff;
        color:rgba(237,149,21,1);
        box-sizing: border-box;
    }
</style>