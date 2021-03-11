<template>
  <div id="mangerpaper">
    <div class="container">
      <div class="content">
        <div class="scroll">
          <el-table
            ref="filterTable"
            :data="this.testPaperList"
            style="width: 100%">
            <el-table-column
              prop="paperId"
              label="试卷ID"
              sortable
              width="180"
              column-key="date"
            >
            </el-table-column>
            <el-table-column
              prop="name"
              label="试卷名"
              width="180">
            </el-table-column>
            <el-table-column
              prop="subject"
              label="课程"
              width="200"
              :filters="this.sbujectData"
              :filter-method="filterSubject"
              >
            </el-table-column>
            <el-table-column
              prop="startdate"
              label="开考时间"
              width="150"
            >
            </el-table-column>
            <el-table-column
              prop="enddate"
              label="结束时间"
              width="150"
            >
            </el-table-column>
            <el-table-column
              label="操作"
              width="200"
            >
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleChange(scope.$index, scope.row)">修改</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios"
import servicePath from "@/config/ApiUrl"
import moment from 'moment'
export default {
    name: 'MangerPaper',
    data() {
      return {
        subject: [
          {text: "高数", value: "高数"},
          {text: '英语', value: '英语'},
          {text: 'C++程序设计', value: 'C++程序设计'},
          {text: 'Java', value: 'Java'}
        ],
        tableData: [
          {
            paperId: 1,
            name: 'C++综合测试卷A',
            subject: 'C++程序设计',
            stardate: '2021-3-2 0:0:0',
            enddate: '2021-3-17 24:0:0'
          }
        ]
      }
    },
    computed: {
      testPaperList: function () {
        return this.tableData.map((currentValue,index,arr) => {
          currentValue.startdate = moment(currentValue.startdate).format('YYYY-MM-DD HH:mm:ss');
          currentValue.enddate = moment(currentValue.enddate).format('YYYY-MM-DD HH:mm:ss');
          // console.log(currentValue);
          return currentValue;
        })
      },
      sbujectData: function () {
        return this.subject.map((item) => {
          let temp = {
            text: item.subjectName,
            value: item.subjectName
          }
          // console.log(temp)
          return temp;
        })
      }
    },
    created() {
      this.getTestPaperList();
      this.getCourseInfo();
    },
    methods: {
      getTestPaperList(){
        const number = localStorage.getItem("username");
        axios({
          method: 'GET',
          url: servicePath.getTestPaperList,
          params: {
            writer: number
          },
          withCredentials: true
        }).then(res => {
          // console.log(res);
          if(res.status == '200') {
            if(res.data.data == "没有登录") {
              this.$router.push({name:'Login'});
              localStorage.clear();
            }else {
              this.tableData = res.data.data;
            }
          }
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
            this.subject = res.data.data;
          }
        })
      },
      filterSubject(value, row) {
        return row.subject === value;
      },
      handleChange(index, row) {
        // console.log(index, row);
        this.$router.push({name: 'MakePaper',params:{ id: row.paperId}});
      },
      handleDelete(index, row) {
        // console.log(index, row);
        this.$confirm('此操作将永久删除该试卷, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios({
            method: 'POST',
            url: servicePath.deleteTestPaper,
            data: {paperId: row.paperId},
            withCredentials: true
          }).then(res => {
            console.log(res);
            if(res.status == '200') {
              this.getTestPaperList();
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            } else {
              this.$message({
                type: 'error',
                message: '删除失败!'
              });
            }    
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      }
    }
}
</script>
<style lang="less" scoped>
#mangerpaper{
  .container{
    height: 100%;
    min-height: 620px;
    background: #cedbf0;
    padding: 10px;
    border-radius: 10px;
  }
}
</style>