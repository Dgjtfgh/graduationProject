<template>
  <div id="makepaper">
    <div class="select-view">
      <div class="item"><label for="">选择课程：</label>
      <el-select v-model="testPaperData.subject" 
        @change="getQuestionList"
        placeholder="请选择课程">
        <el-option
        v-for="item in subjectList"
        :key="item.subjectId"
        :label="item.subjectName"
        :value="item.subjectName">
        </el-option>
    </el-select></div>
      <div class="item"><label for="">试卷名称：</label><el-input placeholder="输入试卷名称" class="paper-name" type="text" v-model="testPaperData.name"></el-input></div>
      <div class="item"><label for="">开考时间：</label><el-input type="datetime-local" v-model="testPaperData.startdata"></el-input></div>
      <div class="item"><label for="">结束时间：</label><el-input type="datetime-local" v-model="testPaperData.enddata"></el-input></div>
      <div class="item"><label for="">考试时长：</label><el-select v-model="testPaperData.testtimes" placeholder="请选择考试时长">
        <el-option
        v-for="item in testTimesList"
        :key="item.value"
        :label="item.label"
        :value="item.value">
        </el-option>
    </el-select></div>
    </div>
    <div class="makepaper-view">
      <div class="container left">
        <h4>题 库</h4>
        <div class="questions-view">
            <el-table class="table"
                ref="multipleTable"
                :data="questionsData"
                tooltip-effect="dark"
                height="530"
                max-height="600"
                @selection-change="selectHandleChange"
                style="width: 100%; height: 100%;"
                >
                <el-table-column
                    type="selection"
                    width="35">
                </el-table-column>
                <el-table-column
                    type="expand"
                    width="30">
                <template slot-scope="props">
                    <el-form label-position="left" class="table-expand">
                        <el-form-item label="题目ID:">
                            <span>{{ props.row.questionId }}</span>
                        </el-form-item>
                        <el-form-item label="题目类型:">
                            <span>{{ props.row.type }}</span>
                        </el-form-item>
                        <el-form-item label="问题:">
                            <span>{{ props.row.content }}</span>
                        </el-form-item>
                        <el-form-item label="选项:">
                            <span>{{ props.row.select }}</span>
                        </el-form-item>
                        <el-form-item label="答案:">
                            <span>{{ props.row.answer }}</span>
                        </el-form-item>
                        <el-form-item label="分值:">
                            <span>{{ props.row.score }}</span>
                        </el-form-item>
                    </el-form>
                </template>
                </el-table-column>
                <el-table-column
                    label="ID"
                    prop="questionId"
                    width="60">
                </el-table-column>
                <el-table-column
                    prop="type"
                    label="Type"
                    :filters="[{text: '选择题', value: '选择题'}, {text: '填空题', value: '填空题'}, {text: '简答题', value: '简答题'}]"
                    :filter-method="filterType"
                    width="70">
                </el-table-column>
                <el-table-column
                    prop="content"
                    label="Question"
                    show-overflow-tooltip
                    >
                </el-table-column>
            </el-table>
        </div>
      </div>
      <div class="container right">
        <div class="scroll-view">
            <div class="title-view">
                <h4>{{this.testPaperData.name}}</h4>
                <el-button @click="save" class="upload" size="mini" round>上传</el-button>
            </div>
            <div class="content">
                <div v-if="this.choiceQuestions.length != 0">
                    <p class="subtitle">选择题</p>
                    <div v-for="(item, index) in this.choiceQuestions" :key="index">
                        <p><span>{{index+1}}、</span>{{item.content}}</p>
                        <p>{{item.select}}</p>
                    </div>
                </div>
                <div v-if="this.gapFillQuestions.length != 0">
                    <p class="subtitle">填空题</p>
                    <div v-for="(item, index) in this.gapFillQuestions" :key="index">
                        <p><span>{{index+1}}、</span>{{item.content}}</p>
                        <p>{{item.select}}</p>
                    </div>
                </div>
                <div v-if="this.shortAnswerQuestions.length != 0">
                    <p class="subtitle">简答题</p>
                    <div v-for="(item, index) in this.shortAnswerQuestions" :key="index">
                        <p><span>{{index+1}}、</span>{{item.content}}</p>
                        <p>{{item.select}}</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
    
  </div>
