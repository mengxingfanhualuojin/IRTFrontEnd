<template>
<div align="center">
  {{this.index}}/{{this.$store.state.number}}
  <br>
  <el-card id="question" style="margin-top: 1.5%;width: 600px;font-size: 16px"></el-card>
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
  <el-button id="submitButton" style="margin-top: 1%;display: none" type="primary" v-on:click="submit"  plain>提交答案</el-button>
  <br>
  <el-button id="before" @click="beforeQuestion" style="display: none">上一题</el-button>
  <el-button id="next" @click="nextQuestion" style="display: none">下一题</el-button>
</div>
</template>

<script>
var answer = new Array();
export default {
  name: "AnswerDemo",
  mounted: function () {
    // this.$axios.post('/Question/Detail',
    //     {
    //       question:this.$store.state.question
    //
    //     }).then(
    //     resp =>{
    //       if(resp.status===200) {
            //var responseData = resp.data;
    //var responseData;
    this.afterIndexChange();
            // var number = responseData.number;
            // var choice = responseData.choice;
            // var correct = responseData.correct;

            // for(var i=1;i<=number;i++){
            //   var button = document.getElementById(i);
            //   button.innerText = choice[i-1];
            //   if(choice[i-1]==correct){
            //     this.$store.commit("storeCorrectChoice",i);
            //   }
            //   button.style.display="block";
            //   button.addEventListener("click",this.cardMouseClick)
            // }
       //   }
      //  }
    //)


  },
  data(){
    return{
      index:1
    }
  },
  methods:{
    cardMouseClick(){
      for(var i=1;i<=8;i++){
        document.getElementById(i).style.backgroundColor="#ffffff";
        document.getElementById(i).style.color="#606266";

      }
      event.target.style.backgroundColor = "#C6E2FF";
      event.target.style.color="#ffffff";
      var userChoice = event.target.id;

      answer[this.index-1] = userChoice;

    },
    nextQuestion(){
      this.index++;
      this.afterIndexChange();

    },
    beforeQuestion(){
      this.index--;
      this.afterIndexChange();
    },
    afterIndexChange(){
      var number = this.$store.state.number;
      document.getElementById("before").style.display = "block";
      document.getElementById("next").style.display = "block";
      document.getElementById("submitButton").style.display = "none";
      if(this.index==1){
        document.getElementById("before").style.display = "none";
      }
      if(this.index==this.$store.state.number){
        document.getElementById("next").style.display = "none";
        document.getElementById("submitButton").style.display = "block";
      }
      //document.getElementById("question").innerHTML = respData[this.index-1];
      document.getElementById("question").innerHTML = "demo";
      for(var i=1;i<=number;i++){
        var button = document.getElementById(i);
        button.innerText = i;

        button.style.display="block";
        button.addEventListener("click",this.cardMouseClick);
        button.style.backgroundColor="#ffffff";
        button.style.color="#606266";
      }
      if(answer[this.index-1]){
        var userChoice = answer[this.index-1];
        document.getElementById(userChoice).style.backgroundColor = "#C6E2FF";
        document.getElementById(userChoice).style.color="#ffffff";
      }
    },
    submit(){
      console.log(answer);
    }
    // submit(){
    //   for(var i=1;i<=8;i++){
    //     document.getElementById(i).removeEventListener("click",this.cardMouseClick);
    //   }
    //   var userChoice = this.$store.state.userChoice;
    //   var correctChoice = this.$store.state.correctChoice;
    //   document.getElementById("submitButton").style.display = "none";
    //   if(userChoice==correctChoice){
    //     document.getElementById("right").style.display="block";
    //   }
    //   else{
    //     document.getElementById("wrong").style.display="block";
    //     document.getElementById(correctChoice).style.backgroundColor = "#FFA500";
    //     document.getElementById(correctChoice).style.color= "#ffffff";
    //   }
    //
    // }

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
