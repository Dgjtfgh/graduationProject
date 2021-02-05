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
            <div><label for="">姓名：</label><input :class="changeInfo?'inputdis':'inputabled'" type="text" v-model="name"/></div>
            <div><label for="">学号：</label><input :class="changeInfo?'inputdis':'inputabled'" type="text" v-model="no" /></div>  
            <div><label for="">学院：</label><input :class="changeInfo?'inputdis':'inputabled'" type="text" v-model="college" /></div>  
            <div><label for="">专业：</label><input :class="changeInfo?'inputdis':'inputabled'" type="text" v-model="professional" /></div>
            <div><label for="">性别：</label><input :class="changeInfo?'inputdis':'inputabled'" type="text" v-model="sex" /></div>
            <div><label for="">身份：</label><input :class="changeInfo?'inputdis':'inputabled'" type="text" v-model="sf" /></div>  
            <div>
              <button @click="changeUserInfo">{{this.changeButton}}</button>
            </div>
          </div>
          <div class="pass">
            <div><label for="">原密码：</label><input type="text" v-model="oldPassword" /></div>
            <div><label for="">新密码：</label><input type="text" v-model="newPassword" /></div>
            <div><label for="">验密码：</label><input type="text" v-model="checkNewPass" /></div>
            <div><button>修改密码</button></div>
          </div>
        </div>
      <!-- </el-col> -->
    </div>
  </div>
</template>
<script>
export default {
    data () {
      return {
        name: '肖文凯',
        no: '201720181819',
        college: '软件学院',
        professional: '软件工程',
        sex: '男',
        sf: '学生',
        oldPassword: '',
        newPassword: '',
        checkNewPass: '',
        changeButton: '修改信息',
        changeInfo: false,
      }
    },
    methods: {
      changeUserInfo() {
        console.log(this.changeInfo);
        if(this.changeInfo) {
          // 发送请求
          this.changeButton = '修改信息';
        } else {
          this.changeButton = '确认';
        }
        this.changeInfo = !this.changeInfo;
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
  
}
</style>