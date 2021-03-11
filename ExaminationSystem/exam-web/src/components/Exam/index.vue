<template>
  <div id="exam">
    <h2>选择考试科目和试卷</h2>
      <div class="container">
        <div class="course">
          <el-button class="course-item"
            size="mini"
            v-for="(item, index) in course" :key="index"
            @click="selectCourse(item.subjectName)">
            {{ item.subjectName }}
          </el-button>
        </div>
        <div class="paper">
          <el-table
            :data="this.testPaperList"
            style="width: 100%; height: 100%"
            max-height="450"
            >
            <el-table-column
              prop="paperId"
              label="试卷ID"
              width="80">
            </el-table-column>
            <el-table-column
              prop="name"
              label="试卷名"
              width="220">
            </el-table-column>
            <el-table-column
              prop="subject"
              label="课程"
              width="120">
            </el-table-column>
            <el-table-column
              prop="startdate"
              label="开始日期"
              width="180">
            </el-table-column>
            <el-table-column
              prop="enddate"
              label="结束日期"
              width="180">
            </el-table-column>
            <el-table-column
              prop="testPaperStatus"
              label="状态">
              <template slot-scope="scope">
              <el-button
                size="mini"
                round
                plain
                :type="scope.row.testPaperStatus == '进入考试' ? 'danger' : ''"
                :disabled="scope.row.testPaperStatus == '进入考试' ? false : true"
                @click="enterPaper(scope.row)"
                disable-transitions>{{scope.row.testPaperStatus}}</el-button>
            </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
  </div>
</template>
<script>
import axios from "axios"
import servicePath from "@/config/ApiUrl"
import moment from 'moment'
export default {
    data() {
      return {
        course: [],
        currentSubject: '',
        testPaperStatus: '',
        testPaperData: [],
        answerPaper: []
      }
    },
    created() {
      this.init();
    },
    computed: {
      testPaperList: function () {
        return this.testPaperData.map((currentValue,index,arr) => {
          // console.log(currentValue);
          // console.log(this.answerPaper)
          let nowDate = new Date();
          if(new Date(currentValue.startdate) < nowDate) {
            if(this.answerPaper.includes(currentValue.paperId)) {
              currentValue.testPaperStatus = '已考'
            } else {
              currentValue.testPaperStatus = '进入考试'
            }
          } else {
            // console.log(currentValue.startdate, )
            currentValue.testPaperStatus = '未开考'
          }
          currentValue.startdate = moment(currentValue.startdate).format('YYYY-MM-DD HH:mm:ss');
          currentValue.enddate = moment(currentValue.enddate).format('YYYY-MM-DD HH:mm:ss');
          return currentValue;
        })
      },
    },
    methods: {
      async init() {
        await this.getAnswerPaper();
        await this.getCourseInfo();
        await this.getTestPaperList();
      },
      getAnswerPaper() {
        let number = localStorage.getItem('username');
        axios({
          method: 'GET',
          url: servicePath.getAnswerPaper,
          params: {
            number: number
          },
          withCredentials: true
        }).then(res => {
          // console.log(res);
          this.answerPaper = res.data.data.map(item => {
            return item.paperId
          })
        }) 
      },
      getCourseInfo() {
        axios({
          method: 'GET',
          url: servicePath.getCourseInfo,
          withCredentials: true
        }).then(res => {
          // console.log(res);
          if(res.status == '200') {
            if(res.data.data == "没有登录") {
              this.$router.push({name:'Login'});
              localStorage.clear();
            }else {
              this.course = res.data.data;
            }
          }
        })
      },
      getTestPaperList(){
        axios({
          method: 'GET',
          url: servicePath.getTestPaperList,
          params: {
            subject: this.currentSubject
          },
          withCredentials: true
        }).then(res => {
          // console.log(res);
          if(res.status == '200') {
            this.testPaperData = res.data.data;
          }
        })
      },
      selectCourse(value) {
        // console.log(value);
        this.currentSubject = value;
        this.getTestPaperList();
      },
      enterPaper(row) {
        // console.log(row);
        if(row.testPaperStatus == '未开考') {
          this.$message.warning("这门考试还未开始！请等待...");
          return;
        }
        this.$router.push({
          name: 'ExamPaper',
          params: {
            id: row.paperId
          }
        });
      }
    }
}
</script>
<style lang='less' scoped>
#exam{
  position: relative;
  margin: 0 20px;
  margin-bottom: 40px;
  // width: 100%;
  height: 600px;
  .container{
    width:870px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -45%);
    overflow: hidden;
    margin-bottom: 20px;
    // display: flex;
    // flex-direction: column;
    // justify-content: center;
    // align-items: center;
    .course{
      position: relative;
      left: 50%;
      transform: translate(-50%, 0);
      min-width: 550px;
      width: 70%;
      min-height: 100px;
      .course-item{
        margin: 5px;
      }
      .course-item:hover{
        background-color: rgb(170, 169, 169);
        color: blanchedalmond;
      }
      .course-item:focus{
        background-color: rgb(170, 169, 169);
        color: blanchedalmond;
      }
    }
    .paper{
      width: 900px;
    }
  }
}
</style>