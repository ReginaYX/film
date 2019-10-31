<template>
    <div class="reportForm">
        <div class="reportFormCont">
            <el-row class="title">
                <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6" class="titleBox">
                    <div class="reportFormIcon">
                        <i class="iconfont iconyusuanzijinbofu icontStyle"></i>
                    </div>
                    <div class="titleLeft">
                        <span class="titleOne">总预算</span>
                        <div class="titleLeftBox">
                            <div class="titleTwo">￥{{budget_total}}.00</div>
                            <div id="titleThr" class="titleLine" style="margin-left: 10px"></div>
                        </div>

                    </div>
                </el-col>
                <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6" class="titleBox">
                    <div class="reportFormIcon">
                        <i class="iconfont iconyue icontStyle"></i>
                    </div>
                    <div class="titleLeft">
                        <span class="titleOne titlePay">总支出</span>
                        <div class="titleLeftBox">
                            <div class="titleTwo totalPay">￥{{expanse_total}}.00</div>
                            <!--<div id="titleThrOff" class="titleLine" style=""></div>-->
                            <div id="payOff"  style="width: 200px;height: 100px"></div>
                        </div>

                    </div>
                </el-col>

                <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6" class="titleBox">
                    <div class="reportFormIcon">
                        <i class="iconfont iconcunqianguan icontStyle"></i>
                    </div>
                    <div class="titleLeft">
                        <span class="titleOne titleImcome">总收入</span>
                        <div class="titleLeftBox">
                            <div class="titleTwo totalImcome">￥{{income_total}}.00</div>
                            <!--<div id="titleThrIncome" class="titleLine" style=""></div>-->
                            <div id="incomes"   style="width: 200px;height: 100px"></div>
                        </div>

                        <!--<div class="titleFour">-->
                            <!--预警值：-->
                            <!--<span class="warnings">￥{{warning}}</span>-->
                        <!--</div>-->
                    </div>
                </el-col>

                <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6" class="titleBox">
                    <div class="reportFormIcon">
                        <i class="iconfont iconzhichu icontStyle"></i>
                    </div>
                    <div class="titleLeft">
                        <span class="titleOne">资金余额</span>
                        <div class="titleLeftBox">
                            <div class="titleTwo">￥{{diff}}.00</div>
                            <div id="titleThrTotal" class="titleLine" style=""></div>
                        </div>

                    </div>
                </el-col>
            </el-row>
            <el-row class="middleOne">
              <div class="boxTitle" style="margin-bottom: 0px">预算支出</div>
                <el-col :xs="18" :sm="18" :md="18" :lg="18" :xl="18" class="middleLeft">
                    <div id="leftChart" style="width: 100%;height: 270px"></div>
                </el-col>
                <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6" class="middleRight">
                  <div class="boxTitle" style="margin: -20px 0 0 0">详情</div>
                  <el-card class="box-card" shadow="never" style="border: none;">
                        <div  class="listLeft">
                            <div v-for="(item, index) in categoryX" :key="index" style="font-size: 12px">
                                {{item}}
                            </div>
                        </div>

                        <div v-for="(item, index) in categoryAmountData" :key="index" class="listRight">
                             ￥{{item}}.00
                        </div>
                    </el-card>
                </el-col>
            </el-row>
            <el-row class="middleTwo">

                <el-col :xs="14" :sm="14" :md="14" :lg="14" :xl="14"  class="middleTwoRight">
                    <div class="boxTitles">预算占比</div>
                    <!--旭日图-->
                    <div  v-if="this.empytOne == true" class="emptyBox" style="z-index: 999999999">
                        <router-link  :to="{path: '/details/budget?play_id='+this.$route.query.play_id+'&project_id='+this.$route.query.project_id}" >
                            <i class="iconfont iconwushuju1" style="color: #909399"></i><br/>
                            <div class="empytBoxTow" style="color: #909399">暂无数据请添加预算</div>
                            <!--<span>暂无数据</span>-->
                        </router-link>
                    </div>
                    <div id="main" style="width: 530px;height: 500px;"></div>

                </el-col>
                <el-col :xs="10" :sm="10" :md="10" :lg="10" :xl="10" class="middleTwoRightBox">
                    <template>
                        <el-table
                                :data="budget.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
                                size="mini"
                                style="width: 100%;margin-top: 40px">
                            <div slot="empty" class="emptyBox">
                                <router-link  :to="{path: '/details/budget?play_id='+this.$route.query.play_id+'&project_id='+this.$route.query.project_id}" >
                                    <i class="iconfont iconwushuju1"  style="color: #909399"></i><br/>
                                    <div class="empytBoxTow">暂无数据请<div class="incomeEmptyBtns">添加预算</div></div>
                                    <!--<span>暂无数据</span>-->
                                </router-link>
                            </div>
                            <el-table-column
                                    prop="color"
                                    label="颜色">
                                <template slot-scope="scope">
                                    <div slot="reference" class="name-wrapper">
                                        <div class="colorBox" :style="'background:'+scope.row.color"></div>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="budget_name"
                                    label="细目">
                            </el-table-column>
                            <el-table-column
                                    prop="ratio"
                                    label="占比">
                            </el-table-column>
                            <el-table-column
                                    prop="collect"
                                    label="金额(元）">
                                <template slot-scope="scope">
                                <span >{{ scope.row.collect}}.00</span>
                                </template>
                            </el-table-column>
                        </el-table>
                    </template>
                    <!--分页-->
                    <el-pagination
                            class="paging"
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="currentPage"
                            :page-size=pageSize
                            layout="prev, pager, next"
                            :total=totalPage>
                    </el-pagination>
                </el-col>
            </el-row>
            <el-row class="buttonBox">
                <div class="boxTitle"  style="margin-bottom: 0px">支出图表</div>

                <div id="spend" style="width: 100%;height: 310px"></div>
            </el-row>
        </div>
    </div>
