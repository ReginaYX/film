<template>
    <div>
        <div class="width">
            <div class="top">
                <span>消息中心</span>
            </div>
            <div class="contain">
                <div class="con_top">
                    <ul class="top_left">
                        <li :class="showAll?'active':''" @click="showUn=false,showAll=true">全部消息</li>
                        <li :class="showUn?'active':''" @click="showUn=true,showAll=false">
                            未读消息
                            <span style="color:#459df5;font-size: 16px">({{count}})</span>
                        </li>
                    </ul>
                    <ul class="top_right">
                        <li style="margin-left: 100px;cursor: pointer" @click="del">
                            清空所有消息
                        </li>
                    </ul>
                </div>

                <div class="news" v-if="news_info">
                    <li v-if="showAll" v-for="item in news_info" @click="read(item.message_id)">
                            <p>{{item.content}}</p>
                            <span>{{item.created_at | changeTime}}</span>
                    </li>
                    <li v-show="showUn" v-for="item in news_info" v-if="item.status=='1'" @click="read(item.message_id)">
                            <p>{{item.content}}</p>
                            <span>{{item.created_at | changeTime}}</span>
                    </li>
                    <div class="page">
                        <span>页数: {{page}}/1</span>
                        <div :class="['p_btn',activeFirst?'active':'']" @click="change">首页</div>
                        <div class="p_btn" @click="prev">上一页</div>
                        <div class="p_btn" @click="add">下一页</div>
                        <div class="p_btn">末页</div>
                    </div>
                </div>
                <div class="news" v-else style="line-height: 344px;font-size: 24px;text-align: center;font-family: 新宋体;color: rgb(153, 153, 153);">
                    暂无消息
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import fmFooter from "../../common/fmFooter";
    import topMine from "../../common/top_mine";
    import axios from "axios"
    export default {
        name: "news",
        data () {
            return {
                news_info:'',
                unnews:'',
                user_id :'',
                dialog : {
                    show:true,
                    type:'confirm',
                    text:'确认删除所有消息吗？',
                    isConfirm:true,
                    confirmText:'确认'
                },
                showAll:true,
                showUn:false,
                page:1,
                activeFirst:true
            }
        },
        methods :{
            returngo(){
                this.$router.go(-1)
            },
            change(){
                this.fetchData()
                this.activeFirst = true
            },
            prev(n){
                n=this.page
                n--
                if(n<=1){
                    n=1
                }
                if(n == 1){
                    this.activeFirst = true
                }else{
                    this.activeFirst = false
                }
                this.fetchData(n)
                this.page=n
            },
            add(n){
                n=this.page
                n++
                if(n<=1){
                    n=1
                }
                this.fetchData(n)
            },
            read (id) {
                if(id==0){
                    axios({
                        method: 'post',
                        url: '/message/update_status_all',
                        data:{
                            user_id:this.user_id,
                            status:2
                        },
                        headers:{
                            'Content-type': 'application/x-www-form-urlencoded'
                        },
                        transformRequest: [function (data) {
                            let ret = ''
                            for (let it in data) {
                                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                            }
                            return ret
                        }]
                    }).then((response)=> {
                        this.fetchData()
                    })
                }else{
                    axios({
                        method: 'post',
                        url: '/message/update_status_single',
                        data:{
                            message_id:id,
                            status:2,

                        },
                        headers:{
                            'Content-type': 'application/x-www-form-urlencoded'
                        },
                        transformRequest: [function (data) {
                            let ret = ''
                            for (let it in data) {
                                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                            }
                            return ret
                        }]
                    }).then((response)=> {
                        this.fetchData()
                        this.$router.push('/control/list?user_id='+this.user_id)
                    })
                }

            },
            del (){
              this.$confirm('确认删除后消息将不可恢复，是否继续您的操作?', '温馨提示', {
                  confirmButtonText: '确认删除',
                  cancelButtonText: '我不删了'
              }).then(() => {
                  axios({
                      method: 'post',
                      url: '/message/delete_all',
                      data:{
                          user_id:this.user_id
                      },
                      headers:{
                          'Content-type': 'application/x-www-form-urlencoded'
                      },
                      transformRequest: [function (data) {
                          let ret = ''
                          for (let it in data) {
                              ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                          }
                          return ret
                      }]
                  }).then((response)=> {
                      if(response.data.ret == 0){
                          this.$router.go(0)
                      }

                  })
              }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
              });
            });

          },
          fetchData(n=1){
              axios.get('/message/list', {
                  params: {
                      user_id: this.user_id,
                      page_num: n,
                      page_size: 7
                  }
              }).then((response)=> {
                  if(response.data.data){
                      this.news_info =response.data.data
                  }
              })
          }
        },
        mounted () {
            if(localStorage.user_id){
                this.user_id = localStorage.getItem("user_id").replace("\"","").replace("\"","")
                this.fetchData()
            }else {
                this.$alert('登录已超时，请重新登录', '提示', {
                    confirmButtonText: '确定',
                    confirmButtonClass: 'aloneConfirmButton'
                });
                this.$router.push('/')
            }
            if(this.page == 1){
                this.activeFirst = true
            }else{
                this.activeFirst = false
            }

          // 页面跳转tabs修复
          if (this.$route.path == '/news') {

            var tradingCenter = document.getElementsByClassName('tradingCenter');

            tradingCenter[0].style = '';
          }
        },
        filters: {
            changeTime: function (value) {
                var date = new Date();
                date.setTime(value * 1000);
                var y = date.getFullYear();
                var m = date.getMonth() + 1;
                m = m < 10 ? ('0' + m) : m;
                var d = date.getDate();
                d = d < 10 ? ('0' + d) : d;
                return y + '-' + m + '-' + d;
            }
        },
        computed: {
            count: function () {
                let num = 0
                for (let it in this.news_info) {
                    if(this.news_info[it].status == '1' ){
                        num ++
                    }
                }
                this.news_num = num
                return this.news_num
            }
        }
    }
