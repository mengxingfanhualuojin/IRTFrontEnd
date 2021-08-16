<template>
  <div align="center">
    <el-backtop></el-backtop>
    <div style="margin-bottom: 20px">
      <el-button @click="goHomePage">返回首页</el-button>
    </div>
    <div align="center">
      测试结果
      <br>
      <el-row style="margin-top: 20px">

        <el-col :span="1" :offset="8">
          <el-button id="last" @click="lastQuestion" style="visibility: hidden" type="primary" plain>上一题</el-button>
        </el-col>
        <el-col :span="1" :offset="6">
          <el-button id="next" @click="nextQuestion" style="display: none" type="primary" plain>下一题</el-button>
        </el-col>
      </el-row>
      第{{this.questionIndex}}题，共{{this.$store.state.questionNumber}}题
      <br>
      <!--    <el-card id="question" style="margin-top: 1.5%;width: 600px;font-size: 16px;min-height: 100px;vertical-align: center"></el-card>-->
      <button id="question" class="question-button"></button>
      <div id="choice">
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


      <br>

    </div>
    <el-tag style="font-size: 14px">{{this.answerString}}，正确答案是{{this.rightAnswer}}</el-tag>
    <div style="margin-top: 20px;color: #F56C6C">以下是本题难度、区分度和IRT曲线</div>

    <div style="margin-top: 20px">本题难度为{{this.b}}，区分度为{{this.a}}</div>
    <div id="graph" align="center" style="width: 800px;height: 500px" ></div>


  </div>
</template>

<script>
var myChart;
import * as echarts from "echarts";

export default {
name: "TestResult",
  mounted:function (){
    this.afterQuestionIndexChange();
  },
  data(){
    return{
      questionIndex:1,
      answerString:"",
      rightAnswer:"",
      a:1,
      b:1
    }
  },
  methods:{
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
      if(this.questionIndex == 1){
        document.getElementById("last").style.visibility = "hidden";
      }
      if(this.questionIndex == questionNumber){
        document.getElementById("next").style.display = "none";
      }

      document.getElementById("question").innerHTML = questionArray[indexForArray];
      for(var i=1;i<=choiceNumber;i++){
        var button = document.getElementById(i);
        button.innerText = choiceArray[indexForArray][i-1];

        button.style.display="block";
        button.style.backgroundColor="#ffffff";
        button.style.color="#606266";
      }
      var answerAfterHandle = JSON.parse(localStorage.getItem('answerAfterHandle'));
      var answerForThisQuestion = answerAfterHandle[indexForArray];
      if(answerForThisQuestion=="NULL"){
        this.answerString = "您未作答";
      }
      else {
        this.answerString = "您的答案为"+answerForThisQuestion;
      }
      var rightAnswerArray = JSON.parse(localStorage.getItem('rightAnswerArray'));
      this.rightAnswer = rightAnswerArray[indexForArray];
      //TODO
      this.a = Math.random()*4-2;
      this.b = Math.random()*4-2;
      this.draw();




    },
    goHomePage(){
      this.$confirm('确认要返回首页吗', '提示', {
        confirmButtonText: '返回首页',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        this.$router.replace({name:'HomePage'});
      }).catch(() => {

      });
    },
    draw(){
      document.getElementById("graph").innerHTML="";
      if(myChart){
        myChart.dispose();
      }
      myChart = echarts.init(document.getElementById('graph'));



      var dotsArray = new Array();

      var x;
      for(x=-3.0;x<=3.0;x+=0.0001){
        var dot = new Array();
        dot.push(x);
        var y = 1/(1+Math.exp(-this.a*(x-this.b)));
        dot.push(y);
        dotsArray.push(dot);
      }
      // 绘制图表
      myChart.setOption({
        animation:false,

        xAxis: {
          min:-3,
          max:3,
          type: 'value',
          splitLine:{show: false},
          name:"θ"

        },
        yAxis: {
          min:0.0,
          max:1.0,
          type: 'value',
          interval:0.1,
          splitLine:{show: false},
          axisLine:{
            onZero:false
          },
          name:"P(θ)",
          nameLocation:"middle",
          nameGap:30
        },
        series: [{
          data: dotsArray,
          showSymbol: false,
          type: 'line',
          smooth: true
        }]
      });
    }
  }
}
</script>

<style scoped>

.card-like-button{
  border:solid;
  width: 400px;
  min-height: 60px;
  height: auto;
  margin-top: 10px;
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
