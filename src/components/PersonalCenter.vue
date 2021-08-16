<template>
<div>
  {{this.$store.state.userid}}
<el-button type="primary" plain @click="logout">登出</el-button>
</div>
</template>

<script>
export default {
name: "PersonalCenter",
  methods:{
  logout(){
    this.$confirm('确定登出吗?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'info'
    }).then(() => {
      this.$message({
        showClose: true,
        message:"登出成功",
        type:"success"
      });
      this.$store.commit('logout');
      this.$router.replace("/");
    }).catch(() => {

    });
  }
  }
}
</script>

<style scoped>

</style>
