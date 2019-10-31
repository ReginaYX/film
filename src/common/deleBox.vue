<template>
  <transition name="el-zoom-in-top">
    <div class="deleShadow" v-show="deleVisible">
      <div class="deleText">
        <i class="iconfont icontips-copy"></i>确认删除该{{msg}}
      </div>
      <div class="deleFooter">
        <div class="deleBtn" @click="close">取消</div>
        <div class="deleBtn" @click="dele">确认</div>
      </div>
    </div>
  </transition>
</template>

<script>
    export default {
        name: "deleBox",
      props:{
         msg:String,
        deleVisible:Boolean
      },
      data(){
        return {
          currentVisible: this.deleVisible    //通过data, 定义新变量currentSearch, 这样currentSearch的值变更时，不会影响父组件传来的search的值
        }
      },
      methods:{
        dele(){
          this.$emit('dele')
        },
        close(){
          this.$emit('close')
        }
      }
    }
</script>

<style scoped>
  .deleShadow{
    position: absolute;
    width: 100%;
    height: 100%;
    background:rgba(0,0,0,.7);
    top: 0;
    left: 0;
  }

  .deleShadow .deleText{
    font-size:12px;
    color:rgba(255,255,255,1);
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 38%;
    width: 100%;
  }

  .deleShadow .deleText i{
    margin-right: 8px;
  }

  .deleShadow .deleFooter{
    width: 100%;
    height: 24px;
    display: flex;
    align-items: center;
    position: absolute;
    bottom: 0;
  }

  .deleShadow .deleFooter .deleBtn{
    width:50%;
    height:100%;
    background:rgba(237,149,21,1);
    color: #fff;
    opacity: 0.9;
    text-align: center;
    line-height: 24px;
    font-size: 12px;
    cursor: pointer;
  }

  .deleShadow .deleFooter .deleBtn:first-of-type{
    opacity: 0.6;
  }
</style>
