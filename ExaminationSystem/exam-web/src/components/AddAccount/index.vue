<template>
    <div id="addaccount">
        <div class="notice">
            <h4> 师生账号请使用师生编号注册，所有账号注册后的初始密码是师生编号。</h4>
        </div>
        <div class="content">
            <div class="form">
                <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="用户名" prop="number">
                        <el-input v-model="ruleForm.number"></el-input>
                    </el-form-item>
                    <el-form-item label="姓名" prop="name">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="身份" prop="sf">
                        <el-radio-group v-model="ruleForm.sf">
                            <el-radio label="管理员"></el-radio>
                            <el-radio label="老师"></el-radio>
                            <el-radio label="学生"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">添加</el-button>
                        <!-- <el-button @click="back()">返回</el-button> -->
                    </el-form-item>
                </el-form>
            </div>
        </div>
        
    </div>
    
</template>
<script>
import axios from "axios"
import servicePath from "@/config/ApiUrl"
export default {
    name: 'AddAccount',
    data() {
      return {
        ruleForm: {
          sf: '',
          number: '',
          name: ''
        },
        rules: {
          sf: [
            { required: true, message: '请选择身份', trigger: 'change' }
          ],
          number: [
            { required: true, message: '填写用户名', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '填写姓名', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.ruleForm);
            axios({
                method: 'POST',
                url: servicePath.addAccount,
                data: this.ruleForm,
                withCredentials: true
            }).then(res => {
                // console.log(res);
                if(res.data.isScuccess) {
                    this.$message({
                        type: 'success',
                        message: '添加成功!'
                    });
                    this.ruleForm.number = '';
                    this.ruleForm.name = '';
                    // this.ruleForm.sf = '';
                }
            })
          } else {
            this.$message.error("提交失败！");
            console.log('error submit!!');
            return false
          }
        })
      },
    //   back () {
    //       this.$router.go(-1);
    //   }
    }
}
</script>
<style scoped>
#addaccount {
    width: 800px;
    height: 600px;
    position: absolute;
    left: 50%;
    /* top: 50%; */
    transform: translateX(-50%);
    
}
.notice {
  /* margin-top: 60px; */
    width: 1005;
    min-width: 800px;
    padding: 20px;
    border-radius: 4px;
    background: #cedbf0;
    text-align: center;
}
/* .h4{
    margin: 0;
    padding: 0;
} */
.content{
    margin-top: 20px;
    width: 100%;
    background: #cedbf0;
    padding: 20px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
}
.form {
    width: 400px;
    margin-top: 50px;
    padding-right: 50px;
}
.el-form-item__label{
    width: 60px !important;
}
.el-form-item{
    margin-bottom: 20px;
}
</style>