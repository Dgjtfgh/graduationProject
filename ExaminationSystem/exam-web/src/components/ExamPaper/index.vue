<template>
  <div id="exampaper">
    <div class="desc">
      <div><label for="">考试科目：</label><input style="width:100px;" type="text" v-model="course"/></div>
      <div><label for="">试卷ID：</label><input style="width:40px;" type="text" v-model="id"/></div>
      <div><label for="">试卷名称：</label><input style="width:180px;" class="paper-name" type="text" v-model="paperName"/></div>
      <div><label for="">题目数量：</label><input style="width:40px;" type="text" v-model="amount"/></div>
      <div><label for="">考试时长：</label><input style="width:60px;" :class="{ time:true, remain: this.timeFlag }" type="text" v-model="remainTime"/></div>
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
          <QuestionView v-bind:ques="questionItem" ref="mychild" v-on:changeanswer="changeanswer" />
          <div class="operate">
            <el-pagination
              background
              @current-change="handleCurrentChange"
              layout="prev, pager, next"
              :page-count="amount">
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
import axios from "axios"
import servicePath from "@/config/ApiUrl"
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
      remainingTime: 300000,
      timerFlag: null,
      questionString: '',
      questionIdArr: [],
      questionItem: {},
      answerList: {},
      answer: '',
      isChange: false,
      isFirstSave: true
    }
  },
  watch: {
    remainingTime: function(newQuestion, oldQuestion) {
      if(newQuestion === 0) {
        this.submitAnswer();
      }
      if(newQuestion <= 60*5) {
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
    // console.log(this.$route.params.id);
    this.getTestPaperInfo();
    this.getUserInfo();
  },
  methods: {
    changeanswer(value) {
      console.log(value);
      this.isChange = true;
      // this.answerList[this.questionItem.questionId] = value;
      this.answer = value;
      // console.log(this.answerList);
    },
    initPage() {
            // (?<=@).*?(?=#)
            let chiocequestions = this.questionString.match(/(?<=@).*?(?=@)/);
            // console.log(chiocequestions);
            let gapfilling = this.questionString.match(/(?<=#).*?(?=\#)/);
            // console.log(gapfilling);
            let shortanswerquestions = this.questionString.match(/(?<=\$).*?(?=\$)/);
            // console.log(shortanswerquestions);
            let questions = chiocequestions + ',' + gapfilling + ',' + shortanswerquestions;
            // console.log(questions);
            this.questionIdArr = questions.split(',');
            // console.log(this.questionIdArr);
            this.amount = this.questionIdArr.length;
        },
    getUserInfo() {
        const number = localStorage.getItem("username");
        const sf = localStorage.getItem("sf");
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
          this.studentName = res.data.data[0].name;
          this.studentNo = res.data.data[0].number;
          this.college = res.data.data[0].college;
          this.professional = res.data.data[0].major;
        })
      },
    getTestPaperInfo() {
      this.id = this.$route.params.id,
      axios({
        method: 'GET',
        url: servicePath.getTestPaperInfo,
        params: {paperId: this.id},
        withCredentials: true
      }).then(res => {
        // console.log(res);
        if(res.status == '200') {
          this.course = res.data.data[0].subject;
          this.paperName = res.data.data[0].name;
          this.remainingTime = +res.data.data[0].testtimes * 60;
          this.questionString = res.data.data[0].questions;
          this.initPage();
        }
      })
    },
    getTempAnswer(val) {
      axios({
        method: 'GET',
        url: servicePath.getTempAnswer,
        params: {
          paperId: this.id,
          studentnumber: this.studentNo,
          index: +val-1
        },
        withCredentials: true
      }).then(res => {
        // console.log(res);
        if(res.status == '200') {
          this.$refs.mychild.setanswer(res.data.answer);
          this.answer = res.data.answer;
          // console.log(this.answer, '=======');
        }
      })
    },
    saveAnswer(val) {
      const tempdata = {
        paperId: this.id,
        studentnumber: this.studentNo,
        tempanswer: this.answer,
        questionId: +val-1
      };
      // this.answer = '';
      axios({
        method: 'POST',
        url: servicePath.saveAnswer,
        data: tempdata,
        withCredentials: true
      }).then(res => {
        // console.log(res);
        if(res.status == '200') {
          this.isFirstSave = false;
        }
      })
    },
    start() {
      this.show = false;
      this.countdawn();
      this.getQuestionInfo(1);
      localStorage.setItem("index", 1);
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
      let index = localStorage.getItem("index");
      const tempdata = {
        paperId: this.id,
        studentnumber: this.studentNo,
        tempanswer: this.answer,
        questionId: +index-1,
        submit: true
      };
      axios({
        method: 'POST',
        url: servicePath.saveAnswer,
        data: tempdata,
        withCredentials: true
      }).then(res => {
        // console.log(res);
        if(res.status == '200') {
          this.isFirstSave = false;
          this.$message.success("试卷提交成功！");
          this.$router.push({name:'Exam'});        
        }
      })
    },
    getQuestionInfo(val) {
      let id = +this.questionIdArr[val-1];
      axios({
        method: 'GET',
        url: servicePath.getQuestionInfo,
        params: {questionId: id},
        withCredentials: true
      }).then(res => {
        // console.log(res);
        this.questionItem = res.data.data[0];
        this.questionItem.id = val;
      })
    },
    handleCurrentChange(val) {
      // this.questionItem = this.questionsList[val-1];
      this.isChange = false;
      this.getQuestionInfo(val);
      // if(!this.isFirstSave) {
        this.getTempAnswer(val);
      // }
      let index = localStorage.getItem("index");
      localStorage.setItem("index", val);
      this.saveAnswer(index);
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
        // width: 60px;
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
    height: 80%;
    min-width: 800px;
    min-height: 540px;
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