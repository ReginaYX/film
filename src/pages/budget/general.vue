<template>
    <div id="general">
        <div class="budgetRightTop">
            <div class="budgetTopLeft">
                <p>实际预算总额：<span>￥{{total}}</span></p>
                <p>参考预算总额：<span>￥{{referBudget}}</span></p>
                <el-popover
                        placement="top"
                        width="160" trigger="manual"
                        v-model="visible2">
                    <el-input v-model="referBudget" size="small" placeholder="请输入内容"></el-input>
                    <div style="text-align: right; margin: 0; padding-top: 8px">
                        <el-button size="mini" type="text" @click="visible2 = false">取消</el-button>
                        <el-button type="primary" size="mini" @click="referSubmit">确定</el-button>
                    </div>
                    <i class="iconfont iconbianji" slot="reference" @click="()=>{if(authId==1){visible2 = true}else{noAccess = true}}"></i>
                </el-popover>
            </div>
            <div class="budgetTopRight">
                <div class="budgetTopRightBtn" :href="host+'/file/download/budget?project_id='+this.$route.query.project_id"  @click="downloadCheck">
                    <i class="iconfont iconxiazai1"></i>导出
                </div>

                <el-input
                        placeholder="请输入您要查找的内容"
                        v-model="search" class="budgetTopRightInput">
                    <i slot="prefix" class="el-input__icon iconfont iconsousuo"></i>
                </el-input>
            </div>
        </div>
        <el-table
                ref="multipleTable"
                :data="tableData.filter(data => !search || data.budget_name.toLowerCase().includes(search.toLowerCase()))" class="budgetTable generalTable"
                tooltip-effect="dark" @cell-click="editTable"
                style="width: 100%" :height="tableHeight">
            <el-table-column
                    label="编号"
                    width="132">
                <template slot-scope="scope">
                    <span v-if="scope.$index < 9">000{{ scope.$index+1 }}</span>
                    <span v-else-if="scope.$index >= 9 && scope.$index < 99">00{{ scope.$index+1 }}</span>
                    <span v-else-if="scope.$index >= 99 && scope.$index < 999">0{{ scope.$index+1 }}</span>
                    <span v-else>{{ scope.$index+1 }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="细目"
                    width="288">
                <template slot-scope="scope">
                    <span class="budgetTableName">{{ scope.row.budget_name }}</span>

                </template>
            </el-table-column>
            <el-table-column
                    prop="collect"
                    label="金额"
                    width="200" show-overflow-tooltip>
                <template slot-scope="scope">¥{{scope.row.collect}}</template>
            </el-table-column>
            <el-table-column
                    prop="ratio"
                    label="占比" width="182"
                    show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                    label="预算限额"
                    width="196" show-overflow-tooltip>
                <template slot-scope="scope">
                    <el-input v-model="scope.row.limit" placeholder="请输入限额" class="budgetTableInput" @blur="editSubmit($event,scope.row)" @input="numCheck(scope.row,'limit')"  :disabled="authId!=1"></el-input>
                    <span class="budgetTableTxt">¥{{scope.row.limit}}</span>
                    <i class="iconfont iconbianji1 budgetTableIconEdit"></i>
                </template>
            </el-table-column>
            <el-table-column
                    label="备注"
                    width="360" show-overflow-tooltip>
                <template slot-scope="scope">
                    <el-input v-model="scope.row.remark" placeholder="请输入备注"  :disabled="authId!=1"
                              class="budgetTableInput" @blur="editSubmit($event,scope.row)" ></el-input>
                    <span class="budgetTableTxt">{{scope.row.remark}}</span>
                    <i class="iconfont iconbianji1 budgetTableIconEdit"></i>
                </template>
            </el-table-column>
            <el-table-column
                    prop="creator_name"
                    label="制作者">
            </el-table-column>
        </el-table>
      <a id="target" style="display: none"></a>
      <!--无权限弹框-->
      <no-access :noAccessVisible="noAccess" @close="(v)=>{noAccess = v}"></no-access>
    </div>
</template>

<script>
    import axios from "axios"
    import global_ from '../../common/Global'
    export default {
        name: "general",
        data(){
            return{
                total:0,//总预算
                referBudget:'0',//参考预算
                visible2: false,//参考预算弹窗
                search:'',//表格搜索
                tableData: [],
                multipleSelection: [],//选中数据
                tableHeight:window.innerHeight * 0.8,//表格高度
              host:global_.pathInfo,
              authId:0,//权限信息
              noAccess:false,//无权限弹框
            }
        },
        methods:{
          //下载校验
          downloadCheck(){
            if(this.authId==1){
              var href = this.host+'/file/download/budget?project_id='+this.$route.query.project_id;
              document.getElementById('target').href= href
              document.getElementById('target').click()
            }else{
              this.noAccess = true
            }
          },
            //表格数字验证
            numCheck(row,v){
                if(v == 'limit'){
                    row.limit = row.limit.match(/\d/ig) ? row.limit.match(/\d/ig).join('') : ''
                }
            },
            //参考预算总额保存
            referSubmit(){
                this.visible2 = false
                let formData = new FormData()
                formData.append('project_id', this.$route.query.project_id)
                formData.append('user_id', JSON.parse(localStorage.user_id))
                formData.append('refer', this.referBudget)
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
                        
                    }else{
                        this.$message.error(response.data.msg);
                    }
                })
            },
            //表格选中项
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            //表格编辑
            editTable(row, column, cell, event){
                if(cell.children[0].children[0].children[0]){
                  if(cell.children[0].classList[1] == 'current-cell'){
                    cell.children[0].classList.remove('current-cell')
                  }else{
                    cell.children[0].classList.add('current-cell')
                    this.$nextTick( ()=> {
                      cell.children[0].children[0].children[0].focus()
                    })
                  }
                }

            },
            //表格编辑保存
            editSubmit(v,row){
                delete row.ratio;
                axios({
                    method: 'post',
                    url: '/finance/budget/upsert',
                    headers:{
                        'Content-type': 'application/x-www-form-urlencoded'
                    },
                    data:row,
                    transformRequest: [function (data) {
                        let ret = ''
                        for (let it in data) {
                            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                        }
                        return ret
                    }]
                }).then((response)=> {
                    if(response.data.ret == '0'){
                        v.path[2].classList.remove('current-cell')
                    }else{
                        this.$message(response.data.msg);
                    }
                })
            },
            editFocus(v){
                v.path[2].classList.add('current-cell')
            },
        },
        mounted(){
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
                      let index = response.data.data.auths[i][j].findIndex(d => d.id == '6');
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
            //获取实际预算与参考预算
            axios.get('/finance/budget/total', {
                params: {
                    project_id: this.$route.query.project_id
                }
            }).then((response)=> {
                if(response.data.ret == '0'){
                    this.total = response.data.data.budget_total
                    this.referBudget =  response.data.data.refer
                    this.tableData = response.data.data.budgets
                }else{
                    this.$message(response.data.msg);
                }
            })

        }
    }
