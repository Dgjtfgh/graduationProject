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
          <p>个人信息</p>
          <div><label for="">姓名：</label><input type="text" v-model="name"/></div>
          <div><label for="">学号：</label><input type="text" v-model="no" /></div>  
          <div><label for="">学院：</label><input type="text" v-model="college" /></div>  
          <div><label for="">专业：</label><input type="text" v-model="professional" /></div>  
          <div>
            <button>修改密码</button>
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
        professional: '软件工程'
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
    p{
      text-align: left;
      text-indent: 2em;
    }
  }
  .content1-left {
    width: 60%;
  }
  .content1-right {
    margin-top: 30px;
    width: 50%;
    div {
      margin-bottom: 2px;
      input{
        border: none;
        pointer-events: none;
        // background-color: transparent;
      }
      input:focus{
        outline:none;
      }
      button {
        background-color: #fff;
        width: 100px;
        height: 30px;
        border-radius: 4px;
        margin-top: 20px;
        border: none;
      }
      button:focus{
        outline:none;
      }
      button:hover{
        background-color: rgb(177, 187, 218);
      }
    }
  }
  
}
</style>