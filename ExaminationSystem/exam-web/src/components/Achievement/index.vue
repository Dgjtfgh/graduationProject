<template>
  <div id="achievement">
    <div class="search">
      <el-input v-model="course" placeholder="请输入课程"></el-input>
      <el-button  icon="el-icon-search" @click="search">搜索</el-button>
    </div>
    <div class="result">
      <el-table
        :data="courseData"
        style="width: 100%; height: 100%"
        max-height="450"
      >
        <el-table-column
          prop="paperId"
          label="课程ID"
          width="180"
          >
        </el-table-column>
        <el-table-column
          prop="subject"
          label="课程名"
        >
        </el-table-column>
        <el-table-column
          prop="credit"
          label="学分"
          width="120">
        </el-table-column>
        <el-table-column
          prop="totalgrade"
          label="成绩"
          width="120">
        </el-table-column>
        <el-table-column
          prop="tag"
          label="状态"
          width="180">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.tag === '未通过' ? 'danger' : 'success'"
              disable-transitions>{{scope.row.tag}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="haveCredit"
          label="获得学分"
          width="120">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import axios from "axios"
import servicePath from "@/config/ApiUrl"
export default {
    data () {
      return {
        course: '',
        courseData: [
          {
            courseID: 1,
            courseName: 'Java程序设计',
            credit: 5,
            grade: 60,
            status: '通过'
          },
          {
            courseID: 2,
            courseName: 'C程序设计',
            credit: 4,
            grade: 59,
            status: '未通过'
          },
          {
            courseID: 3,
            courseName: 'C++程序设计',
            credit: 3,
            grade: 80,
            status: '通过'
          },
          {
            courseID: 4,
            courseName: 'Java程序设计',
            credit: 5,
            grade: 80,
            status: '通过'
          },
          {
            courseID: 5,
            courseName: 'Java程序设计',
            credit: 5,
            grade: 80,
            status: '通过'
          },
          {
            courseID: 6,
            courseName: 'Java程序设计',
            credit: 5,
            grade: 80,
            status: '通过'
          },
          {
            courseID: 7,
            courseName: 'Java程序设计',
            credit: 5,
            grade: 80,
            status: '通过'
          },
          {
            courseID: 7,
            courseName: 'Java程序设计',
            credit: 5,
            grade: 80,
            status: '通过'
          },
          {
            courseID: 7,
            courseName: 'Java程序设计',
            credit: 5,
            grade: 80,
            status: '通过'
          },
          {
            courseID: 7,
            courseName: 'Java程序设计',
            credit: 5,
            grade: 80,
            status: '通过'
          },
          {
            courseID: 7,
            courseName: 'Java程序设计',
            credit: 5,
            grade: 80,
            status: '通过'
          },
          {
            courseID: 7,
            courseName: 'Java程序设计',
            credit: 5,
            grade: 80,
            status: '通过'
          },
          {
            courseID: 7,
            courseName: 'Java程序设计',
            credit: 5,
            grade: 80,
            status: '通过'
          },
          {
            courseID: 7,
            courseName: 'Java程序设计',
            credit: 5,
            grade: 80,
            status: '通过'
          },
          {
            courseID: 7,
            courseName: 'Java程序设计',
            credit: 5,
            grade: 80,
            status: '通过'
          },
          {
            courseID: 7,
            courseName: 'Java程序设计',
            credit: 5,
            grade: 80,
            status: '通过'
          },
          {
            courseID: 7,
            courseName: 'Java程序设计',
            credit: 5,
            grade: 80,
            status: '通过'
          },
          {
            courseID: 7,
            courseName: 'Java程序设计',
            credit: 5,
            grade: 80,
            status: '通过'
          },
          {
            courseID: 7,
            courseName: 'Java程序设计',
            credit: 5,
            grade: 80,
            status: '通过'
          }
        ]
      }
    },
    filters: {

    },
    created() {
      this.getTestResult();
    },
    methods: {
      getTestResult() {
        const number = localStorage.getItem("username");
        axios({
          method: 'GET',
          url: servicePath.getTestResult,
          params: {
            studentnumber: number,
            subject: this.course
          },
          withCredentials: true
        }).then(res => {
          // console.log(res);
          this.courseData = res.data.data;
        })
      },
      search() {
        // console.log(this.course);
        this.getTestResult();
      }
    }
}
</script>
<style lang="less" scoped>
#achievement {
  .search{
    min-width: 800px;
    padding: 10px;
    border-radius: 4px;
    background: #cedbf0;
    display: flex;
    justify-content: center;
    .el-input {
      width: 30% !important;
      margin-right: 20px;
    }
  }
}
</style>