<!--
  注册页，点击注册按钮进入

  用户名应为5至16位仅字母、数字与下划线的组合
  昵称应为1至16位
  密码应为5至16位仅字母、数字与下划线的组合
  确认密码应与密码一致

  包含回到首页和去登录按钮
  -->

<template>
  <div v-if="this.$store.state.userid"></div>

  <div v-else>
    <el-form :model="registerForm" status-icon :rules="rules" ref="registerForm" label-width="100px" class="register_container">
      <el-form-item label="用户名" prop="username" class="formItem">
        <el-input type="text" v-model="registerForm.username" auto-complete="off" placeholder="5至16位仅字母、数字与下划线的组合"></el-input>
      </el-form-item>


      <el-form-item label="密码" prop="password" class="formItem">
        <el-input type="password" v-model="registerForm.password" auto-complete="off" placeholder="5至16位仅字母、数字与下划线的组合" show-password></el-input>
      </el-form-item>

      <el-form-item label="确认密码" prop="checkpassword" class="formItem">
        <el-input type="password" v-model="registerForm.checkpassword" auto-complete="off" placeholder="与密码一致" show-password></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary"  v-on:click="register('registerForm')" plain>注册</el-button>
      </el-form-item>
      <el-form-item >
        <router-link to="/Login" replace>
          <el-button type="primary"  plain>已有账号，去登录</el-button>
        </router-link>
      </el-form-item>
      <el-form-item >
        <router-link to="/" replace>
          <el-button type="primary"  plain>不想注册了，回首页</el-button>
        </router-link>
      </el-form-item>
    </el-form>



  </div>
</template>

<script>
export default {
  name: "Register",
  mounted: function () {
    if(this.$store.state.userid){
      this.$message({
        duration:3000,
        showClose:true,
        type: 'error',
        message: '您已登录，请先在个人中心登出后再进行注册，三秒后为您返回首页'
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
          callback(new Error('用户名应为5至16位仅字母、数字与下划线的组合'));
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
          callback(new Error('密码应为5至16位仅字母、数字与下划线的组合'));
        }
        callback();
      }
    };

    //确认密码的校验规则
    var validatecheckpassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.registerForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        return callback();
      }
    };

    return{
      registerForm: {
        username: '',
        password: '',
        checkpassword: '',

      },

      //设置用户名、昵称、密码和确认密码的校验规则
      rules:{
        username: [
          {validator: validateusername, trigger: 'blur'}
        ],
        password: [
          {validator: validatepassword, trigger: 'blur'}
        ],
        checkpassword: [
          {validator: validatecheckpassword, trigger: 'blur' }
        ]
      }
    }
  },
  methods:{

    goHomePage(){
      this.$router.replace('/');
    },
    //注册，检查用户名是否已被注册
    //注册失败展示提示信息，注册成功跳转至登录页
    register (formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post('/auth/register',
              {
                username: this.registerForm.username,
                password: this.registerForm.password,

              })
              .then(
                  resp => {
                    if(resp.status === 200 && resp.data.code == "0"){
                      this.$message({
                        showClose: true,
                        message:"注册成功",
                        type:"success"
                      });
                      this.$router.replace('/Login')
                    } else{
                      this.$message({
                        showClose: true,
                        message:"抱歉！该用户名已被注册",
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



    }

  }
}
</script>

<style scoped>


.formItem{
  width:30%;
  margin-left: auto;
  margin-right: auto;
}
.register_container{
  margin-top: 3%;
}

</style>
