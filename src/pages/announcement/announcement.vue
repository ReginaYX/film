<template>
  <div id="announcement">
    <transition name="el-zoom-in-center">
      <div class="setBox" v-if="dateSetting">
        <div class="setTitle">总拍摄周期</div>
        <el-form :model="noticeForm" ref="timeForm" class="addFormBox form">
          <el-form-item
            label="开始日期" prop="start_date" :rules="[{ required: true, message: '开始日期不能为空',trigger:'change'}]">
            <el-date-picker
              v-model="noticeForm.start_date" @change="changeEnd" :picker-options="pickerOptionsStart"
              type="date" value-format="timestamp" :disabled="authId!=1"
              prefix-icon="iconfont iconriqi1" :class="[noticeForm.start_date?'active':'']"
              placeholder="请选择开始日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item
            label="结束日期" prop="end_date" :rules="[{ required: true, message: '结束日期不能为空',trigger:'change'}]">
            <el-date-picker
              v-model="noticeForm.end_date" :picker-options="pickerOptionsEnd"
              type="date" value-format="timestamp" :disabled="authId!=1" @change="changeStart"
              prefix-icon="iconfont iconriqi1" :class="[noticeForm.end_date?'active':'']"
              placeholder="请选择结束日期">
            </el-date-picker>
          </el-form-item>
        </el-form>
        <div :class="['setDateBtn',noticeForm.end_date!=''&&noticeForm.start_date!=''?'active':'']" @click="setTime">创建项目</div>
      </div>
    </transition>
    <transition name="el-zoom-in-center">
      <div class="listPage" v-if="dateSetting == false">
        <div class="listTop">
          <div class="listTopTitle">
            <div class="listTitleHr"></div>
              <popover msg="通告单" :title="notice_name+'  ∨'" icon="iconpencil" first="重命名" :authId="authId"
                       placement='bottom' @rename="noticeRename = true" @dele="deleNotice" v-if="noticeRename == false"></popover>
              <el-input
                placeholder="请输入通告单名称" v-if="noticeRename"
                v-model="notice_name" clearable @blur="rename"></el-input>
          </div>
          <div class="listStateBox">
            <div class="listState">
              <div class="listStateColor"></div>已发布
            </div>
            <div class="listState">
              <div class="listStateColor"></div>待发布
            </div>
            <div class="listState">
              <div class="listStateColor"></div>未编辑
            </div>
          </div>
          <div class="listBtnBox">
            <div class="listBtn" @click="()=>{if(authId==1){addDialog=true}else{noAccess = true}}">周期调整</div>
            <div class="listBtn deleCheck" v-if="checked" @click="deleMore">确认删除</div>
            <div class="listBtn deleCancel" v-if="checked" @click="checked = !checked">取消</div>
            <div class="listBtn" v-else @click="()=>{if(authId==1){checked = !checked}else{noAccess = true}}">批量删除</div>
            <div class="listBtn" @click="getNoticeList('0')">查看更早</div>
          </div>
        </div>
        <div class="listBox">
          <div class="trBox thead">
            <el-checkbox v-if="checked" class="tdCheck theadCheck"></el-checkbox>
            <i class="iconfont iconxinzengbaobiaodierbu"></i>
            <div class="td">拍摄天数</div>
            <div class="td">拍摄日期</div>
            <div class="td">拍摄地</div>
            <div class="td">开始时间</div>
            <div class="td">结束时间</div>
            <i class="iconfont icongengduo5"></i>
          </div>
          <el-tree draggable
            :data="tableData" id="noticeTree"
            node-key="detail_id" :allow-drop="allowDrop"
            default-expand-all :indent='0' @node-drop="dropEnter"
            :expand-on-click-node="false" :allow-drag="allowDrag">
            <span class="custom-tree-node" slot-scope="{ node, data }">
               <div v-if="data.status=='3'" class="changeBox">
                  <div class="changeBtn" @click="addDay(data,node)">+</div>
                  <div class="changeDay">转场 <span>{{data.num}}</span> 天</div>
                  <div class="changeDate">{{data.shoot_date | dateChange}} — {{data.end_date | dateChange}}</div>
                  <div class="changeBtn" @click="reduceDay(data,node)">-</div>
                </div>
                <div v-else :class="['trBox',{'already ':data.status=='2'},{'wait ':data.status=='1'},{'null ':data.status=='0'}]" @click.self="enter(data.detail_id)">
                  <el-checkbox v-model="data.checked" :class="['tdCheck',checked?'active':'']" @change="changeCheck($event,data)" v-if="data.status!='2'"></el-checkbox>
                  <i class="iconfont iconxinzengbaobiaodierbu"></i>
                  <el-tooltip class="item" effect="dark" content="添加转场" placement="right">
                    <i :class="['iconfont','iconfeiji','addCut',data.is_rest == 0?'null':'active']" @click.stop="addCut(node)"></i>
                  </el-tooltip>
                  <div class="td" @click.self="enter(data.detail_id)">{{data.dayNum}}</div>
                  <div class="td" @click.self="enter(data.detail_id)">{{data.shoot_date | dateChange}}</div>
                  <div class="td" v-if="data.shoot_location" @click.self="enter(data.detail_id)">{{data.shoot_location}}</div>
                  <div class="td" v-else @click.self="enter(data.detail_id)">暂无</div>
                  <div class="td" v-if="data.start_time" @click.self="enter(data.detail_id)">{{data.start_time}}</div>
                  <div class="td" v-else @click.self="enter(data.detail_id)">暂无</div>
                  <div class="td" v-if="data.end_time" @click.self="enter(data.detail_id)">{{data.end_time}}</div>
                  <div class="td" v-else @click.self="enter(data.detail_id)">暂无</div>
                   <popover msg="通告单"  :editBtn=false placement='bottom' title='<i class="el-icon-more"></i>'
                            @dele="deleDay(node,data)" v-if="data.status=='0'" :authId="authId" trigger="hover"></popover>
                  <popover msg="通告单" title='<i class="el-icon-more"></i>' icon="iconfabu" first="发布" :authId="authId"
                           placement='bottom' @rename="publish(data)" @dele="deleDay(node,data)" v-else trigger="hover"></popover>
                </div>
            </span>
          </el-tree>
        </div>
      </div>
    </transition>
    <el-dialog
      title="周期调整"
      :visible.sync="addDialog"
      width="480px" center class="addDialog">
      <div class="updateTip">
        <i class="iconfont icontips-copy"></i>
        未在创建周期内的任务将进行删除
      </div>
      <el-form :model="noticeForm" ref="timeForm" class="addFormBox noticeDateFormBox">
        <el-form-item
          label="开始日期" prop="start_date" :rules="[{ required: true, message: '开始日期不能为空',trigger:'change'}]">
          <el-date-picker
            v-model="noticeForm.start_date" :clearable="false"
            type="date" value-format="timestamp" @change="changeEnd" :picker-options="pickerOptionsStart"
            prefix-icon="iconfont iconriqi1" :class="[noticeForm.start_date?'active':'']"
            placeholder="请选择开始日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item
          label="结束日期" prop="end_date" :rules="[{ required: true, message: '结束日期不能为空',trigger:'change'}]">
          <el-date-picker
            v-model="noticeForm.end_date" @change="changeStart" :picker-options="pickerOptionsEnd"
            type="date" value-format="timestamp" :clearable="false"
            prefix-icon="iconfont iconriqi1" :class="[noticeForm.end_date?'active':'']"
            placeholder="请选择结束日期">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div class="noticeDateBtn" @click="updateDay">确认调整</div>
    </el-dialog>
    <!--无权限弹框-->
    <no-access :noAccessVisible="noAccess" @close="(v)=>{noAccess = v}"></no-access>
  </div>
