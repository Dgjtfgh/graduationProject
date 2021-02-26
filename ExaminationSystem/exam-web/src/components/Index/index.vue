<template>
  <div id="index">
    <div class="container">
      <!-- <el-col :span="24"> -->
        <div class="content content1-left">
          <h3>欢迎使用考试系统</h3>
          <p>本系统主要功能是试卷生成和在线考试，平时可以使用自主练习模式进行试卷习题练习，在做题中学习进步。考试时老师出题生成试卷，学生登陆系统进行线上考试。还支持线上查询成绩功能。</p>
          <p>系统账号注册需学校学号，学校老师学生绑定使用。</p>
          <p>线上考试时，希望同学们自觉遵守考试规则，诚信考试，营造良好的考试环境。</p>
        </div>
      <!-- </el-col> -->
      <!-- <el-col :span="9"> -->
        <div class="content content1-right">
          <div class="info">
            <p>个人信息</p>
            <div><label for="">姓名：</label><input :class="changeInfo?'inputdis':'inputabled'" type="text" v-model="ruleForm.name"/></div>
            <div><label for="">学号：</label><input :class="changeInfo?'inputdis':'inputabled'" type="text" v-model="ruleForm.number" /></div> 
            <div><label for="">身份：</label><input :class="changeInfo?'inputdis':'inputabled'" type="text" v-model="ruleForm.sf" /></div> 
            <div><label for="">学院：</label><input :class="changeInfo?'inputdis':'inputabled'" type="text" v-model="ruleForm.college" /></div>  
            <div><label for="">专业：</label><input :class="changeInfo?'inputdis':'inputabled'" type="text" v-model="ruleForm.major" /></div>
            <div><label for="">性别：</label><input :class="changeInfo?'inputdis':'inputabled'" type="text" v-model="ruleForm.sex" /></div>
            <div v-if="this.ruleForm.sf != '管理员'">
              <button @click="changeUserInfo">{{this.changeButton}}</button>
            </div>
          </div>
          <!-- <div class="pass">
            <div><label for="">原密码：</label><input type="text" v-model="oldPassword" /></div>
            <div><label for="">新密码：</label><input type="text" v-model="newPassword" /></div>
            <div><label for="">验密码：</label><input type="text" v-model="checkNewPass" /></div>
            <div><button>修改密码</button></div>
          </div> -->
        </div>
      <!-- </el-col> -->
    </div>
    <el-dialog class="changepassdialog" 
      title="密码修改" 
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
    >
      <p v-if="this.isFristLogin" style="margin: 5px; color: red;">为了账号安全请修改初始密码并完善信息！</p>
      <div class="form">
          <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <!-- <el-form-item label="用户名" prop="username">
                <el-input v-model="ruleForm.username"></el-input>
            </el-form-item> -->
            <el-form-item label="姓名" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="是否修改密码">
                <el-button style="width: 80px;" size="mini" round @click="isChangePass">{{this.text}}</el-button>
            </el-form-item>
            <el-form-item v-if="this.ruleForm.changePass" label="新密码" prop="newPassword">
                <el-input type="password" v-model="ruleForm.newPassword" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item v-if="this.ruleForm.changePass" label="确认密码" prop="checkNewPass">
                <el-input type="password" v-model="ruleForm.checkNewPass" autocomplete="off"></el-input>
            </el-form-item>
            <!-- <el-form-item label="身份" prop="sf">
                <el-radio-group v-model="ruleForm.sf">
                    <el-radio label="老师"></el-radio>
                    <el-radio label="学生"></el-radio>
                </el-radio-group>
            </el-form-item> -->
            <el-form-item label="性别" prop="sex">
                <el-input v-model="ruleForm.sex"></el-input>
            </el-form-item>
            <el-form-item label="学院" prop="college">
                <el-input v-model="ruleForm.college"></el-input>
            </el-form-item>
            <el-form-item label="专业" prop="major">
                <el-input v-model="ruleForm.major"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
                <el-button v-if="!this.isFristLogin" @click="dialogFormVisible = false">返 回</el-button>
            </el-form-item>
          </el-form>
        </div>
      <!-- <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="changeInfo">确 定</el-button>
      </div> -->
    </el-dialog>
  </div>
