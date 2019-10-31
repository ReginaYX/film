<template>
    <div class="registerBg">
        <div class="registerLeft">
          <img class="backgroundPhoto" src="../../assets/login_background.png">
          <p class="registerBottom">Copyright 2018-2019 北京非幕文化科技有限公司 版权所有</p>
        </div>
        <div class="registerRight">
            <img src="../../assets/indexTop_logo.png" alt="" class="registerLogo" @click="goIndex">
            <router-view></router-view>
        </div>
    </div>

</template>

<script>
    export default {
        name: "register",
      data(){
        return{

        }
      },
      methods:{
        goIndex(){
          this.$router.push('/')
        }
      }
    }

</script>

<style scoped>
    .registerBg{
        width: 100vw;
        height: 100vh;
        background: #f9f9f9;
        display: flex;
        box-sizing: border-box;
        justify-content: space-between;
        align-items: center;
        position: fixed;
    }
    .registerLeft{
      width: 80%;
      height: 100%;
    }

    .registerLeft .backgroundPhoto{
      width: 100%;
      height: 100%;
      box-sizing: border-box;
    }

    .registerRight{
        width: 39%;
      height: 100%;
      background-color: #fff;
    }
    .registerRight .registerLogo{
        display: block;
      cursor: pointer;
      margin: 8vh auto 6vh;
    }
    .registerLeft .registerBottom{
        position: fixed;
        bottom: 6vh;
        left: 0;
        width: 67.3%;
        color: #fff;
        text-align: center;
        font-family: Microsoft Yahei, 微软雅黑;
    }

</style>
