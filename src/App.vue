<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App',
  }
</script>

<style>
  /*@import '../theme/index.css';*/
  @import "css/main.css";
  @import "css/reset.css";
  @import "css/header.css";
  @import "css/model.css";
  @import "css/el-message-box.css";
  @import "css/el-dialog.css";
  @import "../static/pagewalkthrough/css/jquery.pagewalkthrough.css";
  body {
    margin: 0;
    list-style: none;
    text-decoration: none;
    padding: 0;
    box-sizing: border-box;
  }

  input:disabled{
    background: none;
    background-color: transparent;
  }

  input:focus,textarea:focus{
    outline:none;
    border-color: #ED9515;
  }
  input::-webkit-input-placeholder,input:-moz-placeholder,input:-ms-input-placeholder{
    color: rgba(0,0,0,.4);
  }
  ::-webkit-input-placeholder{/*Webkit browsers*/
    color:rgba(0,0,0,.4);
  }
  :-moz-placeholder{/*Mozilla Firefox 4 to 8*/
    color:rgba(0,0,0,.4);
  }
  ::moz-placeholder{/*Mozilla Firefox 19+*/
    color:rgba(0,0,0,.4);
  }
  :-ms-input-placeholder{/*Internet Explorer 10+*/
    color:rgba(0,0,0,.4);
  }
  input:focus::-webkit-input-placeholder,textarea:focus::-webkit-input-placeholder {
    color: transparent;
    /* transparent是全透明黑色(black)的速记法，即一个类似rgba(0,0,0,0)这样的值 */
  }


  /* Mozilla Firefox 4 to 18 */

  input:focus:-moz-placeholder, textarea:focus:-moz-placeholder{
    color: transparent;
  }


  /* Mozilla Firefox 19+ */

  input:focus::-moz-placeholder ,textarea:focus::-moz-placeholder{
    color: transparent;
  }

  /* Internet Explorer 10+ */

  input:focus:-ms-input-placeholder, textarea:focus:-ms-input-placeholder {
    color: transparent;
  }
  /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
  ::-webkit-scrollbar{
    width: 6px;
    height: 10px;
    background: none;
  }

  /*定义滚动条轨道 内阴影+圆角*/
  ::-webkit-scrollbar-track{
    position: absolute;
    left: 0px;
    /*-webkit-box-shadow: inset 0 0 4px rgba(0,0,0,0.2);*/
    /*border-radius: 10px;*/
    background-color: rgba(255,255,255,.02);
  }

  /*定义滑块 内阴影+圆角*/
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    /*-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.2);*/
    background-color: #c0c0c0;
  }

  ::-webkit-scrollbar-thumb:hover{
    background-color: #7a7a7a;
  }

  ::-webkit-scrollbar-corner{
    background: none;
  }
  /*elementUI*/
  .el-input__inner{
    font-size: 16px;
  }
  .el-input.is-active .el-input__inner, .el-input__inner:focus{
    border-color: #ed9515;
  }

  /*过渡*/
  .slide-right-enter-active,
  .slide-right-leave-active,
  .slide-left-enter-active,
  .slide-left-leave-active {
    width: 100%;
    height: 100%;
    -webkit-perspective: 1200px;
    -moz-perspective: 1200px;
    perspective: 1200px;
    z-index: 2000000;
    will-change: transform;
  }
  .slide-right-enter {
    -webkit-animation: moveFromRight .6s ease both;
    animation: moveFromRight .6s ease both;
  }
  .slide-right-leave-active {
    -webkit-animation: moveToRight .6s ease both;
    animation: moveToRight .6s ease both;
  }
  .slide-left-enter {
    -webkit-animation: moveFromLeft .6s ease both;
    animation: moveFromLeft .6s ease both;
  }
  .slide-left-leave-active {
    -webkit-animation: moveToLeft .6s ease both;
    animation: moveToLeft .6s ease both;
  }

  @-webkit-keyframes moveToLeft {
    from { }
    to { -webkit-transform: translateX(-100%); }
  }
  @keyframes moveToLeft {
    from { }
    to { -webkit-transform: translateX(-100%); transform: translateX(-100%); }
  }

  @-webkit-keyframes moveFromLeft {
    from { -webkit-transform: translateX(-100%); }
  }
  @keyframes moveFromLeft {
    from { -webkit-transform: translateX(-100%); transform: translateX(-100%); }
  }

  @-webkit-keyframes moveToRight {
    from { }
    to { -webkit-transform: translateX(100%); }
  }
  @keyframes moveToRight {
    from { }
    to { -webkit-transform: translateX(100%); transform: translateX(100%); }
  }

  @-webkit-keyframes moveFromRight {
    from { -webkit-transform: translateX(100%); }
  }
  @keyframes moveFromRight {
    from { -webkit-transform: translateX(100%); transform: translateX(100%); }
  }
</style>
