<template>
    <div>
        <div class="performer_banner">
            <el-input
                    class="inline-input performer_search"
                    v-model="filterText"
                    clearable
                    prefix-icon="el-icon-search"
                    placeholder="搜索你想要的名字"
            ></el-input>
            <div class="performer_desc">
                <span v-if="main == '' || minor == ''">对主次要演员进行勾选</span>
                <span v-else>将同一演员拖拽至一起可进行合并。</span>
            </div>
        </div>
        <div v-if="main == '' || minor == ''">
            <div class="performer_content ">
                <el-steps :active="active" class="performer_steps" finish-status="success" >
                    <el-step title="步骤 1" description="请选择主要演员"></el-step>
                    <el-step title="步骤 2" description="请选择次要演员"></el-step>
                    <el-step title="步骤 3" description="完成"></el-step>
                </el-steps>
                <div class="performer_main">

                    <div class="performerMain_list performerAll_list">
                        <el-tree class="performer_tree"
                                 :data="all"
                                 node-key="id"
                                 default-expand-all
                                 :filter-node-method="filterNode"
                                 ref="tree4"
                                 :expand-on-click-node="false">
                            <span class="custom-tree-node performer_tree_node performer_all_node" slot-scope="{ node, data }">
                                <el-tooltip class="item" effect="light" :content="node.label" placement="bottom">
                                     <el-checkbox id="performer_all_remove"
                                                type="text"
                                                size="mini"
                                                @change="allRemove(node, data,$event)" :label="node.label">
                                      </el-checkbox>

                                </el-tooltip>
                                <span  class="performer_remove">
                                      <el-button
                                              type="text"
                                              size="mini"
                                              @click="() => remove(node, data)">
                                      </el-button>
                                    </span>
                            </span>
                        </el-tree>
                    </div>
                </div>
                <div class="performer_saveBtn" @click="addTo">下一步</div>
            </div>

        </div>
        <div v-else>
            <div class="performer_content">
                <div class="performer_main">
                    <div class="performerMain_top">
                        <div class="performerMain_title">
                            主要演员
                            <div class="performerMain_changeBtn" v-show="change==1">
                                <li @click="changeTo('minor')">移至次要演员</li>
                                <li @click="changeTo('all')">移至角色演员</li>
                            </div>
                        </div>
                        <div class="performerMain_edit" @click="change=1" v-if="change!==1">编辑</div>
                        <div class="performerMain_edit" @click="change=0" v-else>取消</div>
                    </div>
                    <div class="performerMain_list">
                        <el-tree class="performer_tree"
                                 :data="main"
                                 node-key="id"
                                 default-expand-all
                                 @node-drag-start="handleDragStart"
                                 @node-drag-enter="handleDragEnter"
                                 @node-drag-leave="handleDragLeave"
                                 @node-drag-over="handleDragOver"
                                 @node-drag-end="handleDragEnd"
                                 @node-drop="handleDrop"
                                 draggable
                                 :filter-node-method="filterNode"
                                 ref="tree"
                                 :expand-on-click-node="false"
                                 :allow-drop="allowDrop"
                                 :allow-drag="allowDrag">
                        <span :class="['custom-tree-node','performer_tree_node',change==1?'performer_all_node':'']" slot-scope="{ node, data }">

                             <el-checkbox id="performer_all_remove"
                                          type="text"
                                          size="medium"
                                          @change="allRemove(node, data,$event)" v-if="change==1" :label="node.label">
                                  </el-checkbox>

                            <el-tooltip class="item" effect="light" :content="node.label" placement="bottom" v-else>
                                <span >{{ node.label }}</span>
                            </el-tooltip>
                                <span  class="performer_remove">
                                  <el-button
                                          type="text"
                                          size="mini"
                                          @click="() => remove(node, data)">
                                  </el-button>
                                </span>

                        </span>
                        </el-tree>
                    </div>
                </div>
                <div class="performer_main">
                    <div class="performerMain_top">
                        <div class="performerMain_title">
                            次要演员
                            <div class="performerMain_changeBtn" v-show="change==2">
                                <li @click="changeTo('main')">移至主要演员</li>
                                <li @click="changeTo('all')">移至角色演员</li>
                            </div>
                        </div>
                        <div class="performerMain_edit" @click="change=2" v-if="change!=2">编辑</div>
                        <div class="performerMain_edit" @click="change=0" v-else>取消</div>
                    </div>
                    <div class="performerMain_list">
                        <el-tree class="performer_tree"
                                 :data="minor"
                                 node-key="id"
                                 default-expand-all
                                 :filter-node-method="filterNode"
                                 ref="tree1"
                                 @node-drag-start="handleDragStart"
                                 @node-drag-enter="handleDragEnter"
                                 @node-drag-leave="handleDragLeave"
                                 @node-drag-over="handleDragOver"
                                 @node-drag-end="handleDragEnd"
                                 @node-drop="handleDrop"
                                 draggable
                                 :expand-on-click-node="false"
                                 :allow-drop="allowDrop"
                                 :allow-drag="allowDrag">
                        <span :class="['custom-tree-node','performer_tree_node',change==2?'performer_all_node':'']" slot-scope="{ node, data }">
                             <el-checkbox id="performer_all_remove"
                                          type="text"
                                          size="mini"
                                          @change="allRemove(node, data,$event)" v-if="change==2" :label="node.label">
                                  </el-checkbox>
                            <el-tooltip class="item" effect="light" :content="node.label" placement="bottom" v-else>
                                <span>{{ node.label }}</span>
                            </el-tooltip>
                            <span  class="performer_remove">
                              <el-button
                                      type="text"
                                      size="mini"
                                      @click="() => remove(node, data)">
                              </el-button>
                            </span>
                        </span>
                        </el-tree>
                    </div>
                </div>
                <div class="performer_main">
                    <div class="performerMain_top">
                        <div class="performerMain_title">
                            角色演员
                            <div class="performerMain_changeBtn" v-show="change==3">
                                <li @click="changeTo('main')">移至主要演员</li>
                                <li @click="changeTo('minor')">移至次要演员</li>
                            </div>
                        </div>
                        <div class="performerMain_edit" @click="change=3" v-if="change!==3">编辑</div>
                        <div class="performerMain_edit" @click="change=0" v-else>取消</div>
                    </div>
                    <div class="performerMain_list performerPeople_list">
                        <el-tree class="performer_tree"
                                 :data="all"
                                 node-key="id"
                                 :filter-node-method="filterNode"
                                 ref="tree2"
                                 default-expand-all
                                 @node-drag-start="handleDragStart"
                                 @node-drag-enter="handleDragEnter"
                                 @node-drag-leave="handleDragLeave"
                                 @node-drag-over="handleDragOver"
                                 @node-drag-end="handleDragEnd"
                                 @node-drop="handleDrop"
                                 draggable
                                 :expand-on-click-node="false"
                                 :allow-drop="allowDrop"
                                 :allow-drag="allowDrag">
                        <span :class="['custom-tree-node','performer_tree_node',change==3?'performer_all_node':'']" slot-scope="{ node, data }">
                                <el-checkbox id="performer_all_remove"
                                             type="text"
                                             size="mini"
                                             @change="allRemove(node, data,$event)" v-if="change==3" :label="node.label">
                                </el-checkbox>
                                <el-tooltip class="item" effect="light" :content="node.label" placement="bottom" v-else>
                                    <span>{{ node.label }}</span>
                                </el-tooltip>
                                <span  class="performer_remove">
                                  <el-button
                                          type="text"
                                          size="mini"
                                          @click="() => remove(node, data)">
                                  </el-button>
                                </span>
                        </span>
                        </el-tree>
                    </div>
                </div>
                <div class="performer_saveBtn" @click="savePerformer">保存</div>
         </div>
        </div>

      <!--引导-->
      <div id="walkthrough-content" style="display: none">
        <div id="walkthrough-1">
          演员表
          <p>点击下一步了解更多...</p>
        </div>
        <div id="walkthrough-2">首先对演员进行分类</div>
          <div id="walkthrough-3">拖动演员至另一演员进行合并</div>
          <div id="walkthrough-4">点击对演员分类进行编辑</div>
      </div>

    </div>
