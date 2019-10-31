<template>
    <div id="budget">
        <div :class="['budgetLeft',$route.path == '/details/budget/general'?'budgetLeftAll':'']">
            <div class="budgetLeftTreeBox">
                <div class="budgetLeftTop">
                    <div class="budgetTopAddBtn" @click="()=>{if(authId==1){addDialog = true}else{noAccess = true}}">＋ 添加预算项</div>
                </div>
                <router-link class="termBudgetBox" :to="{path: '/details/budget/general?play_id='+$route.query.play_id+'&project_id='+$route.query.project_id}">
                    <div class="termBudgetBoxLeft">
                        <div class="circle"></div>
                        <span>总预算</span>
                    </div>

                    <span>￥{{total}}</span>
                </router-link>
                <el-tree  :props="termProps"
                        :data="term" ref="termTree" :default-expanded-keys="expandedTerm"
                        node-key="budget_id" :load="loadNode1" lazy
                        :expand-on-click-node="false" class="termTree">
              <span class="termTreeNode" slot-scope="{ node, data }">
                   <el-input v-if="data.created_at == ''" v-model="data.budget_name" placeholder="请输入内容" class="termTreeInput" @blur="updateBudgetInfo(data)" maxlength="8" autofocus  :disabled="authId!=1"></el-input>
                  <div v-else>
                       <router-link class="termName" v-if="data.calculation_type == 1" :to="{path: '/details/budget/num?play_id='+$route.query.play_id+'&project_id='+$route.query.project_id+'&budget='+data.budget_id+'&name='+data.budget_name+'&parent='+data.parent_id}">{{ data.budget_name }}</router-link>
                    <router-link class="termName" v-else  :to="{path: '/details/budget/scale?play_id='+$route.query.play_id+'&project_id='+$route.query.project_id+'&budget='+data.budget_id+'&name='+data.budget_name+'&parent='+data.parent_id}">{{ data.budget_name }}</router-link>
                  </div>

                <span class="termFunction">
                  <i class="termTreeBtn el-icon-edit-outline" @click="()=>{if(authId==1){data.created_at = '';addBudgetInput=false;}else{noAccess = true}}"></i>
                  <i class="termTreeBtn el-icon-delete" @click="() => {if(authId==1){remove(node, data)}else{noAccess = true}}"></i>
                </span>
              </span>
                </el-tree>

            </div>
           <div class="budgetLeftBottom" v-if="$route.path != '/details/budget/general'">
               <p>{{budgetName}}总计：￥{{budgetTotal}}</p>
               <p>预计占比：{{budgetRatio}}%</p>
           </div>
        </div>
        <div class="budgetRight">

            <keep-alive>
                <router-view></router-view>
            </keep-alive>

        </div>
        <el-dialog
                title="添加预算项"
                :visible.sync="addDialog"
                width="444px"
                center class="addBudgetDialog">
            <div class="addBudgetDialogBody">
                <div class="incomeForm">
                    <span>*</span>预算项名称<el-input v-model="addForm.name" placeholder="请输入细目名称" class="incomeFormInput"></el-input>
                </div>
                <div class="incomeForm budgetRadioForm">
                    <span>*</span>计算方式
                    <el-radio-group v-model="addForm.radio" class="addBudgetRadioGroup">
                        <el-radio :label="1" class="addBudgetRadio">按数量计算</el-radio>
                        <el-radio :label="2" class="addBudgetRadio">按比例计算</el-radio>
                    </el-radio-group>
                </div>
            </div>
            <div class="addBudgetDialogFooter">
                <div class="addBudgetDialogFooterBtn" @click="addBudget">确定</div>
                <div class="addBudgetDialogFooterBtn" @click="addDialog = false">取消</div>
            </div>
        </el-dialog>
      <!--无权限弹框-->
      <no-access :noAccessVisible="noAccess" @close="(v)=>{noAccess = v}"></no-access>
    </div>
</template>