</script>

<style scoped>
    *{
        box-sizing: border-box;
    }

    /*顶部*/
    #general{
        height: 100%;
        overflow: hidden;
    }

    #general .budgetRightTop{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 18px 0;
        width: 100%;
    }

    #general .budgetRightTop .budgetTopLeft p{
        display: inline-block;
        font-size:12px;
        line-height: 24px;
        color:rgba(102,102,102,1);
        margin-bottom: 0;
    }

    #general .budgetRightTop .budgetTopLeft p span{
        color: #FD853D;
        font-size: 12px;
    }

    #general .budgetRightTop .budgetTopLeft p:last-of-type{
        margin-left: 30px;
    }

    #general .budgetRightTop .budgetTopLeft p:last-of-type span{
        color: #6A98FD;
    }

    #general .budgetRightTop .budgetTopLeft .iconbianji{
        color: #3f3e6a;
        margin-left: 6px;
        font-size: 14px;
        cursor: pointer;
    }

    #general .budgetRightTop .budgetTopRight{
        display: flex;
        width: 266px;
        height: 24px;
        align-items: center;
    }

    #general .budgetRightTop .budgetTopRight .budgetTopRightBtn{
        margin-right: 30px;
        font-size:12px;
        line-height: 24px;
        color:rgba(102,102,102,1);
        cursor: pointer;
        text-decoration: none;
    }

    #general .budgetRightTop .budgetTopRight .budgetTopRightBtn i{
        font-size: 14px;
        color: #FF690E;
        line-height: 24px;
        margin-right: 8px;
    }

    #general .budgetRightTop .budgetTopRight .budgetTopRightInput{
        width: 186px;
    }

    #general .budgetRightTop .budgetTopRight .budgetTopRightInput .iconsousuo{
        font-size: 16px;
        line-height: 24px;
        color: #545455;
    }

    /*表格*/
