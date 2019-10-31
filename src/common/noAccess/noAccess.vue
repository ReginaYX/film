<template>
  <transition name="el-zoom-in-center">
    <div class="noAccessShade" v-show="noAccessVisible">
      <div class="noAccessBox">
        <i class="el-icon-close" @click="close"></i>
        <div class="noAccessTitle">
          <i class="iconfont iconhenyihanx"></i>
          很遗憾！您没有此权限哦
        </div>
        <div class="noAccessDesc">暂无法使用此功能，可联系超级管理员修改权限哦！</div>
      </div>
    </div>
  </transition>

</template>

<script>
    export default {
        name: "noAccess",
        props:['noAccessVisible'],
      methods:{
        close(){
          this.$emit('close',!this.noAccessVisible);
        }
      }
    }
</script>

<style scoped>
    .noAccessShade{
      position: fixed;
      top: 0;
      left: 0;
      z-index: 2000;
      width: 100vw;
      height: 100vh;
      background: rgba(0,0,0,.6);
    }

    .noAccessShade .noAccessBox{
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      width:600px;
      height:200px;
      background:rgba(255,255,255,1);
      border-radius:6px;
    }

    .noAccessShade .noAccessBox i.el-icon-close{
      position: absolute;
      font-size:30px;
      top: 20px;
      right: 24px;
      color:rgba(57,63,81,1);
      cursor: pointer;
    }

    .noAccessShade .noAccessBox .noAccessTitle{
      font-size:22px;
      display: flex;
      align-items: center;
      justify-content: center;
      color:rgba(57,63,81,1);
      margin: 40px 0;
    }

    .noAccessShade .noAccessBox .noAccessTitle i{
      font-size: 32px;
      color: #EA5050;
      margin-right: 15px;
    }

    .noAccessShade .noAccessBox .noAccessDesc{
      font-size:14px;
      line-height: 14px;
      color:rgba(57,63,81,1);
      text-align: center;
    }
</style>