<script>
    let id = 0;
    import axios from "axios"
    import { Tree } from 'ant-design-vue';
    export default {
        name: "budget",
        data(){
            return{
                term:[],//预算项
                termProps:{
                    label:'budget_name',
                    isLeaf: 'leaf',
                    children: 'zones',
                },//预算项配置
                addForm:{name:'',radio:1},
                addBudgetInput:true,//添加预算项输入框
                addDialog: false,//添加预算项弹框
                total:0,//总预算
                expandedTerm:[],//展开的节点
                budgetTotal:0,//总计
                budgetRatio:0,//预计占比
                budgetName:'',//预算项
                t1:'',//计时器
              authId:0,//权限信息
              noAccess:false,//无权限弹框
            }
        },
        components:{ATree : Tree},
        methods:{
            //树懒加载
            loadNode1(node, resolve) {
                if(node.level >= 1){
                    axios.get('/finance/budgets', {
                        params: {
                            project_id: this.$route.query.project_id,
                            parent_id: node.data.budget_id
                        }
                    }).then((response)=> {
                        if(response.data.ret == '0'){
                            const parent = node.parent;
                            const children = parent.data.children || parent.data;
                            const index = children.findIndex(d => d.budget_id === node.data.budget_id);
                            children[index].children = response.data.data
                            return resolve(response.data.data);
                        }else{
                            this.$message(response.data.msg);
                        }
                    })
                }
            },
            //添加预算项保存
            addBudget(){
                if(this.addForm.name != ''){
                    let form = new FormData()
                    axios({
                        method: 'get',
                        url: '/user/info?user_id='+JSON.parse(localStorage.user_id),
                        headers:{
                            'Content-type': 'application/x-www-form-urlencoded'
                        }
                    }).then((response)=> {
                        if (response.data.data.name) {
                            form.append("creator_name", response.data.data.name);
                        } else if (response.data.data.phone) {
                            form.append("creator_name", response.data.data.phone);
                        } else {
                            form.append("creator_name", response.data.data.email);
                        }
                        form.append("project_id", this.$route.query.project_id);
                        form.append("budget_name", this.addForm.name);
                        form.append("calculation_type", this.addForm.radio);
                        form.append("calculation", '0');
                        form.append("collect", '0');
                        form.append("creator", JSON.parse(localStorage.user_id));
                        axios({
                            method: 'post',
                            url: '/finance/budget/upsert',
                            headers:{
                                'Content-type': 'application/x-www-form-urlencoded'
                            },
                            data:form
                        }).then((response)=> {
                            if(response.data.ret == '0'){
                                this.addDialog = false
                                this.addBudgetInput = true
                                this.addForm.name = ''
                                this.getBudget()
                            }else{
                                this.$message(response.data.msg);
                            }
                        })
                    })
                }
            },
            //移除预算项
            remove(node, data) {
                this.$confirm('此操作将删除该预算项所有数据, 是否继续?', '提示', {
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
                            budget_id:data.budget_id
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
            //修改预算项
            updateBudgetInfo(data){
                if(data.budget_id){
                    let form = new FormData()
                    form.append("budget_id", data.budget_id);
                    form.append("project_id", this.$route.query.project_id);
                    form.append("budget_name", data.budget_name);
                    form.append("calculation_type", data.calculation_type);
                    form.append("calculation", data.calculation);
                    form.append("collect", data.collect);
                    form.append("last_update_user",JSON.parse(localStorage.user_id));
                    axios({
                        method: 'post',
                        url: '/finance/budget/upsert',
                        headers:{
                            'Content-type': 'application/x-www-form-urlencoded'
                        },
                        data:form
                    }).then((response)=> {
                        if(response.data.ret == '0'){
                            data.created_at = '0'
                        }else{
                            this.$message(response.data.msg);
                        }
                    })
                }
            },
            //获取预算项
            getBudget(){
                axios.get('/finance/budgets', {
                    params: {
                        project_id: this.$route.query.project_id
                    }
                }).then((response)=> {
                    if(response.data.ret == '0'){
                        this.term = response.data.data
                    }else{
                        this.$message(response.data.msg);
                    }
                })
            },
            //获取总预算
            getTotal(){
                if(this.$route.query.budget){
                    axios.get('/finance/budgets', {
                        params: {
                            project_id: this.$route.query.project_id,
                            parent_id: this.$route.query.budget
                        }
                    }).then((response)=> {
                        if(response.data.ret == '0'){
                            if(response.data.data.length != 0){
                                axios.get('/finance/budget/total', {
                                    params: {
                                        project_id: this.$route.query.project_id
                                    }
                                }).then((data)=> {
                                    if(data.data.ret == '0'){
                                        let budgets = data.data.data.budgets
                                        const index = budgets.findIndex(d => d.budget_id == response.data.data[0].feature.split('/')[0]);
                                        this.budgetTotal = budgets[index].collect
                                        this.budgetRatio = budgets[index].ratio
                                        this.budgetName = budgets[index].budget_name
                                    }
                                })
                            }
                        }
                    })
                }
                axios.get('/finance/budget/total', {
                    params: {
                        project_id: this.$route.query.project_id
                    }
                }).then((response)=> {
                    if(response.data.ret == '0'){
                        this.total = response.data.data.budget_total
                    }
                })
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
                    if(response.data.data.length != 0){
                        this.term = response.data.data
                    }else{
                        let form = new FormData()
                        form.append("project_id", this.$route.query.project_id);
                        axios({
                            method: 'post',
                            url: '/finance/budget/init',
                            headers:{
                                'Content-type': 'application/x-www-form-urlencoded'
                            },
                            data:form
                        }).then((response)=> {
                            if(response.data.ret == '0'){
                                axios.get('/finance/budgets', {
                                    params: {
                                        project_id: this.$route.query.project_id
                                    }
                                }).then((response)=> {
                                    if(response.data.ret == '0'){
                                        this.term = response.data.data
                                    }else{
                                        this.$message(response.data.msg);
                                    }
                                })
                            }else{
                                this.$message(response.data.msg);
                            }
                        })
                    }
                }else{
                    this.$message(response.data.msg);
                }
            })
            axios.get('/finance/budget/total', {
                params: {
                    project_id: this.$route.query.project_id
                }
            }).then((response)=> {
                if(response.data.ret == '0'){
                    this.total = response.data.data.budget_total
                }else{
                    this.$message(response.data.msg);
                }
            })
            if(this.$route.query.budget){
                axios.get('/finance/budgets', {
                    params: {
                        project_id: this.$route.query.project_id,
                        parent_id: this.$route.query.budget
                    }
                }).then((response)=> {
                    if(response.data.ret == '0'){
                        if(response.data.data.length != 0){
                            axios.get('/finance/budget/total', {
                                params: {
                                    project_id: this.$route.query.project_id
                                }
                            }).then((data)=> {
                                if(data.data.ret == '0'){
                                    let budgets = data.data.data.budgets
                                    const index = budgets.findIndex(d => d.budget_id == response.data.data[0].feature.split('/')[0]);
                                    this.budgetTotal = budgets[index].collect
                                    this.budgetRatio = budgets[index].ratio
                                    this.budgetName = budgets[index].budget_name
                                }
                            })
                        }
                    }
                })
            }
            this.t1=window.setInterval(this.getTotal, 4000);
        },
        beforeRouteLeave (to, from, next){
            window.clearInterval(this.t1);
            next(true)
        },
    }
</script>

<style scoped>
    *{
        box-sizing: border-box;
    }

    #budget{
        display: flex;
        margin: 10px 20px 0 12px;
    }

    /*页面左边上部*/
    #budget .budgetLeft{
        width: 250px;
        margin-right: 12px;
        height: calc(100vh - 70px);
    }

    #budget .budgetLeftTreeBox{
        width: 100%;
        height: calc(100% - 88px);
        background: #fff;
        border:1px solid rgba(231,231,236,1);
        border-radius:4px;
    }

    #budget .budgetLeftAll .budgetLeftTreeBox{
        height: 100%;
    }

    #budget .budgetLeft .budgetLeftTop{
        width: 250px;
        height: 60px;
        border-bottom: 1px solid rgba(180,180,180,0.2);
        overflow: hidden;
    }

    #budget .budgetLeft .budgetLeftTop .budgetTopAddBtn{
        width:210px;
        height:35px;
        background:rgba(237,149,21,1);
        border-radius:2px;
        margin: 12px auto;
        font-size:14px;
        color:rgba(255,255,255,1);
        text-align: center;
        line-height: 35px;
        cursor: pointer;
    }

    #budget .budgetLeft .termBudgetBox{
        width: 210px;
        height: 40px;
        display: flex;
        justify-content: space-between;
        margin: 8px 20px 8px 17px ;
        align-items: center;
        /*border-left: 2px solid #fff;*/
        border-bottom: 1px solid rgba(180,180,180,0.2);
    }

    #budget .budgetLeft .termBudgetBox .termBudgetBoxLeft{
        display: flex;
        align-items: center;
    }

    #budget .budgetLeft .termBudgetBox .circle{
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background: #ed9515;
        margin-left: 6px;
    }

    #budget .budgetLeft .termBudgetBox span{
        font-size:12px;
        color:rgba(0,0,0,0.8);
    }

    #budget .budgetLeft .termBudgetBox .termBudgetBoxLeft span{
        margin-left: 9px;
        font-size:12px;
        color:rgba(0,0,0,0.8);
    }

    /*左边预算项树*/
    #budget .budgetLeft .termTree{
        width: 100%;
        height: calc(100% - 126px);
        overflow-y: scroll;
        overflow-x: hidden;
    }

    #budget .budgetLeft .termTree .termTreeNode{
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        padding-right: 20px;
        box-sizing: border-box;
    }

    #budget .budgetLeft .termTree .termTreeNode>div{
        height: 40px;
        line-height: 40px;
    }

    #budget .budgetLeft .termTree .termName{
        font-size:12px;
        color:rgba(0,0,0,0.8);
        line-height: 40px;
        height: 100%;
        width: 140px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        display: inline-block;
    }

    #budget .budgetLeft .termTree .termTreeInput{
        width: 100px;
    }

    #budget .budgetLeft .termTree .termFunction{
        /*width: 88px;*/
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.5s;
    }

    #budget .budgetLeft .termTree .termTreeBtn{
        width: 16px;
        height: 16px;
        /*background-repeat: no-repeat;*/
        /*background-size: 16px 16px;*/
        /*background-position: center left;*/
        margin-right: 18px;
        color: #ACACBF;
        flex-shrink: 0;
        line-height: 17px;
        font-size: 16px;
        /*background-image: url("../../assets/departmentTreeEditBtnNo.png");*/
    }

    #budget .budgetLeft .termTree .termTreeBtn:hover{
        color: #ed9515;
    }

    #budget .budgetLeft .termTree .termTreeBtn.termTreeLastBtn{
        margin-right: 0;
    }

    #budget .budgetLeft .termTree .termTreeBtn:last-of-type{
        margin-right: 0;
    }

    /*页面左边下部*/
    #budget .budgetLeftBottom{
        width: 100%;
        height:75px;
        background:rgba(255,255,255,1);
        border:1px solid rgba(231,231,236,1);
        border-radius:4px;
        margin-top: 12px;
        border-left: 4px solid rgba(255,105,14,1);
    }

    #budget .budgetLeftBottom p{
        font-size:12px;
        color:rgba(98,98,99,1);
        margin-left: 28px;
        line-height: 12px;
    }

    #budget .budgetLeftBottom p:first-of-type{
        margin: 22px 0 8px 28px;
    }

    /*页面右边*/
    #budget .budgetRight{
        width: calc(100% - 260px);
        height: calc(100vh - 70px);
        border:1px solid rgba(231,231,236,1);
        border-radius:4px;
        background: #fff;
        padding: 0 30px;
    }

