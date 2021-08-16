<template>
  <div align="center">
    <router-link to="/">
      <el-button type="primary" style="margin-bottom: 1%">返回首页</el-button>
    </router-link>
    <br>
    <span style="margin-right: 1%">应试者数:</span><el-input style="width: 20%;margin-right: 10%" placeholder="请输入应试者数" v-model="examinee"></el-input>
    <span style="margin-right: 1%">题目数:</span><el-input style="width: 20%" placeholder="请输入题目数" v-model="item"></el-input>
    <br>
    <el-button style="margin-top: 1%" type="primary" :disabled="(examinee&&item&&(/^\d+$/.test(examinee))&&(/^\d+$/.test(item))&&(examinee>=1)&&(item>=1))?false:true" v-on:click="showItemResponses">获取答题结果</el-button>
    <br>
    <div id="itemResponses" align="center" style="margin-top: 1%"></div>
  </div>
</template>

<script>
export default {
name: "ItemResponses",
  data(){
    return{
      examinee:"",
      item:""
    }
  },
  methods:{
    showItemResponses(){
      document.getElementById("itemResponses").innerHTML="";
      this.$axios.post('/Result/ItemResponses',
          {
            examinee:this.examinee,
            item:this.item

          }).then(
              resp =>{
                if(resp.status===200){
                    var responseData = resp.data;
                    var examinee = responseData.examinee;
                    var itemresponses = responseData.itemresponses;
                    var item = responseData.item;
                    var table = document.createElement("table");
                    table.border = "1";
                    table.cellPadding = "8";
                    table.style.textAlign = "center";
                    var tr = document.createElement("tr");
                    var td = document.createElement("td");
                    tr.append(td);
                    var i,j;
                    for(j=1;j<=item;j++){
                      var text = "题目"+j;
                      td = document.createElement("td");
                      td.innerText = text;
                      tr.append(td);
                    }
                    table.append(tr);
                    for(i=1;i<=examinee;i++){
                      tr = document.createElement("tr");
                      td = document.createElement("td");
                      td.innerText = "应试者"+i;
                      tr.append(td);
                      for(j=1;j<=item;j++){
                        td = document.createElement("td");
                        td.innerText = itemresponses[i-1][j-1];
                        tr.append(td);
                      }
                      table.append(tr);
                    }
                  document.getElementById("itemResponses").append(table);
                }
              }
      )
    }
  }
}
</script>

<style scoped>

</style>