</template>

<script>
    import { pca, pcaa } from "area-data";
    import 'vue-area-linkage/dist/index.css'; // v2 or higher
    import Calendar from 'mpvue-calendar'
    import popover from '../../common/popoverFunction'
    import 'mpvue-calendar/src/style.css'
    export default {
        name: "announcement",
        data(){
            return{
              pickerOptionsStart: {},
              pickerOptionsEnd:{},
              addDialog:false,//周期调整弹框
              notice_id:'',//通告单id
              noticeForm:{
                start_date:'',
                end_date:''
              },//设置周期
              notice_name:'',//通告单名称
              noticeRename:false,//通告单名称修改
              checkList:[],
              checked:false,
              value1:'',
              dateSetting:false,
              tableData: [],
              authId:0,//权限信息
              noAccess:false,//无权限弹框
            }
        },
        components: {Calendar,popover},
        methods:{
          //周期选择校验
          changeStart (){
            this.pickerOptionsStart = Object.assign({},this.pickerOptionsStart,{
              disabledDate: (time) => {
                return time.getTime() > this.noticeForm.end_date - 86400
              }
            })
          },
          changeEnd (){
            this.pickerOptionsEnd = Object.assign({},this.pickerOptionsEnd,{
              disabledDate: (time) => {
                return time.getTime() < this.noticeForm.start_date + 86400
              }
            })
          },
          //设置周期
          setTime(){
            if(this.authId==1){
              this.$refs['timeForm'].validate((valid) => {
                if (valid) {
                  let form = new FormData;
                  form.append('start_date',this.noticeForm.start_date/1000);
                  form.append('end_date',this.noticeForm.end_date/1000);
                  form.append('notice_id',this.notice_id);
                  this.$axios({
                    method: 'post',
                    url: '/notice/add_notice',
                    data: form,
                    headers:{
                      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                      'Accept':'*/*'
                    }
                  }).then((response)=> {
                    if(response.data.ret == 0){
                      this.dateSetting = false;
                      this.getNoticeInfo();
                    }else{
                      this.$message.error(response.data.msg);
                    }
                  })
                }
              });
            }else{
              this.noAccess = true
            }

          },
          //获取通告单信息
          getNoticeInfo(){
            this.$axios.get('/notice/get_notice_by_notice_id',{
              params:{
                notice_id : this.notice_id
              }
            }).then((res)=> {
              if(res.data.ret == '0'){
                if(res.data.data!=null&&res.data.data.start_date){
                  this.noticeForm.start_date = res.data.data.start_date*1000;
                  this.noticeForm.end_date = res.data.data.end_date*1000;
                  this.notice_name = res.data.data.notice_name;
                  this.getNoticeList();
                  document.getElementById('noticeTree').addEventListener('scroll', this.scroll);
                }else{
                  this.dateSetting = true
                }
              }
            })
          },
          //获取初始15天通告单
          getNoticeList(status){
            let ceiling = '';
            let floor = '';
            if(status == '0'){//向上获取
              ceiling = this.tableData[0].shoot_date - 86400*8;
              floor = this.tableData[this.tableData.length-1].shoot_date;
            }else if(status == '1'){//向下获取
              ceiling = this.tableData[0].shoot_date;
              floor = this.tableData[this.tableData.length-1].shoot_date + 86400*8
            }else if(status == '2'){//刷新数据
              ceiling = this.tableData[0].shoot_date;
              floor = this.tableData[this.tableData.length-1].shoot_date
            }
            this.$axios.get('/notice/get_notice_detail',{
              params:{
                notice_id: this.notice_id,
                ceiling_time_stamp: ceiling,
                floor_time_stamp: floor
              }
            }).then((res)=> {
              if(res.data.ret == '0'){
                let days = res.data.data.notice_list[0].shoot_date - this.noticeForm.start_date/1000;
                let firstDay;
                if(days <= 0){
                  firstDay = 1
                }else{
                  firstDay = parseInt(days/86400);
                }
                let arr = [];
                for(let i=0;i<res.data.data.notice_list.length;i++){
                  if(res.data.data.notice_list[i].status != '3'){
                    if(status == '0'){
                      if(days!=0){
                        res.data.data.notice_list[i].dayNum = firstDay--;

                      }else{
                        res.data.data.notice_list[i].dayNum = firstDay++;

                      }
                    }else{
                      res.data.data.notice_list[i].dayNum = firstDay++;

                    }
                  }
                  arr.push(res.data.data.notice_list[i]);
                }
                this.tableData = arr
              }
            })
          },
          //修改通告单周期
          updateDay(){
            if(this.authId==1){
              this.$axios({
                method: 'post',
                url: '/notice/modify_notice_name',
                data: {
                  notice_id: this.notice_id,
                  start_date: this.noticeForm.start_date/1000,
                  end_date: this.noticeForm.end_date/1000
                },
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
                if(response.data.ret == 0){
                  // this.getNoticeList('2');
                  // this.addDialog = false;
                    this.$router.go(0)
                }else{
                  this.$message.error(response.data.msg);
                }
              })
            }else{
              this.noAccess = true
            }

          },
          //修改通告单名称
          rename(){
            if(this.authId==1){
              this.$axios({
                method: 'post',
                url: '/notice/modify_notice_name',
                data: {
                  notice_id: this.notice_id,
                  notice_name: this.notice_name
                },
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
                if(response.data.ret == 0){
                  this.noticeRename = false
                }else{
                  this.$message.error(response.data.msg);
                }
              })
            }else{
              this.noAccess = true
            }

          },
          //删除整个通告单
          deleNotice(){
            if(this.authId==1){
              this.$axios.get('/notice/delete_notice_by_notice_id',{
                params:{
                  notice_id : this.notice_id
                }
              }).then((res)=> {
                if(res.data.ret == 0){
                  this.noticeForm.start_date = '';
                  this.dateSetting = true
                }else{
                  this.$message.error(res.data.msg);
                }
              })
            }else{
              this.noAccess = true
            }

          },
          //删除单个通告日
          deleDay(node, data){
            if(this.authId==1){
              this.$axios.get('/notice/delete_notice_details',{
                params:{
                  detail_id : data.detail_id
                }
              }).then((res)=> {
                if(res.data.ret == 0){
                  this.getNoticeList('2')
                }else{
                  this.$message.error(res.data.msg);
                }
              })
            }else{
              this.noAccess = true
            }

          },
          //删除多个通告单日
          deleMore(){
            for(let i=0;i<this.checkList.length;i++){
              this.deleDay('0',this.checkList[i])
            }
          },
          //跳转通告单表单
          enter(v){
            this.$router.push('/details/noticeForm?play_id='+this.$route.query.play_id+'&project_id='+this.$route.query.project_id+'&id='+v)
          },
          //批量选择
          changeCheck(s,v){
            if(s == true){
              this.checkList.push(v)
            }else{
              const index = this.checkList.findIndex(d => d.id == v.id);
              this.checkList.splice(index,1)
            }
          },
          //增加转场天
          addDay(v,node){
            if(this.authId==1){
              this.$axios({
                method: 'post',
                url: '/notice/add_rest_date',
                data: {
                  notice_id: v.notice_id,
                  shoot_date: v.shoot_date,
                  end_date: v.end_date+86400
                },
                transformRequest: [function (data) {
                  let ret = '';
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
                if(response.data.ret == 0){
                  // v.num = v.num * 1 + 1;
                  this.getNoticeList('2')
                }else{
                  this.$message.error(response.data.msg);
                }
              })
            }else{
              this.noAccess = true
            }

          },
          //减少转场天
          reduceDay(v,node){
            if(this.authId==1){
              this.$axios({
                method: 'post',
                url: '/notice/minus_rest_date',
                data: {
                  notice_id: node.data.notice_id,
                  shoot_date: node.data.shoot_date,
                  end_date: node.data.end_date-86400,
                  detail_id: node.data.detail_id
                },
                transformRequest: [function (data) {
                  let ret = '';
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
                if(response.data.ret == 0){
                  this.getNoticeList('2')
                  // if(v.num > 1){
                  //   v.num = v.num - 1;
                  //   v.end_date = v.end_date - 86400
                  // }else{
                  //   const parent = node.parent;
                  //   const children = parent.data.children || parent.data;
                  //   const index = children.findIndex(d => d.id === v.id);
                  //   children.splice(0, 1);
                  // }
                }else{
                  this.$message.error(response.data.msg);
                }
              })
            }else{
              this.noAccess = true
            }

          },
          //拖拽位置
          allowDrop(draggingNode, dropNode, type) {
            if(this.authId==1){
              if(dropNode.data.num){
                return false
              }else{
                return type != 'inner';
              }
            }else{
              this.noAccess = true
            }

          },
          dropEnter(draggingNode, dropNode, type,event){
            if(this.authId==1){
              let target_date = '';
              if(type == 'before'){
                target_date = dropNode.data.shoot_date-86400
              }
              if(type == 'after'){
                target_date = dropNode.data.shoot_date+86400
              }
              this.$axios.get('/notice/modify_shoot_date',{
                params:{
                  notice_id : this.notice_id,
                  detail_id : draggingNode.data.detail_id,
                  target_date : target_date
                }
              }).then((res)=> {
                if(res.data.ret == '0'){
                  this.getNoticeList('2')
                }else{
                  this.$message.error(res.data.msg);
                }
              })
            }else{
              this.noAccess = true
            }

          },
          //是否可拖拽
          allowDrag(node){
            if(node.data.num){
              return false
            }else{
              return true
            }

          },
          //添加转场
          addCut(node){
            if(this.authId==1){
              this.$axios({
                method: 'post',
                url: '/notice/add_rest_date',
                data: {
                  notice_id: node.data.notice_id,
                  shoot_date: node.data.shoot_date+86400,
                  end_date: node.data.shoot_date+86400
                },
                transformRequest: [function (data) {
                  let ret = '';
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
                if(response.data.ret == 0){
                  this.getNoticeList('2')
                  // this.tableData.splice(node.id-1, 0,{num:'2',status:'3',shoot_date:node.data.shoot_date,end_date:node.data.shoot_date+86400});
                }else{
                  this.$message.error(response.data.msg);
                }
              })
            }else{
              this.noAccess = true
            }

          },
          //懒加载滚动条
          scroll(){
            // 滚动条距离顶部高度
            let scrollTop = document.getElementById('noticeTree').scrollTop;

            // 可见区域高度
            let clientHeight = document.getElementById('noticeTree').clientHeight;

            let scrollHeight = document.getElementById('noticeTree').scrollHeight;

            if(scrollHeight <= clientHeight + scrollTop + 120 ) {
              this.getNoticeList('1')
            }

          },
          //发布通告单
          publish(data){
            if(this.authId==1){
              this.$axios.get('/notice/release_notice',{
                params:{
                  detail_id : data.detail_id
                }
              }).then((res)=> {
                if(res.data.ret == 0){
                  this.getNoticeList('2');
                }else{
                  this.$message.error(res.data.msg);
                }
              })
            }else{
              this.noAccess = true
            }

          },
        },
        mounted(){
          this.$axios.get('/notice/get_notice_id',{
            params:{
              project_id : this.$route.query.project_id
            }
          }).then((response)=> {
            if(response.data.ret == '0'){
              this.notice_id = response.data.data;
              this.getNoticeInfo();
            }
          })
          this.$axios({
            method: 'get',
            url: '/auth/user/info?user_id='+JSON.parse(localStorage.user_id),
            headers:{
              'Content-type': 'application/x-www-form-urlencoded'
            }
          }).then((response)=> {
            for (var i = 0; i <response.data.data.auths.length; i++ ){
              if(this.$route.query.project_id in response.data.data.auths[i]){
                for (var key in response.data.data.auths[i]){
                  if (key == this.$route.query.project_id) {
                    for (var j in response.data.data.auths[i] ){
                      let index = response.data.data.auths[i][j].findIndex(d => d.id == '7');
                      if(index != '-1'){
                        this.authId=1
                      }else{
                        this.authId = 0;
                      }

                    }
                  }
                }
                break
              }else{
                this.authId = 0;
              }
            }
          })
        },
      watch:{
        $route(to,from){
          if(to.path == '/details/announcement'){
            this.getNoticeList('2')
          }
        }
      },
    }
</script>

<style scoped>
  *{
    box-sizing: border-box;
  }

  /*设置周期*/
  #announcement{
    width: 100%;
    height: calc(100vh - 80px);
    position: relative;
    margin: 30px 0 0;
  }

  #announcement .setBox{
    width:600px;
    height:500px;
    background:rgba(255,255,255,1);
    border-radius:2px;
    background-image: url("../../assets/announcementSettingBg.png");
    background-repeat: no-repeat;
    margin: 0 auto;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    -webkit-transform: translate(-50%,-50%);
  }

  #announcement .setBox .setTitle{
    font-size:18px;
    color:rgba(57,63,81,1);
    width: 100%;
    height: 20px;
    line-height: 20px;
    text-align: center;
    margin: 46px 0 70px;
  }

  #announcement .setBox .form{
    margin: 0 auto 30px;
    width: 300px;
    padding: 0;
  }


  #announcement .setBox .setDateBtn{
    width:297px;
    height:32px;
    background:rgba(215,217,220,1);
    border-radius:15px;
    font-size:12px;
    color:rgba(255,255,255,1);
    text-align: center;
    line-height: 32px;
    margin: 60px auto 0;
    cursor: pointer;
    transition: background 1s;
  }

  #announcement .setBox .setDateBtn.active{
    background:rgba(108,111,191,1);
  }

  /*通告单列表*/
  /*头部*/
  #announcement .listPage{
    width: 100%;
    height: 100%;
  }

  #announcement .listPage .listTop{
    width: calc(100% - 32px);
    padding: 0 0 10px;
    margin-left: 12px;
    height: 25px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid rgba(226,226,233,1);
  }

  #announcement .listTop .listTopTitle,
  #announcement .listTop .listStateBox,
  #announcement .listTop .listBtnBox{
    display: flex;
    align-items: center;
  }

  #announcement .listTop .listTopTitle .listTitleHr{
    width:4px;
    height:14px;
    background:rgba(50,197,143,1);
    margin-right: 10px;
  }

  #announcement .listStateBox .listState{
    font-size:12px;
    color:rgba(57,63,81,1);
    display: flex;
    align-items: center;
    margin-right: 30px;
  }

  #announcement .listStateBox .listState:last-of-type{
    margin-right: 0;
  }

  #announcement .listStateBox .listState .listStateColor{
    width:12px;
    height:12px;
    background:rgba(124,212,185,1);
    border-radius:2px;
    margin-right: 8px;
  }

  #announcement .listStateBox .listState:nth-of-type(2) .listStateColor{
    background:rgba(251,121,138,1);
  }

  #announcement .listStateBox .listState:last-of-type .listStateColor{
    background:rgba(245,229,194,1);
  }

  #announcement .listBtnBox .listBtn{
    font-size:12px;
    cursor: pointer;
    width: 66px;
    border-left: 1px solid #A3A7B5;
    text-align: right;
    color: #393F51;
  }

  #announcement .listBtnBox .listBtn:first-of-type{
    color:rgba(108,111,191,1);
    width: 70px;
    border-left: none;
    text-align: left;
  }

  #announcement .listBtnBox .listBtn:nth-of-type(2){
    text-align: center;
    width: 80px;
  }

  #announcement .listBtnBox .listBtn.deleCheck{
    color: rgba(234,80,80,1);
  }

  #announcement .listBtnBox .listBtn.deleCancel{
    text-align: center;
  }

  #announcement .listBox{
    margin-top: 20px;
    width: calc(100% - 32px);
    margin-left: 12px;
  }

  /*表格样式*/
  #announcement #noticeTree{
    height: calc(100vh - 185px);
    overflow-y: scroll;
    overflow-x: hidden;
    background: #F5F5F7;
  }

  #announcement .listBox .trBox{
    width: 100%;
    display: flex;
    align-items: center;
    position: relative;
    justify-content: space-between;
    padding: 0 34px 0 24px;
    height:60px;
    background:rgba(245,229,194,1);
    font-size:12px;
    color:rgba(57,63,81,1);
    border-bottom: 1px solid #fff;
  }

  #announcement .listBox .trBox.thead{
    background:rgba(64,53,48,0.8);
    border-radius:2px 2px 0 0;
    font-size:14px;
    color:rgba(255,255,255,1);
    border-bottom: none;
  }

  #announcement .listBox .trBox.thead i,
  #announcement .listBox .trBox.thead .theadCheck{
    opacity: 0;
  }

  #announcement .listBox .trBox.thead i:last-of-type{
    height: 40px;
    width: 40px;
  }

  #announcement .listBox .trBox.already{
    background: rgba(124,212,185,1);
    color:rgba(57,63,81,1);
  }

  #announcement .listBox .trBox.wait {
    background: rgba(251,121,138,1);
    color:rgba(255,255,255,1);
  }

  #announcement .listBox .trBox.null .td:nth-last-of-type(4){
    color:rgba(108,111,191,1);
  }

  #announcement .listBox .trBox .td{
    min-width: 200px;
    text-align: center;
    transition: transform 0.5s;
  }

  #announcement .listBox .trBox i:not(.addCut){
    transition: transform 0.5s;
  }

  #announcement .listBox .trBox .tdCheck.active~.td,
  #announcement .listBox .thead .tdCheck~.td,
  #announcement .listBox .trBox .tdCheck.active~i:not(.addCut){
    transform: translate(50px,0px);
  }

  #announcement .listBox .trBox .td:nth-of-type(3){
    text-align: left;
  }

  #announcement .listBox .trBox .tdCheck{
    width: 20px;
  }

  #announcement .listBox .trBox:not(thead) .tdCheck{
    position: absolute;
    left: -14px;
    opacity: 0;
    transition: transform 0.5s,opacity 0.2s;
  }

  #announcement .listBox .trBox .tdCheck.active{
    transform: translate(36px,0px);
    opacity: 1;
  }

  /*添加转场飞机按钮*/
  #announcement .listBox .addCut{
    position: absolute;
    font-size: 20px;
    bottom: -12px;
    left: -1px;
    color: #fff;
    cursor: pointer;
    z-index: 10;
    transform:rotate(90deg);
    -ms-transform:rotate(90deg); 	/* IE 9 */
    -moz-transform:rotate(90deg); 	/* Firefox */
    -webkit-transform:rotate(90deg); /* Safari 和 Chrome */
    -o-transform:rotate(90deg); 	/* Opera */
    transition: transform 0.35s;
  }

  #announcement .listBox .addCut.null{
    transform: translate(-400px,0px);
  }

  /*转场行样式*/
  #announcement .listBox .changeBox{
    display: flex;
    justify-content: center;
    align-items: center;
    height:60px;
    background:linear-gradient(180deg,rgba(173,173,173,1) 49%,rgba(206,206,206,1) 52%);
    border-bottom: 2px solid #F5F5F7;
    padding: 0 34px 0 24px;
    position: relative;
  }

  #announcement .listBox .changeBox:before,
  #announcement .listBox .changeBox:after{
    content: '';
    width: 0;
