<template>
    <div id="correctpaper">
        <h2>试 卷 批 阅</h2>
        <div class="paperinfo">
            <div class="item">试卷ID：{{paperInfo.paperId}}</div>
            <div class="item">试卷名称：{{paperInfo.name}}</div>
            <div class="item">所属课程：{{paperInfo.subject}}</div>
        </div>
        <div class="content">
            <div class="content-item"
                v-for="(item, index) in questionsList" :key="index"
            >
                <div class="question">
                    <div>
                        <div class="question-item">{{index+1}}、{{item.content}}</div>
                        <div class="select-item">{{item.select}}</div>
                    </div>
                    <div>{{item.score}}分</div>
                </div>
                <div class="studentanswer"><div style="text-align: left;">学生答案：</div> <span>{{item.studentAnswer}}</span> </div>
                <div class="answer"><div style="text-align: left;">参考答案：</div> <span>{{item.answer}}</span> </div>
                <div class="score">
                    <div style="text-align: left;">得分：</div> <el-input v-model="scoreArr[index]" :disabled="item.type=='选择题'?true:false" class="score-input"></el-input>
                </div>
            </div>
        </div>
        <div class="operate">
            <el-button class="operate-btn" @click="submit">提交</el-button>
            <el-button class="operate-btn" @click="back">返回</el-button>
        </div>
    </div>
</template>
<script>
import axios from "axios"
import servicePath from "@/config/ApiUrl"
export default {
    name: "CorrectDetail",
    data() {
        return {
            questionsList: [],
            paperInfo: {},
            scoreArr: []
        }
    },
    computed: {
        scoreList: {
            get: function (val) {
                if(this.scoreArr[val]) {
                    return '';
                }
                return this.scoreArr[val];
            },
            set: function (val) {
                this.scoreArr[val] = val;
            }
        }
    },
    created() {
        // console.log(this.$route.params.id);
        this.getPaperQuestion();
    },
    methods: {
        submit() {
            let score = this.scoreArr.reduce((total, item) => {
                return total + +item;
            });
            let credit = 0;
            // console.log(score);
            if(score >= 60) {
                credit = this.paperInfo.credit;
            }
            let data = {
                paperId: this.$route.params.id,
                studentnumber: this.$route.params.number,
                totalgrade: score,
                credit: credit
            };
            axios({
                method: 'POST',
                url: servicePath.insterScore,
                data: data,
                withCredentials: true
            }).then(res => {
                console.log(res);
                if(res.status == '200') {
                    if(res.data.isScuccess) {
                        this.$router.push({name:'CorrectPaper'});
                    } else {
                        this.$message.error("上传失败！请联系管理员");
                    }
                } else {
                    this.$message.error("上传失败！请联系管理员");
                }
            })
        },
        back() {
            this.$router.back(-1);
        },
        mark() {
            this.questionsList.forEach((item, index) => {
                if(item.type == '选择题') {
                    if(item.answer == item.studentAnswer) {
                        this.scoreArr[index] = item.score;
                    } else { this.scoreArr[index] = 0; }
                } else {
                    this.scoreArr[index] = '';
                }
            });
        },
        getPaperQuestion() {
            axios({
                method: 'GET',
                url: servicePath.getPaperQuestion,
                params: {
                    paperId: this.$route.params.id,
                    number: this.$route.params.number
                },
                withCredentials: true
            }).then(res => {
                // console.log(res);
                if(res.status == '200') {
                    // console.log(this.answer, '=======');
                    if(res.data.data == "没有登录") {
                        this.$router.push({name:'Login'});
                        localStorage.clear();
                    }else {
                        this.questionsList = res.data.questionList;
                        this.paperInfo = res.data.paperInfo;
                        this.mark();
                    }
                }
            })
        },
    }
}
</script>
<style lang="less" scoped>
#correctpaper{
    width: 100%;
    height: 100%;
    .paperinfo {
        min-width: 800px;
        margin: 0 30px;
        height: 40px;
        line-height: 40px;
        display: flex;
        justify-content: space-around;
        background-color: #cedbf0;
    }
    .content {
        padding-top: 20px;
        min-width: 800px;
        margin: 0 30px;
        .content-item {
            padding: 10px;
            margin-bottom: 10px;
            border: 1px solid #cedbf0;
            display: flex;
            justify-content: space-between;
            span{
                text-indent: 2em;
            }
            .question {
                width: 400px;
                display: flex;
                div:nth-child(1) {
                    width: 80%;
                    text {
                        white-space:normal;
                        word-break:break-all;
                    }
                    .question-item{
                        width: 100%;
                        text-align: left;
                    }
                    .select-item {
                        text-align: left;
                        width: 100%;
                        text-indent: 2em;
                    }  
                }
                div:nth-child(2){
                    box-sizing: border-box;
                    width: 20%;
                    padding-left: 10px;
                }
            }
            .studentanswer{
                width: 200px;
            }
            .answer {
                width: 200px;
                span {
                    color: red;
                }
            }
            .score {
                width: 100px;
                .score-input{
                    width: 80%;
                }
            }
        }
    }
}
</style>