</style>
<style>
    /*头部搜索框*/
    #budget .budgetRight .budgetRightTop .budgetTopRight .budgetTopRightInput .el-input__inner{
        height: 24px;
        font-size:12px;
        border:1px solid rgba(136,135,162,0.4);
        border-radius:12px;
        padding-left: 38px;
    }

    #budget .budgetRight .budgetRightTop .budgetTopRight .budgetTopRightInput .el-input__prefix{
        left: 10px;
    }

    /*表格*/
    .budgetTable.el-table{
        display: block;
        height: calc(100% - 100px);
    }
    .budgetTable.el-table td{
        padding: 12px 0;
        height: 24px;
        color: rgba(98,98,99,1);
        border-color: rgba(226,226,233,1);
    }

    .budgetTable.el-table::before{
        display: none;
    }

    .budgetTable.el-table .budgetTableName{
        overflow: hidden;
        display: inline-block;
        text-overflow: ellipsis;
        white-space:nowrap;
    }

    .budgetTable .budgetTableIconEdit{
        font-size: 16px;
        color: #8887a2;
        cursor: pointer;
        margin-left: 16px;
        opacity: 0;
        transition: opacity 1s;
        line-height: 20px;
    }

    .budgetTable.el-table td:hover .budgetTableIconEdit{
        opacity: 1;
    }

    .budgetTable.el-table .has-gutter th{
        font-size: 12px;
        font-weight: normal;
        color: #000;
        padding: 12px 0;
        border-color: rgba(226,226,233,1);
    }

    .budgetTable.el-table .el-checkbox__inner{
        width: 16px;
        height: 16px;
        border-color: rgba(136,135,162,1);
        background: none;
    }

    .budgetTable.el-table .el-checkbox__input.is-checked .el-checkbox__inner,
    .budgetTable.el-table .el-checkbox__input.is-indeterminate .el-checkbox__inner{
        background: rgba(255,105,14,1);
        border-color: rgba(255,105,14,1);
    }

    .budgetTable.el-table .el-checkbox__input.is-checked .el-checkbox__inner::after{
        top: 2px;
        left: 5px;
    }

    .budgetTable.el-table .el-checkbox__input.is-indeterminate .el-checkbox__inner::before{
        top: 6px;
    }

    .budgetTable.el-table .budgetTableInput{
        display: none;
    }

    .budgetTable.el-table .budgetTableInput .el-input__inner{
        background: none;
        height:24px;
        border:1px solid rgba(136,135,162,0.4);
        margin-left: -8px;
        padding-left: 8px;
        font-size: 12px;
    }

    .budgetTable.el-table td .current-cell .budgetTableInput{
        display: block;
    }

    .budgetTable.el-table td .current-cell span.budgetTableTxt,
    .budgetTable.el-table td .current-cell span.budgetTableName,
    .budgetTable.el-table td .current-cell>i{
        display: none;
    }

    .budgetTable.el-table td .cell{
        height: 24px;
        display: flex;
        align-items: center;
    }

    .budgetTable.el-table .budgetTableTxt{
        /*width: 66%;*/
        overflow: hidden;
        display: inline-block;
        text-overflow: ellipsis;
        white-space:nowrap;
        line-height: 23px;
    }

    /*!*分页*!*/
    /*.budgetPageBox{*/
        /*padding: 0;*/
        /*width: 300px;*/
        /*!*position: absolute;*!*/
        /*!*bottom: 40px;*!*/
        /*!*left: -25px;*!*/
        /*!*right: 0;*!*/
        /*margin: 50px auto 0;*/
    /*}*/

    /*.budgetPageBox.el-pagination button{*/
        /*padding: 0;*/
        /*min-width: 20px;*/
        /*height: 24px;*/
    /*}*/

    /*.budgetPageBox.el-pagination button i{*/
        /*color: #666;*/
        /*font-weight: normal!important;*/
    /*}*/

    /*.budgetPageBox .el-pager li{*/
        /*min-width: 24px;*/
        /*height: 24px;*/
        /*font-weight: normal;*/
        /*padding: 0;*/
        /*margin-right: 10px;*/
        /*line-height: 24px;*/
        /*border-radius: 4px;*/
    /*}*/

    /*.budgetPageBox .el-pager li.active{*/
        /*color: #fff;*/
        /*background: #ED9515;*/
    /*}*/

    /*.budgetPageBox .el-pager li:last-of-type{*/
        /*margin-right: 0;*/
    /*}*/

    /*.budgetPageBox.el-pagination .el-pagination__jump{*/
        /*margin-left: 0px;*/
    /*}*/

    /*.budgetPageBox.el-pagination .el-pagination__sizes,*/
    /*.budgetPageBox.el-pagination .el-pagination__jump,*/
    /*.budgetPageBox.el-pagination .el-input .el-input__inner{*/
        /*height: 24px;*/
        /*line-height: 24px;*/
    /*}*/

    /*.budgetPageBox.el-pagination .el-input .el-input__inner{*/
        /*font-size: 12px;*/
    /*}*/

    /*.budgetPageBox.el-pagination .el-input .el-input__icon{*/
        /*line-height: 24px;*/
    /*}*/
</style>
