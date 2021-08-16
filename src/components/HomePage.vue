<template>
  <div>
    <el-row v-if="this.$store.state.username">
      <el-col :offset="18" :span="2">
        <router-link to="PersonalCenter">
          <el-button type="primary" plain>个人中心</el-button>
        </router-link>
      </el-col>
    </el-row>
    <el-row v-else>
      <el-col :offset="16" :span="1">
        <router-link to="Login">
          <el-button type="primary" plain>登录</el-button>
        </router-link>
      </el-col>

      <el-col style="margin-left: 20px" :span="1">
        <router-link to="Register">
          <el-button type="primary" plain>注册</el-button>
        </router-link>
      </el-col>
    </el-row>

    <div>
      <el-button type="primary" @click="goTest">去测试</el-button>
    </div>
    <div style="margin-top: 1%">
      <router-link to="TableDemo">
        <el-button type="primary">编辑表格</el-button>
      </router-link>
    </div>

    <div style="margin-top: 1%">
      <router-link to="NeovisDemo">
        <el-button type="primary">可视化</el-button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomePage",
  methods:{
    goTest(){
      if(this.$store.state.userid){
        this.$prompt('请输入测试的题目数', '题目数', {
          confirmButtonText: '开始测试',
          inputPlaceholder:'请输入数字，不超过10',
          inputValidator(value) {
            if (value == '' || (!(/^\d+$/.test(value)))) {
              return '请输入数字';
            }
            else if(value>10){
              return '输入的数字不能超过10'
            }

          }
        }).then(({ value }) => {
          this.$store.commit('storeQuestionNumber',value);
          this.$axios.post('/question/find_question',{
            number:value*1
          }).then(resp => {
            var length = resp.data.data.length;
            var respData = resp.data.data;
            var questionArray = new Array();
            var choiceArray = new Array();
            var questionIdArray = new Array();
            var rightAnswerArray = new Array();
            for(var i=0;i<length;i++){
              questionArray.push(respData[i].question);
              choiceArray.push(respData[i].answer);
              questionIdArray.push(respData[i].question_id);
              rightAnswerArray.push(respData[i].right_answer);
            }
            localStorage.setItem('questionArray',JSON.stringify(questionArray));
            localStorage.setItem('choiceArray',JSON.stringify(choiceArray));
            localStorage.setItem('questionIdArray',JSON.stringify(questionIdArray));
            localStorage.setItem('rightAnswerArray',JSON.stringify(rightAnswerArray));
            // console.log(JSON.parse(localStorage.getItem("questionArray")));
            // console.log(JSON.parse(localStorage.getItem("choiceArray")));
            // console.log(JSON.parse(localStorage.getItem("questionIdArray")));
            // console.log(JSON.parse(localStorage.getItem("rightAnswerArray")));


          })
          this.$router.push({name:'Test'});
        }).catch(() => {})
      }
      else{
        this.$message({
          showClose: true,
          message:"请登录后再进行测试",
          duration:0
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
