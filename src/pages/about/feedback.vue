<template>
    <div>
        <div class="feedbackTitle">用户反馈</div>
        <div class="feedbackMain">
            <p style="margin-bottom: 20px;font-size: 18px;font-family: Microsoft Yahei, 微软雅黑;color:#666;">请填写您对我们产品的建议，我们将尽快和您联系</p>
            <div class="em" style="width: 100%;height: 1px;background: #ddd;margin-bottom: 40px"></div>
            <p style="font-family: 新宋体;font-size: 16px;color: #fd4444;margin-bottom: 20px;">您的信息对我们非常重要，我们郑重承诺，绝不会将您的信息泄露给第三方。</p>
            <div class="email" style="display: flex;margin-bottom: 40px;align-items: center">
                <span style="font-family: 新宋体;font-size: 18px;color: #666;margin-right: 28px">邮件地址</span>
                <input type="text" v-model="email" placeholder="请留下真实的联系方式，方便我们为您解答疑惑！" @blur="sendEmail">
            </div>
            <textarea cols="30" rows="10" v-model="info" placeholder="请您填写具体内容帮助我们了解您的意见和建议。"></textarea>
            <div class="imgBox" style="display: flex;position: relative;align-items: center;">
                <div class="upload_warp_img" style="display: flex;align-items: center">
                    <div class="upload_warp_img_div" v-show="imgList.length!=0"  v-for="(item,index) of imgList">
                        <img :src="item.file.src">
                        <div class="upload_warp_img_div_del" @click="fileDel(index)" >
                            <img src="../../assets/feedDEL.png" >
                        </div>

                    </div>
                    <div class="upload_warp_left" @click="fileClick" v-show="length<=4">
                        <img src="../../assets/add.png">
                    </div>
                </div>
                <input @change="fileChange($event)" type="file" id="upload_file" multiple style="display: none"/>

            </div>
            <p class="desc">最多可上传<span style="color: #fd4444;display: inline-block" class="desc">5</span>张图片，图片大小不能超过<span style="color: #fd4444;display: inline-block" class="desc">2M</span></p>
            <div class="btn" @click="submit">提交</div>
        </div>
    </div>
</template>

<script>
    import axios from "axios"
    export default {
        name: "feedback",
        data(){
            return{
                email:'',
                info:"",
                file:'',
                imgList: [],
                size: 0,
                length:0
            }
        },
        methods: {
            sendEmail(){
                var regEmail= /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
                if(this.email==''){
                    return
                }else if(!regEmail.test(this.email)){
                    this.$alert('邮箱格式不正确', '提示', {
                        confirmButtonText: '确定',
                        confirmButtonClass: 'aloneConfirmButton'
                    });
                }
            },
            fileClick() {
                document.getElementById('upload_file').click()
            },
            fileChange(el) {
                if (!el.target.files[0].size) return;
                this.fileList(el.target);
                el.target.value = ''
            },
            fileList(fileList) {
                let files = fileList.files;
                for (let i = 0; i < files.length; i++) {
                    //判断是否为文件夹
                    if (files[i].type != '') {
                        this.fileAdd(files[i]);
                        this.length++
                    } else {
                        //文件夹处理
                        this.folders(fileList.items[i]);
                    }
                }
                if(files.length >= 5){
                    this.$alert('已达上限', '提示', {
                        confirmButtonText: '确定',
                        confirmButtonClass: 'aloneConfirmButton'
                    });
                    vm.$off(this.fileClick())
                }
            },
            //文件夹处理
            folders(files) {
                let _this = this;
                //判断是否为原生file
                if (files.kind) {
                    files = files.webkitGetAsEntry();
                }
                files.createReader().readEntries(function (file) {
                    for (let i = 0; i < file.length; i++) {
                        if (file[i].isFile) {
                            _this.foldersAdd(file[i]);
                        } else {
                            _this.folders(file[i]);
                        }
                    }
                })
            },
            foldersAdd(entry) {
                let _this = this;
                entry.file(function (file) {
                    _this.fileAdd(file)
                })
            },
            fileAdd(file) {
                if (this.limit !== undefined) this.limit--;
                if (this.limit !== undefined && this.limit < 0) return;
                //总大小
                this.size = this.size + file.size;
                //判断是否为图片文件
                if (file.type.indexOf('image') == -1) {
                    file.src = 'wenjian.png';
                    this.imgList.push({
                        file
                    });
                } else {
                    let reader = new FileReader();
                    let image = new Image();
                    let _this=this;
                    reader.readAsDataURL(file);
                    reader.onload = function () {
                        file.src = this.result;
                        image.onload=function(){
                            let width = image.width;
                            let height = image.height;
                            file.width=width;
                            file.height=height;
                            _this.imgList.push({
                                file
                            });
                            // if( _this.imgList.length >= 5){
                            //     this.length = false
                            // };
                        };
                        image.src= file.src;
                    }
                }
            },
            fileDel(index) {
                this.size = this.size - this.imgList[index].file.size;//总大小
                this.imgList.splice(index, 1);
                if (this.limit !== undefined) this.limit = this.imgList.length;
                this.length--
            },
            getFile(e) {
                var length
                var files = e.target.files;                 // 得到files
                this.file = files
                var lengthN =parseInt(files.length);    // 保存当前上传的个数
                length += lengthN;                        // 图片个数
                if(length>=5){                           // 图片上传超过四个
                    this.$alert('最多上传5张', '提示', {
                        confirmButtonText: '确定',
                        confirmButtonClass: 'aloneConfirmButton'
                    });
                    return;                             // 终止程序
                }

                for(var i=0;i<lengthN;i++){             // 遍历当前的上传的个数，
                    // size= files[i].size;                // 得到单个图片的大小
                    // if(size>1024*1024){                 // 单个图片大于1M
                    //     // layer.msg(files[i].name+'这张图片大于1M',function(){      // 提示哪张图片的大小超出1M
                    //     //     fileUpload.value='';        // 清空当前的上传控件，
                    //     //     length=length-lengthN;      // 图片未添加，length回到原先的状态
                    //     // });
                    //     return;
                    // }else{
                        var html='';                            // 缩略图

                        var url = window.URL.createObjectURL(files[i]);
                        // 方法会根据传入的参数创建一个指向该参数对象的URL. 这个URL的生命仅存在于它被创建的这个文档里. 新的对象URL指向执行的File对象或者是Blob对象.
                        // html+='<div class="atlas-content">';
                        // html+='<i class="js-del-img fm-icon ion-close-circled"></i>';
                        // html+='<div class="img-container" data-name="'+files[i].name+'">';
                         html='<img src='+url+'>';
                        // html+='</div>';
                        // html+='</div>';
                        // document.getElementById('img').src=url;
                         $('.atlas-container').append(html);                     // 将缩略图片写入
                    // }
                }

                if(length>=5){
                    $('#input').hide();          // 图片上传控件隐藏
                }
            },
            submit(){
                if(this.info != ''){
                    axios({
                            url:'/feedback/commit',
                            method: 'post',
                            headers:{
                                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                                'Accept':'*/*'
                            },
                            data:{
                                'contact':this.email,
                                'content': this.info,
                                'files': this.file
                            },
                            transformRequest: [function (data) {
                                let ret = ''
                                for (let it in data) {
                                    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                                }
                                return ret
                            }]
                        }
                    ).then((response) => {
                        if(response.data.msg == 'ok'){
                            this.$alert('感谢您的建议，我们将尽快和您联系', '提示', {
                                confirmButtonText: '确定',
                                confirmButtonClass: 'aloneConfirmButton'
                            });
                        }
                    })
                }else{
                    this.$alert('请填写您的建议', '提示', {
                        confirmButtonText: '确定',
                        confirmButtonClass: 'aloneConfirmButton'
                    });
                }

            }
        },
    }