　　height:0;
    position: absolute;
    border-width: 30px;
    border-style: solid;
    border-color: transparent transparent transparent rgba(245,245,247,1);
  }

  #announcement .listBox .changeBox:before{
    left: 0;
  }

  #announcement .listBox .changeBox:after{
    transform: rotate(180deg);
    right: 0;
  }

  #announcement .listBox .changeBox .changeBtn{
    font-size:20px;
    color:rgba(57,63,81,1);
    margin-right: 40px;
    cursor: pointer;
    width: 16px;
    text-align: center;
    margin-top: -2px;
  }

  #announcement .listBox .changeBox .changeBtn:last-of-type{
    margin: 0 0 0 40px;
    margin-top: -4px;
  }

  #announcement .listBox .changeBox .changeDay,
  #announcement .listBox .changeBox .changeDate{
    font-size:14px;
    color:rgba(57,63,81,1);
  }

  #announcement .listBox .changeBox .changeDay span{
    color: #EB5252;
    font-size:14px;
  }

  #announcement .listBox .changeBox .changeDate{
    margin-left: 16px;
  }

  /*周期调整弹框*/
  #announcement .addDialog .updateTip{
    font-size:12px;
    color:rgba(57,63,81,1);
    line-height: 14px;
    padding: 0 90px;
    margin-bottom: 28px;
  }

  #announcement .addDialog .updateTip i{
    font-size: 14px;
    color: #F05050;
  }

  #announcement .addDialog .noticeDateBtn{
    width:297px;
    height:32px;
    background:rgba(108,111,191,1);
    border-radius:15px;
    font-size:12px;
    color:rgba(255,255,255,1);
    line-height: 32px;
    text-align: center;
    margin: 0 auto;
    cursor: pointer;
  }
