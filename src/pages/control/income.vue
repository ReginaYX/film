<template>
    <div id="income">
        <div class="incomeTopBox">
            <div class="incomeTopLeft">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="支出" name="first">
                        <div class="incomeTopRight">
                            <p>总支出：<span>￥{{expanse_total}}</span></p>
                            <p>总收入：<span>￥{{income_total}}</span></p>
                            <div class="incomeTopRightBtns" @click="()=>{if(authId==1){payDialog = true}else{noAccess = true}}">添加支出</div>
                            <el-input
                                    placeholder="请输入金额或日期"
                                    clearable
                                    v-model="payTableSearch"
                                    class="incomeTableSearch">
                                <i slot="prefix" class="el-input__icon iconfont iconsousuo"></i>
                            </el-input>
                        </div>
                        <el-table
                                ref="multipleTable"
                                :data="payTableData.filter(data => !payTableSearch || (data.amount +='').toLowerCase().includes(payTableSearch.toLowerCase()) || (data.date +='').toLowerCase().includes(payTableSearch.toLowerCase()) || data.account_holder.toLowerCase().includes(payTableSearch.toLowerCase()) || data.operator_name.toLowerCase().includes(payTableSearch.toLowerCase()) || (data.account_time += '').toLowerCase().includes(payTableSearch.toLowerCase()) || data.remark.toLowerCase().includes(payTableSearch.toLowerCase()))"
                                key='firstTable'
                                tooltip-effect="dark"
                                @cell-click="editTable"
                                style="width: 100%"
                                class="incomeTableBox"
                                @selection-change="handleSelectionChange">
                            <div slot="empty" class="emptyBox">
                                 <div>
                                     <i class="iconfont iconwushuju1" style="font-size: 69px"></i><br/>
                                     <div class="empytBoxTow">暂无数据请
                                       <div class="incomeEmptyBtns" @click="()=>{if(authId==1){payDialog = true}else{noAccess = true}}">添加支出</div>
                                     </div>
                                     <!--<span>暂无数据</span>-->
                                 </div>
                            </div>
                            <el-table-column
                                    label="编号"
                                    type="index">
                            </el-table-column>
                            <el-table-column
                                    prop="amount"
                                    label="金额">
                                <template slot-scope="scope">
                                    <el-input
                                            v-model="scope.row.amount"
                                            placeholder="请输入金额"
                                            class="incomeTableInput" :disabled="authId!=1"
                                            @blur="editSubmit($event,scope.row)">
                                    </el-input>
                                    <span class="incomeTableTxt">{{scope.row.amount}}</span>
                                    <i class="iconfont iconbianji1 incomeTableIconEdit"></i>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="date"
                                    label="日期">
                                <template slot-scope="scope">
                                    <el-date-picker
                                            format="yyyy-MM-dd"
                                            v-model="scope.row.date"
                                            value-format="timestamp"
                                            type="date"
                                            class="incomeTableInput incomeTableDatePicker"
                                            placeholder="选择日期"
                                            @blur="editSubmit($event,scope.row)">
                                    </el-date-picker>
                                    <span class="incomeTableTxt">{{ scope.row.date}}</span>
                                    <i class="iconfont iconbianji1 incomeTableIconEdit"></i>
                                </template>
                            </el-table-column>

                            <el-table-column
                                    prop="type"
                                    label="类型"
                                    show-overflow-tooltip>
                                <template slot-scope="scope">
                                    <el-tag
                                            class="incomeTableTag"
                                            :type="scope.row.type === '收入' ? 'primary' : 'success'"
                                            disable-transitions>{{scope.row.type}}
                                    </el-tag>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="account_holder"
                                    label="入账人"
                                    show-overflow-tooltip>
                                <template slot-scope="scope">
                                    <el-input
                                            v-model="scope.row.account_holder"
                                            placeholder="请输入入账人"
                                            class="incomeTableInput" :disabled="authId!=1"
                                            @blur="editSubmit($event,scope.row)">
                                    </el-input>
                                    <span class="incomeTableTxt">{{scope.row.account_holder}}</span>
                                    <i class="iconfont iconbianji1 incomeTableIconEdit"></i>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="operator_name"
                                    label="操作人"
                                    show-overflow-tooltip>
                                <template slot-scope="scope">
                                    <el-input
                                            v-model="scope.row.operator_name"
                                            placeholder="请输入操作人"
                                            class="incomeTableInput" :disabled="authId!=1"
                                            @blur="editSubmit($event,scope.row)">
                                    </el-input>
                                    <span class="incomeTableTxt">{{scope.row.operator_name}}</span>
                                    <i class="iconfont iconbianji1 incomeTableIconEdit"></i>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="account_time"
                                    label="入账时间"
                                    show-overflow-tooltip>
                                <template slot-scope="scope">{{ scope.row.account_time}}</template>
                            </el-table-column>
                            <el-table-column
                                    prop="file"
                                    label="凭证"
                                    show-overflow-tooltip>
                                <template slot-scope="scope">

                                    <el-popover
                                            placement="bottom"
                                            width="267"
                                            popper-class="incomeTablePopover"
                                            trigger="click"
                                            v-model="scope.row.a">
                                        <el-upload
                                                class="uploadFile"
                                                ref="uploadCertificateFile"
                                                :action="uploadUrl"
                                                :limit='5'
                                                accept=".jpg,.png"
                                                list-type="picture"
                                                :auto-upload='false' multiple
                                                :on-change="onChangeUpload">
                                            <div class="incomeTableUpload">
                                                <p>点击上传凭证</p>
                                                <p>支持扩展名：jpg/png</p>
                                            </div>
                                            <div class="incomeTableUploadHr"></div>
                                        </el-upload>
                                        <div class="certificateList">
                                            <div class="listToDo" v-for="item,index in certificateLists" :key="index">
                                                <img :src="'https://service.test.filmptn.com/files/'+item.path" v-if="item.id">
                                                <img :src="item.url" v-else>
                                                <!--<div class="bottomBox" @mouseenter="seen=true" @mouseleave="seen=false">-->
                                                <div class="bottomBox" @click="deleteCertificate(item.id,scope.row)">
                                                    <i class="iconfont iconshanchu" style="color: #f9f9f9;line-height: 10px;"></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="uploadSubmitBox" @click="addCertificate(scope.row)">保存</div>
                                        <el-button
                                                round
                                                type="primary"
                                                class="incomeTableCredentialsTag"
                                                slot="reference"
                                                @click="certificateList(scope.row)">凭证
                                        </el-button>
                                    </el-popover>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="remark"
                                    label="备注"
                                    show-overflow-tooltip>
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.remark" placeholder="请输入备注"  :disabled="authId!=1"
                                              class="incomeTableInput" @blur="editSubmit($event,scope.row)"></el-input>
                                    <span class="incomeTableTxt" v-if="scope.row.remark">{{scope.row.remark}}</span>
                                    <span class="incomeTableTxt" v-else>--</span>
                                    <i class="iconfont iconbianji1 incomeTableIconEdit"></i>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop=""
                                    label="操作" min-width="120"
                                    show-overflow-tooltip>
                                <template slot-scope="scope">
                                    <i class="iconfont iconshanchu incomeTableIcon" @click="()=>{if(authId==1){deleRow(scope)}else{noAccess = true}}"></i>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="入账" name="second">
                        <div class="incomeTopRight">
                            <p>总支出：<span>￥{{expanse_total}}</span></p>
                            <p>总收入：<span>￥{{income_total}}</span></p>
                            <div class="incomeTopRightBtn" @click="()=>{if(authId==1){incomeDialog = true}else{noAccess = true}}">入账</div>
                            <el-input
                                    placeholder="请输入您要查找的内容"
                                    clearable
                                    v-model="incomeTableSearch"
                                    class="incomeTableSearch">
                                <i slot="prefix" class="el-input__icon iconfont iconsousuo"></i>
                            </el-input>
                        </div>
                        <el-table
                                ref="multipleTable"
                                :data="tableData.filter(data => !incomeTableSearch || (data.amount += '').toLowerCase().includes(incomeTableSearch.toLowerCase())|| data.account_holder.toLowerCase().includes(incomeTableSearch.toLowerCase()) || data.operator_name.toLowerCase().includes(incomeTableSearch.toLowerCase())|| (data.account_time += '').toLowerCase().includes(incomeTableSearch.toLowerCase())|| data.category.toLowerCase().includes(incomeTableSearch.toLowerCase()) )"
                                key='secondTable'
                                tooltip-effect="dark"
                                @cell-click="editTable"
                                style="width: 100%"
                                class="incomeTableBox"
                                @selection-change="handleSelectionChange">
                            <div slot="empty" class="emptyBox">
                                <div>
                                    <i class="iconfont iconwushuju1" style="font-size: 69px"></i><br/>
                                    <div class="empytBoxTow">暂无数据请
                                      <div class="incomeEmptyBtns" style="color:#FF4302" @click="()=>{if(authId==1){payDialog = true}else{noAccess = true}}">添加入账</div>
                                    </div>
                                    <!--<span>暂无数据</span>-->
                                </div>
                            </div>
                            <el-table-column
                                    label="编号"
                                    type="index">
                            </el-table-column>

                            <el-table-column
                                    prop="category"
                                    label="类目"
                                    show-overflow-tooltip>
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.category"
                                              placeholder="请输入类目"
                                              class="incomeTableInput" :disabled="authId!=1"
                                              @blur="editSubmit($event,scope.row)">
                                    </el-input>
                                    <span class="incomeTableTxt">{{scope.row.category}}</span>
                                    <i class="iconfont iconbianji1 incomeTableIconEdit"></i>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="amount"
                                    label="金额">
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.amount"
                                              placeholder="请输入金额"
                                              class="incomeTableInput" :disabled="authId!=1"
                                              @blur="editSubmit($event,scope.row)">
                                    </el-input>
                                    <span class="incomeTableTxt">￥{{scope.row.amount}}</span>
                                    <i class="iconfont iconbianji1 incomeTableIconEdit"></i>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="type"
                                    label="类型"
                                    show-overflow-tooltip>
                                <template slot-scope="scope">
                                    <el-tag class="incomeTableTag"
                                            :type="scope.row.type === '收入' ? 'primary' : 'success'"
                                            disable-transitions>{{scope.row.type}}
                                    </el-tag>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="account_holder"
                                    label="入账人"
                                    show-overflow-tooltip>
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.account_holder"
                                              placeholder="请输入入账人"
                                              class="incomeTableInput" :disabled="authId!=1"
                                              @blur="editSubmit($event,scope.row)">
                                    </el-input>
                                    <span class="incomeTableTxt">{{scope.row.account_holder}}</span>
                                    <i class="iconfont iconbianji1 incomeTableIconEdit"></i>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="operator_name"
                                    label="操作人"
                                    show-overflow-tooltip>
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.operator_name"
                                              placeholder="请输入操作人"
                                              class="incomeTableInput" :disabled="authId!=1"
                                              @blur="editSubmit($event,scope.row)">
                                    </el-input>
                                    <span class="incomeTableTxt">{{scope.row.operator_name}}</span>
                                    <i class="iconfont iconbianji1 incomeTableIconEdit"></i>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="account_time"
                                    label="入账时间"
                                    show-overflow-tooltip>
                                <template slot-scope="scope">{{ scope.row.account_time}}</template>
                            </el-table-column>
                            <el-table-column
                                    prop="certificates"
                                    label="凭证"
                                    show-overflow-tooltip>
                                <template slot-scope="scope">
                                    <!--<span class="incomeTableTxt">{{scope.row.certificates.name}}</span>-->
                                    <el-popover
                                            placement="bottom"
                                            width="267"
                                            popper-class="incomeTablePopover"
                                            trigger="click"
                                            v-model="scope.row.a">
                                        <el-upload
                                                class="uploadFile"
                                                ref="uploadCertificateFile"
                                                :action="uploadUrl"
                                                :limit='5'
                                                accept=".jpg,.png"
                                                list-type="picture"
                                                :auto-upload='false'
                                                multiple
                                                :on-change="onChangeUpload">
                                            <div class="incomeTableUpload">
                                                <p>点击上传凭证</p>
                                                <p>支持扩展名：jpg/png</p>
                                            </div>
                                            <div class="incomeTableUploadHr"></div>
                                        </el-upload>
                                        <div class="certificateList">
                                            <div class="listToDo" v-for="item,index in certificateLists" :key="index">
                                                <img :src="'https://service.test.filmptn.com/files/'+item.path" v-if="item.id">
                                                <img :src="item.url" v-else>
                                                <!--<div class="bottomBox" @mouseenter="seen=true" @mouseleave="seen=false">-->
                                                <div class="bottomBox" @click="deleteCertificate(item.id,scope.row)">
                                                    <i class="iconfont iconshanchu" style="color: #f9f9f9;line-height: 10px;"></i>
                                                </div>
                                            </div>
                                         </div>
                                        <div class="uploadSubmitBox" @click="addCertificate(scope.row)">保存</div>
                                        <el-button
                                                round
                                                type="primary"
                                                class="incomeTableCredentialsTag"
                                                slot="reference"
                                                @click="certificateList(scope.row)">凭证
                                        </el-button>
                                    </el-popover>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="remark"
                                    label="备注"
                                    show-overflow-tooltip>
                                <template slot-scope="scope">
                                    <el-input
                                            v-model="scope.row.remark"
                                            placeholder="请输入备注"
                                            class="incomeTableInput" :disabled="authId!=1"
                                            @blur="editSubmit($event,scope.row)">
                                    </el-input>
                                    <span class="incomeTableTxt" v-if="scope.row.remark">{{scope.row.remark}}</span>
                                    <span class="incomeTableTxt" v-else>--</span>
                                    <i class="iconfont iconbianji1 incomeTableIconEdit"></i>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop=""
                                    label="操作" min-width="120"
                                    show-overflow-tooltip>
                                <template slot-scope="scope">
                                    <i class="iconfont iconshanchu incomeTableIcon" @click="()=>{if(authId==1){deleRow(scope)}else{noAccess = true}}"></i>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                </el-tabs>
                <el-pagination
                        class="paging"
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="[12, 24, 48]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total=totalPage>
                </el-pagination>
            </div>
        </div>
        <el-dialog
                title="资金入账"
                :visible.sync="incomeDialog"
                width="560px"
                center class="incomeDialog">
            <el-form :model="incomeForm" :rules="rules" ref="incomeForm" class="incomeDialogBody">
                <el-form-item prop="names" class="incomeForm">
                    <span>*</span>入账人<el-input v-model="incomeForm.names" placeholder="请输入入账人名称" class="incomeFormInput"></el-input>
                </el-form-item>
                <el-form-item prop="type" class="incomeForm">
                    <span>*</span>类目
                    <el-input v-model="incomeForm.type" placeholder="请输入类目" class="incomeFormInput"></el-input>
                </el-form-item>
                <el-form-item prop="money" class="incomeForm">
                    <span>*</span>金额
                    <el-input v-model.number="incomeForm.money" placeholder="请输入金额" class="incomeFormInput incomeFormInputBorder">
                        <i slot="prefix" class="iconfont iconrenminbi2"></i>
                    </el-input>
                    <p class="incomeFormDate">入账时间：<span>{{incomeForm.date | changeTime}}</span></p>
                </el-form-item>


                <el-form-item class="incomeForm">
                    原因说明<el-input v-model="incomeForm.address" placeholder="请输入说明" class="incomeFormInput incomeFormInputBorder" type="textarea"></el-input>
                </el-form-item>
                <el-form-item class="incomeForm incomeUploadBox">
                    <div class="incomeUploadTop">
                        <span>*</span>凭证上传 &#8194;∨
                        <div class="incomeUploadTopBorder"></div>
                    </div>
                    <el-upload
                            class="uploadFile"
                            ref="uploadImcomeFile"
                            :action="addUploadUrl"
                            :limit='5'
                            :on-exceed="handleExceed"
                            accept=".jpg,.png"
                            :on-change="onChange"
                            :auto-upload='false'
                            :multiple="multiple">
                        <div class="incomeTableUploadBox">
                            <p>支持jpg/png格式</p>
                            <p>点击上传凭证</p>
                        </div>
                    </el-upload>
                </el-form-item>
            </el-form>
            <div class="incomeDialogFooter">
                <div class="incomeDialogFooterBtn" @click="addIncome('incomeForm')">确定</div>
                <div class="incomeDialogFooterBtn" @click="incomeDialog = false">取消</div>
            </div>
        </el-dialog>
        <el-dialog
                title="新增支出"
                :visible.sync="payDialog"
                width="560px"
                center class="incomeDialog payDialog">
            <el-form :model="payForm" :rules="rules"  ref="payForm" class="incomeDialogBody">
                <el-form-item prop="names" class="incomeForm">
                    <span>*</span>入账人<el-input v-model="payForm.names" placeholder="请输入入账人名称" class="incomeFormInput"></el-input>
                </el-form-item>
                <el-form-item prop="category" class="incomeForm">
                    <span>*</span>类目
                    <el-select v-model="payForm.category" placeholder="请选择类目" class="incomeFormInput" @change="currentSel">
                        <el-option
                                v-for="item in budgetss"
                                :key="item.budget_name"
                                :label="item.budget_name"
                                :value="item.budget_id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item  prop="money"  class="incomeForm">
                    <span>*</span>金额
                    <el-input v-model.number="payForm.money" placeholder="请输入金额" class="incomeFormInput incomeFormInputBorder">
                        <i slot="prefix" class="iconfont iconrenminbi2"></i>
                    </el-input>
                </el-form-item>
                <el-form-item class="incomeForm payForm">
                    <p class="incomeFormDate">入账时间：<span>{{payForm.date | changeTime}}</span></p>
                </el-form-item>
                <el-form-item  prop="dates"  class="incomeForm">
                    <span>*</span>开销日期
                    <el-date-picker format="yyyy-MM-dd" :clearable="false"
                                    v-model="payForm.dates" value-format="timestamp"
                                    type="date" class="incomeFormInput"
                                    placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item class="incomeForm payFormLabel">
                    备注<el-input v-model="payForm.address" placeholder="请输入说明" class="incomeFormInput incomeFormInputBorder" type="textarea"></el-input>
                </el-form-item>
                <el-form-item class="incomeForm incomeUploadBox">
                    <div class="incomeUploadTop">
                        <span>*</span>凭证上传 &#8194;∨
                        <div class="incomeUploadTopBorder"></div>
                    </div>
                    <el-upload
                            class="uploadFile"
                            ref="uploadPayFile"
                            :action="addUploadUrl"
                            :limit='5'
                            :on-exceed="handleExceed"
                            accept=".jpg,.png"
                            :on-change="onChange"
                            :auto-upload='false'
                            :multiple="multiple">
                        <div class="incomeTableUploadBox">
                            <p>支持jpg/png格式</p>
                            <p>点击上传凭证</p>
                        </div>
                    </el-upload>
                </el-form-item>
            </el-form>
            <div class="incomeDialogFooter">
                <div class="incomeDialogFooterBtn" @click="addPay('payForm')">确定</div>
                <div class="incomeDialogFooterBtn" @click="payDialog = false">取消</div>
            </div>
        </el-dialog>
      <!--无权限弹框-->
      <no-access :noAccessVisible="noAccess" @close="(v)=>{noAccess = v}"></no-access>
    </div>
