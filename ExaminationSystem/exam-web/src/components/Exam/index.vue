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
            :data="textPaperData"
            style="width: 100%; height: 100%"
            max-height="450"
            @row-dblclick="enterPaper"
            >
            <el-table-column
              prop="id"
              label="试卷ID"
              width="100">
            </el-table-column>
            <el-table-column
              prop="name"
              label="试卷名"
              width="150">
            </el-table-column>
            <el-table-column
              prop="course"
              label="课程"
              width="120">
            </el-table-column>
            <el-table-column
              prop="starData"
              label="开始日期"
              width="150">
            </el-table-column>
            <el-table-column
              prop="endData"
              label="结束日期"
              width="150">
            </el-table-column>
            <el-table-column
              label="状态">
              未开始
            </el-table-column>
          </el-table>
        </div>
      </div>
  </div>
</template>
<script>
import axios from "axios"
import servicePath from "@/config/ApiUrl"
export default {
    data() {
      return {
        course: [
          "高数", '英语', 'C++', 'Java',
          "高数", '英语', 'C++', 'Java',
          "高数", '英语', 'C++', 'Java',
          "高数", '英语', 'C++', 'Java',
        ],
        textPaperData: [
          {
            id: 1,
            name: 'C++综合测试卷A',
            course: 'C++程序设计',
            starData: '2021-3-2 0:0:0',
            endData: '2021-3-17 24:0:0'
          },
          {
            id: 2,
            name: 'C++综合测试卷A',
            course: 'C++程序设计',
            starData: '2021-3-2 0:0:0',
            endData: '2021-3-17 24:0:0'
          },
          {
            id: 3,
            name: 'C++综合测试卷A',
            course: 'C++程序设计',
            starData: '2021-3-2 0:0:0',
            endData: '2021-3-17 24:0:0'
          },
          {
            id: 4,
            name: 'C++综合测试卷A',
            course: 'C++程序设计',
            starData: '2021-3-2 0:0:0',
            endData: '2021-3-17 24:0:0'
          },
          {
            id: 5,
            name: 'C++综合测试卷A',
            course: 'C++程序设计',
            starData: '2021-3-2 0:0:0',
            endData: '2021-3-17 24:0:0'
          },
          {
            id: 6,
            name: 'C++综合测试卷A',
            course: 'C++程序设计',
            starData: '2021-3-2 0:0:0',
            endData: '2021-3-17 24:0:0'
          },
          {
            id: 7,
            name: 'C++综合测试卷A',
            course: 'C++程序设计',
            starData: '2021-3-2 0:0:0',
            endData: '2021-3-17 24:0:0'
          },
          {
            id: 8,
            name: 'C++综合测试卷A',
            course: 'C++程序设计',
            starData: '2021-3-2 0:0:0',
            endData: '2021-3-17 24:0:0'
          },
          {
            id: 9,
            name: 'C++综合测试卷A',
            course: 'C++程序设计',
            starData: '2021-3-2 0:0:0',
            endData: '2021-3-17 24:0:0'
          },
          {
            id: 10,
            name: 'C++综合测试卷A',
            course: 'C++程序设计',
            starData: '2021-3-2 0:0:0',
            endData: '2021-3-17 24:0:0'
          },
          {
            id: 11,
            name: 'C++综合测试卷A',
            course: 'C++程序设计',
            starData: '2021-3-2 0:0:0',
            endData: '2021-3-17 24:0:0'
          },
          {
            id: 12,
            name: 'C++综合测试卷A',
            course: 'C++程序设计',
            starData: '2021-3-2 0:0:0',
            endData: '2021-3-17 24:0:0'
          },
          {
            id: 13,
            name: 'C++综合测试卷A',
            course: 'C++程序设计',
            starData: '2021-3-2 0:0:0',
            endData: '2021-3-17 24:0:0'
          },
          {
            id: 14,
            name: 'C++综合测试卷A',
            course: 'C++程序设计',
            starData: '2021-3-2 0:0:0',
            endData: '2021-3-17 24:0:0'
          }
        ]
      }
    },
    created() {
      this.getCourseInfo();
    },
    methods: {
      getCourseInfo() {
        axios({
          method: 'GET',
          url: servicePath.getCourseInfo,
          withCredentials: true
        }).then(res => {
          console.log(res);
          if(res.status == '200') {
            this.course = res.data.data;
          }
        })
      },
      selectCourse(value) {
        console.log(value);
      },
      enterPaper(row, column, event) {
        // console.log(row, column, event);
        this.$router.push({  // this.$route.query.name
          path: '/exampaper',
          query: {
            id: row.id
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
    width:770px;
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
      width: 800px;
    }
  }
}
</style>