</template>

<script>
    import echarts from 'echarts'
    import axios from "axios"
    export default {
        name: "reportForm",
        data(){
            return {
                totalBudget:'',//总预算
                charts: '',
                chartsTwo: '',
                chartsThr: '',
                drawPieCharts:'',
                incomesCharts:'',
                payOffCharts:'',
                warringLineChartsTwo:'',
                totalWarringLineChartsTwo:'',
                incomeWarringLineChartsTwo:'',
                offWarringLineChartsTwo:'',
                actualData:[18000] ,//实际值
                budget_total:[],//总预算
                diff:[],//总余额
                income_total:[],//总收入
                expanse_total:[],//总支出
                warningData:[] ,//预警值
                warning:'20000' ,//预警值
                warringLineData:[],
                opinion:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎'],
                opinionData:[],
                categoryOpinion:['预算','支出',],
                categoryX:[],
                categoryDudgetData:[],
                categoryAmountData:[],
                spendData:[],//全部支出值
                spendDataDate:[],//全部支出值时间
                spendPayDate:'',//支出值时间
                incomeData:[],//全部收入值
                tableData: [],
                totalPage:0,//总页数
                pageSize:8,//每页显示条数
                currentPage: 1,//当前页数
                budget:[],//总预算
                empytOne:true,//旭日空
                empytTwo:'',//底部日空
            }
        },
        methods: {
            //分页
            handleSizeChange(val){
                this.pageSize = val;
                this.currentPage = 1;
            },
            handleCurrentChange(val){
                this.currentPage = val;
            },
            //总预算
            warringLine(id){
                var that = this;
                this.warringLineChartsTwo = echarts.init(document.getElementById(id));
                this.warringLineChartsTwo.setOption({
                    tooltip: {
                        trigger: 'axis',
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    legend: {
                        show:false
                        // data: ['实际值', '预警标准','总预算'],
                    },
                    grid: {
                        left: '-20%',
                        right: '4%',
                        top: '100%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        show:false,
                        type: 'value',
                    },
                     yAxis: {
                        show:false,
                        type: 'category',
                        // name: '数量',
                    },
                    // series:this.warringLineData,
                    series:[
                        {
                            name: '总预算',
                            type: 'bar',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'insideRight'
                                }
                            },
                            // data: this.totalBudget,
                            data: [this.budget_total],
                            itemStyle: {
                                normal: {
                                    color: '#6A98FD'
                                }
                            }
                        }
                    ],
                })
            },
            //资金总额
            totalWarringLine(id){
                var that = this;
                this.totalWarringLineChartsTwo = echarts.init(document.getElementById(id));
                this.totalWarringLineChartsTwo.setOption({
                    tooltip: {
                        trigger: 'axis',
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    legend: {
                        show:false
                        // data: ['实际值', '预警标准','总预算'],
                    },
                    grid: {
                        left: '-20%',
                        right: '4%',
                        top: '100%',
                         bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        show:false,
                        type: 'value',
                    },
                     yAxis: {
                        show:false,
                        type: 'category',
                        // name: '数量',
                    },
                    // series:this.warringLineData,
                    series:[
                        {
                            name: '实际值',
                            type: 'bar',
                            // tooltip:{show:false},
                            label: {
                                normal: {
                                    show: true,
                                    position: 'insideRight'
                                }
                            },
                            itemStyle: {
                                normal: { //这里必须加normal,否者不显示夜色变化
                                    // color: '#6A98FD',
                                    color: function(params) {//超过预警值显示红色
                                        if (that.diff <= that.warningData) {
                                            return 'red';
                                        } else {
                                            return '#6A98FD';
                                        }
                                    }
                                }
                            },
                            // data: [8] ,//实际值
                            data: [this.diff],
                        },
                    ],
                })
            },
            //总收入
            incomeWarringLine(id){
                var that = this;
                this.incomeWarringLineChartsTwo = echarts.init(document.getElementById(id));
                this.incomeWarringLineChartsTwo.setOption({
                    tooltip: {
                        trigger: 'axis',
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    legend: {
                        show:false
                        // data: ['实际值', '预警标准','总预算'],
                    },
                    grid: {
                        left: '-20%',
                        right: '4%',
                        top: '100%',
                         bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        show:false,
                        type: 'value',
                    },
                     yAxis: {
                        show:false,
                        type: 'category',
                        // name: '数量',
                    },
                    // series:this.warringLineData,
                    series:[
                        {
                            name: '实际值',
                            type: 'bar',
                            // tooltip:{show:false},
                            label: {
                                normal: {
                                    show: true,
                                    position: 'insideRight'
                                }
                            },
                            itemStyle: {
                                normal: { //这里必须加normal,否者不显示夜色变化

                                    color: '#6A98FD'

                                }
                            },
                            // data: [8] ,//实际值
                            data: [this.income_total],
                        },

                    ],
                })
            },
            //总支出
            offWarringLine(id){
                var that = this;
                this.offWarringLineChartsTwo = echarts.init(document.getElementById(id));
                this.offWarringLineChartsTwo.setOption({
                    tooltip: {
                        trigger: 'axis',
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    legend: {
                        show:false,
                        data: ['实际值', '预警标准','总预算'],
                    },
                    grid: {
                        left: '10%',
                        right: '4%',
                        top: '100%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        show:false,
                        type: 'value',
                    },
                     yAxis: {
                        show:false,
                        type: 'category',
                    },
                    series:[
                        {
                            name: '预警标准',
                            type: 'line',
                            symbol:'arrow',
                            label: {
                                normal: {

                                    position: 'insideRight'
                                }
                            },
                            data: [this.warningData],
                            itemStyle: {
                                normal: {
                                    color: '#ED9515'
                                }
                            }
                        },

                        {
                            name: '实际值',
                            type: 'bar',
                            data: [this.expanse_total],
                            stack: '总量',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'insideRight'
                                }
                            },
                            itemStyle: {
                                normal: { //这里必须加normal,否者不显示夜色变化
                                    // color: '#6A98FD',
                                    color: function(params) {//超过预警值显示红色
                                        if (that.expanse_total > that.warningData) {
                                            return 'red';
                                        } else {
                                            return '#6A98FD';
                                        }
                                    }
                                }
                            },
                        },
                        {
                            name: '总预算',
                            type: 'bar',
                            stack: '总量',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'insideRight'
                                }
                            },
                            data: [this.budget_total],
                            itemStyle: {
                                normal: {
                                    color: '#6A98FD'
                                }
                            }
                        },

                    ],
                })
            },
            //旭日图
            drawPie(id){
                var that = this;
                this.drawPieCharts = echarts.init(document.getElementById(id));
                window.onresize = this.drawPieCharts.resize;
                this.drawPieCharts.setOption({
                    title: {
                        textStyle: {
                            fontSize: 14,
                            align: 'center'
                        },

                    },
                    series: [
                        {
                            type: 'sunburst',
                            highlightPolicy: 'ancestor',
                            radius: [0, '95%'],
                            sort: null,
                            //鼠标悬停显示，旭日图的{d}百分比 显示不出来
                            tooltip: {
                                trigger: 'item',
                                formatter: "{b}: {c}"
                            },
                            levels: [{}, {
                                r0: '15%',
                                r: '40%',
                                itemStyle: {
                                    borderWidth: 2
                                },
                                label: {
                                    // rotate: 'tangential'
                                }
                            }, {
                                r0: '40%',
                                r: '69%',
                                label: {
                                    align: 'right'
                                }
                            }, {
                                r0: '69%',
                                r: '77%',
                                label: {
                                    position: 'outside',
                                    padding: 3,
                                    silent: false,
                                    fontSize:12,
                                    fontFamily:'Microsoft YaHei',
                                },
                                itemStyle: {
                                    borderWidth: 3
                                },

                            }],
                            downplay:{
                                show:true
                            },
                            data:this.opinionData,
                        }
                    ]
                })
            },
            incomes(id){
                this.incomesCharts = echarts.init(document.getElementById(id));
                // 使用刚指定的配置项和数据显示图表。
                window.onresize = this.incomesCharts.resize;
                this.incomesCharts.setOption({
                    xAxis: {
                        show:false,
                        type: 'category',
                        data: []
                    },
                    yAxis: {
                        show:false,
                        type: 'value'
                    },
                    series: [
                        {
                            data: this.incomeData,
                            type: 'line',
                            smooth: true,
                            symbol:'none',
                            itemStyle: {
                                normal: {
                                    color: '#FF690E'
                                }
                            },
                            areaStyle: {
                                normal: {
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: '#FF690E'
                                    }, {
                                        offset: 1,
                                        color: '#ffe'
                                    }])
                                }
                            },
                        }
                    ]
                })
            },
            payOff(id){
                this.payOffCharts = echarts.init(document.getElementById(id))
                this.payOffCharts.setOption({
                    xAxis: {
                        show:false,
                        type: 'category',
                        data: []
                    },
                    yAxis: {
                        show:false,
                        type: 'value'
                    },
                    series: [
                        {
                            data: this.spendData,
                            type: 'line',
                            smooth: true,
                            symbol:'none',
                            itemStyle: {
                                normal: {
                                    color: '#6A98FD'
                                }
                            },
                            areaStyle: {
                                normal: {
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: '#6A98FD'
                                    }, {
                                        offset: 1,
                                        color: '#ffe'
                                    }])
                                }
                            },
                        }
                    ]
                })
            },
            //预算支出
            category(id){
                this.chartsTwo = echarts.init(document.getElementById(id));
                // 使用刚指定的配置项和数据显示图表。
                window.onresize = this.chartsTwo.resize;
                this.chartsTwo.setOption({
                    tooltip : {
                        trigger: 'axis',
                            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                            }
                        },
                        legend: {
                            data:this.categoryOpinion
                        },
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                        xAxis : [
                            {
                                type : 'category',
                                data : this.categoryX,
                                axisLabel: {
                                    // rotate: -60, // 旋转角度
                                    interval: 0,  //设置X轴数据间隔几个显示一个，为0表示都显示
                                    formatter:function(value){
                                        var index = 10;
                                        var newstr = '';
                                        for(var i=0;i<value.length;i+=index){
                                            var tmp=value.substring(i, i+index);
                                            newstr+=tmp+'\n';
                                        }
                                        if( newstr.length > 4)
                                            return newstr.split("").join("\n").substring(0,8) + '...';
                                        else
                                            return newstr.split("").join("\n");
                                    }
                                },
                            },
                        ],

                        yAxis : [
                            {
                                type : 'value'
                            }
                        ],
                        //设置柱状图大小
                        barWidth : 12,
                    series:[
                        {
                            name:'预算',
                            type:'bar',
                            data:this.categoryDudgetData,
                            itemStyle: {
                                normal: {
                                    color: '#ED9515'
                                }
                            },
                        },
                        {
                            name:'支出',
                            type:'bar',
                            data:this.categoryAmountData,
                            itemStyle: {
                                normal: {
                                    color: '#6A98FD'
                                }
                            }
                        },
                    ],
                })
            },
            //最下方支出图表
            spend(id){
                this.chartsThr = echarts.init(document.getElementById(id));
                // 使用刚指定的配置项和数据显示图表。
                window.onresize = this.chartsThr.resize;
                this.chartsThr. setOption({
                    tooltip: {
                        trigger: 'axis',
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    legend: {
                        data:['支出']
                    },
                    xAxis : [
                        {
                            // show:false,
                            type: 'category',
                            data:this.spendDataDate,
                            axisLabel: {
                                formatter: '{value} /时间'
                            },

                        },
                    ],
                    yAxis : [
                        {
                            type : 'value',
                            axisLabel: {
                                formatter: '{value} /元'
                            },
                        }
                    ],
                    series:[
                        {
                            name: '支出',
                            data: this.spendData,
                            type: 'line'
                        }
                    ]
                })
            },

        },
        mounted(){

            //总预算接口
            axios.get('/finance/budget/total', {
                params: {
                    project_id: this.$route.query.project_id
                }
            }).then((response)=> {
                this.budget = response.data.data.budgets;
                // console.log(this.budget)

            })

            //收支列表
            axios({
                method: 'get',
                url: '/finance/flow/list',
                headers:{
                    'Content-Type': 'multipart/form-data',
                    'Accept': '*/*',
                    'X-Requested-With': 'XMLHttpRequest'
                },
                params: {
                    project_id: this.$route.query.project_id,
                }
            }).then((response)=> {
                if (response.data.data == ''){
                    this.empytTwo = true
                }
                this.tableData = response.data.data;

                for (var i = 0; i < response.data.data.length;i++){
                    if (response.data.data[i].type == 1){
                        this.spendData.push(response.data.data[i].amount);

                        //底部图标X轴时间转换
                        var date = new Date();
                        date.setTime(response.data.data[i].account_time * 1000);
                        var y = date.getFullYear();
                        var m = date.getMonth() + 1;
                        // m = m < 10 ? ('0' + m) : m;
                        var d = date.getDate();
                        // d = d < 10 ? ('0' + d) : d;
                        var h = date.getHours();
                        // h = h < 10 ? ('0' + h) : h;
                        var minute = date.getMinutes();
                        var second = date.getSeconds();

                        this.spendDataDate.push(y + '-' + m + '-' + d );
                        this.tableData[i].category = '支出';
                    }else if (response.data.data[i].type == 2) {
                        this.incomeData.push(response.data.data[i].amount);
                    }
                }
                this.spend('spend');
                this.incomes('incomes');
                this.payOff('payOff');
            });

            //报表总计（顶部）
            axios({
                method: 'get',
                url: '/finance/report/total',
                headers:{
                    'Content-Type': 'multipart/form-data',
                    'Accept': '*/*',
                    'X-Requested-With': 'XMLHttpRequest'
                },
                params: {
                    project_id: this.$route.query.project_id,
                }
            }).then((response)=> {
                this.budget_total = response.data.data.budget_total;
                this.warningData = this.budget_total * 0.8;
                this.diff = response.data.data.diff;
                this.expanse_total = response.data.data.expanse_total;
                this.income_total = response.data.data.income_total;
                this.warringLine('titleThr');
                this.totalWarringLine('titleThrTotal');

            });

            //报表预算比例，旭日图
            axios({
                method: 'get',
                url: '/finance/report/budget_percent',
                headers:{
                    'Content-Type': 'multipart/form-data',
                    'Accept': '*/*',
                    'X-Requested-With': 'XMLHttpRequest'
                },
                params: {
                    project_id: this.$route.query.project_id,
                }
            }).then((response)=> {
                this.opinionData = response.data.data;
                this.totalPage = response.data.data.length;
                for (var i = 0; i <response.data.data.length;i++){

                    if ( response.data.data[i].value !== 0 ){
                        this.empytOne = false;
                        // console.log(this.empytOne);
                        this.drawPie('main');
                        return
                    }
                    for (var j = 0; j < response.data.data[i].children.length; j++){

                        if (response.data.data[i].children[j].value !== 0 ){
                            this.empytOne = false;
                            console.log(this.empytOne);
                            this.$nextTick(()=>{
                                this.drawPie('main');
                            })
                            return
                        }

                        for (var o = 0; o < response.data.data[i].children[j].children.length; o++){
                            if (response.data.data[i].children[j].children[o].value !== 0){
                                this.empytOne = false;
                                console.log(this.empytOne);
                                this.$nextTick(()=>{
                                    this.drawPie('main');
                                })
                                return
                            }
                        }
                    }
                }


            });

            //报表预算收支
            axios({
                method: 'get',
                url: '/finance/report/budget_expanse',
                headers:{
                    'Content-Type': 'multipart/form-data',
                    'Accept': '*/*',
                    'X-Requested-With': 'XMLHttpRequest'
                },
                params: {
                    project_id: this.$route.query.project_id,
                }
            }).then((response)=> {
                this.categoryDudgetData = response.data.data.budget;
                this.categoryAmountData = response.data.data.expanse;
                this.categoryX = response.data.data.name;
                this.category('leftChart');
            });

            //报表支出图标

            window.addEventListener("resize", () => { this.chartsThr.resize();});

            window.addEventListener("resize", () => { this.chartsTwo.resize();});

            window.addEventListener("resize", () => { this.drawPieCharts.resize();});
            window.addEventListener("resize", () => { this.incomesCharts.resize();});
            window.addEventListener("resize", () => { this.payOffCharts.resize();});
            window.addEventListener("resize", () => { this.warringLineChartsTwo.resize();});
            window.addEventListener("resize", () => { this.totalWarringLineChartsTwo.resize();});

            this.$nextTick(function() {
                this.warringLine('titleThr');
                this.totalWarringLine('titleThrTotal');

                this.incomes('incomes');
                this.payOff('payOff');
                this.drawPie('main');
                this.category('leftChart');
                this.spend('spend');
            });


        },
        watch:{

        }
    }

