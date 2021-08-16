<template>
<div align="center">
  <router-link to="/">
    <el-button type="primary" style="margin-bottom: 1%">返回首页</el-button>
  </router-link>
  <br>
  <el-button style="margin-top: 1%" type="primary" v-on:click="goQuestion" plain>返回上一页查看其他题目</el-button>
  <el-card style="margin-top: 1.5%;width: 600px;font-size: 16px">{{this.$store.state.question}}</el-card>
  <div id="choice" style="margin-top: 3%">
    <button  id="1" style="display: none" class="card-like-button">
    </button>
    <button  id="2" style="display: none" class="card-like-button">
    </button>
    <button  id="3" style="display: none" class="card-like-button">
    </button>
    <button  id="4" style="display: none" class="card-like-button">
    </button>
    <button  id="5" style="display: none" class="card-like-button">
    </button>
    <button  id="6" style="display: none" class="card-like-button">
    </button>
    <button  id="7" style="display: none" class="card-like-button">
    </button>
    <button  id="8" style="display: none" class="card-like-button">
    </button>

  </div>
  <el-button id="submitButton" style="margin-top: 1%" type="primary" :disabled="(hasAnswered==1)?false:true" v-on:click="submit" plain>提交答案</el-button>
  <el-tag id="right" type="success" style="display: none;margin-top:1.3%;width:100px;height:30px;text-align:center;font-size: 14px">回答正确</el-tag>
  <el-tag id="wrong" type="danger" style="display: none;margin-top:1.3%;width: 300px;height:30px;text-align:center;font-size: 14px">回答错误,正确答案为橙色的选项</el-tag>

</div>
</template>

<script>
export default {
  name: "QuestionDetail",
  data(){
    return{
      hasAnswered:0
    }
  },
  mounted: function () {
    this.$axios.post('/Question/Detail',
        {
          question:this.$store.state.question

        }).then(
        resp =>{
          if(resp.status===200) {
            var responseData = resp.data;
            var number = responseData.number;
            var choice = responseData.choice;
            var correct = responseData.correct;

            for(var i=1;i<=number;i++){
              var button = document.getElementById(i);
              button.innerText = choice[i-1];
              if(choice[i-1]==correct){
                this.$store.commit("storeCorrectChoice",i);
              }
              button.style.display="block";
              button.addEventListener("click",this.cardMouseClick)
            }
          }
        }
    )


  },
  methods:{
    goQuestion(){
      this.$store.commit("storeGoQuestionState","1");
      this.$router.push({name:'Question'});
    },
    cardMouseClick(){
      this.hasAnswered=1;
        for(var i=1;i<=8;i++){
          document.getElementById(i).style.backgroundColor="#ffffff";
          document.getElementById(i).style.color="#606266";

        }
      event.target.style.backgroundColor = "#C6E2FF";
      event.target.style.color="#ffffff";
      var userChoice = event.target.id;
      this.$store.commit("storeUserChoice",userChoice);
    },
    submit(){
      for(var i=1;i<=8;i++){
        document.getElementById(i).removeEventListener("click",this.cardMouseClick);
      }
      var userChoice = this.$store.state.userChoice;
      var correctChoice = this.$store.state.correctChoice;
      document.getElementById("submitButton").style.display = "none";
      if(userChoice==correctChoice){
        document.getElementById("right").style.display="block";
      }
      else{
        document.getElementById("wrong").style.display="block";
        document.getElementById(correctChoice).style.backgroundColor = "#FFA500";
        document.getElementById(correctChoice).style.color= "#ffffff";
      }

    }

  }
}
</script>

<style scoped>
.card-like-button:hover{
  cursor: pointer;
}

.card-like-button{
  border:solid;
  width: 400px;
  min-height: 60px;
  height: auto;
  margin-top: 20px;
  background-color: #ffffff;
  border-color: #EBEEF5;
  border-width: 1px;
  color: #606266;
  font-size: 14px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
  border-radius: 4px;
  align-self: center;
}

</style>
