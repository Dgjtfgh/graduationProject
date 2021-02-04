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
          prop="courseID"
          label="课程ID"
          width="100">
        </el-table-column>
        <el-table-column
          prop="courseName"
          label="课程名"
          width="150"
        >
        </el-table-column>
        <el-table-column
          prop="credit"
          label="学分"
          width="120">
        </el-table-column>
        <el-table-column
          prop="grade"
          label="成绩"
          width="150">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
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
    methods: {
      search() {
        
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