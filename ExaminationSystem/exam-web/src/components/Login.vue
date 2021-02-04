<template>
    <!-- <div id="login"> -->
      <div id="login">
        <div class="title">
            <h2>欢迎登录考试系统</h2> 
        </div>
        <div class="form">
          <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="ruleForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="身份" prop="sf">
                <el-radio-group v-model="ruleForm.sf">
                    <el-radio label="老师"></el-radio>
                    <el-radio label="学生"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                <el-button @click="jumpRegister()">注册</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    <!-- </div> -->
</template>
<script>
export default {
  name: 'Login',
    data() {
    //   var checkUserName = (rule, value, callback) => {
    //     if (!value) {
    //       return callback(new Error('用户名不能为空'));
    //     }
    //   };
    //   var validatePassWord = (rule, value, callback) => {
    //     if (value === '') {
    //       callback(new Error('请输入密码'));
    //     } 
    //   };
      return {
        ruleForm: {
          sf: '',
          password: '',
          username: ''
        },
        rules: {
          sf: [
            { required: true, message: '请选择身份', trigger: 'change' }
          ],
          password: [
            { required: true, message: '填写密码', trigger: 'blur' }
          ],
          username: [
            { required: true, message: '填写用户名', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.ruleForm);
            localStorage.setItem("username", this.ruleForm.username);
            localStorage.setItem("sf", this.ruleForm.sf);
            this.$router.push({name:'Index'});
            // alert('submit!');
          } else {
            console.log('error submit!!');
            return false
          }
        })
      },
      jumpRegister () {
        this.$router.push({name:'Register'});
      }
    }
}
</script>
<style scoped>
/* #login {
    width: 100vw;
    height: 100vh;
} */
#login {
    width: 400px;
    height: 400px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}
.form {
    margin-top: 50px;
    padding-right: 50px;
}
</style>
