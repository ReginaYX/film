<template>
    <div class="nav" style="position: fixed;z-index: 400;top: 0;left: 0;box-shadow: 0 4px 7px 2px rgba(0,0,0,0.04);">
        <div class="nav-bar">
            <router-link class="nav-left" to="/">
                <h1 style="width: 0px;font-size: 0px;height: 0px;margin: 0;padding: 0;">非慕科技</h1>
                <img src="../assets/indexTop_logo.png" style="margin-top: 4px">
            </router-link>

        </div>
    </div>
</template>

<script>
    export default {
        name: "topNav"
    }
</script>

<style>
    #head_right ul li ul li a:hover {
        background-color: #f9f9f9;
    }

    /*body {*/
        /*background-color: #f9f9f9;*/
    /*}*/

    /*p {*/
        /*font-family: 新宋体;*/
        /*font-size: 16px;*/
        /*color: #333;*/
    /*}*/

    .nav{width: 100%;height: 50px;border-bottom: 1px solid #eee;background-color: #fff;}
    .nav .nav-bar {
        width: 1132px;
        height: 100%;
        overflow: hidden;
        margin: 0 auto;
    }

    .nav-bar .nav-left {
        float: left;
    }

    .nav-bar .nav-left {
        cursor: pointer;
    }

    .nav-bar .nav-right {
        float: left;
    }

    .nav-bar .nav-right img {
        margin-top: 15px;
        margin-left: 44px
    }
</style>
