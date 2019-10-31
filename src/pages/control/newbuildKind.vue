<template>

  <div class="newBuildKindBox">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="newbuildBreadcrumb">
      <el-breadcrumb-item :to="{ path: '/control/list' }">项目列表</el-breadcrumb-item>
      <el-breadcrumb-item :to="{path: '/control/newbuildKind'}">创建项目</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row :gutter="10" class="newBuildKindBox">
      <el-col :xs="2" :sm="6" :md="4" :lg="3" :xl="1">&nbsp;</el-col>
      <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
        <div class="kindBox" @click="routeBuild(1)">
        <img src="../../assets/kindBoxImg1.jpg" alt="">
        <p class="kindTitle">已有剧本</p>
        <p class="kindDesc">但未制作顺场景表</p>
        </div>
      </el-col>
      <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">&nbsp;</el-col>
      <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
        <div class="kindBox" @click="routeBuild(2)">
          <img src="../../assets/kindBoxImg2.jpg" alt="">
          <p class="kindTitle">已有剧本和顺场景表</p>
          <p class="kindDesc">需要拆分场景</p>
        </div>
      </el-col>
      <el-col :xs="2" :sm="6" :md="4" :lg="3" :xl="1">&nbsp;</el-col>
    </el-row>
  </div>
</template>

<script>
    export default {
        name: "newbuildKind",
        methods:{
            routeBuild(kind){
                if(kind == 1){
                    this.$router.push('/control/newbuild')
                }else  if(kind == 2){
                    this.$router.push('/control/newbuild2')
                }
            }
        }
    }
</script>

<style>
    .newbuildBreadcrumb .el-breadcrumb__inner,
    .newbuildBreadcrumb .el-breadcrumb__inner.is-link{
        font-size:12px;
        font-weight: 400;
        line-height: 1;
    }
</style>

<style scoped>
    .newBuildKindBox{
        width: 1132px;
        height: 640px;
        background: #fff;
        border-radius: 5px;
        margin:50px  auto;
        padding: 20px 0 60px;
        box-sizing: border-box;
    }

    .newBuildKindBox .newbuildBreadcrumb{
        margin-bottom: 22px;
    }

    .newBuildKindBox .kindBox{
        /*width: 536px;*/
        height: 530px;
        background: #fff;
        overflow: hidden;
        /*float: left;*/
        cursor: pointer;
    }
    .newBuildKindBox .kindBox:last-child{
        /*margin-left: 60px;*/
    }
    .newBuildKindBox .kindBox:hover{
        box-shadow: 0 4px 10px 2px rgba(0,0,0,.02);
        transform: translateY(-4px);
    }
    .newBuildKindBox .kindBox:hover img{
        -webkit-filter: opacity(84%); /* Chrome, Safari, Opera */
        filter: opacity(84%);
    }

    .newBuildKindBox .kindBox img{
        width: 100%;
    }
    .newBuildKindBox .kindBox .kindTitle{
        margin: 42px 0 20px 30px;
        font-size: 20px;
        font-family: Microsoft Yahei, 微软雅黑;
        color: #333;
        line-height: 20px;
    }
    .newBuildKindBox .kindBox .kindDesc{
        font-size: 16px;
        line-height: 16px;
        margin-left: 30px;
        font-family: Microsoft Yahei, 微软雅黑;
        color: #999;
    }

</style>
