<!--
  登录页，点击登录按钮进入

  用户名应为5至16位仅字母、数字与下划线的组合
  密码应为5至16位仅字母、数字与下划线的组合

  包含回到首页和去注册按钮
  -->

<template>

  <div v-if="this.$store.state.userid"></div>

  <div v-else>
    <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" label-width="100px" class="login_container">
      <el-form-item label="用户名" prop="username" class="formItem">
        <el-input type="text" v-model="loginForm.username" auto-complete="off" placeholder="请输入用户名"></el-input>
      </el-form-item>



      <el-form-item label="密码" prop="password" class="formItem">
        <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="请输入密码" show-password></el-input>
      </el-form-item>



      <el-form-item >
        <el-button type="primary"  v-on:click="login('loginForm')" plain>登录</el-button>
      </el-form-item>
      <el-form-item >
        <router-link to="/Register" replace>
          <el-button type="primary" plain>还没有账号，去注册</el-button>
        </router-link>
      </el-form-item>
      <el-form-item >
        <router-link to="/" replace>
          <el-button type="primary" plain>不想登录了，回首页</el-button>
        </router-link>
      </el-form-item>
    </el-form>


  </div>
</template>

<script>
export default {
  name: "Login",
  mounted: function () {
    if(this.$store.state.userid){
      this.$message({
        duration:3000,
        showClose:true,
        type: 'error',
        message: '您已登录，请先在个人中心登出后再进行登录，三秒后为您返回首页'
      });
      setTimeout(this.goHomePage,3000);
      return;
    }
  },

  data(){
    //用户名的校验规则
    var validateusername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'));
      }
      else {
        if ((!(/^\w+$/.test(value)))||(value.length<5)||(value.length>16)) {
          callback(new Error('用户名为5至16位仅字母、数字与下划线的组合'));
        }
        callback();
      }
    };

    //密码的校验规则
    var validatepassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if ((!(/^\w+$/.test(value)))||(value.length<5)||(value.length>16)) {
          callback(new Error('密码为5至16位仅字母、数字与下划线的组合'));
        }
        callback();
      }
    };
    return{

      loginForm: {
        username: '',
        password: ''
      },

      //设置密码和确认密码的校验规则
      rules:{
        username: [
          {validator: validateusername, trigger: 'blur'}
        ],

        password: [
          {validator: validatepassword, trigger: 'blur'}
        ],

      }
    }
  },
  methods: {


    //登录，登录成功根据pageBeforeRegisterOrLogin跳转至相应页面，并存储token,username和nickname
    //登录失败展示提示信息
    login (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var username = this.loginForm.username;
          this.$axios.post('/auth/login',
              {
                username: this.loginForm.username,
                password: this.loginForm.password,

              })
              .then(
                  resp => {
                    //if(resp.status === 200 && Object.prototype.hasOwnProperty.call(resp.data,"token")){
                    if(resp.status === 200 && resp.data.code == 0){
                      this.$message({
                        showClose: true,
                        message:"登录成功",
                        type:"success"
                      });
                      this.$store.commit('storeUsername', username);
                      var userid = resp.data.data.user_id;
                      this.$store.commit('storeUserid', userid);
                      this.$router.replace("/");

                    } else{
                      this.$message({
                        showClose: true,
                        message:"用户名或密码错误",
                        type:"error",
                        duration:0
                      });
                    }
                  }
              )
              .catch(error => {
                    this.$message({
                      showClose: true,
                      message:"抱歉！出现了未知错误",
                      type:"error",
                      duration:0
                    });
                    console.log(error)

                  }

              )

        }
        else {

          return false;
        }
      });

    },
    //已登录用户跳转至首页
    goHomePage(){
      this.$router.replace('/');
    },
  }
}
</script>

<style scoped>

.formItem{
  width:30%;
  margin-left: auto;
  margin-right: auto;
}


.login_container{
  margin-top: 3%;
}
</style>