</script>
<style src="../../css/el-message-box.css"></style>

<style scoped>
    .nav .nav-bar .nav-right{
        vertical-align: middle;
        height: 60px;
        float: left;
        line-height: 60px;
        width: calc(100% - 285px);
    }
    .nav-right .portrait {
        float: right;
        vertical-align: middle;
        cursor: pointer;
        position: relative;
        width: 52px;
        height: 150%;
        margin-top: 3px;
        border-radius: 26px;
    }
    .nav-right .portrait .profile img{
        border-radius: 50%;
        margin: 0;
        width: 100%;
        height: 100%;
        position: absolute;
        right: 0;
        top: 25%;
    }
    .portrait .head-menu{
        height: 309px;
        top: 10%;
        z-index: 10;
        box-shadow: 0 2px 3px 2px rgba(0,0,0,0.08);
        -moz-box-shadow: 0 2px 3px 2px rgba(0,0,0,0.08);
        -webkit-box-shadow: 0 2px 3px 2px rgba(0,0,0,0.08);
    }
    .portrait .head-menu li img{
        margin: 0;
        margin-left: 24px;
    }
    .head-menu li a img{
        margin: 0;
    }
    .head-menu li a{
        width: 200px;
        height: 53px;
        display: block;
        text-decoration: none;
    }
    #head_right ul li ul li a:hover {
        background-color: #f9f9f9;
    }
    .top .el-icon-arrow-left{
        width: 24px;
        height: 24px;
        margin-top: 4px;
        margin-right: 5px;
        padding-top: 2.45px;
        padding-left: 2.7px;
        box-sizing: border-box;
        cursor: pointer;
    }
    .top .el-icon-arrow-left:hover{
        background: #999;
        border-radius: 50%;
    }
    .top .el-icon-arrow-left:hover:before{
        margin-top: 0;
        color: #fff;
        font-size: 18px;
    }
    .el-icon-arrow-left:before{
        color: #333;
        font-size: 20px;
        display: block;
    }
    .width{
        width: 910px;
        background: #fff;
        padding:20px 0 0;
    }
    .top{
        font-family: 'Microsoft Yahei, 微软雅黑';
        font-size: 18px;
        color: #999;
        height: 50px;
        margin-bottom: 12px;
        display: flex;
        padding: 0 35px;
    }

    .top span{
        display: inline-block;
        font-family: 'Microsoft Yahei, 微软雅黑';
        font-size: 20px;
        color: #333;
        margin-left: 5px;
    }
    .top .em{
        margin-top: 20px;
        width: 1200px;
        height: 30px;
        border-top: 1px solid #ddd;
        box-sizing: border-box;
    }
    .con_top{
        display: flex;
        justify-content: space-between;
        padding: 0 35px;
        background: #f9f9f9;
        height: 60px;
        align-items: center;
    }
    .con_top .top_left,.con_top .top_right{
        display: flex;
        height: 34px;
        align-items: center;
        margin-bottom: 0;
    }

    .con_top .top_right img{
        margin-right: 20px;
    }

    .con_top .top_left li.active a span{
        color: #fff;
    }
    .con_top .top_left li,.con_top .top_right li,.con_top .top_left li a span{
        font-family: 'Microsoft Yahei, 微软雅黑';
        font-size: 16px;
        color: #666;
        text-align: center;
        line-height: 40px;
    }
    .con_top .top_left li{
        width: 100px;
        height: 34px;
        cursor: pointer;
        border: 1px solid #ED9515;
        margin-right: 20px;
        border-radius: 17px;
        line-height: 32px;
    }
    .con_top .top_left li.active{
        background: #ED9515;
        color: #fff;
    }
    .con_top .top_right li{
        width: 110px;
        height: 30px;
        line-height: 30px;
        border-radius: 5px;
        border: 1px solid #ddd;
        background: #fff;
        font-size: 14px;
        color: #999;
    }
    .news{
        padding: 30px 35px 0;
        width: 100%;
        height: 600px;
        background: #fff;
        box-sizing: border-box;
        position: relative;
    }
    .news li{
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 55px;
        margin: 0 auto;
        border-bottom: 1px solid #ddd;
        cursor: pointer;
    }
    .news li p,.news li span{
        font-family: 新宋体;
        font-size: 16px;
        color: #999;
    }
    .news li span{
        color: #999;
    }
    .page{
        display: flex;
        width: 100%;
        justify-content: flex-end;
        position: absolute;
        bottom: 32px;
        right: 35px;
    }

    .page span,.page .p_btn{
        font-family: 新宋体;
        font-size: 14px;
        color: #666;
        line-height: 25px;
        margin-right: 12px;
    }
    .page span{
        font-size: 16px;
    }
    .page .p_btn{
        color: #999;
        border: 1px solid #ddd;
        box-sizing: border-box;
        border-radius: 5px;
        height: 25px;
        width: auto;
        padding: 0 8px;
        margin-right: 6px;
        cursor: pointer;
    }
    .page .p_btn:hover,.page .p_btn.active{
        border-color: #ED9515;
    }
    .page .p_btn:last-child{
        margin-right: 0px;
    }
</style>
