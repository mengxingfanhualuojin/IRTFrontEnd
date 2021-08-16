<template>
<div>
  <router-link to="Login">
    <el-button style="margin-top: 1%" type="primary" plain>登录</el-button>
  </router-link>
  <br>
  <router-link to="Register">
    <el-button style="margin-top: 1%" type="primary" plain>注册</el-button>
  </router-link>
  <br>
  <router-link to="Graph">
    <el-button style="margin-top: 1%" type="primary" plain>画图</el-button>
  </router-link>
  <br>
  <router-link to="ItemResponses">
    <el-button style="margin-top: 1%" type="primary" plain>获取答题结果</el-button>
  </router-link>
  <br>
    <el-button style="margin-top: 1%" type="primary" v-on:click="goQuestion" plain>获取题目</el-button>
</div>
</template>

<script>
export default {
  name: "OldHomePage",
  methods:{
    goQuestion(){
        this.$store.commit("storeGoQuestionState","0");
      this.$router.push({name:'Question'});
    }
  }
}
</script>

<style scoped>

</style>