</script>

<style>
    @media screen and (max-width: 1400px){
        .reportForm .reportFormCont .title .titleBox .titleLeft #titleThrOff canvas{
            left: -30px!important;
        }
        .reportForm .reportFormCont .title .titleBox #titleThrIncome canvas,
        .reportForm .reportFormCont .title .titleBox #titleThrTotal canvas{
            left: -30px!important;
        }
    }

</style>

<style scoped>
    .reportForm{
        padding: 26px 20px 0px 12px;
    }

    .reportForm .reportFormCont{

    }

    .reportForm .reportFormCont .boxTitle{
        margin: 20px 20px 30px 20px;
        font-size:14px;
        font-family:MicrosoftYaHei;
        font-weight:700;
        color:rgba(49,49,49,1);
    }

    .reportForm .reportFormCont .boxTitles{
        font-size:14px;
        font-family:MicrosoftYaHei;
        font-weight:700;
        color:rgba(49,49,49,1);
        position: absolute;
        top: 20px;
        left: 20px;
    }

    .reportForm .reportFormCont .title{
        display: flex;
        border: 1px solid rgba(233, 233, 233, 1);
        border-radius: 4px;
        background-color: #ffffff;
    }

    .reportForm .reportFormCont .title .titleBox{
        width: 22.2%;
        height: 90px;
        margin: 12px 30px 12px 0;
        padding-left: 20px;
        border-left: 1px solid #E5E5E5;
        display: flex;
        align-items: center;
    }

    .reportForm .reportFormCont .title .titleBox:first-child{
        border: none;
        padding-left: 20px;
    }

    .reportForm .reportFormCont .title .titleBox .reportFormIcon{
        width:60px;
        height:60px;
        background:#FFE1CF;
        border-radius:50%;
        flex-shrink: 0;
        margin-right: 20px;

    }

    .reportForm .reportFormCont .title .titleBox .reportFormIcon .icontStyle{
        color: #FF690E;
        font-size: 40px;
        text-align: center;
        line-height: 60px;
        padding-left: 9px;
    }

    .reportForm .reportFormCont .title .titleBox .titleLeft{
        /*float: left;*/
    }

    .reportForm .reportFormCont .title .titleBox .titleLeft .titleOne{
        display: block;
        font-size:12px;
        font-family:MicrosoftYaHei;
        font-weight:400;
        color:rgba(102,102,102,1);
        opacity:0.8;
        margin-bottom: 2px;
        padding-top: 6px;
    }

    .reportForm .reportFormCont .title .titleBox .titleLeft .titleImcome{
        position: absolute;
        top: 30px;
    }

    .reportForm .reportFormCont .title .titleBox .titleLeft .titlePay{
        position: absolute;
        top: 30px;
    }

    .reportForm .reportFormCont .title .titleBox .titleLeft .titleLeftBox{
        display: flex;
        align-items: center;
    }

    .reportForm .reportFormCont .title .titleBox .titleLeft .totalImcome{
        margin-top: 24px;
    }

    .reportForm .reportFormCont .title .titleBox .titleLeft .totalPay{
        margin-top: 24px;
    }

    .reportForm .reportFormCont .title .titleBox .titleLeft .titleTwo{
        display: inline-block;
        font-size:16px;
        font-family:MicrosoftYaHei;
        font-weight:400;
        color:rgba(0,0,0,1);

    }

    .reportForm .reportFormCont .title .titleBox .titleLeft  .titleLine{
        width: 10vw;
        height: 20px;
    }

    .reportForm .reportFormCont .title .titleBox .titleLeft #titleThr{
        display: inline-block;
    }

    .reportForm .reportFormCont .title .titleBox .titleLeft #titleThrTotal{
        display: inline-block;
    }

    .reportForm .reportFormCont .title .titleBox .titleLeft #titleThrIncome{
        display: inline-block;
    }

    .reportForm .reportFormCont .title .titleBox .titleLeft #titleThrOff{
        display: inline-block;
    }


    /*.reportForm .reportFormCont .title .titleBox .titleLeft .titleFour{*/
        /*margin-top: 10px;*/
        /*color: #626263;*/
    /*}*/

    @media screen and (max-width: 1600px){
        .reportForm .reportFormCont .title .titleBox .titleLeft .titleFour{
            color: #626263;
        }
        .reportForm .reportFormCont .title .titleBox .titleLeft .titleLeftBox{
            display: block;
        }

        .reportForm .reportFormCont .title .titleBox .titleLeft .totalImcome{
            position: absolute;
            top: 20px;
        }

        .reportForm .reportFormCont .title .titleBox .titleLeft .totalPay{
            position: absolute;
            top: 20px;
        }

        .reportForm .reportFormCont .title .titleBox .titleLeft .titleImcome{
            position: absolute;
            top: 20px;
        }

        .reportForm .reportFormCont .title .titleBox .titleLeft .titlePay{
            position: absolute;
            top: 20px;
        }

        .reportForm .reportFormCont .title .titleBox .titleLeft #incomes{
            margin-top: 30px;
        }

        .reportForm .reportFormCont .title .titleBox .titleLeft #payOff{
            margin-top: 30px;
        }
    }

    @media screen and (max-width: 1400px){
        .reportForm .reportFormCont .title .titleBox .titleLeft .titleFour{
            color: #626263;
        }
        .reportForm .reportFormCont .title .titleBox .titleLeft .titleLeftBox{
            display: block;
        }

        .reportForm .reportFormCont .title .titleBox .titleLeft .totalImcome{
            position: absolute;
            top: 20px;
        }

        .reportForm .reportFormCont .title .titleBox .titleLeft .totalPay{
            position: absolute;
            top: 20px;
        }

        .reportForm .reportFormCont .title .titleBox .titleLeft .titleImcome{
            position: absolute;
            top: 20px;
        }

        .reportForm .reportFormCont .title .titleBox .titleLeft .titlePay{
            position: absolute;
            top: 20px;
        }

        .reportForm .reportFormCont .title .titleBox .titleLeft #incomes{
            margin-top: 30px;
        }

        .reportForm .reportFormCont .title .titleBox .titleLeft #payOff{
            margin-top: 30px;
        }
    }

    @media screen and (max-width: 1200px){
        .reportForm .reportFormCont .title .titleBox .titleLeft .titleFour{
            color: #626263;
        }
        .reportForm .reportFormCont .title .titleBox .titleLeft .titleLeftBox{
            display: block;
        }
        .reportForm .reportFormCont .title .titleBox .titleLeft .titleTwo{
            position: absolute;
            top: 46px;

        }
        .reportForm .reportFormCont .title .titleBox .titleLeft #incomes{
            position: absolute;
            top: 22px;
        }

        .reportForm .reportFormCont .title .titleBox .titleLeft #payOff{
            position: absolute;
            top: 22px;
        }
    }

    .reportForm .reportFormCont .title .titleBox .titleLeft .titleFour .warnings{
        display: inline-block;
        color: #FF4302;
    }

    .reportForm .reportFormCont .middleOne{
        height: 310px;
        margin-top: 20px;
        border: 1px solid #EBEBF0;
        border-radius: 6px;
        background-color: #ffffff;
        margin-bottom: 20px;
    }

    .reportForm .reportFormCont .middleOne:hover {
        box-shadow: 0 2px 3px 2px rgba(0,0,0,0.08);
        -moz-box-shadow: 0 2px 3px 2px rgba(0,0,0,0.08);
        -webkit-box-shadow: 0 2px 3px 2px rgba(0,0,0,0.08);
    }

    .reportForm .reportFormCont .middleOne .middleLeft{
        float: left;
    }

    .reportForm .reportFormCont .middleOne .middleRight .box-card{
        overflow-y: scroll;
        height: 258px;
    }

    .reportForm .reportFormCont .middleOne .middleRight .listLeft{
        float: left;
        width: 132px;
        margin-right: 11%;
        line-height: 30px;
        overflow: hidden;
        font-size: 12px;
    }

    .reportForm .reportFormCont .middleOne .middleRight .listRight{
        /*float: left;*/
        color: #6A98FD;
        line-height: 30px;
        font-size: 12px;
    }

    .reportForm .reportFormCont .middleTwo{
        height: 500px;
        margin-bottom: 20px;
        border: 1px solid #EBEBF0;
        border-radius: 6px;
        background-color: #ffffff;
    }

    .reportForm .reportFormCont .middleTwo:hover {
        box-shadow: 0 2px 3px 2px rgba(0,0,0,0.08);
        -moz-box-shadow: 0 2px 3px 2px rgba(0,0,0,0.08);
        -webkit-box-shadow: 0 2px 3px 2px rgba(0,0,0,0.08);
    }

    .reportForm .reportFormCont .middleTwo .middleTwoLeft{
        /*width: 600px;*/
        height: 500px;
        border: 1px solid #EBEBF0;
        border-radius: 6px;
        background-color: #ffffff;
        margin-bottom: 20px;
        /*margin-right: 20px;*/
        float: left;
        position: relative;
    }

    .reportForm .emptyBox .empytBoxTow .incomeEmptyBtns{
        cursor: pointer;
    }

    .reportForm .reportFormCont .emptyBox i{
        font-size: 40px;
        line-height: 50px;
    }

    .reportForm .reportFormCont .middleTwo .middleTwoLeft .emptyBox .empytBoxTow{
        display: inline-flex;
        color: #909399;
        position: absolute;
        top: 62%;
        left: 50%;
        transform: translate(-48%,-25%);
    }

    .reportForm .reportFormCont .middleTwo .middleTwoLeft .paging{
        position: absolute;
        bottom: 10px;
        left: 40%;
        transform: translate(-25%,-25%);
    }

    .reportForm .reportFormCont .middleTwo .middleTwoLeft .name-wrappers{
        color: #6A98FD;
    }

    .reportForm .reportFormCont .middleTwo .middleTwoLeft:hover {
        /*box-shadow: 0 2px 3px 2px rgba(0,0,0,0.08);*/
        /*-moz-box-shadow: 0 2px 3px 2px rgba(0,0,0,0.08);*/
        /*-webkit-box-shadow: 0 2px 3px 2px rgba(0,0,0,0.08);*/
    }

    .reportForm .reportFormCont .middleTwo .middleTwoLeft #incomes{
        float: left;
    }

    .reportForm .reportFormCont .middleTwo .middleTwoLeft .incomesBox{
        width: 50px;
        float: left;
        margin-left: 40px;
        font-size:12px;
        font-family:MicrosoftYaHei;
        font-weight:400;
        color:rgba(102,102,102,1);
    }

    .reportForm .reportFormCont .middleTwo .middleTwoLeft #payOff{
        float: left;
    }

    .reportForm .reportFormCont .middleTwo .middleTwoLeft .payOffBox{
        width: 50px;
        float: left;font-size:12px;
        font-family:MicrosoftYaHei;
        font-weight:400;
        color:rgba(102,102,102,1);
    }

    .reportForm .reportFormCont .middleTwo .middleTwoLeft .contentText{
        font-size:16px;
        font-family:MicrosoftYaHei;
        font-weight:400;
        color:rgba(0,0,0,1);
        display: block;
        margin-top: 10px;
    }

    .reportForm .reportFormCont .middleTwo .middleTwoRight{
        /*width: 1180px;*/
        height: 500px;
        /*border: 1px solid #EBEBF0;*/
        /*border-radius: 6px;*/
        background-color: #ffffff;
        margin-bottom: 20px;
        float: left;
        position: relative;
    }

    .reportForm .reportFormCont .middleTwo .middleTwoRight:hover {
        /*box-shadow: 0 2px 3px 2px rgba(0,0,0,0.08);*/
        /*-moz-box-shadow: 0 2px 3px 2px rgba(0,0,0,0.08);*/
        /*-webkit-box-shadow: 0 2px 3px 2px rgba(0,0,0,0.08);*/
    }

    .reportForm .reportFormCont .middleTwo .middleTwoRight .enptyTwo{
        position: relative;
    }

    .reportForm .reportFormCont .middleTwo .middleTwoRight .emptyBox{
        position: absolute;
        top: 222px;
        left: 22%;
        text-align: center;
        color: #909399;
    }

    @media screen and (max-width: 1500px){
        .reportForm .reportFormCont .middleTwo .emptyBox .emptyDesc{
            left: 22%;
        }
    }

    @media screen and (max-width: 1200px){
        .reportForm .reportFormCont .middleTwo .emptyBox .emptyDesc{
            left: 12%;
        }
    }

    .reportForm .reportFormCont .middleTwo .middleTwoRight #main{
        float: left;
      margin-left: 40px;
    }

    .reportForm .reportFormCont .middleTwo .middleTwoRight .PieRight{
        overflow-y: scroll;
        height: 400px;
        /*float: left;*/
        margin: 66px 0 0 40px;
    }

    .reportForm .reportFormCont .middleTwo .middleTwoRight .PieRight.PieRightEmpty{
        position: absolute;
        right: 50px;
        top: 0;
    }

    .reportForm .reportFormCont .middleTwo .middleTwoRight .PieRight .list{
        display: flex;
        height: 24px;
    }

    .reportForm .reportFormCont .middleTwo .middleTwoRight .PieRight .list .listOne{
        width: 8px;
        height: 8px;
        background-color: #00c7ff;
        border-radius: 2px;
        margin-top: 6px;
        margin-right: 10px;
        line-height: 20px;
        flex-shrink: 0 ;
    }

    .reportForm .reportFormCont .middleTwo .middleTwoRight .PieRight .list .listTwo{
        margin-right: 20px;
        line-height: 20px;
        width: 130px;
        overflow: hidden;
        flex-shrink: 0 ;
    }

    .reportForm .reportFormCont .middleTwo .middleTwoRight .PieRight .list .listThr{
        width: 76px;
        height: 16px;
        border-radius: 10px;
        background-color: #FFE1CF;
        text-align: center;
        margin-right: 70px;
        line-height: 20px;
        overflow: hidden;
        flex-shrink: 0 ;
    }

    .reportForm .reportFormCont .middleTwo .middleTwoRight .PieRight .list .listfour{
        flex-shrink: 0 ;

    }

    .reportForm .reportFormCont .middleTwo .middleTwoRightBox{
        padding-right: 20px;
        position: relative;
    }

    .reportForm .reportFormCont .middleTwo .middleTwoRightBox .colorBox{
        width: 18px;
        height: 18px;
        border-radius:2px;
    }

    .reportForm .reportFormCont .middleTwo .middleTwoRightBox .paging{
        position: absolute;
        bottom: -110px;
        left: 40%;
        transform: translate(-25%,-25%);
    }


    .reportForm .reportFormCont .buttonBox{
        height: 310px;
        border: 1px solid #EBEBF0;
        border-radius: 6px;
        background-color: #ffffff;
        margin-bottom: 20px;
    }

    .reportForm .reportFormCont .buttonBox:hover {
        box-shadow: 0 2px 3px 2px rgba(0,0,0,0.08);
        -moz-box-shadow: 0 2px 3px 2px rgba(0,0,0,0.08);
        -webkit-box-shadow: 0 2px 3px 2px rgba(0,0,0,0.08);
    }

    .reportForm .reportFormCont .buttonBox #spend{

    }


</style>