</style>

<style>
  @import "../../css/el-form.css";
  @import "../../css/el-dialog.css";

  /*日期选择器*/
  #announcement .setBox .form .el-date-editor{
    width: 100% !important;
  }

  #announcement .setBox .form .el-input__prefix{
    left: 0;
  }

  #announcement .setBox .form .el-date-editor .el-input__inner{
    background-color: transparent!important;
  }



  /*表格*/
  #announcement .listBox .custom-tree-node{
    width: 100%;
  }

  #announcement .listBox .el-tree-node__expand-icon{
    display: none;
  }

  #announcement .listBox .el-tree-node__content{
    height: 60px;
  }

  #announcement .listBox .el-tree>.el-tree-node:nth-last-of-type(2) .trBox{
    border-radius:0 0 2px 2px;
  }

  #announcement .listBox .el-tree>.el-tree-node:nth-last-of-type(2) .addCut{
    opacity: 0;
  }

  /*单选框*/
  #announcement .listBox .trBox .tdCheck .el-checkbox__input .el-checkbox__inner{
    border: none;
  }

  #announcement .listBox .trBox .tdCheck .el-checkbox__input.is-checked .el-checkbox__inner{
    background: #fff;
  }

  #announcement .listBox .trBox .tdCheck .el-checkbox__input.is-checked .el-checkbox__inner:after{
    top: 2px;
    left: 5px;
     border-color:rgba(57,63,81,1);
  }

  /*周期调整弹框*/
  #announcement .addDialog .el-dialog__body{
    padding-bottom: 70px;
  }

  #announcement .addDialog .noticeDateFormBox{
    padding: 0 90px;
  }
</style>
