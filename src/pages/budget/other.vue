<template>
    <div id="other">
        <div class="budgetRightTop">
            <div class="budgetTopLeft">
                <el-breadcrumb separator=">>" class="budgetBread">
                    <el-breadcrumb-item v-for="(item, index) in routerList"  :key="index" :to="{path: '/details/budget/num?play_id='+$route.query.play_id+'&project_id='+$route.query.project_id+'&budget='+item.budget+'&name='+item.name}" replace>{{item.name}}</el-breadcrumb-item>
                </el-breadcrumb>

            </div>
            <div class="budgetTopRight">
                <div class="budgetTopRightBtn">
                    <el-popover ref="budgetTopPeriodPopover"
                            placement="bottom-end"
                            width="455"
                            trigger="click" popper-class="budgetTopPopover">
                        <div class="budgetPopoverTop">
                            <div class="budgetPopoverTitle">
                                <i class="iconfont iconhuodongzhouqi"></i>周期预设
                            </div>
                            <div class="budgetPopoverBtn" @click="addPeriod">＋添加预设</div>
                        </div>
                        <el-table :data="cycleTable" class="budgetTable budgetPopoverTable" @cell-click="editPopoverTable" ref="budgetPopoverTable">
                            <el-table-column width="114" property="name" label="分组">
                                <template slot-scope="scope">
                                    <div class="editbudgetPopoverTable" v-if="scope.row.id != '' && scope.row.id != undefined">
                                        <el-input v-model="scope.row.name" placeholder="请输入组名" class="budgetTableInput"  :disabled="authId!=1"
                                                  @blur="periodSubmit($event,scope.row)"></el-input>
                                        <span class="budgetTableTxt">{{scope.row.name}}</span>
                                        <i class="iconfont iconbianji1 budgetTableIconEdit"></i>
                                    </div>
                                    <div class="addbudgetPopoverTable" v-else>
                                        <el-input v-model="scope.row.name" placeholder="请输入组名" class="budgetTableInput" :disabled="authId!=1"></el-input>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column width="116" property="period" label="周期">
                                <template slot-scope="scope">
                                    <div class="editbudgetPopoverTable" v-if="scope.row.id != '' && scope.row.id != undefined">
                                        <el-input v-model="scope.row.period" placeholder="请输入周期" class="budgetTableInput"  :disabled="authId!=1"
                                                  @blur="periodSubmit($event,scope.row)" @input="numCheck(scope.row.period,'period')"></el-input>
                                        <span class="budgetTableTxt">&#8194;{{scope.row.period}}</span>
                                        <i class="iconfont iconbianji1 budgetTableIconEdit"></i>
                                    </div>
                                    <div class="addbudgetPopoverTable" v-else>
                                        <el-input v-model="scope.row.period" placeholder="请输入周期" class="budgetTableInput"
                                                  @input="numCheck(scope.row,'period')" :disabled="authId!=1"></el-input>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column width="110" property="period_unit" label="单位">
                                <template slot-scope="scope">
                                    <div class="editbudgetPopoverTable" v-if="scope.row.id != '' && scope.row.id != undefined">
                                        <el-select v-model="scope.row.period_unit" placeholder="单位" class="budgetTableInput unitSelect"
                                                   @change="periodSubmit('null',scope.row)" :disabled="authId!=1">
                                            <el-option
                                                    v-for="item in cycleOptions"
                                                    :key="item.label"
                                                    :label="item.label"
                                                    :value="item.label">
                                            </el-option>
                                        </el-select>
                                    </div>
                                    <div class="addbudgetPopoverTable" v-else>
                                        <el-select v-model="scope.row.period_unit" placeholder="单位" class="budgetTableInput unitSelect" :disabled="authId!=1">
                                            <el-option
                                                    v-for="item in cycleOptions"
                                                    :key="item.label"
                                                    :label="item.label"
                                                    :value="item.label">
                                            </el-option>
                                        </el-select>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column width="60" label="操作" align="center" class-name="unitColumn">
                                <template slot-scope="scope">
                                    <div class="editbudgetPopoverTable" v-if="scope.row.id != '' && scope.row.id != undefined">
                                        <div class="popoverTableBtn" @click="periodFill(scope.row)">整页填充</div>
                                    </div>
                                    <div class="addbudgetPopoverTable" v-else>
                                        <div class="popoverTableBtn" @click="addPeriodSubmit(scope)">确认添加</div>
                                    </div>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div slot="reference" class="budgetTopRightDesc">
                            <i class="iconfont iconicon-all_kechengzhouqi-icon"></i>周期预设
                        </div>
                    </el-popover>
                </div>
                <div class="budgetTopRightBtn">
                    <el-popover  ref="budgetTopNumPopover"
                            placement="bottom"
                            width="455"
                            trigger="click" popper-class="budgetTopPopover">
                        <div class="budgetPopoverTop">
                            <div class="budgetPopoverTitle">
                                <i class="iconfont iconkehufenbu"></i>人数预设
                            </div>
                            <div class="budgetPopoverBtn" @click="addNum">＋添加预设</div>
                        </div>
                        <el-table :data="numTable" class="budgetTable budgetPopoverTable" @cell-click="editPopoverTable" ref="budgetPopoverNumTable">
                            <el-table-column width="110" property="name" label="分组" class-name="nameColumn">
                                <template slot-scope="scope">
                                    <div class="editbudgetPopoverTable" v-if="scope.row.id != '' && scope.row.id != undefined">
                                        <el-input v-model="scope.row.name" placeholder="组名" class="budgetTableInput"
                                                  @blur="numSubmit($event,scope.row)"  :disabled="authId!=1"></el-input>
                                        <span class="budgetTableTxt">{{scope.row.name}}</span>
                                        <i class="iconfont iconbianji1 budgetTableIconEdit"></i>
                                    </div>
                                    <div class="addbudgetPopoverTable" v-else>
                                        <el-input v-model="scope.row.name" placeholder="组名" class="budgetTableInput"  :disabled="authId!=1"></el-input>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column width="120" property="quantity" label="人数/数量">
                                <template slot-scope="scope">
                                    <div class="editbudgetPopoverTable" v-if="scope.row.id != '' && scope.row.id != undefined">
                                        <el-input v-model="scope.row.quantity" placeholder="数量" class="budgetTableInput"  :disabled="authId!=1"
                                                  @blur="numSubmit($event,scope.row)" @input="numCheck(scope.row,'quantity')"></el-input>
                                        <span class="budgetTableTxt">&#8194; &#160; {{scope.row.quantity}}</span>
                                        <i class="iconfont iconbianji1 budgetTableIconEdit"></i>
                                    </div>
                                    <div class="addbudgetPopoverTable" v-else>
                                        <el-input v-model="scope.row.quantity" placeholder="数量"  :disabled="authId!=1"
                                                  class="budgetTableInput" @input="numCheck(scope.row,'quantity')"></el-input>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column width="110" property="quantity_unit" label="单位">
                                <template slot-scope="scope">
                                    <div class="editbudgetPopoverTable" v-if="scope.row.id != '' && scope.row.id != undefined">

                                        <el-select v-model="scope.row.quantity_unit" placeholder="单位" class="budgetTableInput unitSelect"
                                                   @change="numSubmit('null',scope.row)" :disabled="authId!=1">
                                            <el-option
                                                    v-for="item in numOptions"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value">
                                            </el-option>
                                        </el-select>

                                    </div>
                                    <div class="addbudgetPopoverTable" v-else>
                                        <el-select v-model="scope.row.quantity_unit" placeholder="单位" class="budgetTableInput unitSelect" :disabled="authId!=1">
                                            <el-option
                                                    v-for="item in numOptions"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value">
                                            </el-option>
                                        </el-select>

                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column width="60" label="操作" class-name="unitColumn">
                                <template slot-scope="scope">
                                    <div class="editbudgetPopoverTable" v-if="scope.row.id != '' && scope.row.id != undefined">
                                        <div class="popoverTableBtn" @click="numFill(scope.row)">整页填充</div>
                                    </div>
                                    <div class="addbudgetPopoverTable" v-else>
                                        <div class="popoverTableBtn" @click="addNumSubmit(scope)">确认添加</div>
                                    </div>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div slot="reference" class="budgetTopRightDesc">
                            <i class="iconfont iconrenshuyushe-icon"></i>人数预设
                        </div>
                    </el-popover>
                </div>
                <div class="budgetTopRightBtn">
                  <div class="budgetTopRightDesc"  @click="downloadCheck">
                    <i class="iconfont iconxiazai1"></i>导出
                  </div>
                </div>
                <p @click="()=>{if(authId==1){addNumDialog = true}else{noAccess = true}}" class="addBudgetBtn">＋预算</p>
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
                    width="280" show-overflow-tooltip>
                <template slot-scope="scope">
                    <el-input v-model="scope.row.budget_name" placeholder="请输入细目名称" :disabled="authId!=1"
                              class="budgetTableInput" @blur="editSubmit($event,scope.row)"></el-input>
                    <span class="budgetTableDetails" @click="link(scope.row)">{{ scope.row.budget_name }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="数量/单位"
                    width="164" show-overflow-tooltip>
                <template slot-scope="scope">
                    <el-popover
                            placement="bottom-start" @hide="editSubmit('null',scope.row)"
                            width="240" popper-class="budgetTablePopover numTablePopover"
                            trigger="click" :disabled="scope.row.children_number==0?false:true">
                        <div class="numFormBox">
                            <div class="numForm">
                                数量
                                <el-input v-model="scope.row.quantity" placeholder="请输入数量"  :disabled="authId!=1"
                                          class="numInput" @input="numCheck(scope.row,'quantity')"></el-input>
                            </div>
                            <div class="numForm">
                                单位
                                <el-select v-model="scope.row.quantity_unit" placeholder="请选择单位" class="numInput" :disabled="authId!=1">
                                    <el-option
                                            v-for="item in numOptions"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                        <div class="recommendBox">
                            输入推荐<div class="recommendHr"></div>
                        </div>
                        <el-radio-group v-model="numRecommend" size="mini" class="recommendGroup"
                                        @change="changePeriod($event,scope.row,'num')" :disabled="authId!=1">
                            <el-radio label="1人" border class="recommendRadio">1人</el-radio>
                            <el-radio label="1个" border class="recommendRadio">1个</el-radio>
                            <el-radio label="1辆" border class="recommendRadio">1辆</el-radio>
                        </el-radio-group>
                        <div slot="reference">
                            {{scope.row.quantity}}/{{scope.row.quantity_unit}}
                            <i class="iconfont iconbianji1 budgetTableIconEdit" v-if="scope.row.children_number==0"></i>
                        </div>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="周期/单位" width="182"
                    show-overflow-tooltip>
                <template slot-scope="scope">
                    <el-popover
                            placement="bottom-start"  @hide="editSubmit('null',scope.row)"
                            width="240" popper-class="budgetTablePopover numTablePopover"
                            trigger="click" :disabled="scope.row.children_number==0?false:true">
                        <div class="numFormBox">
                            <div class="numForm">
                                周期
                                <el-input v-model="scope.row.period" placeholder="请输入周期" class="numInput"
                                          @input="numCheck(scope.row,'period')" :disabled="authId!=1"></el-input>
                            </div>
                            <div class="numForm">
                                单位
                                <el-select v-model="scope.row.period_unit" placeholder="单位" class="numInput" :disabled="authId!=1">
                                    <el-option
                                            v-for="item in cycleOptions"
                                            :key="item.label"
                                            :label="item.label"
                                            :value="item.label">
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                        <div class="recommendBox">
                            输入推荐<div class="recommendHr"></div>
                        </div>
                        <el-radio-group v-model="numRecommend" size="mini" class="recommendGroup"
                                        @change="changePeriod($event,scope.row,'period')" :disabled="authId!=1">
                            <el-radio label="1日" border class="recommendRadio">1日</el-radio>
                            <el-radio label="1周" border class="recommendRadio">1周</el-radio>
                            <el-radio label="1月" border class="recommendRadio">1月</el-radio>
                            <el-radio label="1集" border class="recommendRadio">1集</el-radio>
                        </el-radio-group>
                        <div slot="reference">
                            {{scope.row.period}}/{{scope.row.period_unit}}
                            <i class="iconfont iconbianji1 budgetTableIconEdit" v-if="scope.row.children_number==0"></i>
                        </div>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column
                    prop="price"
                    label="单价" width="164"
                    show-overflow-tooltip>
                <template slot-scope="scope">
                    <el-input v-model="scope.row.price" placeholder="请输入比例" class="budgetTableInput budgetTableInputWidth"
                              @blur="editSubmit($event,scope.row)" @input="numCheck(scope.row,'price')" :disabled="authId!=1"></el-input>
                    <span class="budgetTableTxt">¥{{scope.row.price}}/{{scope.row.quantity_unit}}/{{scope.row.period_unit}}</span>
                    <i class="iconfont iconbianji1 budgetTableIconEdit" v-if="scope.row.children_number==0"></i>
                </template>
            </el-table-column>
            <el-table-column
                    prop="amount"
                    label="金额小计"
                    width="170" show-overflow-tooltip>
                <template slot-scope="scope">
                    <span class="budgetTableTxt" v-if="scope.row.collect==0">¥{{ scope.row.quantity *  scope.row.period * scope.row.price}}</span>
                    <span class="budgetTableTxt" v-else>¥{{scope.row.collect}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="remark"
                    label="备注"
                    width="300" show-overflow-tooltip>
                <template slot-scope="scope">
                    <el-input v-model="scope.row.remark" placeholder="请输入备注"  :disabled="authId!=1"
                              class="budgetTableInput" @blur="editSubmit($event,scope.row)"></el-input>
                    <span class="budgetTableTxt" v-if="scope.row.remark">{{scope.row.remark}}</span>
                    <span class="budgetTableTxt" v-else>---</span>
                    <i class="iconfont iconbianji1 budgetTableIconEdit"></i>
                </template>
            </el-table-column>
            <el-table-column
                    prop=""
                    label="操作"
                    max-width="100"
                    show-overflow-tooltip>
                <template slot-scope="scope">
                    <i class="iconfont iconshanchu budgetTableIcon" @click="()=>{if(authId==1){deleRow(scope.row)}else{noAccess = true}}"></i>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog
                title="添加预算"
                :visible.sync="addNumDialog"
                width="444px"
                center class="addBudgetDialog">
            <div class="addBudgetDialogBody">
                <div class="incomeForm">
                    <span>*</span>细目<el-input v-model="addForm.budget_name" placeholder="请输入细目名称" class="incomeFormInput"></el-input>
                </div>
                <div class="composeFormBox">
                    <div class="incomeForm composeForm">
                        <span>*</span>数量/单位
                        <el-input v-model="addForm.quantity" placeholder="请输入数量" class="incomeFormInput"  @input="numCheck('null','addFormQuantity')">
                            <template slot="append">
                                <el-select v-model="addForm.quantity_unit" placeholder="单位" class="incomeFormInput">
                                    <el-option
                                            v-for="item in numOptions"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </template>
                        </el-input>
                    </div>
                    <div class="incomeForm composeForm">
                        <span>*</span>周期/单位
                        <el-input v-model="addForm.period" placeholder="请输入周期" class="incomeFormInput" @input="numCheck('null','addFormPeriod')">
                            <template slot="append">
                                <el-select v-model="addForm.period_unit" placeholder="单位" class="incomeFormInput">
                                    <el-option
                                            v-for="item in cycleOptions"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </template>
                        </el-input>
                    </div>
                </div>
                <div class="incomeForm">
                    <span>*</span>单价
                    <el-input v-model="addForm.price" placeholder="请输入单价" class="incomeFormInput" @input="numCheck('null','addFormPrice')"></el-input>
                </div>
                <div class="incomeForm">
                    备注<el-input v-model="addForm.remark" placeholder="请输入说明" class="incomeFormInput incomeFormInputBorder" type="textarea"></el-input>
                </div>
            </div>
            <div class="addBudgetDialogFooter">
                <div class="addBudgetDialogFooterBtn" @click="addBudget">确定</div>
                <div class="addBudgetDialogFooterBtn" @click="addNumDialog = false">取消</div>
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
                numTable:[],//人数预设表格
                cycleTable:[],//周期预设表格
                search:'',//表格搜索
                tableData: [],
                numOptions:[{
                    value: '人',
                    label: '人'
                },{
                    value: '个',
                    label: '个'
                },{
                    value: '辆',
                    label: '辆'
                },],//数量单位下拉框数据
                cycleOptions:[{
                    value: '年',
                    label: '年'
                },{
                    value: '集',
                    label: '集'
                },{
                    value: '部',
                    label: '部'
                },{
                    value: '分钟',
                    label: '分钟'
                },{
                    value: '秒',
                    label: '秒'
                },{
                    value: '小时',
                    label: '小时'
                },{
                    value: '周',
                    label: '周'
                },{
                    value: '月',
                    label: '月'
                },{
                    value: '季度',
                    label: '季度'
                },],//周期单位下拉框数据
                numRecommend:'',//数量输入推荐选中
                cycleRecommend:'',//周期输入推荐选中
                addNumDialog:false,//新增数量预算
                addForm:{
                    budget_name:'',
                    quantity: '',
                    quantity_unit: '',
                    period: '',
                    period_unit:'',
                    price:'',
                    remark:'',
                    calculation_type:'',
                    calculation:'',
                    collect:''
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
                if(v == 'price'){
                    row.price = row.price.match(/\d/ig) ? row.price.match(/\d/ig).join('') : ''
                }
                if(v == 'period'){
                    row.period = row.period.match(/\d/ig) ? row.period.match(/\d/ig).join('') : ''
                }
                if(v == 'quantity'){
                    row.quantity = row.quantity.match(/\d/ig) ? row.quantity.match(/\d/ig).join('') : ''
                }
                if(v == 'addFormPeriod'){
                    this.addForm.period = this.addForm.period.match(/\d/ig) ? this.addForm.period.match(/\d/ig).join('') : ''
                }
                if(v == 'addFormQuantity'){
                    this.addForm.quantity = this.addForm.quantity.match(/\d/ig) ? this.addForm.quantity.match(/\d/ig).join('') : ''
                }
                if(v == 'addFormPrice'){
                    this.addForm.price = this.addForm.price.match(/\d/ig) ? this.addForm.price.match(/\d/ig).join('') : ''
                }
            },
            //表格选中项
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            //细目跳转
            link(row){
                if(row.feature.split('/').length == 4){
                    return
                }else{
                    if(row.calculation_type == 1){
                        this.$router.push({path: '/details/budget/num?play_id='+this.$route.query.play_id+'&project_id='+this.$route.query.project_id+'&budget='+row.budget_id+'&name='+row.budget_name+'&parent='+row.parent_id})
                    }else{
                        this.$router.push({path: '/details/budget/scale?play_id='+this.$route.query.play_id+'&project_id='+this.$route.query.project_id+'&budget='+row.budget_id+'&name='+row.budget_name+'&parent='+row.parent_id})
                    }
                }

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
                    return
                  }
                }else{
                  if(cell.children[0].children[0]){
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

                }

            },
            //表格编辑
            editPopoverTable(row, column, cell, event){
                if(row.id == undefined){
                    return
                }else{
                    if(cell.children[0].children[0].children[0]){
                        if(cell.children[0].classList[1] == 'current-cell'){
                            cell.children[0].classList.remove('current-cell')
                        }else{
                            cell.children[0].classList.add('current-cell')
                            this.$nextTick( ()=> {
                                if(cell.children[0].children[0].children[0].children[0]){
                                    cell.children[0].children[0].children[0].children[0].focus()
                                }
                            })
                        }
                    }
                }
            },
            //表格编辑保存
            editSubmit(v,row){
                let children_number = row.children_number
                delete row.children_number;
                let form = new FormData()
                axios({
                    method: 'get',
                    url: '/user/info?user_id='+JSON.parse(localStorage.user_id),
                    headers:{
                        'Content-type': 'application/x-www-form-urlencoded'
                    }
                }).then((response)=> {
                    if(response.data.data.name){
                        row.last_update_user_name = response.data.data.name
                        form.append("creator_name", response.data.data.name);
                    }else if(response.data.data.phone){
                        row.last_update_user_name = response.data.data.phone
                        form.append("last_update_user_name", response.data.data.phone);
                    }else{
                        row.last_update_user_name = response.data.data.email
                        form.append("last_update_user_name", response.data.data.email);
                    }
                    row.calculation = row.quantity *  row.period * row.price
                    row.last_update_user = JSON.parse(localStorage.user_id)
                    if(Number.isInteger(parseInt(row.price))){
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
                                this.addNumDialog = false
                                row.children_number = children_number
                                if(v !== 'null'){
                                    v.path[2].classList.remove('current-cell')
                                }
                            }else{
                                this.$message(response.data.msg);
                            }
                        })
                    }else{
                        this.$message('请输入正确格式');
                    }
                })
            },
            editFocus(v){
                v.path[2].classList.add('current-cell')
            },
            //新增周期预设
            addPeriod(){
              if(this.authId==1){
                var list = {
                  name: '',
                  period: '',
                  period_unit: ''}
                this.cycleTable.unshift(list)
              }else{
                document.querySelector("#app").click();
                this.noAccess = true
              }

            },
            //新增周期预设提交
            addPeriodSubmit(v){
                if(v.row.name!='' && v.row.period !='' && v.row.period_unit != ''){
                    let form = new FormData()
                    form.append("project_id", this.$route.query.project_id);
                    form.append("name", v.row.name);
                    form.append("period", v.row.period);
                    form.append("period_unit", v.row.period_unit);
                    axios({
                        method: 'post',
                        url: '/finance/budget/period_preset_upsert',
                        headers:{
                            'Content-type': 'application/x-www-form-urlencoded'
                        },
                        data:form
                    }).then((response)=> {
                        if(response.data.ret == '0'){
                            this.getPeriod()
                            this.$nextTick( ()=> {
                                this.$refs.budgetPopoverTable.doLayout()
                            })
                        }else{
                            this.$message(response.data.msg);
                        }
                    })
                }else{
                    this.$message('请填写完整');
                }
            },
            //周期预设填充
            periodFill(v){
              if(this.authId==1){
                for(let i=0; i<this.tableData.length; i++){
                  this.tableData[i].period = v.period
                  this.tableData[i].period_unit = v.period_unit
                }
              }else{
                document.querySelector("#app").click();
                this.noAccess = true
              }

            },
            //周期预设数据
            getPeriod(){
                axios.get('/finance/budget/period_preset_list', {
                    params: {
                        project_id: this.$route.query.project_id
                    }
                }).then((response)=> {
                    if(response.data.ret == '0'){
                        if(response.data.data.length != 0){
                            this.cycleTable = response.data.data
                        }
                    }else{
                        this.$message(response.data.msg);
                    }
                })
            },
            //表格内修改周期
            changePeriod(event,v,type){
                if(type == 'num'){
                    v.quantity = event.substring(0,event.length-1)
                    v.quantity_unit = event.charAt(event.length-1)
                }else {
                    v.period = event.substring(0, event.length - 1)
                    v.period_unit = event.charAt(event.length - 1)
                }
            },
            //修改周期预测
            periodSubmit(e,v){
                axios({
                    method: 'post',
                    url: '/finance/budget/period_preset_upsert',
                    headers:{
                        'Content-type': 'application/x-www-form-urlencoded'
                    },
                    data: v,
                    transformRequest: [function (data) {
                        let ret = ''
                        for (let it in data) {
                            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                        }
                        return ret
                    }]
                }).then((response)=> {
                    if(response.data.ret == 0){
                        if(e != 'null'){
                            e.path[3].classList.remove('current-cell')
                        }
                    }else{
                        this.$message({
                            message: response.data.msg,
                            type: 'warning'
                        });
                    }
                })
            },
            //人数预设修改
            numSubmit(e,v){
                axios({
                    method: 'post',
                    url: '/finance/budget/quantity_preset_upsert',
                    headers:{
                        'Content-type': 'application/x-www-form-urlencoded'
                    },
                    data: v,
                    transformRequest: [function (data) {
                        let ret = ''
                        for (let it in data) {
                            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                        }
                        return ret
                    }]
                }).then((response)=> {
                    if(response.data.ret == 0){
                        if(e != 'null'){
                            e.path[3].classList.remove('current-cell')
                        }
                    }else{
                        this.$message({
                            message: response.data.msg,
                            type: 'warning'
                        });
                    }
                })
            },
            //人数预设数据
            getQuantity(){
                axios.get('/finance/budget/quantity_preset_list', {
                    params: {
                        project_id: this.$route.query.project_id
                    }
                }).then((response)=> {
                    if(response.data.ret == '0'){
                        if(response.data.data.length != 0){
                            this.numTable = response.data.data
                        }
                    }else{
                        this.$message(response.data.msg);
                    }
                })
            },
            //新增人数预设
            addNum(){
              if(this.authId==1){
                var list = {
                  name: '',
                  quantity: '',
                  quantity_unit: ''}
                this.numTable.unshift(list)
              }else{
                document.querySelector("#app").click();
                this.noAccess = true
              }

            },
            //新增人数预设提交
            addNumSubmit(v){
                if(v.row.name!='' && v.row.quantity !='' && v.row.quantity_unit != ''){
                    let form = new FormData()
                    form.append("project_id", this.$route.query.project_id);
                    form.append("name", v.row.name);
                    form.append("quantity", v.row.quantity);
                    form.append("quantity_unit", v.row.quantity_unit);
                    axios({
                        method: 'post',
                        url: '/finance/budget/quantity_preset_upsert',
                        headers:{
                            'Content-type': 'application/x-www-form-urlencoded'
                        },
                        data:form
                    }).then((response)=> {
                        if(response.data.ret == '0'){
                            this.getQuantity()
                            this.$nextTick( ()=> {
                                this.$refs.budgetPopoverNumTable.doLayout()
                            })
                        }else{
                            this.$message(response.data.msg);
                        }
                    })
                }else{
                    this.$message('请填写完整');
                }
            },
            //人数预设填充
            numFill(v){
              if(this.authId==1){
                for(let i=0; i<this.tableData.length; i++){
                  this.tableData[i].quantity = v.quantity
                  this.tableData[i].quantity_unit = v.quantity_unit
                }
              }else{
                document.querySelector("#app").click();
                this.noAccess = true
              }

            },
            //新增预设
            addBudget(){
                if(this.addForm.budget_name!='' && this.addForm.period !='' && this.addForm.period_unit != '' && this.addForm.quantity != '' && this.addForm.quantity_unit != '' && this.addForm.price != ''){
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
                        form.append("calculation_type", '1');
                        let calculation = this.addForm.quantity * this.addForm.period * this.addForm.price
                        form.append("calculation", calculation);
                        if(this.addForm.quantity){
                            form.append("quantity", this.addForm.quantity);
                        }
                        if(this.addForm.quantity_unit){
                            form.append("quantity_unit", this.addForm.quantity_unit);
                        }
                        if(this.addForm.period){
                            form.append("period", this.addForm.period);
                        }
                        if(this.addForm.period_unit){
                            form.append("period_unit", this.addForm.period_unit);
                        }
                        if(this.addForm.remark){
                            form.append("remark", this.addForm.remark);
                        }
                        if(this.addForm.price){
                            form.append("price", this.addForm.price);
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
                                this.addForm.price = '';
                                this.addForm.remark = '';
                                this.addForm.period_unit = '';
                                this.addForm.period = '';
                                this.addForm.quantity_unit = '';
                                this.addForm.quantity = '';
                                this.addForm.budget_name = '';
                                this.addNumDialog = false
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
            getBudget(){
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
            if(this.$route.path == '/details/budget/num'){
                let obj = {name:this.$route.query.name,budget: this.$route.query.budget,parent: this.$route.query.parent}
                this.routerList.push(obj)
            }
            this.getPeriod()
            this.getQuantity()
        },
        watch: {
            $route() { //监听路由是否变化
                this.$refs.budgetTopPeriodPopover.doClose()
                this.$refs.budgetTopNumPopover.doClose()
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
                if(this.$route.path == '/details/budget/num'){
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
        activated(){
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
        width: 70%;
        height: 24px;
        align-items: center;
        justify-content: flex-end;
        flex: 1;
        text-align: right;
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

    .budgetPopoverTable.el-table{
        padding: 0 20px;
        height: 240px;
        overflow-y: scroll;
        margin: 10px 0 40px;
    }

    .budgetPopoverTable .popoverTableBtn{
        height:20px;
        font-size:12px;
        text-align: center;
        line-height: 20px;
        color:rgba(237,149,21,1);
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
    .budgetTable .budgetTablePopover .totalInputBox{
        position: relative;
    }

    .budgetTable .budgetTablePopover .totalInputDesc{
        position: absolute;
        top: 0;
        left: 12px;
        line-height: 34px;
        font-size:12px;
        color:rgba(0,0,0,0.6);
    }

    .budgetTable .budgetTablePopover .popoverHr{
        width: 288px;
        height: 1px;
        background:rgba(180,180,180,0.2);
        margin: 14px 0 20px -14px;
    }

    .budgetTable .budgetTablePopover  .totalCheckGroup .totalCheckBox{
        display: block;
        margin-right: 0;
        margin-bottom: 10px;
    }

    .budgetTable .budgetTablePopover  .totalCheckGroup .totalCheckLabel{
        width: 230px;
        display: flex;
        justify-content: space-between;
    }

    .budgetTable .budgetTablePopover  .totalCheckGroup .totalCheckLabel span{
        font-size:12px;
        font-family:MicrosoftYaHei;
        color:rgba(98,98,99,1);
        line-height: 14px;
    }

    .budgetTable .budgetTablePopover .totalSubmitBox{
        width:298px;
        height:34px;
        background:rgba(237,149,21,1);
        border-radius:0px 0px 4px 4px;
        margin: 50px 0 0 -20px;
        font-size:12px;
        color:rgba(255,255,255,1);
        text-align: center;
        line-height: 34px;
        cursor: pointer;
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

    .budgetTablePopover .totalSubmitBox{
        width:298px;
        height:34px;
        background:rgba(237,149,21,1);
        border-radius:0px 0px 4px 4px;
        margin: 50px 0 0 -20px;
        font-size:12px;
        color:rgba(255,255,255,1);
        text-align: center;
        line-height: 34px;
        cursor: pointer;
    }

</style>
<style>
    /*面包屑*/
    #budget .budgetTopLeft{
        width: 30%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space:nowrap;
        height: 24px;
        display: inline-block;
    }
    #budget .budgetBread{
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space:nowrap;
        height: 24px;
    }

    #budget .budgetBread .el-breadcrumb__item span.is-link{
        font-size:12px;
        font-family:MicrosoftYaHei;
        font-weight: normal;
        color: #656588;
        line-height: 24px;
        text-decoration: underline;
    }

    #budget .budgetBread .el-breadcrumb__item:last-of-type span.is-link{
        color: #6F6F6F;
        text-decoration: none;
    }

    #budget .budgetBread .el-breadcrumb__item .el-breadcrumb__separator{
        font-size:12px;
        color: #656588;
    }

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

    .budgetTopPopover .budgetPopoverTable.el-table td.unitColumn .cell{
        padding: 0;
        margin: 0;
    }

    .budgetTopPopover .budgetPopoverTable.el-table td.nameColumn .cell{
        margin-right: 10px;
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
        color: #000;
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
        color:#666;
        background:rgba(245,245,247,1)!important;
        padding-left: 6px;
        padding-right: 25px;
        text-align: center;
        border-radius: 0 4px 4px 0;
    }

    .addBudgetDialog .incomeForm.composeForm .el-input-group__append .el-select.incomeFormInput .el-input__inner::placeholder{
        color:#666;
    }

    .addBudgetDialog .incomeForm.composeForm .el-input-group__append .el-select.incomeFormInput .el-input__suffix{
        margin-right: 0;
        right: 0;
    }

    .addBudgetDialog .incomeForm.composeForm .el-input-group__append .el-select.incomeFormInput .el-input__suffix-inner{
        margin-right: 0;
    }

    .addBudgetDialog .incomeForm.composeForm .el-input-group__append .el-select.incomeFormInput .el-input__icon{
        line-height: 28px;
        color: #666;
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

    .budgetTable.el-table .budgetTableInput:not(.unitSelect){
        display: none;
    }

    .budgetTable.el-table .addbudgetPopoverTable .budgetTableInput{
        display: block;
    }

    .budgetTable.el-table .budgetTableInput.budgetTableInputWidth{
        width: 60%;
    }

    .budgetTable.el-table .budgetTableInput:not(.unitSelect) .el-input__inner{
        background: none;
    }

    .budgetTable.el-table .budgetTableInput .el-input__inner{
        height:24px;
        border:1px solid rgba(136,135,162,0.4);
        margin-left: -8px;
        padding-left: 8px;
        font-size: 12px;
    }

    .budgetTable.el-table .budgetTableInput.unitSelect .el-input{
        width: 68%;
    }

    .budgetTable.el-table .budgetTableInput.unitSelect .el-input__inner{
        padding-right: 20px;
    }

    .budgetTable.el-table .budgetTableInput.unitSelect span.el-input__suffix{
        right: 8px;
    }

    .budgetTable.el-table .budgetTableInput.unitSelect .el-input__icon{
        line-height: 24px;
    }

    .budgetTable.el-table td .cell{
        margin-right: 20px;
    }

    .budgetTable.el-table td .current-cell .budgetTableInput{
        display: block;
    }

    .budgetTable.el-table td .current-cell span.budgetTableTxt,
    .budgetTable.el-table td .current-cell span.budgetTableDetails,
    .budgetTable.el-table td .current-cell>i,
    .budgetTable.el-table td .current-cell .editbudgetPopoverTable>i{
        display: none;
    }

    .budgetTable.el-table td .cell,
    .budgetTable.el-table td .cell .editbudgetPopoverTable{
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
    .budgetTablePopover{
        padding: 14px 20px 0!important;
        box-sizing: border-box;
    }

    .budgetTablePopover .totalInput .el-input__inner{
        height: 34px;
        line-height: 34px;
        font-size:12px;
        color:rgba(0,0,0,1);
        padding-left: 66%;
        /*text-align: right;*/
        padding-right: 8px;
        /*letter-spacing: 2px;*/
    }

    .budgetTablePopover .el-checkbox__inner{
        width: 14px;
        height: 14px;
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
