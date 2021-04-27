<template>
  <div id="correctpaper">
    <el-table
    :data="testPaperList"
    highlight-current-row
    @expand-change="handleExpendRow"
    style="width: 100%">
    <el-table-column type="expand" align="center">
      <template slot-scope="props">
        <el-table
          ref="filterTable"
          :data="props.row.dicts"
          style="width: 100%">
          <el-table-column
            prop="paperId"
            label="试卷"
            width="180">
          </el-table-column>
          <el-table-column
            prop="number"
            label="学号">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名">
          </el-table-column>
          <el-table-column
            prop="college"
            label="学院">
          </el-table-column>
          <el-table-column
            prop="major"
            label="专业">
          </el-table-column>
          <el-table-column
            prop="tag"
            label="状态"
            width="100"
            :filters="[{ text: '待批阅', value: '待批阅' }, { text: '已批阅', value: '已批阅' }]"
            :filter-method="filterTag"
            filter-placement="bottom-end">
            <template slot-scope="scope">
              <el-button
                size="mini"
                round
                plain
                :type="scope.row.tag == '待批阅' ? 'danger' : 'success'"
                :disabled="scope.row.tag == '待批阅' ? false : true"
                @click="correctPaper(scope.row)"
                disable-transitions>{{scope.row.tag}}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </el-table-column>
    <el-table-column
      label="试卷ID"
      prop="paperId">
    </el-table-column>
    <el-table-column
      label="试卷名"
      prop="name">
    </el-table-column>
    <el-table-column
      label="课程"
      prop="subject">
    </el-table-column>
    <el-table-column
      label="学分"
      prop="credit">
    </el-table-column>
  </el-table>
  </div>
</template>
<script>
import axios from "axios"
import servicePath from "@/config/ApiUrl"
export default {
  name: 'CorrectPaper',
  data () {
    return {
      testPaperList: [
        {
          paperId: 1,
          name: 'C++综合测试卷A',
          subject: 'C++程序设计',
        }
      ]
    }
  },
  created() {
    this.getTestPaperList();
  },
  methods: {
    correctPaper(row) {
      // console.log(row.paperId);
      this.$router.push({name: 'CorrectDetail',params:{
          id: row.paperId,
          number: row.number
        }
      });
    },
    getTestPaperList(){
      const number = localStorage.getItem("username");
      axios({
        method: 'GET',
        url: servicePath.getTestPaperList,
        params: {
          writer: number,
          isEnd: true
        },
        withCredentials: true
      }).then(res => {
        // console.log(res);
        if(res.status == '200') {
          this.testPaperList = res.data.data;
          this.testPaperList.forEach(element => {
            this.queryDictData(element.paperId);
          });
        }
      })
    },
    handleExpendRow(row, expandedRows) { 
    },
    queryDictData(id) {
      axios({
        method: 'GET',
        url: servicePath.getTestPaperAnswerList,
        params: {
          paperId: id
        },
        withCredentials: true
      }).then(res => {
        // console.log(res.data.data);
        const index = this.testPaperList.findIndex(data => data.paperId === id);
        this.testPaperList[index].dicts = res.data.data;
        // this.$set(this.testPaperList[index], 'dicts', res.data.data);
        console.log(this.testPaperList, '-----');
      })
    },
    filterTag(value, row) {
      return row.tag === value;
    },
  }
}
</script>
<style lang="less" scoped>

</style>