<template>
  <div align="center">
    <router-link to="/">
      <el-button type="primary" style="margin-bottom: 1%">返回首页</el-button>
    </router-link>
    <br>
    <span style="margin-right: 1%">题目数:</span><el-input style="width: 20%" placeholder="请输入题目数，不超过10" v-model="number"></el-input>
    <br>
    <el-button style="margin-top: 1%" type="primary" :disabled="(number&&(/^\d+$/.test(number))&&(number>=1)&&(number<=10))?false:true" v-on:click="showQuestion">获取题目</el-button>
    <br>
    <div id="question" align="center" style="margin-top: 1%"></div>
  </div>
</template>

<script>
export default {
  name: "Question",
  mounted: function () {
    if(this.$store.state.goQuestionState=="1"){
      this.number = this.$store.state.number;
      var number = this.$store.state.number;
      var question = JSON.parse(localStorage.getItem('questionarray'));
      document.getElementById("question").innerHTML="";
      for (var i = 0; i < number; i++) {
        var button = document.createElement("button");

        //添加点击事件和鼠标移动事件
        button.addEventListener("click", this.goQuestionDetail);
        button.addEventListener("mouseover", this.cardMouseOver);
        button.addEventListener("mouseout", this.cardMouseOut);

        button.innerText = question[i];

        //设置样式
        button.style.border = "solid";
        button.style.width = "600px";
        button.style.minHeight = "100px";
        button.style.height = "auto";
        button.style.marginTop = "14px"
        button.style.backgroundColor = "#ffffff";
        button.style.borderColor = "#EBEEF5";
        button.style.borderWidth = "1px";
        button.style.color = "#606266";
        button.style.fontSize = "14px";
        button.style.boxShadow = "0 2px 12px 0 rgb(0,0,0,0.1)";
        button.style.borderRadius = "4px";
        document.getElementById("question").append(button);
        var br = document.createElement("br");
        document.getElementById("question").append(br);


      }


    }
  },
  data(){
    return{
      number:""
    }
  },
  methods:{
    showQuestion(){
      document.getElementById("question").innerHTML="";
      this.$axios.post('/Question/Random',
          {
            number:this.number

          }).then(
          resp => {
            if (resp.status === 200) {
              var responseData = resp.data;
              var number = responseData.number;
              var question = responseData.question;
              this.$store.commit('storeNumber', number);
              localStorage.setItem('questionarray',JSON.stringify(question));
              for (var i = 0; i < number; i++) {
                var button = document.createElement("button");

                //添加点击事件和鼠标移动事件
                button.addEventListener("click", this.goQuestionDetail);
                button.addEventListener("mouseover", this.cardMouseOver);
                button.addEventListener("mouseout", this.cardMouseOut);

                button.innerText = question[i];

                //设置样式
                button.style.border = "solid";
                button.style.width = "600px";
                button.style.minHeight = "100px";
                button.style.height = "auto";
                button.style.marginTop = "14px"
                button.style.backgroundColor = "#ffffff";
                button.style.borderColor = "#EBEEF5";
                button.style.borderWidth = "1px";
                button.style.color = "#606266";
                button.style.fontSize = "14px";
                button.style.boxShadow = "0 2px 12px 0 rgb(0,0,0,0.1)";
                button.style.borderRadius = "4px";
                document.getElementById("question").append(button);
                var br = document.createElement("br");
                document.getElementById("question").append(br);


              }


            }

          }
      )

    },
    //鼠标移动到卡片上时改变卡片和鼠标的样式
    cardMouseOver(){
      event.target.style.color = "#409EFF";
      event.target.style.cursor = "pointer";

    },

    //鼠标从卡片上移走时恢复卡片和鼠标的样式
    cardMouseOut(){
      event.target.style.color = "#606266";
      event.target.style.cursor = "default";
    },

    goQuestionDetail(){
      this.$store.commit('storeQuestion', event.target.innerText);
      this.$router.push({name:'QuestionDetail'});
    }
  }
}
</script>

<style scoped>

</style>