</script>
<style src="../../css/el-message-box.css"></style>

<style scoped>
    .feedbackTitle{
        height: 70px;
        line-height: 70px;
        border-bottom: 1px solid #ddd;
        font-size: 20px;
        color: #333;
        padding-left: 45px;
        margin-bottom: 30px;
    }
    .feedbackMain{
        padding: 0 35px 0 45px;
    }
    .upload_warp_img_div .upload_warp_img_div_del{
        width: 26px;
        height: 26px;
        background: #fd4444;
        border-radius: 50%;
        position: absolute;
        top: 3%;
        left: 87%;
        cursor: pointer;
        display: none;
    }
    .upload_warp_img_div .upload_warp_img_div_del img{
        width: 16px;
        height: 16px;
        margin-left: 5px;
        margin-top: 3px;
    }
    .upload_warp_img_div:hover .upload_warp_img_div_del{
        display: block;
    }
    input:focus::-webkit-input-placeholder,textarea:focus::-webkit-input-placeholder {
        color: transparent;
        /* transparent是全透明黑色(black)的速记法，即一个类似rgba(0,0,0,0)这样的值 */
    }


    /* Mozilla Firefox 4 to 18 */

    input:focus:-moz-placeholder, textarea:focus:-moz-placeholder{
        color: transparent;
    }


    /* Mozilla Firefox 19+ */

    input:focus::-moz-placeholder ,textarea:focus::-moz-placeholder{
        color: transparent;
    }

    /* Internet Explorer 10+ */

    input:focus:-ms-input-placeholder, textarea:focus:-ms-input-placeholder {
        color: transparent;
    }
    .upload_warp_left{
        margin-bottom: 20px;
        cursor: pointer;
        border: 2px dashed #f6ae45;
        width: 95px;
        height: 95px;
        padding: 12px;
        border-radius: 5px;
    }

    .upload_warp_img{
        display: flex;
        flex-wrap: wrap;
    }
    .upload_warp_img_div{
        margin-right: 30px;
        margin-bottom: 20px;
        position: relative;
    }
    .upload_warp_img_div:nth-child(3n){
        margin-right: 0;
    }
    .upload_warp_img_div img{
        height: 200px;
        width: 280px;
    }
    *{
        box-sizing: border-box;
    }
    .desc{
        font-family: Microsoft Yahei, 微软雅黑;font-size: 16px;color: #999;
        margin-left: 0;
    }

    .email input,textarea{
        width: 800px;
        height: 40px;
        border: 1px solid #ddd;
        padding-left: 20px;
        font-family: 新宋体;
        color: #999;
        font-size: 14px;
        box-sizing: border-box;
        border-radius: 5px;
        background: #f9f9f9;
    }
    textarea{
        resize: none;
        width: 100%;
        height: 155px;
        padding: 20px;
        font-size: 14px;
        color: #666;
        box-shadow: 0px 2px 5px 1px rgba(0,0,0,.06);
        margin-bottom: 40px;
    }
    input:focus,textarea:focus{
        outline:none;
        background: #fff;
    }
    .imgBox input{
        width: 113px;
        height: 113px;
        opacity: 0;
        -ms-filter: 'alpha(opacity=0)';
        position: absolute;
        top: 0;
        left: 0;
        cursor: pointer;
    }
    .btn{
        background: #ED9515;
        border-radius: 5px;
        width: 120px;
        height: 40px;
        margin-left: 400px;
        margin-bottom: 60px;
        font-family: Microsoft Yahei, 微软雅黑;
        font-size: 18px;
        color: #fff;
        text-align: center;
        line-height: 40px;
        margin-top: 50px;
    }
    .btn:hover{
        background: #ED9515;
    }
</style>
