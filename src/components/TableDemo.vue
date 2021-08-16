<template>
  <div>
    <el-button type="primary" @click="dialogVisible=true" plain>返回首页</el-button>

<div align="left">  <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="50%"
        >
      <span>选择暂存并返回首页，将为您暂存内容并为您跳转至首页<br>选择不暂存，直接返回首页，将放弃您上一次成功暂存至今的编辑，可能会丢失数据</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">返回继续编辑</el-button>
    <el-button type="primary" @click="saveAndGoHomePage">暂存并返回首页</el-button>
    <el-button type="primary" @click="goHomePageWithoutSave">不暂存，直接返回首页</el-button>
  </span>
    </el-dialog>
</div>





    <el-form :model="demoForm" ref="demoForm" label-width="100px">
    <el-form-item
        v-for="(userInput, index) in demoForm.userInputs"
        :key="userInput.key"
    >
      <el-row>
        <el-col :span="6">
          <el-form-item :prop="'userInputs.' + index + '.item1'"
                    :rules="{
      required: true, message: '不能为空'
    }">
      <el-input type="textarea"
                autosize v-model="userInput.item1"></el-input>
      </el-form-item>
        </el-col>

        <el-col :span="6">

      <el-form-item :prop="'userInputs.' + index + '.item2'"
                    :rules="{
      required: true, message: '不能为空'
    }">
        <el-input type="textarea"
                  autosize v-model="userInput.item2"></el-input>
      </el-form-item>
        </el-col>

        <el-col :span="6">

      <el-form-item :prop="'userInputs.' + index + '.item3'"
                    :rules="{
      required: true, message: '不能为空'
    }">
        <el-input type="textarea"
                  autosize v-model="userInput.item3"></el-input>
      </el-form-item>
        </el-col>

<el-col :span="6">
      <el-button @click.prevent="removeRow(userInput)">删除</el-button>
</el-col>
      </el-row>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('demoForm')">提交</el-button>
      <el-button @click="addRow">新增行</el-button>
      <el-button @click="save">暂存</el-button>
    </el-form-item>
  </el-form>
  </div>
</template>

<script>
export default {
name: "TableDemo",
  mounted: function () {
  var userInputs = JSON.parse(localStorage.getItem("userInputs"));
  if(userInputs){
    this.demoForm.userInputs = userInputs;
  }
    // window.onbeforeunload = function (){
    //   alert("确认");
    // }

  },
  data() {
    return {
      dialogVisible:false,
      demoForm: {
        userInputs: [{
          key:Date.now(),
          item1: '',
          item2:'',
          item3:''
        }],
      }
    };
  },
  methods: {
  saveAndGoHomePage(){
    localStorage.setItem('userInputs',JSON.stringify(this.demoForm.userInputs));
    this.dialogVisible = false;
    this.$router.push({name:'HomePage'});
    this.$message({
      message: '暂存成功',
      type: 'success',
      showClose:true
    });

  },
    goHomePageWithoutSave(){
      this.dialogVisible = false;
      this.$router.push({name:'HomePage'});
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var userInputs = new Array();
          var length = this.demoForm.userInputs.length;
          // for(var index in this.demoForm.userInputs){
          for(var i=0;i<length;i++){
            var userInput = this.demoForm.userInputs[i];
            var row = new Array();
            row.push(userInput["item1"]);
            row.push(userInput["item2"]);
            row.push(userInput["item3"]);
            userInputs.push(row);

          }
          console.log(userInputs);
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },

    removeRow(item) {
      var index = this.demoForm.userInputs.indexOf(item);
      if (index !== -1) {
        this.demoForm.userInputs.splice(index, 1)
      }
    },
    addRow() {
      this.demoForm.userInputs.push({
        item1: '',
        item2:'',
        item3: '',
        key: Date.now()
      });
    },
    save(){
      localStorage.setItem('userInputs',JSON.stringify(this.demoForm.userInputs));
      this.$message({
        message: '暂存成功',
        type: 'success',
        showClose:true
      });
    }
  }
}
</script>

<style scoped>

</style>
