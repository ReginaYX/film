<template>
  <div class="nullBox">
    <i class="iconfont iconwushuju1"></i>
    <div class="nullTxt" v-if="txt!=''">{{txt}}</div>
    <div class="nullTxt" v-else>您还没有添加过{{msg}}哦~</div>
    <div class="nullBtn" v-if="btn" @click="add">添加{{msg}}</div>
  </div>
</template>

<script>
    export default {
        name: "nullBox",
      props:['msg','btn','txt'],
      methods:{
        add(){
          this.$emit('add')
        },
      }
    }
</script>

<style scoped>
  .nullBox{
    position: absolute;
    top: 32%;
    left: 41%;
  }

  .nullBox i{
    color: #818490;
    font-size: 90px;
    width: 140px;
    margin: 0 auto;
    display: block;
  }

  .nullBox .nullTxt{
    font-size:16px;
    color:rgba(57,63,81,1);
    margin: 30px 0;
    text-align: center;
  }

  .nullBox .nullBtn{
    padding: 0 26px;
    font-size:16px;
    color:rgba(245,245,247,1);
    height:32px;
    background:rgba(237,149,21,1);
    border-radius:16px;
    text-align: center;
    line-height: 32px;
    cursor: pointer;
    width:fit-content;
    width:-moz-fit-content;
    margin: 0 auto;
  }
</style>
