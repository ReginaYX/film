<template>
    <div id="other">
        <div class="budgetRightTop">
            <div class="budgetTopLeft">
                <el-breadcrumb separator=">>" class="budgetBread">
                    <el-breadcrumb-item v-for="(item, index) in routerList" :key="index" :to="{path: '/details/budget/scale?play_id='+$route.query.play_id+'&project_id='+$route.query.project_id+'&budget='+item.budget+'&name='+item.name}" replace>{{item.name}}</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="budgetTopRight">

                <div class="budgetTopRightBtn">
                  <div class="budgetTopRightDesc"  @click="downloadCheck">
                    <i class="iconfont iconxiazai1"></i>导出
                  </div>
                </div>
                <p class="addBudgetBtn" @click="()=>{if(authId==1){addScaleDialog = true}else{noAccess = true}}">＋预算</p>
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
                  style="width: 100%"  :height="tableHeight">
            <el-table-column
                    label="编号"
                    width="132">
                <template slot-scope="scope">{{ scope.$index+1 }}</template>
            </el-table-column>
            <el-table-column
                    label="细目"
                    width="288">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.date" placeholder="请输入细目" class="budgetTableInput"
                              @blur="editSubmit($event,scope.row,'date')" :disabled="authId!=1"></el-input>
                    <span class="budgetTableDetails">{{ scope.row.budget_name }}</span>

                </template>
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="总金额"
                    width="200" show-overflow-tooltip>
                <template slot-scope="scope">
                    <span class="budgetTableTxt">¥{{scope.row.amount}}</span>
                    <el-popover
                            placement="bottom-start"
                            width="300" popper-class="budgetTablePopover scaleTablePopover" v-if="scope.row.children_number==0"
                            trigger="manual" v-model="scope.row.a" @hide="editSubmit($event,scope.row,'amount')">
                        <div class="totalInputBox">
                            <el-input v-model="scope.row.amount" placeholder="单行输入/选择输入项" class="totalInput"
                                      @input="numCheck(scope.row,'amount')" :disabled="authId!=1">
                                <el-popover
                                        placement="bottom"
                                        width="250" slot="append"
                                        trigger="click">
                                    <span slot="reference">∨</span>
                                    <el-checkbox-group v-model="amountCheckList" class="totalCheckGroup" @change="totalCheck($event,scope.row)">
                                        <el-checkbox v-for="item,index in amountList" :label="index" :key="item.budget_id" class="totalCheckBox">
                                            <div class="totalCheckLabel"><span>{{item.budget_name}}</span><span>{{item.collect}}</span></div>
                                        </el-checkbox>
                                    </el-checkbox-group>
                                </el-popover>
                            </el-input>
                            <div class="totalSubmitBox" @click="scope.row.a = !scope.row.a">确定</div>
                        </div>
                        <!--<div class="popoverHr"></div>-->
                        <i class="iconfont iconbianji1 budgetTableIconEdit" slot="reference" @click="scope.row.a = !scope.row.a"></i>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column
                    prop="percent"
                    label="比例" width="182"
                    show-overflow-tooltip>
                <template slot-scope="scope">
                    <el-input v-model="scope.row.percent" placeholder="请输入比例" class="budgetTableInput" @blur="editSubmit($event,scope.row,'percent')"  @input="numCheck(scope.row,'percent')" :disabled="authId!=1"></el-input>
                    <span class="budgetTableTxt">{{scope.row.percent}}%</span>
                    <i class="iconfont iconbianji1 budgetTableIconEdit" v-if="scope.row.children_number==0"></i>
                </template>
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="金额小计"
                    width="240" show-overflow-tooltip>
                <template slot-scope="scope">
                    <span class="budgetTableTxt" v-if="scope.row.collect>0">¥{{scope.row.collect}}</span>
                    <span class="budgetTableTxt" v-else>¥{{scope.row.percent /100 * scope.row.amount}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="remark"
                    label="备注"
                    width="320">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.remark" placeholder="请输入备注" class="budgetTableInput"
                              @blur="editSubmit($event,scope.row,'remark')" :disabled="authId!=1"></el-input>
                    <span class="budgetTableTxt">{{scope.row.remark}}</span>
                    <i class="iconfont iconbianji1 budgetTableIconEdit"></i>
                </template>
            </el-table-column>
            <el-table-column
                    prop=""
                    label="操作"
                    show-overflow-tooltip>
                <template slot-scope="scope">
                    <i class="iconfont iconshanchu budgetTableIcon" @click="deleRow(scope.row)"></i>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog
                title="添加预算"
                :visible.sync="addScaleDialog"
                width="444px"
                center class="addBudgetDialog">
            <div class="addBudgetDialogBody">
                <div class="incomeForm">
                    <span>*</span>细目<el-input v-model="addForm.budget_name" placeholder="请输入细目名称" class="incomeFormInput"></el-input>
                </div>
                <div class="composeFormBox">
                    <div class="incomeForm scaleForm">
                        <span>*</span>总金额
                        <el-input v-model="addForm.amount" placeholder="请输入总金额" class="incomeFormInput"></el-input>
                    </div>
                    <div class="incomeForm composeForm scaleForm">
                        <span>*</span>比例
                        <el-input v-model="addForm.percent" placeholder="请输入比例" class="incomeFormInput">
                            <template slot="append">% </template>
                        </el-input>
                    </div>
                </div>
                <div class="incomeForm">
                    备注<el-input v-model="addForm.remark" placeholder="请输入说明" class="incomeFormInput incomeFormInputBorder" type="textarea"></el-input>
                </div>
            </div>
            <div class="addBudgetDialogFooter">
                <div class="addBudgetDialogFooterBtn" @click="addBudget">确定</div>
                <div class="addBudgetDialogFooterBtn" @click="addScaleDialog = false">取消</div>
            </div>
        </el-dialog>
      <a id="target" style="display: none"></a>
      <!--无权限弹框-->
      <no-access :noAccessVisible="noAccess" @close="(v)=>{noAccess = v}"></no-access>
    </div>
</template>

<script>
    import axios from "axios"
    import global_ from '../../common/Global'
    export default {
        name: "other",
        data(){
            return{
                otherRadio:'按数量计算',//顶部比例数量切换
                search:'',//表格搜索
                tableData: [],
                amountList:[],//预算项列表
                amountCheckList:[],//预算项选择列表
                numOptions:[{
                    value: '选项1',
                    label: '台'
                },{
                    value: '选项2',
                    label: '个'
                },{
                    value: '选项3',
                    label: '辆'
                },],//数量单位下拉框数据
                numRecommend:'1',
                addNumDialog:false,//新增数量预算
                addForm:{
                    budget_name:'',
                    amount:'',
                    percent:'',
                    remark:'',
                    calculation_type:'',
                    calculation:''
                },//新增预设表单
                addScaleDialog:false,//新增比例预算
                tableHeight:window.innerHeight * 0.8,//表格高度
                routerList:[],//路由列表
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
                if(v == 'percent'){
                    row.percent = row.percent.match(/\d/ig) ? row.percent.match(/\d/ig).join('') : ''
                }
                if(v == 'amount'){
                    row.amount = row.amount.match(/\d/ig) ? row.amount.match(/\d/ig).join('') : ''
                }
            },
            //表格选中项
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            //表格编辑
            editTable(row, column, cell, event){
                if(column.label == '细目'){
                  if(row.feature.split('/').length == 4){
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
                  }else{
                    if(row.calculation_type == 1){
                      this.$router.push({path: '/details/budget/num?play_id='+this.$route.query.play_id+'&project_id='+this.$route.query.project_id+'&budget='+row.budget_id+'&name='+row.budget_name+'&parent='+row.parent_id})
                    }else{
                      this.$router.push({path: '/details/budget/scale?play_id='+this.$route.query.play_id+'&project_id='+this.$route.query.project_id+'&budget='+row.budget_id+'&name='+row.budget_name+'&parent='+row.parent_id})
                    }
                  }
                }else{
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
                }

            },
            //表格编辑保存
            //表格编辑保存
            editSubmit(v,row,label){
                let form = new FormData()
                axios({
                    method: 'get',
                    url: '/user/info?user_id='+JSON.parse(localStorage.user_id),
                    headers:{
                        'Content-type': 'application/x-www-form-urlencoded'
                    }
                }).then((response)=> {
                    if(response.data.data.name){
                        form.append('last_update_user_name',response.data.data.name)
                    }else if(response.data.data.phone){
                        form.append('last_update_user_name',response.data.data.phone)
                    }else{
                        form.append('last_update_user_name',response.data.data.email)
                    }
                    form.append('calculation',row.percent * row.amount)
                    form.append('last_update_user',JSON.parse(localStorage.user_id))
                    form.append('project_id',row.project_id)
                    form.append('budget_name',row.budget_name)
                    form.append('budget_id',row.budget_id)
                    form.append('collect',row.collect)
                    let str = eval('row.'+label)
                    form.append(label, str);
                    axios({
                        method: 'post',
                        url: '/finance/budget/upsert',
                        headers:{
                            'Content-type': 'application/x-www-form-urlencoded'
                        },
                        data:form,
                    }).then((response)=> {
                        if(response.data.ret == '0'){
                            this.addNumDialog = false
                            if(v !== 'null'){
                                if(v){
                                    v.path[2].classList.remove('current-cell')
                                }
                            }
                        }else{
                            this.$message(response.data.msg);
                        }
                    })
                })
            },
            editFocus(v){
                v.path[2].classList.add('current-cell')
            },
            //总金额选择
            totalCheck(v,row){
                var arr1 = new Array()
                for(let i=0; i<v.length; i++){
                    arr1.push(this.amountList[v[i]].collect)
                }
                var getSum = function(ar){
                    var arr=ar;
                    var s=eval(arr.join("+"))

                    return  s;
                };
                row.amount =getSum(arr1)
            },
            //新增预设
            addBudget(){
                if(this.addForm.budget_name!=''){
                    let form = new FormData()
                    axios({
                        method: 'get',
                        url: '/user/info?user_id='+JSON.parse(localStorage.user_id),
                        headers:{
                            'Content-type': 'application/x-www-form-urlencoded'
                        }
                    }).then((response)=> {
                        if(response.data.data.name){
                            form.append("creator_name", response.data.data.name);
                        }else if(response.data.data.phone){
                            form.append("creator_name", response.data.data.phone);
                        }else{
                            form.append("creator_name", response.data.data.email);
                        }
                        form.append("creator", JSON.parse(localStorage.user_id));
                        form.append("project_id", this.$route.query.project_id);
                        form.append("budget_name", this.addForm.budget_name);
                        form.append("calculation_type", '2');
                        if(this.addForm.amount){
                            form.append("amount", this.addForm.amount);
                        }
                        if(this.addForm.percent){
                            form.append("percent", this.addForm.percent);
                        }
                        form.append("calculation",this.addForm.percent /100 * this.addForm.amount);
                        if(this.addForm.remark){
                            form.append("remark", this.addForm.remark);
                        }

                        if(this.$route.query.budget){
                            form.append('parent_id', this.$route.query.budget)
                        }
                        axios({
                            method: 'post',
                            url: '/finance/budget/upsert',
                            headers:{
                                'Content-type': 'application/x-www-form-urlencoded'
                            },
                            data:form
                        }).then((response)=> {
                            if(response.data.ret == '0'){
                                this.getBudget()
                                this.addScaleDialog = false
                                this.addForm.percent = '';
                                this.addForm.amount = '';
                                this.addForm.remark = '';
                                this.addForm.budget_name = '';
                            }else{
                                this.$message(response.data.msg);
                            }
                        })
                    })
                }else{
                    this.$message('请填写完整');
                }
            },
            //删除预设
            deleRow(v){
                this.$confirm('此操作将删除该预算项所有数据，是否刪除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(() => {
                    axios({
                        method: 'post',
                        url: '/finance/budget/delete',
                        headers:{
                            'Content-type': 'application/x-www-form-urlencoded'
                        },
                        data:{
                            budget_id:v.budget_id
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
                            this.getBudget()
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                        }else{
                            this.$message({
                                message: response.data.msg,
                                type: 'warning'
                            });
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            //获取预算项
            getBudget(){
                axios.get('/finance/budgets', {
                    params: {
                        project_id: this.$route.query.project_id,
                        parent_id: this.$route.query.budget
                    }
                }).then((response)=> {
                    if(response.data.ret == '0'){
                        if(response.data.data.length != 0){
                            this.tableData = response.data.data
                        }
                    }else{
                        this.$message(response.data.msg);
                    }
                })
            },
        },
        watch: {
            $route() { //监听路由是否变化
                axios.get('/finance/budgets', {
                    params: {
                        project_id: this.$route.query.project_id,
                        parent_id: this.$route.query.budget
                    }
                }).then((response)=> {
                    if(response.data.ret == '0'){
                        this.tableData = response.data.data
                    }else{
                        this.$message(response.data.msg);
                    }
                })
                if(this.$route.path == '/details/budget/scale'){
                    axios.get('/finance/budgets', {
                        params: {
                            project_id: this.$route.query.project_id
                        }
                    }).then((response)=> {
                        if(response.data.ret == '0'){
                            let term = response.data.data
                            const index = this.routerList.findIndex(d => d.budget == this.$route.query.budget);
                            const treeIndex = term.findIndex(d => d.budget_id == this.$route.query.budget);
                            const childIndex = this.routerList.findIndex(d => d.parent == this.$route.query.parent);
                            if(index == -1 && treeIndex == -1 && childIndex == -1){
                                let obj = {name:this.$route.query.name,budget: this.$route.query.budget,parent: this.$route.query.parent}
                                this.routerList.push(obj)
                            }else if(treeIndex != -1){
                                this.routerList = [{name:this.$route.query.name,budget: this.$route.query.budget,parent: this.$route.query.parent}]
                            }else if(childIndex != -1){
                                this.routerList.splice(childIndex,this.routerList.length - childIndex)
                                let obj = {name:this.$route.query.name,budget: this.$route.query.budget,parent: this.$route.query.parent}
                                this.routerList.push(obj)
                            }else{
                                this.routerList.splice(index+1,this.routerList.length - index)
                            }
                        }
                    })
                }
            }
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
            axios.get('/finance/budgets', {
                params: {
                    project_id: this.$route.query.project_id
                }
            }).then((response)=> {
                if(response.data.ret == '0'){
                    this.amountList = response.data.data
                }else{
                    this.$message(response.data.msg);
                }
            })
            axios.get('/finance/budgets', {
                params: {
                    project_id: this.$route.query.project_id,
                    parent_id: this.$route.query.budget
                }
            }).then((response)=> {
                if(response.data.ret == '0'){
                    if(response.data.data.length != 0){
                        this.tableData = response.data.data
                    }
                }else{
                    this.$message(response.data.msg);
                }
            })
            if(this.$route.path == '/details/budget/scale'){
                let obj = {name:this.$route.query.name,budget: this.$route.query.budgett,parent: this.$route.query.parent}
                this.routerList.push(obj)
            }
        }
    }
</script>

<style scoped>
    *{
        box-sizing: border-box;
    }

    /*顶部*/
    #other{
        height: 100%;
        overflow: hidden;
    }

    #other .budgetRightTop{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 18px 0;
        width: 100%;
    }

    #other .budgetRightTop .budgetTopLeft p{
        display: inline-block;
        font-size:14px;
        line-height: 24px;
        color:rgba(0,0,0,1);
        margin-bottom: 0;
    }

    #other .budgetRightTop .budgetTopRight{
        display: flex;
        width: 382px;
        height: 24px;
        align-items: center;
    }

    #other .budgetRightTop .budgetTopRight .budgetTopRightBtn .budgetTopRightDesc{
        margin-right: 30px;
        font-size:12px;
        line-height: 24px;
        color:rgba(102,102,102,1);
        cursor: pointer;
        text-decoration: none;
    }

    #other .budgetRightTop .budgetTopRight .budgetTopRightBtn .budgetTopRightDesc i{
        font-size: 14px;
        color: #FF690E;
        line-height: 24px;
        margin-right: 8px;
    }

    /*新增按钮*/
    #other .addBudgetBtn{
        width:90px;
        height:24px;
        background:rgba(237,149,21,1);
        border-radius:12px;
        font-size:12px;
        color:rgba(255,255,255,1);
        text-align: center;
        line-height: 24px;
        cursor: pointer;
        margin: 0 30px 0 0;
    }

    #other .budgetRightTop .budgetTopRight .budgetTopRightInput{
        width: 186px;
    }

    #other .budgetRightTop .budgetTopRight .budgetTopRightInput .iconsousuo{
        font-size: 16px;
        line-height: 24px;
        color: #545455;
    }

    /*顶部弹出框*/
    .budgetPopoverTop {
        display: flex;
        width: 100%;
        height: 42px;
        background: rgba(63,62,106,0.05);
        padding: 0 20px;
        align-items: center;
        justify-content: space-between;
    }

    .budgetPopoverTop .budgetPopoverTitle{
        font-size:12px;
        color:rgba(0,0,0,1);
        line-height: 16px;
        display: flex;
        align-items: center;
    }

    .budgetPopoverTop .budgetPopoverTitle i{
        font-size: 16px;
        color: #8887A2;
        margin-right: 8px;
        line-height: 16px;
    }

    .budgetPopoverTop .budgetPopoverBtn{
        font-size:12px;
        color:rgba(237,149,21,1);
        cursor: pointer;
        line-height: 16px;
    }

    .budgetPopoverTable{
        padding: 0 20px 60px;
    }

    .budgetPopoverTable .popoverTableBtn{
        width:56px;
        height:20px;
        background:rgba(237,149,21,1);
        border-radius:10px;
        font-size:12px;
        text-align: center;
        line-height: 20px;
        color:rgba(255,255,255,1);
        cursor: pointer;
    }

    /*新增预算弹窗*/
    .addBudgetDialog .composeFormBox{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    /*数量表格弹出框*/
    .budgetTablePopover .numFormBox{
        width: 100%;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 30px;
    }

    .budgetTablePopover .numFormBox .numForm{
        font-size:12px;
        color:rgba(102,102,102,1);
        text-align: left;
    }

    .budgetTablePopover .numFormBox .numForm:last-of-type{
        margin-left: 26px;
    }

    .budgetTablePopover .recommendBox{
        position: relative;
        width: 100%;
        height: 12px;
        font-size:12px;
        color:rgba(102,102,102,1);
        line-height: 12px;
        margin-bottom: 8px;
    }

    .budgetTablePopover .recommendBox .recommendHr{
        position: absolute;
        width: 140px;
        height: 1px;
        background: rgba(180,180,180,0.2);
        right: 0;
        top: 6px;
    }

    .budgetTablePopover .recommendGroup{
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        padding-bottom: 80px;
    }

    .budgetTablePopover .recommendGroup .recommendRadio{
        margin: 12px 12px 12px 0;
        flex-shrink: 0;
        width:58px;
        height:24px;
        background:rgba(235,235,240,1);
        border-radius:12px;
        text-align: center;
        padding: 0;
        line-height: 24px;
        border: none;
    }

    .budgetTablePopover .recommendGroup .recommendRadio:nth-of-type(3n){
        margin-right: 0;
    }

    /*比例表格弹出框*/
    .budgetTablePopover .totalInput{
        width: 180px;
        margin-right: 10px;
    }

    .budgetTable .budgetTablePopover .totalInputBox{
        position: relative;
    }

     .budgetTablePopover .totalSubmitBox{
         width:63px;
         height:32px;
         background:rgba(237,149,21,1);
         border-radius:4px;
        font-size:12px;
        color:rgba(255,255,255,1);
        text-align: center;
        line-height: 32px;
        cursor: pointer;
         display: inline-block;
    }

    .budgetTablePopover .totalInputBox{
        position: relative;
    }

    .budgetTablePopover .totalInputDesc{
        position: absolute;
        top: 0;
        left: 12px;
        line-height: 34px;
        font-size:12px;
        color:rgba(0,0,0,0.6);
    }

    .budgetTablePopover .popoverHr{
        width: 288px;
        height: 1px;
        background:rgba(180,180,180,0.2);
        margin: 14px 0 20px -14px;
    }

    .budgetTablePopover  .totalCheckGroup .totalCheckBox{
        display: block;
        margin-right: 0;
        margin-bottom: 10px;
    }

    .budgetTablePopover  .totalCheckGroup .totalCheckLabel{
        width: 230px;
        display: flex;
        justify-content: space-between;
    }

    .budgetTablePopover  .totalCheckGroup .totalCheckLabel span{
        font-size:12px;
        font-family:MicrosoftYaHei;
        color:rgba(98,98,99,1);
        line-height: 14px;
    }

    .budgetTablePopover  .totalCheckGroup .totalCheckBox{
        display: block;
        margin-right: 0;
        margin-bottom: 10px;
    }

    .totalCheckGroup .totalCheckLabel{
        width: 180px;
        display: flex;
        justify-content: space-between;
    }

    .totalCheckGroup .totalCheckLabel span{
        font-size:12px;
        font-family:MicrosoftYaHei;
        color:rgba(98,98,99,1);
        line-height: 14px;
    }

    .totalCheckGroup .totalCheckLabel span:first-of-type{
        width: 120px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }

</style>
<style>
    /*!*顶部切换按钮*!*/
    /*#other .budgetRightTop .budgetTopLeft .otherRadioBtn .el-radio-button__inner{*/
        /*width: 80px;*/
        /*height: 24px;*/
        /*padding: 0;*/
        /*text-align: center;*/
        /*line-height: 22px;*/
        /*font-size:12px;*/
        /*border-radius: 0 12px 12px 0;*/
        /*color:rgba(153,153,153,1);*/
    /*}*/

    /*#other .budgetRightTop .budgetTopLeft .otherRadioBtn.el-radio-button:first-child .el-radio-button__inner{*/
        /*border-radius: 12px 0 0 12px;*/
    /*}*/

    /*#other .budgetRightTop .budgetTopLeft .otherRadioBtn.el-radio-button.is-active .el-radio-button__inner{*/
        /*color: #fff;*/
    /*}*/

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

    /*顶部弹出框*/
    .budgetTopPopover{
        padding: 0;
        box-sizing: border-box;
    }

    .budgetTopPopover.el-popper[x-placement^="bottom"] .popper__arrow::after{
        border-color: rgba(63,62,106,0.01);
    }

    .budgetTopPopover .budgetPopoverTable.el-table td .cell{
        padding-right: 0;
    }

    .budgetTopPopover .budgetTable.el-table td.is-center .cell{
        justify-content: center;
        padding: 0;
    }

    /*添加预算弹框*/
    .addBudgetDialogBody{
        padding: 0 30px 30px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }

    .addBudgetDialog .incomeForm{
        flex-shrink: 0;
        width: 224px;
        font-size:12px;
        color:rgba(102,102,102,1);
        margin-top: 20px;
    }

    .addBudgetDialog .incomeForm.incomeFormTop{
        margin-top: 0;
    }

    .addBudgetDialog .incomeForm.payFormLabel{
        margin-top: 0px;
    }

    .addBudgetDialog .incomeForm span{
        color: #FF4302;
        font-size: 12px;
        margin-right: 4px;
    }

    .addBudgetDialog .incomeForm.composeForm,
    .addBudgetDialog .incomeForm.scaleForm{
        width: 160px;
    }

    .addBudgetDialogFooter{
        height: 72px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        border-top: 1px solid rgba(180,180,180,0.2);
    }

    .addBudgetDialogFooter .addBudgetDialogFooterBtn{
        width:100px;
        height:32px;
        background:rgba(237,149,21,1);
        border-radius:16px;
        border: 1px solid rgba(237,149,21,1);
        font-size:14px;
        color:rgba(255,255,255,1);
        text-align: center;
        line-height: 30px;
        cursor: pointer;
    }

    .addBudgetDialogFooter .addBudgetDialogFooterBtn:last-of-type{
        border-color: rgba(186,186,186,1);
        background: #fff;
        color: rgba(0,0,0,.8);
        margin-left: 36px;
    }

    .addBudgetDialog .el-dialog__header{
        padding: 20px 30px 10px;
    }

    .addBudgetDialog .el-dialog__title{
        font-size: 14px;
    }

    .addBudgetDialog .el-dialog .el-dialog__header .el-dialog__headerbtn{
        right: 30px;
    }

    .addBudgetDialog .el-dialog .el-dialog__header .el-dialog__headerbtn .el-dialog__close{
        font-size: 16px;
    }

    .addBudgetDialog .el-dialog__body{
        padding: 0;
    }

    .addBudgetDialog .incomeForm .incomeFormInput .el-input__inner{
        border: none;
        border-radius: 0;
        border-bottom: 1px solid rgba(210,210,210,.6);
        font-size:12px;
        height: 30px;
        line-height: 30px;
        padding-left: 9px;
    }

    .addBudgetDialog .incomeForm.composeForm>.incomeFormInput>.el-input__inner{
        height: 32px;
        border: 1px solid rgba(210,210,210,.6);
        border-radius: 4px 0 0 4px;
    }

    .addBudgetDialog .incomeForm.composeForm .el-input-group{
        margin-top: 8px;
        height: 32px;
    }

    .addBudgetDialog .incomeForm.composeForm .el-input-group__append{
        height: 32px;
        width: 60px;
        box-sizing: border-box;
        padding: 0;
    }

    .addBudgetDialog .incomeForm.composeForm .el-input-group__append .el-select.incomeFormInput{
        margin: 0;
    }

    .addBudgetDialog .incomeForm.composeForm .el-input-group__append .el-select.incomeFormInput .el-input__inner{
        border-bottom: none;
        color:rgba(102,102,102,1);
    }

    .addBudgetDialog .incomeForm.composeForm .el-input-group__append .el-select.incomeFormInput .el-input__suffix{
        margin-right: 0;
    }

    .addBudgetDialog .incomeForm.composeForm .el-input-group__append .el-select.incomeFormInput .el-input__suffix-inner{
        margin-right: 0;
    }

    .addBudgetDialog .incomeForm.composeForm .el-input-group__append .el-select.incomeFormInput .el-input__icon{
        line-height: 30px;
    }

    .addBudgetDialog .incomeForm.composeForm.scaleForm .el-input-group__append{
        width: 40px;
        text-align: center;
    }

    .addBudgetDialog .incomeForm .incomeFormInputBorder .el-input__inner{
        border: 1px solid rgba(210,210,210,.6);
        border-radius: 4px;
        height: 32px;
        width: 150px;
        font-size:12px;
        color:rgba(63,62,106,1);
        margin-top: 8px;
        padding-left: 32px;
    }

    .addBudgetDialog .incomeForm .incomeFormInputBorder .el-textarea__inner{
        border: 1px solid rgba(210,210,210,.6);
        border-radius: 4px;
        height: 50px;
        font-size:12px;
        color:rgba(63,62,106,1);
        margin-top: 8px;
        padding-left: 12px;
        background: rgba(245,245,247,1);
    }


    .addBudgetDialog .incomeForm .incomeFormInputBorder .el-textarea__inner:focus{
        background: #fff;
        border-color: rgba(255,105,14,1);
    }

    .addBudgetDialog .incomeForm .incomeFormInput .el-input__inner:focus{
        border-color: rgba(255,105,14,1);
    }

    .addBudgetDialog .incomeForm .incomeFormInputBorder .el-input__prefix{
        height: 32px;
        top: 10px;
        left: 12px;
    }

    .addBudgetDialog .incomeForm .incomeFormInputBorder .el-input__prefix .iconfont{
        line-height: 28px;
        color:rgba(63,62,106,1);
        font-size: 14px;
    }

    /*表格*/
    .budgetTable .el-table__body-wrapper{
        overflow: scroll;
    }

    .budgetTable.el-table{
        /*display: block;*/
        /*height: calc(100% - 130px)!important;*/
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
        padding: 2px 0 12px;
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
    .budgetTable.el-table td .current-cell span.budgetTableDetails,
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

    .budgetTable.el-table .budgetTableDetails{
        color: #FF690E;
        overflow: hidden;
        display: inline-block;
        text-overflow: ellipsis;
        white-space:nowrap;
        cursor: pointer;
    }

    .budgetTable.el-table .budgetTableIcon{
        color: #FF4302;
        line-height: 24px;
        cursor: pointer;
        margin-left: 6px;
    }

    /*数量表格弹出框*/
    .budgetTablePopover .numFormBox .numForm .numInput .el-input__inner{
        height: 24px;
        line-height: 24px;
        border-radius: 0;
        border: none;
        border-bottom: 1px solid rgba(210,210,210,0.6);
        padding-left: 2px;
        font-size:12px;
        color: rgba(0,0,0,.8);
        margin-top: 5px;
    }

    .budgetTablePopover .numFormBox .numForm .numInput.el-select .el-input__inner{
        background:rgba(235,235,240,1)!important;
        border:1px solid rgba(217,216,225,1);
        border-radius:4px;
        padding-left: 10px;
        transition: background 0.8s;
    }

    .budgetTablePopover .numFormBox .numForm .numInput.el-select .el-input__inner:focus{
        background: #fff;
    }

    .budgetTablePopover .numFormBox .numForm .numInput.el-select .el-input__suffix{
        height: 24px;
        top: 5px;
    }

    .budgetTablePopover .numFormBox .numForm .numInput.el-select .el-select__caret{
        line-height: 20px;
        height: 24px;
    }

    /*弹出框的单选框*/
    .budgetTablePopover .recommendGroup .recommendRadio .el-radio__input{
        display: none;
    }

    .budgetTablePopover .recommendGroup .recommendRadio .el-radio__label{
        padding-left: 0;
        font-family: Microsoft Yahei, 微软雅黑;
    }

    .budgetTablePopover .recommendGroup .recommendRadio.is-checked{
        background: rgba(255,105,14,0.6);
    }

    .budgetTablePopover .recommendGroup .recommendRadio.is-checked .el-radio__label{
        color: #fff;
    }

    /*比例表格弹出框*/
    .scaleTablePopover{
        padding: 26px 20px 40px!important;
        box-sizing: border-box;
    }

    .budgetTablePopover .totalInput .el-input__inner{
        height: 34px;
        width: 146px;
        line-height: 34px;
        font-size:12px;
        color:rgba(0,0,0,1);
        padding-left: 8px;
    }

    .budgetTablePopover .totalInput .el-input-group__append{
        width: 34px;
        height: 34px;
        padding: 0;
        text-align: center;
        cursor: pointer;
      box-sizing: border-box;
    }

    .budgetTablePopover .totalInput .el-input-group__append>span span{
        width: 100%;
        height: 100%;
        display: inline-block;
        line-height: 32px;
    }

    .budgetTablePopover .totalInput .el-input-group__append .el-select{
        width: 34px;
        margin: 0;
    }

    /*分页*/
    .budgetPageBox{
        padding: 0;
        width: 420px;
        /*position: absolute;*/
        /*bottom: 40px;*/
        /*left: -25px;*/
        /*right: 0;*/
        margin: 50px auto 0;
    }

    .budgetPageBox.el-pagination button{
        padding: 0;
        min-width: 20px;
        height: 24px;
    }

    .budgetPageBox.el-pagination button i{
        color: #666;
        font-weight: normal!important;
    }

    .budgetPageBox .el-pager li{
        min-width: 24px;
        height: 24px;
        font-weight: normal;
        padding: 0;
        margin-right: 10px;
        line-height: 24px;
        border-radius: 4px;
    }

    .budgetPageBox .el-pager li.active{
        color: #fff;
        background: #ED9515;
    }

    .budgetPageBox .el-pager li:last-of-type{
        margin-right: 0;
    }

    .budgetPageBox.el-pagination .el-pagination__jump{
        margin-left: 0px;
    }

    .budgetPageBox.el-pagination .el-pagination__sizes,
    .budgetPageBox.el-pagination .el-pagination__jump,
    .budgetPageBox.el-pagination .el-input .el-input__inner{
        height: 24px;
        line-height: 24px;
    }

    .budgetPageBox.el-pagination .el-input .el-input__inner{
        font-size: 12px;
    }

    .budgetPageBox.el-pagination .el-input .el-input__icon{
        line-height: 24px;
    }
</style>
