<template>
<div align="center">
  <router-link to="/">
    <el-button type="primary" style="margin-bottom: 1%">返回首页</el-button>
  </router-link>
  <br>
  <span style="margin-right: 1%">a:</span><el-input style="width: 20%;margin-right: 10%" placeholder="请输入区分度a, -2.8 ≤ a ≤ 2.8" v-model="a" min="-2.8" max="2.8" ></el-input>
  <span style="margin-right: 1%">b:</span><el-input style="width: 20%" placeholder="请输入难度b, -3 ≤ b ≤ 3" v-model="b" min="-3" max="3" ></el-input>
  <br>
  <el-button type="primary" :disabled="(a&&b&&a>=-2.8&&a<=2.8&&b>=-3&&b<=3)?false:true" v-on:click="draw">绘制</el-button>
  <br>
  <div id="graph" align="center" style="width: 800px;height: 500px" ></div>
</div>
</template>

<script>
import * as echarts from 'echarts';
var myChart;
export default {
name: "Graph",
  data(){
  return{
    a:"",
    b:""
  }
  },

  methods: {
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

</style>
