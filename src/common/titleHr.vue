<template>
  <div :class="['titleHrBox',divider?'divider':'']">
    <div class="titleHr" :style="{background: bgColor}"></div>
    <span :style="{color: color}">{{msg}}</span>
  </div>
</template>

<script>
    export default {
        name: "titleHr",
        props:{
          'msg': String,
          'divider':{
            type: Boolean,
            default: false
          },
          'bgColor': String,
          'color': String
        }
    }
</script>

<style scoped>
    .titleHrBox{
      width: 100%;
      display: flex;
      align-items: center;
      position: relative;
    }

  .titleHrBox .titleHr{
    width:4px;
    height:14px;
    background:rgba(50,197,143,1);
    flex-shrink: 0;
  }

  .titleHrBox span{
    font-size:14px;
    color:rgba(57,63,81,1);
    line-height: 14px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    display: block;
    padding: 0 8px;
    /*position: relative;*/
    /*z-index: 10;*/
    /*background: #fff;*/
  }

    .titleHrBox.divider:after{
      position: absolute;
      content: '';
      width: calc(100% - 100px);
      height: 1px;
      background:rgba(226,226,233,1);
      right: 0;
      top: 7px;
    }
</style>