</template>
<script>
import axios from "axios"
import servicePath from "@/config/ApiUrl"
export default {
    data () {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkNewPass !== '') {
            this.$refs.ruleForm.validateField('checkNewPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.newPassword) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        };
      };
      return {
        text: '否',
        dialogFormVisible: false,
        ruleForm: {
          changePass: false,
          sf: '',
          password: '',
          number: '',
          name: '',
          sex: '',
          newPassword: '',
          checkNewPass: '',
          college: '',
          major:''
        },
        rules: {
          newPassword: [
            { required: true, validator: validatePass, trigger: 'blur' }
          ],
          checkNewPass: [
            { required: true, validator: validatePass2, trigger: 'blur' }
          ],
          name: [
            { required: true, message: '填写姓名', trigger: 'blur' }
          ]
        },
        // name: '肖文凯',
        // no: '201720181819',
        // college: '软件学院',
        // professional: '软件工程',
        // sex: '男',
        // sf: '学生',
        isFristLogin: false,
        // oldPassword: '',
        // newPassword: '',
        // checkNewPass: '',
        changeButton: '修改信息',
        changeInfo: false,
      }
    },
    created() {
      this.getUserInfo();
    },
    mounted() {
      // if(this.isFristLogin) {
      //   this.changeUserInfo();
      // }
    },
    methods: {
      isChangePass() {
        this.ruleForm.changePass = !this.ruleForm.changePass;
        if(this.ruleForm.changePass) {
          this.text = '是';
        } else{ this.text = '否'; }
      },
      getUserInfo() {
        // console.log(this.$route.params);
        // const number = this.$route.params.number;
        const number = localStorage.getItem("username");
        const sf = localStorage.getItem("sf");
        console.log(sf);
        axios({
          method: 'GET',
          url: servicePath.getUserInfo,
          params: {
            number: number,
            sf: sf
          },
          withCredentials: true
        }).then(res => {
          // console.log(res);
          this.ruleForm.name = res.data.data[0].name;
          this.ruleForm.number = res.data.data[0].number;
          this.ruleForm.college = res.data.data[0].college
          this.ruleForm.major = res.data.data[0].major
          this.ruleForm.sex = res.data.data[0].sex;
          this.ruleForm.sf = res.data.data[0].sf;
          // this.password = res.data.data[0].password;
          if(res.data.data[0].number == res.data.data[0].password) {
            this.isFristLogin = true;
            this.ruleForm.changePass = true;
            this.changeUserInfo();
          }
        })
      },
      submitForm() {
        axios({
           method: 'POST',
           url: servicePath.updateUserInfo,
           data: this.ruleForm,
           withCredentials: true
        }).then(res => {
          // console.log(res);
          if(res.data.isScuccess) {
            if(this.ruleForm.changePass){
              localStorage.clear();
              this.$message({
                type: 'warning',
                message: '登录失效，请重新登录!'
              });
              // this.$router.push({name:'Login'});
            } else {
              this.$message({
                type: 'success',
                message: '信息修改成功!'
              });
              this.dialogFormVisible = false;
            }
          }
        })
      },
      changeUserInfo() {
        this.dialogFormVisible = true;
      //   console.log(this.changeInfo);
      //   if(this.changeInfo) {
      //     // 发送请求
      //     this.changeButton = '修改信息';
      //   } else {
      //     this.changeButton = '确认';
      //   }
      //   this.changeInfo = !this.changeInfo;
      }
    }
}
</script>
<style lang="less" scoped>
#index{
  margin: 0 20px;
  // width: 100%;
  height: 600px;
  .container {
    position: relative;
    top: 50%;
    transform: translate(0, -50%);
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  
  .content {
    padding: 18px;
    min-height: 40px;
    border-radius: 4px;
    background: #cedbf0;
    
  }
  .content1-left {
    min-width: 600px;
    width: 60%;
    p{
      text-align: left;
      text-indent: 2em;
    }
  }
  .content1-right {
    min-width: 500px;
    display: flex;
    justify-content: space-around;
    margin-top: 30px;
    width: 50%;
    input:focus{
      outline:none;
    }
    button {
      background-color: #fff;
      width: 100px;
      height: 30px;
      border-radius: 4px;
      margin-top: 10px;
      border: none;
    }
    button:focus{
      outline:none;
    }
    button:hover{
      background-color: rgb(177, 187, 218);
    }
    .inputdis{
      border:black;
      pointer-events:auto;
    }
    .inputabled{
      border: none;
      pointer-events: none;
    }
    .info {
      margin-bottom: 2px;
      div {
        margin-bottom: 5px;
      }
      input{
        // border: none;
        // pointer-events: none;
        // background-color: transparent;
      }
    }
    .pass {
      // width: 50%;
      padding-top: 10%;
      div {
        margin-bottom: 20px;
      }
      // input {
        // margin-bottom: 16px;
      // }
    }
  }
  .changepassdialog{
    .el-dialog__body{
      padding: 0 !important;
    }
    .el-form-item{
      margin-bottom: 20px !important;
    }
  }
  
}
</style>