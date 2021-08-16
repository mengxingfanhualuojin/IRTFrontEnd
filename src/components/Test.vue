<template>
<div>
  <div style="margin-bottom: 20px">
    <el-button type="primary" @click="goHomePage" plain>放弃测试并返回首页</el-button>
  </div>
  <div align="center">
    第{{this.questionIndex}}题，共{{this.$store.state.questionNumber}}题
    <br>
<!--    <el-card id="question" style="margin-top: 1.5%;width: 600px;font-size: 16px;min-height: 100px;vertical-align: center"></el-card>-->
    <button id="question" class="question-button"></button>
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


    <el-row style="margin-top: 30px">

    <el-col :span="1" :offset="8">
    <el-button id="last" @click="lastQuestion" style="visibility: hidden" type="primary" plain>上一题</el-button>
    </el-col>
      <el-col :span="1" :offset="6">
    <el-button id="next" @click="nextQuestion" style="display: none" type="primary" plain>下一题</el-button>
        </el-col>
    </el-row>
    <el-button id="submitButton" style="margin-top: 1%;display: none" type="primary" v-on:click="submit"  plain>提交答案</el-button>
    <br>

  </div>
</div>
</template>

<script>

export default {
  name: "Test",
  mounted:function (){
    window.onbeforeunload = e => {
      e.returnValue = '';
    };
    this.afterQuestionIndexChange();
  },
  destroyed:function () {
    window.onbeforeunload = null;
  },
  data(){
    return{
      questionIndex:1,
      answer:new Array()
    }
  },
  methods:{
    goHomePage(){
      this.$confirm('确认要放弃测试并返回首页吗', '警告', {
        confirmButtonText: '放弃测试并返回首页',
        cancelButtonText: '继续测试',
        type: 'warning'
      }).then(() => {
        this.$router.push({name:'HomePage'});
      }).catch(() => {

      });
    },
    lastQuestion(){
      this.questionIndex--;
      this.afterQuestionIndexChange();
    },

    nextQuestion() {
      this.questionIndex++;
      this.afterQuestionIndexChange();
    },

    afterQuestionIndexChange(){
      var indexForArray = this.questionIndex - 1;
      var questionNumber = this.$store.state.questionNumber;
      var questionArray = JSON.parse(localStorage.getItem("questionArray"));
      var choiceArray = JSON.parse(localStorage.getItem("choiceArray"));
      var choiceNumber = choiceArray[indexForArray].length;

      document.getElementById("last").style.visibility = "visible";
      document.getElementById("next").style.display = "block";
      document.getElementById("submitButton").style.display = "none";
      if(this.questionIndex == 1){
        document.getElementById("last").style.visibility = "hidden";
      }
      if(this.questionIndex == questionNumber){
        document.getElementById("next").style.display = "none";
        document.getElementById("submitButton").style.display = "block";
      }

      document.getElementById("question").innerHTML = questionArray[indexForArray];
      for(var i=1;i<=choiceNumber;i++){
        var button = document.getElementById(i);
        button.innerText = choiceArray[indexForArray][i-1];

        button.style.display="block";
        button.addEventListener("click",this.cardMouseClick);
        button.style.backgroundColor="#ffffff";
        button.style.color="#606266";
      }
      if(this.answer[indexForArray]){
        var userChoice = this.answer[indexForArray];
        document.getElementById(userChoice).style.backgroundColor = "#C6E2FF";
        document.getElementById(userChoice).style.color="#ffffff";
      }


    },
    cardMouseClick(){
      for(var i=1;i<=8;i++){
        document.getElementById(i).style.backgroundColor="#ffffff";
        document.getElementById(i).style.color="#606266";

      }
      event.target.style.backgroundColor = "#C6E2FF";
      event.target.style.color="#ffffff";
      var userChoice = event.target.id;
      this.answer[this.questionIndex-1] = userChoice;

    },
    numberToLetter(string){
      var number = string * 1;
      switch (number) {
        case 1:return "A";
        case 2:return "B";
        case 3:return "C";
        case 4:return "D";
        case 5:return "E";
        case 6:return "F";
        case 7:return "G";
        case 8:return "H";
      }
    },
    submit(){
      var questionNumber = this.$store.state.questionNumber;
      var questionToDo = new Array();
      var answerAfterHandle = new Array();
      for(var i = 1;i<=questionNumber;i++){
        if(this.answer[i-1]){
          answerAfterHandle.push(this.numberToLetter(this.answer[i-1]));
        }
        else{
          questionToDo.push(i);
          answerAfterHandle.push("NULL");
        }
      }
      var questionToDoLength = questionToDo.length;
      if(questionToDoLength == 0){
        this.$confirm('确认提交吗','提示', {
          confirmButtonText: '确认提交',
          cancelButtonText: '取消提交',
        }).then(() => {
          this.afterSubmit(answerAfterHandle);

        }).catch(() => {
          return;

        });

      }
      else{
        var prompt = "您还有第";
        for(i = 0;i < questionToDoLength -1 ;i++){
          prompt = prompt+questionToDo[i]+", ";
        }
        prompt = prompt + questionToDo[questionToDoLength-1]+"题未做，确认提交吗";
        this.$confirm(prompt, '警告', {
          confirmButtonText: '确认提交',
          cancelButtonText: '返回继续答题',
          type: 'warning'
        }).then(() => {
          this.afterSubmit(answerAfterHandle);
        }).catch(() => {
          return;
        });

      }

    },
    afterSubmit(answerAfterHandle){
      localStorage.setItem('answerAfterHandle',JSON.stringify(answerAfterHandle));

      var questionIdArray = JSON.parse(localStorage.getItem("questionIdArray"));
      this.$axios.post('/irt/estimate_ab',{
        question_id:questionIdArray
      }).then(
          resp =>{
            var abArray = resp.data.data;
            localStorage.setItem('abArray',JSON.stringify(abArray));
            console.log(JSON.parse(localStorage.getItem("abArray")));
          }
      );
      this.$router.replace("/TestResult");

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

.question-button{
  border:solid;
  width: 600px;
  min-height: 100px;
  height: auto;
  margin-top: 20px;
  background-color: #ffffff;
  border-color: #EBEEF5;
  border-width: 1px;
  color: #606266;
  font-size: 16px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
  border-radius: 4px;
  align-self: center;
}
</style>