</template>

<script>
    let id = 1000;
    import axios from 'axios'
    import qs from 'qs'
    export default {
        name: "performer",
        data() {
            return {
                filterText: '',
                main:[],
                minor:[],
                all:new Array(),
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                arr: new Array(),
                storage:[],
                children:[],
                index:[],
                model:false,
                kind:'',
                active: 0,
                change:0,
                is_default:'',//默认项目
            };
        },
        methods:{
            savePerformer(){
                let arr = new Array();
                for (let i = 0; i <this.main.length; i++){
                    if(this.main[i].children){
                        let child = new Array();
                        for (let c = 0; c <this.main[i].children.length; c++){
                            child.push(this.main[i].children[c].id);
                            if(this.main[i].children[c].children) {
                                for (let m = 0; m < this.main[i].children[c].children.length; m++) {
                                    child.push(this.main[i].children[c].children[m].id);
                                }
                            }
                        }
                        var main = {"parent": this.main[i].id, "children":child};
                        arr.push(main)
                    }
                }
                for (let i = 0; i <this.minor.length; i++){
                    if(this.minor[i].children){
                        let child = new Array();
                        for (let c = 0; c <this.minor[i].children.length; c++){
                            child.push(this.minor[i].children[c].id);
                            if(this.minor[i].children[c].children) {
                                for (let m = 0; m < this.minor[i].children[c].children.length; m++) {
                                    child.push(this.minor[i].children[c].children[m].id);
                                }
                            }
                        }
                        var minor = {"parent": this.minor[i].id, "children":child};
                        arr.push(minor)
                    }
                }
                for (let i = 0; i <this.all.length; i++){
                    if(this.all[i].children){
                        let child = new Array();
                        for (let c = 0; c <this.all[i].children.length; c++){
                            child.push(this.all[i].children[c].id);
                            if(this.all[i].children[c].children) {
                                for (let m = 0; m < this.all[i].children[c].children.length; m++) {
                                    child.push(this.all[i].children[c].children[m].id);
                                }
                            }
                        }
                        var all = {"parent": this.all[i].id, "children":child};
                        arr.push(all)
                    }
                }
                let obj = {'play_id':this.$route.query.play_id,'payload':arr};
                axios({
                    method: 'post',
                    url: '/play/actors_merge',
                    data:obj,
                    transformRequest: [
                        function (data) { // 解决传递数组变成对象的问题
                            Object.keys(data).forEach((key) => {
                                if ((typeof data[key]) === 'object') {
                                    data[key] = JSON.stringify(data[key]) // 这里必须使用内置JSON对象转换
                                }
                            })
                            data = qs.stringify(data) // 这里必须使用qs库进行转换
                            return data
                        }
                    ],
                    headers:{
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                        'Accept':'*/*'
                    }
                }).then((response)=> {
                    if(response.data.ret == 0){
                        this.$message({
                            message: '保存成功',
                            type: 'success'
                        });
                        this.fetchData()
                    }else{
                        this.$message({
                            message: response.data.msg,
                            type: 'info'
                        });
                    }
                })
            },
            saveKinds(){
                let main = new Array()
                for (let i = 0; i <this.main.length; i++){
                    main.push(this.main[i].id)
                }
                let second = new Array()
                for (let i = 0; i <this.minor.length; i++){
                    second.push(this.minor[i].id)
                }
                let group = new Array()
                for (let i = 0; i <this.all.length; i++){
                    group.push(this.all[i].id)
                }
                let obj = {'main':main,'second':second,'group':group}
                axios({
                    method: 'post',
                    url: '/play/actors_update_type',
                    data:{
                        'play_id':this.$route.query.play_id,
                        'actors':JSON.stringify(obj)
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
                    if(response.data.ret !== 0){
                        this.$alert(response.data.msg, '提示', {
                            confirmButtonText: '确定'
                        });
                    }
                })
            },
            addTo(){
                if(this.storage != ''){
                    var newArr = new Array()
                    for (let i = this.children.length - 1; i >= 0; i--) {
                        for (let j = 0; j < this.index.length; j++) {
                            if (this.children[i]) {
                                if (i == this.index[j]) {
                                    newArr.push(this.children[i])
                                    this.children.splice(i, 1)
                                    continue; //结束当前本轮循环，开始新的一轮循环
                                }
                            }
                        }
                    }
                    if(this.active == 0){
                        for (var i = 0; i <this.storage.length; i++){
                            this.main.push(this.storage[i])
                        }
                    }else if (this.active == 1){
                        for (var i = 0; i <this.storage.length; i++){
                            this.minor.push(this.storage[i])
                        }
                    }
                    this.storage = []
                    this.index = []
                }
                this.saveKinds()
                if(this.main.length !== 0){
                    this.active = 1
                }else{
                    this.active = 0
                }
                var goTop=setInterval(scrollMove,10);
                function scrollMove(){
                    setScrollTop(getScrollTop()/1.1);
                    if(getScrollTop()<1)clearInterval(goTop);
                }
                function getScrollTop(){
                    return document.documentElement.scrollTop;
                }
                function setScrollTop(value){
                    document.documentElement.scrollTop=value;
                }
            },
            changeTo(kind) {
                if (this.storage != '') {
                    var newArr = new Array()
                    for (let i = this.children.length - 1; i >= 0; i--) {
                        for (let j = 0; j < this.index.length; j++) {
                            if (this.children[i]) {
                                if (i == this.index[j]) {
                                    newArr.push(this.children[i])
                                    this.children.splice(i, 1)
                                    continue; //结束当前本轮循环，开始新的一轮循环
                                }
                            }
                        }
                    }
                    if (kind == 'main') {
                        for (var i = 0; i < this.storage.length; i++) {
                            this.main.push(this.storage[i])
                        }
                    } else if (kind == 'minor') {
                        for (var i = 0; i < this.storage.length; i++) {
                            this.minor.push(this.storage[i])
                        }
                    }else if (kind == 'all') {
                        for (var i = 0; i < this.storage.length; i++) {
                            this.all.push(this.storage[i])
                        }
                    }
                    this.storage = []
                    this.index = []
                    let main = new Array()
                    for (let i = 0; i <this.main.length; i++){
                        main.push(this.main[i].id)
                        if(this.main[i].children){
                            for (let m = 0; m <this.main[i].children.length; m++){
                                main.push(this.main[i].children[m].id)
                            }
                        }
                    }
                    let second = new Array()
                    for (let i = 0; i <this.minor.length; i++){
                        second.push(this.minor[i].id)
                        if(this.minor[i].children){
                            for (let m = 0; m <this.minor[i].children.length; m++){
                                second.push(this.minor[i].children[m].id)
                            }
                        }
                    }
                    let group = new Array()
                    for (let i = 0; i <this.all.length; i++){
                        group.push(this.all[i].id)
                        if(this.all[i].children){
                            for (let m = 0; m <this.all[i].children.length; m++){
                                group.push(this.all[i].children[m].id)
                            }
                        }
                    }
                    let obj = {'main':main,'second':second,'group':group}
                    axios({
                        method: 'post',
                        url: '/play/actors_update_type',
                        data:{
                            'play_id':this.$route.query.play_id,
                            'actors':JSON.stringify(obj)
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
                        if(response.data.ret !== 0){
                            this.$alert(response.data.msg, '提示', {
                                confirmButtonText: '确定'
                            });
                        }else{
                            this.fetchData()
                        }
                    })

                    this.change = 0
                }

            },
            allRemove(node, data,event) {
                if(event == true){
                    const parent = node.parent;
                    const children = parent.data.children || parent.data;
                    this.children = children
                    this.index.push(children.findIndex(d => d.id === data.id));
                    // delete this.children[index]
                    this.storage.push(data)
                }else{
                    var index = this.children.findIndex(d => d.id === data.id);
                    for(var i = 0; i <this.index.length; i++){
                        if(this.index[i] == index){
                            var that = this
                            function indexOf(val){
                                for(let i = 0; i < that.index.length; i++){
                                    if(that.index[i] == val){return i;}
                                }
                                return -1;
                            }
                            function remove(val){
                                let index = indexOf(val);
                                if(index > -1){that.index.splice(index,1);}
                            }
                            remove(that.index[i]);
                        }
                    }
                    for(var d = 0; d <this.storage.length; d++){
                        if(this.storage[d] == data){
                            function indexOf(val){
                                for(let m = 0; m < that.storage.length; m++){
                                    if(that.storage[m] == val){return m;}
                                }
                                return -1;
                            }
                            function remove(val){
                                let index = indexOf(val);
                                if(index > -1){that.storage.splice(index,1);}
                            }
                            remove(that.storage[d]);
                        }
                    }
                }
            },
            remove(node, data) {
                const parent = node.parent;
                const children = parent.data.children || parent.data;
                const index = children.findIndex(d => d.id === data.id);
                this.$confirm('确认删除后演员将不可恢复，是否继续您的操作?', '温馨提示', {
                    confirmButtonText: '确认删除',
                    cancelButtonText: '我不删了'
                }).then(() => {
                    children.splice(index, 1);

                    axios({
                        method: 'post',
                        url: '/play/actors_delete',
                        data:{
                            'play_id': this.$route.query.play_id,
                            'actor_id': data.id,
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
                        if(response.data.ret !== 0){
                            this.$message({
                                message: '已删除',
                                type: 'success'
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

            allowDrop(draggingNode, dropNode, type) {

                if(dropNode.level !== 1){
                    return false;
                } else {
                    return true;
                }
            },
            allowDrag(draggingNode) {
                return draggingNode.data.label.indexOf('三级 3-2-2') === -1;
            },
            querySearch(queryString, cb) {
                var restaurants = this.data6;
                var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
                // 调用 callback 返回建议列表的数据
                cb(results);
            },
            createFilter(queryString) {
                return (restaurant) => {
                    return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },
            handleSelect(item) {
                // console.log(item);
                this.minor.push(item)
            },
            dom(){
                this.arr =[]
                this.arr.push(document.getElementsByClassName('el-tree-node__children'))

                for (var i = 0; i <this.arr[0].length; i++){

                    if (this.arr[0][i].childElementCount != 0){
                        this.arr[0][i].previousElementSibling.classList.add("tree_father");
                        this.arr[0][i].parentElement.classList.add("treeFather_total");
                    }else{
                        this.arr[0][i].previousElementSibling.classList.remove("tree_father")
                        this.arr[0][i].parentElement.classList.remove("treeFather_total")
                        continue
                    }
                }
            },
            fetchData(){
                this.reard();
                this.main = []
                this.minor = []
                this.all=[]
                var play_id = this.$route.query.play_id
                axios({
                    method: 'get',
                    url: '/play/actors_all?play_id='+play_id,
                    headers:{
                        'Content-type': 'application/x-www-form-urlencoded'
                    }
                }).then((response)=> {
                    if(response.data.data){
                        let data = response.data.data

                        if(data.second == '' && data.group == '') {
                                for (var i = 0; i < data.main.length; i++) {
                                let obj = {id: data.main[i].actor_id, label: data.main[i].role_name}
                                this.all.push(obj)
                            }
                        }else if(data.second == '' && data.group != '' && data.main == ''){
                            for (var i = 0; i < data.group.length; i++) {
                                let obj = {id: data.group[i].actor_id, label: data.group[i].role_name}
                                this.all.push(obj)
                            }
                        }else{
                            for (let i = 0; i <data.main.length; i++){
                                let obj = {id:data.main[i].actor_id,label:data.main[i].role_name}
                                this.main.push(obj)
                            }
                            for (let i = 0; i <data.second.length; i++){
                                let obj = {id:data.second[i].actor_id,label:data.second[i].role_name}
                                this.minor.push(obj)
                            }
                            for (let i = 0; i <data.group.length; i++){
                                let obj = {id:data.group[i].actor_id,label:data.group[i].role_name}
                                this.all.push(obj)
                            }
                        }
                    }
                })
            },
            filterNode(value, data) {
                if (!value) return true;
                return data.label.indexOf(value) !== -1;
            },
            reard(){
                if(this.$route.query.project_id == '1'){
                    //新手引导2，加演示器
                    this.$nextTick(()=>{
                        this.$intro().setOptions({'prevLabel':'&larr; 上一步','nextLabel':'下一步 &rarr;','skipLabel':'跳过'}).start();
                    })
                    $("body").pagewalkthrough({
                        name: "introduction",
                        steps: [{
                            popup: {
                            content: "#walkthrough-1",
                            // 弹出方式 : modal/tooltip/mohighlight
                            type: "modal"
                            }
                        }, {
                            wrapper: ".performer_content",
                            popup: {
                                content: "#walkthrough-2",
                                type: "tooltip",
                                position: "top"
                            },
                            onLeave:()=>{
                                if(this.main.length == 0){
                                    this.main.push(this.all[0])
                                    this.all.splice(0, 1);
                                }
                                if(this.minor.length == 0){
                                    this.minor.push(this.all[0])
                                    this.all.splice(0, 1);
                                }
                                this.active = '1';
                            }
                        }, {
                            wrapper: ".performer_tree ",
                            popup: {
                            content: "#walkthrough-3",
                            type: "tooltip",
                            position: "top"
                            }
                        }, {
                            wrapper: ".performerMain_edit ",
                            popup: {
                            content: "#walkthrough-4",
                            type: "tooltip",
                            position: "left"
                            }
                        }],
                        buttons: {
                            jpwClose: {
                            i18n: "点击关闭"
                            },
                            jpwNext: {
                            i18n: "下一步 &rarr;"
                            },
                            jpwPrevious: {
                            i18n: "&larr; 上一步"
                            },
                            jpwFinish: {
                            i18n: "完成 &#10004;"
                            }
                        },
                        onClose:()=>{
                            setTimeout(()=>{
                                this.$router.push('/details/group?play_id='+this.$route.query.play_id+'&project_id='+this.$route.query.project_id)
                            }, 600);
                        },
                    });
                    $('body').pagewalkthrough('show','introduction');
                }
            }
        },
        mounted(){
            //获取项目信息
            axios.get('/project/info', {
                params: {
                    project_id: this.$route.query.project_id
                }
            }).then((response)=> {
                this.is_default = response.data.data.is_default;
                
            })
            var arr = new Array()
            arr.push(document.getElementsByClassName('el-tree-node__children'))
            for (var i = 0; i <arr[0].length; i++){
                var t = arr[0][i].innerHTML
                if(t !== ''){
                    arr[0][i].previousElementSibling.classList.add("tree_father")
                    arr[0][i].parentElement.classList.add("treeFather_total")
                    continue
                }
            }
            this.t1=window.setInterval(this.dom, 500);
            this.fetchData();
        },
        watch:{
            filterText(val){
                if(this.main =='' && this.minor == ''){
                    this.$refs.tree4.filter(val);
                }else{
                    this.$refs.tree.filter(val);
                    this.$refs.tree1.filter(val);
                    this.$refs.tree2.filter(val);
                }
            },
        }
    }
</script>
<style src="../../css/el-message-box.css"></style>
<style>
    #performer_all_remove .el-checkbox__label{
        font-size: 12px;
        font-family: Microsoft Yahei, 微软雅黑;
    }

    .performer_steps{
        width: 1200px;
        margin: 0 auto;
    }
    .performer_steps .el-step__head.is-process{
        color: #f6ae45;
        border-color: #f6ae45;
    }
    .performer_steps .el-step__title.is-process,
    .performer_steps .el-step__description.is-process{
        color: #f6ae45;
    }
    .performer_steps .el-step__title.is-wait,
    .performer_steps .el-step__description.is-wait{
        color: #999;
    }
    .performer_steps .el-step__head.is-success{
        color: #ED9515;
        border-color: #ED9515;
    }
    .performer_steps .el-step__title.is-success,
    .performer_steps .el-step__description.is-success{
        color: #ED9515;
    }
    .performer_steps .el-step__head.is-wait{
        color: #999;
        border-color: #999;
    }
    .performer_steps .el-step__title.is-wait,
    .performer_steps .el-step__description.is-wait{
        color: #999;
    }
    .performer_steps .el-step__title{
        font-size: 16px;
        font-family: Microsoft Yahei, 微软雅黑;
    }
    .performer_steps .el-step__description{
        font-size: 12px;
        font-family: 新宋体;
    }
    .performer_banner .performer_search .el-input__inner{
        background: rgba(255,255,255,.45)!important;
        font-size: 18px;
        color: #666;
        padding-left: 80px;
        border-color: #b6ada6;
        height: 60px;
        line-height: 600px;
    }
    .performer_banner .performer_search .el-input__inner::-webkit-input-placeholder,
    .performer_banner .performer_search .el-input__inner:-moz-placeholder,
    .performer_banner .performer_search .el-input__inner:-ms-input-placeholder{
        color: #666!important;
    }
    .performer_banner .performer_search .el-input__prefix{
        left: 25px;
        height: 40px;
        /*top: 10vh;*/
    }
    .performer_banner .performer_search .el-input__prefix .el-icon-search{
        font-size: 30px;
        color: #666;
        line-height: inherit;
    }
    .performer_banner .performer_search .el-input__suffix{
        right: 25px;
        width: 30px;
        height: 30px;
    }
    .performer_banner .performer_search .el-input__suffix i{
        font-size: 30px;
        line-height: 300px;
        color: #fd4444;
    }
    .performer_tree>.el-tree-node{
        /*width: 120px;*/
        padding: 8px 0;
        /*border: 1px solid #f9f9f9;*/
        margin-right: 14px;
    }
    .performer_tree>.el-tree-node:nth-of-type(7n){
        margin-right: 0;
    }
    .performer_tree .el-tree-node.treeFather_total{
        border: 1px dashed #fd4444;
        overflow: hidden;
        margin-right: 20px;
    }
    .performer_tree .el-tree-node .el-tree-node__content{
        width: 140px;
        height: 40px;
        padding: 0 10px!important;
        margin-right: 10px;
        margin-bottom: 12px;
        box-sizing: border-box;
        background:rgba(245,245,247,1);
        border:1px solid rgba(209,208,219,1);

    }
    .performer_tree .el-tree-node.treeFather_total .el-tree-node__content{
        margin-right: 0px;
    }
    .performerAll_list .performer_tree .el-tree-node .el-tree-node__content{
        margin:0;
        /*padding-left: 0!important;*/
    }
    .performer_tree .el-tree-node .el-tree-node__content.tree_father{
        background: #ED9515;
        border-color: #ED9515;
        color: #fff;
    }
    .performer_tree .el-tree-node .el-tree-node__content .el-tree-node__expand-icon{
        display: none;
    }
    .performer_tree .el-tree-node .el-tree-node__content .el-tree-node__label{
        width: 100%;
        height: 100%;
        line-height: 40px;
        text-align: center;
    }
    .performerAll_list .performer_tree .el-tree-node .el-tree-node__content .performer_all_node .el-checkbox{
        margin-left: 12px;
    }
</style>
<style scoped>
    *{
        font-family: Microsoft Yahei, 微软雅黑;
        box-sizing: border-box;
    }
    .performer_title{
        font-size: 20px;
        color: #333;
        position: fixed;
        z-index: 2000;
        top: 1.2%;
        left: 46%;
    }
    .performer_banner{
        margin-top: 20px;
        background: url("../../assets/performer_banner.png");
        width: 100%;
        height: 300px;
        text-align: center;
        line-height: 300px;
        position: relative;
    }
    .performer_banner .performer_del{
        position: absolute;
        top: 45%;
        right: 30%;
    }
    .performer_banner .performer_desc{
        position: absolute;
        top: 64%;
        left: 0;
        right: 0;
        margin: 0 auto;
        text-align: left;
        width: 41.7vw;
        padding-left: 80px;
        height: 32px;
        display: flex;
        align-items: center;
    }
    .performer_banner .performer_desc span{
        line-height: 16px;
        font-size: 16px;
        color: #fff;
    }
    .performer_banner .performer_search{
        width: 41.7vw;
        height: 60px;
    }
    .performer_content{
        padding: 40px 0;
        background: #F5F5F7;
    }
    .performer_content .performer_lead{
        background: url("../../assets/performer_lead.jpg") no-repeat center;
        width: 1200px;
        height: 130px;
        margin: 0 auto 30px;
        /*border: 1px dashed #f6af48;*/
        /*border-radius: 5px;*/
    }
    .performer_content .performer_main{
        width: 1200px;
        height: auto;
        margin: 0 auto;
    }
    .performer_content .performer_main .performerMain_top{
        width: 100%;
        display: flex;
        border-bottom: 1px solid #ddd;
        margin-bottom: 30px;
        justify-content: space-between;
        align-items: center;
        height: 60px;
    }
    .performer_content .performer_main .performerMain_top .performerMain_title{
        font-size: 16px;
        color: #333;
        display: flex;
        align-items: center;
    }
    .performer_content .performer_main .performerMain_top .performerMain_title .performerMain_changeBtn{
        display: flex;
        margin-left: 40px;
    }
    .performer_content .performer_main .performerMain_top .performerMain_title .performerMain_changeBtn li{
        margin-right: 30px;
        width: 120px;
        height: 30px;
        background: #fff;
        border: 1px solid #ddd;
        border-radius: 5px;
        line-height: 30px;
        text-align: center;
        color: #666;
        font-family: 新宋体;
        font-size: 16px;
        cursor: pointer;
    }
    .performer_content .performer_main .performerMain_top .performerMain_title .performerMain_changeBtn li:hover{
        background: #ED9515;
        border-color: #ED9515;
        color: #fff;
    }
    .performer_content .performer_main .performerMain_top .performerMain_edit{
        width: 60px;
        height: 26px;
        background: #ED9515;
        border-radius: 5px;
        line-height: 26px;
        text-align: center;
        color: #fff;
        font-family: 新宋体;
        font-size: 14px;
        cursor: pointer;
    }
    .performer_content .performer_main .performerMain_top .performerMain_edit:hover{
        background: #ED9515;
    }
    .performer_content .performer_main .performerAll_title{
        display: flex;
        align-items: flex-start;
        justify-content: flex-end;
        height: 50px;
    }
    .performer_content .performer_main .performerMain_list{
        width: 100%;
        height: auto;
        margin-bottom: 40px;
        padding: 15px 0 15px 31px;
        background: rgba(63,62,106,0.08);
    }
    .performer_content .performer_main:last-of-type .performerMain_list{
        margin-bottom: 50px;
    }
    .performer_tree{
        display: flex;
        background: none;
        flex-wrap: wrap;
        justify-content: flex-start;
    }
    /*.performerAll_list .performer_tree,*/
    /*.performerPeople_list .performer_tree{*/
        /*justify-content: space-around;*/
    /*}*/
    .performer_content .performer_saveBtn{
        width: 160px;
        height: 34px;
        margin: 0 auto;
        border-radius: 25px;
        color: #fff;
        background: #ED9515;
        line-height: 34px;
        text-align: center;
        font-size: 18px;
        cursor: pointer;
    }
    .performer_content .performer_saveBtn:hover{
        background: #ED9515;
    }
    .performer_tree_node{
        /*padding-left: 15%;*/
        margin:0 auto;
        display: flex;
    }
    .performer_all_node{
        padding-left: 0;
        margin: 0;
        /*overflow: hidden;*/
        /*-ms-text-overflow: ellipsis;*/
        /*text-overflow: ellipsis;*/
        /*white-space: nowrap;*/
    }
    .performer_tree_node span{
        line-height: 40px;
    }
    .performer_all_node span{
        width: 66px;
    }
    /*.performer_all_node:hover {*/
        /*word-break:break-all;*/
        /*white-space: pre-wrap;*/
        /*text-decoration: none;*/
    /*}*/
    /*.performer_all_node:hover span{*/
        /*line-height: 20px;*/
    /*}*/
    .performer_tree_node .performer_remove{
        display: block;
        height: 40px;
        padding-top: 2px;
        display: none;
    }
    .performer_tree_node .performer_remove button{
        width: 16px;
        height: 16px;
        padding: 0;
        border: none;
        line-height: 40px;
        margin-left: 8px;
        background: url("../../assets/performerMain_removeIcon.png") no-repeat;
    }
    .performer_tree_node:hover .performer_remove{
        opacity: 1;
        display: block;
    }
    .performer_tree_node .performer_remove:hover button{
        background-image: url("../../assets/performerMain_removeIcon1.png");
    }
    #performer_all_remove{
        width: 95px;
        height: 40px;
        padding: 0;
        text-align: left;
        margin: 0;
        line-height: 40px;
        box-sizing: border-box;
        overflow: hidden;
        -ms-text-overflow: ellipsis;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    #performer_all_remove:hover{
        overflow: inherit;
    }
    .performer_content .performer_main .performerAll_filter{
        display: flex;
        /*margin: 30px 0 20px;*/
        justify-content: flex-end;
        align-items: center;
    }
    .performer_content .performer_main .performerAll_filter li{
        width: 100px;
        height: 40px;
        margin-left: 40px;
        background: #eee;
        font-size: 18px;
        color: #666;
        text-align: center;
        line-height: 40px;
        border-radius: 5px;
        cursor: pointer;
    }
    .performer_content .performer_main .performerAll_filter li:last-child{
        cursor: not-allowed;
    }
    .performer_content .performer_main .performerAll_filter li:hover,
    .performer_content .performer_main .performerAll_filter li.active{
        background: #ED9515;
        color: #fff;
    }
    .performer_content .performer_main .performerAll_filter span{
        color: #999;
        margin-left: 20px;
    }
</style>
