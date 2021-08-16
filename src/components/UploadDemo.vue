<template>
<div align="center">
  <div style="width: 500px">
  <el-upload
      :multiple="false"
      action="https://jsonplaceholder.typicode.com/posts/"
      :file-list="fileList"
      :on-change="fileChange"
      :before-remove="removeFile"
      :limit=1
      :auto-upload="false">
    <el-button slot="trigger" type="primary" :disabled="alreadyHaveFile?true:false">选取文件</el-button>
    <el-button style="margin-left: 10px;" type="success" @click="uploadFile" :disabled="alreadyHaveFile?false:true">上传到服务器</el-button>
<!--    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
  </el-upload>
  </div>
</div>
</template>

<script>
export default {
name: "UploadDemo",
  data(){
  return{
    alreadyHaveFile:false,
    fileList:[],
    file:''
  }
  },
  methods:{
    fileChange(file) {
      this.file = file.raw
      this.alreadyHaveFile = true
    },
    removeFile(){
      this.alreadyHaveFile = false
    },
    uploadFile(){
      let formData = new FormData()
      formData.append('file', this.file)
      this.$axios.post('/kg/fileupload',
          formData,
          { "Content-Type": "multipart/form-data" }
      )
          .then(resp => {
            var code = resp.data.code;
            if(code == 0){
              this.$message({
                message: '上传成功',
                type: 'success',
                showClose:true
              });
              this.alreadyHaveFile = false;
              this.file = "";
              this.fileList = [];
            }
            else{
              this.$message({
                message: '上传失败，请重试',
                type: 'error',
                showClose:true,
                duration:0
              });
            }
          })
          .catch(

          )
    }
  }
}
</script>

<style scoped>

</style>
