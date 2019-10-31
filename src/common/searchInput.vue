<template>
  <el-input placeholder="请输入查找内容" v-model="input" class="frameTopSearch" @keyup.enter.native="getSearch">
    <el-button slot="append" icon="iconfont iconsousuo" @click="getSearch"></el-button>
  </el-input>
</template>

<script>
    export default {
      name: "searchInput",
      data(){
          return{
            input:'',
          }
      },
      methods:{
        getSearch(){
          this.$emit('get-search',this.input)
        }
      }
    }
</script>

<style>
  @import "../css/el-form.css";
</style>