</style>
<style>
    /*左侧预算项树*/
    #budget .budgetLeft .termTree .el-tree-node{
        position: relative;
    }

    #budget .budgetLeft .termTree .el-tree-node .el-tree-node__content{
        width: 100%;
        height: 40px;
        border-left: 2px solid #fff;
        box-sizing: border-box;
    }

    #budget .budgetLeft .termTree .el-tree-node .el-tree-node__content .el-tree-node__expand-icon:not(.is-leaf){
        width: 12px;
        height: 12px;
        border:1px solid rgba(0,0,0,0.4);
        border-radius:2px;
        padding: 0;
        text-align: center;
        margin-right: 5px;
        margin-left: 17px;
        flex-shrink: 0;
    }

    #budget .budgetLeft .termTree .el-tree-node .el-tree-node__content .el-tree-node__expand-icon.is-leaf{
        margin-right: 5px;
        margin-left: 17px;
        width: 12px;
        padding: 0;
    }

    #budget .budgetLeft .termTree .el-tree-node .el-tree-node__content .el-tree-node__expand-icon.expanded:not(.is-leaf){
        transform: rotate(0);
        border:1px solid rgba(255,67,2,1);
    }

    #budget .budgetLeft .termTree .el-tree-node .el-tree-node__content .el-tree-node__expand-icon:not(.is-leaf):before{
        content: '+';
        font-size:14px;
        color:rgba(0,0,0,0.4);
        line-height: 10px;
        text-align: center;
        margin-left: 0px;
    }

    #budget .budgetLeft .termTree .el-tree-node .el-tree-node__content .el-tree-node__expand-icon.expanded:not(.is-leaf):before{
        content: '-';
        color: rgba(255,67,2,1);
        line-height: 6px;
    }

    #budget .budgetLeft .termTree .el-tree-node:focus>.el-tree-node__content{
        background: none;
        border-left-color: #fff;
    }

    #budget .budgetLeft .termTree .el-tree-node .el-tree-node__content:hover,
    #budget .budgetLeft .termTree .el-tree-node.is-current .el-tree-node__content{
        background-color: #ebebf0;
        /*border-left-color: #ebebf0;*/
        border-left-color: #ed9515;
    }

    #budget .budgetLeft .termTree .el-tree-node:hover>.el-tree-node__content .termFunction,
    #budget .budgetLeft .termTree .el-tree-node.is-focusable:hover>.el-tree-node__content .termFunction{
        opacity: 1;
    }

    /*#budget .budgetLeft .termTree>.el-tree-node.is-focusable>.el-tree-node__content{*/
        /*border-left-color: #ed9515;*/
    /*}*/

    #budget .budgetLeft .termTree .el-tree-node__children .el-tree-node__content{
        padding-left: 34px!important;
    }

    #budget .budgetLeft .termTree .el-tree-node .el-tree-node__children .el-tree-node__content>.el-tree-node__expand-icon:before,
    #budget .budgetLeft .termTree .el-tree-node .el-tree-node__children .el-tree-node__content>.el-tree-node__expand-icon{
        margin-left: 0;
    }

    #budget .budgetLeft .termTree .el-tree-node .el-tree-node__children .el-tree-node__children .el-tree-node__content{
        padding-left: 50px!important;
    }

    #budget .termTree .el-tree-node .el-tree-node__children .el-tree-node__children .el-tree-node__content>.el-tree-node__expand-icon:before,
    #budget .termTree .el-tree-node .el-tree-node__children .el-tree-node__children .el-tree-node__content>.el-tree-node__expand-icon{
        display: none;
    }

    #budget .budgetLeft .termTree .el-tree-node__children .el-tree-node .el-tree-node__content .termName{
        color: rgba(0,0,0,.6);
        width: 130px;
    }

    #budget .budgetLeft .termTree .el-input__inner{
        height: 24px!important;
        font-size: 12px;
        padding: 0 8px;
    }
    /*#budget .budgetLeft .termTree .el-tree-node__content{*/
        /*height: 34px;*/
    /*}*/

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

    .addBudgetDialog .incomeForm .incomeFormInput .el-input__inner:focus{
        border-color: rgba(237,149,21,1);
    }

    .addBudgetDialog .addBudgetRadioGroup{
        margin-top: 10px;
    }

    .addBudgetDialog .addBudgetRadioGroup .addBudgetRadio .el-radio__input{
        margin-right: 8px;
    }

    .addBudgetDialog .addBudgetRadioGroup .addBudgetRadio .el-radio__input .el-radio__inner{
        width:16px;
        height:16px;
        border-radius:2px;
        margin-right: 0;
    }

    .addBudgetDialog .addBudgetRadioGroup .addBudgetRadio .el-radio__label{
        padding-left: 0;
        font-size:12px;
        color:rgba(102,102,102,1);
        font-family: Microsoft Yahei, 微软雅黑;
    }

    .addBudgetDialog .addBudgetRadioGroup .addBudgetRadio.is-checked .el-radio__inner:after{
        display: none;
    }
</style>
