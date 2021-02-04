<template>
  <div id="exampaper">
    <div class="desc">
      <div><label for="">考试科目：</label><input type="text" v-model="course"/></div>
      <div><label for="">试卷ID：</label><input type="text" v-model="id"/></div>
      <div><label for="">试卷名称：</label><input class="paper-name" type="text" v-model="paperName"/></div>
      <div><label for="">题目数量：</label><input type="text" v-model="amount"/></div>
      <div><label for="">考试时长：</label><input :class="{ time:true, remain: timeFlag }" type="text" v-model="remainTime"/></div>
    </div>
    <div class="container">
      <div class="left">
        <p>请遵守考试规则</p>
        <p>城实守信，争做文明考生</p>
        <p class="minTitle">考生信息</p>
          <div><label for="">姓名：</label><input :class="changeInfo?'inputdis':'inputabled'" type="text" v-model="studentName"/></div>
          <div><label for="">学号：</label><input :class="changeInfo?'inputdis':'inputabled'" type="text" v-model="studentNo" /></div>  
          <div><label for="">学院：</label><input :class="changeInfo?'inputdis':'inputabled'" type="text" v-model="college" /></div>  
          <div><label for="">专业：</label><input :class="changeInfo?'inputdis':'inputabled'" type="text" v-model="professional" /></div>  
          <div>
            <el-button size="small" @click="changeStudentInfo">{{this.changeButton}}</el-button>
          </div>
      </div>
      <div class="right">
        <div class="warn" v-if="this.show">
          <h3>请核对左侧信息是否正确</h3>
          <p>如信息有误，请点击修改按钮进行修改</p>
          <p>确认信息后，请点击下方按钮开始考试，否则请点返回键</p>
          <el-button size="small" @click="start">开始考试</el-button>
          <el-button size="small" @click="back">返回</el-button>
        </div>
        <div class="questions" v-else>
          <QuestionView v-bind:ques="questionItem" />
          <div class="operate">
            <el-pagination
              background
              @current-change="handleCurrentChange"
              layout="prev, pager, next"
              :page-count="50">
            </el-pagination>
            <el-button size="small" @click="submitAnswer">提交试卷</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import QuestionView from "./questions"
export default {
  components: {
    QuestionView
  },
  data () {
    return {
      timeFlag: false,
      changeButton: '修改',
      changeInfo: false,
      show: true,
      course: '高数',
      id: '1',
      paperName: 'C++综合测试卷A',
      amount: 50,
      studentName: '肖文凯',
      studentNo: '201720181819',
      college: '软件学院',
      professional: '软件工程',
      remainingTime: 30,
      timerFlag: null,
      questionItem: {
          type: '1', // 选择题
          id: '1',
          question: '我们只看到了以字符串数组形式列出的 prop：',
          answer: '',
        },
      questionsList: [
        {
          type: '1', // 选择题
          id: '1',
          question: '我们只看到了以字符串数组形式列出的 prop：',
          answer: '',
        },
        {
          type: '2', // 简答题
          id: '2',
          question: '',
          answer: '',
        }
      ]
    }
  },
  watch: {
    remainingTime: function(newQuestion, oldQuestion) {
      if(newQuestion === 0) {
        this.submitAnswer();
      }
      if(newQuestion = 20) {
        this.timeFlag = true;
      }
    }
  },
  computed: {
    remainTime: function () {
      return this.sec_to_time(this.remainingTime);
    }
  },
  created() {
    // console.log(this.course, this.remainingTime, '-------')
    
  },
  methods: {
    start() {
      this.show = false;
      this.countdawn();
    },
    back() {
      this.$router.go(-1);
    },
    changeStudentInfo() {
      if(this.changeInfo) {
        this.changeButton = '修改';
      } else {
        this.changeButton = '确认';
      }
      this.changeInfo = !this.changeInfo;
    },
//     time_to_sec(time) {
//       console.log(time)
//   　　if (time !== null) {
//         var s = "";
//         var hour = time.split(":")[0];
//         var min = time.split(":")[1];
//         var sec = time.split(":")[2];
//         s = Number(hour * 3600) + Number(min * 60) + Number(sec);
//         return s;
//       }
// 　　},
    submitAnswer() {
      console.log('试卷提交完成');
      this.$router.push({name:'Exam'});
    },
    handleCurrentChange(val) {
      this.questionItem = this.questionsList[val-1];
    },
    countdawn() {
      this.timerFlag = setInterval(()=>{
        this.remainingTime--
        if(this.remainingTime===0){
          clearInterval(this.timerFlag)
        }
      },1000)
    },
    sec_to_time(time) {
      // console.log(this.remainingTime, "________")
      // var startTimes = this.time_to_sec(this.remainingTime)
      // var time = startTimes - 1000
      var h = Math.floor(time / 3600); //小时数
      h = h < 10 ? '0' + h : h
      var m = Math.floor((time % 3600) / 60); //分钟数
      m = m < 10 ? '0' + m : m
      var s = parseInt(time % 3600) % 60; //当前的秒
      s = s < 10 ? '0' + s : s
      // var temp = h + ':' + m + ':' + s
      // console.log(temp)
      return h + ':' + m + ':' + s;
    }

  }
}
</script>
<style lang="less" scoped>
#exampaper{
  .inputdis{
    pointer-events:auto;
  }
  .inputabled{
    pointer-events: none;
  }
  input:focus{
    outline:none;
  }
  .desc {
    min-width: 800px;
    padding: 10px;
    border-radius: 4px;
    background: #cedbf0;
    display: flex;
    justify-content: space-around;
    div {
      label{
        width: 50px;
      }
      input{
        width: 60px;
        height: 26px;
        border: none;
        pointer-events: none;
        background-color: transparent;
      }
      .paper-name{
        width: 150px;
      }
      .time {
        color: red;
      }
      .time::-webkit-calendar-picker-indicator {
        display: none;
        // -webkit-appearance: none;
      }
      .remain{
        animation: remain 1s linear infinite; 
      }
      @keyframes remain{
        0%{opacity: 1;}
        100%{opacity: 0;} 
      }
    }
  }
  .container {
    margin: 20px 0;
    min-width: 800px;
    min-height: 600px;
    display: flex;
    .left {
      width: 25%;
      background-color: #cedbf0;
      padding: 10px;
      border-radius: 4px;
      .minTitle {
        margin-top: 20px;
        text-align: left;
      }
      div{
        margin: 15px 0;
        input{
          border: none;
          height: 30px;
        }
        button {
          width: 80px;
          height: 40px;
        }
      }
    }
    .right {
      width: 70%;
      .warn {
        p {
          margin: 20px 0;
        }
        button {
          width: 80px;
          height: 40px;
          margin: 50px;
        }
      }
      .questions{
        margin: 30px;
        .operate{
          display: flex;
          justify-content: space-around;
        }
      }
    }
  }
}


</style>