<template>
  <div id="makepaper">
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
                            <span>{{ props.row.id }}</span>
                        </el-form-item>
                        <el-form-item label="题目类型:">
                            <span>{{ props.row.type }}</span>
                        </el-form-item>
                        <el-form-item label="问题:">
                            <span>{{ props.row.question }}</span>
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
                    prop="id"
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
                    prop="question"
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
            <h4>Java综合模拟测试卷B</h4>
            <el-button @click="save" class="upload" size="mini" round>上传</el-button>
        </div>
        <div class="content">
            <div v-if="this.choiceQuestions.length != 0">
                <p class="subtitle">选择题</p>
                <div v-for="(item, index) in this.choiceQuestions" :key="index">
                    <p><span>{{index+1}}、</span>{{item.question}}</p>
                    <p>{{item.select}}</p>
                </div>
            </div>
            <div v-if="this.gapFillQuestions.length != 0">
                <p class="subtitle">填空题</p>
                <div v-for="(item, index) in this.gapFillQuestions" :key="index">
                    <p><span>{{index+1}}、</span>{{item.question}}</p>
                    <p>{{item.select}}</p>
                </div>
            </div>
            <div v-if="this.shortAnswerQuestions.length != 0">
                <p class="subtitle">简答题</p>
                <div v-for="(item, index) in this.shortAnswerQuestions" :key="index">
                    <p><span>{{index+1}}、</span>{{item.question}}</p>
                    <p>{{item.select}}</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
    name: 'MakePaper',
    data() {
        return {
            paperQuestionsList: [],
            questionsData: [
                {
                    id: 1,
                    type: '选择题',
                    question: '为什么为Button绑定onClick事件，但是在点击的时候仍然无效为什么为Button绑定onClick事件，但是在点击的时候仍然无效为什么为Button绑定onClick事件，但是在点击的时候仍然无效',
                    select: 'A: dhfdlfkjdslkf   B: dkfjkdfjkdkf   C:kdjfkdfjfk   D: dkfjkdfjkd',
                    answer: 'A',
                    score: 3
                },
                {
                    id: 1,
                    type: '选择题',
                    question: '为什么为Button绑定onClick事件，但是在点击的时候仍然无效',
                    select: 'A: dhfdlfkjdslkf   B: dkfjkdfjkdkf   C:kdjfkdfjfk   D: dkfjkdfjkd',
                    answer: 'A',
                    score: 3
                },
                {
                    id: 1,
                    type: '选择题',
                    question: '为什么为Button绑定onClick事件，但是在点击的时候仍然无效',
                    select: 'A: dhfdlfkjdslkf   B: dkfjkdfjkdkf   C:kdjfkdfjfk   D: dkfjkdfjkd',
                    answer: 'A',
                    score: 3
                },
                {
                    id: 1,
                    type: '填空题',
                    question: '为什么为Button绑定onClick事件，但是在点击的时候仍然无效',
                    select: 'A: dhfdlfkjdslkf   B: dkfjkdfjkdkf   C:kdjfkdfjfk   D: dkfjkdfjkd',
                    answer: 'A',
                    score: 3
                },
                {
                    id: 1,
                    type: '填空题',
                    question: '为什么为Button绑定onClick事件，但是在点击的时候仍然无效',
                    select: 'A: dhfdlfkjdslkf   B: dkfjkdfjkdkf   C:kdjfkdfjfk   D: dkfjkdfjkd',
                    answer: 'A',
                    score: 3
                },
                {
                    id: 1,
                    type: '填空题',
                    question: '为什么为Button绑定onClick事件，但是在点击的时候仍然无效',
                    select: 'A: dhfdlfkjdslkf   B: dkfjkdfjkdkf   C:kdjfkdfjfk   D: dkfjkdfjkd',
                    answer: 'A',
                    score: 3
                },
                {
                    id: 1,
                    type: '选择题',
                    question: '为什么为Button绑定onClick事件，但是在点击的时候仍然无效',
                    select: 'A: dhfdlfkjdslkf   B: dkfjkdfjkdkf   C:kdjfkdfjfk   D: dkfjkdfjkd',
                    answer: 'A',
                    score: 3
                },
                {
                    id: 1,
                    type: '选择题',
                    question: '为什么为Button绑定onClick事件，但是在点击的时候仍然无效',
                    select: 'A: dhfdlfkjdslkf   B: dkfjkdfjkdkf   C:kdjfkdfjfk   D: dkfjkdfjkd',
                    answer: 'A',
                    score: 3
                },
                {
                    id: 1,
                    type: '选择题',
                    question: '为什么为Button绑定onClick事件，但是在点击的时候仍然无效',
                    select: 'A: dhfdlfkjdslkf   B: dkfjkdfjkdkf   C:kdjfkdfjfk   D: dkfjkdfjkd',
                    answer: 'A',
                    score: 3
                },
                {
                    id: 1,
                    type: '选择题',
                    question: '为什么为Button绑定onClick事件，但是在点击的时候仍然无效',
                    select: 'A: dhfdlfkjdslkf   B: dkfjkdfjkdkf   C:kdjfkdfjfk   D: dkfjkdfjkd',
                    answer: 'A',
                    score: 3
                },
                {
                    id: 1,
                    type: '选择题',
                    question: '为什么为Button绑定onClick事件，但是在点击的时候仍然无效',
                    select: 'A: dhfdlfkjdslkf   B: dkfjkdfjkdkf   C:kdjfkdfjfk   D: dkfjkdfjkd',
                    answer: 'A',
                    score: 3
                },
                {
                    id: 1,
                    type: '选择题',
                    question: '为什么为Button绑定onClick事件，但是在点击的时候仍然无效',
                    select: 'A: dhfdlfkjdslkf   B: dkfjkdfjkdkf   C:kdjfkdfjfk   D: dkfjkdfjkd',
                    answer: 'A',
                    score: 3
                },
                {
                    id: 1,
                    type: '选择题',
                    question: '为什么为Button绑定onClick事件，但是在点击的时候仍然无效',
                    select: 'A: dhfdlfkjdslkf   B: dkfjkdfjkdkf   C:kdjfkdfjfk   D: dkfjkdfjkd',
                    answer: 'A',
                    score: 3
                },
                {
                    id: 1,
                    type: '选择题',
                    question: '为什么为Button绑定onClick事件，但是在点击的时候仍然无效',
                    select: 'A: dhfdlfkjdslkf   B: dkfjkdfjkdkf   C:kdjfkdfjfk   D: dkfjkdfjkd',
                    answer: 'A',
                    score: 3
                },
                {
                    id: 1,
                    type: '选择题',
                    question: '为什么为Button绑定onClick事件，但是在点击的时候仍然无效',
                    select: 'A: dhfdlfkjdslkf   B: dkfjkdfjkdkf   C:kdjfkdfjfk   D: dkfjkdfjkd',
                    answer: 'A',
                    score: 3
                },
                {
                    id: 1,
                    type: '简答题',
                    question: '为什么为Button绑定onClick事件，但是在点击的时候仍然无效',
                    sselect: '',
                    answer: 'A: dhfdlfkjdslkf dkfjkdfjkdkf  kdjfkdfjfk  D: dkfjkdfjkd',
                    score: 5
                },
                {
                    id: 1,
                    type: '简答题',
                    question: '为什么为Button绑定onClick事件，但是在点击的时候仍然无效',
                    select: '',
                    answer: 'A: dhfdlfkjdslkf dkfjkdfjkdkf  kdjfkdfjfk  D: dkfjkdfjkd',
                    score: 5
                },
                {
                    id: 1,
                    type: '简答题',
                    question: '为什么为Button绑定onClick事件，但是在点击的时候仍然无效',
                    select: '',
                    answer: 'A: dhfdlfkjdslkf dkfjkdfjkdkf  kdjfkdfjfk  D: dkfjkdfjkd',
                    score: 5
                }
            ]
        }
    },
    computed: {
        choiceQuestions: function () {
            // var temp = this.paperQuestionsList.filter(function(item){ console.log(item); return item.type=="选择题"; });
            // console.log(temp);
            return this.paperQuestionsList.filter(function(item){ return item.type=="选择题"; });
        },
        gapFillQuestions: function () {
            return this.paperQuestionsList.filter(function(item){ return item.type=="填空题"; });
        },
        shortAnswerQuestions: function () {
            return this.paperQuestionsList.filter(function(item){ return item.type=="简答题"; });
        }
    },
    methods: {
        save() {

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
  display: flex;
  min-width: 800px;
  justify-content: space-around;
  // padding-top: 20px;
  .container{
    height: 100%;
    min-height: 620px;
    background: #cedbf0;
    padding: 10px;
    border-radius: 10px;
  }
  .left {
      width: 400px;
      max-height: 620px;
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
        height: 620px;
        .content{
            word-wrap:break-word; 
            word-break:break-all; 
            // overflow: hidden;
            overflow: scroll;
            width: 817px;
            height: 606.5px;
        }
    }
    
  }
}
</style>