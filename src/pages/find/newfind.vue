<template>
    <div class="findBg">
      <div class="findLeft">
        <img class="backgroundPhoto" src="../../assets/login_background.png">
      </div>

      <div class="findRight">

        <img src="../../assets/indexTop_logo.png" alt="" class="registerLogo" @click="login">
        <div class="find_main">
          <!--<title>账号安全</title>-->
          <router-view></router-view>
        </div>

      </div>



    </div>
</template>

<script>
    import logo from "../../common/logo";
    export default {
        name: "newfind",
        components: {logo},
        data(){
            return{
                activeName: 'phone'
            }
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            },
            login(){
                this.$router.push('/')
            }
        }
    }
</script>
<style scoped>

  .findBg{
    width: 100vw;
    height: 100vh;
    background: #f9f9f9;
    display: flex;
    box-sizing: border-box;
    justify-content: space-between;
    align-items: center;
  }


  .findBg .findLeft{
    width: 80%;
    height: 100%;
  }

  .findBg .findLeft .backgroundPhoto{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }

  .findBg .findRight{
    width: 39%;
    height: 100%;
    background-color: #fff;
  }

  .findBg .findRight .registerLogo{
    margin: 0 auto;
    display: block;
    margin-bottom: 58px;
    cursor: pointer;
    margin-top: 80px;
  }

  .findBg .findRight .find_main{
      margin: 2% auto 0;
  }

</style>
