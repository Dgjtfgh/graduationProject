<template>
    <div id="register">
        <div class="title">
         <h2>欢迎注册考试系统</h2>
        </div>
        <div class="form">
          <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="ruleForm.username"></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
                <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="身份" prop="sf">
                <el-radio-group v-model="ruleForm.sf">
                    <el-radio label="老师"></el-radio>
                    <el-radio label="学生"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="性别" prop="sex">
                <el-input v-model="ruleForm.sex"></el-input>
            </el-form-item>
            <el-form-item label="学院" prop="college">
                <el-input v-model="ruleForm.college"></el-input>
            </el-form-item>
            <el-form-item label="专业" prop="professional">
                <el-input v-model="ruleForm.professional"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
                <el-button @click="back()">返回</el-button>
            </el-form-item>
          </el-form>
        </div>
    </div>
    
</template>
<script>
export default {
    name: 'Register',
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        };
      };
      return {
        ruleForm: {
          sf: '',
          password: '',
          username: '',
          name: '',
          sex: '',
          checkPass: '',
          college: '',
          professional:''
        },
        rules: {
          sf: [
            { required: true, message: '请选择身份', trigger: 'change' }
          ],
          password: [
            { required: true, validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { required: true, validator: validatePass2, trigger: 'blur' }
          ],
          username: [
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
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false
          }
        })
      },
      back () {
          this.$router.go(-1);
      }
    }
}
</script>
<style scoped>
#register {
    width: 400px;
    height: 600px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}
.form {
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