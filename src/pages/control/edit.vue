<template>
    <div id="bianjijiekou">
        <div style="height:820px;box-shadow: 0 2px 3px 2px rgba(0,0,0,0.05);background-color: #fff;overflow: hidden;border-radius: 5px">
            <div style="margin-left: 30px;margin-top: 40px">
                <img src="../../assets/play_name.png" alt="" style="margin-right: 12px;margin-top: -8px;width: 22px">
                <span style="font-size: 22px;color: #333;font-family: 新宋体;margin-right: 99px;">片名</span>
                <input type="text" class="name" style="border: none;border-bottom:1px solid #ddd;width: calc(100% - 380px);background-color: #fff;font-size: 18px;font-family: 新宋体;color: #666;" v-model="form.name">
            </div>
            <div style="margin-left: 30px;margin-top: 40px;">
                <img src="../../assets/play_director.png" alt="" style="margin-right: 12px;margin-top: -8px;width: 22px">
                <span style="font-size: 22px;color: #333;font-family: 新宋体;margin-right: 99px;">导演</span>
                <input type="text" class="director" style="border: none;border-bottom:1px solid #ddd;width: calc(100% - 380px);background-color: #fff;font-size: 18px;font-family: 新宋体;color: #666;" v-model="form.director">
            </div>
            <!--类型-->
            <div style="margin-left: 30px;margin-top: 40px;display: flex;align-items: center;">
                <div style="flex-shrink: 0;align-self: flex-start">
                    <img src="../../assets/play_type.png" alt="" style="margin-right: 12px;margin-top: -8px;width: 24px">
                    <span style="font-size: 22px;color: #333;font-family: 新宋体;margin-right: 106px;margin-top: -8px">类型</span>
                </div>

                <div style="display: flex;flex-wrap: wrap;">
                    <li class="type_radio">
                        <div :class="['cir',type=='电影'?'active':'']"></div>
                        电影
                    </li>
                    <li class="type_radio">
                        <div :class="['cir',type=='电视剧'?'active':'']"></div>
                        电视剧
                    </li>
                    <li class="type_radio">
                        <div :class="['cir',type=='网络电影'?'active':'']"></div>
                        网络电影
                    </li>
                    <li class="type_radio">
                        <div :class="['cir',type=='网剧'?'active':'']"></div>
                        网剧
                    </li>
                    <li class="type_radio" style="margin-right: 28px">
                        <div :class="['cir',type=='剧情短片'?'active':'']"></div>
                        剧情短片
                    </li>
                    <span style="font-family: Microsoft Yahei, 微软雅黑;font-size: 16px;color: #999;line-height: 40px">(类型选择确定后将无法进行修改)</span>
                </div>

            </div>
            <!--海报-->
            <div style="margin-left: 30px;margin-top: 38px;position: relative">
                <img src="../../assets/play_director.png" alt="" style="margin-right: 12px;margin-top: -12px;width: 24px">
                <span style="font-size: 22px;color: #333;font-family: 新宋体;margin-right: 99px;display: inline-block;margin-top: -10px">海报</span>
                <img v-if="poster" :src="'http://service.test.filmptn.com/files/'+poster" class="poster-show" style="height: 220px;vertical-align: top;" align="middle" id="poster-show">
                <img v-else src="../../assets/list_defaultPost.png" class="poster-show" style="height: 220px;vertical-align: top;" align="middle" id="poster-show">
                <input type="file" class="poster" style="border:none;background: #ED9515;color: #459df5;font-weight: 100;font-size: 14px;vertical-align: bottom;display: inline-block;width: 83px;height:30px;position: absolute;top: 190px;left: 497px;opacity: 0"  accept="image/*" value="选择图片" @change="getFile($event)">
                <div class="edit_choseIMG">选择图片</div>
            </div>
            <div style="margin-left: 30px;margin-top: 39px">
                <img src="../../assets/play_manager.png" alt="" style="margin-right: 12px;margin-top: -8px;width: 22px">
                <span style="font-size: 22px;color: #333;font-family: 新宋体;margin-right: 78px;">制片方</span>
                <input type="text" class="production_manager" style="border: none;border-bottom:1px solid #ddd;width: calc(100% - 380px);background-color: #fff;font-size: 18px;font-family: 新宋体;color: #666;" v-model="form.production_manager">
            </div>
            <div style="margin-left: 30px;margin-top: 39px">
                <img src="../../assets/play_producer.png" alt="" style="margin-right: 12px;margin-top: -8px;width: 22px">
                <span style="font-size: 22px;color: #333;font-family: 新宋体;margin-right: 78px;">制片人</span>
                <input type="text" class="producer" style="border: none;border-bottom:1px solid #ddd;width: calc(100% - 380px);background-color: #fff;font-size: 18px;font-family: 新宋体;color: #666;" v-model="form.producer">
            </div>
            <div style="margin-left: 30px;margin-top: 39px">
                <img src="../../assets/play_marketing.png" alt="" style="margin-right: 12px;margin-top: -8px;width: 22px">
                <span style="font-size: 22px;color: #333;font-family: 新宋体;margin-right: 55px;">制片主任</span>
                <input type="text" class="marketing_producer" name="marketing_producer" style="border: none;border-bottom:1px solid #ddd;width: calc(100% - 380px);background-color: #fff;font-size: 18px;font-family: 新宋体;color: #666;" v-model="form.marketing_producer">
            </div>
            <div style="margin-left: 30px;margin-top: 39px">
                <img src="../../assets/play_coordinator.png" alt="" style="margin-right: 12px;margin-top: -8px;width: 22px">
                <span style="font-size: 22px;color: #333;font-family: 新宋体;margin-right: 102px;">统筹</span>
                <input type="text" class="coordinator" name="coordinator" style="border: none;border-bottom:1px solid #ddd;width: calc(100% - 380px);background-color: #fff;font-size: 18px;font-family: 新宋体;color: #666;" v-model="form.coordinator">
            </div>

        </div>
        <div style="margin-bottom: 80px;margin-top: 50px;text-align: center">
            <el-button id="baocun" @click="save" :plain="true">
                <span style="font-size: 18px">保存</span>
            </el-button>
            <el-button id="delete_project" style="margin-left: 10vw;line-height: normal;padding: 0" @click="dele">

                <span style="font-size: 18px;color: #999">删除项目</span>
            </el-button>
        </div>

    </div>