</template>

<script>
    import axios from "axios"
    export default {
        name: "income",
        data(){
            var checkMoney = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('金额不能为空'));
                }
                if (!Number.isInteger(value)) {
                    callback(new Error('请输入数字值'));
                } else {
                    callback();
                }
            };
            var checkNames = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('入账人不能为空'));
                }
                callback();
            };
            var checkType = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('类目不能为空'));
                }
                callback();
            };
            var checkDates = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('日期不能为空'));
                }
                callback();
            };
            var checkCategory = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('类目不能为空'));
                }
                callback();
            };
            return{
                rules: {//校验
                    money: [
                        { validator: checkMoney, trigger: 'blur' }
                    ],
                    names: [
                        { validator: checkNames, trigger: 'blur' }
                    ],
                    type: [
                        { validator: checkType, trigger: 'blur' }
                    ],
                    dates: [
                        { validator: checkDates, trigger: 'blur' }
                    ],
                    category:[
                        { validator: checkCategory, trigger: 'blur' }
                    ]
                },
                activeName:'first',//tab显示
                incomeTableSearch:'',//收入表格搜索内容
                payTableSearch:'',//支出表格搜索内容
                tableData: [],//收入表格数据
                payTableData: [],//支出表格数据
                multipleSelection: [],//表格选中项
                uploadUrl:'/finance/flow/upsert',//上传路径
                addUploadUrl:'/finance/flow/certificate/add',//添加凭证
                incomeDialog:false,//收入弹框
                incomeForm:{
                    date:new Date(new Date().toLocaleDateString()).getTime()/1000,
                    names:'',
                    money:'',
                    type:'收入',//类目
                    address:'',
                    fileList:'',
                },//收入数据
                incomeFileList:new FormData(),//收入凭证
                payDialog:false,//支出弹框
                payForm:{
                    date:new Date(new Date().toLocaleDateString()).getTime()/1000,
                    dates:'',//开销日期
                    names:'',
                    money:'',//金额
                    category:'',//类目
                    address:'',
                    type:'1'
                    // fileList:'',
                },//支出数据
                options:[{
                    value: '选项1',
                    label: '收入'
                }, {
                    value: '选项2',
                    label: '支出'
                }],//类目选项
                type:'1',//类型，1支出2入账
                account_time_year:'',//年
                account_time_month:'',//月
                account_time_day:'',//日
                fileList: '',//添加上传凭证
                visible:false,//凭证弹窗
                certificateLists:[],//凭证列表
                seen:false,//凭证删除显示
                budgetss:[],//预算项
                operator_name:'',//操作人姓名
                multiple:true,//多个上传
                addCertificateList:'',//新增凭证
                totalPage:0,//总页数
                pageSize:12,//每页显示条数
                currentPage: 1,//当前页数
                expanse_total:'',//总支出
                income_total:'',//总收入
                budget_id:'',//预算ID
              authId:0,//权限信息
              noAccess:false,//无权限弹框
            }
        },
        methods:{
            searchChange(){

            },
            //select选中
            currentSel(selVal) {
                // this.code = selVal.code;
                // this.name = selVal.label;
                // console.log("选择的name为：" + this.name, "选择的code为:" + this.code);
                this.budget_id = selVal;
                // console.log(selVal);
            },
            //分页
            handleSizeChange(val){
                this.pageSize = val;
                this.currentPage = 1;
                this.handleCurrentChange(this.currentPage);
                this.financeList()
                // console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val){
                this.currentPage = val;
                // console.log(`当前页: ${val}`);
                this.financeList()
            },
            //tab切换
            handleClick(tab, event) {
                if (tab.name == 'first'){
                    this.type = 1;
                    this.financeList()
                }else {
                    //收入
                    this.type = 2;
                    this.financeList()
                }
            },
            //删除行
            deleRow(v){
                this.$confirm('确认删除后项目将不可恢复，是否刪除?', '项目管理', {
                    confirmButtonText: '确认删除',
                    cancelButtonText: '我不删了',
                    cancelButtonClass:'reverseCancel',
                    confirmButtonClass:'reverseConfirm'
                }).then(() => {
                    let formData = new FormData()
                    formData.append('flow_id', v.row.flow_id);
                    axios({
                        method: 'post',
                        url: 'finance/flow/delete',
                        data:formData,
                        headers:{
                            'Content-type': 'application/x-www-form-urlencoded'
                        }
                    }).then((response)=> {
                        if(response.data.ret == '0'){
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.tableData.splice(v.$index,1);
                            this.payTableData.splice(v.$index,1);

                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
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
                axios({
                    method: 'post',
                    url: '/finance/flow/upsert',
                    data:row,
                    headers:{
                        'Content-Type': 'multipart/form-data',
                        'Accept': '*/*',
                        'X-Requested-With': 'XMLHttpRequest'
                    },
                    transformRequest: [function (data) {
                        let ret = ''
                        for (let it in data) {
                            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                        }
                        return ret
                    }]
                }).then((response)=> {
                    if(response.data.msg=='ok'){
                        v.path[2].classList.remove('current-cell')
                    }else{
                        this.$message(response.data.msg)
                    }
                })
            },
            editFocus(v){
                v.path[2].classList.add('current-cell')
            },
            //表格选择
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            //上传凭证变化钩子
            handleChange(file, fileList){
                // console.log('handleChange')
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 5 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            //收入上传凭证
            beforeAvatarUploadTxts(file,fileList) {
                const isJPG = file.type === 'image/jpeg';
                const isPNG = file.type === 'image/png';
                const isJPG1 = file.type === 'image/jpg';
                if (!isJPG && !isPNG && !isJPG1) {
                    this.$message.error('上传凭证图片只能是 JPG/PNG 格式!');
                }
                // console.log(fileList);
                this.incomeForm.fileList =  fileList;

                // for(let i=0;i<file.length;i++){
                    // this.incomeFileList.append('fileList',file);
                    // this.incomeForm.fileList =  file;
                // }
                // this.incomeFileList.append('fileList',file);
                // console.log(this.incomeForm.fileList);
                return isJPG && isPNG && isJPG1;
            },
            onChange(file, fileList) { //这里做一些文件控制，注意：就算一次选取多个文件，这里依旧会执行多次
              if(this.authId==1){
                const isJPG = file.raw.type === 'image/jpeg';
                const isPNG = file.raw.type === 'image/png';

                if (!isJPG && !isPNG) {
                  this.$message.error('上传凭证图片只能是 JPG/PNG 格式!');
                }
                this.incomeForm.fileList = fileList;
                return isJPG && isPNG;
              }else{
                document.querySelector("#app").click();
                this.noAccess = true
              }

            },
            //收入添加凭证
            onChangeUpload(file, fileList){
              if(this.authId==1){
                const isJPG = file.raw.type === 'image/jpeg';
                const isPNG = file.raw.type === 'image/png';

                if (!isJPG && !isPNG) {
                  this.$message.error('上传凭证图片只能是 JPG/PNG 格式');
                }else if(this.certificateLists.length >= 5){
                  this.$message.error('最多可上传五张');
                  return
                }
                this.certificateLists.push(file);
                this.addCertificateList = fileList
                return isJPG && isPNG;
              }else{
                document.querySelector("#app").click();
                this.noAccess = true
              }

            },
            //支出上传凭证
            beforeAvatarUploadTxt(file) {
              if(this.authId==1){
                const isJPG = file.type === 'image/jpeg';
                const isPNG = file.type === 'image/png';

                if (!isJPG && !isPNG) {
                  this.$message.error('上传凭证图片只能是 JPG/PNG 格式!');
                }
                // this.payForm.fileList =  file;
                this.payForm.fileList.push(file);

                return isJPG && isPNG;
              }else{
                document.querySelector("#app").click();
                this.noAccess = true
              }

            },
            //添加上传凭证
            beforeAvatarUploadTxtAdd(){
              if(this.authId==1){
                const isJPG = file.type === 'image/jpeg';
                const isPNG = file.type === 'image/png';

                if (!isJPG && !isPNG) {
                  this.$message.error('上传凭证图片只能是 JPG/PNG 格式!');
                }
                // this.fileList =  file;
                this.fileList.push(file);

                return isJPG && isPNG;
              }else{
                document.querySelector("#app").click();
                this.noAccess = true
              }

            },
            //删除凭证
            deleteCertificate(id,value){
              if(this.authId==1){
                let formData = new FormData();
                formData.append('id', id);
                axios({
                  method: 'post',
                  url: '/finance/flow/certificate/delete',
                  headers:{
                    'Content-type': 'application/x-www-form-urlencoded'
                  },
                  data:formData,
                }).then((response)=> {
                  if(response.data.msg=='ok'){
                    this.certificateList(value)
                    this.$message({
                      message: '删除成功',
                      type: 'success'
                    });
                  }else{
                    this.msg = response.data.msg
                  }
                });
              }else{
                document.querySelector("#app").click();
                this.noAccess = true
              }

            },
            //操作人姓名
            oaName(){
                axios({
                    method: 'get',
                    url: '/user/info?user_id='+JSON.parse(localStorage.user_id),
                    headers:{
                        'Content-type': 'application/x-www-form-urlencoded'
                    }
                }).then((response)=> {
                    this.operator_name = response.data.data.name;
                });
            },
            //新增收入弹窗
            addIncome(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$refs.uploadImcomeFile.submit();
                        var date = new Date();
                        date.setTime(this.incomeForm.date * 1000);
                        var y = date.getFullYear();
                        var m = date.getMonth() + 1;
                        // m = m < 10 ? ('0' + m) : m;
                        var d = date.getDate();
                        // d = d < 10 ? ('0' + d) : d;
                        var h = date.getHours();
                        // h = h < 10 ? ('0' + h) : h;
                        var minute = date.getMinutes();
                        var second = date.getSeconds();
                        // minute = minute < 10 ? ('0' + minute) : minute;
                        this.account_time_year= y;
                        this.account_time_month= m;
                        this.account_time_day = d;
                        let formData = new FormData();
                        formData.append('project_id', this.$route.query.project_id);
                        formData.append('amount', this.incomeForm.money);
                        formData.append('category',this.incomeForm.type);
                        formData.append('type', this.type);
                        formData.append('account_holder', this.incomeForm.names);
                        formData.append('account_time',this.incomeForm.date);
                        formData.append('account_time_year',this.account_time_year);
                        formData.append('account_time_month',this.account_time_month);
                        formData.append('account_time_day',this.account_time_day);
                        formData.append('operator_id',JSON.parse(localStorage.user_id));
                        formData.append('operator_name',this.operator_name);
                        if(this.incomeForm.address){
                            formData.append('remark',this.incomeForm.address);
                        }
                        if(this.incomeForm.fileList){
                            this.incomeForm.fileList.forEach(file => {
                                formData.append('certificates', file.raw, file.raw.name); //此处一定是append file.raw 上传文件只需维护fileList file.raw.name要加上
                            })
                        }
                        axios({
                            method: 'post',
                            url: '/finance/flow/upsert',
                            headers:{
                                'Content-type': 'application/x-www-form-urlencoded'
                            },
                            data:formData,
                        }).then((response)=> {
                            if(response.data.msg=='ok'){
                                this.$message({
                                    message: '添加成功',
                                    type: 'success'
                                });
                                this.tableData.push(this.incomeForm);
                                this.financeList();
                                this.incomeDialog = false
                            }else{
                                his.$message(response.data.msg)
                            }
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });

            },
            //新增支出弹窗
            addPay(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$refs.uploadPayFile.submit();
                        var date = new Date();
                        date.setTime(this.payForm.date * 1000);
                        var y = date.getFullYear();
                        var m = date.getMonth() + 1;
                        // m = m < 10 ? ('0' + m) : m;
                        var d = date.getDate();
                        // d = d < 10 ? ('0' + d) : d;
                        var h = date.getHours();
                        // h = h < 10 ? ('0' + h) : h;
                        var minute = date.getMinutes();
                        var second = date.getSeconds();
                        // minute = minute < 10 ? ('0' + minute) : minute;
                        this.account_time_year= y;
                        this.account_time_month= m;
                        this.account_time_day = d;
                        //支出
                        let formData = new FormData()
                        formData.append('project_id', this.$route.query.project_id);
                        formData.append('amount', this.payForm.money);
                        formData.append('date', this.payForm.dates / 1000);
                        formData.append('budget_id', this.budget_id);
                        formData.append('type', this.type);
                        formData.append('account_holder', this.payForm.names);
                        formData.append('account_time',this.payForm.date);
                        formData.append('account_time_year',this.account_time_year);
                        formData.append('account_time_month',this.account_time_month);
                        formData.append('account_time_day',this.account_time_day);
                        formData.append('operator_id',JSON.parse(localStorage.user_id));
                        formData.append('operator_name',this.operator_name);
                        formData.append('remark',this.payForm.address);
                        if(this.payForm.fileList){
                            this.payForm.fileList.forEach(file => {
                                formData.append('certificates', file.raw, file.raw.name); //此处一定是append file.raw 上传文件只需维护fileList file.raw.name要加上
                            })
                        }
                        axios({
                            method: 'post',
                            url: '/finance/flow/upsert',
                            data:formData,
                            headers:{
                                'Content-Type': 'multipart/form-data',
                                'Accept': '*/*',
                                'X-Requested-With': 'XMLHttpRequest'
                            },
                        }).then((response)=> {
                            if(response.data.msg=='ok'){
                                this.$message({
                                    message: '添加成功',
                                    type: 'success'
                                });
                                this.$nextTick( ()=> {
                                    this.payTableData.push(this.payForm);
                                });
                                this.financeList();
                                this.payDialog = false;
                            }else{
                                this.$message(response.data.msg)
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            //凭证列表
            certificateList(value){
                // value.a = !value.a;
                axios({
                    method: 'get',
                    url: '/finance/flow/certificate/list',
                    headers:{
                        'Content-Type': 'multipart/form-data',
                        'Accept': '*/*',
                        'X-Requested-With': 'XMLHttpRequest'
                    },
                    params: {
                        flow_id: value.flow_id,
                    }
                }).then((response)=> {
                    for (var i = 0; i< response.data.data.length; i++){
                        this.certificateLists = response.data.data;
                        // this.certificateLists.path = require(response.data.data.path);
                    }
                })
            },
            //新增凭证
            addCertificate(value){
              if(this.authId==1){
                let formData = new FormData();
                value.a = !value.a;
                if(this.addCertificateList){
                  this.addCertificateList.forEach(file => {
                    formData.append('certificate', file.raw, file.raw.name); //此处一定是append file.raw 上传文件只需维护fileList file.raw.name要加上
                  })
                  formData.append('flow_id',value.flow_id);
                  axios({
                    method: 'post',
                    url: '/finance/flow/certificate/add',
                    data: formData,
                    headers:{
                      'Content-Type': 'multipart/form-data',
                      'Accept': '*/*',
                      'X-Requested-With': 'XMLHttpRequest'
                    }
                  }).then((response)=> {
                    if(response.data.ret=='0'){

                    }else{
                      this.$message(response.data.msg);
                    }
                  })
                }
              }else{
                document.querySelector("#app").click();
                this.noAccess = true
              }

            },
            //预算项
            budgets(){
                axios({
                    method: 'get',
                    url: '/finance/budgets',
                    headers:{
                        'Content-type': 'application/x-www-form-urlencoded'
                    },
                    params: {
                        project_id: this.$route.query.project_id,
                    }
                }).then((response)=> {
                    if(response.data.ret=='0'){
                        // console.log(response);
                        this.budgetss = response.data.data;
                    }
                })
            },
            //收支列表
            financeList(){
                //收支列表
                axios({
                    method: 'get',
                    url: '/finance/flow/list',
                    headers:{
                        'Content-type': 'application/x-www-form-urlencoded'
                    },
                    params: {
                        project_id: this.$route.query.project_id,
                        type:this.type,
                        page_num:this.currentPage,
                        page_size:this.pageSize,
                    }
                }).then((response)=> {
                    if(response.data.ret=='0'){
                        this.totalPage = response.data.data.total;
                        // console.log(this.totalPage)
                        for (var i = 0; i < response.data.data.list.length ; i++) {
                            // this.tableData.push(response.data.data[i])
                            if(response.data.data.list[i].type == 1){
                                response.data.data.list[i].type = '支出'
                                this.payTableData = response.data.data.list;
                                // this.payTableData = response.data.data;
                                // this.payTableData[i].date = response.data.data[i].date / 1000;

                                var date = new Date();
                                date.setTime(response.data.data.list[i].account_time * 1000);
                                var y = date.getFullYear();
                                var m = date.getMonth() + 1;
                                m = m < 10 ? ('0' + m) : m;
                                var d = date.getDate();
                                d = d < 10 ? ('0' + d) : d;
                                var H = date.getHours();
                                H = H < 10 ? ('0' + H) : H;
                                var M = date.getMinutes();
                                M = M < 10 ? ('0' + M) : M;
                                var S = date.getSeconds();
                                S = S < 10 ? ('0' + S) : S;
                                y + '-' + m + '-' + d;

                                var dates = new Date();
                                dates.setTime(response.data.data.list[i].date * 1000);
                                var ys = dates.getFullYear();
                                var ms = dates.getMonth() + 1;
                                ms = ms < 10 ? ('0' + ms) : ms;
                                var ds = dates.getDate();
                                ds = ds < 10 ? ('0' + ds) : ds;
                                var Hs = dates.getHours();
                                Hs = Hs < 10 ? ('0' + Hs) : Hs;
                                var Ms = dates.getMinutes();
                                Ms = Ms < 10 ? ('0' + Ms) : Ms;
                                var Ss = dates.getSeconds();
                                Ss = Ss < 10 ? ('0' + Ss) : Ss;
                                y + '-' + m + '-' + d;

                                this.payTableData[i].date = ys + '-' + ms + '-' + ds;
                                this.payTableData[i].account_time = y + '-' + m + '-' + d;
                                // console.log(this.payTableData[i].account_time)
                                // console.log(this.payTableData)
                            }else if(response.data.data.list[i].type == 2){
                                response.data.data.list[i].type = '收入'
                                this.tableData = response.data.data.list;

                                var date = new Date();
                                date.setTime(response.data.data.list[i].account_time * 1000);
                                var y = date.getFullYear();
                                var m = date.getMonth() + 1;
                                m = m < 10 ? ('0' + m) : m;
                                var d = date.getDate();
                                d = d < 10 ? ('0' + d) : d;
                                var H = date.getHours();
                                H = H < 10 ? ('0' + H) : H;
                                var M = date.getMinutes();
                                M = M < 10 ? ('0' + M) : M;
                                var S = date.getSeconds();
                                S = S < 10 ? ('0' + S) : S;
                                y + '-' + m + '-' + d;

                                this.tableData[i].account_time = y + '-' + m + '-' + d;
                                // console.log(this.tableData)
                            }
                        }
                    }
                })
            },
            //总支出、总入账、余额
            statistics(){
                axios({
                    method: 'get',
                    url: '/finance/statistics',
                    headers:{
                        'Content-Type': 'multipart/form-data',
                        'Accept': '*/*',
                        'X-Requested-With': 'XMLHttpRequest'
                    },
                    params: {
                        project_id: this.$route.query.project_id,
                    }
                }).then((response)=> {
                    this.expanse_total = response.data.data.expanse_total;
                    this.income_total = response.data.data.income_total
                })
            },

        },
        mounted(){
            this.financeList();
            this.budgets();
            this.oaName();
            this.statistics();
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
        },
        filters:{
            changeTime: function (value) {
                var date = new Date();
                date.setTime(value * 1000);
                var y = date.getFullYear();
                var m = date.getMonth() + 1;
                m = m < 10 ? ('0' + m) : m;
                var d = date.getDate();
                d = d < 10 ? ('0' + d) : d;
                var H = date.getHours();
                H = H < 10 ? ('0' + H) : H;
                var M = date.getMinutes();
                M = M < 10 ? ('0' + M) : M;
                var S = date.getSeconds();
                S = S < 10 ? ('0' + S) : S;
                return y + '-' + m + '-' + d;

                return date;
            },
        },
    }
</script>
<style scoped>
    *{
        box-sizing: border-box;
    }

    #income{
        margin-top: 26px;
    }

    /*头部*/
    .incomeTopBox{
        /*display: flex;*/
        padding-left: 12px;
        width: 100%;
        align-items: center;
        padding-right: 20px;
        justify-content: space-between;
        height: 32px;
    }


    .incomeTopBox .incomeTopLeft .paging{
        position: fixed;
        bottom: 30px;
        left: 40%;
        transform: translate(-25%,-25%);
    }

    .incomeTopBox .incomeTopRight p{
        display: block;
        margin-right: 40px;
        font-size:12px;
        color:rgba(49,49,49,1);
        line-height: 24px;
        margin-bottom: 0px;
    }

    .incomeTopBox .incomeTopRight p span{
        color: #6A98FD;
        font-size:12px;
        line-height: 12px;
    }

    .incomeTopBox .incomeTopRight p:last-of-type span{
        color: #ED9515;
    }

    .incomeTopBox .incomeTopRight{
        display: flex;
        align-items: center;
        line-height: 24px;
        margin-top: 20px;
        /*margin-left: 30px;*/
        justify-content: flex-end;
        position: absolute;
        top: -62px;
        right: 0;
    }

    .incomeTopBox .incomeTopRight .incomeTopRightBox{
        float: right;
        display: flex;
        align-items: center;
    }

    .incomeTopBox .incomeTopRight .incomeTopRightBtn{
        width: 100px;
        height: 24px;
        margin: 0 20px;
        border-radius: 16px;
        font-size:12px;
        line-height: 24px;
        text-align: center;
        color:rgba(255,255,255,1);
        background:rgba(255,105,14,1);
        cursor: pointer;
    }

    .incomeTopBox .incomeTopRight .incomeTopRightBtns{
        width: 100px;
        height: 24px;
        margin-right: 20px;
        border-radius: 16px;
        font-size:12px;
        line-height: 24px;
        text-align: center;
        color:rgba(255,255,255,1);
        background:rgba(71,129,255,1);
        cursor: pointer;
    }

    .incomeTopBox .incomeTopRight .incomeTableSearch{
        width:186px;
    }

    .incomeTableBox{
        background: none;
        margin-top: 20px;
        overflow: visible;
    }

    .incomeTableBox .emptyBox{
        font-size: 69px;
        margin-top: 40px;
        line-height: 6;
    }

    .incomeTableBox .emptyBox .empytBoxTow{
        display: inline-flex;
        position: absolute;
        top: 62%;
        left: 50%;
        transform: translate(-48%,-25%);
    }

    .incomeTableBox .emptyBox .empytBoxTow .incomeEmptyBtns{
        color: rgba(71,129,255,0.6);
        cursor: pointer;
    }

    .incomeTableBox:before{
        display: none;
    }

    .incomeTableBox.el-table .incomeTableTag{
        width:50px;
        height:20px;
        background: rgba(71,129,255,0.6);
        border: none;
        color: #fff;
        line-height: 20px;
        text-align: center;
        border-radius:10px;
        margin-left: -10px;
    }

    .incomeTableBox.el-table .incomeTableCredentialsTag{
        margin-left: -10px;
    }

    .incomeTableBox .incomeTableIcon{
        font-size: 16px;
        color: #FF4302;
        cursor: pointer;
        margin-right: 24px;
    }

    .incomeTableBox .incomeTableIconEdit{
        font-size: 16px;
        color: #8887a2;
        cursor: pointer;
        margin-left: 16px;
        opacity: 0;
        transition: opacity 1s;
        line-height: 20px;
    }

    .incomeTableBox.el-table .incomeTableInput.incomeTableDatePicker{
        width: 160px;
    }

    .incomeTableBox.el-table .incomeTableInput{
        display: none;
    }

    .incomeTableBox.el-table .incomeTableTxt{
        /*width: 70%;*/
        overflow: hidden;
        display: inline-block;
        text-overflow: ellipsis;
        white-space:nowrap;
        line-height: 23px;
    }

    /*上传框*/
    .incomeTablePopover .uploadFile .incomeTableUpload{
        width:264px;
        height:73px;
        border:1px solid rgba(217,216,225,1);
        border-radius:4px;
    }

    .incomeTablePopover .uploadFile .incomeTableUpload p{
        font-size:12px;
        text-align: center;
        line-height: 12px;
        color:rgba(255,105,14,1);
        margin-top: 18px;
    }

    .incomeTablePopover .uploadFile .incomeTableUpload p:last-of-type{
        color: rgba(0,0,0,.6);
        margin-top: 14px;
    }

    .incomeTablePopover .uploadSubmitBox{
        width: 287px;
        height: 34px;
        margin-left: -10px;
        background:rgba(237,149,21,1);
        font-size:12px;
        text-align: center;
        line-height: 34px;
        color:rgba(255,255,255,1);
        border-radius: 0 0 4px 4px;
        margin-top: 30px;
        cursor: pointer;
    }

    /*收入弹框*/
    .incomeDialogBody{
        padding: 0 30px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }

    .incomeDialog .incomeForm{
        flex-shrink: 0;
        width: 200px;
        font-size:12px;
        color:rgba(102,102,102,1);
        margin: 20px 0 0;
    }

    .incomeDialog .incomeForm.incomeFormTop{
        margin-top: 0;
    }

    .incomeDialog .incomeForm.payFormLabel{
        margin-top: 0px;
    }

    .incomeDialog .incomeForm span{
        color: #FF4302;
        font-size: 12px;
        margin-right: 4px;
    }

    .incomeDialog .incomeForm .incomeFormDate{
        font-size: 12px;
        line-height: 60px;
        color: #666;
        margin-bottom: 0;
        position: absolute;
    }

    .incomeDialog .payForm .incomeFormDate{
        margin-top: 0;
    }

    .incomeDialog .incomeForm .incomeFormDate span{
        color: #333;
        font-size: 12px;
    }

    .incomeDialog .incomeUploadBox{
        width: 100%;
        margin: 30px 0;
    }

    .incomeForm.incomeUploadBox .incomeUploadTop{
        font-size:12px;
        color:#666666;
        height: 12px;
        line-height: 12px;
        position: relative;
        width: 100%;
        margin: 30px 0 20px;
    }

    .incomeForm.incomeUploadBox .incomeUploadTop .incomeUploadTopBorder{
        position: absolute;
        right: 0;
        top: 50%;
        width: 416px;
        height: 1px;
        background: rgba(180,180,180,0.2);
    }

    .incomeForm.incomeUploadBox .incomeTableUploadBox{
        width:150px;
        height:80px;
        background:rgba(245,245,247,1);
        border:1px solid rgba(217,216,225,1);
        border-radius:4px;
        margin-right: 20px;
    }

    .incomeForm.incomeUploadBox .incomeTableUploadBox p{
        font-size:12px;
        color:rgba(0,0,0,0.6);
        line-height: 12px;
        margin: 20px 0 16px;
    }

    .incomeForm.incomeUploadBox .incomeTableUploadBox p:last-of-type{
        margin: 0;
        color: rgba(255,105,14,1);
    }

    .incomeForm.incomeUploadBox .uploadFile{
        display: flex;
    }

    .incomeDialogFooter{
        height: 72px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        border-top: 1px solid rgba(180,180,180,0.2);
    }

    .incomeDialogFooter .incomeDialogFooterBtn{
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

    .incomeDialogFooter .incomeDialogFooterBtn:last-of-type{
        border-color: rgba(186,186,186,1);
        background: #fff;
        color: rgba(0,0,0,.8);
        margin-left: 36px;
    }

</style>
<style>
    /*顶部tab栏*/
    .incomeTopLeft .el-tabs__header,
    .incomeTopLeft .el-tabs__content{
        overflow: visible;
    }

    .incomeTopLeft .el-tabs__header{
        margin-bottom: 0;
    }

    .incomeTopLeft .el-tabs__nav-wrap::after,
    .incomeTopLeft .el-tabs__active-bar{
        display: none;
    }

    .incomeTopLeft .el-tabs__nav{
        height: 20px;
    }

    .incomeTopLeft .el-tabs__item{
        border-right: 1px solid #909399;
        height: 20px;
        line-height: 20px;
        color: #909399;
        font-size: 14px;
    }

    .incomeTopLeft .el-tabs__item:last-of-type{
        border-right: none;
    }

    .incomeTopLeft .el-tabs__item:hover{
        color: #333;
    }

    .incomeTopLeft .el-tabs__item.is-active{
        color: #ed9515;
    }

    .incomeTopLeft .el-tabs__nav-scroll{
        /*margin-left: 30px;*/
    }

    /*头部输入框*/
    .incomeTopBox .incomeTopRight .incomeTableSearch .el-input__inner{
        width:186px;
        height:24px;
        border:1px solid rgba(136,135,162,0.4);
        border-radius:16px;
        font-size: 12px;
        padding-left: 35px;
        background: none;
    }

    .incomeTopBox .incomeTopRight .incomeTableSearch .el-input__inner::-webkit-input-placeholder{/*Webkit browsers*/
        color:rgba(171,171,172,1);
    }
    .incomeTopBox .incomeTopRight .incomeTableSearch .el-input__inner:-moz-placeholder{/*Mozilla Firefox 4 to 8*/
        color:rgba(171,171,172,1);
    }
    .incomeTopBox .incomeTopRight .incomeTableSearch .el-input__inner::moz-placeholder{/*Mozilla Firefox 19+*/
        color:rgba(171,171,172,1);
    }
    .incomeTopBox .incomeTopRight .incomeTableSearch .el-input__inner:-ms-input-placeholder{/*Internet Explorer 10+*/
        color:rgba(171,171,172,1);
    }

    .incomeTopBox .incomeTopRight .incomeTableSearch .el-input__prefix{
        left: 10px;
    }

    .incomeTopBox .incomeTopRight .incomeTableSearch .el-input__icon{
        line-height: 24px;
        color: #545455;
    }

    /*表格*/
    .incomeTableBox.el-table tr,
    .incomeTableBox.el-table th{
        background: none;
    }

    .incomeTableBox.el-table td{
        padding: 12px 0;
        height: 24px;
        color: rgba(98,98,99,1);
        border-color: rgba(226,226,233,1);
    }

    .incomeTableBox.el-table td:hover .incomeTableIconEdit{
        opacity: 1;
    }

    .incomeTableBox.el-table .has-gutter th{
        font-size: 12px;
        font-weight: normal;
        color: #000;
        padding: 16px 0;
        border-color: rgba(226,226,233,1);
    }

    .incomeTableBox.el-table .el-checkbox__inner{
        width: 16px;
        height: 16px;
        border-color: rgba(136,135,162,1);
        background: none;
    }

    .incomeTableBox.el-table .el-checkbox__input.is-checked .el-checkbox__inner,
    .incomeTableBox.el-table .el-checkbox__input.is-indeterminate .el-checkbox__inner{
        background: rgba(255,105,14,1);
        border-color: rgba(255,105,14,1);
    }

    .incomeTableBox.el-table .el-checkbox__input.is-checked .el-checkbox__inner::after{
        top: 2px;
        left: 5px;
    }

    .incomeTableBox.el-table .el-checkbox__input.is-indeterminate .el-checkbox__inner::before{
        top: 6px;
    }

    .incomeTableBox.el-table td .current-cell .incomeTableInput{
        display: block;
    }

    .incomeTableBox.el-table td .current-cell .incomeTableTxt,
    .incomeTableBox.el-table td .current-cell i{
        display: none!important;
    }

    .incomeTableBox.el-table td .cell{
        height: 24px;
        display: flex;
        align-items: center;
    }

    .incomeTableBox.el-table .incomeTableInput .el-input__inner{
        background: none;
        height:24px;
        border:1px solid rgba(136,135,162,0.4);
        margin-left: -8px;
        padding-left: 8px;
        font-size: 12px;
    }

    /*日期选择器格式*/
    .incomeTableBox.el-table .incomeTableInput.incomeTableDatePicker .el-input__inner{
        padding-left: 25px;
    }

    .incomeTableBox.el-table .incomeTableInput.incomeTableDatePicker .el-input__prefix{
        left: -6px;
    }

    .incomeTableBox.el-table .incomeTableInput.incomeTableDatePicker .el-input__suffix{
        right: 8px;
    }

    .incomeTableBox.el-table .incomeTableInput.incomeTableDatePicker .el-input__prefix .el-input__icon,
    .incomeTableBox.el-table .incomeTableInput.incomeTableDatePicker .el-input__suffix .el-input__icon{
        line-height: 24px;
    }

    /*标签*/
    .incomeTableBox.el-table .incomeTableTag.el-tag--primary{
        background:rgba(255,105,14,0.6);
    }

    /*上传凭证*/
    .incomeTablePopover{
        padding: 12px 10px 0;
    }

    .incomeTablePopover .incomeTableUploadHr{
        position: absolute;
        width: 282px;
        height: 1px;
        left: 2px;
        top: 100px;
        background: rgba(180,180,180,0.2);
    }

    .incomeTablePopover .certificateList{
        width: 282px;
        height: auto;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        margin-top: 20px;
    }

    .incomeTablePopover .certificateList .listToDo{
        width: 80px;
        height: 50px;
        margin-top: 10px;
        border: 1px solid #D9D8E1;
        border-radius: 4px;
        position: relative;
        margin-right: 12px;
    }

    .incomeTablePopover .certificateList .listToDo img{
        width: 100%;
        height: 100%;
    }

    .incomeTablePopover .certificateList .listToDo .bottomBox{
        width: 80px;
        height: 18px;
        display: block;
        z-index: 2;
        opacity: 1;
        bottom: 0;
        right: 0;
        position: absolute;
        text-align: center;
        background:rgba(63,62,106,0.8);
        color: #fff;
        line-height: 18px;
        font-size: 10px;
        opacity: 0;
        transition: opacity 1s;
        cursor: pointer;
    }

    .incomeTablePopover .certificateList .listToDo .bottomBox:hover{
        opacity: 1;
    }

    .incomeTablePopover .el-upload-list{
        /*display: flex;*/
        flex-wrap: wrap;
        margin-top: 20px;
        display: none;
    }

    .incomeTablePopover .el-upload-list .el-upload-list__item{
        width:80px;
        height:50px;
        border-radius:4px;
        padding: 0;
        margin-right: 12px;
    }

    .incomeTablePopover .el-upload-list .el-upload-list__item:nth-of-type(3n){
        margin-right: 0;
    }

    .incomeTablePopover .el-upload-list--picture .el-upload-list__item-thumbnail{
        width: 80px;
        height: 50px;
        float: none;
        margin-left: 0;
        z-index: 0;
    }

    .incomeTablePopover .el-upload-list--picture .el-upload-list__item-name,
    .incomeTablePopover .el-upload-list__item.is-success .el-upload-list__item-status-label{
        display: none;
    }

    .incomeTablePopover .el-upload-list--picture .el-icon-close{
        width: 80px;
        height: 18px;
        display: block;
        z-index: 2;
        opacity: 1;
        top: 32px;
        right: 0;
        text-align: center;
        background:rgba(63,62,106,0.8);
        color: #fff;
        line-height: 18px;
        font-size: 10px;
        opacity: 0;
        transition: opacity 1s;
    }

    .incomeTablePopover .el-upload-list__item:hover .el-icon-close{
        opacity: 1;
    }

    /*收入弹框*/
    .incomeDialog .incomeForm .el-form-item__content{
        line-height: normal;
        font-size: 12px;
    }

    .incomeDialog .el-dialog__header{
        padding: 20px 30px 10px;
    }

    .incomeDialog .el-dialog__title{
        font-size: 14px;
    }

    .incomeDialog .el-dialog .el-dialog__header .el-dialog__headerbtn{
        right: 30px;
    }

    .incomeDialog .el-dialog .el-dialog__header .el-dialog__headerbtn .el-dialog__close{
        font-size: 16px;
    }

    .incomeDialog .el-dialog__body{
        padding: 0;
    }

    .incomeDialog .incomeForm .incomeFormInput .el-input__inner{
        border: none;
        border-radius: 0;
        border-bottom: 1px solid rgba(210,210,210,.6);
        font-size:12px;
        height: 30px;
        line-height: 30px;
        padding-left: 9px;
    }

    .incomeDialog .incomeForm .incomeFormInputBorder .el-input__inner{
        border: 1px solid rgba(210,210,210,.6);
        border-radius: 4px;
        height: 32px;
        width: 150px;
        font-size:12px;
        color:rgba(63,62,106,1);
        margin-top: 8px;
        padding-left: 32px;
    }

    .incomeDialog .incomeForm .incomeFormInputBorder .el-textarea__inner{
        border: 1px solid rgba(210,210,210,.6);
        border-radius: 4px;
        height: 50px;
        font-size:12px;
        color:rgba(63,62,106,1);
        margin-top: 8px;
        padding-left: 12px;
        background: rgba(245,245,247,1);
    }


    .incomeDialog .incomeForm .incomeFormInputBorder .el-textarea__inner:focus{
        background: #fff;
        border-color: rgba(255,105,14,1);
    }

    .incomeDialog .incomeForm .incomeFormInput .el-input__inner:focus{
        border-color: rgba(255,105,14,1);
    }

    .incomeDialog .incomeForm .incomeFormInputBorder .el-input__prefix{
        height: 32px;
        top: 8px;
        left: 12px;
    }

    .incomeDialog .incomeForm .incomeFormInputBorder .el-input__prefix .iconfont{
        line-height: 32px;
        color:rgba(63,62,106,1);
        font-size: 14px;
    }

    .incomeDialog .incomeUploadBox .uploadFile .el-upload-list__item{
        margin-top: 8px;
    }

    .incomeDialog .incomeUploadBox .uploadFile .el-upload-list__item-name{
        font-size: 12px;
        line-height: 16px;
        max-width: 286px;
    }

    .incomeDialog .incomeUploadBox .uploadFile .el-upload-list__item .el-icon-close{
        top: 2px;
    }

    .incomeDialog .incomeUploadBox .uploadFile .el-upload-list__item:hover .el-upload-list__item-name,
    .incomeDialog .incomeUploadBox .uploadFile .el-upload-list__item:hover .el-upload-list__item-name i{
        color: rgba(255,67,2,1);
    }

    /*支出弹框   日期选择*/
    .incomeDialog .incomeForm .el-date-editor .el-input__prefix{
        left: unset;
        right: 0;
    }

    .incomeDialog .incomeForm .el-date-editor .el-icon-date{
        line-height: 34px;
        color:rgba(63,62,106,1);
    }

    .incomeDialog .incomeForm .el-select .el-input .el-select__caret{
        line-height: 28px;
    }

    /*按钮*/
    .incomeTopBox .incomeTopLeft .incomeTableBox .el-button{
        height: 20px !important;
        line-height: 18px !important;
        width: 50px !important;
        text-align: center !important;
        padding: 0 0 !important;
    }

    .incomeTopBox .incomeTopLeft .incomeTableBox .el-button span{
        font-size: 10px !important;
    }
</style>
