<template>
  <div id="mangerpaper">
    <div class="container">
      <div class="content">
        <div class="scroll">
          <el-table
            ref="filterTable"
            :data="tableData"
            style="width: 100%">
            <el-table-column
              prop="id"
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
              prop="course"
              label="课程"
              width="200"
              :filters="this.course"
              :filter-method="filterCourse"
              >
            </el-table-column>
            <el-table-column
              prop="starData"
              label="开考时间"
              width="150"
            >
            </el-table-column>
            <el-table-column
              prop="endData"
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
export default {
    name: 'MangerPaper',
    data() {
      return {
        course: [
          {text: "高数", value: "高数"},
          {text: '英语', value: '英语'},
          {text: 'C++程序设计', value: 'C++程序设计'},
          {text: 'Java', value: 'Java'}
        ],
        tableData: [
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
    methods: {
      filterCourse(value, row) {
        return row.course === value;
      },
      handleChange(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
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