</template>

<script>
    import axios from "axios"
    export default {
        name: "edit",
        data () {
            return {
                form:{
                    project_id:'',
                    user_id:'',
                    name:'',
                    director:'',
                    poster:'',
                    production_manager:'',
                    producer:'',
                    marketing_producer:'',
                    coordinator:'',
                    play:''
                },
                imgFile:'',
                poster:'',
                type:''
            }
        },
        methods:{
            getFile(e){
                console.log(1)
                let deviceFile = e.target.files;
                this.form.poster = deviceFile[0];
                var r= new FileReader();
                r.readAsDataURL(this.form.poster);
                r.onload=function  (e) {
                    document.getElementById('poster-show').src=this.result;
                };
            },
            save () {
                let formData = new FormData()
                formData.append('project_id', this.form.project_id)
                formData.append('user_id', this.form.user_id)
                formData.append('name', this.form.name)
                formData.append('director', this.form.director)
                if (this.form.poster) {
                    formData.append('poster', this.form.poster)
                }
                formData.append('production_manager', this.form.production_manager)
                formData.append('producer', this.form.producer)
                formData.append('marketing_producer', this.form.marketing_producer)
                formData.append('coordinator', this.form.coordinator)
                axios({
                    method: 'post',
                    url: '/project/update',
                    data: formData,
                    headers:{
                        'Content-Type': 'multipart/form-data',
                        'Accept': '*/*',
                        'X-Requested-With': 'XMLHttpRequest'
                    }
                }).then((response)=> {
                    if(response.data.ret == 0){

                        this.$message({
                            message: '保存成功',
                            type: 'success'
                        });
                        this.$router.push('/control/list')
                    }else{
                        this.$message.error(response.data.msg);
                    }
                })
            },
            dele () {
                this.$confirm('确认删除后项目将不可恢复，是否继续您的操作?', '项目管理', {
                    confirmButtonText: '确认删除',
                    cancelButtonText: '我不删了'
                }).then(() => {
                    axios({
                        method: 'post',
                        url: '/project/delete',
                        data:{
                            project_id:this.$route.query.project_id,
                            user_id:this.form.user_id
                        },
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
                        if(response.data.msg == 'ok'){
                            this.$router.go(-1)
                        }
                    })
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            }
        },
        mounted () {
            if(localStorage.user_id){
                this.form.user_id = localStorage.getItem("user_id").replace("\"","").replace("\"","")
            }else {
                this.$alert('登录已超时，请重新登录', '提示', {
                    confirmButtonText: '确定',
                    confirmButtonClass: 'aloneConfirmButton'
                });
                this.$router.push('/')
            }
            axios({
                method: 'get',
                url: '/project/info?project_id='+this.$route.query.project_id,
                headers:{
                    'Content-type': 'application/x-www-form-urlencoded'
                }
            }).then((response)=> {
                this.form.name = response.data.data.name
                this.form.director = response.data.data.director
                this.form.project_id = this.$route.query.project_id
                this.type = response.data.data.type_name
                if(response.data.data.production_manager){
                    this.form.production_manager = response.data.data.production_manager
                }
                if(response.data.data.producer){
                    this.form.producer = response.data.data.producer
                }
                if(response.data.data.coordinator){
                    this.form.coordinator = response.data.data.coordinator
                }
                if(response.data.data.poster_path){
                    this.poster = response.data.data.poster_path
                }
                if(response.data.data.marketing_producer){
                    this.form.marketing_producer = response.data.data.marketing_producer
                }
            }).then(()=>{
                if(this.form.production_manager=='null'){
                    this.form.production_manager = ''
                }
                if(this.form.coordinator=='null'){
                    this.form.coordinator = ''
                }
                if(this.form.producer=='null'){
                    this.form.producer = ''
                }
            })

        }
    }
</script>
<style src="../../css/el-message-box.css"></style>

<style scoped>
    #bianjijiekou{
        float:left;
        margin-left: 60px;
        margin-top: 30px;
        width: 1400px;
    }
    .edit_choseIMG{
        width: 83px;height: 30px;background: #ED9515;cursor: pointer;display: inline-block;vertical-align: bottom;font-size: 16px;font-family: Microsoft Yahei, 微软雅黑;color: #fff;line-height: 30px;text-align: center;margin-left: 10px;border-radius: 5px;
    }
    .edit_choseIMG:hover{
        background: #2cd2b8;
    }
    .avatar-uploader{
        display: inline-block;
    }
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        display: inline-block;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
    .type_radio{
        display: flex;
        align-items: center;
        font-size: 18px;
        color: #999;
        font-family: Microsoft Yahei, 微软雅黑;
        margin-right: 50px;
    }
    .type_radio .cir{
        width: 16px;
        height: 16px;
        background: #eee;
        border-radius: 50%;
        margin-right: 19px;
        position: static;
        top: 0;
        left: 0;
        box-shadow: none;
    }
    .type_radio .cir.active{
        border: 4px solid #eee;
        background: #999;
    }
    #baocun,#delete_project{
        width: 160px;height: 50px;border:none;background-color: #ED9515;border-radius: 25px;display: inline-block;
        font-size: 18px;font-family: Microsoft Yahei, 微软雅黑;color: #fff;
        font-weight: normal;
        text-align: center;
    }
    #baocun:hover{
        background: #ED9515;
    }
    #delete_project{
        font-size: 20px;
        background: #f9f9f9;
        border: 1px solid #ED9515;
        box-sizing: border-box;
        color: #999;
    }
    @media screen and (max-width: 1500px){
        #bianjijiekou{
            width: 1100px;

        }
    }
    @media screen and (max-width: 1300px){
        #bianjijiekou{
            width: 1000px;
            margin-left: 15px;
        }

    }
</style>