</template>
<script>
import axios from "axios"
import servicePath from "@/config/ApiUrl"
export default {
    name: 'MakePaper',
    data() {
        return {
            subjectList: [],
            testTimesList: [
                {value: '60', label: '60分钟'},
                {value: '90', label: '90分钟'},
                {value: '120', label: '120分钟'},
            ],
            testPaperData: {
                name: '',
                subject: '',
                startdata: '',
                enddata: '',
                writer: '',
                questions: '',
                testtimes: ''
            },
            totalscore: 0,
            paperQuestionsList: [],
            questionsData: []
        }
    },
    computed: {
        choiceQuestions: function () {
            // console.log(this.paperQuestionsList, '_____');
            let temp = this.paperQuestionsList.filter(function(item){ return item.type=="选择题"; });
            // console.log(temp);
            // return this.paperQuestionsList.filter(function(item){ return item.type=="选择题"; });
            return temp;
        },
        gapFillQuestions: function () {
            return this.paperQuestionsList.filter(function(item){ return item.type=="填空题"; });
        },
        shortAnswerQuestions: function () {
            return this.paperQuestionsList.filter(function(item){ return item.type=="简答题"; });
        }
    },
    created() {
        this.getCourseInfo();
        this.getQuestionList();
    },
    methods: {
        toggleSelection(rows) {
            if (rows) {
            rows.forEach(row => {
                this.$refs.multipleTable.toggleRowSelection(row);
            });
            } else {
            this.$refs.multipleTable.clearSelection();
            }
        },
        getQuestionList() {
            axios({
                method: 'GET',
                url: servicePath.getQuestionList,
                params: {type: this.testPaperData.subject},
                withCredentials: true
            }).then(res => {
                // console.log(res);
                if(res.status == '200') {
                    this.questionsData = res.data.data;
                }
            })
        },
        // selectSubject() {

        // },
        getCourseInfo() {
            axios({
            method: 'GET',
            url: servicePath.getCourseInfo,
            withCredentials: true
            }).then(res => {
                // console.log(res);
                if(res.status == '200') {
                    this.subjectList = res.data.data;
                }
            })
        },
        checkData() {
            if(!this.testPaperData.subject){
                this.$message.error("请选择课程！");
                return 0;
            }
            if(!this.testPaperData.name){
                this.$message.error("试卷名不能为空！");
                return 0;
            }
            if(!this.testPaperData.startdata){
                this.$message.error("请设置开考时间！");
                return 0;
            }
            if(!this.testPaperData.enddata){
                this.$message.error("请设置最后考试时间！");
                return 0;
            }
            if(!this.testPaperData.testtimes){
                this.$message.error("请选择考试时长！");
                return 0;
            }
            if(this.totalscore != 100) {
                this.$message.error("试卷分值不合理，请调整题型结构！");
                return 0;
            }
            return 1;
        },
        save() {
            let questionString = '';
            // let totalscore = 0;
            console.log(this.choiceQuestions);
            if(this.choiceQuestions) {
                questionString += '@';
                for (let i=0; i<this.choiceQuestions.length; i++){
                    // console.log(i,arr[i]);
                    questionString += this.choiceQuestions[i].questionId + ',';
                    this.totalscore += this.choiceQuestions[i].score;
                }
            }
            if(this.gapFillQuestions) {
                questionString += '#';
                for (let i=0; i<this.gapFillQuestions.length; i++){
                    // console.log(i,arr[i]);
                    questionString += this.gapFillQuestions[i].questionId + ',';
                    this.totalscore += this.gapFillQuestions[i].score;
                }
            }
            if(this.shortAnswerQuestions) {
                questionString += '$';
                for (let i=0; i<this.shortAnswerQuestions.length; i++){
                    // console.log(i,arr[i]);
                    questionString += this.shortAnswerQuestions[i].questionId + ',';
                    this.totalscore += this.shortAnswerQuestions[i].score;
                }
            }
            this.testPaperData.questions = questionString;
            this.testPaperData.writer = localStorage.getItem('username');
            console.log(this.totalscore, '++++++++')
            if (this.checkData()){
                axios({
                    method: 'POST',
                    url: servicePath.saveTestPaper,
                    data: this.testPaperData,
                    withCredentials: true
                }).then(res => {
                    // console.log(res);
                    if(res.data.isScuccess) {
                        this.$confirm('上传成功, 是否跳转到试卷管理页查看?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'success'
                        }).then(() => {
                            this.$router.push({
                                name:'MangerPaper'
                            });
                        }).catch(() => {
                            this.testPaperData = [];
                            this.paperQuestionsList = [];
                            this.toggleSelection();
                        });
                        
                    } else {
                        this.$message.error("上传失败！");
                    }
                })
            }
            
        },
        filterType(value, row) {
            return row.type === value;
        }, 
        selectHandleChange(selection) {
            this.paperQuestionsList = selection;
            // console.log(selection)
        }
    }
}
</script>
<style lang="less" scoped>
#makepaper{
    margin: 0;
  .select-view{
    min-width: 800px;
    height: 40px;
    background: #cedbf0;
    padding: 10px;
    border-radius: 10px;
    display: flex;
    justify-content: space-around;
    .item {
        display: flex;
        label{
            height: 40px;
            line-height: 40px;
            vertical-align: middle;
        }
        .el-select {
            width: 150px;
            height: 30px;
        }
        .el-input{
            width: 200px;
            height: 30px;
        }
    }
  }
  // padding-top: 20px;
  .makepaper-view{
    margin-top: 5px;
    display: flex;
    min-width: 800px;
    justify-content: space-around;
  }
  .container{
    height: 100%;
    min-height: 590px;
    background: #cedbf0;
    padding: 10px;
    border-radius: 10px;
  }
  .left {
      width: 400px;
      max-height: 590px;
      .questions-view{
        width: 400px;
        overflow: hidden;
        .el-table {
            max-width: unset;
        }
        .table {
            width: 415px !important;
        }
        .el-table .cell {
            line-height: unset;
        }
        .table-expand {
          font-size: 0;
        }
        .el-table__expanded-cell{
            padding:unset;
        }
        .table-expand label {
          width: 90px;
          color: #99a9bf;
        }
        .table-expand .el-form-item {
          margin-right: 0;
          margin-bottom: 0;
          width: 100%;
        }
      }
  }
  .right {
    width: 800px;
    text-align: left;
    .title-view{
        width: 100%;
        display: flex;
        justify-content: space-between;
        h4{
            margin: 0;
        }
        .upload{
            width: 60px;
            height: 30px;
        }
    }
    .scroll-view{
        overflow: hidden;
        width: 800px;
        height: 590px;
        .content{
            word-wrap:break-word; 
            word-break:break-all; 
            // overflow: hidden;
            overflow: scroll;
            width: 817px;
            height: 576.5px;
        }
    }
    
  }
}
</style>