<template>
<div>
  <div id="a" data-my-second="这是第一个自定义属性"></div>
  <el-button @click="show"></el-button>
  <el-button @click="test">测试</el-button>
  <el-button @click="testAgain">测试数学字母转换</el-button>
  <router-link to="/" replace>
    <el-button type="primary"  plain>不想注册了，回首页</el-button>
  </router-link>
</div>
</template>

<script>
export default {
name: "Demo",
  // mounted:function (){
  // console.log(this.$store.state.search);
  // this.$store.commit("storeSearch",1);
  // },
  // destroyed:function () {
  //   this.$store.commit("storeSearch",0);
  // },


  methods:{
  test(){
    this.$axios.post("/auth/login",{
      "username":'tony',
      "password":'ty'
    }).then(
            resp => {
              console.log(resp.data);
            }
    )
  },
  show(){
      this.$prompt('请输入您想提问的问题', '提问', {
        confirmButtonText: '确定',
        inputPlaceholder:'请输入数字，不超过1000',
        inputValidator(value) {
          if (value === '') {
            return '请输入数字';
          } else if ((!(/^\d+$/.test(value)))) {
              return '请输入数字';
            }
          else if(value>1000){
            return '不超过1000'
          }

        }
      }).then(({ value }) => {
          alert(value)
      }).catch(() => {})
    },
    testAgain(){
    console.log(this.numberToLetter("3"));
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
}

  }

}
</script>

<style scoped>

</style>
